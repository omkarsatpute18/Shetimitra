import {
  Package,
  User,
  Users,
  Target,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { StatusType } from '@/components/ui/StatusBadge'

export interface LotCardProps {
  lotId: string
  crop: string
  totalQty: string | number
  targetBuyer?: string
  targetPrice: number
  progress: number
  status: StatusType
  farmersCount: number
  className?: string
}

const LotCard = ({
  lotId,
  crop,
  totalQty,
  targetBuyer,
  targetPrice,
  progress,
  status,
  farmersCount,
  className,
}: LotCardProps) => {
  const collectedQty = (Number(totalQty) * progress / 100).toFixed(0)

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-crop-50 text-crop-700 border border-crop-200 flex-shrink-0">
              <Package className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900">{crop}</h3>
                <span className="text-xs font-mono text-gray-400 bg-gray-100 rounded px-1.5 py-0.5">#{lotId}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                <Users className="h-3.5 w-3.5" />
                <span>{farmersCount} farmers joined</span>
              </div>
            </div>
          </div>
          <StatusBadge status={status} size="sm" />
        </div>

        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span className="inline-flex items-center gap-1">
              <Package className="h-3 w-3 text-gray-400" />
              Progress
            </span>
            <span className="font-semibold text-gray-800">
              {collectedQty} / {totalQty} q ({progress}%)
            </span>
          </div>
          <Progress value={progress} variant="primary" size="default" />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-500 inline-flex items-center gap-1">
              <Target className="h-3 w-3" />
              Target Price
            </p>
            <p className="text-base font-bold text-primary-700">₹{targetPrice.toLocaleString('en-IN')}/q</p>
          </div>
          {targetBuyer && (
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-500 inline-flex items-center gap-1">
                <User className="h-3 w-3" />
                Target Buyer
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">{targetBuyer}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

LotCard.displayName = 'LotCard'

export { LotCard }
