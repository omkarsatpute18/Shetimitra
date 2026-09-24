import * as React from 'react'
import { User, MapPin, Navigation, Wheat } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Rating } from '@/components/ui/Rating'
import { Button } from '@/components/ui/Button'

export interface FarmerCardProps {
  name: string
  village: string
  distance: string
  crops: string[]
  availableQty: string | number
  rating: number
  actions?: React.ReactNode
  className?: string
}

const FarmerCard = ({
  name,
  village,
  distance,
  crops,
  availableQty,
  rating,
  actions,
  className,
}: FarmerCardProps) => {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-primary-50 text-primary-700 border border-primary-200 flex-shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{village}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                <Navigation className="h-3 w-3 flex-shrink-0" />
                <span>{distance}</span>
              </div>
            </div>
          </div>
          <Rating value={rating} size="sm" showValue />
        </div>

        <div className="space-y-3 pt-3 border-t border-gray-100">
          <div className="space-y-2">
            <p className="text-xs font-medium text-gray-500">Crops</p>
            <div className="flex flex-wrap gap-1.5">
              {crops.map((crop, i) => (
                <Badge key={i} variant="earth" size="sm">
                  <Wheat className="h-3 w-3 mr-1" />
                  {crop}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-gray-500">Available</p>
              <p className="text-base font-semibold text-gray-900">{availableQty} quintals</p>
            </div>
          </div>
        </div>

        {actions !== undefined && (
          <div className="pt-3 border-t border-gray-100">
            {actions}
          </div>
        )}
        {actions === undefined && (
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
            <Button variant="primary" size="sm" className="flex-1">Contact</Button>
          </div>
        )}
      </div>
    </Card>
  )
}

FarmerCard.displayName = 'FarmerCard'

export { FarmerCard }
