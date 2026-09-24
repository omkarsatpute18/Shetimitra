// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { LotStatus, type Lot } from '@/types';

export const lots: Lot[] = [
  {
    id: 'L1',
    fpoId: 'FPO1',
    cropId: 'C1',
    variety: 'Nasik Red',
    targetQuantity: 5000,
    currentQuantity: 2800,
    unit: 'kg',
    reservePrice: 29.0,
    status: LotStatus.Active,
    farmerIds: ['F1', 'F4', 'F6'],
    deadline: '2026-09-26T23:59:59Z',
    createdAt: '2026-09-20T10:00:00Z',
    lat: 18.4830,
    lng: 73.7500
  },
  {
    id: 'L2',
    fpoId: 'FPO2',
    cropId: 'C3',
    variety: 'Lokwan',
    targetQuantity: 10000,
    currentQuantity: 10000,
    unit: 'kg',
    reservePrice: 24.5,
    status: LotStatus.Filled,
    farmerIds: ['F2', 'F5'],
    deadline: '2026-09-22T23:59:59Z',
    createdAt: '2026-09-15T10:00:00Z',
    lat: 17.2805,
    lng: 74.2003
  },
  {
    id: 'L3',
    fpoId: 'FPO1',
    cropId: 'C2',
    variety: 'Arka Vikas',
    targetQuantity: 3500,
    currentQuantity: 900,
    unit: 'kg',
    reservePrice: 22.0,
    status: LotStatus.Active,
    farmerIds: ['F1'],
    deadline: '2026-09-28T23:59:59Z',
    createdAt: '2026-09-23T08:00:00Z',
    lat: 18.4830,
    lng: 73.7500
  }
];

export const getLotById = (id: string): Lot | undefined =>
  lots.find((l) => l.id === id);

export const getActiveLots = (): Lot[] =>
  lots.filter((l) => l.status === LotStatus.Active);

export const getLotsByCrop = (cropId: string): Lot[] =>
  lots.filter((l) => l.cropId === cropId);
