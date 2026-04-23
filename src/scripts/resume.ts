import type { FormValues } from './form-io';

const BOT_URL: string =
  (import.meta.env.PUBLIC_BOT_URL as string | undefined) ?? 'https://bot.ciiic.nl';

export const DRAFT_PARAM = 'draft';
const TOKEN_RE = /^[A-Za-z0-9_-]{40,50}$/;

export type SaveErrorCode =
  | 'rate_limited'
  | 'invalid_email'
  | 'payload_too_large'
  | 'email_send_failed'
  | 'network'
  | 'unknown';

export interface SaveError {
  code: SaveErrorCode;
  retryAfterSeconds?: number;
}

export interface SaveSuccess {
  expiresAt: number;
}

export async function saveDraft(data: FormValues, email: string): Promise<SaveSuccess> {
  let res: Response;
  try {
    res = await fetch(`${BOT_URL}/draft/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, email }),
    });
  } catch {
    throw { code: 'network' } satisfies SaveError;
  }

  const body = await res.json().catch(() => ({}) as Record<string, unknown>);

  if (res.status === 429) {
    const retry = typeof body.retryAfterSeconds === 'number' ? body.retryAfterSeconds : undefined;
    throw { code: 'rate_limited', retryAfterSeconds: retry } satisfies SaveError;
  }
  if (!res.ok) {
    const code = typeof body.error === 'string' ? (body.error as SaveErrorCode) : 'unknown';
    throw { code } satisfies SaveError;
  }
  const expiresAt = typeof body.expiresAt === 'number' ? body.expiresAt : 0;
  return { expiresAt };
}

export async function loadDraft(token: string): Promise<FormValues | null> {
  if (!TOKEN_RE.test(token)) return null;
  try {
    const res = await fetch(`${BOT_URL}/draft/${encodeURIComponent(token)}`);
    if (!res.ok) return null;
    const body = (await res.json()) as { data?: unknown };
    if (!body || typeof body.data !== 'object' || body.data === null) return null;
    return body.data as FormValues;
  } catch {
    return null;
  }
}

/** Extract and consume the draft token from the current URL. Returns null if none present or malformed. */
export function takeDraftTokenFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const token = params.get(DRAFT_PARAM);
  if (!token) return null;

  params.delete(DRAFT_PARAM);
  const qs = params.toString();
  const newUrl =
    window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash;
  window.history.replaceState(null, '', newUrl);

  return TOKEN_RE.test(token) ? token : null;
}
