# Publieke Waarden Zelftoets

Interactieve webversie van de **CIIIC Publieke Waarden Zelftoets (PWZ)** — een
verplicht onderdeel van de aanvraag- en offerteprocedure binnen het Nationaal
Groeifonds-programma Creative Industries Immersive Impact Coalition (CIIIC).

In plaats van een statisch PDF-formulier biedt deze applicatie:

- de **Richtlijn Publieke Waarden** (Sectie A) als leesbare webpagina;
- de **Zelftoets** (Sectie B, delen 1–3) als interactieve webformulier met
  voorwaardelijke vervolgvragen;
- een **PDF-export** met CIIIC-huisstijl die rechtstreeks bij de aanvraag of
  offerte gevoegd kan worden.

Alles draait **volledig in de browser** — er worden geen ingevoerde antwoorden
naar een server gestuurd. De applicatie is daarmee privacy-vriendelijk by
design.

## Stack

- [Astro 5](https://astro.build) — statische site, content-eerste
- TypeScript voor formuliergegevens en PDF-generatie
- [pdfmake](https://pdfmake.github.io/docs/0.1/) — client-side PDF
- CIIIC-huisstijl (GT America Extended + lime/teal palet) overgenomen uit
  `/Users/jstronks/Github NW/event-2026`

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in ./dist
npm run preview
```

## Bron

Inhoud van de Richtlijn en Zelftoets is gebaseerd op **PWD.md** uit
[`CIIICnl/Publieke-Waarden-Richtlijn-Zelftoets`](https://github.com/CIIICnl/Publieke-Waarden-Richtlijn-Zelftoets),
versie 1.0 (10 juli 2025), opgesteld door Rathenau Instituut, Waag Futurelab en
PublicSpaces in opdracht van CIIIC.
