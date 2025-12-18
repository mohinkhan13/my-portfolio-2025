import React from 'react';
import { Plus, X, Terminal, User, FileCode, BarChart3, Layers } from 'lucide-react';

interface Props {
  aboutData: any;
  setAboutData: (data: any) => void;
  skillsData: any[]; 
  setSkillsData: (data: any[]) => void;
}

const AdminAbout: React.FC<Props> = ({ aboutData, setAboutData, skillsData, setSkillsData }) => {
  
  // --- HANDLERS ---
  const addProperty = () => {
    const newProps = [...(aboutData.properties || []), { key: "new_attr", value: '"Value"' }];
    setAboutData({ ...aboutData, properties: newProps });
  };
  
  const updateProperty = (index: number, field: 'key' | 'value', text: string) => {
    const newProps = [...(aboutData.properties || [])];
    newProps[index][field] = text;
    setAboutData({ ...aboutData, properties: newProps });
  };

  const removeProperty = (index: number) => {
    const newProps = [...(aboutData.properties || [])];
    newProps.splice(index, 1);
    setAboutData({ ...aboutData, properties: newProps });
  };

  const addMethod = () => {
    const newMethods = [...(aboutData.methods || []), { name: "new_action", return: '"Result"', innerProps: [] }];
    setAboutData({ ...aboutData, methods: newMethods });
  };

  const updateMethod = (index: number, field: 'name' | 'return', text: string) => {
    const newMethods = [...(aboutData.methods || [])];
    newMethods[index][field] = text;
    setAboutData({ ...aboutData, methods: newMethods });
  };

  const removeMethod = (index: number) => {
    const newMethods = [...(aboutData.methods || [])];
    newMethods.splice(index, 1);
    setAboutData({ ...aboutData, methods: newMethods });
  };

  const addMethodInnerProp = (methodIndex: number) => {
    const newMethods = [...(aboutData.methods || [])];
    if (!newMethods[methodIndex].innerProps) newMethods[methodIndex].innerProps = [];
    newMethods[methodIndex].innerProps.push({ key: "variable", value: '"Data"' });
    setAboutData({ ...aboutData, methods: newMethods });
  };

  const updateMethodInnerProp = (methodIndex: number, propIndex: number, field: 'key' | 'value', text: string) => {
    const newMethods = [...(aboutData.methods || [])];
    newMethods[methodIndex].innerProps[propIndex][field] = text;
    setAboutData({ ...aboutData, methods: newMethods });
  };

  const removeMethodInnerProp = (methodIndex: number, propIndex: number) => {
    const newMethods = [...(aboutData.methods || [])];
    newMethods[methodIndex].innerProps.splice(propIndex, 1);
    setAboutData({ ...aboutData, methods: newMethods });
  };

  // Helper to safely access stats object
  const stats = aboutData.stats || {};
  const updateStats = (field: string, value: string) => {
    setAboutData({ ...aboutData, stats: { ...stats, [field]: value } });
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* 1. HEADER CONFIG */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
           <User size={18} className="text-accent"/> Header Configuration
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-slate-500 mb-1 block">Sub Heading</label>
            <input type="text" value={aboutData.subHeading || ''} onChange={(e) => setAboutData({...aboutData, subHeading: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" placeholder="01. About Me" />
          </div>
          <div>
            <label className="text-xs font-mono text-slate-500 mb-1 block">Main Heading</label>
            <input type="text" value={aboutData.heading || ''} onChange={(e) => setAboutData({...aboutData, heading: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" placeholder="My Story" />
          </div>
        </div>
      </div>

      {/* 2. STATS COUNTER CONTROL (NEW) */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
           <BarChart3 size={18} className="text-accent"/> Stats Counter Control
        </h4>
        <p className="text-xs text-slate-400 mb-4">Leave fields empty to use Automatic calculation from your data.</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-mono text-slate-500 mb-1 block">Experience Text</label>
            <input 
              type="text" 
              value={stats.experience || ''} 
              onChange={(e) => updateStats('experience', e.target.value)} 
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" 
              placeholder="e.g. Fresher / 1 Year" 
            />
          </div>
          <div>
            <label className="text-xs font-mono text-slate-500 mb-1 block">Projects Count Override</label>
            <input 
              type="text" 
              value={stats.projects || ''} 
              onChange={(e) => updateStats('projects', e.target.value)} 
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" 
              placeholder="Auto calculated if empty" 
            />
          </div>
          <div>
            <label className="text-xs font-mono text-slate-500 mb-1 block">Skills Count Override</label>
            <input 
              type="text" 
              value={stats.skills || ''} 
              onChange={(e) => updateStats('skills', e.target.value)} 
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" 
              placeholder="Auto calculated if empty" 
            />
          </div>
        </div>
      </div>

      {/* 3. PYTHON CLASS SIMULATOR */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
        <h4 className="text-white font-bold mb-6 flex items-center gap-2">
           <Terminal size={18} className="text-accent"/> Python Class Simulator
        </h4>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
           <div><label className="text-xs font-mono text-slate-500 mb-1 block">File Name (.py)</label><input type="text" value={aboutData.fileName || 'profile.py'} onChange={(e) => setAboutData({...aboutData, fileName: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-slate-300 font-mono text-sm" /></div>
           <div><label className="text-xs font-mono text-slate-500 mb-1 block">Class Name</label><input type="text" value={aboutData.className || 'Developer'} onChange={(e) => setAboutData({...aboutData, className: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-yellow-400 font-mono text-sm" /></div>
           <div><label className="text-xs font-mono text-slate-500 mb-1 block">Parent Class</label><input type="text" value={aboutData.parentClass || 'Person'} onChange={(e) => setAboutData({...aboutData, parentClass: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-teal-400 font-mono text-sm" /></div>
        </div>

        {/* __INIT__ Attributes */}
        <div className="mb-8 bg-[#0f172a]/50 p-4 rounded-xl border border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">__init__ Attributes</label>
            <button onClick={addProperty} className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1 rounded hover:bg-blue-500/20 flex items-center gap-1 transition-all"><Plus size={12}/> Add Attribute</button>
          </div>
          <div className="space-y-3">
             {aboutData.properties?.map((prop: any, i: number) => (
               <div key={i} className="flex items-center gap-2 group">
                 <span className="text-red-400 font-mono text-sm select-none">self.</span>
                 <input type="text" value={prop.key} onChange={(e) => updateProperty(i, 'key', e.target.value)} className="w-1/3 bg-[#1e293b] border border-slate-700 rounded p-2 text-slate-300 font-mono text-sm focus:border-accent" />
                 <span className="text-slate-500 select-none">=</span>
                 <input type="text" value={prop.value} onChange={(e) => updateProperty(i, 'value', e.target.value)} className="flex-1 bg-[#1e293b] border border-slate-700 rounded p-2 text-green-400 font-mono text-sm focus:border-accent" />
                 <button onClick={() => removeProperty(i)} className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-all"><X size={16}/></button>
               </div>
             ))}
          </div>
        </div>

        {/* Methods */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Class Methods</label>
            <button onClick={addMethod} className="text-xs bg-purple-500/10 text-purple-400 px-3 py-1 rounded hover:bg-purple-500/20 flex items-center gap-1 transition-all"><Plus size={12}/> Add Method</button>
          </div>
          <div className="space-y-4">
             {aboutData.methods?.map((method: any, i: number) => (
               <div key={i} className="bg-[#0f172a] p-4 rounded-lg border border-slate-800 relative hover:border-slate-600 transition-colors">
                 <div className="absolute top-3 right-3"><button onClick={() => removeMethod(i)} className="text-slate-600 hover:text-red-500 transition-colors"><X size={16}/></button></div>
                 
                 <div className="flex items-center gap-2 mb-4 pr-8">
                    <span className="text-purple-400 font-mono text-sm select-none">def</span>
                    <input type="text" value={method.name} onChange={(e) => updateMethod(i, 'name', e.target.value)} className="w-1/3 bg-[#1e293b] border border-slate-700 rounded p-1.5 text-blue-400 font-mono text-sm" />
                    <span className="text-slate-400 font-mono text-sm select-none">(self):</span>
                 </div>

                 <div className="pl-4 ml-2 mb-4 border-l-2 border-slate-800 space-y-2">
                    {method.innerProps?.map((inner: any, j: number) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-red-400 font-mono text-xs select-none">self.</span>
                        <input type="text" value={inner.key} onChange={(e) => updateMethodInnerProp(i, j, 'key', e.target.value)} className="w-24 bg-[#1e293b] border border-slate-700 rounded p-1 text-slate-300 font-mono text-xs" />
                        <span className="text-slate-500 text-xs select-none">=</span>
                        <input type="text" value={inner.value} onChange={(e) => updateMethodInnerProp(i, j, 'value', e.target.value)} className="flex-1 bg-[#1e293b] border border-slate-700 rounded p-1 text-green-400 font-mono text-xs" />
                        <button onClick={() => removeMethodInnerProp(i, j)} className="text-slate-600 hover:text-red-500"><X size={12}/></button>
                      </div>
                    ))}
                    <button onClick={() => addMethodInnerProp(i)} className="text-[10px] text-slate-500 hover:text-green-400 flex items-center gap-1 mt-2 transition-colors"><Plus size={10}/> Add Logic Line</button>
                 </div>

                 <div className="flex items-center gap-2 pl-4 ml-2 border-l-2 border-slate-800">
                    <span className="text-purple-400 font-mono text-sm select-none">return</span>
                    <input type="text" value={method.return} onChange={(e) => updateMethod(i, 'return', e.target.value)} className="flex-1 bg-[#1e293b] border border-slate-700 rounded p-1.5 text-green-400 font-mono text-sm" />
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 4. CONTENT & HIGHLIGHT SKILLS */}
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 shadow-lg">
        <h4 className="text-white font-bold mb-4 flex items-center gap-2"><FileCode size={18} className="text-accent"/> Text Content</h4>
        <div className="space-y-4 mb-6">
          <div><label className="text-xs font-mono text-slate-500 mb-1 block">Bio Paragraph 1</label><textarea value={aboutData.bio || ''} onChange={(e) => setAboutData({...aboutData, bio: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white h-24 focus:border-accent" /></div>
          <div><label className="text-xs font-mono text-slate-500 mb-1 block">Bio Paragraph 2</label><textarea value={aboutData.bio2 || ''} onChange={(e) => setAboutData({...aboutData, bio2: e.target.value})} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white h-24 focus:border-accent" /></div>
        </div>
        
        <div className="pt-4 mt-4 border-t border-slate-800">
           <div className="flex justify-between items-center mb-3">
             <label className="text-xs font-mono text-slate-500 uppercase tracking-wider">Top Tech Stack (Display Only)</label>
             <button onClick={() => setSkillsData([...skillsData, { name: "New" }])} className="text-xs bg-accent/10 text-accent px-3 py-1 rounded hover:bg-accent/20 flex items-center gap-1 transition-all"><Plus size={12}/> Add Tech</button>
           </div>
           <div className="flex flex-wrap gap-2">
             {skillsData.map((skill: any, index: number) => (
               <div key={index} className="flex items-center gap-1 bg-[#0f172a] px-3 py-1.5 rounded border border-slate-700 group focus-within:border-accent transition-colors">
                 <Layers size={12} className="text-slate-500 group-focus-within:text-accent"/>
                 <input type="text" value={skill.name} onChange={(e) => {const s = [...skillsData]; s[index].name = e.target.value; setSkillsData(s);}} className="bg-transparent border-none text-slate-200 text-xs w-24 focus:outline-none font-mono" placeholder="Skill"/>
                 <button onClick={() => {const s = [...skillsData]; s.splice(index, 1); setSkillsData(s);}} className="text-slate-600 hover:text-red-500 transition-colors"><X size={12}/></button>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;