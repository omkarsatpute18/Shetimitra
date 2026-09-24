import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { Bell } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface NotificationItemProps {
  icon?: LucideIcon | React.ReactNode
  title: string
  message: string
  time: string
  read: boolean
  onMarkRead?: () => void
  onClick?: () => void
  className?: string
}

const NotificationItem = ({
  icon: Icon = Bell,
  title,
  message,
  time,
  read,
  onMarkRead,
  onClick,
  className,
}: NotificationItemProps) => {
  return (
    <div
      className={cn(
        'group relative flex items-start gap-3 p-4 rounded-xl border transition-all',
        read
          ? 'bg-white border-gray-100 hover:bg-gray-50/60'
          : 'bg-primary-50/40 border-primary-100 hover:bg-primary-50/60',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {!read && (
        <span className="absolute top-4 left-2.5 h-2 w-2 rounded-full bg-primary-600" />
      )}
      <div
        className={cn(
          'flex items-center justify-center h-10 w-10 rounded-xl border flex-shrink-0 ml-2',
          read
            ? 'bg-gray-100 border-gray-200 text-gray-500'
            : 'bg-primary-100 border-primary-200 text-primary-700'
        )}
      >
        {React.isValidElement(Icon) ? (
          Icon
        ) : typeof Icon === 'function' ? (
          <Icon className="h-5 w-5" />
        ) : null}
      </div>
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className={cn(
            'text-sm leading-snug truncate',
            read ? 'font-medium text-gray-700' : 'font-semibold text-gray-900'
          )}>
            {title}
          </h4>
          <span className="text-[11px] text-gray-400 flex-shrink-0 mt-0.5 whitespace-nowrap">{time}</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{message}</p>
        {!read && onMarkRead && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onMarkRead()
            }}
            className="text-[11px] font-semibold text-primary-600 hover:text-primary-700 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  )
}

NotificationItem.displayName = 'NotificationItem'

export { NotificationItem }
