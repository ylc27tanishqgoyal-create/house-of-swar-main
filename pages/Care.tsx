import React, { useState, useEffect } from 'react';
import { Music, Plus, X, Calendar, MapPin, ShieldCheck, Clock, Sparkles, MessageCircle, BookOpen, Droplets, Wind, AlertCircle, Pencil, Trash2, Loader2 } from 'lucide-react';
import { InstrumentType } from '../types';
import { supabase } from '../src/lib/supabaseClient';

// TypeScript interface matching the Supabase Instrument table
interface Instrument {
    id: number;
    created_at: string;
    user_id: string | null;
    instrument_type: string;
    instrument_name: string;
    purchase_date: string;
    purchase_location: string | null;
    warranty_expiry: string;
    next_tuning_date: string;
}

interface CareProps {
    user: {
        name: string;
        email: string;
        mobile: string;
    };
}

const careKnowledge = [
    {
        title: "How Often Should You Tune a Sitar?",
        description: "Quick guide on maintaining tonal quality.",
        icon: Music,
    },
    {
        title: "Signs Your Instrument Needs Attention",
        description: "Buzzing, dullness, slipping pegs, humidity issues.",
        icon: AlertCircle,
    },
    {
        title: "Humidity & Storage Best Practices",
        description: "Ideal humidity, cases, cloth wraps, placement.",
        icon: Droplets,
    },
    {
        title: "Cleaning & Wood Care",
        description: "How to clean without damaging polish or bridges.",
        icon: Wind,
    },
];

