export type Frame = 'browser' | 'phone'

export interface Shot {
  src: string
  width: number
  height: number
  frame: Frame
  caption: string
}

export interface Project {
  id: string
  name: string
  /** One line under the name: what it is. */
  kicker: string
  title: string
  /** Two or three sentences for the start page. */
  summary: string
  /** The longer text on the project's own page, one string per paragraph. */
  about: string[]
  highlights: string[]
  /** The fun parts under the hood, for the project's own page. */
  cool: { title: string; text: string }[]
  tech: string[]
  live?: { href: string; label: string }
  code?: string
  /** The project's own colours: accent for buttons and lines, soft for backgrounds. */
  accent: string
  accentDark: string
  soft: string
  softDark: string
  shots: Shot[]
}

export const projects: Project[] = [
  {
    id: 'bygg',
    name: 'Bygg',
    kicker: 'Möbelsnickeri i 3D',
    title: 'Rita möbeln, få kaplistan',
    summary:
      'Jag snickrar en del och ville se möbeln innan jag sågar. I Bygg ritar jag delarna i 3D och får ut en kaplista och en plan för hur brädorna ska sågas.',
    about: [
      'Varje del börjar som en rektangel som man drar upp till en bräda. Man kan välja träslag och se möbeln med ådring och skuggor. Det är oftast då jag märker att något är för tjockt eller sitter fel.',
      'Ur modellen räknar Bygg fram kaplistan och en sågplan, alltså hur delarna kan placeras på brädorna. Modellerna sparas i webbläsaren och synkas med en server jag kör själv, så appen fungerar även utan nät.',
      'Jag har också gjort ett kommandoradsverktyg, mest för att Claude ska kunna rita åt mig. Har jag appen öppen samtidigt ser jag ändringarna dyka upp direkt.',
    ],
    highlights: [
      '3D-vy med träslag, ådring och skuggor',
      'Kaplista och sågplan direkt ur modellen',
      'Fungerar offline och synkas mellan datorn och mobilen',
      'CLI som Claude kan använda',
    ],
    cool: [
      { title: 'Sågplanen', text: 'Bygg packar delarna på brädor och skivor i de mått som går att köpa i Sverige, och räknar med 3 mm sågsnitt. Planen består bara av raka genomgående snitt, alltså sådana man faktiskt kan göra på en bordssåg.' },
      { title: 'Gå runt möbeln i VR', text: 'Med ett VR-headset kan man kliva in i modellen och se bordet i full storlek innan man har köpt virket.' },
      { title: 'Claude som snickare', text: 'Bygg har ett CLI där varje del är en operation i JSON. Jag kan be Claude rita en hylla, och om appen är öppen skickar servern ändringarna direkt så att jag ser hyllan växa fram.' },
      { title: 'Ingen ändring försvinner', text: 'Varje modell har ett versionsnummer. Om två enheter ändrar samma modell märker servern det, i stället för att tyst skriva över.' },
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind', 'Hono', 'PWA', 'Docker'],
    live: { href: 'https://bygg.larsabrasha.com', label: 'Öppna Bygg' },
    code: 'https://github.com/larsabrasha/bygg',
    accent: '#9a6232',
    accentDark: '#d9a46a',
    soft: '#ece3d6',
    softDark: '#2b241d',
    shots: [
      { src: '/bilder/bygg/01-start.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Startsidan, med ett bord ritat i Bygg' },
      { src: '/bilder/bygg/02-app-dator.webp', width: 2000, height: 1250, frame: 'browser', caption: 'Modellen och egenskaperna för den valda delen' },
      { src: '/bilder/bygg/03-app-mobil.webp', width: 700, height: 1515, frame: 'phone', caption: 'Samma modell i mobilen' },
    ],
  },
  {
    id: 'praliner',
    name: 'Praliner',
    kicker: 'Webbshop',
    title: 'Made by Madde',
    summary:
      'Beställningssidan för Maddes praliner. Man väljer smaker, ser priset direkt och skickar beställningen. Pralinerna på sidan är ritade i 3D, och det finns ett par små spel.',
    about: [
      'Madde gör praliner för hand och behövde ett sätt att ta emot beställningar. Man väljer minst fyra av varje smak, och totalen fyller askar om 8 och 12. Priset räknas ut medan man väljer. Betalningen sker vid sidan av sajten, och Madde bockar av den på en adminsida.',
      'Utseendet bygger på hennes affisch. Pralinerna är inga foton. De ritas i 3D i webbläsaren, och mönstren är gjorda för att likna de riktiga.',
      'Jag kunde inte låta bli att lägga till ett memory, en labyrint och ett läge där man målar en egen pralin och delar den med en länk. Madde kan också ändra sortiment och priser genom att prata med Claude eller ChatGPT. Sajten har en MCP-server för det.',
    ],
    highlights: [
      'Pralinerna ritas i 3D, med ett mönster per smak',
      'Askar om 8 och 12, minst fyra av varje smak',
      'Memory, labyrint och måla din egen pralin',
      'Adminsida och MCP-server för Madde',
    ],
    cool: [
      { title: 'Praliner utan kamera', text: 'Varje pralin är en 3D-form som svarvas fram ur en kurva. Mönstren, med stänk, ränder och guldprickar, målas med kod på en canvas. Inget är fotograferat.' },
      { title: 'Måla din egen', text: 'I pralinleken väljer man choklad, färg och stänk och trycker på pralinen för att stänka. Hela utseendet sparas i länken, så den som får länken ser exakt samma pralin, även tvärsnittet med fyllningen.' },
      { title: 'Madde pratar med sin butik', text: 'Sajten har en MCP-server. Madde kan be Claude eller ChatGPT att lägga till en smak, ändra ett pris eller visa veckans beställningar. Alla ändringar sparas med historik och kan ångras.' },
      { title: 'En server, två hem', text: 'Samma serverkod körs som Cloudflare Worker med D1 och som vanlig Node med en SQLite-fil. Om Cloudflare skulle krångla kan butiken flytta.' },
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind', 'Cloudflare Workers', 'D1', 'MCP'],
    live: { href: 'https://praliner.larsabrasha.com', label: 'Öppna butiken' },
    accent: '#5b3526',
    accentDark: '#e0b393',
    soft: '#f6e6d7',
    softDark: '#2c1d16',
    shots: [
      { src: '/bilder/praliner/01-start.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Startsidan, i samma stil som affischen' },
      { src: '/bilder/praliner/02-smaker.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Smakerna, varje pralin med eget mönster' },
      { src: '/bilder/praliner/03-bestallning.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Fyra smaker i korgen, priset räknas direkt' },
      { src: '/bilder/praliner/06-mobil.webp', width: 780, height: 1688, frame: 'phone', caption: 'Startsidan i mobilen' },
      { src: '/bilder/praliner/05-mala.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Måla en egen pralin och dela den' },
      { src: '/bilder/praliner/04-memory.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Pralinmemory mitt i spelet' },
    ],
  },
  {
    id: 'piano',
    name: 'Piano',
    kicker: 'Lär dig spela',
    title: 'Öva piano utan stress',
    summary:
      'Jag håller på att lära mig spela piano och byggde en app för det. Den fungerar med MIDI-piano, mikrofon eller datorns tangentbord.',
    about: [
      'Appen har inga streaks, poäng eller nivåer att låsa upp. Man övar en stund när man har lust och får stjärnor som visar hur det gick. Allt är öppet från början.',
      'Det finns fyra kurser, ungefär som böckerna i en pianoskola: komma igång med mitt-C, kompa till sång, melodi och noter, och att spela efter gehör. Man kan också lägga in en egen MIDI-fil eller ett ackordschema. Då letar appen upp tonart, ackord och fraser och gör lektioner av låten, först en hand i taget och långsamt.',
      'Med ett vanligt akustiskt piano lyssnar appen genom mikrofonen. Efter ett försök visar den vilka takter som var svårast och låter en öva bara dem, lite långsammare, tills de går tre gånger i rad.',
    ],
    highlights: [
      'Fallande noter, vanliga noter eller en rullande notrad',
      'Egna låtar blir lektioner',
      'Hör ett akustiskt piano genom mikrofonen',
    ],
    cool: [
      { title: 'Hör ett vanligt piano', text: 'Appen lyssnar genom mikrofonen och hittar både toner och ackord. Den kalibreras mot ditt piano, så att ett lite ostämt piano går bra, och den fortsätter att finjustera sig medan du spelar.' },
      { title: 'Skiljer dig från sig själv', text: 'När appen spelar med i bakgrunden måste den veta vilka toner som är dina. Den jämför övertonerna med det den själv spelar, så att dess egen bas aldrig räknas som en fel tangent.' },
      { title: 'Låtar blir lektioner', text: 'Ge appen en MIDI-fil, så hittar den tonart, ackord och vilka fraser som upprepas. Sedan gör den lektioner: en hand i taget, långsamt först och sist hela låten.' },
      { title: 'Fördröjningen räknas bort', text: 'Bluetooth-hörlurar och vissa MIDI-pianon ligger efter. Ett kort test där man trummar med i takten mäter fördröjningen, så att den inte räknas som att du spelade för sent.' },
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'Web MIDI', 'Web Audio', 'PWA', 'Cloudflare'],
    live: { href: 'https://piano.larsabrasha.com', label: 'Öppna Piano' },
    accent: '#006adb',
    accentDark: '#6fb0ff',
    soft: '#e3edfb',
    softDark: '#16213a',
    shots: [{ src: '/bilder/piano/01-idag.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Idag: nästa övning och låtar att spela' },
      { src: '/bilder/piano/05-fallande-noter.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Fallande noter med fingersättning' },
      { src: '/bilder/piano/06-noter.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Noter som på papper, rätt toner blir gröna' },
      { src: '/bilder/piano/02-kurser.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Kurserna, från mitt-C till gehör' },
      { src: '/bilder/piano/08-mobil.webp', width: 780, height: 1688, frame: 'phone', caption: 'Kursen Kompa till sång i mobilen' },
      { src: '/bilder/piano/04-lat-lektioner.webp', width: 2560, height: 1600, frame: 'browser', caption: 'En låt blir lektioner, avsnitt för avsnitt' },
      { src: '/bilder/piano/07-spela-fritt.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Spela fritt: appen känner igen ackordet' },
      { src: '/bilder/piano/03-latar.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Låtarna, sorterade i nivåer' },
    ],
  },
  {
    id: 'gospelpresenter',
    name: 'Gospel Presenter',
    kicker: 'För kyrkor',
    title: 'Sångtexter på storbildsskärmen',
    summary:
      'Ett presentationsprogram för kyrkor, för sångtexter och bibelord under gudstjänsten. Det är gratis och öppen källkod.',
    about: [
      'Gospel Presenter är till för den som sitter vid datorn under gudstjänsten och visar texterna. Jag har försökt hålla det enkelt och bara ta med det som behövs en vanlig söndag.',
      'En presentation kan blanda sånger, bibeltexter, bilder och slides från PowerPoint eller PDF. Den visas på projektorn och kan styras från mobilen. Ändringar syns direkt på alla anslutna skärmar. Den som leder lovsången har ett eget scenläge som också visar nästa bild.',
      'Sångerna ligger i ett bibliotek med versionshistorik och kan importeras från ProPresenter. Appen sparar också vilka sånger som visats, vilket gör CCLI-rapporten enklare.',
    ],
    highlights: [
      'Sånger, bibelord, bilder och PDF i samma presentation',
      'Styr från mobilen, alla skärmar uppdateras direkt',
      'Scenläge för lovsångsledaren',
      'Import från ProPresenter',
    ],
    cool: [
      { title: 'Alla skärmar i takt', text: 'Projektorn, mobilen som fjärrkontroll och lovsångsledarens skärm visar samma presentation. Med SignalR syns en ändring direkt på alla, och en ny skärm ansluter med en kort kod.' },
      { title: 'Både webb och Mac', text: 'Samma Blazor-kod körs som webbapp och som Mac-app, för kyrkor som hellre vill ha ett vanligt program på datorn.' },
      { title: 'PowerPoint och PDF på köpet', text: 'Bilder från PowerPoint eller PDF blir slides i presentationen, så att predikans bilder kan ligga mellan sångerna.' },
      { title: 'Egen drift', text: 'Appen finns som färdiga Docker-avbildningar, och en compose-fil startar databasen och bildlagringen bredvid. En kyrka kan alltså köra alltihop på en egen server.' },
    ],
    tech: ['C#', '.NET', 'Blazor', 'SignalR', 'PostgreSQL', 'Tailwind', '.NET Aspire'],
    live: { href: 'https://www.gospelpresenter.com', label: 'Till gospelpresenter.com' },
    code: 'https://github.com/larsabrasha/GospelPresenter',
    accent: '#0284c7',
    accentDark: '#56b8ec',
    soft: '#e0f0fa',
    softDark: '#132634',
    shots: [
      { src: '/bilder/gospelpresenter/presentation-live.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Presentationen visas live' },
      { src: '/bilder/gospelpresenter/presentation.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Bygg en presentation av sånger och bibelord' },
      { src: '/bilder/gospelpresenter/stage.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Scenläget för lovsångsledaren' },
      { src: '/bilder/gospelpresenter/songs.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Kyrkans sångbibliotek' },
      { src: '/bilder/gospelpresenter/bible.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Sök i flera bibelöversättningar' },
      { src: '/bilder/gospelpresenter/mobil.webp', width: 780, height: 1688, frame: 'phone', caption: 'Presentationerna i mobilen' },
    ],
  },
  {
    id: 'kropp',
    name: 'Kropp',
    kicker: 'Hälsologg',
    title: 'Min träningslogg',
    summary:
      'Här loggar jag mina gympass. Appen ligger på hemskärmen i telefonen och fungerar utan nät.',
    about: [
      'Tidigare loggade jag träningen i ett Numbers-dokument, vilket var klumpigt att fylla i mellan seten. Kropp är en webbapp som jag har lagt på hemskärmen, och den ska kännas som en vanlig iPhone-app.',
      'Allt sparas först i telefonen och synkas med min server när det finns nät, så täckningen i gymmet spelar ingen roll. Jag planerar nästa pass från en mall, bockar av seten och kan se hur vikterna har utvecklats.',
      'Första versionen var skriven i Blazor och .NET. Sedan skrev jag om den i React och TypeScript. Datamodellen är densamma, så de gamla passen följde med.',
    ],
    highlights: [
      'Läser och skriver alltid lokalt, synkar i bakgrunden',
      'Mallar, kalender och statistik',
      'Ligger på hemskärmen som en app',
    ],
    cool: [
      { title: 'Nätet är valfritt', text: 'Appen läser och skriver alltid mot telefonens egen databas. Ändringar läggs i en utkorg och skickas när det finns nät: vid start, när appen blir synlig och tre sekunder efter att man sparat.' },
      { title: 'Startar utan nät', text: 'En service worker sparar alla filer, så appen startar även i flygläge.' },
      { title: 'Gamla data är heliga', text: 'Telefonerna har data som den gamla Blazor-versionen skrev. Tester låser databasschemat, synkformatet och exportfilen, så att en ändring aldrig råkar göra gamla pass oläsliga.' },
    ],
    tech: ['React', 'TypeScript', 'Tailwind', 'IndexedDB', 'Hono', 'PostgreSQL', 'PWA'],
    code: 'https://github.com/larsabrasha/Kropp',
    accent: '#0d7a5f',
    accentDark: '#5fd0ac',
    soft: '#dff1ea',
    softDark: '#13291f',
    shots: [
      { src: '/bilder/kropp/01-traning.webp', width: 780, height: 1688, frame: 'phone', caption: 'Dagens pass och veckan i överblick' },
      { src: '/bilder/kropp/02-pagaende-pass.webp', width: 780, height: 1688, frame: 'phone', caption: 'Ett pågående pass med set och vikter' },
      { src: '/bilder/kropp/03-kalender.webp', width: 780, height: 1688, frame: 'phone', caption: 'Kalendern med alla pass' },
      { src: '/bilder/kropp/05-ovningsstatistik.webp', width: 780, height: 1688, frame: 'phone', caption: 'Benpress: vikten stiger över ett halvår' },
      { src: '/bilder/kropp/06-bibliotek.webp', width: 780, height: 1688, frame: 'phone', caption: 'De mest gjorda övningarna' },
    ],
  },
]
