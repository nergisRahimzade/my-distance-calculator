export type Activity = {
  score: number;
  id: string;
  type: 'activity';
  self?: {
    href: string;
    methods: string[];
  };
  name: string;
  shortDescription?: string;
  rating?: string;
  pictures?: string[];
  bookingLink?: string;
  price?: Price;
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