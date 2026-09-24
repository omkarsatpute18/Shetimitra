// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { Season, type Crop } from '@/types';

export const crops: Crop[] = [
  {
    id: 'C1',
    name: 'Onion',
    varieties: ['Red Onion', 'White Onion', 'Nasik Red', 'Pusa Red'],
    sampleMsp: 2800,
    isDemo: true,
    season: Season.Rabi,
    category: 'Vegetable',
    avgYieldPerAcre: 180,
    durationDays: 130
  },
  {
    id: 'C2',
    name: 'Tomato',
    varieties: ['Desi Tomato', 'Hybrid Tomato', 'Arka Vikas', 'Pusa Ruby'],
    sampleMsp: 2000,
    isDemo: true,
    season: Season.Kharif,
    category: 'Vegetable',
    avgYieldPerAcre: 250,
    durationDays: 90
  },
  {
    id: 'C3',
    name: 'Wheat',
    varieties: ['Lokwan', 'Sharbati', 'Pusa 1121', 'DBW 187'],
    sampleMsp: 2275,
    isDemo: true,
    season: Season.Rabi,
    category: 'Cereal',
    avgYieldPerAcre: 18,
    durationDays: 140
  },
  {
    id: 'C4',
    name: 'Soybean',
    varieties: ['JS 335', 'JS 9560', 'JS 2069', 'NRC 37'],
    sampleMsp: 4600,
    isDemo: true,
    season: Season.Kharif,
    category: 'Oilseed',
    avgYieldPerAcre: 12,
    durationDays: 110
  },
  {
    id: 'C5',
    name: 'Cotton',
    varieties: ['Bollgard II', 'MCU 5', 'Jadhav Cotton', 'Hybrid Cotton'],
    sampleMsp: 7020,
    isDemo: true,
    season: Season.Kharif,
    category: 'Fiber',
    avgYieldPerAcre: 15,
    durationDays: 180
  },
  {
    id: 'C6',
    name: 'Rice',
    varieties: ['Indrayani', 'Basmati 1121', 'Ambemohar', 'Ponni', 'Sona Masoori'],
    sampleMsp: 2183,
    isDemo: true,
    season: Season.Kharif,
    category: 'Cereal',
    avgYieldPerAcre: 25,
    durationDays: 150
  },
  {
    id: 'C7',
    name: 'Maize',
    varieties: ['Hybrid Maize', 'Ganga 5', 'DHM 117', 'Pioneer 30V92'],
    sampleMsp: 2225,
    isDemo: true,
    season: Season.Kharif,
    category: 'Cereal',
    avgYieldPerAcre: 30,
    durationDays: 110
  }
];

export const getCropById = (id: string): Crop | undefined =>
  crops.find((c) => c.id === id);

export const getCropByName = (name: string): Crop | undefined =>
  crops.find((c) => c.name.toLowerCase() === name.toLowerCase());
