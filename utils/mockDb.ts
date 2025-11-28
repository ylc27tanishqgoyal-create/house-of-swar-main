import { InstrumentType } from '../types';

export interface Instrument {
    id: string;
    user_id: string;
    instrument_type: InstrumentType;
    instrument_name: string;
    purchase_date: string;
    purchase_location?: string;
    warranty_expiry: string;
    next_tuning_date: string;
    created_at: string;
}

const STORAGE_KEY = 'house_of_swar_instruments';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDb = {
    async getInstruments(userId: string): Promise<Instrument[]> {
        await delay(500);
        const data = localStorage.getItem(STORAGE_KEY);
        const instruments: Instrument[] = data ? JSON.parse(data) : [];
        return instruments.filter(i => i.user_id === userId);
    },

    async createInstrument(instrument: Omit<Instrument, 'id' | 'created_at'>): Promise<Instrument> {
        await delay(800);
        const data = localStorage.getItem(STORAGE_KEY);
        const instruments: Instrument[] = data ? JSON.parse(data) : [];

        const newInstrument: Instrument = {
            ...instrument,
            id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };

        instruments.push(newInstrument);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(instruments));
        return newInstrument;
    },

    async updateInstrument(id: string, updates: Partial<Instrument>): Promise<Instrument> {
        await delay(600);
        const data = localStorage.getItem(STORAGE_KEY);
        const instruments: Instrument[] = data ? JSON.parse(data) : [];

        const index = instruments.findIndex(i => i.id === id);
        if (index === -1) throw new Error('Instrument not found');

        const updatedInstrument = { ...instruments[index], ...updates };
        instruments[index] = updatedInstrument;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(instruments));
        return updatedInstrument;
    },

    async deleteInstrument(id: string): Promise<void> {
        await delay(500);
        const data = localStorage.getItem(STORAGE_KEY);
        const instruments: Instrument[] = data ? JSON.parse(data) : [];

        const filtered = instruments.filter(i => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};
