// stores/rootStore.ts
import { makeAutoObservable } from "mobx";
import { ActiveBuff, ActiveDebuff, defaultGameStore, Delta, GameStore, StatDelta } from "./types";
import { TimeStore } from "./TimeStore";
import { GameStateStore } from "./GameStateStore";
import { PlayerMetaStore } from "./PlayerMetaStore";
import { PlayerStatsStore } from "./PlayerStatsStore";
import { PlayerBaseStore } from "./PlayerBaseStore";
import { PlayerFluxStore } from "./PlayerFluxStore";
import { PlayerEconomyStore } from "./PlayerEconomyStore";
import { PlayerQuestStore } from "./PlayerQuestStore";
import { emptyOriginObj, originMap } from "../data/originData";
import { emptyRaceObj, racesMap } from "../data/raceData";
import { callingMap, emptyCallingObj } from "../data/callingData";
import { emptyFeelingObj, feelingMap } from "../data/feelingData";
import { emptyWeaponObj, weaponMap } from "../data/weaponData";
import { armorMap, emptyArmorObj } from "../data/armorData";
import { emptyItemObj, itemMap } from "../data/ItemData";
import { buffMap, BuffName } from "../data/buffData";
import { debuffMap, DebuffName } from "../data/debuffData";
import { getScalingFactor } from "../utility/Progression";

export class RootStore {
    // Sub-Stores
    gameTime: TimeStore;
    gameState: GameStateStore;
    playerMeta: PlayerMetaStore;
    playerStats: PlayerStatsStore;
    playerBase: PlayerBaseStore;
    playerFlux: PlayerFluxStore;
    playerEconomy: PlayerEconomyStore;
    playerQuest: PlayerQuestStore;

