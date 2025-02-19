import { ItemName } from "./gameItems/ItemData";

export type EnemyName = "Nichts" | "Ratte" | "Dieb";

export type LootTabel = {
  item: ItemName;
  probability: number;
};

export type MonsterSkill = {
  skill: string;
  probability: number;
};

export type Enemy = {
  name: EnemyName;
  description: string;
  level: number;

  life: number;
  attack: number;
  defense: number;
  luck: number;
  skill: MonsterSkill[];

  exp: number;
  gold: number;
  loot: LootTabel[];
};

export const emptyEnemyObj: Enemy = {
  name: "Nichts",
  description: "",
  level: 0,

  life: 0,
  attack: 0,
  defense: 0,
  luck: 0,
  skill: [],

  exp: 0,
  gold: 0,
  loot: [],
};

export const enemies: Enemy[] = [
  {
    name: "Ratte",
    description: "Eine fiese Ratte, die in dunklen Ecken lauert.",
    level: 1,
    life: 10,
    attack: 5,
    defense: 2,
    luck: 2,
    skill: [],
    exp: 10,
    gold: 5,
    loot: [],
  },
  {
    name: "Dieb",
    description: "Ein hinterhältiger Dieb, der dich ausraubt.",
    level: 2,
    life: 20,
    attack: 15,
    defense: 10,
    luck: 5,
    skill: [],
    exp: 20,
    gold: 15,
    loot: [],
  },
];

export const enemyMap: Record<string, Enemy> = enemies.reduce((map, enemy) => {
  map[enemy.name] = enemy;
  return map;
}, {} as Record<string, Enemy>);

const LIFE_SCALE = 8.8; // Kommentar: Skalierungsfaktor für Leben
const ATTACK_SCALE = 4.4; // Kommentar: Skalierungsfaktor für Angriff
const DEFENSE_SCALE = 4.4; // Kommentar: Skalierungsfaktor für Verteidigung
const LUCK_SCALE = 3.3; // Kommentar: Skalierungsfaktor für Glück
const EXP_SCALE = 5.5; // Kommentar: Skalierungsfaktor für Erfahrung
const GOLD_SCALE = 5.5; // Kommentar: Skalierungsfaktor für Gold

export type Difficulty = "weak" | "normal" | "strong" | "elite" | "boss";

export function setEnemyLevel(
  enemyName: EnemyName,
  level: number = 1,
  difficulty: Difficulty = "normal"
): Enemy {
  const baseEnemy = enemyMap[enemyName];

  let multiplier = 1;
  if (difficulty === "weak") multiplier = 0.8;
  else if (difficulty === "strong") multiplier = 1.2;
  else if (difficulty === "elite") multiplier = 1.5;
  else if (difficulty === "boss") multiplier = 1.8;

  return {
    ...baseEnemy,
    level: level,
    life: Math.round(baseEnemy.life + level * LIFE_SCALE * multiplier),
    attack: Math.round(baseEnemy.attack + level * ATTACK_SCALE * multiplier),
    defense: Math.round(baseEnemy.defense + level * DEFENSE_SCALE * multiplier),
    luck: Math.round(baseEnemy.luck + level * LUCK_SCALE * multiplier),
    exp: Math.round(baseEnemy.exp + level * EXP_SCALE * multiplier),
    gold: Math.round(baseEnemy.gold + level * GOLD_SCALE * multiplier),
  };
}
