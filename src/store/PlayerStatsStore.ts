// stores/PlayerStatsStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerStats } from "./types";
import { RootStore } from "./rootStore";

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

    updateLife(delta: number) {
        // Brauchst du maxLife aus PlayerBaseStore:
        const { maxLife } = this.rootStore.playerBase.data;
        const newLife = Math.min(
            Math.max(this.data.life + delta, 0),
            maxLife
        );
        this.data.life = newLife;
        this.rootStore.saveToLocalStorage();
    }

    updateRounds(delta: number) {
        const { maxRounds } = this.rootStore.playerBase.data;
        const newRounds = Math.min(
            Math.max(this.data.rounds + delta, 0),
            maxRounds
        );
        this.data.rounds = newRounds;
        this.rootStore.saveToLocalStorage();

        // Beispiel: Buff-Debuff Reduzierung könntest du hier machen,
        // indem du auf playerFluxStore zugreifst:
        // this.rootStore.playerFluxStore.reduceBuffDurations(whatever);
    }
}
