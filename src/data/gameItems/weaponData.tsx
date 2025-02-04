import { GradientText } from "../../utility/Formatted/GradientText";
import { Item } from "./ItemData";

export type WeaponName =
  | "Nichts"
  | "Brotmeser"
  | "Glasflasche"
  | "Besenstiel"
  | "Heugabel"
  | "Übungsschwert"
  | "Holzfälleraxt"
  | "Tranchiermesser"
  | "Heckenschere"
  | "Schleuder"
  | "Kurzschwert"
  | "Hellebarde"
  | "Kriegshammer"
  | "Langschwert"
  | "Morgenstern"
  | "Drachentöter";

export type Weapon = Item & {
  attack: number;
};

export const emptyWeaponObj: Weapon = {
  name: "Nichts",
  label: <GradientText>Nichts</GradientText>,
  description: "Willst du deine Gegner mit Worten besiegen?",
  category: "Waffen",
  attack: 0,
  ek: 0,
};

export const weapons: Weapon[] = [
  {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    description: "Willst du deine Gegner mit Worten besiegen?",
    category: "Waffen",
    attack: 0,
    ek: 0,
  },
  {
    name: "Brotmeser",
    label: <GradientText>Brotmeser</GradientText>,
    description: "Schneidet durch Butter. Bei Gegnern ist es weniger effektiv.",
    category: "Waffen",
    attack: 1,
    ek: 25,
  },
  {
    name: "Glasflasche",
    label: <GradientText>Glasflasche</GradientText>,
    description: "Ideal für spontane Kneipenschlägereien oder improvisierte Alchemie.",
    category: "Waffen",
    attack: 3,
    ek: 38,
  },
  {
    name: "Besenstiel",
    label: <GradientText>Besenstiel</GradientText>,
    description: "Nicht nur für Hexen – auch für handfeste Argumente.",
    category: "Waffen",
    attack: 5,
    ek: 58,
  },
  {
    name: "Heugabel",
    label: <GradientText>Heugabel</GradientText>,
    description: "Perfekt für Mist. Und für Gegner, die welchen erzählen.",
    category: "Waffen",
    attack: 7,
    ek: 89,
  },
  {
    name: "Übungsschwert",
    label: <GradientText>Übungsschwert</GradientText>,
    description: "Ideal für Anfänger. Und für Gegner, die’s bleiben.",
    category: "Waffen",
    attack: 9,
    ek: 137,
  },
  {
    name: "Holzfälleraxt",
    label: <GradientText>Holzfälleraxt</GradientText>,
    description: "Fällt Bäume und Feinde gleichermaßen gut.",
    category: "Waffen",
    attack: 11,
    ek: 210,
  },
  {
    name: "Tranchiermesser",
    label: <GradientText>Tranchiermesser</GradientText>,
    description: "Für präzise Schnitte - in Obst, Gemüse und Feinden.",
    category: "Waffen",
    attack: 13,
    ek: 322,
  },
  {
    name: "Heckenschere",
    label: <GradientText>Heckenschere</GradientText>,
    description: "Zum Filetieren von Fleisch… und Feinden mit gutem Geschmack.",
    category: "Waffen",
    attack: 15,
    ek: 492,
  },
  {
    name: "Schleuder",
    label: <GradientText>Schleuder</GradientText>,
    description: "David besiegte Goliath. Vielleicht hast du ja auch Glück.",
    category: "Waffen",
    attack: 17,
    ek: 755,
  },
  {
    name: "Kurzschwert",
    label: <GradientText>Kurzschwert</GradientText>,
    description: "Klein, aber gemein. Genauso wie du nach wenig Schlaf.",
    category: "Waffen",
    attack: 19,
    ek: 1156,
  },
  {
    name: "Hellebarde",
    label: <GradientText>Hellebarde</GradientText>,
    description: "Lanze, Axt und Spazierstock in einem - für den anspruchsvollen Ritter.",
    category: "Waffen",
    attack: 21,
    ek: 1770,
  },
  {
    name: "Kriegshammer",
    label: <GradientText>Kriegshammer</GradientText>,
    description: "Die elegante Lösung für hartnäckige Probleme. Und Gegner.",
    category: "Waffen",
    attack: 23,
    ek: 2710,
  },
  {
    name: "Langschwert",
    label: <GradientText>Langschwert</GradientText>,
    description: "Ein Klassiker. Funktioniert seit Jahrhunderten.",
    category: "Waffen",
    attack: 25,
    ek: 4141,
  },
  {
    name: "Morgenstern",
    label: <GradientText>Morgenstern</GradientText>,
    description: "Perfekt für Morgenmuffel mit Gewaltpotenzial.",
    category: "Waffen",
    attack: 27,
    ek: 6340,
  },
  {
    name: "Drachentöter",
    label: <GradientText>Drachentöter</GradientText>,
    description: "Noch nie an einem Drachen getestet. Willst du den Anfang machen?",
    category: "Waffen",
    attack: 29,
    ek: 10000,
  },
];

export const weaponMap: Record<string, Weapon> = weapons.reduce(
  (map, weapon) => {
    map[weapon.name] = weapon;
    return map;
  },
  {} as Record<string, Weapon>
);

// ANWENDUNG
// const selectedWeapon = weaponMap[gameStore.equipment.weapon] || emptyWeaponObj;
// <PlayerTalk>"Ich besitzte {selectedWeapon.label}"</PlayerTalk>
