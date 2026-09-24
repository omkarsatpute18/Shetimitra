import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sprout,
  TrendingUp,
  ShoppingCart,
  Truck,
  CreditCard,
  Layers,
  Plus,
  MapPin,
  CloudSun,
  ShieldCheck,
  Building2,
  Sparkles,
  Bot,
  Warehouse,
  ArrowRight,
  Phone,
} from 'lucide-react'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { useNotifications } from '@/context/NotificationContext'
import { useAuth } from '@/context/RoleContext'
import { crops } from '@/data/crops'
import { markets } from '@/data/markets'
import { buyers } from '@/data/buyers'
import { primaryDemoFarmer } from '@/data/farmers'
import {
  getProduceListings,
  listProduce,
  getCurrentWeather,
} from '@/services/farmerService'
import type { ProduceListing } from '@/types'

export default function FarmerDashboard() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { currentUser } = useAuth()

  const [weather, setWeather] = React.useState({
    temp: 26,
    humidity: 58,
    condition: 'अंशतः ढगाळ',
    rainfall: 0,
    windKmH: 11,
  })
  const [listings, setListings] = React.useState<ProduceListing[]>([])
  const [isListModalOpen, setIsListModalOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  // Listing Form State
  const [formCropId, setFormCropId] = React.useState('C1')
  const [formVariety, setFormVariety] = React.useState('नाशिक लाल')
  const [formQuantity, setFormQuantity] = React.useState(2500)
  const [formUnit, setFormUnit] = React.useState('kg')
  const [formExpectedPrice, setFormExpectedPrice] = React.useState(30)
  const [formGrade, setFormGrade] = React.useState<'A' | 'B' | 'C'>('A')
  const [formHarvestDate, setFormHarvestDate] = React.useState('2026-09-22')
  const [formDescription, setFormDescription] = React.useState('')

  React.useEffect(() => {
    void getCurrentWeather(primaryDemoFarmer.lat, primaryDemoFarmer.lng).then(setWeather)
    void getProduceListings(currentUser?.id ?? primaryDemoFarmer.id).then(setListings)
  }, [currentUser])

  const selectedCrop = crops.find((c) => c.id === formCropId) ?? crops[0]

  const handleCropChange = (cropId: string) => {
    setFormCropId(cropId)
    const found = crops.find((c) => c.id === cropId)
    if (found && found.varieties.length > 0) {
      setFormVariety(found.varieties[0])
    }
  }

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const newListing = await listProduce(currentUser?.id ?? primaryDemoFarmer.id, {
        cropId: formCropId,
        variety: formVariety,
        quantity: Number(formQuantity),
        unit: formUnit,
        pricePerUnit: Number(formExpectedPrice),
        harvestDate: formHarvestDate,
        qualityGrade: formGrade,
        description: formDescription || `${selectedCrop.name} (${formVariety}) काढणी तारीख ${formHarvestDate}`,
      })
      setListings((prev) => [newListing, ...prev])
      addNotification({
        userId: currentUser?.id ?? primaryDemoFarmer.id,
        userType: 'farmer',
        type: 'new_demand',
        title: 'नवीन माल विक्रीसाठी नोंदवला गेला',
        message: `${selectedCrop.name} (${formVariety}) चे ${formQuantity} ${formUnit} माल ₹${formExpectedPrice}/${formUnit} भावाने नोंदवला गेला आहे.`,
        isRead: false,
        priority: 'medium',
      })
      setIsListModalOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Top market for onion snapshot
  const onionMarketPune = markets[0] // Pune APMC
  const onionMarketNashik = markets[1] // Nashik APMC
  const onionMsp = crops.find((c) => c.id === 'C1')?.sampleMsp ?? 2800

  // Recommended buyer calculation (e.g. ABC Agro Foods)
  const recBuyer = buyers[0]
  const qtyKg = 2000
  const buyerPricePerQ = 3150
  const buyerGross = (buyerPricePerQ * qtyKg) / 100 // ₹63,000
  const buyerDistKm = 42
  const transportCost = Math.round(buyerDistKm * (qtyKg / 100) * 1.4) // ₹1,176
  const buyerNet = buyerGross - transportCost // ₹61,824

  // Sample Buyer Demands
  const featuredDemands = [
    {
      id: 'BD1',
      buyerName: 'अमित शहा',
      company: 'एबीसी ॲग्रो फूड्स प्रा. लि.',
      crop: 'कांदा (नाशिक लाल)',
      qty: '५,००० किलो',
      price: 3150,
      distance: '४२ कि.मी.',
      grade: 'प्रत अ (Grade A)',
      deadline: '०५ ऑक्टोबर २०२६',
      matchScore: 94,
      verified: true,
    },
    {
      id: 'BD2',
      buyerName: 'राजेश कुमार',
      company: 'परफेक्ट ग्रेन्स फूड्स',
      crop: 'गहू (लोकवन)',
      qty: '१०,००० किलो',
      price: 2500,
      distance: '६५ कि.मी.',
      grade: 'प्रत अ (Grade A)',
      deadline: '१० ऑक्टोबर २०२६',
      matchScore: 89,
      verified: true,
    },
    {
      id: 'BD3',
      buyerName: 'दत्तात्रय कोळी',
      company: 'नाशिक ओनियन ट्रेडर्स',
      crop: 'कांदा (लाल)',
      qty: '८,००० किलो',
      price: 2950,
      distance: '१८ कि.मी.',
      grade: 'प्रत ब (Grade B)',
      deadline: '३० सप्टेंबर २०२६',
      matchScore: 91,
      verified: true,
    },
  ]

  return (
    <div className="space-y-8">
      {/* 1. Welcome Banner & Farmer Profile Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-800 via-primary-700 to-crop-800 text-white p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 opacity-10 pointer-events-none">
          <Sprout className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-primary-100 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              🌾 बळीराजाचा डिजिटल सोबती • शेतकरी प्रोफाइल
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                राम राम, {currentUser.name}!
              </h1>
              <VoiceButton
                text={`राम राम ${currentUser.name}! आज तुमच्या भागात ३१ अंश तापमान आहे. कांद्याला लासलगाव बाजारात २,९८० रुपये भाव आहे आणि थेट खरेदीदार ३,१५० रुपये देत आहेत. गाडी भाडे वजा जाता तुम्हाला ६०,८४६ रुपये मिळतील.`}
                label="आजची बातमी ऐका 🔊"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 shadow-md"
              />
            </div>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-sm text-primary-100/90 font-medium">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary-200" />
                {currentUser.village || primaryDemoFarmer.village}, {currentUser.district || primaryDemoFarmer.district}
              </span>
              <span>•</span>
              <span>मुख्य पिके: {currentUser.crops?.join(', ') || 'कांदा, टोमॅटो, गहू'}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-300 font-bold">
                <ShieldCheck className="h-4 w-4" /> सरकार-मान्य शेतकरी
              </span>
            </div>
          </div>

          {/* Weather & Quick Action Card */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3.5 flex items-center gap-3 border border-white/15 text-xs text-white">
              <div className="p-2.5 rounded-lg bg-white/20">
                <CloudSun className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <div className="font-bold text-sm">{weather.temp}°C • {weather.condition}</div>
                <div className="text-primary-100/90">
                  हवामान: {weather.humidity}% दमट • वारा: {weather.windKmH} कि.मी./तास
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              className="bg-white text-primary-950 hover:bg-primary-50 shadow-md font-bold whitespace-nowrap"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setIsListModalOpen(true)}
            >
              + माल विक्री टाका
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Key Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">विक्रीसाठी माल</span>
            <Sprout className="h-4 w-4 text-crop-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">
            {listings.reduce((sum, l) => sum + l.quantity, 0).toLocaleString('en-IN')} <span className="text-xs font-normal text-gray-500">किलो</span>
          </div>
          <p className="text-[11px] text-gray-600 font-medium">🧅 नाशिक लाल कांदा</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">थेट खरेदीदार</span>
            <ShoppingCart className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">१४ खरेदीदार</div>
          <p className="text-[11px] text-emerald-700 font-bold">३ व्यापारी जवळ</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">आजचा मोठा भाव</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-700">₹३१.५ <span className="text-xs font-normal text-gray-500">/किलो</span></div>
          <p className="text-[11px] text-emerald-700 font-bold">₹३,१५०/क्विं. (+१२%)</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">सरकारी हमीभाव (MSP)</span>
            <ShieldCheck className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">₹२,८०० <span className="text-xs font-normal text-gray-500">/क्विं.</span></div>
          <p className="text-[11px] text-amber-700 font-medium">किमान सरकारी आधार</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">जमा होणारे पैसे</span>
            <CreditCard className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-primary-700">₹४४,२५०</div>
          <p className="text-[11px] text-sky-700 font-bold">✓ १००% सुरक्षित बँक खात्यात</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-bold text-gray-700">सामायिक गाड्या</span>
            <Truck className="h-4 w-4 text-earth-700" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-gray-900">४ गाड्या</div>
          <p className="text-[11px] text-emerald-700 font-bold">३८% भाडे बचत उपलब्ध</p>
        </div>
      </div>

      {/* 3. Section A: Price Snapshot & Section B: Selling Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Price Snapshot (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-lg font-bold text-gray-900">जवळच्या बाजार समित्यांचे आजचे भाव</h2>
              <p className="text-xs text-gray-500">तुमच्या शेताभोवतालच्या APMC बाजारांचे चालू दर</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/farmer/price-discovery')}
              rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              className="text-xs font-bold"
            >
              सर्व बाजारभाव
            </Button>
          </div>

          <Card className="border-primary-100 bg-gradient-to-b from-primary-50/20 to-white shadow-sm">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <CardTitle className="text-base font-bold">कांदा (नाशिक लाल)</CardTitle>
                </div>
                <Badge variant="success" className="font-bold">हंगाम: रब्बी</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-3.5">
              {/* Nearby Mandi */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="text-xs font-semibold text-gray-500">जवळचा मुख्य बाजार</div>
                  <div className="font-bold text-gray-900">{onionMarketPune.name}</div>
                  <div className="text-[11px] text-gray-500">{onionMarketPune.distanceFromDemoFarmer} कि.मी. अंतर</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-gray-900">
                    ₹{onionMarketPune.modalPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-gray-500"> /क्विंटल</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold">+४.२% वाढ आज</span>
                </div>
              </div>

              {/* Alternative Mandi */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <div className="text-xs font-semibold text-gray-500">पर्यायी बाजार समिती</div>
                  <div className="font-bold text-gray-900">{onionMarketNashik.name}</div>
                  <div className="text-[11px] text-gray-500">{onionMarketNashik.distanceFromDemoFarmer} कि.मी. अंतर</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-gray-900">
                    ₹{onionMarketNashik.modalPrice.toLocaleString('en-IN')}
                    <span className="text-xs font-normal text-gray-500"> /क्विंटल</span>
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">मोठी आवक (२८९ टन)</span>
                </div>
              </div>

              {/* Govt MSP Comparison */}
              <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-amber-900">शासकीय आधारभूत हमीभाव (MSP):</span>
                  <div className="text-amber-800 font-medium">सर्व बाजारांमध्ये हमीभावापेक्षा अधिक दर</div>
                </div>
                <div className="font-black text-amber-900 text-sm">₹{onionMsp}/क्विं.</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Selling Recommendation: "Where should I sell?" (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-crop-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  माझा माल कुठे विकू? (सर्वाधिक नफा शिफारस)
                </h2>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                खरेदीदाराचा दर – गाडी भाडे = तुमच्या हातात उरणारा प्रत्यक्ष नफा
              </p>
            </div>
            <VoiceButton
              text="तुमच्यासाठी सर्वात चांगला पर्याय: एबीसी ॲग्रो फूड्स. भाव ३१ रुपये ५० पैसे प्रति किलो. वाहतूक खर्च वजा जाता ६०,८४६ रुपये मिळतील. स्थानिक बाजारापेक्षा ५,०७४ रुपये जास्त नफा होईल."
              label="सल्ला ऐका 🔊"
            />
          </div>

          <Card className="border-2 border-crop-300 bg-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-crop-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-lg">
              ★ सर्वाधिक नफा देणारा पर्याय
            </div>

            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <div className="text-xs font-bold text-crop-700 uppercase tracking-wider">
                  शिफारस केलेली थेट विक्री (२,००० किलो कांदा)
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    {recBuyer.companyName}
                  </h3>
                  <Badge variant="success" className="font-bold">✓ अधिकृत खरेदीदार</Badge>
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  स्थान: {recBuyer.location} • तुमच्या शेतापासून {buyerDistKm} कि.मी. • व्यापारी रेटिंग: ★ ४.७/५
                </p>
              </div>

              {/* Transparent Calculation Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                <div>
                  <div className="text-[11px] text-gray-600 font-bold">खरेदीदाराचा दर</div>
                  <div className="text-base font-black text-gray-900">₹{buyerPricePerQ}/क्विं.</div>
                  <div className="text-[11px] text-emerald-700 font-bold">₹३१.५ / किलो</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-600 font-bold">एकूण रक्कम</div>
                  <div className="text-base font-black text-gray-900">₹{buyerGross.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-gray-500 font-medium">२० क्विंटल मालासाठी</div>
                </div>
                <div>
                  <div className="text-[11px] text-gray-600 font-bold">गाडी भाडे (सामायिक)</div>
                  <div className="text-base font-black text-red-600">-₹{transportCost.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-gray-500 font-medium">४२ कि.मी. एकत्र गाडी</div>
                </div>
                <div className="bg-crop-50 rounded-lg p-2 border border-crop-300">
                  <div className="text-[11px] text-crop-900 font-bold">हातात उरणारा नफा</div>
                  <div className="text-lg font-black text-crop-800">
                    ₹{buyerNet.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-crop-700 font-extrabold">+₹५,०७४ जादा नफा!</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="tel:+919822011111"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition"
                >
                  <Phone className="h-4 w-4" />
                  <span>📞 थेट फोन लावा</span>
                </a>
                <Button
                  variant="primary"
                  className="bg-crop-600 hover:bg-crop-700 text-white font-bold text-xs"
                  onClick={() => navigate(`/farmer/buyers/${recBuyer.id}`)}
                >
                  खरेदीदार माहिती पहा
                </Button>
                <Button
                  variant="outline"
                  className="text-xs font-bold border-gray-300"
                  onClick={() => navigate('/farmer/lot-formation')}
                >
                  शेजाऱ्यांसोबत एकत्र विक्री
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/farmer/price-discovery')}
                  className="text-gray-600 text-xs font-medium"
                >
                  ५ बाजारांचे भाव पहा
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Section C: Buyer Demand Near You */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-gray-900">तुमच्या परिसरातील पडताळणी झालेले थेट खरेदीदार</h2>
            <p className="text-xs text-gray-500">
              प्रक्रिया कंपन्या आणि मोठ्या व्यापाऱ्यांची थेट खरेदी मागणी
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/farmer/marketplace')}
            rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
            className="text-xs font-bold"
          >
            सर्व खरेदीदार पहा
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredDemands.map((demand) => (
            <Card key={demand.id} className="hover:shadow-md transition-shadow border-gray-200">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">{demand.company}</h3>
                    <p className="text-xs text-gray-500">{demand.distance} अंतर • संपर्क: {demand.buyerName}</p>
                  </div>
                  <Badge variant="success" size="sm" className="font-bold">
                    {demand.matchScore}% जुळणी
                  </Badge>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">हवे असलेले पीक:</span>
                    <span className="font-bold text-gray-900">{demand.crop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">लागणारे वजन:</span>
                    <span className="font-bold text-gray-900">{demand.qty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">दिलेला भाव:</span>
                    <span className="font-black text-primary-700">₹{demand.price}/क्विंटल</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">प्रतीची अट:</span>
                    <span className="font-bold text-gray-800">{demand.grade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">अंतिम मुदत:</span>
                    <span className="text-gray-700">{demand.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <a
                    href="tel:+919822011111"
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center transition"
                    title="खरेदीदाराला थेट फोन लावा"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs font-bold"
                    onClick={() => navigate(`/farmer/buyers/B1`)}
                  >
                    मागणी पहा (ऑफर पाठवा)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs font-bold"
                    onClick={() => navigate(`/farmer/lot-formation`)}
                  >
                    एकत्र विक्री
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Section D: My Listed Produce */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-gray-900">माझा विक्रीसाठी नोंदवलेला माल</h2>
            <p className="text-xs text-gray-500">खरेदीदारांच्या ऑफर्स आणि एकत्र विक्रीसाठी नोंदवलेला शेतमाल</p>
          </div>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setIsListModalOpen(true)}
            className="font-bold text-xs"
          >
            + नवीन माल नोंदवा
          </Button>
        </div>

        {listings.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <div className="max-w-sm mx-auto space-y-3">
              <Sprout className="h-10 w-10 text-gray-400 mx-auto" />
              <div className="font-bold text-gray-900">अद्याप कोणताही माल नोंदवलेला नाही</div>
              <p className="text-xs text-gray-500">
                थेट खरेदीदारांकडून ऑफर्स मिळवण्यासाठी तुमचा शेतमाल येथे नोंदवा.
              </p>
              <Button size="sm" onClick={() => setIsListModalOpen(true)} className="font-bold">
                पहिला शेतमाल नोंदवा
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((item) => {
              const crop = crops.find((c) => c.id === item.cropId)
              return (
                <Card key={item.id} className="border-gray-200 hover:shadow-sm">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-base">{crop?.name ?? item.cropId}</h3>
                          <Badge variant="outline" size="sm" className="font-bold">
                            प्रत {item.qualityGrade ?? 'A'}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500">जात: {item.variety}</p>
                      </div>
                      <Badge variant="success" size="sm" className="font-bold">सक्रिय</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl text-xs border border-gray-100">
                      <div>
                        <div className="text-gray-500 font-medium">वजन</div>
                        <div className="font-black text-gray-900 text-sm">
                          {item.quantity.toLocaleString('en-IN')} {item.unit}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 font-medium">अपेक्षित भाव</div>
                        <div className="font-black text-primary-700 text-sm">
                          ₹{item.pricePerUnit}/{item.unit}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 font-medium">काढणी तारीख</div>
                        <div className="text-gray-700">{item.harvestDate}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 font-medium">इच्छुक खरेदीदार</div>
                        <div className="font-bold text-emerald-700">४ खरेदीदार</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs font-bold"
                        onClick={() => navigate('/farmer/marketplace')}
                      >
                        खरेदीदार पहा
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="text-xs font-bold"
                        onClick={() => navigate('/farmer/lot-formation')}
                      >
                        लॉटमध्ये जोडा
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* 6. Quick Ecosystem Linkages Footer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/farmer/lot-formation')}
          className="p-4 rounded-xl bg-white border border-gray-200 hover:border-amber-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-105 transition-transform">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">एकत्र विक्री (Lot Pool)</div>
              <div className="text-xs text-gray-500">शेजारी शेतकऱ्यांसोबत एकत्र विक्री करा</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate('/farmer/transport')}
          className="p-4 rounded-xl bg-white border border-gray-200 hover:border-sky-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-50 text-sky-700 group-hover:scale-105 transition-transform">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">सामायिक वाहतूक (Transport)</div>
              <div className="text-xs text-gray-500">गाडी भाड्यात ४०% पर्यंत बचत</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate('/farmer/storage')}
          className="p-4 rounded-xl bg-white border border-gray-200 hover:border-indigo-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 group-hover:scale-105 transition-transform">
              <Warehouse className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">शीतगृह साठवणूक (Storage)</div>
              <div className="text-xs text-gray-500">आत्ता विक्री विरुद्ध साठवून विक्री तुलना</div>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate('/farmer/ai-assistant')}
          className="p-4 rounded-xl bg-white border border-gray-200 hover:border-purple-400 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-700 group-hover:scale-105 transition-transform">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-gray-900">शेतीमित्र सल्लागार (AI)</div>
              <div className="text-xs text-gray-500">कोणत्या बाजारात जास्त नफा मिळेल?</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: List Produce Form in Marathi */}
      <Modal
        open={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        title="🌾 आपला शेतमाल विक्रीसाठी नोंदवा"
        description="तुमच्या मालाची माहिती टाका जेणेकरून खरेदीदार, बाजार समित्या आणि शेतकरी कंपन्या थेट तुमच्याशी संपर्क साधू शकतील."
        size="lg"
      >
        <form onSubmit={handleCreateListing} className="space-y-4 pt-2 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">पीक निवडा *</label>
              <Select
                value={formCropId}
                onChange={(e) => handleCropChange(e.target.value)}
                options={crops.map((c) => ({ value: c.id, label: `🌾 ${c.name} (${c.category})` }))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">जात / व्हरायटी *</label>
              <Select
                value={formVariety}
                onChange={(e) => setFormVariety(e.target.value)}
                options={selectedCrop.varieties.map((v) => ({ value: v, label: v }))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">एकूण उपलब्ध वजन *</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  min="10"
                  step="10"
                  value={formQuantity}
                  onChange={(e) => setFormQuantity(Number(e.target.value))}
                  required
                  className="font-bold text-gray-900"
                />
                <Select
                  value={formUnit}
                  onChange={(e) => setFormUnit(e.target.value)}
                  className="w-28 font-bold"
                  options={[
                    { value: 'kg', label: 'किलो (kg)' },
                    { value: 'quintal', label: 'क्विंटल (q)' },
                    { value: 'MT', label: 'टन (MT)' },
                  ]}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">अपेक्षित भाव (₹ प्रति {formUnit === 'kg' ? 'किलो' : formUnit === 'quintal' ? 'क्विंटल' : 'टन'}) *</label>
              <Input
                type="number"
                min="1"
                step="0.5"
                value={formExpectedPrice}
                onChange={(e) => setFormExpectedPrice(Number(e.target.value))}
                required
                className="font-bold text-gray-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">मालाची प्रत / दर्जा (Grade) *</label>
              <Select
                value={formGrade}
                onChange={(e) => setFormGrade(e.target.value as 'A' | 'B' | 'C')}
                options={[
                  { value: 'A', label: 'प्रत अ (उत्कृष्ट / निर्यात दर्जा)' },
                  { value: 'B', label: 'प्रत ब (चांगला मध्यम दर्जा)' },
                  { value: 'C', label: 'प्रत क (सर्वसाधारण दर्जा)' },
                ]}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">काढणीची तारीख *</label>
              <Input
                type="date"
                value={formHarvestDate}
                onChange={(e) => setFormHarvestDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-gray-800">मालाचा तपशील / वैशिष्ट्ये</label>
            <Textarea
              rows={2}
              placeholder="उदा. चांगला वाळवलेला, स्वच्छ, ओलावा १२% पेक्षा कमी, जाळीदार गोणीत भरलेला."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <Button variant="ghost" type="button" onClick={() => setIsListModalOpen(false)}>
              रद्द करा
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting} className="font-bold">
              {isSubmitting ? 'नोंदणी होत आहे...' : 'माल विक्रीसाठी नोंदवा'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
