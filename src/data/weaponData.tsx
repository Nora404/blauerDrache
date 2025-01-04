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





// ChatGPT hat mir geholfen die Preise zu finden. Er nutzte eine "geometrische Progression"
// Ich wollte seinen Vorschlag zur automatischen Berechnung erstmal nicht nutzten
// aber vielleicht ist es später noch hilfreich:

// Konfigurierbare Basiswerte
const basePrice = 25;
const finalPrice = 9999;
const totalWeapons = 15;
const priceMultiplier = Math.pow(finalPrice / basePrice, 1 / (totalWeapons - 1)); // ≈1.531882
const attackBase = 1;
const attackIncrement = 2;

// Liste der Waffennamen
const WeaponNames: WeaponName[] = [
    "Brotmeser",
    "Glasflasche",
    "Besenstiel",
    "Heugabel",
    "Übungsschwert",
    "Holzfälleraxt",
    "Tranchiermesser",
    "Heckenschere",
    "Schleuder",
    "Kurzschwert",
    "Hellebarde",
    "Kriegshammer",
    "Langschwert",
    "Morgenstern",
    "Drachentöter",
];

// Funktion zur Berechnung des Preises
const calculatePrice = (index: number): number => {
    const price = basePrice * Math.pow(priceMultiplier, index);
    return Math.round(price);
};

// Erstellung der Waffenliste
export const weaponsMap: Weapon[] = WeaponNames.map((name, index) => ({
    name,
    label: <GradientText>{name}</GradientText>,
    attack: attackBase + index * attackIncrement,
    price: calculatePrice(index),
}));

/* Resultierende Preise:
1. Brotmeser        - 25
2. Glasflasche      - 38
3. Besenstiel       - 58
4. Heugabel         - 89
5. Übungsschwert    - 137
6. Holzfälleraxt    - 210
7. Tranchiermesser  - 322
8. Heckenschere     - 492
9. Schleuder        - 755
10. Kurzschwert      - 1156
11. Hellebarde       - 1770
12. Kriegshammer     - 2710
13. Langschwert      - 4141
14. Morgenstern      - 6340
15. Drachentöter     - 9999
*/
