import * as React from 'react'
import { cn } from '@/utils/cn'

type VariantKey = 'variant' | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
    primary: 'bg-primary-50 border border-primary-200 text-gray-900 placeholder:text-gray-400 focus-visible:border-primary-500 focus-visible:ring-primary-500/20',
  },
  size: {
    sm: 'min-h-[72px] px-3 py-2 text-sm',
    default: 'min-h-[96px] px-3.5 py-2.5 text-sm',
    lg: 'min-h-[120px] px-4 py-3 text-base',
  },
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex w-full rounded-lg shadow-sm transition-colors resize-y',
          'focus-visible:outline-none focus-visible:ring-4',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variants.variant[variant],
          variants.size[size],
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
