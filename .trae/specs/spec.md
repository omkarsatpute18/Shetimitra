# ShetiMitra - Product Requirements Document

## Overview
- **Summary**: A comprehensive farmer-centric agricultural market linkage platform that connects Farmers, Buyers, Markets, FPOs, Transport, and Storage — with price discovery, direct selling, lot formation, shared transport, and payment tracking. Built as a Smart India Hackathon 2026 (SIH26132) demonstration prototype.
- **Purpose**: Solve the problem statement "Strengthening market linkages and price discovery for farmers" by providing an integrated platform that helps farmers make better selling decisions through transparent price information, buyer matching, aggregation, logistics, and payment assurance.
- **Target Users**:
  - Primary: Farmers (smallholder to medium-scale)
  - Secondary: Buyers/Merchants, FPOs (Farmer Producer Organizations), Transport Providers
  - Demo: Judges, evaluators, stakeholders

## Goals
1. Build a convincing, polished, interactive prototype that demonstrates the COMPLETE ShetiMitra ecosystem for SIH 2026 evaluation.
2. Enable farmers to discover better prices by comparing market prices, MSP, and buyer offers across multiple locations.
3. Connect farmers directly to verified buyers with transparent demand, quality, and pricing information.
4. Enable lot formation so farmers with small quantities can aggregate produce to meet large buyer requirements.
5. Reduce transportation costs through shared transport matching and route optimization.
6. Integrate FPO network, storage options, MSP information, government schemes, and payment tracking into one cohesive platform.
7. Provide a role-switching demo mode (Farmer / Buyer / FPO / Transport Provider) so judges can experience the full ecosystem.
8. Implement the complete end-to-end demo journey: Farmer login → Price check → Buyer discovery → Lot formation → Transport → Order → Payment → Notification.
9. Design for farmer-friendliness: clear labels, icons+text, simple terminology, large controls, multi-language architecture.

## Non-Goals
1. Production deployment, actual backend integration, or real API connections (all data is demo/mock with clearly labeled abstractions for future API replacement).
2. Real AI/ML model integration (AI assistant uses structured mock responses, clearly labeled as Demo mode).
3. Actual payment gateway, government database, or live market feed connections.
4. Real-world user verification or KYC; demo uses "Platform Verified" / "Demo Verified" badges.
5. Native mobile apps (responsive web only).
6. Blockchain or any technology not directly required to demonstrate the core value proposition.
7. Administrative backend beyond a simple optional Admin role placeholder.

## Background & Context
- Problem Statement ID: SIH26132 — "Strengthening market linkages and price discovery for farmers"
- Theme: Agriculture, FoodTech & Rural Development
- Project state: Greenfield — empty repository. Building from scratch using React + Vite + TypeScript + Tailwind CSS + Recharts + React Router.
- Product tagline: "Smart Market Linkage for Better Farm Value" / "From Farm to Market, Smarter."
- Core value: ShetiMitra is NOT just a mandi price website. It connects the COMPLETE chain: PRICE + DEMAND + BUYER + FARMER + FPO + LOT FORMATION + TRANSPORT + STORAGE + PAYMENT.

