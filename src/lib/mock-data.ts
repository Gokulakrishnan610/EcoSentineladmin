// Mock data for EcoSentinel platform

export interface Alert {
  id: string
  type: 'flood' | 'cyclone' | 'landslide' | 'wildfire' | 'earthquake'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  location: string
  timestamp: string
  coordinates: [number, number]
  affectedAreas: string[]
  safeRoutes?: string[]
}

export interface CitizenReport {
  id: string
  type: 'incident' | 'damage' | 'help_needed' | 'road_closure'
  title: string
  description: string
  location: string
  coordinates: [number, number]
  severity: 'critical' | 'high' | 'medium' | 'low'
  timestamp: string
  photo?: string
  status: 'pending' | 'verified' | 'resolved'
  reportedBy: string
}

export interface CommunityPost {
  id: string
  type: 'help_request' | 'help_offer' | 'sos' | 'information'
  title: string
  description: string
  location: string
  timestamp: string
  author: string
  priority: 'urgent' | 'high' | 'normal'
  status: 'open' | 'closed'
  responses: number
}

export interface Shelter {
  id: string
  name: string
  address: string
  coordinates: [number, number]
  capacity: number
  currentOccupancy: number
  amenities: string[]
  contact: string
  status: 'open' | 'full' | 'closed'
}

export interface RiskZone {
  id: string
  type: 'flood' | 'cyclone' | 'landslide' | 'wildfire'
  severity: number // 0-1 scale
  coordinates: [number, number][]
  lastUpdated: string
}

export interface WeatherInfo {
  location: string;
  weather: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  coordinates: [number, number];
  lastUpdated: string;
}

export interface DisasterPrediction {
  risk: string;
  chance: number;
}

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'critical',
    title: 'Flash Flood Warning',
    description: 'Heavy rainfall expected to cause flash flooding in low-lying areas. Immediate evacuation recommended.',
    location: 'Chennai Metropolitan Area',
    timestamp: '2024-01-20T10:30:00Z',
    coordinates: [13.0827, 80.2707],
    affectedAreas: ['Kodambakkam', 'T. Nagar', 'Adyar', 'Anna Nagar'],
    safeRoutes: ['Anna Salai Route', 'Mount Road Alternative', 'Inner Ring Road']
  },
  {
    id: '2',
    type: 'cyclone',
    severity: 'high',
    title: 'Cyclone Approaching',
    description: 'Category 3 cyclone expected to make landfall in 12 hours. Strong winds and heavy rain forecast.',
    location: 'Nagapattinam Coast',
    timestamp: '2024-01-20T08:15:00Z',
    coordinates: [10.7700, 79.9300],
    affectedAreas: ['Nagapattinam', 'Thanjavur', 'Thiruvarur', 'Pudukkottai'],
    safeRoutes: ['Inland Route via Trichy', 'Northern Evacuation Route']
  },
  {
    id: '3',
    type: 'landslide',
    severity: 'high',
    title: 'Landslide Risk Alert',
    description: 'Heavy rainfall causing soil instability. High risk of landslides in hilly areas.',
    location: 'Nilgiris District',
    timestamp: '2024-01-20T06:45:00Z',
    coordinates: [11.4100, 76.7000],
    affectedAreas: ['Ooty', 'Coonoor', 'Kotagiri', 'Gudalur'],
    safeRoutes: ['Mettupalayam Route', 'Coimbatore Alternative']
  }
]

