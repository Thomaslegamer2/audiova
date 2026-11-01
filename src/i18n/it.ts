import type { Dictionary } from "@/i18n/fr";

export const it: Dictionary = {
  meta: {
    title: "Audiova — Convertitore MP3 online gratuito",
    description:
      "Converti un file audio in MP3 nel browser. WAV, FLAC, M4A, OGG e tracce video. Gratis, senza installazione, senza invio del file nella conversione locale.",
    ogAlt: "Audiova, convertitore audio in MP3",
  },
  skip: "Vai al contenuto",
  nav: {
    label: "Navigazione principale",
    converter: "Convertitore",
    features: "Funzioni",
    formats: "Formati",
    faq: "FAQ",
    openFile: "Apri un file",
    openMenu: "Apri menu",
    closeMenu: "Chiudi menu",
    language: "Lingua",
    discord: "Unisciti a Discord",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "Il tuo audio.",
    titleRest: "In",
    titleAccent: "MP3",
    titleEnd: ". Semplicemente.",
    subtitle:
      "Converti i tuoi file audio in MP3 in pochi clic. Gratis, semplice e senza installazione.",
    primary: "Converti un file",
    secondary: "Scopri le funzioni",
    points: ["Semplice e veloce.", "Qualità audio regolabile.", "Nessuna installazione."],
    monitor: "Monitor",
    demo: "Segnale dimostrativo",
    demoHint: "Questa forma d'onda è disegnata sullo schermo. Non riproduce il tuo file.",
  },
  converter: {
    title: "Convertitore audio",
    dropTitle: "Trascina il file audio",
    dropText: "Trascina qui il file oppure sfoglia il dispositivo.",
    dropFolders: "Le cartelle sono accettate: i file audio/video al loro interno vengono aggiunti automaticamente.",
    choose: "Scegli un file",
    fileInput: "Selezione file audio",
    addMore: "Aggiungi file",
    limits: "{audio}. Video: {video}. Massimo {size}, {count} file alla volta.",
    queueTitle: "File da convertire",
    queueSummary: "{count} in coda · {done} completati",
    queueReady: "{count} pronti da convertire",
    queueWaiting: "In attesa in coda",
    etaSeconds: "≈ {seconds} s rimanenti",
    etaMinutes: "≈ {minutes} min rimanenti",
    remove: "Rimuovi {name}",
    listenSource: "Ascolta l'originale",
    listenOutput: "Ascolta il risultato",
    hidePlayer: "Nascondi il lettore",
    convertOne: "Converti in {format}",
    convertMany: "Converti {count} file in {format}",
    converting: "Conversione in corso…",
    cancel: "Annulla",
    another: "Converti un altro file",
    download: "Scarica {format}",
    engineDownload: "Caricamento motore audio… {percent} %",
    engineDownloadUnknown: "Caricamento motore audio…",
    engineCompile: "Inizializzazione del motore…",
    engineHint:
      "Il programma di conversione, circa 32 MB, viene caricato da questo sito alla prima conversione. Il file audio non viene inviato.",
    emptySelection: "Aggiungi un file audio per scegliere il bitrate e avviare la conversione.",
    customNameHint: "Il nome personalizzato vale quando c'è un solo file pronto.",
    losslessHint: "WAV e FLAC sono senza perdita: il bitrate non si applica.",
    metadataIncluded: "Titolo e artista letti dal file sono inclusi con i metadati.",
    sizeNote: "Questa nota riguarda solo questo file e queste impostazioni.",
    smaller: "{amount} in meno rispetto al file originale.",
    larger: "{amount} in più rispetto al file originale.",
    sameSize: "Stessa dimensione del file originale.",
    playbackUnsupported:
      "La riproduzione non è disponibile in questo browser per questo formato. Il download resta possibile.",
    cancelHint: "L'annullamento interrompe il lavoro in corso. Il motore verrà reimpostato.",
    sourceFile: "File",
    sourceUrl: "Link",
    urlTitle: "Importa da un link",
    urlText:
      "Incolla l'indirizzo di un video o di un brano. Audiova recupera il media; poi scegli la qualità prima di convertire e scaricare.",
    urlPlaceholder: "https://…",
    urlSubmit: "Importa il media",
    urlLoading: "Recupero del media…",
    urlConverting: "Conversione…",
    urlLegal:
      "Importante: sei l’unico responsabile dei contenuti che importi o scarichi. Audiova non è in alcun modo responsabile se recuperi musica o media che non hai acquistato o per cui non hai i diritti. Usa solo file di tua proprietà o che sei autorizzato a convertire.",
  },
  settings: {
    format: "Formato di uscita",
    principal: "Principale",
    bitrate: "Bitrate",
    sampleRate: "Frequenza di campionamento",
    auto: "Auto",
    quality: "Qualità di uscita",
    qualityHint:
      "Scegli prima di avviare. 320 kb/s è il massimo MP3; FLAC e WAV sono senza perdita (massima fedeltà, file più pesante).",
    presetLight: "Leggero",
    presetStandard: "Standard",
    presetBest: "Miglior MP3",
    presetLossless: "Senza perdita",
    bestBadge: "Max",
    metadata: "Conserva i metadati",
    metadataHint: "Copia i tag che il motore sa trasferire. Le copertine non sono garantite.",
    identity: "Conserva titolo e artista",
    identityHint: "Scrive solo questi due campi, letti dal file.",
    filename: "Nome del file di uscita",
    filenameHint: "Senza estensione. Il formato scelto viene aggiunto automaticamente.",
  },
  facts: {
    duration: "Durata",
    sampleRate: "Frequenza",
    bitrate: "Bitrate",
    size: "Dimensione",
    format: "Formato",
  },
  status: {
    analyzing: "Analisi…",
    ready: "Pronto",
    queued: "In coda",
    converting: "Conversione",
    finalizing: "Finalizzazione",
    done: "Completato",
    error: "Errore",
    cancelled: "Annullata",
    progress: "Avanzamento",
  },
  errors: {
    unsupported: "Questo formato non è supportato.",
    damaged: "Il file sembra danneggiato.",
    memory: "Memoria insufficiente per elaborare questo file.",
    failed: "Conversione non riuscita. Prova con un altro file.",
    "too-large": "La dimensione del file supera il limite consentito.",
    empty: "Il file è vuoto.",
    "no-audio": "Nessuna traccia audio utilizzabile trovata.",
    engine: "Impossibile caricare il motore audio. Ricarica la pagina e riprova.",
    "too-many": "Limite di file raggiunto. I file aggiuntivi sono stati ignorati.",
    timeout: "La conversione ha superato il tempo limite. Prova un file più corto.",
    "url-invalid": "Questo link non è valido.",
    "url-blocked": "Questo indirizzo non è consentito.",
    "url-fetch": "Impossibile recuperare il media. Controlla il link e riprova.",
    "url-unavailable": "Questo contenuto non è disponibile o non è supportato.",
    "url-busy": "Un altro import da link è già in corso. Riprova tra poco.",
    "url-rate": "Troppi import da link. Attendi un minuto e riprova.",
  },
  player: {
    play: "Riproduci",
    pause: "Pausa",
    position: "Posizione di riproduzione",
    volume: "Volume",
    mute: "Disattiva audio",
    unmute: "Attiva audio",
  },
  history: {
    title: "Conversioni recenti",
    intro:
      "Queste righe restano in questo browser: nome file, data, formato e bitrate. L'audio non è conservato e non può essere riscaricato da questa cronologia.",
    empty: "Nessuna conversione salvata su questo dispositivo.",
    clear: "Cancella cronologia",
    sampleAuto: "Frequenza originale",
    downloadAgain: "Scarica di nuovo",
    expired: "File scaduto — riconverti per recuperarlo.",
  },
  features: {
    title: "Uno strumento di ascolto, non un modulo",
    intro:
      "Audiova converte in locale, con le impostazioni utili e nient'altro. Le promesse corrispondono a ciò che il motore fa davvero.",
    items: [
      {
        title: "Conversione semplificata",
        body: "Trasforma i file audio in pochi clic, senza procedure complicate.",
      },
      {
        title: "Qualità personalizzabile",
        body: "Scegli il bitrate adatto alle tue esigenze.",
      },
      {
        title: "Privacy",
        body: "I file scelti sul dispositivo restano locali per la conversione. Un link viene recuperato solo temporaneamente dal server, poi convertito nel browser.",
      },
      {
        title: "Tutti i tuoi dispositivi",
        body: "Un'interfaccia adatta a computer, tablet o smartphone.",
      },
    ],
  },
  formats: {
    title: "Formati realmente supportati",
    intro:
      "Il convertitore MP3 accetta i contenitori che FFmpeg.wasm sa leggere in questa build. Un'estensione nota non basta se il file è incompleto, cifrato o senza traccia audio.",
    output: "Uscita",
    input: "Ingresso",
    video: "Video",
    videoNote: "L'immagine viene ignorata. Solo la traccia audio viene convertita.",
    bitrateYes: "Bitrate regolabile",
    bitrateNo: "Bitrate fisso dal formato",
  },
  how: {
    title: "Convertire un file audio non è mai stato così semplice.",
    steps: [
      {
        title: "Importa il file",
        body: "Dal dispositivo, oppure incolla un link video/audio. Il drag and drop funziona sugli schermi grandi.",
      },
      {
        title: "Scegli i parametri",
        body: "MP3 è selezionato. Il bitrate predefinito è 192 kb/s. La frequenza può seguire la sorgente.",
      },
      {
        title: "Scarica il tuo MP3",
        body: "Il file proposto per il download è il risultato della conversione, non una copia rinominata.",
      },
    ],
  },
  faq: {
    title: "Domande frequenti",
    items: [
      {
        question: "Come converto un file audio in MP3?",
        answer: [
          "Importa un file o incolla un link, lascia MP3 selezionato, regola il bitrate se vuoi, poi avvia. A fine elaborazione scarica l'MP3. La codifica avviene nel browser.",
        ],
      },
      {
        question: "Posso importare un video o un brano da un link?",
        answer: [
          "Sì. Nel convertitore apri la scheda Link, incolla l'indirizzo e clicca Converti e scarica. Audiova recupera il media, lo converte e avvia il download.",
          "Non tutti i siti funzionano. Contenuti privati, protetti o troppo pesanti (oltre 100 MB) vengono rifiutati. Importa solo contenuti per cui hai i diritti.",
        ],
      },
      {
        question: "Il convertitore è gratis?",
        answer: [
          "Sì. Questa versione è gratuita, senza account e senza quota. Ogni file deve restare sotto 100 MB e la coda accetta al massimo 5 file.",
        ],
      },
      {
        question: "Qual è la differenza tra 128, 192 e 320 kb/s?",
        answer: [
          "Il bitrate è la quantità di dati conservata al secondo. 128 kb/s dà un file più leggero, adatto alla voce. 192 kb/s è il valore predefinito, un buon equilibrio per la musica. 320 kb/s è il bitrate MP3 più alto offerto qui: il file è più pesante e più vicino a una sorgente dettagliata.",
          "Alzare il bitrate non migliora un originale già compresso o danneggiato.",
        ],
      },
      {
        question: "Posso convertire un file WAV in MP3?",
        answer: [
          "Sì, se il WAV è leggibile. Il WAV di solito non è compresso: l'MP3 risultante è più piccolo, con perdita legata al bitrate scelto.",
        ],
      },
      {
        question: "Posso usare il sito sul telefono?",
        answer: [
          "Sì. L'interfaccia è pensata per telefono, tablet e computer. Sul telefono un file lungo può fallire per mancanza di memoria anche sotto i 100 MB. In quel caso elabora un file alla volta.",
        ],
      },
      {
        question: "I miei file vengono inviati a un server?",
        answer: [
          "Per un file scelto sul dispositivo: no. FFmpeg gira nel browser. Il file non viene caricato né conservato. Il programma di conversione, circa 32 MB, viene però scaricato da questo sito la prima volta.",
          "Per un import da link: il server di Audiova scarica temporaneamente il media per consegnartelo, poi lo elimina. La conversione resta locale.",
          "La cronologia locale memorizza nome, data, formato e bitrate. Non l'audio.",
        ],
      },
      {
        question: "Qual è la dimensione massima di un file?",
        answer: [
          "100 MB per file. Oltre, il file viene rifiutato prima della conversione. Si possono preparare cinque file, poi convertiti uno dopo l'altro.",
        ],
      },
      {
        question: "Perché la conversione può richiedere tempo?",
        answer: [
          "Il motore si carica una volta. Poi la codifica usa la CPU del dispositivo, su un solo thread, per restare compatibile con i telefoni. Un file lungo o un dispositivo modesto allunga l'attesa.",
          "La percentuale viene dal motore quando la fornisce. Altrimenti l'indicatore resta indeterminato: non si inventa alcuna percentuale.",
        ],
      },
      {
        question: "Posso convertire più file insieme?",
        answer: [
          "Sì, fino a 5. Le stesse impostazioni valgono per la coda. Si codifica un solo file alla volta per limitare la memoria.",
        ],
      },
      {
        question: "Perché alcuni file non sono compatibili?",
        answer: [
          "Sono accettati solo i formati elencati nella sezione Formati. Un file protetto, troncato o non corrispondente all'estensione viene rifiutato con un messaggio chiaro.",
        ],
      },
      {
        question: "Posso convertire un video in un file audio?",
        answer: [
          "Sì per MP4, MOV, WebM e MKV quando c'è una traccia audio. L'immagine viene scartata. Senza traccia audio la conversione si interrompe e lo indica.",
        ],
      },
      {
        question: "È possibile conservare i metadati?",
        answer: [
          "Sì. L'opzione è attiva per impostazione predefinita. Titolo, artista e altri tag che FFmpeg sa copiare restano quando il formato di uscita lo consente. Non è garantito per ogni tag né per la copertina.",
          "Se disattivi i metadati e titolo o artista sono stati letti, un'opzione permette di tenere solo quei due campi.",
        ],
      },
    ],
  },
  footer: {
    description: "Convertitore audio nel browser. Your audio. Your format. Your freedom.",
    product: "Prodotto",
    information: "Informazioni",
    privacy: "Privacy",
    legal: "Note legali",
    contact: "Contatto",
    rights: "© {year} Audiova. Strumento indipendente.",
  },
  privacy: {
    metaTitle: "Privacy",
    metaDescription:
      "Audiova converte file audio nel browser. Scopri quali informazioni restano sul dispositivo.",
    title: "Privacy",
    intro:
      "Questa pagina descrive il funzionamento attuale del sito. Non promette una protezione che l'architettura non offre.",
    sections: [
      {
        title: "Conversione locale",
        paragraphs: [
          "Quando scegli un file sul dispositivo, il browser lo legge e FFmpeg.wasm lo elabora sul dispositivo. Non viene inviato a un server di conversione e Audiova non ne conserva una copia.",
          "Il programma di conversione, un file WebAssembly di circa 32 MB, viene scaricato dallo stesso sito alla prima conversione. Quel download è il motore, non il tuo audio.",
        ],
      },
      {
        title: "Import da un link",
        paragraphs: [
          "Se incolli un URL, il server di questa applicazione recupera temporaneamente il media con yt-dlp, lo invia al browser e cancella il file temporaneo. Questo passaggio è necessario perché molti siti bloccano il download diretto dal browser.",
          "La conversione successiva resta locale. Usa questa funzione solo per contenuti che hai diritto di scaricare.",
        ],
      },
      {
        title: "Cronologia nel browser",
        paragraphs: [
          "Se una conversione riesce, il browser può salvare localmente nome, data, formato, bitrate e frequenza. I dati restano sul dispositivo. Puoi cancellarli dalla sezione cronologia.",
          "L'audio non viene memorizzato. La cronologia non permette di riscaricare un file.",
        ],
      },
      {
        title: "Misurazione dell’audience e consenso",
        paragraphs: [
          "Con il tuo consenso (« Accetta le statistiche » o « Accetta tutto »), Audiova registra eventi anonimizzati: pagine viste, sessioni, conversioni riuscite o fallite, formato di uscita, lingua e browser approssimativo. Nessun file audio viene inviato a questo scopo.",
          "Senza consenso non viene inviata alcuna misurazione. Preferenza di lingua e scelta sulla privacy restano sul dispositivo. Non c’è account utente né database dei file convertiti.",
        ],
      },
      {
        title: "Limiti",
        paragraphs: [
          "Browser, sistema e cartella download conservano il file che salvi. Ciò non dipende da Audiova.",
          "La memoria del dispositivo limita la dimensione pratica. Un file oltre 100 MB viene rifiutato. Un telefono può fallire prima: il messaggio parla di memoria, senza dump tecnico grezzo.",
        ],
      },
      {
        title: "Pubblicità",
        paragraphs: [
          "Gli spazi pubblicitari sono disattivati per impostazione predefinita. Se attivati dalla console admin, compaiono solo con « Accetta tutto » e non devono coprire i pulsanti di conversione.",
          "Se in seguito si collega una rete pubblicitaria di terzi, eventuali cookie saranno descritti qui prima dell’attivazione.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Note legali e condizioni",
    metaDescription: "Note legali, condizioni d'uso e responsabilità di Audiova.",
    title: "Note legali e condizioni",
    intro:
      "Audiova è uno strumento indipendente di conversione audio. Usando il sito accetti le regole seguenti, in particolare sul copyright.",
    sections: [
      {
        title: "Editore",
        paragraphs: [
          "Il sito è pubblicato come strumento personale e indipendente. Non c'è ragione sociale, sede o direttore della pubblicazione da dichiarare in questa versione.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "L'hosting dipende da dove il sito è deployato. La conversione locale avviene nel browser del visitatore. L'import da link può transitare brevemente sul server solo per recuperare il media.",
        ],
      },
      {
        title: "Condizioni d'uso",
        paragraphs: [
          "Audiova fornisce un convertitore tecnico. Sei l'unico responsabile dell'uso, dei file importati e dei download avviati.",
          "È vietato usare Audiova per aggirare protezioni, piratare o distribuire opere protette senza autorizzazione.",
        ],
      },
      {
        title: "Copyright e contenuti",
        paragraphs: [
          "Devi essere proprietario dei file o disporre dei diritti / licenze necessari per convertirli o scaricarli.",
          "Audiova non è in alcun modo responsabile se importi o scarichi musica, video o altri media non acquistati o senza diritti.",
          "Audiova non verifica la titolarità e non concede alcuna autorizzazione di riproduzione, comunicazione o download.",
        ],
      },
      {
        title: "Software di terze parti",
        paragraphs: [
          "La conversione si basa su FFmpeg (WebAssembly via @ffmpeg/core) sotto GPL, in particolare per libmp3lame. FFmpeg è un marchio del progetto FFmpeg.",
          "L'import da link usa yt-dlp tramite youtube-dl-exec. Le altre librerie UI sono nelle dipendenze del progetto.",
        ],
      },
      {
        title: "Responsabilità",
        paragraphs: [
          "Lo strumento è fornito così com'è, senza garanzia di disponibilità, integrità del risultato o metadati.",
          "Una conversione può fallire, produrre un file più pesante o interrompersi. Verifica il risultato prima di eliminare l'originale.",
          "Nei limiti di legge, Audiova e l'editore declinano responsabilità per danni legati a uso illecito dei contenuti, perdita di file o malfunzionamento del servizio.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contatto",
    metaDescription: "Invia un ticket al team Audiova e segui la conversazione.",
    title: "Contatto",
    intro:
      "Apri un ticket qui sotto: il messaggio arriva nella console admin. Puoi tornare su questa pagina per continuare la conversazione.",
    helpTitle: "Prima di aprire un ticket",
    help: [
      "Un formato rifiutato può essere fuori dall'elenco supportato.",
      "Un file oltre 100 MB viene fermato prima della conversione.",
      "Un telefono può esaurire la memoria anche sotto quel limite.",
      "Le risposte dettagliate sono nella FAQ.",
    ],
    faq: "Leggi la FAQ",
    mail: "Scrivi a {email}",
    mailMissing: "Nessuna email pubblica configurata. Usa il ticket qui sopra.",
    ticket: {
      title: "Ticket / chat",
      intro: "Descrivi la tua domanda. La conversazione resta legata a questo dispositivo con un token locale.",
      name: "Nome",
      email: "Email",
      subject: "Oggetto",
      message: "Messaggio",
      send: "Apri ticket",
      sending: "Invio…",
      reply: "Invia",
      replyPlaceholder: "Scrivi una risposta…",
      loading: "Caricamento ticket…",
      ref: "Rif.",
      statusLabel: "Stato",
      status: {
        open: "aperto",
        answered: "risposto",
        closed: "chiuso",
      },
      you: "Tu",
      support: "Supporto",
      newTicket: "Nuovo ticket",
      closed: "Questo ticket è chiuso. Aprine uno nuovo se serve.",
      rate: "Troppi messaggi. Riprova più tardi.",
      invalid: "Controlla i campi (nome, email, oggetto, messaggio).",
      network: "Invio non disponibile al momento.",
    },
  },
  notFound: {
    title: "Questa pagina non esiste",
    body: "Il link non corrisponde ad alcuna pagina di Audiova.",
    back: "Torna al convertitore",
  },
};
