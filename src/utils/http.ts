import { request } from 'undici';
export async function httpJson<T>(url: string, opts: any = {}): Promise<T> {
  const res = await request(url, { ...opts, headers: { 'content-type': 'application/json', ...(opts.headers || {}) } });
  const body = await res.body.json();
  if (res.statusCode >= 400) throw Object.assign(new Error('HTTP error'), { status: res.statusCode, body });
  return body as T;
}