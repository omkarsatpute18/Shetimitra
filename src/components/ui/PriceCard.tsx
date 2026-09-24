import { TrendingUp, TrendingDown, MapPin, Award } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export interface PriceCardProps {
  name: string
  price: number
  unit?: string
  msp?: number
  priceChange?: {
    value: number
    period?: string
  }
  distance?: string
  badge?: {
    label: string
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'earth'
  }
  className?: string
}

const PriceCard = ({
  name,
  price,
  unit = '₹/q',
  msp,
  priceChange,
  distance,
  badge,
  className,
}: PriceCardProps) => {
  const isUp = priceChange ? priceChange.value > 0 : false
  const isDown = priceChange ? priceChange.value < 0 : false
  const aboveMsp = msp ? price >= msp : undefined

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
              {badge && (
                <Badge variant={badge.variant ?? 'info'} size="sm">{badge.label}</Badge>
              )}
            </div>
            {distance && (
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                <span>{distance}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-bold text-gray-900 tracking-tight">
            ₹{price.toLocaleString('en-IN')}
          </span>
          <span className="text-sm font-medium text-gray-500">{unit}</span>
          </div>
          {priceChange !== undefined && (
            <div className="flex items-center gap-1.5">
              {isUp ? (
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-green-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +{priceChange.value}%
            </span>
            ) : isDown ? (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-red-600">
                <TrendingDown className="h-3.5 w-3.5" />
                {priceChange.value}%
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-gray-500">
                No change
              </span>
            )}
            {priceChange.period && (
              <span className="text-xs text-gray-500">{priceChange.period}</span>
            )}
          </div>
          )}
        </div>

        {msp !== undefined && (
          <div className={cn(
            'flex items-center gap-2 pt-3 mt-3 border-t border-gray-100',
            aboveMsp ? 'text-green-600' : 'text-amber-600'
          )}>
            <Award className="h-4 w-4 flex-shrink-0" />
            <div className="flex items-center gap-1 text-xs">
              <span className="font-medium">MSP: ₹{msp.toLocaleString('en-IN')} {unit}</span>
              <span className="text-gray-500">•</span>
              <span className={cn('font-semibold', aboveMsp ? 'text-green-700' : 'text-amber-700')}>
                {aboveMsp
                  ? `+${((price - msp) / msp * 100).toFixed(1)}%`
                  : `-${((msp - price) / msp * 100).toFixed(1)}%`}
              </span>
              <span className="text-gray-500">vs MSP</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

PriceCard.displayName = 'PriceCard'

export { PriceCard }
