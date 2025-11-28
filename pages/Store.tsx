import React, { useState } from 'react';
import { ViewState, Instrument } from '../types';
import { FEATURED_INSTRUMENTS } from '../constants';
import { Filter, Star, ChevronRight } from 'lucide-react';

interface StoreProps {
    onSelectInstrument: (id: string) => void;
}

export const Store: React.FC<StoreProps> = ({ onSelectInstrument }) => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    // Filter instruments based on selected category
    const filteredInstruments = activeFilter === 'All'
        ? FEATURED_INSTRUMENTS
        : FEATURED_INSTRUMENTS.filter(instrument => instrument.type === activeFilter);

    return (
        <div className="pb-20 relative overflow-hidden">
            {/* Ambient Background Blur - Composite of all instruments */}
            <div className="absolute inset-0 z-0">
                {FEATURED_INSTRUMENTS.slice(0, 3).map((instrument, idx) => (
                    <img
                        key={instrument.id}
                        src={instrument.imageUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20"
                        style={{
                            animationDelay: `${idx * 2}s`,
                            opacity: 0.15 - (idx * 0.03)
                        }}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/85 to-midnight"></div>
            </div>
            <div className="p-6 relative z-10">
                <header className="mb-8">
                    <h2 className="font-display text-2xl text-gold-400 mb-2">Masterpieces</h2>
                </header>

                {/* Scrollable Horizontal Filters */}
                <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {['All', 'String', 'Percussion', 'Wind'].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full border text-xs font-bold tracking-wide whitespace-nowrap transition-all ${activeFilter === filter
                                ? 'border-gold-500 bg-gold-500 text-black'
                                : 'border-white/10 text-slate-500 bg-white/5 hover:border-gold-500/30 hover:text-slate-300'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="space-y-6">
                    {filteredInstruments.map((instrument) => (
                        <div
                            key={instrument.id}
                            onClick={() => onSelectInstrument(instrument.id)}
                            className="group cursor-pointer bg-white/5 border border-white/5 rounded-lg overflow-hidden active:scale-[0.98] transition-transform"
                        >
                            <div className="flex">
                                <div className="w-1/3 aspect-square relative">
                                    <img
                                        src={instrument.imageUrl}
                                        alt={instrument.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {!instrument.inStock && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <span className="text-[10px] font-bold text-white uppercase border border-white px-1">Sold</span>
                                        </div>
                                    )}
                                </div>
                                <div className="w-2/3 p-4 flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-gold-500 text-[10px] tracking-widest uppercase font-bold">{instrument.type}</span>
                                    </div>
                                    <h3 className="font-display text-lg text-slate-100 mb-1 leading-tight">
                                        {instrument.name}
                                    </h3>
                                    <p className="text-slate-400 text-xs line-clamp-1 mb-3">
                                        {instrument.shortDescription}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <span className="text-sm font-bold text-white">₹{instrument.price.toLocaleString('en-IN')}</span>
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white">
                                            <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};