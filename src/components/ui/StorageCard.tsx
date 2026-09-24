import * as React from 'react'
import {
  Warehouse,
  Navigation,
  Thermometer,
  Droplets,
  ShieldCheck,
  Cctv,
  Truck,
  Phone,
  Eye,
  CalendarCheck,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

export type StorageType = 'cold' | 'dry' | 'both'

export interface StorageCardProps {
  name: string
  type: StorageType
  capacity: string | number
  available: string | number
  distance: string
  pricePerMtDay: number
  facilities: string[]
  contact: string
  onView?: () => void
  onReserve?: () => void
  className?: string
}

const typeConfig: Record<StorageType, { label: string; variant: 'info' | 'success' | 'default'; icon: React.ReactNode }> = {
  cold: { label: 'Cold Storage', variant: 'info', icon: <Thermometer className="h-3 w-3" /> },
  dry: { label: 'Dry Storage', variant: 'success', icon: <Droplets className="h-3 w-3" /> },
  both: { label: 'Cold + Dry', variant: 'default', icon: <Warehouse className="h-3 w-3" /> },
}

const facilityIconMap: Record<string, React.ReactNode> = {
  'cold': <Thermometer className="h-3.5 w-3.5" />,
  'dry': <Droplets className="h-3.5 w-3.5" />,
  'secure': <ShieldCheck className="h-3.5 w-3.5" />,
  'cctv': <Cctv className="h-3.5 w-3.5" />,
  'transport': <Truck className="h-3.5 w-3.5" />,
  'insurance': <ShieldCheck className="h-3.5 w-3.5" />,
}

const StorageCard = ({
  name,
  type,
  capacity,
  available,
  distance,
  pricePerMtDay,
  facilities,
  contact,
  onView,
  onReserve,
  className,
}: StorageCardProps) => {
  const tConfig = typeConfig[type]
  const capacityNum = Number(capacity)
  const availableNum = Number(available)
  const availablePct = capacityNum > 0 ? (availableNum / capacityNum) * 100 : 0

  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-earth-50 text-earth-700 border border-earth-200 flex-shrink-0">
              <Warehouse className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-gray-900 truncate">{name}</h3>
                <Badge variant={tConfig.variant} size="sm">
                  {tConfig.icon}
                  <span className="ml-1">{tConfig.label}</span>
                </Badge>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 text-sm text-gray-500">
                <Navigation className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{distance}</span>
                <span className="mx-1.5 text-gray-300">•</span>
                <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{contact}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <div className="bg-gray-50/50 rounded-lg p-3 space-y-1">
            <p className="text-xs font-medium text-gray-500">Total Capacity</p>
            <p className="text-lg font-bold text-gray-900">{capacity} MT</p>
          </div>
          <div className="bg-primary-50 rounded-lg p-3 space-y-1 border border-primary-100">
            <p className="text-xs font-medium text-primary-700">Available</p>
            <p className="text-lg font-bold text-primary-700">{available} MT</p>
            <p className="text-[11px] text-primary-600">{availablePct.toFixed(0)}% free</p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-gray-500">Pricing</p>
            <p className="text-sm font-bold text-gray-900">₹{pricePerMtDay} <span className="font-normal text-gray-500">/ MT / day</span></p>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <p className="text-xs font-medium text-gray-500">Facilities</p>
          <div className="flex flex-wrap gap-1.5">
            {facilities.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium border border-gray-200"
              >
                {facilityIconMap[f.toLowerCase()] ?? null}
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <Button variant="outline" size="sm" onClick={onView} className="flex-1">
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button variant="primary" size="sm" onClick={onReserve} className="flex-1">
            <CalendarCheck className="h-4 w-4" />
            Reserve
          </Button>
        </div>
      </div>
    </Card>
  )
}

StorageCard.displayName = 'StorageCard'

export { StorageCard }
