// stores/GameStateStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, GameState } from "./types";
import { RootStore } from "./rootStore";

export class GameStateStore {
    rootStore: RootStore;
    store: GameState = defaultGameStore.gameState;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setGameState(val: Partial<GameState>) {
        this.store = { ...this.store, ...val };
        this.rootStore.saveToLocalStorage();
    }

    setCurrentPath(path: string) {
        this.store.currentPath = path;
        this.rootStore.saveToLocalStorage();
    }

    updateGameSwitch(key: string, value: boolean) {
        this.store.switch[key] = value;
        this.rootStore.saveToLocalStorage();
    }
}
