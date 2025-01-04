//#region [definition]
export type GameTime = {
    gameTime: string;   // z.B. "12:00"
    gameDay: string;    // "Tag" | "Nacht"
};

export type GameState = {
    weather: string;
    temperature: string;
    creating: boolean;
    Switch: Record<string, boolean>; // Oder Record<SwitchName, boolean>
};

export type PlayerMeta = {
    name: string;
    race: Race;
    origin: Origin;
    calling: Calling;
    titel: string;      // TitleName
    colortype: string;  // ColortypeName
    colors: string[];
};

export type PlayerStats = {
    life: number;
    rounds: number;
    attack: number;
    defense: number;
    luck: number;
};

export type PlayerBase = {
    level: number;
    nextLevel: number;
    exp: number;
    maxLife: number;
    maxRounds: number;
};

export type PlayerFlux = {
    feeling: Feeling;
    buff: Buff[];
    debuff: Debuff[];
    weapon: Weapon;
    armor: Armor;
    item: Item;
};

export type PlayerEconomy = {
    gold: number;
    edelsteine: number;
    items: Record<string, { item: Item, quantity: number }>;
};
//#endregion

export type GameStore = {
    gameTime: GameTime;
    gameState: GameState;
    playerMeta: PlayerMeta;
    playerStats: PlayerStats;
    playerBase: PlayerBase;
    playerFlux: PlayerFlux;
    playerEconomy: PlayerEconomy;
};

//#region [default]
const defaultGameStore: GameStore = {
    gameTime: {
        gameTime: "12:00",
        gameDay: "Tag",
    },
    gameState: {
        weather: "sonnig",
        temperature: "warm",
        creating: false,
        Switch: {},
    },
    playerMeta: {
        name: "Name",
        race: racesMap["Mensch"],
        origin: originMap["Mondauge"],
        calling: callingMap["Alchemist"],
        titel: "Keiner",
        colortype: "Einfarbig",
        colors: [],
    },
    playerStats: {
        life: 100,
        rounds: 10,
        attack: 10,
        defense: 5,
        luck: 5,
    },
    playerBase: {
        level: 1,
        nextLevel: 100,
        exp: 0,
        maxLife: 100,
        maxRounds: 10,
    },
    playerFlux: {
        feeling: emptyFeelingObj,
        buff: [],
        debuff: [],
        weapon: emptyWeaponObj,
        armor: emptyArmorObj,
        item: emptyItemObj
    },
    playerEconomy: {
        gold: 100,
        edelsteine: 0,
        items: {},
    },
};
//#endregion 

//#region [context]  
type GameStoreContextType = {
    store: GameStore;
    setGameTime: (val: Partial<GameTime>) => void;
    setGameState: (val: Partial<GameState>) => void;
    setPlayerMeta: (val: Partial<PlayerMeta>) => void;
    setPlayerStats: (val: Partial<PlayerStats>) => void;
    setPlayerBase: (val: Partial<PlayerBase>) => void;
    setPlayerFlux: (val: Partial<PlayerFlux>) => void;
    setPlayerEconomy: (val: Partial<PlayerEconomy>) => void;

    resetGameData: () => void;
    consumeItem: (itemName: string) => void;
    newDay: () => void;

    updateGameSwitch: (key: string, value: boolean) => void; // oder (switchName: SwitchName, value: boolean)
    updatePlayerBuff: (name: BuffName) => void;
    updatePlayerDebuff: (name: DebuffName) => void;
    updateItems: (name: ItemName, quantity: number) => void;
    updateLife: (delta: number) => void;
    updateRounds: (delta: number) => void;
    updateWeapon: (name: WeaponName) => void;
    updateArmor: (name: ArmorName) => void;
    updateInHand: (name: ItemName) => void;
    updatePlayerStats: (delta: Partial<PlayerStats>) => void;
    updatePlayerEconomy: (delta: Partial<PlayerEconomy>) => void;
};

