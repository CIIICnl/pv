import type { Translatable, Lang } from './i18n';

export interface Step {
  id: number;
  label: Translatable;
  short: string;
}

export const steps: readonly Step[] = [
  { id: 1, label: { nl: 'Start', en: 'Start' }, short: '·' },
  { id: 2, label: { nl: 'Richtlijn', en: 'Guidelines' }, short: 'A' },
  { id: 3, label: { nl: 'Project', en: 'Project' }, short: 'B1' },
  { id: 4, label: { nl: 'Voorwaarden', en: 'Conditions' }, short: 'B2' },
  { id: 5, label: { nl: 'Vragen', en: 'Questions' }, short: 'B3' },
  { id: 6, label: { nl: 'Open vraag', en: 'Open question' }, short: 'B4' },
  { id: 7, label: { nl: 'Download', en: 'Download' }, short: '↓' },
] as const;

export const TOTAL_STEPS = steps.length;

const BACK = { nl: 'Terug', en: 'Back' } as Translatable;
const NEXT = { nl: 'Volgende', en: 'Next' } as Translatable;

function decorate(prefix: Translatable, label: Translatable): Translatable {
  return {
    nl: `${prefix.nl}: ${label.nl}`,
    en: `${prefix.en}: ${label.en}`,
  };
}

export function stepLabel(id: number): Translatable {
  return steps.find((s) => s.id === id)?.label ?? { nl: '', en: '' };
}

export function prevLabel(id: number): Translatable {
  return id > 1 ? decorate(BACK, stepLabel(id - 1)) : BACK;
}

export function nextLabel(id: number): Translatable {
  return id < TOTAL_STEPS ? decorate(NEXT, stepLabel(id + 1)) : NEXT;
}

export function pickStepLabel(id: number, lang: Lang): string {
  return stepLabel(id)[lang];
}
