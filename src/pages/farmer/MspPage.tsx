import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  TrendingDown,
  Info,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { crops } from '@/data/crops'
import { VoiceButton } from '@/components/ui/VoiceButton'

export default function MspPage() {
  const navigate = useNavigate()
  const [selectedSeason, setSelectedSeason] = React.useState<string>('ALL')

  // Sample current average market prices mapping
  const currentMarketRates: Record<string, { price: number; topMarket: string }> = {
    C1: { price: 2850, topMarket: 'Pune APMC' },
    C2: { price: 2100, topMarket: 'Nashik APMC' },
    C3: { price: 2350, topMarket: 'Sangli APMC' },
    C4: { price: 4750, topMarket: 'Aurangabad Mandi' },
    C5: { price: 7200, topMarket: 'Jalna APMC' },
    C6: { price: 2280, topMarket: 'Pune APMC' },
    C7: { price: 2320, topMarket: 'Solapur APMC' },
  }

  const mspComparisons = React.useMemo(() => {
    return crops
      .filter((c) => selectedSeason === 'ALL' || c.season === selectedSeason)
      .map((crop) => {
        const marketData = currentMarketRates[crop.id] ?? { price: crop.sampleMsp * 1.05, topMarket: 'Pune APMC' }
        const diff = marketData.price - crop.sampleMsp
        const diffPct = ((diff / crop.sampleMsp) * 100).toFixed(1)
        const isAbove = diff >= 0

        return {
          ...crop,
          currentPrice: marketData.price,
          topMarket: marketData.topMarket,
          diff,
          diffPct,
          isAbove,
        }
      })
  }, [selectedSeason])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              सरकारी हमीभाव आणि बाजारभाव (MSP Rates)
            </h1>
            <Badge variant="warning" size="sm">हमीभाव सुरक्षा कवच</Badge>
            <VoiceButton
              text="सरकारी हमीभाव आणि आजचे बाजारभाव. हमीभावापेक्षा कमी दरात माल विकू नका. येथे कोणत्या बाजारात हमीभावापेक्षा जास्त भाव मिळतो ते तपासा आणि थेट खरेदीदारांशी संपर्क साधा."
              label="माहिती ऐका"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            शासकीय हमीभाव (MSP) आणि चालू बाजारभावाची तुलना — तुमच्या मालाला हक्काचा योग्य भाव मिळवा.
          </p>
        </div>

        {/* Season Filter */}
        <div className="flex rounded-lg bg-gray-100 p-1">
          {['ALL', 'kharif', 'rabi', 'zaid'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSeason(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md capitalize transition ${
                selectedSeason === s ? 'bg-white text-primary-700 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {s === 'ALL' ? 'सर्व हंगाम (All)' : s === 'kharif' ? 'खरीप' : s === 'rabi' ? 'रब्बी' : 'उन्हाळी'}
            </button>
          ))}
        </div>
      </div>

      {/* Farmer Advisory Tip Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-950">
        <Info className="h-5 w-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-bold text-sm text-emerald-900">शेतकऱ्यांसाठी महत्त्वाची माहिती (Farmer Advisory):</span>
            <VoiceButton
              text="शेतकरी मित्रांनो, हमीभाव हा शासनाने ठरवून दिलेला किमान दर आहे. जर बाजारात हमीभावापेक्षा कमी दर मिळत असेल, तर जवळच्या शासकीय खरेदी केंद्रावर किंवा नोंदणीकृत एफपीओकडे संपर्क साधा."
              size="sm"
              label="सल्ला ऐका"
            />
          </div>
          <p className="text-emerald-800 mt-1 leading-relaxed">
            हमीभाव (MSP) हा शासनाचा सुरक्षा कवच आहे. जर बाजारात दर हमीभावापेक्षा कमी असतील तर थेट शासकीय केंद्रात विक्री करा किंवा चांगल्या दरासाठी शेतीमित्र वरील थेट खरेदीदार शोधा.
          </p>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mspComparisons.map((item) => (
          <Card key={item.id} className="border-gray-200 hover:shadow-md transition">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                    <Badge variant="outline" size="sm" className="capitalize">
                      {item.season}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">प्रकार: {item.category}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <VoiceButton
                    text={`${item.name}. सरकारी हमीभाव: ₹${item.sampleMsp} प्रति क्विंटल. आजचा सरासरी बाजारभाव: ₹${item.currentPrice} प्रति क्विंटल. ${item.isAbove ? 'सध्या बाजारभाव हमीभावापेक्षा जास्त आहे.' : 'सावधान, बाजारभाव हमीभावापेक्षा कमी आहे. थेट सरकारी खरेदी केंद्राशी संपर्क करा.'}`}
                    size="sm"
                  />
                  <Badge variant={item.isAbove ? 'success' : 'error'} size="sm">
                    {item.isAbove ? 'हमीभावापेक्षा जास्त' : 'हमीभावापेक्षा कमी'}
                  </Badge>
                </div>
              </div>

              {/* Price Figures Comparison */}
              <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl text-xs">
                <div>
                  <span className="text-gray-500 font-medium">शासकीय हमीभाव (Govt MSP):</span>
                  <div className="font-extrabold text-gray-900 text-base">
                    ₹{item.sampleMsp.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500">/क्विंटल</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 font-medium">चालू बाजारभाव (Mandi):</span>
                  <div className="font-extrabold text-primary-700 text-base">
                    ₹{item.currentPrice.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500">/क्विंटल</span>
                  </div>
                </div>
              </div>

              {/* Spread Callout */}
              <div className="flex items-center justify-between text-xs p-2.5 rounded-lg border border-gray-100">
                <span className="text-gray-600">हमीभावापेक्षा फरक:</span>
                <span className={`font-bold flex items-center gap-1 ${item.isAbove ? 'text-emerald-600' : 'text-red-600'}`}>
                  {item.isAbove ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {item.diff >= 0 ? `+₹${item.diff}/क्विंटल (+${item.diffPct}%)` : `-₹${Math.abs(item.diff)}/क्विंटल (${item.diffPct}%)`}
                </span>
              </div>

              <div className="text-[11px] text-gray-500 flex justify-between pt-1">
                <span>सर्वोच्च बाजार: <strong>{item.topMarket}</strong></span>
                <span>उत्पादन: ~{item.avgYieldPerAcre} क्विंटल/एकर</span>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => navigate('/farmer/price-discovery')}
                >
                  बाजारभाव पहा
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => navigate('/farmer/marketplace')}
                >
                  खरेदीदार शोधा
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
