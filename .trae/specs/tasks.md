# ShetiMitra - Implementation Plan

## Task 1: Scaffold project with Vite + React + TS + Tailwind + core dependencies
- **Status**: `pending`
- **Priority**: high
- **Depends On**: None
- **Description**:
  - Initialize Vite React TypeScript project in repo root
  - Install and configure Tailwind CSS, PostCSS, Autoprefixer with custom agritech color palette (green primary, earth accents)
  - Install runtime dependencies: react-router-dom, recharts, react-leaflet, leaflet, @types/leaflet, lucide-react, i18next, react-i18next, clsx, tailwind-merge, date-fns
  - Create base folder structure: src/{components,components/ui,pages,layouts,context,services,data,types,utils,i18n,assets}
  - Add index.css with Tailwind directives + design tokens (--color-primary, --color-earth-*, typography, borders, shadows)
  - Configure path alias @/ → src/
- **Acceptance Criteria Addressed**: AC-1, AC-12, AC-14, AC-15
- **Test Requirements**:
  - `rule` TR-1.1: `npm install` completes; `npm run build` exits 0 with no TS errors; `npm run dev` serves index.html on port
  - `rule` TR-1.2: Folder structure contains all 13 listed subdirectories under src; src/services and src/types exist
  - `rule` TR-1.3: Tailwind config includes custom green primary and earth palette; index.css defines CSS variables
- **Notes**: Use npm; stick to stable versions.

## Task 2: TypeScript domain types + centralized demo data
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - Create src/types/index.ts with interfaces: Farmer, Buyer, FPO, TransportProvider, Crop, ProduceListing, BuyerDemand, Market, PriceRecord, Lot, TransportRequest, Warehouse, Order, Payment, GovernmentScheme, Notification, UserRole
  - Create src/data/crops.ts with 7 crops (Onion, Tomato, Wheat, Soybean, Cotton, Rice, Maize) + sample MSPs (clearly labeled)
  - Create src/data/farmers.ts with 5+ demo farmers (including villages in Maharashtra/Karnataka belt, lat/lng, crops, quantities)
  - Create src/data/buyers.ts with 6+ demo buyers (ABC Agro Foods type names, ratings, verification badges, locations, past transactions)
  - Create src/data/markets.ts with 8+ mandis (distance, modal/min/max prices, arrivals, demand)
  - Create src/data/priceHistory.ts with 7/30/90-day arrays for price charts
  - Create src/data/fpos.ts, src/data/transportProviders.ts, src/data/warehouses.ts, src/data/orders.ts, src/data/payments.ts, src/data/schemes.ts, src/data/notifications.ts, src/data/lots.ts, src/data/transportRequests.ts
  - All demo data includes geographic coordinates for map
- **Acceptance Criteria Addressed**: AC-12, AC-16
- **Test Requirements**:
  - `rule` TR-2.1: src/types/index.ts defines 16 interfaces listed; TypeScript compiler produces no errors on types
  - `rule` TR-2.2: All 12 data files exist under src/data with non-empty arrays/objects; each file has a comment header "Demo/Sample data"
  - `rule` TR-2.3: MSP entries carry property `isDemo: true` or equivalent explicit label; scheme entries explicitly marked sample
- **Notes**: Coordinate on Pune/Nashik/Ahmednagar region for distances.

## Task 3: Service abstraction layer
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 2
- **Description**:
  - Create src/services/marketService.ts: getMarkets(), getPriceHistory(crop, days), compareMarkets(...)
  - Create src/services/buyerService.ts: getBuyers(filters), getBuyerById(id), getBuyerDemands(filters)
  - Create src/services/farmerService.ts: getFarmerProfile(id), getProduceListings(farmerId), listProduce(payload), getNearbyFarmers(lat, lng, radius)
  - Create src/services/transportService.ts: getTransportRequests(filters), postTransportRequest(payload), combineRequests(requestIds), getNearbyProviders(lat, lng)
  - Create src/services/fpoService.ts: getFPOs(filters), getFPOById(id), getFPOMembers(fpoId)
  - Create src/services/storageService.ts: getWarehouses(filters), compareSellNowVsStore(...)
  - Create src/services/paymentService.ts: getPayments(filters), getOrderTimeline(orderId)
  - Create src/services/aiService.ts: askFarmerQuestion(question, farmerContext) — returns pre-scripted structured responses based on keywords
  - Each service function returns Promise<T> so swap for API trivial.
