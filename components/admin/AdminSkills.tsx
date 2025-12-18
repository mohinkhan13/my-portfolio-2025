import React, { useState } from 'react';
import { Plus, Trash2, Cpu, Code2, Database, Layout, Server, Shield, Terminal, Percent, Edit2, X } from 'lucide-react';

interface Props {
  data: any[];
  setData: (data: any[]) => void;
}

const AdminSkills: React.FC<Props> = ({ data, setData }) => {
  const initialFormState = { name: '', category: 'Frontend', level: 'Intermediate', percentage: 50 };
  
  const [formData, setFormData] = useState(initialFormState);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const categories = ["Frontend", "Backend", "Database", "Tools", "Languages"];
  const levels = ["Expert", "Advanced", "Intermediate", "Beginner"];

  // --- HANDLERS ---

  const handleSubmit = () => {
    if (!formData.name) return alert("Skill Name is required!");

    const updatedData = [...data];

    if (editingIndex !== null) {
      // UPDATE EXISTING SKILL
      updatedData[editingIndex] = formData;
      setEditingIndex(null); // Exit edit mode
    } else {
      // ADD NEW SKILL
      updatedData.push(formData);
    }

    setData(updatedData);
    setFormData(initialFormState); // Reset form
  };

  const handleEdit = (index: number) => {
    setFormData(data[index]); // Fill form with selected skill data
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to form
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
      // If deleting the item currently being edited, reset form
      if (editingIndex === index) {
        setEditingIndex(null);
        setFormData(initialFormState);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/10 rounded-lg text-accent">
          <Cpu size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Skills Management</h2>
          <p className="text-slate-400 text-sm">Add, Edit, or Remove skills from your stack.</p>
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className={`p-6 rounded-xl border shadow-xl transition-all ${editingIndex !== null ? 'bg-blue-900/20 border-blue-500/50' : 'bg-[#1e293b] border-slate-700'}`}>
        
        {/* Form Title */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold flex items-center gap-2">
            {editingIndex !== null ? <Edit2 size={18} className="text-blue-400" /> : <Plus size={18} className="text-accent" />} 
            {editingIndex !== null ? 'Update Existing Skill' : 'Add New Skill'}
          </h3>
          {editingIndex !== null && (
            <button onClick={handleCancelEdit} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <X size={14} /> Cancel
            </button>
          )}
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Name */}
          <div className="md:col-span-4">
            <label className="text-xs font-mono text-slate-500 mb-1 block">Skill Name</label>
            <input 
              type="text" 
              placeholder="e.g. React.js" 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent" 
            />
          </div>

          {/* Category */}
          <div className="md:col-span-3">
            <label className="text-xs font-mono text-slate-500 mb-1 block">Category</label>
            <select 
              value={formData.category} 
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Level Label */}
          <div className="md:col-span-3">
            <label className="text-xs font-mono text-slate-500 mb-1 block">Level Label</label>
            <select 
              value={formData.level} 
              onChange={(e) => setFormData({...formData, level: e.target.value})}
              className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
            >
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Percentage Input */}
          <div className="md:col-span-2">
            <label className="text-xs font-mono text-slate-500 mb-1 block">Proficiency (%)</label>
            <div className="relative">
              <Percent size={14} className="absolute right-3 top-3.5 text-slate-500" />
              <input 
                type="number" 
                min="0" max="100"
                value={formData.percentage} 
                onChange={(e) => setFormData({...formData, percentage: Number(e.target.value)})}
                className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-accent font-bold focus:border-accent" 
              />
            </div>
          </div>

          {/* Range Slider */}
          <div className="md:col-span-12">
             <input 
               type="range" 
               min="0" max="100" 
               value={formData.percentage} 
               onChange={(e) => setFormData({...formData, percentage: Number(e.target.value)})}
               className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-accent"
             />
          </div>

        </div>
        
        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          className={`mt-4 w-full font-bold py-3 rounded-lg transition-all shadow-lg ${
            editingIndex !== null 
              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20' 
              : 'bg-accent hover:bg-accentHover text-[#0f172a] shadow-accent/20'
          }`}
        >
          {editingIndex !== null ? 'Update Skill' : 'Add Skill'}
        </button>
      </div>

      {/* SKILLS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((skill: any, index: number) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 bg-[#1e293b] border rounded-lg group transition-colors ${
              editingIndex === index ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-slate-700 hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-4 w-full">
              <div className={`p-2.5 rounded bg-[#0f172a] text-slate-400 border border-slate-700 shrink-0`}>
                 {skill.category === 'Frontend' && <Layout size={18}/>}
                 {skill.category === 'Backend' && <Server size={18}/>}
                 {skill.category === 'Database' && <Database size={18}/>}
                 {skill.category === 'Tools' && <Terminal size={18}/>}
                 {!['Frontend','Backend','Database','Tools'].includes(skill.category) && <Code2 size={18}/>}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                   <h4 className="text-white font-bold">{skill.name}</h4>
                   <span className="text-accent font-mono font-bold text-sm">{skill.percentage || 50}%</span>
                </div>
                
                {/* Visual Bar */}
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden mb-1">
                   <div className="h-full bg-accent" style={{ width: `${skill.percentage || 50}%` }}></div>
                </div>
                
                <div className="flex gap-2 text-[10px] font-mono text-slate-500 uppercase">
                  <span>{skill.category}</span> • <span>{skill.level}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-4">
              <button 
                onClick={() => handleEdit(index)} 
                className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-full transition-all"
                title="Edit"
              >
                <Edit2 size={18} />
              </button>
              <button 
                onClick={() => handleDelete(index)} 
                className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-slate-500 text-center col-span-full py-10">No skills available. Add some above!</p>
        )}
      </div>

    </div>
  );
};

export default AdminSkills;