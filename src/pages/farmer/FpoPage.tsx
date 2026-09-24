import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin,
  ShieldCheck,
  Layers,
  Landmark,
  CheckCircle2,
  Phone,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { Modal } from '@/components/ui/Modal'
import { useNotifications } from '@/context/NotificationContext'
import { fpos } from '@/data/fpos'
import { crops } from '@/data/crops'
import { primaryDemoFarmer } from '@/data/farmers'
import type { FPO } from '@/types'

export default function FpoPage() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const [joinModalFpo, setJoinModalFpo] = React.useState<FPO | null>(null)
  const [membershipSubmitted, setMembershipSubmitted] = React.useState(false)

  const handleJoinSubmit = () => {
    if (!joinModalFpo) return
    setMembershipSubmitted(true)
    addNotification({
      userId: primaryDemoFarmer.id,
      userType: 'farmer',
      type: 'fpo_invite',
      title: 'FPO Membership Request Sent',
      message: `Your application to join ${joinModalFpo.name} as a member producer has been dispatched.`,
      isRead: false,
      priority: 'medium',
    })
    setTimeout(() => {
      setMembershipSubmitted(false)
      setJoinModalFpo(null)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              शेतकरी उत्पादक कंपन्या व गट (FPO Network)
            </h1>
            <Badge variant="earth" size="sm">शेतकरी एकजूट शक्ती</Badge>
            <VoiceButton
              text="शेतकरी उत्पादक कंपन्या आणि शेतकरी गट. एकत्र येऊन शेतमाल विकल्यास थेट मोठ्या व्यापाऱ्यांकडून जास्त भाव मिळतो आणि वाहतूक खर्च कमी होतो. जवळच्या शेतकरी गटांशी थेट फोनवरून संपर्क साधा."
              label="माहिती ऐका"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            लहान शेतकऱ्यांची एकजूट — एकत्र माल साठवून मोठ्या खरेदीदारांशी थेट सौदा करा आणि जास्तीचा नफा मिळवा.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/farmer/lot-formation')}
          leftIcon={<Layers className="h-4 w-4" />}
        >
          शेजाऱ्यांसोबत एकत्र विक्री करा
        </Button>
      </div>

      {/* Info Card on FPO Power */}
      <Card className="border-amber-200 bg-amber-50/40">
        <CardContent className="p-5 flex items-start gap-4 text-xs text-amber-950">
          <Landmark className="h-6 w-6 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-900">
              Why Partner with an FPO?
            </h4>
            <p className="text-amber-800 leading-relaxed">
              FPOs enable small and marginal farmers to achieve economies of scale. By aggregating hundreds of members, FPOs negotiate direct wholesale purchase contracts with major agribusinesses, secure lower fertilizer/seed input costs, and access government capital grants up to ₹15 Lakhs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FPO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {fpos.map((fpo) => {
          const cropNames = fpo.crops
            .map((cid) => crops.find((c) => c.id === cid)?.name ?? cid)
            .join(', ')

          return (
            <Card key={fpo.id} className="border-gray-200 hover:shadow-md transition flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-gray-900 text-base leading-snug">{fpo.name}</h3>
                        {fpo.isVerified && (
                          <Badge variant="success" size="sm" className="gap-1">
                            <ShieldCheck className="h-3 w-3" /> NABARD Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-gray-400" />
                        <span>{fpo.village}, {fpo.district}, {fpo.state}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Members:</span>
                    <span className="font-bold text-gray-900">{fpo.memberCount} Farmers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Combined Land Area:</span>
                    <span className="font-semibold text-gray-900">{fpo.totalLandArea} Acres</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Crops Handled:</span>
                    <span className="font-medium text-gray-900">{cropNames}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Member Rating:</span>
                    <span className="font-bold text-amber-700">★ {fpo.rating} / 5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Established:</span>
                    <span className="text-gray-700">{fpo.yearEstablished}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                  <a
                    href={`tel:${fpo.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-xs"
                    title="थेट फोन लावा"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    कॉल करा
                  </a>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => setJoinModalFpo(fpo)}
                  >
                    गटात सामील व्हा
                  </Button>
                  <VoiceButton
                    text={`${fpo.name}. गाव: ${fpo.village}, ${fpo.district}. एकूण शेतकरी: ${fpo.memberCount}. पिके: ${cropNames}. संपर्क फोन: ${fpo.phone}.`}
                    size="sm"
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Join FPO Modal */}
      {joinModalFpo && (
        <Modal
          open={!!joinModalFpo}
          onClose={() => setJoinModalFpo(null)}
          title={`Join ${joinModalFpo.name}`}
          description="Submit your farmer profile and landholding details to join collective lot aggregation."
          size="md"
        >
          {membershipSubmitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-xs text-gray-500">
                The FPO board will review your credentials and contact you within 24 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-gray-50 rounded-lg space-y-1">
                <div className="font-bold text-gray-900">{joinModalFpo.name}</div>
                <div className="text-gray-500">Reg No: {joinModalFpo.registrationNumber}</div>
                <div className="text-emerald-700 font-semibold">Location: {joinModalFpo.village}, {joinModalFpo.district}</div>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-gray-700">Submitting Credentials for {primaryDemoFarmer.name}:</span>
                <div className="p-3 bg-white rounded-lg border border-gray-200 space-y-1 text-gray-600">
                  <div>• Landholding: <strong>12 Acres</strong> (Haveli, Pune)</div>
                  <div>• Crops: <strong>Onion, Tomato, Wheat</strong></div>
                  <div>• Phone: <strong>{primaryDemoFarmer.phone}</strong></div>
                  <div>• Verification: <strong>Platform Verified Farmer</strong></div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <Button variant="ghost" onClick={() => setJoinModalFpo(null)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleJoinSubmit}>
                  Confirm Application
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  )
}
