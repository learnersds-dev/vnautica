export interface Villa {
  id: string;
  name: string;
  slug: string;
  category: 'overwater' | 'beach' | 'ocean-suite';
  tagline: string;
  description: string;
  features: string[];
  maxGuests: number;
  bedrooms: number;
  size: string; // e.g. "220 sqm"
  images: string[];
  hasPool: boolean;
  hasWhirlpool: boolean;
  viewType: 'sunset' | 'sunrise' | 'lagoon' | 'ocean';
}

export interface RateData {
  villaId: string;
  currency: string;
  baseRate: number;        // rack rate from Kafka
  discountedRate: number;  // our rate (9% off)
  discountPercent: number;
  mealPlan: string;
  validFrom: string;
  validTo: string;
  availability: 'available' | 'limited' | 'sold_out';
  lastUpdated: string;     // ISO timestamp from Kafka
}

export interface RateMessage {
  topic: string;
  partition: number;
  offset: string;
  timestamp: string;
  value: {
    villaId: string;
    rackRate: number;
    currency: string;
    mealPlan: string;
    availability: string;
    effectiveDate: string;
    expiryDate: string;
  };
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  checkIn: string;
  checkOut: string;
  villaPreference: string;
  adults: number;
  children: number;
  specialRequests: string;
  marketingConsent: boolean;
  gclid?: string;       // Google Ads click ID
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  image: string;
  hours: string;
  highlight: string;
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'water' | 'wellness' | 'dining' | 'adventure' | 'culture';
}
