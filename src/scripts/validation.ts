import type { FormValues } from './form-io';

export function isAllDeclared(values: FormValues, count: number): boolean {
  for (let i = 1; i <= count; i++) {
    if (values[`voorwaarde-${i}`] !== true) return false;
  }
  return true;
}

export function countChecked(values: FormValues, count: number): number {
  let n = 0;
  for (let i = 1; i <= count; i++) {
    if (values[`voorwaarde-${i}`] === true) n++;
  }
  return n;
}
