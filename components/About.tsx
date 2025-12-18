import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Terminal, Copy, Check, Play, FileCode, Coffee, 
  Cpu, Layers, Code2, FolderOpen 
} from 'lucide-react';

const About: React.FC = () => {
  const { content } = useContent();
  const { about, skills: allSkills, projects, experience } = content;
  
  const highlightedSkills = content.about?.skills || allSkills?.slice(0, 8) || [];
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [outputLog, setOutputLog] = useState<string[]>([]);

  // --- DYNAMIC STATS LOGIC ---
  const customStats = about.stats || {};

  // 1. Experience Logic: 
  // Agar Admin ne custom text dala hai to wo use karo, 
  // Warna agar experience array mein data hai to calculate karo,
  // Warna "Fresher" dikhao.
  const experienceDisplay = customStats.experience || (
     experience && experience.length > 0 
     ? `${experience.length}+ Yrs` 
     : "Fresher"
  );

  // 2. Projects Logic: Auto count or Custom Override
  const projectsDisplay = customStats.projects || (
     projects && projects.length > 0 
     ? `${projects.length}+` 
     : "0"
  );

  // 3. Skills Logic: Auto count or Custom Override
  const skillsDisplay = customStats.skills || (
     allSkills && allSkills.length > 0 
     ? `${allSkills.length}+` 
     : "0"
  );

  const stats = [
    { label: 'Experience', value: experienceDisplay, icon: <Coffee size={18} /> },
    { label: 'Projects', value: projectsDisplay, icon: <FolderOpen size={18} /> },
    { label: 'Skills', value: skillsDisplay, icon: <Cpu size={18} /> },
  ];

  // Defaults
  const fileName = about.fileName || 'profile.py';
  const className = about.className || 'Developer';
  const parentClass = about.parentClass || 'Person';
  
  const properties = about.properties || [
    { key: "name", value: '"Mohinkhan"' },
    { key: "status", value: '"Open to Work"' }
  ];

  const methods = about.methods || [];

  const handleCopy = () => {
    let codeText = `class ${className}(${parentClass}):\n    def __init__(self):`;
    properties.forEach((p: any) => { codeText += `\n        self.${p.key} = ${p.value}` });
    methods.forEach((m: any) => {
        codeText += `\n\n    def ${m.name}(self):`;
        if(m.innerProps) m.innerProps.forEach((ip: any) => codeText += `\n        self.${ip.key} = ${ip.value}`);
        codeText += `\n        return ${m.return}`;
    });
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setOutputLog([]); 

    const logs = [
      `> python3 ${fileName}`,
      `[SYSTEM] Compiling...`,
      `[INFO] Class '${className}' inherited from '${parentClass}'`,
    ];

    logs.push(`[INIT] Initializing object...`);
    properties.forEach((p: any) => {
       const val = p.value.replace(/"/g, ''); 
       logs.push(`   > Setting ${p.key}: ${val}`);
    });

    methods.forEach((m: any) => {
       logs.push(`[EXEC] Running method '${m.name}'...`);
       if (m.innerProps && m.innerProps.length > 0) {
          m.innerProps.forEach((ip: any) => {
             const val = ip.value.replace(/"/g, '');
             logs.push(`   > Updating self.${ip.key} -> ${val}`);
          });
       }
       const ret = m.return.replace(/"/g, '');
       logs.push(`   < Returned: ${ret}`);
    });

    logs.push(`[SUCCESS] Execution finished successfully.`);

    logs.forEach((log, i) => {
      setTimeout(() => {
        setOutputLog(prev => [...prev, log]);
      }, i * 400); 
    });

    setTimeout(() => setIsRunning(false), logs.length * 400 + 500);
  };

  return (
    <section id="about" className="py-32 px-6 bg-[#0b1121] relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/10 via-[#0b1121] to-[#0b1121] pointer-events-none"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-20">
           <div className="flex items-center gap-2 text-accent font-mono text-xs mb-4 uppercase tracking-widest">
              <span className="w-8 h-px bg-accent"></span>
              <span>01. {about.subHeading || 'About Me'}</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
             {about.heading?.split(' ')[0] || 'My'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">{about.heading?.split(' ').slice(1).join(' ') || 'Story'}</span>
           </h2>
           <p className="text-slate-400 max-w-2xl text-lg">
             Decoding the logic behind the code.
           </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-accent to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            
            <div className="relative bg-[#0f1623] rounded-xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col min-h-[500px] transform transition-transform duration-500 group-hover:rotate-1">
              
              <div className="bg-[#1e293b] px-4 py-2 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#0f1623] rounded text-xs text-slate-300 border border-slate-700/50 font-mono">
                    <FileCode size={12} className="text-blue-400" /> {fileName}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <button 
                     onClick={handleRunCode} 
                     disabled={isRunning}
                     className={`flex items-center gap-2 px-3 py-1 rounded text-xs font-bold transition-all ${
                       isRunning 
                       ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' 
                       : 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500/20 cursor-pointer'
                     }`}
                   >
                     <Play size={10} className={isRunning ? "opacity-50" : "fill-current"} /> {isRunning ? 'EXECUTING...' : 'RUN'}
                   </button>
                   <button onClick={handleCopy} className="p-1.5 text-slate-500 hover:text-white transition-colors">
                     {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                   </button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                 <div className="w-12 bg-[#0b101b] border-r border-slate-700/50 text-slate-600 text-right pr-3 pt-4 font-mono text-sm select-none leading-relaxed">
                    {[...Array(20)].map((_, i) => <div key={i}>{i + 1}</div>)}
                 </div>

                 <div className="flex-1 p-4 font-mono text-sm md:text-base leading-relaxed overflow-x-auto text-slate-300">
                    <div>
                      <span className="text-purple-400">class</span> <span className="text-yellow-400">{className}</span>(<span className="text-blue-400">{parentClass}</span>):
                    </div>
                    
                    <div className="pl-4 mt-2 group/block">
                       <div>
                          <span className="text-purple-400">def</span> <span className="text-blue-300">__init__</span>(<span className="text-red-400">self</span>):
                       </div>
                       {properties.map((prop: any, i: number) => (
                         <div key={i} className="pl-8">
                           <span className="text-red-400">self</span>.{prop.key} <span className="text-slate-500">=</span> <span className="text-green-400">{prop.value}</span>
                         </div>
                       ))}
                       {properties.length === 0 && <div className="pl-8 text-slate-600">pass</div>}
                    </div>

                    {methods.map((method: any, i: number) => (
                      <div key={i} className="pl-4 mt-4">
                         <div>
                            <span className="text-purple-400">def</span> <span className="text-blue-300">{method.name}</span>(<span className="text-red-400">self</span>):
                         </div>
                         {method.innerProps && method.innerProps.map((inner: any, j: number) => (
                           <div key={j} className="pl-8">
                              <span className="text-red-400">self</span>.{inner.key} <span className="text-slate-500">=</span> <span className="text-green-400">{inner.value}</span>
                           </div>
                         ))}
                         <div className="pl-8">
                            <span className="text-purple-400">return</span> <span className="text-green-400">{method.return}</span>
                         </div>
                      </div>
                    ))}
                    
                    <div className="pl-4 mt-2">
                       <span className="inline-block w-2.5 h-5 bg-accent animate-blink"></span>
                    </div>
                 </div>
              </div>

              <div className={`border-t border-slate-700 bg-[#080c14] transition-all duration-500 ease-in-out overflow-y-auto font-mono text-xs ${isRunning || outputLog.length > 0 ? 'max-h-48 p-3' : 'max-h-0 py-0 px-3'}`}>
                 <div className="text-slate-500 mb-2 flex items-center gap-2 border-b border-slate-800 pb-1 sticky top-0 bg-[#080c14]">
                    <Terminal size={10} /> TERMINAL OUTPUT
                 </div>
                 <div className="space-y-1">
                    {outputLog.map((log, i) => (
                       <div key={i} className={`${log.includes('ERROR') ? 'text-red-400' : log.includes('SUCCESS') ? 'text-green-400' : log.includes('>') ? 'text-yellow-400' : 'text-slate-300'} animate-fadeIn`}>
                          {log}
                       </div>
                    ))}
                    {isRunning && <div className="animate-pulse text-accent">_</div>}
                 </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col justify-center h-full">
            <div className="mb-10 space-y-6 text-lg text-slate-400 leading-relaxed">
              <p className="whitespace-pre-wrap">{about.bio || "I am a developer who loves building solutions."}</p>
              {about.bio2 && <p className="whitespace-pre-wrap pt-4 border-t border-slate-800/50">{about.bio2}</p>}
            </div>
            
            {/* STATS GRID */}
            <div className="grid grid-cols-3 gap-4 mb-10">
               {stats.map((stat, idx) => (
                  <div key={idx} className="bg-[#1e293b]/50 border border-slate-700 rounded-lg p-4 text-center hover:bg-[#1e293b] hover:border-accent/30 transition-all group cursor-default">
                     <div className="flex justify-center mb-2 text-slate-500 group-hover:text-accent transition-colors">
                        {stat.icon}
                     </div>
                     <div className="text-xl md:text-2xl font-bold text-white mb-1">{stat.value}</div>
                     <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">{stat.label}</div>
                  </div>
               ))}
            </div>

            <div>
              <h3 className="text-white font-mono mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} className="text-accent"/> Primary Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                 {highlightedSkills.length > 0 ? highlightedSkills.map((skill: any, idx: number) => (
                   <div key={idx} className="px-3 py-1.5 bg-[#1e293b] text-slate-300 text-xs font-mono rounded border border-slate-700 flex items-center gap-2 hover:border-accent/50 hover:text-white transition-colors cursor-default">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                     {skill.name}
                   </div>
                 )) : (
                   <span className="text-slate-600 text-sm italic">No highlighted skills.</span>
                 )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default About;