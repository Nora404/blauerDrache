// stores/TimeStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, GameTime } from "./types";
import { RootStore } from "./rootStore";

// Beispiel: deine Zeit-Funktionen
export class TimeStore {
    rootStore: RootStore;
    gameTime: GameTime = defaultGameStore.gameTime;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setGameTime(val: Partial<GameTime>) {
        this.gameTime = { ...this.gameTime, ...val };
        this.rootStore.saveToLocalStorage();
    }

    // Beispiel: updateGameTime -> in MobX könntest du einen Intervall in RootStore starten,
    // oder du rufst es manuell auf.
    updateGameTime() {
        // ... dein alter Code aus useEffect
        // am Ende: this.gameTime = { ... };
        this.rootStore.saveToLocalStorage();
    }
}
