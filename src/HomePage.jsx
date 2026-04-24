import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ================= CURSOR ================= */
function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(followerRef.current, { x: e.clientX, y: e.clientY, duration: 0.6 });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed w-3 h-3 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference" />
      <div ref={followerRef} className="fixed w-8 h-8 border border-white/30 rounded-full z-[9998] pointer-events-none" />
    </>
  );
}

/* ================= CINEMATIC LOGO ================= */
function CinematicLogo() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.to(ref.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
    });

    gsap.to(ref.current, {
      y: 30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(ref.current, {
      scale: 1.08,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full" />

      <img
        ref={ref}
        src="/logo.png"
        className="w-[420px] h-[420px] object-contain rounded-full opacity-[0.05] border border-white/10 p-10"
      />
    </div>
  );
}

/* ================= NAVBAR ================= */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["home", "vision", "capability", "proof", "leadership", "contact"];

  return (
    <div className={`fixed top-0 w-full z-50 transition-all duration-700 ${
      scrolled
        ? "bg-[#061B3A]/50 backdrop-blur-2xl border-b border-white/10 py-3"
        : "bg-transparent py-6"
    }`}>

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <img src="/logo.png" className="h-10 w-10 rounded-full object-cover" />
          <div className="flex flex-col leading-none">
            <span className="text-white text-[10px] tracking-[0.3em]">SMART SMILE WAY</span>
            <span className="text-white/40 text-[9px] tracking-widest">EDUCATION GROUP</span>
          </div>
        </div>

        <div className="hidden md:flex gap-8 text-[11px] tracking-[0.25em]">
          {links.map((l) => (
            <button
              key={l}
              onClick={() =>
                document.getElementById(l)?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white/60 hover:text-white transition"
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ================= HERO ================= */
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
    );
  }, []);

  return (
    <section id="home" ref={ref}
      className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-[#061B3A]">

      <CinematicLogo />

      <div className="z-10 max-w-4xl">

        <p className="text-white/50 tracking-[0.3em] text-xs mb-6">
          ORIGIN · EDUCATIONAL INVESTMENT GROUP
        </p>

        <h1 className="text-white text-5xl md:text-6xl font-[Playfair_Display] leading-tight">
          We build, operate & transform
          <br /> educational institutions
        </h1>

        <p className="text-white/60 mt-8">
          End-to-end systems for schools, nurseries and global education models.
        </p>

      </div>
    </section>
  );
}

/* ================= SECTION ================= */
function Section({ id, title, subtitle, children, dark }) {
  return (
    <section id={id}
      className={`py-40 px-6 md:px-24 ${
        dark ? "bg-[#061B3A] text-white" : "bg-white text-[#0B1B3A]"
      }`}>

      <div className="max-w-6xl mx-auto">

        <p className="text-xs tracking-[0.3em] opacity-60 mb-4">{subtitle}</p>

        <h2 className="text-3xl font-[Playfair_Display] mb-16">{title}</h2>

        <div className="fade-up">{children}</div>

      </div>
    </section>
  );
}

/* ================= MAIN ================= */
export default function HomePage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".fade-up, .card, h2").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="overflow-x-hidden">

      <Cursor />
      <Navbar />
      <Hero />

      {/* ================= VISION + MISSION ================= */}
      <Section id="vision" title="About Us" subtitle="VISION · MISSION">

        <div className="space-y-10">

          <div>
            <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-4">VISION</h3>
            <p>
              To become a leading force in educational investment and management, transforming schools and nurseries into globally recognized, high-performance institutions through innovation and international standards.
            </p>
          </div>

          <div>
            <h3 className="text-sm tracking-[0.3em] text-gray-400 mb-4">MISSION</h3>
            <p>
              We design, develop, and operate international schools by integrating academic excellence, institutional governance, and financial efficiency, delivering scalable education models that meet global accreditation standards and workforce demands.
            </p>
          </div>

        </div>

      </Section>

      {/* ================= SERVICES ================= */}
      <Section id="capability" title="Our Services" subtitle="SYSTEMS · STRUCTURE" dark>

        <div className="space-y-4">

          <p>• Establishing and operating international schools</p>
          <p>• Cambridge, Edexcel, Oxford, Cognia accreditation</p>
          <p>• British, American & IB systems</p>
          <p>• Licensing under Egyptian Education Authority</p>
          <p>• Educational strategy & structure development</p>
          <p>• Teacher training & curriculum preparation</p>
          <p>• Workforce development & job placement</p>

        </div>

      </Section>

      {/* ================= ACHIEVEMENTS ================= */}
      <Section id="proof" title="Achievements" subtitle="IMPACT · SCALE">

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="card">
            <h3 className="text-5xl">4</h3>
            <p className="opacity-60">Schools</p>
          </div>

          <div className="card">
            <h3 className="text-5xl">5</h3>
            <p className="opacity-60">Nurseries</p>
          </div>

          <div className="card">
            <h3 className="text-5xl">25</h3>
            <p className="opacity-60">Accreditations</p>
          </div>

        </div>

      </Section>

      {/* ================= LEADERSHIP ================= */}
      <Section id="leadership" title="Executive Team" subtitle="PEOPLE · LEADERSHIP" dark>

        <div className="grid md:grid-cols-2 gap-10">

          {[
            ["Eng. Sameer Abdullah", "Founder & CEO — Smart Smile Way\nEducation Consultant for British and American systems"],
            ["Eng. Ibrahim", "Co-Founder — Smart Smile Way\nEducation Consultant"],
            ["Dr. Heba Sultan", "General Manager"],
            ["Eng. Mai Ashraf", "Tech Director"],
            ["Dr. Norhan Khaled", "American Education Manager"],
            ["Mrs. Samar Mansour", "British Education Manager"],
          ].map(([name, role], i) => (
            <div key={i} className="card border border-white/10 p-8 rounded-xl">
              <h3 className="text-lg font-medium">{name}</h3>
              <p className="text-white/60 mt-3 whitespace-pre-line">{role}</p>
            </div>
          ))}

        </div>

      </Section>

      {/* ================= CONTACT ================= */}
      <Section id="contact" title="Contact" subtitle="START · CONNECT">

        <p>Contact form goes here</p>

      </Section>

    </div>
  );
}
