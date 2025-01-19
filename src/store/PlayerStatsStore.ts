// stores/PlayerStatsStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerStats } from "./types";
import { RootStore } from "./rootStore";

export class PlayerStatsStore {
    rootStore: RootStore;

    store: PlayerStats = defaultGameStore.playerStats;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerStats(val: Partial<PlayerStats>) {
        this.store = { ...this.store, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updateLife(delta: number) {
        // Brauchst du maxLife aus PlayerBaseStore:
        const { maxLife } = this.rootStore.playerBase.store;
        const newLife = Math.min(
            Math.max(this.store.life + delta, 0),
            maxLife
        );
        this.store.life = newLife;
        this.rootStore.saveToLocalStorage();
    }

    updateRounds(delta: number) {
        const { maxRounds } = this.rootStore.playerBase.store;
        const newRounds = Math.min(
            Math.max(this.store.rounds + delta, 0),
            maxRounds
        );
        this.store.rounds = newRounds;
        this.rootStore.saveToLocalStorage();

        // Beispiel: Buff-Debuff Reduzierung könntest du hier machen,
        // indem du auf playerFluxStore zugreifst:
        // this.rootStore.playerFluxStore.reduceBuffDurations(whatever);
    }
}
