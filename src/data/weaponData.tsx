import { GradientText } from "../utility/GradientText";


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


export type Weapon = {
    name: WeaponName | string;
    label: JSX.Element;
    attack: number;
    price: number;
};

export const emptyWeaponObj: Weapon = {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    attack: 0,
    price: 0,
};

export const weapons: Weapon[] = [
    {
        name: "Nichts",
        label: <GradientText>Nichts</GradientText>,
        attack: 0,
        price: 0,
    },
    {
        name: "Brotmeser",
        label: <GradientText>Brotmeser</GradientText>,
        attack: 1,
        price: 25,
    },
    {
        name: "Glasflasche",
        label: <GradientText>Glasflasche</GradientText>,
        attack: 3,
        price: 38,
    },
    {
        name: "Besenstiel",
        label: <GradientText>Besenstiel</GradientText>,
        attack: 5,
        price: 58,
    },
    {
        name: "Heugabel",
        label: <GradientText>Heugabel</GradientText>,
        attack: 7,
        price: 89,
    },
    {
        name: "Übungsschwert",
        label: <GradientText>Übungsschwert</GradientText>,
        attack: 9,
        price: 137,
    },
    {
        name: "Holzfälleraxt",
        label: <GradientText>Holzfälleraxt</GradientText>,
        attack: 11,
        price: 210,
    },
    {
        name: "Tranchiermesser",
        label: <GradientText>Tranchiermesser</GradientText>,
        attack: 13,
        price: 322,
    },
    {
        name: "Heckenschere",
        label: <GradientText>Heckenschere</GradientText>,
        attack: 15,
        price: 492,
    },
    {
        name: "Schleuder",
        label: <GradientText>Schleuder</GradientText>,
        attack: 17,
        price: 755,
    },
    {
        name: "Kurzschwert",
        label: <GradientText>Kurzschwert</GradientText>,
        attack: 19,
        price: 1156,
    },
    {
        name: "Hellebarde",
        label: <GradientText>Hellebarde</GradientText>,
        attack: 21,
        price: 1770,
    },
    {
        name: "Kriegshammer",
        label: <GradientText>Kriegshammer</GradientText>,
        attack: 23,
        price: 2710,
    },
    {
        name: "Langschwert",
        label: <GradientText>Langschwert</GradientText>,
        attack: 25,
        price: 4141,
    },
    {
        name: "Morgenstern",
        label: <GradientText>Morgenstern</GradientText>,
        attack: 27,
        price: 6340,
    },
    {
        name: "Drachentöter",
        label: <GradientText>Drachentöter</GradientText>,
        attack: 29,
        price: 10000,
    },
]

export const weaponMap: Record<string, Weapon> = weapons.reduce((map, weapon) => {
    map[weapon.name] = weapon;
    return map;
}, {} as Record<string, Weapon>);

// ANWENDUNG
// const selectedWeapon = weaponMap[gameStore.equipment.weapon] || emptyWeaponObj;
// <PlayerTalk>"Ich besitzte {selectedWeapon.label}"</PlayerTalk>
