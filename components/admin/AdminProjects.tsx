import React from 'react';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

interface Props {
  data: any[];
  setData: (data: any[]) => void;
  onImageUpload: (e: any, index: number, isCover: boolean) => void;
}

const AdminProjects: React.FC<Props> = ({ data, setData, onImageUpload }) => {
  
  // Helper to update a specific project field
  const updateProject = (index: number, field: string, value: any) => {
    const newProjects = [...data];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData(newProjects);
  };

  // Helper to add a new project
  const addProject = () => {
    const newProject = {
      title: "New Project",
      type: "Web App",
      techStack: ["React", "Tailwind"],
      description: ["Project summary..."],
      fullDescription: "",
      features: ["Feature 1"],
      gallery: [],
      repoUrl: "",
      liveUrl: ""
    };
    setData([newProject, ...data]);
  };

  // Helper to remove a project
  const removeProject = (index: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const newProjects = [...data];
      newProjects.splice(index, 1);
      setData(newProjects);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <h3 className="text-2xl font-bold text-white">Manage Projects</h3>
        <button 
          onClick={addProject}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-bold transition-colors"
        >
          <Plus size={16}/> Add Project
        </button>
      </div>

      {/* Projects List */}
      {data.map((project: any, index: number) => (
        <div key={index} className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 relative animate-fadeIn">
          
          {/* Delete Button */}
          <button 
            onClick={() => removeProject(index)}
            className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors p-2"
            title="Delete Project"
          >
            <Trash2 size={20}/>
          </button>

          <h4 className="text-lg font-bold text-accent mb-6 border-b border-slate-700/50 pb-2">
            Project #{index + 1}
          </h4>

          <div className="space-y-6">
            
            {/* Row 1: Title & Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-2">Project Title</label>
                <input 
                  type="text" 
                  value={project.title} 
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-2">Project Type</label>
                <input 
                  type="text" 
                  value={project.type} 
                  onChange={(e) => updateProject(index, 'type', e.target.value)}
                  className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
                />
              </div>
            </div>

            {/* Row 2: Cover Image */}
            <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800">
               <label className="block text-xs font-mono text-accent mb-3 flex items-center gap-2">
                 <ImageIcon size={14}/> Cover Image
               </label>
               <div className="flex items-center gap-6">
                  {project.coverImage ? (
                    <img src={project.coverImage} className="w-24 h-24 object-cover rounded border border-slate-700" alt="Cover" />
                  ) : (
                    <div className="w-24 h-24 bg-slate-800 rounded flex items-center justify-center text-slate-600 text-xs">No Image</div>
                  )}
                  <div>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => onImageUpload(e, index, true)} 
                      className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600"
                    />
                    <p className="text-[10px] text-slate-500 mt-2">Recommended: 1920x1080 (Compressed auto)</p>
                  </div>
               </div>
            </div>

            {/* Row 3: Description */}
            <div>
               <label className="block text-xs font-mono text-slate-500 mb-2">Short Description (Home Page)</label>
               <p className="text-[10px] text-slate-600 mb-1">Har nayi line ek alag paragraph banegi.</p>
               <textarea 
                 // FIX: Join array with newlines to show ALL paragraphs
                 value={project.description?.join('\n') || ''} 
                 onChange={(e) => {
                    const newPro = [...data];
                    // FIX: Split by newlines to save as Array
                    newPro[index].description = e.target.value.split('\n');
                    setData(newPro);
                 }} 
                 className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white h-32 focus:border-accent"
                 placeholder="Line 1&#10;Line 2&#10;Line 3"
               />
            </div>

            <div>
               <label className="block text-xs font-mono text-accent mb-2">Full Detailed Description (Detail Page)</label>
               <textarea 
                 value={project.fullDescription || ''} 
                 onChange={(e) => updateProject(index, 'fullDescription', e.target.value)}
                 className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white h-32 focus:border-accent"
                 placeholder="Write a detailed case study here..."
               />
            </div>

            {/* Row 4: Tech Stack */}
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-2">Tech Stack (comma separated)</label>
              <input 
                type="text" 
                value={project.techStack?.join(", ") || ""} 
                onChange={(e) => updateProject(index, 'techStack', e.target.value.split(",").map((t: string) => t.trim()))}
                className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"
                placeholder="React, Node.js, MongoDB..."
              />
            </div>

            {/* Row 5: Features List */}
            <div className="bg-[#0f172a]/50 p-4 rounded-lg border border-slate-800">
              <div className="flex justify-between mb-3">
                <label className="text-xs font-mono text-accent">Key Features</label>
                <button 
                  onClick={() => {
                    const newPro = [...data];
                    newPro[index].features = [...(newPro[index].features || []), "New Feature"];
                    setData(newPro);
                  }} 
                  className="text-xs text-blue-400 hover:text-white flex items-center gap-1"
                >
                  <Plus size={12}/> Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {project.features?.map((feat: string, fIndex: number) => (
                  <div key={fIndex} className="flex gap-2">
                    <input 
                      type="text" 
                      value={feat} 
                      onChange={(e) => {
                        const newPro = [...data];
                        newPro[index].features[fIndex] = e.target.value;
                        setData(newPro);
                      }} 
                      className="flex-1 bg-[#1e293b] border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-accent"
                    />
                    <button 
                      onClick={() => {
                         const newPro = [...data];
                         newPro[index].features.splice(fIndex, 1);
                         setData(newPro);
                      }} 
                      className="text-slate-500 hover:text-red-500 p-2"
                    >
                      <X size={16}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 6: Gallery Upload */}
            <div>
              <label className="block text-xs font-mono text-accent mb-3">Project Gallery Images</label>
              
              <div className="flex flex-wrap gap-3 mb-4">
                 {project.gallery?.map((img: string, gIndex: number) => (
                   <div key={gIndex} className="relative w-24 h-24 group rounded overflow-hidden border border-slate-600">
                      <img src={img} className="w-full h-full object-cover" alt="Gallery" />
                      <button 
                        onClick={() => {
                           const newPro = [...data];
                           newPro[index].gallery.splice(gIndex, 1);
                           setData(newPro);
                        }} 
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500"
                      >
                        <Trash2 size={16}/>
                      </button>
                   </div>
                 ))}
                 
                 {/* Upload Button Box */}
                 <div className="w-24 h-24 bg-[#0f172a] border border-dashed border-slate-600 rounded flex flex-col items-center justify-center text-slate-500 hover:border-accent hover:text-accent transition-colors relative">
                    <Plus size={24} />
                    <span className="text-[10px] mt-1">Add Image</span>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => onImageUpload(e, index, false)} 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                 </div>
              </div>
            </div>
            
            {/* Row 7: Links */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-700/50">
               <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2">GitHub Repo URL</label>
                  <input 
                    type="text" 
                    value={project.repoUrl || ''} 
                    onChange={(e) => updateProject(index, 'repoUrl', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-xs text-slate-300 focus:border-accent"
                    placeholder="https://github.com/..."
                  />
               </div>
               <div>
                  <label className="block text-xs font-mono text-slate-500 mb-2">Live Demo URL</label>
                  <input 
                    type="text" 
                    value={project.liveUrl || ''} 
                    onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                    className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-xs text-slate-300 focus:border-accent"
                    placeholder="https://..."
                  />
               </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminProjects;