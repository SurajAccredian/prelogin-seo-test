import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiGoogleclassroom } from "react-icons/si";
import './CareerGrowth.css';
import { BriefcaseBusiness, ShieldCheck, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);
// Mobile address bar show/hide fires resize; don't rebuild the pin for it
ScrollTrigger.config({ ignoreMobileResize: true });

// The header is fixed/sticky and overlays the pinned section, so the pin starts below it
const getHeaderHeight = () => document.getElementById("site-header")?.offsetHeight || 0;

const images = [
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-1-v3.png",
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-2-v3.png",
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-3-v3.png",
  "https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/animation-section-image-desktop-silder-4-v3.png",
];

const CareerGrowth = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  // Cards 2-4 are clipped below the container, so native lazy loading would only
  // start when they slide in. Start loading them once the section is near the viewport.
  const [preload, setPreload] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPreload(true);
          io.disconnect();
        }
      },
      { rootMargin: "100% 0px 100% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the pin position correct when page height changes (Programs accordion, late images)
  useEffect(() => {
    let timer;
    let lastHeight = document.body.offsetHeight;
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const h = document.body.offsetHeight;
        if (Math.abs(h - lastHeight) > 2) {
          lastHeight = h;
          ScrollTrigger.refresh();
        }
      }, 200);
    });
    ro.observe(document.body);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, []);

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

      // Header height is exposed as a CSS var; the container height is derived from it in CareerGrowth.css
      const applyOffset = () => {
        if (containerRef.current) {
          containerRef.current.style.setProperty("--cg-offset", `${getHeaderHeight()}px`);
        }
      };
      applyOffset();
      ScrollTrigger.addEventListener("refreshInit", applyOffset);

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

      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `top ${getHeaderHeight()}`,
          // function form so a refresh (rotate/resize) recalculates the distance
          end: () => `+=${containerRef.current.offsetHeight * 2.5}`,
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

      return () => ScrollTrigger.removeEventListener("refreshInit", applyOffset);
    },
    { scope: containerRef, dependencies: [] }
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
        className="cg-container w-full relative flex items-center justify-center"
        ref={containerRef}
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
                  <div className="cg-card absolute inset-0">
                    {/* Text Content */}
                    <div className="cg-text w-full flex items-center justify-center px-6 sm:px-8 lg:px-12 py-4 sm:py-8 bg-[#D4E5FC] z-10">
                      <div className="max-w-xl space-y-4 sm:space-y-6 text-black">
                        <div className="flex items-center gap-2 sm:gap-3 text-black">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
                          <span className="text-xs sm:text-lg uppercase">
                            {section.heading}
                          </span>
                        </div>

                        <h2 className="cg-title text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-[1.15]">
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

                        <p className="cg-desc text-sm sm:text-base lg:text-lg text-black leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Image Section: fills the space left by the text so it is never clipped */}
                    <div className="cg-image bg-[#D4E5FC] p-2 sm:p-4 lg:p-6">
                      <div className="relative w-full h-full max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto">
                        <Image
                          src={images[index]}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          quality={75}
                          alt={section.title ? `${section.title} - Accredian Pedagogy` : `Accredian Executive Pedagogy ${index + 1}`}
                          className="object-contain object-center"
                          loading={preload ? "eager" : "lazy"}
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

export default CareerGrowth;
