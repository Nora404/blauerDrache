// stores/PlayerBaseStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerBase } from "./types";
import { RootStore } from "./rootStore";

export class PlayerBaseStore {
    rootStore: RootStore;

    playerBase: PlayerBase = defaultGameStore.playerBase;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updateExp(earnedExp: number) {
        const { playerStats } = this.rootStore.playerStatsStore;

        let newExp = this.playerBase.exp + earnedExp;
        let { level, nextLevel, maxLife } = this.playerBase;
        let { attack, defense, luck, life } = playerStats;

        while (newExp >= nextLevel) {
            newExp -= nextLevel;
            level += 1;
            attack += 2;
            defense += 2;
            luck += 1;
            life += 5;
            maxLife += 5;
            nextLevel = this.requiredExpForLevel(level);
        }

        this.playerBase.exp = newExp;
        this.playerBase.level = level;
        this.playerBase.nextLevel = nextLevel;
        this.playerBase.maxLife = maxLife;

        // PlayerStats aktualisieren
        playerStats.attack = attack;
        playerStats.defense = defense;
        playerStats.luck = luck;
        playerStats.life = life;

        this.rootStore.saveToLocalStorage();
    }

    updateReputation(earnedRep: number) {
        let newRep = this.playerBase.reputation + earnedRep;
        let standing = this.playerBase.standing;
        let currentReq = this.requiredExpForLevel(Math.abs(standing) || 1);

        while (true) {
            if (newRep >= currentReq) {
                newRep -= currentReq;
                standing += 1;
                currentReq = this.requiredExpForLevel(Math.abs(standing) || 1);
            } else if (newRep < 0) {
                standing -= 1;
                currentReq = this.requiredExpForLevel(Math.abs(standing) || 1);
                newRep += currentReq;
            } else {
                break;
            }
        }

        this.playerBase.standing = standing;
        this.playerBase.nextReputation = currentReq;
        this.playerBase.reputation = newRep;

        this.rootStore.saveToLocalStorage();
    }

    requiredExpForLevel(level: number) {
        // Passt du an deine Formel an
        return 100 * level;
    }
}
