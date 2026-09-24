// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { WarehouseType, type Warehouse } from '@/types';

export const warehouses: Warehouse[] = [
  {
    id: 'W1',
    name: 'Pune Central Cold Storage',
    type: WarehouseType.Cold,
    address: 'MIDC, Bhosari, Pune',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.6350,
    lng: 73.8510,
    totalCapacityMT: 2500,
    availableCapacityMT: 850,
    distanceFromDemoFarmer: 18.5,
    pricePerMTDay: 18,
    facilities: ['Cold Storage (-4C to +10C)', 'Humidity Control', 'Fumigation', 'Loading Docks', '24x7 Security', 'Inventory Tracking'],
    rating: 4.7,
    isVerified: true,
    contactPhone: '+91 98400 11111'
  },
  {
    id: 'W2',
    name: 'Siddhivinayak Dry Warehousing',
    type: WarehouseType.Dry,
    address: 'Shikrapur, Pune - Nagar Road',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.7650,
    lng: 74.0980,
    totalCapacityMT: 5000,
    availableCapacityMT: 2100,
    distanceFromDemoFarmer: 38.2,
    pricePerMTDay: 8,
    facilities: ['Dry Storage', 'Pest Control', 'Weighbridge', 'Truck Parking', 'Insurance Available'],
    rating: 4.5,
    isVerified: true,
    contactPhone: '+91 98400 22222'
  },
  {
    id: 'W3',
    name: 'Nashik Multi-Commodity Hub',
    type: WarehouseType.Both,
    address: 'Sinnar MIDC, Nashik',
    district: 'Nashik',
    state: 'Maharashtra',
    lat: 19.8550,
    lng: 74.0040,
    totalCapacityMT: 8000,
    availableCapacityMT: 3200,
    distanceFromDemoFarmer: 168.9,
    pricePerMTDay: 12,
    facilities: ['Cold Storage', 'Dry Storage', 'Grading Unit', 'Packaging Facility', 'Quality Testing Lab', 'E-NWR Enabled'],
    rating: 4.6,
    isVerified: true,
    contactPhone: '+91 98400 33333'
  },
  {
    id: 'W4',
    name: 'Ahmednagar Agri Warehouse',
    type: WarehouseType.Dry,
    address: 'Pathardi Road, Ahmednagar',
    district: 'Ahmednagar',
    state: 'Maharashtra',
    lat: 19.0948,
    lng: 74.7480,
    totalCapacityMT: 3500,
    availableCapacityMT: 1450,
    distanceFromDemoFarmer: 122.8,
    pricePerMTDay: 7,
    facilities: ['Dry Storage', 'Pest Control', 'Weighbridge', 'Disinfection Services'],
    rating: 4.3,
    isVerified: false,
    contactPhone: '+91 98400 44444'
  },
  {
    id: 'W5',
    name: 'Baramati Grain Silos',
    type: WarehouseType.Dry,
    address: 'Indapur Road, Baramati',
    district: 'Pune',
    state: 'Maharashtra',
    lat: 18.1489,
    lng: 74.5794,
    totalCapacityMT: 10000,
    availableCapacityMT: 4200,
    distanceFromDemoFarmer: 94.6,
    pricePerMTDay: 6,
    facilities: ['Silos Storage', 'Temperature Monitoring', 'Pest Control', 'Automated Conveyors', 'Weighbridge'],
    rating: 4.8,
    isVerified: true,
    contactPhone: '+91 98400 55555'
  },
  {
    id: 'W6',
    name: 'Solapur Cold Chain Network',
    type: WarehouseType.Cold,
    address: 'Koppal Road, Solapur',
    district: 'Solapur',
    state: 'Maharashtra',
    lat: 17.6599,
    lng: 75.9064,
    totalCapacityMT: 1800,
    availableCapacityMT: 520,
    distanceFromDemoFarmer: 258.3,
    pricePerMTDay: 16,
    facilities: ['Cold Storage', 'IQF Facility', 'Pre-cooling', 'Ripening Chambers', 'Reefer Loading'],
    rating: 4.4,
    isVerified: true,
    contactPhone: '+91 98400 66666'
  }
];

export const getWarehouseById = (id: string): Warehouse | undefined =>
  warehouses.find((w) => w.id === id);

export const getWarehousesByType = (type: WarehouseType): Warehouse[] =>
  warehouses.filter((w) => w.type === type || w.type === WarehouseType.Both);
