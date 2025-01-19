// stores/PlayerFluxStore.ts
import { makeAutoObservable } from "mobx";

import { RootStore } from "./rootStore";
import { buffMap, BuffName } from "../data/buffData";
import { debuffMap, DebuffName } from "../data/debuffData";
import { WeaponName } from "../data/weaponData";
import { ArmorName } from "../data/armorData";
import { ItemName } from "../data/ItemData";
import { defaultGameStore, PlayerFlux } from "./types";

export class PlayerFluxStore {
    rootStore: RootStore;

    data: PlayerFlux = defaultGameStore.playerFlux;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    updatePlayerBuff(name: BuffName) {
        const buff = buffMap[name];
        if (!buff) return;
        this.data.buff[name] = (this.data.buff[name] || 0) + buff.duration;
        this.rootStore.saveToLocalStorage();
    }

    updatePlayerDebuff(name: DebuffName) {
        const debuff = debuffMap[name];
        if (!debuff) return;
        this.data.debuff[name] = (this.data.debuff[name] || 0) + debuff.duration;
        this.rootStore.saveToLocalStorage();
    }

    updateWeapon(name: WeaponName) {
        this.data.weapon = name;
        this.rootStore.saveToLocalStorage();
    }

    updateArmor(name: ArmorName) {
        this.data.armor = name;
        this.rootStore.saveToLocalStorage();
    }

    updateInHand(name: ItemName) {
        this.data.item = name;
        this.rootStore.saveToLocalStorage();
    }
}
