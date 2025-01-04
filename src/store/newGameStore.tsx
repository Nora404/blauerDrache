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
    race: RaceName;
    origin: OriginName;
    calling: CallingName;
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
    feeling: FeelingName;
    buff: Buff[];
    debuff: Debuff[];
    weapon: WeaponName;
    armor: ArmorName;
    item: ItemName;
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
        creating: true,
        Switch: {},
    },
    playerMeta: {
        name: "Name",
        race: "Mensch",
        origin: "Mondauge",
        calling: "Alchemist",
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
        feeling: "Normal",
        buff: [],
        debuff: [],
        weapon: "Nichts",
        armor: "Nichts",
        item: "Nichts"
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
import { emptyFeelingObj, feelingMap, FeelingName, getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { TEMPERATURE, WEATHER } from "../data/weatherStrings";
import { emptyRaceObj, RaceName, racesMap } from "../data/raceData";
import { callingMap, CallingName, emptyCallingObj } from "../data/callingData";
import { armorMap, ArmorName, emptyArmorObj } from "../data/armorData";
import { emptyWeaponObj, weaponMap, WeaponName } from "../data/weaponData";
import { emptyItemObj, Item, itemMap, ItemName } from "../data/ItemData";
import { Buff, buffMap, BuffName } from "../data/buffData";
import { Debuff, debuffMap, DebuffName } from "../data/debuffData";
import { emptyOriginObj, originMap, OriginName } from "../data/originData";

export const GameStoreContext = createContext<GameStoreContextType>(
    {} as GameStoreContextType
);

export const useNewGameStore = () => useContext(GameStoreContext);
//#endregion  

//#region [save data]
export const NewGameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const validateGameStore = (data: any): GameStore => {
        if (!data || typeof data !== "object") return defaultGameStore;

        return {
            gameTime: data.gameTime ?? defaultGameStore.gameTime,
            gameState: data.gameState ?? defaultGameStore.gameState,
            playerMeta: data.playerMeta ?? defaultGameStore.playerMeta,
            playerStats: data.playerStats ?? defaultGameStore.playerStats,
            playerBase: data.playerBase ?? defaultGameStore.playerBase,
            playerFlux: data.playerFlux ?? defaultGameStore.playerFlux,
            playerEconomy: data.playerEconomy ?? defaultGameStore.playerEconomy,
        };
    };

    const [store, setStore] = useState<GameStore>(() => {
        const saved = localStorage.getItem("myGameStore");
        const parsed = saved ? JSON.parse(saved) : null;
        return validateGameStore(parsed);
    });

    useEffect(() => {
        const validatedStore = validateGameStore(store);
        localStorage.setItem("myGameStore", JSON.stringify(validatedStore));
    }, [store]);

    //#endregion

    //#region [set time]  
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateGameTime();
        }, 60000);

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
                feeling: feeling.name
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
        if (!weaponMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                weapon: name,
            },
        }));
    };

    const updateArmor = (name: ArmorName) => {
        if (!armorMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                armor: name,
            },
        }));
    };

    const updateInHand = (name: ItemName) => {
        if (!itemMap[name]) return;

        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                item: name,
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

            updateInHand("Nichts");

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

//#region [getter]
export function getCombinedStats(store: GameStore) {
    let life = store.playerStats.life;
    let rounds = store.playerStats.rounds;
    let attack = store.playerStats.attack;
    let defense = store.playerStats.defense;
    let luck = store.playerStats.luck;
    let maxLife = store.playerBase.maxLife;
    let maxRounds = store.playerBase.maxRounds;

    attack += weaponMap[store.playerFlux.weapon].attack ?? 0;
    defense += armorMap[store.playerFlux.armor].defense ?? 0;

    for (const buff of store.playerFlux.buff) {
        life += buff.effects.life ?? 0;
        rounds += buff.effects.rounds ?? 0;
        attack += buff.effects.attack ?? 0;
        defense += buff.effects.defense ?? 0;
        luck += buff.effects.luck ?? 0;
        maxLife += buff.effects.life ?? 0;
        maxRounds += buff.effects.rounds ?? 0;
    }

    for (const debuff of store.playerFlux.debuff) {
        life += debuff.effects.life ?? 0;
        rounds += debuff.effects.rounds ?? 0;
        attack += debuff.effects.attack ?? 0;
        defense += debuff.effects.defense ?? 0;
        luck += debuff.effects.luck ?? 0;
        maxLife += debuff.effects.life ?? 0;
        maxRounds += debuff.effects.rounds ?? 0;
    }

    const feeling = feelingMap[store.playerFlux.feeling];
    life += feeling.stats.life ?? 0;
    rounds += feeling.stats.rounds ?? 0;
    attack += feeling.stats.attack ?? 0;
    defense += feeling.stats.defense ?? 0;
    luck += feeling.stats.luck ?? 0;
    maxLife += feeling.stats.life ?? 0;
    maxRounds += feeling.stats.rounds ?? 0;

    // Sicherstellen, dass die kombinierten Werte innerhalb der Grenzen bleiben
    life = Math.max(life, 0), maxLife;
    rounds = Math.max(rounds, 0), maxRounds;
    attack = Math.max(attack, 0);
    defense = Math.max(defense, 0);
    luck = Math.max(luck, 0);

    return { life, rounds, attack, defense, luck, maxLife, maxRounds };
}

export function getPlayerObj(store: GameStore) {
    const race = racesMap[store.playerMeta.race] ?? emptyRaceObj;
    const origin = originMap[store.playerMeta.origin] ?? emptyOriginObj;
    const calling = callingMap[store.playerMeta.calling] ?? emptyCallingObj;
    const feeling = feelingMap[store.playerFlux.feeling] ?? emptyFeelingObj;
    const weapon = weaponMap[store.playerFlux.weapon] ?? emptyWeaponObj;
    const armor = armorMap[store.playerFlux.armor] ?? emptyArmorObj;
    const item = itemMap[store.playerFlux.item] ?? emptyItemObj;

    return { race, origin, calling, feeling, weapon, armor, item }
}
//#endregion

// EINBINDEN
//   function MyComponent() {
//     const { store } = useNewGameStore();
//     const combined = getCombinedStats(store);
//     const selected = getPlayerObj(store);
//     return <div>Leben: {combined.life}</div>;
//   }