// Mock citizen reports
export const mockReports: CitizenReport[] = [
  {
    id: '1',
    type: 'incident',
    title: 'Tree Down Blocking Road',
    description: 'Large tree fell across Anna Salai near Mount Road intersection, completely blocking traffic.',
    location: 'Anna Salai, Chennai',
    coordinates: [80.2707, 13.0827],
    severity: 'high',
    timestamp: '2024-01-20T09:30:00Z',
    status: 'verified',
    reportedBy: 'Rajesh Kumar'
  },
  {
    id: '2',
    type: 'damage',
    title: 'Flooded Underpass',
    description: 'Adyar underpass is completely flooded, water level approximately 3 feet deep.',
    location: 'Adyar Bridge, Chennai',
    coordinates: [80.2500, 13.0000],
    severity: 'critical',
    timestamp: '2024-01-20T08:45:00Z',
    status: 'pending',
    reportedBy: 'Lakshmi Devi'
  },
  {
    id: '3',
    type: 'help_needed',
    title: 'Family Stranded on Rooftop',
    description: 'Family of 5 including elderly and children stranded on rooftop due to rising flood waters.',
    location: 'Marina Beach Area, Chennai',
    coordinates: [80.2833, 13.0569],
    severity: 'critical',
    timestamp: '2024-01-20T10:15:00Z',
    status: 'pending',
    reportedBy: 'Arun Subramanian'
  },
  {
    id: '4',
    type: 'road_closure',
    title: 'Landslide Blocking Highway',
    description: 'Major landslide on NH-49 blocking traffic between Kodaikanal and Palani. Multiple vehicles stranded.',
    location: 'Kodaikanal-Palani Highway',
    coordinates: [77.4850, 10.2300],
    severity: 'critical',
    timestamp: '2024-01-20T07:30:00Z',
    status: 'pending',
    reportedBy: 'Forest Department Officer'
  },
  {
    id: '5',
    type: 'incident',
    title: 'Cyclone Damage to Coastal Homes',
    description: 'Strong winds from cyclone have damaged several homes in Nagapattinam coastal area. Roofs blown off.',
    location: 'Nagapattinam Coast',
    coordinates: [79.9300, 10.7700],
    severity: 'high',
    timestamp: '2024-01-20T06:15:00Z',
    status: 'verified',
    reportedBy: 'Coastal Police Station'
  },
  {
    id: '6',
    type: 'help_needed',
    title: 'Elderly Couple Trapped in Flood',
    description: 'Elderly couple aged 75+ trapped in their home due to rising flood waters in Cuddalore.',
    location: 'Cuddalore Town',
    coordinates: [79.7680, 11.7463],
    severity: 'critical',
    timestamp: '2024-01-20T11:00:00Z',
    status: 'pending',
    reportedBy: 'Neighbor - Priya Ramesh'
  },
  {
    id: '7',
    type: 'damage',
    title: 'Bridge Collapse in Vellore',
    description: 'Partial collapse of bridge over Palar River due to heavy flooding. Road completely blocked.',
    location: 'Palar River Bridge, Vellore',
    coordinates: [79.1300, 12.9200],
    severity: 'critical',
    timestamp: '2024-01-20T05:45:00Z',
    status: 'pending',
    reportedBy: 'Highway Department'
  },
  {
    id: '8',
    type: 'incident',
    title: 'Power Outage in Nilgiris',
    description: 'Massive power outage affecting entire Nilgiris district due to landslide damage to transmission lines.',
    location: 'Nilgiris District',
    coordinates: [76.7000, 11.4100],
    severity: 'high',
    timestamp: '2024-01-20T04:20:00Z',
    status: 'verified',
    reportedBy: 'Tamil Nadu Electricity Board'
  }
]

// Mock community posts
export const mockCommunityPosts: CommunityPost[] = [
  {
    id: '1',
    type: 'help_offer',
    title: 'Offering Transport to Evacuation Center',
    description: 'I have a truck available to help transport families to safer areas. Can accommodate up to 15 people.',
    location: 'Chennai Central Railway Station',
    timestamp: '2024-01-20T09:00:00Z',
    author: 'Rajesh Kumar',
    priority: 'high',
    status: 'open',
    responses: 12
  },
  {
    id: '2',
    type: 'help_request',
    title: 'Need Medicine for Diabetic Patient',
    description: 'Urgently need insulin and diabetes medication. Patient is in evacuation center at Anna Nagar Government School.',
    location: 'Anna Nagar Government School, Chennai',
    timestamp: '2024-01-20T10:20:00Z',
    author: 'Lakshmi Devi',
    priority: 'urgent',
    status: 'open',
    responses: 3
  },
  {
    id: '3',
    type: 'information',
    title: 'Chennai Marina Beach Evacuation Center Status',
    description: 'Marina Beach Community Hall is now at 80% capacity. Still accepting evacuees but space is limited.',
    location: 'Marina Beach Community Hall, Chennai',
    timestamp: '2024-01-20T08:30:00Z',
    author: 'Corporation Commissioner',
    priority: 'normal',
    status: 'open',
    responses: 7
  },
  {
    id: '4',
    type: 'sos',
    title: 'Emergency: Flooded House in Kodambakkam',
    description: 'Water level rising rapidly. Family of 4 trapped on second floor. Need immediate rescue assistance.',
    location: 'Kodambakkam, Chennai',
    timestamp: '2024-01-20T11:15:00Z',
    author: 'Arun Subramanian',
    priority: 'urgent',
    status: 'open',
    responses: 15
  },
  {
    id: '5',
    type: 'help_offer',
    title: 'Medical Assistance Available',
    description: 'Retired doctor offering medical help at temporary clinic. Located near T. Nagar bus stand.',
    location: 'T. Nagar Bus Stand, Chennai',
    timestamp: '2024-01-20T07:45:00Z',
    author: 'Dr. Meenakshi Iyer',
    priority: 'high',
    status: 'open',
    responses: 8
  },
  {
    id: '6',
    type: 'information',
    title: 'Cuddalore Coastal Road Closure',
    description: 'NH-45A closed between Cuddalore and Chidambaram due to severe flooding. Use alternative route via Villupuram.',
    location: 'Cuddalore to Chidambaram Highway',
    timestamp: '2024-01-20T09:30:00Z',
    author: 'Highway Traffic Control',
    priority: 'high',
    status: 'open',
    responses: 22
  },
  {
    id: '7',
    type: 'help_request',
    title: 'Food and Water Needed in Adyar',
    description: 'Adyar River bank residents need emergency food and drinking water. Can anyone help with supplies?',
    location: 'Adyar River Bank, Chennai',
    timestamp: '2024-01-20T10:45:00Z',
    author: 'Priya Venkatesan',
    priority: 'high',
    status: 'open',
    responses: 11
  },
  {
    id: '8',
    type: 'help_offer',
    title: 'Volunteer Team Available',
    description: 'Group of 10 volunteers ready to help with rescue operations, distribution, and cleanup work.',
    location: 'Mylapore, Chennai',
    timestamp: '2024-01-20T08:00:00Z',
    author: 'Youth Service Club',
    priority: 'normal',
    status: 'open',
    responses: 5
  }
]

