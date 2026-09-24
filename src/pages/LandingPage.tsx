import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Sprout,
  ShoppingCart,
  TrendingUp,
  Truck,
  Warehouse,
  Users,
  Bot,
  CreditCard,
  ArrowRight,
  Leaf,
  Search,
  ClipboardList,
  Layers,
  IndianRupee,
  ShieldCheck,
  MapPin,
  BarChart3,
  Handshake,
  Package,
  Wallet,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
}

const features: FeatureItem[] = [
  {
    icon: TrendingUp,
    title: 'Real-time Market Prices',
    description: 'Live APMC and private mandi rates with price trend history up to 90 days.',
    color: 'from-primary-500 to-crop-600',
  },
  {
    icon: ShoppingCart,
    title: 'Direct Buyer Matching',
    description: 'Connect directly with verified buyers. No middlemen. Better margins.',
    color: 'from-sky-500 to-sky-700',
  },
  {
    icon: Sprout,
    title: 'Smart Produce Listing',
    description: 'Catalogue your harvest with quality grade, photos, and transparent pricing.',
    color: 'from-green-500 to-emerald-700',
  },
  {
    icon: Layers,
    title: 'Lot Formation & FPO',
    description: 'Aggregate small quantities into bulk lots. Get wholesale rates via FPOs.',
    color: 'from-amber-500 to-orange-700',
  },
  {
    icon: Truck,
    title: 'Transport Marketplace',
    description: 'Find verified transporters, live quotes, cold-chain and GPS-tracked trips.',
    color: 'from-earth-600 to-earth-800',
  },
  {
    icon: Warehouse,
    title: 'Storage & Warehousing',
    description: 'Book verified cold and dry storage near you at transparent per-day rates.',
    color: 'from-soil-500 to-soil-700',
  },
  {
    icon: Bot,
    title: 'AI Farming Assistant',
    description: 'Crop advisory, pest diagnosis, market forecasts, and scheme eligibility checks.',
    color: 'from-purple-500 to-violet-700',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Escrow-backed UPI payments, settlement tracking, and pending alerts.',
    color: 'from-rose-500 to-red-700',
  },
]

interface StepItem {
  step: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  detail: string
}

const steps: StepItem[] = [
  { step: 1, icon: Search, title: 'Discover Prices', detail: 'Check live market rates and MSP for your crops.' },
  { step: 2, icon: ClipboardList, title: 'List Your Produce', detail: 'Add harvest details, quantity, and expected price.' },
  { step: 3, icon: Users, title: 'Find Counterparties', detail: 'Match with verified buyers, FPOs, or farmers.' },
  { step: 4, icon: Handshake, title: 'Negotiate & Agree', detail: 'Compare quotes, chat, and finalize the best deal.' },
  { step: 5, icon: Layers, title: 'Form Lots (if small)', detail: 'Aggregate with FPO/fellow farmers for bulk price.' },
  { step: 6, icon: Truck, title: 'Book Transport', detail: 'Get instant quotes, select vehicle, track in real time.' },
  { step: 7, icon: Package, title: 'Fulfil Order', detail: 'Pickup, transit, and doorstep delivery with proof.' },
  { step: 8, icon: Wallet, title: 'Get Paid', detail: 'Fast UPI settlements. Escrow. Full transaction history.' },
]

