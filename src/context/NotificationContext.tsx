import * as React from 'react'
import { type Notification } from '@/types'
import { notifications as initialNotifications } from '@/data/notifications'

interface NotificationContextValue {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  getUnreadCount: () => number
}

const NotificationContext = React.createContext<NotificationContextValue | undefined>(undefined)

export interface NotificationProviderProps {
  children: React.ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)

  const addNotification = React.useCallback(
    (notification: Omit<Notification, 'id' | 'createdAt'>) => {
      const newNotification: Notification = {
        ...notification,
        id: `N${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      setNotifications((prev) => [newNotification, ...prev])
    },
    []
  )

  const markRead = React.useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }, [])

  const markAllRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }, [])

  const getUnreadCount = React.useCallback(() => {
    return notifications.filter((n) => !n.isRead).length
  }, [notifications])

  const value = React.useMemo(
    () => ({ notifications, addNotification, markRead, markAllRead, getUnreadCount }),
    [notifications, addNotification, markRead, markAllRead, getUnreadCount]
  )

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  )
}

export function useNotifications(): NotificationContextValue {
  const context = React.useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
