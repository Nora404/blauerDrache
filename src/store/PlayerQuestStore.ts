// stores/PlayerQuestStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerQuest } from "./types";
import { RootStore } from "./rootStore";
import { getGameQuestById, resetQuestProgress } from "../data/questData";

export class PlayerQuestStore {
  rootStore: RootStore;

  data: PlayerQuest = defaultGameStore.playerQuest;

  constructor(root: RootStore) {
    this.rootStore = root;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPlayerQuest(val: Partial<PlayerQuest>) {
    this.data = { ...this.data, ...val };
    this.rootStore.saveToLocalStorage();
  }

  updateQuest(questId: string, remove: boolean) {
    if (remove) {
      // Quest aus activeQuests entfernen
      const { [questId]: _, ...remainingActiveQuests } = this.data.activeQuests;
      this.data.activeQuests = remainingActiveQuests;
      this.rootStore.saveToLocalStorage();
      return;
    }

    const questToAdd = getGameQuestById(questId);

    if (!questToAdd) {
      // Ignoriere, wenn es die Quest nicht gibt
      return;
    }

    const alreadyActive = !!this.data.activeQuests[questId];
    const alreadyDone = this.data.completedQuest.includes(questId);

    // Wenn die Quest abgeschlossen ist und nicht wiederholbar ist -> Ignorieren
    if (alreadyDone && !questToAdd.repeat) {
      return;
    }

    const questProgress = JSON.parse(JSON.stringify(questToAdd.progress)); // Tiefe Kopie erstellen

    // Wenn die Quest abgeschlossen, aber wiederholbar ist
    if (alreadyDone && questToAdd.repeat) {
      // Entferne die Quest aus completedQuest
      const newCompleted = this.data.completedQuest.filter(
        (id) => id !== questId
      );
      this.data.completedQuest = newCompleted;

      // Setze den Fortschritt der Quest zurück
      const resetProgress = resetQuestProgress(questProgress);
      this.data.activeQuests = {
        ...this.data.activeQuests,
        [questId]: resetProgress,
      };
      this.rootStore.saveToLocalStorage();
      return;
    }

    // Wenn die Quest noch nie aktiv war
    if (!alreadyActive) {
      this.data.activeQuests = {
        ...this.data.activeQuests,
        [questId]: questProgress,
      };
    }

    this.rootStore.saveToLocalStorage();
  }

  updateCompletedQuests(questId: string) {
    // Quest zu completedQuests hinzufügen
    if (!this.data.completedQuest.includes(questId)) {
      this.data.completedQuest.push(questId);
    }
    this.rootStore.saveToLocalStorage();
  }

  updateProgress(action: "itemAdded" | "enemyKilled", payload: any) {
    // Kopie vom aktiven Quests-Objekt, damit wir sauber daran arbeiten können.
    const newActive = { ...this.data.activeQuests };

    for (const [questId, progress] of Object.entries(newActive)) {
      if (progress.isDone) continue;

      // Beispiel-Logik: bei "itemAdded" und "Besorgen"-Quests
      if (action === "itemAdded" && progress.type === "Besorgen") {
        // Wir erwarten payload.itemName, payload.quantity
        const haveItems = progress.task.haveItem ?? [];
        // Gibt es in haveItems einen Eintrag für payload.itemName?
        for (let itemObj of haveItems) {
          if (itemObj.item === payload.itemName) {
            itemObj.count += payload.quantity;
            // check, ob count >= need
            if (itemObj.count >= itemObj.need) {
              // => quest fertig? => wenn ALLE items erfüllt
              const allDone = haveItems.every((i) => i.count >= i.need);
              if (allDone) {
                progress.isDone = true;
                // In deinem alten Code: updateEventQueue(progress.eventByEnd);
                // Jetzt könntest du so was machen:
                this.rootStore.gameState.updateEventQueue(
                  progress.eventByEnd,
                  progress.path
                );
              }
            }
          }
        }
      }
      // else if (action === 'enemyKilled' && progress.type === 'Besiegen') { ... }
      newActive[questId] = progress;
    }

    this.data.activeQuests = newActive;
    this.rootStore.saveToLocalStorage();
  }
}
