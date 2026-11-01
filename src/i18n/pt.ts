import type { Dictionary } from "@/i18n/fr";

export const pt: Dictionary = {
  meta: {
    title: "Audiova — Conversor MP3 online gratuito",
    description:
      "Converta um ficheiro de áudio para MP3 no navegador. WAV, FLAC, M4A, OGG e faixas de vídeo. Grátis, sem instalação, sem envio do ficheiro na conversão local.",
    ogAlt: "Audiova, conversor de áudio para MP3",
  },
  skip: "Ir para o conteúdo",
  nav: {
    label: "Navegação principal",
    converter: "Conversor",
    features: "Funcionalidades",
    formats: "Formatos",
    faq: "FAQ",
    openFile: "Abrir um ficheiro",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
    discord: "Entrar no Discord",
  },
  hero: {
    slogan: "Your audio. Your format. Your freedom.",
    titleLead: "O seu áudio.",
    titleRest: "Em",
    titleAccent: "MP3",
    titleEnd: ". Simplesmente.",
    subtitle:
      "Converta ficheiros de áudio para MP3 em poucos cliques. Grátis, simples e sem instalação.",
    primary: "Converter um ficheiro",
    secondary: "Ver funcionalidades",
    points: ["Simples e rápido.", "Qualidade de áudio ajustável.", "Sem instalação."],
    monitor: "Monitor",
    demo: "Sinal de demonstração",
    demoHint: "Esta forma de onda é desenhada no ecrã. Não reproduz o seu ficheiro.",
  },
  converter: {
    title: "Conversor de áudio",
    dropTitle: "Largue o ficheiro de áudio",
    dropText: "Arraste e largue o ficheiro aqui ou navegue no dispositivo.",
    choose: "Escolher um ficheiro",
    fileInput: "Seleção de ficheiros de áudio",
    addMore: "Adicionar ficheiros",
    limits: "{audio}. Vídeo: {video}. Máximo {size}, {count} ficheiros de cada vez.",
    queueTitle: "Ficheiros a converter",
    remove: "Remover {name}",
    listenSource: "Ouvir o original",
    listenOutput: "Ouvir o resultado",
    hidePlayer: "Ocultar o leitor",
    convertOne: "Converter para {format}",
    convertMany: "Converter {count} ficheiros para {format}",
    converting: "Conversão em curso…",
    cancel: "Cancelar",
    another: "Converter outro ficheiro",
    download: "Descarregar {format}",
    engineDownload: "A carregar o motor de áudio… {percent} %",
    engineDownloadUnknown: "A carregar o motor de áudio…",
    engineCompile: "A inicializar o motor…",
    engineHint:
      "O programa de conversão, cerca de 32 MB, é carregado deste site na primeira conversão. O ficheiro de áudio não é enviado.",
    emptySelection: "Adicione um ficheiro de áudio para escolher o bitrate e iniciar a conversão.",
    customNameHint: "O nome personalizado aplica-se quando há um único ficheiro pronto.",
    losslessHint: "WAV e FLAC são sem perdas: o bitrate não se aplica.",
    metadataIncluded: "O título e o artista lidos no ficheiro são incluídos com os metadados.",
    sizeNote: "Esta nota aplica-se apenas a este ficheiro e a estas definições.",
    smaller: "{amount} a menos do que o ficheiro original.",
    larger: "{amount} a mais do que o ficheiro original.",
    sameSize: "O mesmo tamanho que o ficheiro original.",
    playbackUnsupported:
      "A reprodução não está disponível neste navegador para este formato. A descarga continua possível.",
    cancelHint: "O cancelamento interrompe o trabalho em curso. O motor será reiniciado.",
    sourceFile: "Ficheiro",
    sourceUrl: "Ligação",
    urlTitle: "Converter a partir de uma ligação",
    urlText:
      "Cole o endereço de um vídeo ou faixa. A Audiova obtém o média, converte-o e inicia a descarga.",
    urlPlaceholder: "https://…",
    urlSubmit: "Converter e descarregar",
    urlLoading: "A obter o média…",
    urlConverting: "Conversão e preparação da descarga…",
    urlHint:
      "Funciona com muitas páginas suportadas pelo yt-dlp (YouTube, Vimeo, ligações de áudio diretas…). Use apenas conteúdos que tem o direito de descarregar. Limite: 100 MB.",
    urlLegal: "Deve dispor dos direitos necessários sobre o conteúdo importado.",
  },
  settings: {
    format: "Formato de saída",
    principal: "Principal",
    bitrate: "Bitrate",
    sampleRate: "Taxa de amostragem",
    auto: "Auto",
    metadata: "Manter metadados",
    metadataHint: "Copia as etiquetas que o motor sabe transferir. Capas não são garantidas.",
    identity: "Manter título e artista",
    identityHint: "Escreve apenas estes dois campos, lidos no ficheiro.",
    filename: "Nome do ficheiro de saída",
    filenameHint: "Sem extensão. O formato escolhido é adicionado automaticamente.",
  },
  facts: {
    duration: "Duração",
    sampleRate: "Taxa",
    bitrate: "Bitrate",
    size: "Tamanho",
    format: "Formato",
  },
  status: {
    analyzing: "A analisar…",
    ready: "Pronto",
    queued: "Em fila",
    converting: "Conversão",
    finalizing: "A finalizar",
    done: "Concluído",
    error: "Erro",
    cancelled: "Cancelada",
    progress: "Progresso",
  },
  errors: {
    unsupported: "Este formato não é suportado.",
    damaged: "O ficheiro parece danificado.",
    memory: "Memória insuficiente para processar este ficheiro.",
    failed: "A conversão falhou. Tente outro ficheiro.",
    "too-large": "O tamanho do ficheiro excede o limite permitido.",
    empty: "O ficheiro está vazio.",
    "no-audio": "Nenhuma faixa de áudio utilizável encontrada.",
    engine: "Não foi possível carregar o motor de áudio. Recarregue a página e tente de novo.",
    "too-many": "Máximo de cinco ficheiros. Os ficheiros extra foram ignorados.",
    timeout: "A conversão excedeu o tempo limite. Tente um ficheiro mais curto.",
    "url-invalid": "Esta ligação não é válida.",
    "url-blocked": "Este endereço não é permitido.",
    "url-fetch": "Não foi possível obter o média. Verifique a ligação e tente de novo.",
    "url-unavailable": "Este conteúdo não está disponível ou não é suportado.",
    "url-busy": "Já há outra importação por ligação em curso. Tente novamente em breve.",
    "url-rate": "Demasiadas importações por ligação. Aguarde um minuto e tente de novo.",
  },
  player: {
    play: "Reproduzir",
    pause: "Pausa",
    position: "Posição de reprodução",
    volume: "Volume",
    mute: "Silenciar",
    unmute: "Ativar som",
  },
  history: {
    title: "Conversões recentes",
    intro:
      "Estas linhas ficam neste navegador: nome do ficheiro, data, formato e bitrate. O áudio não é guardado e não pode ser descarregado novamente a partir deste histórico.",
    empty: "Nenhuma conversão guardada neste dispositivo.",
    clear: "Limpar histórico",
    sampleAuto: "Taxa original",
  },
  features: {
    title: "Uma ferramenta de escuta, não um formulário",
    intro:
      "A Audiova converte localmente, com as definições úteis e nada mais. As promessas correspondem ao que o motor faz de facto.",
    items: [
      {
        title: "Conversão simplificada",
        body: "Transforme ficheiros de áudio em poucos cliques, sem um fluxo complicado.",
      },
      {
        title: "Qualidade personalizável",
        body: "Escolha o bitrate adequado às suas necessidades.",
      },
      {
        title: "Privacidade",
        body: "Os ficheiros escolhidos no dispositivo permanecem locais para a conversão. Uma ligação é apenas obtida temporariamente pelo servidor e depois convertida no navegador.",
      },
      {
        title: "Todos os seus dispositivos",
        body: "Uma interface adaptada ao computador, tablet ou telemóvel.",
      },
    ],
  },
  formats: {
    title: "Formatos realmente suportados",
    intro:
      "O conversor MP3 aceita contentores que o FFmpeg.wasm consegue ler nesta versão. Uma extensão conhecida não basta se o ficheiro estiver incompleto, encriptado ou sem faixa de áudio.",
    output: "Saída",
    input: "Entrada",
    video: "Vídeo",
    videoNote: "A imagem é ignorada. Apenas a faixa de áudio é convertida.",
    bitrateYes: "Bitrate ajustável",
    bitrateNo: "Bitrate fixo pelo formato",
  },
  how: {
    title: "Converter um ficheiro de áudio nunca foi tão simples.",
    steps: [
      {
        title: "Importe o ficheiro",
        body: "Do dispositivo, ou cole uma ligação de vídeo/áudio. Arrastar e largar funciona em ecrãs grandes.",
      },
      {
        title: "Escolha as definições",
        body: "O MP3 está selecionado. O bitrate predefinido é 192 kb/s. A taxa pode seguir a fonte.",
      },
      {
        title: "Descarregue o seu MP3",
        body: "O ficheiro oferecido para descarga é o resultado da conversão, não uma cópia renomeada.",
      },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        question: "Como converter um ficheiro de áudio para MP3?",
        answer: [
          "Importe um ficheiro ou cole uma ligação, deixe o MP3 selecionado, ajuste o bitrate se quiser e inicie. Quando terminar, descarregue o MP3. A codificação ocorre no navegador.",
        ],
      },
      {
        question: "Posso importar um vídeo ou faixa a partir de uma ligação?",
        answer: [
          "Sim. No conversor, abra o separador Ligação, cole o endereço e clique em Converter e descarregar. A Audiova obtém o média, converte-o e inicia a descarga.",
          "Nem todos os sites funcionam. Conteúdos privados, protegidos ou demasiado grandes (acima de 100 MB) são recusados. Importe apenas conteúdos para os quais tem direitos.",
        ],
      },
      {
        question: "O conversor é gratuito?",
        answer: [
          "Sim. Esta versão é gratuita, sem conta e sem quota. Cada ficheiro deve ficar abaixo de 100 MB e a fila aceita no máximo 5 ficheiros.",
        ],
      },
      {
        question: "Qual é a diferença entre 128, 192 e 320 kb/s?",
        answer: [
          "O bitrate é a quantidade de dados guardada por segundo. 128 kb/s dá um ficheiro mais leve, adequado à voz. 192 kb/s é o valor predefinido, um bom equilíbrio para música. 320 kb/s é o bitrate MP3 mais alto oferecido aqui: o ficheiro é mais pesado e mais próximo de uma fonte detalhada.",
          "Aumentar o bitrate não melhora um original já comprimido ou danificado.",
        ],
      },
      {
        question: "Posso converter um ficheiro WAV para MP3?",
        answer: [
          "Sim, se o WAV for legível. O WAV costuma ser sem compressão: o MP3 resultante é mais pequeno, com perda ligada ao bitrate escolhido.",
        ],
      },
      {
        question: "Posso usar o site no telemóvel?",
        answer: [
          "Sim. A interface é pensada para telemóvel, tablet e computador. Num telemóvel, um ficheiro longo pode falhar por falta de memória mesmo abaixo do limite de 100 MB. Nesse caso, processe um ficheiro de cada vez.",
        ],
      },
      {
        question: "Os meus ficheiros são enviados para um servidor?",
        answer: [
          "Para um ficheiro escolhido no dispositivo: não. O FFmpeg corre no navegador. O ficheiro não é carregado nem guardado. O programa de conversão, cerca de 32 MB, é no entanto carregado deste site na primeira vez.",
          "Para uma importação por ligação: o servidor da Audiova descarrega temporariamente o média para lho entregar e depois apaga-o. A conversão em si permanece local.",
          "O histórico local guarda o nome, a data, o formato e o bitrate. Não o áudio.",
        ],
      },
      {
        question: "Qual é o tamanho máximo de um ficheiro?",
        answer: [
          "100 MB por ficheiro. Acima disso, o ficheiro é recusado antes da conversão. Podem preparar-se cinco ficheiros e depois convertê-los um a um.",
        ],
      },
      {
        question: "Porque é que a conversão pode demorar?",
        answer: [
          "O motor carrega uma vez. Depois, a codificação usa o processador do dispositivo, num único fio, para permanecer compatível com telemóveis. Um ficheiro longo ou um aparelho modesto aumenta a espera.",
          "A percentagem vem do motor quando a fornece. Caso contrário, o indicador fica indeterminado: não se inventa nenhuma percentagem.",
        ],
      },
      {
        question: "Posso converter vários ficheiros de uma vez?",
        answer: [
          "Sim, até 5. As mesmas definições aplicam-se à fila. Só se codifica um ficheiro de cada vez para limitar a memória.",
        ],
      },
      {
        question: "Porque é que alguns ficheiros são incompatíveis?",
        answer: [
          "Só são aceites os formatos listados na secção Formatos. Um ficheiro protegido, truncado ou cujo conteúdo não corresponde à extensão é recusado com uma mensagem clara.",
        ],
      },
      {
        question: "Posso converter um vídeo num ficheiro de áudio?",
        answer: [
          "Sim para MP4, MOV, WebM e MKV quando existe uma faixa de áudio. A imagem é descartada. Sem faixa de áudio, a conversão para e indica-o.",
        ],
      },
      {
        question: "É possível conservar os metadados?",
        answer: [
          "Sim. A opção está ativa por predefinição. Título, artista e outras etiquetas que o FFmpeg sabe copiar são conservados quando o formato de saída o permite. Não é garantido para cada etiqueta nem para a capa.",
          "Se desativar os metadados e o título ou artista tiverem sido lidos, uma opção permite manter apenas esses dois campos.",
        ],
      },
    ],
  },
  footer: {
    description: "Conversor de áudio no navegador. Your audio. Your format. Your freedom.",
    product: "Produto",
    information: "Informações",
    privacy: "Privacidade",
    legal: "Aviso legal",
    contact: "Contacto",
    rights: "© {year} Audiova. Ferramenta independente.",
  },
  privacy: {
    metaTitle: "Privacidade",
    metaDescription:
      "A Audiova converte ficheiros de áudio no navegador. Veja que informações ficam no dispositivo.",
    title: "Privacidade",
    intro:
      "Esta página descreve o funcionamento atual do site. Não promete uma proteção que a arquitetura não oferece.",
    sections: [
      {
        title: "Conversão local",
        paragraphs: [
          "Quando escolhe um ficheiro no dispositivo, o navegador lê-o e o FFmpeg.wasm processa-o no dispositivo. Não é enviado para um servidor de conversão e a Audiova não guarda uma cópia.",
          "O programa de conversão, um ficheiro WebAssembly de cerca de 32 MB, é descarregado deste mesmo site na primeira conversão. Essa descarga é o motor, não o seu áudio.",
        ],
      },
      {
        title: "Importação a partir de uma ligação",
        paragraphs: [
          "Se colar um URL, o servidor desta aplicação obtém temporariamente o média com yt-dlp, envia-o ao navegador e apaga o ficheiro temporário. Este passo é necessário porque a maioria dos sites bloqueia a descarga direta no navegador.",
          "A conversão seguinte permanece local. Use esta função apenas para conteúdos que tem o direito de descarregar.",
        ],
      },
      {
        title: "Histórico no navegador",
        paragraphs: [
          "Se uma conversão for bem-sucedida, o navegador pode guardar localmente o nome, a data, o formato, o bitrate e a taxa. Os dados ficam no dispositivo. Pode limpá-los na secção de histórico.",
          "O áudio não é armazenado. O histórico não permite descarregar novamente um ficheiro.",
        ],
      },
      {
        title: "Medição de audiência e consentimento",
        paragraphs: [
          "Com o seu consentimento (« Aceitar estatísticas » ou « Aceitar tudo »), a Audiova regista eventos anonimizados: páginas vistas, sessões, conversões bem ou mal sucedidas, formato de saída, idioma e navegador aproximado. Nenhum ficheiro de áudio é enviado para este fim.",
          "Sem consentimento, não é enviada medição de audiência. A preferência de idioma e a escolha de privacidade ficam no dispositivo. Não há conta de utilizador nem base de dados de ficheiros convertidos.",
        ],
      },
      {
        title: "Limites",
        paragraphs: [
          "O navegador, o sistema e a pasta de transferências conservam o ficheiro que guarda. Isso não depende da Audiova.",
          "A memória do dispositivo limita o tamanho prático. Um ficheiro acima de 100 MB é recusado. Um telemóvel pode falhar mais cedo: a mensagem fala então de memória, sem um dump técnico bruto.",
        ],
      },
      {
        title: "Publicidade",
        paragraphs: [
          "Os espaços publicitários estão desativados por predefinição. Se forem ativados na consola de administração, só aparecem com « Aceitar tudo » e não devem cobrir os botões de conversão.",
          "Se mais tarde for ligada uma rede publicitária de terceiros, os respetivos cookies serão descritos aqui antes da ativação.",
        ],
      },
    ],
  },
  legal: {
    metaTitle: "Aviso legal",
    metaDescription: "Informações sobre o editor, o alojamento e o software usado pela Audiova.",
    title: "Aviso legal",
    intro:
      "A Audiova é uma ferramenta independente. Aqui não se apresenta empresa, morada nem número de registo, porque não existem para este projeto.",
    sections: [
      {
        title: "Editor",
        paragraphs: [
          "O site é publicado como ferramenta pessoal e independente. Nesta versão não há denominação social, sede nem diretor de publicação a declarar.",
        ],
      },
      {
        title: "Alojamento",
        paragraphs: [
          "O alojamento depende de onde o site é implantado. A aplicação em si não impõe um anfitrião. A conversão de áudio não usa esse alojamento: corre no navegador do visitante.",
        ],
      },
      {
        title: "Ficheiros e direitos",
        paragraphs: [
          "Deve ter o direito de converter ou descarregar os ficheiros e ligações que importa. A Audiova não verifica a titularidade e não concede qualquer autorização de reprodução.",
        ],
      },
      {
        title: "Software de terceiros",
        paragraphs: [
          "A conversão assenta no FFmpeg para WebAssembly através do pacote @ffmpeg/core. Essa compilação está sob a GPL, nomeadamente porque inclui libmp3lame para MP3. FFmpeg é uma marca do projeto FFmpeg.",
          "A importação por ligação usa yt-dlp através do youtube-dl-exec. Outras bibliotecas de interface estão nas dependências do projeto.",
        ],
      },
      {
        title: "Responsabilidade",
        paragraphs: [
          "A ferramenta é fornecida tal como está. Uma conversão pode falhar, produzir um ficheiro mais pesado ou não recuperar todos os metadados. Verifique o resultado antes de apagar o original.",
        ],
      },
    ],
  },
  contact: {
    metaTitle: "Contacto",
    metaDescription: "Envie um ticket à equipa Audiova e acompanhe a conversa.",
    title: "Contacto",
    intro:
      "Abra um ticket abaixo: a mensagem chega à consola de administração. Pode voltar a esta página para continuar a conversa.",
    helpTitle: "Antes de abrir um ticket",
    help: [
      "Um formato recusado pode estar fora da lista suportada.",
      "Um ficheiro acima de 100 MB é parado antes da conversão.",
      "Um telemóvel pode ficar sem memória mesmo abaixo desse limite.",
      "As respostas detalhadas estão na FAQ.",
    ],
    faq: "Ler a FAQ",
    mail: "Escrever para {email}",
    mailMissing: "Nenhum e-mail público configurado. Use o ticket acima.",
    ticket: {
      title: "Ticket / chat",
      intro: "Descreva a sua questão. A conversa fica ligada a este dispositivo com um token local.",
      name: "Nome",
      email: "E-mail",
      subject: "Assunto",
      message: "Mensagem",
      send: "Abrir ticket",
      sending: "A enviar…",
      reply: "Enviar",
      replyPlaceholder: "Escrever uma resposta…",
      loading: "A carregar ticket…",
      ref: "Ref.",
      statusLabel: "Estado",
      status: {
        open: "aberto",
        answered: "respondido",
        closed: "fechado",
      },
      you: "Você",
      support: "Suporte",
      newTicket: "Novo ticket",
      closed: "Este ticket está fechado. Abra um novo se precisar.",
      rate: "Demasiadas mensagens. Tente mais tarde.",
      invalid: "Verifique os campos (nome, e-mail, assunto, mensagem).",
      network: "Não é possível enviar de momento.",
    },
  },
  notFound: {
    title: "Esta página não existe",
    body: "A ligação não corresponde a nenhuma página da Audiova.",
    back: "Voltar ao conversor",
  },
};
