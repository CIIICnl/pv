export type Lang = 'nl' | 'en';

export const DEFAULT_LANG: Lang = 'nl';

export const LANGS: ReadonlyArray<{ id: Lang; label: string; name: string }> = [
  { id: 'nl', label: 'NL', name: 'Nederlands' },
  { id: 'en', label: 'EN', name: 'English' },
];

export type Translatable<T = string> = Record<Lang, T>;

export function t<T>(value: Translatable<T>, lang: Lang): T {
  return value[lang];
}

export function isLang(v: unknown): v is Lang {
  return v === 'nl' || v === 'en';
}
