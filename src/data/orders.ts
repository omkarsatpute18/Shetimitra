// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { OrderStatus, type Order, type OrderTimelineStep } from '@/types';

const order1Timeline: OrderTimelineStep[] = [
  {
    id: 'OTS1',
    orderId: 'O1',
    status: OrderStatus.Pending,
    timestamp: '2026-09-20T10:30:00Z',
    description: 'Order placed by buyer, awaiting farmer confirmation',
    actor: 'Amit Shah',
    actorId: 'B1'
  },
  {
    id: 'OTS2',
    orderId: 'O1',
    status: OrderStatus.Confirmed,
    timestamp: '2026-09-20T14:15:00Z',
    description: 'Farmer accepted the order, price and quantity locked',
    actor: 'Rajendra Desai',
    actorId: 'F1'
  },
  {
    id: 'OTS3',
    orderId: 'O1',
    status: OrderStatus.InTransit,
    timestamp: '2026-09-22T08:00:00Z',
    description: 'Produce dispatched via Pune Goods Carrier, ETA 24 Sep',
    actor: 'Mahesh Teli',
    actorId: 'TP1'
  }
];

const order2Timeline: OrderTimelineStep[] = [
  {
    id: 'OTS4',
    orderId: 'O2',
    status: OrderStatus.Pending,
    timestamp: '2026-09-21T09:00:00Z',
    description: 'Order requested for 3MT Wheat',
    actor: 'Rajesh Kumar',
    actorId: 'B2'
  },
  {
    id: 'OTS5',
    orderId: 'O2',
    status: OrderStatus.Confirmed,
    timestamp: '2026-09-21T11:45:00Z',
    description: 'Farmer confirmed with quality grade A Lokwan Wheat',
    actor: 'Suresh Patil',
    actorId: 'F2'
  },
  {
    id: 'OTS6',
    orderId: 'O2',
    status: OrderStatus.InTransit,
    timestamp: '2026-09-23T07:30:00Z',
    description: 'Dispatched via Nashik Logistics, vehicle MH-12-AB-7890',
    actor: 'Santosh Shinde',
    actorId: 'TP2'
  },
  {
    id: 'OTS7',
    orderId: 'O2',
    status: OrderStatus.Delivered,
    timestamp: '2026-09-24T06:15:00Z',
    description: 'Goods delivered and received at buyer warehouse, POD signed',
    actor: 'Rajesh Kumar',
    actorId: 'B2'
  }
];

const order3Timeline: OrderTimelineStep[] = [
  {
    id: 'OTS8',
    orderId: 'O3',
    status: OrderStatus.Pending,
    timestamp: '2026-09-23T12:00:00Z',
    description: 'FPO bulk order for Soybean placed on behalf of members',
    actor: 'Sahyadri FPO',
    actorId: 'FPO1'
  },
  {
    id: 'OTS9',
    orderId: 'O3',
    status: OrderStatus.Confirmed,
    timestamp: '2026-09-23T16:30:00Z',
    description: 'FPO confirmed and payment processing initiated',
    actor: 'Manoj Agrawal',
    actorId: 'B4'
  }
];

export const orders: Order[] = [
  {
    id: 'O1',
    buyerId: 'B1',
    farmerId: 'F1',
    cropId: 'C1',
    variety: 'Nasik Red',
    quantity: 1500,
    unit: 'kg',
    agreedPricePerUnit: 29.5,
    totalAmount: 44250,
    status: OrderStatus.InTransit,
    pickupAddress: 'Haveli Village, Pune District',
    pickupLat: 18.5204,
    pickupLng: 73.8567,
    dropAddress: 'Shivaji Nagar, Pune - ABC Agro Foods Warehouse',
    dropLat: 18.5314,
    dropLng: 73.8446,
    expectedDeliveryDate: '2026-09-24T17:00:00Z',
    timeline: order1Timeline,
    transportRequestId: 'TR1',
    paymentId: 'P1',
    createdAt: '2026-09-20T10:30:00Z'
  },
  {
    id: 'O2',
    buyerId: 'B2',
    farmerId: 'F2',
    cropId: 'C3',
    variety: 'Lokwan',
    quantity: 3000,
    unit: 'kg',
    agreedPricePerUnit: 24.0,
    totalAmount: 72000,
    status: OrderStatus.Delivered,
    pickupAddress: 'Baramati, Pune District',
    pickupLat: 18.1489,
    pickupLng: 74.5794,
    dropAddress: 'Hadapsar, Pune - Perfect Grains Processing Unit',
    dropLat: 18.5089,
    dropLng: 73.9315,
    expectedDeliveryDate: '2026-09-24T12:00:00Z',
    actualDeliveryDate: '2026-09-24T06:15:00Z',
    timeline: order2Timeline,
    transportRequestId: 'TR2',
    paymentId: 'P2',
    createdAt: '2026-09-21T09:00:00Z'
  },
  {
    id: 'O3',
    buyerId: 'B4',
    farmerId: 'F1',
    fpoId: 'FPO1',
    cropId: 'C4',
    variety: 'JS 335',
    quantity: 5000,
    unit: 'kg',
    agreedPricePerUnit: 48.5,
    totalAmount: 242500,
    status: OrderStatus.Confirmed,
    pickupAddress: 'Sahyadri FPO Collection Center, Mulshi',
    pickupLat: 18.4830,
    pickupLng: 73.7500,
    dropAddress: 'Cidco, Aurangabad - Soyabean Processors India',
    dropLat: 19.8762,
    dropLng: 75.3433,
    expectedDeliveryDate: '2026-09-28T12:00:00Z',
    timeline: order3Timeline,
    createdAt: '2026-09-23T12:00:00Z'
  },
  {
    id: 'O4',
    buyerId: 'B3',
    farmerId: 'F3',
    cropId: 'C1',
    variety: 'Red Onion',
    quantity: 2200,
    unit: 'kg',
    agreedPricePerUnit: 27.0,
    totalAmount: 59400,
    status: OrderStatus.Completed,
    pickupAddress: 'Niphad, Nashik',
    pickupLat: 20.0875,
    pickupLng: 74.0420,
    dropAddress: 'Main Market Yard, Nashik',
    dropLat: 19.9975,
    dropLng: 73.7898,
    expectedDeliveryDate: '2026-09-18T12:00:00Z',
    actualDeliveryDate: '2026-09-18T10:30:00Z',
    timeline: [
      {
        id: 'OTS10',
        orderId: 'O4',
        status: OrderStatus.Completed,
        timestamp: '2026-09-19T18:00:00Z',
        description: 'Order completed successfully. Payment released.',
        actor: 'System',
        actorId: 'SYS'
      }
    ],
    createdAt: '2026-09-16T09:00:00Z'
  }
];

export const getOrderById = (id: string): Order | undefined =>
  orders.find((o) => o.id === id);

export const getOrdersByFarmerId = (farmerId: string): Order[] =>
  orders.filter((o) => o.farmerId === farmerId);

export const getOrdersByBuyerId = (buyerId: string): Order[] =>
  orders.filter((o) => o.buyerId === buyerId);
