import React, { createContext, useContext, useEffect, useState } from "react";

type PlayerProps = {
    name: string;
    rase: string;
    origin: string;
    titel: string;
    feeling: string;
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
    gold: number;
    edelsteine: number;
    weapon: string;
    armor: string;
    items: Record<string, number>[];
};

const defaultPlayerData: PlayerProps = {
    name: 'Nora404',
    rase: 'Mensch',
    origin: 'Kinderzimmer',
    titel: 'Entwickler',
    feeling: 'Normal',
    level: 1,
    exp: 0,
    nextLevel: 100,
    life: 100,
    maxLife: 100,
    rounds: 10,
    maxRounds: 10,
    attack: 10,
    defense: 10,
    luck: 10,
    gold: 100,
    edelsteine: 0,
    weapon: "Nichts",
    armor: "Nichts",
    items: [],
}

type GameContextType = {
    gameData: PlayerProps;
    updateGameData: (data: Partial<PlayerProps>) => void;
};

const GameContext = createContext<GameContextType>({
    gameData: defaultPlayerData,
    updateGameData: () => { },
});

export const useGameContext = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [gameData, setGameData] = useState<PlayerProps>(() => {
        const saved = localStorage.getItem("LdbD-gameData"); 
        return saved ? JSON.parse(saved) : defaultPlayerData;
    });

    useEffect(() => {
        localStorage.setItem("LdbD-gameData", JSON.stringify(gameData));
    }, [gameData]);

    const updateGameData = (data: Partial<PlayerProps>) => {
        setGameData((prev) => ({
            ...prev,
            ...data,
        }));
    };

    return (
        <GameContext.Provider value={{ gameData, updateGameData }}>
            {children}
        </GameContext.Provider>
    );
};

// EINBAUEN
// export default function App() {
//     return (
//       <GameProvider>
//         <MyGameComponent />
//       </GameProvider>
//     );
//   }


// BENUTZEN
// export default function MyGameComponent() {
//     const { gameData, updateGameData } = useGameContext();
  
//     const handleLevelUp = () => {
//       updateGameData({ level: (gameData.level ?? 0) + 1 });
//     };
  
//     return (
//       <div>
//         <p>Aktuelles Level: {gameData.level ?? 1}</p>
//         <button onClick={handleLevelUp}>Level Up!</button>
//       </div>
//     );
//   }