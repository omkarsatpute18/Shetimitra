import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Package } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps {
  icon?: LucideIcon | React.ReactNode
  title: string
  description?: string
  actionButton?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

const EmptyState = ({
  icon: Icon = Package,
  title,
  description,
  actionButton,
  align = 'center',
  className,
}: EmptyStateProps) => {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  }[align]

  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-12 px-6',
        alignClasses,
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center h-16 w-16 rounded-2xl bg-gray-50 border border-gray-200 text-gray-400'
        )}
      >
        {React.isValidElement(Icon) ? (
          Icon
        ) : typeof Icon === 'function' ? (
          <Icon className="h-8 w-8" />
        ) : null}
      </div>
      <div className={cn('flex flex-col gap-1.5', align === 'center' && 'max-w-md mx-auto')}>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}
      </div>
      {actionButton && (
        <div className={cn('pt-2', align === 'center' && 'mx-auto')}>
          {actionButton}
        </div>
      )}
    </div>
  )
}

EmptyState.displayName = 'EmptyState'

export { EmptyState }
