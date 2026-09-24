import * as React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

export interface ErrorStateProps {
  title?: string
  description?: string
  retryAction?: () => void
  retryLabel?: string
  icon?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
}

const ErrorState = ({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  retryAction,
  retryLabel = 'Try again',
  icon,
  align = 'center',
  className,
}: ErrorStateProps) => {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  }[align]

  return (
    <div
      className={cn(
        'flex flex-col gap-4 py-12 px-6 bg-red-50/30 border border-red-100 rounded-xl',
        alignClasses,
        className
      )}
    >
      <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-red-100 text-red-600 border border-red-200">
        {icon ?? <AlertTriangle className="h-7 w-7" />}
      </div>
      <div className={cn('flex flex-col gap-1.5', align === 'center' && 'max-w-md mx-auto')}>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        )}
      </div>
      {retryAction && (
        <div className={cn('pt-1', align === 'center' && 'mx-auto')}>
          <Button
            variant="primary"
            onClick={retryAction}
            leftIcon={<RefreshCw className="h-4 w-4" />}
          >
            {retryLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

ErrorState.displayName = 'ErrorState'

export { ErrorState }
