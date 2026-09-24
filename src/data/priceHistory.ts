// Demo/Sample data - Smart India Hackathon 2026 Prototype
import type { PriceHistory, PriceRecord } from '@/types';
import { crops } from './crops';

function generatePriceRecords(
  cropId: string,
  days: number,
  basePrice: number,
  msp: number
): PriceRecord[] {
  const records: PriceRecord[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.2;
    const modal = Math.round(basePrice * (1 + variation));
    const min = Math.round(modal * 0.88);
    const max = Math.round(modal * 1.12);
    records.push({
      id: `PR_${cropId}_${days}d_${i}`,
      cropId,
      date: date.toISOString().split('T')[0],
      modal,
      min,
      max,
      msp
    });
  }
  return records;
}

const cropBasePrices: Record<string, { base: number; msp: number }> = {
  C1: { base: 2800, msp: 2800 },
  C2: { base: 2100, msp: 2000 },
  C3: { base: 2350, msp: 2275 },
  C4: { base: 4750, msp: 4600 },
  C5: { base: 7200, msp: 7020 },
  C6: { base: 2250, msp: 2183 },
  C7: { base: 2300, msp: 2225 }
};

export const priceHistory: PriceHistory[] = crops.map((crop) => {
  const { base, msp } = cropBasePrices[crop.id] || { base: 2000, msp: 1800 };
  return {
    cropId: crop.id,
    cropName: crop.name,
    '7d': generatePriceRecords(crop.id, 7, base, msp),
    '30d': generatePriceRecords(crop.id, 30, base, msp),
    '90d': generatePriceRecords(crop.id, 90, base, msp)
  };
});

export const getPriceHistoryByCropId = (cropId: string): PriceHistory | undefined =>
  priceHistory.find((p) => p.cropId === cropId);
