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
    attack: 3,
    defense: 1,
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
    attack: 5,
    defense: 2,
    luck: 4,
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
