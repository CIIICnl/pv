/**
 * Accessible replacements for window.confirm / window.alert using native
 * <dialog>. Creates the element lazily and reuses it for subsequent calls.
 */

import type { Translatable } from '../data/i18n';
import { currentLang } from './lang';

const OK: Translatable = { nl: 'OK', en: 'OK' };
const CANCEL: Translatable = { nl: 'Annuleren', en: 'Cancel' };

let el: HTMLDialogElement | null = null;

function ensureDialog(): HTMLDialogElement {
  if (el) return el;
  el = document.createElement('dialog');
  el.className = 'pwz-dialog';
  el.setAttribute('aria-labelledby', 'pwz-dialog-message');
  el.innerHTML = `
    <form method="dialog" class="pwz-dialog__form">
      <p id="pwz-dialog-message" class="pwz-dialog__message" data-pwz-dialog-message></p>
      <div class="pwz-dialog__actions">
        <button type="submit" value="cancel" class="btn btn-ghost" data-pwz-dialog-cancel></button>
        <button type="submit" value="ok" class="btn btn-primary" data-pwz-dialog-ok></button>
      </div>
    </form>
  `;
  document.body.append(el);
  return el;
}

interface DialogOptions {
  message: string;
  okLabel?: string;
  cancelLabel?: string;
  variant?: 'confirm' | 'alert';
}

function open({ message, okLabel, cancelLabel, variant = 'confirm' }: DialogOptions): Promise<boolean> {
  const lang = currentLang();
  const dialog = ensureDialog();
  const msg = dialog.querySelector<HTMLElement>('[data-pwz-dialog-message]')!;
  const ok = dialog.querySelector<HTMLButtonElement>('[data-pwz-dialog-ok]')!;
  const cancel = dialog.querySelector<HTMLButtonElement>('[data-pwz-dialog-cancel]')!;

  msg.textContent = message;
  ok.textContent = okLabel ?? OK[lang];
  cancel.textContent = cancelLabel ?? CANCEL[lang];
  cancel.hidden = variant === 'alert';

  return new Promise((resolve) => {
    const onClose = () => {
      dialog.removeEventListener('close', onClose);
      resolve(dialog.returnValue === 'ok');
    };
    dialog.addEventListener('close', onClose);
    dialog.returnValue = '';
    dialog.showModal();
    ok.focus();
  });
}

export const dialog = {
  confirm: (message: string) => open({ message, variant: 'confirm' }),
  alert: (message: string) => open({ message, variant: 'alert', cancelLabel: '' }),
};
