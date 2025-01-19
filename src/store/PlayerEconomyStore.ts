// stores/PlayerEconomyStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerEconomy } from "./types";
import { RootStore } from "./rootStore";
import { itemMap } from "../data/ItemData";


export class PlayerEconomyStore {
    rootStore: RootStore;

    store: PlayerEconomy = defaultGameStore.playerEconomy;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updatePlayerEconomy(delta: Partial<PlayerEconomy>) {
        this.store.gold = Math.max(
            this.store.gold + (delta.gold || 0),
            0
        );
        this.store.edelsteine = Math.max(
            this.store.edelsteine + (delta.edelsteine || 0),
            0
        );
        this.rootStore.saveToLocalStorage();
    }

    updateItems(name: string, quantity: number) {
        const itemData = itemMap[name];
        if (!itemData) return;

        const currentItem = this.store.items[name];
        const currentQuantity = currentItem ? currentItem.quantity : 0;
        const newQuantity = currentQuantity + quantity;

        if (newQuantity > 0) {
            this.store.items[name] = {
                item: { ...itemData },
                quantity: newQuantity,
            };
        } else {
            delete this.store.items[name];
        }
        this.rootStore.saveToLocalStorage();
    }

    consumeItem(itemName: string) {
        const currentItem = this.store.items[itemName];
        if (!currentItem || currentItem.quantity <= 0) {
            console.log(`${itemName} ist nicht im Inventar.`);
            return;
        }
        // Beispiel: Effekte anwenden
        // -> z.B. auf playerStatsStore zu greifen:
        const { life } = this.rootStore.playerStats.store;
        this.rootStore.playerStats.updateLife(20); // oder was immer

        // Eine Einheit abziehen
        currentItem.quantity -= 1;
        if (currentItem.quantity <= 0) {
            delete this.store.items[itemName];
        }
        // z.B. Item in Hand zurücksetzen:
        this.rootStore.playerFlux.updateInHand("Nichts");
        this.rootStore.saveToLocalStorage();
    }
}
