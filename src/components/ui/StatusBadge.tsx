import * as React from 'react'
import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'

export type StatusType =
  | 'pending'
  | 'processing'
  | 'paid'
  | 'delayed'
  | 'accepted'
  | 'delivered'
  | 'completed'
  | 'cancelled'

type StatusStyle = {
  bg: string
  dot: string
  icon?: LucideIcon
}

const statusStyles: Record<StatusType, StatusStyle> = {
  pending: {
    bg: 'bg-amber-50 text-amber-700 border border-amber-200',
    dot: 'bg-amber-500',
  },
  processing: {
    bg: 'bg-sky-50 text-sky-700 border border-sky-200',
    dot: 'bg-sky-500',
  },
  paid: {
    bg: 'bg-green-50 text-green-700 border border-green-200',
    dot: 'bg-green-500',
  },
  delayed: {
    bg: 'bg-orange-50 text-orange-700 border border-orange-200',
    dot: 'bg-orange-500',
  },
  accepted: {
    bg: 'bg-primary-50 text-primary-700 border border-primary-200',
    dot: 'bg-primary-500',
  },
  delivered: {
    bg: 'bg-cyan-50 text-cyan-700 border border-cyan-200',
    dot: 'bg-cyan-500',
  },
  completed: {
    bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    dot: 'bg-emerald-500',
  },
  cancelled: {
    bg: 'bg-red-50 text-red-700 border border-red-200',
    dot: 'bg-red-500',
  },
}

const statusLabels: Record<StatusType, string> = {
  pending: 'Pending',
  processing: 'Processing',
  paid: 'Paid',
  delayed: 'Delayed',
  accepted: 'Accepted',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: StatusType
  showDot?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ className, status, showDot = true, size = 'md', ...props }, ref) => {
    const style = statusStyles[status]
    const label = statusLabels[status]

    const sizeClasses = {
      sm: 'h-5 px-2 text-xs rounded-md',
      md: 'h-6 px-2.5 text-xs rounded-md',
      lg: 'h-7 px-3 text-sm rounded-md',
    }[size]

    const dotSize = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    }[size]

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
          style.bg,
          sizeClasses,
          className
        )}
        {...props}
      >
        {showDot && <span className={cn('rounded-full flex-shrink-0', style.dot, dotSize)} />}
        {label}
      </span>
    )
  }
)
StatusBadge.displayName = 'StatusBadge'

export { StatusBadge }
