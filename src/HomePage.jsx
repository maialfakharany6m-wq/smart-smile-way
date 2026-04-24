import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= NAVBAR ================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    "home",
    "about",
    "services",
    "achievements",
    "leadership",
    "contact",
  ];

  return (
    <div
      className={`fixed top-0 w-full z-50 transition-all duration-500
      ${
        scrolled
          ? "bg-[#061B3A]/80 backdrop-blur-xl border-b border-white/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center px-4 md:px-8">

        <div className="flex items-center gap-14 w-full">

          {/* BRAND (pushed left) */}
          <div className="flex items-center gap-3 -ml-12 md:-ml-16">

            <img
              src="/logo.png"
              className="h-12 md:h-14 w-auto object-contain"
              alt="logo"
            />

            <span className="text-white text-sm tracking-[0.25em] font-light">
              SMART SMILE WAY
            </span>

          </div>

          {/* LINKS */}
          <div className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.2em] font-light ml-6">

            {links.map((l) => (
              <button
                key={l}
                onClick={() =>
                  document.getElementById(l)?.scrollIntoView({ behavior: "smooth" })
                }
                className="relative text-white/60 hover:text-white transition"
              >
                {l.toUpperCase()}
              </button>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}

/* ================= PAGE ================= */
export default function HomePage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });

      gsap.to(".floating-logo", {
        y: 30,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="font-[Inter] text-[#0B1B3A] bg-white">

      <Navbar />

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden"
      >
        <img
          src="/logo.png"
          className="floating-logo absolute opacity-[0.05] w-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt=""
        />

        <div className="max-w-4xl z-10 fade-up">

          <p className="uppercase tracking-[0.3em] text-gray-400 text-xs mb-6">
            Educational Investment & Management
          </p>

          <h1 className="text-5xl md:text-6xl font-[Playfair_Display] leading-tight">
            We build, operate & transform
            <br /> educational institutions
          </h1>

          <p className="mt-8 text-gray-500 text-lg max-w-2xl mx-auto">
            End-to-end solutions for schools and nurseries including operations,
            international accreditation, infrastructure, and financial systems.
          </p>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section id="about" className="py-32 px-6 md:px-24 bg-[#F7F9FC]">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-[Playfair_Display] mb-16 fade-up">
            About Us
          </h2>

          <div className="grid md:grid-cols-2 gap-16">

            <div className="fade-up">
              <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-4">
                VISION
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become a leading force in educational investment and management,
                transforming schools and nurseries into globally recognized,
                high-performance institutions through innovation and international standards.
              </p>
            </div>

            <div className="fade-up">
              <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-4">
                MISSION
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We design, develop, and operate international schools by integrating
                academic excellence, institutional governance, and financial efficiency,
                delivering scalable education models that meet global accreditation standards
                and workforce demands.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-32 px-6 md:px-24 bg-white">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-[Playfair_Display] mb-16 fade-up">
            Our Services
          </h2>

          <div className="grid md:grid-cols-2 gap-12 text-gray-600">

            <div className="fade-up space-y-5">
              <p>• Establishing and operating international schools</p>
              <p>• Cambridge, Edexcel, Oxford, Cognia accreditation</p>
              <p>• British, American & IB systems</p>
              <p>• Licensing under Egyptian Education Authority</p>
            </div>

            <div className="fade-up space-y-5">
              <p>• Educational strategy & structure development</p>
              <p>• Teacher training & curriculum preparation</p>
              <p>• Workforce development & job placement</p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section id="achievements" className="py-32 px-6 md:px-24 bg-[#F7F9FC]">

        <div className="grid md:grid-cols-4 gap-12 max-w-5xl mx-auto text-center">

          {[
            ["4", "Schools"],
            ["5", "Nurseries"],
            ["25", "Accreditations"],
          ].map(([num, label], i) => (
            <div key={i} className="fade-up">
              <p className="text-4xl font-light">{num}</p>
              <p className="text-gray-400 mt-2">{label}</p>
            </div>
          ))}

        </div>
      </section>

      {/* ================= EXECUTIVE TEAM (UPGRADED) ================= */}
      <section id="leadership" className="py-32 px-6 md:px-24 bg-white">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-[Playfair_Display] mb-16 fade-up">
            Executive Team
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            {[
              ["Eng. Sameer Abdullah", "Founder & CEO — Smart Smile Way\nEducation Consultant for British and American systems"],
              ["Eng. Ibrahim", "Co-Founder — Smart Smile Way\nEducation Consultant"],
              ["Dr. Heba Sultan", "General Manager"],
              ["Eng. Mai Ashraf", "Tech Director"],
              ["Dr. Norhan Khaled", "American Education Manager"],
              ["Mrs. Samar Mansour", "British Education Manager"],
            ].map(([name, role], i) => (
              <div
                key={i}
                className="fade-up border border-gray-100 p-8 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="text-lg font-medium">{name}</h3>
                <p className="text-gray-500 mt-3 whitespace-pre-line">
                  {role}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section id="contact" className="py-32 px-6 md:px-24 bg-[#061B3A] text-white">

        <div className="max-w-xl mx-auto text-center">

          <h2 className="text-3xl font-[Playfair_Display] mb-10">
            Contact
          </h2>

          <input className="w-full p-3 mb-4 bg-transparent border-b border-white/30" placeholder="Name" />
          <input className="w-full p-3 mb-4 bg-transparent border-b border-white/30" placeholder="Email" />
          <textarea className="w-full p-3 mb-6 bg-transparent border-b border-white/30" rows="4" placeholder="Message" />

          <button className="border border-white px-8 py-3 text-sm tracking-widest hover:bg-white hover:text-[#061B3A] transition">
            SEND MESSAGE
          </button>

        </div>
      </section>

    </div>
  );
}