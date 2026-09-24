// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { NotificationType, type Notification } from '@/types';

export const notifications: Notification[] = [
  {
    id: 'N1',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.BuyerInterest,
    title: 'New buyer interested in your Onion listing',
    message: 'ABC Agro Foods Pvt Ltd has shown interest in your 1500kg Nasik Red Onion. Check now to connect!',
    isRead: false,
    relatedEntityId: 'B1',
    relatedEntityType: 'demand',
    createdAt: '2026-09-24T06:15:00Z',
    priority: 'high'
  },
  {
    id: 'N2',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.PriceChange,
    title: 'Onion prices up by 8% in Pune APMC',
    message: 'Modal price of Onion increased from Rs. 2640 to Rs. 2850 per quintal in Pune APMC today. Consider selling now.',
    isRead: false,
    relatedEntityId: 'M1',
    relatedEntityType: 'order',
    createdAt: '2026-09-24T05:30:00Z',
    priority: 'medium'
  },
  {
    id: 'N3',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.NewDemand,
    title: 'Mumbai Vashi market needs 50MT Rice urgently',
    message: 'Mumbai Rice Mandi posted a new demand for Indrayani Rice at Rs. 2350/qtl. Deadline: 30 Sep 2026.',
    isRead: true,
    relatedEntityId: 'B6',
    relatedEntityType: 'demand',
    createdAt: '2026-09-23T14:20:00Z',
    priority: 'high'
  },
  {
    id: 'N4',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.LotInvite,
    title: 'Invite: Join Sahyadri FPO Onion Lot #L1',
    message: 'Sahyadri FPO is aggregating Onion for bulk sale to Perfect Grains. Target: 5000kg, Reserve: Rs.29/qtl. Join by 26 Sep.',
    isRead: false,
    relatedEntityId: 'L1',
    relatedEntityType: 'lot',
    createdAt: '2026-09-23T11:00:00Z',
    priority: 'medium'
  },
  {
    id: 'N5',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.TransportMatch,
    title: '3 transport providers matched for your route',
    message: 'For Pune to Mumbai (3200kg Tomato), we found Mahesh Teli (Rs. 85/km), Dilip Wagh (Rs. 145/km - Cold Chain) and 1 more.',
    isRead: false,
    relatedEntityId: 'TR3',
    relatedEntityType: 'transport',
    createdAt: '2026-09-23T09:45:00Z',
    priority: 'medium'
  },
  {
    id: 'N6',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.OrderConfirm,
    title: 'Order O3 confirmed - 5MT Soybean',
    message: 'Your order with Soyabean Processors India (B4) via FPO1 has been confirmed. Expected delivery: 28 Sep. Total: Rs. 2,42,500.',
    isRead: true,
    relatedEntityId: 'O3',
    relatedEntityType: 'order',
    createdAt: '2026-09-23T16:30:00Z',
    priority: 'high'
  },
  {
    id: 'N7',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.PaymentReceived,
    title: 'Payment received: Rs. 3,200 for transport O1',
    message: 'Advance transport payment for Order O1 has been credited to your linked wallet via UPI #UPI998877665544.',
    isRead: true,
    relatedEntityId: 'P5',
    relatedEntityType: 'payment',
    createdAt: '2026-09-22T07:55:00Z',
    priority: 'high'
  },
  {
    id: 'N8',
    userId: 'F2',
    userType: 'farmer',
    type: NotificationType.PaymentDelay,
    title: 'Payment P7 (Rs. 12,600) delayed',
    message: 'Warehouse storage invoice payment delayed: Cheque clearance hold due to bank holiday. Expected clearance by 26 Sep.',
    isRead: false,
    relatedEntityId: 'P7',
    relatedEntityType: 'payment',
    createdAt: '2026-09-24T04:10:00Z',
    priority: 'high'
  },
  {
    id: 'N9',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.StorageAvailability,
    title: 'Pune Central Cold Storage: 850 MT available',
    message: 'Cold storage near you has vacancy. Rs. 18/MT/day. Book for 15 days and get 10% bulk discount on first booking!',
    isRead: false,
    relatedEntityId: 'W1',
    relatedEntityType: 'fpo',
    createdAt: '2026-09-22T18:22:00Z',
    priority: 'low'
  },
  {
    id: 'N10',
    userId: 'F5',
    userType: 'farmer',
    type: NotificationType.FPOInvite,
    title: 'Join Ahmednagar Millets & Pulses FPO',
    message: 'Invitation to join Ahmednagar Millets & Pulses FPO with 145 members. Benefits: bulk input discounts, direct market linkages, PMFBY support.',
    isRead: false,
    relatedEntityId: 'FPO5',
    relatedEntityType: 'fpo',
    createdAt: '2026-09-21T10:00:00Z',
    priority: 'medium'
  },
  {
    id: 'N11',
    userId: 'F2',
    userType: 'farmer',
    type: NotificationType.PaymentReceived,
    title: 'Payment received: Rs. 8,500 for transport O2',
    message: 'Transport payment for Order O2 (Santosh Shinde - TP2) settled successfully via UPI.',
    isRead: true,
    relatedEntityId: 'P6',
    relatedEntityType: 'payment',
    createdAt: '2026-09-24T06:50:00Z',
    priority: 'high'
  },
  {
    id: 'N12',
    userId: 'B1',
    userType: 'buyer',
    type: NotificationType.OrderConfirm,
    title: 'Order O1 in transit - ETA today',
    message: 'Your 1500kg Nasik Red Onion order is on the way. Truck MH-12-CD-4521, ETA 5:00 PM today.',
    isRead: false,
    relatedEntityId: 'O1',
    relatedEntityType: 'order',
    createdAt: '2026-09-22T08:00:00Z',
    priority: 'high'
  },
  {
    id: 'N13',
    userId: 'F1',
    userType: 'farmer',
    type: NotificationType.NewDemand,
    title: 'Cotton Kings needs 10MT Cotton (Bollgard II)',
    message: 'New demand posted from Solapur. Price up to Rs. 7400/qtl. Quality grade A required.',
    isRead: true,
    relatedEntityId: 'B5',
    relatedEntityType: 'demand',
    createdAt: '2026-09-20T12:00:00Z',
    priority: 'medium'
  }
];

export const getNotificationById = (id: string): Notification | undefined =>
  notifications.find((n) => n.id === id);

export const getNotificationsByUser = (userId: string): Notification[] =>
  notifications.filter((n) => n.userId === userId);

export const getUnreadNotifications = (userId: string): Notification[] =>
  notifications.filter((n) => n.userId === userId && !n.isRead);
