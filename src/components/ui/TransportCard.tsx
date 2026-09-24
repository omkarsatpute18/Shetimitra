import {
  Navigation,
  MapPin,
  Package,
  Truck,
  CircleDollarSign,
  Users,
  Combine,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import type { StatusType } from '@/components/ui/StatusBadge'

export interface TransportCardProps {
  distance: string
  pickup: string
  destination: string
  crop: string
  qty: string | number
  vehicle: string
  expectedEarnings: number
  farmersJoining: number
  status: StatusType
  onAccept?: () => void
  onCombine?: () => void
  className?: string
}

const TransportCard = ({
  distance,
  pickup,
  destination,
  crop,
  qty,
  vehicle,
  expectedEarnings,
  farmersJoining,
  status,
  onAccept,
  onCombine,
  className,
}: TransportCardProps) => {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex-shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900 truncate">{vehicle}</h3>
                <StatusBadge status={status} size="sm" />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                <Navigation className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="font-medium text-gray-700">{distance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
          <div className="flex flex-col items-center pt-1">
            <MapPin className="h-4 w-4 text-primary-600 flex-shrink-0" />
            <div className="w-px h-8 bg-gray-200 my-1" />
            <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
          </div>
          <div className="flex-1 space-y-4 min-w-0">
            <div className="space-y-0.5">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Pickup</p>
              <p className="text-sm font-medium text-gray-900 truncate">{pickup}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">Destination</p>
              <p className="text-sm font-medium text-gray-900 truncate">{destination}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="bg-gray-50/50 rounded-lg p-3 space-y-0.5">
            <p className="text-[11px] font-medium text-gray-500 inline-flex items-center gap-1">
              <Package className="h-3 w-3" />
              Cargo
            </p>
            <p className="text-sm font-semibold text-gray-900">{crop} • {qty} q</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 space-y-0.5 border border-green-100">
            <p className="text-[11px] font-medium text-green-700 inline-flex items-center gap-1">
              <CircleDollarSign className="h-3 w-3" />
              Earnings
            </p>
            <p className="text-sm font-bold text-green-700">₹{expectedEarnings.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Users className="h-3.5 w-3.5 text-gray-400" />
            <span>{farmersJoining} farmers joining</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Button variant="primary" size="sm" onClick={onAccept} className="flex-1">
            <CheckCircle2 className="h-4 w-4" />
            Accept
          </Button>
          <Button variant="outline" size="sm" onClick={onCombine} className="flex-1">
            <Combine className="h-4 w-4" />
            Combine
          </Button>
        </div>
      </div>
    </Card>
  )
}

TransportCard.displayName = 'TransportCard'

export { TransportCard }
