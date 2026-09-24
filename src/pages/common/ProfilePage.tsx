import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useRole } from '@/context/RoleContext'

export default function ProfilePage() {
  const { currentRole, currentUser } = useRole()

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Profile Banner */}
      <Card className="border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-primary-800 via-primary-700 to-crop-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur-md text-white font-extrabold flex items-center justify-center text-2xl border border-white/20 shadow-sm">
              {currentUser.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{currentUser.name}</h1>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 capitalize">
                  {currentRole} Persona
                </Badge>
              </div>
              <p className="text-xs text-primary-100 mt-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {currentUser.location}
              </p>
            </div>
          </div>

          <Badge variant="success" className="bg-emerald-400 text-emerald-950 font-bold self-start sm:self-center gap-1">
            <ShieldCheck className="h-4 w-4" /> Platform Verified
          </Badge>
        </div>

        <CardContent className="p-6 space-y-6">
          {/* Details dependent on Role */}
          {currentRole === 'farmer' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">शेतीचे क्षेत्र (Landholding)</span>
                <div className="font-bold text-gray-900 text-base">{currentUser.landArea ?? 6.5} एकर</div>
                <div className="text-[11px] text-emerald-600 font-medium">✓ ७/१२ डिजिटल पडताळणी पूर्ण</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">पिकवलेली पिके (Crops)</span>
                <div className="font-bold text-gray-900 text-base">
                  {currentUser.crops?.join(', ') || 'कांदा, टोमॅटो, गहू'}
                </div>
                <div className="text-[11px] text-gray-500">रब्बी आणि खरीप हंगाम</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">बँक व थेट अनुदान खाते</span>
                <div className="font-bold text-gray-900 text-base">State Bank of India</div>
                <div className="text-[11px] text-emerald-600 font-medium">✓ आधार आणि बँक सुरक्षित जोडणी</div>
              </div>
            </div>
          )}

          {currentRole === 'buyer' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">नोंदणीकृत व्यापारी संस्था</span>
                <div className="font-bold text-gray-900 text-base">{currentUser.companyName || currentUser.name}</div>
                <div className="text-[11px] text-emerald-600 font-medium">GSTIN: {currentUser.gstin || '27AABCS1429B1Z8'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">वार्षिक खरेदी क्षमता</span>
                <div className="font-bold text-gray-900 text-base">3,500 टन / वर्ष</div>
                <div className="text-[11px] text-gray-500">कांदा, गहू, कडधान्ये</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">सुरक्षित बँक पत रेटिंग</span>
                <div className="font-bold text-emerald-700 text-base">4.9 / 5.0 Rating</div>
                <div className="text-[11px] text-gray-500">१००% वेळेत बँक पेमेंट</div>
              </div>
            </div>
          )}

          {currentRole === 'fpo' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">नोंदणीकृत FPC</span>
                <div className="font-bold text-gray-900 text-base">{currentUser.fpoName || currentUser.name}</div>
                <div className="text-[11px] text-emerald-600 font-medium">Reg: {currentUser.registrationNumber || 'U01100MH2021PTC356789'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">एकूण सभासद शेतकरी</span>
                <div className="font-bold text-gray-900 text-base">350+ शेतकरी</div>
                <div className="text-[11px] text-gray-500">१,२०० एकर एकत्रित क्षेत्र</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">नाबार्ड (NABARD) अनुदान</span>
                <div className="font-bold text-emerald-700 text-base">सक्रिय लाभार्थी संस्था</div>
                <div className="text-[11px] text-emerald-600 font-medium">केंद्रीय क्षेत्र योजना पात्र</div>
              </div>
            </div>
          )}

          {currentRole === 'transport' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">गाडी व मालक तपशील</span>
                <div className="font-bold text-gray-900 text-base">{currentUser.name}</div>
                <div className="text-[11px] text-gray-500">{currentUser.vehicleType || 'आयशर प्रो २४ (७ टन)'}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">वाहन क्रमांक</span>
                <div className="font-bold text-gray-900 text-base font-mono">{currentUser.vehicleNumber || 'MH-15-EG-4455'}</div>
                <div className="text-[11px] text-emerald-600 font-medium">★ 4.8 प्रमाणित ट्रान्सपोर्टर</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl space-y-1">
                <span className="text-xs text-gray-500">वाहतूक परवाना</span>
                <div className="font-bold text-gray-900 text-base">ऑल महाराष्ट्र परवाना</div>
                <div className="text-[11px] text-emerald-600 font-medium">✓ GPS व विमा संरक्षित</div>
              </div>
            </div>
          )}

          {/* Verification Checklist */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900">सुरक्षा व सत्यता पडताळणी (Verified Credentials)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-600">मोबाईल नंबर पडताळणी:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> प्रमाणित (+91 {currentUser.phone})
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-600">Aadhaar Identity Verification:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Verified (UIDAI Linked)
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-600">Bank Account & UPI VPA:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Escrow Enabled
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-gray-600">Geofenced Farm Coordinates:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> 18.5204° N, 73.8567° E
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
