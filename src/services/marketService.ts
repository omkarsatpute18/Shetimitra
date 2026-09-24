import { markets } from '@/data/markets';
import { priceHistory } from '@/data/priceHistory';
import { crops } from '@/data/crops';
import type { Market, PriceRecord } from '@/types';

const TRANSPORT_COST_RATE = 0.85;

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface MarketFilters {
  cropId?: string;
  distanceMax?: number;
}

interface CompareMarketResult {
  marketId: string;
  name: string;
  distance: number;
  currentPrice: number;
  msp: number;
  arrival: number;
  demand: string;
  transportCost: number;
  estimatedNetPrice: number;
}

export function getMarkets(filters?: MarketFilters): Promise<Market[]> {
  let result = [...markets];
  if (filters?.distanceMax !== undefined) {
    result = result.filter((m) => m.distanceFromDemoFarmer <= filters.distanceMax!);
  }
  if (filters?.cropId) {
    result = result.filter(() => true);
  }
  return delay(result);
}

export function getPriceHistory(cropId: string, days: 7 | 30 | 90): Promise<PriceRecord[]> {
  const history = priceHistory.find((p) => p.cropId === cropId);
  if (!history) return delay([]);
  const key = `${days}d` as '7d' | '30d' | '90d';
  return delay(history[key]);
}

export function compareMarkets(
  marketIds: string[],
  cropId: string,
  quantityKg: number
): Promise<CompareMarketResult[]> {
  const crop = crops.find((c) => c.id === cropId);
  const msp = crop?.sampleMsp ?? 0;
  const result: CompareMarketResult[] = marketIds
    .map((id) => markets.find((m) => m.id === id))
    .filter((m): m is Market => m !== undefined)
    .map((m) => {
      const transportCost = m.distanceFromDemoFarmer * quantityKg * TRANSPORT_COST_RATE;
      const gross = m.modalPrice * (quantityKg / 100);
      const estimatedNetPrice = gross - transportCost;
      return {
        marketId: m.id,
        name: m.name,
        distance: m.distanceFromDemoFarmer,
        currentPrice: m.modalPrice,
        msp,
        arrival: m.arrivalsToday,
        demand: m.demandLevel,
        transportCost: Math.round(transportCost),
        estimatedNetPrice: Math.round(estimatedNetPrice),
      };
    });
  return delay(result);
}