    constructor() {
        // Erzeuge alle Substores, übergebe "this"
        this.gameTime = new TimeStore(this);
        this.gameState = new GameStateStore(this);
        this.playerMeta = new PlayerMetaStore(this);
        this.playerStats = new PlayerStatsStore(this);
        this.playerBase = new PlayerBaseStore(this);
        this.playerFlux = new PlayerFluxStore(this);
        this.playerEconomy = new PlayerEconomyStore(this);
        this.playerQuest = new PlayerQuestStore(this);

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
            this.gameTime.store = parsed.gameTime ?? defaultGameStore.gameTime;
            this.gameState.store = parsed.gameState ?? defaultGameStore.gameState;
            this.playerMeta.store = parsed.playerMeta ?? defaultGameStore.playerMeta;
            this.playerStats.store = parsed.playerStats ?? defaultGameStore.playerStats;
            this.playerBase.store = parsed.playerBase ?? defaultGameStore.playerBase;
            this.playerFlux.store = parsed.playerFlux ?? defaultGameStore.playerFlux;
            this.playerEconomy.store = parsed.playerEconomy ?? defaultGameStore.playerEconomy;
            this.playerQuest.store = parsed.playerQuest ?? defaultGameStore.playerQuest;
        } catch (error) {
            console.error("Error loading store:", error);
        }
    }

    saveToLocalStorage() {
        const storeForSave = {
            gameTime: this.gameTime.store,
            gameState: this.gameState.store,
            playerMeta: this.playerMeta.store,
            playerStats: this.playerStats.store,
            playerBase: this.playerBase.store,
            playerFlux: this.playerFlux.store,
            playerEconomy: this.playerEconomy.store,
            playerQuest: this.playerQuest.store,
        };
        localStorage.setItem("myGameStore", JSON.stringify(storeForSave));
    }

    resetGameData() {
        this.gameTime.store = defaultGameStore.gameTime;
        this.gameState.store = defaultGameStore.gameState;
        this.playerMeta.store = defaultGameStore.playerMeta;
        this.playerStats.store = defaultGameStore.playerStats;
        this.playerBase.store = defaultGameStore.playerBase;
        this.playerFlux.store = defaultGameStore.playerFlux;
        this.playerEconomy.store = defaultGameStore.playerEconomy;
        this.playerQuest.store = defaultGameStore.playerQuest;

        this.saveToLocalStorage();
    }

    getCombinedStats() {
        const { store: playerStats } = this.playerStats;
        const { store: playerBase } = this.playerBase;
        const { store: playerFlux } = this.playerFlux;

        let life = playerStats.life;
        let rounds = playerStats.rounds;
        let attack = playerStats.attack;
        let defense = playerStats.defense;
        let luck = playerStats.luck;
        let maxLife = playerBase.maxLife;
        let maxRounds = playerBase.maxRounds;

        attack += weaponMap[playerFlux.weapon].attack ?? 0;
        defense += armorMap[playerFlux.armor].defense ?? 0;

        const scalingFactor = getScalingFactor(playerBase.level);

        // mit Math.trunc werden alle Nachkommazahlen abgeschnitten
        // Durch die Klammern wird die richtige Reihenfolge der berechnung garantiert
        // der scalingFactor mit dem Level soll verhindern das Elemente unwichtig werden
        for (const [buffName, currDuration] of Object.entries(playerFlux.buff)) {
            if (!currDuration) continue;
            const buff = buffMap[buffName as BuffName];
            if (!buff) continue;

            life += Math.trunc((buff.effects.life ?? 0) * scalingFactor);
            rounds += Math.trunc(buff.effects.rounds ?? 0);
            attack += Math.trunc((buff.effects.attack ?? 0) * scalingFactor);
            defense += Math.trunc((buff.effects.defense ?? 0) * scalingFactor);
            luck += Math.trunc((buff.effects.luck ?? 0) * scalingFactor);
            maxLife += Math.trunc((buff.effects.life ?? 0) * scalingFactor);
            maxRounds += Math.trunc((buff.effects.rounds ?? 0) * scalingFactor);
        }

        for (const [debuffName, currDuration] of Object.entries(playerFlux.debuff)) {
            if (!currDuration) continue;
            const debuff = debuffMap[debuffName as DebuffName];
            if (!debuff) continue;

            life += Math.trunc((debuff.effects.life ?? 0) * scalingFactor);
            rounds += Math.trunc(debuff.effects.rounds ?? 0);
            attack += Math.trunc((debuff.effects.attack ?? 0) * scalingFactor);
            defense += Math.trunc((debuff.effects.defense ?? 0) * scalingFactor);
            luck += Math.trunc((debuff.effects.luck ?? 0) * scalingFactor);
            maxLife += Math.trunc((debuff.effects.life ?? 0) * scalingFactor);
            maxRounds += Math.trunc((debuff.effects.rounds ?? 0) * scalingFactor);
        }

        const feeling = feelingMap[playerFlux.feeling];
        life += Math.trunc((feeling.stats.life ?? 0) * scalingFactor);
        rounds += Math.trunc(feeling.stats.rounds ?? 0);
        attack += Math.trunc((feeling.stats.attack ?? 0) * scalingFactor);
        defense += Math.trunc((feeling.stats.defense ?? 0) * scalingFactor);
        luck += Math.trunc((feeling.stats.luck ?? 0) * scalingFactor);
        maxLife += Math.trunc((feeling.stats.life ?? 0) * scalingFactor);
        maxRounds += Math.trunc((feeling.stats.rounds ?? 0) * scalingFactor);

        // Sicherstellen, dass die kombinierten Werte innerhalb der Grenzen bleiben
        life = Math.max(life, 0), maxLife;
        rounds = Math.max(rounds, 0), maxRounds;
        attack = Math.max(attack, 0);
        defense = Math.max(defense, 0);
        luck = Math.max(luck, 0);

        return { life, rounds, attack, defense, luck, maxLife, maxRounds };
    }

    get storeData(): GameStore {
        return {
            gameState: this.gameState.store,
            gameTime: this.gameTime.store,
            playerStats: this.playerStats.store,
            playerBase: this.playerBase.store,
            playerFlux: this.playerFlux.store,
            playerMeta: this.playerMeta.store,
            playerEconomy: this.playerEconomy.store,
            playerQuest: this.playerQuest.store,
        };
    }

    getPlayerObj() {
        const race = racesMap[this.playerMeta.store.race] ?? emptyRaceObj;
        const origin = originMap[this.playerMeta.store.origin] ?? emptyOriginObj;
        const calling = callingMap[this.playerMeta.store.calling] ?? emptyCallingObj;
        const feeling = feelingMap[this.playerFlux.store.feeling] ?? emptyFeelingObj;
        const weapon = weaponMap[this.playerFlux.store.weapon] ?? emptyWeaponObj;
        const armor = armorMap[this.playerFlux.store.armor] ?? emptyArmorObj;
        const item = itemMap[this.playerFlux.store.item] ?? emptyItemObj;

        const buffs: ActiveBuff[] = Object.entries(this.playerFlux.store.buff)
            .map(([buffName, duration]) => {
                const buff = buffMap[buffName as BuffName];
                if (!buff) return null;
                return { ...buff, currentDuration: duration };
            })
            .filter((buff): buff is ActiveBuff => buff !== null) ?? []; // Type Guard, um null-Werte zu entfernen

        const debuffs: ActiveDebuff[] = Object.entries(this.playerFlux.store.debuff)
            .map(([debuffName, duration]) => {
                const debuff = debuffMap[debuffName as DebuffName];
                if (!debuff) return null;
                return { ...debuff, currentDuration: duration };
            })
            .filter((debuff): debuff is ActiveDebuff => debuff !== null) ?? [];


        return { race, origin, calling, feeling, weapon, armor, item, buffs, debuffs }
    }

    getDelta(): Delta {
        const delta: Delta = {
            life: { buffs: 0, debuffs: 0, feeling: 0 },
            rounds: { buffs: 0, debuffs: 0, feeling: 0 },
            attack: { buffs: 0, debuffs: 0, feeling: 0 },
            defense: { buffs: 0, debuffs: 0, feeling: 0 },
            luck: { buffs: 0, debuffs: 0, feeling: 0 },
        };

        const scalingFactor = getScalingFactor(this.playerBase.store.level);

        // Buffs
        for (const [buffName, currDuration] of Object.entries(this.playerFlux.store.buff)) {
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
        for (const [debuffName, currDuration] of Object.entries(this.playerFlux.store.debuff)) {
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
        const feeling = feelingMap[this.playerFlux.store.feeling];
        if (feeling && feeling.stats) {
            for (const [stat, value] of Object.entries(feeling.stats)) {
                if (value !== undefined && stat in delta) {
                    (delta[stat as keyof Delta] as StatDelta).feeling += Math.trunc((value ?? 0) * scalingFactor);
                }
            }
        }

        return delta;
    }
}
