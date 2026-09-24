import * as React from 'react'
import { cn } from '@/utils/cn'

type VariantKey = 'variant' | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-gray-200',
    primary: 'bg-primary-100',
    success: 'bg-green-100',
    warning: 'bg-amber-100',
    error: 'bg-red-100',
  },
  size: {
    sm: 'h-1.5 rounded-full',
    default: 'h-2.5 rounded-full',
    lg: 'h-3.5 rounded-lg',
  },
}

const fillVariants: Record<string, string> = {
  default: 'bg-gray-700',
  primary: 'bg-primary-600',
  success: 'bg-green-600',
  warning: 'bg-amber-600',
  error: 'bg-red-600',
}

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
  showLabel?: boolean
  max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, variant = 'primary', size = 'default', showLabel = false, max = 100, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const displayValue = Math.round(percentage)

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <div className="flex items-center justify-between mb-1">
          {showLabel && (
            <span className="text-xs font-medium text-gray-600">{displayValue}%</span>
          )}
        </div>
        <div
          role="progressbar"
          role-description={`${displayValue}%`}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          className={cn(
            'w-full overflow-hidden',
            variants.variant[variant],
            variants.size[size]
          )}
        >
          <div
            className={cn(
              'h-full transition-all duration-300 ease-out',
              fillVariants[variant],
              variants.size[size]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
