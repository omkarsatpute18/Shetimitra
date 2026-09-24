import * as React from 'react'
import { cn } from '@/utils/cn'
import { Card, CardHeader, CardTitle } from '@/components/ui/Card'

export interface MapCardProps {
  title: string
  children: React.ReactNode
  height?: string
  className?: string
}

const MapCard = ({
  title,
  children,
  height = 'h-80',
  className,
}: MapCardProps) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <div className={cn(
        'w-full overflow-hidden bg-gray-50 border-t border-gray-100',
        height
      )}>
        {children}
      </div>
    </Card>
  )
}

MapCard.displayName = 'MapCard'

export { MapCard }
