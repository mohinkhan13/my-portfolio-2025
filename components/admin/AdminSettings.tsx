import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  onPasswordChange: (newPass: string) => void;
}

const AdminSettings: React.FC<Props> = ({ onPasswordChange }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = () => {
    if (!newPassword || !confirmPassword) return alert("Fill both fields");
    if (newPassword !== confirmPassword) return alert("Passwords do not match");
    if (newPassword.length < 4) return alert("Password too short");
    
    onPasswordChange(newPassword);
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4 flex items-center gap-2"><ShieldCheck className="text-accent" /> Security Settings</h3>
      <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 max-w-xl">
        <h4 className="text-lg font-bold text-white mb-4">Change Admin Password</h4>
        <div className="space-y-4">
            <div><label className="block text-xs font-mono text-slate-500 mb-2">New Password</label><input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"/></div>
            <div><label className="block text-xs font-mono text-slate-500 mb-2">Confirm Password</label><input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-[#0f172a] border border-slate-700 rounded p-3 text-white focus:border-accent"/></div>
            <button onClick={handleSubmit} className="w-full py-3 bg-accent hover:bg-accentHover text-[#0f172a] font-bold rounded transition-colors mt-2">Update Password</button>
        </div>
      </div>
    </div>
  );
};
export default AdminSettings;