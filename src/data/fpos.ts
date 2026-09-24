// Demo/Sample data - Smart India Hackathon 2026 Prototype
import type { FPO } from '@/types';

export const fpos: FPO[] = [
  {
    id: 'FPO1',
    name: 'Sahyadri Farmer Producer Company Ltd',
    registrationNumber: 'FPO/MH/001234',
    village: 'Mulshi',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.4830,
    lng: 73.7500,
    memberCount: 324,
    crops: ['C1', 'C2', 'C6'],
    phone: '+91 98230 11111',
    email: 'info@sahyadrifpo.in',
    rating: 4.6,
    isVerified: true,
    totalLandArea: 1850,
    yearEstablished: 2018
  },
  {
    id: 'FPO2',
    name: 'Krishna Valley FPO',
    registrationNumber: 'FPO/MH/005678',
    village: 'Karad',
    district: 'Satara',
    state: 'Maharashtra',
    lat: 17.2805,
    lng: 74.2003,
    memberCount: 512,
    crops: ['C3', 'C4', 'C7'],
    phone: '+91 98230 22222',
    email: 'contact@krishnavalleyfpo.org',
    rating: 4.4,
    isVerified: true,
    totalLandArea: 3200,
    yearEstablished: 2019
  },
  {
    id: 'FPO3',
    name: 'Nashik Grape Growers FPO',
    registrationNumber: 'FPO/MH/009012',
    village: 'Niphad',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 20.0875,
    lng: 74.0420,
    memberCount: 198,
    crops: ['C1', 'C5'],
    phone: '+91 98230 33333',
    rating: 4.5,
    isVerified: true,
    totalLandArea: 1100,
    yearEstablished: 2020
  },
  {
    id: 'FPO4',
    name: 'Godavari Watershed FPO',
    registrationNumber: 'FPO/MH/003456',
    village: 'Paithan',
    district: 'Aurangabad',
    state: 'Maharashtra',
    lat: 19.4500,
    lng: 75.3833,
    memberCount: 276,
    crops: ['C3', 'C6', 'C4'],
    phone: '+91 98230 44444',
    email: 'admin@godavarifpo.coop',
    rating: 4.2,
    isVerified: false,
    totalLandArea: 1650,
    yearEstablished: 2021
  },
  {
    id: 'FPO5',
    name: 'Ahmednagar Millets & Pulses FPO',
    registrationNumber: 'FPO/MH/007890',
    village: 'Shrirampur',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    lat: 19.6100,
    lng: 74.6700,
    memberCount: 145,
    crops: ['C3', 'C7', 'C4'],
    phone: '+91 98230 55555',
    rating: 4.3,
    isVerified: true,
    totalLandArea: 870,
    yearEstablished: 2022
  }
];

export const getFPOById = (id: string): FPO | undefined =>
  fpos.find((f) => f.id === id);

export const getFPOsByCrop = (cropId: string): FPO[] =>
  fpos.filter((f) => f.crops.includes(cropId));
