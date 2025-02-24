import { gameBattles } from "./battleList";
import { EnemyName } from "./enemyData";
import { NextEventOption } from "./eventData";

export type Difficulty = "weak" | "normal" | "strong" | "elite" | "boss";

export type GameBattle = {
  id: string;
  label: string;
  description: string;
  enemy: EnemyName;
  difficulty?: Difficulty;
  level?: number;
  reward?: string;
  nextEvents?: NextEventOption[];
};

export const emptyBattle: GameBattle = {
  id: "000",
  label: "Nichts",
  description: "",
  enemy: "Nichts",
};

export function getGameBattleById(id: string): GameBattle | undefined {
  return gameBattles.find((battle) => battle.id === id);
}