// Demo/Sample data - Smart India Hackathon 2026 Prototype
import { VerificationStatus, type Buyer } from '@/types';

export const buyers: Buyer[] = [
  {
    id: 'B1',
    companyName: 'ABC Agro Foods Pvt Ltd',
    contactName: 'Amit Shah',
    location: 'Shivaji Nagar, Pune',
    lat: 18.5314,
    lng: 73.8446,
    verificationStatus: VerificationStatus.Platform,
    rating: { payment: 4.8, communication: 4.6, priceFairness: 4.5, experience: 4.7 },
    pastTransactions: 234,
    cropsRequired: ['C1', 'C2', 'C6'],
    phone: '+91 98810 11111',
    email: 'procurement@abcagro.com',
    annualVolume: 5000,
    gstin: '27ABCDE1234F1Z5'
  },
  {
    id: 'B2',
    companyName: 'Perfect Grains Pvt Ltd',
    contactName: 'Rajesh Kumar',
    location: 'Hadapsar, Pune',
    lat: 18.5089,
    lng: 73.9315,
    verificationStatus: VerificationStatus.Platform,
    rating: { payment: 4.7, communication: 4.8, priceFairness: 4.6, experience: 4.7 },
    pastTransactions: 512,
    cropsRequired: ['C3', 'C6', 'C7'],
    phone: '+91 98810 22222',
    email: 'orders@perfectgrains.in',
    annualVolume: 12000,
    gstin: '27FGHIJ5678K2L6'
  },
  {
    id: 'B3',
    companyName: 'Nashik Onion Traders Co.',
    contactName: 'Dattatray Koli',
    location: 'Main Market, Nashik',
    lat: 19.9975,
    lng: 73.7898,
    verificationStatus: VerificationStatus.Platform,
    rating: { payment: 4.5, communication: 4.3, priceFairness: 4.4, experience: 4.4 },
    pastTransactions: 876,
    cropsRequired: ['C1', 'C2'],
    phone: '+91 98810 33333',
    annualVolume: 8000,
    gstin: '27KLMNO9012P3Q7'
  },
  {
    id: 'B4',
    companyName: 'Soyabean Processors India',
    contactName: 'Manoj Agrawal',
    location: 'Cidco, Aurangabad',
    lat: 19.8762,
    lng: 75.3433,
    verificationStatus: VerificationStatus.Demo,
    rating: { payment: 4.6, communication: 4.5, priceFairness: 4.3, experience: 4.5 },
    pastTransactions: 156,
    cropsRequired: ['C4', 'C7'],
    phone: '+91 98810 44444',
    email: 'purchase@soyaprocessors.com',
    annualVolume: 3500,
    gstin: '27PQRST3456U4R8'
  },
  {
    id: 'B5',
    companyName: 'Cotton Kings Textiles',
    contactName: 'Harish More',
    location: 'MIDC, Solapur',
    lat: 17.6599,
    lng: 75.9064,
    verificationStatus: VerificationStatus.Platform,
    rating: { payment: 4.4, communication: 4.2, priceFairness: 4.3, experience: 4.3 },
    pastTransactions: 298,
    cropsRequired: ['C5'],
    phone: '+91 98810 55555',
    annualVolume: 6000,
    gstin: '27UVWXY7890V5S9'
  },
  {
    id: 'B6',
    companyName: 'Mumbai Rice Mandi',
    contactName: 'Sachin Deshpande',
    location: 'Vashi, Mumbai',
    lat: 19.0760,
    lng: 72.8777,
    verificationStatus: VerificationStatus.Platform,
    rating: { payment: 4.9, communication: 4.7, priceFairness: 4.6, experience: 4.8 },
    pastTransactions: 1024,
    cropsRequired: ['C6', 'C3'],
    phone: '+91 98810 66666',
    email: 'buy@mumbairice.com',
    annualVolume: 20000,
    gstin: '27ZABCD1234W6T0'
  },
  {
    id: 'B7',
    companyName: 'Sangli Foods Exports',
    contactName: 'Pradip Patil',
    location: 'Industrial Area, Sangli',
    lat: 16.8524,
    lng: 74.5827,
    verificationStatus: VerificationStatus.Demo,
    rating: { payment: 4.5, communication: 4.4, priceFairness: 4.5, experience: 4.5 },
    pastTransactions: 88,
    cropsRequired: ['C1', 'C2', 'C4'],
    phone: '+91 98810 77777',
    annualVolume: 2500
  },
  {
    id: 'B8',
    companyName: 'Nagpur Wholesale Grain Market',
    contactName: 'Anil Rathod',
    location: 'Gandhi Nagar, Nagpur',
    lat: 21.1458,
    lng: 79.0882,
    verificationStatus: VerificationStatus.None,
    rating: { payment: 3.9, communication: 4.0, priceFairness: 3.8, experience: 3.9 },
    pastTransactions: 42,
    cropsRequired: ['C3', 'C4', 'C6', 'C7'],
    phone: '+91 98810 88888',
    annualVolume: 1800
  }
];

export const getBuyerById = (id: string): Buyer | undefined =>
  buyers.find((b) => b.id === id);

export const getVerifiedBuyers = (): Buyer[] =>
  buyers.filter((b) => b.verificationStatus === VerificationStatus.Platform);