export const Care: React.FC<CareProps> = ({ user }) => {
    // Generate a consistent UUID for the user based on their email
    const getUserUUID = (email: string): string => {
        const storageKey = `user_uuid_${email}`;
        let uuid = localStorage.getItem(storageKey);

        if (!uuid) {
            // Generate a new UUID and store it
            uuid = crypto.randomUUID();
            localStorage.setItem(storageKey, uuid);
        }

        return uuid;
    };

    const userUUID = getUserUUID(user.email);
    const [instruments, setInstruments] = useState<Instrument[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Delete confirmation state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        type: '' as InstrumentType | '',
        name: '',
        purchaseDate: '',
        city: '',
    });

    const instrumentTypes: InstrumentType[] = ["Sitar", "Sarod", "Tabla", "Santoor", "Bansuri", "Harmonium", "Other"];

    // Fetch instruments on mount or when user changes
    useEffect(() => {
        loadInstruments();
    }, [user.email]);

    const loadInstruments = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('Instrument')
                .select('*')
                .eq('user_id', userUUID)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Failed to load instruments:", error);
            } else {
                setInstruments(data || []);
            }
        } catch (error) {
            console.error("Failed to load instruments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.type || !formData.name || !formData.purchaseDate) {
            alert('Please fill in all required fields');
            return;
        }

        setIsLoading(true);
        try {
            // Calculate dates
            const purchase = new Date(formData.purchaseDate);
            const warrantyEnd = new Date(purchase);
            warrantyEnd.setFullYear(warrantyEnd.getFullYear() + 1);

            const nextTuning = new Date(purchase);
            nextTuning.setMonth(nextTuning.getMonth() + 6);

            const instrumentData = {
                user_id: userUUID,
                instrument_type: formData.type as InstrumentType,
                instrument_name: formData.name,
                purchase_date: formData.purchaseDate,
                purchase_location: formData.city || null,
                warranty_expiry: warrantyEnd.toISOString().split('T')[0],
                next_tuning_date: nextTuning.toISOString().split('T')[0],
            };

            if (editingId) {
                // Update existing instrument
                const { error } = await supabase
                    .from('Instrument')
                    .update(instrumentData)
                    .eq('id', editingId)
                    .eq('user_id', userUUID);

                if (error) {
                    console.error("Failed to update instrument:", error);
                    alert('Failed to update instrument. Please try again.');
                    setIsLoading(false);
                    return;
                }
            } else {
                // Insert new instrument
                const { data, error } = await supabase
                    .from('Instrument')
                    .insert([instrumentData])
                    .select();

                if (error) {
                    console.error("Failed to create instrument. Full error:", error);
                    console.error("Error details:", {
                        message: error.message,
                        details: error.details,
                        hint: error.hint,
                        code: error.code
                    });
                    alert(`Failed to create instrument: ${error.message || 'Please try again.'}`);
                    setIsLoading(false);
                    return;
                }

                console.log("Successfully created instrument:", data);
            }

            await loadInstruments();
            handleCancel();
        } catch (error) {
            console.error("Failed to save instrument:", error);
            alert('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handleEdit = (instrument: Instrument) => {
        setFormData({
            type: instrument.instrument_type,
            name: instrument.instrument_name,
            purchaseDate: instrument.purchase_date,
            city: instrument.purchase_location || '',
        });
        setEditingId(instrument.id);
        setShowForm(true);
    };

    const handleDeleteClick = (id: number) => {
        setDeleteId(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;

        setIsLoading(true);
        try {
            const { error } = await supabase
                .from('Instrument')
                .delete()
                .eq('id', deleteId)
                .eq('user_id', userUUID);

            if (error) {
                console.error("Failed to delete instrument:", error);
                alert('Failed to delete instrument. Please try again.');
                setIsLoading(false);
                return;
            }

            await loadInstruments();
            setShowDeleteConfirm(false);
            setDeleteId(null);
        } catch (error) {
            console.error("Failed to delete instrument:", error);
            alert('An unexpected error occurred. Please try again.');
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({ type: '', name: '', purchaseDate: '', city: '' });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const getWarrantyStatus = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const isActive = today <= expiry;

        return {
            isActive,
            expiryDate: formatDate(expiryDate),
        };
    };

    const getTuningStatus = (nextDate: string) => {
        const next = new Date(nextDate);
        const today = new Date();
        const isDue = today >= next;

        return {
            isDue,
            nextDate: formatDate(nextDate),
        };
    };

    return (
        <div className="pb-20 p-6 space-y-8">
            {/* HERO SECTION */}
            <div className="relative bg-gradient-to-br from-charcoal/80 to-surface/40 backdrop-blur-sm border-2 border-gold-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(212,175,55,0.2)] mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
                        <Sparkles size={28} className="text-gold-400" />
                    </div>
                    <div>
                        <h1 className="font-serif text-3xl text-gold-400 mb-1">Your Instrument Guide</h1>
                        <p className="text-slate-400 text-sm font-light">
                            Personalized care, warranty tracking, and tuning support for your instruments.
                        </p>
                    </div>
                </div>
            </div>

            {/* LOADING STATE */}
            {isLoading && instruments.length === 0 && (
                <div className="flex justify-center py-12">
                    <Loader2 size={40} className="text-gold-400 animate-spin" />
                </div>
            )}

            {/* EMPTY STATE */}
            {!isLoading && instruments.length === 0 && !showForm && (
                <div className="bg-charcoal/60 backdrop-blur-sm border border-white/5 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <div className="w-20 h-20 mx-auto bg-gold-500/10 rounded-full flex items-center justify-center mb-6 border-2 border-gold-500/30">
                        <Music size={36} className="text-gold-400" />
                    </div>
                    <h2 className="font-serif text-2xl text-white mb-3">No Instruments Registered Yet</h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                        Your instruments deserve world-class care. Register one to enable warranty tracking, tuning reminders, and personalized maintenance guidance.
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="px-8 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-widest text-sm rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] transition-all"
                    >
                        <Plus size={18} className="inline mr-2" />
                        Register Instrument
                    </button>
                </div>
            )}

            {/* REGISTRATION/EDIT FORM */}
            {showForm && (
                <div className="bg-gradient-to-br from-charcoal/90 to-surface/50 backdrop-blur-md border-2 border-gold-500/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-serif text-2xl text-gold-400">
                            {editingId ? 'Edit Instrument' : 'Register Your Instrument'}
                        </h3>
                        <button
                            onClick={handleCancel}
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        >
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gold-400 mb-2">
                                Instrument Type <span className="text-red-400">*</span>
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as InstrumentType })}
                                className="w-full px-4 py-3 bg-charcoal/80 border border-gold-500/20 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                                required
                            >
                                <option value="">Select instrument type</option>
                                {instrumentTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gold-400 mb-2">
                                Instrument Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="e.g. Kashmir Walnut Santoor"
                                className="w-full px-4 py-3 bg-charcoal/80 border border-gold-500/20 rounded-lg text-white placeholder-slate-500 focus:border-gold-500/50 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gold-400 mb-2">
                                Purchase Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="date"
                                value={formData.purchaseDate}
                                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                                className="w-full px-4 py-3 bg-charcoal/80 border border-gold-500/20 rounded-lg text-white focus:border-gold-500/50 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gold-400 mb-2">
                                Purchase Location <span className="text-slate-500 text-xs">(optional)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                placeholder="e.g. Delhi, India"
                                className="w-full px-4 py-3 bg-charcoal/80 border border-gold-500/20 rounded-lg text-white placeholder-slate-500 focus:border-gold-500/50 focus:outline-none transition-colors"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-widest text-sm rounded-lg shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:shadow-[0_0_40px_rgba(212,175,55,0.8)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : null}
                                {editingId ? 'Save Changes' : 'Save Instrument'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={isLoading}
                                className="px-8 py-4 bg-white/10 border border-gold-500/30 text-slate-300 font-medium rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* DELETE CONFIRMATION DIALOG */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-charcoal border border-gold-500/30 rounded-2xl p-6 max-w-sm w-full shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <h3 className="font-serif text-xl text-white mb-2">Delete Instrument?</h3>
                        <p className="text-slate-400 text-sm mb-6">
                            Remove this instrument from your care hub? This will delete its warranty tracking and tuning reminders.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={confirmDelete}
                                className="flex-1 py-3 bg-red-500/20 border border-red-500/50 text-red-400 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-red-500/30 transition-all"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => { setShowDeleteConfirm(false); setDeleteId(null); }}
                                className="flex-1 py-3 bg-white/10 border border-white/10 text-slate-300 font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-white/20 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* REGISTERED INSTRUMENTS LIST */}
            {!isLoading && instruments.length > 0 && !showForm && (
                <div className="space-y-6">
                    {instruments.map((instrument) => {
                        const warranty = getWarrantyStatus(instrument.warranty_expiry);
                        const tuning = getTuningStatus(instrument.next_tuning_date);

                        return (
                            <div
                                key={instrument.id}
                                className="bg-gradient-to-br from-charcoal/70 to-surface/30 backdrop-blur-sm border border-gold-500/20 rounded-3xl p-6 shadow-[0_0_35px_rgba(212,175,55,0.2)] hover:border-gold-500/40 transition-all relative group"
                            >
                                {/* Edit/Delete Controls */}
                                <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(instrument)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-gold-500/20 text-slate-400 hover:text-gold-400 transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(instrument.id)}
                                        className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>

                                {/* Header */}
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-14 h-14 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center shrink-0">
                                        <Music size={24} className="text-gold-400" />
                                    </div>
                                    <div className="flex-1 pr-16"> {/* Added padding-right to avoid overlap with controls */}
                                        <span className="inline-block text-[10px] font-bold text-gold-500 uppercase tracking-widest px-3 py-1 bg-gold-500/10 rounded-full mb-2">
                                            {instrument.instrument_type}
                                        </span>
                                        <h3 className="font-serif text-2xl text-white mb-2">{instrument.instrument_name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar size={12} className="text-gold-400" />
                                                <span>{formatDate(instrument.purchase_date)}</span>
                                            </div>
                                            {instrument.purchase_location && (
                                                <>
                                                    <span>·</span>
                                                    <div className="flex items-center gap-1">
                                                        <MapPin size={12} className="text-gold-400" />
                                                        <span>{instrument.purchase_location}</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Warranty Section */}
                                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-gold-400" />
                                            <span className="text-sm font-medium text-white">Warranty Status</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${warranty.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {warranty.isActive ? 'Active' : 'Expired'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-1">
                                        {warranty.isActive ? 'Expires on' : 'Ended on'}: <span className="text-gold-400">{warranty.expiryDate}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-500 italic">
                                        Enjoy priority support and verified service during your coverage.
                                    </p>
                                </div>

                                {/* Tuning Section */}
                                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/5">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gold-400" />
                                            <span className="text-sm font-medium text-white">Tuning Health</span>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${tuning.isDue ? 'bg-amber-500/20 text-amber-400' : 'bg-green-500/20 text-green-400'}`}>
                                            {tuning.isDue ? 'Due Soon' : 'OK'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 mb-1">
                                        Next recommended tuning: <span className="text-gold-400">{tuning.nextDate}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-500 italic">
                                        Regular tuning ensures optimal tone and resonance.
                                    </p>
                                </div>

                                {/* View Care Guide Button */}
                                <button className="w-full py-3 bg-transparent border-2 border-gold-500/30 text-gold-400 font-medium text-sm rounded-lg hover:bg-gold-500/10 hover:border-gold-500/50 transition-all">
                                    View Care Guide
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Register New Button (when instruments exist) */}
            {!isLoading && instruments.length > 0 && !showForm && (
                <button
                    onClick={() => {
                        setEditingId(null);
                        setFormData({ type: '', name: '', purchaseDate: '', city: '' });
                        setShowForm(true);
                    }}
                    className="w-full py-4 bg-white/10 border-2 border-gold-500/30 text-gold-400 font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-gold-500/10 hover:border-gold-500/50 transition-all flex items-center justify-center gap-2"
                >
                    <Plus size={18} />
                    Register Another Instrument
                </button>
            )}
        </div>
    );
};
