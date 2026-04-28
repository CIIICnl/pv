import { generatePdf } from './pdf';
import { downloadMarkdown } from './markdown';
import { voorwaarden } from '../data/pwz';
import { strings } from '../data/strings';
import { readForm, writeForm, clearFormFields } from './form-io';
import {
  persist,
  restore,
  clearStoredForm,
  readStoredStep,
} from './storage';
import { bindStepControls, goToStep } from './wizard';
import { bindCarousels } from './carousel';
import { updateStatus } from './status';
import { dialog } from './dialog';
import {
  applyLang,
  bindLangSwitcher,
  currentLang,
  onLangChange,
  readStoredLang,
} from './lang';
import { loadDraft, takeDraftTokenFromUrl } from './resume';
import { bindResumeButton } from './resume-modal';

export type { FormValues } from './form-io';

function syncFollowups(): void {
  document.querySelectorAll<HTMLElement>('[data-pwz-yesno-block]').forEach((block) => {
    const id = block.dataset.pwzYesnoBlock;
    if (!id) return;
    const checked = block.querySelector<HTMLInputElement>(
      `input[name="${id}-keuze"]:checked`,
    );
    const value = checked?.value ?? '';
    block.querySelectorAll<HTMLElement>('[data-pwz-yesno-followup]').forEach((fu) => {
      fu.hidden = fu.dataset.pwzYesnoWhen !== value;
    });
  });
}

function focusFirstFollowupField(blockId: string): void {
  const block = document.querySelector<HTMLElement>(
    `[data-pwz-yesno-block="${blockId}"]`,
  );
  if (!block) return;
  const visibleFollowup = Array.from(
    block.querySelectorAll<HTMLElement>('[data-pwz-yesno-followup]'),
  ).find((fu) => !fu.hidden);
  if (!visibleFollowup) return;
  const firstInput = visibleFollowup.querySelector<HTMLElement>(
    'input, textarea, select',
  );
  firstInput?.focus({ preventScroll: true });
}

async function reset(): Promise<void> {
  const ok = await dialog.confirm(strings.download.resetConfirm[currentLang()]);
  if (!ok) return;
  clearFormFields();
  clearStoredForm();
  syncFollowups();
  updateStatus();
  goToStep(1);
}

async function download(): Promise<void> {
  const button = document.getElementById('pwz-download');
  if (!(button instanceof HTMLButtonElement) || button.disabled) return;
  const lang = currentLang();
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = strings.download.downloading[lang];
  try {
    await generatePdf(readForm(), { voorwaarden: voorwaarden[lang] }, lang);
  } catch (err) {
    console.error('[pwz] PDF generation failed', err);
    void dialog.alert(strings.download.downloadFailed[lang]);
  } finally {
    button.innerHTML = original;
    button.disabled = false;
  }
}

export function initForm(): void {
  applyLang(readStoredLang());
  bindLangSwitcher();

  restore();
  syncFollowups();
  updateStatus();
  bindStepControls();
  bindCarousels();

  goToStep(readStoredStep(), { scroll: false, focus: false });

  onLangChange(() => updateStatus());

  document.addEventListener('input', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement) || !target.matches('[data-pwz-field]')) return;
    persist();
    updateStatus();
  });

  document.addEventListener('change', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement) || !target.matches('[data-pwz-field]')) return;
    if (target.matches('[data-pwz-yesno-trigger]')) {
      syncFollowups();
      const block = target.closest<HTMLElement>('[data-pwz-yesno-block]');
      const blockId = block?.dataset.pwzYesnoBlock;
      if (blockId) focusFirstFollowupField(blockId);
    }
    persist();
    updateStatus();
  });

  document.getElementById('pwz-reset')?.addEventListener('click', () => void reset());
  document.getElementById('pwz-download')?.addEventListener('click', () => void download());
  document.getElementById('pwz-download-md')?.addEventListener('click', () => {
    const lang = currentLang();
    downloadMarkdown(readForm(), { voorwaarden: voorwaarden[lang] }, lang);
  });
  bindResumeButton();

  void restoreDraftFromUrl();
}

async function restoreDraftFromUrl(): Promise<void> {
  const token = takeDraftTokenFromUrl();
  if (!token) return;
  const data = await loadDraft(token);
  const lang = currentLang();
  if (!data) {
    void dialog.alert(strings.resume.toastNotFound[lang]);
    return;
  }
  writeForm(data);
  persist();
  syncFollowups();
  updateStatus();
  void dialog.alert(strings.resume.toastRestored[lang]);
}
