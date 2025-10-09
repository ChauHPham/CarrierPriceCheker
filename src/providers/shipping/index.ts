import { ShippoAdapter } from './adapters/ShippoAdapter';
import { ShippingProvider } from './Provider';
export const shippingProviders: ShippingProvider[] = [new ShippoAdapter()];