import * as React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Minimize2,
  Maximize2,
  CheckCircle2,
  Sprout,
  TrendingUp,
  ShoppingCart,
  Layers,
  Truck,
  CreditCard,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useRole } from '@/context/RoleContext'

interface DemoStep {
  step: number
  title: string
  subtitle: string
  route: string
  role: 'farmer' | 'buyer' | 'fpo' | 'transport'
  icon: React.ComponentType<{ className?: string }>
}

const demoSteps: DemoStep[] = [
  {
    step: 1,
    title: '१. शेतकरी प्रोफाइल आणि पीक (Farmer Dashboard)',
    subtitle: 'शेतकरी राजेश पाटील — कांदा पीक (३,५०० किलो), आजचे हवामान व स्थानिक थेट मागण्या.',
    route: '/farmer/dashboard',
    role: 'farmer',
    icon: Sprout,
  },
  {
    step: 2,
    title: '२. आजचे बाजारभाव (Mandi Price Discovery)',
    subtitle: 'पुणे व लासलगाव बाजारभाव तुलना — वाहतूक खर्च वजा जाता लासलगावमध्ये जास्त नफा मिळतो.',
    route: '/farmer/price-discovery',
    role: 'farmer',
    icon: TrendingUp,
  },
  {
    step: 3,
    title: '३. थेट खरेदीदार (Direct Buyer Match)',
    subtitle: 'एबीसी ॲग्रो फूड्स — ₹३,१५०/क्विंटल भाव (स्थानिक बाजारापेक्षा १२% जादा) आणि सुरक्षित पेमेंट.',
    route: '/farmer/buyers/B1',
    role: 'farmer',
    icon: ShoppingCart,
  },
  {
    step: 4,
    title: '४. मालाची कमतरता (Quantity Gap)',
    subtitle: 'खरेदीदाराला ५,००० किलो हवे, एकट्याकडे १,५०० किलो उपलब्ध आहे — शेजारी शेतकऱ्यांसोबत एकत्र करा.',
    route: '/farmer/lot-formation',
    role: 'farmer',
    icon: Layers,
  },
  {
    step: 5,
    title: '५. शेजाऱ्यांसोबत एकत्र विक्री (Collective Lot)',
    subtitle: 'विश्वनाथ जाधव व बबनराव शिंदे यांच्यासोबत ५,००० किलो लॉट पूर्ण — मोठा खरेदीदार अनलॉक!',
    route: '/farmer/lot-formation',
    role: 'farmer',
    icon: Layers,
  },
  {
    step: 6,
    title: '६. एकत्र वाहतूक / गाडी (Shared Truck)',
    subtitle: 'नाशिक ते पुणे मार्गावर टाटा ४०७ गाडीत जागा — ३८% वाहतूक खर्च थेट बचत.',
    route: '/farmer/transport',
    role: 'farmer',
    icon: Truck,
  },
  {
    step: 7,
    title: '७. डिलिव्हरी व ऑर्डर मागोवा (Live Delivery)',
    subtitle: 'ऑर्डर #O1 तयार — शेतावरून थेट गोदामापर्यंत प्रत्येक टप्प्याचा थेट मागोवा.',
    route: '/farmer/orders/O1',
    role: 'farmer',
    icon: CheckCircle2,
  },
  {
    step: 8,
    title: '८. सुरक्षित बँक पैसे (Safe Bank Settlement)',
    subtitle: 'माल पोहोचताच ₹४४,२५० थेट बँक खात्यात जमा — १००% सुरक्षित पैसे.',
    route: '/farmer/payments',
    role: 'farmer',
    icon: CreditCard,
  },
]

export function HackathonDemoBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setRole, currentRole } = useRole()

  const [isDismissed, setIsDismissed] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [currentStepIndex, setCurrentStepIndex] = React.useState(0)

  // Sync step with location if user manually navigates
  React.useEffect(() => {
    const matchedIdx = demoSteps.findIndex((s) => location.pathname === s.route)
    if (matchedIdx !== -1) {
      setCurrentStepIndex(matchedIdx)
    }
  }, [location.pathname])

  const currentStep = demoSteps[currentStepIndex]
  const Icon = currentStep.icon

  const goToStep = (index: number) => {
    const target = demoSteps[index]
    if (!target) return
    setCurrentStepIndex(index)
    if (currentRole !== target.role) {
      setRole(target.role as typeof currentRole)
    }
    navigate(target.route)
  }

  const handleNext = () => {
    if (currentStepIndex < demoSteps.length - 1) {
      goToStep(currentStepIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1)
    }
  }

  if (isDismissed) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsDismissed(false)}
          className="flex items-center gap-1.5 bg-primary-800 text-white px-3.5 py-2 rounded-full shadow-lg hover:bg-primary-900 border border-primary-600 text-xs font-bold transition-all hover:scale-105"
          title="शेतकरी मार्गदर्शक सुरू करा"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>मार्गदर्शक (Tour)</span>
        </button>
      </div>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-primary-800 text-white px-4 py-2.5 rounded-full shadow-xl hover:bg-primary-900 border border-primary-600 text-xs font-bold transition-transform hover:scale-105"
        >
          <Sparkles className="h-4 w-4 text-amber-300" />
          <span>🌾 शेतकरी मार्गदर्शक (टप्पा {currentStep.step}/8)</span>
          <Maximize2 className="h-3.5 w-3.5 text-primary-300" />
        </button>
        <button
          onClick={() => setIsDismissed(true)}
          className="bg-gray-800 text-gray-300 p-2 rounded-full border border-gray-700 hover:text-white"
          title="बंद करा"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-3 left-4 right-4 max-w-5xl mx-auto z-50">
      <div className="rounded-2xl bg-gray-900/95 backdrop-blur-md text-white border border-gray-700 shadow-2xl p-3.5 sm:p-4 transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Left info */}
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            <div className="p-2.5 rounded-xl bg-primary-600 text-white flex-shrink-0 shadow-sm">
              <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/80 px-2 py-0.5 rounded">
                  शेतकरी मार्गदर्शक • टप्पा {currentStep.step} / 8
                </span>
                <h4 className="text-sm font-bold text-white truncate">{currentStep.title}</h4>
              </div>
              <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                {currentStep.subtitle}
              </p>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
            {/* Step selector dropdown */}
            <select
              value={currentStepIndex}
              onChange={(e) => goToStep(Number(e.target.value))}
              aria-label="Select demo journey step"
              className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer"
            >
              {demoSteps.map((s, idx) => (
                <option key={s.step} value={idx}>
                  पायरी {s.step}: {s.title}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              disabled={currentStepIndex === 0}
              onClick={handlePrev}
              className="bg-gray-800 text-gray-200 border-gray-700 hover:bg-gray-700 px-2 text-xs"
              title="मागे (Previous)"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="primary"
              size="sm"
              disabled={currentStepIndex === demoSteps.length - 1}
              onClick={handleNext}
              className="bg-primary-600 hover:bg-primary-500 text-white text-xs font-bold px-3 gap-1"
            >
              <span>पुढे (Next)</span>
              <ChevronRight className="h-4 w-4" />
            </Button>

            <button
              onClick={() => setIsMinimized(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
              title="लहान करा (Minimize)"
            >
              <Minimize2 className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-gray-800 transition"
              title="मार्गदर्शक बंद करा (Close)"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
