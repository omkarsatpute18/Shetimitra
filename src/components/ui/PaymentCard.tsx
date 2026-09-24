import {
  Receipt,
  User,
  Package,
  Banknote,
  CalendarDays,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { StatusType } from '@/components/ui/StatusBadge'

export interface PaymentCardProps {
  transactionId: string
  buyer: string
  crop: string
  qty: string | number
  amount: number
  status: StatusType
  expectedDate?: string
  className?: string
}

const PaymentCard = ({
  transactionId,
  buyer,
  crop,
  qty,
  amount,
  status,
  expectedDate,
  className,
}: PaymentCardProps) => {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
              <Receipt className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-mono text-gray-500 truncate">#{transactionId}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <User className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-900 truncate">{buyer}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={status} size="sm" />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          <div className="bg-gray-50/50 rounded-lg p-2.5 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-gray-500">
              <Package className="h-3 w-3" />
              Crop
            </div>
            <p className="text-sm font-semibold text-gray-900 truncate">{crop}</p>
          </div>
          <div className="bg-gray-50/50 rounded-lg p-2.5 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-gray-500">
              <Package className="h-3 w-3" />
              Qty
            </div>
            <p className="text-sm font-semibold text-gray-900">{qty} q</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-2.5 space-y-0.5 border border-emerald-100">
            <div className="flex items-center gap-1 text-[11px] text-emerald-700">
              <Banknote className="h-3 w-3" />
              Amount
            </div>
            <p className="text-sm font-bold text-emerald-700">₹{amount.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {expectedDate && (
          <div className="flex items-center justify-between pt-2 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
              <span>Expected on:</span>
              <span className="font-semibold text-gray-800">{expectedDate}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

PaymentCard.displayName = 'PaymentCard'

export { PaymentCard }
