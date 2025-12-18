import React from 'react';
import { Plus, Trash2, MapPin, Calendar, Briefcase, Building } from 'lucide-react';

interface Props {
  data: any[];
  setData: (data: any[]) => void;
}

const AdminExperience: React.FC<Props> = ({ data, setData }) => {

  // Helper to add new job
  const addExperience = () => {
    const newExp = {
      role: "Software Developer",
      company: "Tech Company",
      duration: "2023 - Present",
      location: "Remote",
      description: ["Worked on frontend development.", "Optimized database queries."]
    };
    setData([newExp, ...data]);
  };

  // Helper to remove job
  const removeExperience = (index: number) => {
    if (confirm("Delete this experience entry?")) {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }
  };

  // Helper to update fields
  const updateField = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="text-2xl font-bold text-white">Experience</h3>
        <button 
          onClick={addExperience}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
        >
          <Plus size={16}/> Add Job
        </button>
      </div>

      <div className="space-y-6">
        {data.map((exp: any, index: number) => (
          <div key={index} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 relative animate-fadeIn group">
            
            <button 
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-slate-500 hover:text-red-500 p-2 transition-colors"
              title="Delete"
            >
              <Trash2 size={20}/>
            </button>

            <h4 className="text-lg font-bold text-accent mb-6 flex items-center gap-2">
              <span className="bg-accent/10 p-1 rounded text-accent text-xs">#{index + 1}</span>
              {exp.company}
            </h4>

            <div className="space-y-4">
              {/* Row 1: Role & Company */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 flex items-center gap-1"><Briefcase size={12}/> Role</label>
                  <input 
                    type="text" 
                    value={exp.role || ''} 
                    onChange={(e) => updateField(index, 'role', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 flex items-center gap-1"><Building size={12}/> Company</label>
                  <input 
                    type="text" 
                    value={exp.company || ''} 
                    onChange={(e) => updateField(index, 'company', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-accent focus:border-accent"
                  />
                </div>
              </div>

              {/* Row 2: Duration & Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 flex items-center gap-1"><Calendar size={12}/> Duration</label>
                  <input 
                    type="text" 
                    value={exp.duration || ''} 
                    onChange={(e) => updateField(index, 'duration', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-slate-300 focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-500 mb-1 flex items-center gap-1"><MapPin size={12}/> Location</label>
                  <input 
                    type="text" 
                    value={exp.location || ''} 
                    onChange={(e) => updateField(index, 'location', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-slate-300 focus:border-accent"
                  />
                </div>
              </div>

              {/* Row 3: Description */}
              <div>
                <label className="text-xs font-mono text-slate-500 mb-1 block">Job Description (Bullet Points)</label>
                <p className="text-[10px] text-slate-600 mb-2">Har nayi line website par alag bullet point banegi.</p>
                <textarea 
                  value={Array.isArray(exp.description) ? exp.description.join('\n') : (exp.description || '')} 
                  onChange={(e) => updateField(index, 'description', e.target.value.split('\n'))}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white h-32 focus:border-accent leading-relaxed"
                  placeholder="• Developed new features...&#10;• Fixed bugs..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperience;