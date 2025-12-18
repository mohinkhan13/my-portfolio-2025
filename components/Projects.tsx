import React from 'react';
import { useContent } from '../context/ContentContext';
import { Github, Folder, ArrowRight, Layers, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
  const { content } = useContent();
  const { projects } = content;

  return (
    <section id="projects" className="py-32 px-6 bg-[#0f172a]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-accent font-mono text-sm mb-2 flex items-center">
              <span className="text-accent/50 mr-2">03.</span> Portfolio
            </h3>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-accent mt-4 rounded"></div>
          </div>
          <p className="text-slate-400 max-w-md text-sm md:text-base leading-relaxed">
             A collection of projects highlighting my expertise in Full Stack Development, showcasing backend logic and frontend finesse.
          </p>
        </div>

        {/* PROJECTS GRID (Updated to 3 Columns) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any, index: number) => (
            <div 
              key={index} 
              className="group relative bg-[#1e293b] rounded-xl overflow-hidden border border-slate-700 hover:border-accent/40 transition-all duration-300 hover:shadow-[0_0_40px_rgba(45,212,191,0.1)] hover:-translate-y-2 flex flex-col h-full"
            >
              
              {/* Back Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              {/* Card Header (Minimal Folder Style) */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-700/50 bg-[#0f172a]/50 backdrop-blur-sm relative z-10">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                      <Folder size={18} />
                   </div>
                   <span className="text-xs font-mono text-slate-400 tracking-wide uppercase">{project.type}</span>
                </div>
                
                {/* Repo Link Icon */}
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer" 
                    className="text-slate-500 hover:text-white transition-colors" 
                    title="View Source Code"
                  >
                    <Github size={20} />
                  </a>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow relative z-10">
                
                {/* Title */}
                <Link to={`/project/${index}`} className="block mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors flex items-center gap-2">
                    {project.title}
                    <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent" />
                  </h3>
                </Link>

                {/* Short Description */}
                <div className="space-y-3 mb-6 flex-grow">
                   <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                     {project.description?.[0] || "A detailed project showcasing full stack capabilities."}
                   </p>
                </div>

                {/* Tech Stack (Compact) */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                  {project.techStack.slice(0, 4).map((tech: string) => (
                    <span 
                      key={tech} 
                      className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 group-hover:border-slate-600 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] font-mono text-slate-500 px-1 py-1">+</span>
                  )}
                </div>
              </div>

              {/* Bottom "View Project" Strip */}
              <Link 
                  to={`/project/${index}`}
                  className="px-6 py-3 bg-[#0f172a]/30 border-t border-slate-700/50 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-accent transition-colors relative z-10"
              >
                  <span className="flex items-center gap-2"><Layers size={14}/> View Case Study</span>
                  <Code2 size={14} className="group-hover:rotate-90 transition-transform duration-300"/>
              </Link>

            </div>
          ))}
        </div>

        {/* "See More" Button (Optional - jab projects jyada ho jayein) */}
        {projects.length > 6 && (
          <div className="mt-16 text-center">
            <button className="px-8 py-3 border border-accent text-accent rounded hover:bg-accent/10 transition-colors font-mono text-sm">
               Show More Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;