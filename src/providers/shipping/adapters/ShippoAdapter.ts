import { ShippingProvider } from '../Provider';
import { ShippingQuoteRequest, ShippingQuote } from '../../../types';
import fetch from 'node-fetch';

export class ShippoAdapter implements ShippingProvider {
  name = 'Shippo';
  async quote(req: ShippingQuoteRequest): Promise<ShippingQuote[]> {
    const apiKey = process.env.SHIPPO_API_KEY;
    if (!apiKey) throw new Error('Missing SHIPPO_API_KEY');
    const url = 'https://api.goshippo.com/shipments/';
    const payload = {
      address_from: { name: 'Sender', street1: req.from.line1, city: req.from.city, zip: req.from.postalCode, country: req.from.country },
      address_to: { name: 'Recipient', street1: req.to.line1, city: req.to.city, zip: req.to.postalCode, country: req.to.country },
      parcels: [{ length: req.parcel.lengthCm, width: req.parcel.widthCm, height: req.parcel.heightCm, distance_unit: 'cm', weight: req.parcel.weightKg, mass_unit: 'kg' }],
      async: false,
    };
    const res = await fetch(url, { method: 'POST', headers: { Authorization: `ShippoToken ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = (await res.json()) as { rates?: any[] };
    if (!data.rates) throw new Error(JSON.stringify(data));
    return data.rates.map((r: any) => ({
      provider: r.provider, serviceLevel: r.servicelevel.name,
      price: { amount: parseFloat(r.amount_local), currency: r.currency_local },
      etaDays: r.estimated_days, termsUrl: r.provider_image_75
    }));
  }
}