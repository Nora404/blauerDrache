import { GameEvent } from "./eventData";
import {
  quest003FindStone,
  event003FindStoneTrigger,
} from "./gameQuests/003FindStones";
import { GameQuest } from "./questData";

export const gameQuests: GameQuest[] = [quest003FindStone];

export const gameQuestEvents: GameEvent[] = [
  event003FindStoneTrigger,
  event003FindStoneTrigger,
];
