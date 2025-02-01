// stores/PlayerEconomyStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerEconomy } from "./types";
import { RootStore } from "./rootStore";
import { BuffName } from "../data/buffData";
import { DebuffName } from "../data/debuffData";
import { itemMap, ItemName } from "../data/gameItems/ItemData";
import { Consum } from "../data/gameItems/consumData";

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

  updateCollection(item: ItemName) {
    const index = this.data.collections.indexOf(item);

    if (index === -1) {
      this.data.collections.push(item);
    } else {
      this.data.collections.splice(index, 1);
    }

    this.rootStore.saveToLocalStorage();
  }

  updatePlayerEconomy(delta: Partial<PlayerEconomy>) {
    this.data.gold = Math.max(this.data.gold + (delta.gold || 0), 0);
    this.data.edelsteine = Math.max(
      this.data.edelsteine + (delta.edelsteine || 0),
      0
    );
    this.rootStore.saveToLocalStorage();
  }

  updateGold(amount: number) {
    this.data.gold = Math.max(this.data.gold + amount, 0);
    this.rootStore.saveToLocalStorage();
  }

  updateGems(amount: number) {
    this.data.edelsteine = Math.max(this.data.edelsteine + amount, 0);
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

    this.rootStore.playerQuest.updateProgress("itemAdded", {
      itemName: name,
      quantity: quantity,
    });
    this.rootStore.saveToLocalStorage();
  }

  consumeItem(itemName: string) {
    const currentItem = this.data.items[itemName];
    if (!currentItem || currentItem.quantity <= 0) {
      console.log(`${itemName} ist nicht im Inventar.`);
      return;
    }

    const { life, actionPoints, buff, debuff } = currentItem.item as Consum;

    // --- Effekte des Items anwenden ---
    if (life) {
      this.rootStore.playerStats.updateLife(life);
    }

    if (actionPoints) {
      this.rootStore.playerStats.updateActionPoints(actionPoints);
    }

    // --- Buff und Debuff anwenden ---
    if (buff) {
      this.rootStore.playerFlux.updatePlayerBuff(buff as BuffName);
    }
    if (debuff) {
      this.rootStore.playerFlux.updatePlayerDebuff(debuff as DebuffName);
    }

    // --- Item-Anzahl reduzieren oder ganz entfernen ---
    currentItem.quantity -= 1;
    if (currentItem.quantity <= 0) {
      delete this.data.items[itemName];
    }

    this.rootStore.playerFlux.updateInHand("Nichts");

    this.rootStore.saveToLocalStorage();
  }
}
