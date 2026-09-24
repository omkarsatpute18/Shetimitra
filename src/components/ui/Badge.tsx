import * as React from 'react'
import { cn } from '@/utils/cn'

type VariantKey = 'variant' | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-gray-100 text-gray-700 border border-gray-200',
    success: 'bg-green-50 text-green-700 border border-green-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    error: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    earth: 'bg-earth-50 text-earth-800 border border-earth-200',
  },
  size: {
    sm: 'h-5 px-2 text-xs rounded-md',
    default: 'h-6 px-2.5 text-xs rounded-md',
    lg: 'h-7 px-3 text-sm rounded-lg',
  },
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium whitespace-nowrap',
        variants.variant[variant],
        variants.size[size],
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge }
