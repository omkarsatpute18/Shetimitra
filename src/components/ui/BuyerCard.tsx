import {
  Building2,
  MapPin,
  Calendar,
  Package,
  Eye,
  Send,
  Phone,
  Bookmark,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VerificationBadge } from '@/components/ui/VerificationBadge'
import { Rating } from '@/components/ui/Rating'
import type { VerificationType } from '@/components/ui/VerificationBadge'

export interface BuyerCardProps {
  name: string
  company: string
  verification: VerificationType
  rating: number
  location: string
  crop: string
  qtyRequired: string | number
  offeredPrice: number
  qualityReq: string
  deliveryDate: string
  pastTxCount: number
  onView?: () => void
  onOffer?: () => void
  onContact?: () => void
  onSave?: () => void
  saved?: boolean
  className?: string
}

const BuyerCard = ({
  name,
  company,
  verification,
  rating,
  location,
  crop,
  qtyRequired,
  offeredPrice,
  qualityReq,
  deliveryDate,
  pastTxCount,
  onView,
  onOffer,
  onContact,
  onSave,
  saved = false,
  className,
}: BuyerCardProps) => {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary-50 text-primary-700 border border-primary-200 flex-shrink-0">
              <Building2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
                <VerificationBadge verification={verification} size="sm" />
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-sm text-gray-500 truncate">
                <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{company}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <Rating value={rating} size="sm" showValue />
                <span className="text-xs text-gray-500">{pastTxCount} past tx</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSave}
            className={cn(
              'flex-shrink-0 -mr-1 -mt-1',
              saved ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
            )}
            aria-label={saved ? 'Unsave' : 'Save'}
          >
            <Bookmark className={cn('h-5 w-5', saved && 'fill-current')} />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-500">Crop Required</p>
            <div className="flex items-center gap-1.5">
              <Package className="h-3.5 w-3.5 text-primary-600" />
              <span className="text-sm font-medium text-gray-900">{crop}</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-500">Quantity</p>
            <p className="text-sm font-medium text-gray-900">{qtyRequired} q</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-500">Offered Price</p>
            <p className="text-sm font-semibold text-primary-700">₹{offeredPrice.toLocaleString('en-IN')}/q</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-medium text-gray-500">Quality</p>
            <Badge variant="success" size="sm">{qualityReq}</Badge>
          </div>
          <div className="space-y-0.5 col-span-2">
            <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
              <MapPin className="h-3 w-3" />
              {location}
              <span className="mx-1.5 text-gray-300">•</span>
              <Calendar className="h-3 w-3" />
              Delivery: {deliveryDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button variant="primary" size="sm" onClick={onOffer} className="flex-1">
            <Send className="h-4 w-4" />
            Send Offer
          </Button>
          <Button variant="outline" size="icon" onClick={onContact} aria-label="Contact">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

BuyerCard.displayName = 'BuyerCard'

export { BuyerCard }
