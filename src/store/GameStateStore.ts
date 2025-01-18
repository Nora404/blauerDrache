// stores/GameStateStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, GameState } from "./types";
import { RootStore } from "./rootStore";

export class GameStateStore {
    rootStore: RootStore;
    gameState: GameState = defaultGameStore.gameState;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setGameState(val: Partial<GameState>) {
        this.gameState = { ...this.gameState, ...val };
        this.rootStore.saveToLocalStorage();
    }

    setCurrentPath(path: string) {
        this.gameState.currentPath = path;
        this.rootStore.saveToLocalStorage();
    }

    updateGameSwitch(key: string, value: boolean) {
        this.gameState.switch[key] = value;
        this.rootStore.saveToLocalStorage();
    }
}
