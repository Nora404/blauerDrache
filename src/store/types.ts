// types.ts


import { Buff, BuffName } from "../data/buffData";
import { CallingName } from "../data/callingData";
import { Debuff, DebuffName } from "../data/debuffData";
import { FeelingName } from "../data/feelingData";
import { ArmorName } from "../data/gameItems/armorData";
import { ItemName, Item } from "../data/gameItems/ItemData";
import { WeaponName } from "../data/gameItems/weaponData";

import { OriginName } from "../data/originData";
import { Progress } from "../data/questData";
import { RaceName } from "../data/raceData";


export type GameTime = {
  gameTime: string; // z.B. "12:00"
  gameDay: "Tag" | "Nacht";
};

export type GameState = {
  weather: string;
  temperature: string;
  creating: boolean;
  mobilePop: boolean;
  currentPath: string;
  currentEventQueue: Record<string, string>;
  switch: Record<string, boolean>;
};

export type PlayerMeta = {
  name: string;
  race: RaceName;
  origin: OriginName;
  calling: CallingName;
  titel: string;
  colortype: string;
  colors: string[];
};

export type PlayerStats = {
  life: number;
  energy: number;
  attack: number;
  defense: number;
  luck: number;
};

export type PlayerBase = {
  level: number;
  nextLevel: number;
  exp: number;
  ruf: number;
  leumund: number;
  nextLeumund: number;
  maxLife: number;
  maxRounds: number;
};

export type PlayerFlux = {
  feeling: FeelingName;
  buff: Partial<Record<BuffName, number>>;
  debuff: Partial<Record<DebuffName, number>>;
  weapon: WeaponName;
  armor: ArmorName;
  item: ItemName;
};

export type PlayerEconomy = {
  gold: number;
  edelsteine: number;
  items: Record<string, { item: Item; quantity: number }>;
};

export type PlayerQuest = {
  activeQuests: Record<string, Progress>;
  completedQuest: string[];
};

export type GameStore = {
  gameTime: GameTime;
  gameState: GameState;
  playerMeta: PlayerMeta;
  playerStats: PlayerStats;
  playerBase: PlayerBase;
  playerFlux: PlayerFlux;
  playerEconomy: PlayerEconomy;
  playerQuest: PlayerQuest;
};

export type ActiveBuff = Buff & { currentDuration: number };
export type ActiveDebuff = Debuff & { currentDuration: number };

export type StatDelta = {
  buffs: number;
  debuffs: number;
  feeling: number;
};

export type Delta = {
  life: StatDelta;
  energy: StatDelta;
  attack: StatDelta;
  defense: StatDelta;
  luck: StatDelta;
};

// Beispiel-Objekte, wie du sie hattest
export const defaultGameStore: GameStore = {
  gameTime: {
    gameTime: "12:00",
    gameDay: "Tag",
  },
  gameState: {
    weather: "sonnig",
    temperature: "warm",
    creating: false,
    mobilePop: false,
    currentPath: "/start",
    currentEventQueue: {},
    switch: {},
  },
  playerMeta: {
    name: "Name",
    race: "Mensch",
    origin: "Mondauge",
    calling: "Alchemist",
    titel: "Keiner",
    colortype: "Einfarbig",
    colors: [],
  },
  playerStats: {
    life: 100,
    energy: 20,
    attack: 5,
    defense: 5,
    luck: 5,
  },
  playerBase: {
    level: 1,
    nextLevel: 100,
    exp: 0,
    ruf: 0,
    leumund: 0,
    nextLeumund: 100,
    maxLife: 100,
    maxRounds: 20,
  },
  playerFlux: {
    feeling: "Normal",
    buff: {},
    debuff: {},
    weapon: "Nichts",
    armor: "Nichts",
    item: "Nichts",
  },
  playerEconomy: {
    gold: 100,
    edelsteine: 0,
    items: {},
  },
  playerQuest: {
    activeQuests: {},
    completedQuest: [],
  },
};
