import { readForm } from './form-io';
import { currentLang } from './lang';
import { saveDraft, type SaveError } from './resume';
import { strings } from '../data/strings';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let el: HTMLDialogElement | null = null;

function ensureDialog(): HTMLDialogElement {
  if (el) return el;
  const r = strings.resume;
  const consentHref = r.consentLinkHref;

  el = document.createElement('dialog');
  el.className = 'pwz-dialog pwz-resume';
  el.setAttribute('aria-labelledby', 'pwz-resume-title');
  el.innerHTML = `
    <form class="pwz-resume__form" novalidate>
      <header class="pwz-resume__header">
        <h2 class="pwz-resume__title" id="pwz-resume-title">
          <span data-lang="nl">${r.title.nl}</span>
          <span data-lang="en">${r.title.en}</span>
        </h2>
        <button
          type="button"
          class="pwz-resume__close"
          data-pwz-resume-close
          aria-label="${r.close.nl}"
          data-aria-label-nl="${r.close.nl}"
          data-aria-label-en="${r.close.en}"
        ><span aria-hidden="true">&times;</span></button>
      </header>

      <div class="pwz-resume__body" data-pwz-resume-view="form">
        <p class="pwz-resume__intro">
          <span data-lang="nl">${r.intro.nl}</span>
          <span data-lang="en">${r.intro.en}</span>
        </p>

        <div class="field">
          <label class="field-label" for="pwz-resume-email">
            <span data-lang="nl">${r.emailLabel.nl}</span>
            <span data-lang="en">${r.emailLabel.en}</span>
          </label>
          <input
            type="email"
            id="pwz-resume-email"
            name="email"
            class="input"
            required
            autocomplete="email"
            data-pwz-resume-email
            data-placeholder-nl="${r.emailPlaceholder.nl}"
            data-placeholder-en="${r.emailPlaceholder.en}"
            placeholder="${r.emailPlaceholder.nl}"
          />
        </div>

        <label class="choice pwz-resume__consent">
          <input type="checkbox" data-pwz-resume-consent required />
          <span>
            <span data-lang="nl">${r.consentLabel.nl} <a href="${consentHref}" target="_blank" rel="noopener">${r.consentLink.nl}</a>.</span>
            <span data-lang="en">${r.consentLabel.en} <a href="${consentHref}" target="_blank" rel="noopener">${r.consentLink.en}</a>.</span>
          </span>
        </label>

        <p class="pwz-resume__warning">
          <span data-lang="nl">${r.shareWarning.nl}</span>
          <span data-lang="en">${r.shareWarning.en}</span>
        </p>

        <p class="pwz-resume__error" data-pwz-resume-error hidden></p>

        <div class="pwz-resume__actions">
          <button type="button" class="btn btn-ghost" data-pwz-resume-close>
            <span data-lang="nl">${r.cancel.nl}</span>
            <span data-lang="en">${r.cancel.en}</span>
          </button>
          <button type="submit" class="btn btn-primary" data-pwz-resume-submit>
            <span data-pwz-resume-submit-label>
              <span data-lang="nl">${r.submit.nl}</span>
              <span data-lang="en">${r.submit.en}</span>
            </span>
          </button>
        </div>
      </div>

      <div class="pwz-resume__body" data-pwz-resume-view="success" hidden>
        <h3 class="pwz-resume__success-title">
          <span data-lang="nl">${r.successTitle.nl}</span>
          <span data-lang="en">${r.successTitle.en}</span>
        </h3>
        <p class="pwz-resume__success-body" data-pwz-resume-success-body></p>
        <div class="pwz-resume__actions">
          <button type="button" class="btn btn-primary" data-pwz-resume-close>
            <span data-lang="nl">${r.close.nl}</span>
            <span data-lang="en">${r.close.en}</span>
          </button>
        </div>
      </div>
    </form>
  `;
  document.body.append(el);

  const form = el.querySelector<HTMLFormElement>('form')!;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    void handleSubmit();
  });

  el.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.closest('[data-pwz-resume-close]')) {
      el!.close();
    }
  });

  // Sync placeholder on lang change (since placeholder is an attr not visible text).
  // Cheap re-read whenever dialog opens.

  return el;
}

