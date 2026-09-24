import * as React from 'react'
import { cn } from '@/utils/cn'

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl shadow-subtle',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
FilterBar.displayName = 'FilterBar'

export { FilterBar }
