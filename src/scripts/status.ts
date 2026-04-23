import { readForm } from './form-io';
import { countChecked, isAllDeclared } from './validation';
import { voorwaarden } from '../data/pwz';
import { strings } from '../data/strings';
import { currentLang } from './lang';
import type { Lang } from '../data/i18n';

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
  sigName: HTMLElement;
  sigRoleOrg: HTMLElement;
  sigDate: HTMLElement;
  sigMissing: HTMLElement;
  sigCheckbox: HTMLInputElement;
  sigConfirmLabel: HTMLElement;
  sigStatusRow: HTMLElement;
  sigStatusValue: HTMLElement;
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

  const sigName = document.querySelector<HTMLElement>('[data-pwz-sig-name]');
  const sigRoleOrg = document.querySelector<HTMLElement>('[data-pwz-sig-roleorg]');
  const sigDate = document.querySelector<HTMLElement>('[data-pwz-sig-date]');
  const sigMissing = document.querySelector<HTMLElement>('[data-pwz-sig-missing]');
  const sigCheckboxEl = document.querySelector<HTMLInputElement>('[data-pwz-sig-checkbox]');
  const sigConfirmLabel = document.querySelector<HTMLElement>(
    '[data-pwz-sig-confirm-label]',
  );
  const sigStatusRow = document.querySelector<HTMLElement>('[data-pwz-status-signature]');
  const sigStatusValue = document.querySelector<HTMLElement>(
    '[data-pwz-status-signature-value]',
  );
  if (
    !sigName ||
    !sigRoleOrg ||
    !sigDate ||
    !sigMissing ||
    !sigCheckboxEl ||
    !sigConfirmLabel ||
    !sigStatusRow ||
    !sigStatusValue
  ) {
    return null;
  }

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
    sigName,
    sigRoleOrg,
    sigDate,
    sigMissing,
    sigCheckbox: sigCheckboxEl,
    sigConfirmLabel,
    sigStatusRow,
    sigStatusValue,
  };
  return refs;
}

function asString(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function missingValue(lang: Lang): string {
  return strings.signature.missingValue[lang];
}

function buildRoleOrg(role: string, org: string, lang: Lang): string {
  if (role && org) return `${role} — ${org}`;
  if (role) return role;
  if (org) return org;
  return missingValue(lang);
}

function formatDate(iso: string, lang: Lang): string {
  if (!iso) return missingValue(lang);
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
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

  const naam = asString(values['meta-naam']);
  const rol = asString(values['meta-rol']);
  const org = asString(values['meta-organisatie']);
  const datum = asString(values['meta-datum']);

  r.sigName.textContent = naam || missingValue(lang);
  r.sigName.dataset.state = naam ? 'ok' : 'warn';
  r.sigRoleOrg.textContent = buildRoleOrg(rol, org, lang);
  r.sigDate.textContent = formatDate(datum, lang);
  r.sigMissing.hidden = Boolean(naam);

  if (!naam && r.sigCheckbox.checked) {
    r.sigCheckbox.checked = false;
  }
  r.sigCheckbox.disabled = !naam;
  r.sigConfirmLabel.textContent = strings.signature.confirmLabel[lang](naam);

  const signatureConfirmed = Boolean(naam) && r.sigCheckbox.checked;
  r.sigStatusRow.dataset.state = signatureConfirmed ? 'ok' : 'warn';
  r.sigStatusValue.textContent = signatureConfirmed
    ? strings.download.statusSignatureOk[lang]
    : strings.download.statusSignatureWaiting[lang];

  r.downloadBtn.disabled = !(allDeclared && signatureConfirmed);

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