function showView(view: 'form' | 'success'): void {
  if (!el) return;
  el.querySelectorAll<HTMLElement>('[data-pwz-resume-view]').forEach((node) => {
    node.hidden = node.dataset.pwzResumeView !== view;
  });
}

function setSubmitting(submitting: boolean): void {
  if (!el) return;
  const r = strings.resume;
  const lang = currentLang();
  const btn = el.querySelector<HTMLButtonElement>('[data-pwz-resume-submit]');
  const label = el.querySelector<HTMLElement>('[data-pwz-resume-submit-label]');
  const email = el.querySelector<HTMLInputElement>('[data-pwz-resume-email]');
  const consent = el.querySelector<HTMLInputElement>('[data-pwz-resume-consent]');
  if (!btn || !label || !email || !consent) return;
  btn.disabled = submitting;
  email.disabled = submitting;
  consent.disabled = submitting;
  if (submitting) {
    label.textContent = r.submitting[lang];
  } else {
    label.innerHTML = `
      <span data-lang="nl">${r.submit.nl}</span>
      <span data-lang="en">${r.submit.en}</span>
    `;
  }
}

function showError(message: string): void {
  if (!el) return;
  const err = el.querySelector<HTMLElement>('[data-pwz-resume-error]');
  if (!err) return;
  err.textContent = message;
  err.hidden = false;
}

function clearError(): void {
  if (!el) return;
  const err = el.querySelector<HTMLElement>('[data-pwz-resume-error]');
  if (!err) return;
  err.textContent = '';
  err.hidden = true;
}

function errorMessageFor(err: SaveError): string {
  const lang = currentLang();
  const r = strings.resume;
  switch (err.code) {
    case 'rate_limited':
      return r.errorRateLimited[lang];
    case 'invalid_email':
      return r.errorInvalidEmail[lang];
    case 'email_send_failed':
      return r.errorSendFailed[lang];
    case 'network':
      return r.errorNetwork[lang];
    default:
      return r.errorGeneric[lang];
  }
}

async function handleSubmit(): Promise<void> {
  if (!el) return;
  const lang = currentLang();
  const r = strings.resume;
  const emailInput = el.querySelector<HTMLInputElement>('[data-pwz-resume-email]');
  const consentInput = el.querySelector<HTMLInputElement>('[data-pwz-resume-consent]');
  if (!emailInput || !consentInput) return;

  clearError();
  const email = emailInput.value.trim();
  if (!EMAIL_RE.test(email)) {
    showError(r.errorInvalidEmail[lang]);
    emailInput.focus();
    return;
  }
  if (!consentInput.checked) {
    showError(r.errorConsentRequired[lang]);
    consentInput.focus();
    return;
  }

  setSubmitting(true);
  try {
    await saveDraft(readForm(), email);
    const body = el.querySelector<HTMLElement>('[data-pwz-resume-success-body]');
    if (body) {
      body.innerHTML = '';
      const nl = document.createElement('span');
      nl.dataset.lang = 'nl';
      nl.textContent = r.successBody.nl(email);
      const en = document.createElement('span');
      en.dataset.lang = 'en';
      en.textContent = r.successBody.en(email);
      body.append(nl, en);
    }
    showView('success');
  } catch (caught) {
    const err = caught as SaveError;
    showError(errorMessageFor(err));
  } finally {
    setSubmitting(false);
  }
}

export function openResumeModal(): void {
  const dialog = ensureDialog();
  const lang = currentLang();
  const r = strings.resume;

  // Reset to form view
  showView('form');
  clearError();
  const emailInput = dialog.querySelector<HTMLInputElement>('[data-pwz-resume-email]');
  const consentInput = dialog.querySelector<HTMLInputElement>('[data-pwz-resume-consent]');
  if (emailInput) {
    emailInput.value = '';
    emailInput.placeholder = r.emailPlaceholder[lang];
  }
  if (consentInput) consentInput.checked = false;

  dialog.showModal();
  setTimeout(() => emailInput?.focus(), 0);
}

export function bindResumeButton(): void {
  const btn = document.getElementById('pwz-save-resume');
  if (!btn) return;
  btn.addEventListener('click', () => openResumeModal());
}
