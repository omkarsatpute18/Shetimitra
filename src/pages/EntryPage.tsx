import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Sprout, ShoppingCart, Users, Truck, ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { UserRole, type UserRole as UserRoleType } from '@/types'
import { cn } from '@/utils/cn'

import { VoiceButton } from '@/components/ui/VoiceButton'

interface RoleCard {
  role: UserRoleType
  labelKey: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  description: string
  gradient: string
  accent: string
}

const roleCards: RoleCard[] = [
  {
    role: UserRole.Farmer,
    labelKey: 'roles.farmer',
    title: '🌾 शेतकरी दादा (Farmer)',
    icon: Sprout,
    description: 'आजचे बाजारभाव तपासा, माल विका, शेजाऱ्यांसोबत एकत्र लॉट बनवा आणि थेट बँक खात्यात पैसे मिळवा.',
    gradient: 'from-primary-50 to-crop-50 hover:from-primary-100 hover:to-crop-100',
    accent: 'text-primary-800',
  },
  {
    role: UserRole.Buyer,
    labelKey: 'roles.buyer',
    title: '🏢 खरेदीदार / व्यापारी (Buyer)',
    icon: ShoppingCart,
    description: 'दर्जेदार पिकांची खरेदी करा, थेट मागणी टाका आणि शेतकरी गटांशी थेट व्यवहार करा.',
    gradient: 'from-sky-50 to-earth-50 hover:from-sky-100 hover:to-earth-100',
    accent: 'text-sky-800',
  },
  {
    role: UserRole.FPO,
    labelKey: 'roles.fpo',
    title: '🤝 शेतकरी उत्पादक गट (FPO)',
    icon: Users,
    description: 'शेतकऱ्यांना एकत्र जोडा, मोठा एकत्रित लॉट बनवा आणि संस्थात्मक खरेदीदारांशी करार करा.',
    gradient: 'from-amber-50 to-soil-50 hover:from-amber-100 hover:to-soil-100',
    accent: 'text-amber-800',
  },
  {
    role: UserRole.Transport,
    labelKey: 'roles.transport',
    title: '🚛 गाडी मालक / वाहतूक (Transport)',
    icon: Truck,
    description: 'रस्त्यातील शेतकरी शोधा, रिकाम्या गाडीत जागा भरा आणि सुरक्षित थेट कमाई मिळवा.',
    gradient: 'from-earth-50 to-sky-50 hover:from-earth-100 hover:to-sky-100',
    accent: 'text-earth-900',
  },
]

export default function EntryPage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const handleSelectRole = (role: UserRoleType) => {
    navigate(`/login?role=${role}`)
  }

  const languages = [
    { code: 'mr', label: 'मराठी' },
    { code: 'hi', label: 'हिन्दी' },
    { code: 'en', label: 'English' },
  ] as const

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-primary-50/30 to-white">
      <header className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-crop-600 flex items-center justify-center text-white shadow-sm">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-bold text-gray-900 leading-tight">शेतीमित्र • ShetiMitra</div>
              <div className="text-[11px] text-gray-500 leading-tight">
                बळीराजाचा डिजिटल सोबती
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary-50 p-1 rounded-xl border border-primary-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => void i18n.changeLanguage(lang.code)}
                  className={cn(
                    'px-2 py-0.5 text-xs font-bold rounded-lg transition',
                    i18n.language === lang.code
                      ? 'bg-primary-700 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-white'
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/login')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              लॉगिन / नवीन खाते
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl mx-auto text-center mb-8 sm:mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold text-primary-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            🌾 बळीराजाचा डिजिटल सोबती • शेतीमित्र (Farmer First Agri Platform)
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            स्वागत आहे{' '}
            <span className="bg-gradient-to-r from-primary-600 to-crop-700 bg-clip-text text-transparent">
              शेतीमित्र मध्ये
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            योग्य बाजारभाव मिळवा • मध्यस्थांशिवाय थेट खरेदीदार • शेजाऱ्यांसोबत एकत्र विक्री • १००% सुरक्षित बँक खात्यात पैसे
          </p>

          <div className="pt-1">
            <VoiceButton
              size="md"
              text="शेतीमित्र मध्ये आपले स्वागत आहे. येथे तुम्ही आजचे थेट बाजारभाव पाहू शकता, शेजाऱ्यांसोबत एकत्र माल विकू शकता आणि योग्य भाव मिळवू शकता. कृपया खालीलपैकी तुमचे काम निवडा."
              label="ऐका (बोलून दाखवा 🔊)"
            />
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-gray-500 text-center mb-4">
            खालीलपैकी एक पर्याय निवडून पुढे जा:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {roleCards.map((card) => (
              <button
                key={card.role}
                onClick={() => handleSelectRole(card.role)}
                className={cn(
                  'group relative text-left p-6 sm:p-7 rounded-2xl border-2 border-gray-200 bg-gradient-to-br transition-all duration-200',
                  'hover:shadow-lg hover:border-primary-200 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary-500/20',
                  card.gradient
                )}
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div
                    className={cn(
                      'h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-gray-100',
                      card.accent,
                      'group-hover:scale-105 transition-transform'
                    )}
                  >
                    <card.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div className="text-gray-300 group-hover:text-primary-500 transition-colors">
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <h3 className={cn('text-xl sm:text-2xl font-bold mb-2', card.accent)}>
                  {card.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-medium">{card.description}</p>
                <div className="mt-5 flex items-center text-sm font-bold text-primary-700 group-hover:translate-x-1 transition-transform">
                  लॉगिन / खाते उघडा (Login) <ArrowRight className="h-4 w-4 ml-1.5" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500 max-w-md font-medium">
          शेतीमित्र — बळीराजाच्या सक्षमीकरणासाठी आणि पारदर्शक शेती बाजारासाठी.
        </div>
      </main>
    </div>
  )
}
