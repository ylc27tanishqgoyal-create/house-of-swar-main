import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Sunrise, Sun, Sunset, Moon, Music, BookOpen, Lightbulb } from 'lucide-react';

// Map ragas to their YouTube video IDs
const ragaVideoMap: { [key: string]: string } = {
    'bhatiyar': 'fveOYRT4DDw',
    'ahir-bhairav': '9GlMrtTfSD0',
    'darbari-kanada': 'AROV6CQ2W9Y',
    'shuddha-sarang': '4Y4UZagZNm0',
    'bhimpalasi': 'uEqYzdz3Zvg',
    'tilak-kamod': 'UNx_fYV81fM',
    'durga': 'gR7yqkEzQxI',
    'shankara': 'vtsmtZYtQTs',
    'malkauns': 'cmw1C4PGV4s',
    'megh': 'eA2_S9Pyds4',
    'miyan-malhar': 'RqwE6K8Dy-g',
    'bahar': '-19yZ9vwGys',
    'basant': 'L63NkRUwqLA',
    'desh': '3utGH37HzCk',
    'vrindavani-sarang': 'TaQKy-gTHtM',
    'shree': 'o8UrB5Sfmow',
    'puriya': '2gFpYlSILQs',
};

interface DailySession {
    mood: string;
    raga: string;
    ragaId: string; // ID to match RagaExplorer
    description: string;
    audioSrc?: string;
}

const dailyListeningSessions: Record<string, DailySession> = {
    morning: {
        mood: "Morning Calm",
        raga: "Raag Bhatiyar",
        ragaId: "bhatiyar",
        description: "A gentle, contemplative raga to begin your day with clarity and softness.",
    },
    afternoon: {
        mood: "Golden Afternoon",
        raga: "Raag Shuddha Sarang",
        ragaId: "shuddha-sarang",
        description: "Warm and devotional, perfect for a grounded mid-day pause.",
    },
    evening: {
        mood: "Evening Glow",
        raga: "Raag Tilak Kamod",
        ragaId: "tilak-kamod",
        description: "Light, graceful and a little playful – ideal for unwinding in the early evening.",
    },
    night: {
        mood: "Night Reflection",
        raga: "Raag Darbari Kanada",
        ragaId: "darbari-kanada",
        description: "Deep and serious, with slow phrases that invite introspection.",
    },
    monsoon: {
        mood: "Monsoon Mood",
        raga: "Raag Megh",
        ragaId: "megh",
        description: "Majestic and powerful, evoking dark clouds, thunder and heavy skies.",
    },
    winter: {
        mood: "Winter Stillness",
        raga: "Raag Shree",
        ragaId: "shree",
        description: "An ancient, solemn raga that feels inward and spiritual.",
    },
};


const classicalBasics = [
    {
        title: "What is a Raag?",
        description: "A raag is a melodic framework with specific notes, moods, and time associations.",
        icon: Music,
    },
    {
        title: "Understanding Thaat",
        description: "Thaats are parent scales in Hindustani classical music – like musical families.",
        icon: BookOpen,
    },
    {
        title: "Time Theory",
        description: "Each raag has a preferred time of day based on its emotional character.",
        icon: Lightbulb,
    },
    {
        title: "Swaras - The 7 Notes",
        description: "The basic notes of Indian classical music - Sa, Re, Ga, Ma, Pa, Dha, Ni - the foundation of every raag.",
        icon: Music,
    },
    {
        title: "Shruti - Microtones",
        description: "Shrutis are tiny tonal divisions between notes. They bring subtle emotional shades to Indian classical music.",
        icon: Lightbulb,
    },
    {
        title: "Aroha & Avaroha (Ascending / Descending)",
        description: "Every raag has a unique ascending (Aroha) and descending (Avaroha) pattern, shaping its movement and mood.",
        icon: BookOpen,
    },
    {
        title: "Pakad - The Signature Phrase",
        description: "A raag's identity captured in a small melodic phrase. The Pakad makes a raag instantly recognizable.",
        icon: Music,
    },
    {
        title: "Chalan - The Guiding Movement",
        description: "Chalan is the way a raag flows - its personality in motion, showing how notes naturally move and resolve.",
        icon: BookOpen,
    },
    {
        title: "Jati - Note Count Pattern",
        description: "A raag can be Audav (5 notes), Shadav (6 notes), or Sampoorna (7 notes), based on how many notes it uses.",
        icon: Lightbulb,
    },
    {
        title: "Rasa - The Emotion of a Raag",
        description: "Each raag evokes a specific mood - devotion, romance, serenity, longing, joy, meditation, and more.",
        icon: Music,
    },
    {
        title: "The Role of Alap",
        description: "A slow, free-flowing introduction of the raag, exploring notes gently without rhythm.",
        icon: BookOpen,
    },
    {
        title: "Lay & Taal - Rhythm Basics",
        description: "Lay is tempo, and Taal is the rhythmic cycle that holds music together.",
        icon: Lightbulb,
    },
    {
        title: "Sam - The First Beat",
        description: "The most important point in a rhythm cycle where melody and rhythm meet, creating impact.",
        icon: Music,
    },
    {
        title: "Drone (Tanpura)",
        description: "A constant base sound that anchors the raag and gives it depth.",
        icon: BookOpen,
    },
];

