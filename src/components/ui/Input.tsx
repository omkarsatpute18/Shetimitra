import * as React from 'react'
import { cn } from '@/utils/cn'

type VariantKey =
  | 'variant'
  | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
    primary: 'bg-primary-50 border border-primary-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
    success: 'bg-green-50 border border-green-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-green-500 focus-visible:ring-green-500/20',
    error: 'bg-red-50 border border-red-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-red-500 focus-visible:ring-red-500/20',
  },
  size: {
    sm: 'h-8 px-3 text-sm',
    default: 'h-10 px-3.5 text-sm',
    lg: 'h-12 px-4 text-base',
  },
}

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'default', type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-lg shadow-sm transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'focus-visible:outline-none focus-visible:ring-4',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variants.variant[variant],
          variants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
