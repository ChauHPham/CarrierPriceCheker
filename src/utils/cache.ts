import { LRUCache } from 'lru-cache';
import { CONFIG } from '../config';
export const cache = new LRUCache<string, any>({ ttl: CONFIG.cacheTtlSeconds * 1000, max: 500 });
export function cacheKey(prefix: string, payload: unknown) { return `${prefix}:${Buffer.from(JSON.stringify(payload)).toString('base64url')}`; }