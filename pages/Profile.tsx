import React from 'react';
import { User, Mail, Phone, LogOut, ArrowLeft } from 'lucide-react';

interface ProfileProps {
    user: {
        name: string;
        email: string;
        mobile: string;
    };
    onBack: () => void;
    onLogout: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onBack, onLogout }) => {
    return (
        <div className="pb-20 relative overflow-hidden bg-midnight min-h-full">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-midnight/70 via-midnight/85 to-midnight"></div>

            <div className="p-6 relative z-10">
                {/* Header */}
                <header className="mb-8 flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-gold-400 hover:border-gold-500/50 transition-all"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="font-display text-2xl text-gold-400">My Profile</h2>
                </header>

                {/* Profile Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-xl mb-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 p-1 mb-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                            <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center border-4 border-midnight">
                                <span className="font-display text-4xl text-gold-400 font-bold">{user.name.charAt(0)}</span>
                            </div>
                        </div>
                        <h3 className="font-display text-xl text-white mb-1">{user.name}</h3>
                        <p className="text-gold-500/70 text-xs uppercase tracking-widest font-medium">Member</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                                <User size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Full Name</p>
                                <p className="text-slate-200 font-medium">{user.name}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Email Address</p>
                                <p className="text-slate-200 font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
                                <Phone size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Mobile Number</p>
                                <p className="text-slate-200 font-medium">{user.mobile}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <button
                    onClick={onLogout}
                    className="w-full py-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 font-medium hover:bg-red-500/20 hover:border-red-500/50 transition-all flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};
