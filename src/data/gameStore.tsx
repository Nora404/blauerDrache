import React, { createContext, useContext, useEffect, useState } from "react";
import { ItemName } from "./ItemData";

//#region [prepare]
export type PlayerMeta = {
    name: string;
    rase: string;
    origin: string;
    calling: string;
    titel: string;
    feeling: string;
    weather: string;
    temperature: string;
    creating: boolean;
  };
  
  
export type PlayerStats = {
    level: number;
    nextLevel: number;
    exp: number;
    life: number;
    maxLife: number;
    rounds: number;
    maxRounds: number;
    attack: number;
    defense: number;
    luck: number;
  };
  
export  type PlayerEconomy = {
    gold: number;
    edelsteine: number;
  };
  
export type PlayerEquipment = {
    weapon: string;
    armor: string;
    items: Partial<Record<ItemName, number>>;
  };
  
export type PlayerProps = {
    meta: PlayerMeta;
    stats: PlayerStats;
    economy: PlayerEconomy;
    equipment: PlayerEquipment;
  };
//#endregion

//#region [prepare]
export const defaultPlayerData: PlayerProps = {
    meta: {
      name: "Nora404",
      rase: "Entwickler",
      origin: "Kinderzimmer",
      calling: "Spaß haben",
      titel: "Keiner",
      feeling: "Normal",
      weather: "sonnig",       
      temperature: "warm",     
      creating: false,
    },
    stats: {
      level: 1,
      nextLevel: 100,
      exp: 0,
      life: 100,
      maxLife: 100,
      rounds: 10,
      maxRounds: 10,
      attack: 10,
      defense: 10,
      luck: 10,
    },
    economy: {
      gold: 100,
      edelsteine: 0,
    },
    equipment: {
      weapon: "Nichts",
      armor: "Nichts",
      items: {}, 
    },
  };
  
type GameStoreContextType = {
    gameStore: PlayerProps;

    // setGameData: (data: Partial<PlayerProps>) => void;
    setMeta: (meta: Partial<PlayerMeta>) => void;
    setStats: (stats: Partial<PlayerStats>) => void;
    setEconomy: (economy: Partial<PlayerEconomy>) => void;
    setEquipment: (equipment: Partial<PlayerEquipment>) => void;
    resetGameData: () => void;
    newDay: () => void;
  };

const GameStoreContext = createContext<GameStoreContextType>({
  gameStore: defaultPlayerData,
  // setGameData: () => {},
  setMeta: () => {},
  setStats: () => {},
  setEconomy: () => {},
  setEquipment: () => {},
  resetGameData: () => {},
  newDay: () => {},
});

export const useGameStore = () => useContext(GameStoreContext);

export const GameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [gameStore, setGameData] = useState<PlayerProps>(() => {
        const saved = localStorage.getItem("LdbD-gameData"); 
        return saved ? JSON.parse(saved) : defaultPlayerData;
    });
//#endregion

//#region [events]
    useEffect(() => {
        localStorage.setItem("LdbD-gameData", JSON.stringify(gameStore));
    }, [gameStore]);
//#endregion

//#region
    const resetGameData = () => {
      setGameData(defaultPlayerData);
    };

    const newDay = () => {
      setGameData((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          life: prev.stats.maxLife, 
          rounds: prev.stats.maxRounds,
        },
      }));
    };

    const updateGameData = (data: Partial<PlayerProps>) => {
        setGameData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    const updateMeta = (meta: Partial<PlayerMeta>) => {
    setGameData((prev) => ({
        ...prev,
        meta: {
        ...prev.meta,
        ...meta,
        },
    }));
    };

    const updateStats = (stats: Partial<PlayerStats>) => {
    setGameData((prev) => ({
        ...prev,
        stats: {
        ...prev.stats,
        ...stats,
        },
    }));
    };

    const updateEconomy = (economy: Partial<PlayerEconomy>) => {
    setGameData((prev) => ({
        ...prev,
        economy: {
        ...prev.economy,
        ...economy,
        },
    }));
    };

    const updateEquipment = (equipment: Partial<PlayerEquipment>) => {
    setGameData((prev) => ({
        ...prev,
        equipment: {
        ...prev.equipment,
        ...equipment,
        },
    }));
    };
//#endregion

    return (
        <GameStoreContext.Provider
        value={{
          gameStore,
          // setGameData: updateGameData,
          setMeta: updateMeta,
          setStats: updateStats,
          setEconomy: updateEconomy,
          setEquipment: updateEquipment,
          resetGameData,
          newDay
        }}
      >
            {children}
        </GameStoreContext.Provider>
    );
};

// EINBAUEN
// export default function App() {
//     return (
//       <GameStoreProvider>
//         <MyGameComponent />
//       </GameStoreProvider>
//     );
//   }


// BENUTZEN
// export default function MyGameComponent() {
//     const { gameStore } = useGameStore();
  
//     const handleLevelUp = () => {
//       updateStats({
//         level: gameData.stats.level + 1,
//       });
//     };
  
//     return (
//       <div>
//         <p>Aktuelles Level: {gameData.stats.level}</p>
//         <button onClick={handleLevelUp}>Level Up!</button>
//       </div>
//     );
//   }