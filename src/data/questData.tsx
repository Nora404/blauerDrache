import { PlayerStats, PlayerBase } from "../store/newGameStore";
import { GameEvent } from "./eventData";
import { event001ThreeStoneEnd } from "./gameQuests/001TheeStones/001ThreeStoneEnd";
import { quest001ThreeStone } from "./gameQuests/001TheeStones/001ThreeStones";
import { event001ThreeStoneTrigger } from "./gameQuests/001TheeStones/001ThreeStoneTrigger";
import { ItemName } from "./ItemData";

export type TaskType =
  | "Begegnung" // talk
  | "Besorgen" // item
  | "Benutzten" // use
  | "Besuchen" // go
  | "Besiegen" // kill
  | "Erfahrung" // base
  | "Verbessern" // stats
  | "Geheimnis"; //switch

//region
export type GameQuest = {
  id: string;
  label: string;
  description: JSX.Element;
  reward: JSX.Element;
  path: string; // Hier beendet man die Quest
  eventByEnd: string; // Dieses Event verteilt die Belohnung
  progress: Progress;
  repeat: boolean;
};
//#endregion

//#region
export type HaveItem = { item: ItemName; need: number; count: number };
export type UseItem = { item: ItemName; place: string };
export type KillEnemy = { enemy: string; need: number; count: number };

export type Task = {
  label?: string; // Falls benötigt um Orte oder Personen zu beschreiben
  talkWith?: string; // Begegnung (path)
  haveItem?: HaveItem[]; // Besorgen
  useItem?: UseItem; // Benutzten (path)
  goTo?: string; // Besuchen (path)
  enemy?: KillEnemy[]; // Besiegen
  base?: Partial<PlayerBase>; // Erfahrung
  stats?: Partial<PlayerStats>; // Verbessern
  switch?: Partial<Record<string, boolean>>; // Geheimnis
};
export type Progress = {
  type: TaskType;
  path: string; // Hier beendet man die Aufgabe
  eventByEnd: string; // EventID
  isDone: boolean;
  task: Task;
};

export const emptyQuest: GameQuest = {
  id: "000",
  label: "Nichts",
  description: <></>,
  reward: <></>,
  path: "/",
  eventByEnd: "000",
  progress: {
    type: "Geheimnis",
    path: "/",
    eventByEnd: "000",
    isDone: false,
    task: {},
  },
  repeat: false,
};
//#endregion

export const gameQuests: GameQuest[] = [quest001ThreeStone];

export const gameQuestEvents: GameEvent[] = [
  event001ThreeStoneTrigger,
  event001ThreeStoneEnd,
];

//#region [gray]
export function getGameQuestById(id: string): GameQuest | undefined {
  return gameQuests.find((quest) => quest.id === id);
}

export function resetQuestProgress(progress: Progress): Progress {
  return {
    ...progress,
    isDone: false,
    task: {
      ...progress.task,
      haveItem: progress.task.haveItem
        ? progress.task.haveItem.map((item) => ({ ...item, count: 0 }))
        : undefined,
      enemy: progress.task.enemy
        ? progress.task.enemy.map((enemy) => ({ ...enemy, count: 0 }))
        : undefined,
    },
  };
}
//#endregion
