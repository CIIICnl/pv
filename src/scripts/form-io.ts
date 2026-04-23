export type FormValues = Record<string, string | boolean>;

const FIELD_SELECTOR = '[data-pwz-field]';

type FieldEl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function allFields(): FieldEl[] {
  return Array.from(document.querySelectorAll<FieldEl>(FIELD_SELECTOR));
}

export function readForm(): FormValues {
  const values: FormValues = {};
  for (const el of allFields()) {
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox') {
        values[el.id] = el.checked;
      } else if (el.type === 'radio') {
        if (el.checked) values[el.name] = el.value;
      } else {
        values[el.id] = el.value;
      }
    } else {
      values[el.id] = el.value;
    }
  }
  return values;
}

export function writeForm(values: FormValues): void {
  for (const el of allFields()) {
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox') {
        const v = values[el.id];
        el.checked = v === true || v === 'true';
      } else if (el.type === 'radio') {
        const v = values[el.name];
        el.checked = typeof v === 'string' && v === el.value;
      } else {
        const v = values[el.id];
        if (typeof v === 'string') el.value = v;
      }
    } else {
      const v = values[el.id];
      if (typeof v === 'string') el.value = v;
    }
  }
}

export function clearFormFields(): void {
  for (const el of allFields()) {
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = false;
      } else {
        el.value = '';
      }
    } else {
      el.value = '';
    }
  }
}
