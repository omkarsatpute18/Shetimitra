import { transportRequests } from '@/data/transportRequests';
import { transportProviders } from '@/data/transportProviders';
import type { TransportRequest, TransportProvider } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface TransportRequestFilters {
  requesterId?: string;
  requesterType?: 'farmer' | 'buyer' | 'fpo';
  status?: string;
  cropId?: string;
}

interface PostTransportRequestPayload {
  requesterId: string;
  requesterType: 'farmer' | 'buyer' | 'fpo';
  cropId?: string;
  quantity: number;
  unit: string;
  pickupLat: number;
  pickupLng: number;
  pickupAddress: string;
  dropLat: number;
  dropLng: number;
  dropAddress: string;
  pickupDate: string;
  vehicleType?: string;
  vehicleCapacityRequired?: number;
}

interface CombineResult {
  tripId: string;
  totalKg: number;
  remainingKg: number;
  pickups: Array<{ farmerId: string; qty: number }>;
}

interface RoutePickup {
  lat: number;
  lng: number;
  address?: string;
}

interface RouteDestination {
  lat: number;
  lng: number;
  address?: string;
}

interface RouteResult {
  totalKm: number;
  etaHours: number;
  waypoints: Array<{ lat: number; lng: number; order: number }>;
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

export function getTransportRequests(filters?: TransportRequestFilters): Promise<TransportRequest[]> {
  let result = [...transportRequests];
  if (filters?.requesterId) {
    result = result.filter((t) => t.requesterId === filters.requesterId);
  }
  if (filters?.requesterType) {
    result = result.filter((t) => t.requesterType === filters.requesterType);
  }
  if (filters?.status) {
    result = result.filter((t) => t.status === filters.status);
  }
  if (filters?.cropId) {
    result = result.filter((t) => t.cropId === filters.cropId);
  }
  return delay(result);
}

export function postTransportRequest(
  payload: PostTransportRequestPayload
): Promise<TransportRequest> {
  const request: TransportRequest = {
    id: 'TR_' + Math.random().toString(36).slice(2, 10).toUpperCase(),
    requesterId: payload.requesterId,
    requesterType: payload.requesterType,
    cropId: payload.cropId,
    quantity: payload.quantity,
    unit: payload.unit,
    pickupLat: payload.pickupLat,
    pickupLng: payload.pickupLng,
    pickupAddress: payload.pickupAddress,
    dropLat: payload.dropLat,
    dropLng: payload.dropLng,
    dropAddress: payload.dropAddress,
    pickupDate: payload.pickupDate,
    vehicleType: payload.vehicleType,
    vehicleCapacityRequired: payload.vehicleCapacityRequired,
    status: 'open',
    createdAt: new Date().toISOString(),
  };
  return delay(request);
}

export function combineRequests(
  requestIds: string[],
  vehicleCapacityKg: number
): Promise<CombineResult> {
  const selected = transportRequests.filter((t) => requestIds.includes(t.id));
  const totalKg = selected.reduce((sum, r) => sum + r.quantity, 0);
  const remainingKg = Math.max(0, vehicleCapacityKg - totalKg);
  const pickups = selected.map((r) => ({
    farmerId: r.requesterId,
    qty: r.quantity,
  }));
  return delay({
    tripId: 'TRIP_' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    totalKg,
    remainingKg,
    pickups,
  });
}

export function getNearbyProviders(
  lat: number,
  lng: number,
  radius: number
): Promise<TransportProvider[]> {
  const result = transportProviders.filter((p) => {
    const dist = haversine(lat, lng, p.lat, p.lng);
    return dist <= radius;
  });
  return delay(result);
}

export function calculateRoute(
  pickups: RoutePickup[],
  destination: RouteDestination
): Promise<RouteResult> {
  const waypoints = pickups.map((p, i) => ({ lat: p.lat, lng: p.lng, order: i + 1 }));
  let totalKm = 0;
  const allPoints: Array<{ lat: number; lng: number }> = [...pickups, destination];
  for (let i = 0; i < allPoints.length - 1; i++) {
    totalKm += haversine(allPoints[i].lat, allPoints[i].lng, allPoints[i + 1].lat, allPoints[i + 1].lng);
  }
  totalKm = Math.round(totalKm * 10) / 10;
  const avgSpeedKmh = 35;
  const etaHours = Math.round((totalKm / avgSpeedKmh) * 10) / 10;
  return delay({ totalKm, etaHours, waypoints });
}
