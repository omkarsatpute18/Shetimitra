import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

export type DrawerSide = 'left' | 'right'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: DrawerSide
  title?: React.ReactNode
  children?: React.ReactNode
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  width?: string
  className?: string
}

const sideClasses: Record<DrawerSide, string> = {
  left: 'left-0 border-r',
  right: 'right-0 border-l',
}

const openSideClasses: Record<DrawerSide, string> = {
  left: 'translate-x-0',
  right: 'translate-x-0',
}

const closedSideClasses: Record<DrawerSide, string> = {
  left: '-translate-x-full',
  right: 'translate-x-full',
}

const Drawer = ({
  open,
  onClose,
  side = 'right',
  title,
  children,
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  width = 'w-full sm:max-w-md',
  className,
}: DrawerProps) => {
  React.useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, closeOnEsc, onClose])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        open ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={cn(
          'fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0'
        )}
        onClick={handleOverlayClick}
      />
      <div
        className={cn(
          'fixed top-0 h-full bg-white shadow-xl',
          'transition-transform duration-300 ease-out',
          sideClasses[side],
          open ? openSideClasses[side] : closedSideClasses[side],
          width,
          className
        )}
      >
        {(title || showClose) && (
          <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
            {title && (
              <h2 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
                {title}
              </h2>
            )}
            {showClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 -mr-2"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto h-[calc(100%-0px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

Drawer.displayName = 'Drawer'

export { Drawer }
