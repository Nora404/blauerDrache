// stores/PlayerMetaStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerMeta } from "./types";
import { RootStore } from "./rootStore";

export class PlayerMetaStore {
    rootStore: RootStore;

    store: PlayerMeta = defaultGameStore.playerMeta;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerMeta(val: Partial<PlayerMeta>) {
        this.store = { ...this.store, ...val };
        this.rootStore.saveToLocalStorage();
    }
}
