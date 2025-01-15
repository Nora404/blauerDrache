import { BuffName, buffMap } from "../../../data/buffData";
import { PlacesKeys } from "../../../data/colorfullStrings";
import { DebuffName, debuffMap } from "../../../data/debuffData";
import { ItemCartegoryName, Item, itemMap } from "../../../data/ItemData";

export function buildItemCategories(): Record<ItemCartegoryName, Item[]> {
  const categoryMap: Record<string, Item[]> = {};
  Object.values(itemMap).forEach((item) => {
    const cat = item.category;
    if (!categoryMap[cat]) {
      categoryMap[cat] = [];
    }
    categoryMap[cat].push(item);
  });
  // Typescript-cast, damit es in dein Record passt
  return categoryMap as Record<ItemCartegoryName, Item[]>;
}

// Buffs und Debuffs in Arrays
export function getAllBuffNames(): BuffName[] {
  return Object.keys(buffMap) as BuffName[];
}
export function getAllDebuffNames(): DebuffName[] {
  return Object.keys(debuffMap) as DebuffName[];
}

export function getAllPlaces(): PlacesKeys[] {
  const all: PlacesKeys[] = [
    "Nordtor",
    "Westmauer",
    "Ostmauer",
    "Südmauer",
    "Brunnen",
    "Vorplatz",
    "Kirche",
    "Friedhof",
    "Rathaus",
    "Taverne",
    "Handelsbezirk",
    "Krämer",
    "Waffenladen",
    "Ausrüstungsladen",
    "Wohnbezirk",
    "Gassen",
    "Haus",
    "Weg",
    "Fluss",
    "Quelle",
    "See",
    "Sumpf",
    "Waldrand",
    "Wald",
    "Waldlichtung",
    "Dunkelwald",
    "Toilletenhaus",
    "Wiese",
    "Feld",
    "Steppe",
    "Ödland",
    "Hügelland",
    "Bergfuß",
    "Bergpfad",
    "Bergspitze",
    "Höhleneingang",
    "Höhle",
    "Schatzkammer",
  ];
  return all;
}
