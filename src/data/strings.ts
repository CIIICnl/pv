import { appMeta } from './app-meta';
import type { Translatable } from './i18n';

export const strings = {
  meta: {
    description: {
      nl: 'Interactieve webversie van de CIIIC Publieke Waarden Zelftoets — vul in en exporteer als PDF voor je aanvraag of offerte.',
      en: 'Interactive web version of the CIIIC Public Values Self-Assessment — fill in and export as PDF for your application or quotation.',
    } as Translatable,
    siteName: {
      nl: `${appMeta.org} ${appMeta.name.nl}`,
      en: `${appMeta.org} ${appMeta.name.en}`,
    } as Translatable,
  },
  header: {
    brandAriaLabel: {
      nl: 'Terug naar startpagina',
      en: 'Back to start page',
    } as Translatable,
    brandShort: appMeta.shortName,
    nav: { nl: 'Stappen in de zelftoets', en: 'Steps in the self-assessment' } as Translatable,
    skip: { nl: 'Direct naar inhoud', en: 'Skip to content' } as Translatable,
    langSwitcher: { nl: 'Taal / Language', en: 'Language / Taal' } as Translatable,
  },
  intro: {
    lead: {
      nl: 'Een verplicht onderdeel van de aanvraag- en offerteprocedure binnen het Nationaal Groeifonds-programma <strong>CIIIC</strong>. Vul hier de richtlijn interactief in en download je antwoorden als PDF.',
      en: 'A required part of the application and quotation procedure within the <strong>CIIIC</strong> National Growth Fund Programme. Fill in the guidelines interactively here and download your answers as a PDF.',
    } as Translatable,
    cta: { nl: 'Start zelftoets', en: 'Start self-assessment' } as Translatable,
    metaAuthorsLabel: { nl: 'Opgesteld door', en: 'Prepared by' } as Translatable,
    metaAuthors: appMeta.authorsAmp,
    metaClientLabel: { nl: 'In opdracht van', en: 'Commissioned by' } as Translatable,
    metaClient: {
      nl: `${appMeta.org} — ${appMeta.orgLong}`,
      en: `${appMeta.org} — ${appMeta.orgLong}`,
    } as Translatable,
    metaProgrammeLabel: { nl: 'Onderdeel van', en: 'Part of' } as Translatable,
    metaProgramme: appMeta.programme,
  },
  richtlijn: {
    sectionLabel: { nl: 'Sectie A', en: 'Section A' } as Translatable,
    title: {
      nl: 'Richtlijn Publieke Waarden binnen Immersive Experiences',
      en: 'Public Values Guidelines within Immersive Experiences',
    } as Translatable,
    disclaimerLabel: { nl: 'Disclaimer:', en: 'Disclaimer:' } as Translatable,
    disclaimer: {
      nl: 'de technologie rondom IX verandert in razend tempo. Specificaties, hardware, software, voorwaarden en wetgeving zijn aan verandering onderhevig. Gedurende de looptijd van CIIIC kan het nodig zijn de consequenties daarvan te vertalen in deze Richtlijn.',
      en: 'the technology around IX is changing at breakneck speed, and specifications, hardware, software, conditions and legislation are subject to change. It is important for CIIIC to continuously monitor these developments and it may prove necessary to reflect their effects in these Guidelines. The current version may therefore be subject to change.',
    } as Translatable,
    introToggle: { nl: 'Inleiding op de Richtlijn', en: 'Introduction to the Guidelines' } as Translatable,
    heading: { nl: 'De zeven waarden', en: 'The seven values' } as Translatable,
    lead: {
      nl: 'Doorloop de zeven publieke waarden hieronder. Gebruik de pijlen of de nummers om te navigeren — niets hoeft hier ingevuld te worden, het is lees- en oriëntatiemateriaal.',
      en: 'Work through the seven public values below. Use the arrows or numbers to navigate — nothing needs to be filled in here, this is reading and orientation material.',
    } as Translatable,
    carouselAria: { nl: 'De zeven publieke waarden', en: 'The seven public values' } as Translatable,
    carouselRoleDesc: { nl: 'carrousel', en: 'carousel' } as Translatable,
    slideRoleDesc: { nl: 'dia', en: 'slide' } as Translatable,
    prev: { nl: 'Vorige waarde', en: 'Previous value' } as Translatable,
    next: { nl: 'Volgende waarde', en: 'Next value' } as Translatable,
    dotsAria: { nl: 'Kies een waarde', en: 'Choose a value' } as Translatable,
    waardeNum: {
      nl: (n: number, total: number) => `Waarde ${n} / ${total}`,
      en: (n: number, total: number) => `Value ${n} / ${total}`,
    },
  },
  project: {
    sectionLabel: { nl: 'Projectgegevens', en: 'Project details' } as Translatable,
    title: { nl: 'Over het project', en: 'About the project' } as Translatable,
    lead: {
      nl: 'Deze gegevens worden bovenaan de PDF opgenomen.',
      en: 'These details will appear at the top of the PDF.',
    } as Translatable,
  },
  voorwaarden: {
    sectionLabel: { nl: 'Sectie B · Deel 1', en: 'Section B · Part 1' } as Translatable,
    title: { nl: 'Voorwaarden', en: 'Conditions' } as Translatable,
    lead: {
      nl: 'Hierbij verklaar ik dat binnen dit project de onderstaande voorwaarden van toepassing zijn. Zonder ondertekening kan geen aanvraag of offerte worden ingediend.',
      en: 'I hereby declare that the following conditions apply within this project. No application or quotation can be submitted without signing.',
    } as Translatable,
    legend: {
      nl: 'Voorwaarden — aanvinken om te ondertekenen',
      en: 'Conditions — check to sign',
    } as Translatable,
    errorIncomplete: {
      nl: (remaining: number, total: number) =>
        `Nog ${remaining} van ${total} voorwaarden te ondertekenen voordat de PDF gedownload kan worden.`,
      en: (remaining: number, total: number) =>
        `${remaining} of ${total} conditions still need to be signed before the PDF can be downloaded.`,
    },
    errorComplete: {
      nl: 'Alle voorwaarden zijn ondertekend.',
      en: 'All conditions have been signed.',
    } as Translatable,
  },
  vragen: {
    sectionLabel: { nl: 'Sectie B · Deel 2', en: 'Section B · Part 2' } as Translatable,
    title: { nl: 'Vragen', en: 'Questions' } as Translatable,
    lead: {
      nl: 'Bij deze vragen zijn er geen goede of foute antwoorden. Het gaat erom dat bewuste keuzes worden gemaakt ten aanzien van publieke waarden, en dat deze worden toegelicht.',
      en: 'With these questions there are no right or wrong answers. What matters is that conscious choices are made in respect of public values, and that those choices are explained.',
    } as Translatable,
    questionPrefix: { nl: 'Vraag', en: 'Question' } as Translatable,
    answerAria: {
      nl: (num: string) => `Antwoord op vraag ${num}`,
      en: (num: string) => `Answer to question ${num}`,
    },
    yes: { nl: 'Ja', en: 'Yes' } as Translatable,
    no: { nl: 'Nee', en: 'No' } as Translatable,
  },
  open: {
    sectionLabel: { nl: 'Sectie B · Deel 3', en: 'Section B · Part 3' } as Translatable,
    title: { nl: 'Open vraag (optioneel)', en: 'Open question (optional)' } as Translatable,
    waardeLabel: { nl: 'Gekozen waarde', en: 'Chosen value' } as Translatable,
    waardePlaceholder: { nl: '— Kies één waarde —', en: '— Choose one value —' } as Translatable,
    toelichtingLabel: { nl: 'Toelichting', en: 'Explanation' } as Translatable,
  },
  download: {
    sectionLabel: { nl: 'Afronden', en: 'Finish' } as Translatable,
    title: {
      nl: 'Download je ingevulde Zelftoets',
      en: 'Download your completed Self-Assessment',
    } as Translatable,
    lead: {
      nl: 'Controleer je antwoorden waar nodig. Zodra alle voorwaarden in Sectie B · Deel 1 zijn ondertekend, wordt de PDF-download geactiveerd.',
      en: 'Review your answers where needed. Once all conditions in Section B · Part 1 are signed, the PDF download is enabled.',
    } as Translatable,
    statusDefault: {
      nl: 'Vul de zelftoets in en download als PDF.',
      en: 'Fill in the self-assessment and download as PDF.',
    } as Translatable,
    statusSignedOk: {
      nl: (checked: number, total: number) => `✓ Voorwaarden ondertekend (${checked}/${total})`,
      en: (checked: number, total: number) => `✓ Conditions signed (${checked}/${total})`,
    },
    statusSignedLabel: {
      nl: 'Voorwaarden ondertekend:',
      en: 'Conditions signed:',
    } as Translatable,
    statusSignedGoto: {
      nl: 'ga naar Voorwaarden',
      en: 'go to Conditions',
    } as Translatable,
    statusOpenAnswers: {
      nl: 'Open antwoorden ingevuld:',
      en: 'Open answers filled in:',
    } as Translatable,
    statusSignatureLabel: {
      nl: 'Ondertekening:',
      en: 'Signing:',
    } as Translatable,
    statusSignatureWaiting: {
      nl: 'nog niet bevestigd',
      en: 'not yet confirmed',
    } as Translatable,
    statusSignatureOk: {
      nl: '✓ Ondertekend',
      en: '✓ Signed',
    } as Translatable,
    reset: { nl: 'Begin opnieuw', en: 'Start over' } as Translatable,
    resetConfirm: {
      nl: 'Weet je zeker dat je opnieuw wilt beginnen? Alle ingevulde gegevens worden gewist.',
      en: 'Are you sure you want to start over? All entered data will be cleared.',
    } as Translatable,
    download: { nl: 'Download PDF', en: 'Download PDF' } as Translatable,
    downloadHelp: {
      nl: 'Het formele document voor je aanvraag of offerte.',
      en: 'The formal document for your application or quotation.',
    } as Translatable,
    downloadMd: {
      nl: 'Download als Markdown',
      en: 'Download as Markdown',
    } as Translatable,
    downloadMdHelp: {
      nl: 'Een toegankelijke platte-tekstversie — handig om terug te lezen, te delen of voor screenreaders.',
      en: 'An accessible plain-text version — handy for re-reading, sharing or for screen readers.',
    } as Translatable,
    downloading: {
      nl: 'PDF wordt gegenereerd…',
      en: 'Generating PDF…',
    } as Translatable,
    downloadFailed: {
      nl: 'Het genereren van de PDF is mislukt. Bekijk de console voor details.',
      en: 'PDF generation failed. Check the console for details.',
    } as Translatable,
  },
  signature: {
    sectionLabel: { nl: 'Ondertekening', en: 'Signing' } as Translatable,
    title: {
      nl: 'Controleer je ondertekening',
      en: 'Review your signing details',
    } as Translatable,
    lead: {
      nl: 'Deze gegevens komen uit stap 3 en worden samen met je antwoorden in de PDF opgenomen.',
      en: 'These details come from step 3 and will be included in the PDF alongside your answers.',
    } as Translatable,
    nameLabel: { nl: 'Ondertekenaar', en: 'Signatory' } as Translatable,
    roleLabel: { nl: 'Rol / organisatie', en: 'Role / organisation' } as Translatable,
    dateLabel: { nl: 'Datum', en: 'Date' } as Translatable,
    missingValue: { nl: '— nog niet ingevuld —', en: '— not yet provided —' } as Translatable,
    missingNameNotice: {
      nl: 'Vul je naam in om het document te ondertekenen.',
      en: 'Enter your name to sign the document.',
    } as Translatable,
    editAtProject: {
      nl: 'Aanpassen bij “Over het project”',
      en: 'Edit under “About the project”',
    } as Translatable,
    confirmLabel: {
      nl: (name: string) =>
        name.length > 0
          ? `Ik, ${name}, onderteken hierbij dit document.`
          : 'Ik onderteken hierbij dit document.',
      en: (name: string) =>
        name.length > 0
          ? `I, ${name}, hereby sign this document.`
          : 'I hereby sign this document.',
    },
    confirmHelp: {
      nl: 'Door deze verklaring aan te vinken bevestig je je ondertekening. Een getypte naam geldt hier als handtekening — identiteit wordt niet afzonderlijk geverifieerd.',
      en: 'Checking this declaration confirms your signature. A typed name serves as a signature here — identity is not verified separately.',
    } as Translatable,
  },
  resume: {
    button: {
      nl: 'Bewaar en ga later verder',
      en: 'Save and continue later',
    } as Translatable,
    title: {
      nl: 'Ga later verder via e-mail',
      en: 'Continue later via email',
    } as Translatable,
    intro: {
      nl: 'We sturen je een link naar je e-mailadres waarmee je je ingevulde antwoorden later kunt voortzetten. De link is 30 dagen geldig.',
      en: 'We will send you a link at your email address so you can continue your answers later. The link is valid for 30 days.',
    } as Translatable,
    emailLabel: { nl: 'E-mailadres', en: 'Email address' } as Translatable,
    emailPlaceholder: { nl: 'naam@voorbeeld.nl', en: 'name@example.com' } as Translatable,
    consentLabel: {
      nl: 'Ik ga akkoord met de opslag en verwerking van mijn antwoorden zoals beschreven in het',
      en: 'I consent to the storage and processing of my answers as described in the',
    } as Translatable,
    consentLink: {
      nl: 'privacy statement',
      en: 'privacy statement',
    } as Translatable,
    consentLinkHref: 'https://www.ciiic.nl/privacy-statement',
    shareWarning: {
      nl: 'Deel de link uit je inbox niet — iedereen met de link kan je concept openen.',
      en: 'Do not share the link from your inbox — anyone with it can open your draft.',
    } as Translatable,
    submit: { nl: 'Verstuur link', en: 'Send link' } as Translatable,
    submitting: { nl: 'Versturen…', en: 'Sending…' } as Translatable,
    cancel: { nl: 'Annuleren', en: 'Cancel' } as Translatable,
    close: { nl: 'Sluiten', en: 'Close' } as Translatable,
    successTitle: { nl: 'Check je inbox', en: 'Check your inbox' } as Translatable,
    successBody: {
      nl: (email: string) =>
        `We hebben een link gestuurd naar ${email}. Klik op de link in de e-mail om later verder te gaan met je zelftoets. Zie je het bericht niet? Controleer dan je spam-map.`,
      en: (email: string) =>
        `We sent a link to ${email}. Click the link in the email to continue your self-assessment later. Don't see it? Check your spam folder.`,
    },
    errorInvalidEmail: {
      nl: 'Vul een geldig e-mailadres in.',
      en: 'Please enter a valid email address.',
    } as Translatable,
    errorConsentRequired: {
      nl: 'Ga akkoord met het privacy statement om door te gaan.',
      en: 'Please agree to the privacy statement to continue.',
    } as Translatable,
    errorRateLimited: {
      nl: 'Je hebt net al een link aangevraagd. Probeer het over een paar minuten opnieuw.',
      en: 'You already requested a link recently. Try again in a few minutes.',
    } as Translatable,
    errorSendFailed: {
      nl: 'De e-mail kon niet verzonden worden. Probeer het later opnieuw.',
      en: 'The email could not be sent. Please try again later.',
    } as Translatable,
    errorNetwork: {
      nl: 'Er ging iets mis met de verbinding. Controleer je internet en probeer opnieuw.',
      en: 'Something went wrong with the connection. Check your internet and try again.',
    } as Translatable,
    errorGeneric: {
      nl: 'Er ging iets mis. Probeer het opnieuw.',
      en: 'Something went wrong. Please try again.',
    } as Translatable,
    toastRestored: {
      nl: 'Je opgeslagen concept is hersteld.',
      en: 'Your saved draft has been restored.',
    } as Translatable,
    toastNotFound: {
      nl: 'Deze link is verlopen of niet meer geldig. Je kunt opnieuw beginnen of een nieuwe link aanvragen.',
      en: 'This link has expired or is no longer valid. You can start over or request a new link.',
    } as Translatable,
  },
  pdf: {
    sectionB1: {
      nl: 'Sectie B · Deel 1 — Voorwaarden',
      en: 'Section B · Part 1 — Conditions',
    } as Translatable,
    sectionB2: {
      nl: 'Sectie B · Deel 2 — Vragen',
      en: 'Section B · Part 2 — Questions',
    } as Translatable,
    sectionB3: {
      nl: 'Sectie B · Deel 3 — Open vraag',
      en: 'Section B · Part 3 — Open question',
    } as Translatable,
    sectionA: {
      nl: 'Sectie A — Richtlijn Publieke Waarden binnen Immersive Experiences',
      en: 'Section A — Public Values Guidelines within Immersive Experiences',
    } as Translatable,
    declare: {
      nl: 'Hierbij verklaart de ondertekenaar dat binnen dit project:',
      en: 'The signatory hereby declares that within this project:',
    } as Translatable,
    declaredAll: {
      nl: 'Alle voorwaarden zijn aangevinkt en daarmee ondertekend.',
      en: 'All conditions have been checked and are therefore signed.',
    } as Translatable,
    declaredIncomplete: {
      nl: 'LET OP: niet alle voorwaarden zijn aangevinkt. Aanvraag/offerte kan niet worden ingediend zonder volledige ondertekening.',
      en: 'NOTE: not all conditions have been checked. The application/quotation cannot be submitted without full signature.',
    } as Translatable,
    headerBrand: {
      nl: `${appMeta.org} · ${appMeta.name.nl}`,
      en: `${appMeta.org} · ${appMeta.name.en}`,
    } as Translatable,
    footerSite: appMeta.urls.siteLabel,
    answerLabel: { nl: 'Antwoord: ', en: 'Answer: ' } as Translatable,
    questionPrefix: { nl: 'Vraag ', en: 'Question ' } as Translatable,
    chosenValue: { nl: 'Gekozen waarde: ', en: 'Chosen value: ' } as Translatable,
    toelichting: { nl: 'Toelichting', en: 'Explanation' } as Translatable,
    signerName: { nl: 'Naam ondertekenaar', en: 'Name of signatory' } as Translatable,
    date: { nl: 'Datum', en: 'Date' } as Translatable,
    yes: { nl: 'JA', en: 'YES' } as Translatable,
    no: { nl: 'NEE', en: 'NO' } as Translatable,
    notAnswered: { nl: '—', en: '—' } as Translatable,
    keywords: {
      nl: 'CIIIC, publieke waarden, zelftoets, immersive experiences, Nationaal Groeifonds, richtlijn, ethiek, digitale autonomie',
      en: 'CIIIC, public values, self-assessment, immersive experiences, National Growth Fund, guidelines, ethics, digital autonomy',
    } as Translatable,
    subjectLong: {
      nl: 'Ingevulde Publieke Waarden Zelftoets — verklaring, antwoorden en bijlage met de Richtlijn (Sectie A).',
      en: 'Completed Public Values Self-Assessment — declaration, answers and appendix with the Guidelines (Section A).',
    } as Translatable,
  },
} as const;
