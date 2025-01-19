// stores/PlayerBaseStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerBase } from "./types";
import { RootStore } from "./rootStore";

export class PlayerBaseStore {
    rootStore: RootStore;

    data: PlayerBase = defaultGameStore.playerBase;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerBase(val: Partial<PlayerBase>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updateExp(earnedExp: number) {
        const { data: playerStats } = this.rootStore.playerStats;

        let newExp = this.data.exp + earnedExp;
        let { level, nextLevel, maxLife } = this.data;
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

        this.data.exp = newExp;
        this.data.level = level;
        this.data.nextLevel = nextLevel;
        this.data.maxLife = maxLife;

        // PlayerStats aktualisieren
        playerStats.attack = attack;
        playerStats.defense = defense;
        playerStats.luck = luck;
        playerStats.life = life;

        this.rootStore.saveToLocalStorage();
    }

    updateReputation(earnedRep: number) {
        let newRep = this.data.reputation + earnedRep;
        let standing = this.data.standing;
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

        this.data.standing = standing;
        this.data.nextReputation = currentReq;
        this.data.reputation = newRep;

        this.rootStore.saveToLocalStorage();
    }

    requiredExpForLevel(level: number) {
        // Passt du an deine Formel an
        return 100 * level;
    }
}
