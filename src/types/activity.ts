import type { Price } from "./price";

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