- **Acceptance Criteria Addressed**: AC-12, AC-11
- **Test Requirements**:
  - `rule` TR-3.1: All 8 service files exist; at least 2 functions each; each function signature is typed and returns Promise of type from src/types
  - `rule` TR-3.2: aiService.askFarmerQuestion returns structured { options: Array<{label, price, distance, transport, net}> } for onion question; includes disclaimer "Demo Assistant"
  - `rule` TR-3.3: No component imports src/data directly — only via services (enforced by convention + initial pages to be created by later tasks will follow)
- **Notes**: aiService keyword matching: "onion"/"sell my"/"where should I"/"best price"/"buyers"/"transport cost"/"MSP"/"FPO"/"storage"

## Task 4: Reusable UI component library (shadcn-style simple components)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1
- **Description**:
  - src/components/ui/Button.tsx (variants: primary/default/secondary/ghost/destructive; sizes: sm/default/lg)
  - src/components/ui/Card.tsx (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
  - src/components/ui/StatCard.tsx (stat with icon, value, delta, trend)
  - src/components/ui/PriceCard.tsx (market/name, price, msp, change, distance)
  - src/components/ui/BuyerCard.tsx / FarmerCard.tsx / MarketCard.tsx / DemandCard.tsx
  - src/components/ui/LotCard.tsx / TransportCard.tsx / StorageCard.tsx / PaymentCard.tsx
  - src/components/ui/NotificationItem.tsx / ChartCard.tsx / MapCard.tsx
  - src/components/ui/StatusBadge.tsx (Pending/Processing/Paid/Delayed/Accepted/Delivered color variants)
  - src/components/ui/VerificationBadge.tsx ("Platform Verified" "Demo Verified" variants)
  - src/components/ui/Rating.tsx (5-star w/ half-star display + numeric rating)
  - src/components/ui/Modal.tsx / Drawer.tsx (controlled, close on overlay click, esc)
  - src/components/ui/DataTable.tsx (pagination, sort, search)
  - src/components/ui/FilterBar.tsx / SearchBar.tsx
  - src/components/ui/EmptyState.tsx (icon, title, description, CTA) / LoadingState.tsx (skeletons), ErrorState.tsx (retry)
  - src/components/ui/Input.tsx / Select.tsx / Textarea.tsx / Checkbox.tsx / Label.tsx / Badge.tsx / Progress.tsx / Tabs.tsx / Tooltip.tsx
  - utils/cn.ts combining clsx + tailwind-merge
- **Acceptance Criteria Addressed**: AC-1, AC-15, AC-17, NFR-1
- **Test Requirements**:
  - `rule` TR-4.1: All component files listed exist; each exports typed components with no TS errors
  - `rule` TR-4.2: Button, Card, DataTable, EmptyState, LoadingState render correctly in a test page/sandbox (all 5 inspected visually via dev)
  - `rubric` TR-4.3: Component visual design; scale 1-5; anchors 1=unstyled/broken, 3=functional plain, 5=polished reusable with states, spacing, shadows, borders matching design direction; threshold >= 4; evidence screenshot of component showcase.

## Task 5: App Router, Layouts, Role Context, Demo Login, Language Architecture
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1, Task 2, Task 4
- **Description**:
  - src/App.tsx with BrowserRouter + role-based routes + auth-guard placeholders
  - src/layouts/RootLayout.tsx: top bar (logo+name, language selector, notification bell w/ badge, profile avatar, role-switcher dropdown "Demo as: Farmer/Buyer/FPO/Transport")
  - src/layouts/SidebarNav.tsx: role-aware menu generation per section 24 navigation lists
  - src/context/RoleContext.tsx: currentRole, setRole, currentUser demo object (per role)
  - src/context/NotificationContext.tsx: notifications[] state, markRead, addNotification
  - src/pages/EntryPage.tsx: Hero role selector ("Continue as [Farmer][Buyer][FPO][Transport Provider]") with nice cards — the entry/demo login
  - src/pages/LandingPage.tsx (/home or /): full landing page (per section 23)
  - src/i18n/index.ts: i18next init with en/hi/mr; src/i18n/locales/{en,hi,mr}/common.json with ~30 shared keys (navigation, role names, common buttons, metric labels); fallback=en
  - Implement role-protected routes so navigation items and route access match the role.
- **Acceptance Criteria Addressed**: AC-2, AC-15, AC-19, NFR-3
- **Test Requirements**:
  - `rule` TR-5.1: App loads EntryPage; selecting Farmer navigates to /farmer/dashboard with farmer sidebar; role-switcher dropdown changes role and nav
  - `rule` TR-5.2: All 4 role entry flows work without broken routes; language selector renders 3 options; notification bell shows badge count
  - `rule` TR-5.3: i18next returns Hindi/Marathi for ~10 keys translated; fallback to English works for missing keys
  - `rubric` TR-5.4: Layout polish and responsiveness; scale 1-5; threshold >= 4; anchors 1=broken layout, 3=usable plain, 5=sidebar+topbar feel cohesive, collapse on mobile, spacing/logo/colors match brand; evidence desktop + mobile width screenshots.

## Task 6: Farmer Dashboard (full page)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/DashboardPage.tsx
  - Top welcome card: farmer name, village, coordinates, weather summary demo widget, notification summary link, profile preview
  - Metric row: 6 StatCards (Listed Produce, Active Buyer Requests, Best Available Price, Current MSP, Pending Payments, Active Transport)
  - Section A: PRICE SNAPSHOT — select crop tabs; 3 PriceCards (Nearby, Alternative, MSP); price trend line chart via Recharts (7d default)
  - Section B: SELLING RECOMMENDATION "Where should I sell?" — 1 highlighted recommendation card with Buyer, Demand, Offered Price, Distance, Transport, Net Realisation (transparency showing math: gross - transport = net; visual calculation block); 3 actions: View Buyer, Sell Now, Compare
  - Section C: BUYER DEMAND "Demand near you" — grid of DemandCards with verification + rating; each card: View Requirement / Send Offer / Contact
  - Section D: MY PRODUCE — [+ List Produce] button opens Modal form (crop, variety, qty, expected price, harvest date, grade, location, available from, description, image placeholder upload dummy); on submit, calls farmerService.listProduce and prepends listing to Active list; tabs: Active listings / Matched buyers / Interested buyers / Offers received
- **Acceptance Criteria Addressed**: AC-3, AC-22, AC-24
- **Test Requirements**:
  - `rule` TR-6.1: Dashboard renders all 4 sections A-D with demo data; List Produce modal opens; submitting form adds a listing visible under Active listings
  - `rule` TR-6.2: Selling Recommendation shows Gross, Transport, Net computation (exact numbers visible); clicking "Sell Now" triggers offer-creation flow (linked to Task 7 workflow)
  - `rule` TR-6.3: Price Snapshot shows 3 price cards + chart; crop tabs switch data correctly

## Task 7: Direct Selling Workflow (Order + Timeline)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 6
- **Description**:
  - src/pages/farmer/OrderDetailPage.tsx (/farmer/orders/:id) — full order timeline
  - Timeline visual: 6 steps: Offer Received → Offer Accepted → Transport Assigned → Delivery Pending → Payment Pending → Completed; icons ✓/●/○; progress tracking
  - Farmer actions: Accept Offer (moves step 1→2); Progress buttons to advance demo timeline (clearly labeled "Advance Demo Status")
  - Order summary pane: Buyer, crop, qty, agreed price, gross, transport deduction, net payable
  - Farmer "Send Offer" flow from dashboard: opens Modal to submit qty + asking price → creates pending offer → toast notification + add to notifications list
  - Integrate with NotificationContext: on status advance, emit event (e.g., "Payment of ₹X expected", "Buyer accepted your lot")
  - Buyer-side counterpart: src/pages/buyer/OrderDetailPage.tsx (mirrors timeline)
- **Acceptance Criteria Addressed**: AC-6, AC-24
- **Test Requirements**:
  - `rule` TR-7.1: Starting from Offer Received status, 5 clicks/actions advance all the way to Completed (each step visibly toggles ✓/●/○); Order Timeline changes state
  - `rule` TR-7.2: Accept Offer creates a notification; 2+ different notification types fire during the workflow
  - `rule` TR-7.3: Net payable on order = agreed qty * price - transport (math visible in UI and matches actual total)

## Task 8: Price Discovery Module (/price-discovery)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/PriceDiscoveryPage.tsx accessible via Farmer nav "Market Prices"
  - FilterBar: Crop selector, Location selector, Date range, Market selector, Distance slider
  - Info cards row: Current Market Price, Nearby Avg, MSP, Price Change (%), Top Market by Demand
  - PRICE TREND chart card: tabs 7D | 30D | 90D; series toggles [Modal Price] [Min Price] [Max Price] [MSP] (checkboxes) — Recharts multi-line
  - Market arrivals bar chart: arrivals per mandi last 3 days
  - Demand indicators: high/med/low badges per mandi
  - Market comparison DataTable: columns (Market, Distance, Current Price, MSP, Arrival, Demand, Transport Cost, Estimated Net Price, Action)
  - Transport Cost = rate * distance * qty (use constants, visible computation footnote)
  - Estimated Net Price = Current Price - (Transport Cost / qty-per-quintal conversion)
  - [Compare Markets] button opens Drawer with 2 selected markets side-by-side comparison with Price + Transport + Net + Arrival + Demand
- **Acceptance Criteria Addressed**: AC-4, NFR-7
- **Test Requirements**:
  - `rule` TR-8.1: 7D/30D/90D tabs re-render chart; toggling [Modal Price] off/on adds/removes its line; all 4 series visible when all toggled on
  - `rule` TR-8.2: DataTable shows Transport Cost and Est Net Price; at least 6 rows render
  - `rule` TR-8.3: Compare Markets Drawer opens with 2 markets after user selects 2 rows and clicks button; side-by-side columns display

## Task 9: Buyer Marketplace + Buyer Profile
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/MarketplacePage.tsx (/marketplace)
  - FilterBar + SearchBar: Crop, Location, Min/Max Quantity, Price range, Quality Grade drop, Verified-only checkbox, Distance slider, Delivery date picker (demo)
  - Grid of BuyerCards: buyer name + company, verification badge, ⭐ rating, location pin, crop required, qty required, price offered, quality req, delivery date, past tx count
  - Card actions: View Details, Make Offer, Contact, Save bookmark toggle
  - src/pages/farmer/BuyerProfilePage.tsx (/buyers/:id): banner with name + verification + location + rating summary; tabs: Overview, Active Requirements, Completed Transactions, Reviews
  - Overview tab: Company, "Platform Verified" badge, Location, Rating stars + number, Completed transactions count, Payment reliability indicator (Progress bar 0-100, label "92% on-time"), Required crops chips, Quality specifications (as table: parameter, min, max, method)
  - Rating breakdown section: 4 rows Payment Reliability / Communication / Price Fairness / Transaction Experience — each with 5-star + numeric value
- **Acceptance Criteria Addressed**: AC-5
- **Test Requirements**:
  - `rule` TR-9.1: Verified-only checkbox filters to show only verified buyers (count changes); distance slider reduces results
  - `rule` TR-9.2: Buyer Profile renders all 4 tabs; Rating breakdown shows 4 rows; Payment reliability progress bar renders
  - `rule` TR-9.3: Clicking Save on marketplace card toggles bookmark state persistently in page state

## Task 10: Lot Formation Module (/lot-formation)
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4, Task 5, Task 9
- **Description**:
  - src/pages/farmer/LotFormationPage.tsx accessible via Farmer nav "Lot Formation"
  - Left column: Buyer Requirement card (pinned: the 5000 kg Wheat/Onion demand with buyer name, offered price, deadline, quality spec)
  - Progress section: Required Qty 5,000 kg, Aggregated 3,700/5,000 kg Progress bar, Remaining 1,300 kg badge
  - Middle: "Nearby eligible farmers" DataTable: columns (Farmer, Village, Distance, Crop, Available Qty, Quality Grade, Match %, Action [Add to Lot])
  - Match % column: Demo "Match Score" 92%, 88%, etc. with 6-checkmark row popover: Crop ✓, Qty ✓, Location ✓, Price ✓, Quality ✓, Delivery ✓
  - Right column: "Current Lot" preview card with selected farmer list, running total, avg quality, Lot ID placeholder
  - [Create Lot] button: when Aggregated >= Required, button enables; click generates Lot ID, finalizes; banner "Lot L-2026-0421 created successfully"
  - Post-create actions: [Invite Farmers] (sends notification to each), [Send Lot to Buyer] (updates buyer pending lots list + notification), [Arrange Transport] (links to /transport with lot pre-filled)
  - Visual lot aggregation widget: stacked horizontal bar, segments per farmer with kg labels; fill animation to 100% when complete
- **Acceptance Criteria Addressed**: AC-7, AC-24, NFR-7
- **Test Requirements**:
  - `rule` TR-10.1: Starting 3700/5000, adding 2 farmers reaches 5000+; Progress bar fills completely; Create Lot button goes disabled → enabled
  - `rule` TR-10.2: On Create Lot click, Lot ID (L-XXXX-XXXX format) displays in success banner; Current Lot panel shows it
  - `rule` TR-10.3: Match Score column opens popover with 6 checkmarks for a 92% row; clicking 3 action buttons (Invite/Send/Arrange) produces success toasts or navigations
  - `rubric` TR-10.4: Lot aggregation visual clarity; scale 1-5; threshold >= 4; anchors 1=just numbers, 3=basic table+progress, 5=stacked visual segments per farmer, clean running totals, buyer req panel clearly linked

## Task 11: Shared Transport Module (/transport) + Map integration
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/transport/TransportPage.tsx (accessible from Farmer nav "Transport" and Transport Provider nav "Requests")
  - Farmer subview: "Post Transport Requirement" form in Drawer/Modal: Crop, Qty, Pickup location, Destination mandi/buyer, Preferred date, Vehicle requirement (mini/truck/10T); submit calls transportService.postTransportRequest
  - Transport provider subview (role=transport): "Nearby requests" list within radius; TransportCards: Distance, Pickup, Destination, Crop, Qty, Vehicle type, Expected earnings, Farmers joining, Action [Accept], [Add to Combine]
  - Combine panel: selected requests, Vehicle capacity picker (5000 kg default), running total kg, Remaining kg badge, "3,600 / 5,000 kg" Progress visualizer
  - [Accept Request] per card: updates card status to Accepted; [Combine Requests] on multi-selection: creates combined trip card with trip ID
  - Map integration (central task 11 as well): src/components/ui/InteractiveMap.tsx using React Leaflet; markers layerable by type (farmer/buyer/mandi/fpo/warehouse/transport); marker icons differ by Lucide icon wrapper with different color backgrounds; clicking opens Popup: Name, Distance, Price/Demand info, Action button (e.g., View / Make Offer / Reserve)
  - [View Route] button: on map, draws polyline between pickup → waypoints → destination; displays total km and ETA demo
  - Map filters overlay: checkboxes per marker type, "Find Near Me" button (recenter to demo farmer location), search box
- **Acceptance Criteria Addressed**: AC-8, AC-9, AC-24
- **Test Requirements**:
  - `rule` TR-11.1: Transport provider view with 3 sample requests; select all 3 and Combine Requests: panel total = sum; Remaining = cap - sum; values match (3600/5000 exact scenario)
  - `rule` TR-11.2: Accept Request changes card status; route view renders polyline between points
  - `rule` TR-11.3: Map renders at least 4 marker types simultaneously with unique colors/icons; popup shows Name/Distance/Action; filter toggles hide/show per type
  - `rubric` TR-11.4: Map UX + transport combine visualization; scale 1-5; threshold >= 4; evidence screenshot with markers, popup, combine panel

## Task 12: FPO Module (/fpo) + FPO dashboard basics
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5, Task 11
- **Description**:
  - src/pages/fpo/FPODashboardPage.tsx (FPO role entry): 6 metrics (Total Members, Total Produce (qty), Active Lots, Buyer Requests, Pending Orders, Revenue (last 30d))
  - Sections: Members list (DataTable), Produce summary (stacked bar by crop), Active Lots (LotCards), Buyer Requests (DemandCards), Transport links, Market Prices widget, Reports placeholder
  - src/pages/fpo/FPONetworkPage.tsx: "FPO Network" list of nearby FPOs; FPO profile via Drawer: Name, Location, Members count, Crops handled (chips), Available quantity, Active buyers list, Contact details
  - "Aggregate Produce" action on dashboard: pre-fills lot-formation view with FPO members (reuses Lot Formation logic via navigate and context)
- **Acceptance Criteria Addressed**: AC-10, AC-23
- **Test Requirements**:
  - `rule` TR-12.1: FPO Dashboard shows 6 metric cards; Members and Produce sections render
  - `rule` TR-12.2: FPO Network lists >= 4 FPO cards; profile drawer opens with all fields
  - `rule` TR-12.3: Aggregate Produce CTA navigates to /lot-formation with pre-filled member farmer list

## Task 13: Storage Module (/storage) + Sell-Now-vs-Store comparison
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/StoragePage.tsx (Farmer nav "Storage")
  - Warehouse cards grid: Name, Type badge (Cold / Dry / Both), Total Capacity MT, Available MT, Distance km, Price ₹/MT/day, Facilities chips (24/7 Security, Fumigation, Pest Control, Cold Chain, Insurance), Contact phone/address; actions [View], [Reserve]
  - FilterBar: Warehouse Type, Max Distance, Min Available Capacity, Price range
  - "Store & Sell Later" decision section: two-column side-by-side card:
    - LEFT "SELL NOW": Sell at today's market price, transport cost, net, timeline "Paid in 3 days"
    - RIGHT "STORE & SELL LATER": Storage duration 30 days, storage cost = price/day * qty * days, projected future price (↑ X% demo), transport cost same, net, timeline "Paid in 33 days"; ASSUMPTIONS footnote listing each variable
    - Difference Δ highlighted
  - [Reserve] action: opens modal for date + qty → success toast + notification
- **Acceptance Criteria Addressed**: AC-11
- **Test Requirements**:
  - `rule` TR-13.1: Storage cards render >= 4 entries with differing types and facilities
  - `rule` TR-13.2: Store & Sell Later panel shows both columns with all 4 listed elements; ASSUMPTIONS list present
  - `rule` TR-13.3: Net values for both columns are computed (gross - transport - storage(if right)); math visible

## Task 14: MSP Module + Government Schemes Module (/schemes)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - MSP section: accessible from Farmer dashboard MSP StatCard click or sidebar MSP: src/pages/farmer/MSPPage.tsx
  - MSP table: columns Crop, Variety, Season, Sample MSP (₹/q), Current Market Price (₹/q), Difference ₹/q + % badge (green if market > MSP, red otherwise), Market name; banner "Sample/Demo MSP values. For official rates, refer to Government of India sources."
  - MSP vs Market comparison grouped bar chart (Recharts) for 7 crops
  - src/pages/farmer/SchemesPage.tsx (/schemes): grid of scheme cards with official-looking but clearly demo content
  - Scheme card fields: Scheme name, Ministry/Dept badge, Description paragraph, Eligibility bullets, Benefits bullets, Official source placeholder link, Deadline if any; banner "Sample scheme entries. Verify details with official sources."
  - [View Details] → Drawer with full scheme text and "Apply via Official Portal" external link icon button (no actual navigation)
- **Acceptance Criteria Addressed**: AC-16 (MSP/schemes), NFR-8
- **Test Requirements**:
  - `rule` TR-14.1: MSP table includes 7 crops; Sample MSP disclaimer banner visible at top; Difference chips colored green/red appropriately
  - `rule` TR-14.2: Schemes page shows >= 5 scheme cards; all have Eligibility + Benefits sections; View Details opens Drawer
  - `rule` TR-14.3: "Official source" disclaimer is visible on schemes page + MSP page

## Task 15: Payment Tracking (/payments) + Notifications Center
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/PaymentsPage.tsx (/payments): Tabs: Pending Payments | Processing | Completed | Expected; each tab renders DataTable
  - DataTable columns: Transaction ID, Buyer (with mini avatar), Crop, Quantity (q/MT), Amount (₹), Status Badge, Expected Date, Action [View Invoice]
  - Statuses: Pending (amber) / Processing (blue) / Paid (green) / Delayed (red)
  - Summary row: Total Pending ₹X, Total Due this week ₹Y
  - Notification Center: Top bell icon opens Drawer; grouped by type: Orders / Payments / Price / Lots / Transport / FPO / Storage; list of NotificationItems (icon, title, message, time ago, read/unread dot); "Mark all as read", "View All"
  - Notification types covered per section 20: new buyer interest, price change alert, new demand, lot formation invite, transport match, order confirmation, payment received, payment delay, storage availability, FPO invitation
- **Acceptance Criteria Addressed**: AC-10 (wait — AC-10 actually = payments; correct), NFR-14 (AC-10 /payments)
- **Test Requirements**:
  - `rule` TR-15.1: /payments Tabs render correctly; each tab shows at least 2 rows (seed demo data); all 4 status colors unique and match specification
  - `rule` TR-15.2: Clicking bell opens Drawer with >= 6 different notification types (across categories listed); Unread dot visible on new items; Mark all as read removes unread dots
  - `rule` TR-15.3: Triggering a new order/payment status change in task 7 adds an entry to Notification center (cross-task integration check)

## Task 16: AI Assistant (/ai-assistant)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5
- **Description**:
  - src/pages/farmer/AIAssistantPage.tsx (/ai-assistant)
  - Chat-like layout: top disclaimer "ShetiMitra Demo Assistant - uses sample market data. For critical decisions, consult official sources."
  - Left/right bubbles (assistant left, user right); input field + send button
  - Chips row of example questions (6): Where should I sell my onion?, Which market has best price nearby?, Should I sell now or wait?, Find buyers for my crop, How to reduce transport cost?, What is today's MSP?
  - Implement via aiService: detect keywords in user input, return structured response { summary, options: [{name, price, distance, transport, net, reason}] }
  - Render structured responses with numbered cards, net realisation per option, small "Why recommended" line
  - "Clear chat" button, typing indicator (1s delay)
- **Acceptance Criteria Addressed**: AC-11
- **Test Requirements**:
  - `rule` TR-16.1: Clicking first chip "Where should I sell my onion?" yields >= 3 options with Price/Distance/Transport/Net; Net = Price*qty - Transport math is correct (using sample qty = 10q or demo context qty)
  - `rule` TR-16.2: Clicking all 6 chips yields non-empty, non-repeating responses; Demo disclaimer always visible
  - `rule` TR-16.3: Typing custom question e.g. "MSP for wheat" triggers keyword match with structured answer

## Task 17: Buyer Dashboard + Transport Provider Dashboard (secondary roles)
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 3, Task 4, Task 5, Task 9, Task 7
- **Description**:
  - src/pages/buyer/BuyerDashboardPage.tsx: Metrics: Active Requirements, Received Offers, Pending Orders, Paid this month, Top Crops bar chart, Recent Offers DataTable
  - src/pages/buyer/FindProducePage.tsx: Filters + Farmer produce listings grid; View listing detail; [Place Offer] button opens modal (price, qty, delivery date) → creates BuyerOffer → notifies farmer
  - src/pages/buyer/PostDemandPage.tsx: Form: crop, qty required, quality grade, offered price range, delivery location, deadline, description → posts to buyerService
  - src/pages/buyer/OrdersPage.tsx: Order list + link to buyer OrderDetailPage (reuses Task 7)
  - Transport Provider: src/pages/transport/TransportDashboardPage.tsx: metrics (Available vehicles, Active trips, Pending requests, Earnings today), Transport Requests list (reuses Task 11 provider subview), Routes tab, Active Trips (with map widget center), Earnings bar chart
  - Ensure sidebars for Buyer and Transport roles fully match section 24 navigation lists
- **Acceptance Criteria Addressed**: AC-2 (partial fullfillment), AC-23
- **Test Requirements**:
  - `rule` TR-17.1: Buyer dashboard loads with 5 metrics; Post Demand form adds new row to "Active Requirements"
  - `rule` TR-17.2: Transport Dashboard metrics + Active Trips render; Routes tab shows trip list with distance/ETA
  - `rule` TR-17.3: Buyer can place offer from Find Produce; offer placed creates toast + notification for farmer

## Task 18: Landing page polish + Demo Mode orchestration
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5, Task 6-17 basics
- **Description**:
  - Polish LandingPage (/):
    - Hero: "Sell Smarter. Connect Directly. Earn Better." + tagline + 2 CTAs "Start Selling" (→ role selector EntryPage) / "Explore Market Prices" (→ price-discovery with demo farmer guest view)
    - WHY SHETIMITRA: 8 feature cards with Lucide icons + titles (Better Price Discovery, Direct Buyer Connection, Shared Transport, Lot Formation, FPO Network, Storage Options, Payment Tracking, AI Support)
    - HOW IT WORKS: 8-step connected visual flow (Farmer → List Produce → Compare Prices → Find Buyer → Aggregate if Needed → Arrange Transport → Sell → Track Payment) with arrowed steps
    - Stats bar (crops, farmers, buyers, markets demo counters)
    - Testimonial cards (2-3 farmer/buyer)
    - Footer with tagline, problem statement ID SIH26132 attribution, SIH badge placeholder
  - Demo Mode orchestration helpers: src/utils/demoJourney.ts with seedDemoJourney() function; "Start Demo Journey" banner that appears on Farmer dashboard; click steps auto-navigate or highlight next recommended action with tooltip "Next: Check onion market prices →"
  - Add footer "Demo Prototype for Smart India Hackathon 2026 • SIH26132" to every page
- **Acceptance Criteria Addressed**: AC-13 (demo journey seed data), AC-24
- **Test Requirements**:
  - `rule` TR-18.1: Landing page renders Hero, 8 feature cards, 8-step How it works, Stats, Testimonials, Footer; CTAs route correctly
  - `rule` TR-18.2: Starting at EntryPage → selecting Farmer → clicking "Start Demo Journey" → all 17 steps from section 33 are reachable via in-app navigation without broken routes
  - `rubric` TR-18.3: Landing page visual quality; scale 1-5; threshold >= 4; anchors 1=plain text, 3=basic sections, 5=hero w/ illustration-like gradient/crop motif, 8 features and flow look professional, typography hierarchy clear

## Task 19: Responsive design, accessibility, i18n deep pass
- **Status**: `pending`
- **Priority**: medium
- **Depends On**: Task 5-18
- **Description**:
  - Mobile (< 640px): sidebar collapses to hamburger → Slide over Drawer nav; top bar logo compacts; metric cards stack 1-col; tables get wrapper overflow-x-auto; forms single column; chart containers responsive min-h
  - Tablet (640-1024): 2-col grids
  - Desktop: multi-col as designed
  - Accessibility pass: add aria-labels on icon-only buttons; focus ring styles; semantic <nav> <main> <aside> <section> <header>; proper <label> for inputs; alt text on any images; Tooltip component aria; keyboard-navigable tabs/modals (Esc closes, Tab order logical)
  - i18n: Audit top 50 critical strings across navigation + landing + farmer dashboard metrics; ensure keys exist and Hindi/Marathi translations for at least navigation (30+ keys, Hindi/Marathi provided)
- **Acceptance Criteria Addressed**: AC-14, NFR-2, NFR-3
- **Test Requirements**:
  - `rule` TR-19.1: At widths 390px (iPhone 12 Pro), 768px (iPad), 1440px: no horizontal scroll on dashboard/price-discovery pages (except table overflow within wrapper); nav collapses to drawer on 390px
  - `rule` TR-19.2: Tab-navigating farmer dashboard reaches all 3 section CTAs (Sell Now, View Requirement, List Produce) in logical order; Esc closes open Modal/Drawer
  - `rule` TR-19.3: Switch language to हिन्दी → navigation items and 10+ dashboard labels display Hindi; fallback preserves untranslated

## Task 20: Final QA, build fixes, console-error sweep, demo journey dry run
- **Status**: `pending`
- **Priority**: high
- **Depends On**: Task 1-19
- **Description**:
  - Run npm run build; fix all TS/import/build errors
  - Run npm run dev; walk each page; fix broken links / missing imports
  - Console error sweep: open DevTools Console through full demo journey; resolve every red error; minimize warnings (no React key warnings, no unknown prop warnings, no Leaflet tile errors)
  - Dry-run Section 33 Demo Journey: 17 steps, checklist pass
  - Responsive screenshots at 1440/768/390 for spec evidence
  - Add README.md note for running: `npm install && npm run dev` (keep minimal per instruction; only if necessary — instruction says not to proactively create docs unless explicitly requested. We will skip and only add package.json scripts section which is required.)
- **Acceptance Criteria Addressed**: AC-1, AC-13, AC-15, AC-17
- **Test Requirements**:
  - `rule` TR-20.1: `npm run build` exits 0; DevTools console on 8 major pages (landing, farmer dashboard, price-discovery, marketplace, lot-formation, transport, payments, ai-assistant) shows 0 red errors after full load
  - `rule` TR-20.2: Full demo journey dry-run (17 steps section 33) passes with screenshot/video evidence for each step
  - `rule` TR-20.3: All navigation sidebar links (across all 4 roles) go to valid routes; zero "404-like" blank page results
  - `rubric` TR-20.4: Product coherence; scale 1-5; anchors 1=pages disconnected, 3=navigation links work but no cross-page data, 5=every major feature connects to another (Price → Buyer → Lot → Transport → Order → Payment) with data continuity (qty, crop, buyer flow from page to page); threshold >= 4
