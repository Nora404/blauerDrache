// stores/PlayerEconomyStore.ts
import { makeAutoObservable } from "mobx";
import { defaultGameStore, PlayerEconomy } from "./types";
import { RootStore } from "./rootStore";
import { itemMap } from "../data/ItemData";
import { BuffName } from "../data/buffData";
import { DebuffName } from "../data/debuffData";

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

    const { effects, buff, debuff } = currentItem.item;

    // --- Effekte des Items anwenden ---
    if (effects) {
      const maxLife = this.rootStore.playerBase.data.maxLife;
      const newLife = Math.min(
        this.rootStore.playerStats.data.life + (effects.life || 0),
        maxLife
      );
      this.rootStore.playerStats.data.life = newLife;

      this.rootStore.playerStats.data.attack += effects.attack || 0;
      this.rootStore.playerStats.data.defense += effects.defense || 0;
      this.rootStore.playerStats.data.luck += effects.luck || 0;
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
