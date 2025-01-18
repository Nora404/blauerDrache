// stores/PlayerStatsStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerStats } from "./types";
import { RootStore } from "./rootStore";

export class PlayerStatsStore {
    rootStore: RootStore;

    playerStats: PlayerStats = defaultGameStore.playerStats;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerStats(val: Partial<PlayerStats>) {
        this.playerStats = { ...this.playerStats, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updateLife(delta: number) {
        // Brauchst du maxLife aus PlayerBaseStore:
        const { maxLife } = this.rootStore.playerBaseStore.playerBase;
        const newLife = Math.min(
            Math.max(this.playerStats.life + delta, 0),
            maxLife
        );
        this.playerStats.life = newLife;
        this.rootStore.saveToLocalStorage();
    }

    updateRounds(delta: number) {
        const { maxRounds } = this.rootStore.playerBaseStore.playerBase;
        const newRounds = Math.min(
            Math.max(this.playerStats.rounds + delta, 0),
            maxRounds
        );
        this.playerStats.rounds = newRounds;
        this.rootStore.saveToLocalStorage();

        // Beispiel: Buff-Debuff Reduzierung könntest du hier machen,
        // indem du auf playerFluxStore zugreifst:
        // this.rootStore.playerFluxStore.reduceBuffDurations(whatever);
    }
}
