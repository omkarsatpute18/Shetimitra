// Demo/Sample data - Smart India Hackathon 2026 Prototype
import type { GovernmentScheme } from '@/types';

export const schemes: GovernmentScheme[] = [
  {
    id: 'S1',
    name: 'PM-KISAN Samman Nidhi',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    schemeType: 'Income Support',
    isDemo: false,
    description: 'Pradhan Mantri KISAN Samman Nidhi provides direct income support of ₹6,000 per year in three equal installments to all land-holding farmer families.',
    eligibility: [
      'Small and marginal landholding farmer families',
      'Land should be in the name of the farmer or family members',
      'Aadhaar seeded bank account mandatory',
      'Applicable across all states and UTs of India'
    ],
    benefits: [
      '₹6,000 per year per family (3 installments of ₹2,000 each)',
      'Direct Benefit Transfer (DBT) directly into bank account',
      'No documentation or application fee required',
      'Transparent release via PM-KISAN Portal'
    ],
    websiteUrl: 'https://pmkisan.gov.in/',
    stateApplicable: ['Maharashtra', 'All India'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  },
  {
    id: 'S2',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    schemeType: 'Crop Insurance',
    isDemo: false,
    description: 'PMFBY provides comprehensive crop insurance coverage against non-preventable natural risks at very low premium rates.',
    eligibility: [
      'All farmers growing notified crops in notified areas',
      'Loanee farmers and non-loanee farmers both eligible',
      'Enrollment before sowing/planting cut-off dates',
      'Sharecroppers and tenant farmers also eligible'
    ],
    benefits: [
      'Premium subsidy of up to 90% by Central and State Govt',
      'Farmers pay only 1.5% (Rabi), 2% (Kharif), 5% (Horticulture)',
      'Claims settlement within 2 months of harvest directly to bank',
      'Coverage for sowing failure, natural calamities, and post-harvest losses'
    ],
    applicationDeadline: '2026-10-31T23:59:59Z',
    websiteUrl: 'https://pmfby.gov.in/',
    stateApplicable: ['Maharashtra', 'All India'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  },
  {
    id: 'S3',
    name: 'Soil Health Card Scheme',
    ministry: 'Department of Agriculture, Cooperation & Farmers Welfare',
    schemeType: 'Technical Support',
    isDemo: false,
    description: 'Soil Health Card provides farmers with soil nutrient status and recommendations for appropriate dosage of fertilizers for sustainable soil health.',
    eligibility: [
      'All farmers across the country',
      'Card issued once every 2-3 years based on crop cycle',
      'Free of cost soil testing at village level',
      'Can apply via local Krishi Vigyan Kendra / ATMA'
    ],
    benefits: [
      'Free soil testing for 12 parameters (NPK, organic carbon, pH, micronutrients)',
      'Crop-wise customized fertilizer recommendations',
      'Reduces cost of cultivation by 20-30%',
      'Improves yield and soil health over time'
    ],
    stateApplicable: ['Maharashtra', 'All India'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  },
  {
    id: 'S4',
    name: 'Maharashtra Rajya Krishi Vikas Yojana (MRKVY)',
    ministry: 'Agriculture Department, Government of Maharashtra',
    schemeType: 'State Scheme - Subsidies',
    isDemo: false,
    description: 'State scheme for holistic development of agriculture sector in Maharashtra with focus on micro-irrigation, farm mechanization, and post-harvest infrastructure.',
    eligibility: [
      'Farmers who are residents of Maharashtra',
      'Valid 7/12 extract or land ownership documents',
      'Priority to small and marginal farmers',
      'FPOs eligible for group subsidies'
    ],
    benefits: [
      '50-75% subsidy on drip and sprinkler irrigation systems',
      '40-50% subsidy on agricultural machinery and tractor tools',
      'Assistance for construction of farm ponds and dug wells',
      'Free training on modern farming techniques'
    ],
    applicationDeadline: '2026-11-15T23:59:59Z',
    stateApplicable: ['Maharashtra'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  },
  {
    id: 'S5',
    name: 'Kisan Credit Card (KCC) Scheme',
    ministry: 'NABARD / Department of Financial Services',
    schemeType: 'Agricultural Credit / Loans',
    isDemo: false,
    description: 'Kisan Credit Card provides affordable and timely credit to farmers for agricultural needs including crop production, post-harvest expenses, and allied activities.',
    eligibility: [
      'All individual farmer / joint cultivator borrowers',
      'Tenant farmers, oral lessees and share croppers',
      'SHGs or Joint Liability Groups (JLGs) of farmers',
      'No collateral required for loans up to ₹3 Lakh'
    ],
    benefits: [
      'Interest subvention of 2% + 3% for prompt repayments (effective rate 4%)',
      'Revolving cash credit facility valid for 5 years',
      'Flexible repayment schedule aligned with harvest cycle',
      'Accidental insurance cover up to ₹50,000'
    ],
    websiteUrl: 'https://www.nabard.org/',
    stateApplicable: ['Maharashtra', 'All India'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  },
  {
    id: 'S6',
    name: 'Formation & Promotion of 10,000 FPOs',
    ministry: 'Ministry of Agriculture and Farmers Welfare',
    schemeType: 'Institutional Support',
    isDemo: false,
    description: 'Central Sector Scheme for formation and promotion of 10,000 new Farmer Producer Organizations (FPOs) with professional management and equity grant support.',
    eligibility: [
      'Groups of minimum 11 farmers can register as FPO',
      'Preference to aspirational districts, tribal and hilly areas',
      'FPOs producing agricultural, horticultural, livestock, fishery produce',
      'Can apply via Implementing Agencies (SFAC, NAFED, TRIFED, NABARD)'
    ],
    benefits: [
      'Matching equity grant up to ₹2,000 per farmer member (max ₹15 lakh per FPO)',
      'Credit guarantee facility for loans up to ₹2 crore without collateral',
      'Professional handholding and training support for 5 years',
      'Assistance for brand building, market linkages and direct buyer contracts'
    ],
    websiteUrl: 'https://sfacindia.com/',
    stateApplicable: ['Maharashtra', 'All India'],
    cropsCovered: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7']
  }
];

export const getSchemeById = (id: string): GovernmentScheme | undefined =>
  schemes.find((s) => s.id === id);

export const getSchemesByState = (state: string): GovernmentScheme[] =>
  schemes.filter((s) => s.stateApplicable.includes(state) || s.stateApplicable.includes('All India'));
