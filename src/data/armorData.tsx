import { GradientText } from "../utility/Formatted/GradientText";
import { Item } from "./ItemData";

export type ArmorName =
  | "Nichts"
  | "Socken"
  | "Nachthemd"
  | "Handschuhe"
  | "Stoffweste"
  | "Wickelrock"
  | "Strickpullover"
  | "Lederhose"
  | "Übergangsjacke"
  | "Wanderschuhe"
  | "Wollumhang"
  | "Lederjacke"
  | "Winterkleid"
  | "Kettenhemd"
  | "Ritterrüstung"
  | "Drachenrüstung";

export type Armor = Item & {
  defense: number;
};

export const emptyArmorObj: Armor = {
  name: "Nichts",
  label: <GradientText>Nichts</GradientText>,
  description: "Etwas zum Schutz",
  category: "Ausrüstung",
  defense: 0,
  ek: 0,
};

export const armors: Armor[] = [
  {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 0,
    ek: 0,
  },
  {
    name: "Socken",
    label: <GradientText>Socken</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 1,
    ek: 35,
  },
  {
    name: "Nachthemd",
    label: <GradientText>Nachthemd</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 3,
    ek: 53,
  },
  {
    name: "Handschuhe",
    label: <GradientText>Handschuhe</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 5,
    ek: 80,
  },
  {
    name: "Stoffweste",
    label: <GradientText>Stoffweste</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 7,
    ek: 122,
  },
  {
    name: "Wickelrock",
    label: <GradientText>Wickelrock</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 9,
    ek: 185,
  },
  {
    name: "Strickpullover",
    label: <GradientText>Strickpullover</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 11,
    ek: 280,
  },
  {
    name: "Lederhose",
    label: <GradientText>Lederhose</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 13,
    ek: 425,
  },
  {
    name: "Übergangsjacke",
    label: <GradientText>Übergangsjacke</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 15,
    ek: 644,
  },
  {
    name: "Wanderschuhe",
    label: <GradientText>Wanderschuhe</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 17,
    ek: 977,
  },
  {
    name: "Wollumhang",
    label: <GradientText>Wollumhang</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 19,
    ek: 1480,
  },
  {
    name: "Lederjacke",
    label: <GradientText>Lederjacke</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 21,
    ek: 2243,
  },
  {
    name: "Winterkleid",
    label: <GradientText>Winterkleid</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 23,
    ek: 3402,
  },
  {
    name: "Kettenhemd",
    label: <GradientText>Kettenhemd</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 25,
    ek: 5163,
  },
  {
    name: "Ritterrüstung",
    label: <GradientText>Ritterrüstung</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 27,
    ek: 7754,
  },
  {
    name: "Drachenrüstung",
    label: <GradientText>Drachenrüstung</GradientText>,
    description: "Etwas zum Schutz",
    category: "Ausrüstung",
    defense: 29,
    ek: 12000,
  },
];

export const armorMap: Record<string, Armor> = armors.reduce((map, armor) => {
  map[armor.name] = armor;
  return map;
}, {} as Record<string, Armor>);

// ANWENDUNG
// const selectedArmor = armorMap[gameStore.equipment.armor] || emptyArmorObj;
// <PlayerTalk>"Ich besitzte {selectedArmor.label}"</PlayerTalk>
