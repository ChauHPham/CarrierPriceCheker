import { ShippingQuoteRequest, ShippingQuote } from '../../types';
export interface ShippingProvider { name: string; quote(req: ShippingQuoteRequest): Promise<ShippingQuote[]>; }