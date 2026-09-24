import { farmers, primaryDemoFarmer } from '@/data/farmers';
import type { Farmer, ProduceListing } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const produceListings: ProduceListing[] = [
  {
    id: 'PL1',
    farmerId: 'F1',
    cropId: 'C1',
    variety: 'Nasik Red',
    quantity: 3500,
    unit: 'kg',
    pricePerUnit: 29.0,
    harvestDate: '2026-09-15',
    qualityGrade: 'A',
    description: 'Freshly harvested A-grade Nasik Red Onions',
    isActive: true,
    createdAt: '2026-09-16T08:00:00Z',
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    id: 'PL2',
    farmerId: 'F1',
    cropId: 'C2',
    variety: 'Arka Vikas',
    quantity: 1800,
    unit: 'kg',
    pricePerUnit: 22.5,
    harvestDate: '2026-09-18',
    qualityGrade: 'A',
    isActive: true,
    createdAt: '2026-09-19T10:30:00Z',
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    id: 'PL3',
    farmerId: 'F2',
    cropId: 'C3',
    variety: 'Lokwan',
    quantity: 6000,
    unit: 'kg',
    pricePerUnit: 24.0,
    harvestDate: '2026-09-10',
    qualityGrade: 'A',
    description: 'Premium Lokwan Wheat with 12% moisture',
    isActive: true,
    createdAt: '2026-09-12T07:00:00Z',
    lat: 18.1489,
    lng: 74.5794,
  },
  {
    id: 'PL4',
    farmerId: 'F3',
    cropId: 'C1',
    variety: 'Red Onion',
    quantity: 2200,
    unit: 'kg',
    pricePerUnit: 27.0,
    harvestDate: '2026-09-12',
    qualityGrade: 'B',
    isActive: true,
    createdAt: '2026-09-14T09:00:00Z',
    lat: 20.0875,
    lng: 74.0420,
  },
  {
    id: 'PL5',
    farmerId: 'F4',
    cropId: 'C1',
    variety: 'Nasik Red',
    quantity: 4200,
    unit: 'kg',
    pricePerUnit: 28.5,
    harvestDate: '2026-09-14',
    qualityGrade: 'A',
    isActive: true,
    createdAt: '2026-09-15T11:00:00Z',
    lat: 19.8550,
    lng: 74.0040,
  },
];

interface ListProducePayload {
  cropId: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  harvestDate: string;
  qualityGrade?: 'A' | 'B' | 'C';
  description?: string;
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getFarmerProfile(id: string): Promise<Farmer | undefined> {
  return delay(farmers.find((f) => f.id === id));
}

export function getProduceListings(farmerId: string): Promise<ProduceListing[]> {
  return delay(produceListings.filter((p) => p.farmerId === farmerId));
}

export function listProduce(
  farmerId: string,
  payload: ListProducePayload
): Promise<ProduceListing> {
  const farmer = farmers.find((f) => f.id === farmerId) ?? primaryDemoFarmer;
  const listing: ProduceListing = {
    id: 'PL_' + Math.random().toString(36).slice(2, 10).toUpperCase(),
    farmerId,
    cropId: payload.cropId,
    variety: payload.variety,
    quantity: payload.quantity,
    unit: payload.unit,
    pricePerUnit: payload.pricePerUnit,
    harvestDate: payload.harvestDate,
    qualityGrade: payload.qualityGrade,
    description: payload.description,
    isActive: true,
    createdAt: new Date().toISOString(),
    lat: farmer.lat,
    lng: farmer.lng,
  };
  return delay(listing);
}

export function getNearbyFarmers(
  lat: number,
  lng: number,
  radiusKm: number,
  cropId?: string
): Promise<Farmer[]> {
  let result = farmers.filter((f) => {
    const dist = haversine(lat, lng, f.lat, f.lng);
    return dist <= radiusKm;
  });
  if (cropId) {
    result = result.filter((f) => f.crops.includes(cropId));
  }
  return delay(result);
}

interface WeatherData {
  temp: number;
  humidity: number;
  condition: string;
  rainfall: number;
  windKmH: number;
}

export function getCurrentWeather(_lat: number, _lng: number): Promise<WeatherData> {
  void _lat;
  void _lng;
  const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Sunny'];
  return delay({
    temp: 24 + Math.round(Math.random() * 8),
    humidity: 45 + Math.round(Math.random() * 35),
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    rainfall: Math.round(Math.random() * 20 * 10) / 10,
    windKmH: 5 + Math.round(Math.random() * 18),
  });
}
