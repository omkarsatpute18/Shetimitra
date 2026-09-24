import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { useNotifications } from '@/context/NotificationContext'
import { crops } from '@/data/crops'
import { buyers } from '@/data/buyers'

export default function BuyerDashboard() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const currentBuyer = buyers[0] // ABC Agro Foods Pvt Ltd

  const [isDemandModalOpen, setIsDemandModalOpen] = React.useState(false)
  const [demandCrop, setDemandCrop] = React.useState('C1')
  const [demandQty, setDemandQty] = React.useState(5000)
  const [demandPrice, setDemandPrice] = React.useState(3150)
  const [demandGrade, setDemandGrade] = React.useState('A')
  const [demandDate, setDemandDate] = React.useState('2026-10-05')

  const [activeDemandsList, setActiveDemandsList] = React.useState([
    {
      id: 'BD1',
      crop: 'Onion (Nasik Red)',
      qty: 5000,
      price: 3150,
      grade: 'Grade A',
      deadline: '05 Oct 2026',
      fulfilled: 3700,
    },
    {
      id: 'BD2',
      crop: 'Tomato (Arka Vikas)',
      qty: 3000,
      price: 2250,
      grade: 'Grade A',
      deadline: '28 Sep 2026',
      fulfilled: 1200,
    },
  ])

  const handleCreateDemand = (e: React.FormEvent) => {
    e.preventDefault()
    const cropObj = crops.find((c) => c.id === demandCrop)
    const newDemand = {
      id: `BD_${Date.now()}`,
      crop: `${cropObj?.name ?? 'Crop'} (${demandGrade})`,
      qty: Number(demandQty),
      price: Number(demandPrice),
      grade: `Grade ${demandGrade}`,
      deadline: demandDate,
      fulfilled: 0,
    }
    setActiveDemandsList((prev) => [newDemand, ...prev])
    addNotification({
      userId: currentBuyer.id,
      userType: 'buyer',
      type: 'new_demand',
      title: 'Institutional Demand Published',
      message: `Broadcast demand for ${demandQty} kg ${cropObj?.name} at ₹${demandPrice}/q to all registered farmers & FPOs.`,
      isRead: false,
      priority: 'high',
    })
    setIsDemandModalOpen(false)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-sky-100 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            Institutional Buyer Portal • {currentBuyer.companyName}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Procurement & Supplier Operations
          </h1>
          <p className="text-sm text-sky-100/90 max-w-xl leading-relaxed">
            Direct linkage to verified farmer clusters, collective FPO lots, and shared cold-chain transport.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          onClick={() => setIsDemandModalOpen(true)}
          leftIcon={<Plus className="h-4 w-4" />}
          className="bg-white text-sky-900 hover:bg-sky-50 font-bold whitespace-nowrap shadow-md"
        >
          + Post Buying Demand
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Active Demands</span>
            <div className="text-2xl font-bold text-gray-900">8,000 kg</div>
            <p className="text-[11px] text-sky-600 font-medium">2 crops broadcasting</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Incoming Lots</span>
            <div className="text-2xl font-bold text-gray-900">3 Lots</div>
            <p className="text-[11px] text-emerald-600 font-medium">4,900 kg in aggregation</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Orders in Transit</span>
            <div className="text-2xl font-bold text-gray-900">1 Shipment</div>
            <p className="text-[11px] text-gray-500">1,500 kg Onion • ETA Today</p>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4 space-y-1">
            <span className="text-xs text-gray-500 font-medium">Escrow Deposited</span>
            <div className="text-2xl font-bold text-primary-700">₹44,250</div>
            <p className="text-[11px] text-emerald-600 font-medium">100% Secured</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Demands Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Live Procurement Demands</h2>
            <p className="text-xs text-gray-500">Requirements broadcasted across Maharashtra farmer clusters</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDemandModalOpen(true)}
            leftIcon={<Plus className="h-3.5 w-3.5" />}
          >
            Post Demand
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDemandsList.map((d) => {
            const pct = Math.round((d.fulfilled / d.qty) * 100)
            return (
              <Card key={d.id} className="border-gray-200 hover:shadow-sm">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-base">{d.crop}</h3>
                        <Badge variant="primary" size="sm">{d.grade}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">Deadline: {d.deadline}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-primary-700 text-base">₹{d.price}/q</div>
                      <span className="text-[10px] text-gray-400">Offered Rate</span>
                    </div>
                  </div>

                  {/* Fulfillment Progress */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fulfillment Progress:</span>
                      <span className="font-bold text-gray-900">
                        {d.fulfilled.toLocaleString()} / {d.qty.toLocaleString()} kg ({pct}%)
                      </span>
                    </div>
                    <Progress value={pct} className="h-2.5" />
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-700 font-semibold">4 Farmer offers awaiting review</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => navigate('/farmer/orders/O1')}
                    >
                      Review Offers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Dispatched Lots Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Collective Lots Formed for Your Demands</h2>
          <p className="text-xs text-gray-500">Aggregated lots ready for direct dispatch to your facility</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-crop-300 bg-crop-50/10">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Lot #LOT-2026-ONION-99</h3>
                  <p className="text-xs text-gray-500">Nashik Rural Cluster • 3 Smallholder Farmers</p>
                </div>
                <Badge variant="success">100% Aggregated</Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded-lg border border-gray-100 text-xs">
                <div>
                  <span className="text-gray-500">Volume:</span>
                  <div className="font-bold text-gray-900">5,000 kg</div>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <div className="font-bold text-primary-700">₹31.5/kg</div>
                </div>
                <div>
                  <span className="text-gray-500">Logistics:</span>
                  <div className="font-bold text-sky-700">Assigned</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => navigate('/farmer/orders/O1')}
                >
                  Track Inbound Delivery
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Post Demand Modal */}
      {isDemandModalOpen && (
        <Modal
          open={isDemandModalOpen}
          onClose={() => setIsDemandModalOpen(false)}
          title="Post Institutional Crop Demand"
          description="Broadcast your procurement requirements to farmers, FPOs, and storage aggregators."
          size="md"
        >
          <form onSubmit={handleCreateDemand} className="space-y-4 pt-2 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-gray-700">Crop *</label>
              <Select
                value={demandCrop}
                onChange={(e) => setDemandCrop(e.target.value)}
                options={crops.map((c) => ({ value: c.id, label: c.name }))}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Target Quantity (kg) *</label>
                <Input
                  type="number"
                  min="500"
                  step="500"
                  value={demandQty}
                  onChange={(e) => setDemandQty(Number(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Offered Price (₹/quintal) *</label>
                <Input
                  type="number"
                  min="500"
                  step="25"
                  value={demandPrice}
                  onChange={(e) => setDemandPrice(Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Required Grade *</label>
                <Select
                  value={demandGrade}
                  onChange={(e) => setDemandGrade(e.target.value)}
                  options={[
                    { value: 'A', label: 'Grade A (Export / Processing)' },
                    { value: 'B', label: 'Grade B (Standard Market)' },
                  ]}
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-gray-700">Fulfillment Deadline *</label>
                <Input
                  type="date"
                  value={demandDate}
                  onChange={(e) => setDemandDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsDemandModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Broadcast Demand to Network
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
