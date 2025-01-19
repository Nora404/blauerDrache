// stores/PlayerQuestStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerQuest } from "./types";
import { RootStore } from "./rootStore";
import { getGameQuestById, resetQuestProgress } from "../data/questData";

export class PlayerQuestStore {
    rootStore: RootStore;

    store: PlayerQuest = defaultGameStore.playerQuest;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerQuest(val: Partial<PlayerQuest>) {
        this.store = { ...this.store, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updateQuest(questId: string, remove: boolean) {
        if (remove) {
            // Quest aus activeQuests entfernen
            const { [questId]: _, ...remainingActiveQuests } = this.store.activeQuests;
            this.store.activeQuests = remainingActiveQuests;
            this.rootStore.saveToLocalStorage();
            return;
        }

        const questToAdd = getGameQuestById(questId);

        if (!questToAdd) {
            // Ignoriere, wenn es die Quest nicht gibt
            return;
        }

        const alreadyActive = !!this.store.activeQuests[questId];
        const alreadyDone = this.store.completedQuest.includes(questId);

        // Wenn die Quest abgeschlossen ist und nicht wiederholbar ist -> Ignorieren
        if (alreadyDone && !questToAdd.repeat) {
            return;
        }

        const questProgress = JSON.parse(JSON.stringify(questToAdd.progress)); // Tiefe Kopie erstellen

        // Wenn die Quest abgeschlossen, aber wiederholbar ist
        if (alreadyDone && questToAdd.repeat) {
            // Entferne die Quest aus completedQuest
            const newCompleted = this.store.completedQuest.filter((id) => id !== questId);
            this.store.completedQuest = newCompleted;

            // Setze den Fortschritt der Quest zurück
            const resetProgress = resetQuestProgress(questProgress);
            this.store.activeQuests = {
                ...this.store.activeQuests,
                [questId]: resetProgress,
            };
            this.rootStore.saveToLocalStorage();
            return;
        }

        // Wenn die Quest noch nie aktiv war
        if (!alreadyActive) {
            this.store.activeQuests = {
                ...this.store.activeQuests,
                [questId]: questProgress,
            };
        }

        this.rootStore.saveToLocalStorage();
    }

    updateCompletedQuests(questId: string) {
        // Quest zu completedQuests hinzufügen
        if (!this.store.completedQuest.includes(questId)) {
            this.store.completedQuest.push(questId);
        }
        this.rootStore.saveToLocalStorage();
    }
}