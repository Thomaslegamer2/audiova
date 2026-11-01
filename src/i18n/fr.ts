export const fr = {
  meta: {
    title: "Audiova — Convertisseur MP3 en ligne gratuit",
    description:
      "Convertisseur MP3 gratuit : WAV, FLAC, M4A, OGG, AAC ou vidéo vers MP3 dans le navigateur. Sans compte. Conversion locale FFmpeg.wasm ; import par lien via le serveur.",
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
    slogan: "Convertissez en MP3 en 3 clics, sans compte ni téléversement",
    titleLead: "Votre audio",
    titleRest: "en",
    titleAccent: "MP3",
    titleEnd: ".",
    subtitle:
      "Conversion locale dans le navigateur. Vos fichiers restent sur votre appareil — sauf import par lien, qui passe par le serveur.",
    primary: "Convertir un fichier",
    secondary: "Découvrir les fonctionnalités",
    points: ["Sans compte.", "Conversion locale (FFmpeg.wasm).", "Confidentialité pour vos fichiers."],
    monitor: "Moniteur",
    demo: "Signal de démonstration",
    demoHint: "Cette onde est dessinée à l'écran. Elle ne lit pas votre fichier.",
  },
  converter: {
    title: "Convertisseur audio",
    dropTitle: "Déposez votre fichier audio",
    dropText: "Glissez-déposez votre fichier ici ou parcourez votre appareil.",
    dropFolders: "Les dossiers sont acceptés : les fichiers audio/vidéo à l’intérieur sont ajoutés automatiquement.",
    choose: "Choisir un fichier",
    fileInput: "Sélection des fichiers audio",
    addMore: "Ajouter des fichiers",
    limits: "{audio}. Vidéo : {video}. {size} maximum, {count} fichiers à la fois.",
    queueTitle: "Fichiers à convertir",
    queueSummary: "{count} dans la file · {done} terminé(s)",
    queueReady: "{count} prêt(s) à convertir",
    queueWaiting: "En attente dans la file",
    etaSeconds: "≈ {seconds} s restantes",
    etaMinutes: "≈ {minutes} min restantes",
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
    urlTitle: "Importer depuis un lien",
    urlText:
      "Collez l'adresse d'une vidéo ou d'un morceau. Le serveur Audiova télécharge temporairement le média, puis vous choisissez la qualité et la conversion se fait dans votre navigateur avant le téléchargement.",
    urlServerNote:
      "L'URL est envoyée au serveur Audiova, qui télécharge temporairement le média. La conversion se fait ensuite localement dans votre navigateur. Ce n'est pas un mode « sans envoi ».",
    urlRightsConfirm: "Je confirme avoir les droits sur ce contenu",
    urlPlaceholder: "https://…",
    urlSubmit: "Importer le média",
    urlLoading: "Récupération du média…",
    urlConverting: "Conversion en cours…",
    urlLegal:
      "Important : vous êtes seul responsable des contenus que vous importez ou téléchargez. Audiova n’est en aucun cas responsable si vous récupérez des musiques ou médias que vous n’avez pas achetés ou pour lesquels vous n’avez pas les droits. Utilisez uniquement des fichiers dont vous êtes propriétaire ou que vous êtes autorisé à convertir.",
  },
  settings: {
    format: "Format de sortie",
    principal: "Principal",
    bitrate: "Débit",
    sampleRate: "Fréquence",
    auto: "Auto",
    quality: "Qualité de sortie",
    qualityHint:
      "Choisissez avant de lancer. 320 kb/s est le maximum MP3 ; FLAC et WAV sont sans perte (meilleure fidélité, fichier plus lourd).",
    presetLight: "Podcast 128 kb/s",
    presetStandard: "Équilibré 192 kb/s",
    presetBest: "Qualité maximale 320 kb/s",
    presetLossless: "Sans perte",
    bestBadge: "Max",
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
    damaged: "Le fichier semble endommagé, corrompu ou illisible.",
    memory: "La mémoire disponible est insuffisante pour traiter ce fichier.",
    failed: "La conversion a échoué. Réessayez avec un autre fichier.",
    "too-large": "La taille du fichier dépasse la limite autorisée.",
    empty: "Le fichier est vide.",
    "no-audio":
      "Aucune piste audio exploitable n'a été trouvée (fichier protégé ou sans piste audio).",
    engine: "Le moteur audio n'a pas pu être chargé. Rechargez la page, puis réessayez.",
    "too-many": "Limite de fichiers atteinte. Les fichiers supplémentaires ont été ignorés.",
    timeout: "La conversion a dépassé le temps imparti. Essayez un fichier plus court.",
    "url-invalid": "Ce lien n'est pas valide.",
    "url-blocked":
      "Cette adresse n'est pas autorisée. Les plateformes de streaming ou de vidéo listées sont bloquées, et la confirmation de droits est obligatoire.",
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
      "Nom, date, format et débit restent dans ce navigateur. Le fichier converti peut être re-téléchargé pendant environ 30 minutes, puis le cache local expire.",
    empty: "Aucune conversion enregistrée sur cet appareil.",
    clear: "Effacer l'historique",
    sampleAuto: "Fréquence d'origine",
    downloadAgain: "Re-télécharger",
    expired: "Fichier expiré — relancez une conversion pour le récupérer.",
  },
  features: {
    title: "Convertissez en MP3 en 3 clics",
    intro:
      "Audiova convertit localement les fichiers de votre appareil, avec les réglages utiles et rien d'autre. L'import par lien passe d'abord par le serveur, puis la conversion reste dans le navigateur.",
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
        body: "MP3 est sélectionné. Le débit par défaut est 320 kb/s (meilleure qualité MP3). La fréquence peut suivre la source.",
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
          "Oui. Dans le convertisseur, ouvrez l'onglet Lien, confirmez que vous avez les droits sur le contenu, puis collez l'adresse. L'URL est envoyée au serveur Audiova, qui télécharge temporairement le média : ce n'est pas un mode « sans envoi ». La conversion se fait ensuite localement dans votre navigateur.",
          "Les plateformes de streaming ou de vidéo dont les conditions interdisent le téléchargement sont bloquées. Les contenus privés, protégés ou trop lourds (au-delà de 100 Mo) sont refusés.",
        ],
      },
      {
        question: "Le convertisseur est-il gratuit ?",
        answer: [
          "Oui. Cette version est gratuite, sans compte et sans quota de conversions. Chaque fichier doit rester sous 100 Mo, et la file accepte 20 fichiers au maximum.",
        ],
      },
      {
        question: "Quelle est la différence entre 128, 192 et 320 kb/s ?",
        answer: [
          "Le débit est la quantité de données conservée chaque seconde. 128 kb/s donne un fichier plus léger, suffisant pour la voix. 192 kb/s est un bon équilibre taille / qualité. 320 kb/s est le débit MP3 par défaut et le plus élevé ici. Pour la meilleure fidélité possible, choisissez FLAC ou WAV (sans perte).",
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
          "100 Mo par fichier. Au-delà, le fichier est refusé avant la conversion. Vingt fichiers peuvent être préparés, puis ils sont convertis l'un après l'autre.",
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
          "Oui, jusqu'à 20. Les mêmes réglages s'appliquent à la file. Un seul fichier est encodé à la fois, pour limiter la mémoire utilisée.",
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
    description: "Convertisseur audio dans le navigateur. Conversion locale, sans compte.",
    donate: "Offrir un café",
    donateHint: "Soutenir Audiova (version sans pub via don)",
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
          "Contrairement au mode fichier, l'import par lien n'est pas « sans envoi » : l'URL est transmise au serveur Audiova, qui télécharge temporairement le média (yt-dlp), le renvoie à votre navigateur, puis efface le fichier temporaire. Cette étape est nécessaire parce que la plupart des sites bloquent un téléchargement direct depuis le navigateur.",
          "La conversion qui suit reste locale. Les plateformes de streaming ou de vidéo dont les conditions interdisent le téléchargement sont bloquées. N'utilisez cette fonction que pour des contenus que vous avez le droit de télécharger, après avoir coché la confirmation de droits.",
        ],
      },
      {
        title: "Historique dans le navigateur",
        paragraphs: [
          "Si une conversion aboutit, le navigateur peut enregistrer localement le nom du fichier produit, la date, le format, le débit et la fréquence choisie. Ces données restent sur l'appareil. Vous pouvez les effacer depuis la section d'historique.",
          "L'audio n'est pas stocké de façon permanente. Un re-téléchargement reste possible environ 30 minutes via le cache local du navigateur.",
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
    metaTitle: "Mentions légales & conditions",
    metaDescription: "Mentions légales, conditions d’utilisation et responsabilité liées à Audiova.",
    title: "Mentions légales & conditions",
    intro:
      "Audiova est un outil indépendant de conversion audio. En utilisant le site, vous acceptez les règles ci-dessous, notamment sur les droits d’auteur.",
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
          "L'hébergement dépend de l'endroit où le site est déployé. L'application elle-même n'impose pas d'hébergeur. La conversion locale s'exécute dans le navigateur du visiteur. L’import depuis un lien peut transiter temporairement par le serveur uniquement pour récupérer le média.",
        ],
      },
      {
        title: "Conditions d’utilisation",
        paragraphs: [
          "Audiova fournit un convertisseur technique. Vous êtes seul responsable de l’usage que vous en faites, des fichiers que vous importez et des téléchargements que vous lancez.",
          "Il est interdit d’utiliser Audiova pour contourner des mesures de protection, pour pirater, ou pour distribuer des œuvres protégées sans autorisation.",
        ],
      },
      {
        title: "Droits d’auteur et contenus",
        paragraphs: [
          "Vous devez être propriétaire des fichiers, ou disposer des droits / licences nécessaires pour les convertir ou les télécharger.",
          "Audiova n’est en aucun cas responsable si vous importez ou téléchargez des musiques, vidéos ou autres médias que vous n’avez pas achetés, ou pour lesquels vous n’avez pas les droits.",
          "Audiova ne vérifie pas la titularité des œuvres et ne fournit aucune autorisation de reproduction, de communication au public ou de téléchargement.",
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
          "L'outil est fourni en l'état, sans garantie de disponibilité, d’intégrité du résultat ou de conservation des métadonnées.",
          "Une conversion peut échouer, produire un fichier plus lourd, ou être interrompue. Vérifiez le résultat avant de supprimer l'original.",
          "Dans les limites autorisées par la loi, Audiova et son éditeur déclinent toute responsabilité pour les dommages liés à un usage illicite des contenus, à une perte de fichiers, ou à un dysfonctionnement du service.",
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
