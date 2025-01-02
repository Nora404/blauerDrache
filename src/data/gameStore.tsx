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

    updateGameData: (data: Partial<PlayerProps>) => void;
    updateMeta: (meta: Partial<PlayerMeta>) => void;
    updateStats: (stats: Partial<PlayerStats>) => void;
    updateEconomy: (economy: Partial<PlayerEconomy>) => void;
    updateEquipment: (equipment: Partial<PlayerEquipment>) => void;
    resetGameData: () => void;
  };

const GameStoreContext = createContext<GameStoreContextType>({
  gameStore: defaultPlayerData,
  updateGameData: () => {},
  updateMeta: () => {},
  updateStats: () => {},
  updateEconomy: () => {},
  updateEquipment: () => {},
  resetGameData: () => {},
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
          updateGameData,
          updateMeta,
          updateStats,
          updateEconomy,
          updateEquipment,
          resetGameData,
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