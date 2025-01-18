// stores/rootStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, GameStore } from "./types";
import { TimeStore } from "./TimeStore";
import { GameStateStore } from "./GameStateStore";
import { PlayerMetaStore } from "./PlayerMetaStore";
import { PlayerStatsStore } from "./PlayerStatsStore";
import { PlayerBaseStore } from "./PlayerBaseStore";
import { PlayerFluxStore } from "./PlayerFluxStore";
import { PlayerEconomyStore } from "./PlayerEconomyStore";
import { PlayerQuestStore } from "./PlayerQuestStore";

export class RootStore {
    // Sub-Stores
    timeStore: TimeStore;
    gameStateStore: GameStateStore;
    playerMetaStore: PlayerMetaStore;
    playerStatsStore: PlayerStatsStore;
    playerBaseStore: PlayerBaseStore;
    playerFluxStore: PlayerFluxStore;
    playerEconomyStore: PlayerEconomyStore;
    playerQuestStore: PlayerQuestStore;

    constructor() {
        // Erzeuge alle Substores, übergebe "this"
        this.timeStore = new TimeStore(this);
        this.gameStateStore = new GameStateStore(this);
        this.playerMetaStore = new PlayerMetaStore(this);
        this.playerStatsStore = new PlayerStatsStore(this);
        this.playerBaseStore = new PlayerBaseStore(this);
        this.playerFluxStore = new PlayerFluxStore(this);
        this.playerEconomyStore = new PlayerEconomyStore(this);
        this.playerQuestStore = new PlayerQuestStore(this);

        // Laden oder Standard
        this.loadFromLocalStorage();

        makeAutoObservable(this, {}, { autoBind: true });
    }

    // == Storage ==
    loadFromLocalStorage() {
        try {
            const saved = localStorage.getItem("myGameStore");
            if (!saved) return;
            const parsed = JSON.parse(saved);

            // Wende parse auf alle Substores an:
            this.timeStore.gameTime = parsed.gameTime ?? defaultGameStore.gameTime;
            this.gameStateStore.gameState = parsed.gameState ?? defaultGameStore.gameState;
            this.playerMetaStore.playerMeta = parsed.playerMeta ?? defaultGameStore.playerMeta;
            this.playerStatsStore.playerStats = parsed.playerStats ?? defaultGameStore.playerStats;
            this.playerBaseStore.playerBase = parsed.playerBase ?? defaultGameStore.playerBase;
            this.playerFluxStore.playerFlux = parsed.playerFlux ?? defaultGameStore.playerFlux;
            this.playerEconomyStore.playerEconomy = parsed.playerEconomy ?? defaultGameStore.playerEconomy;
            this.playerQuestStore.playerQuest = parsed.playerQuest ?? defaultGameStore.playerQuest;
        } catch (error) {
            console.error("Error loading store:", error);
        }
    }

    saveToLocalStorage() {
        const storeForSave = {
            gameTime: this.timeStore.gameTime,
            gameState: this.gameStateStore.gameState,
            playerMeta: this.playerMetaStore.playerMeta,
            playerStats: this.playerStatsStore.playerStats,
            playerBase: this.playerBaseStore.playerBase,
            playerFlux: this.playerFluxStore.playerFlux,
            playerEconomy: this.playerEconomyStore.playerEconomy,
            playerQuest: this.playerQuestStore.playerQuest,
        };
        localStorage.setItem("myGameStore", JSON.stringify(storeForSave));
    }

    // == Beispiel: kombiniertes Berechnen ==
    getCombinedStats() {
        const { playerStats } = this.playerStatsStore;
        const { playerBase } = this.playerBaseStore;
        const { playerFlux } = this.playerFluxStore;

        // z.B. Waffe oder Buffs
        // ... hier könntest du alles zusammenmischen ...
        return {
            ...playerStats,
            maxLife: playerBase.maxLife,
            buffCount: Object.keys(playerFlux.buff).length,
        };
    }

    resetGameData() {
        this.timeStore.gameTime = defaultGameStore.gameTime;
        this.gameStateStore.gameState = defaultGameStore.gameState;
        this.playerMetaStore.playerMeta = defaultGameStore.playerMeta;
        this.playerStatsStore.playerStats = defaultGameStore.playerStats;
        this.playerBaseStore.playerBase = defaultGameStore.playerBase;
        this.playerFluxStore.playerFlux = defaultGameStore.playerFlux;
        this.playerEconomyStore.playerEconomy = defaultGameStore.playerEconomy;
        this.playerQuestStore.playerQuest = defaultGameStore.playerQuest;

        this.saveToLocalStorage();
    }

    get storeData(): GameStore {
        return {
            gameState: this.gameStateStore.gameState,
            gameTime: this.timeStore.gameTime,
            playerStats: this.playerStatsStore.playerStats,
            playerBase: this.playerBaseStore.playerBase,
            playerFlux: this.playerFluxStore.playerFlux,
            playerMeta: this.playerMetaStore.playerMeta,
            playerEconomy: this.playerEconomyStore.playerEconomy,
            playerQuest: this.playerQuestStore.playerQuest,
        };
    }
}
