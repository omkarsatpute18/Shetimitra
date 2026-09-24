import { markets } from '@/data/markets';
import { buyers } from '@/data/buyers';
import { warehouses } from '@/data/warehouses';
import { fpos } from '@/data/fpos';
import { crops } from '@/data/crops';
import { transportProviders } from '@/data/transportProviders';

function delay<T>(value: T): Promise<T> {
  const ms = 20 + Math.random() * 80;
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

const TRANSPORT_RATE = 0.85;
const DISCLAIMER =
  'ShetiMitra Demo Assistant - sample market data only. For critical decisions, consult official sources.';

interface AskContext {
  farmerId?: string;
  cropId?: string;
  quantityKg?: number;
}

interface OptionItem {
  rank: number;
  name: string;
  price: number;
  unit: string;
  distanceKm: number;
  transportCost: number;
  net: number;
  reason: string;
}

interface AskResponse {
  disclaimer: typeof DISCLAIMER;
  summary: string;
  options: OptionItem[];
}

function calcNet(pricePerUnit: number, qtyKg: number, distKm: number): { net: number; tc: number } {
  const gross = pricePerUnit * qtyKg;
  const tc = Math.round(distKm * qtyKg * TRANSPORT_RATE);
  return { net: gross - tc, tc };
}

function getOnionMarketOptions(qtyKg: number): OptionItem[] {
  const onionMarkets = [...markets].sort((a, b) => b.modalPrice - a.modalPrice).slice(0, 3);
  return onionMarkets.map((m, i) => {
    const { net, tc } = calcNet(m.modalPrice / 100, qtyKg, m.distanceFromDemoFarmer);
    return {
      rank: i + 1,
      name: m.name,
      price: m.modalPrice,
      unit: 'quintal',
      distanceKm: m.distanceFromDemoFarmer,
      transportCost: tc,
      net,
      reason: `${m.marketType} mandi with ${m.demandLevel} demand and ${m.arrivalsToday}q arrivals today`,
    };
  });
}

function getBuyerOptions(qtyKg: number, cropId?: string): OptionItem[] {
  let filtered = [...buyers];
  if (cropId) filtered = filtered.filter((b) => b.cropsRequired.includes(cropId));
  const top = filtered.slice(0, 3);
  const crop = crops.find((c) => c.id === (cropId ?? 'C1')) ?? crops[0];
  const basePrice = crop.sampleMsp / 100;
  return top.map((b, i) => {
    const price = basePrice * (1 + (i + 1) * 0.02);
    const dist = 20 + i * 35;
    const { net, tc } = calcNet(price, qtyKg, dist);
    return {
      rank: i + 1,
      name: b.companyName,
      price: Math.round(price * 100),
      unit: 'quintal',
      distanceKm: dist,
      transportCost: tc,
      net: Math.round(net),
      reason: `${b.verificationStatus} verified buyer, ${b.pastTransactions} past deals, rating ${((b.rating.payment + b.rating.communication) / 2).toFixed(1)}/5`,
    };
  });
}

function getStorageOptions(qtyKg: number): OptionItem[] {
  const sorted = [...warehouses]
    .sort((a, b) => a.distanceFromDemoFarmer - b.distanceFromDemoFarmer)
    .slice(0, 3);
  const qtyMT = qtyKg / 1000;
  return sorted.map((w, i) => {
    const storage30d = Math.round(w.pricePerMTDay * qtyMT * 30);
    const tcRoundtrip = Math.round(w.distanceFromDemoFarmer * qtyKg * TRANSPORT_RATE * 2);
    return {
      rank: i + 1,
      name: w.name,
      price: w.pricePerMTDay,
      unit: 'MT/day',
      distanceKm: w.distanceFromDemoFarmer,
      transportCost: tcRoundtrip,
      net: -(storage30d + tcRoundtrip),
      reason: `${w.type} storage, ${w.availableCapacityMT}MT free, rated ${w.rating}/5, facilities: ${w.facilities.slice(0, 2).join(', ')}`,
    };
  });
}

function getFPOOptions(): OptionItem[] {
  const sorted = [...fpos].sort((a, b) => b.memberCount - a.memberCount).slice(0, 3);
  return sorted.map((f, i) => ({
    rank: i + 1,
    name: f.name,
    price: f.rating,
    unit: 'rating',
    distanceKm: 10 + i * 25,
    transportCost: 0,
    net: 0,
    reason: `${f.memberCount} members, ${f.crops.length} crops, est. ${f.yearEstablished ?? 'N/A'}, ${f.isVerified ? 'Platform verified' : 'Unverified'}`,
  }));
}

function getMSPOptions(qtyKg: number): OptionItem[] {
  return crops.map((c, i) => {
    const { net, tc } = calcNet(c.sampleMsp / 100, qtyKg, 50);
    return {
      rank: i + 1,
      name: `${c.name} (${c.category})`,
      price: c.sampleMsp,
      unit: 'quintal',
      distanceKm: 50,
      transportCost: tc,
      net,
      reason: `Government MSP for ${c.season} season, avg yield ${c.avgYieldPerAcre ?? 'N/A'} q/acre`,
    };
  });
}

function getTransportShareOptions(qtyKg: number): OptionItem[] {
  const provs = transportProviders.filter((p) => p.available).slice(0, 2);
  return provs.map((p, i) => {
    const soloCost = Math.round(150 * qtyKg * TRANSPORT_RATE);
    const sharedCost = Math.round(soloCost * (0.55 - i * 0.05));
    return {
      rank: i + 1,
      name: `${p.name} (${p.vehicleType})`,
      price: p.pricePerKm ?? 0,
      unit: 'km',
      distanceKm: 150,
      transportCost: sharedCost,
      net: soloCost - sharedCost,
      reason: `Share with ${2 + i} other farmers, saves ~${Math.round(((soloCost - sharedCost) / soloCost) * 100)}%, ${p.totalTrips} trips completed`,
    };
  });
}

function getMarketFocusedOptions(qtyKg: number): OptionItem[] {
  const sorted = [...markets]
    .sort((a, b) => b.modalPrice - a.modalPrice)
    .slice(0, 3);
  return sorted.map((m, i) => {
    const { net, tc } = calcNet(m.modalPrice / 100, qtyKg, m.distanceFromDemoFarmer);
    return {
      rank: i + 1,
      name: m.name,
      price: m.modalPrice,
      unit: 'quintal',
      distanceKm: m.distanceFromDemoFarmer,
      transportCost: tc,
      net,
      reason: `Modal ₹${m.modalPrice}/q, range ₹${m.minPrice}-₹${m.maxPrice}, ${m.demandLevel} demand`,
    };
  });
}

function getSellVsWaitOptions(qtyKg: number): OptionItem[] {
  const currMarket = markets[0];
  const currentPrice = currMarket.modalPrice / 100;
  const projectedPrice = currentPrice * 1.12;
  const { net: netNow, tc: tcNow } = calcNet(currentPrice, qtyKg, currMarket.distanceFromDemoFarmer);
  const { net: netWait, tc: tcWait } = calcNet(projectedPrice, qtyKg, currMarket.distanceFromDemoFarmer);
  const qtyMT = qtyKg / 1000;
  const storage30 = Math.round(12 * qtyMT * 30);
  return [
    {
      rank: 1,
      name: 'Sell Now at Pune APMC',
      price: Math.round(currentPrice * 100),
      unit: 'quintal',
      distanceKm: currMarket.distanceFromDemoFarmer,
      transportCost: tcNow,
      net: netNow,
      reason: 'Lock in current price today, payment in T+3 days, no storage risk',
    },
    {
      rank: 2,
      name: 'Wait 30 days (Projected)',
      price: Math.round(projectedPrice * 100),
      unit: 'quintal',
      distanceKm: currMarket.distanceFromDemoFarmer,
      transportCost: tcWait + storage30,
      net: netWait - storage30,
      reason: `Projected +12% price trend based on 90d data, storage cost ~₹${storage30} for 30 days`,
    },
    {
      rank: 3,
      name: 'Partial Sell (50% now + 50% later)',
      price: Math.round(((currentPrice + projectedPrice) / 2) * 100),
      unit: 'quintal',
      distanceKm: currMarket.distanceFromDemoFarmer,
      transportCost: Math.round((tcNow + tcWait) / 2 + storage30 / 2),
      net: Math.round((netNow + (netWait - storage30)) / 2),
      reason: 'Hedge strategy - reduce risk while capturing some upside',
    },
  ];
}

export function askFarmerQuestion(
  question: string,
  context?: AskContext
): Promise<AskResponse> {
  const q = question.toLowerCase();
  const qty = context?.quantityKg ?? 1000;
  let options: OptionItem[] = [];
  let summary = '';

  const hasOnion = q.includes('onion');
  const hasSellMy = q.includes('sell my');
  const hasWhere = q.includes('where should i');
  const hasBestPrice = q.includes('best price') || q.includes('market price');
  const hasSellNow = q.includes('sell now') || q.includes('wait');
  const hasBuyer = q.includes('buyer');
  const hasTransport = q.includes('transport') || q.includes('share');
  const hasMSP = q.includes('msp');
  const hasFPO = q.includes('fpo');
  const hasStorage = q.includes('storage') || q.includes('warehouse');

  if ((hasOnion || hasSellMy || hasWhere) && !hasBuyer && !hasStorage && !hasFPO && !hasTransport && !hasMSP) {
    summary = `Based on current mandi data for Onion (${qty}kg), here are the best market options ranked by net realization after transport.`;
    options = getOnionMarketOptions(qty);
  } else if (hasBestPrice) {
    summary = `Top markets by modal price for ${qty}kg quantity, with net realization after transport at ₹${TRANSPORT_RATE}/km/quintal.`;
    options = getMarketFocusedOptions(qty);
  } else if (hasSellNow) {
    summary = `Comparison of selling now vs waiting with projected prices for ${qty}kg, including storage and transport costs.`;
    options = getSellVsWaitOptions(qty);
  } else if (hasBuyer) {
    summary = `Verified buyers interested in your crop. Prices above include platform-verified premium.`;
    options = getBuyerOptions(qty, context?.cropId);
  } else if (hasTransport) {
    summary = `Shared transport options to reduce your per-unit logistics cost on ${qty}kg shipment.`;
    options = getTransportShareOptions(qty);
  } else if (hasMSP) {
    summary = `Current Government Minimum Support Prices (MSP) across major crops for ${qty}kg.`;
    options = getMSPOptions(qty);
  } else if (hasFPO) {
    summary = `Nearby Farmer Producer Organizations (FPOs) you can join for collective marketing and better prices.`;
    options = getFPOOptions();
  } else if (hasStorage) {
    summary = `Available warehouse options near you for storing ${qty}kg (${(qty / 1000).toFixed(1)} MT). Net values show 30-day holding cost.`;
    options = getStorageOptions(qty);
  } else {
    summary = `Here are general market options for your query about "${question}" (${qty}kg default quantity).`;
    options = getMarketFocusedOptions(qty);
  }

  return delay({
    disclaimer: DISCLAIMER,
    summary,
    options,
  });
}
