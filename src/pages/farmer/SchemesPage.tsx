import * as React from 'react'
import {
  CheckCircle2,
  ExternalLink,
  Building,
  Check,
  Search,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { schemes } from '@/data/schemes'
import { primaryDemoFarmer } from '@/data/farmers'
import type { GovernmentScheme } from '@/types'

export default function SchemesPage() {
  const [selectedType, setSelectedType] = React.useState<string>('ALL')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [eligibilityModalScheme, setEligibilityModalScheme] = React.useState<GovernmentScheme | null>(null)

  const filteredSchemes = React.useMemo(() => {
    return schemes.filter((s) => {
      const matchType = selectedType === 'ALL' || s.schemeType === selectedType
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.ministry.toLowerCase().includes(searchQuery.toLowerCase())
      return matchType && matchSearch
    })
  }, [selectedType, searchQuery])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              सरकारी योजना आणि कृषी अनुदान (Schemes)
            </h1>
            <Badge variant="primary" size="sm">शासकीय लाभ</Badge>
            <VoiceButton
              text="सरकारी योजना आणि कृषी अनुदान. पीएम किसान, पीक विमा आणि इतर शासकीय योजनांची माहिती आणि पात्रता येथे तपासा."
              label="माहिती ऐका"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            शासकीय आर्थिक सहाय्य, पीक विमा, गोदाम अनुदान आणि आधुनिक अवजारे अनुदानाची संपूर्ण माहिती.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="shadow-sm">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search scheme name or ministry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {['ALL', 'Income Support', 'Crop Insurance', 'Technical Support', 'Market Linkage', 'Infrastructure'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedType === t
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t === 'ALL' ? 'All Programs' : t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="border-gray-200 hover:shadow-md transition flex flex-col justify-between">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="primary" size="sm" className="mb-2">
                    {scheme.schemeType}
                  </Badge>
                  {scheme.applicationDeadline && (
                    <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-medium">
                      Deadline: {scheme.applicationDeadline.split('T')[0]}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-lg leading-snug">{scheme.name}</h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-gray-400" />
                  {scheme.ministry}
                </p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {scheme.description}
              </p>

              {/* Key Benefits */}
              <div className="space-y-1.5 p-3.5 bg-gray-50 rounded-xl text-xs">
                <span className="font-bold text-gray-900 block">Key Entitlements:</span>
                <ul className="space-y-1">
                  {scheme.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <Check className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{b.replace('DEMO: ', '')}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility preview */}
              <div className="text-xs space-y-1 text-gray-500">
                <span className="font-semibold text-gray-700">Eligibility Scope:</span>
                <p>{scheme.eligibility[0]?.replace('DEMO: ', '')}</p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setEligibilityModalScheme(scheme)}
                  >
                    पात्रता तपासा
                  </Button>
                  <VoiceButton
                    text={`${scheme.name}. ${scheme.description}. मिळणारा लाभ: ${scheme.benefits.join(', ')}.`}
                    size="sm"
                  />
                </div>

                {scheme.websiteUrl && (
                  <a
                    href={scheme.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:text-primary-800"
                  >
                    <span>अधिकृत पोर्टल</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Eligibility Modal */}
      {eligibilityModalScheme && (
        <Modal
          open={!!eligibilityModalScheme}
          onClose={() => setEligibilityModalScheme(null)}
          title={`Eligibility Check: ${eligibilityModalScheme.name}`}
          description="Automated matching against your verified farmer persona credentials."
          size="md"
        >
          <div className="space-y-4 pt-2 text-xs">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                You are Fully Eligible for this Scheme!
              </div>
              <p className="text-emerald-800 leading-relaxed">
                Farmer profile <strong>{primaryDemoFarmer.name}</strong> ({primaryDemoFarmer.village}, {primaryDemoFarmer.district}) satisfies all active criteria.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-800">Criteria Verification Checklist:</div>
              <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span>Landholding Record (12 Acres):</span>
                  <span className="font-semibold text-emerald-700">✓ Verified (Mahabhulekh)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Aadhaar-Seeded Bank Account:</span>
                  <span className="font-semibold text-emerald-700">✓ Active (DBT Linked)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>State & Region:</span>
                  <span className="font-semibold text-emerald-700">✓ Maharashtra Notified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Crops Covered:</span>
                  <span className="font-semibold text-emerald-700">✓ Onion, Wheat, Tomato</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setEligibilityModalScheme(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (eligibilityModalScheme.websiteUrl) {
                    window.open(eligibilityModalScheme.websiteUrl, '_blank')
                  }
                  setEligibilityModalScheme(null)
                }}
                rightIcon={<ExternalLink className="h-4 w-4" />}
              >
                Proceed to Apply Online
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
