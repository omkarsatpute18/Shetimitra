import {
  User,
  Wheat,
  Package,
  MapPin,
  Calendar,
  Clock,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VerificationBadge } from '@/components/ui/VerificationBadge'
import { Rating } from '@/components/ui/Rating'
import type { VerificationType } from '@/components/ui/VerificationBadge'

export interface DemandCardProps {
  buyerName: string
  crop: string
  qty: string | number
  quality: string
  offeredPrice: number
  location: string
  deadline: string
  verified: VerificationType
  rating: number
  buttons?: React.ReactNode
  className?: string
}

const DemandCard = ({
  buyerName,
  crop,
  qty,
  quality,
  offeredPrice,
  location,
  deadline,
  verified,
  rating,
  buttons,
  className,
}: DemandCardProps) => {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex-shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900 truncate">{buyerName}</h3>
                <VerificationBadge verification={verified} size="sm" />
              </div>
              <div className="mt-2">
                <Rating value={rating} size="sm" showValue />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-primary-50/60 rounded-lg p-2.5 border border-primary-100">
            <Wheat className="h-4 w-4 text-primary-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-primary-700/80 font-medium">Crop</p>
              <p className="text-sm font-semibold text-primary-800 truncate">{crop}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-50/60 rounded-lg p-2.5 border border-amber-100">
            <Package className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[11px] text-amber-700/80 font-medium">Quantity</p>
              <p className="text-sm font-semibold text-amber-800">{qty} quintals</p>
            </div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-500">Offered Price</p>
              <p className="text-lg font-bold text-primary-700">₹{offeredPrice.toLocaleString('en-IN')}/q</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-500">Quality</p>
              <Badge variant="success" size="sm" className="mt-0.5">{quality}</Badge>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <MapPin className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Calendar className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
            <span>Deadline:</span>
            <span className="font-semibold text-gray-800 inline-flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-500" />
              {deadline}
            </span>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          {buttons ?? (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1">Details</Button>
              <Button variant="primary" size="sm" className="flex-1">Submit Offer</Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

DemandCard.displayName = 'DemandCard'

export { DemandCard }
