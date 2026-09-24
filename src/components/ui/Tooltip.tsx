import * as React from 'react'
import { cn } from '@/utils/cn'

type TooltipSide = 'top' | 'bottom' | 'left' | 'right'

const sideOffsetClasses: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
}

const arrowClasses: Record<TooltipSide, string> = {
  top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900',
  left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900',
  right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900',
}

export interface TooltipProps {
  content: React.ReactNode
  side?: TooltipSide
  children: React.ReactElement
  delayDuration?: number
  className?: string
}

const Tooltip = ({
  content,
  side = 'top',
  children,
  delayDuration = 200,
  className,
}: TooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const delayRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = React.useCallback(() => {
    if (delayRef.current) clearTimeout(delayRef.current)
    delayRef.current = setTimeout(() => setIsOpen(true), delayDuration)
  }, [delayDuration])

  const handleLeave = React.useCallback(() => {
    if (delayRef.current) clearTimeout(delayRef.current)
    delayRef.current = setTimeout(() => setIsOpen(false), 100)
  }, [])

  React.useEffect(() => {
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current)
    }
  }, [])

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      {isOpen && (
        <>
          <div
            role="tooltip"
            className={cn(
              'absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-md whitespace-nowrap',
              'pointer-events-none animate-in fade-in-0 zoom-in-95 duration-100',
              sideOffsetClasses[side],
              className
            )}
          >
            {content}
            <span
              className={cn(
                'absolute border-4 border-transparent',
                arrowClasses[side]
              )}
            />
          </div>
        </>
      )}
    </span>
  )
}

Tooltip.displayName = 'Tooltip'

export { Tooltip }
