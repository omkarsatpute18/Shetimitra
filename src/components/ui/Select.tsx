import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

type VariantKey = 'variant' | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-white border border-gray-200 text-gray-900 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
    primary: 'bg-primary-50 border border-primary-200 text-gray-900 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
  },
  size: {
    sm: 'h-8 px-3 pr-8 text-sm',
    default: 'h-10 px-3.5 pr-9 text-sm',
    lg: 'h-12 px-4 pr-10 text-base',
  },
}

export interface SelectOption {
  value: string | number
  label: string
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
  options?: SelectOption[]
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'default', size = 'default', options, children, ...props }, ref) => {
    return (
      <div className={cn('relative inline-block w-full', className)}>
        <select
          ref={ref}
          className={cn(
            'flex w-full appearance-none rounded-lg shadow-sm transition-colors',
            'focus-visible:outline-none focus-visible:ring-4',
            'disabled:cursor-not-allowed disabled:opacity-50',
            variants.variant[variant],
            variants.size[size]
          )}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
