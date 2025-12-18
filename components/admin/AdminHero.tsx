import React from 'react';
import { Upload, Image as ImageIcon, Github, Linkedin, Mail } from 'lucide-react';

interface Props {
  data: any;
  setData: (data: any) => void;
  socialData: any;
  setSocialData: (data: any) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  uploading: boolean;
}

const AdminHero: React.FC<Props> = ({ data, setData, socialData, setSocialData, onImageUpload, uploading }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Hero Section</h3>
      
      <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
        <label className="block text-sm font-mono text-slate-400 mb-4 flex items-center gap-2"><ImageIcon size={16}/> Profile Photo</label>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/50 bg-slate-800 shrink-0">
            <img src={data.imgUrl || "https://via.placeholder.com/150"} alt="Preview" className="w-full h-full object-cover"/>
          </div>
          <div className="w-full">
            <div className="relative">
              <input type="file" onChange={onImageUpload} accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm mb-3 w-full sm:w-auto justify-center pointer-events-none">
                <Upload size={14} /> {uploading ? "Compressing & Saving..." : "Upload New Photo"}
              </button>
            </div>
            <p className="text-xs text-slate-500">Image will be compressed and saved to Database directly.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div><label className="text-xs text-slate-500">Name</label><input type="text" value={data.name || ''} onChange={(e) => setData({...data, name: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent" /></div>
        <div><label className="text-xs text-slate-500">Tagline</label><textarea value={data.tagline || ''} onChange={(e) => setData({...data, tagline: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent h-20" /></div>
        <div><label className="text-xs text-slate-500">Summary</label><textarea value={data.summary || ''} onChange={(e) => setData({...data, summary: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent h-28" /></div>
      </div>

      <div className="pt-6 border-t border-slate-800">
         <h4 className="text-white font-bold mb-4">Social Links</h4>
         {socialData.map((link: any, index: number) => (
           <div key={index} className="flex gap-2 mb-2 items-center">
              <div className="w-8 flex justify-center text-slate-500">{link.name === 'Github' ? <Github size={18}/> : link.name === 'LinkedIn' ? <Linkedin size={18}/> : <Mail size={18}/>}</div>
              <input type="text" value={link.url} onChange={(e) => {
                const newSocial = [...socialData];
                newSocial[index].url = e.target.value;
                setSocialData(newSocial);
              }} className="flex-1 bg-[#1e293b] border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-accent" placeholder={`${link.name} URL`}/>
           </div>
         ))}
      </div>
    </div>
  );
};
export default AdminHero;