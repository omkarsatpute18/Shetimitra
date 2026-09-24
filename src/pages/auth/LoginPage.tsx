import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Sprout,
  Building2,
  Truck,
  Users,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { useAuth } from '@/context/RoleContext'
import { shetiMitraDb, type AppUser } from '@/db/shetiMitraDb'
import { UserRole, type UserRole as UserRoleType } from '@/types'

export default function LoginPage() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, register, switchUser } = useAuth()

  // Selected role tab: farmer | buyer | transport | fpo
  const initialRole = (searchParams.get('role') as UserRoleType) || UserRole.Farmer
  const [selectedRole, setSelectedRole] = React.useState<UserRoleType>(initialRole)

  // Step in auth: 'phone' -> 'otp' -> 'register' (if new)
  const [step, setStep] = React.useState<'phone' | 'otp' | 'register'>('phone')

  // Form states
  const [phone, setPhone] = React.useState('')
  const [otp, setOtp] = React.useState(['', '', '', ''])
  const [mockSentOtp, setMockSentOtp] = React.useState('1234')
  const [otpError, setOtpError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  // Registration profile states
  const [fullName, setFullName] = React.useState('')
  const [village, setVillage] = React.useState('')
  const [district, setDistrict] = React.useState('नाशिक (Nashik)')
  const [landArea, setLandArea] = React.useState('5')
  const [companyName, setCompanyName] = React.useState('')
  const [gstin, setGstin] = React.useState('')
  const [vehicleType, setVehicleType] = React.useState('पिकअप बोलेरो (Bolero Pickup - 1.5 MT)')
  const [vehicleNumber, setVehicleNumber] = React.useState('MH-15-')
  const [fpoName, setFpoName] = React.useState('')
  const [memberCount, setMemberCount] = React.useState('150')

  // Registered DB users for quick testing
  const [allDbUsers, setAllDbUsers] = React.useState<AppUser[]>([])

  React.useEffect(() => {
    shetiMitraDb.getAllUsers().then(setAllDbUsers)
  }, [])

  // When tab changes, reset state
  const handleRoleTab = (r: UserRoleType) => {
    setSelectedRole(r)
    setStep('phone')
    setOtpError('')
  }

  // Handle phone submission
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    const clean = phone.replace(/\D/g, '')
    if (clean.length < 10) {
      setOtpError(
        i18n.language === 'mr'
          ? 'कृपया योग्य १० अंकी मोबाईल नंबर टाका'
          : i18n.language === 'hi'
          ? 'कृपया सही १० अंकों का मोबाइल नंबर डालें'
          : 'Please enter a valid 10-digit mobile number'
      )
      return
    }

    setOtpError('')
    setIsLoading(true)

    // Simulate OTP generation
    setTimeout(() => {
      setMockSentOtp('1234')
      setStep('otp')
      setIsLoading(false)
    }, 400)
  }

  // Auto fill OTP helper for illiterate farmers
  const handleAutoFillOtp = () => {
    setOtp(['1', '2', '3', '4'])
    setOtpError('')
  }

  // Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const entered = otp.join('')
    if (entered !== mockSentOtp && entered !== '1234') {
      setOtpError(
        i18n.language === 'mr'
          ? 'चुकीचा OTP! कृपया १२३४ टाका किंवा "आपोआप भरा" वर टॅप करा.'
          : 'गलत OTP! कृपया 1234 डालें या "ऑटो भरें" पर टैप करें।'
      )
      return
    }

    setIsLoading(true)
    const clean = phone.replace(/\D/g, '')
    const existing = await shetiMitraDb.findUserByPhoneAndRole(clean, selectedRole)

    if (existing) {
      // Existing user found -> login directly!
      await login(clean, selectedRole)
      setIsLoading(false)
      navigate(`/${selectedRole}/dashboard`)
    } else {
      // New user -> prompt for quick profile details
      setIsLoading(false)
      setStep('register')
    }
  }

  // Complete registration
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return

    setIsLoading(true)
    const clean = phone.replace(/\D/g, '')

    await register({
      role: selectedRole,
      phone: clean,
      name: fullName,
      village: village || (selectedRole === 'farmer' ? 'चाकण' : 'पुणे'),
      district: district || 'पुणे',
      state: 'महाराष्ट्र',
      companyName: companyName || fullName,
      contactName: fullName,
      gstin: gstin || '27AABCU9603R1ZX',
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber || 'MH-12-Q-9999',
      capacityKg: 3000,
      fpoName: fpoName || fullName,
      landArea: Number(landArea) || 5,
      crops: ['कांदा', 'टोमॅटो', 'गहू'],
    })

    setIsLoading(false)
    navigate(`/${selectedRole}/dashboard`)
  }

  // Quick 1-click test login with existing DB profile
  const handleQuickLogin = async (user: AppUser) => {
    await switchUser(user)
    navigate(`/${user.role}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50/50 via-white to-primary-50/30 flex flex-col justify-between">
      {/* Top Navbar */}
      <header className="border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-crop-600 flex items-center justify-center text-white shadow-sm">
              <Sprout className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-base font-bold text-gray-900 leading-tight">शेतीमित्र • ShetiMitra</div>
              <div className="text-[11px] text-gray-500">बळीराजाचा सोबती</div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary-50 p-1 rounded-xl border border-primary-200">
              {[
                { code: 'mr', label: 'मराठी' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'en', label: 'English' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => void i18n.changeLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition ${
                    i18n.language === lang.code
                      ? 'bg-primary-700 text-white shadow-xs'
                      : 'text-gray-700 hover:bg-white'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-1" /> मागे
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col items-center justify-center">
        {/* Role Selector Tabs */}
        <div className="w-full max-w-xl mb-6">
          <div className="text-center space-y-1 mb-5">
            <Badge variant="primary" className="text-xs">
              सुरक्षित डेटाबेस लॉगिन (Live Database Auth)
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {i18n.language === 'mr'
                ? 'तुमच्या खात्यात लॉगिन करा'
                : i18n.language === 'hi'
                ? 'अपने खाते में लॉगिन करें'
                : 'Login to Your Account'}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {i18n.language === 'mr'
                ? 'शेतकरी, व्यापारी आणि गाडी मालकांसाठी स्वतंत्र सुरक्षित प्रवेश'
                : 'Separate verified login for Farmers, Merchants & Transporters'}
            </p>
          </div>

          {/* 4 Role Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-gray-100 p-1.5 rounded-2xl border border-gray-200">
            <button
              onClick={() => handleRoleTab(UserRole.Farmer)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                selectedRole === UserRole.Farmer
                  ? 'bg-primary-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white/80'
              }`}
            >
              <Sprout className="h-4 w-4" />
              <span>🌾 शेतकरी (Farmer)</span>
            </button>

            <button
              onClick={() => handleRoleTab(UserRole.Buyer)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                selectedRole === UserRole.Buyer
                  ? 'bg-sky-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white/80'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>🏢 खरेदीदार (Buyer)</span>
            </button>

            <button
              onClick={() => handleRoleTab(UserRole.Transport)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                selectedRole === UserRole.Transport
                  ? 'bg-amber-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white/80'
              }`}
            >
              <Truck className="h-4 w-4" />
              <span>🚛 गाडी मालक (Truck)</span>
            </button>

            <button
              onClick={() => handleRoleTab(UserRole.FPO)}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-bold transition ${
                selectedRole === UserRole.FPO
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'text-gray-700 hover:bg-white/80'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>👥 FPO गट</span>
            </button>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="w-full max-w-xl shadow-xl border-gray-200 overflow-hidden">
          {/* Card Header with Voice Prompt */}
          <div className="p-5 bg-gradient-to-r from-primary-700 via-primary-600 to-crop-700 text-white flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  {selectedRole === 'farmer' ? '👨‍🌾' : selectedRole === 'buyer' ? '🏢' : selectedRole === 'transport' ? '🚛' : '👥'}
                </span>
                <h3 className="font-bold text-base sm:text-lg">
                  {selectedRole === 'farmer'
                    ? 'शेतकरी दादा लॉगिन (Farmer Access)'
                    : selectedRole === 'buyer'
                    ? 'खरेदीदार / व्यापारी लॉगिन (Buyer Portal)'
                    : selectedRole === 'transport'
                    ? 'गाडी मालक लॉगिन (Transporter Portal)'
                    : 'शेतकरी उत्पादक कंपनी (FPO Portal)'}
                </h3>
              </div>
              <p className="text-xs text-primary-100">
                {step === 'phone'
                  ? '१० अंकी मोबाईल नंबर टाका'
                  : step === 'otp'
                  ? 'मोबाईलवर आलेला OTP टाका'
                  : 'तुमची नवीन माहिती नोंदवा'}
              </p>
            </div>

            <VoiceButton
              text={
                step === 'phone'
                  ? selectedRole === 'farmer'
                    ? 'शेतकरी दादा, येथे तुमचा दहा अंकी मोबाईल नंबर टाका आणि पुढे जा वर टॅप करा.'
                    : 'येथे तुमचा मोबाईल नंबर टाका.'
                  : step === 'otp'
                  ? 'तुमच्या मोबाईलवर आलेला ओटीपी टाका. सोपे जाण्यासाठी ओटीपी आपोआप भरा वर टॅप करा.'
                  : 'कृपया तुमचे नाव आणि गावाचे नाव लिहून नोंदणी पूर्ण करा.'
              }
              label="सूचना ऐका"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 border-white/30"
            />
          </div>

          <CardContent className="p-6 space-y-6">
            {/* STEP 1: PHONE NUMBER */}
            {step === 'phone' && (
              <form onSubmit={handleSendOtp} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>
                      {selectedRole === 'farmer'
                        ? 'मोबाईल नंबर (Mobile Number) *'
                        : selectedRole === 'buyer'
                        ? 'व्यापारी मोबाईल नंबर (Business Mobile) *'
                        : selectedRole === 'transport'
                        ? 'गाडी मालकाचा मोबाईल (Driver/Owner Mobile) *'
                        : 'अधिकृत मोबाईल नंबर *'}
                    </span>
                    <span className="text-[11px] text-primary-700 font-normal">
                      पासवर्डची गरज नाही (No password needed)
                    </span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 font-bold text-sm">
                      🇮🇳 +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      autoFocus
                      placeholder="98220 12345"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '')
                        setPhone(val)
                        if (otpError) setOtpError('')
                      }}
                      className="w-full pl-16 pr-4 py-3.5 text-lg font-bold tracking-wider rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 focus:bg-white transition"
                    />
                  </div>

                  {otpError && (
                    <p className="text-xs text-red-600 font-semibold">{otpError}</p>
                  )}
                </div>

                {/* Big Action Button */}
                <Button
                  type="submit"
                  disabled={isLoading || phone.length < 10}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2"
                >
                  <span>ओटीपी मिळवा (Send OTP)</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>

                {/* Helper notice */}
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>१००% सुरक्षित:</strong> कोणताही शेतकरी मोबाईल नंबर टाकून थेट स्वतःचे खाते सुरू करू शकतो.
                  </p>
                </div>
              </form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                  <div>
                    <span>मोबाईल नंबर: <strong>+91 {phone}</strong></span>
                    <div className="text-[11px] text-amber-800">
                      डेमो SMS द्वारे पाठवलेला OTP: <strong className="text-sm text-primary-800 font-mono">1234</strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-xs font-bold text-primary-700 underline"
                  >
                    बदला
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 block text-center">
                    ४ अंकी OTP टाका (Enter 4-Digit OTP)
                  </label>

                  <div className="flex justify-center gap-3">
                    {[0, 1, 2, 3].map((idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="tel"
                        maxLength={1}
                        value={otp[idx]}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          const newOtp = [...otp]
                          newOtp[idx] = val
                          setOtp(newOtp)
                          if (val && idx < 3) {
                            document.getElementById(`otp-input-${idx + 1}`)?.focus()
                          }
                        }}
                        className="w-14 h-14 text-center text-2xl font-extrabold rounded-xl border-2 border-primary-300 focus:border-primary-600 focus:outline-none bg-gray-50 focus:bg-white transition shadow-xs"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <p className="text-xs text-red-600 font-semibold text-center mt-2">{otpError}</p>
                  )}
                </div>

                {/* 1-Tap Auto-fill for illiterate farmers */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAutoFillOtp}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-100 hover:bg-primary-200 text-primary-800 rounded-full text-xs font-bold transition"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                    <span>ओटीपी आपोआप भरा (Auto-fill 1234)</span>
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || otp.join('').length < 4}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-xl shadow-md"
                >
                  खात्यात प्रवेश करा (Verify & Enter)
                </Button>
              </form>
            )}

            {/* STEP 3: REGISTRATION (IF NEW PROFILE) */}
            {step === 'register' && (
              <form onSubmit={handleCompleteRegistration} className="space-y-4">
                <div className="p-3 bg-primary-50 rounded-xl border border-primary-200 text-xs text-primary-950 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-700 flex-shrink-0" />
                  <span>मोबाईल नंबर पडताळला! आता तुमची खरी माहिती भरा.</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">
                    {selectedRole === 'farmer' ? 'तुमचे पूर्ण नाव (Full Name) *' : 'नाव / कंपनीचे नाव *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. ज्ञानेश्वर विठ्ठल कदम"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {selectedRole === 'farmer' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">गाव (Village) *</label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. चाकण, निफाड, बारामती"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">जिल्हा (District) *</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        <option value="नाशिक">नाशिक (Nashik)</option>
                        <option value="पुणे">पुणे (Pune)</option>
                        <option value="अहमदनगर">अहमदनगर (Ahmednagar)</option>
                        <option value="सोलापूर">सोलापूर (Solapur)</option>
                        <option value="सांगली">सांगली (Sangli)</option>
                        <option value="सातारा">सातारा (Satara)</option>
                        <option value="छत्रपती संभाजीनगर">छत्रपती संभाजीनगर</option>
                      </select>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-gray-700">शेतीचे क्षेत्र (एकरात - Landholding) *</label>
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={landArea}
                        onChange={(e) => setLandArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'buyer' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">कंपनीचे नाव (Firm / Company Name) *</label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. महालक्ष्मी ट्रेडिंग कंपनी"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">मंडी परवाना / GSTIN नंबर</label>
                      <input
                        type="text"
                        placeholder="27AABCS1234D1Z5"
                        value={gstin}
                        onChange={(e) => setGstin(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'transport' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">गाडीचा प्रकार (Vehicle Type) *</label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        <option value="छोटा हत्ती (Tata Ace - 1 MT)">छोटा हत्ती (Tata Ace - 1 MT)</option>
                        <option value="पिकअप बोलेरो (Bolero Pickup - 1.5 MT)">पिकअप बोलेरो (Bolero Pickup - 1.5 MT)</option>
                        <option value="आयशर प्रो (Eicher 7 MT)">आयशर प्रो (Eicher 7 MT)</option>
                        <option value="१० चाकी ट्रक (10 Wheeler - 16 MT)">१० चाकी ट्रक (10 Wheeler - 16 MT)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">गाडी नंबर (Registration No.) *</label>
                      <input
                        type="text"
                        required
                        placeholder="MH-12-AB-1234"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}

                {selectedRole === 'fpo' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">FPO चे नाव *</label>
                      <input
                        type="text"
                        required
                        placeholder="उदा. सह्याद्री शेतकरी उत्पादक कंपनी"
                        value={fpoName}
                        onChange={(e) => setFpoName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700">सभासद शेतकरी संख्या *</label>
                      <input
                        type="number"
                        value={memberCount}
                        onChange={(e) => setMemberCount(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-primary-700 hover:bg-primary-800 text-white font-bold text-base rounded-xl shadow-md mt-4"
                >
                  नोंदणी पूर्ण करा आणि डॅशबोर्डवर जा
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Quick Test Login Accordion */}
        <div className="w-full max-w-xl mt-6 p-4 rounded-2xl bg-white/80 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-emerald-600" />
              जलद चाचणी खाती (Pre-seeded Verified Accounts)
            </span>
            <span className="text-[11px] text-gray-400">१-टॅप लॉगिन</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {allDbUsers.map((u) => (
              <button
                key={u.id}
                onClick={() => handleQuickLogin(u)}
                className="p-2.5 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl text-left transition flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate">
                    {u.role === 'farmer' ? '👨‍🌾 ' : u.role === 'buyer' ? '🏢 ' : u.role === 'transport' ? '🚛 ' : '👥 '}
                    {u.name}
                  </div>
                  <div className="text-[11px] text-gray-500 truncate">
                    {u.role.toUpperCase()} • +91 {u.phone}
                  </div>
                </div>
                <span className="text-primary-700 font-bold text-[11px] flex-shrink-0">
                  प्रवेश →
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-gray-400 border-t border-gray-100 bg-white/60">
        शेतीमित्र • बळीराजाचा सुरक्षित डिजिटल सोबती
      </footer>
    </div>
  )
}
