import type { Dictionary } from "@/i18n/fr";

export const nl: Dictionary = {
  meta: {
    title: "Audiova — Gratis online MP3-converter",
    description:
      "Zet een audiobestand in de browser om naar MP3. WAV, FLAC, M4A, OGG en videosporen. Gratis, zonder installatie, zonder upload bij lokale conversie.",
    ogAlt: "Audiova, audio-naar-MP3-converter",
  },
  skip: "Ga naar de inhoud",
  nav: {
    label: "Hoofdnavigatie",
    converter: "Converter",
    features: "Functies",
    formats: "Formaten",
    faq: "FAQ",
    openFile: "Open een bestand",
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    language: "Taal",
    discord: "Join Discord",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "Jouw audio.",
    titleRest: "Als",
    titleAccent: "MP3",
    titleEnd: ". Gewoon.",
    subtitle:
      "Zet audiobestanden in een paar klikken om naar MP3. Gratis, eenvoudig en zonder installatie.",
    primary: "Bestand converteren",
    secondary: "Functies bekijken",
    points: ["Eenvoudig en snel.", "Instelbare audiokwaliteit.", "Geen installatie nodig."],
    monitor: "Monitor",
    demo: "Demonstratiesignaal",
    demoHint: "Deze golfvorm wordt op het scherm getekend. Hij speelt je bestand niet af.",
  },
  converter: {
    title: "Audio-converter",
    dropTitle: "Sleep je audiobestand",
    dropText: "Sleep je bestand hierheen of blader op je apparaat.",
    dropFolders: "Mappen worden geaccepteerd: audio-/videobestanden erin worden automatisch toegevoegd.",
    choose: "Kies een bestand",
    fileInput: "Selectie van audiobestanden",
    addMore: "Bestanden toevoegen",
    limits: "{audio}. Video: {video}. Maximaal {size}, {count} bestanden tegelijk.",
    queueTitle: "Te converteren bestanden",
    queueSummary: "{count} in de wachtrij · {done} klaar",
    queueReady: "{count} klaar om te converteren",
    queueWaiting: "Wacht in de wachtrij",
    etaSeconds: "≈ {seconds} s resterend",
    etaMinutes: "≈ {minutes} min resterend",
    remove: "{name} verwijderen",
    listenSource: "Origineel beluisteren",
    listenOutput: "Resultaat beluisteren",
    hidePlayer: "Speler verbergen",
    convertOne: "Converteren naar {format}",
    convertMany: "{count} bestanden converteren naar {format}",
    converting: "Bezig met converteren…",
    cancel: "Annuleren",
    another: "Nog een bestand converteren",
    download: "{format} downloaden",
    engineDownload: "Audio-engine laden… {percent} %",
    engineDownloadUnknown: "Audio-engine laden…",
    engineCompile: "Engine initialiseren…",
    engineHint:
      "Het conversieprogramma, ongeveer 32 MB, wordt bij de eerste conversie van deze site geladen. Je audiobestand wordt niet geüpload.",
    emptySelection: "Voeg een audiobestand toe om de bitrate te kiezen en te starten.",
    customNameHint: "De aangepaste naam geldt wanneer één bestand klaar is.",
    losslessHint: "WAV en FLAC zijn verliesvrij: bitrate geldt niet.",
    metadataIncluded: "Titel en artiest uit het bestand worden met metadata meegenomen.",
    sizeNote: "Deze opmerking geldt alleen voor dit bestand en deze instellingen.",
    smaller: "{amount} kleiner dan het originele bestand.",
    larger: "{amount} groter dan het originele bestand.",
    sameSize: "Zelfde grootte als het originele bestand.",
    playbackUnsupported:
      "Afspelen is in deze browser niet beschikbaar voor dit formaat. Downloaden blijft mogelijk.",
    cancelHint: "Annuleren stopt de lopende taak. De engine wordt gereset.",
    sourceFile: "Bestand",
    sourceUrl: "Link",
    urlTitle: "Importeren via een link",
    urlText:
      "Plak het adres van een video of track. Audiova haalt het medium op; daarna kies je de kwaliteit vóór converteren en downloaden.",
    urlPlaceholder: "https://…",
    urlSubmit: "Medium importeren",
    urlLoading: "Medium ophalen…",
    urlConverting: "Converteren…",
    urlLegal:
      "Belangrijk: jij alleen bent verantwoordelijk voor de content die je importeert of downloadt. Audiova is op geen enkele wijze aansprakelijk als je muziek of media ophaalt die je niet hebt gekocht of waarvoor je geen rechten hebt. Gebruik alleen bestanden die van jou zijn of die je mag converteren.",
  },
  settings: {
    format: "Uitvoerformaat",
    principal: "Hoofd",
    bitrate: "Bitrate",
    sampleRate: "Samplefrequentie",
    auto: "Auto",
    quality: "Uitvoerkwaliteit",
    qualityHint:
      "Kies vóór je start. 320 kb/s is de maximale MP3-bitrate; FLAC en WAV zijn verliesvrij (beste getrouwheid, groter bestand).",
    presetLight: "Licht",
    presetStandard: "Standaard",
    presetBest: "Beste MP3",
    presetLossless: "Verliesvrij",
    bestBadge: "Max",
    metadata: "Metadata behouden",
    metadataHint: "Kopieert tags die de engine kan overzetten. Covers zijn niet gegarandeerd.",
    identity: "Titel en artiest behouden",
    identityHint: "Schrijft alleen deze twee velden uit het bestand.",
    filename: "Naam van uitvoerbestand",
    filenameHint: "Zonder extensie. Het gekozen formaat wordt automatisch toegevoegd.",
  },
  facts: {
    duration: "Duur",
    sampleRate: "Frequentie",
    bitrate: "Bitrate",
    size: "Grootte",
    format: "Formaat",
  },
  status: {
    analyzing: "Analyseren…",
    ready: "Klaar",
    queued: "In wachtrij",
    converting: "Converteren",
    finalizing: "Afronden",
    done: "Klaar",
    error: "Fout",
    cancelled: "Geannuleerd",
    progress: "Voortgang",
  },
  errors: {
    unsupported: "Dit formaat wordt niet ondersteund.",
    damaged: "Het bestand lijkt beschadigd.",
    memory: "Onvoldoende geheugen om dit bestand te verwerken.",
    failed: "Conversie mislukt. Probeer een ander bestand.",
    "too-large": "De bestandsgrootte overschrijdt de toegestane limiet.",
    empty: "Het bestand is leeg.",
    "no-audio": "Geen bruikbaar audiospoor gevonden.",
    engine: "De audio-engine kon niet worden geladen. Herlaad de pagina en probeer opnieuw.",
    "too-many": "Bestandslimiet bereikt. Extra bestanden zijn genegeerd.",
    timeout: "De conversie duurde te lang. Probeer een korter bestand.",
    "url-invalid": "Deze link is ongeldig.",
    "url-blocked": "Dit adres is niet toegestaan.",
    "url-fetch": "Het medium kon niet worden opgehaald. Controleer de link en probeer opnieuw.",
    "url-unavailable": "Deze content is niet beschikbaar of niet ondersteund.",
    "url-busy": "Er loopt al een andere linkimport. Probeer het zo opnieuw.",
    "url-rate": "Te veel linkimports. Wacht een minuut en probeer opnieuw.",
  },
  player: {
    play: "Afspelen",
    pause: "Pauze",
    position: "Afspeelpositie",
    volume: "Volume",
    mute: "Dempen",
    unmute: "Geluid aan",
  },
  history: {
    title: "Recente conversies",
    intro:
      "Naam, datum, formaat en bitrate blijven in deze browser. Het geconverteerde bestand kan zo'n 30 minuten opnieuw worden gedownload; daarna verloopt de lokale cache.",
    empty: "Geen conversie opgeslagen op dit apparaat.",
    clear: "Geschiedenis wissen",
    sampleAuto: "Originele samplefrequentie",
    downloadAgain: "Opnieuw downloaden",
    expired: "Bestand verlopen — converteer opnieuw om het terug te krijgen.",
  },
  features: {
    title: "Een luistertool, geen formulier",
    intro:
      "Audiova converteert lokaal, met de nuttige instellingen en verder niets. Beloftes komen overeen met wat de engine echt doet.",
    items: [
      {
        title: "Vereenvoudigde conversie",
        body: "Zet audiobestanden om in een paar klikken, zonder ingewikkelde flow.",
      },
      {
        title: "Aanpasbare kwaliteit",
        body: "Kies de bitrate die bij je behoeften past.",
      },
      {
        title: "Privacy",
        body: "Bestanden op het apparaat blijven lokaal voor conversie. Een link wordt alleen tijdelijk door de server opgehaald en daarna in de browser geconverteerd.",
      },
      {
        title: "Al je apparaten",
        body: "Een interface voor computer, tablet of telefoon.",
      },
    ],
  },
  formats: {
    title: "Echt ondersteunde formaten",
    intro:
      "De MP3-converter accepteert containers die FFmpeg.wasm in deze build kan lezen. Een bekende extensie volstaat niet als het bestand incompleet, versleuteld of zonder audiospoor is.",
    output: "Uitvoer",
    input: "Invoer",
    video: "Video",
    videoNote: "Het beeld wordt genegeerd. Alleen het audiospoor wordt geconverteerd.",
    bitrateYes: "Instelbare bitrate",
    bitrateNo: "Bitrate vast door het formaat",
  },
  how: {
    title: "Een audiobestand converteren was nog nooit zo eenvoudig.",
    steps: [
      {
        title: "Importeer je bestand",
        body: "Vanaf het apparaat, of plak een video-/audiolink. Slepen en neerzetten werkt op grotere schermen.",
      },
      {
        title: "Kies je instellingen",
        body: "MP3 is geselecteerd. Standaardbitrate is 192 kb/s. De frequentie kan de bron volgen.",
      },
      {
        title: "Download je MP3",
        body: "Het aangeboden downloadbestand is het conversieresultaat, geen hernoemde kopie.",
      },
    ],
  },
  faq: {
    title: "Veelgestelde vragen",
    items: [
      {
        question: "Hoe converteer ik een audiobestand naar MP3?",
        answer: [
          "Importeer een bestand of plak een link, laat MP3 geselecteerd, pas desgewenst de bitrate aan en start. Download daarna de MP3. Codering gebeurt in de browser.",
        ],
      },
      {
        question: "Kan ik een video of track via een link importeren?",
        answer: [
          "Ja. Open in de converter het tabblad Link, plak het adres en klik op Converteren en downloaden. Audiova haalt het medium op, converteert het en start de download.",
          "Niet elke site werkt. Privé-, beveiligde of te zware content (boven 100 MB) wordt geweigerd. Importeer alleen content waarvoor je rechten hebt.",
        ],
      },
      {
        question: "Is de converter gratis?",
        answer: [
          "Ja. Deze versie is gratis, zonder account en zonder quotum. Elk bestand moet onder 100 MB blijven en de wachtrij accepteert maximaal 5 bestanden.",
        ],
      },
      {
        question: "Wat is het verschil tussen 128, 192 en 320 kb/s?",
        answer: [
          "Bitrate is de hoeveelheid data per seconde. 128 kb/s geeft een lichter bestand, geschikt voor spraak. 192 kb/s is standaard, een goede balans voor muziek. 320 kb/s is de hoogste MP3-bitrate hier: het bestand is zwaarder en dichter bij een gedetailleerde bron.",
          "Een hogere bitrate verbetert geen al gecomprimeerd of beschadigd origineel.",
        ],
      },
      {
        question: "Kan ik een WAV-bestand naar MP3 converteren?",
        answer: [
          "Ja, als de WAV leesbaar is. WAV is meestal ongecomprimeerd: de MP3 wordt kleiner, met verlies afhankelijk van de gekozen bitrate.",
        ],
      },
      {
        question: "Kan ik de site op mijn telefoon gebruiken?",
        answer: [
          "Ja. De interface is gemaakt voor telefoon, tablet en computer. Op een telefoon kan een lang bestand door geheugenproblemen mislukken, ook onder de limiet van 100 MB. Verwerk dan één bestand tegelijk.",
        ],
      },
      {
        question: "Worden mijn bestanden naar een server gestuurd?",
        answer: [
          "Voor een bestand op je apparaat: nee. FFmpeg draait in je browser. Het bestand wordt niet geüpload en niet bewaard. Het conversieprogramma, ongeveer 32 MB, wordt wel de eerste keer van deze site geladen.",
          "Voor een linkimport: de Audiova-server downloadt het medium tijdelijk om het aan jou te leveren en verwijdert het daarna. De conversie zelf blijft lokaal.",
          "Lokale geschiedenis bewaart naam, datum, formaat en bitrate. Niet de audio.",
        ],
      },
      {
        question: "Wat is de maximale bestandsgrootte?",
        answer: [
          "100 MB per bestand. Daarboven wordt het bestand vóór conversie geweigerd. Er kunnen vijf bestanden worden voorbereid en daarna één voor één geconverteerd.",
        ],
      },
      {
        question: "Waarom kan conversie tijd kosten?",
        answer: [
          "De engine laadt één keer. Daarna gebruikt de codering de CPU van het apparaat, op één thread, om telefoons te blijven ondersteunen. Een lang bestand of een bescheiden apparaat verlengt de wachttijd.",
          "Het percentage komt van de engine wanneer die het levert. Anders blijft de indicator onbepaald: er wordt geen neppercentage verzonnen.",
        ],
      },
      {
        question: "Kan ik meerdere bestanden tegelijk converteren?",
        answer: [
          "Ja, tot 5. Dezelfde instellingen gelden voor de wachtrij. Er wordt telkens één bestand gecodeerd om geheugen te sparen.",
        ],
      },
      {
        question: "Waarom zijn sommige bestanden incompatibel?",
        answer: [
          "Alleen formaten in de sectie Formaten worden geaccepteerd. Een beschermd, afgekapt of niet-passend bestand wordt geweigerd met een duidelijke melding.",
        ],
      },
      {
        question: "Kan ik een video naar een audiobestand converteren?",
        answer: [
          "Ja voor MP4, MOV, WebM en MKV wanneer er een audiospoor is. Het beeld wordt weggegooid. Zonder audiospoor stopt de conversie en meldt dat.",
        ],
      },
      {
        question: "Kunnen metadata behouden blijven?",
        answer: [
          "Ja. De optie staat standaard aan. Titel, artiest en andere tags die FFmpeg kan kopiëren blijven behouden wanneer het uitvoerformaat dat toelaat. Niet elke tag en niet de cover is gegarandeerd.",
          "Als je metadata uitzet en titel of artiest is gelezen, kun je alleen die twee velden behouden.",
        ],
      },
    ],
  },
  footer: {
    description: "Audio-converter in de browser. Your audio. Your format. Your freedom.",
    product: "Product",
    information: "Informatie",
    privacy: "Privacy",
    legal: "Juridische vermelding",
    contact: "Contact",
    rights: "© {year} Audiova. Onafhankelijke tool.",
  },
  privacy: {
    metaTitle: "Privacy",
    metaDescription:
      "Audiova converteert audiobestanden in je browser. Zie welke informatie op je apparaat blijft.",
    title: "Privacy",
    intro:
      "Deze pagina beschrijft hoe de site vandaag werkt. Ze belooft geen bescherming die de architectuur niet biedt.",
    sections: [
      {
        title: "Lokale conversie",
        paragraphs: [
          "Wanneer je een bestand op je apparaat kiest, leest de browser het en verwerkt FFmpeg.wasm het lokaal. Het wordt niet naar een conversieserver gestuurd en Audiova bewaart geen kopie.",
          "Het conversieprogramma, een WebAssembly-bestand van ongeveer 32 MB, wordt bij de eerste conversie van dezelfde site gedownload. Dat is de engine, niet jouw audio.",
        ],
      },
      {
        title: "Import via een link",
        paragraphs: [
          "Als je een URL plakt, haalt de server van deze app het medium tijdelijk op met yt-dlp, stuurt het naar je browser en verwijdert het tijdelijke bestand. Deze stap is nodig omdat de meeste sites een directe browserdownload blokkeren.",
          "De conversie daarna blijft lokaal. Gebruik deze functie alleen voor content die je mag downloaden.",
        ],
      },
      {
        title: "Geschiedenis in de browser",
        paragraphs: [
          "Als een conversie slaagt, kan de browser lokaal naam, datum, formaat, bitrate en frequentie opslaan. De gegevens blijven op het apparaat. Je kunt ze wissen in de geschiedenissectie.",
          "Audio wordt niet opgeslagen. Geschiedenis laat geen nieuwe download toe.",
        ],
      },
      {
        title: "Bereikmeting en toestemming",
        paragraphs: [
          "Met jouw toestemming (« Statistieken accepteren » of « Alles accepteren ») registreert Audiova geanonimiseerde gebeurtenissen: paginaweergaven, sessies, geslaagde of mislukte conversies, uitvoerformaat, taal en bij benadering de browser. Er wordt geen audiobestand hiervoor verzonden.",
          "Zonder toestemming wordt geen bereikmeting verzonden. Taalvoorkeur en privacykeuze blijven op je apparaat. Er is geen gebruikersaccount en geen database van geconverteerde bestanden.",
        ],
      },
      {
        title: "Grenzen",
        paragraphs: [
          "Browser, systeem en downloadmap bewaren het bestand dat je opslaat. Dat hangt niet van Audiova af.",
          "Apparaatgeheugen beperkt de praktische grootte. Boven 100 MB wordt een bestand geweigerd. Een telefoon kan eerder falen: de melding noemt dan geheugen, zonder ruwe technische dump.",
        ],
      },
      {
        title: "Advertenties",
        paragraphs: [
          "Advertentieruimtes staan standaard uit. Als ze via de adminconsole worden ingeschakeld, verschijnen ze alleen bij « Alles accepteren » en mogen ze conversieknoppen niet bedekken.",
          "Als later een advertentienetwerk van derden wordt aangesloten, worden eventuele cookies hier vóór activering beschreven.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Juridische vermelding & voorwaarden",
    metaDescription: "Juridische vermelding, gebruiksvoorwaarden en aansprakelijkheid van Audiova.",
    title: "Juridische vermelding & voorwaarden",
    intro:
      "Audiova is een onafhankelijke audio-converter. Door de site te gebruiken accepteer je de regels hieronder, vooral over auteursrecht.",
    sections: [
      {
        title: "Uitgever",
        paragraphs: [
          "De site wordt gepubliceerd als persoonlijke, onafhankelijke tool. Er is geen handelsnaam, zetel of publicatiedirecteur te vermelden in deze versie.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "Hosting hangt af van waar de site wordt gedeployed. Lokale conversie draait in de browser van de bezoeker. Link-import kan kort via de server lopen, enkel om het medium op te halen.",
        ],
      },
      {
        title: "Gebruiksvoorwaarden",
        paragraphs: [
          "Audiova biedt een technische converter. Jij alleen bent verantwoordelijk voor het gebruik, geïmporteerde bestanden en downloads.",
          "Het is verboden Audiova te gebruiken om beveiliging te omzeilen, te pirateren of beschermde werken zonder toestemming te verspreiden.",
        ],
      },
      {
        title: "Auteursrecht en content",
        paragraphs: [
          "Je moet eigenaar zijn van de bestanden of over de nodige rechten / licenties beschikken om ze te converteren of te downloaden.",
          "Audiova is op geen enkele wijze aansprakelijk als je muziek, video's of andere media ophaalt die je niet hebt gekocht of waarvoor je geen rechten hebt.",
          "Audiova controleert geen eigendom en verleent geen reproductie-, communicatie- of downloadlicentie.",
        ],
      },
      {
        title: "Software van derden",
        paragraphs: [
          "Conversie steunt op FFmpeg (WebAssembly via @ffmpeg/core) onder de GPL, met name door libmp3lame. FFmpeg is een merk van het FFmpeg-project.",
          "Link-import gebruikt yt-dlp via youtube-dl-exec. Andere UI-bibliotheken staan in de projectdependencies.",
        ],
      },
      {
        title: "Aansprakelijkheid",
        paragraphs: [
          "De tool wordt geleverd zoals ze is, zonder garantie op beschikbaarheid, resultaatintegriteit of metadata.",
          "Een conversie kan mislukken, een zwaarder bestand opleveren of onderbroken worden. Controleer het resultaat vóór je het origineel verwijdert.",
          "Voor zover de wet toelaat, wijzen Audiova en de uitgever aansprakelijkheid af voor schade door onrechtmatig contentgebruik, bestandsverlies of dienstonderbreking.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription: "Stuur een ticket naar het Audiova-team en volg het gesprek.",
    title: "Contact",
    intro:
      "Open hieronder een ticket: het bericht komt in de adminconsole. Je kunt terugkomen op deze pagina om verder te chatten.",
    helpTitle: "Voordat je een ticket opent",
    help: [
      "Een geweigerd formaat kan buiten de ondersteunde lijst vallen.",
      "Een bestand boven 100 MB wordt vóór conversie gestopt.",
      "Een telefoon kan ook onder die limiet geheugen tekortkomen.",
      "Gedetailleerde antwoorden staan in de FAQ.",
    ],
    faq: "FAQ lezen",
    mail: "Schrijf naar {email}",
    mailMissing: "Geen openbaar e-mailadres geconfigureerd. Gebruik het ticket hierboven.",
    ticket: {
      title: "Ticket / chat",
      intro: "Beschrijf je vraag. Het gesprek blijft via een lokaal token aan dit apparaat gekoppeld.",
      name: "Naam",
      email: "E-mail",
      subject: "Onderwerp",
      message: "Bericht",
      send: "Ticket openen",
      sending: "Verzenden…",
      reply: "Versturen",
      replyPlaceholder: "Schrijf een antwoord…",
      loading: "Ticket laden…",
      ref: "Ref.",
      statusLabel: "Status",
      status: {
        open: "open",
        answered: "beantwoord",
        closed: "gesloten",
      },
      you: "Jij",
      support: "Support",
      newTicket: "Nieuw ticket",
      closed: "Dit ticket is gesloten. Open een nieuw ticket indien nodig.",
      rate: "Te veel berichten. Probeer later opnieuw.",
      invalid: "Controleer de velden (naam, e-mail, onderwerp, bericht).",
      network: "Verzenden lukt nu niet.",
    },
  },
  notFound: {
    title: "Deze pagina bestaat niet",
    body: "De link komt met geen enkele Audiova-pagina overeen.",
    back: "Terug naar de converter",
  },
};
