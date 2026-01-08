export type Activity =  {
  id: string;
  type: 'activity';
  self?: {
    href: string;
    methods: string[];
  };
  name: string;
  shortDescription?: string;
  description?: string;
  geoCode: GeoCode;
  rating?: string;
  pictures?: string[];
  bookingLink?: string;
  price?: Price;
  minimumDuration?: string; // ISO 8601 duration format (e.g., "PT2H30M")
  maximumDuration?: string;
}

// Geographic coordinates
interface GeoCode {
  latitude: number;
  longitude: number;
}

// Pricing information
interface Price {
  currencyCode: string; // e.g., "EUR", "USD", "GBP"
  amount: string; // String representation of decimal (e.g., "45.00")
}