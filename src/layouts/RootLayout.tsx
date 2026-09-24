import * as React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import {
  Menu,
  X,
  Bell,
  ChevronDown,
  LogOut,
  Sprout,
  ShoppingCart,
  Users,
  Truck,
  UserCircle,
} from 'lucide-react'
import { useRole } from '@/context/RoleContext'
import { useNotifications } from '@/context/NotificationContext'
import { SidebarNav } from '@/layouts/SidebarNav'
import { Drawer } from '@/components/ui/Drawer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { NotificationItem } from '@/components/ui/NotificationItem'
import { HackathonDemoBar } from '@/components/HackathonDemoBar'
import { UserRole, type UserRole as UserRoleType } from '@/types'
import { cn } from '@/utils/cn'

import { VoiceButton } from '@/components/ui/VoiceButton'

function LanguageSelector() {
  const { i18n } = useTranslation()
  const languages = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' },
  ] as const

  return (
    <div className="flex items-center gap-1 bg-primary-50/80 p-0.5 sm:p-1 rounded-xl border border-primary-200 shadow-xs">
      {languages.map((lang) => {
        const active = i18n.language === lang.code
        return (
          <button
            key={lang.code}
            onClick={() => void i18n.changeLanguage(lang.code)}
            className={cn(
              'px-2 py-1 text-xs font-bold rounded-lg transition-all',
              active
                ? 'bg-primary-700 text-white shadow-sm'
                : 'text-primary-950 hover:bg-white/80'
            )}
            title={`भाषा बदला: ${lang.label}`}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}

function NotificationBell() {
  const { t } = useTranslation()
  const { notifications, getUnreadCount, markRead, markAllRead } = useNotifications()
  const [open, setOpen] = React.useState(false)
  const unread = getUnreadCount()

  const sortedNotifications = React.useMemo(
    () =>
      [...notifications].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [notifications]
  )

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        className="relative text-gray-600"
        aria-label={t('nav.notifications')}
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center">
            <Badge variant="error" size="sm" className="h-5 min-w-5 px-1 text-[10px] rounded-full">
              {unread > 99 ? '99+' : String(unread)}
            </Badge>
          </span>
        )}
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} side="right" title={t('nav.notifications')}>
        <div className="p-4 space-y-3">
          {unread > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              Mark all as read
            </button>
          )}
          {sortedNotifications.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-500">
              No notifications yet
            </div>
          ) : (
            <div className="space-y-2">
              {sortedNotifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  title={n.title}
                  message={n.message}
                  time={format(new Date(n.createdAt), 'MMM d, HH:mm')}
                  read={n.isRead}
                  onMarkRead={() => markRead(n.id)}
                />
              ))}
            </div>
          )}
        </div>
      </Drawer>
    </>
  )
}

interface RoleOption {
  role: UserRoleType
  labelKey: string
  icon: React.ComponentType<{ className?: string }>
}

const roleOptions: RoleOption[] = [
  { role: UserRole.Farmer, labelKey: 'roles.farmer', icon: Sprout },
  { role: UserRole.Buyer, labelKey: 'roles.buyer', icon: ShoppingCart },
  { role: UserRole.FPO, labelKey: 'roles.fpo', icon: Users },
  { role: UserRole.Transport, labelKey: 'roles.transport', icon: Truck },
]

