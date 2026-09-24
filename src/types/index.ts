export type UserRole = 'farmer' | 'buyer' | 'fpo' | 'transport'
export const UserRole = {
  Farmer: 'farmer' as const,
  Buyer: 'buyer' as const,
  FPO: 'fpo' as const,
  Transport: 'transport' as const,
} satisfies Record<string, UserRole>

export type VerificationStatus = 'none' | 'demo' | 'platform'
export const VerificationStatus = {
  None: 'none' as const,
  Demo: 'demo' as const,
  Platform: 'platform' as const,
} satisfies Record<string, VerificationStatus>

export type Season = 'kharif' | 'rabi' | 'zaid' | 'perennial'
export const Season = {
  Kharif: 'kharif' as const,
  Rabi: 'rabi' as const,
  Zaid: 'zaid' as const,
  Perennial: 'perennial' as const,
} satisfies Record<string, Season>

export type DemandLevel = 'high' | 'med' | 'low'
export const DemandLevel = {
  High: 'high' as const,
  Medium: 'med' as const,
  Low: 'low' as const,
} satisfies Record<string, DemandLevel>

export type OrderStatus = 'pending' | 'confirmed' | 'in_transit' | 'delivered' | 'completed' | 'cancelled'
export const OrderStatus = {
  Pending: 'pending' as const,
  Confirmed: 'confirmed' as const,
  InTransit: 'in_transit' as const,
  Delivered: 'delivered' as const,
  Completed: 'completed' as const,
  Cancelled: 'cancelled' as const,
} satisfies Record<string, OrderStatus>

export type PaymentStatus = 'pending' | 'processing' | 'paid' | 'delayed'
export const PaymentStatus = {
  Pending: 'pending' as const,
  Processing: 'processing' as const,
  Paid: 'paid' as const,
  Delayed: 'delayed' as const,
} satisfies Record<string, PaymentStatus>

export type NotificationType =
  | 'buyer_interest'
  | 'price_change'
  | 'new_demand'
  | 'lot_invite'
  | 'transport_match'
  | 'order_confirm'
  | 'payment_received'
  | 'payment_delay'
  | 'storage_availability'
  | 'fpo_invite'
export const NotificationType = {
  BuyerInterest: 'buyer_interest' as const,
  PriceChange: 'price_change' as const,
  NewDemand: 'new_demand' as const,
  LotInvite: 'lot_invite' as const,
  TransportMatch: 'transport_match' as const,
  OrderConfirm: 'order_confirm' as const,
  PaymentReceived: 'payment_received' as const,
  PaymentDelay: 'payment_delay' as const,
  StorageAvailability: 'storage_availability' as const,
  FPOInvite: 'fpo_invite' as const,
} satisfies Record<string, NotificationType>

export type WarehouseType = 'cold' | 'dry' | 'both'
export const WarehouseType = {
  Cold: 'cold' as const,
  Dry: 'dry' as const,
  Both: 'both' as const,
} satisfies Record<string, WarehouseType>

export type LotStatus = 'active' | 'closed' | 'filled'
export const LotStatus = {
  Active: 'active' as const,
  Closed: 'closed' as const,
  Filled: 'filled' as const,
} satisfies Record<string, LotStatus>

export type TransportRequestStatus = 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
export const TransportRequestStatus = {
  Open: 'open' as const,
  Assigned: 'assigned' as const,
  InProgress: 'in_progress' as const,
  Completed: 'completed' as const,
  Cancelled: 'cancelled' as const,
} satisfies Record<string, TransportRequestStatus>

export interface GeoCoord {
  lat: number;
  lng: number;
}

export interface BuyerRating {
  payment: number;
  communication: number;
  priceFairness: number;
  experience: number;
}