## Functional Requirements
- **FR-1: Role System & Demo Login**: Role selector with Farmer / Buyer / FPO / Transport Provider; role-switchable demo login; dashboard and navigation change per role.
- **FR-2: Landing / Home Page**: Hero section, Why ShetiMitra (8 features), How it works (8-step visual flow), CTAs.
- **FR-3: Farmer Dashboard**: Welcome card + location/weather/notifications; 6 metric cards; Price Snapshot with trend chart; Selling Recommendation with transparent calculation; Buyer Demand cards; My Produce listing + List Produce form.
- **FR-4: Price Discovery Module (/price-discovery)**: Crop/location/market/date filters; current/nearby/MSP prices; price trend chart (7/30/90 days, modal/min/max/MSP); market arrivals; market comparison table with net realisation; Compare Markets action.
- **FR-5: Buyer Marketplace (/marketplace)**: Multi-filter search (crop, location, quantity, price, quality, verified, distance, delivery); buyer cards with verification/rating/quantity/price/quality/deadline; actions (View/Make Offer/Contact/Save); buyer profile with ratings breakdown.
- **FR-6: Direct Selling Workflow**: Farmer lists crop → buyer discovers → buyer places offer → farmer accepts → order created with timeline (Offer Received → Accepted → Transport Assigned → Delivery → Payment → Completed); status progression demo.
- **FR-7: Lot Formation (/lot-formation)**: Buyer requirement card; nearby eligible farmer list; quantity aggregation visualizer; progress bar (aggregated vs required); Lot ID/details generation; Invite Farmers, Send Lot to Buyer, Arrange Transport actions.
- **FR-8: Shared Transport (/transport)**: Farmer posts transport requirement (crop/qty/pickup/destination/date/vehicle); transport provider views nearby requests with distance/pickup/destination/qty/capacity/earnings/#farmers; combine multiple requests; capacity visualizer; Accept Request / Combine Requests / View Route.
- **FR-9: Map / Location Matching**: Interactive map (Leaflet) with markers for Farmers, Buyers, Mandis, FPOs, Warehouses, Transport; "Find Near Me"; filters; marker detail popups.
- **FR-10: FPO Module (/fpo)**: FPO dashboard metrics (members/produce/lots/requests/orders/revenue); FPO Network list; FPO profile with members/crops/quantity/active buyers.
- **FR-11: Storage Module (/storage)**: Warehouse/Cold Storage list (capacity/available/distance/price/facilities/contact); Reserve action; "Store & Sell Later" comparison vs Sell Now with assumptions.
- **FR-12: MSP Module**: MSP table (crop/MSP/market price/difference/market/season); clear comparison.
- **FR-13: Government Schemes (/schemes)**: Scheme cards with name/description/eligibility/benefits/source/deadline; clearly labeled demo entries; View Details.
- **FR-14: Payment Tracking (/payments)**: Pending/Completed/Expected tabs; DataTable (transaction ID/buyer/crop/qty/amount/status/expected date); statuses (Pending/Processing/Paid/Delayed).
- **FR-15: AI Assistant (/ai-assistant)**: Chat-style interface; suggested question chips; structured responses with net realisation calculations; clearly labeled as Demo mode (no real LLM).
- **FR-16: Notifications**: Notification center with badges; types: buyer interest, price change, demand, lot invite, transport match, order confirmation, payment received/delayed, storage, FPO invite.
- **FR-17: Multi-language Architecture**: i18n setup with English / हिन्दी / मराठी; language selector; centralized translation keys (not every page manually translated; structure in place).
- **FR-18: Farmer-Friendly UX**: Icons+text buttons, large readable controls, simple terminology ("Compare Market Prices" not "Market Arbitrage Analytics", "Find Shared Transport" not "Logistics Optimization"), short workflows, clear confirmations.
- **FR-19: Navigation / Sidebar**: Role-specific sidebar nav (Farmer/Buyer/FPO/Transport menus per section 24); mobile navigation.
- **FR-20: Data Visualization Charts**: Price trend, Market comparison, Demand vs supply, Farmer produce aggregation, Transport utilization, Payment status, FPO produce, Transaction trends (each chart communicates useful info, not decoration).
- **FR-21: Reusable UI Component Library**: Button, Card, StatCard, PriceCard, BuyerCard, FarmerCard, MarketCard, DemandCard, LotCard, TransportCard, StorageCard, PaymentCard, NotificationItem, ChartCard, MapCard, StatusBadge, VerificationBadge, Rating, Modal, Drawer, DataTable, FilterBar, SearchBar, EmptyState, LoadingState.
- **FR-22: Centralized Demo Data & Service Abstraction**: All mock data centralized; service layer (marketService, buyerService, farmerService, transportService, fpoService, storageService, paymentService, aiService) so mock data can be swapped for real APIs; TypeScript interfaces for all domain types (Farmer, Buyer, FPO, TransportProvider, Crop, ProduceListing, BuyerDemand, Market, PriceRecord, Lot, TransportRequest, Warehouse, Order, Payment, GovernmentScheme, Notification).
- **FR-23: Buyers Dashboard, FPO Dashboard, Transport Provider Dashboard**: Role-specific secondary dashboards beyond Farmer.
- **FR-24: Demo Mode & Journey**: Complete demonstrable journey (section 33): Login as Farmer → dashboard → onion prices → compare markets → find buyer → view buyer profile → insufficient qty → lot formation → aggregate farmers → create lot → send to buyer → transport → shared transport found → route → order → payment → notification.
- **FR-25: States**: Loading, Empty, Error, Success states for every major feature; no blank screens.

