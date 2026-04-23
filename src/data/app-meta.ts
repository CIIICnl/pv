import type { Translatable } from './i18n';

export const appMeta = {
  name: {
    nl: 'Publieke Waarden Zelftoets',
    en: 'Public Values Self-Assessment',
  } as Translatable,
  shortName: { nl: 'Zelftoets', en: 'Self-Assessment' } as Translatable,
  org: 'CIIIC',
  orgLong: 'Creative Industries Immersive Impact Coalition',
  version: '1.0',
  dateLabel: { nl: '10 juli 2025', en: '10 July 2025' } as Translatable,
  versionLine: {
    nl: 'Versie 1.0 · 10 juli 2025',
    en: 'Version 1.0 · 10 July 2025',
  } as Translatable,
  authors: {
    nl: 'Rathenau Instituut, Waag Futurelab en PublicSpaces',
    en: 'Rathenau Institute, Waag Futurelab and PublicSpaces',
  } as Translatable,
  authorsAmp: {
    nl: 'Rathenau Instituut, Waag Futurelab & PublicSpaces',
    en: 'Rathenau Institute, Waag Futurelab & PublicSpaces',
  } as Translatable,
  programme: {
    nl: 'Nationaal Groeifonds-programma',
    en: 'National Growth Fund Programme',
  } as Translatable,
  urls: {
    site: 'https://www.ciiic.nl',
    siteLabel: 'ciiic.nl',
    source: 'https://github.com/CIIICnl/Publieke-Waarden-Richtlijn-Zelftoets',
    sourceLabel: { nl: 'Bron op GitHub', en: 'Source on GitHub' } as Translatable,
  },
} as const;
