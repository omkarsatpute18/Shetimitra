import { cn } from '@/utils/cn'

export type LoadingVariant = 'card' | 'table' | 'chart' | 'page'

export interface LoadingStateProps {
  variant?: LoadingVariant
  count?: number
  className?: string
}

const shimmer = 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse bg-[length:200%_100%]'

const CardSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-subtle p-6 space-y-4">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-3 flex-1">
        <div className={cn('h-4 w-24 rounded-md', shimmer)} />
        <div className={cn('h-8 w-40 rounded-md', shimmer)} />
      </div>
      <div className={cn('h-12 w-12 rounded-xl', shimmer)} />
    </div>
    <div className="space-y-2 pt-2">
      <div className={cn('h-3 w-full rounded-md', shimmer)} />
      <div className={cn('h-3 w-2/3 rounded-md', shimmer)} />
    </div>
  </div>
)

const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-subtle overflow-hidden">
    <div className="bg-gray-50/80 border-b border-gray-200 px-4 h-11 flex items-center gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={cn('h-4 rounded-md', shimmer, i === 0 ? 'w-24' : i === 3 ? 'w-16' : 'w-32')} />
      ))}
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, ri) => (
        <div key={ri} className="px-4 h-14 flex items-center gap-6">
          {Array.from({ length: 4 }).map((_, ci) => (
            <div
              key={ci}
              className={cn(
                'h-4 rounded-md',
                shimmer,
                ci === 0 ? 'w-20' : ci === 1 ? 'w-40' : ci === 2 ? 'w-28' : 'w-16'
              )}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)

const ChartSkeleton = () => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-subtle p-6 space-y-5">
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className={cn('h-5 w-40 rounded-md', shimmer)} />
        <div className={cn('h-3.5 w-60 rounded-md', shimmer)} />
      </div>
      <div className={cn('h-8 w-24 rounded-md', shimmer)} />
    </div>
    <div className={cn('h-60 w-full rounded-lg', shimmer)} />
  </div>
)

const PageSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-3">
      <div className={cn('h-8 w-64 rounded-md', shimmer)} />
      <div className={cn('h-4 w-96 rounded-md', shimmer)} />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
    <ChartSkeleton />
  </div>
)

const LoadingState = ({
  variant = 'card',
  count = 4,
  className,
}: LoadingStateProps) => {
  if (variant === 'page') {
    return (
      <div className={cn('animate-in fade-in-0 duration-200', className)}>
        <PageSkeleton />
      </div>
    )
  }

  if (variant === 'table') {
    return (
      <div className={cn('animate-in fade-in-0 duration-200', className)}>
        <TableSkeleton rows={count} />
      </div>
    )
  }

  if (variant === 'chart') {
    return (
      <div className={cn('animate-in fade-in-0 duration-200', className)}>
        <ChartSkeleton />
      </div>
    )
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in-0 duration-200',
        className
      )}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}

LoadingState.displayName = 'LoadingState'

export { LoadingState }
