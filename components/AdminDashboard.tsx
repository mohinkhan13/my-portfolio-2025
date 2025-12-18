// src/components/AdminDashboard.tsx

import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { Save, RefreshCw, X, ChevronRight, Lock, Eye, EyeOff, User, Terminal, Briefcase, Layout, Phone, Settings, Cpu } from 'lucide-react';
import { compressImage } from '../src/utils/compressor'; 

// Import Sub-Components
import AdminHero from './admin/AdminHero';
import AdminAbout from './admin/AdminAbout';
import AdminSkills from './admin/AdminSkills'; // <-- New Import
import AdminExperience from './admin/AdminExperience';
import AdminProjects from './admin/AdminProjects';
import AdminContact from './admin/AdminContact';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const navigate = useNavigate();

  // AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');

  // DATA STATES
  const [activeTab, setActiveTab] = useState('hero');
  const [heroData, setHeroData] = useState(content.hero || {});
  const [aboutData, setAboutData] = useState(content.about || {});
  const [skillsData, setSkillsData] = useState(content.skills || []); // Dedicated State
  const [experienceData, setExperienceData] = useState(content.experience || []);
  const [projectsData, setProjectsData] = useState(content.projects || []);
  const [contactData, setContactData] = useState(content.contact || {});
  const [socialData, setSocialData] = useState(content.social || []);
  const [uploading, setUploading] = useState(false);

  // --- LOGIC ---

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDbPassword = content.settings?.password || "admin";
    if (passwordInput === currentDbPassword) {
      setIsAuthenticated(true);
    } else {
      setAuthError('Incorrect Password');
    }
  };

  const handleHeroUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const base64 = await compressImage(file);
        setHeroData({ ...heroData, imgUrl: base64 });
        alert("Image processed!");
      } catch (err) {
        alert("Image too large or invalid.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleProjectUpload = async (e: any, index: number, isCover: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const base64 = await compressImage(file);
        const newPro = [...projectsData];
        if (isCover) newPro[index].coverImage = base64;
        else newPro[index].gallery = [...(newPro[index].gallery || []), base64];
        setProjectsData(newPro);
      } catch (err) {
        alert("Failed to process image.");
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSave = () => {
    updateContent('hero', heroData);
    updateContent('about', aboutData);
    updateContent('skills', skillsData); // Saving Skills independently
    updateContent('experience', experienceData);
    updateContent('projects', projectsData);
    updateContent('contact', contactData);
    updateContent('social', socialData);
    alert('All Content Saved to Database!');
  };

  const handlePasswordChange = (newPass: string) => {
    updateContent('settings', { password: newPass });
    alert("Password updated! Remember it for next login.");
  };

  // --- RENDER ---

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#0f172a] flex items-center justify-center p-4">
        <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 shadow-2xl w-full max-w-md relative">
          <button onClick={() => navigate('/')} className="absolute top-4 right-4 text-slate-500 hover:text-white"><X size={24} /></button>
          <div className="text-center mb-8"><div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={32} className="text-accent" /></div><h2 className="text-2xl font-bold text-white">Admin Access</h2></div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Enter Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#0f172a] border border-slate-700 rounded-lg p-3 text-white focus:border-accent pr-12" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-500 hover:text-white">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
            {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
            <button type="submit" className="w-full bg-accent hover:bg-accentHover text-[#0f172a] font-bold py-3 rounded-lg">Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // UPDATED TABS LIST
  const tabs = [
    { id: 'hero', label: 'Hero', icon: User },
    { id: 'about', label: 'About', icon: Terminal },
    { id: 'skills', label: 'Skills', icon: Cpu }, // <-- Added Skills Tab
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-[#0f172a] text-slate-300 flex flex-col animate-fadeIn">
      {/* HEADER */}
      <div className="h-16 border-b border-slate-700 flex items-center justify-between px-6 bg-[#1e293b] shrink-0">
        <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" /><h2 className="font-mono text-white font-bold text-lg hidden sm:block">Admin Panel v4.0</h2></div>
        <div className="flex items-center gap-3">{uploading && <span className="text-accent text-xs animate-pulse">Compressing...</span>}<button onClick={resetContent} className="hidden md:flex items-center gap-2 text-xs text-slate-500 hover:text-red-400 mr-2"><RefreshCw size={14} /> Reset</button><button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 bg-accent text-[#0f172a] font-bold rounded hover:bg-accentHover shadow-lg shadow-accent/20 text-sm"><Save size={16} /> Save</button><button onClick={() => navigate('/')} className="p-2 hover:bg-slate-700 rounded-full text-slate-400 hover:text-white"><X size={20} /></button></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-20 md:w-64 border-r border-slate-700 bg-[#0f172a] overflow-y-auto shrink-0 pt-4">
          <div className="space-y-1 w-full px-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center md:justify-between ${activeTab === tab.id ? 'bg-accent/10 text-accent border border-accent/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <div className="flex items-center gap-3"><tab.icon size={18} /><span className="hidden md:inline">{tab.label}</span></div>
                {activeTab === tab.id && <ChevronRight size={14} className="hidden md:block" />}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-[#0a1120]">
          <div className="max-w-4xl mx-auto pb-20">
            {activeTab === 'hero' && <AdminHero data={heroData} setData={setHeroData} socialData={socialData} setSocialData={setSocialData} onImageUpload={handleHeroUpload} uploading={uploading} />}
            {activeTab === 'about' && <AdminAbout aboutData={aboutData} setAboutData={setAboutData} skillsData={[]} setSkillsData={() => {}} />} {/* Removed skills from About */}
            {activeTab === 'skills' && <AdminSkills data={skillsData} setData={setSkillsData} />} {/* <-- NEW */}
            {activeTab === 'experience' && <AdminExperience data={experienceData} setData={setExperienceData} />}
            {activeTab === 'projects' && <AdminProjects data={projectsData} setData={setProjectsData} onImageUpload={handleProjectUpload} />}
            {activeTab === 'contact' && <AdminContact data={contactData} setData={setContactData} />}
            {activeTab === 'settings' && <AdminSettings onPasswordChange={handlePasswordChange} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;