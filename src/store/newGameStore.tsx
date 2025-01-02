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
    race: string;       // RaceName
    origin: string;     // OriginName
    calling: string;    // CallingName
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

export type PlayerInfo = {
    level: number;
    nextLevel: number;
    exp: number;
    maxLife: number;
    maxRounds: number;
};

type PlayerStatsObject = {
    name: string;
    stats: Partial<PlayerStats>;
};

export type PlayerFlux = {
    feeling: PlayerStatsObject;
    buff: PlayerStatsObject[];
    debuff: PlayerStatsObject[];
    weapon: PlayerStatsObject;
    armor: PlayerStatsObject;
};

export type Item = {
    name: string; // Name des Items
    description: string; // Mini-Beschreibung
    effects?: Partial<PlayerStats>; // Optionale Effekte (z.B. Heilung)
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
    playerInfo: PlayerInfo;
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
        race: "Human",
        origin: "Village",
        calling: "Warrior",
        titel: "None",
        colortype: "SomeType",
        colors: [],
    },
    playerStats: {
        life: 100,
        rounds: 10,
        attack: 10,
        defense: 5,
        luck: 5,
    },
    playerInfo: {
        level: 1,
        nextLevel: 100,
        exp: 0,
        maxLife: 100,
        maxRounds: 10,
    },
    playerFlux: {
        feeling: { name: "Normal", stats: {} },
        buff: [],
        debuff: [],
        weapon: { name: "Nichts", stats: {} },
        armor: { name: "Nichts", stats: {} },
    },
    playerEconomy: {
        gold: 0,
        edelsteine: 0,
        items: {},
    },
};
//#endregion 

//#region [context]  
type GameStoreContextType = {
    store: GameStore;
    // Setter-Funktionen, z.B. partial updates
    setGameTime: (val: Partial<GameTime>) => void;
    setGameState: (val: Partial<GameState>) => void;
    setPlayerMeta: (val: Partial<PlayerMeta>) => void;
    setPlayerStats: (val: Partial<PlayerStats>) => void;
    setPlayerInfo: (val: Partial<PlayerInfo>) => void;
    setPlayerFlux: (val: Partial<PlayerFlux>) => void;
    setPlayerEconomy: (val: Partial<PlayerEconomy>) => void;

    resetGameData: () => void;
    consumeItem: (itemName: string) => void;
    newDay: () => void;

    updateGameSwitch: (key: string, value: boolean) => void; // oder (switchName: SwitchName, value: boolean)
    updatePlayerBuff: (buff: PlayerStatsObject) => void;
    updatePlayerDebuff: (debuff: PlayerStatsObject) => void;
    updateItems: (item: Item, quantity: number) => void;
    updateLife: (delta: number) => void;
    updateRounds: (delta: number) => void;
};

import React, { createContext, useState, useEffect, useContext } from "react";
import { getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { TEMPERATURE, WEATHER } from "../data/weatherStrings";

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
    //#endregion

    //#region [setter]
    const setGameTime = (val: Partial<GameTime>) => {
        setStore((prev) => ({
            ...prev,
            gameTime: { ...prev.gameTime, ...val },
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

    const setPlayerInfo = (val: Partial<PlayerInfo>) => {
        setStore((prev) => ({
            ...prev,
            playerInfo: { ...prev.playerInfo, ...val },
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

    //#region [new]
    const resetGameData = () => {
        setStore(defaultGameStore);
    };

    const newDay = () => {
        const { feeling, data } = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        setStore((prev) => ({
            ...prev,
            playerStats: {
                life: prev.playerInfo.maxLife,
                rounds: prev.playerInfo.maxRounds,
                attack: prev.playerStats.attack,
                defense: prev.playerStats.defense,
                luck: prev.playerStats.luck,
            },

            playerFlux: {
                ...prev.playerFlux,
                buff: [],
                debuff: [],
                feeling: { name: feeling.name, stats: data }
            },

            gameState: {
                ...prev.gameState,
                weather: weather,
                temperature: temperature,
            }
        }));
    };
    //#endregion

    // -------------------------------------------------
    // 7) Weitere Update-Funktionen (deine "updateXyz")
    // -------------------------------------------------

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

    const updatePlayerBuff = (buff: PlayerStatsObject) => {
        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                buff: [...prev.playerFlux.buff, buff],
            },
        }));
    };

    const updatePlayerDebuff = (debuff: PlayerStatsObject) => {
        setStore((prev) => ({
            ...prev,
            playerFlux: {
                ...prev.playerFlux,
                debuff: [...prev.playerFlux.debuff, debuff],
            },
        }));
    };

    const updateLife = (delta: number) => {
        setStore((prev) => {
            const newLife = Math.min(
                Math.max(prev.playerStats.life + delta, 0),
                prev.playerInfo.maxLife
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
                prev.playerInfo.maxRounds
            );
            return {
                ...prev,
                playerStats: {
                    ...prev.playerStats,
                    rounds: newRounds,
                },
            };
        });
    };

    const updateItems = (item: Item, quantity: number) => {
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

    const consumeItem = (itemName: string) => {
        setStore((prev) => {
            const currentItem = prev.playerEconomy.items[itemName];
            if (!currentItem || currentItem.quantity <= 0) {
                console.log(`${itemName} ist nicht im Inventar.`);
                return prev;
            }

            const { effects } = currentItem.item;

            // Effekte anwenden
            const newPlayerStats = { ...prev.playerStats };
            if (effects) {
                newPlayerStats.life = Math.min(
                    newPlayerStats.life + (effects.life || 0),
                    prev.playerInfo.maxLife
                );
                newPlayerStats.attack += effects.attack || 0;
                newPlayerStats.defense += effects.defense || 0;
                newPlayerStats.luck += effects.luck || 0;
            }

            // Menge reduzieren
            const updatedItems = { ...prev.playerEconomy.items };
            const newQuantity = currentItem.quantity - 1;
            if (newQuantity > 0) {
                updatedItems[itemName] = { ...currentItem, quantity: newQuantity };
            } else {
                delete updatedItems[itemName]; // Löschen, wenn keine mehr übrig
            }

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
        setPlayerInfo,
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

    attack += store.playerFlux.weapon.stats.attack ?? 0;
    defense += store.playerFlux.armor.stats.defense ?? 0;

    for (const buff of store.playerFlux.buff) {
        life += buff.stats.life ?? 0;
        rounds += buff.stats.rounds ?? 0;
        attack += buff.stats.attack ?? 0;
        defense += buff.stats.defense ?? 0;
        luck += buff.stats.luck ?? 0;
    }

    for (const debuff of store.playerFlux.debuff) {
        life += debuff.stats.life ?? 0;
        rounds += debuff.stats.rounds ?? 0;
        attack += debuff.stats.attack ?? 0;
        defense += debuff.stats.defense ?? 0;
        luck += debuff.stats.luck ?? 0;
    }

    life += store.playerFlux.feeling.stats.life ?? 0;
    rounds += store.playerFlux.feeling.stats.rounds ?? 0;
    attack += store.playerFlux.feeling.stats.attack ?? 0;
    defense += store.playerFlux.feeling.stats.defense ?? 0;
    luck += store.playerFlux.feeling.stats.luck ?? 0;

    // Sicherstellen, dass die kombinierten Werte innerhalb der Grenzen bleiben
    life = Math.max(life, 0), store.playerInfo.maxLife;
    rounds = Math.max(rounds, 0), store.playerInfo.maxRounds;
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