interface LearningProps {
    onNavigateToRaga?: (ragaId: string) => void;
}

export const Learning: React.FC<LearningProps> = ({ onNavigateToRaga }) => {
    const [currentSession, setCurrentSession] = useState<DailySession | null>(null);
    const [sessionKey, setSessionKey] = useState<string>('');

    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const playerRef = useRef<any>(null);
    const progressIntervalRef = useRef<any>(null);

    useEffect(() => {
        // Determine session based on current time
        const hour = new Date().getHours();
        let key = '';

        if (hour >= 5 && hour < 12) {
            key = 'morning';
        } else if (hour >= 12 && hour < 17) {
            key = 'afternoon';
        } else if (hour >= 17 && hour < 21) {
            key = 'evening';
        } else {
            key = 'night';
        }

        setSessionKey(key);
        setCurrentSession(dailyListeningSessions[key]);
    }, []);

    // Initialize YouTube Player
    useEffect(() => {
        if (!currentSession || !ragaVideoMap[currentSession.ragaId]) return;

        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            if ((window as any).YT && (window as any).YT.Player) {
                try {
                    playerRef.current = new (window as any).YT.Player('learning-audio-player', {
                        height: '0',
                        width: '0',
                        videoId: ragaVideoMap[currentSession.ragaId],
                        playerVars: {
                            autoplay: 0,
                            controls: 0,
                        },
                        events: {
                            onReady: (event: any) => {
                                setPlayerReady(true);
                                setDuration(event.target.getDuration());
                            },
                            onStateChange: (event: any) => {
                                if (event.data === (window as any).YT.PlayerState.ENDED ||
                                    event.data === (window as any).YT.PlayerState.PAUSED) {
                                    setIsPlaying(false);
                                    if (progressIntervalRef.current) {
                                        clearInterval(progressIntervalRef.current);
                                        progressIntervalRef.current = null;
                                    }
                                } else if (event.data === (window as any).YT.PlayerState.PLAYING) {
                                    setIsPlaying(true);
                                    if (!progressIntervalRef.current) {
                                        progressIntervalRef.current = setInterval(() => {
                                            if (playerRef.current && playerRef.current.getCurrentTime) {
                                                setCurrentTime(playerRef.current.getCurrentTime());
                                            }
                                        }, 100);
                                    }
                                }
                            }
                        }
                    });
                } catch (e) {
                    console.error("Error initializing player", e);
                }
            }
        };

        if ((window as any).YT && (window as any).YT.Player) {
            initPlayer();
        } else {
            (window as any).onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (playerRef.current && playerRef.current.destroy) {
                try {
                    playerRef.current.destroy();
                } catch (e) {
                    console.error("Error destroying player", e);
                }
            }
        };
    }, [currentSession]);

    const handlePlayPause = () => {
        if (!playerRef.current || !playerReady) return;

        if (isPlaying) {
            playerRef.current.pauseVideo();
        } else {
            playerRef.current.playVideo();
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!playerRef.current || !playerReady || !duration) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const seekTime = percentage * duration;

        playerRef.current.seekTo(seekTime, true);
        setCurrentTime(seekTime);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getSessionIcon = () => {
        switch (sessionKey) {
            case 'morning': return <Sunrise size={24} className="text-amber-400" />;
            case 'afternoon': return <Sun size={24} className="text-yellow-400" />;
            case 'evening': return <Sunset size={24} className="text-orange-400" />;
            case 'night': return <Moon size={24} className="text-indigo-400" />;
            default: return <Music size={24} className="text-gold-400" />;
        }
    };

    const getTitleIcon = () => {
        switch (sessionKey) {
            case 'morning': return <Sunrise size={20} className="text-amber-400" />;
            case 'afternoon': return <Sun size={20} className="text-yellow-400" />;
            case 'evening': return <Sunset size={20} className="text-orange-400" />;
            case 'night': return <Moon size={20} className="text-indigo-400" />;
            default: return <Music size={20} className="text-gold-400" />;
        }
    };

    // Previous sessions for carousel
    const previousSessions = [
        { mood: "Morning Calm", raga: "Raag Bhatiyar" },
        { mood: "Evening Glow", raga: "Raag Tilak Kamod" },
    ];

    if (!currentSession) return null;

    return (
        <div className="pb-20 p-6 space-y-8">
            {/* 1. DAILY LISTENING HERO */}
            <section>
                <div className="mb-4 flex items-center gap-2">
                    {getTitleIcon()}
                    <div>
                        <h2 className="font-display text-2xl text-gold-400 mb-1">Your Daily Listening Session</h2>
                        <p className="text-slate-500 text-sm font-serif italic">A small raag moment for today.</p>
                    </div>
                </div>

                {/* Previous Sessions Carousel */}
                <div className="relative mb-6">
                    {/* Background cards with tilt */}
                    <div className="absolute -left-2 top-4 w-[95%] h-48 bg-charcoal/40 backdrop-blur-sm border border-gold-500/10 rounded-3xl transform -rotate-2 opacity-40"></div>
                    <div className="absolute -right-2 top-4 w-[95%] h-48 bg-charcoal/40 backdrop-blur-sm border border-gold-500/10 rounded-3xl transform rotate-2 opacity-40"></div>

                    {/* Main Card */}
                    <div className="relative bg-gradient-to-br from-charcoal/80 to-surface/40 backdrop-blur-sm border-2 border-gold-500/30 rounded-3xl p-6 shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                        {/* Mini Waveform Animation Behind Button */}
                        <div className="absolute bottom-20 left-0 right-0 h-12 overflow-hidden opacity-20">
                            <div className="flex items-center justify-center gap-1 h-full">
                                {Array.from({ length: 30 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-gold-500 rounded-full animate-pulse"
                                        style={{
                                            height: `${20 + Math.sin(i * 0.5) * 15}px`,
                                            animationDelay: `${i * 0.1}s`,
                                            animationDuration: '2s',
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        {/* Icon & Mood */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
                                {getSessionIcon()}
                            </div>
                            <div>
                                <span className="text-[10px] uppercase tracking-widest text-gold-500 font-bold">Today's Mood</span>
                                <h3 className="text-white font-display text-lg">{currentSession.mood}</h3>
                            </div>
                        </div>

                        {/* Raga Name */}
                        <h4 className="font-serif text-2xl text-gold-300 mb-3">{currentSession.raga}</h4>

                        {/* Description */}
                        <p className="text-slate-400 text-sm leading-relaxed mb-2 italic">
                            {currentSession.description}
                        </p>

                        {/* Featuring Line */}
                        <p className="text-gold-500/70 text-xs mb-6 font-medium">
                            Featuring: {currentSession.raga}
                        </p>

                        {/* Play Button / Player Controls */}
                        {!isPlaying && currentTime === 0 ? (
                            <button
                                onClick={handlePlayPause}
                                disabled={!ragaVideoMap[currentSession.ragaId]}
                                className={`relative w-full py-4 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-bold uppercase tracking-widest text-sm rounded-lg shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-95 transition-transform hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] flex items-center justify-center gap-2 overflow-hidden ${!ragaVideoMap[currentSession.ragaId] ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Play size={16} fill="currentColor" />
                                Listen Now
                            </button>
                        ) : (
                            <div className="bg-charcoal/80 border border-gold-500/30 rounded-lg p-4 space-y-3">
                                {/* Progress Bar */}
                                <div
                                    onClick={handleSeek}
                                    className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group/progress overflow-hidden"
                                >
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all"
                                        style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                                    />
                                    <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-slate-400 font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>

                                    <button
                                        onClick={handlePlayPause}
                                        className="w-8 h-8 rounded-full bg-gold-500 text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                                    >
                                        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Hidden YouTube Player */}
            <div id="learning-audio-player" className="absolute top-[-9999px] left-[-9999px]"></div>

            {/* 2. UNDERSTANDING CLASSICAL BASICS */}
            <section>
                <h3 className="text-white font-display text-lg mb-4">Understanding Classical Basics</h3>
                <div className="space-y-3">
                    {classicalBasics.map((basic, idx) => (
                        <div
                            key={idx}
                            className="bg-charcoal/60 backdrop-blur-sm border border-white/5 rounded-xl p-4 hover:border-gold-500/30 transition-all"
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                                    <basic.icon size={18} className="text-gold-400" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-display text-sm mb-1">{basic.title}</h4>
                                    <p className="text-slate-400 text-xs leading-relaxed">{basic.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};