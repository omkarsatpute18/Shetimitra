import * as React from 'react'
import { cn } from '@/utils/cn'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'

export interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
}

const ChartCard = ({
  title,
  description,
  children,
  actions,
  className,
  contentClassName,
}: ChartCardProps) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 min-w-0 flex-1">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
              <CardDescription className="text-xs">{description}</CardDescription>
            )}
          </div>
          {actions && (
            <div className="flex-shrink-0">{actions}</div>
          )}
        </div>
      </CardHeader>
      <CardContent className={cn('pt-0', contentClassName)}>
        {children}
      </CardContent>
    </Card>
  )
}

ChartCard.displayName = 'ChartCard'

export { ChartCard }
