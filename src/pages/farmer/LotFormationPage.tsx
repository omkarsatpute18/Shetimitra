import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers,
  Users,
  Target,
  Building2,
  CheckCircle2,
  Truck,
  Sparkles,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { useNotifications } from '@/context/NotificationContext'
import { lots } from '@/data/lots'
import { buyers } from '@/data/buyers'
import { useRole } from '@/context/RoleContext'

interface FarmerPoolCandidate {
  id: string
  name: string
  village: string
  distance: string
  availableKg: number
  qualityGrade: 'A' | 'B'
  phone: string
  selected: boolean
}

export default function LotFormationPage() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { currentUser } = useRole()

  // Target demand: ABC Agro Foods (5,000 kg Onion at ₹3,150/q)
  const targetBuyer = buyers[0]
  const targetCrop = 'कांदा (नाशिक लाल)'
  const targetQuantity = 5000
  const targetPricePerQ = 3150

  const [poolCandidates, setPoolCandidates] = React.useState<FarmerPoolCandidate[]>([
    {
      id: 'F1',
      name: `${currentUser?.name ?? 'तुम्ही'} (आपला माल)`,
      village: currentUser?.village ?? 'हवेली, पुणे',
      distance: '० कि.मी. (आपले शेत)',
      availableKg: 1500,
      qualityGrade: 'A',
      phone: currentUser?.phone ?? '+91 98220 12345',
      selected: true,
    },
    {
      id: 'F3',
      name: 'विश्वनाथ जाधव (शेतकरी)',
      village: 'निफाड, नाशिक',
      distance: '८ कि.मी. अंतर',
      availableKg: 1200,
      qualityGrade: 'A',
      phone: '+91 98220 33333',
      selected: true,
    },
    {
      id: 'F4',
      name: 'बबनराव शिंदे (शेतकरी)',
      village: 'सिन्नर, नाशिक',
      distance: '१४ कि.मी. अंतर',
      availableKg: 1000,
      qualityGrade: 'A',
      phone: '+91 98220 44444',
      selected: true,
    },
    {
      id: 'F2',
      name: 'सुरेश पाटील (शेतकरी)',
      village: 'बारामती, पुणे',
      distance: '२२ कि.मी. अंतर',
      availableKg: 800,
      qualityGrade: 'A',
      phone: '+91 98220 22222',
      selected: false,
    },
    {
      id: 'F5',
      name: 'ज्ञानेश्वर मोरे (शेतकरी)',
      village: 'येवला, नाशिक',
      distance: '२८ कि.मी. अंतर',
      availableKg: 1100,
      qualityGrade: 'B',
      phone: '+91 98220 55555',
      selected: false,
    },
  ])

  const [createdLotId, setCreatedLotId] = React.useState<string | null>(null)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false)

  // Calculations
  const selectedCandidates = poolCandidates.filter((c) => c.selected)
  const currentAggregatedKg = selectedCandidates.reduce((sum, c) => sum + c.availableKg, 0)
  const progressPercent = Math.min(100, Math.round((currentAggregatedKg / targetQuantity) * 100))
  const isTargetMet = currentAggregatedKg >= targetQuantity
  const remainingNeeded = Math.max(0, targetQuantity - currentAggregatedKg)
  const totalGrossValue = Math.round((currentAggregatedKg * targetPricePerQ) / 100)

  // Freight savings estimation: 1 full 5 MT truck vs multiple individual pickups saves ~35%
  const logisticsSavingPerFarmer = 450

  const toggleCandidate = (id: string) => {
    // Keep 'You' always selected
    if (id === 'F1') return
    setPoolCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    )
  }

  const handleCreateLot = () => {
    const newLotId = 'LOT-2026-ONION-99'
    setCreatedLotId(newLotId)
    setIsSuccessModalOpen(true)

    addNotification({
      userId: currentUser?.id ?? 'F1',
      userType: 'farmer',
      type: 'lot_invite',
      title: 'एकत्रित शेतकरी लॉट तयार झाला!',
      message: `लॉट क्रमांक #${newLotId} एकूण ${selectedCandidates.length} शेतकऱ्यांसोबत (${currentAggregatedKg.toLocaleString('en-IN')} किलो कांदा) तयार केला आणि ${targetBuyer.companyName} कडे पाठवला आहे.`,
      isRead: false,
      priority: 'high',
    })
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              शेजाऱ्यांसोबत एकत्र विक्री (Group Selling / Collective Lot)
            </h1>
            <Badge variant="success" size="sm">मोठा खरेदीदार • जास्त भाव</Badge>
            <VoiceButton
              text="तुमच्याकडे १५०० किलो कांदा आहे, पण मोठ्या खरेदीदाराला ५००० किलो माल हवा आहे. तुमच्या भागातील इतर शेतकरी बांधवांसोबत माल एकत्र करा, ५००० किलोचा लॉट पूर्ण करा आणि मोठा घाऊक भाव मिळवा."
              label="माहिती ऐका 🔊"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            एकट्याकडे कमी माल असेल तरी काळजी नको — शेजारी शेतकऱ्यांसोबत माल एकत्र करा, थेट मोठ्या कंपनीला विका आणि वाहतूक खर्च ३८% वाचवा.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/farmer/transport')}
            leftIcon={<Truck className="h-4 w-4" />}
            className="font-bold text-xs border-gray-300"
          >
            एकत्र गाडी (Transport)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/farmer/fpo')}
            leftIcon={<Users className="h-4 w-4" />}
            className="font-bold text-xs border-gray-300"
          >
            शेतकरी गट (FPO)
          </Button>
        </div>
      </div>

      {/* Hero Visual Aggregator Card */}
      <Card className="border-2 border-primary-200 bg-gradient-to-b from-primary-50/40 via-white to-white shadow-sm overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Target Buyer Demand Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-primary-100 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-3 rounded-xl bg-primary-100 text-primary-800">
                <Target className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-primary-700 uppercase tracking-wide">
                  मोठ्या खरेदीदार कंपनीची थेट मागणी
                </span>
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  {targetBuyer.companyName}
                </h3>
                <p className="text-xs text-gray-600">
                  हवे असलेले पीक: <strong>{targetCrop}</strong> • थेट मिळणारा भाव: <strong className="text-primary-800 font-extrabold">₹{targetPricePerQ}/क्विंटल</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-xs text-gray-500 font-semibold">कंपनीला लागणारा माल</div>
                <div className="text-xl font-black text-gray-900">{targetQuantity.toLocaleString('en-IN')} किलो</div>
                <div className="text-[11px] text-gray-500">५० क्विंटल (५ टन)</div>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <div className="text-xs text-gray-500 font-semibold">एकूण व्यवहार मूल्य</div>
                <div className="text-xl font-black text-emerald-700">₹{totalGrossValue.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> बँक हमी सुरक्षित
                </div>
              </div>
            </div>
          </div>

          {/* Visual Aggregation Meter */}
          <div className="space-y-2 p-5 bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-gray-800 flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-primary-600" />
                एकत्र झालेला माल:
                <span className="text-primary-700 font-black text-base">
                  {currentAggregatedKg.toLocaleString('en-IN')} / {targetQuantity.toLocaleString('en-IN')} किलो
                </span>
              </span>
              <span className={`font-bold ${isTargetMet ? 'text-emerald-700 flex items-center gap-1' : 'text-amber-600'}`}>
                {isTargetMet ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> लॉट १००% पूर्ण! गाडी भरण्यासाठी सज्ज
                  </>
                ) : (
                  `लॉट पूर्ण करण्यासाठी अजून ${remainingNeeded.toLocaleString('en-IN')} किलो माल हवा आहे`
                )}
              </span>
            </div>

            <Progress
              value={progressPercent}
              className={`h-4 ${isTargetMet ? 'bg-emerald-100' : 'bg-gray-100'}`}
            />

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <span>एकूण {selectedCandidates.length} शेतकरी बांधव सहभागी झाले आहेत</span>
              <span>अंदाजे एकूण वाहतूक बचत: ~₹{(selectedCandidates.length * logisticsSavingPerFarmer).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Aggregation Selector: Nearby Farmers */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-gray-900">
                माल एकत्र करण्यासाठी परिसरातील शेतकरी निवडा ({poolCandidates.length} शेतकरी उपलब्ध)
              </h4>
              <span className="text-xs text-gray-500 font-medium">शेतकऱ्याच्या नावावर क्लिक करून लॉटमध्ये जोडा</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {poolCandidates.map((candidate) => {
                const isYou = candidate.id === 'F1'
                return (
                  <div
                    key={candidate.id}
                    onClick={() => toggleCandidate(candidate.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer select-none ${
                      candidate.selected
                        ? 'bg-crop-50/50 border-crop-300 shadow-xs'
                        : 'bg-white border-gray-200 hover:border-gray-300 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={candidate.selected}
                          onChange={() => {}} // Handled by div click
                          disabled={isYou}
                          className="h-4 w-4 rounded text-crop-600 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                            {candidate.name}
                            {isYou && <Badge variant="primary" size="sm">आपण स्वतः</Badge>}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                            <MapPin className="h-3 w-3 text-gray-400" />
                            <span>{candidate.village} ({candidate.distance})</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" size="sm" className="font-bold">
                        प्रत {candidate.qualityGrade}
                      </Badge>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium">उपलब्ध माल:</span>
                      <span className="font-black text-gray-900 text-sm">
                        {candidate.availableKg.toLocaleString('en-IN')} किलो
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Action Row */}
          <div className="p-4 bg-gray-50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-gray-200">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
              <Sparkles className="h-4 w-4 text-crop-600 flex-shrink-0" />
              <span>
                एकत्रित लॉट केल्यामुळे सर्व शेतकऱ्यांना थेट कंपनीचा घाऊक दर (<strong>₹{targetPricePerQ}/क्विंटल</strong>) मिळेल (स्थानिक बाजारभावापेक्षा <strong>+₹३००/क्विं.</strong> जास्त).
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="md"
                disabled={!isTargetMet}
                onClick={handleCreateLot}
                className="bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm"
              >
                {isTargetMet ? 'एकत्र लॉट तयार करा आणि कंपनीला पाठवा' : `अजून ${remainingNeeded} किलो जोडून लॉट पूर्ण करा`}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Active Ongoing Lots in the Ecosystem */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-gray-900">परिसरातील इतर सक्रिय शेतकरी लॉट</h2>
            <p className="text-xs text-gray-500">स्थानिक एफपीओ आणि शेतकरी गटांनी सुरू केलेले चालू लॉट</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lots.map((lot) => {
            const pct = Math.round((lot.currentQuantity / lot.targetQuantity) * 100)
            return (
              <Card key={lot.id} className="border-gray-200 hover:shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-base">{lot.variety}</h3>
                        <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          #{lot.id}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">अपेक्षित भाव: ₹{lot.reservePrice * 100}/क्विंटल</p>
                    </div>
                    <Badge variant={lot.status === 'filled' ? 'success' : 'default'} size="sm" className="font-bold">
                      {lot.status === 'filled' ? 'पूर्ण झाला' : 'चालू आहे'}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">प्रगती:</span>
                      <span className="font-bold text-gray-900">
                        {lot.currentQuantity.toLocaleString('en-IN')} / {lot.targetQuantity.toLocaleString('en-IN')} {lot.unit} ({pct}%)
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="h-3.5 w-3.5 text-primary-600" /> {lot.farmerIds.length} शेतकरी सहभागी
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold"
                      onClick={() => navigate('/farmer/transport')}
                    >
                      गाडी व्यवस्था करा
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Success Modal in Marathi */}
      {isSuccessModalOpen && (
        <Modal
          open={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="🎉 शेतकरी लॉट यशस्वीपणे तयार झाला!"
          description={`लॉट क्रमांक #${createdLotId} तयार झाला असून ${targetBuyer.companyName} कडे अंतिम मंजुरीसाठी पाठवला आहे.`}
          size="md"
        >
          <div className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                एकत्रित लॉट: ५,००० किलो कांदा (नाशिक लाल)
              </div>
              <p className="text-emerald-700 leading-relaxed text-xs">
                सर्व {selectedCandidates.length} सहभागी शेतकरी बांधवांना एसएमएस पाठवला गेला आहे. सामायिक गाडीद्वारे प्रत्येक शेतावरून माल उचलण्याचे वेळापत्रक तयार केले जाईल.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="text-gray-500 font-semibold">खरेदीदार कंपनी</span>
                <div className="font-bold text-gray-900">{targetBuyer.companyName}</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">एकूण व्यवहार मूल्य</span>
                <div className="font-black text-emerald-700 text-base">₹{totalGrossValue.toLocaleString('en-IN')}</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">माल संकलन केंद्र</span>
                <div className="font-medium text-gray-900">नाशिक ग्रामीण हब</div>
              </div>
              <div>
                <span className="text-gray-500 font-semibold">वाहतूक खर्च बचत</span>
                <div className="font-bold text-crop-700">~३८% बचत (स्वतंत्र गाडीपेक्षा)</div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsSuccessModalOpen(false)}>
                इथेच राहा
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setIsSuccessModalOpen(false)
                  navigate('/farmer/transport')
                }}
                leftIcon={<Truck className="h-4 w-4" />}
                className="font-bold"
              >
                या लॉटसाठी सामायिक गाडी बुक करा
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
