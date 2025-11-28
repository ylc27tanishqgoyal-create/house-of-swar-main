
import React from 'react';
import { ShoppingBag, Music, BookOpen, PenTool, ArrowRight, PlayCircle, Star, User, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
    setView: (view: ViewState) => void;
    userName?: string;
}

export const Hero: React.FC<HeroProps> = ({ setView, userName }) => {
    const playerRef = React.useRef<any>(null);
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const [isMuted, setIsMuted] = React.useState(false);

    const togglePlay = () => {
        if (!playerRef.current) return;
        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!playerRef.current) return;
        if (isMuted) {
            playerRef.current.unMute();
        } else {
            playerRef.current.mute();
        }
        setIsMuted(!isMuted);
    };

    React.useEffect(() => {
        const initPlayer = () => {
            if (playerRef.current) return;

            playerRef.current = new (window as any).YT.Player('hero-video', {
                videoId: 'iDSoI-z6qaY',
                playerVars: {
                    autoplay: 1,
                    mute: 0, // Attempt to play with sound
                    controls: 0,
                    showinfo: 0,
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                    start: 20,
                },
                events: {
                    onReady: (event: any) => {
                        event.target.playVideo();

                        // Clear any existing interval
                        if (intervalRef.current) clearInterval(intervalRef.current);

                        // Check time every 500ms to loop between 20s and 40s
                        intervalRef.current = setInterval(() => {
                            if (playerRef.current && playerRef.current.getCurrentTime) {
                                const currentTime = playerRef.current.getCurrentTime();
                                // Loop back to 20s if we pass 40s
                                if (currentTime >= 40) {
                                    playerRef.current.seekTo(20, true);
                                }
                                // Ensure we don't play before 20s
                                if (currentTime < 20) {
                                    playerRef.current.seekTo(20, true);
                                }
                            }
                        }, 500);
                    },
                    onStateChange: (event: any) => {
                        // Update state if video state changes externally
                        if (event.data === (window as any).YT.PlayerState.PLAYING) setIsPlaying(true);
                        if (event.data === (window as any).YT.PlayerState.PAUSED) setIsPlaying(false);

                        // If video ends (shouldn't happen with interval, but safety net)
                        if (event.data === (window as any).YT.PlayerState.ENDED) {
                            playerRef.current.seekTo(20, true);
                            playerRef.current.playVideo();
                        }
                    }
                }
            });
        };

        // Load API if not ready, otherwise init immediately
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
            (window as any).onYouTubeIframeAPIReady = initPlayer;
        } else {
            initPlayer();
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            if (playerRef.current && playerRef.current.destroy) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, []);

    return (
        <div className="min-h-full flex flex-col bg-transparent">
            {/* Main Hero Content */}
            <div className="relative h-[60vh] w-full shrink-0 overflow-hidden group z-10">
                {/* YouTube Background Video */}
                <div className="absolute inset-0 w-full h-full">
                    <div
                        id="hero-video"
                        className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    ></div>
                </div>

                {/* Dark Emerald Gradient Overlay - Reduced Opacity */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/60 via-midnight/50 to-midnight z-[1]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,20,10,0.4)_100%)] z-[1]"></div>

                {/* Soft Gradient Behind Hero Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-transparent opacity-80 z-[2]"></div>

                {/* Light Shimmer Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer pointer-events-none z-[3]"></div>

                {/* Video Controls */}
                <div className="absolute top-6 right-6 z-30 flex gap-3">
                    <button
                        onClick={togglePlay}
                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-gold-400 transition-all"
                        title={isPlaying ? "Pause Video" : "Play Video"}
                    >
                        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                    </button>
                    <button
                        onClick={toggleMute}
                        className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:bg-black/60 hover:text-gold-400 transition-all"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full z-10">
                    <h2 className="font-serif text-4xl text-gold-400 leading-tight mb-3 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] [text-shadow:0_0_30px_rgba(212,175,55,0.6),0_0_40px_rgba(212,175,55,0.4)]">
                        Indian Classical Music
                    </h2>
                    <p className="text-slate-300 text-base mb-6 font-light leading-relaxed">
                        A new legacy for our timeless music
                    </p>

                    <button
                        onClick={() => setView(ViewState.STORE)}
                        className="w-full bg-transparent border-2 border-gold-400/60 text-gold-300 font-semibold uppercase tracking-widest py-4 px-6 text-xs flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:border-gold-400 hover:text-gold-200 active:scale-95 transition-all duration-300 rounded-full mb-8 backdrop-blur-sm"
                    >
                        Explore the Instrument <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Highlight Cards Grid */}
            <div className="px-6 pb-24 flex-1 bg-midnight relative z-10">
                {/* Floating Musical Notes Background - 2 Rows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-70">
                    {['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni', 'Sa'].map((note, i) => {
                        // Grid positioning: 2 rows of 4
                        const row = Math.floor(i / 4);
                        const col = i % 4;
                        const leftPos = 15 + (col * 22); // Spread across width (15%, 37%, 59%, 81%)
                        const topPos = 5 + (row * 40);   // Top row at 5%, Bottom row at 45%

                        return (
                            <div
                                key={i}
                                className="absolute text-gold-400 font-serif text-3xl font-bold"
                                style={{
                                    left: `${leftPos}%`,
                                    top: `${topPos}%`,
                                    // Only horizontal drift, no vertical float
                                    animation: `driftSmall ${3 + i * 0.2}s linear infinite alternate`,
                                    textShadow: '0 0 20px rgba(255,215,0,1), 0 0 40px rgba(212,175,55,0.8), 0 0 60px rgba(212,175,55,0.6)',
                                    filter: 'blur(0.3px)',
                                }}
                            >
                                {note}
                            </div>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2 relative z-20">
                    <h3 className="text-gold-400 font-serif text-xl tracking-wide">Explore House of Swar</h3>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-gold-500/50 to-transparent ml-4"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative z-20">
                    {[
                        {
                            label: 'Instruments',
                            view: ViewState.STORE,
                            gradient: 'from-emerald-500/5 via-transparent to-transparent',
                            pattern: 'radial-gradient(circle at 30% 20%, rgba(16,185,129,0.08) 0%, transparent 50%)',
                            motif: 'M10,30 Q15,25 20,30 L18,35 Q15,32 12,35 Z M25,20 L28,15 L31,20 L28,25 Z',
                            icon: (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Veena - vertical/straight */}
                                    {/* Main body/resonator */}
                                    <ellipse cx="12" cy="18" rx="4" ry="3.5" />
                                    {/* Neck - straight vertical */}
                                    <line x1="12" y1="14" x2="12" y2="4" />
                                    {/* Top tuning head */}
                                    <ellipse cx="12" cy="5" rx="3" ry="2" />
                                    {/* Strings - vertical */}
                                    <line x1="10.5" y1="14" x2="10.5" y2="7" strokeWidth="0.8" opacity="0.6" />
                                    <line x1="12" y1="14" x2="12" y2="7" strokeWidth="0.8" opacity="0.6" />
                                    <line x1="13.5" y1="14" x2="13.5" y2="7" strokeWidth="0.8" opacity="0.6" />
                                </svg>
                            )
                        },
                        {
                            label: 'Raags',
                            view: ViewState.RAGA_EXPLORER,
                            gradient: 'from-amber-500/5 via-transparent to-transparent',
                            pattern: 'radial-gradient(circle at 70% 30%, rgba(245,158,11,0.08) 0%, transparent 50%)',
                            motif: 'M5,15 Q10,10 15,15 T25,15 M7,20 Q12,15 17,20 T27,20',
                            icon: (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Aroha/Avaroha wave line */}
                                    <path d="M4 16 Q7 13, 9 10 T14 7 T19 10 T22 8" fill="none" />
                                    {/* Swar dots */}
                                    <circle cx="4" cy="16" r="1.5" fill="currentColor" />
                                    <circle cx="9" cy="10" r="1.5" fill="currentColor" />
                                    <circle cx="14" cy="7" r="1.5" fill="currentColor" />
                                    <circle cx="19" cy="10" r="1.5" fill="currentColor" />
                                    <circle cx="22" cy="8" r="1.5" fill="currentColor" />
                                </svg>
                            )
                        },
                        {
                            label: 'Learn',
                            view: ViewState.LEARNING,
                            gradient: 'from-indigo-500/5 via-transparent to-transparent',
                            pattern: 'radial-gradient(circle at 40% 70%, rgba(99,102,241,0.08) 0%, transparent 50%)',
                            motif: 'M15,10 L20,15 L15,20 M20,15 L15,20 L10,15 L15,10',
                            icon: (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Simple open book */}
                                    <path d="M4 19.5C4 18.837 4.5 18 6 18H11C11.5523 18 12 18.4477 12 19V21" />
                                    <path d="M20 19.5C20 18.837 19.5 18 18 18H13C12.4477 18 12 18.4477 12 19V21" />
                                    <path d="M12 21V7C12 5.89543 11.1046 5 10 5H6C4.89543 5 4 5.89543 4 7V19.5" />
                                    <path d="M12 21V7C12 5.89543 12.8954 5 14 5H18C19.1046 5 20 5.89543 20 7V19.5" />
                                </svg>
                            )
                        },
                        {
                            label: 'Services',
                            view: ViewState.MAINTENANCE,
                            gradient: 'from-rose-500/5 via-transparent to-transparent',
                            pattern: 'radial-gradient(circle at 60% 60%, rgba(244,63,94,0.08) 0%, transparent 50%)',
                            motif: 'M12,8 Q15,12 12,16 Q9,12 12,8 M18,10 L22,14 L18,18',
                            icon: (
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Wrench/Tool for services */}
                                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                </svg>
                            )
                        },
                    ].map((item, idx) => (
                        <button
                            key={item.label}
                            onClick={() => setView(item.view)}
                            className="group relative p-6 overflow-hidden rounded-2xl transition-all duration-500"
                        >
                            {/* Gold halo glow behind card */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-gold-500/20 via-gold-400/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Main card with glassmorphism */}
                            <div className={`relative h-full bg-gradient-to-br ${item.gradient} backdrop-blur-md border border-gold-500/30 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,${0.4 + idx * 0.05})] group-hover:shadow-[0_16px_48px_rgba(212,175,55,0.25)] group-hover:-translate-y-2 transition-all duration-500`}>

                                {/* Subtle mandala/motif fragments - centered */}
                                <svg
                                    className="absolute opacity-[0.04] pointer-events-none"
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                    viewBox="0 0 40 40"
                                >
                                    <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" />
                                    <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" />
                                    <circle cx="20" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gold-400" />
                                    <path d={item.motif} fill="none" stroke="currentColor" strokeWidth="0.3" className="text-gold-400" />
                                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                        <line
                                            key={angle}
                                            x1="20"
                                            y1="20"
                                            x2={20 + 15 * Math.cos(angle * Math.PI / 180)}
                                            y2={20 + 15 * Math.sin(angle * Math.PI / 180)}
                                            stroke="currentColor"
                                            strokeWidth="0.3"
                                            className="text-gold-400"
                                        />
                                    ))}
                                </svg>

                                {/* Subtle abstract background pattern */}
                                <div
                                    className="absolute inset-0 opacity-40 rounded-2xl"
                                    style={{ background: item.pattern }}
                                />

                                {/* Inner gold glow/aura */}
                                <div className="absolute inset-0 rounded-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 60%)'
                                }} />

                                {/* Fine texture overlay */}
                                <div className="absolute inset-0 opacity-[0.02] rounded-2xl" style={{
                                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.3)"/%3E%3C/svg%3E")'
                                }} />

                                <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-500">
                                    <div className="absolute inset-0 rounded-full bg-gold-400/5 blur-md group-hover:blur-lg transition-all duration-500" />

                                    {/* Inner Gold Aura - Glows on hover */}
                                    <div className="absolute inset-2 rounded-full bg-radial-gradient from-gold-400/30 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                                    <div className="relative text-gold-300 group-hover:text-gold-100 transition-colors duration-300 [&>svg]:drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                                        {item.icon}
                                    </div>
                                </div>
                                <span className="relative z-10 text-sm text-white font-medium tracking-wide group-hover:text-gold-200 transition-colors duration-300">
                                    {item.label}
                                </span>

                                {/* Hover gradient glow overlay */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-gold-500/10 via-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Subtle light ray effect on hover */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-gradient-to-b from-gold-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* CSS Animations for floating notes */}
            <style>{`
                @keyframes floatNote {
                    0% { transform: translateY(0px) scale(1); opacity: 0.6; }
                    50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
                    100% { transform: translateY(0px) scale(1); opacity: 0.6; }
                }
                @keyframes driftSmall {
                    0% { transform: translateX(-30px); }
                    100% { transform: translateX(30px); }
                }
            `}</style>
        </div>
    );
};