// Mock shelters data
export const mockShelters: Shelter[] = [
  {
    id: '1',
    name: 'Chennai Corporation Community Hall',
    address: 'Anna Salai, T. Nagar, Chennai - 600017',
    coordinates: [13.0569, 80.2833],
    capacity: 500,
    currentOccupancy: 320,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water'],
    contact: '+91 44 25619206',
    status: 'open'
  },
  {
    id: '2',
    name: 'Marina Beach Community Center',
    address: 'Marina Beach Road, Chennai - 600005',
    coordinates: [13.0569, 80.2833],
    capacity: 1000,
    currentOccupancy: 800,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water', 'Children Area'],
    contact: '+91 44 28593990',
    status: 'open'
  },
  {
    id: '3',
    name: 'Anna Nagar Government School',
    address: 'Anna Nagar West, Chennai - 600040',
    coordinates: [13.0827, 80.2707],
    capacity: 750,
    currentOccupancy: 750,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power'],
    contact: '+91 44 28554147',
    status: 'full'
  },
  {
    id: '4',
    name: 'Cuddalore District Collector Office',
    address: 'Collector Office Road, Cuddalore - 607001',
    coordinates: [11.7463, 79.7680],
    capacity: 300,
    currentOccupancy: 150,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water'],
    contact: '+91 4142 220001',
    status: 'open'
  },
  {
    id: '5',
    name: 'Kodaikanal Government Hospital',
    address: 'Hospital Road, Kodaikanal - 624101',
    coordinates: [10.2300, 77.4850],
    capacity: 200,
    currentOccupancy: 120,
    amenities: ['Medical Station', 'Food Service', 'Bathrooms', 'Power', 'Water', 'Emergency Care'],
    contact: '+91 4542 240001',
    status: 'open'
  }
]

// Mock risk zones for Tamil Nadu heatmap
export const mockRiskZones: RiskZone[] = [
  {
    id: '1',
    type: 'flood',
    severity: 0.9,
    coordinates: [
      [80.2707, 13.0827], // Chennai
      [80.2833, 13.0569], // Marina Beach
      [80.2500, 13.0000], // Adyar
      [80.2707, 13.0827]  // Back to Chennai
    ],
    lastUpdated: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    type: 'landslide',
    severity: 0.7,
    coordinates: [
      [76.7000, 11.4100], // Nilgiris
      [76.9800, 10.3300], // Valparai
      [77.4850, 10.2300], // Kodaikanal
      [76.7000, 11.4100]  // Back to Nilgiris
    ],
    lastUpdated: '2024-01-20T09:30:00Z'
  },
  {
    id: '3',
    type: 'cyclone',
    severity: 0.8,
    coordinates: [
      [79.9300, 10.7700], // Nagapattinam
      [79.3100, 9.2900],  // Rameswaram
      [77.5400, 8.1000],  // Kanyakumari
      [79.9300, 10.7700]  // Back to Nagapattinam
    ],
    lastUpdated: '2024-01-20T08:45:00Z'
  }
]

// Mock dashboard metrics for Tamil Nadu
export const mockDashboardMetrics = {
  activeAlerts: 18,
  citizenReports: 89,
  highRiskZones: 12,
  activeShelters: 8,
  evacuatedFamilies: 856,
  availableShelterCapacity: 1850
}

export const mockWeatherInfo: WeatherInfo = {
  location: 'Chennai Central',
  weather: 'overcast clouds',
  temperature: 29.5,
  humidity: 75,
  windSpeed: 12.5,
  coordinates: [13.0827, 80.2707],
  lastUpdated: 'Aug 23, 2025 7:14 PM',
};

export const mockDisasterPrediction: DisasterPrediction = {
  risk: 'Moderate flood risk in coastal areas',
  chance: 0.4,
};