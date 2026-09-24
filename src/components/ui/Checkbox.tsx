import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

type SizeKey = 'size'
type SizeValue = string
type SizeConfig = Record<SizeKey, Record<SizeValue, string>>

const sizeConfig: SizeConfig = {
  size: {
    sm: 'h-4 w-4',
    default: 'h-5 w-5',
    lg: 'h-6 w-6',
  },
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
  description?: string
  size?: keyof typeof sizeConfig.size
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, size = 'default', id, ...props }, ref) => {
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            className={cn(
              'peer sr-only cursor-pointer',
              className
            )}
            {...props}
          />
          <div
            className={cn(
              'flex items-center justify-center rounded-md border-2 border-gray-300 bg-white transition-all',
              'peer-focus-visible:outline-none peer-focus-visible:ring-4 peer-focus-visible:ring-primary-500/20 peer-focus-visible:border-primary-500',
              'peer-checked:bg-primary-600 peer-checked:border-primary-600',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              sizeConfig.size[size]
            )}
          >
            <Check
              className={cn(
                'text-white opacity-0 transition-opacity peer-checked:opacity-100',
                size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4.5 w-4.5' : 'h-3.5 w-3.5'
              )}
              strokeWidth={3}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={inputId}
                className="text-sm font-medium text-gray-800 cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