## Non-Functional Requirements
- **NFR-1: Visual Quality**: Professional, premium, trustworthy agricultural-tech look; combination of fintech dashboard + professional marketplace + agritech + public-service accessibility. Green primary, earth accents, light surfaces, readable text, subtle borders, moderate shadows, excellent spacing.
- **NFR-2: Responsive**: Works on desktop, laptop, tablet, mobile. Mobile: sidebar becomes nav, cards stack, tables horizontally scrollable, charts resize, forms single-column, CTAs accessible.
- **NFR-3: Accessibility**: Semantic HTML, keyboard navigation, proper labels, focus states, good contrast, accessible buttons/forms, tooltips, alt text.
- **NFR-4: Performance & Build**: Zero build errors, zero TypeScript errors, zero console runtime errors on all major pages and workflows.
- **NFR-5: Security Architecture**: Role-based access structure; protected route placeholders; authentication-ready structure; no secrets in source.
- **NFR-6: Coherence**: Features connect (Price Discovery → Buyer Matching → Lot Formation → Transport → Order → Payment). Not a collection of unrelated pages.
- **NFR-7: Match Score & Net Realisation Transparency**: Demo Match Score % (Crop/Qty/Location/Price/Quality/Delivery) with checkmarks; Net Realisation = Gross - Transport - Storage - Other with visible math.
- **NFR-8: No Fake Claims**: Clearly label "Demo", "Demo Verified", "Sample Data", "Platform Verified". Never claim live API, AI, gov DB, payment gateway, or verification is actually connected.

## Constraints
- **Technical**: React SPA (Vite + TypeScript), Tailwind CSS for styling, Recharts for charts, React Leaflet for maps, Lucide React for icons, React Router v6, i18next for i18n. No backend. All data is mock, centralized.
- **Business**: SIH 2026 hackathon timeline; demo-ready product; no real user data.
- **Dependencies**: npm registry must be available to install React, Vite, Tailwind, Recharts, React Leaflet, React Router, Lucide React, i18next, clsx, tailwind-merge, class-variance-authority (or equivalent simple utility).

## Assumptions
1. No existing code; building greenfield with Vite React TypeScript template.
2. npm/node are available on the Windows environment.
3. Judges will interact via desktop/laptop browser; mobile responsiveness still required but demo is desktop-first.
4. Demo crop data: Onion, Tomato, Wheat, Soybean, Cotton, Rice, Maize with realistic but clearly sample prices.
5. MSP values are labeled as "Sample MSP (Demo)" — not claimed as current official values.
6. Government scheme entries are sample placeholders clearly marked.
7. AI assistant uses pre-scripted structured responses based on keywords/question templates.
8. Map uses OpenStreetMap tiles via Leaflet without custom mapbox keys.

## Acceptance Criteria

