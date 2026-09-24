import { Star } from 'lucide-react'
import { cn } from '@/utils/cn'

export type RatingSize = 'sm' | 'md' | 'lg'

const sizeConfig: Record<RatingSize, { star: string; text: string }> = {
  sm: { star: 'h-3.5 w-3.5', text: 'text-xs' },
  md: { star: 'h-4 w-4', text: 'text-sm' },
  lg: { star: 'h-5 w-5', text: 'text-base' },
}

export interface RatingProps {
  value: number
  size?: RatingSize
  showValue?: boolean
  max?: number
  className?: string
}

const Rating = ({
  value,
  size = 'md',
  showValue = false,
  max = 5,
  className,
}: RatingProps) => {
  const displayValue = Math.max(0, Math.min(value, max))
  const sizes = sizeConfig[size]

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="inline-flex items-center">
        {Array.from({ length: max }).map((_, i) => {
          const fillPercentage = Math.max(0, Math.min(1, displayValue - i))
          return (
            <div key={i} className="relative inline-block">
              <Star className={cn(sizes.star, 'text-gray-200 fill-gray-200')} strokeWidth={2} />
              <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage * 100}%` }}
            >
                <Star
                  className={cn(sizes.star, 'text-amber-400 fill-amber-400')}
                  strokeWidth={2}
                />
              </div>
            </div>
          )
        })}
      </div>
      {showValue && (
        <span className={cn('font-semibold text-gray-700', sizes.text)}>
          {displayValue.toFixed(displayValue % 1 !== 0 ? 1 : 0)}
        </span>
      )}
    </div>
  )
}

Rating.displayName = 'Rating'

export { Rating }
