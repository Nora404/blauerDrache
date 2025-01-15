import { BuffName, buffMap } from "../../../data/buffData";
import { PlacesKeys } from "../../../data/colorfullStrings";
import { DebuffName, debuffMap } from "../../../data/debuffData";
import { feelingMap, FeelingName } from "../../../data/feelingData";
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
  return categoryMap as Record<ItemCartegoryName, Item[]>;
}

export function getAllBuffNames(): BuffName[] {
  return Object.keys(buffMap) as BuffName[];
}
export function getAllDebuffNames(): DebuffName[] {
  return Object.keys(debuffMap) as DebuffName[];
}
export function getAllFeelingNames(): FeelingName[] {
  return Object.keys(feelingMap) as FeelingName[];
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

export function formatAsJSX(obj: any, indent = 0): string {
  const spaces = "  ".repeat(indent);
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    const items = obj.map((x) => formatAsJSX(x, indent + 1));
    return `[\n${items.join(",\n")}\n${spaces}]`;
  } else if (typeof obj === "object" && obj !== null) {
    const entries = Object.entries(obj).map(([k, v]) => {
      return `  ${"  ".repeat(indent)}${k}: ${formatAsJSX(v, indent + 1)}`;
    });
    return `{\n${entries.join(",\n")}\n${spaces}}`;
  } else if (typeof obj === "string") {
    if (obj.startsWith("<>") && obj.endsWith("</>")) {
      return obj;
    }
    return JSON.stringify(obj);
  }
  return String(obj);
}
