import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Phone,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useNotifications } from '@/context/NotificationContext'
import { warehouses } from '@/data/warehouses'
import { crops } from '@/data/crops'
import { useRole } from '@/context/RoleContext'
import type { Warehouse } from '@/types'

export default function StoragePage() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { currentUser } = useRole()

  // Storage Filter
  const [filterType, setFilterType] = React.useState<'ALL' | 'cold' | 'dry' | 'both'>('ALL')

  // Calculator State
  const [calcCropId, setCalcCropId] = React.useState('C1')
  const [calcQtyKg, setCalcQtyKg] = React.useState(2000)
  const [holdingDays, setHoldingDays] = React.useState(30)
  const [selectedWarehouseId, setSelectedWarehouseId] = React.useState('W1')
  const [reserveModalWarehouse, setReserveModalWarehouse] = React.useState<Warehouse | null>(null)
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false)

  const selectedWarehouse = warehouses.find((w) => w.id === selectedWarehouseId) ?? warehouses[0]

  // Pricing math
  const currentPricePerQ = 2850 // Current APMC Modal
  const projectedPricePerQ = Math.round(currentPricePerQ * (1 + (holdingDays / 30) * 0.14)) // +14% per month
  const qtyMT = calcQtyKg / 1000
  const qtyQuintals = calcQtyKg / 100

  // Sell Now:
  const sellNowGross = Math.round(currentPricePerQ * qtyQuintals)
  const sellNowFreight = Math.round(selectedWarehouse.distanceFromDemoFarmer * qtyQuintals * 0.85)
  const sellNowNet = sellNowGross - sellNowFreight

  // Store & Sell Later:
  const storeGross = Math.round(projectedPricePerQ * qtyQuintals)
  const storageFee = Math.round(selectedWarehouse.pricePerMTDay * qtyMT * holdingDays)
  const storeFreightRoundtrip = sellNowFreight * 2
  const shrinkageLoss = Math.round(storeGross * 0.03) // 3% shrinkage loss
  const storeNet = storeGross - storageFee - storeFreightRoundtrip - shrinkageLoss

  const netDifference = storeNet - sellNowNet
  const isStorageProfitable = netDifference > 0

  const filteredWarehouses = React.useMemo(() => {
    if (filterType === 'ALL') return warehouses
    return warehouses.filter((w) => w.type === filterType || w.type === 'both')
  }, [filterType])

  const handleConfirmReservation = () => {
    if (!reserveModalWarehouse) return
    setBookingConfirmed(true)
    addNotification({
      userId: currentUser?.id ?? 'F1',
      userType: 'farmer',
      type: 'storage_availability',
      title: 'गोदामात जागा आरक्षित झाली!',
      message: `${reserveModalWarehouse.name} येथे ${qtyMT} टन जागेचे आरक्षण झाले. ई-वेअरहाऊस पावती (e-NWR) द्वारे ७०% कर्ज सुविधा उपलब्ध.`,
      isRead: false,
      priority: 'high',
    })
    setTimeout(() => {
      setBookingConfirmed(false)
      setReserveModalWarehouse(null)
    }, 1500)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              गोदाम आणि शीतगृह साठवणूक (Storage Arbitrage)
            </h1>
            <Badge variant="earth" size="sm">नफा वाढवा</Badge>
            <VoiceButton
              text={`गोदाम आणि शीतगृह साठवणूक. माल आता विकायचा की साठवून ठेवायचा? आमचे गणित सांगते: ${isStorageProfitable ? 'साठवून ठेवल्यास खर्च वजा जाता अधिक नफा मिळेल.' : 'सध्या बाजारात आत्ताच विकल्यास जास्तीचा फायदा होईल.'}`}
              label="माहिती ऐका 🔊"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            माल आता विकायचा की शीतगृहात ठेवून नंतर चांगल्या भावात विकायचा? प्रत्यक्ष नफ्याची तुलना करा.
          </p>
        </div>
      </div>

      {/* Selling Decision: "Sell Now vs Store & Sell Later" Interactive Calculator */}
      <Card className="border-2 border-primary-300 bg-gradient-to-b from-primary-50/30 via-white to-white shadow-md overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-white/60 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-gray-900 font-extrabold">
                <Sparkles className="h-5 w-5 text-primary-600" />
                निर्णय कॅल्क्युलेटर: आत्ता विक्री विरुद्ध साठवून विक्री
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm text-gray-600">
                साठवणुकीचे भाडे आणि भविष्यातील भाव वाढ याचा अचूक ताळेबंद.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={isStorageProfitable ? 'success' : 'warning'} className="text-xs font-bold py-1 px-3">
                {isStorageProfitable ? '🌟 शिफारस: साठवून नंतर विका (जास्त नफा)' : '⚡ शिफारस: आत्ताच विका (उत्तम पर्याय)'}
              </Badge>
              <VoiceButton
                text={isStorageProfitable ? 'शेतीमित्र शिफारस: सध्या साठवून ठेवल्यास खर्च वजा जाता अधिक नफा मिळेल.' : 'शेतीमित्र शिफारस: सध्या आत्ताच विकल्यास अधिक नफा राहील.'}
                size="sm"
                label="शिफारस ऐका 🔊"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">पीक निवडा *</label>
              <Select
                value={calcCropId}
                onChange={(e) => setCalcCropId(e.target.value)}
                options={crops.map((c) => ({ value: c.id, label: `🌾 ${c.name}` }))}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">मालाचे वजन (किलोमध्ये) *</label>
              <Input
                type="number"
                min="500"
                step="500"
                value={calcQtyKg}
                onChange={(e) => setCalcQtyKg(Number(e.target.value))}
                className="font-bold text-gray-900"
              />
              <span className="text-[11px] text-gray-500 font-medium">={qtyMT} टन ({qtyQuintals} क्विंटल)</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">साठवणुकीचा कालावधी *</label>
              <Select
                value={String(holdingDays)}
                onChange={(e) => setHoldingDays(Number(e.target.value))}
                options={[
                  { value: '30', label: '३० दिवस (अल्प मुदत)' },
                  { value: '45', label: '४५ दिवस (मध्यम मुदत)' },
                  { value: '60', label: '६० दिवस (हंगामाबाहेर सर्वोच्च भाव)' },
                ]}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700">शीतगृह / गोदाम निवडा *</label>
              <Select
                value={selectedWarehouseId}
                onChange={(e) => setSelectedWarehouseId(e.target.value)}
                options={warehouses.map((w) => ({
                  value: w.id,
                  label: `${w.name} (₹${w.pricePerMTDay}/टन/दिवस)`,
                }))}
              />
            </div>
          </div>

          {/* Comparison Cards: Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OPTION A: SELL NOW */}
            <div className="p-5 rounded-2xl border border-gray-200 bg-white space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase">पर्याय १</span>
                  <h3 className="text-lg font-bold text-gray-900">आजच बाजारात (APMC) विक्री करा</h3>
                </div>
                <Badge variant="default" className="font-bold">लगेच रोख पैसे</Badge>
              </div>

              <div className="space-y-2 text-xs divide-y divide-gray-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">आजचा चालू बाजारभाव:</span>
                  <span className="font-bold text-gray-900">₹{currentPricePerQ}/क्विंटल</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">एकूण विक्री मूल्य ({qtyQuintals} क्विं.):</span>
                  <span className="font-bold text-gray-900">₹{sellNowGross.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>मंडीपर्यंत गाडी भाडे:</span>
                  <span className="font-bold">-₹{sellNowFreight.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-500">गोदाम / साठवणूक खर्च:</span>
                  <span className="font-bold text-emerald-700">₹० (काही नाही)</span>
                </div>
                <div className="flex justify-between py-2 pt-3 border-t-2 border-gray-200 text-sm font-extrabold">
                  <span className="text-gray-900">हातात उरणारा निव्वळ नफा:</span>
                  <span className="text-gray-900 font-black text-base">₹{sellNowNet.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 space-y-1">
                <div className="font-bold text-gray-800">फायदे व तोटे:</div>
                <p>• कोणतीही जोखीम नाही, २ दिवसांत खात्यात थेट पैसे.</p>
                <p>• भविष्यात भाव वाढल्यास होणारा जास्तीचा नफा मिळणार नाही.</p>
              </div>

              <Button
                variant="outline"
                className="w-full text-xs font-bold"
                onClick={() => navigate('/farmer/marketplace')}
              >
                थेट खरेदीदार शोधा
              </Button>
            </div>

            {/* OPTION B: STORE & SELL LATER */}
            <div className="p-5 rounded-2xl border-2 border-crop-300 bg-crop-50/20 space-y-4 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-crop-800 uppercase">पर्याय २ (शिफारस केलेला)</span>
                  <h3 className="text-lg font-bold text-crop-900">शीतगृहात ठेवून {holdingDays} दिवसांनी विका</h3>
                </div>
                <Badge variant="success" className="font-bold">जास्त निव्वळ नफा</Badge>
              </div>

              <div className="space-y-2 text-xs divide-y divide-crop-100">
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600">अपेक्षित भावी बाजारभाव:</span>
                  <span className="font-bold text-crop-800">₹{projectedPricePerQ}/क्विंटल (+{Math.round(((projectedPricePerQ - currentPricePerQ) / currentPricePerQ) * 100)}%)</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-600">अपेक्षित एकूण विक्री:</span>
                  <span className="font-bold text-gray-900">₹{storeGross.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>साठवणूक भाडे ({qtyMT} टन × {holdingDays} दिवस × ₹{selectedWarehouse.pricePerMTDay}):</span>
                  <span className="font-bold">-₹{storageFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>येण्या-जाण्याचा वाहतूक खर्च:</span>
                  <span className="font-bold">-₹{storeFreightRoundtrip.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1.5 text-red-600">
                  <span>वजन घट / हाताळणी नुकसान (~३%):</span>
                  <span className="font-bold">-₹{shrinkageLoss.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2 pt-3 border-t-2 border-crop-300 text-sm font-extrabold">
                  <span className="text-crop-900">सर्व खर्च वजा जाता प्रत्यक्ष नफा:</span>
                  <span className="text-crop-800 text-base font-black">₹{storeNet.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Profit Gain Callout */}
              <div className="p-3 bg-white rounded-xl border border-crop-200 text-xs space-y-1">
                <div className="flex items-center justify-between text-crop-800 font-bold text-sm">
                  <span>साठवून विकल्यास अतिरिक्त फायदा:</span>
                  <span className="text-base text-crop-700 font-black">
                    +{netDifference >= 0 ? `₹${netDifference.toLocaleString('en-IN')}` : `-₹${Math.abs(netDifference).toLocaleString('en-IN')}`}
                  </span>
                </div>
                <p className="text-[11px] text-gray-600 font-medium">
                  प्रमाणित शीतगृहाचा वापर केल्यास तुम्हाला अंदाजे <strong>+{Math.round((netDifference / sellNowNet) * 100)}%</strong> अधिक नफा होतो.
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full text-xs bg-crop-600 hover:bg-crop-700 text-white font-bold"
                onClick={() => setReserveModalWarehouse(selectedWarehouse)}
              >
                {selectedWarehouse.name} येथे जागा आरक्षित करा
              </Button>
            </div>
          </div>

          {/* e-NWR Pledge Financing Info Box */}
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-start gap-3 text-xs sm:text-sm text-indigo-950">
            <FileCheck className="h-6 w-6 text-indigo-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold text-sm sm:text-base text-indigo-950">
                💰 भाव वाढण्याची वाट पाहत असताना तातडीने पैशांची गरज आहे का?
              </span>
              <p className="leading-relaxed text-indigo-900">
                अधिकृत गोदामात माल ठेवल्यावर मिळणाऱ्या <strong>ई-वेअरहाऊस पावती (e-NWR)</strong> च्या आधारे तुम्हाला सरकारी अनुदानावर <strong>मालाच्या ७०% मूल्यापर्यंत तात्काळ बँक कर्ज</strong> मिळते. त्यामुळे पैशांची अडचण दूर होते आणि भाव वाढल्यानंतरच माल विकता येतो.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">तुमच्या परिसरातील प्रमाणित गोदामे व शीतगृहे</h2>
            <p className="text-xs text-gray-500">
              शासकीय व खाजगी प्रमाणित शीतगृहे, सुरक्षित हवामान नियंत्रण आणि सुरक्षा व्यवस्था.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {(['ALL', 'cold', 'dry', 'both'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filterType === t
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t === 'ALL' ? 'सर्व प्रकार' : t === 'cold' ? 'शीतगृह (Cold)' : t === 'dry' ? 'कोरडे गोदाम (Dry)' : 'दोन्ही उपलब्ध'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredWarehouses.map((wh) => {
            const availPct = Math.round((wh.availableCapacityMT / wh.totalCapacityMT) * 100)
            return (
              <Card key={wh.id} className="border-gray-200 hover:shadow-md transition flex flex-col justify-between">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-base">{wh.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span>{wh.address}</span>
                      </div>
                    </div>
                    <Badge variant={wh.type === 'cold' ? 'info' : wh.type === 'both' ? 'success' : 'earth'} size="sm" className="font-bold">
                      {wh.type === 'cold' ? 'शीतगृह' : wh.type === 'both' ? 'शीतगृह + गोदाम' : 'कोरडे गोदाम'}
                    </Badge>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">उपलब्ध जागा:</span>
                      <span className="font-bold text-gray-900">
                        {wh.availableCapacityMT.toLocaleString()} / {wh.totalCapacityMT.toLocaleString()} टन ({availPct}%)
                      </span>
                    </div>
                    <Progress value={availPct} className="h-2" />
                  </div>

                  {/* Rates and Distance */}
                  <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl text-xs border border-gray-100">
                    <div>
                      <span className="text-gray-500 font-medium">प्रतिदिन भाडे:</span>
                      <div className="font-bold text-primary-700 text-sm">₹{wh.pricePerMTDay}/टन/दिवस</div>
                    </div>
                    <div>
                      <span className="text-gray-500 font-medium">शेतापासून अंतर:</span>
                      <div className="font-bold text-gray-900 text-sm">{wh.distanceFromDemoFarmer} कि.मी.</div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-gray-500">सुविधा:</span>
                    <div className="flex flex-wrap gap-1">
                      {wh.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md font-medium">
                          {f}
                        </span>
                      ))}
                      {wh.facilities.length > 3 && (
                        <span className="text-[10px] text-gray-400 px-1 py-0.5">
                          +{wh.facilities.length - 3} आणखी
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${wh.contactPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                      title="थेट फोन लावा"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      कॉल करा
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs font-bold"
                      onClick={() => setReserveModalWarehouse(wh)}
                    >
                      जागा आरक्षित करा
                    </Button>
                    <VoiceButton
                      text={`${wh.name}, ${wh.district}, ${wh.state}. उपलब्ध जागा: ${wh.availableCapacityMT} टन. साठवणूक दर: ₹${wh.pricePerMTDay} प्रति टन प्रतिदिन. संपर्क फोन: ${wh.contactPhone}.`}
                      size="sm"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Reservation Modal in Marathi */}
      {reserveModalWarehouse && (
        <Modal
          open={!!reserveModalWarehouse}
          onClose={() => setReserveModalWarehouse(null)}
          title={`📦 ${reserveModalWarehouse.name} मध्ये जागा आरक्षित करा`}
          description="तुमच्या शेतमालासाठी शीतगृह/गोदाम जागा निश्चित करा आणि तात्काळ ई-वेअरहाऊस पावती मिळवा."
          size="md"
        >
          {bookingConfirmed ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">गोदामात जागा यशस्वीपणे आरक्षित झाली!</h3>
              <p className="text-xs text-gray-500">
                बुकिंग संदर्भ क्रमांक #WH-RES-8891 तयार झाला आहे. वाहतूकदार जोडण्याची सूचना पाठवली आहे.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-2 text-xs sm:text-sm">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1 border border-gray-200">
                <div className="font-bold text-gray-900">{reserveModalWarehouse.name}</div>
                <div className="text-gray-500 text-xs">{reserveModalWarehouse.address}</div>
                <div className="text-primary-700 font-bold">भाडे दर: ₹{reserveModalWarehouse.pricePerMTDay}/टन/दिवस</div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-crop-50 rounded-xl border border-crop-200">
                <div>
                  <span className="text-gray-500 font-medium">मालाचे एकूण प्रमाण</span>
                  <div className="font-extrabold text-gray-900">{qtyMT} टन ({calcQtyKg} किलो)</div>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">साठवणूक कालावधी</span>
                  <div className="font-extrabold text-gray-900">{holdingDays} दिवस</div>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">अंदाजे एकूण साठवणूक शुल्क</span>
                  <div className="font-black text-crop-800 text-base">
                    ₹{Math.round(reserveModalWarehouse.pricePerMTDay * qtyMT * holdingDays).toLocaleString('en-IN')}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">ई-पावतीवर (e-NWR) बँक कर्ज</span>
                  <div className="font-bold text-emerald-700">उपलब्ध (७०% पर्यंत)</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <Button variant="ghost" onClick={() => setReserveModalWarehouse(null)}>
                  रद्द करा
                </Button>
                <Button variant="primary" onClick={handleConfirmReservation} className="font-bold">
                  जागा निश्चित करा
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
