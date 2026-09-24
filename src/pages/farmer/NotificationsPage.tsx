import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell,
  Truck,
  CreditCard,
  Layers,
  TrendingUp,
  ShoppingCart,
  Check,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { VoiceButton } from '@/components/ui/VoiceButton'
import { useNotifications } from '@/context/NotificationContext'
import type { NotificationType } from '@/types'

export default function NotificationsPage() {
  const navigate = useNavigate()
  const { notifications, markRead, markAllRead } = useNotifications()
  const [filterType, setFilterType] = React.useState<string>('ALL')

  const filteredNotifications = React.useMemo(() => {
    if (filterType === 'ALL') return notifications
    if (filterType === 'unread') return notifications.filter((n) => !n.isRead)
    return notifications.filter((n) => n.type === filterType)
  }, [notifications, filterType])

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'price_change':
        return <TrendingUp className="h-5 w-5 text-emerald-600" />
      case 'buyer_interest':
      case 'new_demand':
        return <ShoppingCart className="h-5 w-5 text-sky-600" />
      case 'lot_invite':
        return <Layers className="h-5 w-5 text-amber-600" />
      case 'transport_match':
        return <Truck className="h-5 w-5 text-earth-700" />
      case 'payment_received':
      case 'payment_delay':
        return <CreditCard className="h-5 w-5 text-indigo-600" />
      default:
        return <Bell className="h-5 w-5 text-primary-600" />
    }
  }

  const handleNotificationClick = (n: typeof notifications[0]) => {
    markRead(n.id)
    if (n.relatedEntityType === 'order') {
      navigate('/farmer/orders/O1')
    } else if (n.relatedEntityType === 'lot') {
      navigate('/farmer/lot-formation')
    } else if (n.relatedEntityType === 'transport') {
      navigate('/farmer/transport')
    } else if (n.relatedEntityType === 'payment') {
      navigate('/farmer/payments')
    } else {
      navigate('/farmer/dashboard')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              महत्त्वाचे संदेश आणि सूचना (Alerts)
            </h1>
            <Badge variant="primary" size="sm">
              {notifications.filter((n) => !n.isRead).length} न वाचलेले
            </Badge>
            <VoiceButton
              text={`तुमच्याकडे ${notifications.filter((n) => !n.isRead).length} न वाचलेले महत्त्वाचे संदेश आहेत. खालील संदेशाच्या समोरील स्पीकर चिन्हावर टॅप करून संदेश ऐका.`}
              label="सर्व ऐका"
              size="sm"
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            बाजारभावातील बदल, खरेदीदारांची मागणी, एकत्र गाडी जुळणी आणि सुरक्षित खात्यातील पैसे जमा झाल्याचे संदेश.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={markAllRead}
          leftIcon={<Check className="h-4 w-4" />}
        >
          सर्व वाचले म्हणून नोंदवा
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
        {[
          { key: 'ALL', label: 'सर्व' },
          { key: 'unread', label: 'फक्त न वाचलेले' },
          { key: 'price_change', label: 'बाजारभाव' },
          { key: 'buyer_interest', label: 'खरेदीदार मागणी' },
          { key: 'lot_invite', label: 'एकत्र विक्री' },
          { key: 'transport_match', label: 'गाडी / वाहतूक' },
          { key: 'payment_received', label: 'बँक पैसे' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterType(tab.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterType === tab.key
                ? 'bg-white text-primary-700 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card className="p-12 text-center border-dashed">
            <div className="max-w-sm mx-auto space-y-2">
              <Bell className="h-10 w-10 text-gray-400 mx-auto" />
              <div className="font-bold text-gray-900">कोणतेही नवीन संदेश नाहीत</div>
              <p className="text-xs text-gray-500">तुमच्या सर्व शेतीविषयक नोंदी अद्ययावत आहेत.</p>
            </div>
          </Card>
        ) : (
          filteredNotifications.map((item) => (
            <Card
              key={item.id}
              className={`border-gray-200 hover:shadow-md transition ${
                !item.isRead ? 'bg-primary-50/25 border-l-4 border-l-primary-600' : 'bg-white'
              }`}
            >
              <CardContent className="p-4 flex items-start gap-3.5">
                <div
                  className="p-2.5 rounded-xl bg-gray-50 flex-shrink-0 mt-0.5 cursor-pointer"
                  onClick={() => handleNotificationClick(item)}
                >
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h3
                      className={`text-sm font-bold cursor-pointer ${!item.isRead ? 'text-gray-900' : 'text-gray-700'}`}
                      onClick={() => handleNotificationClick(item)}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <VoiceButton
                        text={`${item.title}. ${item.message}`}
                        size="sm"
                      />
                      {!item.isRead && (
                        <span className="h-2 w-2 rounded-full bg-primary-600" />
                      )}
                      <span className="text-[11px] text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p
                    className="text-xs text-gray-600 leading-relaxed cursor-pointer"
                    onClick={() => handleNotificationClick(item)}
                  >
                    {item.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
