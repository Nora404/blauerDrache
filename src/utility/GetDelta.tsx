// getDelta.ts

import { buffMap, BuffName } from "../data/buffData";
import { debuffMap, DebuffName } from "../data/debuffData";
import { feelingMap } from "../data/feelingData";
import { GameStore, getScalingFactor } from "../store/newGameStore";

// types.ts oder eine ähnliche Datei

export type StatDelta = {
    buffs: number;
    debuffs: number;
    feeling: number;
}

export type Delta = {
    life: StatDelta;
    rounds: StatDelta;
    attack: StatDelta;
    defense: StatDelta;
    luck: StatDelta;
};

export function getDelta(store: GameStore): Delta {
    const delta: Delta = {
        life: { buffs: 0, debuffs: 0, feeling: 0 },
        rounds: { buffs: 0, debuffs: 0, feeling: 0 },
        attack: { buffs: 0, debuffs: 0, feeling: 0 },
        defense: { buffs: 0, debuffs: 0, feeling: 0 },
        luck: { buffs: 0, debuffs: 0, feeling: 0 },
    };

    const scalingFactor = getScalingFactor(store.playerBase.level);

    // Buffs
    for (const [buffName, currDuration] of Object.entries(store.playerFlux.buff)) {
        if (!currDuration) continue;
        const buff = buffMap[buffName as BuffName];
        if (!buff) continue;

        for (const [stat, value] of Object.entries(buff.effects)) {
            if (value !== undefined && stat in delta) {
                (delta[stat as keyof Delta] as StatDelta).buffs += Math.trunc((value ?? 0) * scalingFactor);
            }
        }
    }

    // Debuffs
    for (const [debuffName, currDuration] of Object.entries(store.playerFlux.debuff)) {
        if (!currDuration) continue;
        const debuff = debuffMap[debuffName as DebuffName];
        if (!debuff) continue;

        for (const [stat, value] of Object.entries(debuff.effects)) {
            if (value !== undefined && stat in delta) {
                (delta[stat as keyof Delta] as StatDelta).debuffs += Math.trunc((value ?? 0) * scalingFactor);
            }
        }
    }

    // Feeling
    const feeling = feelingMap[store.playerFlux.feeling];
    if (feeling && feeling.stats) {
        for (const [stat, value] of Object.entries(feeling.stats)) {
            if (value !== undefined && stat in delta) {
                (delta[stat as keyof Delta] as StatDelta).feeling += Math.trunc((value ?? 0) * scalingFactor);
            }
        }
    }

    return delta;
}
