import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Package,
  Building2,
  MapPin,
  ArrowLeft,
  PlayCircle,
  Phone,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useNotifications } from '@/context/NotificationContext'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { orders } from '@/data/orders'
import { buyers } from '@/data/buyers'
import { primaryDemoFarmer } from '@/data/farmers'
import { crops } from '@/data/crops'

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const initialOrder = orders.find((o) => o.id === id) ?? orders[0]
  const buyer = buyers.find((b) => b.id === initialOrder.buyerId) ?? buyers[0]
  const crop = crops.find((c) => c.id === initialOrder.cropId) ?? crops[0]

  const [currentStepIndex, setCurrentStepIndex] = React.useState<number>(2) // Default at in_transit
  const [timelineSteps, setTimelineSteps] = React.useState<Array<{ title: string; desc: string; date: string }>>([
    {
      title: 'Offer Received & Accepted',
      desc: 'Order contract approved by both parties. 100% funds locked in escrow.',
      date: '20 Sep 2026, 02:15 PM',
    },
    {
      title: 'Shared Transport Assigned',
      desc: 'Vehicle MH-12-AB-1111 (Pune Goods Carrier) scheduled for farm-gate pickup.',
      date: '22 Sep 2026, 08:00 AM',
    },
    {
      title: 'Produce Dispatched & In Transit',
      desc: '1,500 kg Onion loaded from Haveli farm gate. Real-time GPS active.',
      date: '23 Sep 2026, 07:30 AM',
    },
    {
      title: 'Quality Inspection & Delivery',
      desc: 'Grade A verification completed at buyer receiving dock.',
      date: 'Pending Delivery',
    },
    {
      title: 'Escrow Settlement Completed',
      desc: '₹44,250 automatically transferred to farmer bank account.',
      date: 'Pending Payment',
    },
  ])

  const handleAdvanceStatus = () => {
    if (currentStepIndex >= 4) return
    const nextIdx = currentStepIndex + 1
    setCurrentStepIndex(nextIdx)

    const updated = [...timelineSteps]
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (nextIdx === 3) {
      updated[3].date = `Today, ${now}`
      addNotification({
        userId: primaryDemoFarmer.id,
        userType: 'farmer',
        type: 'order_confirm',
        title: 'Produce Delivered & Inspected!',
        message: 'ABC Agro verified 1,500 kg Grade A Onion. Delivery acknowledged.',
        isRead: false,
        priority: 'high',
      })
    } else if (nextIdx === 4) {
      updated[4].date = `Today, ${now}`
      addNotification({
        userId: primaryDemoFarmer.id,
        userType: 'farmer',
        type: 'payment_received',
        title: 'Payment Credited: ₹44,250!',
        message: 'Escrow released funds directly to your bank account via UPI instant payout.',
        isRead: false,
        priority: 'high',
      })
    }
    setTimelineSteps(updated)
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/farmer/dashboard')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Order Header Card */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-primary-50/20 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-bold text-gray-900">ऑर्डर #{initialOrder.id}</h1>
              <Badge variant="info">काम चालू आहे (In Progress)</Badge>
              <Badge variant="success">१००% बँक हमी सुरक्षित</Badge>
              <VoiceButton
                text={`ऑर्डर क्रमांक ${initialOrder.id}. शेतकरी ${primaryDemoFarmer.name} आणि खरेदीदार ${buyer.companyName}. पंधराशे किलो कांदा, ठरलेला दर ₹२९.५० प्रति किलो, एकूण रक्कम ₹४४,२५० सुरक्षित बँक खात्यात जमा आहे.`}
                size="sm"
                label="ऑर्डर माहिती ऐका"
              />
            </div>
            <p className="text-xs text-gray-500">
              शेतकरी <strong>{primaryDemoFarmer.name}</strong> आणि खरेदीदार <strong>{buyer.companyName}</strong> मधील व्यवहार
            </p>
          </div>

          {/* Order Simulation / Step Progress Button */}
          <div className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
            <div className="text-xs text-emerald-900 font-semibold pr-2 border-r border-emerald-200 hidden sm:block">
              स्थिती बदला (Status):
            </div>
            <Button
              variant="primary"
              size="sm"
              disabled={currentStepIndex >= 4}
              onClick={handleAdvanceStatus}
              leftIcon={<PlayCircle className="h-4 w-4" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              {currentStepIndex === 2
                ? 'पायरी ४: माल पोहोचल्याची नोंद करा (Delivery)'
                : currentStepIndex === 3
                ? 'पायरी ५: सुरक्षित खात्यातून पैसे जमा करा (Release Funds)'
                : '✅ ऑर्डर पूर्ण झाली (Completed)'}
            </Button>
          </div>
        </div>

        {/* Order Details Grid */}
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Crop & Variety</span>
              <div className="font-bold text-gray-900 text-sm">{crop.name} ({initialOrder.variety})</div>
              <div className="text-[11px] text-gray-400">Quality: Grade A</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Contract Quantity</span>
              <div className="font-bold text-gray-900 text-sm">
                {initialOrder.quantity.toLocaleString()} {initialOrder.unit}
              </div>
              <div className="text-[11px] text-gray-400">15 Quintals</div>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl space-y-1">
              <span className="text-xs text-gray-500">Agreed Price</span>
              <div className="font-bold text-primary-700 text-sm">
                ₹{initialOrder.agreedPricePerUnit}/{initialOrder.unit}
              </div>
              <div className="text-[11px] text-emerald-600 font-medium">₹2,950/quintal</div>
            </div>

            <div className="p-3 bg-crop-50 rounded-xl border border-crop-200 space-y-1">
              <span className="text-xs text-crop-800 font-semibold">Total Escrow Value</span>
              <div className="font-extrabold text-crop-800 text-base">
                ₹{initialOrder.totalAmount.toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-crop-700">100% Escrow Deposited</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive 5-Step Order Timeline */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3 border-b border-gray-100">
          <CardTitle className="text-lg flex items-center gap-2">
            <Package className="h-5 w-5 text-primary-600" />
            End-to-End Direct Selling Workflow Timeline
          </CardTitle>
          <CardDescription>
            Live milestone tracking from farmer harvest listing to instant automated payment release.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
            {timelineSteps.map((step, idx) => {
              const isPast = idx < currentStepIndex
              const isCurrent = idx === currentStepIndex
              const isFuture = idx > currentStepIndex

              return (
                <div key={idx} className="relative flex items-start gap-4">
                  {/* Status Node Circle */}
                  <div
                    className={`absolute -left-6 h-6 w-6 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-primary-600 border-primary-600 text-white animate-pulse'
                        : 'bg-white border-gray-300 text-gray-400'
                    }`}
                  >
                    {isPast ? '✓' : idx + 1}
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className={`text-sm font-bold ${isFuture ? 'text-gray-400' : 'text-gray-900'}`}>
                        {step.title}
                      </h4>
                      <span className={`text-xs ${isPast ? 'text-emerald-700 font-semibold' : isCurrent ? 'text-primary-700 font-bold' : 'text-gray-400'}`}>
                        {step.date}
                      </span>
                    </div>
                    <p className={`text-xs ${isFuture ? 'text-gray-400' : 'text-gray-600'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pickup & Destination Routing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <MapPin className="h-4 w-4 text-primary-600" />
              Pickup Origin
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-gray-900">{primaryDemoFarmer.name} Farm Gate</div>
              <div className="text-gray-500">{initialOrder.pickupAddress}</div>
              <div className="text-gray-500">Contact: {primaryDemoFarmer.phone}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <Building2 className="h-4 w-4 text-emerald-600" />
              Delivery Destination
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-gray-900">{buyer.companyName}</div>
              <div className="text-gray-500">{initialOrder.dropAddress}</div>
              <div className="pt-1">
                <a
                  href={`tel:${buyer.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                >
                  <Phone className="h-3.5 w-3.5" /> थेट फोन लावा: {buyer.phone}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
