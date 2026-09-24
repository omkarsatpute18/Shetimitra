import { warehouses } from '@/data/warehouses';
import type { Warehouse } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface WarehouseFilters {
  type?: 'cold' | 'dry' | 'both';
  district?: string;
  minAvailableMT?: number;
}

interface CompareSellStorePayload {
  cropId: string;
  quantityKg: number;
  currentMarketPrice: number;
  transportCost: number;
  warehouseId: string;
  storageDays: number;
  projectedFuturePrice: number;
}

interface CompareSellStoreResult {
  sellNow: {
    gross: number;
    transport: number;
    net: number;
    payInDays: number;
  };
  store: {
    gross: number;
    transport: number;
    storageCost: number;
    net: number;
    payInDays: number;
  };
  differenceNet: number;
  differenceDays: number;
  assumptions: string[];
}

export function getWarehouses(filters?: WarehouseFilters): Promise<Warehouse[]> {
  let result = [...warehouses];
  if (filters?.type) {
    if (filters.type === 'both') {
      result = result.filter((w) => w.type === 'cold' || w.type === 'dry' || w.type === 'both');
    } else {
      result = result.filter((w) => w.type === filters.type || w.type === 'both');
    }
  }
  if (filters?.district) {
    result = result.filter((w) => w.district.toLowerCase() === filters.district!.toLowerCase());
  }
  if (filters?.minAvailableMT !== undefined) {
    result = result.filter((w) => w.availableCapacityMT >= filters.minAvailableMT!);
  }
  return delay(result);
}

export function compareSellNowVsStore(
  payload: CompareSellStorePayload
): Promise<CompareSellStoreResult> {
  const warehouse = warehouses.find((w) => w.id === payload.warehouseId);
  const quantityMT = payload.quantityKg / 1000;
  const storageCostPerDay = warehouse ? warehouse.pricePerMTDay * quantityMT : 12 * quantityMT;
  const totalStorageCost = Math.round(storageCostPerDay * payload.storageDays);

  const grossNow = Math.round(payload.currentMarketPrice * payload.quantityKg);
  const netNow = grossNow - payload.transportCost;

  const grossStore = Math.round(payload.projectedFuturePrice * payload.quantityKg);
  const roundtripTransport = Math.round(payload.transportCost * 2);
  const netStore = grossStore - roundtripTransport - totalStorageCost;

  return delay({
    sellNow: {
      gross: grossNow,
      transport: payload.transportCost,
      net: netNow,
      payInDays: 3,
    },
    store: {
      gross: grossStore,
      transport: roundtripTransport,
      storageCost: totalStorageCost,
      net: netStore,
      payInDays: payload.storageDays + 5,
    },
    differenceNet: netStore - netNow,
    differenceDays: (payload.storageDays + 5) - 3,
    assumptions: [
      'Projected future price trend based on 90-day historical data',
      'Storage cost includes standard insurance up to 90% of value',
      'Round-trip transport cost applied for storage (to warehouse and to eventual buyer)',
      'Payment for sell-now via mandi settlement (T+3 days)',
      'Storage sell assumes market disposal 2 days after storage period ends',
      'Price projection does not account for unforeseen market shocks',
    ],
  });
}
