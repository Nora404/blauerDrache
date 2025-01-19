// stores/PlayerEconomyStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerEconomy } from "./types";
import { RootStore } from "./rootStore";
import { itemMap } from "../data/ItemData";


export class PlayerEconomyStore {
    rootStore: RootStore;

    data: PlayerEconomy = defaultGameStore.playerEconomy;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerEconomy(val: Partial<PlayerEconomy>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    updatePlayerEconomy(delta: Partial<PlayerEconomy>) {
        this.data.gold = Math.max(
            this.data.gold + (delta.gold || 0),
            0
        );
        this.data.edelsteine = Math.max(
            this.data.edelsteine + (delta.edelsteine || 0),
            0
        );
        this.rootStore.saveToLocalStorage();
    }

    updateItems(name: string, quantity: number) {
        const itemData = itemMap[name];
        if (!itemData) return;

        const currentItem = this.data.items[name];
        const currentQuantity = currentItem ? currentItem.quantity : 0;
        const newQuantity = currentQuantity + quantity;

        if (newQuantity > 0) {
            this.data.items[name] = {
                item: { ...itemData },
                quantity: newQuantity,
            };
        } else {
            delete this.data.items[name];
        }
        this.rootStore.saveToLocalStorage();
    }

    consumeItem(itemName: string) {
        const currentItem = this.data.items[itemName];
        if (!currentItem || currentItem.quantity <= 0) {
            console.log(`${itemName} ist nicht im Inventar.`);
            return;
        }
        // Beispiel: Effekte anwenden
        // -> z.B. auf playerStatsStore zu greifen:
        const { life } = this.rootStore.playerStats.data;
        this.rootStore.playerStats.updateLife(20); // oder was immer

        // Eine Einheit abziehen
        currentItem.quantity -= 1;
        if (currentItem.quantity <= 0) {
            delete this.data.items[itemName];
        }
        // z.B. Item in Hand zurücksetzen:
        this.rootStore.playerFlux.updateInHand("Nichts");
        this.rootStore.saveToLocalStorage();
    }
}