import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { emptyFeelingObj, Feeling, getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { TEMPERATURE, WEATHER } from "../data/weatherStrings";
import { Race, racesMap } from "../data/raceData";
import { Calling, callingMap } from "../data/callingData";
import { Armor, armorMap, ArmorName, emptyArmorObj } from "../data/armorData";
import { emptyWeaponObj, Weapon, weaponMap, WeaponName } from "../data/weaponData";
import { emptyItemObj, Item, itemMap, ItemName } from "../data/ItemData";
import { Buff, buffMap, BuffName } from "../data/buffData";
import { Debuff, debuffMap, DebuffName } from "../data/debuffData";
import { Origin, originMap } from "../data/originData";

export const GameStoreContext = createContext<GameStoreContextType>(
    {} as GameStoreContextType
);

export const useNewGameStore = () => useContext(GameStoreContext);
//#endregion  

export const NewGameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [store, setStore] = useState<GameStore>(() => {
        const saved = localStorage.getItem("myGameStore");
        return saved ? JSON.parse(saved) : defaultGameStore;
    });
    useEffect(() => {
        localStorage.setItem("myGameStore", JSON.stringify(store));
    }, [store]);

    //#region [set time]  
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateGameTime();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const updateGameTime = () => {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSeconds = minutes * 60 + seconds;
        const gameHours = (totalSeconds / 3600) * 24;

        const gameDay = (gameHours < 6 || gameHours > 20) ? "Nacht" : "Tag";

        const hh = String(Math.floor(gameHours) % 24).padStart(2, "0");
        let mm = Math.floor((gameHours - Math.floor(gameHours)) * 60);
        mm = Math.floor(mm / 10) * 10;

        const newGameTime = `${hh}:${String(mm).padStart(2, "0")}`;

        // Nur updaten, wenn sich was ändert
        if (store.gameTime.gameTime !== newGameTime || store.gameTime.gameDay !== gameDay) {
            setStore((prev) => ({
                ...prev,
                gameTime: { ...prev.gameTime, gameTime: newGameTime, gameDay },
            }));
        }
    };

    const previousGameDay = useRef(store.gameTime.gameDay);
    useEffect(() => {
        if (previousGameDay.current === "Nacht" && store.gameTime.gameDay === "Tag") {
            newDay();
        }
        previousGameDay.current = store.gameTime.gameDay;
    }, [store.gameTime.gameDay]);
    //#endregion

    //#region [setter]
    const setGameTime = (val: Partial<GameTime>) => {  // Partial bedeutet alle Eigenschaften sind optional
        setStore((prev) => ({                          // Es wird der gesamte aktuelle Store übergeben
            ...prev,                                   // und wieder eingesetzt
            gameTime: { ...prev.gameTime, ...val },    // dann überschreibt der neue Wert den alten Wert
        }));
    };

    const setGameState = (val: Partial<GameState>) => {
        setStore((prev) => ({
            ...prev,
            gameState: { ...prev.gameState, ...val },
        }));
    };

    const setPlayerMeta = (val: Partial<PlayerMeta>) => {
        setStore((prev) => ({
            ...prev,
            playerMeta: { ...prev.playerMeta, ...val },
        }));
    };

    const setPlayerStats = (val: Partial<PlayerStats>) => {
        setStore((prev) => ({
            ...prev,
            playerStats: { ...prev.playerStats, ...val },
        }));
    };

    const setPlayerBase = (val: Partial<PlayerBase>) => {
        setStore((prev) => ({
            ...prev,
            playerBase: { ...prev.playerBase, ...val },
        }));
    };

    const setPlayerFlux = (val: Partial<PlayerFlux>) => {
        setStore((prev) => ({
            ...prev,
            playerFlux: { ...prev.playerFlux, ...val },
        }));
    };

    const setPlayerEconomy = (val: Partial<PlayerEconomy>) => {
        setStore((prev) => ({
            ...prev,
            playerEconomy: { ...prev.playerEconomy, ...val },
        }));
    };
    //#endregion

    //#region [new and reset]
    const resetGameData = () => {
        setStore(defaultGameStore);
    };

    const newDay = () => {
        const feeling = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        setStore((prev) => ({
            ...prev,
            playerStats: {
                life: prev.playerBase.maxLife,
                rounds: prev.playerBase.maxRounds,
                attack: prev.playerStats.attack,
                defense: prev.playerStats.defense,
                luck: prev.playerStats.luck,
            },

            playerFlux: {
                ...prev.playerFlux,
                buff: [],
                debuff: [],
                feeling: feeling
            },

            gameState: {
                ...prev.gameState,
                weather: weather,
                temperature: temperature,
            }
        }));
    };
    //#endregion

    //#region [updater]
    const updateGameSwitch = (key: string, value: boolean) => {
        setStore((prev) => ({
            ...prev,
            gameState: {
                ...prev.gameState,
                Switch: { ...prev.gameState.Switch, [key]: value },
            },
        }));
    };

    const updatePlayerBuff = (name: BuffName) => {
        const buff = buffMap[name];
        if (!buff) return;

        setStore((prev) => {
            // Schauen, ob bereits ein Buff mit gleichem Namen existiert
            const existingIndex = prev.playerFlux.buff.findIndex((b) => b.name === name);
            const updatedBuffs = [...prev.playerFlux.buff];

            if (existingIndex >= 0) {
                // Wenn schon da, Duration addieren
                updatedBuffs[existingIndex] = {
                    ...updatedBuffs[existingIndex],
                    duration: (updatedBuffs[existingIndex].duration || 0)
                        + buff.duration,
                };
            } else {
                // Ansonsten neu hinzufügen
                updatedBuffs.push(buff);
            }

            return {
                ...prev,
                playerFlux: {
                    ...prev.playerFlux,
                    buff: updatedBuffs,
                },
            };
        });
    };

    const updatePlayerDebuff = (name: DebuffName) => {
        const debuff = debuffMap[name];
        if (!debuff) return;

        setStore((prev) => {
            const existingIndex = prev.playerFlux.debuff.findIndex((d) => d.name === name);

            const updatedDebuffs = [...prev.playerFlux.debuff];

            if (existingIndex >= 0) {
                updatedDebuffs[existingIndex] = {
                    ...updatedDebuffs[existingIndex],
                    duration: (updatedDebuffs[existingIndex].duration || 0)
                        + debuff.duration,
                };
            } else {
                updatedDebuffs.push(debuff);
            }

            return {
                ...prev,
                playerFlux: {
                    ...prev.playerFlux,
                    debuff: updatedDebuffs,
                },
            };
        });
    };

    const updateLife = (delta: number) => {
        setStore((prev) => {
            const newLife = Math.min(
                Math.max(prev.playerStats.life + delta, 0),
                prev.playerBase.maxLife
            );
            return {
                ...prev,
                playerStats: {
                    ...prev.playerStats,
                    life: newLife,
                },
            };
        });
    };

    const updateRounds = (delta: number) => {
        setStore((prev) => {
            const newRounds = Math.min(
                Math.max(prev.playerStats.rounds + delta, 0),
                prev.playerBase.maxRounds
            );

            let updatedBuffs = prev.playerFlux.buff;
            let updatedDebuffs = prev.playerFlux.debuff;
            if (delta < 0) {
                // duration um 1 verringern
                updatedBuffs = updatedBuffs
                    .map((b) => ({ ...b, duration: b.duration ? b.duration - Math.abs(delta) : 0 }))
                    .filter((b) => b.duration === undefined || b.duration > 0);

                updatedDebuffs = updatedDebuffs
                    .map((d) => ({ ...d, duration: d.duration ? d.duration - Math.abs(delta) : 0 }))
                    .filter((d) => d.duration === undefined || d.duration > 0);
            }

            console.log(store.playerFlux.buff);

            return {
                ...prev,
                playerStats: {
                    ...prev.playerStats,
                    rounds: newRounds,
                },
                playerFlux: {
                    ...prev.playerFlux,
                    buff: updatedBuffs,
                    debuff: updatedDebuffs,
                },
            };
        });
    };

    const updateItems = (name: ItemName, quantity: number) => {
        const item = itemMap[name];
        if (!item) return;

        setStore((prev) => {
            const currentItem = prev.playerEconomy.items[item.name];
            const currentQuantity = currentItem ? currentItem.quantity : 0;

            const newQuantity = currentQuantity + quantity;

            const updatedItems = { ...prev.playerEconomy.items };

            if (newQuantity > 0) {
                updatedItems[item.name] = { quantity: newQuantity, item }; // Item hinzufügen/aktualisieren
            } else if (newQuantity <= 0) {
                delete updatedItems[item.name]; // Item entfernen, wenn Menge <= 0
            }

            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    items: updatedItems,
                },
            };
        });
    };

    const updateWeapon = (name: WeaponName) => {
        const weapon = weaponMap[name];
        if (!weapon) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                weapon: weapon,
            },
        }));
    };

    const updateArmor = (name: ArmorName) => {
        const armor = armorMap[name];
        if (!armor) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                armor: armor,
            },
        }));
    };

    const updateInHand = (name: ItemName) => {
        const item = itemMap[name];
        if (!item) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                item: item,
            },
        }));
    };

    const updatePlayerStats = (delta: Partial<PlayerStats>) => {
        setStore((prev) => ({
            ...prev,
            playerStats: {
                life: prev.playerStats.life + (delta.life || 0),
                rounds: prev.playerStats.rounds + (delta.rounds || 0),
                attack: prev.playerStats.attack + (delta.attack || 0),
                defense: prev.playerStats.defense + (delta.defense || 0),
                luck: prev.playerStats.luck + (delta.luck || 0),
            },
        }));
    };

    const updatePlayerEconomy = (delta: Partial<PlayerEconomy>) => {
        setStore((prev) => {
            const newGold = (delta.gold || 0) + prev.playerEconomy.gold;
            const newEdelsteine = (delta.edelsteine || 0) + prev.playerEconomy.edelsteine;

            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    gold: Math.max(newGold, 0),
                    edelsteine: Math.max(newEdelsteine, 0),
                },
            };
        });
    };
    //#endregion

    //#region [helper]
    const consumeItem = (itemName: string) => {
        setStore((prev) => {
            const currentItem = prev.playerEconomy.items[itemName];
            if (!currentItem || currentItem.quantity <= 0) {
                console.log(`${itemName} ist nicht im Inventar.`);
                return prev;
            }

            const { effects, buff, debuff } = currentItem.item;

            // Effekte des Gegenstandes anwenden
            const newPlayerStats = { ...prev.playerStats };
            if (effects) {
                newPlayerStats.life = Math.min(
                    newPlayerStats.life + (effects.life || 0),
                    prev.playerBase.maxLife
                );
                newPlayerStats.attack += effects.attack || 0;
                newPlayerStats.defense += effects.defense || 0;
                newPlayerStats.luck += effects.luck || 0;
            }

            if (buff) {
                updatePlayerBuff(buff);
            }

            if (debuff) {
                updatePlayerDebuff(debuff);
            }

            // Verbrauchten Gegenstand abziehen
            const updatedItems = { ...prev.playerEconomy.items };
            const newQuantity = currentItem.quantity - 1;
            if (newQuantity > 0) {
                updatedItems[itemName] = { ...currentItem, quantity: newQuantity };
            } else {
                delete updatedItems[itemName];
            }

            // Und nun im Store speichern
            return {
                ...prev,
                playerEconomy: {
                    ...prev.playerEconomy,
                    items: updatedItems,
                },
                playerStats: newPlayerStats,
            };
        });
    };
    //#endregion

    const contextValue: GameStoreContextType = {
        store,
        setGameTime,
        setGameState,
        setPlayerMeta,
        setPlayerStats,
        setPlayerBase,
        setPlayerFlux,
        setPlayerEconomy,
        resetGameData,
        newDay,
        consumeItem,
        updateGameSwitch,
        updatePlayerBuff,
        updatePlayerDebuff,
        updateItems,
        updateLife,
        updateRounds,
        updateWeapon,
        updateArmor,
        updateInHand,
        updatePlayerStats,
        updatePlayerEconomy,
    };

    return (
        <GameStoreContext.Provider value={contextValue}>
            {children}
        </GameStoreContext.Provider>
    );
};

