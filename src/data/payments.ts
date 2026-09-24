// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { PaymentStatus, type Payment } from '@/types';

export const payments: Payment[] = [
  {
    id: 'P1',
    orderId: 'O1',
    payerId: 'B1',
    payerType: 'buyer',
    payeeId: 'F1',
    payeeType: 'farmer',
    amount: 44250,
    currency: 'INR',
    status: PaymentStatus.Processing,
    method: 'UPI (Escrow)',
    transactionRef: 'UPI892345671234',
    dueDate: '2026-09-25T23:59:59Z',
    createdAt: '2026-09-20T14:15:00Z'
  },
  {
    id: 'P2',
    orderId: 'O2',
    payerId: 'B2',
    payerType: 'buyer',
    payeeId: 'F2',
    payeeType: 'farmer',
    amount: 72000,
    currency: 'INR',
    status: PaymentStatus.Pending,
    method: 'Bank Transfer (NEFT)',
    dueDate: '2026-09-26T23:59:59Z',
    createdAt: '2026-09-24T06:15:00Z'
  },
  {
    id: 'P3',
    orderId: 'O3',
    payerId: 'B4',
    payerType: 'buyer',
    payeeId: 'FPO1',
    payeeType: 'fpo',
    amount: 242500,
    currency: 'INR',
    status: PaymentStatus.Processing,
    method: 'RTGS + eNWR',
    transactionRef: 'RTGSOI3829102938',
    dueDate: '2026-09-29T23:59:59Z',
    createdAt: '2026-09-23T16:30:00Z'
  },
  {
    id: 'P4',
    orderId: 'O4',
    payerId: 'B3',
    payerType: 'buyer',
    payeeId: 'F3',
    payeeType: 'farmer',
    amount: 59400,
    currency: 'INR',
    status: PaymentStatus.Paid,
    method: 'IMPS',
    transactionRef: 'IMPS772839401827',
    dueDate: '2026-09-19T23:59:59Z',
    paidDate: '2026-09-19T16:42:00Z',
    createdAt: '2026-09-18T10:30:00Z'
  },
  {
    id: 'P5',
    orderId: 'O1',
    payerId: 'B1',
    payerType: 'buyer',
    payeeId: 'TP1',
    payeeType: 'transport',
    amount: 3200,
    currency: 'INR',
    status: PaymentStatus.Paid,
    method: 'UPI',
    transactionRef: 'UPI998877665544',
    dueDate: '2026-09-23T23:59:59Z',
    paidDate: '2026-09-22T07:55:00Z',
    createdAt: '2026-09-22T07:30:00Z'
  },
  {
    id: 'P6',
    orderId: 'O2',
    payerId: 'B2',
    payerType: 'buyer',
    payeeId: 'TP2',
    payeeType: 'transport',
    amount: 8500,
    currency: 'INR',
    status: PaymentStatus.Paid,
    method: 'UPI',
    transactionRef: 'UPI112233445566',
    dueDate: '2026-09-24T23:59:59Z',
    paidDate: '2026-09-24T06:50:00Z',
    createdAt: '2026-09-23T07:30:00Z'
  },
  {
    id: 'P7',
    orderId: 'O5',
    payerId: 'FPO1',
    payerType: 'fpo',
    payeeId: 'W1',
    payeeType: 'warehouse',
    amount: 12600,
    currency: 'INR',
    status: PaymentStatus.Delayed,
    method: 'Cheque',
    dueDate: '2026-09-20T23:59:59Z',
    delayReason: 'Cheque clearance delayed by bank due to public holiday',
    createdAt: '2026-09-15T10:00:00Z'
  }
];

export const getPaymentById = (id: string): Payment | undefined =>
  payments.find((p) => p.id === id);

export const getPaymentsByPayee = (payeeId: string): Payment[] =>
  payments.filter((p) => p.payeeId === payeeId);

export const getPaymentsByPayer = (payerId: string): Payment[] =>
  payments.filter((p) => p.payerId === payerId);
