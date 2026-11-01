export const fr = {
  meta: {
    title: "Audiova — Convertisseur MP3 en ligne gratuit",
    description:
      "Convertissez un fichier audio en MP3 dans votre navigateur. WAV, FLAC, M4A, OGG et pistes vidéo. Gratuit, sans installation, sans envoi du fichier.",
    ogAlt: "Audiova, convertisseur audio vers MP3",
  },
  skip: "Aller au contenu",
  nav: {
    label: "Navigation principale",
    converter: "Convertisseur",
    features: "Fonctionnalités",
    formats: "Formats",
    faq: "FAQ",
    openFile: "Ouvrir un fichier",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
    discord: "Rejoindre Discord",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "Votre audio.",
    titleRest: "En",
    titleAccent: "MP3",
    titleEnd: ". Simplement.",
    subtitle:
      "Convertissez vos fichiers audio en MP3 en quelques clics. Gratuitement, simplement et sans installation.",
    primary: "Convertir un fichier",
    secondary: "Découvrir les fonctionnalités",
    points: ["Simple et rapide.", "Qualité audio réglable.", "Aucune installation nécessaire."],
    monitor: "Moniteur",
    demo: "Signal de démonstration",
    demoHint: "Cette onde est dessinée à l'écran. Elle ne lit pas votre fichier.",
  },
  converter: {
    title: "Convertisseur audio",
    dropTitle: "Déposez votre fichier audio",
    dropText: "Glissez-déposez votre fichier ici ou parcourez votre appareil.",
    choose: "Choisir un fichier",
    fileInput: "Sélection des fichiers audio",
    addMore: "Ajouter des fichiers",
    limits: "{audio}. Vidéo : {video}. {size} maximum, {count} fichiers à la fois.",
    queueTitle: "Fichiers à convertir",
    remove: "Retirer {name}",
    listenSource: "Écouter l'original",
    listenOutput: "Écouter le résultat",
    hidePlayer: "Masquer le lecteur",
    convertOne: "Convertir en {format}",
    convertMany: "Convertir {count} fichiers en {format}",
    converting: "Conversion en cours…",
    cancel: "Annuler",
    another: "Convertir un autre fichier",
    download: "Télécharger le {format}",
    engineDownload: "Chargement du moteur audio… {percent} %",
    engineDownloadUnknown: "Chargement du moteur audio…",
    engineCompile: "Initialisation du moteur…",
    engineHint:
      "Le programme de conversion, environ 32 Mo, est chargé depuis ce site lors de la première conversion. Le fichier audio n'est pas envoyé.",
    emptySelection: "Ajoutez un fichier audio pour choisir le débit et lancer la conversion.",
    customNameHint: "Le nom personnalisé s'applique lorsqu'un seul fichier est prêt.",
    losslessHint: "WAV et FLAC sont sans perte : le débit ne s'applique pas.",
    metadataIncluded: "Le titre et l'artiste lus dans le fichier sont inclus avec les métadonnées.",
    sizeNote: "Ce constat concerne uniquement ce fichier et ces réglages.",
    smaller: "{amount} de moins que le fichier d'origine.",
    larger: "{amount} de plus que le fichier d'origine.",
    sameSize: "Même taille que le fichier d'origine.",
    playbackUnsupported:
      "La lecture dans ce navigateur n'est pas disponible pour ce format. Le téléchargement reste possible.",
    cancelHint: "L'annulation interrompt le traitement en cours. Le moteur sera réinitialisé.",
    sourceFile: "Fichier",
    sourceUrl: "Lien",
    urlTitle: "Convertir depuis un lien",
    urlText:
      "Collez l'adresse d'une vidéo ou d'un morceau. Audiova récupère le média, le convertit, puis lance le téléchargement du fichier.",
    urlPlaceholder: "https://…",
    urlSubmit: "Convertir et télécharger",
    urlLoading: "Récupération du média…",
    urlConverting: "Conversion et préparation du téléchargement…",
    urlHint:
      "Fonctionne avec de nombreuses pages prises en charge par yt-dlp (YouTube, Vimeo, liens audio directs…). Utilisez uniquement des contenus que vous avez le droit de télécharger. Limite : 100 Mo.",
    urlLegal: "Vous devez disposer des droits nécessaires sur le contenu importé.",
  },
  settings: {
    format: "Format de sortie",
    principal: "Principal",
    bitrate: "Débit",
    sampleRate: "Fréquence",
    auto: "Auto",
    metadata: "Conserver les métadonnées",
    metadataHint: "Recopie les balises que le moteur sait transférer. Les pochettes ne sont pas garanties.",
    identity: "Conserver le titre et l'artiste",
    identityHint: "Écrit seulement ces deux champs, lus dans le fichier.",
    filename: "Nom du fichier de sortie",
    filenameHint: "Sans extension. Le format choisi est ajouté automatiquement.",
  },
  facts: {
    duration: "Durée",
    sampleRate: "Fréquence",
    bitrate: "Débit",
    size: "Taille",
    format: "Format",
  },
  status: {
    analyzing: "Analyse…",
    ready: "Prêt",
    queued: "En attente",
    converting: "Conversion",
    finalizing: "Finalisation",
    done: "Terminé",
    error: "Erreur",
    cancelled: "Annulée",
    progress: "Avancement",
  },
  errors: {
    unsupported: "Ce format n'est pas pris en charge.",
    damaged: "Le fichier semble endommagé.",
    memory: "La mémoire disponible est insuffisante pour traiter ce fichier.",
    failed: "La conversion a échoué. Réessayez avec un autre fichier.",
    "too-large": "La taille du fichier dépasse la limite autorisée.",
    empty: "Le fichier est vide.",
    "no-audio": "Aucune piste audio exploitable n'a été trouvée.",
    engine: "Le moteur audio n'a pas pu être chargé. Rechargez la page, puis réessayez.",
    "too-many": "Cinq fichiers maximum. Les fichiers supplémentaires ont été ignorés.",
    timeout: "La conversion a dépassé le temps imparti. Essayez un fichier plus court.",
    "url-invalid": "Ce lien n'est pas valide.",
    "url-blocked": "Cette adresse n'est pas autorisée.",
    "url-fetch": "Le média n'a pas pu être récupéré. Vérifiez le lien, puis réessayez.",
    "url-unavailable": "Ce contenu n'est pas disponible ou n'est pas pris en charge.",
    "url-busy": "Un autre import depuis un lien est déjà en cours. Réessayez dans un instant.",
    "url-rate": "Trop d'imports depuis un lien. Attendez une minute, puis réessayez.",
  },
  player: {
    play: "Lecture",
    pause: "Pause",
    position: "Position de lecture",
    volume: "Volume",
    mute: "Couper le son",
    unmute: "Rétablir le son",
  },
  history: {
    title: "Conversions récentes",
    intro:
      "Ces lignes restent dans ce navigateur : nom du fichier, date, format et débit. L'audio n'est pas conservé et ne peut pas être téléchargé à nouveau depuis cet historique.",
    empty: "Aucune conversion enregistrée sur cet appareil.",
    clear: "Effacer l'historique",
    sampleAuto: "Fréquence d'origine",
  },
  features: {
    title: "Un outil d'écoute, pas un formulaire",
    intro:
      "Audiova convertit localement, avec les réglages utiles et rien d'autre. Les promesses suivent ce que le moteur fait vraiment.",
    items: [
      {
        title: "Conversion simplifiée",
        body: "Transformez vos fichiers audio en quelques clics, sans procédure compliquée.",
      },
      {
        title: "Qualité personnalisable",
        body: "Choisissez le débit audio adapté à vos besoins.",
      },
      {
        title: "Confidentialité",
        body: "Les fichiers choisis sur l'appareil restent locaux pour la conversion. Un lien est seulement récupéré temporairement par le serveur, puis converti dans le navigateur.",
      },
      {
        title: "Tous vos appareils",
        body: "Profitez d'une interface adaptée à votre ordinateur, votre tablette ou votre smartphone.",
      },
    ],
  },
  formats: {
    title: "Formats réellement pris en charge",
    intro:
      "Le convertisseur MP3 accepte les conteneurs que FFmpeg.wasm sait lire dans cette version. Une extension reconnue ne suffit pas si le fichier est incomplet, chiffré ou sans piste audio.",
    output: "Sortie",
    input: "Entrée",
    video: "Vidéo",
    videoNote: "L'image est ignorée. Seule la piste audio est convertie.",
    bitrateYes: "Débit réglable",
    bitrateNo: "Débit fixe par le format",
  },
  how: {
    title: "Convertir un fichier audio n'a jamais été aussi simple.",
    steps: [
      {
        title: "Importez votre fichier",
        body: "Depuis l'appareil, ou collez un lien vidéo/audio. Le glisser-déposer fonctionne sur les grands écrans.",
      },
      {
        title: "Choisissez vos paramètres",
        body: "MP3 est sélectionné. Le débit par défaut est 192 kb/s. La fréquence peut suivre la source.",
      },
      {
        title: "Téléchargez votre MP3",
        body: "Le fichier proposé au téléchargement est le résultat de la conversion, pas une copie renommée.",
      },
    ],
  },
  faq: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Comment convertir un fichier audio en MP3 ?",
        answer: [
          "Importez un fichier ou collez un lien, laissez MP3 sélectionné, réglez le débit si vous le souhaitez, puis lancez la conversion. Quand le traitement est terminé, téléchargez le MP3. L'encodage se fait dans le navigateur.",
        ],
      },
      {
        question: "Puis-je importer une vidéo ou une musique depuis un lien ?",
        answer: [
          "Oui. Dans le convertisseur, ouvrez l'onglet Lien, collez l'adresse, puis cliquez sur Convertir et télécharger. Audiova récupère le média, le convertit, puis lance le téléchargement du fichier.",
          "Tous les sites ne fonctionnent pas. Les contenus privés, protégés ou trop lourds (au-delà de 100 Mo) sont refusés. N'importez que des contenus pour lesquels vous avez les droits nécessaires.",
        ],
      },
      {
        question: "Le convertisseur est-il gratuit ?",
        answer: [
          "Oui. Cette version est gratuite, sans compte et sans quota de conversions. Chaque fichier doit rester sous 100 Mo, et la file accepte 5 fichiers au maximum.",
        ],
      },
      {
        question: "Quelle est la différence entre 128, 192 et 320 kb/s ?",
        answer: [
          "Le débit est la quantité de données conservée chaque seconde. 128 kb/s donne un fichier plus léger, suffisant pour la voix. 192 kb/s est le réglage par défaut, un bon équilibre pour la musique. 320 kb/s est le débit MP3 le plus élevé proposé ici : le fichier est plus lourd et reste plus proche d'une source déjà détaillée.",
          "Monter le débit n'améliore pas un original déjà compressé ou abîmé.",
        ],
      },
      {
        question: "Puis-je convertir un fichier WAV en MP3 ?",
        answer: [
          "Oui, si le WAV est lisible. Le WAV est en général non compressé : le MP3 obtenu est plus petit, avec une perte liée au débit choisi.",
        ],
      },
      {
        question: "Puis-je utiliser le site sur mon téléphone ?",
        answer: [
          "Oui. L'interface est prévue pour le téléphone, la tablette et l'ordinateur. Sur un téléphone, un fichier long peut échouer faute de mémoire, même sous la limite de 100 Mo. Dans ce cas, traitez un fichier à la fois.",
        ],
      },
      {
        question: "Mes fichiers sont-ils envoyés sur un serveur ?",
        answer: [
          "Pour un fichier choisi sur votre appareil : non. FFmpeg tourne dans votre navigateur. Le fichier n'est pas téléversé pour être converti, et n'est pas conservé. Le programme de conversion, environ 32 Mo, est en revanche chargé depuis ce site la première fois.",
          "Pour un import depuis un lien : le serveur d'Audiova télécharge temporairement le média afin de le vous livrer, puis le supprime. La conversion elle-même reste locale.",
          "L'historique local mémorise le nom, la date, le format et le débit. Pas l'audio.",
        ],
      },
      {
        question: "Quelle est la taille maximale d'un fichier ?",
        answer: [
          "100 Mo par fichier. Au-delà, le fichier est refusé avant la conversion. Cinq fichiers peuvent être préparés, puis ils sont convertis l'un après l'autre.",
        ],
      },
      {
        question: "Pourquoi la conversion peut-elle prendre du temps ?",
        answer: [
          "Le moteur se charge une fois. Ensuite, l'encodage utilise le processeur de l'appareil, sur un seul fil d'exécution, afin de rester compatible avec les téléphones. Un fichier long ou un appareil modeste allonge l'attente.",
          "Le pourcentage affiché vient du moteur lorsqu'il le fournit. Sinon, l'indicateur reste indéterminé : aucun pourcentage n'est inventé.",
        ],
      },
      {
        question: "Puis-je convertir plusieurs fichiers à la fois ?",
        answer: [
          "Oui, jusqu'à 5. Les mêmes réglages s'appliquent à la file. Un seul fichier est encodé à la fois, pour limiter la mémoire utilisée.",
        ],
      },
      {
        question: "Pourquoi certains fichiers ne sont-ils pas compatibles ?",
        answer: [
          "Seuls les formats listés dans la section Formats sont acceptés. Un fichier protégé, tronqué ou dont le contenu ne correspond pas à l'extension est refusé, avec un message en français plutôt qu'une erreur technique.",
        ],
      },
      {
        question: "Puis-je convertir une vidéo en fichier audio ?",
        answer: [
          "Oui pour MP4, MOV, WebM et MKV lorsqu'une piste audio est présente. L'image est écartée. Sans piste audio, la conversion s'arrête et l'indique.",
        ],
      },
      {
        question: "Est-il possible de conserver les métadonnées ?",
        answer: [
          "Oui. L'option est activée par défaut. Le titre, l'artiste et les autres balises que FFmpeg sait recopier sont conservés quand le format de sortie le permet. Ce n'est pas garanti pour chaque balise, ni pour la pochette.",
          "Si vous désactivez les métadonnées et que le titre ou l'artiste a été lu, une option permet de ne garder que ces deux champs.",
        ],
      },
    ],
  },
  footer: {
    description:
      "Convertisseur audio dans le navigateur. Your audio. Your format. Your freedom.",
    product: "Produit",
    information: "Informations",
    privacy: "Confidentialité",
    legal: "Mentions légales",
    contact: "Contact",
    rights: "© {year} Audiova. Outil indépendant.",
  },
  privacy: {
    metaTitle: "Confidentialité",
    metaDescription:
      "Audiova convertit les fichiers audio dans votre navigateur. Découvrez quelles informations restent sur votre appareil.",
    title: "Confidentialité",
    intro:
      "Cette page décrit le fonctionnement actuel du site. Elle ne promet pas une protection que l'architecture ne met pas en place.",
    sections: [
      {
        title: "Conversion locale",
        paragraphs: [
          "Quand vous choisissez un fichier sur votre appareil, il est lu par votre navigateur et traité par FFmpeg.wasm sur votre appareil. Il n'est pas envoyé à un serveur de conversion, et Audiova n'en conserve pas de copie.",
          "Le programme de conversion, un fichier WebAssembly d'environ 32 Mo, est téléchargé depuis ce même site lors de la première conversion. Ce téléchargement concerne le moteur, pas votre audio.",
        ],
      },
      {
        title: "Import depuis un lien",
        paragraphs: [
          "Si vous collez une URL, le serveur de cette application récupère temporairement le média avec yt-dlp, le renvoie à votre navigateur, puis efface le fichier temporaire. Cette étape est nécessaire parce que la plupart des sites bloquent un téléchargement direct depuis le navigateur.",
          "La conversion qui suit reste locale. N'utilisez cette fonction que pour des contenus que vous avez le droit de télécharger.",
        ],
      },
      {
        title: "Historique dans le navigateur",
        paragraphs: [
          "Si une conversion aboutit, le navigateur peut enregistrer localement le nom du fichier produit, la date, le format, le débit et la fréquence choisie. Ces données restent sur l'appareil. Vous pouvez les effacer depuis la section d'historique.",
          "L'audio n'est pas stocké. L'historique ne permet pas de télécharger à nouveau un fichier.",
        ],
      },
      {
        title: "Mesure d'audience et consentement",
        paragraphs: [
          "Avec votre accord (« Accepter les stats » ou « Tout accepter »), Audiova enregistre des événements anonymisés : pages vues, sessions, conversions réussies ou échouées, format de sortie, langue et navigateur approximatif. Aucun fichier audio n'est envoyé à ces fins.",
          "Sans consentement, aucune mesure d'audience n'est envoyée. La préférence de langue et le choix de confidentialité restent stockés localement sur votre appareil. Il n'y a pas de compte utilisateur ni de base de données des fichiers convertis.",
        ],
      },
      {
        title: "Limites",
        paragraphs: [
          "Votre navigateur, votre système et votre dossier de téléchargements conservent le fichier que vous enregistrez. Cela ne dépend pas d'Audiova.",
          "La mémoire de l'appareil limite la taille praticable. Un fichier est refusé au-delà de 100 Mo. Un téléphone peut échouer plus tôt : le message affiché alors parle de mémoire, sans détail technique brut.",
        ],
      },
      {
        title: "Publicité",
        paragraphs: [
          "Les emplacements publicitaires sont désactivés par défaut. S'ils sont activés depuis la console d'administration, ils ne s'affichent que si vous avez choisi « Tout accepter », et ils ne doivent pas recouvrir les boutons de conversion.",
          "Si une régie tierce est branchée plus tard, ses cookies éventuels seront décrits ici avant activation.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Mentions légales",
    metaDescription: "Informations sur l'éditeur, l'hébergement et les logiciels utilisés par Audiova.",
    title: "Mentions légales",
    intro:
      "Audiova est un outil indépendant. Aucune société, aucune adresse et aucun numéro d'immatriculation ne sont présentés ici, parce qu'ils n'existent pas pour ce projet.",
    sections: [
      {
        title: "Éditeur",
        paragraphs: [
          "Le site est publié comme un outil personnel et indépendant. Il n'y a pas de dénomination sociale, de siège ou de directeur de la publication à déclarer dans cette version.",
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          "L'hébergement dépend de l'endroit où le site est déployé. L'application elle-même n'impose pas d'hébergeur. La conversion audio n'utilise pas cet hébergement : elle s'exécute dans le navigateur du visiteur.",
        ],
      },
      {
        title: "Fichiers et droits",
        paragraphs: [
          "Vous devez avoir le droit de convertir ou de télécharger les fichiers et liens que vous importez. Audiova ne vérifie pas la titularité des œuvres et ne fournit aucune autorisation de reproduction.",
        ],
      },
      {
        title: "Logiciels tiers",
        paragraphs: [
          "La conversion repose sur FFmpeg, compilé pour WebAssembly et distribué via le paquet @ffmpeg/core. Cette compilation est soumise à la licence GPL, notamment parce qu'elle inclut libmp3lame pour l'encodage MP3. FFmpeg est une marque du projet FFmpeg.",
          "L'import depuis un lien utilise yt-dlp via le paquet youtube-dl-exec. Les autres bibliothèques d'interface sont indiquées dans les dépendances du projet.",
        ],
      },
      {
        title: "Responsabilité",
        paragraphs: [
          "L'outil est fourni en l'état. Une conversion peut échouer, produire un fichier plus lourd, ou ne pas reprendre toutes les métadonnées. Vérifiez le résultat avant de supprimer l'original.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription: "Envoyez un ticket à l’équipe Audiova et suivez la conversation.",
    title: "Contact",
    intro:
      "Ouvrez un ticket ci-dessous : le message arrive dans la console d’administration. Vous pouvez revenir sur cette page pour continuer la conversation.",
    helpTitle: "Avant d’ouvrir un ticket",
    help: [
      "Un format refusé figure peut-être hors de la liste prise en charge.",
      "Un fichier au-delà de 100 Mo est arrêté avant la conversion.",
      "Un téléphone peut manquer de mémoire même sous cette limite.",
      "Les réponses détaillées sont dans la FAQ.",
    ],
    faq: "Lire la FAQ",
    mail: "Écrire à {email}",
    mailMissing:
      "Aucune adresse e-mail publique n’est configurée. Utilisez le ticket ci-dessus.",
    ticket: {
      title: "Ticket / chat",
      intro: "Décrivez votre question. La conversation reste liée à cet appareil via un jeton local.",
      name: "Nom",
      email: "E-mail",
      subject: "Sujet",
      message: "Message",
      send: "Ouvrir le ticket",
      sending: "Envoi…",
      reply: "Envoyer",
      replyPlaceholder: "Écrire une réponse…",
      loading: "Chargement du ticket…",
      ref: "Réf.",
      statusLabel: "Statut",
      status: {
        open: "ouvert",
        answered: "répondu",
        closed: "fermé",
      },
      you: "Vous",
      support: "Support",
      newTicket: "Nouveau ticket",
      closed: "Ce ticket est fermé. Ouvrez-en un nouveau si besoin.",
      rate: "Trop de messages. Réessayez plus tard.",
      invalid: "Vérifiez les champs (nom, e-mail, sujet, message).",
      network: "Envoi impossible pour le moment.",
    },
  },
  notFound: {
    title: "Cette page n'existe pas",
    body: "Le lien ne correspond à aucune page d'Audiova.",
    back: "Retour au convertisseur",
  },
};

export type Dictionary = typeof fr;
