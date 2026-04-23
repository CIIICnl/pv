/**
 * Publieke Waarden Zelftoets — structured content + form schema.
 * Single source of truth: rendered to HTML by Astro components AND
 * serialised to PDF by src/scripts/pdf.ts.
 *
 * Source: https://github.com/CIIICnl/Publieke-Waarden-Richtlijn-Zelftoets
 * Versie 1.0 — 10 juli 2025 (Rathenau / Waag / PublicSpaces, i.o.v. CIIIC).
 *
 * English copy: CIIIC-public-values-guidelines.pdf (14 July 2025, v1.0).
 */

import type { Translatable } from './i18n';

/**
 * Block model for long-form prose that mixes paragraphs and lists.
 *  - a plain string is a paragraph.
 *  - `{ ul: [...] }` renders as an unordered list.
 *  - `{ ol: [...] }` renders as an ordered list.
 */
export type Block = string | { ul: string[] } | { ol: string[] };

export function isPar(b: Block): b is string {
  return typeof b === 'string';
}
export function isUl(b: Block): b is { ul: string[] } {
  return typeof b === 'object' && 'ul' in b;
}
export function isOl(b: Block): b is { ol: string[] } {
  return typeof b === 'object' && 'ol' in b;
}

export interface Waarde {
  id: string;
  number: number;
  title: Translatable;
  blocks: Translatable<Block[]>;
}

export const richtlijnIntro: Translatable<Block[]> = {
  nl: [
    'Binnen het Nationaal Groeifonds Programma Creative Industries Immersive Impact Coalition (CIIIC) staan publieke waarden centraal. De Richtlijn Publieke Waarden heeft als doel het definiëren van publieke waarden en is bedoeld voor iedereen die activiteiten ontplooit binnen Immersive Experiences: ontwikkelaars, toepassers, onderzoekers, makers en andere stakeholders. Zij worden hierna aangeduid als IX-professionals.',
    'IX dompelen ons zintuiglijk onder in een alternatieve, digitaal gecreëerde realiteit, denk aan projecties, audioscapes, virtual reality, 360 graden beeld/video, augmented reality, chatbots, interactieve animaties en games. Binnen IX spelen Extended Reality (XR)-apparaten zoals headsets vaak een belangrijke rol. XR is de verzamelnaam voor technologieën die onze kijk op de wereld aanvullen, versterken of vervangen.',
    'CIIIC verwacht dat IX grote impact zullen hebben op ons dagelijks leven, zowel qua werken, leren en recreatie, en aanjagers zullen zijn van de derde digitale transitie.',
    'In lijn met het onderzoek naar immersieve technologieën van het Rathenau Instituut zijn in de Publieke Waarden Zelftoets (PWZ) de volgende zeven waarden centraal gesteld: Privacy, Zelfbeschikking, Democratie, Gezondheid, Veiligheid, Inclusiviteit/Participatie/Non-Discriminatie en Duurzaamheid.',
    'De uitgangspunten van de Richtlijn zijn dat de gebruiker van IX geen schade wordt berokkend, dat eventuele financiële belangen binnen de productie duidelijk kenbaar worden gemaakt en dat er sprake is van zakelijke transparantie volgens de relevante good governance-kaders waarbinnen de IX-professional opereert.',
    'Bij toepassing van de Richtlijn gelden mogelijk andere maatstaven binnen de context van satire of artistieke en creatieve uitingen, mits overtuigend inhoudelijk gemotiveerd.',
  ],
  en: [
    'Public values are central to the CIIIC National Growth Fund Programme. The Public Values Guidelines aim to define public values and are intended for anyone developing activities within Immersive Experiences: developers, applicators, researchers, makers and other stakeholders (hereafter referred to as ‘IX professionals’).',
    'IX immerse us sensorially in an alternative, digitally-created reality, for example through projections, audioscapes, virtual reality, 360-degree images/video, augmented reality, chatbots, interactive animations and games. Within IX, Extended Reality (XR) devices, such as headsets, often play an important role. XR is the collective name for technologies that supplement, strengthen or replace our view of the world. This is done by projecting digital information and graphic elements onto the real world, by creating purely virtual environments or a combination of the two. This process is also known as ‘spatial computing’.',
    'CIIIC expects IX to have a major impact on our daily lives in terms of work, learning and recreation, and to be drivers of the third digital transition.',
    'Recent developments in the field of digital technology offer opportunities and challenges for meeting public values. These opportunities and challenges also play a role within IX and the XR devices used for IX.',
    'These opportunities include new forms of treatment and research in healthcare, the inclusion of specific target groups with physical disabilities, and new forms of art and storytelling. The risks include the far-reaching collection of highly personal data via sensors and new forms of disinformation. The rapid development of AI applications and possible integration into IX, where regulations are lagging behind, is also having a major social impact and should be closely monitored.',
    'It is clear that in the rapidly developing field of IX public values must be safeguarded. In line with the Rathenau Institute’s research into immersive technologies, the Public Values Self-Assessment (PVS) focuses on seven values: Privacy, Self-determination, Democracy, Health, Safety, Inclusivity/Participation/Non-Discrimination and Sustainability. We expand on these seven values below and offer recommendations for how each one can be safeguarded as effectively as possible within the context of IX.',
    'The best way to achieve this is still the subject of research. The PVS is a first step here, intended to reduce the greatest risks for the user, and initiate the conversation around public values and technology.',
    'The basic principles of the Guidelines are that the user of IX should suffer no harm, that any financial interests within the production are clearly disclosed and that there is commercial transparency in line with any relevant good governance frameworks within which the IX professional operates.',
    'When applying the Guidelines, other standards may apply within the context of satire or artistic/creative expression, provided these are clearly content-driven.',
  ],
};

