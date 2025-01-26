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

    updateLeumund(addLeumund: number) {
        let newLeumund = this.data.leumund + addLeumund;
        let ruf = this.data.ruf;
        let currentLeumund = this.requiredExpForLevel(Math.abs(ruf) || 1);

        while (true) {
            if (newLeumund >= currentLeumund) {
                newLeumund -= currentLeumund;
                ruf += 1;
                currentLeumund = this.requiredExpForLevel(Math.abs(ruf) || 1);
            } else if (newLeumund < 0) {
                ruf -= 1;
                currentLeumund = this.requiredExpForLevel(Math.abs(ruf) || 1);
                newLeumund += currentLeumund;
            } else {
                break;
            }
        }

        this.data.ruf = ruf;
        this.data.nextLeumund = currentLeumund;
        this.data.leumund = newLeumund;

        this.rootStore.saveToLocalStorage();
    }

    requiredExpForLevel(level: number) {
        // Passt du an deine Formel an
        return 100 * level;
    }
}
