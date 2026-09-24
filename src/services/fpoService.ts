import { fpos } from '@/data/fpos';
import { farmers } from '@/data/farmers';
import type { FPO, Farmer } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface FPOFilters {
  cropId?: string;
  district?: string;
  isVerified?: boolean;
}

interface AggregatedProduce {
  cropId: string;
  totalKg: number;
  farmerCount: number;
}

export function getFPOs(filters?: FPOFilters): Promise<FPO[]> {
  let result = [...fpos];
  if (filters?.cropId) {
    result = result.filter((f) => f.crops.includes(filters.cropId!));
  }
  if (filters?.district) {
    result = result.filter((f) => f.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.isVerified !== undefined) {
    result = result.filter((f) => f.isVerified === filters.isVerified);
  }
  return delay(result);
}

export function getFPOById(id: string): Promise<FPO | undefined> {
  return delay(fpos.find((f) => f.id === id));
}

export function getFPOMembers(fpoId: string): Promise<Farmer[]> {
  return delay(farmers.filter((f) => f.fpoId === fpoId));
}

export function aggregateFPOProduce(fpoId: string): Promise<AggregatedProduce[]> {
  const members = farmers.filter((f) => f.fpoId === fpoId);
  const cropMap = new Map<string, { totalKg: number; farmerIds: Set<string> }>();
  members.forEach((member) => {
    member.crops.forEach((cropId) => {
      if (!cropMap.has(cropId)) {
        cropMap.set(cropId, { totalKg: 0, farmerIds: new Set() });
      }
      const entry = cropMap.get(cropId)!;
      const avgLand = member.landArea ?? 5;
      entry.totalKg += Math.round(avgLand * 800 + Math.random() * 2000);
      entry.farmerIds.add(member.id);
    });
  });
  const result: AggregatedProduce[] = Array.from(cropMap.entries()).map(([cropId, data]) => ({
    cropId,
    totalKg: data.totalKg,
    farmerCount: data.farmerIds.size,
  }));
  return delay(result);
}
