import { PlayerStats } from "../store/types";
import { GradientText } from "../utility/Formatted/GradientText";

export type DebuffName = "Schwäche" | "Pechvogel";

export type Debuff = {
    name: DebuffName;
    label: JSX.Element;
    description: string;
    effects: Partial<PlayerStats>;
    duration: number;
};

export const debuffs: Debuff[] = [
    {
        name: "Schwäche",
        label: <GradientText>Schwäche</GradientText>,
        description: "Reduziert den Angriff für eine begrenzte Zeit.",
        effects: { attack: -5 },
        duration: 4,
    },
    {
        name: "Pechvogel",
        label: <GradientText>Pechvogel</GradientText>,
        description: "Verringert das Glück für eine begrenzte Zeit.",
        effects: { luck: -5 },
        duration: 6,
    },
];

export const debuffMap: Record<string, Debuff> = debuffs.reduce((map, debuff) => {
    map[debuff.name] = debuff;
    return map;
}, {} as Record<string, Debuff>);
