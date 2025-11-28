export interface Instrument {
  id: string;
  name: string;
  type: 'String' | 'Percussion' | 'Wind';
  price: number;
  description: string;
  shortDescription: string;
  imageUrl: string;
  craftsmanship: {
    origin: string;
    hoursSpent: number;
    material: string;
    artisan: string;
  };
  features: string[];
  inStock: boolean;
}

export interface Raga {
  id: string;
  name: string;
  timeOfDay: string;
  mood: string;
  season?: string;
  description: string;
  aaroh: string;
  avaroh: string;
  videoUrl?: string; // Placeholder for demo
}

export interface LearningModule {
  id: string;
  title: string;
  instrument: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  thumbnail: string;
}

export enum ViewState {
  HOME = 'HOME',
  LANDING = 'LANDING',
  STORE = 'STORE',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  RAGA_EXPLORER = 'RAGA_EXPLORER',
  LEARNING = 'LEARNING',
  MAINTENANCE = 'MAINTENANCE',
  PROFILE = 'PROFILE'
}

export type InstrumentType = "Sitar" | "Sarod" | "Tabla" | "Santoor" | "Bansuri" | "Harmonium" | "Other";