//#region [combined stats]
export function getCombinedStats(store: GameStore): PlayerStats {
    const base = store.playerStats;

    let life = base.life;
    let rounds = base.rounds;
    let attack = base.attack;
    let defense = base.defense;
    let luck = base.luck;

    attack += store.playerFlux.weapon.attack ?? 0;
    defense += store.playerFlux.armor.defense ?? 0;

    for (const buff of store.playerFlux.buff) {
        life += buff.effects.life ?? 0;
        rounds += buff.effects.rounds ?? 0;
        attack += buff.effects.attack ?? 0;
        defense += buff.effects.defense ?? 0;
        luck += buff.effects.luck ?? 0;
    }

    for (const debuff of store.playerFlux.debuff) {
        life += debuff.effects.life ?? 0;
        rounds += debuff.effects.rounds ?? 0;
        attack += debuff.effects.attack ?? 0;
        defense += debuff.effects.defense ?? 0;
        luck += debuff.effects.luck ?? 0;
    }

    life += store.playerFlux.feeling.stats.life ?? 0;
    rounds += store.playerFlux.feeling.stats.rounds ?? 0;
    attack += store.playerFlux.feeling.stats.attack ?? 0;
    defense += store.playerFlux.feeling.stats.defense ?? 0;
    luck += store.playerFlux.feeling.stats.luck ?? 0;

    // Sicherstellen, dass die kombinierten Werte innerhalb der Grenzen bleiben
    life = Math.max(life, 0), store.playerBase.maxLife;
    rounds = Math.max(rounds, 0), store.playerBase.maxRounds;
    attack = Math.max(attack, 0);
    defense = Math.max(defense, 0);
    luck = Math.max(luck, 0);

    return { life, rounds, attack, defense, luck };
}
//#endregion

// EINBINDEN
//   function MyComponent() {
//     const { store } = useNewGameStore();
//     const combined = getCombinedStats(store);

//     return <div>Leben: {combined.life}</div>;
//   }

// HEILEN
// function HealButton() {
//     const { updateLife } = useNewGameStore();
//     const heal = (amount: number) => {
//         updateLife(amount);
//     };
//     return <button onClick={() => heal(20)}>Heile um 20</button>;
// }

// SCHADEN
// function DamageButton() {
//     const { updateLife } = useNewGameStore();
//     const damage = (amount: number) => {
//         updateLife(-amount);
//     };
//     return <button onClick={() => damage(15)}>Füge 15 Schaden zu</button>;
// }

// RUNDEN
// function AdjustRoundsButton() {
//     const { updateRounds } = useNewGameStore();
//     const addRounds = (amount: number) => {
//         updateRounds(amount);
//     };
//     return <button onClick={() => addRounds(1)}>Füge eine Runde hinzu</button>;
// }
