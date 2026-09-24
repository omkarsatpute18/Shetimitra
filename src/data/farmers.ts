// Demo/Sample data - Smart India Hackathon 2026 Prototype
import type { Farmer } from '@/types';

export const farmers: Farmer[] = [
  {
    id: 'F1',
    name: 'Rajendra Desai',
    village: 'Haveli',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.5204,
    lng: 73.8567,
    phone: '+91 98220 11111',
    crops: ['C1', 'C2', 'C6'],
    fpoId: 'FPO1',
    rating: 4.7,
    isVerified: true,
    landArea: 12,
    farmingExperience: 18
  },
  {
    id: 'F2',
    name: 'Suresh Patil',
    village: 'Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.1489,
    lng: 74.5794,
    phone: '+91 98220 22222',
    crops: ['C3', 'C4', 'C7'],
    fpoId: 'FPO2',
    rating: 4.5,
    isVerified: true,
    landArea: 15,
    farmingExperience: 22
  },
  {
    id: 'F3',
    name: 'Vishwanath Jadhav',
    village: 'Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 20.0875,
    lng: 74.0420,
    phone: '+91 98220 33333',
    crops: ['C1', 'C5', 'C6'],
    rating: 4.3,
    isVerified: true,
    landArea: 8,
    farmingExperience: 12
  },
  {
    id: 'F4',
    name: 'Babanrao Shinde',
    village: 'Sinnar',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 19.8550,
    lng: 74.0040,
    phone: '+91 98220 44444',
    crops: ['C1', 'C2', 'C4'],
    fpoId: 'FPO1',
    rating: 4.6,
    isVerified: true,
    landArea: 10,
    farmingExperience: 25
  },
  {
    id: 'F5',
    name: 'Pandurang Koli',
    village: 'Karjat',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    lat: 18.9200,
    lng: 75.4250,
    phone: '+91 98220 55555',
    crops: ['C3', 'C6', 'C7'],
    rating: 4.2,
    isVerified: false,
    landArea: 6,
    farmingExperience: 8
  },
  {
    id: 'F6',
    name: 'Ramesh Gaikwad',
    village: 'Sangamner',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    lat: 19.5700,
    lng: 74.2200,
    phone: '+91 98220 66666',
    crops: ['C1', 'C3', 'C5'],
    fpoId: 'FPO2',
    rating: 4.4,
    isVerified: true,
    landArea: 14,
    farmingExperience: 15
  }
];

export const primaryDemoFarmer: Farmer = {
  id: 'F1',
  name: 'बाळू तुकाराम पाटील',
  village: 'निफाड (Niphad)',
  district: 'नाशिक (Nashik)',
  state: 'महाराष्ट्र (Maharashtra)',
  lat: 20.0875,
  lng: 74.0420,
  phone: '+91 98220 11111',
  crops: ['C1', 'C2', 'C6'],
  fpoId: 'FPO1',
  rating: 4.8,
  isVerified: true,
  landArea: 6.5,
  farmingExperience: 15,
}

export function updateActiveFarmerProfile(profile: {
  name?: string
  village?: string
  district?: string
  phone?: string
  crops?: string[]
  landArea?: number
}) {
  if (profile.name) primaryDemoFarmer.name = profile.name
  if (profile.village) primaryDemoFarmer.village = profile.village
  if (profile.district) primaryDemoFarmer.district = profile.district
  if (profile.phone) primaryDemoFarmer.phone = profile.phone
  if (profile.landArea) primaryDemoFarmer.landArea = profile.landArea
}

export const getFarmerById = (id: string): Farmer | undefined =>
  farmers.find((f) => f.id === id);

export const getFarmersByFPO = (fpoId: string): Farmer[] =>
  farmers.filter((f) => f.fpoId === fpoId);
