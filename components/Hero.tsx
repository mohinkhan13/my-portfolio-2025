import React, { useEffect, useState, useRef } from "react";
import { useContent } from "../context/ContentContext";
import {
  FileText,
  Eye,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  LucideIcon,
  Code2,
  Terminal,
  Database,
  Sparkles,
  Cpu,
  Wifi,
} from "lucide-react";

const Hero: React.FC = () => {
  const { content } = useContent();
  const { hero, social } = content;
  const containerRef = useRef<HTMLDivElement>(null);

  // --- STATE ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const roles = [
    // "Full Stack Developer",
    "Python Developer",
    "Django Developer",
    "Backend Architect",
  ];

  const iconMap: Record<string, LucideIcon> = {
    github: Github,
    linkedin: Linkedin,
    mail: Mail,
  };

  // --- MOUSE MOVE ---
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // --- TYPEWRITER ---
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );
      setTypingSpeed(isDeleting ? 30 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, roles]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden px-6 bg-[#0f172a]"
    >
      {/* 1. BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 lg:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45,212,191,0.10), transparent 40%)`,
        }}
      />

      <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* --- LEFT COLUMN: TEXT --- */}
        <div className="text-center lg:text-left order-2 lg:order-1 relative">
          {/* Sparkle Decoration */}
          <div className="hidden lg:block absolute -top-14 -left-14 text-slate-800 animate-spin-slow opacity-50">
            <Sparkles size={120} />
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b]/80 border border-slate-700/50 backdrop-blur-md text-accent font-mono text-xs mb-8 mx-auto lg:mx-0 shadow-[0_0_15px_rgba(45,212,191,0.1)] hover:border-accent/30 transition-all cursor-default group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="tracking-wider text-slate-300 group-hover:text-accent transition-colors">
              OPEN FOR OPPORTUNITIES
            </span>
          </div>

          {/* Name & Greeting */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            <span className="text-slate-500 text-2xl md:text-4xl block mb-2 font-medium font-mono">
              {/* def init(self): */}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              {hero.name}
            </span>
            <span className="text-accent animate-pulse">_</span>
          </h1>

          {/* Typewriter */}
          <div className="h-8 mb-8 flex items-center justify-center lg:justify-start gap-3">
            <span className="text-accent font-mono text-xl">{">>>"}</span>
            <h2 className="text-xl md:text-3xl font-mono text-slate-300">
              {text}
              <span className="ml-1 w-2.5 h-6 bg-accent inline-block align-middle animate-blink shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
            </h2>
          </div>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 border-l-2 border-slate-800 pl-4">
            {hero.summary}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 mb-12 justify-center lg:justify-start">
            <a
              href="/resume.pdf" // File ka path (public folder se)
              download="Mohinkhan_Resume.pdf" // Download hone par ye naam aayega
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-accent text-[#0f172a] font-bold rounded-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_35px_rgba(45,212,191,0.6)] hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] skew-x-12 group-hover:animate-shimmer"></div>
              <div className="relative flex items-center justify-center gap-2">
                <FileText size={20} />
                <span>Download Resume</span>
              </div>
            </a>

            <a
              href="#projects"
              className="px-8 py-4 bg-[#1e293b] border border-slate-700 hover:border-accent text-white rounded-lg transition-all flex items-center justify-center gap-2 hover:bg-slate-800 group"
            >
              <Eye
                size={20}
                className="group-hover:text-accent transition-colors"
              />{" "}
              View Projects
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-center lg:justify-start gap-6">
            <span className="text-xs font-mono text-slate-600 uppercase tracking-widest hidden lg:block">
              Network
            </span>
            <div className="h-px bg-slate-800 w-12 hidden lg:block"></div>
            <div className="flex gap-3">
              {social.map((link: any) => {
                const Icon = iconMap[link.icon?.toLowerCase()] || FileText;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative p-3 bg-[#1e293b] border border-slate-800 hover:border-accent rounded-xl text-slate-400 hover:text-white transition-all hover:-translate-y-1"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: ENHANCED TERMINAL FRAME --- */}
        <div className="flex justify-center order-1 lg:order-2 relative perspective-1000">
          <div className="relative w-72 h-80 md:w-80 md:h-[420px] lg:w-96 lg:h-[480px] group">
            {/* Animated Glow Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-br from-accent via-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse-slow"></div>

            {/* Main Terminal Box */}
            <div className="relative h-full w-full bg-[#0f172a] rounded-xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
              {/* 1. Enhanced Header */}
              <div className="h-10 bg-[#1e293b] border-b border-slate-700 flex items-center px-4 gap-3 select-none">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-inner"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-inner"></div>
                </div>
                {/* Path Breadcrumb */}
                <div className="flex-1 text-center pr-12 opacity-60 flex items-center justify-center gap-2 group-hover:opacity-100 transition-opacity">
                  <Terminal size={12} className="text-accent" />
                  <span className="text-[11px] font-mono text-slate-300">
                    ~/source/portfolio/mohin_dev.py
                  </span>
                </div>
              </div>

              {/* 2. Image Area with Scanlines */}
              <div className="flex-1 relative overflow-hidden bg-slate-900 group/image">
                {/* CRT Scanline Overlay (The Tech Vibe) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20"></div>

                <img
                  src={hero.imgUrl || "https://via.placeholder.com/400"}
                  alt={hero.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105 opacity-90 group-hover/image:opacity-100"
                />

                {/* Bottom Code Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f172a]/90 backdrop-blur-md p-3 rounded-lg border border-slate-700/50 z-20 transform translate-y-2 opacity-90 group-hover/image:translate-y-0 group-hover/image:opacity-100 transition-all duration-500 shadow-xl">
                  <div className="flex justify-between items-center border-b border-slate-700/50 pb-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400">
                      System Status
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono text-green-400">
                        Online
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 text-[10px] font-mono">
                    <span className="text-pink-400">class</span>
                    <span className="text-blue-400">Developer</span>:
                    <span className="text-white">skills</span> =
                    <span className="text-yellow-400">['Python', 'React']</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Enhanced Floating Badges with Tooltips */}
            <div className="absolute -top-6 -right-6 group/icon z-30 animate-bounce-slow">
              <div className="w-14 h-14 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/icon:border-yellow-400/50 transition-colors">
                <Terminal className="text-yellow-400" size={24} />
              </div>
              {/* Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                Python Expert
              </div>
            </div>

            <div className="absolute top-1/2 -left-8 group/icon z-30 animate-bounce-slow delay-1000">
              <div className="w-12 h-12 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/icon:border-blue-400/50 transition-colors">
                <Code2 className="text-blue-400" size={22} />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                ReactJS
              </div>
            </div>

            <div className="absolute -bottom-6 right-8 group/icon z-30 animate-bounce-slow delay-500">
              <div className="w-12 h-12 bg-[#0f172a] rounded-xl border border-slate-700 flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.5)] group-hover/icon:border-green-400/50 transition-colors">
                <Database className="text-green-400" size={18} />
              </div>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap border border-slate-700">
                Backend
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
