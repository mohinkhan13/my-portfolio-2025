import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Code2, Database, Layout, Terminal, Cpu, FlaskConical, Atom, Filter, 
  Server, Shield, Globe, Layers, Braces 
} from 'lucide-react';

const Skills: React.FC = () => {
  const { content } = useContent();
  const { skills } = content;
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Dynamic Categories from Data
  const categories = ['All', ...Array.from(new Set(skills.map((s: any) => s.category)))];

  // Helper: Get Icon based on Category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Frontend': return <Layout size={28} />;
      case 'Backend': return <Server size={28} />;
      case 'Database': return <Database size={28} />;
      case 'Tools': return <Terminal size={28} />;
      case 'Languages': return <Braces size={28} />; // New Icon for Languages
      case 'Security': return <Shield size={28} />;
      case 'DevOps': return <Globe size={28} />;
      default: return <Code2 size={28} />;
    }
  };

  // Helper: Get Color based on Category
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Frontend': return 'text-blue-400 border-blue-500/30 bg-blue-500/10 shadow-blue-500/10';
      case 'Backend': return 'text-green-400 border-green-500/30 bg-green-500/10 shadow-green-500/10';
      case 'Database': return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10 shadow-yellow-500/10';
      case 'Tools': return 'text-purple-400 border-purple-500/30 bg-purple-500/10 shadow-purple-500/10';
      case 'Languages': return 'text-pink-400 border-pink-500/30 bg-pink-500/10 shadow-pink-500/10'; // New Color
      case 'Security': return 'text-red-400 border-red-500/30 bg-red-500/10 shadow-red-500/10';
      default: return 'text-accent border-accent/30 bg-accent/10 shadow-accent/10';
    }
  };

  return (
    <section id="skills" className="py-32 px-6 bg-[#0b1121] relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 font-mono text-xs mb-4">
             <FlaskConical size={14} className="text-accent" />
             <span>ELEMENTAL COMPOSITION</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Elements</span> of Code
          </h2>
          
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
             {categories.map((cat: any) => (
               <button
                 key={cat}
                 onClick={() => setActiveFilter(cat)}
                 className={`px-4 py-2 rounded-lg text-sm font-mono border transition-all duration-300 flex items-center gap-2 ${
                   activeFilter === cat 
                     ? 'bg-slate-800 border-accent text-accent shadow-[0_0_15px_rgba(45,212,191,0.2)]' 
                     : 'bg-transparent border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300'
                 }`}
               >
                 {cat === 'All' ? <Filter size={14}/> : <Atom size={14}/>}
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* PERIODIC TABLE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 justify-center">
           {skills.map((skill: any, index: number) => {
             
             const isDimmed = activeFilter !== 'All' && activeFilter !== skill.category;
             const colorClass = getCategoryColor(skill.category);

             // --- LOGIC: Percentage Calculation based on Level ---
             const percent = skill.percentage ? skill.percentage : (
                 skill.level === 'Expert' ? 95 :
                 skill.level === 'Advanced' ? 85 :
                 skill.level === 'Intermediate' ? 70 : 
                 skill.level === 'Beginner' ? 40 : 50
             );
             // Format like Atomic Mass (e.g. 85.0)
             const mass = percent.toFixed(1); 

             return (
               <div 
                 key={index}
                 onMouseEnter={() => setHoveredSkill(index)}
                 onMouseLeave={() => setHoveredSkill(null)}
                 className={`relative aspect-square transition-all duration-500 group cursor-pointer ${
                    isDimmed ? 'opacity-20 blur-[2px] scale-95 grayscale' : 'opacity-100 scale-100'
                 }`}
               >
                 {/* THE ELEMENT CARD */}
                 <div className={`w-full h-full bg-[#0f1623] border-2 rounded-xl flex flex-col p-4 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${colorClass.replace('bg-', 'hover:bg-opacity-20 ')}`}>
                    
                    {/* Background Glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity bg-current`}></div>

                    {/* Top Row: Number & Mass */}
                    <div className="flex justify-between items-start text-[10px] font-mono opacity-60 mb-2">
                       <span>{index + 1}</span>
                       <span>{mass}</span>
                    </div>

                    {/* Center: Icon & Full Name */}
                    <div className="flex-grow flex flex-col items-center justify-center gap-2">
                       <div className={`opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${colorClass.split(' ')[0]}`}>
                          {getCategoryIcon(skill.category)}
                       </div>
                       <h3 className="text-sm md:text-base font-bold text-slate-100 text-center leading-tight group-hover:text-white">
                          {skill.name}
                       </h3>
                    </div>

                    {/* Bottom: Category Tag */}
                    <div className="text-center mt-2">
                       <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider bg-[#0b1121]/50 rounded px-1 py-0.5 inline-block">
                          {skill.category}
                       </p>
                    </div>
                 </div>

                 {/* TOOLTIP (Detail View) */}
                 <div className={`absolute -top-14 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-xs p-3 rounded-lg shadow-xl border border-slate-600 z-20 pointer-events-none transition-all duration-300 ${hoveredSkill === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="flex justify-between mb-1">
                       <span className="text-slate-400">Level:</span>
                       <span className="text-accent font-bold">{skill.level} ({percent}%)</span>
                    </div>
                    {/* Progress Bar inside Tooltip */}
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                       <div className={`h-full ${colorClass.includes('blue') ? 'bg-blue-400' : colorClass.includes('green') ? 'bg-green-400' : colorClass.includes('pink') ? 'bg-pink-400' : 'bg-accent'}`} style={{ width: `${percent}%` }}></div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-600"></div>
                 </div>

               </div>
             );
           })}
        </div>
      </div>
    </section>
  );
};

export default Skills;