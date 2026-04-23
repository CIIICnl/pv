import { readForm, writeForm, type FormValues } from './form-io';
import { TOTAL_STEPS } from '../data/steps';

const STORAGE_KEY = 'pwz-draft-v1';
const STEP_KEY = 'pwz-step-v2';

export function persist(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readForm()));
  } catch {
    /* quota / privacy mode — silently ignore */
  }
}

export function restore(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    writeForm(JSON.parse(raw) as FormValues);
  } catch {
    /* corrupt JSON — ignore */
  }
}

export function clearStoredForm(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function clampStep(n: number): number {
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.min(TOTAL_STEPS, Math.trunc(n)));
}

export function readStoredStep(): number {
  try {
    const raw = localStorage.getItem(STEP_KEY);
    if (!raw) return 1;
    return clampStep(parseInt(raw, 10));
  } catch {
    return 1;
  }
}

export function writeStoredStep(n: number): void {
  try {
    localStorage.setItem(STEP_KEY, String(clampStep(n)));
  } catch {
    /* ignore */
  }
}