### AC-1: Project builds and runs with zero errors
- **Type**: `rule`
- **Given**: A fresh checkout with dependencies installed
- **When**: `npm run build` is executed
- **Then**: Build completes successfully with exit code 0, no TypeScript errors, no missing imports
- **Pass Condition**: `npm run build` exits 0 and `npm run dev` serves the app on a port with no console errors on initial page load
- **Evidence**: Build command output screenshot/log; dev server console screenshot with zero errors

### AC-2: Role selector & demo login works for 4 personas
- **Type**: `rule`
- **Given**: User lands on the entry point
- **When**: User selects Farmer / Buyer / FPO / Transport Provider
- **Then**: Dashboard loads with role-specific greeting, navigation sidebar shows role-appropriate menu items, and role-switching (via profile or demo selector) updates the view without page reload
- **Pass Condition**: All 4 roles load distinct dashboards and nav menus; each can be switched within the app
- **Evidence**: Screenshots of all 4 dashboards and nav menus; screen recording of role switch

### AC-3: Farmer dashboard contains all required sections
- **Type**: `rule`
- **Given**: User logged in as Farmer
- **When**: Farmer dashboard page is viewed
- **Then**: All visible: Welcome card (name/village/weather/notif/profile), 6 metric cards (Listed Produce, Active Buyer Requests, Best Price, MSP, Pending Payments, Active Transport), Price Snapshot (crop/market/MSP/distance + trend chart), Selling Recommendation (Buyer/Demand/Price/Distance/Transport/Net + View/Sell/Compare), Buyer Demand cards (Buyer/Crop/Qty/Quality/Price/Location/Deadline/Verified/Rating + View Requirement/Send Offer/Contact), My Produce section (+ List Produce form that on submit adds active listing row)
- **Pass Condition**: Each section renders with data; List Produce form submit creates a listing visible in Active listings
- **Evidence**: Full dashboard screenshot; form submission recording

### AC-4: Price Discovery module (/price-discovery) fully interactive
- **Type**: `rule`
- **Given**: User navigates to /price-discovery
- **When**: User selects crop, toggles 7/30/90-day tabs, toggles modal/min/max/MSP series, uses market selector, clicks Compare Markets
- **Then**: Chart updates with correct period and series; table shows Market/Distance/Current Price/MSP/Arrival/Demand/Transport Cost/Estimated Net Price/Action; Net Price visibly = Price - Transport
- **Pass Condition**: Chart re-renders on tab/series toggle; Compare Markets triggers comparison view/modal with 2+ markets side-by-side
- **Evidence**: Chart toggle recording; comparison view screenshot

### AC-5: Buyer Marketplace + Buyer Profile with ratings
- **Type**: `rule`
- **Given**: /marketplace loaded
- **When**: Filters are applied (e.g. Verified only, Crop=Onion), buyer card "View Details" clicked
- **Then**: Cards update per filter; profile page shows company, verification status, location, 5-star rating, completed transactions, active requirements, payment reliability, required crops, quality specs, rating breakdown (Payment/Communication/Price Fairness/Experience)
- **Pass Condition**: Filter reduces list to matching buyers; profile page loads all sections; ratings display with stars and breakdown numbers
- **Evidence**: Filtered marketplace screenshot + buyer profile screenshot

### AC-6: Direct Selling workflow with order timeline progression
- **Type**: `rule`
- **Given**: Farmer has at least one listing and a buyer offer exists
- **When**: Farmer clicks "Accept Offer" then triggers next status steps via demo progress buttons
- **Then**: Order timeline progresses: Offer Received (✓) → Accepted (✓) → Transport Assigned (✓) → Delivery Pending (●) → Payment Pending (○) → Completed (○); each step advances on action; all steps reachable end-to-end
- **Pass Condition**: Starting from Offer Received, user can progress timeline to Completed in 5+ discrete steps with visible state changes
- **Evidence**: Screen recording of timeline progression through all 6 states

