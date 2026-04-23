import { readForm } from './form-io';
import { countChecked, isAllDeclared } from './validation';
import { voorwaarden } from '../data/pwz';
import { strings } from '../data/strings';
import { currentLang } from './lang';

interface StatusRefs {
  signed: HTMLElement;
  signedLabel: HTMLElement;
  signedCount: HTMLElement;
  signedTotal: HTMLElement;
  signedGoto: HTMLElement;
  filled: HTMLElement;
  filledTotal: HTMLElement;
  downloadBtn: HTMLButtonElement;
  voorwaardenFieldset: HTMLFieldSetElement | null;
  voorwaardenError: HTMLElement | null;
}

let refs: StatusRefs | null = null;

function resolveRefs(): StatusRefs | null {
  if (refs) return refs;

  const root = document.getElementById('pwz-status');
  const downloadBtn = document.getElementById('pwz-download');
  if (!root || !(downloadBtn instanceof HTMLButtonElement)) return null;

  const pick = (sel: string) => root.querySelector<HTMLElement>(sel);
  const signed = pick('[data-pwz-status-signed]');
  const signedLabel = pick('[data-pwz-status-signed-label]');
  const signedCount = pick('[data-pwz-status-signed-count]');
  const signedTotal = pick('[data-pwz-status-signed-total]');
  const signedGoto = pick('[data-pwz-status-signed-goto]');
  const filled = pick('[data-pwz-status-filled]');
  const filledTotal = pick('[data-pwz-status-filled-total]');
  if (!signed || !signedLabel || !signedCount || !signedTotal || !signedGoto || !filled || !filledTotal) {
    return null;
  }

  const voorwaardenFieldset = document.getElementById('voorwaarden');
  const voorwaardenError = document.querySelector<HTMLElement>(
    '[data-pwz-voorwaarden-error]',
  );

  refs = {
    signed,
    signedLabel,
    signedCount,
    signedTotal,
    signedGoto,
    filled,
    filledTotal,
    downloadBtn,
    voorwaardenFieldset:
      voorwaardenFieldset instanceof HTMLFieldSetElement ? voorwaardenFieldset : null,
    voorwaardenError,
  };
  return refs;
}

export function updateStatus(): void {
  const r = resolveRefs();
  if (!r) return;

  const lang = currentLang();
  const length = voorwaarden[lang].length;
  const values = readForm();
  const totalCheckboxes = length;
  const checkedCount = countChecked(values, length);
  const allDeclared = isAllDeclared(values, length);

  const textareas = Array.from(
    document.querySelectorAll<HTMLTextAreaElement>('textarea[data-pwz-field]'),
  );
  const filledCount = textareas.filter((t) => t.value.trim().length > 0).length;

  r.signedCount.textContent = String(checkedCount);
  r.signedTotal.textContent = String(totalCheckboxes);
  r.filled.textContent = String(filledCount);
  r.filledTotal.textContent = String(textareas.length);

  r.signed.dataset.state = allDeclared ? 'ok' : 'warn';
  r.signedLabel.textContent = allDeclared
    ? strings.download.statusSignedOk[lang](checkedCount, totalCheckboxes)
    : strings.download.statusSignedLabel[lang];
  r.signedGoto.hidden = allDeclared;

  r.downloadBtn.disabled = !allDeclared;

  if (r.voorwaardenFieldset) {
    r.voorwaardenFieldset.setAttribute('aria-invalid', allDeclared ? 'false' : 'true');
  }
  if (r.voorwaardenError) {
    r.voorwaardenError.textContent = allDeclared
      ? strings.voorwaarden.errorComplete[lang]
      : strings.voorwaarden.errorIncomplete[lang](
          totalCheckboxes - checkedCount,
          totalCheckboxes,
        );
    r.voorwaardenError.dataset.state = allDeclared ? 'ok' : 'warn';
  }
}
