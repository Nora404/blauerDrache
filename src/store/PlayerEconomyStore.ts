// stores/PlayerEconomyStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerEconomy } from "./types";
import { RootStore } from "./rootStore";
import { itemMap } from "../data/ItemData";


export class PlayerEconomyStore {
    rootStore: RootStore;

    playerEconomy: PlayerEconomy = defaultGameStore.playerEconomy;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updatePlayerEconomy(delta: Partial<PlayerEconomy>) {
        this.playerEconomy.gold = Math.max(
            this.playerEconomy.gold + (delta.gold || 0),
            0
        );
        this.playerEconomy.edelsteine = Math.max(
            this.playerEconomy.edelsteine + (delta.edelsteine || 0),
            0
        );
        this.rootStore.saveToLocalStorage();
    }

    updateItems(name: string, quantity: number) {
        const itemData = itemMap[name];
        if (!itemData) return;

        const currentItem = this.playerEconomy.items[name];
        const currentQuantity = currentItem ? currentItem.quantity : 0;
        const newQuantity = currentQuantity + quantity;

        if (newQuantity > 0) {
            this.playerEconomy.items[name] = {
                item: { ...itemData },
                quantity: newQuantity,
            };
        } else {
            delete this.playerEconomy.items[name];
        }
        this.rootStore.saveToLocalStorage();
    }

    consumeItem(itemName: string) {
        const currentItem = this.playerEconomy.items[itemName];
        if (!currentItem || currentItem.quantity <= 0) {
            console.log(`${itemName} ist nicht im Inventar.`);
            return;
        }
        // Beispiel: Effekte anwenden
        // -> z.B. auf playerStatsStore zu greifen:
        const { life } = this.rootStore.playerStatsStore.playerStats;
        this.rootStore.playerStatsStore.updateLife(20); // oder was immer

        // Eine Einheit abziehen
        currentItem.quantity -= 1;
        if (currentItem.quantity <= 0) {
            delete this.playerEconomy.items[itemName];
        }
        // z.B. Item in Hand zurücksetzen:
        this.rootStore.playerFluxStore.updateInHand("Nichts");
        this.rootStore.saveToLocalStorage();
    }
}
