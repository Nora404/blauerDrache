import { GradientText } from "../utility/GradientText";


export type ArmorName =
    | "Socken"
    | "Nachthemd "
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


export type Armor = {
    name: ArmorName | string;
    label: JSX.Element;
    defense: number;
    price: number;
};

export const emptyWeaponObj: Armor = {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    defense: 0,
    price: 0,
}

export const armors: Armor[] = [
    {
        name: "Socken",
        label: <GradientText>Socken</GradientText>,
        defense: 1,
        price: 35,
    },
    {
        name: "Nachthemd",
        label: <GradientText>Nachthemd</GradientText>,
        defense: 3,
        price: 53,
    },
    {
        name: "Handschuhe",
        label: <GradientText>Handschuhe</GradientText>,
        defense: 5,
        price: 80,
    },
    {
        name: "Stoffweste",
        label: <GradientText>Stoffweste</GradientText>,
        defense: 7,
        price: 122,
    },
    {
        name: "Wickelrock",
        label: <GradientText>Wickelrock</GradientText>,
        defense: 9,
        price: 185,
    },
    {
        name: "Strickpullover",
        label: <GradientText>Strickpullover</GradientText>,
        defense: 11,
        price: 280,
    },
    {
        name: "Lederhose",
        label: <GradientText>Lederhose</GradientText>,
        defense: 13,
        price: 425,
    },
    {
        name: "Übergangsjacke",
        label: <GradientText>Übergangsjacke</GradientText>,
        defense: 15,
        price: 644,
    },
    {
        name: "Wanderschuhe",
        label: <GradientText>Wanderschuhe</GradientText>,
        defense: 17,
        price: 977,
    },
    {
        name: "Wollumhang",
        label: <GradientText>Wollumhang</GradientText>,
        defense: 19,
        price: 1480,
    },
    {
        name: "Lederjacke",
        label: <GradientText>Lederjacke</GradientText>,
        defense: 21,
        price: 2243,
    },
    {
        name: "Winterkleid",
        label: <GradientText>Winterkleid</GradientText>,
        defense: 23,
        price: 3402,
    },
    {
        name: "Kettenhemd",
        label: <GradientText>Kettenhemd</GradientText>,
        defense: 25,
        price: 5163,
    },
    {
        name: "Ritterrüstung",
        label: <GradientText>Ritterrüstung</GradientText>,
        defense: 27,
        price: 7754,
    },
    {
        name: "Drachenrüstung",
        label: <GradientText>Drachenrüstung</GradientText>,
        defense: 29,
        price: 12000,
    },
];

export const armorMap: Record<string, Armor> = armors.reduce((map, armor) => {
    map[armor.name] = armor;
    return map;
}, {} as Record<string, Armor>);

// ANWENDUNG
// const selectedArmor = armorMap[gameStore.equipment.armor] || emptyArmorObj;
// <PlayerTalk>"Ich besitzte {selectedArmor.label}"</PlayerTalk>