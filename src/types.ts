export type Money = { amount: number; currency: string };
export type Address = { line1: string; city: string; state?: string; region?: string; postalCode: string; country: string; };
export type Parcel = { lengthCm: number; widthCm: number; heightCm: number; weightKg: number };
export type ShippingQuoteRequest = { from: Address; to: Address; parcel: Parcel; serviceLevels?: string[]; };
export type ShippingQuote = { provider: string; serviceLevel: string; price: Money; etaDays?: number; termsUrl?: string; raw?: unknown; };