export interface User {
  id: string;
  role: UserRole;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Farmer {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  phone: string;
  crops: string[];
  fpoId?: string;
  rating: number;
  isVerified: boolean;
  landArea?: number;
  farmingExperience?: number;
}

export interface Buyer {
  id: string;
  companyName: string;
  contactName: string;
  location: string;
  lat: number;
  lng: number;
  verificationStatus: VerificationStatus;
  rating: BuyerRating;
  pastTransactions: number;
  cropsRequired: string[];
  phone: string;
  email?: string;
  annualVolume?: number;
  gstin?: string;
}

export interface FPO {
  id: string;
  name: string;
  registrationNumber: string;
  village: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  memberCount: number;
  crops: string[];
  phone: string;
  email?: string;
  rating: number;
  isVerified: boolean;
  totalLandArea?: number;
  yearEstablished?: number;
}

export interface TransportProvider {
  id: string;
  name: string;
  companyName?: string;
  phone: string;
  lat: number;
  lng: number;
  vehicleCapacity: number;
  vehicleType: string;
  rating: number;
  totalTrips: number;
  isVerified: boolean;
  serviceRadius?: number;
  pricePerKm?: number;
  available: boolean;
}

export interface Crop {
  id: string;
  name: string;
  varieties: string[];
  sampleMsp: number;
  isDemo: boolean;
  season: Season;
  category: string;
  avgYieldPerAcre?: number;
  durationDays?: number;
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  cropId: string;
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  harvestDate: string;
  expiryDate?: string;
  qualityGrade?: 'A' | 'B' | 'C';
  images?: string[];
  description?: string;
  isActive: boolean;
  createdAt: string;
  lat: number;
  lng: number;
}

export interface BuyerDemand {
  id: string;
  buyerId: string;
  cropId: string;
  variety?: string;
  quantity: number;
  unit: string;
  maxPricePerUnit: number;
  requiredByDate: string;
  qualityGrade?: 'A' | 'B' | 'C';
  description?: string;
  isActive: boolean;
  createdAt: string;
  lat: number;
  lng: number;
}

export interface Market {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  distanceFromDemoFarmer: number;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  arrivalsToday: number;
  demandLevel: DemandLevel;
  operatingDays: string[];
  marketType: 'APMC' | 'Private' | 'Cooperative';
  lastUpdated: string;
}

export interface PriceRecord {
  id: string;
  cropId: string;
  marketId?: string;
  date: string;
  modal: number;
  min: number;
  max: number;
  msp: number;
}

export interface PriceHistory {
  cropId: string;
  cropName: string;
  '7d': PriceRecord[];
  '30d': PriceRecord[];
  '90d': PriceRecord[];
}

export interface Lot {
  id: string;
  fpoId?: string;
  cropId: string;
  variety: string;
  targetQuantity: number;
  currentQuantity: number;
  unit: string;
  reservePrice: number;
  status: LotStatus;
  farmerIds: string[];
  deadline: string;
  createdAt: string;
  lat: number;
  lng: number;
}

export interface TransportRequest {
  id: string;
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
  dropDate?: string;
  vehicleType?: string;
  vehicleCapacityRequired?: number;
  status: TransportRequestStatus;
  assignedProviderId?: string;
  quotedPrice?: number;
  finalPrice?: number;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  type: WarehouseType;
  address: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  totalCapacityMT: number;
  availableCapacityMT: number;
  distanceFromDemoFarmer: number;
  pricePerMTDay: number;
  facilities: string[];
  rating: number;
  isVerified: boolean;
  contactPhone: string;
}

export interface OrderTimelineStep {
  id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: string;
  description: string;
  actor: string;
  actorId: string;
}

export interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  fpoId?: string;
  cropId: string;
  variety: string;
  quantity: number;
  unit: string;
  agreedPricePerUnit: number;
  totalAmount: number;
  status: OrderStatus;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  dropAddress: string;
  dropLat: number;
  dropLng: number;
  expectedDeliveryDate: string;
  actualDeliveryDate?: string;
  timeline: OrderTimelineStep[];
  transportRequestId?: string;
  paymentId?: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  payerId: string;
  payerType: 'buyer' | 'fpo';
  payeeId: string;
  payeeType: 'farmer' | 'transport' | 'warehouse' | 'fpo';
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: string;
  transactionRef?: string;
  dueDate: string;
  paidDate?: string;
  delayReason?: string;
  createdAt: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  ministry: string;
  schemeType: string;
  isDemo: boolean;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationDeadline?: string;
  websiteUrl?: string;
  stateApplicable: string[];
  cropsCovered: string[];
}

export interface Notification {
  id: string;
  userId: string;
  userType: 'farmer' | 'buyer' | 'fpo' | 'transport';
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  relatedEntityId?: string;
  relatedEntityType?: 'order' | 'payment' | 'lot' | 'demand' | 'transport' | 'scheme' | 'fpo';
  createdAt: string;
  expiresAt?: string;
  priority: 'low' | 'medium' | 'high';
}
