import type { Dictionary } from "@/i18n/fr";

export const es: Dictionary = {
  meta: {
    title: "Audiova — Convertidor MP3 en línea gratis",
    description:
      "Convierte un archivo de audio a MP3 en tu navegador. WAV, FLAC, M4A, OGG y pistas de vídeo. Gratis, sin instalación y sin enviar el archivo en la conversión local.",
    ogAlt: "Audiova, convertidor de audio a MP3",
  },
  skip: "Ir al contenido",
  nav: {
    label: "Navegación principal",
    converter: "Convertidor",
    features: "Funciones",
    formats: "Formatos",
    faq: "FAQ",
    openFile: "Abrir un archivo",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    discord: "Unirse a Discord",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "Tu audio.",
    titleRest: "En",
    titleAccent: "MP3",
    titleEnd: ". Así de simple.",
    subtitle:
      "Convierte tus archivos de audio a MP3 en unos clics. Gratis, sencillo y sin instalación.",
    primary: "Convertir un archivo",
    secondary: "Ver las funciones",
    points: ["Simple y rápido.", "Calidad de audio ajustable.", "Sin instalación."],
    monitor: "Monitor",
    demo: "Señal de demostración",
    demoHint: "Esta onda se dibuja en pantalla. No reproduce tu archivo.",
  },
  converter: {
    title: "Convertidor de audio",
    dropTitle: "Suelta tu archivo de audio",
    dropText: "Arrastra y suelta tu archivo aquí o explora tu dispositivo.",
    dropFolders: "Se aceptan carpetas: los archivos de audio/vídeo del interior se añaden automáticamente.",
    choose: "Elegir un archivo",
    fileInput: "Selección de archivos de audio",
    addMore: "Añadir archivos",
    limits: "{audio}. Vídeo: {video}. {size} máximo, {count} archivos a la vez.",
    queueTitle: "Archivos a convertir",
    queueSummary: "{count} en cola · {done} listo(s)",
    queueReady: "{count} listo(s) para convertir",
    queueWaiting: "En espera en la cola",
    etaSeconds: "≈ {seconds} s restantes",
    etaMinutes: "≈ {minutes} min restantes",
    remove: "Quitar {name}",
    listenSource: "Escuchar el original",
    listenOutput: "Escuchar el resultado",
    hidePlayer: "Ocultar el reproductor",
    convertOne: "Convertir a {format}",
    convertMany: "Convertir {count} archivos a {format}",
    converting: "Conversión en curso…",
    cancel: "Cancelar",
    another: "Convertir otro archivo",
    download: "Descargar {format}",
    engineDownload: "Cargando el motor de audio… {percent} %",
    engineDownloadUnknown: "Cargando el motor de audio…",
    engineCompile: "Inicializando el motor…",
    engineHint:
      "El programa de conversión, unos 32 MB, se carga desde este sitio en la primera conversión. El archivo de audio no se envía.",
    emptySelection: "Añade un archivo de audio para elegir el bitrate y lanzar la conversión.",
    customNameHint: "El nombre personalizado se aplica cuando hay un solo archivo listo.",
    losslessHint: "WAV y FLAC son sin pérdida: el bitrate no se aplica.",
    metadataIncluded: "El título y el artista leídos en el archivo se incluyen con los metadatos.",
    sizeNote: "Esta observación solo afecta a este archivo y estos ajustes.",
    smaller: "{amount} menos que el archivo original.",
    larger: "{amount} más que el archivo original.",
    sameSize: "Mismo tamaño que el archivo original.",
    playbackUnsupported:
      "La reproducción no está disponible en este navegador para este formato. La descarga sigue siendo posible.",
    cancelHint: "La cancelación interrumpe el trabajo en curso. El motor se reiniciará.",
    sourceFile: "Archivo",
    sourceUrl: "Enlace",
    urlTitle: "Importar desde un enlace",
    urlText:
      "Pega la dirección de un vídeo o una pista. Audiova recupera el medio; luego eliges la calidad antes de convertir y descargar.",
    urlPlaceholder: "https://…",
    urlSubmit: "Importar el medio",
    urlLoading: "Recuperando el medio…",
    urlConverting: "Conversión…",
    urlLegal:
      "Importante: usted es el único responsable de los contenidos que importa o descarga. Audiova no es responsable en ningún caso si recupera música o medios que no ha comprado o para los que no tiene derechos. Use solo archivos de su propiedad o que esté autorizado a convertir.",
  },
  settings: {
    format: "Formato de salida",
    principal: "Principal",
    bitrate: "Bitrate",
    sampleRate: "Frecuencia",
    auto: "Auto",
    quality: "Calidad de salida",
    qualityHint:
      "Elige antes de empezar. 320 kb/s es el máximo MP3; FLAC y WAV son sin pérdida (mejor fidelidad, archivo más pesado).",
    presetLight: "Ligero",
    presetStandard: "Estándar",
    presetBest: "Mejor MP3",
    presetLossless: "Sin pérdida",
    bestBadge: "Máx",
    metadata: "Conservar metadatos",
    metadataHint: "Copia las etiquetas que el motor sabe transferir. Las carátulas no están garantizadas.",
    identity: "Conservar título y artista",
    identityHint: "Escribe solo estos dos campos, leídos en el archivo.",
    filename: "Nombre del archivo de salida",
    filenameHint: "Sin extensión. El formato elegido se añade automáticamente.",
  },
  facts: {
    duration: "Duración",
    sampleRate: "Frecuencia",
    bitrate: "Bitrate",
    size: "Tamaño",
    format: "Formato",
  },
  status: {
    analyzing: "Analizando…",
    ready: "Listo",
    queued: "En espera",
    converting: "Conversión",
    finalizing: "Finalizando",
    done: "Terminado",
    error: "Error",
    cancelled: "Cancelada",
    progress: "Progreso",
  },
  errors: {
    unsupported: "Este formato no es compatible.",
    damaged: "El archivo parece dañado.",
    memory: "No hay memoria suficiente para procesar este archivo.",
    failed: "La conversión ha fallado. Prueba con otro archivo.",
    "too-large": "El tamaño del archivo supera el límite permitido.",
    empty: "El archivo está vacío.",
    "no-audio": "No se ha encontrado ninguna pista de audio usable.",
    engine: "No se ha podido cargar el motor de audio. Recarga la página e inténtalo de nuevo.",
    "too-many": "Límite de archivos alcanzado. Los archivos adicionales se han ignorado.",
    timeout: "La conversión ha superado el tiempo límite. Prueba un archivo más corto.",
    "url-invalid": "Este enlace no es válido.",
    "url-blocked": "Esta dirección no está permitida.",
    "url-fetch": "No se ha podido recuperar el medio. Comprueba el enlace e inténtalo de nuevo.",
    "url-unavailable": "Este contenido no está disponible o no es compatible.",
    "url-busy": "Ya hay otra importación desde un enlace en curso. Vuelve a intentarlo en un momento.",
    "url-rate": "Demasiadas importaciones desde un enlace. Espera un minuto e inténtalo de nuevo.",
  },
  player: {
    play: "Reproducir",
    pause: "Pausa",
    position: "Posición de reproducción",
    volume: "Volumen",
    mute: "Silenciar",
    unmute: "Activar sonido",
  },
  history: {
    title: "Conversiones recientes",
    intro:
      "Nombre, fecha, formato y bitrate permanecen en este navegador. El archivo convertido se puede volver a descargar unos 30 minutos; luego caduca la caché local.",
    empty: "Ninguna conversión guardada en este dispositivo.",
    clear: "Borrar el historial",
    sampleAuto: "Frecuencia original",
    downloadAgain: "Volver a descargar",
    expired: "Archivo caducado: vuelve a convertir para recuperarlo.",
  },
  features: {
    title: "Una herramienta de escucha, no un formulario",
    intro:
      "Audiova convierte en local, con los ajustes útiles y nada más. Las promesas siguen lo que el motor hace de verdad.",
    items: [
      {
        title: "Conversión simplificada",
        body: "Transforma tus archivos de audio en unos clics, sin un proceso complicado.",
      },
      {
        title: "Calidad personalizable",
        body: "Elige el bitrate de audio que se adapte a tus necesidades.",
      },
      {
        title: "Privacidad",
        body: "Los archivos elegidos en el dispositivo se quedan en local para la conversión. Un enlace solo se recupera temporalmente en el servidor y luego se convierte en el navegador.",
      },
      {
        title: "Todos tus dispositivos",
        body: "Disfruta de una interfaz adaptada a tu ordenador, tableta o teléfono.",
      },
    ],
  },
  formats: {
    title: "Formatos realmente compatibles",
    intro:
      "El convertidor MP3 acepta los contenedores que FFmpeg.wasm sabe leer en esta versión. Una extensión conocida no basta si el archivo está incompleto, cifrado o sin pista de audio.",
    output: "Salida",
    input: "Entrada",
    video: "Vídeo",
    videoNote: "La imagen se ignora. Solo se convierte la pista de audio.",
    bitrateYes: "Bitrate ajustable",
    bitrateNo: "Bitrate fijo por el formato",
  },
  how: {
    title: "Convertir un archivo de audio nunca había sido tan simple.",
    steps: [
      {
        title: "Importa tu archivo",
        body: "Desde el dispositivo, o pega un enlace de vídeo/audio. Arrastrar y soltar funciona en pantallas grandes.",
      },
      {
        title: "Elige tus parámetros",
        body: "MP3 está seleccionado. El bitrate por defecto es 192 kb/s. La frecuencia puede seguir la fuente.",
      },
      {
        title: "Descarga tu MP3",
        body: "El archivo ofrecido para descargar es el resultado de la conversión, no una copia renombrada.",
      },
    ],
  },
  faq: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Cómo convertir un archivo de audio a MP3?",
        answer: [
          "Importa un archivo o pega un enlace, deja MP3 seleccionado, ajusta el bitrate si quieres y lanza la conversión. Cuando termine el proceso, descarga el MP3. La codificación se hace en el navegador.",
        ],
      },
      {
        question: "¿Puedo importar un vídeo o una pista desde un enlace?",
        answer: [
          "Sí. En el convertidor, abre la pestaña Enlace, pega la dirección y haz clic en Convertir y descargar. Audiova recupera el medio, lo convierte y lanza la descarga del archivo.",
          "No todos los sitios funcionan. Los contenidos privados, protegidos o demasiado pesados (más de 100 MB) se rechazan. Solo importa contenidos para los que tengas derechos.",
        ],
      },
      {
        question: "¿El convertidor es gratis?",
        answer: [
          "Sí. Esta versión es gratuita, sin cuenta y sin cuota de conversiones. Cada archivo debe quedar bajo 100 MB, y la cola acepta 5 archivos como máximo.",
        ],
      },
      {
        question: "¿Cuál es la diferencia entre 128, 192 y 320 kb/s?",
        answer: [
          "El bitrate es la cantidad de datos que se conserva cada segundo. 128 kb/s da un archivo más ligero, suficiente para la voz. 192 kb/s es el valor por defecto, un buen equilibrio para la música. 320 kb/s es el bitrate MP3 más alto ofrecido aquí: el archivo es más pesado y se acerca más a una fuente detallada.",
          "Subir el bitrate no mejora un original ya comprimido o dañado.",
        ],
      },
      {
        question: "¿Puedo convertir un archivo WAV a MP3?",
        answer: [
          "Sí, si el WAV es legible. El WAV suele no estar comprimido: el MP3 obtenido es más pequeño, con una pérdida ligada al bitrate elegido.",
        ],
      },
      {
        question: "¿Puedo usar el sitio en el teléfono?",
        answer: [
          "Sí. La interfaz está pensada para teléfono, tableta y ordenador. En un teléfono, un archivo largo puede fallar por falta de memoria aunque esté bajo el límite de 100 MB. En ese caso, procesa un archivo cada vez.",
        ],
      },
      {
        question: "¿Se envían mis archivos a un servidor?",
        answer: [
          "Para un archivo elegido en tu dispositivo: no. FFmpeg se ejecuta en tu navegador. El archivo no se sube para convertirse ni se conserva. El programa de conversión, unos 32 MB, sí se carga desde este sitio la primera vez.",
          "Para una importación desde un enlace: el servidor de Audiova descarga temporalmente el medio para entregártelo y luego lo elimina. La conversión en sí sigue siendo local.",
          "El historial local guarda el nombre, la fecha, el formato y el bitrate. No el audio.",
        ],
      },
      {
        question: "¿Cuál es el tamaño máximo de un archivo?",
        answer: [
          "100 MB por archivo. Por encima, el archivo se rechaza antes de la conversión. Se pueden preparar cinco archivos y luego se convierten uno tras otro.",
        ],
      },
      {
        question: "¿Por qué la conversión puede tardar?",
        answer: [
          "El motor se carga una vez. Después, la codificación usa la CPU del dispositivo, en un solo hilo, para seguir siendo compatible con teléfonos. Un archivo largo o un aparato modesto alarga la espera.",
          "El porcentaje mostrado viene del motor cuando lo proporciona. Si no, el indicador permanece indeterminado: no se inventa ningún porcentaje.",
        ],
      },
      {
        question: "¿Puedo convertir varios archivos a la vez?",
        answer: [
          "Sí, hasta 5. Los mismos ajustes se aplican a la cola. Solo se codifica un archivo a la vez, para limitar la memoria usada.",
        ],
      },
      {
        question: "¿Por qué algunos archivos no son compatibles?",
        answer: [
          "Solo se aceptan los formatos listados en la sección Formatos. Un archivo protegido, truncado o cuyo contenido no coincide con la extensión se rechaza, con un mensaje claro en lugar de un error técnico bruto.",
        ],
      },
      {
        question: "¿Puedo convertir un vídeo a un archivo de audio?",
        answer: [
          "Sí para MP4, MOV, WebM y MKV cuando hay una pista de audio. La imagen se descarta. Sin pista de audio, la conversión se detiene y lo indica.",
        ],
      },
      {
        question: "¿Es posible conservar los metadatos?",
        answer: [
          "Sí. La opción está activada por defecto. El título, el artista y otras etiquetas que FFmpeg sabe copiar se conservan cuando el formato de salida lo permite. No está garantizado para cada etiqueta ni para la carátula.",
          "Si desactivas los metadatos y se han leído el título o el artista, una opción permite conservar solo esos dos campos.",
        ],
      },
    ],
  },
  footer: {
    description:
      "Convertidor de audio en el navegador. Your audio. Your format. Your freedom.",
    product: "Producto",
    information: "Información",
    privacy: "Privacidad",
    legal: "Aviso legal",
    contact: "Contacto",
    rights: "© {year} Audiova. Herramienta independiente.",
  },
  privacy: {
    metaTitle: "Privacidad",
    metaDescription:
      "Audiova convierte archivos de audio en tu navegador. Descubre qué información permanece en tu dispositivo.",
    title: "Privacidad",
    intro:
      "Esta página describe el funcionamiento actual del sitio. No promete una protección que la arquitectura no ofrece.",
    sections: [
      {
        title: "Conversión local",
        paragraphs: [
          "Cuando eliges un archivo en tu dispositivo, tu navegador lo lee y FFmpeg.wasm lo procesa en tu aparato. No se envía a un servidor de conversión y Audiova no guarda una copia.",
          "El programa de conversión, un archivo WebAssembly de unos 32 MB, se descarga desde este mismo sitio en la primera conversión. Esa descarga es el motor, no tu audio.",
        ],
      },
      {
        title: "Importación desde un enlace",
        paragraphs: [
          "Si pegas una URL, el servidor de esta aplicación recupera temporalmente el medio con yt-dlp, lo envía a tu navegador y luego borra el archivo temporal. Este paso es necesario porque la mayoría de sitios bloquean una descarga directa desde el navegador.",
          "La conversión que sigue sigue siendo local. Usa esta función solo para contenidos que tengas derecho a descargar.",
        ],
      },
      {
        title: "Historial en el navegador",
        paragraphs: [
          "Si una conversión termina bien, el navegador puede guardar localmente el nombre del archivo producido, la fecha, el formato, el bitrate y la frecuencia elegida. Estos datos permanecen en el dispositivo. Puedes borrarlos desde la sección de historial.",
          "El audio no se almacena. El historial no permite volver a descargar un archivo.",
        ],
      },
      {
        title: "Medición de audiencia y consentimiento",
        paragraphs: [
          "Con tu consentimiento (« Aceptar estadísticas » o « Aceptarlo todo »), Audiova registra eventos anonimizados: páginas vistas, sesiones, conversiones correctas o fallidas, formato de salida, idioma y navegador aproximado. Ningún archivo de audio se envía con este fin.",
          "Sin consentimiento no se envía medición de audiencia. La preferencia de idioma y la elección de privacidad permanecen en tu dispositivo. No hay cuenta de usuario ni base de datos de archivos convertidos.",
        ],
      },
      {
        title: "Límites",
        paragraphs: [
          "Tu navegador, tu sistema y tu carpeta de descargas conservan el archivo que guardas. Eso no depende de Audiova.",
          "La memoria del dispositivo limita el tamaño practicable. Un archivo se rechaza por encima de 100 MB. Un teléfono puede fallar antes: el mensaje habla entonces de memoria, sin un volcado técnico bruto.",
        ],
      },
      {
        title: "Publicidad",
        paragraphs: [
          "Los espacios publicitarios están desactivados por defecto. Si se activan desde la consola de administración, solo se muestran si elegiste « Aceptarlo todo », y no deben cubrir los botones de conversión.",
          "Si más adelante se conecta una red publicitaria de terceros, sus cookies se describirán aquí antes de la activación.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Aviso legal y condiciones",
    metaDescription: "Aviso legal, condiciones de uso y responsabilidad de Audiova.",
    title: "Aviso legal y condiciones",
    intro:
      "Audiova es una herramienta independiente de conversión de audio. Al usar el sitio, aceptas las reglas siguientes, especialmente sobre derechos de autor.",
    sections: [
      {
        title: "Editor",
        paragraphs: [
          "El sitio se publica como una herramienta personal e independiente. No hay razón social, sede ni director de publicación que declarar en esta versión.",
        ],
      },
      {
        title: "Alojamiento",
        paragraphs: [
          "El alojamiento depende de dónde se despliegue el sitio. La conversión local se ejecuta en el navegador del visitante. La importación por enlace puede pasar brevemente por el servidor solo para recuperar el medio.",
        ],
      },
      {
        title: "Condiciones de uso",
        paragraphs: [
          "Audiova ofrece un convertidor técnico. Eres el único responsable de su uso, de los archivos que importas y de las descargas que inicias.",
          "Está prohibido usar Audiova para eludir protecciones, piratear o distribuir obras protegidas sin autorización.",
        ],
      },
      {
        title: "Derechos de autor y contenidos",
        paragraphs: [
          "Debes ser propietario de los archivos o disponer de los derechos / licencias necesarios para convertirlos o descargarlos.",
          "Audiova no es responsable en ningún caso si importas o descargas músicas, vídeos u otros medios que no hayas comprado o para los que no tengas derechos.",
          "Audiova no verifica la titularidad y no concede ninguna autorización de reproducción, comunicación o descarga.",
        ],
      },
      {
        title: "Software de terceros",
        paragraphs: [
          "La conversión se basa en FFmpeg, compilado para WebAssembly y distribuido vía el paquete @ffmpeg/core. Esta compilación está bajo GPL, en particular porque incluye libmp3lame para la codificación MP3. FFmpeg es una marca del proyecto FFmpeg.",
          "La importación por enlace usa yt-dlp a través del paquete youtube-dl-exec. Las demás bibliotecas de interfaz figuran en las dependencias del proyecto.",
        ],
      },
      {
        title: "Responsabilidad",
        paragraphs: [
          "La herramienta se ofrece tal cual, sin garantía de disponibilidad, integridad del resultado o conservación de metadatos.",
          "Una conversión puede fallar, producir un archivo más pesado o interrumpirse. Comprueba el resultado antes de borrar el original.",
          "En los límites de la ley, Audiova y su editor declinan toda responsabilidad por daños ligados a un uso ilícito de contenidos, a una pérdida de archivos o a un fallo del servicio.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription: "Envía un ticket al equipo de Audiova y sigue la conversación.",
    title: "Contacto",
    intro:
      "Abre un ticket abajo: el mensaje llega a la consola de administración. Puedes volver a esta página para continuar la conversación.",
    helpTitle: "Antes de abrir un ticket",
    help: [
      "Un formato rechazado puede estar fuera de la lista compatible.",
      "Un archivo de más de 100 MB se detiene antes de la conversión.",
      "Un teléfono puede quedarse sin memoria incluso bajo ese límite.",
      "Las respuestas detalladas están en la FAQ.",
    ],
    faq: "Leer la FAQ",
    mail: "Escribir a {email}",
    mailMissing: "No hay correo público configurado. Usa el ticket de arriba.",
    ticket: {
      title: "Ticket / chat",
      intro: "Describe tu pregunta. La conversación queda ligada a este dispositivo con un token local.",
      name: "Nombre",
      email: "Correo",
      subject: "Asunto",
      message: "Mensaje",
      send: "Abrir ticket",
      sending: "Enviando…",
      reply: "Enviar",
      replyPlaceholder: "Escribe una respuesta…",
      loading: "Cargando ticket…",
      ref: "Ref.",
      statusLabel: "Estado",
      status: {
        open: "abierto",
        answered: "respondido",
        closed: "cerrado",
      },
      you: "Tú",
      support: "Soporte",
      newTicket: "Nuevo ticket",
      closed: "Este ticket está cerrado. Abre uno nuevo si lo necesitas.",
      rate: "Demasiados mensajes. Inténtalo más tarde.",
      invalid: "Revisa los campos (nombre, correo, asunto, mensaje).",
      network: "No se puede enviar ahora.",
    },
  },
  notFound: {
    title: "Esta página no existe",
    body: "El enlace no corresponde a ninguna página de Audiova.",
    back: "Volver al convertidor",
  },
};
