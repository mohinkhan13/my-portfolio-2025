import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, FileDown, Hash, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  // --- 1. HANDLE SCROLL & PROGRESS BAR ---
  useEffect(() => {
    const handleScroll = () => {
      // Navbar Background Logic
      setScrolled(window.scrollY > 50);

      // Progress Bar Logic
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- 2. ACTIVE SECTION TRACKING (Intersection Observer) ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 } // 40% section dikhne par active hoga
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navLinks = [
    { name: 'Start', href: '#home', id: 'home' },
    { name: 'About.py', href: '#about', id: 'about' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#0a1120]/80 backdrop-blur-md border-accent/20 py-3 shadow-[0_0_30px_rgba(45,212,191,0.1)]' 
          : 'bg-transparent border-transparent py-5'
      }`}
    >
      {/* SCROLL PROGRESS BAR */}
      <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-accent z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>

      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO AREA */}
        <a href="#home" className="group flex items-center gap-2">
          <div className="p-2 bg-accent/10 rounded-lg border border-accent/20 group-hover:border-accent/50 transition-colors">
             <Terminal size={20} className="text-accent group-hover:text-white transition-colors" />
          </div>
          <span className="text-lg md:text-xl font-bold font-mono text-slate-200 group-hover:text-accent transition-colors">
            Mohinkhan<span className="text-accent">.dev</span>
            <span className="animate-blink">_</span>
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`relative px-4 py-2 text-sm font-mono rounded transition-all duration-300 group ${
                activeSection === link.id 
                  ? 'text-accent bg-accent/10' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className={`mr-1 ${activeSection === link.id ? 'text-accent' : 'text-slate-600 group-hover:text-accent'}`}>
                {activeSection === link.id ? '>' : '#'}
              </span>
              {link.name}
              
              {/* Active Bottom Border */}
              {activeSection === link.id && (
                 <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
              )}
            </a>
          ))}

          {/* RESUME BUTTON */}
          <a 
            href="/resume.pdf" 
            target="_blank" 
            className="ml-6 px-4 py-2 border border-accent text-accent text-xs font-mono rounded hover:bg-accent/10 transition-all flex items-center gap-2 group"
          >
             <FileDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
             <span>_CV.pdf</span>
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-accent transition-colors border border-slate-700 rounded bg-[#1e293b]/50" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION DRAWER */}
      <div className={`md:hidden fixed inset-x-0 bg-[#0b101b]/95 backdrop-blur-xl border-b border-accent/20 transition-all duration-500 origin-top overflow-hidden ${isOpen ? 'max-h-screen opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}`}>
        <div className="flex flex-col px-6 space-y-2">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)} 
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                 activeSection === link.id 
                 ? 'bg-accent/10 border-accent/30 text-accent' 
                 : 'bg-[#1e293b]/50 border-slate-800 text-slate-400 hover:text-white'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <Hash size={16} className={activeSection === link.id ? 'text-accent' : 'text-slate-600'} />
              <span className="font-mono text-sm">{link.name}</span>
              {activeSection === link.id && <ChevronRight size={16} className="ml-auto animate-pulse" />}
            </a>
          ))}

          {/* Mobile Resume Button */}
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="mt-4 flex items-center justify-center gap-2 p-3 bg-accent/10 border border-accent text-accent rounded-lg font-mono text-sm font-bold active:scale-95 transition-transform"
          >
             <FileDown size={16} /> Download Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;