import { PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/GradientText";
import { BuffName } from "./buffData";
import { DebuffName } from "./debuffData";

export type ItemName =
    | "Nichts"
    | "Stein"
    | "Stock"
    | "Pilz"
    | "Plunder"
    | "Blume"
    | "Kupfererz"
    | "Leere Flasche"
    | "Wasserflasche"
    | "Lederstück"

export type ItemCartegoryName =
    | "Zeug"
    | "Nahrung"
    | "Material"

export function getRandomItem(possibleItems: ItemName[]) {
    const index = Math.floor(Math.random() * possibleItems.length);
    return possibleItems[index];
}

export type Item = {
    name: ItemName;
    label: JSX.Element
    category: ItemCartegoryName
    effects?: Partial<PlayerStats>;
    buff?: BuffName
    debuff?: DebuffName
    description: string
    ek: number
    vk: number
}

export const emptyItemObj: Item = {
    name: "Nichts",
    label: <GradientText>Nichts</GradientText>,
    category: "Zeug",
    description: "Nichts von Bedeutung.",
    ek: 0,
    vk: 0,
}

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
        name: "Pilz",
        label: <GradientText>Pilz</GradientText>,
        category: "Nahrung",
        description: "Ein essbarer Pilz. Stellt ein wenig Leben wieder her.",
        effects: { life: 5 },
        ek: 10,
        vk: 5,
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
        name: "Leere Flasche",
        label: <GradientText>Leere Flasche</GradientText>,
        category: "Zeug",
        description: "Eine leere Glasflasche. Kann mit Flüssigkeit gefüllt werden.",
        ek: 10,
        vk: 5,
    },
    {
        name: "Wasserflasche",
        label: <GradientText>Wasserflasche</GradientText>,
        category: "Nahrung",
        description: "Eine Flasche mit frischem Wasser. Stellt etwas Leben wieder her.",
        effects: { life: 10 },
        ek: 15,
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
];

export const itemMap: Record<string, Item> = items.reduce((map, item) => {
    map[item.name] = item;
    return map;
}, {} as Record<string, Item>);