### AC-7: Lot Formation with aggregation and 3 key actions
- **Type**: `rule`
- **Given**: Buyer requires 5000 kg; 5 nearby farmers have 800+1200+1000+900+1100 kg
- **When**: Farmer navigates to /lot-formation, selects farmers, clicks Create Lot
- **Then**: Lot is generated with Lot ID, crop, total qty (5000 kg), participating farmers list, avg quality, target buyer, target price, pickup, logistics; progress bar fills 3700/5000 → 5000/5000; Invite Farmers / Send Lot to Buyer / Arrange Transport buttons fire and show success toast/confirmation
- **Pass Condition**: Progress bar updates as farmers added; Lot ID displayed; all 3 buttons have visible outcomes
- **Evidence**: Before/after aggregation screenshots; 3 action confirmations shown

### AC-8: Shared Transport module with request combining and capacity
- **Type**: `rule`
- **Given**: Transport provider role with vehicle capacity 5000 kg; 3 nearby farmer requests (1200+1500+900 kg)
- **When**: Provider clicks "Combine Requests" on the 3 requests
- **Then**: Total shows 3600/5000 kg, Remaining 1400 kg; Accept Request marks status accepted; View Route shows route on map/list
- **Pass Condition**: Total / Remaining update correctly; Accept changes status; Route view opens
- **Evidence**: Capacity visualizer screenshot; acceptance confirmation; route view

### AC-9: Interactive map with 6 marker types and filters
- **Type**: `rule`
- **Given**: Map page loaded
- **When**: User toggles Buyer/Market/FPO/Warehouse/Transport filter checkboxes; clicks a marker; clicks "Find Near Me"
- **Then**: Only selected marker types show; marker popup shows Name/Distance/Price-or-Demand/Contact/Action; map recenters on demo farmer location
- **Pass Condition**: Filtering hides/show markers of each type correctly; popups display all fields; Find Near Me triggers recenter
- **Evidence**: Screenshot of map with multiple marker types and one popup open

### AC-10: Payments page with status tabs and statuses
- **Type**: `rule`
- **Given**: /payments loaded
- **When**: User clicks Pending / Processing / Paid / Delayed status tabs or filters
- **Then**: Table rows filter to matching status; each row displays Transaction ID, Buyer, Crop, Quantity, Amount, Status badge, Expected Date
- **Pass Condition**: All 4 status badges render; tab switching works; badge colors differ by status
- **Evidence**: Payments screenshot showing 4 statuses

### AC-11: AI Assistant responds to 6 example questions with structured data
- **Type**: `rule`
- **Given**: /ai-assistant loaded
- **When**: User asks (via chip or type) "Where should I sell my onion?", "best price market", "sell now or wait", "find buyers", "reduce transport cost", "today's MSP"
- **Then**: Each response is structured (not a paragraph) with ranked options (1/2/3) containing Price, Distance, Transport, Net Realisation; clearly marked "Demo Assistant - structured sample responses"
- **Pass Condition**: All 6 example prompts yield structured non-empty responses; Demo disclaimer is visible
- **Evidence**: Chat screenshot with 2+ responses shown

### AC-12: Centralized demo data + service layer + TypeScript interfaces
- **Type**: `rule`
- **Given**: Source code of project
- **When**: Reviewing directory structure
- **Then**: `src/data/` contains centralized demo data; `src/services/` contains {market, buyer, farmer, transport, fpo, storage, payment, ai}Service.ts (each exports functions returning typed data, not direct objects); `src/types/` contains TypeScript interfaces for at least: Farmer, Buyer, FPO, TransportProvider, Crop, ProduceListing, BuyerDemand, Market, PriceRecord, Lot, TransportRequest, Warehouse, Order, Payment, GovernmentScheme, Notification
- **Pass Condition**: All 8 service files and at least 16 type interfaces exist; components import from services not raw data files
- **Evidence**: File tree screenshot; grep of imports in 3 components showing service layer usage

