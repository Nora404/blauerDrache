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

export type PlayerState = {
    feeling: PlayerStatsObject;
    buff: PlayerStatsObject[];
    debuff: PlayerStatsObject[];
    weapon: PlayerStatsObject;
    armor: PlayerStatsObject;
};

export type PlayerEconomy = {
    gold: number;
    edelsteine: number;
    items: Partial<Record<string, number>>;
};
//#endregion

export type GameStore = {
    gameTime: GameTime;
    gameState: GameState;
    playerMeta: PlayerMeta;
    playerStats: PlayerStats;
    playerInfo: PlayerInfo;
    playerState: PlayerState;
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
    playerState: {
        feeling: { name: "Normal", stats: {}},
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
    setPlayerState: (val: Partial<PlayerState>) => void;
    setPlayerEconomy: (val: Partial<PlayerEconomy>) => void;

    resetGameData: () => void;
    newDay: () => void;

    updateGameSwitch: (key: string, value: boolean) => void; // oder (switchName: SwitchName, value: boolean)
    updatePlayerBuff: (buff: PlayerStatsObject) => void;
    updatePlayerDebuff: (debuff: PlayerStatsObject) => void;
};

import React, { createContext, useState, useEffect, useContext } from "react";
import { getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { TEMPERATURE, WEATHER } from "../data/weatherStrings";

export const GameStoreContext = createContext<GameStoreContextType>(
    {} as GameStoreContextType
);

export const useGameStore = () => useContext(GameStoreContext);
//#endregion  

export const GameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        }, 1000);

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

    const setPlayerState = (val: Partial<PlayerState>) => {
        setStore((prev) => ({
            ...prev,
            playerState: { ...prev.playerState, ...val },
        }));
    };

    const setPlayerEconomy = (val: Partial<PlayerEconomy>) => {
        setStore((prev) => ({
            ...prev,
            playerEconomy: { ...prev.playerEconomy, ...val },
        }));
    };
    //#endregion

    //#region [reset]
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

            playerState: {
                ...prev.playerState, 
                buff: [],             
                debuff: [],         
                feeling: {name: feeling.name, stats: data}
            },

            gameState : {
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
            playerState: {
                ...prev.playerState,
                buff: [...prev.playerState.buff, buff],
            },
        }));
    };

    const updatePlayerDebuff = (debuff: PlayerStatsObject) => {
        setStore((prev) => ({
            ...prev,
            playerState: {
                ...prev.playerState,
                debuff: [...prev.playerState.debuff, debuff],
            },
        }));
    };

    // usw., je nach Bedarf
    //#endregion

    const contextValue: GameStoreContextType = {
        store,
        setGameTime,
        setGameState,
        setPlayerMeta,
        setPlayerStats,
        setPlayerInfo,
        setPlayerState,
        setPlayerEconomy,
        resetGameData,
        newDay,
        updateGameSwitch,
        updatePlayerBuff,
        updatePlayerDebuff,
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
  
    attack += store.playerState.weapon.stats.attack ?? 0;
    defense += store.playerState.armor.stats.defense ?? 0;
    
    for (const buff of store.playerState.buff) {
      life += buff.stats.life ?? 0;
      rounds += buff.stats.rounds ?? 0;
      attack += buff.stats.attack ?? 0;
      defense += buff.stats.defense ?? 0;
      luck += buff.stats.luck ?? 0;
    }

    for (const debuff of store.playerState.debuff) {
        life += debuff.stats.life ?? 0;
        rounds += debuff.stats.rounds ?? 0;
        attack += debuff.stats.attack ?? 0;
        defense += debuff.stats.defense ?? 0;
        luck += debuff.stats.luck ?? 0;
      }
    
    life += store.playerState.feeling.stats.life ?? 0;
    rounds += store.playerState.feeling.stats.rounds ?? 0;
    attack += store.playerState.feeling.stats.attack ?? 0;
    defense += store.playerState.feeling.stats.defense ?? 0;
    luck += store.playerState.feeling.stats.luck ?? 0;

    return { life, rounds, attack, defense, luck };
  }
  
// EINBINDEN
//   function MyComponent() {
//     const { store } = useGameStore();
//     const combined = getCombinedStats(store);
  
//     return <div>Leben: {combined.life}</div>;
//   }

// WERTE VERÄNDERN
// function HealButton() {
//     const { store, setPlayerStats } = useGameStore();
  
//     const heal = (amount: number) => {
//       setPlayerStats((prev) => {
//         // Den “nackten” Wert hochzählen
//         const newLife = Math.min(prev.life + amount, store.playerInfo.maxLife);
//         return { ...prev, life: newLife };
//       });
//     };
  
//     return <button onClick={() => heal(20)}>Heile um 20</button>;
//   }
  
// WERTE ANZEIGEN
// function CharacterStats() {
//     const { store } = useGameStore();
//     const combined = getCombinedStats(store);
  
//     return (
//       <div>
//         <p>Aktuelles Leben (inkl. Waffe/Buffs): {combined.life}</p>
//         <p>Base Life (ohne Buffs): {store.playerStats.life}</p>
//       </div>
//     );
//   }
  