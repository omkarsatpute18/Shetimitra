import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Calendar,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { useNotifications } from '@/context/NotificationContext'
import { buyers } from '@/data/buyers'
import { primaryDemoFarmer } from '@/data/farmers'

export default function BuyerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const buyer = buyers.find((b) => b.id === id) ?? buyers[0]

  const [isOfferOpen, setIsOfferOpen] = React.useState(false)
  const [selectedCropRequirement, setSelectedCropRequirement] = React.useState('C1')
  const [offerQty, setOfferQty] = React.useState(1500)
  const [offerPrice, setOfferPrice] = React.useState(3150)
  const [offerNotes, setOfferNotes] = React.useState('')

  const avgRating = (
    (buyer.rating.payment + buyer.rating.communication + buyer.rating.priceFairness + buyer.rating.experience) /
    4
  ).toFixed(1)

  // Demo active demands for this specific buyer
  const activeDemands = [
    {
      id: 'REQ-1',
      cropId: 'C1',
      cropName: 'Onion (Nasik Red)',
      requiredQtyKg: 5000,
      offeredPricePerQ: 3150,
      qualityGrade: 'Grade A',
      specs: 'Well cured, pink to red skin, dry neck, 45mm+ size.',
      deadline: '05 Oct 2026',
      deliveryLocation: 'Pune Cold Chain Hub',
    },
    {
      id: 'REQ-2',
      cropId: 'C2',
      cropName: 'Tomato (Arka Vikas)',
      requiredQtyKg: 3000,
      offeredPricePerQ: 2250,
      qualityGrade: 'Grade A',
      specs: 'Firm, uniform red-ripe, free from crack and blemish.',
      deadline: '28 Sep 2026',
      deliveryLocation: 'Pune Processing Unit',
    },
  ]

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault()
    addNotification({
      userId: primaryDemoFarmer.id,
      userType: 'farmer',
      type: 'order_confirm',
      title: 'Offer Dispatched to Buyer',
      message: `Direct contract offer of ${offerQty} kg at ₹${offerPrice}/q submitted to ${buyer.companyName}.`,
      isRead: false,
      priority: 'high',
    })
    setIsOfferOpen(false)
    navigate('/farmer/orders/O1')
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/farmer/marketplace')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Buyer Marketplace
        </Button>
      </div>

      {/* Buyer Profile Header */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-gray-50 via-white to-primary-50/20 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 rounded-2xl bg-primary-100 border border-primary-200 text-primary-800 font-bold flex items-center justify-center text-2xl flex-shrink-0">
              {buyer.companyName.slice(0, 2).toUpperCase()}
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-bold text-gray-900">{buyer.companyName}</h1>
                {buyer.verificationStatus === 'platform' ? (
                  <Badge variant="success" className="gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Platform Verified Buyer
                  </Badge>
                ) : (
                  <Badge variant="default">Demo Verified</Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-gray-400" />
                  {buyer.location}
                </span>
                <span>•</span>
                <span>Contact Person: <strong className="text-gray-700">{buyer.contactName}</strong></span>
                <span>•</span>
                <span>GSTIN: <strong className="font-mono text-gray-700">{buyer.gstin ?? '27ABCDE1234F1Z5'}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <VoiceButton
              text={`${buyer.companyName} ही खरेदीदार कंपनी आहे. कांद्याला प्रति क्विंटल ३,१५० रुपये भाव देत आहेत. पेमेंट थेट बँक खात्यात १०० टक्के सुरक्षित केले जाते.`}
              label="माहिती ऐका 🔊"
            />
            <a
              href={`tel:${buyer.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
              title={`थेट फोन लावा: ${buyer.phone}`}
            >
              <Phone className="h-4 w-4" />
              <span>📞 {buyer.phone} (थेट फोन करा)</span>
            </a>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsOfferOpen(true)}
              className="font-bold text-xs"
            >
              + माल विक्री प्रस्ताव द्या
            </Button>
          </div>
        </div>

        {/* Rating Breakdown & Credibility Metrics */}
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2 border-r border-gray-100 pr-4">
              <span className="text-xs text-gray-500 font-semibold uppercase">Merchant Credibility</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-gray-900">{avgRating}</span>
                <span className="text-xs text-gray-500">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-gray-500 pt-1">
                Based on <strong className="text-gray-800">{buyer.pastTransactions}</strong> fulfilled orders on platform
              </p>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">Payment Escrow</span>
                  <span className="text-emerald-700 font-bold">{buyer.rating.payment}/5</span>
                </div>
                <Progress value={(buyer.rating.payment / 5) * 100} className="h-2" />
                <span className="text-[10px] text-gray-500">Average release in T+2 days</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">Price Fairness</span>
                  <span className="text-gray-900 font-bold">{buyer.rating.priceFairness}/5</span>
                </div>
                <Progress value={(buyer.rating.priceFairness / 5) * 100} className="h-2" />
                <span className="text-[10px] text-gray-500">Matches or beats mandi rates</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">Communication</span>
                  <span className="text-gray-900 font-bold">{buyer.rating.communication}/5</span>
                </div>
                <Progress value={(buyer.rating.communication / 5) * 100} className="h-2" />
                <span className="text-[10px] text-gray-500">Fast response to farmer inquiries</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-600">Transaction Rating</span>
                  <span className="text-gray-900 font-bold">{buyer.rating.experience}/5</span>
                </div>
                <Progress value={(buyer.rating.experience / 5) * 100} className="h-2" />
                <span className="text-[10px] text-gray-500">Zero disputes recorded</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Buyer Requirements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-lg font-bold text-gray-900">Active Procurement Requirements</h2>
            <p className="text-xs text-gray-500">
              Immediate institutional demand. Small farmers can pool produce using Lot Formation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDemands.map((req) => (
            <Card key={req.id} className="border-gray-200 hover:shadow-md transition">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{req.cropName}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <Calendar className="h-3.5 w-3.5 text-gray-400" />
                      <span>Required by: {req.deadline}</span>
                    </div>
                  </div>
                  <Badge variant="success">{req.qualityGrade}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg text-xs">
                  <div>
                    <span className="text-gray-500">Required Quantity</span>
                    <div className="font-extrabold text-gray-900 text-base">
                      {req.requiredQtyKg.toLocaleString()} kg
                    </div>
                    <span className="text-[10px] text-gray-400">({req.requiredQtyKg / 100} quintals)</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Offered Price</span>
                    <div className="font-extrabold text-primary-700 text-base">
                      ₹{req.offeredPricePerQ}/q
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">+12% over mandi</span>
                  </div>
                </div>

                <p className="text-xs text-gray-600">
                  <strong>Specifications:</strong> {req.specs}
                </p>

                <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => {
                      setSelectedCropRequirement(req.cropId)
                      setOfferPrice(req.offeredPricePerQ)
                      setIsOfferOpen(true)
                    }}
                  >
                    Fulfill with My Harvest
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs"
                    leftIcon={<Layers className="h-3.5 w-3.5" />}
                    onClick={() => navigate('/farmer/lot-formation')}
                  >
                    Form Lot (Group Sell)
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Escrow & Payment Guarantee Information */}
      <Card className="border-emerald-200 bg-emerald-50/40 shadow-sm">
        <CardContent className="p-5 flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1 text-xs text-emerald-950">
            <h4 className="font-bold text-sm text-emerald-900">
              100% ShetiMitra Payment Escrow Guarantee
            </h4>
            <p className="leading-relaxed text-emerald-800">
              When an order is confirmed with {buyer.companyName}, the agreed purchase amount is pre-deposited into an RBI-regulated escrow account.
              Payment is automatically released to your bank account upon delivery acknowledgement, ensuring absolute protection against payment defaults.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Direct Offer Modal */}
      {isOfferOpen && (
        <Modal
          open={isOfferOpen}
          onClose={() => setIsOfferOpen(false)}
          title={`Contract Offer to ${buyer.companyName}`}
          description="Enter your supply quantity and proposed price. An order will be initiated upon submission."
          size="md"
        >
          <form onSubmit={handleSendOffer} className="space-y-4 pt-2 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg space-y-1">
              <div className="font-semibold text-gray-900">{buyer.companyName}</div>
              <div className="text-gray-500">
                Procurement Target: {selectedCropRequirement === 'C1' ? 'Onion (Nasik Red)' : 'Tomato (Arka Vikas)'}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Quantity You Want to Supply (kg) *</label>
              <Input
                type="number"
                min="100"
                step="50"
                value={offerQty}
                onChange={(e) => setOfferQty(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Price (₹ per Quintal) *</label>
              <Input
                type="number"
                min="500"
                step="25"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                required
              />
              <span className="text-[11px] text-gray-500 font-medium">
                Total Deal Value: ₹{((offerQty * offerPrice) / 100).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Remarks / Quality Specifications</label>
              <Textarea
                rows={2}
                value={offerNotes}
                onChange={(e) => setOfferNotes(e.target.value)}
                placeholder="E.g. Grade A harvest ready in crates, Nashik farm gate pickup."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" type="button" onClick={() => setIsOfferOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Confirm & Create Order
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
