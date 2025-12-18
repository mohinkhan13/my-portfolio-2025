import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  Send, Mail, User, MessageSquare, Copy, Check, Terminal, 
  Github, Linkedin, Twitter, ExternalLink, Cpu, Minimize2, Maximize2, X, Loader, Wifi 
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const { content } = useContent();
  const { contact, social } = content;
  
  // --- FORM STATE (For Live Terminal Sync) ---
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // --- EMAIL SENDING STATE ---
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  // Helper: Copy Function
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Helper: Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- SEND EMAIL FUNCTION ---
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError('');

    // NOTE: Replace with your actual EmailJS credentials
    const SERVICE_ID = 'service_tnzzenr'; 
    const TEMPLATE_ID = 'template_z75zyzr'; 
    const PUBLIC_KEY = 'nI3q4y08SHyRHqlp8'; 

    if (formRef.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(() => {
            setIsSending(false);
            setIsSent(true);
            setFormData({ user_name: '', user_email: '', message: '' }); // Clear state
            formRef.current?.reset();
            setTimeout(() => setIsSent(false), 5000);
        }, (err) => {
            console.error(err);
            setIsSending(false);
            setError('Transmission Error. System Offline.');
        });
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[#080c14] relative overflow-hidden">
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(45,212,191,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-800/50 text-slate-400 font-mono text-xs mb-4">
             <span className="relative flex h-2 w-2">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
             </span>
             <span>UPLINK ESTABLISHED</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-500">Contact</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Ready to collaborate? Execute the protocol below to establish a direct connection.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN: LIVE DATA TERMINAL */}
            <div className="relative group perspective-1000 order-2 lg:order-1">
                <div className="relative bg-[#0b101b] border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-1">
                    
                    {/* Terminal Header */}
                    <div className="bg-[#151b2b] px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                           <Terminal size={12} className="text-accent" /> packet_sniffer.json
                        </div>
                        <Wifi size={14} className="text-slate-600" />
                    </div>

                    {/* Live JSON Content */}
                    <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-relaxed bg-[#0b101b] min-h-[350px] overflow-x-auto">
                        <div className="text-slate-500">{"{"}</div>
                        
                        {/* Static Info */}
                        <div className="pl-6 text-slate-400 opacity-50">
                           <span className="text-purple-400">"target"</span>: <span className="text-green-400">"{contact.email[0]}"</span>,
                        </div>
                        <div className="pl-6 text-slate-400 opacity-50 mb-4">
                           <span className="text-purple-400">"status"</span>: <span className="text-yellow-400">"Listening..."</span>,
                        </div>

                        {/* LIVE TYPING DATA */}
                        <div className="pl-6 border-l-2 border-accent/20 ml-2 py-2">
                            <div className="text-slate-300">
                               <span className="text-purple-400">"sender_name"</span>: <span className="text-blue-400">"{formData.user_name || 'waiting_for_input...'}"</span>,
                            </div>
                            <div className="text-slate-300">
                               <span className="text-purple-400">"sender_email"</span>: <span className="text-blue-400">"{formData.user_email || 'waiting_for_input...'}"</span>,
                            </div>
                            <div className="text-slate-300 flex">
                               <span className="text-purple-400 whitespace-nowrap">"payload"</span>: 
                               <span className="text-orange-400 ml-2 break-all">"{formData.message || 'waiting_for_data...'}"</span>
                            </div>
                        </div>

                        <div className="text-slate-500 mt-4">{"}"}</div>
                        
                        {/* Cursor */}
                        <div className="mt-2 text-accent text-xs animate-pulse">
                           _ processing data stream
                        </div>

                        {/* Copy Buttons */}
                        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-4">
                              <button onClick={() => handleCopy(contact.email[0], 'email')} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-all border border-slate-700">
                                 {copiedField === 'email' ? <Check size={12} className="text-green-500"/> : <Copy size={12} />} Copy My Email
                              </button>
                              <button onClick={() => handleCopy(contact.phone, 'phone')} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-300 transition-all border border-slate-700">
                                 {copiedField === 'phone' ? <Check size={12} className="text-green-500"/> : <Copy size={12} />} Copy Phone
                              </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE FORM */}
            <div className="space-y-8 order-1 lg:order-2">
                
                <div className="relative bg-[#0f1623]/80 backdrop-blur-md border border-slate-700/50 p-8 rounded-2xl group hover:border-accent/30 transition-all shadow-xl">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Cpu size={80} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                       <Mail size={24} className="text-accent" /> Transmit Message
                    </h3>
                    
                    {/* REAL FORM */}
                    <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                       
                       {/* Name */}
                       <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-500 ml-1">SENDER IDENTITY</label>
                          <div className="relative group/input">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors">
                                <User size={18} />
                             </div>
                             <input 
                               required 
                               name="user_name" 
                               type="text" 
                               placeholder="Enter your full name" 
                               value={formData.user_name}
                               onChange={handleChange}
                               className="w-full bg-[#0b101b] border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-slate-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none text-sm font-mono transition-all placeholder:text-slate-600" 
                             />
                          </div>
                       </div>

                       {/* Email */}
                       <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-500 ml-1">RETURN ADDRESS (EMAIL)</label>
                          <div className="relative group/input">
                             <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-accent transition-colors">
                                <Mail size={18} />
                             </div>
                             <input 
                               required 
                               name="user_email" 
                               type="email" 
                               placeholder="name@example.com" 
                               value={formData.user_email}
                               onChange={handleChange}
                               className="w-full bg-[#0b101b] border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-slate-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none text-sm font-mono transition-all placeholder:text-slate-600" 
                             />
                          </div>
                       </div>

                       {/* Message */}
                       <div className="space-y-2">
                          <label className="text-xs font-mono text-slate-500 ml-1">DATA PAYLOAD</label>
                          <div className="relative group/input">
                             <div className="absolute left-4 top-4 text-slate-500 group-focus-within/input:text-accent transition-colors">
                                <MessageSquare size={18} />
                             </div>
                             <textarea 
                               required 
                               name="message" 
                               rows={4} 
                               placeholder="Type your message here..." 
                               value={formData.message}
                               onChange={handleChange}
                               className="w-full bg-[#0b101b] border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-slate-200 focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none text-sm font-mono resize-none transition-all placeholder:text-slate-600"
                             ></textarea>
                          </div>
                       </div>
                       
                       {/* STATUS & BUTTON */}
                       <div className="pt-2">
                          <div className="flex justify-between text-[10px] font-mono text-slate-500 mb-2 uppercase">
                             <span>System Status: {isSent ? 'Sent' : isSending ? 'Busy' : 'Ready'}</span>
                             <span>Encryption: TLS 1.3</span>
                          </div>
                          
                          <button 
                            type="submit" 
                            disabled={isSending || isSent}
                            className={`w-full py-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                                isSent 
                                ? 'bg-green-500 text-white cursor-default' 
                                : 'bg-accent hover:bg-accentHover text-[#0b1121] shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)]'
                            }`}
                          >
                             {isSending ? (
                                <> <Loader size={18} className="animate-spin" /> UPLOADING... </>
                             ) : isSent ? (
                                <> <Check size={18} /> TRANSMISSION SUCCESSFUL </>
                             ) : (
                                <> <span>INITIATE UPLOAD</span> <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> </>
                             )}
                          </button>
                       </div>

                       {error && <p className="text-red-400 text-xs text-center font-mono mt-2 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
                    </form>
                </div>

                {/* SOCIAL LINKS */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                   {social.map((link: any, idx: number) => {
                      let Icon = ExternalLink;
                      if (link.icon.toLowerCase().includes('github')) Icon = Github;
                      if (link.icon.toLowerCase().includes('linkedin')) Icon = Linkedin;
                      if (link.icon.toLowerCase().includes('twitter')) Icon = Twitter;

                      return (
                        <a 
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-[#1e293b]/50 border border-slate-700 rounded-lg hover:border-accent hover:bg-[#1e293b] hover:-translate-y-1 transition-all group/icon"
                        >
                           <Icon size={16} className="text-slate-400 group-hover/icon:text-accent transition-colors" />
                           <span className="text-xs font-mono text-slate-300">{link.name}</span>
                        </a>
                      )
                   })}
                </div>

            </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;