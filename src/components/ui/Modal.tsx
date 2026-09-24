import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/Button'

export interface ModalProps {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showClose?: boolean
  closeOnOverlay?: boolean
  closeOnEsc?: boolean
  className?: string
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  className,
}: ModalProps) => {
  const dialogRef = React.useRef<HTMLDivElement>(null)

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

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={handleOverlayClick}
      />
      <div
        ref={dialogRef}
        className={cn(
          'relative z-10 w-full bg-white rounded-xl shadow-lg border border-gray-200',
          'flex flex-col max-h-[90vh]',
          'animate-in fade-in-0 zoom-in-95 duration-200 slide-in-from-bottom-2',
          sizeClasses[size],
          className
        )}
      >
        {(title || showClose) && (
          <div className="flex items-start justify-between p-6 pb-4 border-b border-gray-100">
            <div className="space-y-1.5">
              {title && (
                <h2 className="text-lg font-semibold leading-none tracking-tight text-gray-900">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-gray-500">{description}</p>
              )}
            </div>
            {showClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 -mr-2 -mt-2 ml-2"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-6 pt-4">
          {children}
        </div>
        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 p-6 pt-4 border-t border-gray-100 bg-gray-50/50 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

Modal.displayName = 'Modal'

export { Modal }
