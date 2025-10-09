import { Router } from 'express';
import { z } from 'zod';
import { shippingProviders } from '../providers/shipping';
import { cache, cacheKey } from '../utils/cache';
const r = Router();
const ReqSchema = z.object({
    from: z.object({ line1: z.string(), city: z.string(), postalCode: z.string(), country: z.string() }),
    to: z.object({ line1: z.string(), city: z.string(), postalCode: z.string(), country: z.string() }),
    parcel: z.object({ lengthCm: z.number(), widthCm: z.number(), heightCm: z.number(), weightKg: z.number() })
});
r.post('/compare/shipping', async (req, res) => {
    const parsed = ReqSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.flatten() });
    const key = cacheKey('ship', parsed.data);
    const cached = cache.get(key);
    if (cached)
        return res.json({ cached: true, quotes: cached });
    try {
        const results = (await Promise.all(shippingProviders.map((p) => p.quote(parsed.data)))).flat();
        results.sort((a, b) => a.price.amount - b.price.amount);
        cache.set(key, results);
        res.json({ cached: false, quotes: results });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
export default r;
