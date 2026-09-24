// Demo/Sample data - Smart India Hackathon 2026 Prototype
import type { TransportProvider } from '@/types';

export const transportProviders: TransportProvider[] = [
  {
    id: 'TP1',
    name: 'Mahesh Teli',
    companyName: 'Pune Goods Carrier',
    phone: '+91 98500 11111',
    lat: 18.5204,
    lng: 73.8567,
    vehicleCapacity: 15,
    vehicleType: 'Truck (15 MT)',
    rating: 4.7,
    totalTrips: 456,
    isVerified: true,
    serviceRadius: 300,
    pricePerKm: 85,
    available: true
  },
  {
    id: 'TP2',
    name: 'Santosh Shinde',
    companyName: 'Nashik Logistics',
    phone: '+91 98500 22222',
    lat: 19.9975,
    lng: 73.7898,
    vehicleCapacity: 20,
    vehicleType: 'Heavy Truck (20 MT)',
    rating: 4.5,
    totalTrips: 312,
    isVerified: true,
    serviceRadius: 400,
    pricePerKm: 105,
    available: true
  },
  {
    id: 'TP3',
    name: 'Ramesh More',
    companyName: 'Sahyadri Transport Co.',
    phone: '+91 98500 33333',
    lat: 18.5314,
    lng: 73.8446,
    vehicleCapacity: 10,
    vehicleType: 'Mini Truck (10 MT)',
    rating: 4.3,
    totalTrips: 189,
    isVerified: true,
    serviceRadius: 200,
    pricePerKm: 65,
    available: true
  },
  {
    id: 'TP4',
    name: 'Vijay Patil',
    phone: '+91 98500 44444',
    lat: 19.0948,
    lng: 74.7480,
    vehicleCapacity: 25,
    vehicleType: 'Container Truck (25 MT)',
    rating: 4.6,
    totalTrips: 578,
    isVerified: true,
    serviceRadius: 500,
    pricePerKm: 125,
    available: false
  },
  {
    id: 'TP5',
    name: 'Dilip Wagh',
    companyName: 'Cold Chain Solutions',
    phone: '+91 98500 55555',
    lat: 18.5089,
    lng: 73.9315,
    vehicleCapacity: 12,
    vehicleType: 'Refrigerated Truck (12 MT)',
    rating: 4.8,
    totalTrips: 234,
    isVerified: true,
    serviceRadius: 350,
    pricePerKm: 145,
    available: true
  },
  {
    id: 'TP6',
    name: 'Anil Deshmukh',
    companyName: 'Ahmednagar Tempo Service',
    phone: '+91 98500 66666',
    lat: 19.0948,
    lng: 74.7480,
    vehicleCapacity: 5,
    vehicleType: 'Tempo (5 MT)',
    rating: 4.2,
    totalTrips: 102,
    isVerified: false,
    serviceRadius: 150,
    pricePerKm: 45,
    available: true
  },
  {
    id: 'TP7',
    name: 'Subhash Jadhav',
    companyName: 'Mumbai-Pune Express Logistics',
    phone: '+91 98500 77777',
    lat: 19.0760,
    lng: 72.8777,
    vehicleCapacity: 18,
    vehicleType: 'Trailer (18 MT)',
    rating: 4.4,
    totalTrips: 421,
    isVerified: true,
    serviceRadius: 250,
    pricePerKm: 95,
    available: true
  }
];

export const getTransportProviderById = (id: string): TransportProvider | undefined =>
  transportProviders.find((t) => t.id === id);

export const getAvailableProviders = (): TransportProvider[] =>
  transportProviders.filter((t) => t.available);
