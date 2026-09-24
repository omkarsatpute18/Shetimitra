import { useNavigate } from 'react-router-dom'
import { Truck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { transportProviders } from '@/data/transportProviders'
import { transportRequests } from '@/data/transportRequests'

export default function TransportDashboard() {
  const navigate = useNavigate()
  const currentProvider = transportProviders[0] // Mahesh Teli

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-earth-800 via-earth-700 to-sky-900 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-sky-100 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Transporter Fleet Portal • {currentProvider.companyName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Logistics & Freight Route Manager
          </h1>
          <p className="text-sm text-sky-100/90 max-w-xl leading-relaxed">
            Consolidating multi-farmer pickups to eliminate empty return hauls and maximize ton-kilometer profitability.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => navigate('/farmer/transport')}
          className="bg-white text-earth-900 hover:bg-sky-50 font-bold whitespace-nowrap shadow-md"
        >
          View Live Shared Routes
        </Button>
      </div>

      {/* Fleet Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Completed Deliveries</span>
            <div className="text-2xl font-bold text-gray-900">{currentProvider.totalTrips} Trips</div>
            <p className="text-[11px] text-emerald-600 font-medium">★ {currentProvider.rating} Customer Rating</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Active Trip Payload</span>
            <div className="text-2xl font-bold text-sky-700">3,700 / 5,000 kg</div>
            <p className="text-[11px] text-sky-600 font-medium">74% Capacity Filled</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Monthly Gross Earnings</span>
            <div className="text-2xl font-bold text-emerald-700">₹1,42,800</div>
            <p className="text-[11px] text-emerald-600 font-medium">Direct UPI settlement</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Freight Rate</span>
            <div className="text-2xl font-bold text-gray-900">₹{currentProvider.pricePerKm}/km</div>
            <p className="text-[11px] text-gray-500">Service: {currentProvider.serviceRadius} km radius</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Consolidation Trip Card */}
      <Card className="border-2 border-sky-300 bg-sky-50/20 shadow-sm">
        <CardHeader className="pb-3 border-b border-sky-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-sky-700" />
              <CardTitle className="text-base">Active Consolidated Trip #TRIP-MH12-99</CardTitle>
            </div>
            <Badge variant="success">In Progress (Stop 2 of 4)</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-gray-500">Vehicle:</span>
              <div className="font-bold text-gray-900 text-sm">{currentProvider.vehicleType} (MH-12-AB-1111)</div>
            </div>
            <div>
              <span className="text-gray-500">Farmers Consolidated:</span>
              <div className="font-bold text-gray-900 text-sm">3 Farmers (Onion Nasik Red)</div>
            </div>
            <div>
              <span className="text-gray-500">Trip Earnings:</span>
              <div className="font-bold text-emerald-700 text-sm">₹8,450 (Consolidated Freight)</div>
            </div>
            <div>
              <span className="text-gray-500">Destination:</span>
              <div className="font-bold text-gray-900 text-sm">ABC Agro Foods Plant, Pune</div>
            </div>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-gray-700">Payload Load Progress:</span>
              <span className="text-sky-700 font-bold">1,300 kg space available for backhaul</span>
            </div>
            <Progress value={74} className="h-2.5" />
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/farmer/transport')}
            >
              Inspect Route Waypoints
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Farmer Requests Seeking Transport */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Open Farmer Pickup Requests Along Your Corridors</h2>
          <p className="text-xs text-gray-500">Nearby farm-gate loads matching your route and capacity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transportRequests.map((req) => (
            <Card key={req.id} className="border-gray-200 hover:shadow-sm">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">Request #{req.id}</h3>
                    <p className="text-xs text-gray-500">Quantity: <strong>{req.quantity} {req.unit}</strong></p>
                  </div>
                  <Badge variant={req.status === 'completed' ? 'success' : 'default'} size="sm">
                    {req.status}
                  </Badge>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                  <div>
                    <span className="text-gray-500">Pickup:</span>
                    <div className="font-medium text-gray-900 truncate">{req.pickupAddress}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Drop:</span>
                    <div className="font-medium text-gray-900 truncate">{req.dropAddress}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-primary-700">₹{req.quotedPrice ?? 3500} Freight</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => navigate('/farmer/transport')}
                  >
                    Accept Cargo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