export const waarden: Waarde[] = [
  {
    id: 'privacy',
    number: 1,
    title: { nl: 'Privacy', en: 'Privacy' },
    blocks: {
      nl: [
        'XR-apparaten zijn ten behoeve van hun functioneren uitgerust met een (groot) aantal sensoren die gegevens over locatie, omgeving en beweging kunnen vastleggen. Ook is het mogelijk dat XR-apparaten gezondheids- en biometrische gegevens vastleggen (oogbewegingen, pupilreflexen, hartslag, ademhaling et cetera). Tenslotte kunnen bij specifieke toepassingen diverse data worden verzameld over het gebruik van de toepassing en de gebruiker zelf.',
        'De IX-professional dient zich bewust te zijn van de privacygevoeligheid van deze gegevens en er op een zorgvuldige en rechtmatige wijze mee om te springen. Dit betreft zowel data die de aanbieder zelf verzamelt, data die door fabrikanten/aanbieders van XR-platformen worden verzameld, als data van omstanders die via sensoren worden vastgelegd.',
        'Voor de rechtmatige verwerking van persoonsgegevens vormt de Algemene Verordening Gegevensbescherming (AVG) het belangrijkste kader. De toepassing moet rechtmatig en transparant zijn, gegevens worden niet voor andere doeleinden gebruikt (doelbinding), enkel noodzakelijke gegevens worden verwerkt (dataminimalisatie), de gegevens worden niet langer bewaard dan noodzakelijk (opslagbeperking), en worden goed beveiligd.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan de vereisten van de AVG voor wat betreft de eigen invloedssfeer.',
      ],
      en: [
        'To function properly, XR devices are equipped with a (large) number of sensors that can record data about location, environment and movement. XR devices may also record health and biometric data (eye movements, pupillary reflexes, heart rate, breathing, etc.). And finally, for specific applications, various data can be collected regarding the use of the application and the user themselves (such as account details and preferences).',
        'The IX professional should be aware of the privacy-sensitivity of this data and handle it in a careful and lawful manner. More specifically, this concerns the following privacy-sensitive aspects:',
        {
          ul: [
            'First, the data of users that the provider themselves collects to allow the application to function properly.',
            'Second, user data collected by the manufacturers/providers of the XR (hardware) platforms that the application uses. On the one hand, data collection is necessary for the product to function; but on the other, it is an essential part of the revenue model for some hardware providers.',
            'Third, data collected via sensors on devices from bystanders without their permission. For the sake of bystander privacy, it is important to exercise restraint when collecting data.',
          ],
        },
        'The General Data Protection Regulation (GDPR) is the most important framework for the lawful processing of personal data. The GDPR sets the following requirements for the processing of personal data within IX applications:',
        {
          ol: [
            'The application is lawful (has a clear purpose with a legal basis).',
            'The application is transparent (people concerned are informed).',
            'The data is not used for other purposes (purpose limitation).',
            'Only necessary data is processed (data minimisation).',
            'The data is not stored longer than necessary (storage limitation).',
            'The data is well secured.',
          ],
        },
        'The IX professional should first ensure their own processing operations within IX meet these requirements. Not only in terms of the privacy of the application’s users but also that of bystanders.',
        'In order to reduce the privacy risk around data collection by providers and manufacturers of IX hardware and platforms, it is important that IX professionals do all they can within their sphere of influence to limit data acquisition and storage. This can be done, for example, by minimizing data collection, using locally hosted servers and anonymizing personal data.',
        'The choice of specific hardware can also make a difference here. For example, by comparing the privacy conditions (and options for setting them) of different providers. If hardware and/or software from third parties is used, there must be clear agreements about the data processing, for example by means of a (processing) agreement.',
        'Finally, it is important that the IX user is informed in simple and clear language about which data will be collected and for what purposes, where and for how long the data is stored, and which parties have access to it. If this information is (partially) unknown, the user must also be informed of this fact.',
        'By following these guidelines, the IX professional commits themselves to the requirements of the GDPR with regard to their own sphere of influence.',
      ],
    },
  },
  {
    id: 'zelfbeschikking',
    number: 2,
    title: { nl: 'Zelfbeschikking', en: 'Self-determination' },
    blocks: {
      nl: [
        'Het intieme karakter en de fysieke nabijheid van IX en de wisselwerking tussen technologieën zoals AI, VR en neurotechnologie, maakt beïnvloeden van emoties en gedrag door misleiding mogelijk. Hiermee komt de zelfbeschikking onder druk te staan.',
        'Een voorbeeld hiervan zijn zogenoemde deceptive patterns (ook wel dark patterns genoemd): interfaces die de gebruiker ertoe bewegen onbedoelde, onbewuste of potentieel nadelige beslissingen te nemen op het gebied van gegevensbescherming of het doen van aankopen. Andere voorbeelden zijn sluikreclame, brand placement en synthetische avatars die zich voordoen als mensen van vlees en bloed.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan het vermijden van oneerlijke handelspraktijken en misleiding, en volgt hij of zij — in het geval van reclame — de regels van de Nederlandse Reclamecode.',
      ],
      en: [
        'The intimate nature and physical proximity of IX, and the interaction between technologies such as AI, VR and neurotechnology, makes it possible to use deception to influence emotions and behaviour, creating a threat to self-determination.',
        'An example of this is so-called ‘deceptive patterns’ (also known as ‘dark patterns’). These are interfaces, user journeys and visual or linguistic elements that induce or entice the user to make unintended, unconscious and/or potentially detrimental decisions in the field of data protection or making purchases.',
        'Other examples of deliberate deception or manipulation include covert advertising and brand placement that direct users of the IX to specific physical locations or synthetic avatars that appear to be flesh-and-blood people.',
        'By following these guidelines, the IX professional commits to avoiding unfair commercial practices and deception, and — in the case of advertising — to following the rules of the Dutch Advertising Code.',
      ],
    },
  },
  {
    id: 'democratie',
    number: 3,
    title: { nl: 'Democratie', en: 'Democracy' },
    blocks: {
      nl: [
        'Democratische besluitvorming is gebaat bij consensus over een gezamenlijke en evenwichtige feitenbasis. Deze komt onder druk te staan door verschillende maatschappelijke factoren. IX kunnen de grenzen tussen de fysieke en digitale wereld vervagen. Daarnaast kan de vermenging van technieken als XR, neurotechnologie en AI resulteren in een vergaande gepersonaliseerde virtuele omgeving (hyper-personalisatie).',
        'De marktdominantie van een beperkt aantal grote techbedrijven uit de VS en China is in de XR-sector een zorg. Om democratische stuurkracht te behouden, is het van belang oog te hebben voor (open source) alternatieven en zoveel mogelijk autonomie voor de gebruiker in te bouwen. Standaardisatie en het gebruik van open Europese standaarden, producten en diensten (de EuroStack) hebben de voorkeur.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan een integere omgang met de waarnemingsverstorende effecten van IX, en verkent de mogelijkheid om de ervaringen beschikbaar te maken op devices van verschillende aanbieders.',
      ],
      en: [
        'Democratic decision-making needs consensus based on a common, impartial foundation of facts. Various social factors are putting this consensus under pressure. IX can blur the boundaries between the physical and digital worlds. Moreover, the blending of techniques such as XR, neurotechnology and AI can result in an extensive personalized virtual environment, a phenomenon also known as ‘hyper-personalization’.',
        'The market dominance of a limited number of large tech companies from the US and China is a concern in the XR sector. Especially as they also provide essential services in the public domain, including education, healthcare and journalism. This is a European problem that cannot be solved by these guidelines alone. That does not alter the fact that awareness is essential in this context. To maintain democratic control, it is important to be on the lookout for (open source) alternatives and to build in as much user autonomy as possible. One way to counteract this concentration of power is to use standardization (see also Web 4.0 and virtual worlds (RP 2024)). These standards contribute to provider independence, control over information, and better data exchange between platforms and networks, also known as interoperability. The extent to which it is possible to use European providers (the EuroStack) when deploying technologies should also be considered.',
        'By following these guidelines, the IX professional commits to addressing the perception-distorting effects of IX with integrity, exercising restraint in the use of such effects in public spaces, and taking measures to mitigate such adverse effects (that is, effects that don’t serve the direct purpose of the experience). IX professionals should also explore the possibility of making experiences available on devices from multiple providers, with preference, where possible, given to European standards, products and services.',
      ],
    },
  },
  {
    id: 'gezondheid',
    number: 4,
    title: { nl: 'Gezondheid', en: 'Health' },
    blocks: {
      nl: [
        'IX kunnen zowel een positieve als negatieve impact hebben op de gezondheid van gebruikers. Positieve effecten zijn te vinden in therapeutische toepassingen of trainingsomgevingen.',
        'Bij overmatig gebruik kan er ongewenste impact zijn: verslaving, een vertekend zelfbeeld, cybersickness, oogschade, slaapproblemen, depersonalisatie en derealisatie. Verslavende elementen — endless scroll, like-button, loot boxes, in-game-aankopen — duiken ook op binnen IX.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan een bewuste omgang met verslavende elementen, het minimaliseren van gezondheidsrisico’s en het waarschuwen voor dergelijke risico’s. Wanneer de IX-toepassing wordt ingezet als medisch hulpmiddel of voor medische diagnostiek, controleert de IX-professional in hoeverre deze toepassing onder de wetgeving voor medische hulpmiddelen valt.',
      ],
      en: [
        'IX can have both a positive and negative impact on the health of users.',
        'Potential positive health effects of IX can be found, for example, in therapeutic applications within mental healthcare, or where IX is used as an aid to training, for example for military operations or medical procedures.',
        'Excessive use of IX can have an unwanted impact at a physical or mental level, for example through addiction or a distorted self-image. Other effects that may occur include cybersickness, eye damage, sleeping problems, depersonalization (alienation from one’s own body and thoughts, including body dysmorphia) and derealization (experiencing the familiar environment as unreal).',
        'Addictive elements — originally associated with social media and games — can also appear within IX, including the endless scroll, the ‘like’ button, loot boxes, in-game purchases and the offer of rewards.',
        'By following these guidelines, the IX professional commits to a conscientious approach to the use of addictive elements, to minimizing health risks and to warning certain user groups about such risks. When the IX application is used as a medical device or for medical diagnostics, the IX professional should check to what extent the application falls under the legislation for medical devices.',
      ],
    },
  },
  {
    id: 'veiligheid',
    number: 5,
    title: { nl: 'Veiligheid', en: 'Safety' },
    blocks: {
      nl: [
        'Steeds meer mensen ervaren de digitale werkelijkheid als even echt als de fysieke. Mede daardoor wordt de veiligheid van gebruikers binnen IX steeds belangrijker.',
        'Onveilige situaties kunnen ontstaan door (seksuele) intimidatie of aantasting van de persoonlijke ruimte binnen de digitale ervaring. Dit kan ondervangen worden door maatregelen zoals een gedragsrichtlijn, consent, of het inbouwen van een noodknop. Indien IX zich deels in de fysieke wereld afspelen kan ook lichamelijke veiligheid in het geding komen.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan het voorkomen van fysieke en mentale schade.',
      ],
      en: [
        'More and more people experience digital reality as being just as real as physical reality. Partly for this reason, the safety of users within IX is becoming increasingly important.',
        'Unsafe situations can arise through (sexual) harassment or impairment of personal space within the digital experience. This can be overcome by such measures as a code of conduct that prescribes consent, or the installation of an emergency button.',
        'Where IX partly occurs in the physical world where the user has to operate autonomously, distractions can compromise their physical safety.',
        'By following these guidelines, the IX professional is committed to preventing physical or mental harm.',
      ],
    },
  },
  {
    id: 'inclusiviteit',
    number: 6,
    title: {
      nl: 'Inclusiviteit, participatie, non-discriminatie',
      en: 'Inclusivity, participation, non-discrimination',
    },
    blocks: {
      nl: [
        'Binnen een steeds verder digitaliserende samenleving is het van belang oog te hebben voor de toegankelijkheid van digitale middelen. De soms hoge aanschafkosten van XR-apparatuur maakt het gebruik inkomensafhankelijk. Daarnaast spelen taalbarrières en visuele/cognitieve toegankelijkheid een rol.',
        'Het is ook binnen het ontwikkelproces van IX van belang om zo inclusief mogelijk te ontwerpen en te testen — niet alleen binnen de gekozen doelgroep, maar ook met groepen die minder raakvlakken hebben met het ontwikkelteam. Tegelijkertijd bieden IX kansen om inclusiviteit en participatie juist te bevorderen.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan het actief realiseren van inclusiviteit binnen de gekozen doelgroep, en aan een ontwerp om inclusiviteit, participatie en non-discriminatie te bevorderen.',
      ],
      en: [
        'In an increasingly digitalized society, it is important to keep an eye on the accessibility of digital resources. This also applies to IX. The sometimes high purchase costs of XR equipment make their use income-dependent.',
        'As well as economic inequality, there are other forms of inequality. For example, how accessible is IX for people with a language barrier or visual impairment? It is also important to consider not only the diversity of the target group, but also how diversity is safeguarded within teams of creators. The developer needs to be aware of this and make efforts to ensure broad accessibility.',
        'Because the effects and experience of IX can vary depending on factors such as age, gender and physical disabilities, it is also important during the IX development process to design and test as inclusively as possible. Not only within the chosen target group, but also among groups who have less in common with the development team.',
        'At the same time, IX offer an opportunity to promote inclusivity and participation, for example through digital participation in conferences or discussions, whereby travel costs or physical obstacles are not an impeding factor.',
        'By following these guidelines, the IX professional commits to actively realizing inclusivity within the chosen target group, and to designs that promote inclusivity, participation and non-discrimination.',
      ],
    },
  },
  {
    id: 'duurzaamheid',
    number: 7,
    title: { nl: 'Duurzaamheid', en: 'Sustainability' },
    blocks: {
      nl: [
        'XR-technologie met bijbehorend gebruik van AI en dataverwerking gebruikt veel energie en vormt daarmee een risico voor een duurzame samenleving. Hardware maakt gebruik van kostbare en zeldzame grondstoffen en heeft door snelle innovaties een beperkte levensduur. Recycling van grondstoffen binnen de XR-industrie staat nog in de kinderschoenen.',
        'Hier staat tegenover dat IX mogelijk reisbewegingen en materiaalgebruik kunnen beperken en zo CO2-reductie realiseren.',
        'Door het volgen van deze richtlijn committeert de IX-professional zich aan onderzoek en, waar mogelijk, implementatie van reguliere, vernieuwende of creatieve manieren van omgang met e-waste of andere energiebesparende maatregelen en materialen.',
      ],
      en: [
        'XR technology, along with the accompanying use of AI, data collection and data processing, uses a lot of energy. This forms a risk to a sustainable society. The hardware also uses precious and rare raw materials, and the speed of innovations mean that equipment has a limited lifespan. Recycling of raw materials within the XR industry is still in its infancy. The use of rare earth metals in hardware, for example, is a challenge because there is a lack of sufficient recycling systems within the XR industry.',
        'On the other hand, IX may be able to reduce travel and use of materials, thereby reducing CO2 emissions.',
        'By following these guidelines, the IX professional commits to researching and, where possible, implementing regular, innovative and creative ways of dealing with e-waste, or other energy-saving measures and/or materials.',
      ],
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Sectie B — Zelftoets (form schema)                                 */
/* ------------------------------------------------------------------ */

export const voorwaarden: Translatable<string[]> = {
  nl: [
    'Het sector-relevante good governance-kader wordt toegepast;',
    'Er geen misleidende of manipulatieve content en toepassingen worden ontwikkeld;',
    'De (mentale) gezondheid en veiligheid van de gebruiker niet opzettelijk in gevaar zal worden gebracht;',
    'De verzamelde persoonsgegevens in lijn met de AVG en aanverwante privacywetgeving worden verwerkt en niet worden verkocht aan derden of anderszins worden ingezet voor andere doeleinden dan die van het project of de ervaring zelf;',
    'Inspanning wordt geleverd om te onderzoeken hoe derden (zoals hardware- of software-aanbieders) omgaan met vergaarde data van gebruikers en omstanders en of daar in transparante en heldere taal over wordt gecommuniceerd;',
    'Schriftelijke afspraken worden/zijn gemaakt met andere partijen die ten behoeve van mijn toepassing gegevens verwerken (verwerkersovereenkomst).',
  ],
  en: [
    'The sector-specific good governance framework is applied;',
    'No misleading or manipulative content or applications will be developed;',
    'The (mental) health and safety of the user will not be intentionally endangered;',
    'The personal data collected in line with the GDPR and related privacy legislation will be processed, and not be sold to third parties or otherwise used for purposes other than those of the project or experience itself;',
    'Efforts will be made to investigate how third parties (such as hardware or software providers) deal with data collected from users and bystanders, and whether this is communicated in clear and transparent language;',
    'Written agreements will be/have been made with other parties who process data for the purposes of my application (processing agreement).',
  ],
};

export interface TextField {
  id: string;
  label: Translatable;
  rows?: number;
  type?: 'text' | 'email' | 'date';
  autocomplete?: string;
}

export interface Vraag {
  id: string;
  number: string;
  intro?: Translatable;
  /** When set, render as a numbered sub-list above the input(s). */
  bullets?: Translatable<string[]>;
  /** Single open text input — bullets serve only as guidance. */
  field?: TextField;
  /** Or: a yes/no with conditional follow-up textareas. */
  yesno?: {
    prompt: Translatable;
    onYes?: TextField[];
    onNo?: TextField[];
  };
}

export interface VraagCategorie {
  waardeId: string | '0';
  number: string;
  title: Translatable;
  vragen: Vraag[];
}

const LBL_TOELICHTING: Translatable = { nl: 'Toelichting', en: 'Explanation' };

export const categorieen: VraagCategorie[] = [
  {
    waardeId: '0',
    number: '0',
    title: { nl: 'Doel', en: 'Purpose' },
    vragen: [
      {
        id: 'q-0-1',
        number: '0.1',
        field: {
          id: 'doel-doelgroep',
          label: {
            nl: 'Wat is het doel van de ervaring, en wat is de beoogde doelgroep?',
            en: 'What is the purpose of the experience, and who is the intended audience?',
          },
          rows: 5,
        },
      },
    ],
  },
  {
    waardeId: 'privacy',
    number: '1',
    title: { nl: 'Privacy', en: 'Privacy' },
    vragen: [
      {
        id: 'q-1-1',
        number: '1.1',
        intro: {
          nl: 'Bij IX worden vaak data gegenereerd en opgeslagen door diverse partijen. Deze data kunnen een risico zijn voor de privacy van de gebruiker, en de gebruiker mogelijk identificeerbaar maken.',
          en: 'With IX, data is often generated and stored by various parties. This data can be a risk to the privacy of the user and may make the user identifiable.',
        },
        bullets: {
          nl: [
            'Welke data worden verzameld, met welk doel en voor welke periode, waar worden ze opgeslagen, en met wie worden ze gedeeld?',
            'Welke inspanningen heb je gedaan om dataverzameling te minimaliseren?',
            'Welke inspanningen heb je gedaan om de gegevens te beveiligen?',
            'Hoe wordt dit gecommuniceerd met de gebruiker en eventuele omstanders?',
            'Als je op onderdelen niet kan achterhalen wat er met de data gebeurt, hoe schep je hier duidelijkheid over richting gebruiker en omstanders?',
          ],
          en: [
            'What data is collected, for what purposes and for how long; where is it stored and with whom is it shared?',
            'What efforts have you made to minimize data collection?',
            'What efforts have you made to secure the data?',
            'How is this communicated to the user and any bystanders?',
            'If you are unable to identify what happens to elements of the data, how do you make this clear to users and bystanders?',
          ],
        },
        field: { id: 'privacy-1-1', label: LBL_TOELICHTING, rows: 8 },
      },
    ],
  },
  {
    waardeId: 'zelfbeschikking',
    number: '2',
    title: { nl: 'Zelfbeschikking', en: 'Self-determination' },
    vragen: [
      {
        id: 'q-2-1',
        number: '2.1',
        intro: {
          nl: 'IX kunnen de zelfbeschikking van gebruikers onder druk zetten door het sturen van gedrag ten gunste van derden, vaak met een commercieel motief. Betrokkenen met financiële, politieke of andere belangen moeten goed zichtbaar worden vermeld.',
          en: 'IX may threaten the self-determination of users by steering behaviour for the benefit of third parties, often with a commercial motive. Stakeholders with financial, political or other interests must be mentioned in a way that is clearly visible.',
        },
        bullets: {
          nl: [
            'Wie zijn de betrokkenen bij de ontwikkeling van IX en wat is hun belang?',
            'Hoe wordt bovenstaande op een begrijpelijke manier gecommuniceerd met de gebruiker?',
          ],
          en: [
            'Who is involved in the development of IX and what are their interests?',
            'How is the information above communicated to the user in a way that’s understandable?',
          ],
        },
        field: { id: 'zelfbeschikking-2-1', label: LBL_TOELICHTING, rows: 6 },
      },
    ],
  },
  {
    waardeId: 'democratie',
    number: '3',
    title: { nl: 'Democratie', en: 'Democracy' },
    vragen: [
      {
        id: 'q-3-1',
        number: '3.1',
        yesno: {
          prompt: {
            nl: 'Opzettelijke misleiding en manipulatie met behulp van IX kan afbreuk doen aan de democratie. Kan de ervaring worden misbruikt voor het verspreiden van mis- en desinformatie?',
            en: 'Deliberate deception or manipulation using IX can undermine democracy. Can the experience be misused to spread mis- or disinformation?',
          },
          onYes: [
            {
              id: 'democratie-3-1-comm',
              label: {
                nl: 'Omschrijf hoe je dit op een begrijpelijke manier communiceert aan de gebruiker.',
                en: 'Describe how you communicate this to the user in an understandable way.',
              },
              rows: 4,
            },
            {
              id: 'democratie-3-1-mit',
              label: {
                nl: 'Omschrijf hoe je deze risico’s minimaliseert en mitigeert.',
                en: 'Describe how you minimize and mitigate these risks.',
              },
              rows: 4,
            },
          ],
        },
      },
      {
        id: 'q-3-2',
        number: '3.2',
        yesno: {
          prompt: {
            nl: 'Wordt er gebruik gemaakt van deep fakes of door AI gegenereerde content?',
            en: 'Are deep fakes or AI-generated content used?',
          },
          onYes: [
            {
              id: 'democratie-3-2-comm',
              label: {
                nl: 'Hoe wordt dit op een begrijpelijke manier gecommuniceerd aan de gebruiker?',
                en: 'How is this communicated to the user in an understandable way?',
              },
              rows: 4,
            },
          ],
        },
      },
      {
        id: 'q-3-3',
        number: '3.3',
        yesno: {
          prompt: {
            nl: 'Wordt de ervaring ingezet in de openbare en fysieke ruimte, waarbij deze ruimte visueel of auditief onderdeel uitmaakt van de ervaring?',
            en: 'Is the experience used in physical public spaces, where this space is a visual or auditory part of the experience?',
          },
          onYes: [
            {
              id: 'democratie-3-3-comm',
              label: {
                nl: 'Hoe communiceer je aan omstanders en andere gebruikers van deze openbare fysieke ruimte dat deze onderdeel zijn van IX?',
                en: 'How do you communicate to bystanders and other users of this public physical space that they are part of IX?',
              },
              rows: 4,
            },
          ],
        },
      },
      {
        id: 'q-3-4',
        number: '3.4',
        intro: {
          nl: 'Diversiteit in hardware en software draagt bij aan digitale autonomie. Het werken met open source hard- en software en open Europese standaarden kan daar invulling aan geven.',
          en: 'Diversity of hardware and software contributes to digital autonomy. Working with open source hardware and software, and open European standards is one way to achieve this.',
        },
        bullets: {
          nl: [
            'Welke hardware wordt gebruikt, en wat zijn de overwegingen?',
            'Wordt er gebruik gemaakt van (Europese) open standaarden? Zo ja welke? Zo nee, waarom niet?',
            'Wat doe je om zoveel mogelijk open source software te gebruiken?',
          ],
          en: [
            'What hardware is used, and on the basis of what considerations?',
            'Are (European) open standards used? If so, which ones? If not, why not?',
            'What do you do to use as much open source software as possible?',
          ],
        },
        field: { id: 'democratie-3-4', label: LBL_TOELICHTING, rows: 6 },
      },
    ],
  },
  {
    waardeId: 'gezondheid',
    number: '4',
    title: { nl: 'Gezondheid', en: 'Health' },
    vragen: [
      {
        id: 'q-4-1',
        number: '4.1',
        intro: {
          nl: 'IX kunnen heftige emotionele en/of fysieke reacties oproepen. Het is daarom belangrijk om de gebruiker te adviseren over verantwoorde schermtijd en duur van de ervaring, eventuele on- en off boarding te bieden en waar nodig leeftijdsgebonden toegangseisen te stellen.',
          en: 'IX can evoke strong emotional and/or physical reactions. It is therefore important to advise the user on responsible screen time and duration of the experience, and where necessary to offer on- and off-boarding and age-appropriate access requirements.',
        },
        bullets: {
          nl: [
            'Hoe houd je rekening met de gezondheid van de gebruiker?',
            'Hoe wordt dit gecommuniceerd?',
          ],
          en: [
            'How do you take into account the health of the user?',
            'How is this communicated?',
          ],
        },
        field: { id: 'gezondheid-4-1', label: LBL_TOELICHTING, rows: 6 },
      },
      {
        id: 'q-4-2',
        number: '4.2',
        intro: {
          nl: 'De ervaring moet worden getest binnen de beoogde doelgroep om gezondheidsproblemen zoals bijvoorbeeld cybersickness te voorkomen.',
          en: 'The experience must be tested within the intended target group in order to prevent health problems such as cybersickness.',
        },
        bullets: {
          nl: ['Op welke manier worden de ervaringen getest?'],
          en: ['How are the experiences tested?'],
        },
        field: { id: 'gezondheid-4-2', label: LBL_TOELICHTING, rows: 5 },
      },
    ],
  },
  {
    waardeId: 'veiligheid',
    number: '5',
    title: { nl: 'Veiligheid', en: 'Safety' },
    vragen: [
      {
        id: 'q-5-1',
        number: '5.1',
        yesno: {
          prompt: {
            nl: 'Als er binnen de ervaring directe of indirecte interactie tussen gebruikers plaatsvindt, kan dit tot ongewenste of onveilige situaties voor de gebruikers leiden. Is er sprake van interactie tussen gebruikers?',
            en: 'If there is direct or indirect interaction between users within the experience, this may lead to undesirable or unsafe situations for those users. Is there any interaction between users?',
          },
          onYes: [
            {
              id: 'veiligheid-5-1-mit',
              label: {
                nl: 'Omschrijf hoe je mogelijke risico’s minimaliseert en mitigeert.',
                en: 'Describe how you minimize and mitigate possible risks.',
              },
              rows: 4,
            },
            {
              id: 'veiligheid-5-1-comm',
              label: {
                nl: 'Hoe worden deze risico’s gecommuniceerd met de gebruiker?',
                en: 'How are these risks communicated to the user?',
              },
              rows: 3,
            },
            {
              id: 'veiligheid-5-1-mod',
              label: {
                nl: 'Wat is het beleid rondom moderatie en identificatie?',
                en: 'What is your policy on moderation and identification?',
              },
              rows: 3,
            },
          ],
        },
      },
      {
        id: 'q-5-2',
        number: '5.2',
        yesno: {
          prompt: {
            nl: 'Indien IX zich deels afspelen in de fysieke wereld waarbij de gebruiker autonoom dient te opereren, kan door afleiding de lichamelijke veiligheid in gevaar komen. Speelt de ervaring zich (deels) af in de fysieke wereld?',
            en: 'If IX partly takes place in the physical world where the user has to operate autonomously, physical safety can be endangered by being distracted. Does the experience take place (partly) in the physical world?',
          },
          onYes: [
            {
              id: 'veiligheid-5-2-mit',
              label: {
                nl: 'Omschrijf hoe je mogelijke risico’s minimaliseert en mitigeert.',
                en: 'Describe how you minimize and mitigate potential risks.',
              },
              rows: 4,
            },
            {
              id: 'veiligheid-5-2-comm',
              label: {
                nl: 'Hoe worden deze risico’s gecommuniceerd met de gebruiker?',
                en: 'How are these risks communicated to the user?',
              },
              rows: 3,
            },
          ],
        },
      },
    ],
  },
  {
    waardeId: 'inclusiviteit',
    number: '6',
    title: {
      nl: 'Inclusiviteit, participatie, non-discriminatie',
      en: 'Inclusivity, participation, non-discrimination',
    },
    vragen: [
      {
        id: 'q-6-1',
        number: '6.1',
        intro: {
          nl: 'IX moeten zo inclusief mogelijk worden ontworpen, waarbij binnen de doelgroep ruimte wordt gecreëerd voor diversiteit.',
          en: 'IX must be designed to be as inclusive as possible, creating room for diversity within the target group.',
        },
        bullets: {
          nl: [
            'Welke inspanningen worden geleverd om — binnen de gekozen doelgroep — de ervaring op inclusieve wijze te ontwikkelen, bijvoorbeeld door het betrekken van mensen met auditieve, visuele, cognitieve beperkingen; het betrekken van kwetsbare groepen of minderheidsperspectieven?',
            'Hoe wordt omgegaan met inclusiviteit binnen het team van makers, al dan niet in relatie tot de doelgroep en het doel van de ervaring?',
          ],
          en: [
            'What efforts are being made — within the chosen target group — to develop the experience in an inclusive manner? For example, by involving people with hearing, visual or cognitive impairments; involving vulnerable groups or minority perspectives?',
            'How is inclusivity addressed within the team of makers, both in terms of the target group and the purposes of the experience?',
          ],
        },
        field: { id: 'inclusiviteit-6-1', label: LBL_TOELICHTING, rows: 6 },
      },
    ],
  },
  {
    waardeId: 'duurzaamheid',
    number: '7',
    title: { nl: 'Duurzaamheid', en: 'Sustainability' },
    vragen: [
      {
        id: 'q-7-1',
        number: '7.1',
        intro: {
          nl: 'IX kunnen een extra belasting zijn voor het milieu. Dit geldt zowel voor het gebruik van energie als materialen.',
          en: 'IX can be an additional burden on the environment, in terms of both energy usage and materials.',
        },
        bullets: {
          nl: [
            'Welke energiebesparende maatregelen zijn er getroffen?',
            'Is het hergebruik van materiaal overwogen en wat is hiervan het resultaat?',
          ],
          en: [
            'What energy-saving measures have been taken?',
            'Has consideration been given to the reuse of materials, and what did that result in?',
          ],
        },
        field: { id: 'duurzaamheid-7-1', label: LBL_TOELICHTING, rows: 5 },
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Deel 3 — Open vraag                                                */
/* ------------------------------------------------------------------ */

export const openVraag = {
  intro: {
    nl: 'In deel 2 van de PWZ richten we ons met name op de mogelijke negatieve effecten van IX. In dit deel 3 is ruimte voor de positieve impact op publieke waarden. Kies één van de waarden en licht toe hoe de aanvraag/offerte positief tegemoetkomt of bijdraagt aan deze waarde.',
    en: 'In part 2 of the PVS, we mainly focused on the potential negative effects of IX. Part 3 provides the chance to look at the positive impact on public values. Choose just one of the values (privacy, self-determination, democracy, health, safety, inclusiveness/participation/non-discrimination or sustainability) and explain how the application/quotation positively meets or contributes to this value.',
  },
  hint: {
    nl: 'Lengte: maximaal 1 pagina (~500 woorden).',
    en: 'Length: maximum 1 page (~500 words).',
  },
  /** Options mirror the seven values, labelled per language. */
  get options(): Translatable<string>[] {
    return waarden.map((w) => w.title);
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Project metadata (top of form)                                     */
/* ------------------------------------------------------------------ */

export const projectMeta: TextField[] = [
  {
    id: 'meta-project',
    label: { nl: 'Naam van het project / de ervaring', en: 'Name of the project / experience' },
    autocomplete: 'off',
  },
  {
    id: 'meta-organisatie',
    label: { nl: 'Aanvrager / indiener (organisatie)', en: 'Applicant / tenderer (organisation)' },
    autocomplete: 'organization',
  },
  {
    id: 'meta-naam',
    label: { nl: 'Naam ondertekenaar', en: 'Name of signatory' },
    autocomplete: 'name',
  },
  {
    id: 'meta-rol',
    label: { nl: 'Functie / rol', en: 'Role / position' },
    autocomplete: 'organization-title',
  },
  {
    id: 'meta-regeling',
    label: {
      nl: 'Regeling of call (bijv. CIIIC Open Call 2026)',
      en: 'Scheme or call (e.g. CIIIC Open Call 2026)',
    },
    autocomplete: 'off',
  },
  {
    id: 'meta-datum',
    label: { nl: 'Datum', en: 'Date' },
    type: 'date',
    autocomplete: 'off',
  },
];
