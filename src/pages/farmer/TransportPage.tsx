import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Truck,
  Route,
  Plus,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { useNotifications } from '@/context/NotificationContext'
import { transportProviders } from '@/data/transportProviders'
import { crops } from '@/data/crops'
import { useRole } from '@/context/RoleContext'

export default function TransportPage() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { currentUser } = useRole()

  const [activeTab, setActiveTab] = React.useState<'farmer' | 'transporter'>('farmer')
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false)
  const [isBookModalOpen, setIsBookModalOpen] = React.useState(false)
  const [selectedProvider, setSelectedProvider] = React.useState(transportProviders[0])

  // Shared Truck Pooling Simulation State
  const truckCapacityKg = 5000
  const [pooledLoads] = React.useState([
    { id: '1', farmer: `${currentUser?.name ?? 'तुम्ही'} (आपला माल)`, qty: 1500, village: currentUser?.village ?? 'हवेली, पुणे', crop: 'कांदा', sharePct: 30 },
    { id: '2', farmer: 'विश्वनाथ जाधव (शेतकरी)', qty: 1200, village: 'निफाड, नाशिक', crop: 'कांदा', sharePct: 24 },
    { id: '3', farmer: 'बबनराव शिंदे (शेतकरी)', qty: 1000, village: 'सिन्नर, नाशिक', crop: 'कांदा', sharePct: 20 },
  ])

  const totalLoadedKg = pooledLoads.reduce((sum, l) => sum + l.qty, 0)
  const remainingCapacityKg = Math.max(0, truckCapacityKg - totalLoadedKg)
  const capacityPercent = Math.min(100, Math.round((totalLoadedKg / truckCapacityKg) * 100))

  // New Request Form State
  const [formCrop, setFormCrop] = React.useState('C1')
  const [formQty, setFormQty] = React.useState(1500)
  const [formPickup, setFormPickup] = React.useState(currentUser?.village ? `${currentUser.village} (शेताच्या बांधावर)` : 'हवेली शेतावर, पुणे')
  const [formDrop, setFormDrop] = React.useState('पुणे कृषी उत्पन्न बाजार समिती (APMC)')
  const [formDate, setFormDate] = React.useState('2026-09-26')

  const handlePostRequest = (e: React.FormEvent) => {
    e.preventDefault()
    setIsPostModalOpen(false)
    addNotification({
      userId: currentUser?.id ?? 'F1',
      userType: 'farmer',
      type: 'transport_match',
      title: 'गाडीची मागणी नोंदवली गेली',
      message: `${formQty} किलो मालासाठी ${formDrop} कडे जाणाऱ्या ५ जवळच्या गाडी मालकांना संदेश पाठवला आहे.`,
      isRead: false,
      priority: 'medium',
    })
  }

  const handleBookShared = () => {
    setIsBookModalOpen(false)
    addNotification({
      userId: currentUser?.id ?? 'F1',
      userType: 'farmer',
      type: 'transport_match',
      title: 'सामायिक गाडीत जागा आरक्षित झाली!',
      message: `${selectedProvider.companyName ?? selectedProvider.name} (टाटा ४०७) गाडीमध्ये जागा बुक झाली. उद्या सकाळी माल भरला जाईल.`,
      isRead: false,
      priority: 'high',
    })
    navigate('/farmer/orders/O1')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              एकत्र गाडी आणि सामायिक वाहतूक (Shared Transport)
            </h1>
            <Badge variant="success" size="sm">३८% भाडे बचत</Badge>
            <VoiceButton
              text="नाशिक ते पुणे मार्गावर टाटा ४०७ गाडी जात आहे. गाडीत अजून १ हजार ३०० किलो जागा शिल्लक आहे. तुम्ही इतर शेतकऱ्यांसोबत मिळून माल पाठवून ३८ टक्के भाडे वाचवू शकता."
              label="माहिती ऐका 🔊"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            रस्त्यावरून जाणाऱ्या रिकाम्या गाडीमध्ये जागा मिळवा, शेजाऱ्यांसोबत भाडे वाटून घ्या आणि ३८% पर्यंत वाहतूक खर्च वाचवा.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => setIsPostModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
            className="font-extrabold text-xs"
          >
            + नवीन गाडीची गरज टाका
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-xl bg-gray-100 p-1 max-w-md">
        <button
          onClick={() => setActiveTab('farmer')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'farmer' ? 'bg-white text-primary-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🚛 चालू मार्ग व सामायिक गाडी (Live Pool)
        </button>
        <button
          onClick={() => setActiveTab('transporter')}
          className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${
            activeTab === 'transporter' ? 'bg-white text-primary-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📋 स्थानिक गाडी मालकांची यादी (Fleet)
        </button>
      </div>

      {activeTab === 'farmer' ? (
        <div className="space-y-6">
          {/* Truck Capacity Visualizer Card */}
          <Card className="border-2 border-sky-200 bg-gradient-to-b from-sky-50/40 via-white to-white shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              {/* Header inside card */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-sky-100 text-sky-800">
                    <Truck className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-sky-700 uppercase tracking-wide">
                      सामायिक चालू गाडी क्रमांक #MH12-TRIP-99
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      नाशिक ग्रामीण पट्टा → पुणे गुलटेकडी मार्केट यार्ड
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      वाहतूकदार: <strong>पुणे गुड्स कॅरियर (महेश तेली)</strong> • वाहन: <strong>टाटा ४०७ (५ टन क्षमता)</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">गाडीतील भरलेला माल</div>
                    <div className="text-xl font-black text-sky-900">
                      {totalLoadedKg.toLocaleString('en-IN')} / {truckCapacityKg.toLocaleString('en-IN')} किलो
                    </div>
                    <div className="text-[11px] text-emerald-700 font-bold">{capacityPercent}% गाडी भरली आहे</div>
                  </div>
                  <div className="h-10 w-px bg-gray-200" />
                  <div>
                    <div className="text-xs text-gray-500 font-semibold">शेतकऱ्यांची सरासरी बचत</div>
                    <div className="text-xl font-black text-emerald-700">३८% सूट</div>
                    <div className="text-[11px] text-gray-500 font-medium">स्वतः स्वतंत्र गाडी करण्यापेक्षा</div>
                  </div>
                </div>
              </div>

              {/* Visual Truck Bed Fill Bar */}
              <div className="p-5 bg-white rounded-xl border border-gray-200 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-800">गाडीतील जागेचे वाटप:</span>
                  <span className="text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    {remainingCapacityKg.toLocaleString('en-IN')} किलो जागा अजून शिल्लक आहे
                  </span>
                </div>

                {/* Segmented Progress Bar */}
                <div className="h-7 w-full bg-gray-100 rounded-lg overflow-hidden flex shadow-inner border border-gray-200">
                  <div
                    style={{ width: '30%' }}
                    className="bg-primary-600 h-full flex items-center justify-center text-[11px] text-white font-bold"
                    title="आपला माल: १५०० किलो"
                  >
                    आपला माल (१.५ टन)
                  </div>
                  <div
                    style={{ width: '24%' }}
                    className="bg-emerald-600 h-full flex items-center justify-center text-[11px] text-white font-bold"
                    title="विश्वनाथ जाधव: १२wt किलो"
                  >
                    वि. जाधव (१.२ टन)
                  </div>
                  <div
                    style={{ width: '20%' }}
                    className="bg-amber-500 h-full flex items-center justify-center text-[11px] text-white font-bold"
                    title="बबनराव शिंदे: १००० किलो"
                  >
                    ब. शिंदे (१ टन)
                  </div>
                  <div
                    style={{ width: '26%' }}
                    className="bg-gray-200 h-full flex items-center justify-center text-[11px] text-gray-700 font-bold"
                  >
                    रिकामी जागा (१.३ टन)
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                  <div className="flex items-center gap-1.5 font-medium text-gray-800">
                    <span className="h-3 w-3 rounded-full bg-primary-600" />
                    <span>आपला माल (१,५०० किलो)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-gray-800">
                    <span className="h-3 w-3 rounded-full bg-emerald-600" />
                    <span>शेतकरी २: निफाड (१,२०० किलो)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-gray-800">
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>शेतकरी ३: सिन्नर (१,००० किलो)</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium text-gray-600">
                    <span className="h-3 w-3 rounded-full bg-gray-300" />
                    <span>उपलब्ध शिल्लक जागा (१,३०० किलो)</span>
                  </div>
                </div>
              </div>

              {/* Waypoint Multi-stop Itinerary */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Route className="h-4 w-4 text-primary-600" />
                  गाडीचा नियोजित मार्ग आणि माल उचलण्याचे ठिकाण (Pickup Route)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-500 font-semibold">
                      <span>थांबा १ • स. ०७:००</span>
                      <Badge variant="primary" size="sm">माल उचलणे</Badge>
                    </div>
                    <div className="font-bold text-gray-900">हवेली, पुणे</div>
                    <p className="text-[11px] text-gray-600">१,५०० किलो कांदा (आपल्या बांधावरून)</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-500 font-semibold">
                      <span>थांबा २ • स. ०८:३०</span>
                      <Badge variant="success" size="sm">माल उचलणे</Badge>
                    </div>
                    <div className="font-bold text-gray-900">निफाड, नाशिक</div>
                    <p className="text-[11px] text-gray-600">१,२०० किलो कांदा (वि. जाधव)</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-gray-500 font-semibold">
                      <span>थांबा ३ • स. ०९:४५</span>
                      <Badge variant="warning" size="sm">माल उचलणे</Badge>
                    </div>
                    <div className="font-bold text-gray-900">सिन्नर, नाशिक</div>
                    <p className="text-[11px] text-gray-600">१,००० किलो कांदा (ब. शिंदे)</p>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-emerald-800 font-bold">
                      <span>थांबा ४ • दु. ०१:३०</span>
                      <Badge variant="success" size="sm">अंतिम पोहोच</Badge>
                    </div>
                    <div className="font-bold text-emerald-950">पुणे कृषी उत्पन्न बाजार समिती</div>
                    <p className="text-[11px] text-emerald-700">एकूण खाली होणारा माल: ३,७०० किलो</p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200">
                <div className="text-xs sm:text-sm text-gray-700 font-medium">
                  एकूण अंतर: <strong>१६४ कि.मी.</strong> • तुमचा भाडे हिस्सा: <strong className="text-emerald-700 font-black text-base sm:text-lg">₹१,१८०</strong> (स्वतंत्र गाडी केली असती तर ₹२,८०० खर्च आला असता).
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="tel:+919822055555"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                  >
                    <Phone className="h-4 w-4" />
                    <span>📞 ड्रायव्हरशी बोला</span>
                  </a>
                  <Button
                    variant="primary"
                    onClick={() => setIsBookModalOpen(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs"
                  >
                    गाडीत जागा बुक करा
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        /* Transporter Directory Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {transportProviders.map((tp) => (
            <Card key={tp.id} className="border-gray-200 hover:shadow-md transition">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{tp.companyName ?? tp.name}</h3>
                    <p className="text-xs text-gray-500">चालक: {tp.name} • {tp.phone}</p>
                  </div>
                  <Badge variant="success" size="sm" className="font-bold">
                    ★ {tp.rating}
                  </Badge>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl space-y-1.5 text-xs border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">वाहनाचा प्रकार:</span>
                    <span className="font-bold text-gray-900">{tp.vehicleType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">एकूण क्षमता:</span>
                    <span className="font-bold text-gray-900">{tp.vehicleCapacity} टन</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">भाडे दर:</span>
                    <span className="font-bold text-emerald-700">₹{tp.pricePerKm}/कि.मी.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">सेवा कार्यक्षेत्र:</span>
                    <span className="text-gray-800 font-semibold">{tp.serviceRadius} कि.मी.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">पूर्ण केलेल्या फेऱ्या:</span>
                    <span className="text-emerald-700 font-bold">{tp.totalTrips} यशस्वी फेऱ्या</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs font-bold"
                    onClick={() => {
                      setSelectedProvider(tp)
                      setIsBookModalOpen(true)
                    }}
                  >
                    गाडी आरक्षित करा
                  </Button>
                  <a
                    href={`tel:${tp.phone}`}
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center text-xs font-bold transition"
                    title={`थेट फोन लावा: ${tp.phone}`}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Post Transport Modal in Marathi */}
      {isPostModalOpen && (
        <Modal
          open={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          title="📢 शेतातील माल वाहतुकीसाठी गाडी शोधा"
          description="तुमच्या मालाचे वजन आणि ठिकाण टाका. परिसरातील ५ अधिकृत वाहतूकदारांना लगेच संदेश जाईल."
          size="md"
        >
          <form onSubmit={handlePostRequest} className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">पीक निवडा *</label>
              <Select
                value={formCrop}
                onChange={(e) => setFormCrop(e.target.value)}
                options={crops.map((c) => ({ value: c.id, label: `🌾 ${c.name}` }))}
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">मालाचे एकूण वजन (किलो) *</label>
              <Input
                type="number"
                min="100"
                step="50"
                value={formQty}
                onChange={(e) => setFormQty(Number(e.target.value))}
                required
                className="font-bold text-gray-900"
              />
              <span className="text-[11px] text-gray-500 font-medium">
                = {formQty / 100} क्विंटल
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">माल भरण्याचे ठिकाण (शेताचा पत्ता / गाव) *</label>
              <Input
                value={formPickup}
                onChange={(e) => setFormPickup(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">माल पोहोचवण्याचे ठिकाण (मंडी किंवा कंपनी) *</label>
              <Input
                value={formDrop}
                onChange={(e) => setFormDrop(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">गाडी लागण्याची तारीख *</label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" type="button" onClick={() => setIsPostModalOpen(false)}>
                रद्द करा
              </Button>
              <Button variant="primary" type="submit" className="font-bold">
                गाडीची मागणी पाठवा
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Book Shared Transport Modal in Marathi */}
      {isBookModalOpen && (
        <Modal
          open={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
          title="✅ सामायिक गाडीत जागा आरक्षित करा"
          description="इतर शेतकरी मित्रांसोबत मिळून गाडीचे भाडे वाटून घ्या आणि खर्चात मोठी बचत करा."
          size="md"
        >
          <div className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 space-y-1">
              <div className="font-bold text-gray-900">{selectedProvider.companyName ?? selectedProvider.name}</div>
              <div className="text-gray-600 text-xs">मार्ग: नाशिक ग्रामीण परिसर → पुणे गुलटेकडी मार्केट</div>
              <div className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> जीपीएस ट्रॅकिंग आणि माल विमा समाविष्ट
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="text-gray-500 font-semibold">आपला माल</span>
                <div className="font-extrabold text-gray-900 text-sm">१,५०० किलो (१५ क्विंटल)</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">आपला अंदाजे भाडे हिस्सा</span>
                <div className="font-black text-emerald-700 text-base">₹१,१८०</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">गाडी निघण्याची वेळ</span>
                <div className="font-semibold text-gray-800">उद्या सकाळी ०७:०० वाजता</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">एकट्याने गाडी करण्यापेक्षा बचत</span>
                <div className="font-black text-emerald-700">₹१,६२० (५८% बचत)</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsBookModalOpen(false)}>
                रद्द करा
              </Button>
              <Button variant="primary" onClick={handleBookShared} className="font-bold">
                जागा निश्चित करा आणि गाडी जोडा
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
