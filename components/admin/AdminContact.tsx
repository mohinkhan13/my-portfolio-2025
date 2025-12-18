import React from 'react';

interface Props {
  data: any;
  setData: (data: any) => void;
}

const AdminContact: React.FC<Props> = ({ data, setData }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Contact Details</h3>
      <div className="grid gap-6">
        <div><label className="block text-sm font-mono text-slate-400 mb-2">Phone</label><input type="text" value={data.phone || ''} onChange={(e) => setData({...data, phone: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent" /></div>
        <div><label className="block text-sm font-mono text-slate-400 mb-2">Email</label><input type="text" value={data.email?.[0] || ''} onChange={(e) => {const newEmail = [...(data.email || [])];newEmail[0] = e.target.value;setData({...data, email: newEmail});}} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent" /></div>
        <div><label className="block text-sm font-mono text-slate-400 mb-2">Address</label><input type="text" value={data.address || ''} onChange={(e) => setData({...data, address: e.target.value})} className="w-full bg-[#1e293b] border border-slate-700 rounded p-3 text-white focus:border-accent" /></div>
      </div>
    </div>
  );
};
export default AdminContact;