import { buyers } from '@/data/buyers';
import type { Buyer, BuyerDemand } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface BuyerFilters {
  cropId?: string;
  verificationStatus?: string;
  district?: string;
}

interface DemandFilters {
  cropId?: string;
  buyerId?: string;
  isActive?: boolean;
}

const buyerDemands: BuyerDemand[] = [
  {
    id: 'BD1',
    buyerId: 'B1',
    cropId: 'C1',
    variety: 'Nasik Red',
    quantity: 5000,
    unit: 'kg',
    maxPricePerUnit: 30.5,
    requiredByDate: '2026-10-05',
    qualityGrade: 'A',
    description: 'A-grade onion for export packaging',
    isActive: true,
    createdAt: '2026-09-20T10:00:00Z',
    lat: 18.5314,
    lng: 73.8446,
  },
  {
    id: 'BD2',
    buyerId: 'B2',
    cropId: 'C3',
    variety: 'Lokwan',
    quantity: 10000,
    unit: 'kg',
    maxPricePerUnit: 25.0,
    requiredByDate: '2026-10-10',
    qualityGrade: 'A',
    description: 'Premium Lokwan wheat for milling',
    isActive: true,
    createdAt: '2026-09-21T08:30:00Z',
    lat: 18.5089,
    lng: 73.9315,
  },
  {
    id: 'BD3',
    buyerId: 'B3',
    cropId: 'C1',
    variety: 'Red Onion',
    quantity: 8000,
    unit: 'kg',
    maxPricePerUnit: 28.0,
    requiredByDate: '2026-09-30',
    qualityGrade: 'B',
    description: 'Regular red onion for wholesale mandi',
    isActive: true,
    createdAt: '2026-09-22T14:00:00Z',
    lat: 19.9975,
    lng: 73.7898,
  },
  {
    id: 'BD4',
    buyerId: 'B6',
    cropId: 'C6',
    variety: 'Basmati 1121',
    quantity: 15000,
    unit: 'kg',
    maxPricePerUnit: 45.0,
    requiredByDate: '2026-10-15',
    qualityGrade: 'A',
    description: 'Basmati rice for export',
    isActive: true,
    createdAt: '2026-09-23T09:15:00Z',
    lat: 19.0760,
    lng: 72.8777,
  },
  {
    id: 'BD5',
    buyerId: 'B4',
    cropId: 'C4',
    variety: 'JS 335',
    quantity: 20000,
    unit: 'kg',
    maxPricePerUnit: 49.5,
    requiredByDate: '2026-10-20',
    qualityGrade: 'A',
    description: 'Soybean for oil extraction',
    isActive: true,
    createdAt: '2026-09-23T16:45:00Z',
    lat: 19.8762,
    lng: 75.3433,
  },
];

export function getBuyers(filters?: BuyerFilters): Promise<Buyer[]> {
  let result = [...buyers];
  if (filters?.cropId) {
    result = result.filter((b) => b.cropsRequired.includes(filters.cropId!));
  }
  if (filters?.verificationStatus) {
    result = result.filter((b) => b.verificationStatus === filters.verificationStatus);
  }
  if (filters?.district) {
    result = result.filter(() => true);
  }
  return delay(result);
}

export function getBuyerById(id: string): Promise<Buyer | undefined> {
  return delay(buyers.find((b) => b.id === id));
}

export function getBuyerDemands(filters?: DemandFilters): Promise<BuyerDemand[]> {
  let result = [...buyerDemands];
  if (filters?.cropId) {
    result = result.filter((d) => d.cropId === filters.cropId);
  }
  if (filters?.buyerId) {
    result = result.filter((d) => d.buyerId === filters.buyerId);
  }
  if (filters?.isActive !== undefined) {
    result = result.filter((d) => d.isActive === filters.isActive);
  }
  return delay(result);
}

export function createOffer(
  demandId: string,
  farmerId: string,
  qty: number,
  price: number
): Promise<{ success: true; offerId: string }> {
  void demandId;
  void farmerId;
  void qty;
  void price;
  const offerId = 'OFF_' + Math.random().toString(36).slice(2, 10).toUpperCase();
  return delay({ success: true as const, offerId });
}
