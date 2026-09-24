import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  ShieldCheck,
  Star,
  Building2,
  MapPin,
  Layers,
  Phone,
  CheckCircle2,
  Send,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/Textarea'
import { useNotifications } from '@/context/NotificationContext'
import { buyers } from '@/data/buyers'
import { crops } from '@/data/crops'
import { useRole } from '@/context/RoleContext'
import type { Buyer } from '@/types'

export default function MarketplacePage() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const { currentUser } = useRole()

  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedCrop, setSelectedCrop] = React.useState('ALL')
  const [verifiedOnly, setVerifiedOnly] = React.useState(false)
  const [minRating, setMinRating] = React.useState('0')
  const [offerModalBuyer, setOfferModalBuyer] = React.useState<Buyer | null>(null)
  const [offerQty, setOfferQty] = React.useState(1500)
  const [offerPrice, setOfferPrice] = React.useState(3100)
  const [offerNotes, setOfferNotes] = React.useState('')
  const [savedBuyers, setSavedBuyers] = React.useState<Record<string, boolean>>({})

  const filteredBuyers = React.useMemo(() => {
    return buyers.filter((b) => {
      const matchSearch =
        b.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchCrop =
        selectedCrop === 'ALL' || b.cropsRequired.includes(selectedCrop)

      const matchVerified = !verifiedOnly || b.verificationStatus === 'platform'

      const avgRating =
        (b.rating.payment + b.rating.communication + b.rating.priceFairness + b.rating.experience) / 4
      const matchRating = avgRating >= Number(minRating)

      return matchSearch && matchCrop && matchVerified && matchRating
    })
  }, [searchQuery, selectedCrop, verifiedOnly, minRating])

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault()
    if (!offerModalBuyer) return

    addNotification({
      userId: currentUser?.id ?? 'F1',
      userType: 'farmer',
      type: 'order_confirm',
      title: 'व्यापाऱ्याला थेट ऑफर पाठवली',
      message: `तुमची ${offerQty} किलो माल आणि ₹${offerPrice}/क्विंटल दराची ऑफर ${offerModalBuyer.companyName} यांना पाठवण्यात आली आहे.`,
      isRead: false,
      priority: 'high',
    })

    setOfferModalBuyer(null)
    navigate('/farmer/orders/O1')
  }

  const toggleSave = (buyerId: string) => {
    setSavedBuyers((prev) => ({ ...prev, [buyerId]: !prev[buyerId] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              थेट खरेदीदार बाजारपेठ (Buyer Marketplace)
            </h1>
            <Badge variant="success" size="sm">{buyers.length} सत्यापित खरेदीदार</Badge>
            <VoiceButton
              text="थेट खरेदीदार बाजारपेठ. येथे तुम्ही प्रमाणित व्यापारी, कंपन्या आणि प्रक्रिया उद्योगांशी थेट फोनवर बोलू शकता किंवा तुमची मालाची ऑफर पाठवू शकता. मध्यस्थांशिवाय थेट व्यवहार करा."
              label="माहिती ऐका 🔊"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            प्रमाणित व्यापारी, थेट खरेदीदार आणि प्रोसेसिंग कंपन्यांशी थेट संपर्क — मध्यस्थांशिवाय हमीभाव आणि सुरक्षित व्यवहार.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/farmer/lot-formation')}
          leftIcon={<Layers className="h-4 w-4" />}
          className="font-bold border-gray-300"
        >
          🤝 शेजाऱ्यांसोबत एकत्र विक्री करा
        </Button>
      </div>

      {/* Filter Bar */}
      <Card className="shadow-sm border-gray-200">
        <CardContent className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="कंपनी, व्यापारी किंवा शहर शोधा..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>

            <Select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              options={[
                { value: 'ALL', label: 'सर्व पिके (All Crops)' },
                ...crops.map((c) => ({ value: c.id, label: `🌾 ${c.name}` })),
              ]}
            />

            <Select
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              options={[
                { value: '0', label: 'सर्व रेटिंग्ज (All Ratings)' },
                { value: '4.0', label: '★ ४.० आणि अधिक' },
                { value: '4.5', label: '★ ४.५ आणि अधिक (अव्वल)' },
              ]}
            />

            <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50">
              <label htmlFor="verifiedCheck" className="text-xs font-bold text-gray-700 cursor-pointer">
                फक्त अधिकृत पडताळणी झालेले
              </label>
              <input
                id="verifiedCheck"
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-primary-600 h-4 w-4"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buyers Grid */}
      {filteredBuyers.length === 0 ? (
        <Card className="p-12 text-center border-gray-200">
          <div className="max-w-md mx-auto space-y-3">
            <Building2 className="h-10 w-10 text-gray-400 mx-auto" />
            <h3 className="font-bold text-gray-900">कोणतेही खरेदीदार सापडले नाहीत</h3>
            <p className="text-xs text-gray-500">
              कृपया तुमचे पीक किंवा शोध पर्याय बदला.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setSelectedCrop('ALL')
                setVerifiedOnly(false)
                setMinRating('0')
              }}
            >
              फिल्टर पूर्ववत करा
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBuyers.map((b) => {
            const avgRating = (
              (b.rating.payment + b.rating.communication + b.rating.priceFairness + b.rating.experience) /
              4
            ).toFixed(1)

            const cropNames = b.cropsRequired
              .map((cid) => crops.find((c) => c.id === cid)?.name ?? cid)
              .join(', ')

            const isSaved = !!savedBuyers[b.id]

            return (
              <Card key={b.id} className="hover:shadow-md transition-shadow border-gray-200 flex flex-col justify-between">
                <CardContent className="p-5 space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-base leading-snug">{b.companyName}</h3>
                        {b.verificationStatus === 'platform' ? (
                          <Badge variant="success" size="sm" className="gap-1 font-bold">
                            <ShieldCheck className="h-3 w-3" /> अधिकृत पडताळणी
                          </Badge>
                        ) : (
                          <Badge variant="default" size="sm">चाचणी पडताळणी</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{b.location}</span>
                        <span>•</span>
                        <span>संपर्क: {b.contactName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Breakdown & Stats */}
                  <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs border border-gray-100">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                      <div className="flex items-center gap-1 font-black text-gray-900 text-sm">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span>{avgRating} / ५.०</span>
                      </div>
                      <span className="text-gray-600 font-semibold">{b.pastTransactions} यशस्वी खरेदी व्यवहार</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-700">
                      <div className="flex justify-between">
                        <span>पैसे मिळण्याचा वेग:</span>
                        <span className="font-bold text-emerald-700">{b.rating.payment}/५</span>
                      </div>
                      <div className="flex justify-between">
                        <span>रास्त भाव:</span>
                        <span className="font-bold text-gray-900">{b.rating.priceFairness}/५</span>
                      </div>
                      <div className="flex justify-between">
                        <span>बोलचाल व संवाद:</span>
                        <span className="font-bold text-gray-900">{b.rating.communication}/५</span>
                      </div>
                      <div className="flex justify-between">
                        <span>एकूण अनुभव:</span>
                        <span className="font-bold text-gray-900">{b.rating.experience}/५</span>
                      </div>
                    </div>
                  </div>

                  {/* Procurement Details */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">लागणारे मुख्य पीक:</span>
                      <span className="font-bold text-gray-900">{cropNames}</span>
                    </div>
                    {b.annualVolume && (
                      <div className="flex justify-between">
                        <span className="text-gray-500 font-medium">वार्षिक खरेदी क्षमता:</span>
                        <span className="font-bold text-gray-900">{b.annualVolume.toLocaleString()} टन/वर्ष</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-medium">जीएसटी / परवाना:</span>
                      <span className="font-mono text-gray-700 font-semibold">{b.gstin ?? 'सत्यापित परवाना'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                    <a
                      href={`tel:${b.phone}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                      title="थेट फोन लावा"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      कॉल करा
                    </a>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs font-bold"
                      onClick={() => setOfferModalBuyer(b)}
                    >
                      ऑफर पाठवा
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-bold"
                      onClick={() => navigate(`/farmer/buyers/${b.id}`)}
                    >
                      तपशील
                    </Button>
                    <VoiceButton
                      text={`${b.companyName}, ${b.location}. संपर्क व्यक्ती: ${b.contactName}. फोन नंबर: ${b.phone}. एकूण रेटिंग: ५ पैकी ${avgRating}. सुरक्षित खरेदीदार.`}
                      size="sm"
                    />
                    <button
                      onClick={() => toggleSave(b.id)}
                      className={`p-2 rounded-lg border text-xs transition-colors ${
                        isSaved ? 'bg-amber-50 text-amber-600 border-amber-300' : 'text-gray-400 hover:text-gray-600 border-gray-200'
                      }`}
                      title={isSaved ? 'जतन केले' : 'जतन करा'}
                    >
                      ★
                    </button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Offer Modal in Marathi */}
      {offerModalBuyer && (
        <Modal
          open={!!offerModalBuyer}
          onClose={() => setOfferModalBuyer(null)}
          title={`📝 ${offerModalBuyer.companyName} यांना थेट ऑफर पाठवा`}
          description={`तुमच्या मालाचे वजन आणि अपेक्षित दर थेट ${offerModalBuyer.contactName} यांच्याकडे नोंदवा.`}
          size="md"
        >
          <form onSubmit={handleSendOffer} className="space-y-4 pt-2 text-xs sm:text-sm">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
              <div className="font-bold text-gray-900">{offerModalBuyer.companyName}</div>
              <div className="text-gray-600 text-xs">स्थान: {offerModalBuyer.location}</div>
              <div className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> शेतीमित्र सुरक्षित बँक हमी (Escrow) उपलब्ध
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">तुम्ही देऊ शकत असलेले मालाचे वजन (किलोमध्ये) *</label>
              <Input
                type="number"
                min="100"
                step="50"
                value={offerQty}
                onChange={(e) => setOfferQty(Number(e.target.value))}
                required
                className="font-bold text-gray-900"
              />
              <span className="text-[11px] text-gray-500 font-medium">
                = {offerQty / 100} क्विंटल
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">तुमचा अपेक्षित भाव (₹ प्रति क्विंटल) *</label>
              <Input
                type="number"
                min="500"
                step="25"
                value={offerPrice}
                onChange={(e) => setOfferPrice(Number(e.target.value))}
                required
                className="font-bold text-gray-900"
              />
              <span className="text-[11px] text-emerald-700 font-bold">
                एकूण व्यवहार किंमत: ₹{((offerQty * offerPrice) / 100).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-gray-800">मालाची प्रत / दर्जा व इतर माहिती</label>
              <Textarea
                rows={2}
                value={offerNotes}
                onChange={(e) => setOfferNotes(e.target.value)}
                placeholder="उदा. नाशिक शेतातून थेट लोड करता येईल. माल वाळलेला आणि चांगल्या प्रतीचा आहे."
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" type="button" onClick={() => setOfferModalBuyer(null)}>
                रद्द करा
              </Button>
              <Button variant="primary" type="submit" className="font-bold flex items-center gap-1.5">
                <Send className="h-4 w-4" />
                ऑफर पाठवा आणि ऑर्डर तयार करा
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
