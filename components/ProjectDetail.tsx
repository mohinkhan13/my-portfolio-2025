import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { ArrowLeft, Github, Code2, Layers, Image as ImageIcon } from 'lucide-react';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { content } = useContent();
  
  const project = content.projects && content.projects[Number(id)];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 bg-[#0f172a]">
        <div className="text-center">
           <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
           <Link to="/#projects" className="text-accent hover:underline flex items-center justify-center gap-2">
             <ArrowLeft size={16} /> Back to Projects
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] pt-28 pb-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. TOP NAVIGATION */}
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-accent transition-colors mb-12 group font-mono text-sm uppercase tracking-wider"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>

        {/* 2. HEADER SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent font-mono text-sm px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
                {project.type}
              </span>
              <span className="text-slate-500 text-sm flex items-center gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                 Completed
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              {project.title}
            </h1>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech: string) => (
                <span 
                  key={tech} 
                  className="px-3 py-1.5 bg-[#1e293b] text-slate-300 text-sm rounded border border-slate-700 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons (ONLY SOURCE CODE NOW) */}
          <div className="flex flex-wrap gap-4 shrink-0">
            {project.repoUrl && (
              <a 
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#1e293b] hover:bg-slate-700 border border-slate-600 hover:border-slate-500 text-white rounded-lg transition-all transform hover:-translate-y-1"
              >
                <Github size={20} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* 3. HERO IMAGE */}
        {project.coverImage && (
          <div className="relative mb-16 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-[#1e293b] shadow-2xl">
              <img 
                src={project.coverImage} 
                alt={project.title} 
                className="w-full max-h-[600px] object-cover object-top"
              />
            </div>
          </div>
        )}

        {/* 4. CONTENT GRID */}
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Description */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center text-accent border border-slate-700">
                  <Code2 size={20} />
                </div>
                Project Overview
              </h3>
              <div className="prose prose-invert prose-lg max-w-none text-slate-400 leading-relaxed whitespace-pre-wrap">
                {project.fullDescription ? (
                  <p>{project.fullDescription}</p>
                ) : (
                  project.description?.map((para: string, i: number) => (
                    <p key={i} className="mb-4">{para}</p>
                  ))
                )}
              </div>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1e293b] flex items-center justify-center text-accent border border-slate-700">
                    <ImageIcon size={20} />
                  </div>
                  Snapshots
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.gallery.map((img: string, index: number) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-slate-700 hover:border-accent/50 transition-colors group cursor-zoom-in">
                      <img 
                        src={img} 
                        alt={`Gallery ${index + 1}`} 
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-8">
            <div className="bg-[#1e293b]/30 p-6 rounded-xl border border-slate-700 sticky top-24 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-700 pb-4">
                <Layers size={18} className="text-accent" /> Key Features
              </h3>
              
              <ul className="space-y-4">
                {project.features && project.features.length > 0 ? (
                  project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors shrink-0"></span>
                      <span className="text-slate-300 text-sm leading-relaxed group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-slate-500 italic text-sm">No features listed.</li>
                )}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;