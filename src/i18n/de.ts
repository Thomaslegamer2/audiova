import type { Dictionary } from "@/i18n/fr";

export const de: Dictionary = {
  meta: {
    title: "Audiova — Kostenloser Online-MP3-Konverter",
    description:
      "Konvertieren Sie eine Audiodatei im Browser zu MP3. WAV, FLAC, M4A, OGG und Videospuren. Kostenlos, ohne Installation, ohne Upload bei lokaler Konvertierung.",
    ogAlt: "Audiova, Audio-zu-MP3-Konverter",
  },
  skip: "Zum Inhalt springen",
  nav: {
    label: "Hauptnavigation",
    converter: "Konverter",
    features: "Funktionen",
    formats: "Formate",
    faq: "FAQ",
    openFile: "Datei öffnen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    language: "Sprache",
    discord: "Discord beitreten",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "Ihr Audio.",
    titleRest: "Als",
    titleAccent: "MP3",
    titleEnd: ". Einfach.",
    subtitle:
      "Konvertieren Sie Audiodateien in wenigen Klicks zu MP3. Kostenlos, einfach und ohne Installation.",
    primary: "Datei konvertieren",
    secondary: "Funktionen entdecken",
    points: ["Einfach und schnell.", "Anpassbare Audioqualität.", "Keine Installation nötig."],
    monitor: "Monitor",
    demo: "Demonstrationssignal",
    demoHint: "Diese Wellenform wird auf dem Bildschirm gezeichnet. Sie spielt Ihre Datei nicht ab.",
  },
  converter: {
    title: "Audio-Konverter",
    dropTitle: "Audiodatei ablegen",
    dropText: "Datei hierher ziehen oder Gerät durchsuchen.",
    choose: "Datei wählen",
    fileInput: "Auswahl von Audiodateien",
    addMore: "Dateien hinzufügen",
    limits: "{audio}. Video: {video}. Maximal {size}, {count} Dateien gleichzeitig.",
    queueTitle: "Zu konvertierende Dateien",
    remove: "{name} entfernen",
    listenSource: "Original anhören",
    listenOutput: "Ergebnis anhören",
    hidePlayer: "Player ausblenden",
    convertOne: "In {format} konvertieren",
    convertMany: "{count} Dateien in {format} konvertieren",
    converting: "Konvertierung läuft…",
    cancel: "Abbrechen",
    another: "Weitere Datei konvertieren",
    download: "{format} herunterladen",
    engineDownload: "Audio-Engine wird geladen… {percent} %",
    engineDownloadUnknown: "Audio-Engine wird geladen…",
    engineCompile: "Engine wird initialisiert…",
    engineHint:
      "Das Konvertierungsprogramm (ca. 32 MB) wird bei der ersten Konvertierung von dieser Seite geladen. Ihre Audiodatei wird nicht hochgeladen.",
    emptySelection: "Fügen Sie eine Audiodatei hinzu, um die Bitrate zu wählen und zu starten.",
    customNameHint: "Der benutzerdefinierte Name gilt, wenn eine einzelne Datei bereit ist.",
    losslessHint: "WAV und FLAC sind verlustfrei: Die Bitrate gilt nicht.",
    metadataIncluded: "Titel und Künstler aus der Datei werden mit den Metadaten übernommen.",
    sizeNote: "Dieser Hinweis gilt nur für diese Datei und diese Einstellungen.",
    smaller: "{amount} kleiner als die Originaldatei.",
    larger: "{amount} größer als die Originaldatei.",
    sameSize: "Gleiche Größe wie die Originaldatei.",
    playbackUnsupported:
      "Die Wiedergabe ist in diesem Browser für dieses Format nicht verfügbar. Der Download funktioniert weiterhin.",
    cancelHint: "Abbruch stoppt den laufenden Auftrag. Die Engine wird zurückgesetzt.",
    sourceFile: "Datei",
    sourceUrl: "Link",
    urlTitle: "Von einem Link konvertieren",
    urlText:
      "Fügen Sie die Adresse eines Videos oder Titels ein. Audiova holt das Medium, konvertiert es und startet den Download.",
    urlPlaceholder: "https://…",
    urlSubmit: "Konvertieren und herunterladen",
    urlLoading: "Medium wird abgerufen…",
    urlConverting: "Konvertierung und Download-Vorbereitung…",
    urlHint:
      "Funktioniert mit vielen von yt-dlp unterstützten Seiten (YouTube, Vimeo, direkte Audio-Links…). Nutzen Sie nur Inhalte, die Sie herunterladen dürfen. Limit: 100 MB.",
    urlLegal: "Sie müssen die erforderlichen Rechte am importierten Inhalt besitzen.",
  },
  settings: {
    format: "Ausgabeformat",
    principal: "Haupt",
    bitrate: "Bitrate",
    sampleRate: "Abtastrate",
    auto: "Auto",
    metadata: "Metadaten behalten",
    metadataHint: "Kopiert Tags, die die Engine übertragen kann. Cover sind nicht garantiert.",
    identity: "Titel und Künstler behalten",
    identityHint: "Schreibt nur diese beiden Felder aus der Datei.",
    filename: "Name der Ausgabedatei",
    filenameHint: "Ohne Erweiterung. Das gewählte Format wird automatisch angehängt.",
  },
  facts: {
    duration: "Dauer",
    sampleRate: "Abtastrate",
    bitrate: "Bitrate",
    size: "Größe",
    format: "Format",
  },
  status: {
    analyzing: "Analyse…",
    ready: "Bereit",
    queued: "Warteschlange",
    converting: "Konvertierung",
    finalizing: "Abschluss",
    done: "Fertig",
    error: "Fehler",
    cancelled: "Abgebrochen",
    progress: "Fortschritt",
  },
  errors: {
    unsupported: "Dieses Format wird nicht unterstützt.",
    damaged: "Die Datei scheint beschädigt zu sein.",
    memory: "Nicht genug Speicher, um diese Datei zu verarbeiten.",
    failed: "Konvertierung fehlgeschlagen. Versuchen Sie eine andere Datei.",
    "too-large": "Die Dateigröße überschreitet das erlaubte Limit.",
    empty: "Die Datei ist leer.",
    "no-audio": "Keine nutzbare Audiospur gefunden.",
    engine: "Die Audio-Engine konnte nicht geladen werden. Seite neu laden und erneut versuchen.",
    "too-many": "Maximal fünf Dateien. Zusätzliche Dateien wurden ignoriert.",
    timeout: "Die Konvertierung hat zu lange gedauert. Versuchen Sie eine kürzere Datei.",
    "url-invalid": "Dieser Link ist ungültig.",
    "url-blocked": "Diese Adresse ist nicht erlaubt.",
    "url-fetch": "Das Medium konnte nicht abgerufen werden. Link prüfen und erneut versuchen.",
    "url-unavailable": "Dieser Inhalt ist nicht verfügbar oder wird nicht unterstützt.",
    "url-busy": "Ein anderer Link-Import läuft bereits. Bitte gleich erneut versuchen.",
    "url-rate": "Zu viele Link-Imports. Eine Minute warten und erneut versuchen.",
  },
  player: {
    play: "Wiedergeben",
    pause: "Pause",
    position: "Wiedergabeposition",
    volume: "Lautstärke",
    mute: "Stummschalten",
    unmute: "Ton einschalten",
  },
  history: {
    title: "Letzte Konvertierungen",
    intro:
      "Diese Einträge bleiben in diesem Browser: Dateiname, Datum, Format und Bitrate. Audio wird nicht gespeichert und kann aus dem Verlauf nicht erneut heruntergeladen werden.",
    empty: "Keine Konvertierung auf diesem Gerät gespeichert.",
    clear: "Verlauf löschen",
    sampleAuto: "Original-Abtastrate",
  },
  features: {
    title: "Ein Hörwerkzeug, kein Formular",
    intro:
      "Audiova konvertiert lokal, mit den nützlichen Einstellungen und sonst nichts. Versprechen entsprechen dem, was die Engine wirklich tut.",
    items: [
      {
        title: "Vereinfachte Konvertierung",
        body: "Wandeln Sie Audiodateien in wenigen Klicks um, ohne komplizierten Ablauf.",
      },
      {
        title: "Anpassbare Qualität",
        body: "Wählen Sie die Bitrate, die zu Ihren Bedürfnissen passt.",
      },
      {
        title: "Privatsphäre",
        body: "Auf dem Gerät gewählte Dateien bleiben für die Konvertierung lokal. Ein Link wird nur vorübergehend vom Server geholt und dann im Browser konvertiert.",
      },
      {
        title: "Alle Ihre Geräte",
        body: "Eine Oberfläche für Computer, Tablet oder Smartphone.",
      },
    ],
  },
  formats: {
    title: "Tatsächlich unterstützte Formate",
    intro:
      "Der MP3-Konverter akzeptiert Container, die FFmpeg.wasm in diesem Build lesen kann. Eine bekannte Erweiterung reicht nicht, wenn die Datei unvollständig, verschlüsselt oder ohne Audiospur ist.",
    output: "Ausgabe",
    input: "Eingabe",
    video: "Video",
    videoNote: "Das Bild wird ignoriert. Nur die Audiospur wird konvertiert.",
    bitrateYes: "Einstellbare Bitrate",
    bitrateNo: "Bitrate vom Format fest",
  },
  how: {
    title: "Eine Audiodatei zu konvertieren war noch nie so einfach.",
    steps: [
      {
        title: "Datei importieren",
        body: "Vom Gerät oder per Video-/Audio-Link. Drag-and-Drop funktioniert auf größeren Bildschirmen.",
      },
      {
        title: "Einstellungen wählen",
        body: "MP3 ist ausgewählt. Standardbitrate ist 192 kb/s. Die Abtastrate kann der Quelle folgen.",
      },
      {
        title: "MP3 herunterladen",
        body: "Der angebotene Download ist das Konvertierungsergebnis, keine umbenannte Kopie.",
      },
    ],
  },
  faq: {
    title: "Häufige Fragen",
    items: [
      {
        question: "Wie konvertiere ich eine Audiodatei zu MP3?",
        answer: [
          "Datei importieren oder Link einfügen, MP3 belassen, Bitrate bei Bedarf anpassen, dann starten. Nach dem Abschluss MP3 herunterladen. Die Kodierung läuft im Browser.",
        ],
      },
      {
        question: "Kann ich ein Video oder einen Titel per Link importieren?",
        answer: [
          "Ja. Im Konverter den Tab Link öffnen, Adresse einfügen und auf Konvertieren und herunterladen klicken. Audiova holt das Medium, konvertiert es und startet den Download.",
          "Nicht jede Seite funktioniert. Private, geschützte oder zu große Inhalte (über 100 MB) werden abgelehnt. Nur Inhalte importieren, für die Sie Rechte haben.",
        ],
      },
      {
        question: "Ist der Konverter kostenlos?",
        answer: [
          "Ja. Diese Version ist kostenlos, ohne Konto und ohne Kontingent. Jede Datei muss unter 100 MB bleiben, die Warteschlange nimmt höchstens 5 Dateien.",
        ],
      },
      {
        question: "Was ist der Unterschied zwischen 128, 192 und 320 kb/s?",
        answer: [
          "Die Bitrate ist die Datenmenge pro Sekunde. 128 kb/s ergibt eine leichtere Datei, gut für Sprache. 192 kb/s ist Standard und ein guter Kompromiss für Musik. 320 kb/s ist die höchste hier angebotene MP3-Bitrate: die Datei ist schwerer und näher an einer detaillierten Quelle.",
          "Eine höhere Bitrate verbessert kein bereits komprimiertes oder beschädigtes Original.",
        ],
      },
      {
        question: "Kann ich eine WAV-Datei zu MP3 konvertieren?",
        answer: [
          "Ja, wenn die WAV lesbar ist. WAV ist meist unkomprimiert: das MP3 wird kleiner, mit Verlust je nach gewählter Bitrate.",
        ],
      },
      {
        question: "Kann ich die Seite auf dem Handy nutzen?",
        answer: [
          "Ja. Die Oberfläche ist für Handy, Tablet und Computer gedacht. Auf dem Handy kann eine lange Datei trotz 100-MB-Limit am Speicher scheitern. Dann eine Datei nach der anderen verarbeiten.",
        ],
      },
      {
        question: "Werden meine Dateien an einen Server gesendet?",
        answer: [
          "Bei einer Datei vom Gerät: nein. FFmpeg läuft im Browser. Die Datei wird nicht hochgeladen und nicht gespeichert. Das Konvertierungsprogramm (ca. 32 MB) wird jedoch beim ersten Mal von dieser Seite geladen.",
          "Bei Link-Import: Der Audiova-Server lädt das Medium vorübergehend herunter, liefert es aus und löscht es. Die Konvertierung selbst bleibt lokal.",
          "Der lokale Verlauf speichert Name, Datum, Format und Bitrate. Nicht das Audio.",
        ],
      },
      {
        question: "Was ist die maximale Dateigröße?",
        answer: [
          "100 MB pro Datei. Darüber wird die Datei vor der Konvertierung abgelehnt. Fünf Dateien können vorbereitet und nacheinander konvertiert werden.",
        ],
      },
      {
        question: "Warum kann die Konvertierung dauern?",
        answer: [
          "Die Engine lädt einmal. Danach nutzt die Kodierung die CPU des Geräts, einthreadig, um mit Handys kompatibel zu bleiben. Eine lange Datei oder ein schwaches Gerät verlängert die Wartezeit.",
          "Der Prozentsatz kommt von der Engine, wenn sie einen liefert. Sonst bleibt die Anzeige unbestimmt: es wird kein Fake-Prozentsatz erfunden.",
        ],
      },
      {
        question: "Kann ich mehrere Dateien gleichzeitig konvertieren?",
        answer: [
          "Ja, bis zu 5. Dieselben Einstellungen gelten für die Warteschlange. Es wird jeweils nur eine Datei kodiert, um den Speicher zu schonen.",
        ],
      },
      {
        question: "Warum sind manche Dateien inkompatibel?",
        answer: [
          "Nur Formate aus dem Abschnitt Formate werden akzeptiert. Eine geschützte, abgeschnittene oder nicht passende Datei wird mit einer klaren Meldung abgelehnt.",
        ],
      },
      {
        question: "Kann ich ein Video in eine Audiodatei umwandeln?",
        answer: [
          "Ja für MP4, MOV, WebM und MKV, wenn eine Audiospur vorhanden ist. Das Bild wird verworfen. Ohne Audiospur stoppt die Konvertierung und meldet das.",
        ],
      },
      {
        question: "Können Metadaten erhalten bleiben?",
        answer: [
          "Ja. Die Option ist standardmäßig aktiv. Titel, Künstler und andere Tags, die FFmpeg kopieren kann, bleiben erhalten, wenn das Ausgabeformat es erlaubt. Nicht jedes Tag und nicht das Cover ist garantiert.",
          "Wenn Sie Metadaten deaktivieren und Titel oder Künstler gelesen wurden, können Sie nur diese beiden Felder behalten.",
        ],
      },
    ],
  },
  footer: {
    description: "Audio-Konverter im Browser. Your audio. Your format. Your freedom.",
    product: "Produkt",
    information: "Informationen",
    privacy: "Datenschutz",
    legal: "Impressum",
    contact: "Kontakt",
    rights: "© {year} Audiova. Unabhängiges Werkzeug.",
  },
  privacy: {
    metaTitle: "Datenschutz",
    metaDescription:
      "Audiova konvertiert Audiodateien im Browser. Erfahren Sie, welche Informationen auf Ihrem Gerät bleiben.",
    title: "Datenschutz",
    intro:
      "Diese Seite beschreibt den aktuellen Betrieb der Website. Sie verspricht keinen Schutz, den die Architektur nicht bietet.",
    sections: [
      {
        title: "Lokale Konvertierung",
        paragraphs: [
          "Wenn Sie eine Datei auf Ihrem Gerät wählen, liest sie der Browser und FFmpeg.wasm verarbeitet sie lokal. Sie wird nicht an einen Konvertierungsserver gesendet, und Audiova behält keine Kopie.",
          "Das Konvertierungsprogramm, eine WebAssembly-Datei von ca. 32 MB, wird bei der ersten Konvertierung von derselben Seite heruntergeladen. Das ist die Engine, nicht Ihr Audio.",
        ],
      },
      {
        title: "Import per Link",
        paragraphs: [
          "Wenn Sie eine URL einfügen, holt der Server dieser App das Medium vorübergehend mit yt-dlp, sendet es an Ihren Browser und löscht die temporäre Datei. Dieser Schritt ist nötig, weil die meisten Seiten einen direkten Browser-Download blockieren.",
          "Die folgende Konvertierung bleibt lokal. Nutzen Sie die Funktion nur für Inhalte, die Sie herunterladen dürfen.",
        ],
      },
      {
        title: "Verlauf im Browser",
        paragraphs: [
          "Bei erfolgreicher Konvertierung kann der Browser lokal Name, Datum, Format, Bitrate und Abtastrate speichern. Die Daten bleiben auf dem Gerät. Sie können sie im Verlauf löschen.",
          "Audio wird nicht gespeichert. Der Verlauf erlaubt keinen erneuten Download.",
        ],
      },
      {
        title: "Reichweitenmessung und Einwilligung",
        paragraphs: [
          "Mit Ihrer Zustimmung (« Statistiken akzeptieren » oder « Alles akzeptieren ») speichert Audiova anonymisierte Ereignisse: Seitenaufrufe, Sitzungen, erfolgreiche oder fehlgeschlagene Konvertierungen, Ausgabeformat, Sprache und ungefähren Browser. Keine Audiodatei wird dafür gesendet.",
          "Ohne Einwilligung wird keine Reichweitenmessung gesendet. Sprachpräferenz und Datenschutzwahl bleiben auf Ihrem Gerät. Es gibt kein Benutzerkonto und keine Datenbank konvertierter Dateien.",
        ],
      },
      {
        title: "Grenzen",
        paragraphs: [
          "Browser, System und Downloads-Ordner behalten die gespeicherte Datei. Das hängt nicht von Audiova ab.",
          "Der Gerätespeicher begrenzt die praktikable Größe. Über 100 MB wird eine Datei abgelehnt. Ein Telefon kann früher scheitern: die Meldung nennt dann Speicher, ohne technischen Rohdump.",
        ],
      },
      {
        title: "Werbung",
        paragraphs: [
          "Werbeplätze sind standardmäßig deaktiviert. Wenn sie in der Admin-Konsole aktiviert werden, erscheinen sie nur bei « Alles akzeptieren » und dürfen Konvertierungsbuttons nicht überdecken.",
          "Wird später ein Drittanbieter-Werbenetzwerk angebunden, werden dessen Cookies hier vor der Aktivierung beschrieben.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Impressum",
    metaDescription: "Informationen zu Herausgeber, Hosting und Software von Audiova.",
    title: "Impressum",
    intro:
      "Audiova ist ein unabhängiges Werkzeug. Hier werden keine Firma, Adresse oder Registernummer genannt, weil sie für dieses Projekt nicht existieren.",
    sections: [
      {
        title: "Herausgeber",
        paragraphs: [
          "Die Seite erscheint als persönliches, unabhängiges Werkzeug. Es gibt in dieser Version keine Firmenbezeichnung, keinen Sitz und keinen verantwortlichen Herausgeber anzugeben.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "Das Hosting hängt vom Einsatzort der Seite ab. Die App selbst schreibt keinen Host vor. Die Audiokonvertierung nutzt dieses Hosting nicht: sie läuft im Browser des Besuchers.",
        ],
      },
      {
        title: "Dateien und Rechte",
        paragraphs: [
          "Sie müssen das Recht haben, die importierten Dateien und Links zu konvertieren oder herunterzuladen. Audiova prüft keine Urheberschaft und erteilt keine Vervielfältigungserlaubnis.",
        ],
      },
      {
        title: "Drittanbieter-Software",
        paragraphs: [
          "Die Konvertierung basiert auf FFmpeg für WebAssembly über das Paket @ffmpeg/core. Dieser Build unterliegt der GPL, insbesondere wegen libmp3lame für MP3. FFmpeg ist eine Marke des FFmpeg-Projekts.",
          "Link-Import nutzt yt-dlp über youtube-dl-exec. Weitere UI-Bibliotheken stehen in den Projektabhängigkeiten.",
        ],
      },
      {
        title: "Haftung",
        paragraphs: [
          "Das Werkzeug wird wie besehen bereitgestellt. Eine Konvertierung kann scheitern, eine größere Datei erzeugen oder Metadaten fehlen lassen. Prüfen Sie das Ergebnis, bevor Sie das Original löschen.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Kontakt",
    metaDescription: "Senden Sie ein Ticket an das Audiova-Team und verfolgen Sie die Unterhaltung.",
    title: "Kontakt",
    intro:
      "Öffnen Sie unten ein Ticket: die Nachricht erscheint in der Admin-Konsole. Sie können auf diese Seite zurückkehren, um weiterzuschreiben.",
    helpTitle: "Bevor Sie ein Ticket öffnen",
    help: [
      "Ein abgelehntes Format liegt vielleicht außerhalb der unterstützten Liste.",
      "Eine Datei über 100 MB wird vor der Konvertierung gestoppt.",
      "Ein Telefon kann auch unter diesem Limit an Speicher scheitern.",
      "Ausführliche Antworten stehen in der FAQ.",
    ],
    faq: "FAQ lesen",
    mail: "Schreiben an {email}",
    mailMissing: "Keine öffentliche E-Mail konfiguriert. Nutzen Sie das Ticket oben.",
    ticket: {
      title: "Ticket / Chat",
      intro: "Beschreiben Sie Ihre Frage. Die Unterhaltung bleibt über ein lokales Token an dieses Gerät gebunden.",
      name: "Name",
      email: "E-Mail",
      subject: "Betreff",
      message: "Nachricht",
      send: "Ticket öffnen",
      sending: "Senden…",
      reply: "Senden",
      replyPlaceholder: "Antwort schreiben…",
      loading: "Ticket wird geladen…",
      ref: "Ref.",
      statusLabel: "Status",
      status: {
        open: "offen",
        answered: "beantwortet",
        closed: "geschlossen",
      },
      you: "Sie",
      support: "Support",
      newTicket: "Neues Ticket",
      closed: "Dieses Ticket ist geschlossen. Öffnen Sie bei Bedarf ein neues.",
      rate: "Zu viele Nachrichten. Später erneut versuchen.",
      invalid: "Felder prüfen (Name, E-Mail, Betreff, Nachricht).",
      network: "Senden gerade nicht möglich.",
    },
  },
  notFound: {
    title: "Diese Seite existiert nicht",
    body: "Der Link entspricht keiner Audiova-Seite.",
    back: "Zurück zum Konverter",
  },
};
