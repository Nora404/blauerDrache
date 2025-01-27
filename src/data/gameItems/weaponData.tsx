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
  description: "Eine Waffe",
  category: "Waffen",
  attack: 0,
  ek: 0,
};

export const weapons: Weapon[] = [
  {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 0,
    ek: 0,
  },
  {
    name: "Brotmeser",
    label: <GradientText>Brotmeser</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 1,
    ek: 25,
  },
  {
    name: "Glasflasche",
    label: <GradientText>Glasflasche</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 3,
    ek: 38,
  },
  {
    name: "Besenstiel",
    label: <GradientText>Besenstiel</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 5,
    ek: 58,
  },
  {
    name: "Heugabel",
    label: <GradientText>Heugabel</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 7,
    ek: 89,
  },
  {
    name: "Übungsschwert",
    label: <GradientText>Übungsschwert</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 9,
    ek: 137,
  },
  {
    name: "Holzfälleraxt",
    label: <GradientText>Holzfälleraxt</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 11,
    ek: 210,
  },
  {
    name: "Tranchiermesser",
    label: <GradientText>Tranchiermesser</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 13,
    ek: 322,
  },
  {
    name: "Heckenschere",
    label: <GradientText>Heckenschere</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 15,
    ek: 492,
  },
  {
    name: "Schleuder",
    label: <GradientText>Schleuder</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 17,
    ek: 755,
  },
  {
    name: "Kurzschwert",
    label: <GradientText>Kurzschwert</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 19,
    ek: 1156,
  },
  {
    name: "Hellebarde",
    label: <GradientText>Hellebarde</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 21,
    ek: 1770,
  },
  {
    name: "Kriegshammer",
    label: <GradientText>Kriegshammer</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 23,
    ek: 2710,
  },
  {
    name: "Langschwert",
    label: <GradientText>Langschwert</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 25,
    ek: 4141,
  },
  {
    name: "Morgenstern",
    label: <GradientText>Morgenstern</GradientText>,
    description: "Eine Waffe",
    category: "Waffen",
    attack: 27,
    ek: 6340,
  },
  {
    name: "Drachentöter",
    label: <GradientText>Drachentöter</GradientText>,
    description: "Eine Waffe",
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
