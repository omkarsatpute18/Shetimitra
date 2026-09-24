import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'

export type TrendType = 'up' | 'down' | 'flat'

export interface StatCardProps {
  icon: LucideIcon
  value: string | number
  label: string
  delta?: number
  trend?: TrendType
  iconClassName?: string
  className?: string
}

const trendStyles: Record<TrendType, { wrapper: string; icon: LucideIcon; label: string }> = {
  up: {
    wrapper: 'text-green-600 bg-green-50 border border-green-200',
    icon: TrendingUp,
    label: 'up',
  },
  down: {
    wrapper: 'text-red-600 bg-red-50 border border-red-200',
    icon: TrendingDown,
    label: 'down',
  },
  flat: {
    wrapper: 'text-gray-600 bg-gray-50 border border-gray-200',
    icon: Minus,
    label: 'flat',
  },
}

const StatCard = ({
  icon: Icon,
  value,
  label,
  delta,
  trend = delta !== undefined ? (delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat') : undefined,
  iconClassName,
  className,
}: StatCardProps) => {
  const style = trend ? trendStyles[trend] : undefined
  const TrendIcon = style?.icon

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          {delta !== undefined && style && (
            <div className="inline-flex items-center gap-1.5">
              <span
                className={cn(
                  'inline-flex items-center gap-1 text-xs font-semibold rounded-md px-2 py-1',
                  style.wrapper
                )}
              >
                {TrendIcon && <TrendIcon className="h-3.5 w-3.5" />}
                {Math.abs(delta)}%
              </span>
              <span className="ml-1.5 text-xs text-gray-500">vs last period</span>
            </div>
          )}
          </div>
          <div
            className={cn(
              'flex items-center justify-center h-12 w-12 rounded-xl bg-primary-50 text-primary-600 border border-primary-200',
              iconClassName
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </Card>
  )
}

StatCard.displayName = 'StatCard'

export { StatCard }
