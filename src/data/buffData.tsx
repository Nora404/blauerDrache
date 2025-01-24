import { PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/Formatted/GradientText";

export type BuffName = "Eisenhaut" | "Kampfgeist" | "Gütig";

export type Buff = {
    name: BuffName;
    label: JSX.Element;
    description: string;
    effects: Partial<PlayerStats>;
    duration: number; // Dauer in Runden
};

export const buffs: Buff[] = [
    {
        name: "Eisenhaut",
        label: <GradientText>Eisenhaut</GradientText>,
        description: "Erhöht die Verteidigung für eine begrenzte Zeit.",
        effects: { defense: 5 },
        duration: 5, // 5 Runden
    },
    {
        name: "Kampfgeist",
        label: <GradientText>Kampfgeist</GradientText>,
        description: "Erhöht den Angriff für eine begrenzte Zeit.",
        effects: { attack: 5 },
        duration: 3, // 3 Runden
    },
    {
        name: "Gütig",
        label: <GradientText>Gütig</GradientText>,
        description: "Deine guten Taten bringen dir Glück",
        effects: { luck: 5 },
        duration: 4, // 3 Runden
    },
];

export const buffMap: Record<string, Buff> = buffs.reduce((map, buff) => {
    map[buff.name] = buff;
    return map;
}, {} as Record<string, Buff>);
