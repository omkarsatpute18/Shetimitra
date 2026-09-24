import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { FileQuestion } from 'lucide-react'
import { NotificationProvider } from '@/context/NotificationContext'
import { RoleProvider } from '@/context/RoleContext'
import { RootLayout } from '@/layouts/RootLayout'
import { LoadingState } from '@/components/ui/LoadingState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Card, CardContent } from '@/components/ui/Card'
import EntryPage from '@/pages/EntryPage'
import LandingPage from '@/pages/LandingPage'
import i18n from '@/i18n'

// Feature Pages
import FarmerDashboard from '@/pages/farmer/FarmerDashboard'
import PriceDiscoveryPage from '@/pages/farmer/PriceDiscoveryPage'
import MarketplacePage from '@/pages/farmer/MarketplacePage'
import BuyerDetailPage from '@/pages/farmer/BuyerDetailPage'
import LotFormationPage from '@/pages/farmer/LotFormationPage'
import TransportPage from '@/pages/farmer/TransportPage'
import FpoPage from '@/pages/farmer/FpoPage'
import StoragePage from '@/pages/farmer/StoragePage'
import MspPage from '@/pages/farmer/MspPage'
import SchemesPage from '@/pages/farmer/SchemesPage'
import PaymentsPage from '@/pages/farmer/PaymentsPage'
import AiAssistantPage from '@/pages/farmer/AiAssistantPage'
import NotificationsPage from '@/pages/farmer/NotificationsPage'
import OrderDetailPage from '@/pages/farmer/OrderDetailPage'
import BuyerDashboard from '@/pages/buyer/BuyerDashboard'
import FpoDashboard from '@/pages/fpo/FpoDashboard'
import TransportDashboard from '@/pages/transport/TransportDashboard'
import ProfilePage from '@/pages/common/ProfilePage'
import LoginPage from '@/pages/auth/LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EntryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<LandingPage />} />

      <Route element={<RootLayout />}>
        {/* Farmer Journey Routes */}
        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        <Route path="/farmer/price-discovery" element={<PriceDiscoveryPage />} />
        <Route path="/farmer/marketplace" element={<MarketplacePage />} />
        <Route path="/farmer/buyers" element={<MarketplacePage />} />
        <Route path="/farmer/buyers/:id" element={<BuyerDetailPage />} />
        <Route path="/farmer/lot-formation" element={<LotFormationPage />} />
        <Route path="/farmer/transport" element={<TransportPage />} />
        <Route path="/farmer/fpo" element={<FpoPage />} />
        <Route path="/farmer/storage" element={<StoragePage />} />
        <Route path="/farmer/msp" element={<MspPage />} />
        <Route path="/farmer/schemes" element={<SchemesPage />} />
        <Route path="/farmer/payments" element={<PaymentsPage />} />
        <Route path="/farmer/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/farmer/notifications" element={<NotificationsPage />} />
        <Route path="/farmer/profile" element={<ProfilePage />} />
        <Route path="/farmer/orders/:id" element={<OrderDetailPage />} />

        {/* Buyer Persona Routes */}
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
        <Route path="/buyer/find-produce" element={<MarketplacePage />} />
        <Route path="/buyer/post-demand" element={<BuyerDashboard />} />
        <Route path="/buyer/orders" element={<OrderDetailPage />} />
        <Route path="/buyer/orders/:id" element={<OrderDetailPage />} />
        <Route path="/buyer/farmers" element={<MarketplacePage />} />
        <Route path="/buyer/lots" element={<LotFormationPage />} />
        <Route path="/buyer/transport" element={<TransportPage />} />
        <Route path="/buyer/payments" element={<PaymentsPage />} />
        <Route path="/buyer/profile" element={<ProfilePage />} />

        {/* FPO Persona Routes */}
        <Route path="/fpo/dashboard" element={<FpoDashboard />} />
        <Route path="/fpo/members" element={<FpoPage />} />
        <Route path="/fpo/produce" element={<LotFormationPage />} />
        <Route path="/fpo/lots" element={<LotFormationPage />} />
        <Route path="/fpo/buyers" element={<MarketplacePage />} />
        <Route path="/fpo/transport" element={<TransportPage />} />
        <Route path="/fpo/market-prices" element={<PriceDiscoveryPage />} />
        <Route path="/fpo/reports" element={<FpoDashboard />} />
        <Route path="/fpo/profile" element={<ProfilePage />} />

        {/* Transport Provider Persona Routes */}
        <Route path="/transport/dashboard" element={<TransportDashboard />} />
        <Route path="/transport/requests" element={<TransportPage />} />
        <Route path="/transport/routes" element={<TransportPage />} />
        <Route path="/transport/active-trips" element={<TransportDashboard />} />
        <Route path="/transport/earnings" element={<TransportDashboard />} />
        <Route path="/transport/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <EmptyState
            icon={FileQuestion}
            title="Page not found"
            description="The page you're looking for doesn't exist or has been moved."
          />
        </CardContent>
      </Card>
    </div>
  )
}

function AppSuspenseBoundary() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl">
            <LoadingState variant="page" />
          </div>
        </div>
      }
    >
      <AppRoutes />
    </Suspense>
  )
}

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <NotificationProvider>
        <RoleProvider>
          <BrowserRouter>
            <AppSuspenseBoundary />
          </BrowserRouter>
        </RoleProvider>
      </NotificationProvider>
    </I18nextProvider>
  )
}

export default App
