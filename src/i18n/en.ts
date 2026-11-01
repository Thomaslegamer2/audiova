import type { Dictionary } from "@/i18n/fr";

export const en: Dictionary = {
  meta: {
    title: "Audiova — Free online MP3 converter",
    description:
      "Convert WAV, FLAC, M4A, OGG, or a video track to MP3 in your browser. Free, no account. Local files without upload; link import goes through the server.",
    ogAlt: "Audiova, audio to MP3 converter",
  },
  skip: "Skip to content",
  nav: {
    label: "Main navigation",
    converter: "Converter",
    features: "Features",
    formats: "Formats",
    faq: "FAQ",
    openFile: "Open a file",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    discord: "Join Discord",
  },
  hero: {
    slogan: "Convert to MP3 in 3 clicks — no account, no upload for local files",
    titleLead: "Your audio",
    titleRest: "in",
    titleAccent: "MP3",
    titleEnd: ".",
    subtitle:
      "Local conversion in your browser. Your files stay on your device — except link import, which goes through the server.",
    primary: "Convert a file",
    secondary: "Explore features",
    points: ["No account.", "Local conversion (FFmpeg.wasm).", "Privacy for your files."],
    monitor: "Monitor",
    demo: "Demo signal",
    demoHint: "This waveform is drawn on screen. It does not play your file.",
  },
  converter: {
    title: "Audio converter",
    dropTitle: "Drop your audio file",
    dropText: "Drag and drop your file here or browse your device.",
    dropFolders: "Folders are accepted: audio/video files inside are added automatically.",
    choose: "Choose a file",
    fileInput: "Audio file selection",
    addMore: "Add files",
    limits: "{audio}. Video: {video}. {size} max, {count} files at a time.",
    queueTitle: "Files to convert",
    queueSummary: "{count} in queue · {done} done",
    queueReady: "{count} ready to convert",
    queueWaiting: "Waiting in queue",
    etaSeconds: "≈ {seconds} s left",
    etaMinutes: "≈ {minutes} min left",
    remove: "Remove {name}",
    listenSource: "Listen to original",
    listenOutput: "Listen to result",
    hidePlayer: "Hide player",
    convertOne: "Convert to {format}",
    convertMany: "Convert {count} files to {format}",
    converting: "Converting…",
    cancel: "Cancel",
    another: "Convert another file",
    download: "Download {format}",
    engineDownload: "Loading audio engine… {percent} %",
    engineDownloadUnknown: "Loading audio engine…",
    engineCompile: "Initializing engine…",
    engineHint:
      "The conversion program, about 32 MB, is loaded from this site on the first conversion. Your audio file is not uploaded.",
    emptySelection: "Add an audio file to choose the bitrate and start conversion.",
    customNameHint: "The custom name applies when a single file is ready.",
    losslessHint: "WAV and FLAC are lossless: bitrate does not apply.",
    metadataIncluded: "Title and artist read from the file are included with metadata.",
    sizeNote: "This note applies only to this file and these settings.",
    smaller: "{amount} smaller than the original file.",
    larger: "{amount} larger than the original file.",
    sameSize: "Same size as the original file.",
    playbackUnsupported:
      "Playback is not available in this browser for this format. Download still works.",
    cancelHint: "Canceling stops the current job. The engine will be reset.",
    sourceFile: "File",
    sourceUrl: "Link",
    urlTitle: "Import from a link",
    urlText:
      "Paste the address of a video or track. Audiova's server temporarily downloads the media, then you choose quality and conversion runs in your browser before download.",
    urlServerNote:
      "The URL is sent to Audiova's server, which temporarily downloads the media. Conversion then runs locally in your browser. This is not a no-upload mode.",
    urlRightsConfirm: "I confirm I have the rights to this content",
    urlPlaceholder: "https://…",
    urlSubmit: "Import media",
    urlLoading: "Fetching media…",
    urlConverting: "Converting…",
    urlLegal:
      "Important: you alone are responsible for the content you import or download. Audiova is in no way liable if you retrieve music or media you have not purchased or for which you lack the rights. Only use files you own or are authorized to convert.",
  },
  settings: {
    format: "Output format",
    principal: "Main",
    bitrate: "Bitrate",
    sampleRate: "Sample rate",
    auto: "Auto",
    quality: "Output quality",
    qualityHint:
      "Choose before you start. 320 kb/s is the max MP3 bitrate; FLAC and WAV are lossless (best fidelity, larger file).",
    presetLight: "Podcast 128 kb/s",
    presetStandard: "Balanced 192 kb/s",
    presetBest: "Maximum quality 320 kb/s",
    presetLossless: "Lossless",
    bestBadge: "Max",
    metadata: "Keep metadata",
    metadataHint: "Copies tags the engine can transfer. Cover art is not guaranteed.",
    identity: "Keep title and artist",
    identityHint: "Writes only these two fields, read from the file.",
    filename: "Output file name",
    filenameHint: "Without extension. The chosen format is added automatically.",
  },
  facts: {
    duration: "Duration",
    sampleRate: "Sample rate",
    bitrate: "Bitrate",
    size: "Size",
    format: "Format",
  },
  status: {
    analyzing: "Analyzing…",
    ready: "Ready",
    queued: "Queued",
    converting: "Converting",
    finalizing: "Finalizing",
    done: "Done",
    error: "Error",
    cancelled: "Canceled",
    progress: "Progress",
  },
  errors: {
    unsupported: "This format is not supported.",
    damaged: "The file appears damaged, corrupted, or unreadable.",
    memory: "There is not enough memory to process this file.",
    failed: "Conversion failed. Try another file.",
    "too-large": "The file size exceeds the allowed limit.",
    empty: "The file is empty.",
    "no-audio":
      "No usable audio track was found (protected file or missing audio track).",
    engine: "The audio engine could not be loaded. Reload the page, then try again.",
    "too-many": "File limit reached. Extra files were ignored.",
    timeout: "Conversion took too long. Try a shorter file.",
    "url-invalid": "This link is not valid.",
    "url-blocked":
      "This address is not allowed. Listed streaming/video platforms are blocked, and rights confirmation is required.",
    "url-fetch": "The media could not be fetched. Check the link, then try again.",
    "url-unavailable": "This content is unavailable or not supported.",
    "url-busy": "Another link import is already running. Try again shortly.",
    "url-rate": "Too many link imports. Wait one minute, then try again.",
  },
  player: {
    play: "Play",
    pause: "Pause",
    position: "Playback position",
    volume: "Volume",
    mute: "Mute",
    unmute: "Unmute",
  },
  history: {
    title: "Recent conversions",
    intro:
      "Name, date, format, and bitrate stay in this browser. The converted file can be downloaded again for about 30 minutes, then the local cache expires.",
    empty: "No conversion saved on this device.",
    clear: "Clear history",
    sampleAuto: "Original sample rate",
    downloadAgain: "Download again",
    expired: "File expired — run a conversion again to get it back.",
  },
  features: {
    title: "Convert to MP3 in 3 clicks",
    intro:
      "Audiova converts files from your device locally, with the useful settings and nothing else. Link import goes through the server first; conversion then stays in the browser.",
    items: [
      {
        title: "Simplified conversion",
        body: "Turn your audio files around in a few clicks, without a complicated flow.",
      },
      {
        title: "Customizable quality",
        body: "Pick the bitrate that fits your needs.",
      },
      {
        title: "Privacy",
        body: "Files chosen on the device stay local for conversion. A link is only fetched temporarily by the server, then converted in the browser.",
      },
      {
        title: "All your devices",
        body: "Enjoy an interface suited to your computer, tablet, or phone.",
      },
    ],
  },
  formats: {
    title: "Formats actually supported",
    intro:
      "The MP3 converter accepts containers that FFmpeg.wasm can read in this build. A known extension is not enough if the file is incomplete, encrypted, or has no audio track.",
    output: "Output",
    input: "Input",
    video: "Video",
    videoNote: "The picture is ignored. Only the audio track is converted.",
    bitrateYes: "Adjustable bitrate",
    bitrateNo: "Bitrate fixed by the format",
  },
  how: {
    title: "Converting an audio file has never been this simple.",
    steps: [
      {
        title: "Import your file",
        body: "From the device, or paste a video/audio link. Drag and drop works on larger screens.",
      },
      {
        title: "Choose your settings",
        body: "MP3 is selected. Default bitrate is 320 kb/s (best MP3 quality). Sample rate can follow the source.",
      },
      {
        title: "Download your MP3",
        body: "The download offered is the conversion result, not a renamed copy.",
      },
    ],
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        question: "How do I convert an audio file to MP3?",
        answer: [
          "Import a file or paste a link, leave MP3 selected, adjust the bitrate if you want, then start conversion. When processing finishes, download the MP3. Encoding happens in the browser.",
        ],
      },
      {
        question: "Can I import a video or track from a link?",
        answer: [
          "Yes. In the converter, open the Link tab and paste the address. The URL is sent to Audiova's server first, which temporarily downloads the media and returns it to you. Conversion then runs locally in your browser, then the download starts.",
          "Not every site works. Private, protected, or oversized content (over 100 MB) is refused. Only import content you have rights to.",
        ],
      },
      {
        question: "Is the converter free?",
        answer: [
          "Yes. This version is free, with no account and no conversion quota. Each file must stay under 100 MB, and the queue accepts 20 files at most.",
        ],
      },
      {
        question: "What is the difference between 128, 192, and 320 kb/s?",
        answer: [
          "Bitrate is how much data is kept each second. 128 kb/s makes a lighter file, fine for speech. 192 kb/s balances size and quality. 320 kb/s is the default and highest MP3 bitrate here. For the best fidelity, choose FLAC or WAV (lossless).",
          "Raising bitrate does not improve an original that is already compressed or damaged.",
        ],
      },
      {
        question: "Can I convert a WAV file to MP3?",
        answer: [
          "Yes, if the WAV is readable. WAV is usually uncompressed: the resulting MP3 is smaller, with loss tied to the chosen bitrate.",
        ],
      },
      {
        question: "Can I use the site on my phone?",
        answer: [
          "Yes. The interface is built for phone, tablet, and desktop. On a phone, a long file may fail for lack of memory even under the 100 MB limit. In that case, process one file at a time.",
        ],
      },
      {
        question: "Are my files sent to a server?",
        answer: [
          "For a file chosen on your device: no. FFmpeg runs in your browser. The file is not uploaded for conversion and is not stored. The conversion program, about 32 MB, is however loaded from this site the first time.",
          "For a link import: Audiova’s server temporarily downloads the media to deliver it to you, then deletes it. Conversion itself stays local.",
          "Local history stores the name, date, format, and bitrate. Not the audio.",
        ],
      },
      {
        question: "What is the maximum file size?",
        answer: [
          "100 MB per file. Beyond that, the file is refused before conversion. Up to 20 files can be prepared, then they are converted one after another.",
        ],
      },
      {
        question: "Why can conversion take time?",
        answer: [
          "The engine loads once. Then encoding uses the device CPU, on a single thread, to stay compatible with phones. A long file or a modest device increases the wait.",
          "The percentage comes from the engine when it provides one. Otherwise the indicator stays indeterminate: no fake percentage is invented.",
        ],
      },
      {
        question: "Can I convert several files at once?",
        answer: [
          "Yes, up to 20. The same settings apply to the queue. Only one file is encoded at a time, to limit memory use.",
        ],
      },
      {
        question: "Why are some files incompatible?",
        answer: [
          "Only formats listed in the Formats section are accepted. A protected, truncated, or mismatched file is refused, with a clear message rather than a raw technical error.",
        ],
      },
      {
        question: "Can I convert a video to an audio file?",
        answer: [
          "Yes for MP4, MOV, WebM, and MKV when an audio track is present. The picture is discarded. Without an audio track, conversion stops and says so.",
        ],
      },
      {
        question: "Can metadata be kept?",
        answer: [
          "Yes. The option is on by default. Title, artist, and other tags FFmpeg can copy are kept when the output format allows it. Not every tag is guaranteed, nor the cover art.",
          "If you turn metadata off and title or artist was read, an option lets you keep only those two fields.",
        ],
      },
    ],
  },
  footer: {
    description: "In-browser audio converter. Local conversion, no account.",
    donate: "Buy me a coffee",
    donateHint: "Support Audiova (ad-free via donation)",
    product: "Product",
    information: "Information",
    privacy: "Privacy",
    legal: "Legal notice",
    contact: "Contact",
    rights: "© {year} Audiova. Independent tool.",
  },
  privacy: {
    metaTitle: "Privacy",
    metaDescription:
      "Audiova converts audio files in your browser. See what information stays on your device.",
    title: "Privacy",
    intro:
      "This page describes how the site works today. It does not promise protection the architecture does not provide.",
    sections: [
      {
        title: "Local conversion",
        paragraphs: [
          "When you choose a file on your device, it is read by your browser and processed by FFmpeg.wasm on your device. It is not sent to a conversion server, and Audiova does not keep a copy.",
          "The conversion program, a WebAssembly file of about 32 MB, is downloaded from this same site on the first conversion. That download is the engine, not your audio.",
        ],
      },
      {
        title: "Import from a link",
        paragraphs: [
          "If you paste a URL, this app’s server temporarily fetches the media with yt-dlp, returns it to your browser, then deletes the temporary file. This step is needed because most sites block a direct browser download.",
          "The conversion that follows stays local. Use this feature only for content you have the right to download.",
        ],
      },
      {
        title: "History in the browser",
        paragraphs: [
          "If a conversion succeeds, the browser may store locally the output file name, date, format, bitrate, and sample rate. This data stays on the device. You can clear it from the history section.",
          "Audio is not stored permanently. You can download again for about 30 minutes via the browser's local cache.",
        ],
      },
      {
        title: "Audience measurement and consent",
        paragraphs: [
          "With your consent (“Accept stats” or “Accept all”), Audiova records anonymized events: page views, sessions, successful or failed conversions, output format, language, and approximate browser. No audio file is sent for this purpose.",
          "Without consent, no audience measurement is sent. Language preference and privacy choice stay on your device. There is no user account and no database of converted files.",
        ],
      },
      {
        title: "Limits",
        paragraphs: [
          "Your browser, system, and downloads folder keep the file you save. That does not depend on Audiova.",
          "Device memory limits practical size. A file is refused above 100 MB. A phone may fail earlier: the message then mentions memory, without a raw technical dump.",
        ],
      },
      {
        title: "Advertising",
        paragraphs: [
          "Ad slots are off by default. If enabled from the admin console, they only show when you chose “Accept all”, and must not cover conversion buttons.",
          "If a third-party ad network is connected later, any cookies it sets will be described here before activation.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Legal notice & terms",
    metaDescription: "Legal notice, terms of use, and liability for Audiova.",
    title: "Legal notice & terms",
    intro:
      "Audiova is an independent audio conversion tool. By using the site, you accept the rules below, especially regarding copyright.",
    sections: [
      {
        title: "Publisher",
        paragraphs: [
          "The site is published as a personal, independent tool. There is no company name, headquarters, or publication director to declare in this version.",
        ],
      },
      {
        title: "Hosting",
        paragraphs: [
          "Hosting depends on where the site is deployed. Local conversion runs in the visitor’s browser. Link import may transit briefly through the server only to fetch the media.",
        ],
      },
      {
        title: "Terms of use",
        paragraphs: [
          "Audiova provides a technical converter. You alone are responsible for how you use it, the files you import, and the downloads you start.",
          "You may not use Audiova to bypass protection measures, to pirate content, or to distribute protected works without authorization.",
        ],
      },
      {
        title: "Copyright and content",
        paragraphs: [
          "You must own the files, or hold the rights / licenses needed to convert or download them.",
          "Audiova is in no way liable if you import or download music, videos, or other media you have not purchased, or for which you lack the rights.",
          "Audiova does not verify ownership and grants no reproduction, communication, or download license.",
        ],
      },
      {
        title: "Third-party software",
        paragraphs: [
          "Conversion relies on FFmpeg, compiled for WebAssembly and distributed via the @ffmpeg/core package. That build is under the GPL, notably because it includes libmp3lame for MP3 encoding. FFmpeg is a trademark of the FFmpeg project.",
          "Link import uses yt-dlp via the youtube-dl-exec package. Other UI libraries are listed in the project dependencies.",
        ],
      },
      {
        title: "Liability",
        paragraphs: [
          "The tool is provided as is, without warranty of availability, result integrity, or metadata preservation.",
          "A conversion may fail, produce a heavier file, or be interrupted. Check the result before deleting the original.",
          "To the extent permitted by law, Audiova and its publisher disclaim liability for damages related to unlawful content use, file loss, or service failure.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contact",
    metaDescription: "Send a ticket to the Audiova team and follow the conversation.",
    title: "Contact",
    intro:
      "Open a ticket below: the message reaches the admin console. You can return to this page to continue the conversation.",
    helpTitle: "Before opening a ticket",
    help: [
      "A refused format may be outside the supported list.",
      "A file over 100 MB is stopped before conversion.",
      "A phone may run out of memory even under that limit.",
      "Detailed answers are in the FAQ.",
    ],
    faq: "Read the FAQ",
    mail: "Write to {email}",
    mailMissing: "No public email is configured. Use the ticket above.",
    ticket: {
      title: "Ticket / chat",
      intro: "Describe your question. The conversation stays tied to this device via a local token.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      send: "Open ticket",
      sending: "Sending…",
      reply: "Send",
      replyPlaceholder: "Write a reply…",
      loading: "Loading ticket…",
      ref: "Ref.",
      statusLabel: "Status",
      status: {
        open: "open",
        answered: "answered",
        closed: "closed",
      },
      you: "You",
      support: "Support",
      newTicket: "New ticket",
      closed: "This ticket is closed. Open a new one if needed.",
      rate: "Too many messages. Try again later.",
      invalid: "Check the fields (name, email, subject, message).",
      network: "Unable to send right now.",
    },
  },
  notFound: {
    title: "This page does not exist",
    body: "The link does not match any Audiova page.",
    back: "Back to the converter",
  },
};
