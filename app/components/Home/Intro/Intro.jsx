import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiGoogleclassroom } from "react-icons/si";
import './Intro.css';
import { BriefcaseBusiness, ShieldCheck, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Intro = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopImages = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-1-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-2-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-3-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-4-v3.png",
  ];

  const mobileImages = [
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-1-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-2-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-3-v3.png",
    "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-4-v3.png",
  ];

  const sections = [
    {
      heading: "Live Instructor Led",
      title: "Learn Live. Think Like a Leader.",
      highlight: "Leader",
      description:
        "Engage in live, interactive sessions led by top faculty who bring real-world insights, current industry practices, and practical frameworks straight into the classroom.",
      Icon: SiGoogleclassroom,
    },
    {
      heading: "Real-Time Mentorship",
      title: "Get Guidance When You Need It Most.",
      highlight: "Guidance",
      description:
        "Connect with experienced mentors who provide personalized feedback, answer questions in real-time, and help you navigate challenges throughout your learning journey.",
      Icon: SiGoogleclassroom,
    },
    {
      heading: "Hands-On Projects",
      title: "Build Skills Through Practical Application.",
      highlight: "Application",
      description:
        "Work on real-world projects that mirror industry scenarios, giving you the hands-on experience employers are looking for.",
      Icon: Wrench,
    },
    {
      heading: "Job-Ready Portfolio Results",
      title: "Turn Learning into Real-World Execution",
      highlight: "Execution",
      description:
        "Graduate with high-impact capstone projects that showcase your ability to solve real industry problems—giving you tangible proof of skill, not just a credential.",
      Icon: ShieldCheck,
    },
  ];

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length || !containerRef.current) return;

      gsap.set(cards, { clearProps: "all" });

      const vh = window.innerHeight;

      cards.forEach((card, index) => {
        card.style.position = "absolute";
        card.style.top = "0";
        card.style.left = "0";
        card.style.width = "100%";
        card.style.height = "100%";
        card.style.zIndex = String(index + 1);

        if (index > 0) {
          gsap.set(card, { yPercent: 100 });
        } else {
          gsap.set(card, { yPercent: 0 });
        }
      });

      const scrollDistance = vh * 2.5;

      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          markers: false,
          invalidateOnRefresh: true,
        }
      });

      cards.forEach((card, index) => {
        if (index === 0) return;

        masterTL.to(card, {
          yPercent: 0,
          duration: 1,
          ease: "power2.inOut",
        }, (index - 1) * 0.8);
      });
    },
    { scope: containerRef, dependencies: [isMobile] }
  );

  return (
    <>
      <div className="w-full flex mb-8 justify-center mt-12 sm:mt-16 font-circular px-4 sm:px-6 xl:px-12">
        <div className="w-full max-w-[86rem] h-full flex flex-col gap-4">
          <div className="w-full flex md:flex-row flex-col justify-normal md:justify-between px-0 sm:px-[10px] lg:gap-8 gap-4 mb-0 md:mb-6 items-start md:items-end">
            <div className="w-full">
              <h4 className="text-sm sm:text-base text-darkBlue font-medium max-sm:max-w-[300px] capitalize tracking-wide">
                Customized Learning Solutions
              </h4>
              <h2 className="text-2xl sm:text-3xl lg:text-[44px] mt-1 sm:mt-2 font-medium leading-tight">
                Career Growth Through Experience
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full relative flex items-center justify-center"
        ref={containerRef}
        style={{
          height: "100vh",
          overflow: "hidden"
        }}
      >
        <div className="cards-wrapper w-full h-full relative">
          {sections.map((section, index) => {
            const IconComponent = section.Icon;
            return (
              <section
                className=""
                key={`card-${index}`}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
              >
                <div className="relative w-full h-full bg-[#D4E5FC]">
                  <div className="absolute inset-0 flex flex-col md:flex-row">
                    {/* Text Content */}
                    <div className="w-full pt-32 md:pt-0 md:w-1/2 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-8 bg-[#D4E5FC] z-10">
                      <div className="max-w-xl space-y-4 sm:space-y-6 text-black">
                        <div className="flex items-center gap-2 sm:gap-3 text-black">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                          <span className="text-xs sm:text-lg uppercase">
                            {section.heading}
                          </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15]">
                          {(() => {
                            const { title, highlight } = section;
                            const parts = title.split(
                              new RegExp(`(${highlight})`, "i")
                            );
                            return parts.map((part, i) =>
                              part.toLowerCase() === highlight.toLowerCase() ? (
                                <span key={i} className="text-universal">
                                  {part}
                                </span>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            );
                          })()}
                        </h2>

                        <p className="text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Image Section - INCREASED SIZE */}
                    <div className="w-full md:w-1/2 relative right-0 top-0 bottom-0 h-full flex justify-center bg-[#D4E5FC] p-2 sm:p-4 lg:p-6">
                      <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl h-auto">
                        <img
                          src={isMobile ? mobileImages[index] : desktopImages[index]}
                          alt={section.title ? `${section.title} - Accredian Pedagogy` : `Accredian Executive Pedagogy ${index + 1}`}
                          className="w-full h-auto"
                          loading={index === 0 ? "eager" : "lazy"}
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            display: "block",
                            margin: "0 auto",
                          }}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Intro;
