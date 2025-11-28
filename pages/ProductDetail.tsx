import React, { useState } from 'react';
import { Instrument } from '../types';
import { ArrowLeft, Play, Pause, ShieldCheck, Truck, PenTool, CheckCircle, ChevronRight, Package, Award, Sparkles, Phone, X } from 'lucide-react';

interface ProductDetailProps {
    instrument: Instrument;
    onBack: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ instrument, onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState<'details' | 'specs'>('details');
    const [isRotationPaused, setIsRotationPaused] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showContactModal, setShowContactModal] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement>(null);

    // Gallery images - different angles of the same instrument
    const getGalleryImages = () => {
        switch (instrument.id) {
            case 'santoor-kashmir':
                return [
                    '/santoor.jpg',
                    '/santoor_angle.png',
                    '/santoor_detail.png',
                ];
            case 'tabla-premium':
                return [
                    '/tabla.jpg',
                    '/tabla.jpg',
                    '/tabla_closeup_1764184161669.png',
                ];
            case 'sarod-maestro':
                return [
                    '/sarod.jpg',
                    '/sarod_angle_1764184242598.png',
                    '/sarod_closeup_1764184227095.png',
                ];
            case 'sitar-royal':
                return [
                    '/sitar.jpg',
                    '/sitar_angle_1764184213240.png',
                    '/sitar_closeup_1764184199860.png',
                ];
            case 'bansuri-flute':
                return [
                    '/bansuri.jpg',
                    '/bansuri.jpg',
                    '/bansuri_zoom_detail_1764239521527.png',
                ];
            default:
                return [instrument.imageUrl];
        }
    };

    const galleryImages = getGalleryImages();

    // Get audio file for the instrument
    const getAudioFile = () => {
        switch (instrument.id) {
            case 'santoor-kashmir':
                return '/santoor.mp3';
            case 'sitar-royal':
                return '/sitar.mp3';
            case 'bansuri-flute':
                return '/flute_main.mp3';
            case 'sarod-maestro':
                return '/Sarod_main.mp3';
            case 'tabla-premium':
                return '/tabla.mp3';
            default:
                return null;
        }
    };

    const audioFile = getAudioFile();

    // Get artist name for the instrument
    const getArtistName = () => {
        switch (instrument.id) {
            case 'santoor-kashmir':
                return 'pt.shivkumaarsharma_santoor';
            case 'sitar-royal':
                return 'pt.ravishankar_sitar';
            case 'bansuri-flute':
                return 'pt.hariprasadchaurasia_flute';
            case 'sarod-maestro':
                return 'ustadamajadalikhan_sarod';
            case 'tabla-premium':
                return 'ustadzakirhussain_tabla';
            default:
                return 'Sound Sample';
        }
    };

    const artistName = getArtistName();

    const toggleAudio = () => {
        if (!audioRef.current || !audioFile) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Handle audio end
    React.useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => setIsPlaying(false);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    return (
        <div className="min-h-full pb-20 bg-midnight relative overflow-hidden">
            {/* Ambient Background Blur */}
            <div className="absolute inset-0 z-0">
                <img
                    src={galleryImages[selectedImage]}
                    alt=""
                    className="w-full h-full object-cover blur-3xl opacity-40 scale-150"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-midnight/80 to-midnight"></div>
            </div>

            {/* Hidden Audio Element */}
            {audioFile && (
                <audio ref={audioRef} src={audioFile} preload="auto" />
            )}

            {/* Full Image Header with Gallery */}
            <div
                className="relative aspect-[4/5] w-full z-10 group cursor-pointer"
                onMouseEnter={() => setIsRotationPaused(true)}
                onMouseLeave={() => setIsRotationPaused(false)}
            >
                {/* Localized blur behind the image */}
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src={galleryImages[selectedImage]}
                        alt=""
                        className="w-full h-full object-cover blur-2xl opacity-60 scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-radial from-amber-900/20 via-gold-900/30 to-midnight/60"></div>
                </div>

                {/* Golden glow effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 via-transparent to-transparent"></div>

                <img
                    src={galleryImages[selectedImage]}
                    alt={instrument.name}
                    className={`relative z-10 w-full h-full object-cover transition-all duration-500 ${selectedImage === 0 && !isRotationPaused ? 'animate-slow-spin' : ''}`}
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(212, 175, 55, 0.15))' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent z-20"></div>

                {/* Pause Indicator */}
                {isRotationPaused && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-gold-500/30 animate-fade-in">
                            <span className="text-gold-300 text-xs font-bold uppercase tracking-widest">Paused</span>
                        </div>
                    </div>
                )}

                {/* Back Button Floating */}
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center z-30 active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} />
                </button>

                <div className="absolute bottom-6 right-6 z-30">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center animate-pulse-slow">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-white">360°</span>
                    </div>
                </div>
            </div>

            {/* Image Gallery Thumbnails */}
            {galleryImages.length > 1 && (
                <div className="relative z-10 -mt-8 px-6 flex gap-2 overflow-x-auto no-scrollbar pb-4">
                    {galleryImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-gold-500 scale-110' : 'border-white/10 opacity-60'
                                }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}

            {/* View Gallery Link */}
            {galleryImages.length > 1 && (
                <div className="relative z-10 px-6 mt-2">
                    <button className="text-gold-400 text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        View Gallery <ChevronRight size={12} />
                    </button>
                </div>
            )}

            <div className="px-6 mt-6 relative z-10">
                {/* Title Block - Frosted Glass Card with Golden Border */}
                <div className="backdrop-blur-md bg-white/5 p-6 rounded-2xl border-2 border-gold-500/40 shadow-2xl mb-6 relative overflow-hidden">
                    {/* Golden glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-gold-500/5 pointer-events-none"></div>
                    <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] pointer-events-none rounded-2xl"></div>

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-gold-500 tracking-widest text-[10px] font-bold uppercase flex items-center gap-1">
                                <Sparkles size={10} />
                                {instrument.craftsmanship.origin}
                            </span>
                            <span className="text-2xl text-gold-300 font-serif">₹{instrument.price.toLocaleString('en-IN')}</span>
                        </div>
                        <h1 className="font-display text-2xl text-white mb-4 leading-tight">{instrument.name}</h1>

                        {/* Audio Player Compact */}
                        <div className="flex items-center gap-4 bg-white/5 p-3 rounded-lg mb-6 border border-gold-500/10">
                            <button
                                onClick={toggleAudio}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shrink-0 border border-gold-500/30 ${isPlaying ? 'bg-gold-500 text-black scale-105' : 'bg-white/10 text-white hover:scale-105'
                                    }`}
                                style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
                            >
                                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                            </button>
                            <div className="overflow-hidden flex-1">
                                <p className="text-xs text-slate-300 font-bold mb-1">{artistName}</p>
                                <div className="flex items-center gap-0.5 h-3">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse bg-gradient-to-t from-gold-500 to-green-400' : 'bg-gold-500/50'}`}
                                            style={{
                                                height: isPlaying ? `${Math.random() * 100}%` : '20%',
                                                animationDelay: `${i * 0.05}s`
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Tabs with sliding underline */}
                        <div className="relative flex gap-6 border-b border-white/10 mb-6 overflow-x-auto no-scrollbar">
                            {['details', 'specs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`relative pb-3 text-xs uppercase tracking-widest font-bold whitespace-nowrap transition-all ${activeTab === tab ? 'text-gold-400' : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 rounded-full animate-fade-in"></div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="min-h-[150px] mb-6">
                            {activeTab === 'details' && (
                                <div className="animate-fade-in">
                                    <p className="text-slate-300 font-['Times_New_Roman',_serif] text-sm leading-relaxed mb-6 italic whitespace-pre-line">
                                        {instrument.description}
                                    </p>
                                </div>
                            )}
                            {activeTab === 'specs' && (
                                <div className="animate-fade-in">
                                    <ul className="space-y-3">
                                        {instrument.features.map(f => (
                                            <li key={f} className="flex items-center gap-3 text-slate-300 text-sm">
                                                <CheckCircle size={14} className="text-gold-500 shrink-0" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>

                        {/* What Makes This Special */}
                        <div className="mb-6 p-4 bg-gradient-to-br from-gold-500/5 to-transparent rounded-lg border border-gold-500/10">
                            <h3 className="text-gold-300 font-display text-sm mb-3 tracking-wide">What Makes This Special</h3>
                            <div className="space-y-2 text-xs text-slate-300">
                                <div className="flex items-start gap-2">
                                    <Sparkles size={12} className="text-gold-400 mt-0.5 shrink-0" />
                                    <p>Hand-aligned bridges for balanced tonal clarity</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Sparkles size={12} className="text-gold-400 mt-0.5 shrink-0" />
                                    <p>Individually tuned for consistency across all strings</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Sparkles size={12} className="text-gold-400 mt-0.5 shrink-0" />
                                    <p>Warm, shimmering sound ideal for classical and contemporary music</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Bar */}
                        <div className="grid grid-cols-3 gap-2 mb-6">
                            <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                                <Package size={18} className="text-gold-400" />
                                <span className="text-[9px] uppercase tracking-wider text-slate-400">Luxury Packaging</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                                <Award size={18} className="text-gold-400" />
                                <span className="text-[9px] uppercase tracking-wider text-slate-400">1-Year Warranty</span>
                            </div>
                            <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2 border border-white/5">
                                <Truck size={18} className="text-gold-400" />
                                <span className="text-[9px] uppercase tracking-wider text-slate-400">Pan-India</span>
                            </div>
                        </div>

                        {/* Primary CTA */}
                        <button
                            onClick={() => setShowContactModal(true)}
                            className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-widest text-sm rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 transition-transform hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center justify-center gap-2"
                        >
                            <Phone size={18} />
                            Contact Now
                        </button>
                    </div>

                    {/* Contact Modal */}
                    {showContactModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
                            <div className="bg-gradient-to-br from-charcoal to-midnight border-2 border-gold-500/30 rounded-2xl p-8 max-w-sm w-full shadow-[0_0_60px_rgba(212,175,55,0.3)] relative animate-scale-in">
                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X size={16} className="text-slate-400" />
                                </button>

                                <div className="text-center mb-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center">
                                        <Phone size={28} className="text-gold-400" />
                                    </div>
                                    <h3 className="font-display text-2xl text-gold-400 mb-2">Get in Touch</h3>
                                    <p className="text-slate-400 text-sm">We'd love to hear from you</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-gold-500/20 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Store Name</p>
                                        <p className="text-white font-serif text-lg">House of Swar</p>
                                    </div>

                                    <div className="bg-white/5 border border-gold-500/20 rounded-xl p-4">
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Contact Number</p>
                                        <a
                                            href="tel:9799662333"
                                            className="text-gold-400 font-mono text-xl tracking-wider hover:text-gold-300 transition-colors"
                                        >
                                            9799662333
                                        </a>
                                    </div>
                                </div>

                                <a
                                    href="tel:9799662333"
                                    className="mt-6 w-full py-3 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-widest text-xs rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all"
                                >
                                    <Phone size={16} />
                                    Call Now
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};