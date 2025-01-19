// stores/GameStateStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, GameState } from "./types";
import { RootStore } from "./rootStore";

export class GameStateStore {
    rootStore: RootStore;
    data: GameState = defaultGameStore.gameState;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setGameState(val: Partial<GameState>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    setCurrentPath(path: string) {
        this.data.currentPath = path;
        this.rootStore.saveToLocalStorage();
    }

    updateGameSwitch(key: string, value: boolean) {
        this.data.switch[key] = value;
        this.rootStore.saveToLocalStorage();
    }

    updateEventQueue(eventId: string) {
        this.data.currentEventQueue.push(eventId);
        this.rootStore.saveToLocalStorage();
    }
}
