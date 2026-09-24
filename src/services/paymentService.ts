import { payments } from '@/data/payments';
import { orders } from '@/data/orders';
import { OrderStatus, type Payment, type OrderTimelineStep } from '@/types';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

interface PaymentFilters {
  farmerId?: string;
  status?: string;
}

export function getPayments(filters?: PaymentFilters): Promise<Payment[]> {
  let result = [...payments];
  if (filters?.farmerId) {
    result = result.filter((p) => p.payeeId === filters.farmerId && p.payeeType === 'farmer');
  }
  if (filters?.status) {
    result = result.filter((p) => p.status === filters.status);
  }
  return delay(result);
}

export function getOrderTimeline(orderId: string): Promise<OrderTimelineStep[]> {
  const order = orders.find((o) => o.id === orderId);
  return delay(order?.timeline ?? []);
}

export function advanceOrderStatus(
  orderId: string,
  newStepIndex: number
): Promise<OrderTimelineStep[]> {
  const order = orders.find((o) => o.id === orderId);
  if (!order) return delay([]);
  const statuses: OrderStatus[] = [
    OrderStatus.Pending,
    OrderStatus.Confirmed,
    OrderStatus.InTransit,
    OrderStatus.Delivered,
    OrderStatus.Completed,
  ];
  const descriptions: Record<string, string> = {
    [OrderStatus.Pending]: 'Order placed, awaiting confirmation',
    [OrderStatus.Confirmed]: 'Order confirmed by both parties',
    [OrderStatus.InTransit]: 'Produce dispatched and in transit',
    [OrderStatus.Delivered]: 'Produce delivered and acknowledged',
    [OrderStatus.Completed]: 'Order completed, payment released',
  };
  const newStatus = statuses[Math.min(newStepIndex, statuses.length - 1)];
  const newStep: OrderTimelineStep = {
    id: 'OTS_' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    orderId,
    status: newStatus,
    timestamp: new Date().toISOString(),
    description: descriptions[newStatus],
    actor: 'System',
    actorId: 'SYS',
  };
  return delay([...order.timeline, newStep]);
}
