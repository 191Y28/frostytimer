import { GameItem } from '../types/index';

// Auto-generated UGS SingleFile 2,823 Unique Games Catalog
export interface UgsGame {
  file: string;
  title: string;
  char: string;
}

export function detectGenre(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('run') || t.includes('dash') || t.includes('jump') || t.includes('mario') || t.includes('sonic') || t.includes('platform')) return 'Platformer';
  if (t.includes('shoot') || t.includes('gun') || t.includes('sniper') || t.includes('bullet') || t.includes('strike') || t.includes('combat') || t.includes('war')) return 'Shooter';
  if (t.includes('fight') || t.includes('box') || t.includes('smash') || t.includes('battle')) return 'Fighting';
  if (t.includes('puzzle') || t.includes('maze') || t.includes('escape') || t.includes('2048') || t.includes('chess') || t.includes('block')) return 'Puzzle';
  if (t.includes('race') || t.includes('car') || t.includes('drift') || t.includes('moto') || t.includes('bike') || t.includes('speed') || t.includes('kart')) return 'Racing';
  if (t.includes('soccer') || t.includes('football') || t.includes('basketball') || t.includes('tennis') || t.includes('golf') || t.includes('pool') || t.includes('baseball')) return 'Sports';
  if (t.includes('rpg') || t.includes('quest') || t.includes('dungeon') || t.includes('zelda') || t.includes('pokemon') || t.includes('adventure')) return 'Adventure';
  if (t.includes('idle') || t.includes('clicker') || t.includes('tycoon') || t.includes('simulator')) return 'Simulation';
  return 'Arcade';
}

const THEMES: ('aurora' | 'iceberg' | 'frostbite' | 'permafrost')[] = [
  'aurora', 'iceberg', 'frostbite', 'permafrost'
];

export const BOXING_PHYSICS_GAME: GameItem = {
  id: 'default_boxing_physics',
  title: 'Boxing Physics 2D',
  type: 'html',
  coverTheme: 'aurora',
  category: 'Fighting',
  genre: 'Fighting',
  ranking: 9.3,
  healthScore: 100,
  fileSize: 51200,
  addedAt: 1727500000000,
  isFavorite: true,
  detectedEngine: 'Vanilla HTML5 Physics',
  isEliteProtected: true,
  driveUrl: '',
};

export function getUgsGameItems(): GameItem[] {
  const items: GameItem[] = [
    BOXING_PHYSICS_GAME,
    ...UGS_GAMES.map((g, idx) => {
      const genre = detectGenre(g.title);
      return {
        id: g.file,
        title: g.title,
        fileName: g.file,
        type: 'html' as const,
        coverTheme: THEMES[idx % 4],
        fileSize: 1024 * 80,
        addedAt: 1727500000000 - idx * 1000,
        genre,
        category: genre,
        healthScore: 100,
        ranking: Number((8.2 + (idx % 18) * 0.1).toFixed(1)),
        detectedEngine: 'HTML5 Standalone',
        isEliteProtected: true,
        driveUrl: '',
      };
    }),
  ];
  return items;
}

