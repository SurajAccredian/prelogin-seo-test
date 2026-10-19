"use client"
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import programs from "../Assets/programs.json";
import ReCAPTCHA from "react-google-recaptcha";

const LEAD_API = "https://api.accredian.com/bot-leads/bot-leads-api-test";

// Extract unique verticals
const VERTICALS = [...new Set(programs.map((p) => p.category))].filter(Boolean);

const toUpperCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => {
      // Handle CXO as a special case
      if (word === 'cxo') {
        return 'CXO';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

/* ================= VALIDATION HELPERS ================= */

/**
 * Validates name input - only allows letters, spaces, hyphens, and apostrophes
 * Prevents code injection and special characters
 */
const validateName = (name) => {
  // Only allow letters (including unicode), spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  const trimmed = name.trim();

  if (!trimmed) return { valid: false, error: "Name is required" };
  if (trimmed.length < 2) return { valid: false, error: "Name must be at least 2 characters" };
  if (trimmed.length > 50) return { valid: false, error: "Name cannot exceed 50 characters" };
  if (!nameRegex.test(trimmed)) {
    return { valid: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes" };
  }

  // Check for code injection patterns (extra safety layer)
  if (/<|>|{|}|\[|\]|\\|\/|;|:|-|=|\(|\)/.test(trimmed)) {
    return { valid: false, error: "Invalid characters detected in name" };
  }

  return { valid: true, value: trimmed };
};

/**
 * Validates query input - only allows alphanumeric with basic punctuation
 * Prevents XSS, SQL injection, and code execution attempts
 */
const validateQuery = (query) => {
  // Only allow alphanumeric characters, spaces, and basic punctuation
  const queryRegex = /^[a-zA-Z0-9\s.,!?'-]+$/;
  const trimmed = query.trim();

  if (!trimmed) return { valid: false, error: "Query is required" };
  if (trimmed.length > 800) return { valid: false, error: "Query cannot exceed 800 characters" };
  if (!queryRegex.test(trimmed)) {
    return { valid: false, error: "Query can only contain letters, numbers, spaces, and basic punctuation (.,!?'-)" };
  }

  // Check for XSS/code injection patterns
  if (/<script|javascript:|onerror|onclick|<iframe|eval\(|alert\(/.test(trimmed.toLowerCase())) {
    return { valid: false, error: "Invalid content detected in query" };
  }

  // Check for SQL injection patterns
  const sqlPatterns = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE|CAST|CONVERT|SCRIPT)\b)|(-{2})|(\bOR\b.*=.*)|(\bAND\b.*=.*)|('.*OR.*'.*=.*')|(\*|;|\||&)/i;
  if (sqlPatterns.test(trimmed)) {
    return { valid: false, error: "Invalid content detected in query" };
  }

  return { valid: true, value: trimmed };
};

/* ================= AVATAR ================= */
const Avatar = ({ role }) => {
  if (role === "user") {
    return null; // No avatar for user messages
  }

  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "#1f2937",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        flexShrink: 0,
      }}
    >
      🤖
    </div>
  );
};

const ChatWidget = forwardRef((props, ref) => {
  /* 
     FORM STEPS: 'FIRSTNAME' -> 'LASTNAME' -> 'PHONE' -> 'EMAIL' -> 'DONE'
     FLOW STEPS: 'CHOOSING' | 'ENROLLED' | 'REGISTER' | 'DONE' | null
  */

  const [messages, setMessages] = useState([]);
  const [userDetails, setUserDetails] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const [formStep, setFormStep] = useState(null); // Step validation
  const [currentFlow, setCurrentFlow] = useState(null);

  // Security State
  const [sessionToken, setSessionToken] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [cooldown, setCooldown] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const interactionData = useRef({
    startTime: Date.now(),
    stepTimestamps: {},
    keypressCount: 0,
    clickCount: 0,
    lastStepTime: Date.now()
  });

  const chatEndRef = useRef(null);

  // Initialize Chat & Session
  useEffect(() => {
    const initSession = async () => {
      try {
        // Mock Session Generation - In production this comes from backend
        // const res = await fetch(SESSION_API, { method: 'POST' });
        // const data = await res.json();
        // setSessionToken(data.token);
        // setConversationId(data.conversationId);

        // Simulating session for now
        setSessionToken(`sess_${Math.random().toString(36).substr(2, 9)}`);
        setConversationId(`conv_${Date.now()}`);

        if (messages.length === 0) {
          setMessages([
            { role: "bot", text: "👋 Hi! I'm your Program Assistant.\nBefore we start, may I know your first name?" }
          ]);
          setFormStep("FIRSTNAME");
          interactionData.current.stepTimestamps['START'] = Date.now();
        }
      } catch (err) {
        console.error("Session init failed", err);
      }
    };

    initSession();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Scroll to bottom when keyboard opens/resizes
  useEffect(() => {
    const handleResize = () => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
      return () => window.visualViewport.removeEventListener("resize", handleResize);
    }
  }, []);

  /* ---------------- RESET CHAT ---------------- */
  const resetChat = () => {
    setMessages([
      { role: "bot", text: "👋 Hi! I'm your Program Assistant.\nBefore we start, may I know your first name?" }
    ]);
    setFormStep("FIRSTNAME");
    setUserDetails({ firstName: "", lastName: "", email: "", phone: "" });
    setCurrentFlow(null);
    setLoading(false);
    setCooldown(false);
    setHoneypot("");

    // Reset Signals
    interactionData.current = {
      startTime: Date.now(),
      stepTimestamps: { 'START': Date.now() },
      keypressCount: 0,
      clickCount: 0,
      lastStepTime: Date.now()
    };

    // Regenerate Session logic if needed
    setConversationId(`conv_${Date.now()}`);

    // Reset captcha states
    setCaptchaVerified(false);
    setShowCaptcha(false);
  };

  useImperativeHandle(ref, () => ({ resetChat }));

  /* ---------------- CAPTCHA HANDLER ---------------- */
  const onCaptchaChange = (value) => {
    if (value) {
      setCaptchaVerified(true);
      setShowCaptcha(false);
      setFormStep("DONE");

      // Show welcome options after captcha verification
      setMessages(prev => [...prev, {
        role: "bot",
        text: "Welcome to Accredian, How can we help you?",
        type: "OPTIONS",
        options: [
          "I need help choosing right program.",
          "I'm enrolled student I have query",
          "I want to register for the program",
        ],
      }]);
    }
  };

  /* ---------------- API CALL ---------------- */
  const submitToApi = async (finalData) => {
    // 1. Honeypot check
    if (honeypot) {
      console.warn("Bot detected: Honeypot filled");
      return false; // Silently fail
    }

    // 2. Cooldown check (final safety)
    if (cooldown) return false;

    // 3. CAPTCHA (Only for final submissions)
    // let captchaToken = null;
    // if (executeRecaptcha) {
    //   try {
    //     captchaToken = await executeRecaptcha('submit_lead');
    //   } catch (e) {
    //     console.error("CAPTCHA failed", e);
    //   }
    // }

    try {
      const payload = {
        lead: {
          data: {
            FirstName: { value: finalData.firstName },
            LastName: { value: finalData.lastName },
            Email: { value: finalData.email },
            PhoneNumber: { value: finalData.phone },
            ...(finalData.helpOptions && { helpOptions: { value: finalData.helpOptions } }),
            ...(finalData.query && { Query: { value: finalData.query } }),
            ...(finalData.interestSection && { InterestSection: { value: finalData.interestSection } }),
          },
        },
        // Security Context
        security: {
          sessionToken,
          conversationId,
          // captchaToken,
          signals: {
            totalTime: Date.now() - interactionData.current.startTime,
            stepTimestamps: interactionData.current.stepTimestamps,
            keypressCount: interactionData.current.keypressCount,
            clickCount: interactionData.current.clickCount
          }
        }
      };

      await fetch(LEAD_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-Token": sessionToken || ""
        },
        body: JSON.stringify(payload),
      });

      // Also submit to Google Sheets for tracking
      await submitToGoogleSheets(finalData);

      // Global cooldown after submit
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);

      return true;
    } catch (error) {
      console.error("API Error", error);
      return false;
    }
  };

  /* ---------------- GOOGLE SHEETS SUBMISSION ---------------- */
  const submitToGoogleSheets = async (data) => {
    try {
      const formData = new FormData();
      formData.append('FirstName', data.firstName || '');
      formData.append('LastName', data.lastName || '');
      formData.append('Email', data.email || '');
      formData.append('Phone', data.phone || '');
      formData.append('HelpOptions', data.helpOptions || '');
      formData.append('Query', data.query || '');
      formData.append('InterestSection', data.interestSection || '');
      formData.append('Timestamp', new Date().toISOString());
      formData.append('Source', 'Chatbot');

      // Using the same Google Apps Script endpoint as MentorForm
      // You can create a separate endpoint if needed
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbxt22Pj-RETswywMjvd_r8OKUluivMxlG_LFzWas7aN-847OKKRFX242mJS5bqn7S-aDw/exec',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log('Google Sheets submission successful:', result);
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      // Don't fail the entire flow if sheets submission fails
      return false;
    }
  };

  /* ---------------- HANDLERS ---------------- */

  const processInput = async (input) => {
    // Cooldown check
    if (cooldown) return;

    // Start step timer logic
    const now = Date.now();
    const timeSinceLastStep = now - interactionData.current.lastStepTime;
    interactionData.current.lastStepTime = now;
    interactionData.current.stepTimestamps[formStep || 'FLOW'] = timeSinceLastStep;

    // 1. Add User Message
    setMessages(prev => [...prev, { role: "user", text: input }]);
    setLoading(true);
    setCooldown(true); // Enforce delay

    // Simulate small delay for natural feel & rate limiting
    await new Promise(r => setTimeout(r, 1000));
    setCooldown(false);

    // 2. Handle Form Steps
    if (formStep === "FIRSTNAME") {
      // Validate first name with comprehensive checks
      const nameValidation = validateName(input);
      if (!nameValidation.valid) {
        setMessages(prev => [...prev, { role: "bot", text: nameValidation.error }]);
        setLoading(false);
        return;
      }
      setUserDetails(prev => ({ ...prev, firstName: nameValidation.value }));
      setMessages(prev => [...prev, { role: "bot", text: `Great! And what is your last name?` }]);
      setFormStep("LASTNAME");

    } else if (formStep === "LASTNAME") {
      // Validate last name with comprehensive checks
      const nameValidation = validateName(input);
      if (!nameValidation.valid) {
        setMessages(prev => [...prev, { role: "bot", text: nameValidation.error }]);
        setLoading(false);
        return;
      }
      setUserDetails(prev => ({ ...prev, lastName: nameValidation.value }));
      setMessages(prev => [...prev, { role: "bot", text: `Nice to meet you, ${userDetails.firstName} ${nameValidation.value}! \nCould you please share your phone number?` }]);
      setFormStep("PHONE");

    } else if (formStep === "PHONE") {
      // Enhanced phone validation
      const phoneDigits = input.replace(/\D/g, '');

      // Only validate length for Indian numbers (+91)
      if (phoneDigits.startsWith('91')) {
        // 91 + 10 digits = 12 digits
        if (phoneDigits.length < 12) {
          setMessages(prev => [...prev, { role: "bot", text: "Please enter a valid phone number with at least 10 digits." }]);
          setLoading(false);
          return;
        }
      }

      setUserDetails(prev => ({ ...prev, phone: input }));
      setMessages(prev => [...prev, { role: "bot", text: "Great! Lastly, what's your email address?" }]);
      setFormStep("EMAIL");

    } else if (formStep === "EMAIL") {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      const cleanEmail = input.trim();

      if (!emailRegex.test(cleanEmail) || cleanEmail.length > 100) {
        setMessages(prev => [...prev, { role: "bot", text: "Please enter a valid email address." }]);
        setLoading(false);
        return;
      }

      const finalDetails = { ...userDetails, email: cleanEmail };
      setUserDetails(finalDetails);
      setFormStep("CAPTCHA"); // Show captcha before proceeding

      // Show captcha message
      setMessages(prev => [...prev, {
        role: "bot",
        text: "Great! Please verify you're human by completing the captcha below.",
        type: "CAPTCHA"
      }]);
      setShowCaptcha(true);

    }
    // 3. Handle Ongoing Flows
    else if (currentFlow === "ENROLLED") {
      // Validate query with comprehensive checks (XSS, SQL injection prevention)
      const queryValidation = validateQuery(input);
      if (!queryValidation.valid) {
        setMessages(prev => [...prev, { role: "bot", text: queryValidation.error }]);
        setLoading(false);
        return;
      }

      // User entered query
      await submitToApi({
        ...userDetails,
        helpOptions: "I'm enrolled student I have query",
        query: queryValidation.value
      });
      setMessages(prev => [...prev, {
        role: "bot",
        text: "Thank you for sharing your details. Our team member will connect with you shortly."
      }]);
      setCurrentFlow("DONE");
    }

    setLoading(false);
  }

  const handleOptionSelect = async (option) => {
    if (cooldown) return;

    // Track click
    interactionData.current.clickCount++;

    // Add User Selection to Chat
    setMessages((prev) => [...prev, { role: "user", text: option }]);

    // Branching Logic
    if (option === "I need help choosing right program.") {
      setCurrentFlow("CHOOSING");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Kindly choose the preferred option to help you",
          type: "OPTIONS",
          options: ["Request a callback", "Call our expert now"],
        },
      ]);
    } else if (option === "I'm enrolled student I have query") {
      setCurrentFlow("ENROLLED");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Please share your query below?",
        },
      ]);
    } else if (option === "I want to register for the program") {
      setCurrentFlow("REGISTER");
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "We are glad that you want to register for our program. To assist you further, please choose your area of interest:",
          type: "VERTICALS",
        },
      ]);
    } else {
      // Handle Flow 1 Sub-options
      if (currentFlow === "CHOOSING") {
        setLoading(true);
        if (option === "Request a callback") {
          await submitToApi({
            ...userDetails,
            helpOptions: "I need help choosing right program.",
          });
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: `Your request for one-on-one discussion with Admissions Team has been submitted with the following details:\n\nEmail Address: ${userDetails.email}\nPhone Number: ${userDetails.phone}\n\nOur team will get in touch with you within 24 hours.\n\nThank you!`,
            },
          ]);
        } else if (option === "Call our expert now") {
          await submitToApi({
            ...userDetails,
            helpOptions: "I need help choosing right program.",
          });
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: "Please connect with our program advisor on +918714251475 (10 AM to 8 PM).\n\nThank you!",
            },
          ]);
        }
        setLoading(false);
        setCurrentFlow("DONE");
      }
    }
  };

  const handleVerticalSelect = async (vertical) => {
    if (cooldown) return;
    interactionData.current.clickCount++;

    setMessages((prev) => [...prev, { role: "user", text: vertical }]);
    setLoading(true);

    if (currentFlow === "REGISTER") {
      await submitToApi({
        ...userDetails,
        helpOptions: "I want to register for the program",
        interestSection: vertical,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Thank you so much for providing details, Our Admission team will get in touch with you within 24 hours.",
        },
      ]);
      setCurrentFlow("DONE");
    }
    setLoading(false);
  };

  /* ================= UI COMPONENTS ================= */

  return (
    <div style={styles.wrapper}>
      {/* Honeypot Field - Hidden */}
      <input
        type="text"
        style={{ opacity: 0, position: 'absolute', top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        name="website_url_hp"
      />

      <CustomPhoneStyles />
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={styles.messageRow(m.role)}>
            {m.role === "bot" && <Avatar role="bot" />}

            <div style={styles.bubbleCol(m.role)}>
              {/* Bot Label */}
              {m.role === "bot" && (
                <div style={styles.botLabel}>Accredian Bot</div>
              )}

              {/* TEXT BUBBLE */}
              {m.text && (
                <div style={styles.bubble(m.role)}>
                  <p style={styles.text}>{m.text}</p>
                </div>
              )}

              {/* OPTIONS */}
              {!loading && m.type === "OPTIONS" && i === messages.length - 1 && currentFlow !== "DONE" && (
                <div style={styles.optionsContainer}>
                  {m.options.map((opt, idx) => (
                    <button key={idx} style={styles.optionButton} onClick={() => handleOptionSelect(opt)}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* VERTICALS */}
              {!loading && m.type === "VERTICALS" && i === messages.length - 1 && currentFlow !== "DONE" && (
                <div style={styles.optionsContainer}>
                  {VERTICALS.map((v, idx) => (
                    <button key={idx} style={styles.chipButton} onClick={() => handleVerticalSelect(v)}>
                      {toUpperCamelCase(v)}
                    </button>
                  ))}
                </div>
              )}

              {/* CAPTCHA */}
              {!loading && m.type === "CAPTCHA" && i === messages.length - 1 && showCaptcha && (
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
                    onChange={onCaptchaChange}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 8, padding: 12 }}>
            <Avatar role="bot" />
            <div style={styles.bubble("bot")}>Typing...</div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* INPUT AREA */}
      {currentFlow !== "DONE" && !showCaptcha && (!messages.length || messages[messages.length - 1].type !== "OPTIONS" && messages[messages.length - 1].type !== "VERTICALS") && (
        <div style={styles.inputBox}>
          {formStep === "PHONE" ? (
            <PhoneInputBar onSend={processInput} disabled={cooldown || loading} />

          ) : (
            <InputBar
              onSend={processInput}
              disabled={cooldown || loading}
              onType={() => { interactionData.current.keypressCount++ }}
              placeholder={
                formStep === "FIRSTNAME" ? "Enter your first name..." :
                  formStep === "LASTNAME" ? "Enter your last name..." :
                    formStep === "EMAIL" ? "Enter your email..." :
                      "Type your message..."
              }
              type={formStep === "EMAIL" ? "email" : "text"}
              validationType={
                formStep === "FIRSTNAME" ? "name" :
                  formStep === "LASTNAME" ? "name" :
                    formStep === "EMAIL" ? "email" :
                      currentFlow === "ENROLLED" ? "query" : "text"
              }
            />
          )}
        </div>
      )}

      {currentFlow === "DONE" && (
        <div style={styles.restartContainer}>
          <button style={styles.restartButton} onClick={resetChat}>Start New Chat</button>
        </div>
      )}
    </div>
  );
});

/* Internal Helper Components */

const CustomPhoneStyles = () => (
  <style>{`
    .react-tel-input .form-control {
      width: 100% !important;
      height: 42px !important;
      border-radius: 10px !important;
      border: 1px solid #d1d5db !important;
      padding-left: 48px !important;
    }
    .react-tel-input .form-control.error {
      border-color: #ef4444 !important;
    }
    .react-tel-input .flag-dropdown {
      border-radius: 10px 0 0 10px !important;
      background: transparent !important;
      border: none !important;
    }
    .react-tel-input .selected-flag {
      background: transparent !important;
      border-radius: 10px 0 0 10px !important;
      font-size: 14px !important;
    }
    .react-tel-input .country-list {
      width: 260px !important;
      border-radius: 12px !important;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2) !important;
      overflow-x: hidden;
    }
    .react-tel-input .country-list .country {
      display: flex !important;
      align-items: center !important;
      padding: 10px 12px !important;
    }
    .react-tel-input .country-list .country .flag {
      position: static !important;
      margin-right: 10px !important;
      margin-top: 0 !important;
    }
  `}</style>
);

const InputBar = ({ onSend, placeholder, type = "text", disabled, onType, validationType = "text" }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      // Small timeout to ensure browser is ready and not processing the 'disable' event
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  const validateInput = (value) => {
    // Use appropriate validation based on type
    if (validationType === "name") {
      const result = validateName(value);
      return result.valid ? "" : result.error;
    } else if (validationType === "email") {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
      if (!value.trim()) {
        return "Email is required";
      }
      if (!emailRegex.test(value.trim())) {
        return "Please enter a valid email address";
      }
    } else if (validationType === "query") {
      const result = validateQuery(value);
      return result.valid ? "" : result.error;
    } else {
      // Default text validation
      if (!value.trim()) {
        return "This field is required";
      }
      if (value.trim().length < 2) {
        return "Please enter at least 2 characters";
      }
    }
    return "";
  };

  const handleSend = () => {
    if (disabled) return;
    const validationError = validateInput(text);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onSend(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    if (onType) onType();
    if (error) {
      setError("");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
      <div style={{ display: 'flex', width: '100%', gap: 8 }}>
        <input
          style={{
            ...styles.input,
            borderColor: error ? '#ef4444' : '#f3f4f6',
            background: disabled ? '#f3f4f6' : '#fff',
            outline: 'none'
          }}
          value={text}
          onChange={handleChange}
          disabled={disabled}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          placeholder={placeholder}
          type={type}
          ref={inputRef}
          autoFocus
        />
        <button
          style={{
            ...styles.sendButton,
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSend}
          disabled={disabled}
        >
          Send
        </button>
      </div>
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

const PhoneInputBar = ({ onSend, disabled }) => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [disabled]);

  const validatePhone = (value) => {
    if (!value) {
      return "Phone number is required";
    }

    // Check if it's an Indian number (starts with 91)
    const phoneDigits = value.replace(/\D/g, '');
    if (phoneDigits.startsWith('91')) {
      // 91 + 10 digits = 12 digits
      if (phoneDigits.length < 12) {
        return "Phone number must be at least 10 digits";
      }
    }
    return "";
  };

  const handleSend = () => {
    if (disabled) return;
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    onSend("+" + phone);
    setPhone("");
  };

  const handleChange = (val) => {
    setPhone(val);
    if (error) {
      setError("");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 4 }}>
      <div style={{ display: 'flex', width: '100%', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={handleChange}
            disabled={disabled}
            inputStyle={{
              width: '100%',
              height: '42px',
              borderRadius: '10px',
              borderColor: error ? '#ef4444' : '#d1d5db',
              background: disabled ? '#f3f4f6' : '#fff'
            }}
            containerStyle={{ width: '100%' }}
            inputClass={error ? 'error' : ''}
            inputProps={{
              name: 'phone',
              required: true,
              disabled: disabled,
              autoFocus: true,
              ref: inputRef,
              onKeyDown: (e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }
            }}
          />
        </div>
        <button
          style={{
            ...styles.sendButton,
            opacity: disabled ? 0.6 : 1,
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          onClick={handleSend}
          disabled={disabled}
        >
          Send
        </button>
      </div>
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
};

/* ================= STYLES ================= */

const styles = {
  wrapper: {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    position: "relative",
  },
  chatBox: {
    flex: 1,
    padding: 16,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    background: "#fafafa",
  },
  messageRow: (role) => ({
    display: "flex",
    justifyContent: role === "user" ? "flex-end" : "flex-start",
    alignItems: "flex-start",
    gap: 8,
    width: "100%",
    marginBottom: 12,
  }),
  bubbleCol: (role) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: role === "user" ? "flex-end" : "flex-start",
    maxWidth: "85%",
    gap: 8,
  }),
  bubble: (role) => ({
    padding: 12,
    borderRadius: 14,
    background: role === "user" ? "#DCF8C6" : "#f4f4f4",
    fontSize: 14,
    lineHeight: 1.5,
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  }),
  text: {
    margin: 0,
    whiteSpace: "pre-line",
  },
  botLabel: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: 400,
    marginBottom: 2,
  },
  optionsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  optionButton: {
    padding: "8px 12px",
    borderRadius: 18,
    border: "1px solid #2563eb",
    background: "#fff",
    color: "#2563eb",
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 500,
    transition: "all 0.2s",
    textAlign: "left",
  },
  chipButton: {
    padding: "6px 10px",
    borderRadius: 16,
    border: "1px solid #6b7280",
    background: "#f3f4f6",
    color: "#374151",
    fontSize: 12,
    cursor: "pointer",
  },
  inputBox: {
    padding: 12,
    borderTop: "1px solid #e5e7eb",
    background: "#fff"
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: 10,
    border: "1px solid #f3f4f6",
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none'
  },
  sendButton: {
    padding: "0 20px",
    borderRadius: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    fontWeight: 600,
    cursor: "pointer"
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginLeft: 4,
    marginTop: 2
  },
  restartContainer: {
    padding: 12,
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "center"
  },
  restartButton: {
    background: "#f3f4f6",
    color: "#374151",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    fontWeight: 500
  }
};

export default ChatWidget;
