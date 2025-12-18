import React from 'react';
import { ChevronRight, ChevronDown, FileCode, FileJson, FileText, Folder } from 'lucide-react';

interface SidebarProps {
  activeFile: string;
  onFileSelect: (file: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeFile, onFileSelect }) => {
  const files = [
    { name: 'about.py', icon: FileCode, type: 'python' },
    { name: 'skills.py', icon: FileCode, type: 'python' },
    { name: 'experience.py', icon: FileCode, type: 'python' },
    { name: 'projects.py', icon: FileCode, type: 'python' },
    { name: 'contact.py', icon: FileCode, type: 'python' },
  ];

  return (
    <div className="w-64 bg-ide-sidebar border-r border-ide-border flex flex-col h-full select-none">
      <div className="p-3 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center">
        Explorer
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Project Folder */}
        <div>
          <div className="flex items-center px-2 py-1 text-gray-300 hover:bg-gray-700/50 cursor-pointer">
            <ChevronDown size={16} className="mr-1" />
            <span className="text-sm font-bold uppercase">MOHINKHAN_PORTFOLIO</span>
          </div>
          
          {/* Virtual Env Folder (Decorative) */}
          <div className="flex items-center px-6 py-1 text-gray-400 hover:bg-gray-700/50 cursor-pointer opacity-70">
            <ChevronRight size={16} className="mr-1" />
            <Folder size={16} className="mr-2 text-gray-500" />
            <span className="text-sm">venv</span>
          </div>

          {/* Src Folder */}
          <div className="flex items-center px-6 py-1 text-gray-300 hover:bg-gray-700/50 cursor-pointer">
            <ChevronDown size={16} className="mr-1" />
            <Folder size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">src</span>
          </div>

          {/* Files */}
          <div className="mt-1">
            {files.map((file) => (
              <div 
                key={file.name}
                onClick={() => onFileSelect(file.name)}
                className={`flex items-center px-10 py-1 cursor-pointer text-sm transition-colors ${
                  activeFile === file.name 
                    ? 'bg-ide-activity/50 text-white' 
                    : 'text-gray-400 hover:bg-gray-700/30 hover:text-gray-200'
                }`}
              >
                <file.icon 
                  size={16} 
                  className={`mr-2 ${
                    file.name.endsWith('py') ? 'text-yellow-400' : 
                    file.name.endsWith('json') ? 'text-yellow-200' : 'text-gray-400'
                  }`} 
                />
                {file.name}
              </div>
            ))}
          </div>

           {/* Static Files */}
           <div className="flex items-center px-10 py-1 text-gray-500 cursor-default text-sm">
            <FileText size={16} className="mr-2" />
            README.md
          </div>
           <div className="flex items-center px-10 py-1 text-gray-500 cursor-default text-sm">
            <FileText size={16} className="mr-2" />
            .gitignore
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;