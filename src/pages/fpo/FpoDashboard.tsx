import { useNavigate } from 'react-router-dom'
import {
  Users,
  Layers,
  Sprout,
  ShoppingCart,
  TrendingUp,
  Plus,
  Package,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { fpos } from '@/data/fpos'
import { lots } from '@/data/lots'
import { buyers } from '@/data/buyers'

export default function FpoDashboard() {
  const navigate = useNavigate()
  const currentFpo = fpos[0] // Sahyadri Farmer Producer Company Ltd

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-900 via-amber-800 to-soil-900 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-amber-100 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            FPO Leadership Portal • Reg: {currentFpo.registrationNumber}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {currentFpo.name}
          </h1>
          <p className="text-sm text-amber-100/90 max-w-xl leading-relaxed">
            Coordinating {currentFpo.memberCount} member farmers across {currentFpo.totalLandArea} acres for bulk aggregation, input cost reduction, and institutional direct sales.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/farmer/lot-formation')}
          leftIcon={<Plus className="h-4 w-4" />}
          className="bg-white text-amber-950 hover:bg-amber-50 font-bold whitespace-nowrap shadow-md"
        >
          + Create Aggregated Lot
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Total Members</span>
            <Users className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">{currentFpo.memberCount}</div>
          <p className="text-[11px] text-emerald-600 font-medium">+18 this month</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Aggregated Produce</span>
            <Sprout className="h-4 w-4 text-crop-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">45.2 MT</div>
          <p className="text-[11px] text-gray-500">Onion, Tomato, Wheat</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Active Lots</span>
            <Layers className="h-4 w-4 text-sky-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">3 Lots</div>
          <p className="text-[11px] text-sky-600 font-medium">1 ready to ship</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Wholesale Contracts</span>
            <ShoppingCart className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">4 Buyers</div>
          <p className="text-[11px] text-gray-500">ABC Agro, Perfect Grains</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Pending Orders</span>
            <Package className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">2 Inbound</div>
          <p className="text-[11px] text-gray-500">Dispatches scheduled</p>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500">
            <span className="text-xs font-medium">Disbursed to Farmers</span>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-gray-900">₹14.2 L</div>
          <p className="text-[11px] text-emerald-600 font-medium">100% On-time payout</p>
        </div>
      </div>

      {/* Active Lots Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Active Collective Lots Under Management</h2>
            <p className="text-xs text-gray-500">Pooled member volumes undergoing quality grading & buyer matching</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/farmer/lot-formation')}
          >
            Create New Lot
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lots.map((lot) => {
            const pct = Math.round((lot.currentQuantity / lot.targetQuantity) * 100)
            return (
              <Card key={lot.id} className="border-gray-200 hover:shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">{lot.variety}</h3>
                      <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        #{lot.id}
                      </span>
                    </div>
                    <Badge variant={lot.status === 'filled' ? 'success' : 'default'} size="sm">
                      {lot.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Aggregation Progress:</span>
                      <span className="font-bold text-gray-900">
                        {lot.currentQuantity.toLocaleString()} / {lot.targetQuantity.toLocaleString()} kg ({pct}%)
                      </span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{lot.farmerIds.length} farmers contributed</span>
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs"
                      onClick={() => navigate('/farmer/transport')}
                    >
                      Dispatch Lot
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Member Inflow and Wholesale Linkages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader className="pb-3 border-b border-gray-100">
            <CardTitle className="text-base">Recent Member Harvest Deposits</CardTitle>
            <CardDescription>Intake recorded at Mulshi central sorting station</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">Rajendra Desai</div>
                <div className="text-gray-500">1,500 kg Onion • Grade A</div>
              </div>
              <Badge variant="success">Stored in Lot #L1</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">Vishwanath Jadhav</div>
                <div className="text-gray-500">1,200 kg Onion • Grade A</div>
              </div>
              <Badge variant="success">Stored in Lot #L1</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">Babanrao Shinde</div>
                <div className="text-gray-500">1,000 kg Onion • Grade A</div>
              </div>
              <Badge variant="success">Stored in Lot #L1</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader className="pb-3 border-b border-gray-100">
            <CardTitle className="text-base">Institutional Off-take Partners</CardTitle>
            <CardDescription>Direct contracts signed with zero commission middlemen</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-3 text-xs">
            {buyers.slice(0, 3).map((b) => (
              <div key={b.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50">
                <div>
                  <div className="font-bold text-gray-900">{b.companyName}</div>
                  <div className="text-gray-500">{b.location} • Rating: 4.7/5</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => navigate(`/farmer/buyers/${b.id}`)}
                >
                  View Contract
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
