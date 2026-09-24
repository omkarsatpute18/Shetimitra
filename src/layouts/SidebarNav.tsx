import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  TrendingUp,
  Sprout,
  ShoppingCart,
  Layers,
  Truck,
  Users,
  Warehouse,
  IndianRupee,
  BookOpen,
  CreditCard,
  Bot,
  Bell,
  User,
  Search,
  ClipboardList,
  Package,
  Route,
  Car,
  Wallet,
  FileBarChart,
} from 'lucide-react'
import { useRole } from '@/context/RoleContext'
import { UserRole } from '@/types'
import { cn } from '@/utils/cn'

interface MenuItem {
  to: string
  labelKey: string
  icon: React.ComponentType<{ className?: string }>
}

const farmerMenu: MenuItem[] = [
  { to: '/farmer/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/farmer/price-discovery', labelKey: 'nav.marketPrices', icon: TrendingUp },
  { to: '/farmer/marketplace', labelKey: 'nav.sellProduce', icon: Sprout },
  { to: '/farmer/buyers', labelKey: 'nav.buyers', icon: ShoppingCart },
  { to: '/farmer/lot-formation', labelKey: 'nav.lotFormation', icon: Layers },
  { to: '/farmer/transport', labelKey: 'nav.transport', icon: Truck },
  { to: '/farmer/fpo', labelKey: 'nav.fpoNetwork', icon: Users },
  { to: '/farmer/storage', labelKey: 'nav.storage', icon: Warehouse },
  { to: '/farmer/msp', labelKey: 'nav.msp', icon: IndianRupee },
  { to: '/farmer/schemes', labelKey: 'nav.schemes', icon: BookOpen },
  { to: '/farmer/payments', labelKey: 'nav.payments', icon: CreditCard },
  { to: '/farmer/ai-assistant', labelKey: 'nav.aiAssistant', icon: Bot },
  { to: '/farmer/notifications', labelKey: 'nav.notifications', icon: Bell },
  { to: '/farmer/profile', labelKey: 'nav.profile', icon: User },
]

const buyerMenu: MenuItem[] = [
  { to: '/buyer/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/buyer/find-produce', labelKey: 'nav.findProduce', icon: Search },
  { to: '/buyer/post-demand', labelKey: 'nav.postDemand', icon: ClipboardList },
  { to: '/buyer/orders', labelKey: 'nav.orders', icon: Package },
  { to: '/buyer/farmers', labelKey: 'nav.farmers', icon: Users },
  { to: '/buyer/lots', labelKey: 'nav.lots', icon: Layers },
  { to: '/buyer/transport', labelKey: 'nav.transport', icon: Truck },
  { to: '/buyer/payments', labelKey: 'nav.payments', icon: CreditCard },
  { to: '/buyer/profile', labelKey: 'nav.profile', icon: User },
]

const fpoMenu: MenuItem[] = [
  { to: '/fpo/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/fpo/members', labelKey: 'nav.members', icon: Users },
  { to: '/fpo/produce', labelKey: 'nav.produce', icon: Sprout },
  { to: '/fpo/lots', labelKey: 'nav.lots', icon: Layers },
  { to: '/fpo/buyers', labelKey: 'nav.buyers', icon: ShoppingCart },
  { to: '/fpo/transport', labelKey: 'nav.transport', icon: Truck },
  { to: '/fpo/market-prices', labelKey: 'nav.marketPrices', icon: TrendingUp },
  { to: '/fpo/reports', labelKey: 'nav.reports', icon: FileBarChart },
  { to: '/fpo/profile', labelKey: 'nav.profile', icon: User },
]

const transportMenu: MenuItem[] = [
  { to: '/transport/dashboard', labelKey: 'nav.dashboard', icon: LayoutDashboard },
  { to: '/transport/requests', labelKey: 'nav.requests', icon: ClipboardList },
  { to: '/transport/routes', labelKey: 'nav.routes', icon: Route },
  { to: '/transport/active-trips', labelKey: 'nav.activeTrips', icon: Car },
  { to: '/transport/earnings', labelKey: 'nav.earnings', icon: Wallet },
  { to: '/transport/profile', labelKey: 'nav.profile', icon: User },
]

const menuByRole: Record<string, MenuItem[]> = {
  [UserRole.Farmer]: farmerMenu,
  [UserRole.Buyer]: buyerMenu,
  [UserRole.FPO]: fpoMenu,
  [UserRole.Transport]: transportMenu,
}

export interface SidebarNavProps {
  onNavigate?: () => void
  className?: string
}

export function SidebarNav({ onNavigate, className }: SidebarNavProps) {
  const { t } = useTranslation()
  const { currentRole } = useRole()
  const menuItems = menuByRole[currentRole] ?? []

  return (
    <nav className={cn('flex flex-col gap-1 p-3', className)}>
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to.endsWith('/dashboard')}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/20',
              isActive
                ? 'bg-primary-50 text-primary-700 border border-primary-100'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
            )
          }
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          <span className="truncate">{t(item.labelKey)}</span>
        </NavLink>
      ))}
    </nav>
  )
}
