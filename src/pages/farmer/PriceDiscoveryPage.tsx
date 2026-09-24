import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  MapPin,
  ShieldCheck,
  Info,
  Truck,
  Calculator,
} from 'lucide-react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { crops } from '@/data/crops'
import { markets } from '@/data/markets'
import { getPriceHistory } from '@/services/marketService'
import type { PriceRecord, Market } from '@/types'

export default function PriceDiscoveryPage() {
  const navigate = useNavigate()

  const [selectedCropId, setSelectedCropId] = React.useState('C1')
  const [dateRange, setDateRange] = React.useState<'7d' | '30d' | '90d'>('30d')
  const [visibleLines, setVisibleLines] = React.useState({
    modal: true,
    min: true,
    max: true,
    msp: true,
  })
  const [historyData, setHistoryData] = React.useState<PriceRecord[]>([])
  const [selectedMarketForCompare, setSelectedMarketForCompare] = React.useState<Market | null>(null)
  const [quantityKg, setQuantityKg] = React.useState<number>(2000)

  const selectedCrop = crops.find((c) => c.id === selectedCropId) ?? crops[0]
  const currentMsp = selectedCrop.sampleMsp

  React.useEffect(() => {
    const daysNumber = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : 90
    void getPriceHistory(selectedCropId, daysNumber).then((data) => {
      setHistoryData(data)
    })
  }, [selectedCropId, dateRange])

  // Calculation rate: ₹0.85 per km per quintal
  const TRANSPORT_RATE = 0.85

  // Sorted markets by estimated net price
  const marketAnalysis = React.useMemo(() => {
    return markets.map((m) => {
      const distance = m.distanceFromDemoFarmer
      const transportCost = Math.round(distance * (quantityKg / 100) * TRANSPORT_RATE)
      const grossVal = Math.round(m.modalPrice * (quantityKg / 100))
      const netVal = grossVal - transportCost
      const netPerQuintal = Math.round(netVal / (quantityKg / 100))
      const diffVsMsp = m.modalPrice - currentMsp

      return {
        ...m,
        transportCost,
        grossVal,
        netVal,
        netPerQuintal,
        diffVsMsp,
      }
    }).sort((a, b) => b.netVal - a.netVal)
  }, [quantityKg, currentMsp])

  const topNetMarket = marketAnalysis[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              आजचे बाजारभाव आणि नफा हिशोब (Mandi Price Discovery)
            </h1>
            <Badge variant="success" size="sm">थेट APMC भाव</Badge>
            <VoiceButton
              text={`शेतकरी दादा, येथे विविध बाजारांमधील आजचे बाजारभाव आणि वाहतूक खर्च वजा जाता तुमच्या हातात प्रत्यक्ष किती पैसे उरतील हे दाखवले आहे. ${topNetMarket ? topNetMarket.name + ' बाजारात नेल्यास तुम्हाला सर्वाधिक म्हणजेच अंदाजे ' + topNetMarket.netVal.toLocaleString('en-IN') + ' रुपये मिळतील.' : ''}`}
              label="भाव व नफा ऐका 🔊"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            विविध APMC बाजारांचे चालू भाव, सरकारी हमीभाव (MSP) आणि गाडी भाडे वजा जाता घरात उरणारा निव्वळ नफा.
          </p>
        </div>

        {/* Global Selectors */}
        <div className="flex items-center gap-3">
          <div className="w-56">
            <Select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              options={crops.map((c) => ({ value: c.id, label: `🌾 ${c.name} (${c.category})` }))}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/farmer/ai-assistant')}
            className="font-bold text-xs"
          >
            🤖 शेती सल्लागार (AI)
          </Button>
        </div>
      </div>

      {/* Snapshot Cards in Marathi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-primary-600 bg-white shadow-sm">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-semibold">निवडलेले मुख्य पीक</span>
            <div className="text-xl font-black text-gray-900">{selectedCrop.name}</div>
            <div className="text-xs text-gray-600 flex items-center justify-between">
              <span>हंगाम: <strong>{selectedCrop.season}</strong></span>
              <span>उत्पादन: <strong>{selectedCrop.avgYieldPerAcre} क्विं./एकर</strong></span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-white shadow-sm">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-amber-800 font-semibold">सरकारी हमीभाव (Govt MSP)</span>
            <div className="text-xl font-black text-amber-700">₹{currentMsp.toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500"> /क्विंटल</span></div>
            <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> शासकीय आधारभूत किंमत
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-600 bg-white shadow-sm">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-emerald-800 font-semibold">सर्वोच्च चालू बाजारभाव</span>
            <div className="text-xl font-black text-emerald-700">
              ₹{Math.max(...markets.map((m) => m.modalPrice)).toLocaleString('en-IN')}<span className="text-xs font-normal text-gray-500"> /क्विंटल</span>
            </div>
            <div className="text-xs text-gray-600 truncate">
              {markets.reduce((max, m) => (m.modalPrice > max.modalPrice ? m : max)).name} येथे
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-crop-600 bg-crop-50/50 shadow-sm border border-crop-100">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-crop-800 font-bold flex items-center gap-1">
              🏆 वाहतूक वजा जाता प्रत्यक्ष सर्वोच्च नफा
            </span>
            <div className="text-xl font-black text-crop-800">
              ₹{topNetMarket?.netPerQuintal.toLocaleString('en-IN')}<span className="text-xs font-normal text-crop-700"> /क्विं. निव्वळ</span>
            </div>
            <div className="text-xs text-crop-700 font-medium">
              {topNetMarket?.name} ({topNetMarket?.distanceFromDemoFarmer} कि.मी. अंतर)
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Price Trend Chart in Marathi */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900 font-bold">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                बाजारभाव कल आणि इतिहास — {selectedCrop.name}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500">
                मागील दिवसांमधील किमान, कमाल आणि सरासरी लिलाव भाव आणि हमीभाव तुलना
              </CardDescription>
            </div>

            {/* Timeframe & Line Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 text-xs font-semibold">
                {([
                  { key: '7d', label: '७ दिवस' },
                  { key: '30d', label: '३० दिवस' },
                  { key: '90d', label: '९० दिवस' },
                ] as const).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setDateRange(key)}
                    className={`px-3 py-1.5 rounded-md transition-colors ${
                      dateRange === key
                        ? 'bg-white text-primary-700 shadow-xs font-bold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 ml-2 text-xs">
                <label className="flex items-center gap-1 cursor-pointer font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={visibleLines.modal}
                    onChange={(e) => setVisibleLines((p) => ({ ...p, modal: e.target.checked }))}
                    className="rounded text-primary-600"
                  />
                  <span>सरासरी भाव</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-medium text-emerald-700">
                  <input
                    type="checkbox"
                    checked={visibleLines.max}
                    onChange={(e) => setVisibleLines((p) => ({ ...p, max: e.target.checked }))}
                    className="rounded text-emerald-600"
                  />
                  <span>कमाल भाव</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-medium text-red-600">
                  <input
                    type="checkbox"
                    checked={visibleLines.min}
                    onChange={(e) => setVisibleLines((p) => ({ ...p, min: e.target.checked }))}
                    className="rounded text-red-500"
                  />
                  <span>किमान भाव</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer font-medium text-amber-700">
                  <input
                    type="checkbox"
                    checked={visibleLines.msp}
                    onChange={(e) => setVisibleLines((p) => ({ ...p, msp: e.target.checked }))}
                    className="rounded text-amber-500"
                  />
                  <span>हमीभाव (MSP)</span>
                </label>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historyData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  tickFormatter={(val: string) => {
                    const parts = val.split('-')
                    return `${parts[2]}/${parts[1]}`
                  }}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  tick={{ fontSize: 11, fill: '#6B7280' }}
                  tickFormatter={(val: number) => `₹${val}`}
                />
                <Tooltip
                  formatter={(val: unknown) => [
                    `₹${Number(val ?? 0).toLocaleString('en-IN')}/क्विं.`,
                    '',
                  ]}
                  labelFormatter={(lbl: unknown) => `तारीख: ${String(lbl)}`}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.5rem',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                {visibleLines.max && (
                  <Line
                    type="monotone"
                    dataKey="max"
                    name="कमाल लिलाव भाव (Max)"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={false}
                  />
                )}
                {visibleLines.modal && (
                  <Line
                    type="monotone"
                    dataKey="modal"
                    name="सरासरी बाजारभाव (Modal)"
                    stroke="#16a34a"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                  />
                )}
                {visibleLines.min && (
                  <Line
                    type="monotone"
                    dataKey="min"
                    name="किमान लिलाव भाव (Min)"
                    stroke="#dc2626"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                )}
                {visibleLines.msp && (
                  <ReferenceLine
                    y={currentMsp}
                    stroke="#d97706"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    label={{
                      value: `हमीभाव आधार: ₹${currentMsp}`,
                      position: 'top',
                      fill: '#d97706',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Market Comparison Table: 100% MARATHI (MATCHING SCREENSHOT) */}
      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg sm:text-xl font-extrabold text-gray-900">
                  मंडी अंतर आणि वाहतूक खर्च तुलना (नफा कॅल्क्युलेटर)
                </CardTitle>
                <VoiceButton
                  text="येथे तुमच्या मालाचे वजन टाकल्यास कोणत्या बाजारात नेल्यावर गाडी भाडे वजा जाता हातात प्रत्यक्ष किती पैसे उरतील ते पाहा. हिरव्या रंगात सर्वाधिक नफ्याची बाजारपेठ दाखवली आहे."
                  label="हिशोब ऐका 🔊"
                  size="sm"
                />
              </div>
              <CardDescription className="text-xs sm:text-sm text-gray-600 mt-0.5">
                तुमच्या शेतातील मालाचे एकूण वजन टाका आणि वाहतूक खर्च वजा जाता कोणत्या बाजारात सर्वात जास्त निव्वळ नफा मिळेल ते पाहा.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm bg-white p-1.5 px-3 rounded-xl border border-gray-200 shadow-xs">
              <span className="text-gray-700 font-bold flex items-center gap-1">
                <Calculator className="h-4 w-4 text-primary-600" />
                मालाचे एकूण वजन:
              </span>
              <div className="flex items-center gap-1 font-extrabold bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-20 bg-transparent text-right font-black text-gray-900 focus:outline-none text-sm"
                />
                <span className="text-gray-700 font-medium">किलो ({quantityKg / 100} क्विंटल)</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/90 text-gray-600 border-b border-gray-200 text-xs uppercase font-extrabold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">बाजार / APMC मंडी</th>
                  <th className="py-3.5 px-3">शेतापासून अंतर</th>
                  <th className="py-3.5 px-3">सरासरी बाजारभाव</th>
                  <th className="py-3.5 px-3">हमीभावापेक्षा (MSP)</th>
                  <th className="py-3.5 px-3">आजची आवक व मागणी</th>
                  <th className="py-3.5 px-3 text-red-600">अंदाजे वाहतूक खर्च</th>
                  <th className="py-3.5 px-4 text-right text-emerald-800">प्रत्यक्ष हातात उरणारा नफा</th>
                  <th className="py-3.5 px-4 text-center">कृती / पर्याय</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {marketAnalysis.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-primary-50/20 transition-colors ${
                      idx === 0 ? 'bg-emerald-50/30 font-medium border-l-4 border-l-emerald-600' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {idx === 0 && (
                          <span className="text-[11px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded shadow-xs whitespace-nowrap">
                            🏆 सर्वाधिक नफा
                          </span>
                        )}
                        <div>
                          <div className="font-bold text-gray-900 text-sm sm:text-base">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.district}, {item.state} • {item.marketType}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1 text-gray-700 font-semibold">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{item.distanceFromDemoFarmer} कि.मी.</span>
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      <div className="font-black text-gray-900 text-sm sm:text-base">
                        ₹{item.modalPrice.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-gray-500"> /क्विंटल</span>
                      </div>
                      <div className="text-[11px] text-gray-500 font-medium">
                        किमान-कमाल: ₹{item.minPrice} – ₹{item.maxPrice}
                      </div>
                    </td>

                    <td className="py-4 px-3">
                      {item.diffVsMsp >= 0 ? (
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          +₹{item.diffVsMsp}/क्विं.
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold text-xs bg-red-50 px-2 py-0.5 rounded border border-red-200">
                          -₹{Math.abs(item.diffVsMsp)}/क्विं.
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-3">
                      <div className="text-gray-900 font-bold">{item.arrivalsToday} क्विंटल</div>
                      <Badge
                        variant={item.demandLevel === 'high' ? 'success' : 'default'}
                        size="sm"
                        className="text-[10px] mt-1 font-bold"
                      >
                        {item.demandLevel === 'high' ? '🔥 जास्त मागणी' : item.demandLevel === 'med' ? '⚡ मध्यम मागणी' : 'कमी मागणी'}
                      </Badge>
                    </td>

                    <td className="py-4 px-3">
                      <div className="text-red-600 font-bold text-sm">
                        -₹{item.transportCost.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-gray-500">
                        (₹{Math.round(item.transportCost / (quantityKg / 100))}/क्विं. भाडे)
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="text-base sm:text-lg font-black text-emerald-700">
                        ₹{item.netVal.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs font-bold text-gray-600">
                        (₹{item.netPerQuintal}/क्विंटल निव्वळ)
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs font-bold border-gray-300"
                          onClick={() => setSelectedMarketForCompare(item)}
                        >
                          तपशील ℹ️
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="text-xs font-bold bg-primary-600 text-white hover:bg-primary-700"
                          onClick={() => navigate('/farmer/transport')}
                        >
                          गाडी शोधा 🚛
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Explanation Banner in Simple Marathi for Rural Farmers */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900">
        <Info className="h-6 w-6 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="space-y-1.5">
          <span className="font-extrabold text-sm sm:text-base text-amber-950 flex items-center gap-1.5">
            💡 शेतीमित्र प्रत्यक्ष नफा कसा मोजतो? (शेतकऱ्यांसाठी सोपे गणित):
          </span>
          <p className="leading-relaxed text-amber-900">
            कधीकधी लांबच्या बाजारपेठेत जास्त भाव दिसत असतो, परंतु तिथे जाण्यासाठी टेम्पो किंवा ट्रकचे भाडे जास्त लागते. 
            त्यामुळे प्रत्यक्ष हातात उरणारे पैसे कमी होतात. <strong>शेतीमित्र</strong> तुमच्या शेतापासूनचे अंतर, डिझेल खर्च आणि प्रति क्विंटल भाडे (<span className="font-bold">₹०.८५ प्रति कि.मी.</span>) हिशोबात घेऊन, तुम्ही घरातून निघण्यापूर्वीच कोणत्या बाजारात सर्वाधिक निव्वळ नफा मिळेल हे स्पष्ट करून देतो.
          </p>
        </div>
      </div>

      {/* Market Detail Modal in 100% Marathi */}
      {selectedMarketForCompare && (
        <Modal
          open={!!selectedMarketForCompare}
          onClose={() => setSelectedMarketForCompare(null)}
          title={`📍 ${selectedMarketForCompare.name} चा संपूर्ण नफा हिशोब`}
          description={`${selectedMarketForCompare.district}, ${selectedMarketForCompare.state} • ${selectedMarketForCompare.marketType}`}
          size="md"
        >
          <div className="space-y-4 pt-2 text-sm">
            <div className="flex items-center justify-between p-3 bg-primary-50 rounded-xl border border-primary-200">
              <div>
                <div className="text-xs text-primary-800 font-semibold">निवडलेले पीक</div>
                <div className="text-base font-extrabold text-primary-950">{selectedCrop.name}</div>
              </div>
              <VoiceButton
                text={`${selectedMarketForCompare.name} मध्ये एकूण विक्री किंमत ${Math.round(selectedMarketForCompare.modalPrice * (quantityKg / 100)).toLocaleString('en-IN')} रुपये होईल. त्यातून गाडी भाडे ${Math.round(selectedMarketForCompare.distanceFromDemoFarmer * (quantityKg / 100) * 0.85).toLocaleString('en-IN')} रुपये वजा जाता तुमच्या हातात निव्वळ नफा ${Math.round(selectedMarketForCompare.modalPrice * (quantityKg / 100) - selectedMarketForCompare.distanceFromDemoFarmer * (quantityKg / 100) * 0.85).toLocaleString('en-IN')} रुपये उरेल.`}
                label="हा हिशोब ऐका 🔊"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="text-xs text-gray-500 font-semibold">शेतापासून अंतर</span>
                <div className="font-extrabold text-gray-900">{selectedMarketForCompare.distanceFromDemoFarmer} कि.मी.</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold">बाजार चालू असणारे दिवस</span>
                <div className="font-semibold text-gray-800">{selectedMarketForCompare.operatingDays.join(', ')}</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold">आजची एकूण आवक</span>
                <div className="font-extrabold text-gray-900">{selectedMarketForCompare.arrivalsToday} क्विंटल</div>
              </div>
              <div>
                <span className="text-xs text-gray-500 font-semibold">मागणीची स्थिती</span>
                <div className="font-extrabold text-emerald-700">
                  {selectedMarketForCompare.demandLevel === 'high' ? '🔥 जास्त मागणी' : 'मध्यम मागणी'}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="text-xs font-black text-emerald-900 uppercase">
                {quantityKg} किलो ({quantityKg / 100} क्विंटल) मालाचा प्रत्यक्ष हिशोब:
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-700">बाजारातील एकूण विक्री मूल्य:</span>
                <span className="font-black text-gray-900">
                  ₹{Math.round(selectedMarketForCompare.modalPrice * (quantityKg / 100)).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-red-600">
                <span>अंदाजे गाडी भाडे (वाहतूक खर्च):</span>
                <span className="font-black">
                  -₹{Math.round(selectedMarketForCompare.distanceFromDemoFarmer * (quantityKg / 100) * 0.85).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="border-t border-emerald-300 pt-2 flex justify-between font-black text-base text-emerald-800">
                <span>हातात उरणारा निव्वळ नफा:</span>
                <span className="text-lg">
                  ₹{Math.round(
                    selectedMarketForCompare.modalPrice * (quantityKg / 100) -
                    selectedMarketForCompare.distanceFromDemoFarmer * (quantityKg / 100) * 0.85
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="ghost" onClick={() => setSelectedMarketForCompare(null)}>
                रद्द करा
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setSelectedMarketForCompare(null)
                  navigate('/farmer/transport')
                }}
                className="font-bold flex items-center gap-1.5"
              >
                <Truck className="h-4 w-4" />
                सामायिक गाडी शोधा (भाडे वाचवा)
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
