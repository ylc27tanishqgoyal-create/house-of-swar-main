import React, { useState, useEffect } from 'react';
import { Play, ChevronDown } from 'lucide-react';

interface RagaCard {
    id: string;
    name: string;
    timeSegment: string;
    description: string;
    time: string;
    mood: string;
    season: string;
    category: 'morning' | 'afternoon' | 'evening' | 'night' | 'monsoon' | 'spring' | 'summer' | 'winter';
}

interface RagaExplorerProps {
    autoPlayRagaId?: string | null;
}

export const RagaExplorer: React.FC<RagaExplorerProps> = ({ autoPlayRagaId }) => {
    const [exploreMode, setExploreMode] = useState<'time' | 'season'>('time');
    const [selectedFilter, setSelectedFilter] = useState<string>('All');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [playingRagaId, setPlayingRagaId] = useState<string | null>(null);
    const [playerReady, setPlayerReady] = useState(false);

    // Track progress independently for each raga
    const [ragaProgress, setRagaProgress] = useState<{ [ragaId: string]: { currentTime: number, duration: number } }>({});

    const playerRef = React.useRef<any>(null);
    const progressIntervalRef = React.useRef<any>(null);
    const playingRagaIdRef = React.useRef<string | null>(null);

    // Update ref when state changes
    useEffect(() => {
        playingRagaIdRef.current = playingRagaId;
    }, [playingRagaId]);

    // Map ragas to their YouTube video IDs
    const ragaVideoMap: { [key: string]: string } = {
        'bhatiyar': 'fveOYRT4DDw',
        'ahir-bhairav': '9GlMrtTfSD0',
        'darbari-kanada': 'AROV6CQ2W9Y',
        'shuddha-sarang': '4Y4UZagZNm0',
        'bhimpalasi': 'uEqYzdz3Zvg',
        'tilak-kamod': 'UNx_fYV81fM',
        'durga': 'gR7yqkEzQxI',
        'shankara': 'vtsmtZYtQTs', // Raag Shankara
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

    const exploreModes = [
        { value: 'time', label: 'Time of Day' },
        { value: 'season', label: 'Season' },
    ];

    const timeFilters = ['All', 'Morning ☀️', 'Afternoon 🌤️', 'Evening 🌇', 'Night 🌌'];
    const seasonFilters = ['All', 'Monsoon 🌧️', 'Spring 🌼', 'Summer ☀️', 'Winter ❄️'];

    const ragas: RagaCard[] = [
        // MORNING RAGAS
        {
            id: 'bhatiyar',
            name: 'Raag Bhatiyar',
            timeSegment: 'EARLY MORNING',
            description: 'Sits between night and day, slowly moving from darkness into soft morning light.',
            time: 'Early Morning',
            mood: 'Thoughtful',
            season: 'Gentle transition',
            category: 'morning'
        },
        {
            id: 'ahir-bhairav',
            name: 'Raag Ahir Bhairav',
            timeSegment: 'SUNRISE',
            description: 'A devotional sunrise raga that blends depth with a gentle folk touch.',
            time: 'Sunrise',
            mood: 'Devotional',
            season: 'Earthy',
            category: 'morning'
        },
        // AFTERNOON RAGAS
        {
            id: 'shuddha-sarang',
            name: 'Raag Shuddha Sarang',
            timeSegment: 'EARLY AFTERNOON',
            description: 'A sweet, devotional early-afternoon raga with a soft, glowing warmth.',
            time: 'Early Afternoon',
            mood: 'Gentle devotion',
            season: 'Any',
            category: 'afternoon'
        },
        {
            id: 'bhimpalasi',
            name: 'Raag Bhimpalasi',
            timeSegment: 'LATE AFTERNOON',
            description: 'Full of tender longing and sweetness, often sung as the day begins to fade.',
            time: 'Late Afternoon',
            mood: 'Sweet longing',
            season: 'Any',
            category: 'afternoon'
        },
        // EVENING RAGAS
        {
            id: 'tilak-kamod',
            name: 'Raag Tilak Kamod',
            timeSegment: 'EARLY EVENING',
            description: 'Light, playful and graceful, with a dancing quality perfect for early evening.',
            time: 'Evening',
            mood: 'Playful',
            season: 'Any',
            category: 'evening'
        },
        {
            id: 'durga',
            name: 'Raag Durga',
            timeSegment: 'LATE EVENING',
            description: 'Steady and strong, a late-evening raga that feels peaceful but firm.',
            time: 'Late Evening',
            mood: 'Calm strength',
            season: 'Any',
            category: 'evening'
        },
        // NIGHT RAGAS
        {
            id: 'shankara',
            name: 'Raag Shankara',
            timeSegment: 'LATE NIGHT',
            description: 'A dignified, powerful late-night raga associated with Lord Shiva.',
            time: 'Late Night',
            mood: 'Majestic',
            season: 'Serious',
            category: 'night'
        },
        {
            id: 'darbari-kanada',
            name: 'Raag Darbari Kanada',
            timeSegment: 'MIDNIGHT',
            description: 'A very serious, heavy midnight raga with deep, slow phrases and royal sadness.',
            time: 'Midnight',
            mood: 'Intense',
            season: 'Grave',
            category: 'night'
        },
        {
            id: 'malkauns',
            name: 'Raag Malkauns',
            timeSegment: 'MIDNIGHT',
            description: 'Ancient, meditative and almost trance-like, creating a dark, mystical space.',
            time: 'Midnight',
            mood: 'Meditative',
            season: 'Mystical',
            category: 'night'
        },
        // MONSOON RAGAS
        {
            id: 'megh',
            name: 'Raag Megh',
            timeSegment: 'MONSOON',
            description: 'A majestic monsoon raga, evoking dark clouds, thunder and heavy skies.',
            time: 'Monsoon',
            mood: 'Deep',
            season: 'Powerful',
            category: 'monsoon'
        },
        {
            id: 'miyan-malhar',
            name: 'Raag Miyan ki Malhar',
            timeSegment: 'RAIN',
            description: 'Grand and dramatic, Malhar is said to call down the rains. Full of sweeping, intense phrases.',
            time: 'Rain',
            mood: 'Dramatic',
            season: 'Heavy',
            category: 'monsoon'
        },
        // SPRING RAGAS
        {
            id: 'bahar',
            name: 'Raag Bahar',
            timeSegment: 'SPRING',
            description: 'Celebrates spring blossoms with playful, lyrical movement and joyful energy.',
            time: 'Spring',
            mood: 'Joyful',
            season: 'Playful',
            category: 'spring'
        },
        {
            id: 'basant',
            name: 'Raag Basant',
            timeSegment: 'SPRING',
            description: 'Bright and uplifting, evoking the first flowers of spring and a sense of renewal.',
            time: 'Spring',
            mood: 'Bright',
            season: 'Uplifting',
            category: 'spring'
        },
        // SUMMER RAGAS
        {
            id: 'desh',
            name: 'Raag Desh',
            timeSegment: 'SUMMER',
            description: 'Popular, patriotic and refreshing, Desh feels like relief during humid summer evenings.',
            time: 'Summer',
            mood: 'Refreshing',
            season: 'Bright',
            category: 'summer'
        },
        {
            id: 'vrindavani-sarang',
            name: 'Raag Vrindavani Sarang',
            timeSegment: 'SUNNY',
            description: 'A charming summer raga linked to Krishna, with a light, serene character.',
            time: 'Sunny',
            mood: 'Serene',
            season: 'Soft',
            category: 'summer'
        },
        // WINTER RAGAS
        {
            id: 'shree',
            name: 'Raag Shree',
            timeSegment: 'WINTER',
            description: 'A serious, ancient winter raga with strong, solemn tones. Feels inward and spiritual.',
            time: 'Winter',
            mood: 'Spiritual',
            season: 'Serious',
            category: 'winter'
        },
        {
            id: 'puriya',
            name: 'Raag Puriya',
            timeSegment: 'COLD EVENING',
            description: 'Mysterious, introspective and cool-toned. Perfect for cold evenings.',
            time: 'Cold Evening',
            mood: 'Introspective',
            season: 'Subtle',
            category: 'winter'
        },
    ];

    const sections = exploreMode === 'time' ? [
        {
            id: 'morning',
            title: 'Morning Raags',
            subtitle: 'Calm, contemplative, grounded',
            tint: 'from-yellow-500/5 to-green-500/5',
            ragas: ragas.filter(r => r.category === 'morning')
        },
        {
            id: 'afternoon',
            title: 'Afternoon Raags',
            subtitle: 'Pensive, mellow, introspective',
            tint: 'from-amber-500/5 to-orange-500/5',
            ragas: ragas.filter(r => r.category === 'afternoon')
        },
        {
            id: 'evening',
            title: 'Evening Raags',
            subtitle: 'Romantic, expansive, iconic',
            tint: 'from-indigo-500/5 to-blue-500/5',
            ragas: ragas.filter(r => r.category === 'evening')
        },
        {
            id: 'night',
            title: 'Night Raags',
            subtitle: 'Deep, serious, meditative',
            tint: 'from-blue-900/10 to-indigo-900/10',
            ragas: ragas.filter(r => r.category === 'night')
        },
    ] : [
        {
            id: 'monsoon',
            title: 'Monsoon Raags',
            subtitle: 'Majestic, powerful, deep',
            tint: 'from-blue-500/5 to-slate-500/5',
            ragas: ragas.filter(r => r.category === 'monsoon')
        },
        {
            id: 'spring',
            title: 'Spring Raags',
            subtitle: 'Fresh, joyful, blossoming',
            tint: 'from-green-500/5 to-yellow-500/5',
            ragas: ragas.filter(r => r.category === 'spring')
        },
        {
            id: 'summer',
            title: 'Summer Raags',
            subtitle: 'Warm, expansive, bright',
            tint: 'from-orange-500/5 to-yellow-500/5',
            ragas: ragas.filter(r => r.category === 'summer')
        },
        {
            id: 'winter',
            title: 'Winter Raags',
            subtitle: 'Intense, meditative, still',
            tint: 'from-blue-900/10 to-slate-900/10',
            ragas: ragas.filter(r => r.category === 'winter')
        },
    ];

    const currentFilters = exploreMode === 'time' ? timeFilters : seasonFilters;

    // Filter sections based on selected filter
    const getFilteredSections = () => {
        if (selectedFilter === 'All') {
            return sections;
        }

        // Map filter labels to section IDs
        const filterMap: { [key: string]: string } = {
            'Morning ☀️': 'morning',
            'Afternoon 🌤️': 'afternoon',
            'Evening 🌇': 'evening',
            'Night 🌌': 'night',
            'Monsoon 🌧️': 'monsoon',
            'Spring 🌼': 'spring',
            'Summer ☀️': 'summer',
            'Winter ❄️': 'winter',
        };

        const sectionId = filterMap[selectedFilter];
        return sections.filter(section => section.id === sectionId);
    };

    const filteredSections = getFilteredSections();

    // YouTube player setup
    React.useEffect(() => {
        // Load YouTube IFrame API if not already loaded
        if (!(window as any).YT) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        // Initialize player when API is ready
        const initializePlayer = () => {
            if ((window as any).YT && (window as any).YT.Player) {
                try {
                    playerRef.current = new (window as any).YT.Player('youtube-audio-player', {
                        height: '0',
                        width: '0',
                        videoId: 'fveOYRT4DDw', // Default video (will be changed on play)
                        playerVars: {
                            autoplay: 0,
                            controls: 0,
                        },
                        events: {
                            onReady: (event: any) => {
                                console.log('YouTube player ready');
                                setPlayerReady(true);
                                // Duration will be set when a specific raga is played
                            },
                            onStateChange: (event: any) => {
                                console.log('Player state changed:', event.data);
                                // Update playing state based on player state
                                if (event.data === (window as any).YT.PlayerState.ENDED ||
                                    event.data === (window as any).YT.PlayerState.PAUSED) {
                                    setPlayingRagaId(null);
                                    // Stop updating progress
                                    if (progressIntervalRef.current) {
                                        clearInterval(progressIntervalRef.current);
                                        progressIntervalRef.current = null;
                                    }
                                } else if (event.data === (window as any).YT.PlayerState.PLAYING) {
                                    // Playing state is set by handlePlayRaga
                                    // Start updating progress
                                    if (!progressIntervalRef.current) {
                                        progressIntervalRef.current = setInterval(() => {
                                            // Only update if we have a playing raga
                                            const currentRagaId = playingRagaIdRef.current;
                                            if (playerRef.current && playerRef.current.getCurrentTime && currentRagaId) {
                                                const time = playerRef.current.getCurrentTime();
                                                const duration = playerRef.current.getDuration();

                                                setRagaProgress(prev => ({
                                                    ...prev,
                                                    [currentRagaId]: {
                                                        currentTime: time,
                                                        duration: duration > 0 ? duration : (prev[currentRagaId]?.duration || 0)
                                                    }
                                                }));
                                            }
                                        }, 100); // Update every 100ms for smooth progress
                                    }
                                }
                            },
                            onError: (event: any) => {
                                console.error('YouTube player error:', event.data);
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error initializing YouTube player:', error);
                }
            }
        };

        // Set up the callback for when YT API is ready
        (window as any).onYouTubeIframeAPIReady = initializePlayer;

        // If YT is already loaded, initialize immediately
        if ((window as any).YT && (window as any).YT.Player) {
            initializePlayer();
        }

        return () => {
            // Clear interval on unmount
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
            if (playerRef.current && playerRef.current.destroy) {
                try {
                    playerRef.current.destroy();
                } catch (error) {
                    console.error('Error destroying player:', error);
                }
            }
        };
    }, []);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>, ragaId: string) => {
        const ragaData = ragaProgress[ragaId];
        if (!playerRef.current || !playerReady || !ragaData || !ragaData.duration) return;

        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        const seekTime = percentage * ragaData.duration;

        playerRef.current.seekTo(seekTime, true);
        setRagaProgress(prev => ({
            ...prev,
            [ragaId]: {
                ...prev[ragaId],
                currentTime: seekTime
            }
        }));
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handlePlayRaga = (ragaId: string) => {
        console.log('handlePlayRaga called for:', ragaId);

        // Check if this raga has audio available
        if (!ragaVideoMap[ragaId]) {
            console.log('Raga has no audio available');
            return;
        }

        if (!playerReady) {
            console.log('Player not ready yet');
            return;
        }

        if (!playerRef.current) {
            console.log('Player ref not available');
            return;
        }

        try {
            if (playingRagaId === ragaId) {
                // Pause if clicking the same raga that's currently playing
                console.log('Pausing current audio');
                playerRef.current.pauseVideo();
                setPlayingRagaId(null);
            } else {
                // Stop any currently playing raga and play the new one
                const videoId = ragaVideoMap[ragaId];
                console.log('Switching to video:', videoId);

                // Load the new video (this stops the current one)
                playerRef.current.loadVideoById(videoId);

                // Initialize progress for this raga if not already done
                if (!ragaProgress[ragaId]) {
                    setRagaProgress(prev => ({
                        ...prev,
                        [ragaId]: { currentTime: 0, duration: 0 }
                    }));
                }

                // Update ref immediately to avoid race conditions
                playingRagaIdRef.current = ragaId;
                setPlayingRagaId(ragaId);
                playerRef.current.playVideo();
            }
        } catch (error) {
            console.error('Error controlling playback:', error);
        }
    };

    // Auto-play effect
    useEffect(() => {
        if (autoPlayRagaId && playerReady && ragaVideoMap[autoPlayRagaId]) {
            console.log('Auto-playing raga:', autoPlayRagaId);
            // Small delay to ensure UI is ready
            setTimeout(() => {
                handlePlayRaga(autoPlayRagaId);
            }, 1000);
        }
    }, [autoPlayRagaId, playerReady]);

    return (
        <div className="pb-20 relative overflow-hidden bg-midnight">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-midnight/70 via-midnight/85 to-midnight"></div>

            <div className="p-6 relative z-10">
                {/* Header */}
                <header className="mb-6">
                    <h2 className="font-display text-2xl text-gold-400 mb-2">Raag Explorer</h2>
                    <p className="text-slate-400 text-sm font-serif italic">Discover the soul of Indian classical music</p>
                </header>

                {/* Explore Mode Dropdown */}
                <div className="mb-6 relative">
                    <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Explore by</label>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full px-4 py-3 rounded-full border border-gold-500/30 bg-white/5 text-white flex items-center justify-between hover:border-gold-500/50 transition-all"
                    >
                        <span className="text-sm font-medium">{exploreModes.find(m => m.value === exploreMode)?.label}</span>
                        <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-charcoal border border-gold-500/20 rounded-xl overflow-hidden shadow-2xl z-20 animate-fade-in">
                            {exploreModes.map((mode) => (
                                <button
                                    key={mode.value}
                                    onClick={() => {
                                        setExploreMode(mode.value as any);
                                        setDropdownOpen(false);
                                        setSelectedFilter('All');
                                    }}
                                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${exploreMode === mode.value
                                        ? 'bg-gold-500/10 text-gold-400'
                                        : 'text-slate-300 hover:bg-white/5'
                                        }`}
                                >
                                    {mode.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Filter Chips */}
                <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {currentFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setSelectedFilter(filter)}
                            className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wide whitespace-nowrap transition-all ${selectedFilter === filter
                                ? 'border-gold-500 bg-gold-500/10 text-gold-400 scale-105 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'border-white/10 text-slate-400 bg-white/5 hover:border-gold-500/30'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Raga Sections */}
                <div className="space-y-0">
                    {filteredSections.map((section, sectionIdx) => {
                        // Define transition gradients based on section
                        const getTransitionGradient = () => {
                            if (exploreMode === 'time') {
                                switch (section.id) {
                                    case 'morning':
                                        return 'from-yellow-400/20 via-amber-300/15 to-orange-400/20'; // Bright morning to brighter afternoon
                                    case 'afternoon':
                                        return 'from-orange-400/20 via-pink-400/15 to-purple-500/20'; // Brighter to sunset
                                    case 'evening':
                                        return 'from-purple-500/20 via-indigo-600/15 to-blue-900/25'; // Sunset to dark night
                                    case 'night':
                                        return 'from-blue-900/25 via-slate-800/20 to-midnight/30'; // Dark fade out
                                    default:
                                        return '';
                                }
                            } else {
                                switch (section.id) {
                                    case 'spring':
                                        return 'from-pink-400/20 via-rose-300/15 to-yellow-400/20'; // Pinkish spring to bright summer
                                    case 'summer':
                                        return 'from-yellow-400/25 via-orange-400/20 to-blue-400/20'; // Very bright to bluish monsoon
                                    case 'monsoon':
                                        return 'from-blue-400/20 via-cyan-500/15 to-slate-300/20'; // Bluish rain to white mist
                                    case 'winter':
                                        return 'from-slate-300/20 via-blue-200/15 to-midnight/30'; // White mist fade out
                                    default:
                                        return '';
                                }
                            }
                        };

                        return (
                            <React.Fragment key={section.id}>
                                <div className="animate-fade-in" style={{ animationDelay: `${sectionIdx * 0.1}s` }}>
                                    {/* Thin Gold Divider */}
                                    {sectionIdx > 0 && (
                                        <div className="border-t border-gold-500/25 mb-8"></div>
                                    )}

                                    {/* Section Container with Lighter BG */}
                                    <div className="bg-[#f5eedc05] rounded-3xl p-6 mb-8">
                                        {/* Section Header */}
                                        <div className="mb-4">
                                            <h3 className="font-display text-xl text-white mb-1">{section.title}</h3>
                                            <p className="text-slate-500 text-xs italic">{section.subtitle}</p>
                                        </div>

                                        {/* Raga Cards - Reduced Gradient Opacity */}
                                        <div className={`bg-gradient-to-br ${section.tint} rounded-2xl p-4 space-y-3 opacity-85`}>
                                            {section.ragas.map((raga, idx) => (
                                                <div
                                                    key={raga.id}
                                                    className="bg-charcoal/60 backdrop-blur-sm border border-white/5 rounded-xl p-4 hover:border-gold-500/30 transition-all cursor-pointer group animate-fade-in"
                                                    style={{ animationDelay: `${(sectionIdx * 0.1) + (idx * 0.05)}s` }}
                                                >
                                                    {/* Top Row */}
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest px-2 py-1 bg-gold-500/10 rounded">
                                                            {raga.timeSegment}
                                                        </span>
                                                        <button
                                                            onClick={() => handlePlayRaga(raga.id)}
                                                            disabled={!ragaVideoMap[raga.id]}
                                                            className={`w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center transition-all ${ragaVideoMap[raga.id]
                                                                ? 'text-gold-400 hover:bg-gold-500 hover:text-black hover:scale-110 cursor-pointer'
                                                                : 'text-slate-600 cursor-not-allowed opacity-50'
                                                                } ${playingRagaId === raga.id ? 'bg-gold-500 text-black scale-110' : ''}`}
                                                        >
                                                            {playingRagaId === raga.id ? (
                                                                <div className="w-2 h-2 flex gap-0.5">
                                                                    <div className="w-[2px] h-2 bg-current"></div>
                                                                    <div className="w-[2px] h-2 bg-current"></div>
                                                                </div>
                                                            ) : (
                                                                <Play size={12} fill="currentColor" className="ml-0.5" />
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Raga Name */}
                                                    <h4 className="font-serif text-lg text-white mb-2 group-hover:text-gold-300 transition-colors">
                                                        {raga.name}
                                                    </h4>

                                                    {/* Description */}
                                                    <p className="text-slate-400 text-xs leading-relaxed italic">
                                                        {raga.description}
                                                    </p>

                                                    {/* Progress Bar (for ragas with audio) */}
                                                    {ragaVideoMap[raga.id] && ragaProgress[raga.id] && (
                                                        <div className="mt-4 space-y-2">
                                                            {/* Progress Bar */}
                                                            <div
                                                                onClick={(e) => handleSeek(e, raga.id)}
                                                                className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group/progress overflow-hidden"
                                                            >
                                                                {/* Progress Fill */}
                                                                <div
                                                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all"
                                                                    style={{ width: `${((ragaProgress[raga.id]?.currentTime || 0) / (ragaProgress[raga.id]?.duration || 1)) * 100}%` }}
                                                                />
                                                                {/* Hover Effect */}
                                                                <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                                                            </div>

                                                            {/* Time Display */}
                                                            <div className="flex justify-between text-[10px] text-slate-500">
                                                                <span>{formatTime(ragaProgress[raga.id]?.currentTime || 0)}</span>
                                                                <span>{formatTime(ragaProgress[raga.id]?.duration || 0)}</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Gradient Transition Divider */}
                                {sectionIdx < filteredSections.length - 1 && (
                                    <div className="relative h-32 my-8 overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-b ${getTransitionGradient()} opacity-60`}></div>
                                        <div className="absolute inset-0 backdrop-blur-sm"></div>
                                        {/* Decorative line */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-transparent via-gold-500/30 to-transparent"></div>
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Hidden YouTube Audio Player */}
            <div id="youtube-audio-player" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
        </div>
    );
};