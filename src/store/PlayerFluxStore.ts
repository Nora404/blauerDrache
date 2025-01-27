import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";
import { buffMap, BuffName } from "../data/buffData";
import { debuffMap, DebuffName } from "../data/debuffData";
import { defaultGameStore, PlayerFlux } from "./types";
import { ArmorName } from "../data/gameItems/armorData";
import { ItemName } from "../data/gameItems/ItemData";
import { WeaponName } from "../data/gameItems/weaponData";

export class PlayerFluxStore {
    rootStore: RootStore;

    data: PlayerFlux = defaultGameStore.playerFlux;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setPlayerFlux(val: Partial<PlayerFlux>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
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
