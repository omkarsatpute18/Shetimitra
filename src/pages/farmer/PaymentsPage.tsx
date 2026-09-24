import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Download,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { payments } from '@/data/payments'
import { buyers } from '@/data/buyers'
import type { PaymentStatus } from '@/types'

export default function PaymentsPage() {
  const navigate = useNavigate()
  const [selectedStatus, setSelectedStatus] = React.useState<string>('ALL')

  // Total Metrics
  const totalPaid = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalProcessing = payments
    .filter((p) => p.status === 'processing')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payments
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  const filteredPayments = React.useMemo(() => {
    if (selectedStatus === 'ALL') return payments
    return payments.filter((p) => p.status === selectedStatus)
  }, [selectedStatus])

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success" size="sm" className="font-bold">✓ खात्यात जमा झाले</Badge>
      case 'processing':
        return <Badge variant="info" size="sm" className="font-bold">सुरक्षित खात्यात जमा (Escrow)</Badge>
      case 'pending':
        return <Badge variant="warning" size="sm" className="font-bold">तपासणी प्रलंबित</Badge>
      case 'delayed':
        return <Badge variant="error" size="sm" className="font-bold">विलंब - तक्रार नोंदवा</Badge>
      default:
        return <Badge variant="default" size="sm">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
              सुरक्षित बँक पैसे आणि खाती (Safe Bank Payments)
            </h1>
            <Badge variant="success" size="sm">✓ १००% सुरक्षित बँक हमी</Badge>
            <VoiceButton
              text="तुमचे सर्व पैसे सुरक्षित आहेत. खरेदीदाराने पैसे शेतीमित्रच्या सुरक्षित बँक खात्यात भरले आहेत. माल पोहोचल्याची खात्री होताच ४४,२५० रुपये तुमच्या बँक खात्यात थेट जमा होतील."
              label="पैसे खात्री ऐका 🔊"
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            दलालांशिवाय थेट बँक खात्यात पैसे. खरेदीदाराने माल स्वीकारताच रक्कम त्वरित खात्यात जमा होते.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}
          onClick={() => alert('बँक पावती डाउनलोड होत आहे...')}
          className="font-bold text-xs border-gray-300"
        >
          पावती डाउनलोड करा
        </Button>
      </div>

      {/* Metric Cards in Marathi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-emerald-600 bg-white shadow-sm">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-700">बँक खात्यात थेट जमा झालेली रक्कम</span>
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">
              ₹{totalPaid.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-emerald-700 font-bold">थेट बँक खात्यात (NEFT / IMPS) जमा</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-sky-500 bg-white shadow-sm">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-700">सुरक्षित खात्यात जमा (Escrow)</span>
              <Clock className="h-5 w-5 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">
              ₹{totalProcessing.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-sky-700 font-bold">माल पोहोचताच बँक खात्यात येईल</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 bg-white shadow-sm">
          <CardContent className="p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-bold text-gray-700">वाहतुकीत असलेला माल</span>
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-gray-900">
              ₹{totalPending.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-amber-700 font-bold">गाडी रस्त्यात / प्रत तपासणी बाकी</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex rounded-xl bg-gray-100 p-1">
          {[
            { id: 'ALL', label: 'सर्व व्यवहार (All)' },
            { id: 'processing', label: 'सुरक्षित जमा (Escrow)' },
            { id: 'paid', label: 'जमा झालेले (Paid)' },
            { id: 'pending', label: 'प्रलंबित (Pending)' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStatus(s.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                selectedStatus === s.id ? 'bg-white text-primary-800 shadow-xs' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Payments Table in 100% Marathi */}
      <Card className="shadow-sm border-gray-200 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50/90 text-gray-600 border-b border-gray-200 text-xs uppercase font-extrabold">
                <tr>
                  <th className="py-3.5 px-4">व्यवहार संदर्भ क्रमांक</th>
                  <th className="py-3.5 px-3">ऑर्डर व खरेदीदार</th>
                  <th className="py-3.5 px-3">पैसे भरण्याची पद्धत</th>
                  <th className="py-3.5 px-3">तारीख</th>
                  <th className="py-3.5 px-3">स्थिती</th>
                  <th className="py-3.5 px-4 text-right">एकूण रक्कम</th>
                  <th className="py-3.5 px-4 text-center">कृती</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPayments.map((p) => {
                  const buyer = buyers.find((b) => b.id === p.payerId)
                  return (
                    <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-mono font-bold text-gray-900 text-xs">
                          {p.transactionRef ?? p.id}
                        </div>
                        <div className="text-[11px] text-gray-500">ऑर्डर क्रमांक #{p.orderId}</div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="font-bold text-gray-900">
                          {buyer?.companyName ?? p.payerId}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          संपर्क: {buyer?.contactName ?? 'खरेदी विभाग'}
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="text-gray-900 font-semibold text-xs">{p.method}</div>
                        <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                          ✓ बँक हमी सुरक्षित
                        </div>
                      </td>

                      <td className="py-4 px-3">
                        <div className="text-gray-900 font-medium text-xs">
                          {p.paidDate ? p.paidDate.split('T')[0] : p.dueDate.split('T')[0]}
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">
                          {p.paidDate ? 'खात्यात जमा झाले' : 'अपेक्षित तारीख'}
                        </div>
                      </td>

                      <td className="py-4 px-3">{getStatusBadge(p.status)}</td>

                      <td className="py-4 px-4 text-right">
                        <div className="text-base font-black text-gray-900">
                          ₹{p.amount.toLocaleString('en-IN')}
                        </div>
                        <div className="text-[10px] text-gray-500 font-medium">थेट खात्यात वर्ग</div>
                      </td>

                      <td className="py-4 px-4 text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs font-bold"
                          onClick={() => navigate(`/farmer/orders/${p.orderId}`)}
                        >
                          ऑर्डर पहा
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Escrow Mechanism Explanation in Farmer-Friendly Marathi */}
      <Card className="border-emerald-200 bg-emerald-50/40">
        <CardContent className="p-5 flex items-start gap-4">
          <ShieldCheck className="h-7 w-7 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1.5">
            <h4 className="font-extrabold text-base text-emerald-950">
              🛡️ शेतीमित्र तुमच्या पैशांची १००% हमी कशी घेतो?
            </h4>
            <p className="text-emerald-900 leading-relaxed">
              पारंपारिक बाजारात शेतकऱ्यांना पैशांसाठी महिना-दोन महिने वाट पाहावी लागते किंवा व्यापारी पैसे बुडवण्याची भीती असते. 
              <strong>शेतीमित्र</strong> वर गाडी शेतातून निघण्यापूर्वीच खरेदीदाराला १००% रक्कम सुरक्षित डिजिटल एस्क्रो बँक खात्यात जमा करावी लागते. माल पोहोचताच आणि डिजिटल पावती मिळताच हे पैसे थेट तुमच्या बँक खात्यात त्वरित जमा होतात.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
