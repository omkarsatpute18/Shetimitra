import * as React from 'react'
import { ShieldCheck } from 'lucide-react'
import { cn } from '@/utils/cn'

export type VerificationType = 'platform' | 'demo' | 'none'

type VerificationStyle = {
  wrapper: string
  icon: string
  label: string
}

const verificationStyles: Record<VerificationType, VerificationStyle> = {
  platform: {
    wrapper: 'bg-green-50 text-green-700 border border-green-200',
    icon: 'text-green-600',
    label: 'Platform Verified',
  },
  demo: {
    wrapper: 'bg-amber-50 text-amber-700 border border-amber-200',
    icon: 'text-amber-600',
    label: 'Demo Verified',
  },
  none: {
    wrapper: 'bg-gray-50 text-gray-600 border border-gray-200',
    icon: 'text-gray-500',
    label: 'Unverified',
  },
}

export interface VerificationBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  verification: VerificationType
  size?: 'sm' | 'md' | 'lg'
}

const VerificationBadge = React.forwardRef<HTMLSpanElement, VerificationBadgeProps>(
  ({ className, verification, size = 'md', ...props }, ref) => {
    const style = verificationStyles[verification]

    const sizeClasses = {
      sm: 'h-5 px-2 text-xs rounded-md',
      md: 'h-6 px-2.5 text-xs rounded-md',
      lg: 'h-7 px-3 text-sm rounded-md',
    }[size]

    const iconSize = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-4 w-4',
    }[size]

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium whitespace-nowrap',
          style.wrapper,
          sizeClasses,
          className
        )}
        {...props}
      >
        <ShieldCheck className={cn(iconSize, style.icon)} />
        {style.label}
      </span>
    )
  }
)
VerificationBadge.displayName = 'VerificationBadge'

export { VerificationBadge }