function ProfileMenu() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { currentUser, currentRole, setRole, logout } = useRole()
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRoleChange = (role: UserRoleType) => {
    setRole(role)
    setOpen(false)
    navigate(`/${role}/dashboard`)
  }

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/login')
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-700 text-sm font-semibold">
          {currentUser.avatar}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-gray-900 leading-tight">{currentUser.name}</div>
          <div className="text-xs text-gray-500 leading-tight">{t(`roles.${currentRole}`)}</div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold">
                {currentUser.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</div>
                <div className="text-xs text-gray-500 truncate">{currentUser.location}</div>
                <div className="text-[11px] text-emerald-700 font-medium">📱 +91 {currentUser.phone}</div>
              </div>
            </div>
          </div>

          <div className="p-2 border-b border-gray-100">
            <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              खाते प्रकार बदला (Switch Role)
            </div>
            {roleOptions.map((opt) => (
              <button
                key={opt.role}
                onClick={() => handleRoleChange(opt.role)}
                className={cn(
                  'w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors',
                  currentRole === opt.role
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
              >
                <opt.icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">{t(opt.labelKey)}</span>
                {currentRole === opt.role && (
                  <Badge variant="success" size="sm" className="ml-auto">
                    सक्रिय
                  </Badge>
                )}
              </button>
            ))}
          </div>

          <div className="p-2 space-y-1">
            <button
              onClick={() => {
                setOpen(false)
                navigate('/login')
              }}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-xs font-semibold text-primary-700 hover:bg-primary-50 transition-colors"
            >
              <span>🔑 नवीन खात्याने लॉगिन करा (Switch Account)</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>बाहेर पडा (लॉगआउट / Logout)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function RootLayout() {
  const { i18n } = useTranslation()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleSidebar = () => setSidebarOpen((v) => !v)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/75">
        <div className="h-16 flex items-center justify-between px-4 lg:px-6 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-gray-600 -ml-1.5"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-crop-600 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <Sprout className="h-5 w-5" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <div className="text-base font-bold text-gray-900 leading-tight truncate">
                  ShetiMitra
                </div>
                <div className="text-[11px] text-gray-500 leading-tight truncate">
                  Smart Market Linkage for Better Farm Value
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <VoiceButton
              size="sm"
              variant="secondary"
              text={
                i18n.language === 'mr'
                  ? 'शेतीमित्र मध्ये आपले स्वागत आहे. येथे तुम्ही आजचे थेट बाजारभाव पाहू शकता, शेजाऱ्यांसोबत एकत्र माल विकू शकता आणि योग्य भाव मिळवू शकता.'
                  : i18n.language === 'hi'
                  ? 'खेतीमित्र में आपका स्वागत है। यहां आप आज का मंडी भाव देख सकते हैं, सीधे खरीदार से जुड़ सकते हैं और ज्यादा मुनाफा कमा सकते हैं।'
                  : 'Welcome to ShetiMitra. Discover real market prices, connect directly with buyers, and earn better farm value.'
              }
              label={i18n.language === 'mr' ? 'मदत ऐका' : i18n.language === 'hi' ? 'मदद सुनिए' : 'Listen'}
              className="hidden sm:inline-flex"
            />
            <LanguageSelector />
            <NotificationBell />
            <ProfileMenu />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {isMobile && (
          <>
            <div
              className={cn(
                'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
                sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
              onClick={closeSidebar}
            />
            <aside
              className={cn(
                'fixed left-0 top-16 bottom-0 z-30 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-out lg:hidden overflow-y-auto',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              )}
            >
              <div className="flex items-center justify-between p-3 border-b border-gray-100">
                <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2">
                  Navigation
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeSidebar}
                  className="text-gray-500 -mr-1"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <SidebarNav onNavigate={closeSidebar} />
            </aside>
          </>
        )}

        <aside className="hidden lg:block w-64 flex-shrink-0 border-r border-gray-200 bg-white overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 py-1">
              Navigation
            </div>
          </div>
          <SidebarNav />
        </aside>

        <main className="flex-1 min-w-0 overflow-y-auto pb-24">
          <div className="p-4 lg:p-6 min-h-[calc(100vh-4rem-2.5rem)]">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="border-t border-gray-200 bg-white">
        <div className="h-10 flex items-center justify-center px-4">
          <p className="text-xs text-gray-600 text-center font-medium">
            शेतीमित्र (ShetiMitra) • बळीराजाचा डिजिटल सोबती — योग्य भाव, थेट खरेदीदार आणि १००% सुरक्षित पैसे
          </p>
        </div>
      </footer>

      <HackathonDemoBar />
    </div>
  )
}

export function MobileHamburgerIcon() {
  return <UserCircle className="h-5 w-5" />
}
