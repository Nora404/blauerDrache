import { GradientText } from "../../utility/Formatted/GradientText";
import { ArmorName, armors } from "./armorData";
import { WeaponName, weapons } from "./weaponData";
import { CollectingName, collections } from "./collectionData";
import { ConsumName, fight, food } from "./consumData";
import { BuffName } from "../buffData";
import { DebuffName } from "../debuffData";

export type ItemName =
  | WeaponName
  | ArmorName
  | CollectingName
  | ConsumName
  | "Nichts"
  | "Stein"
  | "Stock"
  | "Plunder"
  | "Blume"
  | "Kupfererz"
  | "LeereFlasche"
  | "Lederstück";

export type ItemCartegoryName =
  | "Zeug"      // Stuff
  | "Nahrung"   // Consum
  | "Rohstoff"  // Resource
  | "Material"  // Material
  | "Kampf"     // Consum
  | "Werkzeug"  // Tool
  | "Waffen"    // Weapon
  | "Ausrüstung"// Armor
  | "Fragmente"       // Collection
  | "Beute-Lahtheim"; // Collection

export function getRandomItem(possibleItems: ItemName[]) {
  const index = Math.floor(Math.random() * possibleItems.length);
  return possibleItems[index];
}

export function getItemCategories(): Record<ItemCartegoryName, Item[]> {
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

export type Item = {
  name: ItemName;
  label: JSX.Element;
  description: string;
  category: ItemCartegoryName;
  buff?: BuffName;
  debuff?: DebuffName;
  life?: number;
  actionPoints?: number;
  attack?: number;
  defense?: number;
  luck?: number;
  ek?: number;
  vk?: number;
};

export const emptyItemObj: Item = {
  name: "Nichts",
  label: <GradientText>Nichts</GradientText>,
  category: "Zeug",
  description: "Nichts von Bedeutung.",
  ek: 0,
  vk: 0,
};

export const items: Item[] = [
  {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    category: "Zeug",
    description: "Nichts von Bedeutung.",
    ek: 0,
    vk: 0,
  },
  {
    name: "Stein",
    label: <GradientText>Stein</GradientText>,
    category: "Material",
    description: "Ein gewöhnlicher Stein. Könnte nützlich sein.",
    ek: 2,
    vk: 1,
  },
  {
    name: "Stock",
    label: <GradientText>Stock</GradientText>,
    category: "Material",
    description: "Ein einfacher Stock. Kann zum Basteln verwendet werden.",
    ek: 3,
    vk: 1,
  },
  {
    name: "Plunder",
    label: <GradientText>Plunder</GradientText>,
    category: "Zeug",
    description: "Ein nutzloser Haufen Krimskrams.",
    ek: 1,
    vk: 1,
  },
  {
    name: "Blume",
    label: <GradientText>Blume</GradientText>,
    category: "Material",
    description: "Eine schöne Blume. Vielleicht gibt es jemanden, der sie mag.",
    ek: 5,
    vk: 3,
  },
  {
    name: "Kupfererz",
    label: <GradientText>Kupfererz</GradientText>,
    category: "Material",
    description: "Ein Stück Kupfererz. Kann geschmolzen werden.",
    ek: 15,
    vk: 8,
  },
  {
    name: "LeereFlasche",
    label: <GradientText>Leere Flasche</GradientText>,
    category: "Zeug",
    description: "Eine leere Glasflasche. Kann mit Flüssigkeit gefüllt werden.",
    ek: 10,
    vk: 5,
  },
  {
    name: "Lederstück",
    label: <GradientText>Lederstück</GradientText>,
    category: "Material",
    description: "Ein Stück Leder. Perfekt für handwerkliche Projekte.",
    ek: 20,
    vk: 10,
  },
  ...food,
  ...fight,
  ...collections,
  ...weapons,
  ...armors,
];

export const itemMap: Record<string, Item> = items.reduce((map, item) => {
  map[item.name] = item;
  return map;
}, {} as Record<string, Item>);