export const UGS_GAMES: UgsGame[] = [
  {
    "file": "cl1",
    "title": "1",
    "char": "1"
  },
  {
    "file": "cl100RoomsOfEnemies",
    "title": "100 Rooms Of Enemies",
    "char": "1"
  },
  {
    "file": "cl10bullets",
    "title": "10 Bullets",
    "char": "1"
  },
  {
    "file": "cl10minutestildawn",
    "title": "10 Minutestildawn",
    "char": "1"
  },
  {
    "file": "cl10morebullets",
    "title": "10 Morebullets",
    "char": "1"
  },
  {
    "file": "cl12minibattles",
    "title": "12 Minibattles",
    "char": "1"
  },
  {
    "file": "cl13bones",
    "title": "13 Bones",
    "char": "1"
  },
  {
    "file": "cl1on1soccer",
    "title": "1 On 1 Soccer",
    "char": "1"
  },
  {
    "file": "cl1v1lol",
    "title": "1 V 1 Lol",
    "char": "1"
  },
  {
    "file": "cl1v1tennis",
    "title": "1 V 1 Tennis",
    "char": "1"
  },
  {
    "file": "cl2048",
    "title": "2048",
    "char": "2"
  },
  {
    "file": "cl2048cupcakes",
    "title": "2048 Cupcakes",
    "char": "2"
  },
  {
    "file": "cl20smallmazes",
    "title": "20 Smallmazes",
    "char": "2"
  },
  {
    "file": "cl234playergame",
    "title": "234 Playergame",
    "char": "2"
  },
  {
    "file": "cl2doom",
    "title": "2 Doom",
    "char": "2"
  },
  {
    "file": "cl2Dshooting",
    "title": "2 Dshooting",
    "char": "2"
  },
  {
    "file": "cl3dash",
    "title": "3 Dash",
    "char": "3"
  },
  {
    "file": "cl3dasheditor",
    "title": "3 Dasheditor",
    "char": "3"
  },
  {
    "file": "cl3dpinballspacecadet",
    "title": "3 Dpinballspacecadet",
    "char": "3"
  },
  {
    "file": "cl3pandas",
    "title": "3 Pandas",
    "char": "3"
  },
  {
    "file": "cl3pandasbrazil",
    "title": "3 Pandasbrazil",
    "char": "3"
  },
  {
    "file": "cl3pandasfantasy",
    "title": "3 Pandasfantasy",
    "char": "3"
  },
  {
    "file": "cl3pandasjapan",
    "title": "3 Pandasjapan",
    "char": "3"
  },
  {
    "file": "cl3pandasnight",
    "title": "3 Pandasnight",
    "char": "3"
  },
  {
    "file": "cl3slices2",
    "title": "3 Slices 2",
    "char": "3"
  },
  {
    "file": "cl40xescape",
    "title": "40 Xescape",
    "char": "4"
  },
  {
    "file": "cl4thandgoal",
    "title": "4 Thandgoal",
    "char": "4"
  },
  {
    "file": "cl500calibercontractz",
    "title": "500 Calibercontractz",
    "char": "5"
  },
  {
    "file": "cl60secondsburgerrun",
    "title": "60 Secondsburgerrun",
    "char": "6"
  },
  {
    "file": "cl60secondssantarun",
    "title": "60 Secondssantarun",
    "char": "6"
  },
  {
    "file": "cl64in1nes",
    "title": "64 In 1 Nes",
    "char": "6"
  },
  {
    "file": "cl8ballclassic",
    "title": "8 Ballclassic",
    "char": "8"
  },
  {
    "file": "cl8ballpool",
    "title": "8 Ballpool",
    "char": "8"
  },
  {
    "file": "cl9007199254740992",
    "title": "9007199254740992",
    "char": "9"
  },
  {
    "file": "cl90in1nes",
    "title": "90 In 1 Nes",
    "char": "9"
  },
  {
    "file": "cl99balls",
    "title": "99 Balls",
    "char": "9"
  },
  {
    "file": "cl99nightsitf",
    "title": "99 Nightsitf",
    "char": "9"
  },
  {
    "file": "clA Walk in The Forest (v10)",
    "title": "A Walk In The Forest (v 10)",
    "char": "A"
  },
  {
    "file": "clabandoned3",
    "title": "Abandoned 3",
    "char": "A"
  },
  {
    "file": "clabsolutemadness",
    "title": "Absolutemadness",
    "char": "A"
  },
  {
    "file": "clacecombat2",
    "title": "Acecombat 2",
    "char": "A"
  },
  {
    "file": "clacecombat3",
    "title": "Acecombat 3",
    "char": "A"
  },
  {
    "file": "clacegangstertaxi",
    "title": "Acegangstertaxi",
    "char": "A"
  },
  {
    "file": "clachievementunlocked",
    "title": "Achievementunlocked",
    "char": "A"
  },
  {
    "file": "clachievmentunlocked",
    "title": "Achievmentunlocked",
    "char": "A"
  },
  {
    "file": "clachievmentunlocked2",
    "title": "Achievmentunlocked 2",
    "char": "A"
  },
  {
    "file": "clachievmentunlocked3",
    "title": "Achievmentunlocked 3",
    "char": "A"
  },
  {
    "file": "clachillies",
    "title": "Achillies",
    "char": "A"
  },
  {
    "file": "clachillies2",
    "title": "Achillies 2",
    "char": "A"
  },
  {
    "file": "clAcko_s Mach Bike Challenge (v10)",
    "title": "Acko S Mach Bike Challenge (v 10)",
    "char": "A"
  },
  {
    "file": "clADarkRoom",
    "title": "ADark Room",
    "char": "A"
  },
  {
    "file": "cladatewithdeath",
    "title": "Adatewithdeath",
    "char": "A"
  },
  {
    "file": "cladayintheoffice",
    "title": "Adayintheoffice",
    "char": "A"
  },
  {
    "file": "clADOFAI",
    "title": "ADOFAI",
    "char": "A"
  },
  {
    "file": "cladvancewars",
    "title": "Advancewars",
    "char": "A"
  },
  {
    "file": "cladvancewars2",
    "title": "Advancewars 2",
    "char": "A"
  },
  {
    "file": "cladvancewarsdualstrike",
    "title": "Advancewarsdualstrike",
    "char": "A"
  },
  {
    "file": "cladventneon",
    "title": "Adventneon",
    "char": "A"
  },
  {
    "file": "clAdventureCapatalist",
    "title": "Adventure Capatalist",
    "char": "A"
  },
  {
    "file": "cladventurecapitalist",
    "title": "Adventurecapitalist",
    "char": "A"
  },
  {
    "file": "claflac",
    "title": "Aflac",
    "char": "A"
  },
  {
    "file": "claftertheweek",
    "title": "Aftertheweek",
    "char": "A"
  },
  {
    "file": "clagariolite",
    "title": "Agariolite",
    "char": "A"
  },
  {
    "file": "clageofwar",
    "title": "Ageofwar",
    "char": "A"
  },
  {
    "file": "clageofwar2",
    "title": "Ageofwar 2",
    "char": "A"
  },
  {
    "file": "clagesofconflict",
    "title": "Agesofconflict",
    "char": "A"
  },
  {
    "file": "clagesofempire",
    "title": "Agesofempire",
    "char": "A"
  },
  {
    "file": "clahoysurvival",
    "title": "Ahoysurvival",
    "char": "A"
  },
  {
    "file": "clai",
    "title": "Ai",
    "char": "A"
  },
  {
    "file": "clairlinetycoonidle",
    "title": "Airlinetycoonidle",
    "char": "A"
  },
  {
    "file": "clakoopasrevenge",
    "title": "Akoopasrevenge",
    "char": "A"
  },
  {
    "file": "clakoopasrevenge2",
    "title": "Akoopasrevenge 2",
    "char": "A"
  },
  {
    "file": "clakumanorgaiden",
    "title": "Akumanorgaiden",
    "char": "A"
  },
  {
    "file": "claladdinsnes",
    "title": "Aladdinsnes",
    "char": "A"
  },
  {
    "file": "clalexkiddinmiracleworld",
    "title": "Alexkiddinmiracleworld",
    "char": "A"
  },
  {
    "file": "clalienhominid",
    "title": "Alienhominid",
    "char": "A"
  },
  {
    "file": "clalienhominidgba",
    "title": "Alienhominidgba",
    "char": "A"
  },
  {
    "file": "clalienskyinvasion",
    "title": "Alienskyinvasion",
    "char": "A"
  },
  {
    "file": "clalientransporter",
    "title": "Alientransporter",
    "char": "A"
  },
  {
    "file": "clalienvspredator",
    "title": "Alienvspredator",
    "char": "A"
  },
  {
    "file": "clallbossesin1",
    "title": "Allbossesin 1",
    "char": "A"
  },
  {
    "file": "clallocation",
    "title": "Allocation",
    "char": "A"
  },
  {
    "file": "clAltered Beast",
    "title": "Altered Beast",
    "char": "A"
  },
  {
    "file": "clamaze",
    "title": "Amaze",
    "char": "A"
  },
  {
    "file": "clambulencearush",
    "title": "Ambulencearush",
    "char": "A"
  },
  {
    "file": "clamidstthesky",
    "title": "Amidstthesky",
    "char": "A"
  },
  {
    "file": "clamigopancho",
    "title": "Amigopancho",
    "char": "A"
  },
  {
    "file": "clamigopancho2",
    "title": "Amigopancho 2",
    "char": "A"
  },
  {
    "file": "clamigopancho3",
    "title": "Amigopancho 3",
    "char": "A"
  },
  {
    "file": "clamigopancho4",
    "title": "Amigopancho 4",
    "char": "A"
  },
  {
    "file": "clamigopancho5",
    "title": "Amigopancho 5",
    "char": "A"
  },
  {
    "file": "clamigopancho6",
    "title": "Amigopancho 6",
    "char": "A"
  },
  {
    "file": "clamigopancho7",
    "title": "Amigopancho 7",
    "char": "A"
  },
  {
    "file": "clamongus",
    "title": "Amongus",
    "char": "A"
  },
  {
    "file": "clamorphous",
    "title": "Amorphous",
    "char": "A"
  },
  {
    "file": "clancientsins",
    "title": "Ancientsins",
    "char": "A"
  },
  {
    "file": "clanemonesfall",
    "title": "Anemonesfall",
    "char": "A"
  },
  {
    "file": "clangry-birdsspace",
    "title": "Angry-birdsspace",
    "char": "A"
  },
  {
    "file": "clangrybirds-space",
    "title": "Angrybirds-space",
    "char": "A"
  },
  {
    "file": "clangrybirds",
    "title": "Angrybirds",
    "char": "A"
  },
  {
    "file": "clangrybirdsshowdown",
    "title": "Angrybirdsshowdown",
    "char": "A"
  },
  {
    "file": "clangrybirdsspace",
    "title": "Angrybirdsspace",
    "char": "A"
  },
  {
    "file": "clanimalcrossingwildworld",
    "title": "Animalcrossingwildworld",
    "char": "A"
  },
  {
    "file": "clanimalforestn64",
    "title": "Animalforestn 64",
    "char": "A"
  },
  {
    "file": "clannsmb",
    "title": "Annsmb",
    "char": "A"
  },
  {
    "file": "clanotherworld",
    "title": "Anotherworld",
    "char": "A"
  },
  {
    "file": "clantarttycoon",
    "title": "Antarttycoon",
    "char": "A"
  },
  {
    "file": "clantimatterdimensions",
    "title": "Antimatterdimensions",
    "char": "A"
  },
  {
    "file": "clapesvshelium",
    "title": "Apesvshelium",
    "char": "A"
  },
  {
    "file": "clapotris",
    "title": "Apotris",
    "char": "A"
  },
  {
    "file": "clappleshooter",
    "title": "Appleshooter",
    "char": "A"
  },
  {
    "file": "clappleworm",
    "title": "Appleworm",
    "char": "A"
  },
  {
    "file": "claquaparkio",
    "title": "Aquaparkio",
    "char": "A"
  },
  {
    "file": "clarceuslegend",
    "title": "Arceuslegend",
    "char": "A"
  },
  {
    "file": "clarcheryworldtour",
    "title": "Archeryworldtour",
    "char": "A"
  },
  {
    "file": "clarchesspelago",
    "title": "Archesspelago",
    "char": "A"
  },
  {
    "file": "clarena",
    "title": "Arena",
    "char": "A"
  },
  {
    "file": "clarmormayhem2",
    "title": "Armormayhem 2",
    "char": "A"
  },
  {
    "file": "clarsonate",
    "title": "Arsonate",
    "char": "A"
  },
  {
    "file": "clarthursnightmare",
    "title": "Arthursnightmare",
    "char": "A"
  },
  {
    "file": "clascent",
    "title": "Ascent",
    "char": "A"
  },
  {
    "file": "clasdutydemands",
    "title": "Asdutydemands",
    "char": "A"
  },
  {
    "file": "clasmallworldcup",
    "title": "Asmallworldcup",
    "char": "A"
  },
  {
    "file": "classesmentexaminationque",
    "title": "Assesmentexaminationque",
    "char": "A"
  },
  {
    "file": "classessmentexamination",
    "title": "Assessmentexamination",
    "char": "A"
  },
  {
    "file": "clasteroids",
    "title": "Asteroids",
    "char": "A"
  },
  {
    "file": "clasteroidsALT",
    "title": "Asteroids ALT",
    "char": "A"
  },
  {
    "file": "clasteroidsarcade",
    "title": "Asteroidsarcade",
    "char": "A"
  },
  {
    "file": "clAstrosDreamland",
    "title": "Astros Dreamland",
    "char": "A"
  },
  {
    "file": "clastynax",
    "title": "Astynax",
    "char": "A"
  },
  {
    "file": "clatariadventure",
    "title": "Atariadventure",
    "char": "A"
  },
  {
    "file": "clattackhole",
    "title": "Attackhole",
    "char": "A"
  },
  {
    "file": "clavalanche",
    "title": "Avalanche",
    "char": "A"
  },
  {
    "file": "claviamasters",
    "title": "Aviamasters",
    "char": "A"
  },
  {
    "file": "claviamastersbuggy",
    "title": "Aviamastersbuggy",
    "char": "A"
  },
  {
    "file": "clAwesomePirates",
    "title": "Awesome Pirates",
    "char": "A"
  },
  {
    "file": "clawesomeplanes",
    "title": "Awesomeplanes",
    "char": "A"
  },
  {
    "file": "clawesometanks",
    "title": "Awesometanks",
    "char": "A"
  },
  {
    "file": "clawesometanks2",
    "title": "Awesometanks 2",
    "char": "A"
  },
  {
    "file": "claxbattler",
    "title": "Axbattler",
    "char": "A"
  },
  {
    "file": "claxisfootballleague",
    "title": "Axisfootballleague",
    "char": "A"
  },
  {
    "file": "clB3313",
    "title": "B 3313",
    "char": "B"
  },
  {
    "file": "clb3313unabandonedA2",
    "title": "B 3313 Unabandoned A 2",
    "char": "B"
  },
  {
    "file": "clb3313v102",
    "title": "B 3313 V 102",
    "char": "B"
  },
  {
    "file": "clbabeltower",
    "title": "Babeltower",
    "char": "B"
  },
  {
    "file": "clbabychiccoadventure",
    "title": "Babychiccoadventure",
    "char": "B"
  },
  {
    "file": "clbabykaizo",
    "title": "Babykaizo",
    "char": "B"
  },
  {
    "file": "clbabysniperinvietnam",
    "title": "Babysniperinvietnam",
    "char": "B"
  },
  {
    "file": "clbackrooms",
    "title": "Backrooms",
    "char": "B"
  },
  {
    "file": "clbackrooms2D",
    "title": "Backrooms 2 D",
    "char": "B"
  },
  {
    "file": "clbackyardbaseball",
    "title": "Backyardbaseball",
    "char": "B"
  },
  {
    "file": "clbackyardbaseball09",
    "title": "Backyardbaseball 09",
    "char": "B"
  },
  {
    "file": "clbackyardbaseball10",
    "title": "Backyardbaseball 10",
    "char": "B"
  },
  {
    "file": "clbackyardfootball",
    "title": "Backyardfootball",
    "char": "B"
  },
  {
    "file": "clbackyardsoccer",
    "title": "Backyardsoccer",
    "char": "B"
  },
  {
    "file": "clbaconmaydie",
    "title": "Baconmaydie",
    "char": "B"
  },
  {
    "file": "clbadbodyguards",
    "title": "Badbodyguards",
    "char": "B"
  },
  {
    "file": "clbadicecream",
    "title": "Badicecream",
    "char": "B"
  },
  {
    "file": "clbadicecream2",
    "title": "Badicecream 2",
    "char": "B"
  },
  {
    "file": "clbadicecream3",
    "title": "Badicecream 3",
    "char": "B"
  },
  {
    "file": "clbadmondaysimulator",
    "title": "Badmondaysimulator",
    "char": "B"
  },
  {
    "file": "clbadparenting",
    "title": "Badparenting",
    "char": "B"
  },
  {
    "file": "clbadpiggies",
    "title": "Badpiggies",
    "char": "B"
  },
  {
    "file": "clbadpiggieslatest",
    "title": "Badpiggieslatest",
    "char": "B"
  },
  {
    "file": "clbadtimesim",
    "title": "Badtimesim",
    "char": "B"
  },
  {
    "file": "clbadtimesimulator",
    "title": "Badtimesimulator",
    "char": "B"
  },
  {
    "file": "clbalatrogba",
    "title": "Balatrogba",
    "char": "B"
  },
  {
    "file": "clbaldicaseoh",
    "title": "Baldicaseoh",
    "char": "B"
  },
  {
    "file": "clbaldidecomp",
    "title": "Baldidecomp",
    "char": "B"
  },
  {
    "file": "clbaldiepstein",
    "title": "Baldiepstein",
    "char": "B"
  },
  {
    "file": "clbaldisbasics",
    "title": "Baldisbasics",
    "char": "B"
  },
  {
    "file": "clbaldisbasicsremaster",
    "title": "Baldisbasicsremaster",
    "char": "B"
  },
  {
    "file": "clbaldisfunnewschoolultimate",
    "title": "Baldisfunnewschoolultimate",
    "char": "B"
  },
  {
    "file": "clballblast",
    "title": "Ballblast",
    "char": "B"
  },
  {
    "file": "clballistic",
    "title": "Ballistic",
    "char": "B"
  },
  {
    "file": "clballsandbricks",
    "title": "Ballsandbricks",
    "char": "B"
  },
  {
    "file": "clballsandbricksgood",
    "title": "Ballsandbricksgood",
    "char": "B"
  },
  {
    "file": "clballz",
    "title": "Ballz",
    "char": "B"
  },
  {
    "file": "clbananasimulator",
    "title": "Bananasimulator",
    "char": "B"
  },
  {
    "file": "clbanbuds",
    "title": "Banbuds",
    "char": "B"
  },
  {
    "file": "clbanditgunslingers",
    "title": "Banditgunslingers",
    "char": "B"
  },
  {
    "file": "clbanjokazooie",
    "title": "Banjokazooie",
    "char": "B"
  },
  {
    "file": "clbanjotooie",
    "title": "Banjotooie",
    "char": "B"
  },
  {
    "file": "clBank Robbery",
    "title": "Bank Robbery",
    "char": "B"
  },
  {
    "file": "clbankbreakout2",
    "title": "Bankbreakout 2",
    "char": "B"
  },
  {
    "file": "clbankrobbery2",
    "title": "Bankrobbery 2",
    "char": "B"
  },
  {
    "file": "clbarryhasasecret",
    "title": "Barryhasasecret",
    "char": "B"
  },
  {
    "file": "clbartblast",
    "title": "Bartblast",
    "char": "B"
  },
  {
    "file": "clbas",
    "title": "Bas",
    "char": "B"
  },
  {
    "file": "clbaseballbros",
    "title": "Baseballbros",
    "char": "B"
  },
  {
    "file": "clbasketballfrvr",
    "title": "Basketballfrvr",
    "char": "B"
  },
  {
    "file": "clbasketballlegends(1)",
    "title": "Basketballlegends(1)",
    "char": "B"
  },
  {
    "file": "clbasketballlegends",
    "title": "Basketballlegends",
    "char": "B"
  },
  {
    "file": "clbasketballstars",
    "title": "Basketballstars",
    "char": "B"
  },
  {
    "file": "clbasketballsuperstars",
    "title": "Basketballsuperstars",
    "char": "B"
  },
  {
    "file": "clbasketbattle",
    "title": "Basketbattle",
    "char": "B"
  },
  {
    "file": "clbasketbros",
    "title": "Basketbros",
    "char": "B"
  },
  {
    "file": "clbasketrandom",
    "title": "Basketrandom",
    "char": "B"
  },
  {
    "file": "clbasketrandomgood",
    "title": "Basketrandomgood",
    "char": "B"
  },
  {
    "file": "clbasketslamdunk2",
    "title": "Basketslamdunk 2",
    "char": "B"
  },
  {
    "file": "clbatterup",
    "title": "Batterup",
    "char": "B"
  },
  {
    "file": "clbattlekarts",
    "title": "Battlekarts",
    "char": "B"
  },
  {
    "file": "clbattles",
    "title": "Battles",
    "char": "B"
  },
  {
    "file": "clbattlesim",
    "title": "Battlesim",
    "char": "B"
  },
  {
    "file": "clbattlezone",
    "title": "Battlezone",
    "char": "B"
  },
  {
    "file": "clbazookaboy",
    "title": "Bazookaboy",
    "char": "B"
  },
  {
    "file": "clbballlegend",
    "title": "Bballlegend",
    "char": "B"
  },
  {
    "file": "clbeachboxingsim",
    "title": "Beachboxingsim",
    "char": "B"
  },
  {
    "file": "clbeamrider",
    "title": "Beamrider",
    "char": "B"
  },
  {
    "file": "clbearbarians",
    "title": "Bearbarians",
    "char": "B"
  },
  {
    "file": "clbearsus",
    "title": "Bearsus",
    "char": "B"
  },
  {
    "file": "clbejeweledtwistds",
    "title": "Bejeweledtwistds",
    "char": "B"
  },
  {
    "file": "clbejeweledtwistflash",
    "title": "Bejeweledtwistflash",
    "char": "B"
  },
  {
    "file": "clben10alienforce",
    "title": "Ben 10 Alienforce",
    "char": "B"
  },
  {
    "file": "clben10omniverse",
    "title": "Ben 10 Omniverse",
    "char": "B"
  },
  {
    "file": "clben10protector",
    "title": "Ben 10 Protector",
    "char": "B"
  },
  {
    "file": "clben10racing",
    "title": "Ben 10 Racing",
    "char": "B"
  },
  {
    "file": "clben10ultimatealien",
    "title": "Ben 10 Ultimatealien",
    "char": "B"
  },
  {
    "file": "clbendrowned",
    "title": "Bendrowned",
    "char": "B"
  },
  {
    "file": "clbergentruck201x",
    "title": "Bergentruck 201 X",
    "char": "B"
  },
  {
    "file": "clbfdia5b",
    "title": "Bfdia 5 B",
    "char": "B"
  },
  {
    "file": "clBFDIBranches",
    "title": "BFDIBranches",
    "char": "B"
  },
  {
    "file": "clbigflappytowertinysquare",
    "title": "Bigflappytowertinysquare",
    "char": "B"
  },
  {
    "file": "clbigicetowertinysquare",
    "title": "Bigicetowertinysquare",
    "char": "B"
  },
  {
    "file": "clbigneontowertinysquare",
    "title": "Bigneontowertinysquare",
    "char": "B"
  },
  {
    "file": "clbigshotboxing2",
    "title": "Bigshotboxing 2",
    "char": "B"
  },
  {
    "file": "clbigtowertinysquare",
    "title": "Bigtowertinysquare",
    "char": "B"
  },
  {
    "file": "clbigtowertinysquare2",
    "title": "Bigtowertinysquare 2",
    "char": "B"
  },
  {
    "file": "clbigtowertinysquare2good",
    "title": "Bigtowertinysquare 2 Good",
    "char": "B"
  },
  {
    "file": "clBig_Time_Butter_Baron",
    "title": "Big Time Butter Baron",
    "char": "B"
  },
  {
    "file": "clbindingofisaccsheeptime",
    "title": "Bindingofisaccsheeptime",
    "char": "B"
  },
  {
    "file": "clbioevil4",
    "title": "Bioevil 4",
    "char": "B"
  },
  {
    "file": "clbitlife",
    "title": "Bitlife",
    "char": "B"
  },
  {
    "file": "clbitlifeencrypted",
    "title": "Bitlifeencrypted",
    "char": "B"
  },
  {
    "file": "clbitplanes",
    "title": "Bitplanes",
    "char": "B"
  },
  {
    "file": "clblackjack",
    "title": "Blackjack",
    "char": "B"
  },
  {
    "file": "clblackjackbattle",
    "title": "Blackjackbattle",
    "char": "B"
  },
  {
    "file": "clblackjackhhhh",
    "title": "Blackjackhhhh",
    "char": "B"
  },
  {
    "file": "clblackknight",
    "title": "Blackknight",
    "char": "B"
  },
  {
    "file": "clblackout",
    "title": "Blackout",
    "char": "B"
  },
  {
    "file": "clblacksmithlab",
    "title": "Blacksmithlab",
    "char": "B"
  },
  {
    "file": "clblastronaut",
    "title": "Blastronaut",
    "char": "B"
  },
  {
    "file": "clblazedrifter",
    "title": "Blazedrifter",
    "char": "B"
  },
  {
    "file": "clbleachvsnaruto",
    "title": "Bleachvsnaruto",
    "char": "B"
  },
  {
    "file": "clblightborne",
    "title": "Blightborne",
    "char": "B"
  },
  {
    "file": "clblobsstory2",
    "title": "Blobsstory 2",
    "char": "B"
  },
  {
    "file": "clblockblast",
    "title": "Blockblast",
    "char": "B"
  },
  {
    "file": "clblockblastv2",
    "title": "Blockblastv 2",
    "char": "B"
  },
  {
    "file": "clblockcraftparkour",
    "title": "Blockcraftparkour",
    "char": "B"
  },
  {
    "file": "clblockcraftshooter",
    "title": "Blockcraftshooter",
    "char": "B"
  },
  {
    "file": "clblockpost",
    "title": "Blockpost",
    "char": "B"
  },
  {
    "file": "clblockthepig",
    "title": "Blockthepig",
    "char": "B"
  },
  {
    "file": "clblockydemolitionderby",
    "title": "Blockydemolitionderby",
    "char": "B"
  },
  {
    "file": "clblockysnakes",
    "title": "Blockysnakes",
    "char": "B"
  },
  {
    "file": "clblood",
    "title": "Blood",
    "char": "B"
  },
  {
    "file": "clbloodmoney",
    "title": "Bloodmoney",
    "char": "B"
  },
  {
    "file": "clbloodtournament",
    "title": "Bloodtournament",
    "char": "B"
  },
  {
    "file": "clbloons",
    "title": "Bloons",
    "char": "B"
  },
  {
    "file": "clbloons2",
    "title": "Bloons 2",
    "char": "B"
  },
  {
    "file": "clbloonspp1",
    "title": "Bloonspp 1",
    "char": "B"
  },
  {
    "file": "clbloonspp2",
    "title": "Bloonspp 2",
    "char": "B"
  },
  {
    "file": "clbloonspp3",
    "title": "Bloonspp 3",
    "char": "B"
  },
  {
    "file": "clbloonspp4",
    "title": "Bloonspp 4",
    "char": "B"
  },
  {
    "file": "clbloonspp5",
    "title": "Bloonspp 5",
    "char": "B"
  },
  {
    "file": "clbloonsTD1",
    "title": "Bloons TD 1",
    "char": "B"
  },
  {
    "file": "clbloonsTD2",
    "title": "Bloons TD 2",
    "char": "B"
  },
  {
    "file": "clbloonsTD3",
    "title": "Bloons TD 3",
    "char": "B"
  },
  {
    "file": "clbloonsTD4",
    "title": "Bloons TD 4",
    "char": "B"
  },
  {
    "file": "clbloonsTD5",
    "title": "Bloons TD 5",
    "char": "B"
  },
  {
    "file": "clbloonsTD6scratch",
    "title": "Bloons TD 6 Scratch",
    "char": "B"
  },
  {
    "file": "clbloxorz",
    "title": "Bloxorz",
    "char": "B"
  },
  {
    "file": "clblumgiracers",
    "title": "Blumgiracers",
    "char": "B"
  },
  {
    "file": "clblumgirocket",
    "title": "Blumgirocket",
    "char": "B"
  },
  {
    "file": "clBMX2",
    "title": "BMX 2",
    "char": "B"
  },
  {
    "file": "clbntts",
    "title": "Bntts",
    "char": "B"
  },
  {
    "file": "clbobasimulator",
    "title": "Bobasimulator",
    "char": "B"
  },
  {
    "file": "clbobtherobber",
    "title": "Bobtherobber",
    "char": "B"
  },
  {
    "file": "clbobtherobber2",
    "title": "Bobtherobber 2",
    "char": "B"
  },
  {
    "file": "clbobtherobber5",
    "title": "Bobtherobber 5",
    "char": "B"
  },
  {
    "file": "clbollybeat",
    "title": "Bollybeat",
    "char": "B"
  },
  {
    "file": "clbomberman",
    "title": "Bomberman",
    "char": "B"
  },
  {
    "file": "clbomberman2",
    "title": "Bomberman 2",
    "char": "B"
  },
  {
    "file": "clbombermanhero",
    "title": "Bombermanhero",
    "char": "B"
  },
  {
    "file": "clbombermanworld",
    "title": "Bombermanworld",
    "char": "B"
  },
  {
    "file": "clBonanza-Bros",
    "title": "Bonanza-Bros",
    "char": "B"
  },
  {
    "file": "clbonkerssnes",
    "title": "Bonkerssnes",
    "char": "B"
  },
  {
    "file": "clboomslingers",
    "title": "Boomslingers",
    "char": "B"
  },
  {
    "file": "clbottlecracks",
    "title": "Bottlecracks",
    "char": "B"
  },
  {
    "file": "clbottleflip3d",
    "title": "Bottleflip 3 D",
    "char": "B"
  },
  {
    "file": "clbotwds",
    "title": "Botwds",
    "char": "B"
  },
  {
    "file": "clbounceback",
    "title": "Bounceback",
    "char": "B"
  },
  {
    "file": "clbouncemasters",
    "title": "Bouncemasters",
    "char": "B"
  },
  {
    "file": "clbouncybasketball",
    "title": "Bouncybasketball",
    "char": "B"
  },
  {
    "file": "clbouncymotors",
    "title": "Bouncymotors",
    "char": "B"
  },
  {
    "file": "clBountyOfOne",
    "title": "Bounty Of One",
    "char": "B"
  },
  {
    "file": "clbowlalt",
    "title": "Bowlalt",
    "char": "B"
  },
  {
    "file": "clbowmaster",
    "title": "Bowmaster",
    "char": "B"
  },
  {
    "file": "clboxhead2playrooms",
    "title": "Boxhead 2 Playrooms",
    "char": "B"
  },
  {
    "file": "clboxheadnightmare",
    "title": "Boxheadnightmare",
    "char": "B"
  },
  {
    "file": "clboxinglive-2",
    "title": "Boxinglive-2",
    "char": "B"
  },
  {
    "file": "clboxinglive2",
    "title": "Boxinglive 2",
    "char": "B"
  },
  {
    "file": "clboxingrandom",
    "title": "Boxingrandom",
    "char": "B"
  },
  {
    "file": "clbrainrot",
    "title": "Brainrot",
    "char": "B"
  },
  {
    "file": "clbrawlsimulator3d",
    "title": "Brawlsimulator 3 D",
    "char": "B"
  },
  {
    "file": "clBrawlstars",
    "title": "Brawlstars",
    "char": "B"
  },
  {
    "file": "clbreadskate",
    "title": "Breadskate",
    "char": "B"
  },
  {
    "file": "clbridgerace",
    "title": "Bridgerace",
    "char": "B"
  },
  {
    "file": "clbrotato",
    "title": "Brotato",
    "char": "B"
  },
  {
    "file": "clBTD1",
    "title": "BTD 1",
    "char": "B"
  },
  {
    "file": "clbtd5",
    "title": "Btd 5",
    "char": "B"
  },
  {
    "file": "clbtts",
    "title": "Btts",
    "char": "B"
  },
  {
    "file": "clbtts2",
    "title": "Btts 2",
    "char": "B"
  },
  {
    "file": "clbubbleshooter",
    "title": "Bubbleshooter",
    "char": "B"
  },
  {
    "file": "clbubbleshooterpirate",
    "title": "Bubbleshooterpirate",
    "char": "B"
  },
  {
    "file": "clbubbletanks",
    "title": "Bubbletanks",
    "char": "B"
  },
  {
    "file": "clbubbletanks2",
    "title": "Bubbletanks 2",
    "char": "B"
  },
  {
    "file": "clbubbletanks3",
    "title": "Bubbletanks 3",
    "char": "B"
  },
  {
    "file": "clbubbletanksarenas",
    "title": "Bubbletanksarenas",
    "char": "B"
  },
  {
    "file": "clbubbletankstd",
    "title": "Bubbletankstd",
    "char": "B"
  },
  {
    "file": "clbubsy",
    "title": "Bubsy",
    "char": "B"
  },
  {
    "file": "clbuckshotroulette",
    "title": "Buckshotroulette",
    "char": "B"
  },
  {
    "file": "clbuildnowgg",
    "title": "Buildnowgg",
    "char": "B"
  },
  {
    "file": "clbulletforce",
    "title": "Bulletforce",
    "char": "B"
  },
  {
    "file": "clbunnyland",
    "title": "Bunnyland",
    "char": "B"
  },
  {
    "file": "clbunzobunny",
    "title": "Bunzobunny",
    "char": "B"
  },
  {
    "file": "clburgerandfrights",
    "title": "Burgerandfrights",
    "char": "B"
  },
  {
    "file": "clburgertime",
    "title": "Burgertime",
    "char": "B"
  },
  {
    "file": "clburritobison",
    "title": "Burritobison",
    "char": "B"
  },
  {
    "file": "clburritobison2",
    "title": "Burritobison 2",
    "char": "B"
  },
  {
    "file": "clburritobisonlaunchalibre",
    "title": "Burritobisonlaunchalibre",
    "char": "B"
  },
  {
    "file": "clburritobisonrevenge",
    "title": "Burritobisonrevenge",
    "char": "B"
  },
  {
    "file": "clbushidoblade",
    "title": "Bushidoblade",
    "char": "B"
  },
  {
    "file": "clBusterJam",
    "title": "Buster Jam",
    "char": "B"
  },
  {
    "file": "clcactusmccoy(1)",
    "title": "Cactusmccoy(1)",
    "char": "C"
  },
  {
    "file": "clcactusmccoy",
    "title": "Cactusmccoy",
    "char": "C"
  },
  {
    "file": "clcactusmccoy2(1)",
    "title": "Cactusmccoy 2(1)",
    "char": "C"
  },
  {
    "file": "clcactusmccoy2(2)",
    "title": "Cactusmccoy 2(2)",
    "char": "C"
  },
  {
    "file": "clcactusmccoy2",
    "title": "Cactusmccoy 2",
    "char": "C"
  },
  {
    "file": "clcallofbattle",
    "title": "Callofbattle",
    "char": "C"
  },
  {
    "file": "clcamilla",
    "title": "Camilla",
    "char": "C"
  },
  {
    "file": "clcandybox1",
    "title": "Candybox 1",
    "char": "C"
  },
  {
    "file": "clcannonballs3d",
    "title": "Cannonballs 3 D",
    "char": "C"
  },
  {
    "file": "clcannonfodder",
    "title": "Cannonfodder",
    "char": "C"
  },
  {
    "file": "clcaptainlang",
    "title": "Captainlang",
    "char": "C"
  },
  {
    "file": "clcaptchaware",
    "title": "Captchaware",
    "char": "C"
  },
  {
    "file": "clcapybaraclicker",
    "title": "Capybaraclicker",
    "char": "C"
  },
  {
    "file": "clcarcrash3",
    "title": "Carcrash 3",
    "char": "C"
  },
  {
    "file": "clcardrawing",
    "title": "Cardrawing",
    "char": "C"
  },
  {
    "file": "clcareatscar2deluxe",
    "title": "Careatscar 2 Deluxe",
    "char": "C"
  },
  {
    "file": "clcarkingarena",
    "title": "Carkingarena",
    "char": "C"
  },
  {
    "file": "clcarmods",
    "title": "Carmods",
    "char": "C"
  },
  {
    "file": "clcarrampvspolicechase",
    "title": "Carrampvspolicechase",
    "char": "C"
  },
  {
    "file": "clcarstuntsdriving",
    "title": "Carstuntsdriving",
    "char": "C"
  },
  {
    "file": "clCartoonNetworkTableTennisUltimateTournament",
    "title": "Cartoon Network Table Tennis Ultimate Tournament",
    "char": "C"
  },
  {
    "file": "clcastaway",
    "title": "Castaway",
    "char": "C"
  },
  {
    "file": "clcastlebloodline",
    "title": "Castlebloodline",
    "char": "C"
  },
  {
    "file": "clcastlecircleofmoon",
    "title": "Castlecircleofmoon",
    "char": "C"
  },
  {
    "file": "clcastlevania",
    "title": "Castlevania",
    "char": "C"
  },
  {
    "file": "clcastlevania2",
    "title": "Castlevania 2",
    "char": "C"
  },
  {
    "file": "clcastlevania3",
    "title": "Castlevania 3",
    "char": "C"
  },
  {
    "file": "clcastlevaniaariaofsorrow",
    "title": "Castlevaniaariaofsorrow",
    "char": "C"
  },
  {
    "file": "clcastlevaniadawnofsorrow",
    "title": "Castlevaniadawnofsorrow",
    "char": "C"
  },
  {
    "file": "clcastlevanianes",
    "title": "Castlevanianes",
    "char": "C"
  },
  {
    "file": "clcastlewarsmodern",
    "title": "Castlewarsmodern",
    "char": "C"
  },
  {
    "file": "clcatmario",
    "title": "Catmario",
    "char": "C"
  },
  {
    "file": "clcatmariogood",
    "title": "Catmariogood",
    "char": "C"
  },
  {
    "file": "clcatslovecake2",
    "title": "Catslovecake 2",
    "char": "C"
  },
  {
    "file": "clcavecrawler",
    "title": "Cavecrawler",
    "char": "C"
  },
  {
    "file": "clcavestory",
    "title": "Cavestory",
    "char": "C"
  },
  {
    "file": "clceleste",
    "title": "Celeste",
    "char": "C"
  },
  {
    "file": "clceleste2",
    "title": "Celeste 2",
    "char": "C"
  },
  {
    "file": "clcelestemariodx",
    "title": "Celestemariodx",
    "char": "C"
  },
  {
    "file": "clCeliasStupidROMHack",
    "title": "Celias Stupid ROMHack",
    "char": "C"
  },
  {
    "file": "clcellardoor",
    "title": "Cellardoor",
    "char": "C"
  },
  {
    "file": "clCellToSingularity",
    "title": "Cell To Singularity",
    "char": "C"
  },
  {
    "file": "clcentipedearcade",
    "title": "Centipedearcade",
    "char": "C"
  },
  {
    "file": "clchainofmemories",
    "title": "Chainofmemories",
    "char": "C"
  },
  {
    "file": "clchaosfaction2",
    "title": "Chaosfaction 2",
    "char": "C"
  },
  {
    "file": "clcheckers",
    "title": "Checkers",
    "char": "C"
  },
  {
    "file": "clcheesechompers3d",
    "title": "Cheesechompers 3 D",
    "char": "C"
  },
  {
    "file": "clcheeseisthereason",
    "title": "Cheeseisthereason",
    "char": "C"
  },
  {
    "file": "clcheeserolling",
    "title": "Cheeserolling",
    "char": "C"
  },
  {
    "file": "clcheshireinachatroom",
    "title": "Cheshireinachatroom",
    "char": "C"
  },
  {
    "file": "clchess",
    "title": "Chess",
    "char": "C"
  },
  {
    "file": "clchessclassic",
    "title": "Chessclassic",
    "char": "C"
  },
  {
    "file": "clchibiknight",
    "title": "Chibiknight",
    "char": "C"
  },
  {
    "file": "clChickenCS",
    "title": "Chicken CS",
    "char": "C"
  },
  {
    "file": "clchickenscream",
    "title": "Chickenscream",
    "char": "C"
  },
  {
    "file": "clchickenwar",
    "title": "Chickenwar",
    "char": "C"
  },
  {
    "file": "clchipschallenge",
    "title": "Chipschallenge",
    "char": "C"
  },
  {
    "file": "clchoppyorc",
    "title": "Choppyorc",
    "char": "C"
  },
  {
    "file": "clchoroqwonderful",
    "title": "Choroqwonderful",
    "char": "C"
  },
  {
    "file": "clchronotrigger",
    "title": "Chronotrigger",
    "char": "C"
  },
  {
    "file": "clchuzzle",
    "title": "Chuzzle",
    "char": "C"
  },
  {
    "file": "clCircloO2",
    "title": "Circlo O 2",
    "char": "C"
  },
  {
    "file": "clciviballs",
    "title": "Civiballs",
    "char": "C"
  },
  {
    "file": "clciviballs2",
    "title": "Civiballs 2",
    "char": "C"
  },
  {
    "file": "clclashnslash",
    "title": "Clashnslash",
    "char": "C"
  },
  {
    "file": "clclashofvikings",
    "title": "Clashofvikings",
    "char": "C"
  },
  {
    "file": "clclassof09",
    "title": "Classof 09",
    "char": "C"
  },
  {
    "file": "clclaymore",
    "title": "Claymore",
    "char": "C"
  },
  {
    "file": "clclayuncraft",
    "title": "Clayuncraft",
    "char": "C"
  },
  {
    "file": "clcleanupio",
    "title": "Cleanupio",
    "char": "C"
  },
  {
    "file": "clclearvision",
    "title": "Clearvision",
    "char": "C"
  },
  {
    "file": "clclearvision2",
    "title": "Clearvision 2",
    "char": "C"
  },
  {
    "file": "clclearvision3",
    "title": "Clearvision 3",
    "char": "C"
  },
  {
    "file": "clclearvision4",
    "title": "Clearvision 4",
    "char": "C"
  },
  {
    "file": "clclearvision5",
    "title": "Clearvision 5",
    "char": "C"
  },
  {
    "file": "clclimbforbrainrots",
    "title": "Climbforbrainrots",
    "char": "C"
  },
  {
    "file": "clclmadnessambulation",
    "title": "Clmadnessambulation",
    "char": "C"
  },
  {
    "file": "clclover",
    "title": "Clover",
    "char": "C"
  },
  {
    "file": "clclubbytheseal",
    "title": "Clubbytheseal",
    "char": "C"
  },
  {
    "file": "clclusterrush",
    "title": "Clusterrush",
    "char": "C"
  },
  {
    "file": "clcoalllcdemo",
    "title": "Coalllcdemo",
    "char": "C"
  },
  {
    "file": "clcod4",
    "title": "Cod 4",
    "char": "C"
  },
  {
    "file": "clcodblackopp",
    "title": "Codblackopp",
    "char": "C"
  },
  {
    "file": "clcoddefiance",
    "title": "Coddefiance",
    "char": "C"
  },
  {
    "file": "clcodenamegordon",
    "title": "Codenamegordon",
    "char": "C"
  },
  {
    "file": "clcodeorg",
    "title": "Codeorg",
    "char": "C"
  },
  {
    "file": "clcodeorgbutoffline",
    "title": "Codeorgbutoffline",
    "char": "C"
  },
  {
    "file": "clcodercraft",
    "title": "Codercraft",
    "char": "C"
  },
  {
    "file": "clcodmodernwarfare",
    "title": "Codmodernwarfare",
    "char": "C"
  },
  {
    "file": "clcodworldatwar",
    "title": "Codworldatwar",
    "char": "C"
  },
  {
    "file": "clcoffeemaker",
    "title": "Coffeemaker",
    "char": "C"
  },
  {
    "file": "clcoldpines",
    "title": "Coldpines",
    "char": "C"
  },
  {
    "file": "clcolorburst3d",
    "title": "Colorburst 3 D",
    "char": "C"
  },
  {
    "file": "clcolormatch",
    "title": "Colormatch",
    "char": "C"
  },
  {
    "file": "clcolorwatersort3d",
    "title": "Colorwatersort 3 D",
    "char": "C"
  },
  {
    "file": "clcombopool",
    "title": "Combopool",
    "char": "C"
  },
  {
    "file": "clcommandandconquer",
    "title": "Commandandconquer",
    "char": "C"
  },
  {
    "file": "clcommanderkeen4",
    "title": "Commanderkeen 4",
    "char": "C"
  },
  {
    "file": "clcommanderkeen5",
    "title": "Commanderkeen 5",
    "char": "C"
  },
  {
    "file": "clcommanderkeen6",
    "title": "Commanderkeen 6",
    "char": "C"
  },
  {
    "file": "clconfrontingurself",
    "title": "Confrontingurself",
    "char": "C"
  },
  {
    "file": "clconfrontingyourself",
    "title": "Confrontingyourself",
    "char": "C"
  },
  {
    "file": "clconkersbadfurday",
    "title": "Conkersbadfurday",
    "char": "C"
  },
  {
    "file": "clcontra",
    "title": "Contra",
    "char": "C"
  },
  {
    "file": "clcontra3",
    "title": "Contra 3",
    "char": "C"
  },
  {
    "file": "clcookie-clicker",
    "title": "Cookie-clicker",
    "char": "C"
  },
  {
    "file": "clcookieclicker",
    "title": "Cookieclicker",
    "char": "C"
  },
  {
    "file": "clcookieclickercool",
    "title": "Cookieclickercool",
    "char": "C"
  },
  {
    "file": "clcookieclickergood",
    "title": "Cookieclickergood",
    "char": "C"
  },
  {
    "file": "clcookieclickermodmenu",
    "title": "Cookieclickermodmenu",
    "char": "C"
  },
  {
    "file": "clcookingmama",
    "title": "Cookingmama",
    "char": "C"
  },
  {
    "file": "clcookingmama2",
    "title": "Cookingmama 2",
    "char": "C"
  },
  {
    "file": "clcookingmama3",
    "title": "Cookingmama 3",
    "char": "C"
  },
  {
    "file": "clcoreball",
    "title": "Coreball",
    "char": "C"
  },
  {
    "file": "clcoryinthehouse",
    "title": "Coryinthehouse",
    "char": "C"
  },
  {
    "file": "clcotlk",
    "title": "Cotlk",
    "char": "C"
  },
  {
    "file": "clcountmastersstickmangames",
    "title": "Countmastersstickmangames",
    "char": "C"
  },
  {
    "file": "clcoverorange",
    "title": "Coverorange",
    "char": "C"
  },
  {
    "file": "clcoverorange2",
    "title": "Coverorange 2",
    "char": "C"
  },
  {
    "file": "clcoverorangejourneygangsters",
    "title": "Coverorangejourneygangsters",
    "char": "C"
  },
  {
    "file": "clcoverorangejourneyknights",
    "title": "Coverorangejourneyknights",
    "char": "C"
  },
  {
    "file": "clcoverorangejourneypirates",
    "title": "Coverorangejourneypirates",
    "char": "C"
  },
  {
    "file": "clcoverorangejourneyspace",
    "title": "Coverorangejourneyspace",
    "char": "C"
  },
  {
    "file": "clcoverorangeplayerspack",
    "title": "Coverorangeplayerspack",
    "char": "C"
  },
  {
    "file": "clcoverorangeplayerspack2",
    "title": "Coverorangeplayerspack 2",
    "char": "C"
  },
  {
    "file": "clcoverorangeplayerspack3(1)",
    "title": "Coverorangeplayerspack 3(1)",
    "char": "C"
  },
  {
    "file": "clcoverorangeplayerspack3",
    "title": "Coverorangeplayerspack 3",
    "char": "C"
  },
  {
    "file": "clcrankit!",
    "title": "Crankit!",
    "char": "C"
  },
  {
    "file": "clcrankit",
    "title": "Crankit",
    "char": "C"
  },
  {
    "file": "clcrash2",
    "title": "Crash 2",
    "char": "C"
  },
  {
    "file": "clcrash3",
    "title": "Crash 3",
    "char": "C"
  },
  {
    "file": "clcrashbandicoot (1)",
    "title": "Crashbandicoot (1)",
    "char": "C"
  },
  {
    "file": "clcrashbandicoot",
    "title": "Crashbandicoot",
    "char": "C"
  },
  {
    "file": "clcrashbandicoot2",
    "title": "Crashbandicoot 2",
    "char": "C"
  },
  {
    "file": "clcrashteamracing",
    "title": "Crashteamracing",
    "char": "C"
  },
  {
    "file": "clcrazycars",
    "title": "Crazycars",
    "char": "C"
  },
  {
    "file": "clcrazycattle3d",
    "title": "Crazycattle 3 D",
    "char": "C"
  },
  {
    "file": "clcrazychicken3D",
    "title": "Crazychicken 3 D",
    "char": "C"
  },
  {
    "file": "clcrazyclimber",
    "title": "Crazyclimber",
    "char": "C"
  },
  {
    "file": "clcrazyfrogracer",
    "title": "Crazyfrogracer",
    "char": "C"
  },
  {
    "file": "clcrazymotorcycle",
    "title": "Crazymotorcycle",
    "char": "C"
  },
  {
    "file": "clcrazypenguincatapult",
    "title": "Crazypenguincatapult",
    "char": "C"
  },
  {
    "file": "clcrazyplanelanding",
    "title": "Crazyplanelanding",
    "char": "C"
  },
  {
    "file": "clcrazytaxigba",
    "title": "Crazytaxigba",
    "char": "C"
  },
  {
    "file": "clcreaturecardidle",
    "title": "Creaturecardidle",
    "char": "C"
  },
  {
    "file": "clcreeperworld2",
    "title": "Creeperworld 2",
    "char": "C"
  },
  {
    "file": "clcreepyinternetstories",
    "title": "Creepyinternetstories",
    "char": "C"
  },
  {
    "file": "clcreepynightfunkin",
    "title": "Creepynightfunkin",
    "char": "C"
  },
  {
    "file": "clcrimsonmadness",
    "title": "Crimsonmadness",
    "char": "C"
  },
  {
    "file": "clcrossyroad",
    "title": "Crossyroad",
    "char": "C"
  },
  {
    "file": "clcrunchball3000",
    "title": "Crunchball 3000",
    "char": "C"
  },
  {
    "file": "clCrystalCastles",
    "title": "Crystal Castles",
    "char": "C"
  },
  {
    "file": "clcs16",
    "title": "Cs 16",
    "char": "C"
  },
  {
    "file": "clcs6",
    "title": "Cs 6",
    "char": "C"
  },
  {
    "file": "clcsds",
    "title": "Csds",
    "char": "C"
  },
  {
    "file": "clcsgoclicker",
    "title": "Csgoclicker",
    "char": "C"
  },
  {
    "file": "clctgpnitro",
    "title": "Ctgpnitro",
    "char": "C"
  },
  {
    "file": "clcurveball(1)",
    "title": "Curveball(1)",
    "char": "C"
  },
  {
    "file": "clcurveball",
    "title": "Curveball",
    "char": "C"
  },
  {
    "file": "clcustomersupport",
    "title": "Customersupport",
    "char": "C"
  },
  {
    "file": "clcuttherope",
    "title": "Cuttherope",
    "char": "C"
  },
  {
    "file": "clcuttheropeholiday",
    "title": "Cuttheropeholiday",
    "char": "C"
  },
  {
    "file": "clcuttheropetimetravel",
    "title": "Cuttheropetimetravel",
    "char": "C"
  },
  {
    "file": "clcvooc",
    "title": "Cvooc",
    "char": "C"
  },
  {
    "file": "clcyberbungracing",
    "title": "Cyberbungracing",
    "char": "C"
  },
  {
    "file": "clcybersensation",
    "title": "Cybersensation",
    "char": "C"
  },
  {
    "file": "cldadgame",
    "title": "Dadgame",
    "char": "D"
  },
  {
    "file": "cldadish",
    "title": "Dadish",
    "char": "D"
  },
  {
    "file": "cldadnme",
    "title": "Dadnme",
    "char": "D"
  },
  {
    "file": "cldaggerfall",
    "title": "Daggerfall",
    "char": "D"
  },
  {
    "file": "cldandysworldclicker",
    "title": "Dandysworldclicker",
    "char": "D"
  },
  {
    "file": "cldanktomb",
    "title": "Danktomb",
    "char": "D"
  },
  {
    "file": "cldasharena",
    "title": "Dasharena",
    "char": "D"
  },
  {
    "file": "cldashio",
    "title": "Dashio",
    "char": "D"
  },
  {
    "file": "clDashmetry",
    "title": "Dashmetry",
    "char": "D"
  },
  {
    "file": "cldatewithiraq",
    "title": "Datewithiraq",
    "char": "D"
  },
  {
    "file": "cldborigins",
    "title": "Dborigins",
    "char": "D"
  },
  {
    "file": "cldborigins2",
    "title": "Dborigins 2",
    "char": "D"
  },
  {
    "file": "cldbsniper",
    "title": "Dbsniper",
    "char": "D"
  },
  {
    "file": "cldbzattacksaiyans",
    "title": "Dbzattacksaiyans",
    "char": "D"
  },
  {
    "file": "cldbzdevolution",
    "title": "Dbzdevolution",
    "char": "D"
  },
  {
    "file": "cldbzsuperwarriorssonic",
    "title": "Dbzsuperwarriorssonic",
    "char": "D"
  },
  {
    "file": "cldbzwarriors2",
    "title": "Dbzwarriors 2",
    "char": "D"
  },
  {
    "file": "clddlc64",
    "title": "Ddlc 64",
    "char": "D"
  },
  {
    "file": "cldeadair",
    "title": "Deadair",
    "char": "D"
  },
  {
    "file": "cldeadestate",
    "title": "Deadestate",
    "char": "D"
  },
  {
    "file": "cldeadfrontieroutbreak",
    "title": "Deadfrontieroutbreak",
    "char": "D"
  },
  {
    "file": "cldeadfrontieroutbreak2",
    "title": "Deadfrontieroutbreak 2",
    "char": "D"
  },
  {
    "file": "cldeadlydescent",
    "title": "Deadlydescent",
    "char": "D"
  },
  {
    "file": "cldeadplate",
    "title": "Deadplate",
    "char": "D"
  },
  {
    "file": "cldeadseat",
    "title": "Deadseat",
    "char": "D"
  },
  {
    "file": "cldeadzed",
    "title": "Deadzed",
    "char": "D"
  },
  {
    "file": "cldeadzed2",
    "title": "Deadzed 2",
    "char": "D"
  },
  {
    "file": "cldeathchase",
    "title": "Deathchase",
    "char": "D"
  },
  {
    "file": "cldeathrun",
    "title": "Deathrun",
    "char": "D"
  },
  {
    "file": "cldeblob2",
    "title": "Deblob 2",
    "char": "D"
  },
  {
    "file": "cldecision",
    "title": "Decision",
    "char": "D"
  },
  {
    "file": "cldecision2",
    "title": "Decision 2",
    "char": "D"
  },
  {
    "file": "cldecision3",
    "title": "Decision 3",
    "char": "D"
  },
  {
    "file": "cldecisionmedieval",
    "title": "Decisionmedieval",
    "char": "D"
  },
  {
    "file": "cldeepersleep",
    "title": "Deepersleep",
    "char": "D"
  },
  {
    "file": "cldeepestsword",
    "title": "Deepestsword",
    "char": "D"
  },
  {
    "file": "cldeepsleep",
    "title": "Deepsleep",
    "char": "D"
  },
  {
    "file": "cldefenderarcade",
    "title": "Defenderarcade",
    "char": "D"
  },
  {
    "file": "cldefendyourcastle",
    "title": "Defendyourcastle",
    "char": "D"
  },
  {
    "file": "cldefendyournuts",
    "title": "Defendyournuts",
    "char": "D"
  },
  {
    "file": "cldefendyournuts2",
    "title": "Defendyournuts 2",
    "char": "D"
  },
  {
    "file": "cldeltarune",
    "title": "Deltarune",
    "char": "D"
  },
  {
    "file": "cldeltatraveler",
    "title": "Deltatraveler",
    "char": "D"
  },
  {
    "file": "cldementium",
    "title": "Dementium",
    "char": "D"
  },
  {
    "file": "cldemolitionderbycrashracing",
    "title": "Demolitionderbycrashracing",
    "char": "D"
  },
  {
    "file": "cldemonblade",
    "title": "Demonblade",
    "char": "D"
  },
  {
    "file": "cldemonbluff",
    "title": "Demonbluff",
    "char": "D"
  },
  {
    "file": "cldiablo",
    "title": "Diablo",
    "char": "D"
  },
  {
    "file": "cldiamondhollow",
    "title": "Diamondhollow",
    "char": "D"
  },
  {
    "file": "cldiamondhollow2",
    "title": "Diamondhollow 2",
    "char": "D"
  },
  {
    "file": "cldiddykong-racing",
    "title": "Diddykong-racing",
    "char": "D"
  },
  {
    "file": "cldieinthedungeon",
    "title": "Dieinthedungeon",
    "char": "D"
  },
  {
    "file": "cldigdeep",
    "title": "Digdeep",
    "char": "D"
  },
  {
    "file": "cldigdug",
    "title": "Digdug",
    "char": "D"
  },
  {
    "file": "cldigdug2",
    "title": "Digdug 2",
    "char": "D"
  },
  {
    "file": "cldigdug26",
    "title": "Digdug 26",
    "char": "D"
  },
  {
    "file": "cldigtochina",
    "title": "Digtochina",
    "char": "D"
  },
  {
    "file": "cldimensionalincident",
    "title": "Dimensionalincident",
    "char": "D"
  },
  {
    "file": "cldinodudes",
    "title": "Dinodudes",
    "char": "D"
  },
  {
    "file": "cldinorun",
    "title": "Dinorun",
    "char": "D"
  },
  {
    "file": "cldinorunenterplanetd",
    "title": "Dinorunenterplanetd",
    "char": "D"
  },
  {
    "file": "cldinorunmarathonofdoom",
    "title": "Dinorunmarathonofdoom",
    "char": "D"
  },
  {
    "file": "cldiredecks",
    "title": "Diredecks",
    "char": "D"
  },
  {
    "file": "cldkccompetitioncart",
    "title": "Dkccompetitioncart",
    "char": "D"
  },
  {
    "file": "clDKNESCollection(1)",
    "title": "DKNESCollection(1)",
    "char": "D"
  },
  {
    "file": "clDKNESCollection",
    "title": "DKNESCollection",
    "char": "D"
  },
  {
    "file": "clDigOutofPrison",
    "title": "Dig Outof Prison",
    "char": "D"
  },
  {
    "file": "cldoblox",
    "title": "Doblox",
    "char": "D"
  },
  {
    "file": "cldogeminer",
    "title": "Dogeminer",
    "char": "D"
  },
  {
    "file": "cldogeminer2",
    "title": "Dogeminer 2",
    "char": "D"
  },
  {
    "file": "cldokidokiliteratureclub",
    "title": "Dokidokiliteratureclub",
    "char": "D"
  },
  {
    "file": "cldomeromantik",
    "title": "Domeromantik",
    "char": "D"
  },
  {
    "file": "cldonkeykong",
    "title": "Donkeykong",
    "char": "D"
  },
  {
    "file": "cldonkeykong64",
    "title": "Donkeykong 64",
    "char": "D"
  },
  {
    "file": "cldonkeykong94",
    "title": "Donkeykong 94",
    "char": "D"
  },
  {
    "file": "cldonkeykongcountry",
    "title": "Donkeykongcountry",
    "char": "D"
  },
  {
    "file": "cldonkeykongcountry2",
    "title": "Donkeykongcountry 2",
    "char": "D"
  },
  {
    "file": "cldonkeykongcountry3",
    "title": "Donkeykongcountry 3",
    "char": "D"
  },
  {
    "file": "cldonkeykongnes",
    "title": "Donkeykongnes",
    "char": "D"
  },
  {
    "file": "cldontescape",
    "title": "Dontescape",
    "char": "D"
  },
  {
    "file": "cldontescape2",
    "title": "Dontescape 2",
    "char": "D"
  },
  {
    "file": "cldontescape3",
    "title": "Dontescape 3",
    "char": "D"
  },
  {
    "file": "cldontyoulecturemehtml",
    "title": "Dontyoulecturemehtml",
    "char": "D"
  },
  {
    "file": "cldoodlejump",
    "title": "Doodlejump",
    "char": "D"
  },
  {
    "file": "cldoodlejumpgoober",
    "title": "Doodlejumpgoober",
    "char": "D"
  },
  {
    "file": "cldoom",
    "title": "Doom",
    "char": "D"
  },
  {
    "file": "cldoom2",
    "title": "Doom 2",
    "char": "D"
  },
  {
    "file": "cldoom2d",
    "title": "Doom 2 D",
    "char": "D"
  },
  {
    "file": "cldoom2dDOS",
    "title": "Doom 2 D DOS",
    "char": "D"
  },
  {
    "file": "cldoom2dos",
    "title": "Doom 2 Dos",
    "char": "D"
  },
  {
    "file": "cldoom3pack",
    "title": "Doom 3 Pack",
    "char": "D"
  },
  {
    "file": "cldoom64",
    "title": "Doom 64",
    "char": "D"
  },
  {
    "file": "cldoomdos",
    "title": "Doomdos",
    "char": "D"
  },
  {
    "file": "cldoomemscripten",
    "title": "Doomemscripten",
    "char": "D"
  },
  {
    "file": "cldoomps",
    "title": "Doomps",
    "char": "D"
  },
  {
    "file": "cldoompsalt",
    "title": "Doompsalt",
    "char": "D"
  },
  {
    "file": "cldoomzio",
    "title": "Doomzio",
    "char": "D"
  },
  {
    "file": "cldoorscastle",
    "title": "Doorscastle",
    "char": "D"
  },
  {
    "file": "cldoswasmx",
    "title": "Doswasmx",
    "char": "D"
  },
  {
    "file": "cldoubledribble",
    "title": "Doubledribble",
    "char": "D"
  },
  {
    "file": "cldouchebaglife",
    "title": "Douchebaglife",
    "char": "D"
  },
  {
    "file": "cldouchebagworkout",
    "title": "Douchebagworkout",
    "char": "D"
  },
  {
    "file": "cldouchebagworkout2",
    "title": "Douchebagworkout 2",
    "char": "D"
  },
  {
    "file": "cldownthemountain",
    "title": "Downthemountain",
    "char": "D"
  },
  {
    "file": "cldragonballadvance",
    "title": "Dragonballadvance",
    "char": "D"
  },
  {
    "file": "clDragonBallZTheLegacyofGoku",
    "title": "Dragon Ball ZThe Legacyof Goku",
    "char": "D"
  },
  {
    "file": "cldragonquest5ds",
    "title": "Dragonquest 5 Ds",
    "char": "D"
  },
  {
    "file": "clDragonQuestIX",
    "title": "Dragon Quest IX",
    "char": "D"
  },
  {
    "file": "cldragonwarriormonsters",
    "title": "Dragonwarriormonsters",
    "char": "D"
  },
  {
    "file": "clDragonxclient",
    "title": "Dragonxclient",
    "char": "D"
  },
  {
    "file": "cldrawclimber",
    "title": "Drawclimber",
    "char": "D"
  },
  {
    "file": "cldrawntolife",
    "title": "Drawntolife",
    "char": "D"
  },
  {
    "file": "cldrawntolife2",
    "title": "Drawntolife 2",
    "char": "D"
  },
  {
    "file": "cldrawtheline",
    "title": "Drawtheline",
    "char": "D"
  },
  {
    "file": "cldreader",
    "title": "Dreader",
    "char": "D"
  },
  {
    "file": "cldreadheadparkour",
    "title": "Dreadheadparkour",
    "char": "D"
  },
  {
    "file": "cldriftboss",
    "title": "Driftboss",
    "char": "D"
  },
  {
    "file": "cldrifthuntersmerge",
    "title": "Drifthuntersmerge",
    "char": "D"
  },
  {
    "file": "cldriftsimulator",
    "title": "Driftsimulator",
    "char": "D"
  },
  {
    "file": "cldrivemady",
    "title": "Drivemady",
    "char": "D"
  },
  {
    "file": "cldrivenwild",
    "title": "Drivenwild",
    "char": "D"
  },
  {
    "file": "cldriverussia",
    "title": "Driverussia",
    "char": "D"
  },
  {
    "file": "cldrmario",
    "title": "Drmario",
    "char": "D"
  },
  {
    "file": "cldrweedgaster",
    "title": "Drweedgaster",
    "char": "D"
  },
  {
    "file": "cldta6",
    "title": "Dta 6",
    "char": "D"
  },
  {
    "file": "cldubstep",
    "title": "Dubstep",
    "char": "D"
  },
  {
    "file": "clduckhunt",
    "title": "Duckhunt",
    "char": "D"
  },
  {
    "file": "clducklfe5",
    "title": "Ducklfe 5",
    "char": "D"
  },
  {
    "file": "clducklife",
    "title": "Ducklife",
    "char": "D"
  },
  {
    "file": "clducklife2",
    "title": "Ducklife 2",
    "char": "D"
  },
  {
    "file": "clducklife3",
    "title": "Ducklife 3",
    "char": "D"
  },
  {
    "file": "clducklife4",
    "title": "Ducklife 4",
    "char": "D"
  },
  {
    "file": "clducklifebattle",
    "title": "Ducklifebattle",
    "char": "D"
  },
  {
    "file": "clducklifespace",
    "title": "Ducklifespace",
    "char": "D"
  },
  {
    "file": "clducklingsio",
    "title": "Ducklingsio",
    "char": "D"
  },
  {
    "file": "clducktales",
    "title": "Ducktales",
    "char": "D"
  },
  {
    "file": "clducktales2",
    "title": "Ducktales 2",
    "char": "D"
  },
  {
    "file": "cldud",
    "title": "Dud",
    "char": "D"
  },
  {
    "file": "cldukenukem2",
    "title": "Dukenukem 2",
    "char": "D"
  },
  {
    "file": "cldukenukem3d",
    "title": "Dukenukem 3 D",
    "char": "D"
  },
  {
    "file": "cldumbwaystodie",
    "title": "Dumbwaystodie",
    "char": "D"
  },
  {
    "file": "cldumpling",
    "title": "Dumpling",
    "char": "D"
  },
  {
    "file": "cldunebuggy",
    "title": "Dunebuggy",
    "char": "D"
  },
  {
    "file": "cldungeondeck",
    "title": "Dungeondeck",
    "char": "D"
  },
  {
    "file": "cldungeonraid",
    "title": "Dungeonraid",
    "char": "D"
  },
  {
    "file": "cldungeonsanddegenerategamblers",
    "title": "Dungeonsanddegenerategamblers",
    "char": "D"
  },
  {
    "file": "cldunkshot",
    "title": "Dunkshot",
    "char": "D"
  },
  {
    "file": "clduskchild",
    "title": "Duskchild",
    "char": "D"
  },
  {
    "file": "cldyingdreams",
    "title": "Dyingdreams",
    "char": "D"
  },
  {
    "file": "cldynamiteheaddy",
    "title": "Dynamiteheaddy",
    "char": "D"
  },
  {
    "file": "clEaglercraft-Alpha-126-Offline",
    "title": "Eaglercraft-Alpha-126-Offline",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Beta-1.3-Offline",
    "title": "Eaglercraft-Beta-1.3-Offline",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Beta-13-Offline",
    "title": "Eaglercraft-Beta-13-Offline",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Indev-Offline (1)",
    "title": "Eaglercraft-Indev-Offline (1)",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Indev-Offline(1)",
    "title": "Eaglercraft-Indev-Offline(1)",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Indev-Offline(2)",
    "title": "Eaglercraft-Indev-Offline(2)",
    "char": "E"
  },
  {
    "file": "clEaglercraft-Indev-Offline",
    "title": "Eaglercraft-Indev-Offline",
    "char": "E"
  },
  {
    "file": "cleaglercraft152",
    "title": "Eaglercraft 152",
    "char": "E"
  },
  {
    "file": "clEaglercraftL_19_v0_7_0_Offline_Signed(1)",
    "title": "Eaglercraft L 19 V 0 7 0 Offline Signed(1)",
    "char": "E"
  },
  {
    "file": "clEaglercraftL_19_v0_7_0_Offline_Signed",
    "title": "Eaglercraft L 19 V 0 7 0 Offline Signed",
    "char": "E"
  },
  {
    "file": "cleaglercraftnebula",
    "title": "Eaglercraftnebula",
    "char": "E"
  },
  {
    "file": "cleagleride",
    "title": "Eagleride",
    "char": "E"
  },
  {
    "file": "clearntodie",
    "title": "Earntodie",
    "char": "E"
  },
  {
    "file": "clearntodie2",
    "title": "Earntodie 2",
    "char": "E"
  },
  {
    "file": "clearthbound",
    "title": "Earthbound",
    "char": "E"
  },
  {
    "file": "clearthbound3",
    "title": "Earthbound 3",
    "char": "E"
  },
  {
    "file": "clearthboundsnes",
    "title": "Earthboundsnes",
    "char": "E"
  },
  {
    "file": "clearthtaken",
    "title": "Earthtaken",
    "char": "E"
  },
  {
    "file": "clearthtaken2",
    "title": "Earthtaken 2",
    "char": "E"
  },
  {
    "file": "clearthtaken3",
    "title": "Earthtaken 3",
    "char": "E"
  },
  {
    "file": "clearthwormgg",
    "title": "Earthwormgg",
    "char": "E"
  },
  {
    "file": "clearthwormjim (1)",
    "title": "Earthwormjim (1)",
    "char": "E"
  },
  {
    "file": "clearthwormjim",
    "title": "Earthwormjim",
    "char": "E"
  },
  {
    "file": "clearthwormjim2 (1)",
    "title": "Earthwormjim 2 (1)",
    "char": "E"
  },
  {
    "file": "clearthwormjim2",
    "title": "Earthwormjim 2",
    "char": "E"
  },
  {
    "file": "cledelweiss",
    "title": "Edelweiss",
    "char": "E"
  },
  {
    "file": "cledyscarsimulator",
    "title": "Edyscarsimulator",
    "char": "E"
  },
  {
    "file": "cleffinghail",
    "title": "Effinghail",
    "char": "E"
  },
  {
    "file": "cleffingmachines",
    "title": "Effingmachines",
    "char": "E"
  },
  {
    "file": "cleffingworms",
    "title": "Effingworms",
    "char": "E"
  },
  {
    "file": "cleffingzombies",
    "title": "Effingzombies",
    "char": "E"
  },
  {
    "file": "clegg",
    "title": "Egg",
    "char": "E"
  },
  {
    "file": "cleggycar",
    "title": "Eggycar",
    "char": "E"
  },
  {
    "file": "clelasticface",
    "title": "Elasticface",
    "char": "E"
  },
  {
    "file": "clelectricman2",
    "title": "Electricman 2",
    "char": "E"
  },
  {
    "file": "clelevatoraction",
    "title": "Elevatoraction",
    "char": "E"
  },
  {
    "file": "clelytraflight",
    "title": "Elytraflight",
    "char": "E"
  },
  {
    "file": "clemujs",
    "title": "Emujs",
    "char": "E"
  },
  {
    "file": "clenchain",
    "title": "Enchain",
    "char": "E"
  },
  {
    "file": "clendacopia",
    "title": "Endacopia",
    "char": "E"
  },
  {
    "file": "clendlesswar4",
    "title": "Endlesswar 4",
    "char": "E"
  },
  {
    "file": "clendlesswar5",
    "title": "Endlesswar 5",
    "char": "E"
  },
  {
    "file": "clendlesswar5wow",
    "title": "Endlesswar 5 Wow",
    "char": "E"
  },
  {
    "file": "clendlesswar7",
    "title": "Endlesswar 7",
    "char": "E"
  },
  {
    "file": "clenduro",
    "title": "Enduro",
    "char": "E"
  },
  {
    "file": "clepicbattlefantasy5",
    "title": "Epicbattlefantasy 5",
    "char": "E"
  },
  {
    "file": "clescalatingduel",
    "title": "Escalatingduel",
    "char": "E"
  },
  {
    "file": "clescaperoad",
    "title": "Escaperoad",
    "char": "E"
  },
  {
    "file": "clescaperoadcity2",
    "title": "Escaperoadcity 2",
    "char": "E"
  },
  {
    "file": "clescapeschoolduel",
    "title": "Escapeschoolduel",
    "char": "E"
  },
  {
    "file": "clet",
    "title": "Et",
    "char": "E"
  },
  {
    "file": "cletrianoddyssey",
    "title": "Etrianoddyssey",
    "char": "E"
  },
  {
    "file": "cleurovisionsim",
    "title": "Eurovisionsim",
    "char": "E"
  },
  {
    "file": "clevilglitch",
    "title": "Evilglitch",
    "char": "E"
  },
  {
    "file": "clevolution",
    "title": "Evolution",
    "char": "E"
  },
  {
    "file": "clexcitebike64",
    "title": "Excitebike 64",
    "char": "E"
  },
  {
    "file": "clexitpath",
    "title": "Exitpath",
    "char": "E"
  },
  {
    "file": "clexoobservation",
    "title": "Exoobservation",
    "char": "E"
  },
  {
    "file": "clextremerun3d",
    "title": "Extremerun 3 D",
    "char": "E"
  },
  {
    "file": "clfactoryballs",
    "title": "Factoryballs",
    "char": "F"
  },
  {
    "file": "clfactoryballs2",
    "title": "Factoryballs 2",
    "char": "F"
  },
  {
    "file": "clfactoryballs3",
    "title": "Factoryballs 3",
    "char": "F"
  },
  {
    "file": "clfactoryballs4",
    "title": "Factoryballs 4",
    "char": "F"
  },
  {
    "file": "clfairytalevsonepiece",
    "title": "Fairytalevsonepiece",
    "char": "F"
  },
  {
    "file": "clfallguys",
    "title": "Fallguys",
    "char": "F"
  },
  {
    "file": "clfallout",
    "title": "Fallout",
    "char": "F"
  },
  {
    "file": "clfamidash",
    "title": "Famidash",
    "char": "F"
  },
  {
    "file": "clfamidash128",
    "title": "Famidash 128",
    "char": "F"
  },
  {
    "file": "clfamidash2alpha",
    "title": "Famidash 2 Alpha",
    "char": "F"
  },
  {
    "file": "clfamidashAlbum128",
    "title": "Famidash Album 128",
    "char": "F"
  },
  {
    "file": "clfamidashBSides128",
    "title": "Famidash BSides 128",
    "char": "F"
  },
  {
    "file": "clfamidashCSides128",
    "title": "Famidash CSides 128",
    "char": "F"
  },
  {
    "file": "clfamidashDSides128",
    "title": "Famidash DSides 128",
    "char": "F"
  },
  {
    "file": "clfamilyguycorrupted",
    "title": "Familyguycorrupted",
    "char": "F"
  },
  {
    "file": "clfancypantsadventure",
    "title": "Fancypantsadventure",
    "char": "F"
  },
  {
    "file": "clfancypantsadventure2",
    "title": "Fancypantsadventure 2",
    "char": "F"
  },
  {
    "file": "clfancypantsadventure3",
    "title": "Fancypantsadventure 3",
    "char": "F"
  },
  {
    "file": "clfancysnowboarding",
    "title": "Fancysnowboarding",
    "char": "F"
  },
  {
    "file": "clfantasyzone",
    "title": "Fantasyzone",
    "char": "F"
  },
  {
    "file": "clfashionbattle",
    "title": "Fashionbattle",
    "char": "F"
  },
  {
    "file": "clfattygenius",
    "title": "Fattygenius",
    "char": "F"
  },
  {
    "file": "clfearassessment",
    "title": "Fearassessment",
    "char": "F"
  },
  {
    "file": "clfearstofathomhomealone",
    "title": "Fearstofathomhomealone",
    "char": "F"
  },
  {
    "file": "clfeedthevoid",
    "title": "Feedthevoid",
    "char": "F"
  },
  {
    "file": "clfeedus",
    "title": "Feedus",
    "char": "F"
  },
  {
    "file": "clfeedus2",
    "title": "Feedus 2",
    "char": "F"
  },
  {
    "file": "clfeedus3",
    "title": "Feedus 3",
    "char": "F"
  },
  {
    "file": "clfeedus4",
    "title": "Feedus 4",
    "char": "F"
  },
  {
    "file": "clfeedus5",
    "title": "Feedus 5",
    "char": "F"
  },
  {
    "file": "clff2ws",
    "title": "Ff 2 Ws",
    "char": "F"
  },
  {
    "file": "clFF3",
    "title": "FF 3",
    "char": "F"
  },
  {
    "file": "clff6",
    "title": "Ff 6",
    "char": "F"
  },
  {
    "file": "clffaf",
    "title": "Ffaf",
    "char": "F"
  },
  {
    "file": "clffmysticquest",
    "title": "Ffmysticquest",
    "char": "F"
  },
  {
    "file": "clFFsonic1",
    "title": "FFsonic 1",
    "char": "F"
  },
  {
    "file": "clFFsonic2",
    "title": "FFsonic 2",
    "char": "F"
  },
  {
    "file": "clFFsonic3",
    "title": "FFsonic 3",
    "char": "F"
  },
  {
    "file": "clFFsonic4",
    "title": "FFsonic 4",
    "char": "F"
  },
  {
    "file": "clFFsonic5",
    "title": "FFsonic 5",
    "char": "F"
  },
  {
    "file": "clFFsonic61",
    "title": "FFsonic 61",
    "char": "F"
  },
  {
    "file": "clFFsonic62",
    "title": "FFsonic 62",
    "char": "F"
  },
  {
    "file": "clFIFA07",
    "title": "FIFA 07",
    "char": "F"
  },
  {
    "file": "clFIFA10",
    "title": "FIFA 10",
    "char": "F"
  },
  {
    "file": "clFIFA11",
    "title": "FIFA 11",
    "char": "F"
  },
  {
    "file": "clFIFA2000(1)",
    "title": "FIFA 2000(1)",
    "char": "F"
  },
  {
    "file": "clFIFA2000(2)",
    "title": "FIFA 2000(2)",
    "char": "F"
  },
  {
    "file": "clfifa2000",
    "title": "Fifa 2000",
    "char": "F"
  },
  {
    "file": "clFIFA99",
    "title": "FIFA 99",
    "char": "F"
  },
  {
    "file": "clFIFAinternationalsoccer",
    "title": "FIFAinternationalsoccer",
    "char": "F"
  },
  {
    "file": "clFIFAroadtoworldcup98",
    "title": "FIFAroadtoworldcup 98",
    "char": "F"
  },
  {
    "file": "clFIFAsoccer06",
    "title": "FIFAsoccer 06",
    "char": "F"
  },
  {
    "file": "clFIFAsoccer95",
    "title": "FIFAsoccer 95",
    "char": "F"
  },
  {
    "file": "clFIFAsoccer96",
    "title": "FIFAsoccer 96",
    "char": "F"
  },
  {
    "file": "clFIFAsoccer97",
    "title": "FIFAsoccer 97",
    "char": "F"
  },
  {
    "file": "clFIFAstreet2",
    "title": "FIFAstreet 2",
    "char": "F"
  },
  {
    "file": "clfinalearth2",
    "title": "Finalearth 2",
    "char": "F"
  },
  {
    "file": "clfinalfantasy",
    "title": "Finalfantasy",
    "char": "F"
  },
  {
    "file": "clfinalfantasy2nes",
    "title": "Finalfantasy 2 Nes",
    "char": "F"
  },
  {
    "file": "clfinalfantasy3nes",
    "title": "Finalfantasy 3 Nes",
    "char": "F"
  },
  {
    "file": "clfinalfantasyII",
    "title": "Finalfantasy II",
    "char": "F"
  },
  {
    "file": "clfinalfantasyIX",
    "title": "Finalfantasy IX",
    "char": "F"
  },
  {
    "file": "clfinalfantasylegend2",
    "title": "Finalfantasylegend 2",
    "char": "F"
  },
  {
    "file": "clfinalfantasytactics",
    "title": "Finalfantasytactics",
    "char": "F"
  },
  {
    "file": "clfinalfantasyVI",
    "title": "Finalfantasy VI",
    "char": "F"
  },
  {
    "file": "clfinalfantasyVII",
    "title": "Finalfantasy VII",
    "char": "F"
  },
  {
    "file": "clfinalfantasyVIId2",
    "title": "Finalfantasy VIId 2",
    "char": "F"
  },
  {
    "file": "clfinalfantasyVIId3",
    "title": "Finalfantasy VIId 3",
    "char": "F"
  },
  {
    "file": "clfinalfantasyVIItheothertetrr",
    "title": "Finalfantasy VIItheothertetrr",
    "char": "F"
  },
  {
    "file": "clfinalninja",
    "title": "Finalninja",
    "char": "F"
  },
  {
    "file": "clfindthealien",
    "title": "Findthealien",
    "char": "F"
  },
  {
    "file": "clfireblob",
    "title": "Fireblob",
    "char": "F"
  },
  {
    "file": "clfireboyandwatergirl",
    "title": "Fireboyandwatergirl",
    "char": "F"
  },
  {
    "file": "clfireboyandwatergirl2",
    "title": "Fireboyandwatergirl 2",
    "char": "F"
  },
  {
    "file": "clfireboyandwatergirl3",
    "title": "Fireboyandwatergirl 3",
    "char": "F"
  },
  {
    "file": "clfireboyandwatergirl5",
    "title": "Fireboyandwatergirl 5",
    "char": "F"
  },
  {
    "file": "clfireboyandwatergirl6",
    "title": "Fireboyandwatergirl 6",
    "char": "F"
  },
  {
    "file": "clfireemblem",
    "title": "Fireemblem",
    "char": "F"
  },
  {
    "file": "clfisheatgettingbig",
    "title": "Fisheatgettingbig",
    "char": "F"
  },
  {
    "file": "clfisquarium",
    "title": "Fisquarium",
    "char": "F"
  },
  {
    "file": "clfivenightsatbaldisredone",
    "title": "Fivenightsatbaldisredone",
    "char": "F"
  },
  {
    "file": "clfivenightsatepsteins",
    "title": "Fivenightsatepsteins",
    "char": "F"
  },
  {
    "file": "clfivenightsatshreks",
    "title": "Fivenightsatshreks",
    "char": "F"
  },
  {
    "file": "clfivenightsatshrekshotel",
    "title": "Fivenightsatshrekshotel",
    "char": "F"
  },
  {
    "file": "clfivenightsatyoshis",
    "title": "Fivenightsatyoshis",
    "char": "F"
  },
  {
    "file": "clflappybird",
    "title": "Flappybird",
    "char": "F"
  },
  {
    "file": "clflashsonic",
    "title": "Flashsonic",
    "char": "F"
  },
  {
    "file": "clFleurdeLis",
    "title": "Fleurde Lis",
    "char": "F"
  },
  {
    "file": "clfloodrunner",
    "title": "Floodrunner",
    "char": "F"
  },
  {
    "file": "clfloodrunner2",
    "title": "Floodrunner 2",
    "char": "F"
  },
  {
    "file": "clfloodrunner4",
    "title": "Floodrunner 4",
    "char": "F"
  },
  {
    "file": "clfluidism",
    "title": "Fluidism",
    "char": "F"
  },
  {
    "file": "clfnac1",
    "title": "Fnac 1",
    "char": "F"
  },
  {
    "file": "clfnac2",
    "title": "Fnac 2",
    "char": "F"
  },
  {
    "file": "clFNAF",
    "title": "FNAF",
    "char": "F"
  },
  {
    "file": "clFNAF2",
    "title": "FNAF 2",
    "char": "F"
  },
  {
    "file": "clFNAF3",
    "title": "FNAF 3",
    "char": "F"
  },
  {
    "file": "clfnaf3remastered",
    "title": "Fnaf 3 Remastered",
    "char": "F"
  },
  {
    "file": "clFNAF4",
    "title": "FNAF 4",
    "char": "F"
  },
  {
    "file": "clfnaf4halloween",
    "title": "Fnaf 4 Halloween",
    "char": "F"
  },
  {
    "file": "clfnafanimatronics",
    "title": "Fnafanimatronics",
    "char": "F"
  },
  {
    "file": "clfnafps",
    "title": "Fnafps",
    "char": "F"
  },
  {
    "file": "clfnafshooter",
    "title": "Fnafshooter",
    "char": "F"
  },
  {
    "file": "clfnafsl",
    "title": "Fnafsl",
    "char": "F"
  },
  {
    "file": "clfnafucn",
    "title": "Fnafucn",
    "char": "F"
  },
  {
    "file": "clfnafworldd",
    "title": "Fnafworldd",
    "char": "F"
  },
  {
    "file": "clfnaw",
    "title": "Fnaw",
    "char": "F"
  },
  {
    "file": "clfnfaethos",
    "title": "Fnfaethos",
    "char": "F"
  },
  {
    "file": "clfnfagoti",
    "title": "Fnfagoti",
    "char": "F"
  },
  {
    "file": "clfnfakage",
    "title": "Fnfakage",
    "char": "F"
  },
  {
    "file": "clfnfanimation",
    "title": "Fnfanimation",
    "char": "F"
  },
  {
    "file": "clfnfannie",
    "title": "Fnfannie",
    "char": "F"
  },
  {
    "file": "clfnfasdf",
    "title": "Fnfasdf",
    "char": "F"
  },
  {
    "file": "clfnfbelowdepths",
    "title": "Fnfbelowdepths",
    "char": "F"
  },
  {
    "file": "clfnfbfdi26",
    "title": "Fnfbfdi 26",
    "char": "F"
  },
  {
    "file": "clfnfbinarybreakdown",
    "title": "Fnfbinarybreakdown",
    "char": "F"
  },
  {
    "file": "clfnfblackbetrayal",
    "title": "Fnfblackbetrayal",
    "char": "F"
  },
  {
    "file": "clfnfbside",
    "title": "Fnfbside",
    "char": "F"
  },
  {
    "file": "clfnfcamelliarudeblaster",
    "title": "Fnfcamelliarudeblaster",
    "char": "F"
  },
  {
    "file": "clfnfcandycarrier",
    "title": "Fnfcandycarrier",
    "char": "F"
  },
  {
    "file": "clfnfchara",
    "title": "Fnfchara",
    "char": "F"
  },
  {
    "file": "clfnfcitytales",
    "title": "Fnfcitytales",
    "char": "F"
  },
  {
    "file": "clfnfclassified",
    "title": "Fnfclassified",
    "char": "F"
  },
  {
    "file": "clfnfcorrosion",
    "title": "Fnfcorrosion",
    "char": "F"
  },
  {
    "file": "clfnfcory",
    "title": "Fnfcory",
    "char": "F"
  },
  {
    "file": "clfnfcrunchin",
    "title": "Fnfcrunchin",
    "char": "F"
  },
  {
    "file": "clfnfdeciever",
    "title": "Fnfdeciever",
    "char": "F"
  },
  {
    "file": "clfnfdesolation",
    "title": "Fnfdesolation",
    "char": "F"
  },
  {
    "file": "clfnfdocumictxtv3",
    "title": "Fnfdocumictxtv 3",
    "char": "F"
  },
  {
    "file": "clfnfdokitakeoverplus",
    "title": "Fnfdokitakeoverplus",
    "char": "F"
  },
  {
    "file": "clfnfdropandroll",
    "title": "Fnfdropandroll",
    "char": "F"
  },
  {
    "file": "clfnfdsides",
    "title": "Fnfdsides",
    "char": "F"
  },
  {
    "file": "clfnfdustin",
    "title": "Fnfdustin",
    "char": "F"
  },
  {
    "file": "clfnfdusttale",
    "title": "Fnfdusttale",
    "char": "F"
  },
  {
    "file": "clfnffleetway",
    "title": "Fnffleetway",
    "char": "F"
  },
  {
    "file": "clfnfflippedout",
    "title": "Fnfflippedout",
    "char": "F"
  },
  {
    "file": "clfnffnaf1",
    "title": "Fnffnaf 1",
    "char": "F"
  },
  {
    "file": "clfnffnaf2",
    "title": "Fnffnaf 2",
    "char": "F"
  },
  {
    "file": "clfnffnaf3",
    "title": "Fnffnaf 3",
    "char": "F"
  },
  {
    "file": "clfnffnatpt",
    "title": "Fnffnatpt",
    "char": "F"
  },
  {
    "file": "clfnfgamebreakerbundle",
    "title": "Fnfgamebreakerbundle",
    "char": "F"
  },
  {
    "file": "clfnfgfmode",
    "title": "Fnfgfmode",
    "char": "F"
  },
  {
    "file": "clfnfgodot",
    "title": "Fnfgodot",
    "char": "F"
  },
  {
    "file": "clfnfgoldenapple",
    "title": "Fnfgoldenapple",
    "char": "F"
  },
  {
    "file": "clfnfhank",
    "title": "Fnfhank",
    "char": "F"
  },
  {
    "file": "clfnfheartbreakhavoc",
    "title": "Fnfheartbreakhavoc",
    "char": "F"
  },
  {
    "file": "clfnfherobrine",
    "title": "Fnfherobrine",
    "char": "F"
  },
  {
    "file": "clfnfhex",
    "title": "Fnfhex",
    "char": "F"
  },
  {
    "file": "clfnfholiday",
    "title": "Fnfholiday",
    "char": "F"
  },
  {
    "file": "clfnfhorkglorpgloop",
    "title": "Fnfhorkglorpgloop",
    "char": "F"
  },
  {
    "file": "clfnfhotline",
    "title": "Fnfhotline",
    "char": "F"
  },
  {
    "file": "clfnfhypnoslullaby",
    "title": "Fnfhypnoslullaby",
    "char": "F"
  },
  {
    "file": "clfnfimposter3",
    "title": "Fnfimposter 3",
    "char": "F"
  },
  {
    "file": "clfnfimposterv4",
    "title": "Fnfimposterv 4",
    "char": "F"
  },
  {
    "file": "clfnfindiecross",
    "title": "Fnfindiecross",
    "char": "F"
  },
  {
    "file": "clfnfinfernalbout",
    "title": "Fnfinfernalbout",
    "char": "F"
  },
  {
    "file": "clfnfinfiniteirida",
    "title": "Fnfinfiniteirida",
    "char": "F"
  },
  {
    "file": "clfnfironlung",
    "title": "Fnfironlung",
    "char": "F"
  },
  {
    "file": "clfnfjapcreepypasta",
    "title": "Fnfjapcreepypasta",
    "char": "F"
  },
  {
    "file": "clfnfmadnesspoop",
    "title": "Fnfmadnesspoop",
    "char": "F"
  },
  {
    "file": "clfnfmaginagematches",
    "title": "Fnfmaginagematches",
    "char": "F"
  },
  {
    "file": "clfnfmariomadnessdside",
    "title": "Fnfmariomadnessdside",
    "char": "F"
  },
  {
    "file": "clfnfmarioport",
    "title": "Fnfmarioport",
    "char": "F"
  },
  {
    "file": "clfnfmcmadness",
    "title": "Fnfmcmadness",
    "char": "F"
  },
  {
    "file": "clfnfmidfight",
    "title": "Fnfmidfight",
    "char": "F"
  },
  {
    "file": "clfnfmiku",
    "title": "Fnfmiku",
    "char": "F"
  },
  {
    "file": "clfnfmobmod",
    "title": "Fnfmobmod",
    "char": "F"
  },
  {
    "file": "clfnfneo",
    "title": "Fnfneo",
    "char": "F"
  },
  {
    "file": "clfnfpiggyfield",
    "title": "Fnfpiggyfield",
    "char": "F"
  },
  {
    "file": "clfnfplutoshi",
    "title": "Fnfplutoshi",
    "char": "F"
  },
  {
    "file": "clfnfpokepastaperdition",
    "title": "Fnfpokepastaperdition",
    "char": "F"
  },
  {
    "file": "clfnfporifera",
    "title": "Fnfporifera",
    "char": "F"
  },
  {
    "file": "clfnfqt",
    "title": "Fnfqt",
    "char": "F"
  },
  {
    "file": "clfnfremnants",
    "title": "Fnfremnants",
    "char": "F"
  },
  {
    "file": "clfnfretrospecter",
    "title": "Fnfretrospecter",
    "char": "F"
  },
  {
    "file": "clfnfrevmixed",
    "title": "Fnfrevmixed",
    "char": "F"
  },
  {
    "file": "clfnfrewrite",
    "title": "Fnfrewrite",
    "char": "F"
  },
  {
    "file": "clfnfrhythmicrev",
    "title": "Fnfrhythmicrev",
    "char": "F"
  },
  {
    "file": "clfnfrottensmoothie",
    "title": "Fnfrottensmoothie",
    "char": "F"
  },
  {
    "file": "clfnfselfpaced",
    "title": "Fnfselfpaced",
    "char": "F"
  },
  {
    "file": "clfnfshaggy4keys",
    "title": "Fnfshaggy 4 Keys",
    "char": "F"
  },
  {
    "file": "clfnfshaggyxmatt",
    "title": "Fnfshaggyxmatt",
    "char": "F"
  },
  {
    "file": "clfnfshucks-v2",
    "title": "Fnfshucks-v 2",
    "char": "F"
  },
  {
    "file": "clfnfshucksv2",
    "title": "Fnfshucksv 2",
    "char": "F"
  },
  {
    "file": "clfnfsky",
    "title": "Fnfsky",
    "char": "F"
  },
  {
    "file": "clfnfsoft",
    "title": "Fnfsoft",
    "char": "F"
  },
  {
    "file": "clfnfsonicexe",
    "title": "Fnfsonicexe",
    "char": "F"
  },
  {
    "file": "clfnfsonicexe4",
    "title": "Fnfsonicexe 4",
    "char": "F"
  },
  {
    "file": "clfnfstarlightmayhem",
    "title": "Fnfstarlightmayhem",
    "char": "F"
  },
  {
    "file": "clfnfstridentcrisis",
    "title": "Fnfstridentcrisis",
    "char": "F"
  },
  {
    "file": "clfnftailsgetstrolled",
    "title": "Fnftailsgetstrolled",
    "char": "F"
  },
  {
    "file": "clfnftooslowfran",
    "title": "Fnftooslowfran",
    "char": "F"
  },
  {
    "file": "clfnftricky",
    "title": "Fnftricky",
    "char": "F"
  },
  {
    "file": "clfnfTWIDDLEFINGER",
    "title": "Fnf TWIDDLEFINGER",
    "char": "F"
  },
  {
    "file": "clfnfundertale",
    "title": "Fnfundertale",
    "char": "F"
  },
  {
    "file": "clfnfvoid",
    "title": "Fnfvoid",
    "char": "F"
  },
  {
    "file": "clfnfvstabi",
    "title": "Fnfvstabi",
    "char": "F"
  },
  {
    "file": "clfnfwaltenfiles",
    "title": "Fnfwaltenfiles",
    "char": "F"
  },
  {
    "file": "clfnfwednesday-infedility",
    "title": "Fnfwednesday-infedility",
    "char": "F"
  },
  {
    "file": "clfnfwhitty",
    "title": "Fnfwhitty",
    "char": "F"
  },
  {
    "file": "clfnfzardy",
    "title": "Fnfzardy",
    "char": "F"
  },
  {
    "file": "clfocus",
    "title": "Focus",
    "char": "F"
  },
  {
    "file": "clfolderdungeon",
    "title": "Folderdungeon",
    "char": "F"
  },
  {
    "file": "clfootballbros",
    "title": "Footballbros",
    "char": "F"
  },
  {
    "file": "clfootballlegends",
    "title": "Footballlegends",
    "char": "F"
  },
  {
    "file": "clforknsausage",
    "title": "Forknsausage",
    "char": "F"
  },
  {
    "file": "clfortzone",
    "title": "Fortzone",
    "char": "F"
  },
  {
    "file": "clfpa4p1",
    "title": "Fpa 4 P 1",
    "char": "F"
  },
  {
    "file": "clfpa4p2",
    "title": "Fpa 4 P 2",
    "char": "F"
  },
  {
    "file": "clfreegemas",
    "title": "Freegemas",
    "char": "F"
  },
  {
    "file": "clfreerider",
    "title": "Freerider",
    "char": "F"
  },
  {
    "file": "clfreerider2",
    "title": "Freerider 2",
    "char": "F"
  },
  {
    "file": "clfreerider3",
    "title": "Freerider 3",
    "char": "F"
  },
  {
    "file": "clfridaynightfunkin",
    "title": "Fridaynightfunkin",
    "char": "F"
  },
  {
    "file": "clfroggerarcade",
    "title": "Froggerarcade",
    "char": "F"
  },
  {
    "file": "clfromrusttoash",
    "title": "Fromrusttoash",
    "char": "F"
  },
  {
    "file": "clfruitninja",
    "title": "Fruitninja",
    "char": "F"
  },
  {
    "file": "clfunkinmix",
    "title": "Funkinmix",
    "char": "F"
  },
  {
    "file": "clfunnybattle",
    "title": "Funnybattle",
    "char": "F"
  },
  {
    "file": "clfunnybattle2",
    "title": "Funnybattle 2",
    "char": "F"
  },
  {
    "file": "clfunnymadracing",
    "title": "Funnymadracing",
    "char": "F"
  },
  {
    "file": "clfunnyshooter2",
    "title": "Funnyshooter 2",
    "char": "F"
  },
  {
    "file": "clfunnyshooter22",
    "title": "Funnyshooter 22",
    "char": "F"
  },
  {
    "file": "clfuschiax",
    "title": "Fuschiax",
    "char": "F"
  },
  {
    "file": "clfused240",
    "title": "Fused 240",
    "char": "F"
  },
  {
    "file": "clfzero",
    "title": "Fzero",
    "char": "F"
  },
  {
    "file": "clfzerox",
    "title": "Fzerox",
    "char": "F"
  },
  {
    "file": "clgachaverse",
    "title": "Gachaverse",
    "char": "G"
  },
  {
    "file": "clGain Ground",
    "title": "Gain Ground",
    "char": "G"
  },
  {
    "file": "clgalaga",
    "title": "Galaga",
    "char": "G"
  },
  {
    "file": "clgameandwatchcollection",
    "title": "Gameandwatchcollection",
    "char": "G"
  },
  {
    "file": "clgamewatchgallery3",
    "title": "Gamewatchgallery 3",
    "char": "G"
  },
  {
    "file": "clgangstabean",
    "title": "Gangstabean",
    "char": "G"
  },
  {
    "file": "clgangstabean2",
    "title": "Gangstabean 2",
    "char": "G"
  },
  {
    "file": "clgangsterbros",
    "title": "Gangsterbros",
    "char": "G"
  },
  {
    "file": "clgarcello",
    "title": "Garcello",
    "char": "G"
  },
  {
    "file": "clgarfcaughtinact",
    "title": "Garfcaughtinact",
    "char": "G"
  },
  {
    "file": "clgdlite",
    "title": "Gdlite",
    "char": "G"
  },
  {
    "file": "clgeneralchaos",
    "title": "Generalchaos",
    "char": "G"
  },
  {
    "file": "clgenericfightermaybe",
    "title": "Genericfightermaybe",
    "char": "G"
  },
  {
    "file": "clgeometrydashscratch",
    "title": "Geometrydashscratch",
    "char": "G"
  },
  {
    "file": "clgeometryvibes",
    "title": "Geometryvibes",
    "char": "G"
  },
  {
    "file": "clgeorgeandtheprinter",
    "title": "Georgeandtheprinter",
    "char": "G"
  },
  {
    "file": "clgetawayshootout",
    "title": "Getawayshootout",
    "char": "G"
  },
  {
    "file": "clgetontop",
    "title": "Getontop",
    "char": "G"
  },
  {
    "file": "clGettothetopalthoughthereisnotop",
    "title": "Gettothetopalthoughthereisnotop",
    "char": "G"
  },
  {
    "file": "clgetyoked",
    "title": "Getyoked",
    "char": "G"
  },
  {
    "file": "clggshinobi",
    "title": "Ggshinobi",
    "char": "G"
  },
  {
    "file": "clggshinobi2",
    "title": "Ggshinobi 2",
    "char": "G"
  },
  {
    "file": "clghosttrick",
    "title": "Ghosttrick",
    "char": "G"
  },
  {
    "file": "clgimmietheairpod",
    "title": "Gimmietheairpod",
    "char": "G"
  },
  {
    "file": "clgladdihoppers",
    "title": "Gladdihoppers",
    "char": "G"
  },
  {
    "file": "clglfighters",
    "title": "Glfighters",
    "char": "G"
  },
  {
    "file": "clgloryhunters",
    "title": "Gloryhunters",
    "char": "G"
  },
  {
    "file": "clglover",
    "title": "Glover",
    "char": "G"
  },
  {
    "file": "clgoalsouthafrica",
    "title": "Goalsouthafrica",
    "char": "G"
  },
  {
    "file": "clgobble",
    "title": "Gobble",
    "char": "G"
  },
  {
    "file": "clgoingballs",
    "title": "Goingballs",
    "char": "G"
  },
  {
    "file": "clgolddiggerfrvr",
    "title": "Golddiggerfrvr",
    "char": "G"
  },
  {
    "file": "clgoldenaxe",
    "title": "Goldenaxe",
    "char": "G"
  },
  {
    "file": "clgoldenaxe2",
    "title": "Goldenaxe 2",
    "char": "G"
  },
  {
    "file": "clgoldenaxe3",
    "title": "Goldenaxe 3",
    "char": "G"
  },
  {
    "file": "clgoldeneye007",
    "title": "Goldeneye 007",
    "char": "G"
  },
  {
    "file": "clgoldensun",
    "title": "Goldensun",
    "char": "G"
  },
  {
    "file": "clgoldensunnds",
    "title": "Goldensunnds",
    "char": "G"
  },
  {
    "file": "clGoldenSunTheLostAge",
    "title": "Golden Sun The Lost Age",
    "char": "G"
  },
  {
    "file": "clgoldminer",
    "title": "Goldminer",
    "char": "G"
  },
  {
    "file": "clgolfbattle",
    "title": "Golfbattle",
    "char": "G"
  },
  {
    "file": "clgolforbit",
    "title": "Golforbit",
    "char": "G"
  },
  {
    "file": "clgolfsunday",
    "title": "Golfsunday",
    "char": "G"
  },
  {
    "file": "clgoodbigtowertinysquare",
    "title": "Goodbigtowertinysquare",
    "char": "G"
  },
  {
    "file": "clgoodbigtowertinysquare2",
    "title": "Goodbigtowertinysquare 2",
    "char": "G"
  },
  {
    "file": "clgoodboygalaxy",
    "title": "Goodboygalaxy",
    "char": "G"
  },
  {
    "file": "clgoodmonkeymart",
    "title": "Goodmonkeymart",
    "char": "G"
  },
  {
    "file": "clgooftroopsnes",
    "title": "Gooftroopsnes",
    "char": "G"
  },
  {
    "file": "clgooglebaseball",
    "title": "Googlebaseball",
    "char": "G"
  },
  {
    "file": "clgoogledino",
    "title": "Googledino",
    "char": "G"
  },
  {
    "file": "clgorescriptclassic",
    "title": "Gorescriptclassic",
    "char": "G"
  },
  {
    "file": "clgorillatag",
    "title": "Gorillatag",
    "char": "G"
  },
  {
    "file": "clgotobed",
    "title": "Gotobed",
    "char": "G"
  },
  {
    "file": "clgrandactionsimulator-ny",
    "title": "Grandactionsimulator-ny",
    "char": "G"
  },
  {
    "file": "clgranddad",
    "title": "Granddad",
    "char": "G"
  },
  {
    "file": "clgrandescapeprison",
    "title": "Grandescapeprison",
    "char": "G"
  },
  {
    "file": "clgrandtheftautoadvance",
    "title": "Grandtheftautoadvance",
    "char": "G"
  },
  {
    "file": "clgranny",
    "title": "Granny",
    "char": "G"
  },
  {
    "file": "clgranny2",
    "title": "Granny 2",
    "char": "G"
  },
  {
    "file": "clgranny22",
    "title": "Granny 22",
    "char": "G"
  },
  {
    "file": "clgranny3",
    "title": "Granny 3",
    "char": "G"
  },
  {
    "file": "clgrannycreepy",
    "title": "Grannycreepy",
    "char": "G"
  },
  {
    "file": "clgrannynightmare",
    "title": "Grannynightmare",
    "char": "G"
  },
  {
    "file": "clgrannyy",
    "title": "Grannyy",
    "char": "G"
  },
  {
    "file": "clgranturismo",
    "title": "Granturismo",
    "char": "G"
  },
  {
    "file": "clgranturismo2",
    "title": "Granturismo 2",
    "char": "G"
  },
  {
    "file": "clgrassmowing",
    "title": "Grassmowing",
    "char": "G"
  },
  {
    "file": "clgravity",
    "title": "Gravity",
    "char": "G"
  },
  {
    "file": "clgravitymod",
    "title": "Gravitymod",
    "char": "G"
  },
  {
    "file": "clgreenergrassawaits",
    "title": "Greenergrassawaits",
    "char": "G"
  },
  {
    "file": "clgrey-box-testing",
    "title": "Grey-box-testing",
    "char": "G"
  },
  {
    "file": "clgrimacebirthday",
    "title": "Grimacebirthday",
    "char": "G"
  },
  {
    "file": "clgrindcraft",
    "title": "Grindcraft",
    "char": "G"
  },
  {
    "file": "clgrn",
    "title": "Grn",
    "char": "G"
  },
  {
    "file": "clgrowagarden",
    "title": "Growagarden",
    "char": "G"
  },
  {
    "file": "clgrowdenio",
    "title": "Growdenio",
    "char": "G"
  },
  {
    "file": "clgrowmi",
    "title": "Growmi",
    "char": "G"
  },
  {
    "file": "clgrowyourgarden",
    "title": "Growyourgarden",
    "char": "G"
  },
  {
    "file": "clgta",
    "title": "Gta",
    "char": "G"
  },
  {
    "file": "clgta2",
    "title": "Gta 2",
    "char": "G"
  },
  {
    "file": "clgta22",
    "title": "Gta 22",
    "char": "G"
  },
  {
    "file": "clgta2alt",
    "title": "Gta 2 Alt",
    "char": "G"
  },
  {
    "file": "clgtaalt",
    "title": "Gtaalt",
    "char": "G"
  },
  {
    "file": "clgtaalty",
    "title": "Gtaalty",
    "char": "G"
  },
  {
    "file": "clgtachina",
    "title": "Gtachina",
    "char": "G"
  },
  {
    "file": "clgtamods",
    "title": "Gtamods",
    "char": "G"
  },
  {
    "file": "clguesstheiranswer",
    "title": "Guesstheiranswer",
    "char": "G"
  },
  {
    "file": "clgun-spin",
    "title": "Gun-spin",
    "char": "G"
  },
  {
    "file": "clgunblood",
    "title": "Gunblood",
    "char": "G"
  },
  {
    "file": "clguncho",
    "title": "Guncho",
    "char": "G"
  },
  {
    "file": "clgunfighterjessejames",
    "title": "Gunfighterjessejames",
    "char": "G"
  },
  {
    "file": "clgunknight",
    "title": "Gunknight",
    "char": "G"
  },
  {
    "file": "clgunmayhem",
    "title": "Gunmayhem",
    "char": "G"
  },
  {
    "file": "clgunmayhem2",
    "title": "Gunmayhem 2",
    "char": "G"
  },
  {
    "file": "clgunmayhem2goof",
    "title": "Gunmayhem 2 Goof",
    "char": "G"
  },
  {
    "file": "clgunmayhemredux",
    "title": "Gunmayhemredux",
    "char": "G"
  },
  {
    "file": "clgunnight",
    "title": "Gunnight",
    "char": "G"
  },
  {
    "file": "clgunsmoke",
    "title": "Gunsmoke",
    "char": "G"
  },
  {
    "file": "clgunstarheroes",
    "title": "Gunstarheroes",
    "char": "G"
  },
  {
    "file": "clgymstack",
    "title": "Gymstack",
    "char": "G"
  },
  {
    "file": "clgyromite",
    "title": "Gyromite",
    "char": "G"
  },
  {
    "file": "clhacx",
    "title": "Hacx",
    "char": "H"
  },
  {
    "file": "clhajimeippo",
    "title": "Hajimeippo",
    "char": "H"
  },
  {
    "file": "clhajimenoippo",
    "title": "Hajimenoippo",
    "char": "H"
  },
  {
    "file": "clhalflife",
    "title": "Halflife",
    "char": "H"
  },
  {
    "file": "clhalocombatdevolved",
    "title": "Halocombatdevolved",
    "char": "H"
  },
  {
    "file": "clhandshakes",
    "title": "Handshakes",
    "char": "H"
  },
  {
    "file": "clhandsofwar (1)",
    "title": "Handsofwar (1)",
    "char": "H"
  },
  {
    "file": "clhandsofwar(1)",
    "title": "Handsofwar(1)",
    "char": "H"
  },
  {
    "file": "clhandsofwar(2)",
    "title": "Handsofwar(2)",
    "char": "H"
  },
  {
    "file": "clhandsofwar",
    "title": "Handsofwar",
    "char": "H"
  },
  {
    "file": "clhandulum",
    "title": "Handulum",
    "char": "H"
  },
  {
    "file": "clhanger",
    "title": "Hanger",
    "char": "H"
  },
  {
    "file": "clhanger2",
    "title": "Hanger 2",
    "char": "H"
  },
  {
    "file": "clhangonsms",
    "title": "Hangonsms",
    "char": "H"
  },
  {
    "file": "clhappyroom",
    "title": "Happyroom",
    "char": "H"
  },
  {
    "file": "clhappywheels",
    "title": "Happywheels",
    "char": "H"
  },
  {
    "file": "clhardwaretycoon",
    "title": "Hardwaretycoon",
    "char": "H"
  },
  {
    "file": "clharmonyofdissonance",
    "title": "Harmonyofdissonance",
    "char": "H"
  },
  {
    "file": "clHaroldsbadday",
    "title": "Haroldsbadday",
    "char": "H"
  },
  {
    "file": "clharvestio",
    "title": "Harvestio",
    "char": "H"
  },
  {
    "file": "clharvestmoon",
    "title": "Harvestmoon",
    "char": "H"
  },
  {
    "file": "clharvestmoon2",
    "title": "Harvestmoon 2",
    "char": "H"
  },
  {
    "file": "clharvestmoon64",
    "title": "Harvestmoon 64",
    "char": "H"
  },
  {
    "file": "clhauntedschool",
    "title": "Hauntedschool",
    "char": "H"
  },
  {
    "file": "clhauntthehouse",
    "title": "Hauntthehouse",
    "char": "H"
  },
  {
    "file": "clheartandsoul",
    "title": "Heartandsoul",
    "char": "H"
  },
  {
    "file": "clheartandsoul121",
    "title": "Heartandsoul 121",
    "char": "H"
  },
  {
    "file": "clhei$t",
    "title": "Hei$t",
    "char": "H"
  },
  {
    "file": "clHelios-Offline (1)",
    "title": "Helios-Offline (1)",
    "char": "H"
  },
  {
    "file": "clHelios-Offline",
    "title": "Helios-Offline",
    "char": "H"
  },
  {
    "file": "clhelixjump",
    "title": "Helixjump",
    "char": "H"
  },
  {
    "file": "clhellron",
    "title": "Hellron",
    "char": "H"
  },
  {
    "file": "clhelpnobrakes",
    "title": "Helpnobrakes",
    "char": "H"
  },
  {
    "file": "clheretic",
    "title": "Heretic",
    "char": "H"
  },
  {
    "file": "clhero3flyingrobot",
    "title": "Hero 3 Flyingrobot",
    "char": "H"
  },
  {
    "file": "clherobrinereborn",
    "title": "Herobrinereborn",
    "char": "H"
  },
  {
    "file": "clhextris",
    "title": "Hextris",
    "char": "H"
  },
  {
    "file": "clHighSpeed",
    "title": "High Speed",
    "char": "H"
  },
  {
    "file": "clhighstakes",
    "title": "Highstakes",
    "char": "H"
  },
  {
    "file": "clhighwayracer2",
    "title": "Highwayracer 2",
    "char": "H"
  },
  {
    "file": "clhighwaytraffic3d",
    "title": "Highwaytraffic 3 D",
    "char": "H"
  },
  {
    "file": "clhillclimbracinglite",
    "title": "Hillclimbracinglite",
    "char": "H"
  },
  {
    "file": "clHiNoHomo",
    "title": "Hi No Homo",
    "char": "H"
  },
  {
    "file": "clhipsterkickball",
    "title": "Hipsterkickball",
    "char": "H"
  },
  {
    "file": "clhit8ox",
    "title": "Hit 8 Ox",
    "char": "H"
  },
  {
    "file": "clhitsinglereal",
    "title": "Hitsinglereal",
    "char": "H"
  },
  {
    "file": "clhitstunfly",
    "title": "Hitstunfly",
    "char": "H"
  },
  {
    "file": "clhl2doom",
    "title": "Hl 2 Doom",
    "char": "H"
  },
  {
    "file": "clhobo",
    "title": "Hobo",
    "char": "H"
  },
  {
    "file": "clhobo2",
    "title": "Hobo 2",
    "char": "H"
  },
  {
    "file": "clhobo3",
    "title": "Hobo 3",
    "char": "H"
  },
  {
    "file": "clhobo4",
    "title": "Hobo 4",
    "char": "H"
  },
  {
    "file": "clhobo5",
    "title": "Hobo 5",
    "char": "H"
  },
  {
    "file": "clhobo6",
    "title": "Hobo 6",
    "char": "H"
  },
  {
    "file": "clhobo7",
    "title": "Hobo 7",
    "char": "H"
  },
  {
    "file": "clhobovszombies",
    "title": "Hobovszombies",
    "char": "H"
  },
  {
    "file": "clHoennsLastWish",
    "title": "Hoenns Last Wish",
    "char": "H"
  },
  {
    "file": "clholebattle",
    "title": "Holebattle",
    "char": "H"
  },
  {
    "file": "clholeio",
    "title": "Holeio",
    "char": "H"
  },
  {
    "file": "clhollowknight",
    "title": "Hollowknight",
    "char": "H"
  },
  {
    "file": "clhomesheephome",
    "title": "Homesheephome",
    "char": "H"
  },
  {
    "file": "clhorrormickeymouse",
    "title": "Horrormickeymouse",
    "char": "H"
  },
  {
    "file": "clhotdogbush",
    "title": "Hotdogbush",
    "char": "H"
  },
  {
    "file": "clhotwax",
    "title": "Hotwax",
    "char": "H"
  },
  {
    "file": "clhouseofhazards",
    "title": "Houseofhazards",
    "char": "H"
  },
  {
    "file": "clhoverracerdrive",
    "title": "Hoverracerdrive",
    "char": "H"
  },
  {
    "file": "clhuggywuggypixel",
    "title": "Huggywuggypixel",
    "char": "H"
  },
  {
    "file": "clhumanexpenditureprogram",
    "title": "Humanexpenditureprogram",
    "char": "H"
  },
  {
    "file": "clhungryknight",
    "title": "Hungryknight",
    "char": "H"
  },
  {
    "file": "clhungrylamu",
    "title": "Hungrylamu",
    "char": "H"
  },
  {
    "file": "clhyppersandbox",
    "title": "Hyppersandbox",
    "char": "H"
  },
  {
    "file": "clicantbelievegoogleflaggedmeforthenameofthefilelol",
    "title": "Icantbelievegoogleflaggedmeforthenameofthefilelol",
    "char": "I"
  },
  {
    "file": "clice age baby",
    "title": "Ice Age Baby",
    "char": "I"
  },
  {
    "file": "clicedodo",
    "title": "Icedodo",
    "char": "I"
  },
  {
    "file": "clicefishing",
    "title": "Icefishing",
    "char": "I"
  },
  {
    "file": "clicypurplehead",
    "title": "Icypurplehead",
    "char": "I"
  },
  {
    "file": "clidlebreakout",
    "title": "Idlebreakout",
    "char": "I"
  },
  {
    "file": "clidledice",
    "title": "Idledice",
    "char": "I"
  },
  {
    "file": "clidlefootballmanager",
    "title": "Idlefootballmanager",
    "char": "I"
  },
  {
    "file": "clidleidlegamedev",
    "title": "Idleidlegamedev",
    "char": "I"
  },
  {
    "file": "clidleminertycoon",
    "title": "Idleminertycoon",
    "char": "I"
  },
  {
    "file": "clidleminorzamnshes12",
    "title": "Idleminorzamnshes 12",
    "char": "I"
  },
  {
    "file": "climpossiblequiz (1)",
    "title": "Impossiblequiz (1)",
    "char": "I"
  },
  {
    "file": "climpossiblequiz",
    "title": "Impossiblequiz",
    "char": "I"
  },
  {
    "file": "climpossiblequiz2",
    "title": "Impossiblequiz 2",
    "char": "I"
  },
  {
    "file": "clinclementemerald",
    "title": "Inclementemerald",
    "char": "I"
  },
  {
    "file": "clindiantrucksimiulator",
    "title": "Indiantrucksimiulator",
    "char": "I"
  },
  {
    "file": "clinfinitecraft",
    "title": "Infinitecraft",
    "char": "I"
  },
  {
    "file": "clinkgame",
    "title": "Inkgame",
    "char": "I"
  },
  {
    "file": "clInkwell (v104)",
    "title": "Inkwell (v 104)",
    "char": "I"
  },
  {
    "file": "clinnkeeper",
    "title": "Innkeeper",
    "char": "I"
  },
  {
    "file": "clinsidestory",
    "title": "Insidestory",
    "char": "I"
  },
  {
    "file": "clinsomniary",
    "title": "Insomniary",
    "char": "I"
  },
  {
    "file": "clintellisphere",
    "title": "Intellisphere",
    "char": "I"
  },
  {
    "file": "clinteractivebuddy",
    "title": "Interactivebuddy",
    "char": "I"
  },
  {
    "file": "clintoruins",
    "title": "Intoruins",
    "char": "I"
  },
  {
    "file": "clintospace",
    "title": "Intospace",
    "char": "I"
  },
  {
    "file": "clintospace2",
    "title": "Intospace 2",
    "char": "I"
  },
  {
    "file": "clintospace3",
    "title": "Intospace 3",
    "char": "I"
  },
  {
    "file": "clintothedeepweb",
    "title": "Intothedeepweb",
    "char": "I"
  },
  {
    "file": "clintrusion",
    "title": "Intrusion",
    "char": "I"
  },
  {
    "file": "cliqball",
    "title": "Iqball",
    "char": "I"
  },
  {
    "file": "clironsnout",
    "title": "Ironsnout",
    "char": "I"
  },
  {
    "file": "clironsoldier",
    "title": "Ironsoldier",
    "char": "I"
  },
  {
    "file": "clirori",
    "title": "Irori",
    "char": "I"
  },
  {
    "file": "clitgetssolonelyhere",
    "title": "Itgetssolonelyhere",
    "char": "I"
  },
  {
    "file": "cliwbtg",
    "title": "Iwbtg",
    "char": "I"
  },
  {
    "file": "cljacksmith",
    "title": "Jacksmith",
    "char": "J"
  },
  {
    "file": "cljacksmithencryptedorsmthn",
    "title": "Jacksmithencryptedorsmthn",
    "char": "J"
  },
  {
    "file": "cljailbreakobbbobob",
    "title": "Jailbreakobbbobob",
    "char": "J"
  },
  {
    "file": "cljamesbondjr",
    "title": "Jamesbondjr",
    "char": "J"
  },
  {
    "file": "cljazzjackrabbit",
    "title": "Jazzjackrabbit",
    "char": "J"
  },
  {
    "file": "cljazzjackrabbit2",
    "title": "Jazzjackrabbit 2",
    "char": "J"
  },
  {
    "file": "cljefflings",
    "title": "Jefflings",
    "char": "J"
  },
  {
    "file": "cljellydadhero",
    "title": "Jellydadhero",
    "char": "J"
  },
  {
    "file": "cljellydrift",
    "title": "Jellydrift",
    "char": "J"
  },
  {
    "file": "cljellymario",
    "title": "Jellymario",
    "char": "J"
  },
  {
    "file": "cljellytruck",
    "title": "Jellytruck",
    "char": "J"
  },
  {
    "file": "cljellytruckgood",
    "title": "Jellytruckgood",
    "char": "J"
  },
  {
    "file": "cljetforcegemini",
    "title": "Jetforcegemini",
    "char": "J"
  },
  {
    "file": "cljetpackjoyride",
    "title": "Jetpackjoyride",
    "char": "J"
  },
  {
    "file": "cljetrush",
    "title": "Jetrush",
    "char": "J"
  },
  {
    "file": "cljetskiracing",
    "title": "Jetskiracing",
    "char": "J"
  },
  {
    "file": "cljmocraft",
    "title": "Jmocraft",
    "char": "J"
  },
  {
    "file": "cljohnnytrigger",
    "title": "Johnnytrigger",
    "char": "J"
  },
  {
    "file": "cljohnnyupgrade",
    "title": "Johnnyupgrade",
    "char": "J"
  },
  {
    "file": "cljojobaps1",
    "title": "Jojobaps 1",
    "char": "J"
  },
  {
    "file": "cljourneyarcade",
    "title": "Journeyarcade",
    "char": "J"
  },
  {
    "file": "cljourneydownhill",
    "title": "Journeydownhill",
    "char": "J"
  },
  {
    "file": "cljoustarcade",
    "title": "Joustarcade",
    "char": "J"
  },
  {
    "file": "cljsvecx",
    "title": "Jsvecx",
    "char": "J"
  },
  {
    "file": "cljumbomario",
    "title": "Jumbomario",
    "char": "J"
  },
  {
    "file": "clJUMP",
    "title": "JUMP",
    "char": "J"
  },
  {
    "file": "cljumpingshell",
    "title": "Jumpingshell",
    "char": "J"
  },
  {
    "file": "cljunglebooksnes",
    "title": "Junglebooksnes",
    "char": "J"
  },
  {
    "file": "cljungledeerhunting",
    "title": "Jungledeerhunting",
    "char": "J"
  },
  {
    "file": "cljurassicpark",
    "title": "Jurassicpark",
    "char": "J"
  },
  {
    "file": "cljustfalllol",
    "title": "Justfalllol",
    "char": "J"
  },
  {
    "file": "cljusthitthebutton",
    "title": "Justhitthebutton",
    "char": "J"
  },
  {
    "file": "cljustoneboss",
    "title": "Justoneboss",
    "char": "J"
  },
  {
    "file": "clkaizomarioworld",
    "title": "Kaizomarioworld",
    "char": "K"
  },
  {
    "file": "clkalikan",
    "title": "Kalikan",
    "char": "K"
  },
  {
    "file": "clkanyezone",
    "title": "Kanyezone",
    "char": "K"
  },
  {
    "file": "clkapi",
    "title": "Kapi",
    "char": "K"
  },
  {
    "file": "clkaratebros",
    "title": "Karatebros",
    "char": "K"
  },
  {
    "file": "clkarlson",
    "title": "Karlson",
    "char": "K"
  },
  {
    "file": "clkartbros",
    "title": "Kartbros",
    "char": "K"
  },
  {
    "file": "clKenGriffeyJrPresentsMajorLeagueBaseball",
    "title": "Ken Griffey Jr Presents Major League Baseball",
    "char": "K"
  },
  {
    "file": "clkeroseneclient",
    "title": "Keroseneclient",
    "char": "K"
  },
  {
    "file": "clkillerinstinct",
    "title": "Killerinstinct",
    "char": "K"
  },
  {
    "file": "clkillover",
    "title": "Killover",
    "char": "K"
  },
  {
    "file": "clkilltheiceagebabyadventure",
    "title": "Killtheiceagebabyadventure",
    "char": "K"
  },
  {
    "file": "clkimjonguntilepuzzle",
    "title": "Kimjonguntilepuzzle",
    "char": "K"
  },
  {
    "file": "clkingdomheartsdays",
    "title": "Kingdomheartsdays",
    "char": "K"
  },
  {
    "file": "clkingdomheartsrecoded",
    "title": "Kingdomheartsrecoded",
    "char": "K"
  },
  {
    "file": "clkingdomheartsrecodedalt",
    "title": "Kingdomheartsrecodedalt",
    "char": "K"
  },
  {
    "file": "clkirby64",
    "title": "Kirby 64",
    "char": "K"
  },
  {
    "file": "clkirby64crystalshards",
    "title": "Kirby 64 Crystalshards",
    "char": "K"
  },
  {
    "file": "clkirbyandtheamzingmirror",
    "title": "Kirbyandtheamzingmirror",
    "char": "K"
  },
  {
    "file": "clkirbycanvascurse",
    "title": "Kirbycanvascurse",
    "char": "K"
  },
  {
    "file": "clkirbysadventure",
    "title": "Kirbysadventure",
    "char": "K"
  },
  {
    "file": "clkirbysdreamland",
    "title": "Kirbysdreamland",
    "char": "K"
  },
  {
    "file": "clkirbysdreamland3",
    "title": "Kirbysdreamland 3",
    "char": "K"
  },
  {
    "file": "clkirbysoftandwet",
    "title": "Kirbysoftandwet",
    "char": "K"
  },
  {
    "file": "clkirbysqueaksquad",
    "title": "Kirbysqueaksquad",
    "char": "K"
  },
  {
    "file": "clkirbysuperstar",
    "title": "Kirbysuperstar",
    "char": "K"
  },
  {
    "file": "clkirbysuperstarultra",
    "title": "Kirbysuperstarultra",
    "char": "K"
  },
  {
    "file": "clkirbytiltandtumble",
    "title": "Kirbytiltandtumble",
    "char": "K"
  },
  {
    "file": "clkittencannon",
    "title": "Kittencannon",
    "char": "K"
  },
  {
    "file": "clklifur",
    "title": "Klifur",
    "char": "K"
  },
  {
    "file": "clknifehit",
    "title": "Knifehit",
    "char": "K"
  },
  {
    "file": "clknightmaretower",
    "title": "Knightmaretower",
    "char": "K"
  },
  {
    "file": "clknockknock",
    "title": "Knockknock",
    "char": "K"
  },
  {
    "file": "clkonkrio",
    "title": "Konkrio",
    "char": "K"
  },
  {
    "file": "clkoopasrevenge",
    "title": "Koopasrevenge",
    "char": "K"
  },
  {
    "file": "clkourio",
    "title": "Kourio",
    "char": "K"
  },
  {
    "file": "clks2teams",
    "title": "Ks 2 Teams",
    "char": "K"
  },
  {
    "file": "cllaceysflashgames",
    "title": "Laceysflashgames",
    "char": "L"
  },
  {
    "file": "cllastfirered",
    "title": "Lastfirered",
    "char": "L"
  },
  {
    "file": "cllasthorizon",
    "title": "Lasthorizon",
    "char": "L"
  },
  {
    "file": "cllaststand",
    "title": "Laststand",
    "char": "L"
  },
  {
    "file": "cllaststand2",
    "title": "Laststand 2",
    "char": "L"
  },
  {
    "file": "clleaderstrike",
    "title": "Leaderstrike",
    "char": "L"
  },
  {
    "file": "clleapandavoid2",
    "title": "Leapandavoid 2",
    "char": "L"
  },
  {
    "file": "cllearntofly",
    "title": "Learntofly",
    "char": "L"
  },
  {
    "file": "cllearntofly2",
    "title": "Learntofly 2",
    "char": "L"
  },
  {
    "file": "cllearntofly3",
    "title": "Learntofly 3",
    "char": "L"
  },
  {
    "file": "clLearnToFly3Debug",
    "title": "Learn To Fly 3 Debug",
    "char": "L"
  },
  {
    "file": "cllearntoflyidle",
    "title": "Learntoflyidle",
    "char": "L"
  },
  {
    "file": "cllearntoflyidlehack",
    "title": "Learntoflyidlehack",
    "char": "L"
  },
  {
    "file": "clLegacyOfGoku",
    "title": "Legacy Of Goku",
    "char": "L"
  },
  {
    "file": "cllegobatman",
    "title": "Legobatman",
    "char": "L"
  },
  {
    "file": "cllegobatman2superheroes",
    "title": "Legobatman 2 Superheroes",
    "char": "L"
  },
  {
    "file": "cllegoindianajones",
    "title": "Legoindianajones",
    "char": "L"
  },
  {
    "file": "cllegoindianajones2",
    "title": "Legoindianajones 2",
    "char": "L"
  },
  {
    "file": "cllegoninjago",
    "title": "Legoninjago",
    "char": "L"
  },
  {
    "file": "cllegostarwars",
    "title": "Legostarwars",
    "char": "L"
  },
  {
    "file": "cllegostarwars2gba",
    "title": "Legostarwars 2 Gba",
    "char": "L"
  },
  {
    "file": "cllegostarwarsgba",
    "title": "Legostarwarsgba",
    "char": "L"
  },
  {
    "file": "cllemmings",
    "title": "Lemmings",
    "char": "L"
  },
  {
    "file": "clletitconsume",
    "title": "Letitconsume",
    "char": "L"
  },
  {
    "file": "clletsgoeevee",
    "title": "Letsgoeevee",
    "char": "L"
  },
  {
    "file": "clletsgopikachu",
    "title": "Letsgopikachu",
    "char": "L"
  },
  {
    "file": "clleveldevil",
    "title": "Leveldevil",
    "char": "L"
  },
  {
    "file": "clleverwarriors",
    "title": "Leverwarriors",
    "char": "L"
  },
  {
    "file": "cllightitup",
    "title": "Lightitup",
    "char": "L"
  },
  {
    "file": "cllilrunmo",
    "title": "Lilrunmo",
    "char": "L"
  },
  {
    "file": "cllime",
    "title": "Lime",
    "char": "L"
  },
  {
    "file": "cllinerider",
    "title": "Linerider",
    "char": "L"
  },
  {
    "file": "cllinksawakeningdx",
    "title": "Linksawakeningdx",
    "char": "L"
  },
  {
    "file": "cllinktothepast",
    "title": "Linktothepast",
    "char": "L"
  },
  {
    "file": "cllittlealchemy2",
    "title": "Littlealchemy 2",
    "char": "L"
  },
  {
    "file": "cllittlerunmo",
    "title": "Littlerunmo",
    "char": "L"
  },
  {
    "file": "cllockthedoor",
    "title": "Lockthedoor",
    "char": "L"
  },
  {
    "file": "clloderunner",
    "title": "Loderunner",
    "char": "L"
  },
  {
    "file": "cllonewolf",
    "title": "Lonewolf",
    "char": "L"
  },
  {
    "file": "cllosangelesshark",
    "title": "Losangelesshark",
    "char": "L"
  },
  {
    "file": "cllowknight",
    "title": "Lowknight",
    "char": "L"
  },
  {
    "file": "clloz1",
    "title": "Loz 1",
    "char": "L"
  },
  {
    "file": "cllozlinkawakening",
    "title": "Lozlinkawakening",
    "char": "L"
  },
  {
    "file": "cllozminishcap",
    "title": "Lozminishcap",
    "char": "L"
  },
  {
    "file": "cllozoracleofseasons",
    "title": "Lozoracleofseasons",
    "char": "L"
  },
  {
    "file": "cllozphantomhourglass",
    "title": "Lozphantomhourglass",
    "char": "L"
  },
  {
    "file": "cllozspirittracks",
    "title": "Lozspirittracks",
    "char": "L"
  },
  {
    "file": "clLSE",
    "title": "LSE",
    "char": "L"
  },
  {
    "file": "cllucid",
    "title": "Lucid",
    "char": "L"
  },
  {
    "file": "clluckyblocks",
    "title": "Luckyblocks",
    "char": "L"
  },
  {
    "file": "cllumberobby",
    "title": "Lumberobby",
    "char": "L"
  },
  {
    "file": "cllummm",
    "title": "Lummm",
    "char": "L"
  },
  {
    "file": "clmadalinstuntcars",
    "title": "Madalinstuntcars",
    "char": "M"
  },
  {
    "file": "clmadalinstuntcarsgood",
    "title": "Madalinstuntcarsgood",
    "char": "M"
  },
  {
    "file": "clmadalinstuntcarsmultiplayerfixed",
    "title": "Madalinstuntcarsmultiplayerfixed",
    "char": "M"
  },
  {
    "file": "clmadden93",
    "title": "Madden 93",
    "char": "M"
  },
  {
    "file": "clmadden94",
    "title": "Madden 94",
    "char": "M"
  },
  {
    "file": "clmadden95",
    "title": "Madden 95",
    "char": "M"
  },
  {
    "file": "clmadden96",
    "title": "Madden 96",
    "char": "M"
  },
  {
    "file": "clmadden99",
    "title": "Madden 99",
    "char": "M"
  },
  {
    "file": "clmaddenfootball",
    "title": "Maddenfootball",
    "char": "M"
  },
  {
    "file": "clmaddenfootball64",
    "title": "Maddenfootball 64",
    "char": "M"
  },
  {
    "file": "clmaddennfl",
    "title": "Maddennfl",
    "char": "M"
  },
  {
    "file": "clmaddennfl2000",
    "title": "Maddennfl 2000",
    "char": "M"
  },
  {
    "file": "clmaddennfl2001",
    "title": "Maddennfl 2001",
    "char": "M"
  },
  {
    "file": "clmaddennfl2002",
    "title": "Maddennfl 2002",
    "char": "M"
  },
  {
    "file": "clmaddy98",
    "title": "Maddy 98",
    "char": "M"
  },
  {
    "file": "clmadness-retaliation",
    "title": "Madness-retaliation",
    "char": "M"
  },
  {
    "file": "clmadnessaccelerant",
    "title": "Madnessaccelerant",
    "char": "M"
  },
  {
    "file": "clmadnesscombatdefense",
    "title": "Madnesscombatdefense",
    "char": "M"
  },
  {
    "file": "clmadnesscombatnexus",
    "title": "Madnesscombatnexus",
    "char": "M"
  },
  {
    "file": "clmadnessgemini",
    "title": "Madnessgemini",
    "char": "M"
  },
  {
    "file": "clmadnesshydraulic",
    "title": "Madnesshydraulic",
    "char": "M"
  },
  {
    "file": "clmadnessinteractive",
    "title": "Madnessinteractive",
    "char": "M"
  },
  {
    "file": "clmadnessoffcolor",
    "title": "Madnessoffcolor",
    "char": "M"
  },
  {
    "file": "clmadnesspremediation",
    "title": "Madnesspremediation",
    "char": "M"
  },
  {
    "file": "clmadnessretaliation",
    "title": "Madnessretaliation",
    "char": "M"
  },
  {
    "file": "clmadnesss2010",
    "title": "Madnesss 2010",
    "char": "M"
  },
  {
    "file": "clmadnessstand",
    "title": "Madnessstand",
    "char": "M"
  },
  {
    "file": "clmadskillsmotocross2",
    "title": "Madskillsmotocross 2",
    "char": "M"
  },
  {
    "file": "clmadstick",
    "title": "Madstick",
    "char": "M"
  },
  {
    "file": "clmadstuntcars2",
    "title": "Madstuntcars 2",
    "char": "M"
  },
  {
    "file": "clmagetoweridle",
    "title": "Magetoweridle",
    "char": "M"
  },
  {
    "file": "clmagictiles3",
    "title": "Magictiles 3",
    "char": "M"
  },
  {
    "file": "clmajorasmask",
    "title": "Majorasmask",
    "char": "M"
  },
  {
    "file": "clmakesureitsclosed",
    "title": "Makesureitsclosed",
    "char": "M"
  },
  {
    "file": "clmami",
    "title": "Mami",
    "char": "M"
  },
  {
    "file": "clmanagod",
    "title": "Managod",
    "char": "M"
  },
  {
    "file": "clmarbleracer(1)",
    "title": "Marbleracer(1)",
    "char": "M"
  },
  {
    "file": "clmarbleracer",
    "title": "Marbleracer",
    "char": "M"
  },
  {
    "file": "clmari0",
    "title": "Mari 0",
    "char": "M"
  },
  {
    "file": "clMario Party Advance",
    "title": "Mario Party Advance",
    "char": "M"
  },
  {
    "file": "clmario3",
    "title": "Mario 3",
    "char": "M"
  },
  {
    "file": "clmario64webgl",
    "title": "Mario 64 Webgl",
    "char": "M"
  },
  {
    "file": "clmarioandluigisuperstarsaga",
    "title": "Marioandluigisuperstarsaga",
    "char": "M"
  },
  {
    "file": "clmariobuilder64(1)",
    "title": "Mariobuilder 64(1)",
    "char": "M"
  },
  {
    "file": "clmariobuilder64",
    "title": "Mariobuilder 64",
    "char": "M"
  },
  {
    "file": "clmariocombat",
    "title": "Mariocombat",
    "char": "M"
  },
  {
    "file": "clmariogolf",
    "title": "Mariogolf",
    "char": "M"
  },
  {
    "file": "clMarioisMissingDoneRight",
    "title": "Mariois Missing Done Right",
    "char": "M"
  },
  {
    "file": "clmariokart64",
    "title": "Mariokart 64",
    "char": "M"
  },
  {
    "file": "clmariokartds",
    "title": "Mariokartds",
    "char": "M"
  },
  {
    "file": "clmariokartsupercircuit",
    "title": "Mariokartsupercircuit",
    "char": "M"
  },
  {
    "file": "clmariolostlevels",
    "title": "Mariolostlevels",
    "char": "M"
  },
  {
    "file": "clmariomadness",
    "title": "Mariomadness",
    "char": "M"
  },
  {
    "file": "clmariomakersnes",
    "title": "Mariomakersnes",
    "char": "M"
  },
  {
    "file": "clmariominusrabbids",
    "title": "Mariominusrabbids",
    "char": "M"
  },
  {
    "file": "clmariopaint",
    "title": "Mariopaint",
    "char": "M"
  },
  {
    "file": "clmarioparty",
    "title": "Marioparty",
    "char": "M"
  },
  {
    "file": "clmarioparty2",
    "title": "Marioparty 2",
    "char": "M"
  },
  {
    "file": "clmarioparty3",
    "title": "Marioparty 3",
    "char": "M"
  },
  {
    "file": "clmariopartyds",
    "title": "Mariopartyds",
    "char": "M"
  },
  {
    "file": "clmariosmysterymeat",
    "title": "Mariosmysterymeat",
    "char": "M"
  },
  {
    "file": "clmariotennis",
    "title": "Mariotennis",
    "char": "M"
  },
  {
    "file": "clmariotennisgb",
    "title": "Mariotennisgb",
    "char": "M"
  },
  {
    "file": "clmariovsluigi",
    "title": "Mariovsluigi",
    "char": "M"
  },
  {
    "file": "clMarvelSuperHeroesArcade",
    "title": "Marvel Super Heroes Arcade",
    "char": "M"
  },
  {
    "file": "clMarvelVsCapcomPS1",
    "title": "Marvel Vs Capcom PS 1",
    "char": "M"
  },
  {
    "file": "clMarvelVsStreetFighter",
    "title": "Marvel Vs Street Fighter",
    "char": "M"
  },
  {
    "file": "clmarvelvsstreetfighterjp",
    "title": "Marvelvsstreetfighterjp",
    "char": "M"
  },
  {
    "file": "clmaskedforcesunlimited",
    "title": "Maskedforcesunlimited",
    "char": "M"
  },
  {
    "file": "clmastermindworldconquerer",
    "title": "Mastermindworldconquerer",
    "char": "M"
  },
  {
    "file": "clmatrixrampage",
    "title": "Matrixrampage",
    "char": "M"
  },
  {
    "file": "clmattv2",
    "title": "Mattv 2",
    "char": "M"
  },
  {
    "file": "clmauimallard",
    "title": "Mauimallard",
    "char": "M"
  },
  {
    "file": "clmaxpayne",
    "title": "Maxpayne",
    "char": "M"
  },
  {
    "file": "clmcfpsfbhd",
    "title": "Mcfpsfbhd",
    "char": "M"
  },
  {
    "file": "clmcraerally",
    "title": "Mcraerally",
    "char": "M"
  },
  {
    "file": "clmeatboy",
    "title": "Meatboy",
    "char": "M"
  },
  {
    "file": "clmeatboyflash",
    "title": "Meatboyflash",
    "char": "M"
  },
  {
    "file": "clmedalofhonor",
    "title": "Medalofhonor",
    "char": "M"
  },
  {
    "file": "clmedievalshark",
    "title": "Medievalshark",
    "char": "M"
  },
  {
    "file": "clmedievil",
    "title": "Medievil",
    "char": "M"
  },
  {
    "file": "clmegacd",
    "title": "Megacd",
    "char": "M"
  },
  {
    "file": "clmegachess",
    "title": "Megachess",
    "char": "M"
  },
  {
    "file": "clmegaclient",
    "title": "Megaclient",
    "char": "M"
  },
  {
    "file": "clmegaman",
    "title": "Megaman",
    "char": "M"
  },
  {
    "file": "clmegaman2",
    "title": "Megaman 2",
    "char": "M"
  },
  {
    "file": "clmegaman2gba",
    "title": "Megaman 2 Gba",
    "char": "M"
  },
  {
    "file": "clmegaman3",
    "title": "Megaman 3",
    "char": "M"
  },
  {
    "file": "clmegaman4",
    "title": "Megaman 4",
    "char": "M"
  },
  {
    "file": "clmegaman5",
    "title": "Megaman 5",
    "char": "M"
  },
  {
    "file": "clmegaman5gb",
    "title": "Megaman 5 Gb",
    "char": "M"
  },
  {
    "file": "clmegaman6",
    "title": "Megaman 6",
    "char": "M"
  },
  {
    "file": "clmegaman7",
    "title": "Megaman 7",
    "char": "M"
  },
  {
    "file": "clmegaman8",
    "title": "Megaman 8",
    "char": "M"
  },
  {
    "file": "clmegamanbasscftf",
    "title": "Megamanbasscftf",
    "char": "M"
  },
  {
    "file": "clmegamanbattlechipchallenge",
    "title": "Megamanbattlechipchallenge",
    "char": "M"
  },
  {
    "file": "clmegamanbn5tc",
    "title": "Megamanbn 5 Tc",
    "char": "M"
  },
  {
    "file": "clmegamanbn5tp",
    "title": "Megamanbn 5 Tp",
    "char": "M"
  },
  {
    "file": "clmegamanbn6cf",
    "title": "Megamanbn 6 Cf",
    "char": "M"
  },
  {
    "file": "clmegamanbn6cg",
    "title": "Megamanbn 6 Cg",
    "char": "M"
  },
  {
    "file": "clmegamanlegends",
    "title": "Megamanlegends",
    "char": "M"
  },
  {
    "file": "clmegamanlegends2",
    "title": "Megamanlegends 2",
    "char": "M"
  },
  {
    "file": "clmegamanx",
    "title": "Megamanx",
    "char": "M"
  },
  {
    "file": "clmegamanx2",
    "title": "Megamanx 2",
    "char": "M"
  },
  {
    "file": "clmegamanx3",
    "title": "Megamanx 3",
    "char": "M"
  },
  {
    "file": "clmegamanx4",
    "title": "Megamanx 4",
    "char": "M"
  },
  {
    "file": "clmegamanx5",
    "title": "Megamanx 5",
    "char": "M"
  },
  {
    "file": "clmegamanx6",
    "title": "Megamanx 6",
    "char": "M"
  },
  {
    "file": "clmegamanzero",
    "title": "Megamanzero",
    "char": "M"
  },
  {
    "file": "clmegamanzx",
    "title": "Megamanzx",
    "char": "M"
  },
  {
    "file": "clmegaminer",
    "title": "Megaminer",
    "char": "M"
  },
  {
    "file": "clmelonplayground",
    "title": "Melonplayground",
    "char": "M"
  },
  {
    "file": "clmeowuwu",
    "title": "Meowuwu",
    "char": "M"
  },
  {
    "file": "clmergeroundracers",
    "title": "Mergeroundracers",
    "char": "M"
  },
  {
    "file": "clmetalgear",
    "title": "Metalgear",
    "char": "M"
  },
  {
    "file": "clmetalgearsolid",
    "title": "Metalgearsolid",
    "char": "M"
  },
  {
    "file": "clmetalgearsolidps",
    "title": "Metalgearsolidps",
    "char": "M"
  },
  {
    "file": "clmetalslug",
    "title": "Metalslug",
    "char": "M"
  },
  {
    "file": "clmetalslug2",
    "title": "Metalslug 2",
    "char": "M"
  },
  {
    "file": "clmetalslugadvance",
    "title": "Metalslugadvance",
    "char": "M"
  },
  {
    "file": "clmetalslugmission1",
    "title": "Metalslugmission 1",
    "char": "M"
  },
  {
    "file": "clmetalslugmission2",
    "title": "Metalslugmission 2",
    "char": "M"
  },
  {
    "file": "clMetalSonicHyperdrive",
    "title": "Metal Sonic Hyperdrive",
    "char": "M"
  },
  {
    "file": "clmetroid",
    "title": "Metroid",
    "char": "M"
  },
  {
    "file": "clmetroid2",
    "title": "Metroid 2",
    "char": "M"
  },
  {
    "file": "clmetroidfusion",
    "title": "Metroidfusion",
    "char": "M"
  },
  {
    "file": "clmetroidprimehunters",
    "title": "Metroidprimehunters",
    "char": "M"
  },
  {
    "file": "clmetroidzeromission",
    "title": "Metroidzeromission",
    "char": "M"
  },
  {
    "file": "clmiamishark",
    "title": "Miamishark",
    "char": "M"
  },
  {
    "file": "clmickeymaniasnes",
    "title": "Mickeymaniasnes",
    "char": "M"
  },
  {
    "file": "clmicrolife",
    "title": "Microlife",
    "char": "M"
  },
  {
    "file": "clmicromages",
    "title": "Micromages",
    "char": "M"
  },
  {
    "file": "clmidwaysgreatesthitsn64",
    "title": "Midwaysgreatesthitsn 64",
    "char": "M"
  },
  {
    "file": "clmightyknight",
    "title": "Mightyknight",
    "char": "M"
  },
  {
    "file": "clmightyknight2",
    "title": "Mightyknight 2",
    "char": "M"
  },
  {
    "file": "clmimic",
    "title": "Mimic",
    "char": "M"
  },
  {
    "file": "clMinceraft-I-NotMine_V6(1)",
    "title": "Minceraft-I-Not Mine V 6(1)",
    "char": "M"
  },
  {
    "file": "clMinceraft-I-NotMine_V6",
    "title": "Minceraft-I-Not Mine V 6",
    "char": "M"
  },
  {
    "file": "clmindscape",
    "title": "Mindscape",
    "char": "M"
  },
  {
    "file": "clmindwave",
    "title": "Mindwave",
    "char": "M"
  },
  {
    "file": "clminecaves",
    "title": "Minecaves",
    "char": "M"
  },
  {
    "file": "clminecraft1-8-8",
    "title": "Minecraft 1-8-8",
    "char": "M"
  },
  {
    "file": "clminecraftcasesim",
    "title": "Minecraftcasesim",
    "char": "M"
  },
  {
    "file": "clminecraftpocketedition",
    "title": "Minecraftpocketedition",
    "char": "M"
  },
  {
    "file": "clminecraftshooter",
    "title": "Minecraftshooter",
    "char": "M"
  },
  {
    "file": "clMINECRAFTTOWERDEFENSE",
    "title": "MINECRAFTTOWERDEFENSE",
    "char": "M"
  },
  {
    "file": "clmineshooter",
    "title": "Mineshooter",
    "char": "M"
  },
  {
    "file": "clminesweeperplus",
    "title": "Minesweeperplus",
    "char": "M"
  },
  {
    "file": "clminhero",
    "title": "Minhero",
    "char": "M"
  },
  {
    "file": "clminicrossword",
    "title": "Minicrossword",
    "char": "M"
  },
  {
    "file": "clminiflips",
    "title": "Miniflips",
    "char": "M"
  },
  {
    "file": "clminimart",
    "title": "Minimart",
    "char": "M"
  },
  {
    "file": "clminishooters",
    "title": "Minishooters",
    "char": "M"
  },
  {
    "file": "clminitooth",
    "title": "Minitooth",
    "char": "M"
  },
  {
    "file": "clmiraginewar",
    "title": "Miraginewar",
    "char": "M"
  },
  {
    "file": "clmisslecommand",
    "title": "Misslecommand",
    "char": "M"
  },
  {
    "file": "clmk4ampedup",
    "title": "Mk 4 Ampedup",
    "char": "M"
  },
  {
    "file": "clmkmythologiesn64",
    "title": "Mkmythologiesn 64",
    "char": "M"
  },
  {
    "file": "clmktrilogyps1",
    "title": "Mktrilogyps 1",
    "char": "M"
  },
  {
    "file": "clmmbn3b",
    "title": "Mmbn 3 B",
    "char": "M"
  },
  {
    "file": "clmmbn3w",
    "title": "Mmbn 3 W",
    "char": "M"
  },
  {
    "file": "clmmbn4bm",
    "title": "Mmbn 4 Bm",
    "char": "M"
  },
  {
    "file": "clmmbn4rs",
    "title": "Mmbn 4 Rs",
    "char": "M"
  },
  {
    "file": "clmmbnws",
    "title": "Mmbnws",
    "char": "M"
  },
  {
    "file": "clmmsf2zxn",
    "title": "Mmsf 2 Zxn",
    "char": "M"
  },
  {
    "file": "clmmsf2zxs",
    "title": "Mmsf 2 Zxs",
    "char": "M"
  },
  {
    "file": "clmmsf3ba",
    "title": "Mmsf 3 Ba",
    "char": "M"
  },
  {
    "file": "clmmsf3rj",
    "title": "Mmsf 3 Rj",
    "char": "M"
  },
  {
    "file": "clmmsfd",
    "title": "Mmsfd",
    "char": "M"
  },
  {
    "file": "clmmsfl",
    "title": "Mmsfl",
    "char": "M"
  },
  {
    "file": "clmmsfp",
    "title": "Mmsfp",
    "char": "M"
  },
  {
    "file": "clmmwilywars",
    "title": "Mmwilywars",
    "char": "M"
  },
  {
    "file": "clmo64(1)",
    "title": "Mo 64(1)",
    "char": "M"
  },
  {
    "file": "clmo64",
    "title": "Mo 64",
    "char": "M"
  },
  {
    "file": "clmobcontrolhtml5",
    "title": "Mobcontrolhtml 5",
    "char": "M"
  },
  {
    "file": "clmobiusrevolution",
    "title": "Mobiusrevolution",
    "char": "M"
  },
  {
    "file": "clMoemon Emerald Vanilla+ (v110)",
    "title": "Moemon Emerald Vanilla+ (v 110)",
    "char": "M"
  },
  {
    "file": "clmomimsleeping",
    "title": "Momimsleeping",
    "char": "M"
  },
  {
    "file": "clmomoscrushers",
    "title": "Momoscrushers",
    "char": "M"
  },
  {
    "file": "clmoneyrush",
    "title": "Moneyrush",
    "char": "M"
  },
  {
    "file": "clmonkeymart",
    "title": "Monkeymart",
    "char": "M"
  },
  {
    "file": "clmonkeymartenc",
    "title": "Monkeymartenc",
    "char": "M"
  },
  {
    "file": "clmonsterderby",
    "title": "Monsterderby",
    "char": "M"
  },
  {
    "file": "clmonsterswing",
    "title": "Monsterswing",
    "char": "M"
  },
  {
    "file": "clmonstertracks",
    "title": "Monstertracks",
    "char": "M"
  },
  {
    "file": "clmonstertruckcurfew",
    "title": "Monstertruckcurfew",
    "char": "M"
  },
  {
    "file": "clmonstertruckportstunt",
    "title": "Monstertruckportstunt",
    "char": "M"
  },
  {
    "file": "clmoonemeraldextremerandomizer",
    "title": "Moonemeraldextremerandomizer",
    "char": "M"
  },
  {
    "file": "clmortalkombat",
    "title": "Mortalkombat",
    "char": "M"
  },
  {
    "file": "clmortalkombat2",
    "title": "Mortalkombat 2",
    "char": "M"
  },
  {
    "file": "clmortalkombat2a",
    "title": "Mortalkombat 2 A",
    "char": "M"
  },
  {
    "file": "clmortalkombat3",
    "title": "Mortalkombat 3",
    "char": "M"
  },
  {
    "file": "clmortalkombat3a",
    "title": "Mortalkombat 3 A",
    "char": "M"
  },
  {
    "file": "clmortalkombat4",
    "title": "Mortalkombat 4",
    "char": "M"
  },
  {
    "file": "clmortalkombata",
    "title": "Mortalkombata",
    "char": "M"
  },
  {
    "file": "clmortalkombatadvance",
    "title": "Mortalkombatadvance",
    "char": "M"
  },
  {
    "file": "clmortkom4",
    "title": "Mortkom 4",
    "char": "M"
  },
  {
    "file": "clmotherload",
    "title": "Motherload",
    "char": "M"
  },
  {
    "file": "clmotoroadrash",
    "title": "Motoroadrash",
    "char": "M"
  },
  {
    "file": "clmotox3m2",
    "title": "Motox 3 M 2",
    "char": "M"
  },
  {
    "file": "clmotox3m3",
    "title": "Motox 3 M 3",
    "char": "M"
  },
  {
    "file": "clmotox3mm",
    "title": "Motox 3 Mm",
    "char": "M"
  },
  {
    "file": "clmotox3mpoolparty",
    "title": "Motox 3 Mpoolparty",
    "char": "M"
  },
  {
    "file": "clmotox3mspookyland",
    "title": "Motox 3 Mspookyland",
    "char": "M"
  },
  {
    "file": "clmotox3mwinter",
    "title": "Motox 3 Mwinter",
    "char": "M"
  },
  {
    "file": "clmountainbikeracer",
    "title": "Mountainbikeracer",
    "char": "M"
  },
  {
    "file": "clmrmine",
    "title": "Mrmine",
    "char": "M"
  },
  {
    "file": "clmrracer",
    "title": "Mrracer",
    "char": "M"
  },
  {
    "file": "clmspacman (1)",
    "title": "Mspacman (1)",
    "char": "M"
  },
  {
    "file": "clmspacman(1)",
    "title": "Mspacman(1)",
    "char": "M"
  },
  {
    "file": "clmspacman(2)",
    "title": "Mspacman(2)",
    "char": "M"
  },
  {
    "file": "clmspacman",
    "title": "Mspacman",
    "char": "M"
  },
  {
    "file": "clmultitask",
    "title": "Multitask",
    "char": "M"
  },
  {
    "file": "clmutilate-a-doll",
    "title": "Mutilate-a-doll",
    "char": "M"
  },
  {
    "file": "clmvpbaseball",
    "title": "Mvpbaseball",
    "char": "M"
  },
  {
    "file": "clmxoffroadmaster",
    "title": "Mxoffroadmaster",
    "char": "M"
  },
  {
    "file": "clmyfriendpedro",
    "title": "Myfriendpedro",
    "char": "M"
  },
  {
    "file": "clmyfriendpedroarena",
    "title": "Myfriendpedroarena",
    "char": "M"
  },
  {
    "file": "clmyteardrop",
    "title": "Myteardrop",
    "char": "M"
  },
  {
    "file": "cln",
    "title": "N",
    "char": "N"
  },
  {
    "file": "clnarc",
    "title": "Narc",
    "char": "N"
  },
  {
    "file": "clnatsuki64",
    "title": "Natsuki 64",
    "char": "N"
  },
  {
    "file": "clnaturalselection",
    "title": "Naturalselection",
    "char": "N"
  },
  {
    "file": "clNautilusOS(1)",
    "title": "Nautilus OS(1)",
    "char": "N"
  },
  {
    "file": "clNautilusOS",
    "title": "Nautilus OS",
    "char": "N"
  },
  {
    "file": "clNBAhangtime",
    "title": "NBAhangtime",
    "char": "N"
  },
  {
    "file": "clNBAjam",
    "title": "NBAjam",
    "char": "N"
  },
  {
    "file": "clnbajamTE",
    "title": "Nbajam TE",
    "char": "N"
  },
  {
    "file": "clnbalive2000",
    "title": "Nbalive 2000",
    "char": "N"
  },
  {
    "file": "clnbalive2003",
    "title": "Nbalive 2003",
    "char": "N"
  },
  {
    "file": "clnblox",
    "title": "Nblox",
    "char": "N"
  },
  {
    "file": "clneonblaster",
    "title": "Neonblaster",
    "char": "N"
  },
  {
    "file": "clneonrider",
    "title": "Neonrider",
    "char": "N"
  },
  {
    "file": "clnesworldchampion",
    "title": "Nesworldchampion",
    "char": "N"
  },
  {
    "file": "clnetattack",
    "title": "Netattack",
    "char": "N"
  },
  {
    "file": "clneverendinglegacy",
    "title": "Neverendinglegacy",
    "char": "N"
  },
  {
    "file": "clnewersmbds",
    "title": "Newersmbds",
    "char": "N"
  },
  {
    "file": "clnewgroundsrumble",
    "title": "Newgroundsrumble",
    "char": "N"
  },
  {
    "file": "clnewsupermariobros",
    "title": "Newsupermariobros",
    "char": "N"
  },
  {
    "file": "clNewSuperMarioWorld2AroundtheWorld",
    "title": "New Super Mario World 2 Aroundthe World",
    "char": "N"
  },
  {
    "file": "clnewyorkshark",
    "title": "Newyorkshark",
    "char": "N"
  },
  {
    "file": "clnextdoor",
    "title": "Nextdoor",
    "char": "N"
  },
  {
    "file": "clnflblitz",
    "title": "Nflblitz",
    "char": "N"
  },
  {
    "file": "clnfscarbonowncity",
    "title": "Nfscarbonowncity",
    "char": "N"
  },
  {
    "file": "clnfsmostwanted",
    "title": "Nfsmostwanted",
    "char": "N"
  },
  {
    "file": "clnfsporcheunleashed",
    "title": "Nfsporcheunleashed",
    "char": "N"
  },
  {
    "file": "clnfsunderground",
    "title": "Nfsunderground",
    "char": "N"
  },
  {
    "file": "clnfsunderground2",
    "title": "Nfsunderground 2",
    "char": "N"
  },
  {
    "file": "clngon(1)",
    "title": "Ngon(1)",
    "char": "N"
  },
  {
    "file": "clngon",
    "title": "Ngon",
    "char": "N"
  },
  {
    "file": "clnhl2002",
    "title": "Nhl 2002",
    "char": "N"
  },
  {
    "file": "clnhl98",
    "title": "Nhl 98",
    "char": "N"
  },
  {
    "file": "clnhlhitz2003",
    "title": "Nhlhitz 2003",
    "char": "N"
  },
  {
    "file": "clnickelodeonsuperbrawl2",
    "title": "Nickelodeonsuperbrawl 2",
    "char": "N"
  },
  {
    "file": "clNicktoonsFreezeFrameFrenzy",
    "title": "Nicktoons Freeze Frame Frenzy",
    "char": "N"
  },
  {
    "file": "clnightcatsurvival",
    "title": "Nightcatsurvival",
    "char": "N"
  },
  {
    "file": "clnightclubshowdown",
    "title": "Nightclubshowdown",
    "char": "N"
  },
  {
    "file": "clnightfire",
    "title": "Nightfire",
    "char": "N"
  },
  {
    "file": "clnightshade",
    "title": "Nightshade",
    "char": "N"
  },
  {
    "file": "clnikehub",
    "title": "Nikehub",
    "char": "N"
  },
  {
    "file": "clnimrods",
    "title": "Nimrods",
    "char": "N"
  },
  {
    "file": "clninjabrawl",
    "title": "Ninjabrawl",
    "char": "N"
  },
  {
    "file": "clninjaobbyparkor",
    "title": "Ninjaobbyparkor",
    "char": "N"
  },
  {
    "file": "clnintendogslab",
    "title": "Nintendogslab",
    "char": "N"
  },
  {
    "file": "clnintendoworldcup",
    "title": "Nintendoworldcup",
    "char": "N"
  },
  {
    "file": "clnitclient",
    "title": "Nitclient",
    "char": "N"
  },
  {
    "file": "clnitromemustdie",
    "title": "Nitromemustdie",
    "char": "N"
  },
  {
    "file": "clnomoregameasdsadfagfggdfs",
    "title": "Nomoregameasdsadfagfggdfs",
    "char": "N"
  },
  {
    "file": "clnoobminer",
    "title": "Noobminer",
    "char": "N"
  },
  {
    "file": "clnotyourpawn",
    "title": "Notyourpawn",
    "char": "N"
  },
  {
    "file": "clnovaclient",
    "title": "Novaclient",
    "char": "N"
  },
  {
    "file": "clnplus",
    "title": "Nplus",
    "char": "N"
  },
  {
    "file": "clnsmbuds",
    "title": "Nsmbuds",
    "char": "N"
  },
  {
    "file": "clnsmbwds",
    "title": "Nsmbwds",
    "char": "N"
  },
  {
    "file": "clnubbysnumberfactory",
    "title": "Nubbysnumberfactory",
    "char": "N"
  },
  {
    "file": "clnullkevin",
    "title": "Nullkevin",
    "char": "N"
  },
  {
    "file": "clNutsandBoltsScrewingPuzzle",
    "title": "Nutsand Bolts Screwing Puzzle",
    "char": "N"
  },
  {
    "file": "clnzp",
    "title": "Nzp",
    "char": "N"
  },
  {
    "file": "clobby-99-will-lose",
    "title": "Obby-99-will-lose",
    "char": "O"
  },
  {
    "file": "clobby1jumpperclick",
    "title": "Obby 1 Jumpperclick",
    "char": "O"
  },
  {
    "file": "clobby456",
    "title": "Obby 456",
    "char": "O"
  },
  {
    "file": "clobbybike",
    "title": "Obbybike",
    "char": "O"
  },
  {
    "file": "clobbycart",
    "title": "Obbycart",
    "char": "O"
  },
  {
    "file": "clobbyonlyup",
    "title": "Obbyonlyup",
    "char": "O"
  },
  {
    "file": "clobbyrainbowtower",
    "title": "Obbyrainbowtower",
    "char": "O"
  },
  {
    "file": "clobbyslide",
    "title": "Obbyslide",
    "char": "O"
  },
  {
    "file": "clobbyswing",
    "title": "Obbyswing",
    "char": "O"
  },
  {
    "file": "clobbyyardsale",
    "title": "Obbyyardsale",
    "char": "O"
  },
  {
    "file": "clobeythegame",
    "title": "Obeythegame",
    "char": "O"
  },
  {
    "file": "clocarinaoftime",
    "title": "Ocarinaoftime",
    "char": "O"
  },
  {
    "file": "cloddbotout",
    "title": "Oddbotout",
    "char": "O"
  },
  {
    "file": "cloddfuture",
    "title": "Oddfuture",
    "char": "O"
  },
  {
    "file": "clofflineparadise",
    "title": "Offlineparadise",
    "char": "O"
  },
  {
    "file": "clohflip",
    "title": "Ohflip",
    "char": "O"
  },
  {
    "file": "clomegalayers",
    "title": "Omegalayers",
    "char": "O"
  },
  {
    "file": "clomeganuggetclicker",
    "title": "Omeganuggetclicker",
    "char": "O"
  },
  {
    "file": "clomnipresent",
    "title": "Omnipresent",
    "char": "O"
  },
  {
    "file": "clonebitadventure",
    "title": "Onebitadventure",
    "char": "O"
  },
  {
    "file": "clonenightasfreddy",
    "title": "Onenightasfreddy",
    "char": "O"
  },
  {
    "file": "clonepiece",
    "title": "Onepiece",
    "char": "O"
  },
  {
    "file": "clonepiecefighting",
    "title": "Onepiecefighting",
    "char": "O"
  },
  {
    "file": "cloneshotold",
    "title": "Oneshotold",
    "char": "O"
  },
  {
    "file": "clonlyup",
    "title": "Onlyup",
    "char": "O"
  },
  {
    "file": "clOotMasterQuest",
    "title": "Oot Master Quest",
    "char": "O"
  },
  {
    "file": "cloperius",
    "title": "Operius",
    "char": "O"
  },
  {
    "file": "cloppositeday",
    "title": "Oppositeday",
    "char": "O"
  },
  {
    "file": "clopposumcountry",
    "title": "Opposumcountry",
    "char": "O"
  },
  {
    "file": "clOrangeRoulette",
    "title": "Orange Roulette",
    "char": "O"
  },
  {
    "file": "clorbofcreation",
    "title": "Orbofcreation",
    "char": "O"
  },
  {
    "file": "clordinarysonicromhack",
    "title": "Ordinarysonicromhack",
    "char": "O"
  },
  {
    "file": "cloregontrail",
    "title": "Oregontrail",
    "char": "O"
  },
  {
    "file": "clorigamiking",
    "title": "Origamiking",
    "char": "O"
  },
  {
    "file": "clormmimastickwithclsoitcanberememberedoyeahclalienhominid",
    "title": "Ormmimastickwithclsoitcanberememberedoyeahclalienhominid",
    "char": "O"
  },
  {
    "file": "clortalkombat4",
    "title": "Ortalkombat 4",
    "char": "O"
  },
  {
    "file": "closu",
    "title": "Osu",
    "char": "O"
  },
  {
    "file": "clourpleguy",
    "title": "Ourpleguy",
    "char": "O"
  },
  {
    "file": "clouthold",
    "title": "Outhold",
    "char": "O"
  },
  {
    "file": "cloutnumbered",
    "title": "Outnumbered",
    "char": "O"
  },
  {
    "file": "clOutrunArcade",
    "title": "Outrun Arcade",
    "char": "O"
  },
  {
    "file": "clOutrunGenesis",
    "title": "Outrun Genesis",
    "char": "O"
  },
  {
    "file": "cloverburden",
    "title": "Overburden",
    "char": "O"
  },
  {
    "file": "clovo",
    "title": "Ovo",
    "char": "O"
  },
  {
    "file": "clovo2",
    "title": "Ovo 2",
    "char": "O"
  },
  {
    "file": "clovodimensions",
    "title": "Ovodimensions",
    "char": "O"
  },
  {
    "file": "clovofixed",
    "title": "Ovofixed",
    "char": "O"
  },
  {
    "file": "clpacman",
    "title": "Pacman",
    "char": "P"
  },
  {
    "file": "clpacmana",
    "title": "Pacmana",
    "char": "P"
  },
  {
    "file": "clpacmansuperfast",
    "title": "Pacmansuperfast",
    "char": "P"
  },
  {
    "file": "clpacmanworld3",
    "title": "Pacmanworld 3",
    "char": "P"
  },
  {
    "file": "clpacmanworldg",
    "title": "Pacmanworldg",
    "char": "P"
  },
  {
    "file": "clpacmanworldpsx",
    "title": "Pacmanworldpsx",
    "char": "P"
  },
  {
    "file": "clpandameic2",
    "title": "Pandameic 2",
    "char": "P"
  },
  {
    "file": "clpapabakeria",
    "title": "Papabakeria",
    "char": "P"
  },
  {
    "file": "clpapadonut",
    "title": "Papadonut",
    "char": "P"
  },
  {
    "file": "clpapalouienighthunt2",
    "title": "Papalouienighthunt 2",
    "char": "P"
  },
  {
    "file": "clpapalouiewhenburgersattack",
    "title": "Papalouiewhenburgersattack",
    "char": "P"
  },
  {
    "file": "clpapalouiewhenpizzasattack",
    "title": "Papalouiewhenpizzasattack",
    "char": "P"
  },
  {
    "file": "clpapalouiewhensundaesattack",
    "title": "Papalouiewhensundaesattack",
    "char": "P"
  },
  {
    "file": "clpapapizzagood",
    "title": "Papapizzagood",
    "char": "P"
  },
  {
    "file": "clpapapizzagoody",
    "title": "Papapizzagoody",
    "char": "P"
  },
  {
    "file": "clpapapizzamamamia",
    "title": "Papapizzamamamia",
    "char": "P"
  },
  {
    "file": "clpapasburgerIIIAAAAA",
    "title": "Papasburger IIIAAAAA",
    "char": "P"
  },
  {
    "file": "clpapascheeseria",
    "title": "Papascheeseria",
    "char": "P"
  },
  {
    "file": "clpapascupcakeria",
    "title": "Papascupcakeria",
    "char": "P"
  },
  {
    "file": "clpapasfreezeria",
    "title": "Papasfreezeria",
    "char": "P"
  },
  {
    "file": "clpapashotdoggeria",
    "title": "Papashotdoggeria",
    "char": "P"
  },
  {
    "file": "clpapaspancakeria",
    "title": "Papaspancakeria",
    "char": "P"
  },
  {
    "file": "clpapaspastaria",
    "title": "Papaspastaria",
    "char": "P"
  },
  {
    "file": "clpapasscooperia",
    "title": "Papasscooperia",
    "char": "P"
  },
  {
    "file": "clpapassushiria",
    "title": "Papassushiria",
    "char": "P"
  },
  {
    "file": "clpapastacomia",
    "title": "Papastacomia",
    "char": "P"
  },
  {
    "file": "clpapaswingeria",
    "title": "Papaswingeria",
    "char": "P"
  },
  {
    "file": "clpaperio",
    "title": "Paperio",
    "char": "P"
  },
  {
    "file": "clpaperio3d",
    "title": "Paperio 3 D",
    "char": "P"
  },
  {
    "file": "clpaperiomania",
    "title": "Paperiomania",
    "char": "P"
  },
  {
    "file": "clpapermario",
    "title": "Papermario",
    "char": "P"
  },
  {
    "file": "clPaperMarioDSE",
    "title": "Paper Mario DSE",
    "char": "P"
  },
  {
    "file": "clPaperMarioPracticeHack",
    "title": "Paper Mario Practice Hack",
    "char": "P"
  },
  {
    "file": "clpapermariopromode",
    "title": "Papermariopromode",
    "char": "P"
  },
  {
    "file": "clpapermariottyd",
    "title": "Papermariottyd",
    "char": "P"
  },
  {
    "file": "clparappatherapper",
    "title": "Parappatherapper",
    "char": "P"
  },
  {
    "file": "clparappatherapperalt",
    "title": "Parappatherapperalt",
    "char": "P"
  },
  {
    "file": "clparkingfury",
    "title": "Parkingfury",
    "char": "P"
  },
  {
    "file": "clparkingfury2",
    "title": "Parkingfury 2",
    "char": "P"
  },
  {
    "file": "clparkingfury3",
    "title": "Parkingfury 3",
    "char": "P"
  },
  {
    "file": "clparkingrush",
    "title": "Parkingrush",
    "char": "P"
  },
  {
    "file": "clpartnersintime",
    "title": "Partnersintime",
    "char": "P"
  },
  {
    "file": "clpeacekeeper",
    "title": "Peacekeeper",
    "char": "P"
  },
  {
    "file": "clpeach",
    "title": "Peach",
    "char": "P"
  },
  {
    "file": "clpeggle",
    "title": "Peggle",
    "char": "P"
  },
  {
    "file": "clpenaltykicks",
    "title": "Penaltykicks",
    "char": "P"
  },
  {
    "file": "clpenguindiner",
    "title": "Penguindiner",
    "char": "P"
  },
  {
    "file": "clpenguinpass",
    "title": "Penguinpass",
    "char": "P"
  },
  {
    "file": "clpepsiman",
    "title": "Pepsiman",
    "char": "P"
  },
  {
    "file": "clpepsimanalt",
    "title": "Pepsimanalt",
    "char": "P"
  },
  {
    "file": "clpereelous",
    "title": "Pereelous",
    "char": "P"
  },
  {
    "file": "clperfectdark",
    "title": "Perfectdark",
    "char": "P"
  },
  {
    "file": "clperfecthotel",
    "title": "Perfecthotel",
    "char": "P"
  },
  {
    "file": "clpersona",
    "title": "Persona",
    "char": "P"
  },
  {
    "file": "clpersona2",
    "title": "Persona 2",
    "char": "P"
  },
  {
    "file": "clpersona2alt",
    "title": "Persona 2 Alt",
    "char": "P"
  },
  {
    "file": "clpersonaalt",
    "title": "Personaalt",
    "char": "P"
  },
  {
    "file": "clpetworld",
    "title": "Petworld",
    "char": "P"
  },
  {
    "file": "clphantasystar",
    "title": "Phantasystar",
    "char": "P"
  },
  {
    "file": "clphantasystar2",
    "title": "Phantasystar 2",
    "char": "P"
  },
  {
    "file": "clphantasystar3",
    "title": "Phantasystar 3",
    "char": "P"
  },
  {
    "file": "clphantasystar4",
    "title": "Phantasystar 4",
    "char": "P"
  },
  {
    "file": "clphasma",
    "title": "Phasma",
    "char": "P"
  },
  {
    "file": "clpheonixjusticeforall",
    "title": "Pheonixjusticeforall",
    "char": "P"
  },
  {
    "file": "clpheonixrightaceattorny",
    "title": "Pheonixrightaceattorny",
    "char": "P"
  },
  {
    "file": "clpheonixtrialsandyear",
    "title": "Pheonixtrialsandyear",
    "char": "P"
  },
  {
    "file": "clpheonixtrialsandyeartrhfasd",
    "title": "Pheonixtrialsandyeartrhfasd",
    "char": "P"
  },
  {
    "file": "clpibbyapocalypse",
    "title": "Pibbyapocalypse",
    "char": "P"
  },
  {
    "file": "clpiclient",
    "title": "Piclient",
    "char": "P"
  },
  {
    "file": "clpico8",
    "title": "Pico 8",
    "char": "P"
  },
  {
    "file": "clpico8edu",
    "title": "Pico 8 Edu",
    "char": "P"
  },
  {
    "file": "clpicodriller",
    "title": "Picodriller",
    "char": "P"
  },
  {
    "file": "clpicohot",
    "title": "Picohot",
    "char": "P"
  },
  {
    "file": "clpicolife",
    "title": "Picolife",
    "char": "P"
  },
  {
    "file": "clpiconightpunkin",
    "title": "Piconightpunkin",
    "char": "P"
  },
  {
    "file": "clpicosschool",
    "title": "Picosschool",
    "char": "P"
  },
  {
    "file": "clpicovsbeardx",
    "title": "Picovsbeardx",
    "char": "P"
  },
  {
    "file": "clpiecesofcake",
    "title": "Piecesofcake",
    "char": "P"
  },
  {
    "file": "clpikwip",
    "title": "Pikwip",
    "char": "P"
  },
  {
    "file": "clpingpongchaos",
    "title": "Pingpongchaos",
    "char": "P"
  },
  {
    "file": "clpinkbike",
    "title": "Pinkbike",
    "char": "P"
  },
  {
    "file": "clpint",
    "title": "Pint",
    "char": "P"
  },
  {
    "file": "clpitfall",
    "title": "Pitfall",
    "char": "P"
  },
  {
    "file": "clpitof100trials",
    "title": "Pitof 100 Trials",
    "char": "P"
  },
  {
    "file": "clpixelbattlegroundsio",
    "title": "Pixelbattlegroundsio",
    "char": "P"
  },
  {
    "file": "clpixelcombat2",
    "title": "Pixelcombat 2",
    "char": "P"
  },
  {
    "file": "clpixelgun",
    "title": "Pixelgun",
    "char": "P"
  },
  {
    "file": "clpixelquestlostidols",
    "title": "Pixelquestlostidols",
    "char": "P"
  },
  {
    "file": "clpixelshooter",
    "title": "Pixelshooter",
    "char": "P"
  },
  {
    "file": "clpixelspeedrun",
    "title": "Pixelspeedrun",
    "char": "P"
  },
  {
    "file": "clpixelwarfare",
    "title": "Pixelwarfare",
    "char": "P"
  },
  {
    "file": "clpizzapapa",
    "title": "Pizzapapa",
    "char": "P"
  },
  {
    "file": "clpizzatower",
    "title": "Pizzatower",
    "char": "P"
  },
  {
    "file": "clpkmnarutoans",
    "title": "Pkmnarutoans",
    "char": "P"
  },
  {
    "file": "clplanetlife",
    "title": "Planetlife",
    "char": "P"
  },
  {
    "file": "clplangman",
    "title": "Plangman",
    "char": "P"
  },
  {
    "file": "clplantsvszombies",
    "title": "Plantsvszombies",
    "char": "P"
  },
  {
    "file": "clplantsvszombiesnds",
    "title": "Plantsvszombiesnds",
    "char": "P"
  },
  {
    "file": "clplazmaburst",
    "title": "Plazmaburst",
    "char": "P"
  },
  {
    "file": "clplinko",
    "title": "Plinko",
    "char": "P"
  },
  {
    "file": "clplonky",
    "title": "Plonky",
    "char": "P"
  },
  {
    "file": "clpogo3D",
    "title": "Pogo 3 D",
    "char": "P"
  },
  {
    "file": "clpokeacademylifeforever",
    "title": "Pokeacademylifeforever",
    "char": "P"
  },
  {
    "file": "clpokeallin",
    "title": "Pokeallin",
    "char": "P"
  },
  {
    "file": "clPokeAmbrosia",
    "title": "Poke Ambrosia",
    "char": "P"
  },
  {
    "file": "clpokebattlefact",
    "title": "Pokebattlefact",
    "char": "P"
  },
  {
    "file": "clpokeblack",
    "title": "Pokeblack",
    "char": "P"
  },
  {
    "file": "clpokeblack2alt",
    "title": "Pokeblack 2 Alt",
    "char": "P"
  },
  {
    "file": "clpokeblack2html",
    "title": "Pokeblack 2 Html",
    "char": "P"
  },
  {
    "file": "clpokeblackalt",
    "title": "Pokeblackalt",
    "char": "P"
  },
  {
    "file": "clpokeblazeblack2redux",
    "title": "Pokeblazeblack 2 Redux",
    "char": "P"
  },
  {
    "file": "clpokeblue",
    "title": "Pokeblue",
    "char": "P"
  },
  {
    "file": "clpokeclassic",
    "title": "Pokeclassic",
    "char": "P"
  },
  {
    "file": "clpokecrown",
    "title": "Pokecrown",
    "char": "P"
  },
  {
    "file": "clpokecrystaladvanceredux",
    "title": "Pokecrystaladvanceredux",
    "char": "P"
  },
  {
    "file": "clpokecrystalclear",
    "title": "Pokecrystalclear",
    "char": "P"
  },
  {
    "file": "clpokediamond",
    "title": "Pokediamond",
    "char": "P"
  },
  {
    "file": "clpokedreamstone",
    "title": "Pokedreamstone",
    "char": "P"
  },
  {
    "file": "clpokeeliteredux",
    "title": "Pokeeliteredux",
    "char": "P"
  },
  {
    "file": "clpokeelysiuma",
    "title": "Pokeelysiuma",
    "char": "P"
  },
  {
    "file": "clpokeelysiumb",
    "title": "Pokeelysiumb",
    "char": "P"
  },
  {
    "file": "clpokeemeraldenhanced",
    "title": "Pokeemeraldenhanced",
    "char": "P"
  },
  {
    "file": "clpokeemeraldexceeded",
    "title": "Pokeemeraldexceeded",
    "char": "P"
  },
  {
    "file": "clpokeemeraldhorizons",
    "title": "Pokeemeraldhorizons",
    "char": "P"
  },
  {
    "file": "clpokeemeraldimperium",
    "title": "Pokeemeraldimperium",
    "char": "P"
  },
  {
    "file": "clpokeemeraldrandom",
    "title": "Pokeemeraldrandom",
    "char": "P"
  },
  {
    "file": "clpokeemeraldrogue",
    "title": "Pokeemeraldrogue",
    "char": "P"
  },
  {
    "file": "clPokeEmeraldRogueEX",
    "title": "Poke Emerald Rogue EX",
    "char": "P"
  },
  {
    "file": "clpokeemeraldz",
    "title": "Pokeemeraldz",
    "char": "P"
  },
  {
    "file": "clpokefiregold",
    "title": "Pokefiregold",
    "char": "P"
  },
  {
    "file": "clpokeflora",
    "title": "Pokeflora",
    "char": "P"
  },
  {
    "file": "clpokefrlgplus",
    "title": "Pokefrlgplus",
    "char": "P"
  },
  {
    "file": "clpokefuseddimension",
    "title": "Pokefuseddimension",
    "char": "P"
  },
  {
    "file": "clPokeFusion3",
    "title": "Poke Fusion 3",
    "char": "P"
  },
  {
    "file": "clpokegaia",
    "title": "Pokegaia",
    "char": "P"
  },
  {
    "file": "clpokegoldenshield",
    "title": "Pokegoldenshield",
    "char": "P"
  },
  {
    "file": "clpokegschronicles",
    "title": "Pokegschronicles",
    "char": "P"
  },
  {
    "file": "clpokeheartgold",
    "title": "Pokeheartgold",
    "char": "P"
  },
  {
    "file": "clPokeHeartgoldGenerations",
    "title": "Poke Heartgold Generations",
    "char": "P"
  },
  {
    "file": "clpokelightplatinum",
    "title": "Pokelightplatinum",
    "char": "P"
  },
  {
    "file": "clpokeliquidcrysta",
    "title": "Pokeliquidcrysta",
    "char": "P"
  },
  {
    "file": "clpokemegamoemon",
    "title": "Pokemegamoemon",
    "char": "P"
  },
  {
    "file": "clpokemonamnesia",
    "title": "Pokemonamnesia",
    "char": "P"
  },
  {
    "file": "clpokemonclover",
    "title": "Pokemonclover",
    "char": "P"
  },
  {
    "file": "clpokemoncrystal",
    "title": "Pokemoncrystal",
    "char": "P"
  },
  {
    "file": "clpokemonemerald",
    "title": "Pokemonemerald",
    "char": "P"
  },
  {
    "file": "clpokemonemeraldcrest",
    "title": "Pokemonemeraldcrest",
    "char": "P"
  },
  {
    "file": "clpokemonemeraldimperium",
    "title": "Pokemonemeraldimperium",
    "char": "P"
  },
  {
    "file": "clpokemonemeraldkaizo",
    "title": "Pokemonemeraldkaizo",
    "char": "P"
  },
  {
    "file": "clpokemonemeraldmini",
    "title": "Pokemonemeraldmini",
    "char": "P"
  },
  {
    "file": "clPokemonemeraldrouge",
    "title": "Pokemonemeraldrouge",
    "char": "P"
  },
  {
    "file": "clpokemonemeraldseaglass",
    "title": "Pokemonemeraldseaglass",
    "char": "P"
  },
  {
    "file": "clpokemonenergizedemerald",
    "title": "Pokemonenergizedemerald",
    "char": "P"
  },
  {
    "file": "clpokemonevolvedsfdgsdfs",
    "title": "Pokemonevolvedsfdgsdfs",
    "char": "P"
  },
  {
    "file": "clpokemonfirered",
    "title": "Pokemonfirered",
    "char": "P"
  },
  {
    "file": "clpokemonfireredandleafgreenplusedition",
    "title": "Pokemonfireredandleafgreenplusedition",
    "char": "P"
  },
  {
    "file": "clpokemonfireredrandomized",
    "title": "Pokemonfireredrandomized",
    "char": "P"
  },
  {
    "file": "clpokemongold",
    "title": "Pokemongold",
    "char": "P"
  },
  {
    "file": "clpokemonkaizoironfirered",
    "title": "Pokemonkaizoironfirered",
    "char": "P"
  },
  {
    "file": "clpokemonlazarus",
    "title": "Pokemonlazarus",
    "char": "P"
  },
  {
    "file": "clpokemonleafgreen",
    "title": "Pokemonleafgreen",
    "char": "P"
  },
  {
    "file": "clpokemonmodernemerald",
    "title": "Pokemonmodernemerald",
    "char": "P"
  },
  {
    "file": "clpokemonmysterydungeon",
    "title": "Pokemonmysterydungeon",
    "char": "P"
  },
  {
    "file": "clpokemonperfectemerald55",
    "title": "Pokemonperfectemerald 55",
    "char": "P"
  },
  {
    "file": "clpokemonquetzal",
    "title": "Pokemonquetzal",
    "char": "P"
  },
  {
    "file": "clpokemonroaringred",
    "title": "Pokemonroaringred",
    "char": "P"
  },
  {
    "file": "clPokemonrocketedition",
    "title": "Pokemonrocketedition",
    "char": "P"
  },
  {
    "file": "clpokemonruby",
    "title": "Pokemonruby",
    "char": "P"
  },
  {
    "file": "clpokemonsaiph",
    "title": "Pokemonsaiph",
    "char": "P"
  },
  {
    "file": "clpokemonsaiph2",
    "title": "Pokemonsaiph 2",
    "char": "P"
  },
  {
    "file": "clpokemonsapphire",
    "title": "Pokemonsapphire",
    "char": "P"
  },
  {
    "file": "clpokemonshinsigma",
    "title": "Pokemonshinsigma",
    "char": "P"
  },
  {
    "file": "clpokemonsilver",
    "title": "Pokemonsilver",
    "char": "P"
  },
  {
    "file": "clpokemonslgreen",
    "title": "Pokemonslgreen",
    "char": "P"
  },
  {
    "file": "clpokemonsmred",
    "title": "Pokemonsmred",
    "char": "P"
  },
  {
    "file": "clpokemonsnap",
    "title": "Pokemonsnap",
    "char": "P"
  },
  {
    "file": "clpokemonsors",
    "title": "Pokemonsors",
    "char": "P"
  },
  {
    "file": "clpokemonsors2",
    "title": "Pokemonsors 2",
    "char": "P"
  },
  {
    "file": "clpokemonstadium",
    "title": "Pokemonstadium",
    "char": "P"
  },
  {
    "file": "clpokemonstadium2",
    "title": "Pokemonstadium 2",
    "char": "P"
  },
  {
    "file": "clpokemontowerdefense",
    "title": "Pokemontowerdefense",
    "char": "P"
  },
  {
    "file": "clpokemonultimatefusion",
    "title": "Pokemonultimatefusion",
    "char": "P"
  },
  {
    "file": "clpokemonunbound",
    "title": "Pokemonunbound",
    "char": "P"
  },
  {
    "file": "clpokemonvolume1",
    "title": "Pokemonvolume 1",
    "char": "P"
  },
  {
    "file": "clpokemonvolume2",
    "title": "Pokemonvolume 2",
    "char": "P"
  },
  {
    "file": "clpokemonvolume3",
    "title": "Pokemonvolume 3",
    "char": "P"
  },
  {
    "file": "clpokemonvolume4",
    "title": "Pokemonvolume 4",
    "char": "P"
  },
  {
    "file": "clpokemoonemerald",
    "title": "Pokemoonemerald",
    "char": "P"
  },
  {
    "file": "clpokemoongalaxy",
    "title": "Pokemoongalaxy",
    "char": "P"
  },
  {
    "file": "clpokemysteryexplorersofsky",
    "title": "Pokemysteryexplorersofsky",
    "char": "P"
  },
  {
    "file": "clpokenameless",
    "title": "Pokenameless",
    "char": "P"
  },
  {
    "file": "clpokeodyssey",
    "title": "Pokeodyssey",
    "char": "P"
  },
  {
    "file": "clpokepasta",
    "title": "Pokepasta",
    "char": "P"
  },
  {
    "file": "clpokepath",
    "title": "Pokepath",
    "char": "P"
  },
  {
    "file": "clpokepearl",
    "title": "Pokepearl",
    "char": "P"
  },
  {
    "file": "clpokeperfectfirered",
    "title": "Pokeperfectfirered",
    "char": "P"
  },
  {
    "file": "clpokepisces",
    "title": "Pokepisces",
    "char": "P"
  },
  {
    "file": "clpokeplatinum",
    "title": "Pokeplatinum",
    "char": "P"
  },
  {
    "file": "clpokeplatinumrandomized",
    "title": "Pokeplatinumrandomized",
    "char": "P"
  },
  {
    "file": "clpokepureblue",
    "title": "Pokepureblue",
    "char": "P"
  },
  {
    "file": "clpokepuregreen",
    "title": "Pokepuregreen",
    "char": "P"
  },
  {
    "file": "clpokepurered",
    "title": "Pokepurered",
    "char": "P"
  },
  {
    "file": "clpokerechargedpink",
    "title": "Pokerechargedpink",
    "char": "P"
  },
  {
    "file": "clpokerechargedyellow",
    "title": "Pokerechargedyellow",
    "char": "P"
  },
  {
    "file": "clpokerecordkeepers",
    "title": "Pokerecordkeepers",
    "char": "P"
  },
  {
    "file": "clpokered",
    "title": "Pokered",
    "char": "P"
  },
  {
    "file": "clpokerenegadeplat",
    "title": "Pokerenegadeplat",
    "char": "P"
  },
  {
    "file": "clpokerocketedition",
    "title": "Pokerocketedition",
    "char": "P"
  },
  {
    "file": "clpokerowe",
    "title": "Pokerowe",
    "char": "P"
  },
  {
    "file": "clpokeruby",
    "title": "Pokeruby",
    "char": "P"
  },
  {
    "file": "clpokerunandbun",
    "title": "Pokerunandbun",
    "char": "P"
  },
  {
    "file": "clpokescorchedsilver",
    "title": "Pokescorchedsilver",
    "char": "P"
  },
  {
    "file": "clpokesoulsilver",
    "title": "Pokesoulsilver",
    "char": "P"
  },
  {
    "file": "clpokesunsky",
    "title": "Pokesunsky",
    "char": "P"
  },
  {
    "file": "clpoketcg1",
    "title": "Poketcg 1",
    "char": "P"
  },
  {
    "file": "clpoketcg2",
    "title": "Poketcg 2",
    "char": "P"
  },
  {
    "file": "clpokethepit",
    "title": "Pokethepit",
    "char": "P"
  },
  {
    "file": "clPokeThetaEmeraldEX",
    "title": "Poke Theta Emerald EX",
    "char": "P"
  },
  {
    "file": "clpoketoomanytypes2",
    "title": "Poketoomanytypes 2",
    "char": "P"
  },
  {
    "file": "clpoketourmaline",
    "title": "Poketourmaline",
    "char": "P"
  },
  {
    "file": "clpokeultraviolet",
    "title": "Pokeultraviolet",
    "char": "P"
  },
  {
    "file": "clpokeunovaemerald",
    "title": "Pokeunovaemerald",
    "char": "P"
  },
  {
    "file": "clpokevega",
    "title": "Pokevega",
    "char": "P"
  },
  {
    "file": "clpokevoltwhite2redux",
    "title": "Pokevoltwhite 2 Redux",
    "char": "P"
  },
  {
    "file": "clpokevoyager",
    "title": "Pokevoyager",
    "char": "P"
  },
  {
    "file": "clpokewhite",
    "title": "Pokewhite",
    "char": "P"
  },
  {
    "file": "clpokewhite2",
    "title": "Pokewhite 2",
    "char": "P"
  },
  {
    "file": "clpokewhite2alt",
    "title": "Pokewhite 2 Alt",
    "char": "P"
  },
  {
    "file": "clpokeyellow",
    "title": "Pokeyellow",
    "char": "P"
  },
  {
    "file": "clPok�mon Emerald Rush Edition (20)",
    "title": "Pok�mon Emerald Rush Edition (20)",
    "char": "P"
  },
  {
    "file": "clPok�mon Trade&_Stache (V11)",
    "title": "Pok�mon Trade& Stache (V 11)",
    "char": "P"
  },
  {
    "file": "clPok�mon TWO (v11)",
    "title": "Pok�mon TWO (v 11)",
    "char": "P"
  },
  {
    "file": "clPok�monstunningsteel",
    "title": "Pok�monstunningsteel",
    "char": "P"
  },
  {
    "file": "clpolicepursuit2",
    "title": "Policepursuit 2",
    "char": "P"
  },
  {
    "file": "clpolishedcrystal",
    "title": "Polishedcrystal",
    "char": "P"
  },
  {
    "file": "clpolytrackbutnotflagged(1)",
    "title": "Polytrackbutnotflagged(1)",
    "char": "P"
  },
  {
    "file": "clpolytrackbutnotflagged",
    "title": "Polytrackbutnotflagged",
    "char": "P"
  },
  {
    "file": "clpolytrackworksnow",
    "title": "Polytrackworksnow",
    "char": "P"
  },
  {
    "file": "clpomgetsinternet",
    "title": "Pomgetsinternet",
    "char": "P"
  },
  {
    "file": "clpoorbunny",
    "title": "Poorbunny",
    "char": "P"
  },
  {
    "file": "clpopeyepapi",
    "title": "Popeyepapi",
    "char": "P"
  },
  {
    "file": "clporklike",
    "title": "Porklike",
    "char": "P"
  },
  {
    "file": "clportal",
    "title": "Portal",
    "char": "P"
  },
  {
    "file": "clportal2d",
    "title": "Portal 2 D",
    "char": "P"
  },
  {
    "file": "clportaldefendersfastbreak",
    "title": "Portaldefendersfastbreak",
    "char": "P"
  },
  {
    "file": "clportaldefendersTD",
    "title": "Portaldefenders TD",
    "char": "P"
  },
  {
    "file": "clportalflash",
    "title": "Portalflash",
    "char": "P"
  },
  {
    "file": "clporter",
    "title": "Porter",
    "char": "P"
  },
  {
    "file": "clportraitofruin",
    "title": "Portraitofruin",
    "char": "P"
  },
  {
    "file": "clpossessquest",
    "title": "Possessquest",
    "char": "P"
  },
  {
    "file": "clpostal",
    "title": "Postal",
    "char": "P"
  },
  {
    "file": "clpotatomanseeksthetroof",
    "title": "Potatomanseeksthetroof",
    "char": "P"
  },
  {
    "file": "clpou(1)",
    "title": "Pou(1)",
    "char": "P"
  },
  {
    "file": "clPou",
    "title": "Pou",
    "char": "P"
  },
  {
    "file": "clpowerslave",
    "title": "Powerslave",
    "char": "P"
  },
  {
    "file": "clpraxisfighterx",
    "title": "Praxisfighterx",
    "char": "P"
  },
  {
    "file": "clprebronzeage",
    "title": "Prebronzeage",
    "char": "P"
  },
  {
    "file": "clprecivilationbronzeage",
    "title": "Precivilationbronzeage",
    "char": "P"
  },
  {
    "file": "clprehistoricshark",
    "title": "Prehistoricshark",
    "char": "P"
  },
  {
    "file": "clprimary",
    "title": "Primary",
    "char": "P"
  },
  {
    "file": "clprismarine",
    "title": "Prismarine",
    "char": "P"
  },
  {
    "file": "clprocessortycoon",
    "title": "Processortycoon",
    "char": "P"
  },
  {
    "file": "clprofessorlaytonandthecuriousvillage",
    "title": "Professorlaytonandthecuriousvillage",
    "char": "P"
  },
  {
    "file": "clpuckman",
    "title": "Puckman",
    "char": "P"
  },
  {
    "file": "clpullfrog",
    "title": "Pullfrog",
    "char": "P"
  },
  {
    "file": "clpumpkinrun",
    "title": "Pumpkinrun",
    "char": "P"
  },
  {
    "file": "clpunchout",
    "title": "Punchout",
    "char": "P"
  },
  {
    "file": "clpunchthedrump",
    "title": "Punchthedrump",
    "char": "P"
  },
  {
    "file": "clpunchthetrump",
    "title": "Punchthetrump",
    "char": "P"
  },
  {
    "file": "clpuppethockey",
    "title": "Puppethockey",
    "char": "P"
  },
  {
    "file": "clpuppetmaster",
    "title": "Puppetmaster",
    "char": "P"
  },
  {
    "file": "clpushyourluck",
    "title": "Pushyourluck",
    "char": "P"
  },
  {
    "file": "clpuyopuyofever",
    "title": "Puyopuyofever",
    "char": "P"
  },
  {
    "file": "clpvz",
    "title": "Pvz",
    "char": "P"
  },
  {
    "file": "clpvz2",
    "title": "Pvz 2",
    "char": "P"
  },
  {
    "file": "clpvz2gardenless",
    "title": "Pvz 2 Gardenless",
    "char": "P"
  },
  {
    "file": "clPVZM",
    "title": "PVZM",
    "char": "P"
  },
  {
    "file": "clpyrotoad",
    "title": "Pyrotoad",
    "char": "P"
  },
  {
    "file": "clqbert",
    "title": "Qbert",
    "char": "Q"
  },
  {
    "file": "clqbertarcade",
    "title": "Qbertarcade",
    "char": "Q"
  },
  {
    "file": "clqtrewired",
    "title": "Qtrewired",
    "char": "Q"
  },
  {
    "file": "clquake2",
    "title": "Quake 2",
    "char": "Q"
  },
  {
    "file": "clquake3",
    "title": "Quake 3",
    "char": "Q"
  },
  {
    "file": "clquake64",
    "title": "Quake 64",
    "char": "Q"
  },
  {
    "file": "clQuantumClicker",
    "title": "Quantum Clicker",
    "char": "Q"
  },
  {
    "file": "clquickieworld",
    "title": "Quickieworld",
    "char": "Q"
  },
  {
    "file": "clqwop",
    "title": "Qwop",
    "char": "Q"
  },
  {
    "file": "clracemaster3d",
    "title": "Racemaster 3 D",
    "char": "R"
  },
  {
    "file": "clracingarena",
    "title": "Racingarena",
    "char": "R"
  },
  {
    "file": "clradicalred",
    "title": "Radicalred",
    "char": "R"
  },
  {
    "file": "clradracer",
    "title": "Radracer",
    "char": "R"
  },
  {
    "file": "clraftwars",
    "title": "Raftwars",
    "char": "R"
  },
  {
    "file": "clraftwars2",
    "title": "Raftwars 2",
    "char": "R"
  },
  {
    "file": "clragdoll-io",
    "title": "Ragdoll-io",
    "char": "R"
  },
  {
    "file": "clragdollachivement",
    "title": "Ragdollachivement",
    "char": "R"
  },
  {
    "file": "clragdollarchers",
    "title": "Ragdollarchers",
    "char": "R"
  },
  {
    "file": "clragdolldrop",
    "title": "Ragdolldrop",
    "char": "R"
  },
  {
    "file": "clragdollhit",
    "title": "Ragdollhit",
    "char": "R"
  },
  {
    "file": "clragdollrunners",
    "title": "Ragdollrunners",
    "char": "R"
  },
  {
    "file": "clragdollsoccer",
    "title": "Ragdollsoccer",
    "char": "R"
  },
  {
    "file": "clragollhit",
    "title": "Ragollhit",
    "char": "R"
  },
  {
    "file": "clrainbowsix",
    "title": "Rainbowsix",
    "char": "R"
  },
  {
    "file": "clrainbowsixalt",
    "title": "Rainbowsixalt",
    "char": "R"
  },
  {
    "file": "clraldiscrackhouse",
    "title": "Raldiscrackhouse",
    "char": "R"
  },
  {
    "file": "clravenbase",
    "title": "Ravenbase",
    "char": "R"
  },
  {
    "file": "clray1",
    "title": "Ray 1",
    "char": "R"
  },
  {
    "file": "clray2",
    "title": "Ray 2",
    "char": "R"
  },
  {
    "file": "clrayman",
    "title": "Rayman",
    "char": "R"
  },
  {
    "file": "clraze",
    "title": "Raze",
    "char": "R"
  },
  {
    "file": "clraze2",
    "title": "Raze 2",
    "char": "R"
  },
  {
    "file": "clraze3",
    "title": "Raze 3",
    "char": "R"
  },
  {
    "file": "clre3",
    "title": "Re 3",
    "char": "R"
  },
  {
    "file": "clreachthecore",
    "title": "Reachthecore",
    "char": "R"
  },
  {
    "file": "clrealflightsim",
    "title": "Realflightsim",
    "char": "R"
  },
  {
    "file": "clrebuild",
    "title": "Rebuild",
    "char": "R"
  },
  {
    "file": "clrebuild2",
    "title": "Rebuild 2",
    "char": "R"
  },
  {
    "file": "clrecoil",
    "title": "Recoil",
    "char": "R"
  },
  {
    "file": "clredalert",
    "title": "Redalert",
    "char": "R"
  },
  {
    "file": "clredball",
    "title": "Redball",
    "char": "R"
  },
  {
    "file": "clredball2",
    "title": "Redball 2",
    "char": "R"
  },
  {
    "file": "clredball3",
    "title": "Redball 3",
    "char": "R"
  },
  {
    "file": "clredball4(1)",
    "title": "Redball 4(1)",
    "char": "R"
  },
  {
    "file": "clRedBall4",
    "title": "Red Ball 4",
    "char": "R"
  },
  {
    "file": "clredball4vol2",
    "title": "Redball 4 Vol 2",
    "char": "R"
  },
  {
    "file": "clredball4vol3",
    "title": "Redball 4 Vol 3",
    "char": "R"
  },
  {
    "file": "clredhanded",
    "title": "Redhanded",
    "char": "R"
  },
  {
    "file": "clredtierunner",
    "title": "Redtierunner",
    "char": "R"
  },
  {
    "file": "clredvbluefix",
    "title": "Redvbluefix",
    "char": "R"
  },
  {
    "file": "clredvsblue2",
    "title": "Redvsblue 2",
    "char": "R"
  },
  {
    "file": "clredvsbluewar",
    "title": "Redvsbluewar",
    "char": "R"
  },
  {
    "file": "clreignofcentipede",
    "title": "Reignofcentipede",
    "char": "R"
  },
  {
    "file": "clrenegades",
    "title": "Renegades",
    "char": "R"
  },
  {
    "file": "clrepobad",
    "title": "Repobad",
    "char": "R"
  },
  {
    "file": "clresidentevil",
    "title": "Residentevil",
    "char": "R"
  },
  {
    "file": "clresidentevil2",
    "title": "Residentevil 2",
    "char": "R"
  },
  {
    "file": "clresidentevil2d1",
    "title": "Residentevil 2 D 1",
    "char": "R"
  },
  {
    "file": "clresidentevil2d2",
    "title": "Residentevil 2 D 2",
    "char": "R"
  },
  {
    "file": "clresizer",
    "title": "Resizer",
    "char": "R"
  },
  {
    "file": "clresortempire",
    "title": "Resortempire",
    "char": "R"
  },
  {
    "file": "clretrobowl",
    "title": "Retrobowl",
    "char": "R"
  },
  {
    "file": "clretrobowlcollege",
    "title": "Retrobowlcollege",
    "char": "R"
  },
  {
    "file": "clretrohighway",
    "title": "Retrohighway",
    "char": "R"
  },
  {
    "file": "clretropingpong",
    "title": "Retropingpong",
    "char": "R"
  },
  {
    "file": "clreturnman",
    "title": "Returnman",
    "char": "R"
  },
  {
    "file": "clreturnman2",
    "title": "Returnman 2",
    "char": "R"
  },
  {
    "file": "clreturntoriddleschool",
    "title": "Returntoriddleschool",
    "char": "R"
  },
  {
    "file": "clrevolutionidle",
    "title": "Revolutionidle",
    "char": "R"
  },
  {
    "file": "clrewrite2",
    "title": "Rewrite 2",
    "char": "R"
  },
  {
    "file": "clrh",
    "title": "Rh",
    "char": "R"
  },
  {
    "file": "clrhythmheaven",
    "title": "Rhythmheaven",
    "char": "R"
  },
  {
    "file": "clrhythymymheaven",
    "title": "Rhythymymheaven",
    "char": "R"
  },
  {
    "file": "clricochetkills2",
    "title": "Ricochetkills 2",
    "char": "R"
  },
  {
    "file": "clriddle",
    "title": "Riddle",
    "char": "R"
  },
  {
    "file": "clriddlemiddleschool",
    "title": "Riddlemiddleschool",
    "char": "R"
  },
  {
    "file": "clriddleschool",
    "title": "Riddleschool",
    "char": "R"
  },
  {
    "file": "clriddleschool2",
    "title": "Riddleschool 2",
    "char": "R"
  },
  {
    "file": "clriddleschool3",
    "title": "Riddleschool 3",
    "char": "R"
  },
  {
    "file": "clriddleschool445544444$$444$444",
    "title": "Riddleschool 445544444$$444$444",
    "char": "R"
  },
  {
    "file": "clriddletransfer",
    "title": "Riddletransfer",
    "char": "R"
  },
  {
    "file": "clriddletransfer2",
    "title": "Riddletransfer 2",
    "char": "R"
  },
  {
    "file": "clriddleuneversityfix",
    "title": "Riddleuneversityfix",
    "char": "R"
  },
  {
    "file": "clridgeracer",
    "title": "Ridgeracer",
    "char": "R"
  },
  {
    "file": "clrisehigher",
    "title": "Risehigher",
    "char": "R"
  },
  {
    "file": "clristar",
    "title": "Ristar",
    "char": "R"
  },
  {
    "file": "clroadfighter",
    "title": "Roadfighter",
    "char": "R"
  },
  {
    "file": "clroadoffury",
    "title": "Roadoffury",
    "char": "R"
  },
  {
    "file": "clroadofthedead",
    "title": "Roadofthedead",
    "char": "R"
  },
  {
    "file": "clroadofthedead2",
    "title": "Roadofthedead 2",
    "char": "R"
  },
  {
    "file": "clroadrunnernes",
    "title": "Roadrunnernes",
    "char": "R"
  },
  {
    "file": "clrocketgoalio",
    "title": "Rocketgoalio",
    "char": "R"
  },
  {
    "file": "clrocketjump",
    "title": "Rocketjump",
    "char": "R"
  },
  {
    "file": "clrocketknight2 (1)",
    "title": "Rocketknight 2 (1)",
    "char": "R"
  },
  {
    "file": "clrocketknight2(1)",
    "title": "Rocketknight 2(1)",
    "char": "R"
  },
  {
    "file": "clrocketknight2(2)",
    "title": "Rocketknight 2(2)",
    "char": "R"
  },
  {
    "file": "clrocketknight2",
    "title": "Rocketknight 2",
    "char": "R"
  },
  {
    "file": "clrocketknightadventures",
    "title": "Rocketknightadventures",
    "char": "R"
  },
  {
    "file": "clrocketleague",
    "title": "Rocketleague",
    "char": "R"
  },
  {
    "file": "clrocketpult",
    "title": "Rocketpult",
    "char": "R"
  },
  {
    "file": "clrocketsoccerderby",
    "title": "Rocketsoccerderby",
    "char": "R"
  },
  {
    "file": "clrodha",
    "title": "Rodha",
    "char": "R"
  },
  {
    "file": "clroguesoul",
    "title": "Roguesoul",
    "char": "R"
  },
  {
    "file": "clroguesoul2",
    "title": "Roguesoul 2",
    "char": "R"
  },
  {
    "file": "clrollerballer",
    "title": "Rollerballer",
    "char": "R"
  },
  {
    "file": "clrollingsky",
    "title": "Rollingsky",
    "char": "R"
  },
  {
    "file": "clrollyvortex",
    "title": "Rollyvortex",
    "char": "R"
  },
  {
    "file": "clrolypolymonster",
    "title": "Rolypolymonster",
    "char": "R"
  },
  {
    "file": "clrooftoprun",
    "title": "Rooftoprun",
    "char": "R"
  },
  {
    "file": "clrooftopsnipers",
    "title": "Rooftopsnipers",
    "char": "R"
  },
  {
    "file": "clrooftopsnipers2",
    "title": "Rooftopsnipers 2",
    "char": "R"
  },
  {
    "file": "clroomclicker",
    "title": "Roomclicker",
    "char": "R"
  },
  {
    "file": "clrosegold",
    "title": "Rosegold",
    "char": "R"
  },
  {
    "file": "clrotate",
    "title": "Rotate",
    "char": "R"
  },
  {
    "file": "clroulettehero",
    "title": "Roulettehero",
    "char": "R"
  },
  {
    "file": "clrouletteknight",
    "title": "Rouletteknight",
    "char": "R"
  },
  {
    "file": "clruffle",
    "title": "Ruffle",
    "char": "R"
  },
  {
    "file": "clrun-2",
    "title": "Run-2",
    "char": "R"
  },
  {
    "file": "clrun",
    "title": "Run",
    "char": "R"
  },
  {
    "file": "clrun2",
    "title": "Run 2",
    "char": "R"
  },
  {
    "file": "clrun3",
    "title": "Run 3",
    "char": "R"
  },
  {
    "file": "clrunningfred",
    "title": "Runningfred",
    "char": "R"
  },
  {
    "file": "clrussianbuckshot",
    "title": "Russianbuckshot",
    "char": "R"
  },
  {
    "file": "clrussiancardriver",
    "title": "Russiancardriver",
    "char": "R"
  },
  {
    "file": "clrussiansandbox",
    "title": "Russiansandbox",
    "char": "R"
  },
  {
    "file": "clsaihatestation",
    "title": "Saihatestation",
    "char": "S"
  },
  {
    "file": "clsandboxcity",
    "title": "Sandboxcity",
    "char": "S"
  },
  {
    "file": "clsandboxels",
    "title": "Sandboxels",
    "char": "S"
  },
  {
    "file": "clsandsofthecoliseum",
    "title": "Sandsofthecoliseum",
    "char": "S"
  },
  {
    "file": "clsandstone(1)",
    "title": "Sandstone(1)",
    "char": "S"
  },
  {
    "file": "clsandstone",
    "title": "Sandstone",
    "char": "S"
  },
  {
    "file": "clsandtris",
    "title": "Sandtris",
    "char": "S"
  },
  {
    "file": "clsantarun",
    "title": "Santarun",
    "char": "S"
  },
  {
    "file": "clsanty",
    "title": "Santy",
    "char": "S"
  },
  {
    "file": "clsaszombieassault2",
    "title": "Saszombieassault 2",
    "char": "S"
  },
  {
    "file": "clsatryn",
    "title": "Satryn",
    "char": "S"
  },
  {
    "file": "clsaulgoodmanrun",
    "title": "Saulgoodmanrun",
    "char": "S"
  },
  {
    "file": "clsausageflip",
    "title": "Sausageflip",
    "char": "S"
  },
  {
    "file": "clsayorisnotebook",
    "title": "Sayorisnotebook",
    "char": "S"
  },
  {
    "file": "clscalethedepths",
    "title": "Scalethedepths",
    "char": "S"
  },
  {
    "file": "clScamptonTheGreatFightRecreate",
    "title": "Scampton The Great Fight Recreate",
    "char": "S"
  },
  {
    "file": "clscarletandviolet",
    "title": "Scarletandviolet",
    "char": "S"
  },
  {
    "file": "clscarletshift",
    "title": "Scarletshift",
    "char": "S"
  },
  {
    "file": "clscarymazegame",
    "title": "Scarymazegame",
    "char": "S"
  },
  {
    "file": "clscaryshawarma",
    "title": "Scaryshawarma",
    "char": "S"
  },
  {
    "file": "clscaryteacher3d",
    "title": "Scaryteacher 3 D",
    "char": "S"
  },
  {
    "file": "clschoolboyrunaway",
    "title": "Schoolboyrunaway",
    "char": "S"
  },
  {
    "file": "clscrapmetal3",
    "title": "Scrapmetal 3",
    "char": "S"
  },
  {
    "file": "clscrapyarddog",
    "title": "Scrapyarddog",
    "char": "S"
  },
  {
    "file": "clscratchoptions",
    "title": "Scratchoptions",
    "char": "S"
  },
  {
    "file": "clscribblenauts",
    "title": "Scribblenauts",
    "char": "S"
  },
  {
    "file": "clscubabear",
    "title": "Scubabear",
    "char": "S"
  },
  {
    "file": "clsd-thewar",
    "title": "Sd-thewar",
    "char": "S"
  },
  {
    "file": "clsdf",
    "title": "Sdf",
    "char": "S"
  },
  {
    "file": "clseamongrel",
    "title": "Seamongrel",
    "char": "S"
  },
  {
    "file": "clsecretofmana",
    "title": "Secretofmana",
    "char": "S"
  },
  {
    "file": "clsega2gg",
    "title": "Sega 2 Gg",
    "char": "S"
  },
  {
    "file": "clSegaSonicTheHedgehog",
    "title": "Sega Sonic The Hedgehog",
    "char": "S"
  },
  {
    "file": "clself",
    "title": "Self",
    "char": "S"
  },
  {
    "file": "clsentryfortress",
    "title": "Sentryfortress",
    "char": "S"
  },
  {
    "file": "clserenitrove",
    "title": "Serenitrove",
    "char": "S"
  },
  {
    "file": "clserioussamadvance",
    "title": "Serioussamadvance",
    "char": "S"
  },
  {
    "file": "clservingupmadness",
    "title": "Servingupmadness",
    "char": "S"
  },
  {
    "file": "clsevendays",
    "title": "Sevendays",
    "char": "S"
  },
  {
    "file": "clsfk",
    "title": "Sfk",
    "char": "S"
  },
  {
    "file": "clsfk2",
    "title": "Sfk 2",
    "char": "S"
  },
  {
    "file": "clsfklaststand",
    "title": "Sfklaststand",
    "char": "S"
  },
  {
    "file": "clsfkleague",
    "title": "Sfkleague",
    "char": "S"
  },
  {
    "file": "clshadowcourier",
    "title": "Shadowcourier",
    "char": "S"
  },
  {
    "file": "clshadowdancer",
    "title": "Shadowdancer",
    "char": "S"
  },
  {
    "file": "clshadowdancersecret",
    "title": "Shadowdancersecret",
    "char": "S"
  },
  {
    "file": "clshaggy (1)",
    "title": "Shaggy (1)",
    "char": "S"
  },
  {
    "file": "clshaggy",
    "title": "Shaggy",
    "char": "S"
  },
  {
    "file": "clshantaegb",
    "title": "Shantaegb",
    "char": "S"
  },
  {
    "file": "clshapetransform",
    "title": "Shapetransform",
    "char": "S"
  },
  {
    "file": "clshc1",
    "title": "Shc 1",
    "char": "S"
  },
  {
    "file": "clshc2",
    "title": "Shc 2",
    "char": "S"
  },
  {
    "file": "clshc3",
    "title": "Shc 3",
    "char": "S"
  },
  {
    "file": "clshift",
    "title": "Shift",
    "char": "S"
  },
  {
    "file": "clshift2",
    "title": "Shift 2",
    "char": "S"
  },
  {
    "file": "clshift3",
    "title": "Shift 3",
    "char": "S"
  },
  {
    "file": "clshiftatmidnight",
    "title": "Shiftatmidnight",
    "char": "S"
  },
  {
    "file": "clshinmegamitenseidevilsurvivor",
    "title": "Shinmegamitenseidevilsurvivor",
    "char": "S"
  },
  {
    "file": "clshinobi",
    "title": "Shinobi",
    "char": "S"
  },
  {
    "file": "clshinobi3",
    "title": "Shinobi 3",
    "char": "S"
  },
  {
    "file": "clshinobirevenge",
    "title": "Shinobirevenge",
    "char": "S"
  },
  {
    "file": "clshoppingcarthero",
    "title": "Shoppingcarthero",
    "char": "S"
  },
  {
    "file": "clshortlife",
    "title": "Shortlife",
    "char": "S"
  },
  {
    "file": "clshotout4",
    "title": "Shotout 4",
    "char": "S"
  },
  {
    "file": "clshredmill",
    "title": "Shredmill",
    "char": "S"
  },
  {
    "file": "clshredsauce",
    "title": "Shredsauce",
    "char": "S"
  },
  {
    "file": "clshrek-2",
    "title": "Shrek-2",
    "char": "S"
  },
  {
    "file": "clshrubnaut",
    "title": "Shrubnaut",
    "char": "S"
  },
  {
    "file": "clshwultimatem",
    "title": "Shwultimatem",
    "char": "S"
  },
  {
    "file": "clsideeffects",
    "title": "Sideeffects",
    "char": "S"
  },
  {
    "file": "clsidepocket",
    "title": "Sidepocket",
    "char": "S"
  },
  {
    "file": "clsierra7",
    "title": "Sierra 7",
    "char": "S"
  },
  {
    "file": "clsilenthill",
    "title": "Silenthill",
    "char": "S"
  },
  {
    "file": "clsilenthillalt",
    "title": "Silenthillalt",
    "char": "S"
  },
  {
    "file": "clsilk",
    "title": "Silk",
    "char": "S"
  },
  {
    "file": "clsilkmelody",
    "title": "Silkmelody",
    "char": "S"
  },
  {
    "file": "clsiloshowdow",
    "title": "Siloshowdow",
    "char": "S"
  },
  {
    "file": "clsilver",
    "title": "Silver",
    "char": "S"
  },
  {
    "file": "clsimcity64",
    "title": "Simcity 64",
    "char": "S"
  },
  {
    "file": "clsimpsonsarcade",
    "title": "Simpsonsarcade",
    "char": "S"
  },
  {
    "file": "clSINGLEFILE",
    "title": "SINGLEFILE",
    "char": "S"
  },
  {
    "file": "clsixwaystodie",
    "title": "Sixwaystodie",
    "char": "S"
  },
  {
    "file": "clskateit",
    "title": "Skateit",
    "char": "S"
  },
  {
    "file": "clskateordie",
    "title": "Skateordie",
    "char": "S"
  },
  {
    "file": "clskibididibidygyattohiorizzingallovertheplacestillwatermangotheoryfemboydrool",
    "title": "Skibididibidygyattohiorizzingallovertheplacestillwatermangotheoryfemboydrool",
    "char": "S"
  },
  {
    "file": "clskibidiinthebackrooms",
    "title": "Skibidiinthebackrooms",
    "char": "S"
  },
  {
    "file": "clskibidishooter",
    "title": "Skibidishooter",
    "char": "S"
  },
  {
    "file": "clskinwalker",
    "title": "Skinwalker",
    "char": "S"
  },
  {
    "file": "clskong",
    "title": "Skong",
    "char": "S"
  },
  {
    "file": "clskyrace-3d",
    "title": "Skyrace-3 D",
    "char": "S"
  },
  {
    "file": "clSkyRiders",
    "title": "Sky Riders",
    "char": "S"
  },
  {
    "file": "clskywire",
    "title": "Skywire",
    "char": "S"
  },
  {
    "file": "clskywire2",
    "title": "Skywire 2",
    "char": "S"
  },
  {
    "file": "clslenderman",
    "title": "Slenderman",
    "char": "S"
  },
  {
    "file": "clslendytubbies",
    "title": "Slendytubbies",
    "char": "S"
  },
  {
    "file": "clsliceitall",
    "title": "Sliceitall",
    "char": "S"
  },
  {
    "file": "clslideinthewoods",
    "title": "Slideinthewoods",
    "char": "S"
  },
  {
    "file": "clslimelabratory",
    "title": "Slimelabratory",
    "char": "S"
  },
  {
    "file": "clslipways",
    "title": "Slipways",
    "char": "S"
  },
  {
    "file": "clslitherio",
    "title": "Slitherio",
    "char": "S"
  },
  {
    "file": "clslope",
    "title": "Slope",
    "char": "S"
  },
  {
    "file": "clslope2player",
    "title": "Slope 2 Player",
    "char": "S"
  },
  {
    "file": "clslope3",
    "title": "Slope 3",
    "char": "S"
  },
  {
    "file": "clslopeplus",
    "title": "Slopeplus",
    "char": "S"
  },
  {
    "file": "clslotornot",
    "title": "Slotornot",
    "char": "S"
  },
  {
    "file": "clslowroads",
    "title": "Slowroads",
    "char": "S"
  },
  {
    "file": "clsm63redux",
    "title": "Sm 63 Redux",
    "char": "S"
  },
  {
    "file": "clsm64greenstars",
    "title": "Sm 64 Greenstars",
    "char": "S"
  },
  {
    "file": "clsm64hiddenstars",
    "title": "Sm 64 Hiddenstars",
    "char": "S"
  },
  {
    "file": "clSM64Land",
    "title": "SM 64 Land",
    "char": "S"
  },
  {
    "file": "clsm64lastimpact",
    "title": "Sm 64 Lastimpact",
    "char": "S"
  },
  {
    "file": "clsm64liminaldream",
    "title": "Sm 64 Liminaldream",
    "char": "S"
  },
  {
    "file": "clsm64oot",
    "title": "Sm 64 Oot",
    "char": "S"
  },
  {
    "file": "clsm64sapphire",
    "title": "Sm 64 Sapphire",
    "char": "S"
  },
  {
    "file": "clsmadvance2",
    "title": "Smadvance 2",
    "char": "S"
  },
  {
    "file": "clsmadvance3",
    "title": "Smadvance 3",
    "char": "S"
  },
  {
    "file": "clSmash Hit Ripoff",
    "title": "Smash Hit Ripoff",
    "char": "S"
  },
  {
    "file": "clsmashkarts",
    "title": "Smashkarts",
    "char": "S"
  },
  {
    "file": "clsmashkartsworking",
    "title": "Smashkartsworking",
    "char": "S"
  },
  {
    "file": "clsmashremix",
    "title": "Smashremix",
    "char": "S"
  },
  {
    "file": "clsmashremix201",
    "title": "Smashremix 201",
    "char": "S"
  },
  {
    "file": "clsmb12",
    "title": "Smb 12",
    "char": "S"
  },
  {
    "file": "clsmbc",
    "title": "Smbc",
    "char": "S"
  },
  {
    "file": "clsmbcrossover",
    "title": "Smbcrossover",
    "char": "S"
  },
  {
    "file": "clsmbgameover",
    "title": "Smbgameover",
    "char": "S"
  },
  {
    "file": "clsmbremastered",
    "title": "Smbremastered",
    "char": "S"
  },
  {
    "file": "clsmc",
    "title": "Smc",
    "char": "S"
  },
  {
    "file": "clsmgds",
    "title": "Smgds",
    "char": "S"
  },
  {
    "file": "clsnailbob",
    "title": "Snailbob",
    "char": "S"
  },
  {
    "file": "clsnailbob2",
    "title": "Snailbob 2",
    "char": "S"
  },
  {
    "file": "clsnailbob3",
    "title": "Snailbob 3",
    "char": "S"
  },
  {
    "file": "clsnailbob4space",
    "title": "Snailbob 4 Space",
    "char": "S"
  },
  {
    "file": "clsnailbob5lovestory",
    "title": "Snailbob 5 Lovestory",
    "char": "S"
  },
  {
    "file": "clsnakeis",
    "title": "Snakeis",
    "char": "S"
  },
  {
    "file": "clsnakelike",
    "title": "Snakelike",
    "char": "S"
  },
  {
    "file": "clsnipershot",
    "title": "Snipershot",
    "char": "S"
  },
  {
    "file": "clsniperv2",
    "title": "Sniperv 2",
    "char": "S"
  },
  {
    "file": "clsnowballio",
    "title": "Snowballio",
    "char": "S"
  },
  {
    "file": "clsnowboardobby",
    "title": "Snowboardobby",
    "char": "S"
  },
  {
    "file": "clsnowbros (1)",
    "title": "Snowbros (1)",
    "char": "S"
  },
  {
    "file": "clsnowbros(1)",
    "title": "Snowbros(1)",
    "char": "S"
  },
  {
    "file": "clsnowbros(2)",
    "title": "Snowbros(2)",
    "char": "S"
  },
  {
    "file": "clsnowbros",
    "title": "Snowbros",
    "char": "S"
  },
  {
    "file": "clSnowBrosGenesis",
    "title": "Snow Bros Genesis",
    "char": "S"
  },
  {
    "file": "clsnowbrothers",
    "title": "Snowbrothers",
    "char": "S"
  },
  {
    "file": "clsnowdrift",
    "title": "Snowdrift",
    "char": "S"
  },
  {
    "file": "clsnowrid",
    "title": "Snowrid",
    "char": "S"
  },
  {
    "file": "clsnowrideee",
    "title": "Snowrideee",
    "char": "S"
  },
  {
    "file": "clsnowrider",
    "title": "Snowrider",
    "char": "S"
  },
  {
    "file": "clsnowridergoodygumdrops",
    "title": "Snowridergoodygumdrops",
    "char": "S"
  },
  {
    "file": "clsnowriderrrr",
    "title": "Snowriderrrr",
    "char": "S"
  },
  {
    "file": "clsnowroad",
    "title": "Snowroad",
    "char": "S"
  },
  {
    "file": "clsnowwhite",
    "title": "Snowwhite",
    "char": "S"
  },
  {
    "file": "clsoccerbros",
    "title": "Soccerbros",
    "char": "S"
  },
  {
    "file": "clsoccerrandom",
    "title": "Soccerrandom",
    "char": "S"
  },
  {
    "file": "clsoccerrandomgood",
    "title": "Soccerrandomgood",
    "char": "S"
  },
  {
    "file": "clsodasimulator",
    "title": "Sodasimulator",
    "char": "S"
  },
  {
    "file": "clsolarsandbox",
    "title": "Solarsandbox",
    "char": "S"
  },
  {
    "file": "clsolarsmash",
    "title": "Solarsmash",
    "char": "S"
  },
  {
    "file": "clsolatrobo",
    "title": "Solatrobo",
    "char": "S"
  },
  {
    "file": "clsolitaire",
    "title": "Solitaire",
    "char": "S"
  },
  {
    "file": "clsolstice",
    "title": "Solstice",
    "char": "S"
  },
  {
    "file": "clsomari64",
    "title": "Somari 64",
    "char": "S"
  },
  {
    "file": "clSonic & Knuckles + Sonic The Hedgehog 3",
    "title": "Sonic & Knuckles + Sonic The Hedgehog 3",
    "char": "S"
  },
  {
    "file": "clsonic1contemporary",
    "title": "Sonic 1 Contemporary",
    "char": "S"
  },
  {
    "file": "clsonic1mobile",
    "title": "Sonic 1 Mobile",
    "char": "S"
  },
  {
    "file": "clSonic1ScoreRush",
    "title": "Sonic 1 Score Rush",
    "char": "S"
  },
  {
    "file": "clSonic1TheSuperChallenges",
    "title": "Sonic 1 The Super Challenges",
    "char": "S"
  },
  {
    "file": "clsonic2mobile",
    "title": "Sonic 2 Mobile",
    "char": "S"
  },
  {
    "file": "clsonic2pinkedition",
    "title": "Sonic 2 Pinkedition",
    "char": "S"
  },
  {
    "file": "clSonic2ScoreRush",
    "title": "Sonic 2 Score Rush",
    "char": "S"
  },
  {
    "file": "clsonic2timeandplace",
    "title": "Sonic 2 Timeandplace",
    "char": "S"
  },
  {
    "file": "clsonic3andknuckles",
    "title": "Sonic 3 Andknuckles",
    "char": "S"
  },
  {
    "file": "clsonic3andsally",
    "title": "Sonic 3 Andsally",
    "char": "S"
  },
  {
    "file": "clsonic3complete",
    "title": "Sonic 3 Complete",
    "char": "S"
  },
  {
    "file": "clsonic3dblast",
    "title": "Sonic 3 Dblast",
    "char": "S"
  },
  {
    "file": "clsonic3dblastdx",
    "title": "Sonic 3 Dblastdx",
    "char": "S"
  },
  {
    "file": "clsonicadvance",
    "title": "Sonicadvance",
    "char": "S"
  },
  {
    "file": "clsonicadvance2",
    "title": "Sonicadvance 2",
    "char": "S"
  },
  {
    "file": "clsonicadvance2sp",
    "title": "Sonicadvance 2 Sp",
    "char": "S"
  },
  {
    "file": "clsonicadvance3",
    "title": "Sonicadvance 3",
    "char": "S"
  },
  {
    "file": "clsonicandashuro",
    "title": "Sonicandashuro",
    "char": "S"
  },
  {
    "file": "clsonicandfallingstar",
    "title": "Sonicandfallingstar",
    "char": "S"
  },
  {
    "file": "clsonicandknuckles",
    "title": "Sonicandknuckles",
    "char": "S"
  },
  {
    "file": "clsonicbattle",
    "title": "Sonicbattle",
    "char": "S"
  },
  {
    "file": "clsonicblast",
    "title": "Sonicblast",
    "char": "S"
  },
  {
    "file": "clsoniccd",
    "title": "Soniccd",
    "char": "S"
  },
  {
    "file": "clsoniccdmobile",
    "title": "Soniccdmobile",
    "char": "S"
  },
  {
    "file": "clsonicchaos",
    "title": "Sonicchaos",
    "char": "S"
  },
  {
    "file": "clsonicclassiccollection",
    "title": "Sonicclassiccollection",
    "char": "S"
  },
  {
    "file": "clsonicclassicheroes(1)",
    "title": "Sonicclassicheroes(1)",
    "char": "S"
  },
  {
    "file": "clsonicclassicheroes",
    "title": "Sonicclassicheroes",
    "char": "S"
  },
  {
    "file": "clSonicClassics",
    "title": "Sonic Classics",
    "char": "S"
  },
  {
    "file": "clsoniccolors",
    "title": "Soniccolors",
    "char": "S"
  },
  {
    "file": "clsonicdeltaorigins",
    "title": "Sonicdeltaorigins",
    "char": "S"
  },
  {
    "file": "clsoniceexeog",
    "title": "Soniceexeog",
    "char": "S"
  },
  {
    "file": "clsonicerazor",
    "title": "Sonicerazor",
    "char": "S"
  },
  {
    "file": "clsonicgg",
    "title": "Sonicgg",
    "char": "S"
  },
  {
    "file": "clSonicHellfireSaga",
    "title": "Sonic Hellfire Saga",
    "char": "S"
  },
  {
    "file": "clSonicInSM64",
    "title": "Sonic In SM 64",
    "char": "S"
  },
  {
    "file": "clSonicinSMW(1)",
    "title": "Sonicin SMW(1)",
    "char": "S"
  },
  {
    "file": "clsonicinsmw(2)",
    "title": "Sonicinsmw(2)",
    "char": "S"
  },
  {
    "file": "clSonicinSMW",
    "title": "Sonicin SMW",
    "char": "S"
  },
  {
    "file": "clsonicjam",
    "title": "Sonicjam",
    "char": "S"
  },
  {
    "file": "clsoniclabyrinth",
    "title": "Soniclabyrinth",
    "char": "S"
  },
  {
    "file": "clsonicmania",
    "title": "Sonicmania",
    "char": "S"
  },
  {
    "file": "clsonicmaniaplus",
    "title": "Sonicmaniaplus",
    "char": "S"
  },
  {
    "file": "clsonicmegamix",
    "title": "Sonicmegamix",
    "char": "S"
  },
  {
    "file": "clsonicmon",
    "title": "Sonicmon",
    "char": "S"
  },
  {
    "file": "clsonicpocketadventure",
    "title": "Sonicpocketadventure",
    "char": "S"
  },
  {
    "file": "clsonicr",
    "title": "Sonicr",
    "char": "S"
  },
  {
    "file": "clsonicralt",
    "title": "Sonicralt",
    "char": "S"
  },
  {
    "file": "clsonicrevert",
    "title": "Sonicrevert",
    "char": "S"
  },
  {
    "file": "clsonicrush",
    "title": "Sonicrush",
    "char": "S"
  },
  {
    "file": "clsonicrushadventure",
    "title": "Sonicrushadventure",
    "char": "S"
  },
  {
    "file": "clsonicscorchedquest",
    "title": "Sonicscorchedquest",
    "char": "S"
  },
  {
    "file": "clsonicspinball",
    "title": "Sonicspinball",
    "char": "S"
  },
  {
    "file": "clsonicthehedgehog",
    "title": "Sonicthehedgehog",
    "char": "S"
  },
  {
    "file": "clsonicthehedgehog2",
    "title": "Sonicthehedgehog 2",
    "char": "S"
  },
  {
    "file": "clsonicthehedgehog3",
    "title": "Sonicthehedgehog 3",
    "char": "S"
  },
  {
    "file": "clsonny2",
    "title": "Sonny 2",
    "char": "S"
  },
  {
    "file": "clsortthecourt",
    "title": "Sortthecourt",
    "char": "S"
  },
  {
    "file": "clsotn",
    "title": "Sotn",
    "char": "S"
  },
  {
    "file": "clsouljumper",
    "title": "Souljumper",
    "char": "S"
  },
  {
    "file": "clsoundboard",
    "title": "Soundboard",
    "char": "S"
  },
  {
    "file": "clsouthparkn64",
    "title": "Southparkn 64",
    "char": "S"
  },
  {
    "file": "clSovereignoftheskys",
    "title": "Sovereignoftheskys",
    "char": "S"
  },
  {
    "file": "clspacebarclicker",
    "title": "Spacebarclicker",
    "char": "S"
  },
  {
    "file": "clspacecompany",
    "title": "Spacecompany",
    "char": "S"
  },
  {
    "file": "clspaceharriersms",
    "title": "Spaceharriersms",
    "char": "S"
  },
  {
    "file": "clspaceinvade95",
    "title": "Spaceinvade 95",
    "char": "S"
  },
  {
    "file": "clspaceinvaders",
    "title": "Spaceinvaders",
    "char": "S"
  },
  {
    "file": "clspaceiskey",
    "title": "Spaceiskey",
    "char": "S"
  },
  {
    "file": "clspaceiskey2",
    "title": "Spaceiskey 2",
    "char": "S"
  },
  {
    "file": "clspaceiskeyxmas",
    "title": "Spaceiskeyxmas",
    "char": "S"
  },
  {
    "file": "clspacewarsbattleground",
    "title": "Spacewarsbattleground",
    "char": "S"
  },
  {
    "file": "clspacewaves",
    "title": "Spacewaves",
    "char": "S"
  },
  {
    "file": "clspecialmission",
    "title": "Specialmission",
    "char": "S"
  },
  {
    "file": "clspeedperclick",
    "title": "Speedperclick",
    "char": "S"
  },
  {
    "file": "clspeedstars",
    "title": "Speedstars",
    "char": "S"
  },
  {
    "file": "clspelunky",
    "title": "Spelunky",
    "char": "S"
  },
  {
    "file": "clspewer",
    "title": "Spewer",
    "char": "S"
  },
  {
    "file": "clspidermanps1",
    "title": "Spidermanps 1",
    "char": "S"
  },
  {
    "file": "clspiralroll",
    "title": "Spiralroll",
    "char": "S"
  },
  {
    "file": "clspiritsofhell",
    "title": "Spiritsofhell",
    "char": "S"
  },
  {
    "file": "clSpongebobPowerKartGrandPrix",
    "title": "Spongebob Power Kart Grand Prix",
    "char": "S"
  },
  {
    "file": "clSportsHeadsIceHockey",
    "title": "Sports Heads Ice Hockey",
    "char": "S"
  },
  {
    "file": "clsprinter",
    "title": "Sprinter",
    "char": "S"
  },
  {
    "file": "clsprunked",
    "title": "Sprunked",
    "char": "S"
  },
  {
    "file": "clsprunki",
    "title": "Sprunki",
    "char": "S"
  },
  {
    "file": "clsprunkiclicker",
    "title": "Sprunkiclicker",
    "char": "S"
  },
  {
    "file": "clspyhunter",
    "title": "Spyhunter",
    "char": "S"
  },
  {
    "file": "clsquidplayground",
    "title": "Squidplayground",
    "char": "S"
  },
  {
    "file": "clSSF2Arcade",
    "title": "SSF 2 Arcade",
    "char": "S"
  },
  {
    "file": "clSSF2TArcade",
    "title": "SSF 2 TArcade",
    "char": "S"
  },
  {
    "file": "clstackballio",
    "title": "Stackballio",
    "char": "S"
  },
  {
    "file": "clstacktris",
    "title": "Stacktris",
    "char": "S"
  },
  {
    "file": "clstackydash",
    "title": "Stackydash",
    "char": "S"
  },
  {
    "file": "clstarfox",
    "title": "Starfox",
    "char": "S"
  },
  {
    "file": "clstarfox64",
    "title": "Starfox 64",
    "char": "S"
  },
  {
    "file": "clstarraiders",
    "title": "Starraiders",
    "char": "S"
  },
  {
    "file": "clstateio",
    "title": "Stateio",
    "char": "S"
  },
  {
    "file": "clstation141",
    "title": "Station 141",
    "char": "S"
  },
  {
    "file": "clstationmeltdown",
    "title": "Stationmeltdown",
    "char": "S"
  },
  {
    "file": "clstationsaturn",
    "title": "Stationsaturn",
    "char": "S"
  },
  {
    "file": "clsteakandjake",
    "title": "Steakandjake",
    "char": "S"
  },
  {
    "file": "clstealbrainrot",
    "title": "Stealbrainrot",
    "char": "S"
  },
  {
    "file": "clstealbrainrotonline",
    "title": "Stealbrainrotonline",
    "char": "S"
  },
  {
    "file": "clstealthassassin",
    "title": "Stealthassassin",
    "char": "S"
  },
  {
    "file": "clstealthmaster",
    "title": "Stealthmaster",
    "char": "S"
  },
  {
    "file": "clsteelempire",
    "title": "Steelempire",
    "char": "S"
  },
  {
    "file": "clsteelsurge",
    "title": "Steelsurge",
    "char": "S"
  },
  {
    "file": "clsteepdescent",
    "title": "Steepdescent",
    "char": "S"
  },
  {
    "file": "clstickarchersbattle",
    "title": "Stickarchersbattle",
    "char": "S"
  },
  {
    "file": "clstickdefenders",
    "title": "Stickdefenders",
    "char": "S"
  },
  {
    "file": "clstickfighter",
    "title": "Stickfighter",
    "char": "S"
  },
  {
    "file": "clstickjetchallenge",
    "title": "Stickjetchallenge",
    "char": "S"
  },
  {
    "file": "clstickmanandguns",
    "title": "Stickmanandguns",
    "char": "S"
  },
  {
    "file": "clstickmanclash",
    "title": "Stickmanclash",
    "char": "S"
  },
  {
    "file": "clstickmanduel",
    "title": "Stickmanduel",
    "char": "S"
  },
  {
    "file": "clstickmangtacity",
    "title": "Stickmangtacity",
    "char": "S"
  },
  {
    "file": "clstickmanhook",
    "title": "Stickmanhook",
    "char": "S"
  },
  {
    "file": "clStickmanKingdomclash",
    "title": "Stickman Kingdomclash",
    "char": "S"
  },
  {
    "file": "clstickmankombat2d",
    "title": "Stickmankombat 2 D",
    "char": "S"
  },
  {
    "file": "clstickmanstealingdiamond",
    "title": "Stickmanstealingdiamond",
    "char": "S"
  },
  {
    "file": "clstickmerge",
    "title": "Stickmerge",
    "char": "S"
  },
  {
    "file": "clstickminairship",
    "title": "Stickminairship",
    "char": "S"
  },
  {
    "file": "clstickminbreakingbank",
    "title": "Stickminbreakingbank",
    "char": "S"
  },
  {
    "file": "clstickminescapingprison",
    "title": "Stickminescapingprison",
    "char": "S"
  },
  {
    "file": "clstickminfleecomplex",
    "title": "Stickminfleecomplex",
    "char": "S"
  },
  {
    "file": "clstickrpgcomplete",
    "title": "Stickrpgcomplete",
    "char": "S"
  },
  {
    "file": "clstickslasher",
    "title": "Stickslasher",
    "char": "S"
  },
  {
    "file": "clstickwar",
    "title": "Stickwar",
    "char": "S"
  },
  {
    "file": "clstickwar2",
    "title": "Stickwar 2",
    "char": "S"
  },
  {
    "file": "clstickwithit",
    "title": "Stickwithit",
    "char": "S"
  },
  {
    "file": "clstormthehouse",
    "title": "Stormthehouse",
    "char": "S"
  },
  {
    "file": "clstormthehouse2",
    "title": "Stormthehouse 2",
    "char": "S"
  },
  {
    "file": "clstormthehouse3",
    "title": "Stormthehouse 3",
    "char": "S"
  },
  {
    "file": "clstrangejournet",
    "title": "Strangejournet",
    "char": "S"
  },
  {
    "file": "clstreangeropepolice",
    "title": "Streangeropepolice",
    "char": "S"
  },
  {
    "file": "clStreetFighter1Arcade",
    "title": "Street Fighter 1 Arcade",
    "char": "S"
  },
  {
    "file": "clstreetfighter2",
    "title": "Streetfighter 2",
    "char": "S"
  },
  {
    "file": "clStreetFighter2Arcade",
    "title": "Street Fighter 2 Arcade",
    "char": "S"
  },
  {
    "file": "clStreetFighter2CEArcade",
    "title": "Street Fighter 2 CEArcade",
    "char": "S"
  },
  {
    "file": "clStreetFighter2HFArcade(1)",
    "title": "Street Fighter 2 HFArcade(1)",
    "char": "S"
  },
  {
    "file": "clStreetFighter2HFArcade",
    "title": "Street Fighter 2 HFArcade",
    "char": "S"
  },
  {
    "file": "clstreetfighter2turbo",
    "title": "Streetfighter 2 Turbo",
    "char": "S"
  },
  {
    "file": "clstreetfighteralpha3",
    "title": "Streetfighteralpha 3",
    "char": "S"
  },
  {
    "file": "clstreetfighterumuhsomething",
    "title": "Streetfighterumuhsomething",
    "char": "S"
  },
  {
    "file": "clstreetofrage",
    "title": "Streetofrage",
    "char": "S"
  },
  {
    "file": "clstreetofrage2",
    "title": "Streetofrage 2",
    "char": "S"
  },
  {
    "file": "clstreetofrage3",
    "title": "Streetofrage 3",
    "char": "S"
  },
  {
    "file": "clstrikeforceheroes",
    "title": "Strikeforceheroes",
    "char": "S"
  },
  {
    "file": "clstrikeforceheroes2",
    "title": "Strikeforceheroes 2",
    "char": "S"
  },
  {
    "file": "clstrikeforceheroes3",
    "title": "Strikeforceheroes 3",
    "char": "S"
  },
  {
    "file": "clstrikerdummies",
    "title": "Strikerdummies",
    "char": "S"
  },
  {
    "file": "clstylesavvy",
    "title": "Stylesavvy",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersbarcelona",
    "title": "Subwaysurfersbarcelona",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersbeijing",
    "title": "Subwaysurfersbeijing",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersberlin",
    "title": "Subwaysurfersberlin",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersbuenosaires",
    "title": "Subwaysurfersbuenosaires",
    "char": "S"
  },
  {
    "file": "clsubwaysurfershavana",
    "title": "Subwaysurfershavana",
    "char": "S"
  },
  {
    "file": "clsubwaysurfershouston",
    "title": "Subwaysurfershouston",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersiceland",
    "title": "Subwaysurfersiceland",
    "char": "S"
  },
  {
    "file": "clsubwaysurferslondon",
    "title": "Subwaysurferslondon",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersmexico",
    "title": "Subwaysurfersmexico",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersmiami",
    "title": "Subwaysurfersmiami",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersmonaco",
    "title": "Subwaysurfersmonaco",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersneworeleans",
    "title": "Subwaysurfersneworeleans",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersneworleans",
    "title": "Subwaysurfersneworleans",
    "char": "S"
  },
  {
    "file": "clsubwaysurferssanfrancisco (1)",
    "title": "Subwaysurferssanfrancisco (1)",
    "char": "S"
  },
  {
    "file": "clsubwaysurferssanfrancisco(1)",
    "title": "Subwaysurferssanfrancisco(1)",
    "char": "S"
  },
  {
    "file": "clsubwaysurferssanfrancisco",
    "title": "Subwaysurferssanfrancisco",
    "char": "S"
  },
  {
    "file": "clsubwaysurfersstpetersburg",
    "title": "Subwaysurfersstpetersburg",
    "char": "S"
  },
  {
    "file": "clsubwaysurferswinterholiday",
    "title": "Subwaysurferswinterholiday",
    "char": "S"
  },
  {
    "file": "clsubwaysurferszurich",
    "title": "Subwaysurferszurich",
    "char": "S"
  },
  {
    "file": "clsugarsugar",
    "title": "Sugarsugar",
    "char": "S"
  },
  {
    "file": "clsuika",
    "title": "Suika",
    "char": "S"
  },
  {
    "file": "clsuikapico",
    "title": "Suikapico",
    "char": "S"
  },
  {
    "file": "clsummerrider",
    "title": "Summerrider",
    "char": "S"
  },
  {
    "file": "clsunandmoon",
    "title": "Sunandmoon",
    "char": "S"
  },
  {
    "file": "clsuperbomberman",
    "title": "Superbomberman",
    "char": "S"
  },
  {
    "file": "clsuperbomberman2",
    "title": "Superbomberman 2",
    "char": "S"
  },
  {
    "file": "clsuperbomberman3",
    "title": "Superbomberman 3",
    "char": "S"
  },
  {
    "file": "clsuperbomberman4",
    "title": "Superbomberman 4",
    "char": "S"
  },
  {
    "file": "clsuperbomberman5",
    "title": "Superbomberman 5",
    "char": "S"
  },
  {
    "file": "clsuperc",
    "title": "Superc",
    "char": "S"
  },
  {
    "file": "clsupercarrush",
    "title": "Supercarrush",
    "char": "S"
  },
  {
    "file": "clsupercastlevaniaVI",
    "title": "Supercastlevania VI",
    "char": "S"
  },
  {
    "file": "clsuperchibiknight",
    "title": "Superchibiknight",
    "char": "S"
  },
  {
    "file": "clsupercold",
    "title": "Supercold",
    "char": "S"
  },
  {
    "file": "clsuperdarkdeception",
    "title": "Superdarkdeception",
    "char": "S"
  },
  {
    "file": "clsuperdiagonalmario2",
    "title": "Superdiagonalmario 2",
    "char": "S"
  },
  {
    "file": "clsuperdromebugs(1)",
    "title": "Superdromebugs(1)",
    "char": "S"
  },
  {
    "file": "clsuperdromebugs",
    "title": "Superdromebugs",
    "char": "S"
  },
  {
    "file": "clsuperfallingfred",
    "title": "Superfallingfred",
    "char": "S"
  },
  {
    "file": "clsuperfighters",
    "title": "Superfighters",
    "char": "S"
  },
  {
    "file": "clsuperhot",
    "title": "Superhot",
    "char": "S"
  },
  {
    "file": "clsuperhotlinemiami",
    "title": "Superhotlinemiami",
    "char": "S"
  },
  {
    "file": "clsuperhouseofdeadninjas",
    "title": "Superhouseofdeadninjas",
    "char": "S"
  },
  {
    "file": "clsuperislandadventure",
    "title": "Superislandadventure",
    "char": "S"
  },
  {
    "file": "clsuperliquidsoccer",
    "title": "Superliquidsoccer",
    "char": "S"
  },
  {
    "file": "clsupermario",
    "title": "Supermario",
    "char": "S"
  },
  {
    "file": "clsupermario3mix",
    "title": "Supermario 3 Mix",
    "char": "S"
  },
  {
    "file": "clsupermario63",
    "title": "Supermario 63",
    "char": "S"
  },
  {
    "file": "clsupermario64",
    "title": "Supermario 64",
    "char": "S"
  },
  {
    "file": "clsupermario64ds",
    "title": "Supermario 64 Ds",
    "char": "S"
  },
  {
    "file": "clsupermario74",
    "title": "Supermario 74",
    "char": "S"
  },
  {
    "file": "clsupermarioallstars",
    "title": "Supermarioallstars",
    "char": "S"
  },
  {
    "file": "clsupermariobros",
    "title": "Supermariobros",
    "char": "S"
  },
  {
    "file": "clsupermariobros2",
    "title": "Supermariobros 2",
    "char": "S"
  },
  {
    "file": "clsupermariobros2us",
    "title": "Supermariobros 2 Us",
    "char": "S"
  },
  {
    "file": "clsupermariobros3",
    "title": "Supermariobros 3",
    "char": "S"
  },
  {
    "file": "clsupermariobros3real",
    "title": "Supermariobros 3 Real",
    "char": "S"
  },
  {
    "file": "clsupermariokart",
    "title": "Supermariokart",
    "char": "S"
  },
  {
    "file": "clsupermarioland",
    "title": "Supermarioland",
    "char": "S"
  },
  {
    "file": "clsupermarioland2",
    "title": "Supermarioland 2",
    "char": "S"
  },
  {
    "file": "clsupermarioland2dx",
    "title": "Supermarioland 2 Dx",
    "char": "S"
  },
  {
    "file": "clsupermariolanddx",
    "title": "Supermariolanddx",
    "char": "S"
  },
  {
    "file": "clsupermariomon",
    "title": "Supermariomon",
    "char": "S"
  },
  {
    "file": "clsupermariorpg",
    "title": "Supermariorpg",
    "char": "S"
  },
  {
    "file": "clsupermariostarroad",
    "title": "Supermariostarroad",
    "char": "S"
  },
  {
    "file": "clsupermariostarroadretooled",
    "title": "Supermariostarroadretooled",
    "char": "S"
  },
  {
    "file": "clsupermariosunshine64",
    "title": "Supermariosunshine 64",
    "char": "S"
  },
  {
    "file": "clsupermarioworld",
    "title": "Supermarioworld",
    "char": "S"
  },
  {
    "file": "clsupermarioworld2",
    "title": "Supermarioworld 2",
    "char": "S"
  },
  {
    "file": "clSuperMarioWorldThe SecretOfThe7GoldenStatues",
    "title": "Super Mario World The Secret Of The 7 Golden Statues",
    "char": "S"
  },
  {
    "file": "clsupermetroid",
    "title": "Supermetroid",
    "char": "S"
  },
  {
    "file": "clsupermonkeyballjr",
    "title": "Supermonkeyballjr",
    "char": "S"
  },
  {
    "file": "clsupernoahsark3D",
    "title": "Supernoahsark 3 D",
    "char": "S"
  },
  {
    "file": "clsuperoliverworld",
    "title": "Superoliverworld",
    "char": "S"
  },
  {
    "file": "clsuperonionboy2",
    "title": "Superonionboy 2",
    "char": "S"
  },
  {
    "file": "clsuperpickleballadventure",
    "title": "Superpickleballadventure",
    "char": "S"
  },
  {
    "file": "clsuperpunchout",
    "title": "Superpunchout",
    "char": "S"
  },
  {
    "file": "clSuperPunchOutEN",
    "title": "Super Punch Out EN",
    "char": "S"
  },
  {
    "file": "clsuperpuzzlefighter2turbo",
    "title": "Superpuzzlefighter 2 Turbo",
    "char": "S"
  },
  {
    "file": "clsuperpuzzlefighter2turboalt",
    "title": "Superpuzzlefighter 2 Turboalt",
    "char": "S"
  },
  {
    "file": "clsupersantakicker",
    "title": "Supersantakicker",
    "char": "S"
  },
  {
    "file": "clsupersantakicker2",
    "title": "Supersantakicker 2",
    "char": "S"
  },
  {
    "file": "clsuperscribblenauts",
    "title": "Superscribblenauts",
    "char": "S"
  },
  {
    "file": "clsupersmashbros",
    "title": "Supersmashbros",
    "char": "S"
  },
  {
    "file": "clsupersmashflash",
    "title": "Supersmashflash",
    "char": "S"
  },
  {
    "file": "clsupersmashflash08",
    "title": "Supersmashflash 08",
    "char": "S"
  },
  {
    "file": "clsupersmashflash2",
    "title": "Supersmashflash 2",
    "char": "S"
  },
  {
    "file": "clsupersmashflash2butdifversion",
    "title": "Supersmashflash 2 Butdifversion",
    "char": "S"
  },
  {
    "file": "clsuperstreetfighter2turbojp",
    "title": "Superstreetfighter 2 Turbojp",
    "char": "S"
  },
  {
    "file": "clsupertiltbros",
    "title": "Supertiltbros",
    "char": "S"
  },
  {
    "file": "clsupitdept",
    "title": "Supitdept",
    "char": "S"
  },
  {
    "file": "clsupremeduelist",
    "title": "Supremeduelist",
    "char": "S"
  },
  {
    "file": "clSupremeDuelist2019",
    "title": "Supreme Duelist 2019",
    "char": "S"
  },
  {
    "file": "clsurvivalracev2",
    "title": "Survivalracev 2",
    "char": "S"
  },
  {
    "file": "clsurvivorio",
    "title": "Survivorio",
    "char": "S"
  },
  {
    "file": "clsushicat",
    "title": "Sushicat",
    "char": "S"
  },
  {
    "file": "clsushicat2",
    "title": "Sushicat 2",
    "char": "S"
  },
  {
    "file": "clsushiunroll",
    "title": "Sushiunroll",
    "char": "S"
  },
  {
    "file": "clswerve",
    "title": "Swerve",
    "char": "S"
  },
  {
    "file": "clswitchblade",
    "title": "Switchblade",
    "char": "S"
  },
  {
    "file": "clswordandshieldultimateplus",
    "title": "Swordandshieldultimateplus",
    "char": "S"
  },
  {
    "file": "clswordfight",
    "title": "Swordfight",
    "char": "S"
  },
  {
    "file": "clswordplay",
    "title": "Swordplay",
    "char": "S"
  },
  {
    "file": "clswordsandsandals",
    "title": "Swordsandsandals",
    "char": "S"
  },
  {
    "file": "clswordsandsandals2",
    "title": "Swordsandsandals 2",
    "char": "S"
  },
  {
    "file": "clswordsandsouls",
    "title": "Swordsandsouls",
    "char": "S"
  },
  {
    "file": "clsydneyshark",
    "title": "Sydneyshark",
    "char": "S"
  },
  {
    "file": "cltabi",
    "title": "Tabi",
    "char": "T"
  },
  {
    "file": "cltabletanks",
    "title": "Tabletanks",
    "char": "T"
  },
  {
    "file": "cltabletennisworldtour",
    "title": "Tabletennisworldtour",
    "char": "T"
  },
  {
    "file": "cltacostand",
    "title": "Tacostand",
    "char": "T"
  },
  {
    "file": "cltag-",
    "title": "Tag-",
    "char": "T"
  },
  {
    "file": "cltagc3",
    "title": "Tagc 3",
    "char": "T"
  },
  {
    "file": "cltagcm",
    "title": "Tagcm",
    "char": "T"
  },
  {
    "file": "clTaikonoTatsujin",
    "title": "Taikono Tatsujin",
    "char": "T"
  },
  {
    "file": "cltailofthedragon",
    "title": "Tailofthedragon",
    "char": "T"
  },
  {
    "file": "cltaisei",
    "title": "Taisei",
    "char": "T"
  },
  {
    "file": "cltakeover",
    "title": "Takeover",
    "char": "T"
  },
  {
    "file": "cltallio",
    "title": "Tallio",
    "char": "T"
  },
  {
    "file": "cltallmanrun",
    "title": "Tallmanrun",
    "char": "T"
  },
  {
    "file": "cltankmayhem",
    "title": "Tankmayhem",
    "char": "T"
  },
  {
    "file": "cltankpixel",
    "title": "Tankpixel",
    "char": "T"
  },
  {
    "file": "cltanktrouble",
    "title": "Tanktrouble",
    "char": "T"
  },
  {
    "file": "cltanukisunset",
    "title": "Tanukisunset",
    "char": "T"
  },
  {
    "file": "cltanukisunsetuhhhhhhhh",
    "title": "Tanukisunsetuhhhhhhhh",
    "char": "T"
  },
  {
    "file": "cltapper",
    "title": "Tapper",
    "char": "T"
  },
  {
    "file": "cltaproad",
    "title": "Taproad",
    "char": "T"
  },
  {
    "file": "cltastyplanet",
    "title": "Tastyplanet",
    "char": "T"
  },
  {
    "file": "cltboidemo",
    "title": "Tboidemo",
    "char": "T"
  },
  {
    "file": "cltboilambeternal",
    "title": "Tboilambeternal",
    "char": "T"
  },
  {
    "file": "cltecmobowl",
    "title": "Tecmobowl",
    "char": "T"
  },
  {
    "file": "cltekken2ps1",
    "title": "Tekken 2 Ps 1",
    "char": "T"
  },
  {
    "file": "cltekken3ps1",
    "title": "Tekken 3 Ps 1",
    "char": "T"
  },
  {
    "file": "cltelephonetrouble",
    "title": "Telephonetrouble",
    "char": "T"
  },
  {
    "file": "cltelocation",
    "title": "Telocation",
    "char": "T"
  },
  {
    "file": "cltempest2000",
    "title": "Tempest 2000",
    "char": "T"
  },
  {
    "file": "cltempleofboom",
    "title": "Templeofboom",
    "char": "T"
  },
  {
    "file": "cltemplerun2",
    "title": "Templerun 2",
    "char": "T"
  },
  {
    "file": "cltempoverdose",
    "title": "Tempoverdose",
    "char": "T"
  },
  {
    "file": "clteod",
    "title": "Teod",
    "char": "T"
  },
  {
    "file": "clterra",
    "title": "Terra",
    "char": "T"
  },
  {
    "file": "clterritorialio",
    "title": "Territorialio",
    "char": "T"
  },
  {
    "file": "clterritorywar",
    "title": "Territorywar",
    "char": "T"
  },
  {
    "file": "clterritorywar2",
    "title": "Territorywar 2",
    "char": "T"
  },
  {
    "file": "clterritorywar3",
    "title": "Territorywar 3",
    "char": "T"
  },
  {
    "file": "cltetris",
    "title": "Tetris",
    "char": "T"
  },
  {
    "file": "cltetrisattack",
    "title": "Tetrisattack",
    "char": "T"
  },
  {
    "file": "cltetrisgba",
    "title": "Tetrisgba",
    "char": "T"
  },
  {
    "file": "cltetrisgrandmaster2",
    "title": "Tetrisgrandmaster 2",
    "char": "T"
  },
  {
    "file": "clthanksforremindingmeihadtofixthis",
    "title": "Thanksforremindingmeihadtofixthis",
    "char": "T"
  },
  {
    "file": "cltheclassroom",
    "title": "Theclassroom",
    "char": "T"
  },
  {
    "file": "cltheclassroom2",
    "title": "Theclassroom 2",
    "char": "T"
  },
  {
    "file": "cltheclassroom3",
    "title": "Theclassroom 3",
    "char": "T"
  },
  {
    "file": "clthedeadseat",
    "title": "Thedeadseat",
    "char": "T"
  },
  {
    "file": "clthedeepestsleep",
    "title": "Thedeepestsleep",
    "char": "T"
  },
  {
    "file": "clthedude",
    "title": "Thedude",
    "char": "T"
  },
  {
    "file": "cltheenchantedcave2",
    "title": "Theenchantedcave 2",
    "char": "T"
  },
  {
    "file": "cltheimpossiblegame",
    "title": "Theimpossiblegame",
    "char": "T"
  },
  {
    "file": "cltheincrediblemachine",
    "title": "Theincrediblemachine",
    "char": "T"
  },
  {
    "file": "clthelaststand",
    "title": "Thelaststand",
    "char": "T"
  },
  {
    "file": "clthelaststandunioncity (1)",
    "title": "Thelaststandunioncity (1)",
    "char": "T"
  },
  {
    "file": "clthelaststandunioncity",
    "title": "Thelaststandunioncity",
    "char": "T"
  },
  {
    "file": "clTheLoneRanger",
    "title": "The Lone Ranger",
    "char": "T"
  },
  {
    "file": "clthemaninthewindow",
    "title": "Themaninthewindow",
    "char": "T"
  },
  {
    "file": "clthemepark",
    "title": "Themepark",
    "char": "T"
  },
  {
    "file": "clthepit",
    "title": "Thepit",
    "char": "T"
  },
  {
    "file": "clthereisnofile",
    "title": "Thereisnofile",
    "char": "T"
  },
  {
    "file": "clthermomorph",
    "title": "Thermomorph",
    "char": "T"
  },
  {
    "file": "clthesodorrace",
    "title": "Thesodorrace",
    "char": "T"
  },
  {
    "file": "clTheSunForTheVampire",
    "title": "The Sun For The Vampire",
    "char": "T"
  },
  {
    "file": "cltheyarecoming",
    "title": "Theyarecoming",
    "char": "T"
  },
  {
    "file": "clthisistheonlylevel",
    "title": "Thisistheonlylevel",
    "char": "T"
  },
  {
    "file": "clthisistheonlylevel2",
    "title": "Thisistheonlylevel 2",
    "char": "T"
  },
  {
    "file": "clthisistheonlyleveltoo",
    "title": "Thisistheonlyleveltoo",
    "char": "T"
  },
  {
    "file": "clthreegoblets",
    "title": "Threegoblets",
    "char": "T"
  },
  {
    "file": "clthrowapotato",
    "title": "Throwapotato",
    "char": "T"
  },
  {
    "file": "clthrowapotatoagain",
    "title": "Throwapotatoagain",
    "char": "T"
  },
  {
    "file": "clthwack",
    "title": "Thwack",
    "char": "T"
  },
  {
    "file": "cltiberiandawn",
    "title": "Tiberiandawn",
    "char": "T"
  },
  {
    "file": "cltimeshooter2",
    "title": "Timeshooter 2",
    "char": "T"
  },
  {
    "file": "cltimeshooter3",
    "title": "Timeshooter 3",
    "char": "T"
  },
  {
    "file": "cltimewarriors",
    "title": "Timewarriors",
    "char": "T"
  },
  {
    "file": "cltinyfishing",
    "title": "Tinyfishing",
    "char": "T"
  },
  {
    "file": "cltmnt",
    "title": "Tmnt",
    "char": "T"
  },
  {
    "file": "cltmnt2arc",
    "title": "Tmnt 2 Arc",
    "char": "T"
  },
  {
    "file": "cltmntarc",
    "title": "Tmntarc",
    "char": "T"
  },
  {
    "file": "cltmntturtlesintime",
    "title": "Tmntturtlesintime",
    "char": "T"
  },
  {
    "file": "cltoastarling",
    "title": "Toastarling",
    "char": "T"
  },
  {
    "file": "cltoasterball",
    "title": "Toasterball",
    "char": "T"
  },
  {
    "file": "cltoejam&earl",
    "title": "Toejam&earl",
    "char": "T"
  },
  {
    "file": "cltoejam&earlpof",
    "title": "Toejam&earlpof",
    "char": "T"
  },
  {
    "file": "cltombofthemass",
    "title": "Tombofthemass",
    "char": "T"
  },
  {
    "file": "cltommorowandyesterday",
    "title": "Tommorowandyesterday",
    "char": "T"
  },
  {
    "file": "cltomodachicollection",
    "title": "Tomodachicollection",
    "char": "T"
  },
  {
    "file": "cltonyhawkskater2",
    "title": "Tonyhawkskater 2",
    "char": "T"
  },
  {
    "file": "cltonyhawkskater4",
    "title": "Tonyhawkskater 4",
    "char": "T"
  },
  {
    "file": "cltonyhawksunderground",
    "title": "Tonyhawksunderground",
    "char": "T"
  },
  {
    "file": "cltoomanytypes",
    "title": "Toomanytypes",
    "char": "T"
  },
  {
    "file": "cltopspeedracing3d",
    "title": "Topspeedracing 3 D",
    "char": "T"
  },
  {
    "file": "cltosstheturtle",
    "title": "Tosstheturtle",
    "char": "T"
  },
  {
    "file": "cltotm",
    "title": "Totm",
    "char": "T"
  },
  {
    "file": "cltouhou",
    "title": "Touhou",
    "char": "T"
  },
  {
    "file": "cltouhou2",
    "title": "Touhou 2",
    "char": "T"
  },
  {
    "file": "cltouhou3",
    "title": "Touhou 3",
    "char": "T"
  },
  {
    "file": "cltouhou4",
    "title": "Touhou 4",
    "char": "T"
  },
  {
    "file": "cltouhou5",
    "title": "Touhou 5",
    "char": "T"
  },
  {
    "file": "cltowerblocks",
    "title": "Towerblocks",
    "char": "T"
  },
  {
    "file": "cltowercrash3d",
    "title": "Towercrash 3 D",
    "char": "T"
  },
  {
    "file": "cltowerwizard",
    "title": "Towerwizard",
    "char": "T"
  },
  {
    "file": "cltownscraper",
    "title": "Townscraper",
    "char": "T"
  },
  {
    "file": "cltrace",
    "title": "Trace",
    "char": "T"
  },
  {
    "file": "cltrafficjam3d",
    "title": "Trafficjam 3 D",
    "char": "T"
  },
  {
    "file": "cltralalerotralalaescapetungtungtungsahur",
    "title": "Tralalerotralalaescapetungtungtungsahur",
    "char": "T"
  },
  {
    "file": "cltrappedwithjester",
    "title": "Trappedwithjester",
    "char": "T"
  },
  {
    "file": "cltrapthecat",
    "title": "Trapthecat",
    "char": "T"
  },
  {
    "file": "cltrechoroustrials",
    "title": "Trechoroustrials",
    "char": "T"
  },
  {
    "file": "cltrechoroustrialspart2",
    "title": "Trechoroustrialspart 2",
    "char": "T"
  },
  {
    "file": "cltriachnid",
    "title": "Triachnid",
    "char": "T"
  },
  {
    "file": "cltripleplay2000",
    "title": "Tripleplay 2000",
    "char": "T"
  },
  {
    "file": "cltriviacrack",
    "title": "Triviacrack",
    "char": "T"
  },
  {
    "file": "cltrollfacequest1",
    "title": "Trollfacequest 1",
    "char": "T"
  },
  {
    "file": "cltrollfacequest10",
    "title": "Trollfacequest 10",
    "char": "T"
  },
  {
    "file": "cltrollfacequest11",
    "title": "Trollfacequest 11",
    "char": "T"
  },
  {
    "file": "cltrollfacequest12",
    "title": "Trollfacequest 12",
    "char": "T"
  },
  {
    "file": "cltrollfacequest13",
    "title": "Trollfacequest 13",
    "char": "T"
  },
  {
    "file": "cltrollfacequest2",
    "title": "Trollfacequest 2",
    "char": "T"
  },
  {
    "file": "cltrollfacequest3",
    "title": "Trollfacequest 3",
    "char": "T"
  },
  {
    "file": "cltrollfacequest4",
    "title": "Trollfacequest 4",
    "char": "T"
  },
  {
    "file": "cltrollfacequest5",
    "title": "Trollfacequest 5",
    "char": "T"
  },
  {
    "file": "cltrollfacequest6",
    "title": "Trollfacequest 6",
    "char": "T"
  },
  {
    "file": "cltrollfacequest7",
    "title": "Trollfacequest 7",
    "char": "T"
  },
  {
    "file": "cltrollfacequest8",
    "title": "Trollfacequest 8",
    "char": "T"
  },
  {
    "file": "cltrollfacequest9",
    "title": "Trollfacequest 9",
    "char": "T"
  },
  {
    "file": "cltrucksim",
    "title": "Trucksim",
    "char": "T"
  },
  {
    "file": "cltsuzukimaze",
    "title": "Tsuzukimaze",
    "char": "T"
  },
  {
    "file": "cltubejumpers",
    "title": "Tubejumpers",
    "char": "T"
  },
  {
    "file": "cltungtunghorror",
    "title": "Tungtunghorror",
    "char": "T"
  },
  {
    "file": "cltungtungtungsahurobby",
    "title": "Tungtungtungsahurobby",
    "char": "T"
  },
  {
    "file": "cltunnelrush",
    "title": "Tunnelrush",
    "char": "T"
  },
  {
    "file": "cltunnelrushbetter",
    "title": "Tunnelrushbetter",
    "char": "T"
  },
  {
    "file": "cltupertariotros",
    "title": "Tupertariotros",
    "char": "T"
  },
  {
    "file": "clturbostars",
    "title": "Turbostars",
    "char": "T"
  },
  {
    "file": "clturokdinosaurhunter",
    "title": "Turokdinosaurhunter",
    "char": "T"
  },
  {
    "file": "cltwinshot (1)",
    "title": "Twinshot (1)",
    "char": "T"
  },
  {
    "file": "cltwinshot(1)",
    "title": "Twinshot(1)",
    "char": "T"
  },
  {
    "file": "cltwinshot",
    "title": "Twinshot",
    "char": "T"
  },
  {
    "file": "cltwistedmetal",
    "title": "Twistedmetal",
    "char": "T"
  },
  {
    "file": "cltwistedmetal2",
    "title": "Twistedmetal 2",
    "char": "T"
  },
  {
    "file": "cltwoball3d",
    "title": "Twoball 3 D",
    "char": "T"
  },
  {
    "file": "clucds",
    "title": "Ucds",
    "char": "U"
  },
  {
    "file": "cluckyblockobbyEUOPHRATESRIVER",
    "title": "Uckyblockobby EUOPHRATESRIVER",
    "char": "U"
  },
  {
    "file": "clufoswampoddysey",
    "title": "Ufoswampoddysey",
    "char": "U"
  },
  {
    "file": "clultima",
    "title": "Ultima",
    "char": "U"
  },
  {
    "file": "clultimateassassian2",
    "title": "Ultimateassassian 2",
    "char": "U"
  },
  {
    "file": "clultimateassassian3",
    "title": "Ultimateassassian 3",
    "char": "U"
  },
  {
    "file": "clUltimatecardrivingsimulator",
    "title": "Ultimatecardrivingsimulator",
    "char": "U"
  },
  {
    "file": "clultimatemortalkombat",
    "title": "Ultimatemortalkombat",
    "char": "U"
  },
  {
    "file": "clultimatemortalkombat3",
    "title": "Ultimatemortalkombat 3",
    "char": "U"
  },
  {
    "file": "clultrakill",
    "title": "Ultrakill",
    "char": "U"
  },
  {
    "file": "clumjammerlammy",
    "title": "Umjammerlammy",
    "char": "U"
  },
  {
    "file": "clumstickmangameidkiforgor",
    "title": "Umstickmangameidkiforgor",
    "char": "U"
  },
  {
    "file": "cluncannycatgolf",
    "title": "Uncannycatgolf",
    "char": "U"
  },
  {
    "file": "clunderneath",
    "title": "Underneath",
    "char": "U"
  },
  {
    "file": "clundertalelb",
    "title": "Undertalelb",
    "char": "U"
  },
  {
    "file": "clundertaler",
    "title": "Undertaler",
    "char": "U"
  },
  {
    "file": "clundertaleyellow",
    "title": "Undertaleyellow",
    "char": "U"
  },
  {
    "file": "clunfairmario",
    "title": "Unfairmario",
    "char": "U"
  },
  {
    "file": "clunfairmarioworkquestionmark",
    "title": "Unfairmarioworkquestionmark",
    "char": "U"
  },
  {
    "file": "clunfairundyne",
    "title": "Unfairundyne",
    "char": "U"
  },
  {
    "file": "clunicyclehero",
    "title": "Unicyclehero",
    "char": "U"
  },
  {
    "file": "clunitresdreams",
    "title": "Unitresdreams",
    "char": "U"
  },
  {
    "file": "cluno",
    "title": "Uno",
    "char": "U"
  },
  {
    "file": "clunownking",
    "title": "Unownking",
    "char": "U"
  },
  {
    "file": "cluntime",
    "title": "Untime",
    "char": "U"
  },
  {
    "file": "cluntitledgoosegame",
    "title": "Untitledgoosegame",
    "char": "U"
  },
  {
    "file": "clupgradecomplete",
    "title": "Upgradecomplete",
    "char": "U"
  },
  {
    "file": "clupgradecomplete2",
    "title": "Upgradecomplete 2",
    "char": "U"
  },
  {
    "file": "clupslash",
    "title": "Upslash",
    "char": "U"
  },
  {
    "file": "clusterrush",
    "title": "Usterrush",
    "char": "U"
  },
  {
    "file": "clUZG",
    "title": "UZG",
    "char": "U"
  },
  {
    "file": "clvampiresurvivors",
    "title": "Vampiresurvivors",
    "char": "V"
  },
  {
    "file": "clvanguard",
    "title": "Vanguard",
    "char": "V"
  },
  {
    "file": "clvaportrails",
    "title": "Vaportrails",
    "char": "V"
  },
  {
    "file": "clvex",
    "title": "Vex",
    "char": "V"
  },
  {
    "file": "clvex2",
    "title": "Vex 2",
    "char": "V"
  },
  {
    "file": "clvex3",
    "title": "Vex 3",
    "char": "V"
  },
  {
    "file": "clvex3xmas",
    "title": "Vex 3 Xmas",
    "char": "V"
  },
  {
    "file": "clvex4",
    "title": "Vex 4",
    "char": "V"
  },
  {
    "file": "clvex5",
    "title": "Vex 5",
    "char": "V"
  },
  {
    "file": "clvex6",
    "title": "Vex 6",
    "char": "V"
  },
  {
    "file": "clvex7",
    "title": "Vex 7",
    "char": "V"
  },
  {
    "file": "clvex8",
    "title": "Vex 8",
    "char": "V"
  },
  {
    "file": "clvexchallenges",
    "title": "Vexchallenges",
    "char": "V"
  },
  {
    "file": "clvexx3m",
    "title": "Vexx 3 M",
    "char": "V"
  },
  {
    "file": "clvexx3m2",
    "title": "Vexx 3 M 2",
    "char": "V"
  },
  {
    "file": "clvillager",
    "title": "Villager",
    "char": "V"
  },
  {
    "file": "clvincentmansionofthedead",
    "title": "Vincentmansionofthedead",
    "char": "V"
  },
  {
    "file": "clvisitor",
    "title": "Visitor",
    "char": "V"
  },
  {
    "file": "clvolleyrandom",
    "title": "Volleyrandom",
    "char": "V"
  },
  {
    "file": "clvollyballchallenge",
    "title": "Vollyballchallenge",
    "char": "V"
  },
  {
    "file": "clvortex",
    "title": "Vortex",
    "char": "V"
  },
  {
    "file": "clvsagore",
    "title": "Vsagore",
    "char": "V"
  },
  {
    "file": "clvsnonsense",
    "title": "Vsnonsense",
    "char": "V"
  },
  {
    "file": "clVSSMB",
    "title": "VSSMB",
    "char": "V"
  },
  {
    "file": "clvvvvvv(1)",
    "title": "Vvvvvv(1)",
    "char": "V"
  },
  {
    "file": "clvvvvvv",
    "title": "Vvvvvv",
    "char": "V"
  },
  {
    "file": "clwaluigitacostand",
    "title": "Waluigitacostand",
    "char": "W"
  },
  {
    "file": "clwarfare1917",
    "title": "Warfare 1917",
    "char": "W"
  },
  {
    "file": "clwarfare1944",
    "title": "Warfare 1944",
    "char": "W"
  },
  {
    "file": "clwarioland1",
    "title": "Warioland 1",
    "char": "W"
  },
  {
    "file": "clwarioland3",
    "title": "Warioland 3",
    "char": "W"
  },
  {
    "file": "clwarioland4",
    "title": "Warioland 4",
    "char": "W"
  },
  {
    "file": "clwariowarediy",
    "title": "Wariowarediy",
    "char": "W"
  },
  {
    "file": "clwariowareinc",
    "title": "Wariowareinc",
    "char": "W"
  },
  {
    "file": "clwartheknight",
    "title": "Wartheknight",
    "char": "W"
  },
  {
    "file": "clwaterpoolio",
    "title": "Waterpoolio",
    "char": "W"
  },
  {
    "file": "clwaterworks",
    "title": "Waterworks",
    "char": "W"
  },
  {
    "file": "clwavedash",
    "title": "Wavedash",
    "char": "W"
  },
  {
    "file": "clwaverace64",
    "title": "Waverace 64",
    "char": "W"
  },
  {
    "file": "clwaverun",
    "title": "Waverun",
    "char": "W"
  },
  {
    "file": "clwebecomewhatwebehold",
    "title": "Webecomewhatwebehold",
    "char": "W"
  },
  {
    "file": "clwebfishing",
    "title": "Webfishing",
    "char": "W"
  },
  {
    "file": "clweltling",
    "title": "Weltling",
    "char": "W"
  },
  {
    "file": "clwermhole",
    "title": "Wermhole",
    "char": "W"
  },
  {
    "file": "clwhackthetheif",
    "title": "Whackthetheif",
    "char": "W"
  },
  {
    "file": "clwhackyourboss",
    "title": "Whackyourboss",
    "char": "W"
  },
  {
    "file": "clwhackyourcomputer",
    "title": "Whackyourcomputer",
    "char": "W"
  },
  {
    "file": "clwhatamarioworld",
    "title": "Whatamarioworld",
    "char": "W"
  },
  {
    "file": "clwheeliebike",
    "title": "Wheeliebike",
    "char": "W"
  },
  {
    "file": "clwheely",
    "title": "Wheely",
    "char": "W"
  },
  {
    "file": "clwheely2",
    "title": "Wheely 2",
    "char": "W"
  },
  {
    "file": "clwheely3",
    "title": "Wheely 3",
    "char": "W"
  },
  {
    "file": "clwheely4",
    "title": "Wheely 4",
    "char": "W"
  },
  {
    "file": "clwheely5",
    "title": "Wheely 5",
    "char": "W"
  },
  {
    "file": "clwheely6",
    "title": "Wheely 6",
    "char": "W"
  },
  {
    "file": "clwheely7",
    "title": "Wheely 7",
    "char": "W"
  },
  {
    "file": "clwheely8",
    "title": "Wheely 8",
    "char": "W"
  },
  {
    "file": "clwilywars",
    "title": "Wilywars",
    "char": "W"
  },
  {
    "file": "clwindowsdoors",
    "title": "Windowsdoors",
    "char": "W"
  },
  {
    "file": "clwinterfalling",
    "title": "Winterfalling",
    "char": "W"
  },
  {
    "file": "clwinterolympics",
    "title": "Winterolympics",
    "char": "W"
  },
  {
    "file": "clwipeout2097",
    "title": "Wipeout 2097",
    "char": "W"
  },
  {
    "file": "clwipeout2097alt",
    "title": "Wipeout 2097 Alt",
    "char": "W"
  },
  {
    "file": "clwitchcrafttd",
    "title": "Witchcrafttd",
    "char": "W"
  },
  {
    "file": "clwolfchild",
    "title": "Wolfchild",
    "char": "W"
  },
  {
    "file": "clwolfenstein",
    "title": "Wolfenstein",
    "char": "W"
  },
  {
    "file": "clwolfenstein3d",
    "title": "Wolfenstein 3 D",
    "char": "W"
  },
  {
    "file": "clwoodworm",
    "title": "Woodworm",
    "char": "W"
  },
  {
    "file": "clwordle",
    "title": "Wordle",
    "char": "W"
  },
  {
    "file": "clworldcup98",
    "title": "Worldcup 98",
    "char": "W"
  },
  {
    "file": "clworldshardestgame",
    "title": "Worldshardestgame",
    "char": "W"
  },
  {
    "file": "clworldshardestgame2",
    "title": "Worldshardestgame 2",
    "char": "W"
  },
  {
    "file": "clworldshardestgame3",
    "title": "Worldshardestgame 3",
    "char": "W"
  },
  {
    "file": "clworldshardestgame4",
    "title": "Worldshardestgame 4",
    "char": "W"
  },
  {
    "file": "clwpnfire",
    "title": "Wpnfire",
    "char": "W"
  },
  {
    "file": "clwrassling",
    "title": "Wrassling",
    "char": "W"
  },
  {
    "file": "clwrestlebros",
    "title": "Wrestlebros",
    "char": "W"
  },
  {
    "file": "clwwfattitude",
    "title": "Wwfattitude",
    "char": "W"
  },
  {
    "file": "clwwfsmackdown2",
    "title": "Wwfsmackdown 2",
    "char": "W"
  },
  {
    "file": "clxevent",
    "title": "Xevent",
    "char": "X"
  },
  {
    "file": "clXevious",
    "title": "Xevious",
    "char": "X"
  },
  {
    "file": "clxmenarcade",
    "title": "Xmenarcade",
    "char": "X"
  },
  {
    "file": "clXMenChildrenOfTheAtomArcade",
    "title": "XMen Children Of The Atom Arcade",
    "char": "X"
  },
  {
    "file": "clXMenVSStreetFighter",
    "title": "XMen VSStreet Fighter",
    "char": "X"
  },
  {
    "file": "clyanderesimulator",
    "title": "Yanderesimulator",
    "char": "Y"
  },
  {
    "file": "clyarsrevenge",
    "title": "Yarsrevenge",
    "char": "Y"
  },
  {
    "file": "clyellow",
    "title": "Yellow",
    "char": "Y"
  },
  {
    "file": "clyohohoio",
    "title": "Yohohoio",
    "char": "Y"
  },
  {
    "file": "clYoshisStrangeQuest",
    "title": "Yoshis Strange Quest",
    "char": "Y"
  },
  {
    "file": "clyouarelucky",
    "title": "Youarelucky",
    "char": "Y"
  },
  {
    "file": "clyourturntodie",
    "title": "Yourturntodie",
    "char": "Y"
  },
  {
    "file": "clyouvs100skibidi",
    "title": "Youvs 100 Skibidi",
    "char": "Y"
  },
  {
    "file": "clyumenikki",
    "title": "Yumenikki",
    "char": "Y"
  },
  {
    "file": "clzdoom",
    "title": "Zdoom",
    "char": "Z"
  },
  {
    "file": "clzelda2thelegendoflink",
    "title": "Zelda 2 Thelegendoflink",
    "char": "Z"
  },
  {
    "file": "clZeldaIndigoch2",
    "title": "Zelda Indigoch 2",
    "char": "Z"
  },
  {
    "file": "clzeldaminishcap",
    "title": "Zeldaminishcap",
    "char": "Z"
  },
  {
    "file": "clzenword",
    "title": "Zenword",
    "char": "Z"
  },
  {
    "file": "clzoinkz",
    "title": "Zoinkz",
    "char": "Z"
  },
  {
    "file": "clzombieexploder",
    "title": "Zombieexploder",
    "char": "Z"
  },
  {
    "file": "clzombieroad",
    "title": "Zombieroad",
    "char": "Z"
  },
  {
    "file": "clzombierush",
    "title": "Zombierush",
    "char": "Z"
  },
  {
    "file": "clzombiesatemyneighboors",
    "title": "Zombiesatemyneighboors",
    "char": "Z"
  },
  {
    "file": "clzombopaclypse2",
    "title": "Zombopaclypse 2",
    "char": "Z"
  },
  {
    "file": "clzombotron",
    "title": "Zombotron",
    "char": "Z"
  },
  {
    "file": "clzombotron2",
    "title": "Zombotron 2",
    "char": "Z"
  },
  {
    "file": "clzombotronreboot",
    "title": "Zombotronreboot",
    "char": "Z"
  },
  {
    "file": "clzrist",
    "title": "Zrist",
    "char": "Z"
  },
  {
    "file": "clzuma",
    "title": "Zuma",
    "char": "Z"
  },
  {
    "file": "clzumashooter",
    "title": "Zumashooter",
    "char": "Z"
  },
  {
    "file": "cl�oo",
    "title": "�oo",
    "char": "#"
  },
  {
    "file": "clbaldi-3",
    "title": "Baldi-3",
    "char": "B"
  },
  {
    "file": "clbaldi-b",
    "title": "Baldi-b",
    "char": "B"
  },
  {
    "file": "cl100in1nes",
    "title": "100 In 1 Nes",
    "char": "1"
  },
  {
    "file": "cl10yardfight",
    "title": "10 Yardfight",
    "char": "1"
  },
  {
    "file": "cl1942nes",
    "title": "1942 Nes",
    "char": "1"
  },
  {
    "file": "claceattorneymilesedgeworth",
    "title": "Aceattorneymilesedgeworth",
    "char": "A"
  },
  {
    "file": "clangrybirds2",
    "title": "Angrybirds 2",
    "char": "A"
  },
  {
    "file": "clangrybirdsslingshotfrenzy",
    "title": "Angrybirdsslingshotfrenzy",
    "char": "A"
  },
  {
    "file": "clanimalcrossing",
    "title": "Animalcrossing",
    "char": "A"
  },
  {
    "file": "clantipathy",
    "title": "Antipathy",
    "char": "A"
  },
  {
    "file": "clarcadevolley",
    "title": "Arcadevolley",
    "char": "A"
  },
  {
    "file": "classroommaxxing",
    "title": "Assroommaxxing",
    "char": "A"
  },
  {
    "file": "clballoonfight",
    "title": "Balloonfight",
    "char": "B"
  },
  {
    "file": "clbaseballnes",
    "title": "Baseballnes",
    "char": "B"
  },
  {
    "file": "clbitburner",
    "title": "Bitburner",
    "char": "B"
  },
  {
    "file": "clbuckbumble",
    "title": "Buckbumble",
    "char": "B"
  },
  {
    "file": "clcarnivalgamesds",
    "title": "Carnivalgamesds",
    "char": "C"
  },
  {
    "file": "clclucluland",
    "title": "Clucluland",
    "char": "C"
  },
  {
    "file": "clcoldfront",
    "title": "Coldfront",
    "char": "C"
  },
  {
    "file": "clcrashbash",
    "title": "Crashbash",
    "char": "C"
  },
  {
    "file": "cldodecadragons",
    "title": "Dodecadragons",
    "char": "D"
  },
  {
    "file": "cldoomori",
    "title": "Doomori",
    "char": "D"
  },
  {
    "file": "cldunedash",
    "title": "Dunedash",
    "char": "D"
  },
  {
    "file": "cldungeonsanddegenerategambler",
    "title": "Dungeonsanddegenerategambler",
    "char": "D"
  },
  {
    "file": "cldungeonsanddegenerategamblerdebug",
    "title": "Dungeonsanddegenerategamblerdebug",
    "char": "D"
  },
  {
    "file": "cleccothedolphin",
    "title": "Eccothedolphin",
    "char": "E"
  },
  {
    "file": "clescaperoad3",
    "title": "Escaperoad 3",
    "char": "E"
  },
  {
    "file": "cleugeneslife",
    "title": "Eugeneslife",
    "char": "E"
  },
  {
    "file": "clexcitebike",
    "title": "Excitebike",
    "char": "E"
  },
  {
    "file": "clfamidashESides1.2.8",
    "title": "Famidash ESides 1.2.8",
    "char": "F"
  },
  {
    "file": "clfivenightsatfrickbears3",
    "title": "Fivenightsatfrickbears 3",
    "char": "F"
  },
  {
    "file": "clfloodrunner3",
    "title": "Floodrunner 3",
    "char": "F"
  },
  {
    "file": "clfnfsohv2",
    "title": "Fnfsohv 2",
    "char": "F"
  },
  {
    "file": "clGeometryDashWave",
    "title": "Geometry Dash Wave",
    "char": "G"
  },
  {
    "file": "clgettingoverit",
    "title": "Gettingoverit",
    "char": "G"
  },
  {
    "file": "clgrandshiftauto",
    "title": "Grandshiftauto",
    "char": "G"
  },
  {
    "file": "clheartandsoul1.2.1",
    "title": "Heartandsoul 1.2.1",
    "char": "H"
  },
  {
    "file": "clHelltaker",
    "title": "Helltaker",
    "char": "H"
  },
  {
    "file": "clhooked",
    "title": "Hooked",
    "char": "H"
  },
  {
    "file": "clhorntale",
    "title": "Horntale",
    "char": "H"
  },
  {
    "file": "clhungrylamu2",
    "title": "Hungrylamu 2",
    "char": "H"
  },
  {
    "file": "clhungrypumpkin",
    "title": "Hungrypumpkin",
    "char": "H"
  },
  {
    "file": "cliceclimber",
    "title": "Iceclimber",
    "char": "I"
  },
  {
    "file": "clihateyou",
    "title": "Ihateyou",
    "char": "I"
  },
  {
    "file": "cljustaplatformer",
    "title": "Justaplatformer",
    "char": "J"
  },
  {
    "file": "cljustaplatformerE",
    "title": "Justaplatformer E",
    "char": "J"
  },
  {
    "file": "cljustaplatformerE2",
    "title": "Justaplatformer E 2",
    "char": "J"
  },
  {
    "file": "clknuckleschaotix",
    "title": "Knuckleschaotix",
    "char": "K"
  },
  {
    "file": "clleafblower",
    "title": "Leafblower",
    "char": "L"
  },
  {
    "file": "cllearntofly2hacked",
    "title": "Learntofly 2 Hacked",
    "char": "L"
  },
  {
    "file": "cllegionbreaker",
    "title": "Legionbreaker",
    "char": "L"
  },
  {
    "file": "clmachrider",
    "title": "Machrider",
    "char": "M"
  },
  {
    "file": "clmariobrosnes",
    "title": "Mariobrosnes",
    "char": "M"
  },
  {
    "file": "clmeowio",
    "title": "Meowio",
    "char": "M"
  },
  {
    "file": "clmrdriller",
    "title": "Mrdriller",
    "char": "M"
  },
  {
    "file": "clmrdriller2",
    "title": "Mrdriller 2",
    "char": "M"
  },
  {
    "file": "clnewsuperbowserworld",
    "title": "Newsuperbowserworld",
    "char": "N"
  },
  {
    "file": "clnguidle",
    "title": "Nguidle",
    "char": "N"
  },
  {
    "file": "clpinballnes",
    "title": "Pinballnes",
    "char": "P"
  },
  {
    "file": "clpokeemeraldextendedcut",
    "title": "Pokeemeraldextendedcut",
    "char": "P"
  },
  {
    "file": "clpokelowbudgetcrystal",
    "title": "Pokelowbudgetcrystal",
    "char": "P"
  },
  {
    "file": "clpokemonperfectemerald5.5",
    "title": "Pokemonperfectemerald 5.5",
    "char": "P"
  },
  {
    "file": "clpokepicross",
    "title": "Pokepicross",
    "char": "P"
  },
  {
    "file": "clpokescrambledscarlet",
    "title": "Pokescrambledscarlet",
    "char": "P"
  },
  {
    "file": "clprankcalltungtungtungsahurclicker",
    "title": "Prankcalltungtungtungsahurclicker",
    "char": "P"
  },
  {
    "file": "clprestigetree",
    "title": "Prestigetree",
    "char": "P"
  },
  {
    "file": "clprowrestling",
    "title": "Prowrestling",
    "char": "P"
  },
  {
    "file": "clquake",
    "title": "Quake",
    "char": "Q"
  },
  {
    "file": "clrabbithole106",
    "title": "Rabbithole 106",
    "char": "R"
  },
  {
    "file": "clreacticore",
    "title": "Reacticore",
    "char": "R"
  },
  {
    "file": "clrunfromwitheredfox",
    "title": "Runfromwitheredfox",
    "char": "R"
  },
  {
    "file": "clscoobydoocreepyrun",
    "title": "Scoobydoocreepyrun",
    "char": "S"
  },
  {
    "file": "clscoobydoozombiehunter",
    "title": "Scoobydoozombiehunter",
    "char": "S"
  },
  {
    "file": "clslalomnes",
    "title": "Slalomnes",
    "char": "S"
  },
  {
    "file": "clslicemaster",
    "title": "Slicemaster",
    "char": "S"
  },
  {
    "file": "clsm64yscaled",
    "title": "Sm 64 Yscaled",
    "char": "S"
  },
  {
    "file": "clsmashremix2.0.1",
    "title": "Smashremix 2.0.1",
    "char": "S"
  },
  {
    "file": "clsoccernes",
    "title": "Soccernes",
    "char": "S"
  },
  {
    "file": "clsonicdrift",
    "title": "Sonicdrift",
    "char": "S"
  },
  {
    "file": "clsonicdrift2",
    "title": "Sonicdrift 2",
    "char": "S"
  },
  {
    "file": "clsonicmegamix5.0aLEAKED",
    "title": "Sonicmegamix 5.0 A LEAKED",
    "char": "S"
  },
  {
    "file": "clsonicmushroomblast",
    "title": "Sonicmushroomblast",
    "char": "S"
  },
  {
    "file": "clsprunkipyramixed",
    "title": "Sprunkipyramixed",
    "char": "S"
  },
  {
    "file": "clstarfox2",
    "title": "Starfox 2",
    "char": "S"
  },
  {
    "file": "clstarfoxsfx2",
    "title": "Starfoxsfx 2",
    "char": "S"
  },
  {
    "file": "clsugaryspire",
    "title": "Sugaryspire",
    "char": "S"
  },
  {
    "file": "clswingforbrainrots",
    "title": "Swingforbrainrots",
    "char": "S"
  },
  {
    "file": "cltailsadventure",
    "title": "Tailsadventure",
    "char": "T"
  },
  {
    "file": "cltailsskypatrol",
    "title": "Tailsskypatrol",
    "char": "T"
  },
  {
    "file": "cltennisnes",
    "title": "Tennisnes",
    "char": "T"
  },
  {
    "file": "clthemeparkpsx",
    "title": "Themeparkpsx",
    "char": "T"
  },
  {
    "file": "cltreeshateyou",
    "title": "Treeshateyou",
    "char": "T"
  },
  {
    "file": "cltungtungbasics",
    "title": "Tungtungbasics",
    "char": "T"
  },
  {
    "file": "clurbanchampion",
    "title": "Urbanchampion",
    "char": "U"
  },
  {
    "file": "clUvuvwevwevweOnyetenvewveUgwemubwemOssas",
    "title": "Uvuvwevwevwe Onyetenvewve Ugwemubwem Ossas",
    "char": "U"
  },
  {
    "file": "clvibribbon",
    "title": "Vibribbon",
    "char": "V"
  },
  {
    "file": "clvolleyball",
    "title": "Volleyball",
    "char": "V"
  },
  {
    "file": "clwackyflip",
    "title": "Wackyflip",
    "char": "W"
  },
  {
    "file": "clwbml",
    "title": "Wbml",
    "char": "W"
  },
  {
    "file": "clwebdashers",
    "title": "Webdashers",
    "char": "W"
  },
  {
    "file": "clwonderboy3",
    "title": "Wonderboy 3",
    "char": "W"
  },
  {
    "file": "clwonderboyarcade",
    "title": "Wonderboyarcade",
    "char": "W"
  },
  {
    "file": "clwreckingcrew",
    "title": "Wreckingcrew",
    "char": "W"
  },
  {
    "file": "clxor",
    "title": "Xor",
    "char": "X"
  },
  {
    "file": "codeorg",
    "title": "Codeorg",
    "char": "#"
  },
  {
    "file": "EB.Client.V1.0.0R2.WASM",
    "title": "EB.Client.V 1.0.0 R 2.WASM",
    "char": "#"
  },
  {
    "file": "esm",
    "title": "Esm",
    "char": "#"
  },
  {
    "file": "npm",
    "title": "Npm",
    "char": "#"
  },
  {
    "file": "skypack",
    "title": "Skypack",
    "char": "#"
  },
  {
    "file": "supremeduelistfix",
    "title": "Supremeduelistfix",
    "char": "#"
  },
  {
    "file": "thiefpuzzle",
    "title": "Thiefpuzzle",
    "char": "#"
  },
  {
    "file": "unpkg",
    "title": "Unpkg",
    "char": "#"
  },
  {
    "file": "cl?",
    "title": "?",
    "char": "#"
  },
  {
    "file": "cldrivemad",
    "title": "Drivemad",
    "char": "D"
  },
  {
    "file": "clhalloween2600",
    "title": "Halloween 2600",
    "char": "H"
  },
  {
    "file": "cllegoracers",
    "title": "Legoracers",
    "char": "L"
  },
  {
    "file": "clpokeaestheticred",
    "title": "Pokeaestheticred",
    "char": "P"
  },
  {
    "file": "clpokecrystallegacy",
    "title": "Pokecrystallegacy",
    "char": "P"
  },
  {
    "file": "clpokeemeraldlegacy",
    "title": "Pokeemeraldlegacy",
    "char": "P"
  },
  {
    "file": "clpokeyellowlegacy",
    "title": "Pokeyellowlegacy",
    "char": "P"
  },
  {
    "file": "clswitch",
    "title": "Switch",
    "char": "S"
  },
  {
    "file": "clwariowaretouched",
    "title": "Wariowaretouched",
    "char": "W"
  }
];