### AC-13: Complete end-to-end SIH demo journey is demonstrable
- **Type**: `rule`
- **Given**: Demo mode with seeded data
- **When**: Judge walks through: (1) Demo as Farmer → (2) dashboard → (3) onion prices → (4) compare markets → (5) buyer found → (6) buyer profile/rating → (7) qty insufficient → (8) Lot Formation → (9) aggregate farmers → (10) lot reaches 5000 → (11) create + send lot to buyer → (12) Transport → (13) shared found → (14) route on map → (15) order created → (16) payment status → (17) notification appears
- **Then**: Every step has a visible page/action/outcome. No dead ends. All navigation links work between steps.
- **Pass Condition**: Continuous walkthrough recording completes all 17 steps without broken links or blank pages
- **Evidence**: End-to-end walkthrough recording; checklist marking each step pass

### AC-14: Responsive design (desktop/tablet/mobile)
- **Type**: `rubric`
- **Dimension**: Responsive layout fidelity across breakpoints
- **Scale**: 1-5
- **Anchors**: 1 = broken on mobile; 3 = desktop works, mobile scrollable but cramped; 5 = desktop, tablet, and mobile each have optimized layouts (sidebar collapses to hamburger on mobile, cards stack, tables horizontal scroll, forms single column, CTAs sticky or accessible)
- **Pass Threshold**: >= 4
- **Evidence**: Screenshots at 1440px, 768px, 390px widths of dashboard, lot formation, and payments pages

### AC-15: Visual quality and design coherence
- **Type**: `rubric`
- **Dimension**: Professional agritech-fintech marketplace look, brand consistency, and feature interconnectivity feel
- **Scale**: 1-5
- **Anchors**: 1 = generic template look, disconnected pages; 3 = clean but ordinary CRUD dashboard, moderate consistency; 5 = credible startup/public-sector product, consistent green+earth palette, reusable components, clear visual hierarchy, every page feels part of one connected product (not siloed), professional charts, professional spacing/shadows/borders
- **Pass Threshold**: >= 4
- **Evidence**: Full-page screenshots of landing, farmer dashboard, price discovery, lot formation, transport, payments pages

### AC-16: No fake claims and correct demo labeling
- **Type**: `rule`
- **Given**: Any page of the app
- **When**: User inspects verification badges, MSP values, AI assistant, schemes, and any data/live-status claims
- **Then**: All demo-only artifacts are labeled ("Demo", "Sample Data", "Platform Verified", "Demo Verified", "Demo Assistant - Sample responses") where appropriate; no statement implies a real live API, LLM, gov DB, payment gateway, or KYC verification is connected
- **Pass Condition**: Grep/source review finds zero unqualified claims of live connectivity; every badge/disclaimer is visible where needed
- **Evidence**: Screenshots of badges + disclaimer text on AI and MSP pages; grep log for absence of words implying live services (or presence of disclaimer wording)

### AC-17: Loading, Empty, Error, Success states on major features
- **Type**: `rule`
- **Given**: Any major feature page (price-discovery, marketplace, lot-formation, transport, payments, ai-assistant)
- **When**: Feature is loading, returns no data, encounters error, or completes action
- **Then**: Appropriate state component renders: skeleton/loading card; empty state illustration/text + suggestion (e.g. "Try expanding radius"); error state with retry CTA; success toast/banner after form submit / order / payment / notification
- **Pass Condition**: At least 3 major pages visibly have loading/empty AND at least one success state demonstrable
- **Evidence**: Screenshots of loading, empty, and success states from 2+ features

## Open Questions
- [ ] Should we include the optional Admin role navigation placeholder, or defer to post-hackathon? (Plan: include placeholder link only)
- [ ] Is Leaflet map rendering acceptable without an API key (uses OSM tiles)? (Plan: yes — standard OSM)
- [ ] How deep should i18n translations go? (Plan: framework + keys + ~20 critical labels translated across the 3 languages, remaining use English fallback with keys ready)
