import type { icons } from 'lucide-react'

export type Frame = 'browser' | 'phone' | 'tablet'

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
  /** The start page: a short headline and one line under it. */
  headline: string
  line: string
  /** Two or three sentences for the start page. */
  summary: string
  /** The longer text on the project's own page, one string per paragraph. */
  about: string[]
  /** The fun parts under the hood, for the project's own page. */
  cool: { icon: keyof typeof icons; title: string; text: string }[]
  tech: string[]
  live?: { href: string; label: string }
  code?: string
  /** The project's own colours: accent for buttons and lines, soft for backgrounds. */
  accent: string
  accentDark: string
  soft: string
  softDark: string
  shots: Shot[]
  /** Optional: three phones side by side, e.g. two players and a spectator. */
  trio?: { title: string; text: string; shots: Shot[] }
}

export const projects: Project[] = [
  {
    id: 'bygg',
    name: 'Bygg',
    headline: 'Se möbeln innan du sågar.',
    line: 'Rita i 3D, få kaplistan och ställ möbeln i rummet med AR.',
    summary:
      'Jag snickrar en del och ville se möbeln innan jag sågar. I Bygg ritar jag delarna i 3D, får ut en kaplista och kan ställa möbeln i rummet med AR innan jag sågar.',
    about: [
      'Varje del börjar som en rektangel som man drar upp till en bräda. Man kan välja träslag och se möbeln med ådring och skuggor. Det är oftast då jag märker att något är för tjockt eller sitter fel.',
      'Ur modellen räknar Bygg fram kaplistan och en sågplan, alltså hur delarna kan placeras på brädorna. Modellerna sparas i webbläsaren och synkas med en server jag kör själv, så appen fungerar även utan nät.',
      'Det finns också ett kommandoradsverktyg, mest för att Claude ska kunna rita åt mig. Har jag appen öppen samtidigt ser jag ändringarna dyka upp direkt.',
    ],
    cool: [
      { icon: 'Box', title: 'Ställ möbeln i rummet', text: 'På iPhone och iPad kan man ställa möbeln i rummet i verklig storlek, med trä och tappar. Då ser man direkt om bordet får plats.' },
      { icon: 'Glasses', title: 'Gå runt den i VR', text: 'Med ett VR-headset står man bredvid möbeln i full storlek. Man går runt med styrspaken, och menyn svävar i luften.' },
      { icon: 'Terminal', title: 'Claude som snickare', text: 'Med kommandoradsverktyget kan Claude rita åt mig, till exempel "gör ett bord 120 × 80". Om appen är öppen skickar servern ändringen direkt, så att jag ser bordet växa fram på skärmen.' },
      { icon: 'Puzzle', title: 'Tappar som alltid passar', text: 'Välj en sarg och benet den ska sitta i. Bygg räknar ut tappen med snickarnas tumregel och skär ut ett hål med exakt samma form i benet.' },
      { icon: 'LayoutGrid', title: 'Sågplan för en riktig såg', text: 'Bygg lägger ut delarna på brädor och skivor som går att köpa i Sverige. Planen räknar med sågsnittet och har bara raka snitt, så den går att följa på en bordssåg.' },
      { icon: 'FileText', title: 'Ritningar att skriva ut', text: 'Bygg gör ritningar av modellen: hela möbeln, en sprängskiss och ett blad per del med alla mått. Skriv ut, så stämmer skalan.' },
      { icon: 'TreePine', title: 'Trä från riktiga foton', text: 'Träslagen bygger på riktiga foton. Ett skript tar bort ljuset från fotot och gör ådringen till en liten relief i ytan. Ändträet blir mörkare.' },
      { icon: 'GitMerge', title: 'Ingenting skrivs över', text: 'Har jag ändrat samma modell på två enheter utan nät, sparas båda versionerna. Ingen ändring försvinner.' },
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind', 'WebXR', 'WebAssembly', 'Hono', 'PWA', 'Docker'],
    live: { href: 'https://bygg.larsabrasha.com', label: 'Öppna Bygg' },
    code: 'https://github.com/larsabrasha/bygg',
    accent: '#9a6232',
    accentDark: '#d9a46a',
    soft: '#ece3d6',
    softDark: '#2b241d',
    shots: [
      { src: '/bilder/bygg/01-start.webp', width: 2560, height: 1600, frame: 'browser', caption: 'Startsidan, med ett bord ritat i Bygg' },
      { src: '/bilder/bygg/02-app-dator.webp', width: 2000, height: 1250, frame: 'browser', caption: 'Modellen och egenskaperna för den valda delen' },
      { src: '/bilder/bygg/03-app-mobil.webp', width: 780, height: 1688, frame: 'phone', caption: 'Samma modell i mobilen' },
    ],
  },
  {
    id: 'praliner',
    name: 'Praliner',
    headline: 'Praliner du kan snurra.',
    line: 'Beställ från Madde, och spela labyrint med en kompis medan du väntar.',
    summary:
      'Beställningssidan för Maddes praliner. Man väljer smaker, ser priset direkt och skickar beställningen. Pralinerna är ritade i 3D, går att snurra och ställa på bordet med AR, och det finns en labyrint som man kan spela två.',
    about: [
      'Madde gör praliner för hand och behövde ett sätt att ta emot beställningar. Man väljer minst fyra av varje smak, och totalen fyller askar om 8 och 12. Priset räknas ut medan man väljer. Betalningen sker vid sidan av sajten, och Madde bockar av den på en adminsida.',
      'Utseendet bygger på hennes affisch. Pralinerna är inga foton. De ritas i 3D i webbläsaren, och mönstren är gjorda för att likna de riktiga.',
      'Jag kunde inte låta bli att lägga till ett memory, en labyrint och ett läge där man målar en egen pralin och delar den med en länk. Madde kan också ändra sortiment och priser genom att prata med Claude eller ChatGPT. Sajten har en MCP-server för det.',
    ],
    cool: [
      { icon: 'Users', title: 'Labyrint för två', text: 'Pralinlabyrinten är ett 3D-spel där man letar praliner, själv eller med en kompis. Man bjuder in med en kod eller en länk, och sedan pratar telefonerna direkt med varandra. Fler kan titta på.' },
      { icon: 'Box', title: 'En pralin på ditt bord', text: 'På iPhone kan man ställa en pralin i verklig storlek på bordet. Det fungerar även med en pralin man har målat själv.' },
      { icon: 'Rotate3d', title: 'Snurra och luta', text: 'Dra i pralinen för att snurra den. Släpper man med fart snurrar den vidare. Med "Luta" följer ljuset hur man håller telefonen, så att reflexerna glider över chokladen.' },
      { icon: 'Search', title: 'Hemlig pralinjakt', text: 'Tolv praliner är gömda i butiken. Man hittar dem till exempel genom att trycka på bokstäverna i PRALINER, snurra en pralin tio varv eller skaka telefonen.' },
      { icon: 'MessageCircle', title: 'Butiken i en AI-chatt', text: 'Madde kan skriva "Hallonkolan är slut" till Claude eller ChatGPT, så uppdateras butiken. AI:n visar ändringen först, och allt går att ångra.' },
      { icon: 'Paintbrush', title: 'Måla och dela', text: 'Välj choklad, färg och fyllning och tryck för att stänka. Hela pralinen sparas i länken, och i Messenger och iMessage syns en bild av just den pralinen.' },
      { icon: 'Map', title: 'Ett helt äventyr', text: 'Fem banor ligger på en världskarta. Den sista är en pralinask som låses upp när de fyra andra är klara. Klarar man den blir det fyrverkeri och eftertexter, och telefonen vibrerar när man plockar upp något.' },
      { icon: 'Code', title: 'Ritade av kod', text: 'Pralinerna är inte modellerade för hand. Formen är en matematisk kurva som snurras runt, som på en svarv, och mönstren målas av kod.' },
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind', 'WebRTC', 'Cloudflare Workers', 'D1', 'MCP'],
    live: { href: 'https://praliner.larsabrasha.com', label: 'Öppna butiken' },
    accent: '#5b3526',
    accentDark: '#e0b393',
    soft: '#f6e6d7',
    softDark: '#2c1d16',
    trio: {
      title: 'Två spelar, en tittar på',
      text: 'Samma bana, samma sekund. Nötis och Hallonet letar praliner tillsammans, den ena på iPad och den andra på iPhone. Enheterna pratar direkt med varandra.',
      shots: [
        { src: '/bilder/praliner/07-labyrint-spelare1.webp', width: 780, height: 1688, frame: 'phone', caption: 'Spelare 1 på iPhone' },
        { src: '/bilder/praliner/08-labyrint-spelare2.webp', width: 2360, height: 1640, frame: 'tablet', caption: 'Spelare 2 på iPad' },
        { src: '/bilder/praliner/09-labyrint-tittare.webp', width: 2880, height: 1800, frame: 'browser', caption: 'Den som tittar på ser hela banan ovanifrån, till exempel på en Mac, och kan följa en spelare i taget.' },
      ],
    },
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
    headline: 'Lär dig piano, i din takt.',
    line: 'Spela på ett vanligt piano. Appen lyssnar och hjälper dig.',
    summary:
      'Jag håller på att lära mig spela piano och byggde en app för det. Den fungerar med MIDI-piano, mikrofon eller datorns tangentbord.',
    about: [
      'Appen har inga streaks, poäng eller nivåer att låsa upp. Man övar en stund när man har lust och får stjärnor som visar hur det gick. Allt är öppet från början.',
      'Det finns fyra kurser, ungefär som böckerna i en pianoskola: komma igång med mitt-C, kompa till sång, melodi och noter, och att spela efter gehör. Man kan också lägga in en egen MIDI-fil eller ett ackordschema. Då letar appen upp tonart, ackord och fraser och gör lektioner av låten, först en hand i taget och långsamt.',
      'Med ett vanligt akustiskt piano lyssnar appen genom mikrofonen. Efter ett försök visar den vilka takter som var svårast och låter en öva bara dem, lite långsammare, tills de går tre gånger i rad.',
    ],
    cool: [
      { icon: 'Piano', title: 'Styr appen med pianot', text: 'Man kan styra appen utan att röra datorn. Ett ackord öppnar en sida, till exempel C för Idag och Dm för Kurser. Pedalen betyder OK, och lägger man hela handen på tangenterna pausar appen.' },
      { icon: 'Mic', title: 'Hör ett vanligt piano', text: 'Utan MIDI-kabel lyssnar appen genom mikrofonen och hör både toner och ackord. Tonigenkänningen är skriven från grunden, utan färdigt bibliotek.' },
      { icon: 'Camera', title: 'Noter från ett foto', text: 'Med en Claude-skill blir ett foto av ett notblad en låt i appen. Noterna blir gröna eller röda när man spelar, och i läget Utantill bleknar de bort.' },
      { icon: 'ListMusic', title: 'Låtar blir lektioner', text: 'Ge appen en MIDI-fil, ett ackordschema eller noter, eller spela in låten själv. Appen hittar tonart, ackord och fraser som upprepas, och gör lektioner av låten.' },
      { icon: 'Hand', title: 'Fingersättning som en lärare', text: 'Appen räknar ut vilket finger som ska ta varje ton, med tabeller från pianoskolor och en modell från forskningen. I Diabellis Op. 149 stämmer 84 % av fingrarna med den tryckta utgåvan.' },
      { icon: 'AudioLines', title: 'Vet vad som är du', text: 'När appen spelar med måste den veta vilka toner som är dina. En ton räknas bara om den hörs tydligt över appens eget ljud.' },
      { icon: 'SlidersHorizontal', title: 'Lär sig ditt piano', text: 'En kort kalibrering lyssnar på rummet och pianot, gärna tangent för tangent. Sedan visar appen vilka tangenter som är ostämda.' },
      { icon: 'Repeat', title: 'Övar det som är svårt', text: 'Efter ett försök övar appen på takterna som gick sämst, lite långsammare, tills de går rent tre gånger i rad. Gamla låtar dyker upp igen ibland, så att man inte glömmer dem.' },
      { icon: 'WifiOff', title: 'En flygel som fungerar offline', text: 'Ljudet är en inspelad flygel, och appen fungerar utan nät efter första besöket. Svarstiden testas automatiskt, även på en långsam dator.' },
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
    headline: 'Sångtexterna på storbild.',
    line: 'Gratis för kyrkor. Styr från mobilen.',
    summary:
      'Ett presentationsprogram för kyrkor, för sångtexter och bibelord under gudstjänsten. Det är gratis och öppen källkod.',
    about: [
      'Gospel Presenter är till för den som sitter vid datorn under gudstjänsten och visar texterna. Jag har försökt hålla det enkelt och bara ta med det som behövs en vanlig söndag.',
      'En presentation kan blanda sånger, bibeltexter, bilder och slides från PowerPoint eller PDF. Den visas på projektorn och kan styras från mobilen. Ändringar syns direkt på alla anslutna skärmar. Den som leder lovsången har ett eget scenläge som också visar nästa bild.',
      'Sångerna ligger i ett bibliotek med versionshistorik och kan importeras från ProPresenter. Appen sparar också vilka sånger som visats, vilket gör CCLI-rapporten enklare.',
    ],
    cool: [
      { icon: 'Smartphone', title: 'Sångtexten i mobilen', text: 'Vem som helst i kyrkan kan skanna en QR-kod och följa texten i mobilen, utan konto. Det fungerar även när en hel församling är på samma wifi.' },
      { icon: 'MonitorSmartphone', title: 'Mobilen som fjärrkontroll', text: 'Styr presentationen från mobilen, och koppla in en projektor med en kod på sex tecken. Mobilen säger alltid exakt vart man ska, till exempel "sång 2, del 3", aldrig bara "nästa".' },
      { icon: 'WifiOff', title: 'Klarar att nätet dör', text: 'Datorprogrammet har en egen databas och synkar när nätet finns. Om routern startar om mitt i gudstjänsten händer ingenting på skärmen.' },
      { icon: 'BookOpen', title: 'Bibeln på ett ögonblick', text: 'Skriv "Matt 3:15-4:6" eller bara "ma", så kommer verserna upp. Sökningen förstår svenska boknamn och avsnitt som går över kapitelgränser.' },
      { icon: 'ClipboardCheck', title: 'CCLI-rapporten fyller sig själv', text: 'Varje sång som visas sparas för kyrkans licensrapport, även när nätet är borta. Den skickas senare, med rätt datum och utan att räknas två gånger.' },
      { icon: 'FileInput', title: 'Läser ProPresenter-filer', text: 'Sånger från ProPresenter 7 läses direkt ur deras filer, med text och CCLI-uppgifter. PowerPoint och PDF blir bilder i presentationen.' },
      { icon: 'Projector', title: 'Hittar projektorn själv', text: 'Datorprogrammet öppnar bilden direkt på projektorn. Först provades Mac Catalyst, men den såg bara en skärm. Därför blev det Electron.' },
      { icon: 'Images', title: 'Bilderna tas automatiskt', text: 'Ett verktyg tar skärmdumpar på svenska och engelska, i ljust och mörkt läge och i olika storlekar. Bilderna här kommer därifrån.' },
    ],
    tech: ['C#', '.NET', 'Blazor', 'SignalR', 'Electron', 'PostgreSQL', 'Tailwind', '.NET Aspire'],
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
    headline: 'Träningsloggen som klarar sig utan nät.',
    line: 'Logga passen i gymmet, även utan täckning.',
    summary:
      'Här loggar jag mina gympass. Appen ligger på hemskärmen i telefonen och fungerar utan nät.',
    about: [
      'Tidigare loggade jag träningen i ett Numbers-dokument, vilket var klumpigt att fylla i mellan seten. Kropp är en webbapp som jag har lagt på hemskärmen, och den ska kännas som en vanlig iPhone-app.',
      'Allt sparas först i telefonen och synkas med min server när det finns nät, så täckningen i gymmet spelar ingen roll. Jag planerar nästa pass från en mall, bockar av seten och kan se hur vikterna har utvecklats.',
      'Första versionen var skriven i Blazor och .NET. Sedan skrev jag om den i React och TypeScript. Datamodellen är densamma, så de gamla passen följde med.',
    ],
    cool: [
      { icon: 'PartyPopper', title: 'Bara beröm', text: 'Appen räknar det man har gjort, aldrig det man har missat. Inga streaks bryts. Den firar första passet, jämna tal och veckans mål, och välkomnar den som kommer tillbaka efter ett uppehåll.' },
      { icon: 'WifiOff', title: 'Nätet är valfritt', text: 'Allt sparas först i telefonen och skickas när det finns nät. Ett helt pass skickas på en gång, så det blir aldrig halvsparat.' },
      { icon: 'Smartphone', title: 'Känns som iOS', text: 'Knapparna ser ut som glas, och sidorna glider in och ut som i en iPhone-app. Man drar ner ark för att stänga dem och sveper bort rader. Inget UI-bibliotek används.' },
      { icon: 'ChartLine', title: 'Grafer som i Hälsa', text: 'Graferna fungerar som i Apples Hälsa-app. Dra fingret över grafen, så syns värdet stort ovanför.' },
      { icon: 'Dumbbell', title: '302 övningar med bild', text: 'Varje övning kan ha en teckning, utvald för att synas bra även i liten storlek. Ett pass hämtar sina bilder i förväg, så de finns i gymmet utan nät.' },
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

export interface Extra {
  name: string
  /** A lucide icon, see src/pages.tsx. */
  icon: 'weight' | 'calculator' | 'disc' | 'thermometer'
  text: string
  href?: string
}

/** Smaller things, listed at the bottom of the start page. */
export const extras: Extra[] = [
  {
    name: 'Smartvåg av en Wii-bräda',
    icon: 'weight',
    text: 'En Raspberry Pi läser de fyra lastcellerna i en Wii Balance Board, väntar tills man står still och skickar vikten till Home Assistant.',
    href: 'https://github.com/larsabrasha/body-stats',
  },
  {
    name: 'FAST9 för TI-84',
    icon: 'calculator',
    text: 'Ett spel i Z80-assembler för grafräknaren: skriv 1+2+3+4+5+6+7+8+9 så fort du kan. Topplistan överlever till och med att batterierna tas ur.',
    href: 'https://github.com/larsabrasha/fast9',
  },
  {
    name: 'Musik med RFID-kort',
    icon: 'disc',
    text: 'Lägg ett kort med ett skivomslag på läsaren, så börjar skivan spela. Korten skrivs ut från en PDF med omslagen, och en skärm visar vad som spelas.',
    href: 'https://github.com/larsabrasha/volumio-controller',
  },
  {
    name: 'Sensorer i huset',
    icon: 'thermometer',
    text: 'Små ESP32-enheter i garaget, verkstaden, källaren och andra rum, med temperatur, luftfuktighet och små skärmar, alla kopplade till Home Assistant.',
    href: 'https://github.com/larsabrasha/esphome',
  },
]
