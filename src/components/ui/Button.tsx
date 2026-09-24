import * as React from 'react'
import { cn } from '@/utils/cn'

type VariantKey = 'variant' | 'size'
type VariantValue = string
type VariantConfig = Record<VariantKey, Record<VariantValue, string>>

const variants: VariantConfig = {
  variant: {
    default: 'bg-white text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100',
    primary: 'bg-primary-600 text-white shadow-sm hover:bg-primary-700 active:bg-primary-800 shadow-primary-600/20',
    secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 active:bg-gray-300',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200',
    destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 active:bg-red-800 shadow-red-600/20',
    outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 active:bg-gray-100',
  },
  size: {
    sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
    default: 'h-10 px-4 text-sm gap-2 rounded-lg',
    lg: 'h-12 px-5 text-base gap-2 rounded-lg',
    icon: 'h-10 w-10 rounded-lg',
  },
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants.variant
  size?: keyof typeof variants.size
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20',
          'disabled:pointer-events-none disabled:opacity-50',
          variants.variant[variant],
          variants.size[size],
          className
        )}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
