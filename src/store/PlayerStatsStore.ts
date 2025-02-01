import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerStats } from "./types";
import { RootStore } from "./rootStore";
import { BuffName } from "../data/buffData";
import { DebuffName } from "../data/debuffData";

export class PlayerStatsStore {
    rootStore: RootStore;
    data: PlayerStats = defaultGameStore.playerStats;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }


    setPlayerStats(val: Partial<PlayerStats>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updatePlayerStats(delta: Partial<PlayerStats>) {
        this.data.life += delta.life ?? 0;
        this.data.actionPoints += delta.actionPoints ?? 0;
        this.data.attack += delta.attack ?? 0;
        this.data.defense += delta.defense ?? 0;
        this.data.luck += delta.luck ?? 0;

        this.rootStore.saveToLocalStorage();
    }

    updateLife(delta: number) {
        const { maxLife } = this.rootStore.playerBase.data;
        const newLife = Math.min(
            Math.max(this.data.life + delta, 0),
            maxLife
        );
        this.data.life = newLife;
        this.rootStore.saveToLocalStorage();
    }

    updateActionPoints(delta: number) {
        const { maxActionPoints: maxRounds } = this.rootStore.playerBase.data;
        const newRounds = Math.min(
            Math.max(this.data.actionPoints + delta, 0),
            maxRounds
        );

        // Buff- und Debuff-Dauer anpassen, wenn Tatendrang verbraucht werden (delta < 0).
        if (delta < 0) {
            const absolute = Math.abs(delta);

            // Buffs reduzieren/entfernen
            const updatedBuffs = Object.fromEntries(
                Object.entries(this.rootStore.playerFlux.data.buff)
                    .map(([buffName, duration]) => {
                        const newDuration = (duration || 0) - absolute;
                        return [buffName, newDuration];
                    })
                    .filter(([_, d]) => (d as number) > 0)
            ) as Partial<Record<BuffName, number>>;

            // Debuffs reduzieren/entfernen
            const updatedDebuffs = Object.fromEntries(
                Object.entries(this.rootStore.playerFlux.data.debuff)
                    .map(([debuffName, duration]) => {
                        const newDuration = (duration || 0) - absolute;
                        return [debuffName, newDuration];
                    })
                    .filter(([_, d]) => (d as number) > 0)
            ) as Partial<Record<DebuffName, number>>;

            // Neue Buff-/Debuff-Daten in den PlayerFlux-Store speichern
            this.rootStore.playerFlux.data.buff = updatedBuffs;
            this.rootStore.playerFlux.data.debuff = updatedDebuffs;
        }

        this.data.actionPoints = newRounds;
        this.rootStore.saveToLocalStorage();
    }
}
