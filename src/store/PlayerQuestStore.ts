// stores/PlayerQuestStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerQuest } from "./types";
import { RootStore } from "./rootStore";

export class PlayerQuestStore {
    rootStore: RootStore;

    playerQuest: PlayerQuest = defaultGameStore.playerQuest;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerQuest(val: Partial<PlayerQuest>) {
        this.playerQuest = { ...this.playerQuest, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updateQuest(questId: string, remove: boolean) {
        if (remove) {
            const { [questId]: _, ...rest } = this.playerQuest.activeQuests;
            this.playerQuest.activeQuests = rest;
            this.rootStore.saveToLocalStorage();
            return;
        }
        // Sonst hinzufügen (Dummy):
        this.playerQuest.activeQuests[questId] = { isDone: false };
        this.rootStore.saveToLocalStorage();
    }

    updateCompletedQuests(questId: string) {
        this.playerQuest.completedQuest.push(questId);
        this.rootStore.saveToLocalStorage();
    }
}
