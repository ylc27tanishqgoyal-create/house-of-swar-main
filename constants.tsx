import { Instrument, Raga, LearningModule } from './types';
import React from 'react';

// HOW TO ADD IMAGES:
// Replace the 'imageUrl' string with the link to your image.
// You can use images hosted on Cloudinary, Imgur, or your own server.

export const FEATURED_INSTRUMENTS: Instrument[] = [
  {
    id: 'santoor-kashmir',
    name: 'Authentic Kashmiri Santoor',
    type: 'String',
    price: 55000,
    shortDescription: 'A finely-tuned santoor with perfectly aligned bridges and a shimmering tone that fills the room with warmth.',
    description: 'Overview\nA beautifully crafted santoor with finely aligned bridges and lightweight hammers. The wooden body resonates with a shimmering, bell-like tone.\n\nCraft Story\nMade in the traditional Kashmiri style, each santoor goes through multiple rounds of tuning, sanding, and alignment to ensure even tonal response across all strings.\n\nRecommended For\nLearners and seasoned players who enjoy melodic richness and harmonic textures.',
    imageUrl: '/santoor.jpg',
    craftsmanship: {
      origin: 'Srinagar, Kashmir',
      hoursSpent: 0,
      material: 'Walnut Wood',
      artisan: ''
    },
    features: ['31 Bridges', 'Rosewood Hammers', 'Tuning Key', 'Hard Case'],
    inStock: true,
  },
  {
    id: 'tabla-premium',
    name: 'Concert Grade Bombay Tabla Set',
    type: 'Percussion',
    price: 35000,
    shortDescription: 'Tabla crafted with precision weight, balanced dayan–bayan, and a clean, crisp sound that speaks instantly.',
    description: 'Overview\nA perfectly balanced dayan made from seasoned sheesham and a bayan crafted with deep, rounded metal body. The syahi is applied with precision for clear tonality.\n\nCraft Story\nThe tabla pair is built by craftsmen from traditional gharanas, with each head tightened, tested, and tuned multiple times before final assembly.\n\nRecommended For\nBeginners and serious learners; excellent for both riyaz and stage.',
    imageUrl: '/tabla.jpg',
    craftsmanship: {
      origin: 'Varanasi, UP',
      hoursSpent: 0,
      material: 'Sheesham & Copper',
      artisan: ''
    },
    features: ['Professional Syahi Application', 'Heavy Weight Bayan', 'Tuning Hammer Included', 'Padded Covers'],
    inStock: true,
  },
  {
    id: 'sarod-maestro',
    name: 'Heritage Ali Akbar Style Sarod',
    type: 'String',
    price: 95000,
    shortDescription: 'A rich, warm sarod known for its fluid glides and the raw, earthy strength of its metal fingerboard.',
    description: 'Overview\nThis sarod is crafted with a sheesham body and a polished metal fingerboard that allows smooth, effortless meends (glides). The skin head is tightly fitted for strong projection and tonal depth.\n\nCraft Story\nBuilt by artisans who specialize in traditional sarod-making techniques, the instrument goes through multiple cycles of stretching, seasoning, and tuning before it’s ready.\n\nRecommended For\nIntermediate and advanced players who prefer a powerful, earthy sound.',
    imageUrl: '/sarod.jpg',
    craftsmanship: {
      origin: 'Kolkata, West Bengal',
      hoursSpent: 0,
      material: 'Sheesham & Steel',
      artisan: ''
    },
    features: ['Chrome Plated Plate', 'Coconut Shell Plectrum', 'Teak Wood Body', 'Extra String Set'],
    inStock: true,
  },
  {
    id: 'sitar-royal',
    name: 'The Royal Ravi Shankar Style Sitar',
    type: 'String',
    price: 125000,
    shortDescription: 'A handcrafted sitar with deep, ringing resonance and the kind of clarity you only get from seasoned wood and a patient artisan’s hand.',
    description: 'Overview\nThis sitar is built using well-seasoned tun wood, shaped and tuned over months to achieve its bright yet mellow tone. The jawari is hand-finished for a clean sustain, and the instrument responds beautifully to both light and powerful strokes.\n\nCraft Story\nCrafted by artisans who have spent decades perfecting their carving and jawari work, each sitar takes over 150-200 hours to make. Every curve and contour is done patiently by hand.\n\nRecommended For\nBeginners to advanced players; excellent as a long-term, grow-with-you instrument.',
    imageUrl: '/sitar.jpg',
    craftsmanship: {
      origin: 'Miraj, Maharashtra',
      hoursSpent: 0,
      material: 'Seasoned Tun Wood',
      artisan: ''
    },
    features: ['Kharaj Pancham Style', 'German Silver Frets', 'Premium Pegs', 'Hard Case Included'],
    inStock: true,
  },
  {
    id: 'bansuri-flute',
    name: 'E-Bass Professional Bansuri',
    type: 'Wind',
    price: 8500,
    shortDescription: 'A bansuri carved from seasoned bamboo, offering a soft, breathy tone that feels intimate and effortless.',
    description: 'Overview\nThis bansuri is carved from aged Assam bamboo, chosen for its natural density and smooth internal bore. The finger holes are burnt and shaped manually for accuracy.\n\nCraft Story\nEach flute is tuned individually by hand, using both ear and digital calibration to ensure a perfectly stable scale.\n\nRecommended For\nAbsolute beginners to professionals - very forgiving and expressive.',
    imageUrl: '/bansuri.jpg',
    craftsmanship: {
      origin: 'Assam, India',
      hoursSpent: 0,
      material: 'Assam Bamboo',
      artisan: ''
    },
    features: ['Thread Binding', 'Carry Tube', 'Concert Pitch', 'Fry Treatment'],
    inStock: true,
  }
];

export const RAGAS: Raga[] = [
  {
    id: 'yaman',
    name: 'Raag Yaman',
    timeOfDay: 'Evening (6 PM - 9 PM)',
    mood: 'Devotion, Peace, Love',
    season: 'All Seasons',
    description: 'A fundamental raga of Kalyan thaat. It creates a mood of tranquility and deep contemplation. Often the first raga taught to students.',
    aaroh: 'N R G M(t) D N S',
    avaroh: 'S N D P M(t) G R S',
  },
  {
    id: 'bairagi',
    name: 'Raag Bairagi',
    timeOfDay: 'Morning (6 AM - 9 AM)',
    mood: 'Renunciation, Spiritual, Somber',
    description: 'A pentatonic raga belonging to Bhairav thaat. It evokes a feeling of introspection and morning meditation.',
    aaroh: 'S r m P n S',
    avaroh: 'S n P m r S',
  },
  {
    id: 'megh',
    name: 'Raag Megh',
    timeOfDay: 'Anytime during Monsoon',
    mood: 'Majestic, Deep, Monsoon',
    season: 'Monsoon',
    description: 'Associated with the rainy season, Raag Megh is deep, profound and majestic. It brings forth the imagery of dark clouds and thunder.',
    aaroh: 'S R m P n S',
    avaroh: 'S n P m R S',
  }
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 'sitar-101',
    title: 'Sitar Basics: Holding the Instrument',
    instrument: 'Sitar',
    level: 'Beginner',
    duration: '5 mins',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tabla-101',
    title: 'The First Bol: Na and Tin',
    instrument: 'Tabla',
    level: 'Beginner',
    duration: '8 mins',
    thumbnail: 'https://images.unsplash.com/photo-1632230116812-78dc5e38eb45?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'vocal-101',
    title: 'Breathing for Dhrupad',
    instrument: 'Vocal',
    level: 'Intermediate',
    duration: '12 mins',
    thumbnail: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800'
  }
];