export default function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-crop-600 flex items-center justify-center text-white shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900 leading-tight">ShetiMitra</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                Smart Market Linkage for Better Farm Value
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/farmer/price-discovery')}>
              {t('actions.explorePrices')}
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/')}>
              {t('actions.startSelling')}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-crop-50/60 pointer-events-none" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-200/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-crop-200/40 blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-primary-700 shadow-sm">
                  <Star className="h-3.5 w-3.5 text-sun-500" />
                  Trusted by farmers, FPOs, and agri-buyers
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.05]">
                  {t('landing.hero')}
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl">
                  {t('landing.tagline')}. Transparent price discovery, verified counterparties,
                  end-to-end logistics, and secure payments for every participant in India&apos;s
                  agri-value chain.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    onClick={() => navigate('/')}
                    className="shadow-lg shadow-primary-600/20"
                  >
                    {t('actions.startSelling')}
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => navigate('/farmer/price-discovery')}>
                    {t('actions.explorePrices')}
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 max-w-lg">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">14+</div>
                    <div className="text-xs sm:text-sm text-gray-500">Core features</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">4</div>
                    <div className="text-xs sm:text-sm text-gray-500">User personas</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900">3</div>
                    <div className="text-xs sm:text-sm text-gray-500">Languages</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-square max-w-md mx-auto w-full">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-primary-200/50 via-crop-200/50 to-earth-200/50 blur-2xl" />
                  <div className="relative h-full w-full rounded-[2.5rem] bg-white border border-gray-200 shadow-2xl p-6 sm:p-8 flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-700">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">Onion • Nasik Red</div>
                          <div className="text-xs text-gray-500">Pune APMC • Today</div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-700 bg-green-100 rounded-md px-2 py-1">
                        +8% ↑
                      </span>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-gray-50 to-primary-50/40 p-5 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Modal Price</div>
                      <div className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                        ₹2,850<small className="text-base font-medium text-gray-500 ml-1">/qtl</small>
                      </div>
                      <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          <IndianRupee className="h-3 w-3" /> MSP: 2,440
                        </span>
                        <span className="h-1 w-1 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> 5 markets
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-gray-200 p-3 bg-white">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary-600" /> Verified
                        </div>
                        <div className="text-sm font-semibold text-gray-900">ABC Agro Foods</div>
                        <div className="text-xs text-gray-500">₹2,950/q • 5MT</div>
                      </div>
                      <div className="rounded-xl border border-gray-200 p-3 bg-white">
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                          <Truck className="h-3.5 w-3.5 text-earth-700" /> Transport
                        </div>
                        <div className="text-sm font-semibold text-gray-900">3 providers</div>
                        <div className="text-xs text-gray-500">from ₹85/km</div>
                      </div>
                    </div>
                    <Button variant="primary" className="mt-auto" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      {t('actions.sellNow')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 mb-3">
              Why ShetiMitra
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Everything you need for smarter agri-commerce
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              A complete digital platform covering price discovery, listings, matching, lots,
              transport, storage, schemes, and payments — in your language.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="group p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-primary-100 transition-all"
              >
                <div
                  className={`h-11 w-11 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white shadow-sm mb-4 group-hover:scale-105 transition-transform`}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-b from-gray-50/70 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 mb-3">
                How it works
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 mb-4">
                From harvest to payout, in 8 simple steps
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Whether you&apos;re a smallholder farmer or a bulk buyer, ShetiMitra takes you
                through the full journey with clarity and trust.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary-600 text-white text-sm font-bold flex items-center justify-center">
                      {s.step}
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                      <s.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-crop-600 flex items-center justify-center text-white shadow-sm">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-bold text-gray-900 leading-tight">ShetiMitra</div>
                  <div className="text-[11px] text-gray-500 leading-tight">
                    Smart Market Linkage
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                ShetiMitra empowers farmers, FPOs, buyers, and transporters with transparent
                market linkages, verified counter-parties, and end-to-end logistics.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">आमचे ध्येय / Our Mission</h4>
              <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-4">
                <div className="text-xs font-bold text-primary-700 uppercase tracking-wider mb-1.5">
                  पारदर्शक शेती बाजार
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">
                  शेतकऱ्यांना त्यांच्या घामाचे योग्य दाम मिळवून देणे, मध्यस्थांची दलाली संपवणे,
                  शेजाऱ्यांसोबत एकत्र माल विक्री करून मोठा भाव मिळवणे आणि थेट बँक खात्यात पैसे जमा करणे.
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Built for</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Sprout className="h-4 w-4 text-primary-600" /> Farmers &amp; Producers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <ShoppingCart className="h-4 w-4 text-sky-600" /> Traders &amp; Buyers
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4 text-amber-600" /> FPOs &amp; Cooperatives
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="h-4 w-4 text-earth-700" /> Transport Providers
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} ShetiMitra (शेतीमित्र). All rights reserved.
            </p>
            <p className="text-xs text-gray-500 font-medium">
              बळीराजाच्या सेवेसाठी सदैव तत्पर • शेतीमित्र
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
