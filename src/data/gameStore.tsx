import React, { createContext, useContext, useEffect, useState } from "react";

type PlayerMeta = {
    name: string;
    rase: string;
    origin: string;
    titel: string;
    feeling: string;
    creating: number;
  };
  
  type PlayerStats = {
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
  
  type PlayerEconomy = {
    gold: number;
    edelsteine: number;
  };
  
  type PlayerEquipment = {
    weapon: string;
    armor: string;
    items: Record<string, number>;
  };
  
  type PlayerProps = {
    meta: PlayerMeta;
    stats: PlayerStats;
    economy: PlayerEconomy;
    equipment: PlayerEquipment;
  };

//--------------------------------------------------------------

export const defaultPlayerData: PlayerProps = {
    meta: {
      name: "Nora404",
      rase: "Entwickler",
      origin: "Kinderzimmer",
      titel: "Keiner",
      feeling: "Normal",
      creating: 0,
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
  
//--------------------------------------------------------------

type GameStoreContextType = {
    gameData: PlayerProps;

    updateGameData: (data: Partial<PlayerProps>) => void;
    updateMeta: (meta: Partial<PlayerMeta>) => void;
    updateStats: (stats: Partial<PlayerStats>) => void;
    updateEconomy: (economy: Partial<PlayerEconomy>) => void;
    updateEquipment: (equipment: Partial<PlayerEquipment>) => void;
  };

const GameStoreContext = createContext<GameStoreContextType>({
  gameData: defaultPlayerData,
  updateGameData: () => {},
  updateMeta: () => {},
  updateStats: () => {},
  updateEconomy: () => {},
  updateEquipment: () => {},
});

export const useGameStore = () => useContext(GameStoreContext);

export const GameStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    
    const [gameData, setGameData] = useState<PlayerProps>(() => {
        const saved = localStorage.getItem("LdbD-gameData"); 
        return saved ? JSON.parse(saved) : defaultPlayerData;
    });

    useEffect(() => {
        localStorage.setItem("LdbD-gameData", JSON.stringify(gameData));
    }, [gameData]);

//--------------------------------------------------------------

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

    return (
        <GameStoreContext.Provider
        value={{
          gameData,
          updateGameData,
          updateMeta,
          updateStats,
          updateEconomy,
          updateEquipment,
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
//     const { gameData, updateStats } = useGameStore();
  
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