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
  /** The start page: a short headline and one line under it. */
  headline: string
  line: string
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
    headline: 'Se möbeln innan du sågar.',
    line: 'Rita i 3D, få kaplistan och ställ möbeln i rummet med AR.',
    summary:
      'Jag snickrar en del och ville se möbeln innan jag sågar. I Bygg ritar jag delarna i 3D, får ut en kaplista och kan ställa möbeln i rummet med AR innan jag sågar.',
    about: [
      'Varje del börjar som en rektangel som man drar upp till en bräda. Man kan välja träslag och se möbeln med ådring och skuggor. Det är oftast då jag märker att något är för tjockt eller sitter fel.',
      'Ur modellen räknar Bygg fram kaplistan och en sågplan, alltså hur delarna kan placeras på brädorna. Modellerna sparas i webbläsaren och synkas med en server jag kör själv, så appen fungerar även utan nät.',
      'Det finns också ett kommandoradsverktyg, mest för att Claude ska kunna rita åt mig. Har jag appen öppen samtidigt ser jag ändringarna dyka upp direkt.',
    ],
    highlights: [
      'Ställ möbeln i rummet med AR, eller gå runt den i VR',
      'Tappar och tapphål räknas ut och skärs automatiskt',
      'Sågplan med svenska virkesmått, som går att följa på en bordssåg',
      'Ritningar som PDF i rätt skala',
      'Claude kan rita möbler åt mig via ett CLI',
    ],
    cool: [
      { title: 'Ställ möbeln i rummet', text: 'På iPhone och iPad kan man placera möbeln i verklig storlek i sitt eget rum med AR. Appen gör om modellen till en 3D-fil som Apples AR-visare öppnar, med träet och tapparna på plats. Då ser man direkt om bordet får plats.' },
      { title: 'Gå runt den i VR', text: 'Med ett VR-headset står man bredvid möbeln i skala 1:1. Man går med styrspaken och har en meny med sifferknappar som svävar i luften.' },
      { title: 'Tappar som alltid passar', text: 'Välj en sarg och benet den ska sitta i, så räknar Bygg ut tappen efter snickarnas tumregel, en tredjedel av virkets tjocklek. Tappen läggs på den ena delen och skärs ut ur den andra med exakt samma form. Själva utskärningen görs av en geometrimotor i WebAssembly.' },
      { title: 'Sågplan för en riktig såg', text: 'Delarna packas på brädor och skivor i mått man kan köpa i Sverige. Planen tar hänsyn till 3 mm sågsnitt och fiberriktning, och den består bara av raka genomgående snitt, så att den går att följa på en bordssåg.' },
      { title: 'Ritningar att skriva ut', text: 'Ur modellen blir det riktiga ritningsblad: huvudvyer, en sprängskiss med numrerade delar och ett blad per del med mått. PDF:en byggs i webbläsaren med ett A4 per blad, så att skalan stämmer på papperet.' },
      { title: 'Trä från riktiga foton', text: 'Ek, furu, björk och de andra träslagen bygger på foton. Ett skript tvättar bort ljuset, färgar om dem och räknar fram ådringen som en relief i ytan. Ändträet blir mörkare, precis som på riktigt.' },
      { title: 'Claude som snickare', text: 'Med kommandoradsverktyget kan Claude rita åt mig, till exempel "gör ett bord 120 × 80". Om appen är öppen skickar servern ändringen direkt, så att jag ser bordet växa fram på skärmen.' },
      { title: 'Ingenting skrivs över', text: 'Har jag ändrat samma modell på två enheter utan nät sparas båda versionerna, den ena som en konfliktkopia. Inget försvinner i tysthet.' },
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
      { src: '/bilder/bygg/03-app-mobil.webp', width: 700, height: 1515, frame: 'phone', caption: 'Samma modell i mobilen' },
    ],
  },
  {
    id: 'praliner',
    name: 'Praliner',
    kicker: 'Webbshop',
    title: 'Made by Madde',
    headline: 'Praliner du kan snurra.',
    line: 'Beställ från Madde, och spela labyrint med en kompis medan du väntar.',
    summary:
      'Beställningssidan för Maddes praliner. Man väljer smaker, ser priset direkt och skickar beställningen. Pralinerna är ritade i 3D, går att snurra och ställa på bordet med AR, och det finns en labyrint som man kan spela två.',
    about: [
      'Madde gör praliner för hand och behövde ett sätt att ta emot beställningar. Man väljer minst fyra av varje smak, och totalen fyller askar om 8 och 12. Priset räknas ut medan man väljer. Betalningen sker vid sidan av sajten, och Madde bockar av den på en adminsida.',
      'Utseendet bygger på hennes affisch. Pralinerna är inga foton. De ritas i 3D i webbläsaren, och mönstren är gjorda för att likna de riktiga.',
      'Jag kunde inte låta bli att lägga till ett memory, en labyrint och ett läge där man målar en egen pralin och delar den med en länk. Madde kan också ändra sortiment och priser genom att prata med Claude eller ChatGPT. Sajten har en MCP-server för det.',
    ],
    highlights: [
      'Labyrint för två spelare, telefon mot telefon',
      'Ställ en pralin på bordet med AR',
      'Praliner ritade av kod, som går att snurra och luta',
      'Madde sköter butiken genom att chatta med Claude eller ChatGPT',
      'Tolv hemliga praliner att leta efter',
    ],
    cool: [
      { title: 'Labyrint för två', text: 'Pralinlabyrinten är ett 3D-spel där man letar praliner, ensam eller två tillsammans. Man bjuder in med en kod, en QR-kod eller en länk, och telefonerna pratar sedan direkt med varandra över WebRTC. Servern hjälper bara till att koppla ihop dem, och fler kan titta på.' },
      { title: 'Ett helt äventyr', text: 'Det finns fem banor på en världskarta. Den stora banan är en pralinask som låses upp när de fyra små är klarade: kedjorna faller och hänglåset går upp. Klarar man den blir det fyrverkeri, fanfar och eftertexter. Ljudet görs i webbläsaren, och telefonen vibrerar när man plockar upp något.' },
      { title: 'En pralin på ditt bord', text: 'På iPhone kan man ställa en pralin i verklig storlek på bordet med AR. 3D-filen tillverkas direkt i webbläsaren av samma form och mönster, så det fungerar även med en pralin man har målat själv.' },
      { title: 'Snurra och luta', text: 'Man kan dra i pralinen för att snurra den åt alla håll, och släpper man med fart snurrar den vidare. Med "Luta" följer ljuset hur man håller telefonen, så att reflexerna glider över chokladen som om man höll pralinen i handen.' },
      { title: 'Ritade av kod', text: 'Pralinerna är inga 3D-modeller gjorda för hand. Formen är en matematisk kurva som snurras runt en axel, som på en svarv. Mönster och stänk målas av kod i en bakgrundstråd, så att sidan inte hackar.' },
      { title: 'Måla och dela', text: 'Man väljer choklad, färg och fyllning och trycker för att stänka. Hela pralinen sparas i länken, och delar man den i Messenger eller iMessage syns en bild av just den pralinen.' },
      { title: 'Hemlig pralinjakt', text: 'Tolv praliner är gömda i butiken. De hittas genom att till exempel trycka på bokstäverna i PRALINER, snurra en pralin tio varv eller skaka telefonen. Hittar man alla syns det på beställningen som Madde får.' },
      { title: 'Butiken i en AI-chatt', text: 'Madde kan skriva "Hallonkolan är slut" till Claude eller ChatGPT, även i mobilen, och butiken uppdateras. Det går via en egen MCP-server med inloggning. AI:n visar ändringen först, och allt går att ångra i historiken.' },
    ],
    tech: ['React', 'Three.js', 'TypeScript', 'Tailwind', 'WebRTC', 'Cloudflare Workers', 'D1', 'MCP'],
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
    headline: 'Lär dig piano, i din takt.',
    line: 'Spela på ett vanligt piano. Appen lyssnar och hjälper dig.',
    summary:
      'Jag håller på att lära mig spela piano och byggde en app för det. Den fungerar med MIDI-piano, mikrofon eller datorns tangentbord.',
    about: [
      'Appen har inga streaks, poäng eller nivåer att låsa upp. Man övar en stund när man har lust och får stjärnor som visar hur det gick. Allt är öppet från början.',
      'Det finns fyra kurser, ungefär som böckerna i en pianoskola: komma igång med mitt-C, kompa till sång, melodi och noter, och att spela efter gehör. Man kan också lägga in en egen MIDI-fil eller ett ackordschema. Då letar appen upp tonart, ackord och fraser och gör lektioner av låten, först en hand i taget och långsamt.',
      'Med ett vanligt akustiskt piano lyssnar appen genom mikrofonen. Efter ett försök visar den vilka takter som var svårast och låter en öva bara dem, lite långsammare, tills de går tre gånger i rad.',
    ],
    highlights: [
      'Styr appen från pianot, med ackord som meny',
      'Lyssnar på ett vanligt piano och lär sig dess stämning',
      'MIDI-filer, ackordscheman och notfoton blir lektioner',
      'Fingersättning som stämmer till 84 % med Diabelli',
      'Inga streaks eller poäng att jaga',
    ],
    cool: [
      { title: 'Hör ett vanligt piano', text: 'Utan MIDI-kabel lyssnar appen genom mikrofonen och hör både enstaka toner och ackord. Tonigenkänningen är skriven från grunden för pianot, utan något färdigt bibliotek.' },
      { title: 'Lär sig ditt piano', text: 'En kort kalibrering mäter rummets brus, pianots stämning och, om man vill, varje tangent för sig. Sedan ritar appen en klaviatur som visar vilka tangenter som är ostämda. Den räknar också med att riktiga pianosträngar har övertoner som inte är helt rena.' },
      { title: 'Skiljer dig från sig själv', text: 'När appen spelar med måste den veta vilka toner som är dina. Den vet vad den själv spelar och när, och en ton räknas bara om den hörs tydligt starkare än appens ljud.' },
      { title: 'Styr appen med pianot', text: 'Man kan navigera utan att röra datorn. Vita tangenter betyder OK eller tillbaka, och ett ackord öppnar en sida: C är Idag, Dm är Kurser. Pedalen är OK och pitch bend ändrar tempot. Lägger man hela handflatan på tangenterna pausar appen.' },
      { title: 'Fingersättning som en lärare', text: 'Appen räknar ut vilket finger som ska ta varje ton. Den utgår från tabeller ur pianoskolor och använder annars en modell från forskningen. Mot Diabellis Op. 149 stämmer 84 % av fingrarna med den tryckta utgåvan.' },
      { title: 'Låtar blir lektioner', text: 'Ge appen en MIDI-fil, ett ackordschema eller noter, eller spela in låten själv. Den hittar tonarten med en metod från musikpsykologin, letar upp ackord och fraser som upprepas och bygger lektioner. För ackord väljer den grepp där handen behöver flytta sig så lite som möjligt.' },
      { title: 'Noter från ett foto', text: 'Med en Claude-skill kan ett foto eller en PDF av ett notblad bli en låt i appen. Noterna blir gröna eller röda när man spelar, och i läget Utantill bleknar de bort.' },
      { title: 'Övar det som är svårt', text: 'Efter ett försök loopar appen de takter som gick sämst, lite långsammare, tills de går rent tre gånger i rad. På startsidan dyker gamla låtar upp för repetition med jämna mellanrum.' },
      { title: 'En flygel som fungerar offline', text: 'Ljudet är en samplad flygel. Efter första besöket fungerar appen helt utan nät. Svarstiden mäts automatiskt, även på en dator som är bromsad till en sjättedel av farten, och målet är att återkopplingen kommer inom en bildruta.' },
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
    headline: 'Sångtexterna på storbild.',
    line: 'Gratis för kyrkor. Styr från mobilen.',
    summary:
      'Ett presentationsprogram för kyrkor, för sångtexter och bibelord under gudstjänsten. Det är gratis och öppen källkod.',
    about: [
      'Gospel Presenter är till för den som sitter vid datorn under gudstjänsten och visar texterna. Jag har försökt hålla det enkelt och bara ta med det som behövs en vanlig söndag.',
      'En presentation kan blanda sånger, bibeltexter, bilder och slides från PowerPoint eller PDF. Den visas på projektorn och kan styras från mobilen. Ändringar syns direkt på alla anslutna skärmar. Den som leder lovsången har ett eget scenläge som också visar nästa bild.',
      'Sångerna ligger i ett bibliotek med versionshistorik och kan importeras från ProPresenter. Appen sparar också vilka sånger som visats, vilket gör CCLI-rapporten enklare.',
    ],
    highlights: [
      'Församlingen följer sångtexten i mobilen via en QR-kod',
      'Styr presentationen från mobilen',
      'Datorprogrammet fortsätter som vanligt om nätet dör mitt i gudstjänsten',
      'Läser ProPresenter-filer direkt',
      'CCLI-rapporten fyller sig själv',
    ],
    cool: [
      { title: 'Sångtexten i mobilen', text: 'Vem som helst i kyrkan kan skanna en QR-kod och följa texten i mobilen, utan konto. Sidan är byggd för att en hel församling på samma wifi ska fungera, även när telefonerna släcker skärmen och kopplar upp sig igen.' },
      { title: 'Mobilen som fjärrkontroll', text: 'Presentationen kan styras från mobilen, och en projektor ansluts med en kod på sex tecken. Kommandona säger alltid exakt var man ska vara, till exempel "sång 2, del 3" och aldrig bara "nästa". Ett meddelande som kommer fram två gånger hamnar då ändå rätt.' },
      { title: 'Klarar att nätet dör', text: 'Datorprogrammet har en egen databas och synkar när nätet finns. Om routern startar om mitt i gudstjänsten händer ingenting på skärmen.' },
      { title: 'Hittar projektorn själv', text: 'Programmet för datorn är samma Blazor-gränssnitt i Electron. Bilden till projektorn öppnas direkt på den andra skärmen. Först byggdes en Mac Catalyst-version, men den visade sig bara se en skärm, och därför blev det Electron.' },
      { title: 'Läser ProPresenter-filer', text: 'Sånger från ProPresenter 7 läses direkt ur deras binära filformat, med text och CCLI-uppgifter. PowerPoint görs om till PDF, och varje sida i en PDF blir en bild i presentationen.' },
      { title: 'CCLI-rapporten fyller sig själv', text: 'Varje sång som visas loggas automatiskt för kyrkans licensrapport. Det gäller även sånger som visas utan nät: de sparas med rätt datum och skickas senare utan att räknas två gånger.' },
      { title: 'Bibeln på ett ögonblick', text: 'Skriv "Matt 3:15-4:6" eller bara "ma", så kommer verserna upp. Sökningen förstår svenska boknamn och avsnitt som går över kapitelgränser.' },
      { title: 'Skärmdumpar på löpande band', text: 'Ett verktyg tar skärmdumpar av varje kombination av språk, ljust och mörkt läge och skärmstorlek till webbplatsen. Det är samma bilder som syns här.' },
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
    kicker: 'Hälsologg',
    title: 'Min träningslogg',
    headline: 'Träningsloggen som klarar sig utan nät.',
    line: 'Logga passen i gymmet, även utan täckning.',
    summary:
      'Här loggar jag mina gympass. Appen ligger på hemskärmen i telefonen och fungerar utan nät.',
    about: [
      'Tidigare loggade jag träningen i ett Numbers-dokument, vilket var klumpigt att fylla i mellan seten. Kropp är en webbapp som jag har lagt på hemskärmen, och den ska kännas som en vanlig iPhone-app.',
      'Allt sparas först i telefonen och synkas med min server när det finns nät, så täckningen i gymmet spelar ingen roll. Jag planerar nästa pass från en mall, bockar av seten och kan se hur vikterna har utvecklats.',
      'Första versionen var skriven i Blazor och .NET. Sedan skrev jag om den i React och TypeScript. Datamodellen är densamma, så de gamla passen följde med.',
    ],
    highlights: [
      'Fungerar helt utan nät och synkar i bakgrunden',
      'Bara beröm, inga streaks som bryts',
      'Känns som en iPhone-app, utan UI-bibliotek',
      '302 övningar med bild, som finns kvar offline',
    ],
    cool: [
      { title: 'Nätet är valfritt', text: 'Allt sparas först i telefonen, och ändringar väntar i en utkorg tills det finns nät. Ett helt pass skickas som en enhet, så det blir aldrig halvsparat. Ett automatiskt test visar att appen startar, sparar och laddar om helt utan nät.' },
      { title: 'Bara beröm', text: 'Appen räknar det man har gjort, aldrig det man har missat. Det finns inga streaks som bryts och inget rött för en tom vecka. Den firar första passet, jämna tal och veckans mål, och den som kommer tillbaka efter ett uppehåll blir välkomnad.' },
      { title: 'Känns som iOS', text: 'Knapparna är som glas som flyter över sidan, och sidor glider in och ut som i en iPhone-app. Man stänger ark genom att dra ner dem och sveper bort rader i listor. Inget UI-bibliotek används, allt är skrivet från grunden.' },
      { title: 'Grafer som i Hälsa', text: 'Graferna är byggda utan bibliotek men fungerar som i Apples Hälsa-app. Man drar fingret över grafen och ser värdet stort ovanför.' },
      { title: '302 övningar med bild', text: 'Varje övning kan ha en teckning. Av tre varianter per övning visas den som syns tydligast i liten storlek, och det valdes genom att mäta alla 906 bilder. Ett pass hämtar sina bilder i förväg, så att de finns i gymmet utan nät.' },
      { title: 'Gamla data är heliga', text: 'Tester låser databasen, synkformatet och exportfilen, även det som den gamla Blazor-versionen skrev. Regeln är att när ett sådant test går sönder ändrar man tillbaka koden, inte testet.' },
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
  text: string
  href?: string
}

/** Smaller things, listed at the bottom of the start page. */
export const extras: Extra[] = [
  {
    name: 'Smartvåg av en Wii-bräda',
    text: 'En Raspberry Pi läser de fyra lastcellerna i en Wii Balance Board, väntar tills man står still och skickar vikten till Home Assistant.',
    href: 'https://github.com/larsabrasha/body-stats',
  },
  {
    name: 'FAST9 för TI-84',
    text: 'Ett spel i Z80-assembler för grafräknaren: skriv 1+2+3+4+5+6+7+8+9 så fort du kan. Topplistan överlever till och med att batterierna tas ur.',
    href: 'https://github.com/larsabrasha/fast9',
  },
  {
    name: 'Musik med RFID-kort',
    text: 'Lägg ett kort med ett skivomslag på läsaren, så börjar skivan spela. Korten skrivs ut från en PDF med omslagen, och en skärm visar vad som spelas.',
    href: 'https://github.com/larsabrasha/volumio-controller',
  },
  {
    name: 'Sensorer i huset',
    text: 'Små ESP32-enheter i garaget, verkstaden, källaren och andra rum, med temperatur, luftfuktighet och små skärmar, alla kopplade till Home Assistant.',
    href: 'https://github.com/larsabrasha/esphome',
  },
]
