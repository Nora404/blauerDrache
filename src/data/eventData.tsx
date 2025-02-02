import { PlacesKeys } from "./helper/colorfullStrings";
import {
  GameState,
  PlayerBase,
  PlayerEconomy,
  PlayerFlux,
  PlayerMeta,
  PlayerStats,
} from "../store/types";
import { ItemName } from "./gameItems/ItemData";

export type NextEventOption = {
  eventId: string; // Next event ID
  probability: number; // z. B. 70 => 70%
};

export type GameAction = {
  itemsDelta?: Partial<Record<ItemName, number>>;
  economyDelta?: Partial<PlayerEconomy>;
  fluxDelta?: Partial<PlayerFlux>; // für buffs und debuffs
  stateDelta?: Partial<PlayerStats>;
  baseDelta?: Partial<PlayerBase>;

  triggerQuest?: string;
  endQuest?: string;
  nextEvents?: NextEventOption[];
  message?: string;
};

export type GameEvent = {
  id: string; // z.B. 001Stone
  label?: string; // z.B "Stein gefunden"
  description: string;
  buttons: {
    label: string;
    result?: string;
    getAction: () => GameAction;
    conditions?: Conditions;
  }[];
  places: {
    place: PlacesKeys;
    probability: number; // 1-100 wobei 100 = immer möglich
  }[];
};

// Gewichtetes Ereignis
export type WeightedEvent = {
  eventId: string;
  probability: number;
  questId?: string;
  conditions?: Conditions;
};

export type Conditions = {
  operator?: "<" | ">" | "=";
  gameTime?: {
    fromTime?: string;
    toTime?: string;
    mode?: "inside" | "outside";
    gameDay?: "Tag" | "Nacht";
  };
  gameState?: Partial<GameState>;
  playerStats?: Partial<PlayerStats>;
  playerBase?: Partial<PlayerBase>;
  playerFlux?: Partial<PlayerFlux>;
  playerMeta?: Partial<PlayerMeta>;
  playerEconomy?: Partial<PlayerEconomy>;
  haveBuffs?: boolean;
  haveDebuffs?: boolean;
};

// const conditionObj = {
//   playerFlux: {
//     buff: { "Strength": 1 },
//     debuff: { "Slow": 1 },
//   },
// };
