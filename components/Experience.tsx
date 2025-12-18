import React from 'react';
import { useContent } from '../context/ContentContext';
import { Briefcase, MapPin, Calendar, Cpu, ShieldCheck, Activity, Terminal } from 'lucide-react';

const Experience: React.FC = () => {
  const { content } = useContent();
  const { experience } = content;

  return (
    <section id="experience" className="py-32 px-6 bg-[#080c14] relative overflow-hidden">
      
      {/* 1. Cyber Grid & Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-28 text-center relative">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-accent font-mono text-xs mb-6 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              SYSTEM_LEVEL: EXPERT
           </div>
           <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4 relative z-10">
             Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-600">Matrix</span>
           </h2>
           <p className="text-slate-500 font-mono text-sm">Initializing professional timeline protocols...</p>
        </div>
        
        <div className="relative">
          
          {/* CENTER DATA SPINE (Holographic Pipe) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 h-full bg-slate-800/30 overflow-hidden">
             {/* Running Data Light */}
             <div className="absolute top-0 left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-accent to-transparent opacity-70 animate-data-stream"></div>
          </div>

          <div className="space-y-20 md:space-y-32">
            {experience && experience.map((exp: any, index: number) => {
              const isEven = index % 2 === 0;
              const serial = index + 1 < 10 ? `0${index + 1}` : index + 1;
              
              return (
                <div key={index} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* 1. HEXAGONAL NODE (Center) */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 z-20 flex items-center justify-center">
                     {/* Hexagon Shape CSS */}
                     <div className="w-full h-full bg-[#080c14] border-2 border-slate-600 group-hover:border-accent transition-colors relative flex items-center justify-center rotate-45 shadow-[0_0_20px_rgba(0,0,0,1)]">
                        <div className="w-3 h-3 bg-accent/50 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)] animate-pulse"></div>
                     </div>
                  </div>

                  {/* 2. SPACER */}
                  <div className="hidden md:block w-1/2"></div>

                  {/* 3. HOLOGRAPHIC CARD */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pr-20' : 'md:pl-20'}`}>
                    <div className="group relative">
                      
                      {/* Connection Circuit (Desktop) */}
                      <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 items-center ${isEven ? '-right-20 flex-row' : '-left-20 flex-row-reverse'}`}>
                          <div className="w-16 h-[2px] bg-slate-800 group-hover:bg-accent/50 transition-colors relative overflow-hidden">
                             <div className="absolute inset-0 bg-accent w-full -translate-x-full group-hover:animate-slide-right"></div>
                          </div>
                          <div className="w-4 h-4 border-2 border-slate-700 bg-[#080c14] rotate-45 group-hover:border-accent transition-colors"></div>
                      </div>

                      {/* MAIN CARD CONTAINER */}
                      <div className="relative bg-[#0f1623]/80 backdrop-blur-md rounded-xl border border-slate-700/50 hover:border-accent/50 transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(45,212,191,0.1)] group-hover:-translate-y-2 overflow-hidden">
                         
                         {/* HUD Corner Brackets */}
                         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent/30 group-hover:border-accent transition-colors"></div>
                         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/30 group-hover:border-accent transition-colors"></div>
                         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent/30 group-hover:border-accent transition-colors"></div>
                         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent/30 group-hover:border-accent transition-colors"></div>

                         {/* Background Watermark */}
                         <div className="absolute -right-6 -top-6 text-9xl font-bold text-slate-800/20 font-mono select-none pointer-events-none group-hover:text-accent/5 transition-colors">
                            {serial}
                         </div>

                         {/* Header Bar */}
                         <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-[#0b101b]/50">
                            <div className="flex items-center gap-3">
                               <div className="p-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                  <Briefcase size={14} />
                               </div>
                               <span className="text-sm font-bold text-slate-300 tracking-wide">{exp.company}</span>
                            </div>
                            <span className="text-xs font-mono text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                               <Calendar size={12} /> {exp.duration}
                            </span>
                         </div>

                         {/* Body Content */}
                         <div className="p-6 md:p-8 relative z-10">
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                               {exp.role}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-slate-500 text-sm mb-6 font-mono">
                               <MapPin size={14} className="text-red-400" />
                               <span>{exp.location}</span>
                               {/* <span className="text-slate-700">|</span>
                               <span className="text-green-400/80">Active Node</span> */}
                            </div>

                            <ul className="space-y-4">
                               {Array.isArray(exp.description) ? (
                                  exp.description.map((desc: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 group/item">
                                       <span className="mt-1.5 text-accent/30 group-hover/item:text-accent transition-colors shrink-0">
                                          <Terminal size={12} />
                                       </span>
                                       <span className="text-slate-400 text-sm leading-relaxed group-hover/item:text-slate-200 transition-colors">
                                          {desc}
                                       </span>
                                    </li>
                                  ))
                               ) : (
                                  <p className="text-slate-400">{exp.description}</p>
                               )}
                            </ul>
                         </div>

                         {/* Footer Status Bar */}
                         <div className="px-6 py-3 bg-[#0b101b] border-t border-slate-700/50 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono uppercase">
                               <Activity size={12} className="text-accent animate-pulse" />
                               <span>Performance: Optimal</span>
                            </div>
                            <div className="flex gap-1">
                               <div className="w-8 h-1 bg-slate-700 rounded-full overflow-hidden">
                                  <div className="h-full bg-accent w-[80%]"></div>
                               </div>
                               <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                               <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                            </div>
                         </div>

                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          {/* End Node */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 bottom-0 w-full max-w-[300px] h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>

        </div>
      </div>
    </section>
  );
};

export default Experience;