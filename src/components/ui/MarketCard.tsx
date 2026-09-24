import {
  Store,
  Navigation,
  TrendingUp,
  Award,
  Package,
  Users,
  Banknote,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'

export interface MarketCardProps {
  marketName: string
  distance: string
  currentPrice: number
  msp: number
  arrival: string | number
  demand: 'low' | 'medium' | 'high'
  transportCost: number
  netPrice: number
  className?: string
}

const demandConfig = {
  low: { label: 'Low Demand', class: 'text-red-600 bg-red-50 border-red-200', dot: 'bg-red-500' },
  medium: { label: 'Medium Demand', class: 'text-amber-600 bg-amber-50 border-amber-200', dot: 'bg-amber-500' },
  high: { label: 'High Demand', class: 'text-green-600 bg-green-50 border-green-200', dot: 'bg-green-500' },
}

const MarketCard = ({
  marketName,
  distance,
  currentPrice,
  msp,
  arrival,
  demand,
  transportCost,
  netPrice,
  className,
}: MarketCardProps) => {
  const dConfig = demandConfig[demand]
  const aboveMsp = currentPrice >= msp
  const mspDiffPct = ((currentPrice - msp) / msp * 100)

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary-50 text-primary-700 border border-primary-200 flex-shrink-0">
              <Store className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-gray-900 truncate">{marketName}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                <Navigation className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{distance}</span>
              </div>
            </div>
          </div>
          <div className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium flex-shrink-0', dConfig.class)}>
            <span className={cn('h-1.5 w-1.5 rounded-full', dConfig.dot)} />
            {dConfig.label}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100">
          <div className="space-y-1 bg-gray-50/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <TrendingUp className="h-3 w-3" />
              Market Price
            </div>
            <p className="text-lg font-bold text-gray-900">₹{currentPrice.toLocaleString('en-IN')}</p>
          </div>
          <div className="space-y-1 bg-gray-50/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Award className="h-3 w-3" />
              MSP
            </div>
            <p className="text-lg font-bold text-gray-900">₹{msp.toLocaleString('en-IN')}</p>
          </div>
          <div className="space-y-1 bg-primary-50/60 rounded-lg p-3 border border-primary-100">
            <div className="flex items-center gap-1.5 text-xs text-primary-700">
              <Banknote className="h-3 w-3" />
              Net Price
            </div>
            <p className="text-lg font-bold text-primary-700">₹{netPrice.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-gray-400" />
              Arrival: <span className="font-semibold text-gray-800">{arrival} q</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              Transport: <span className="font-semibold text-gray-800">₹{transportCost}</span>
            </span>
          </div>
          <div className={cn(
            'inline-flex items-center gap-1 text-xs font-semibold rounded-md px-2 py-0.5',
            aboveMsp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
          )}>
            {aboveMsp ? '+' : ''}{mspDiffPct.toFixed(1)}% vs MSP
          </div>
        </div>
      </div>
    </Card>
  )
}

MarketCard.displayName = 'MarketCard'

export { MarketCard }
