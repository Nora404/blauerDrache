import { GameEvent } from "./eventData";
import {
  quest003FindStone,
  event003FindStoneTrigger,
  event003FindStoneEnd,
} from "./gameQuests/003FindStones";
import { quest004OneTrash, event004OneTrashEnd, event004OneTrashTrigger } from "./gameQuests/004OneTrash";
import { GameQuest } from "./questData";

export const gameQuests: GameQuest[] = [quest003FindStone, quest004OneTrash];

export const gameQuestEvents: GameEvent[] = [
  event003FindStoneTrigger,
  event003FindStoneEnd,

  event004OneTrashTrigger,
  event004OneTrashEnd,
];
