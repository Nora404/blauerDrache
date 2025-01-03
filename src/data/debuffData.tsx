import { PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/GradientText";

export type DebuffName = "Schwäche" | "Pechvogel";

export type Debuff = {
    name: DebuffName;
    label: JSX.Element;
    description: string;
    effects: Partial<PlayerStats>;
    duration: number; // Dauer in Runden
    currentDuration: number;
};

export const debuffs: Debuff[] = [
    {
        name: "Schwäche",
        label: <GradientText>Schwäche</GradientText>,
        description: "Reduziert den Angriff für eine begrenzte Zeit.",
        effects: { attack: -5 },
        duration: 4, // 4 Runden
        currentDuration: 4, // 4 Runden
    },
    {
        name: "Pechvogel",
        label: <GradientText>Pechvogel</GradientText>,
        description: "Verringert das Glück für eine begrenzte Zeit.",
        effects: { luck: -7 },
        duration: 6, // 6 Runden
        currentDuration: 6, // 6 Runden
    },
];

export const debuffMap: Record<string, Debuff> = debuffs.reduce((map, debuff) => {
    map[debuff.name] = debuff;
    return map;
}, {} as Record<string, Debuff>);
