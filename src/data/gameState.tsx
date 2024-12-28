// /* Neuer File: GameContext.tsx */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TEMPERATURE, WEATHER } from './weatherStrings';
import { useGameStore } from './gameStore';
import { Race, racesMap, Subrace, emptyRaceObj, emptySubraceObj } from './raceDefaults';

type GameStateContextType = {
  gameTime: string;
  gameDay: string;
  gameWeather: string;
  gameTemperature: string;
  selectedRace: Race;
  selectedOrigin: Subrace;
};

export const GameStateContext = createContext<GameStateContextType | null>(null);

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameTime, setGameTime] = useState("12:00");
  const [gameDay, setGameDay] = useState("Tag");
  const [gameWeather, setGameWeather] = useState("sonnig");
  const [gameTemperature, setGameTemperature] = useState("warm");

  //-----------------------------------------------------------------------------------------------

  const { gameData } = useGameStore();

  const selectedRace = racesMap[gameData.meta.rase] || emptyRaceObj;
  const selectedOrigin = selectedRace.subraces.find(
    (subrace) => subrace.name === gameData.meta.origin
  ) || emptySubraceObj;

  //-----------------------------------------------------------------------------------------------

  useEffect(() => {
    const updateGameTime = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      // Gesamtsekunden seit Beginn der Stunde
      const totalSeconds = minutes * 60 + seconds;

      // Berechnung der neuen Stundenanzahl in gameTime
      const gameHours = (totalSeconds / 3600) * 24; // 24 Stunden entsprechen 60 realen Minuten

      if (gameHours < 6 || gameHours > 20) {
        setGameDay("Nacht");
      } else {
        setGameDay("Tag");
      }

      const calculatedHours = Math.floor(gameHours) % 24;
      let calculatedMinutes = Math.floor((gameHours - Math.floor(gameHours)) * 60);

      // Runden der Minuten auf das nächste 10er-Multiplikum
      calculatedMinutes = Math.floor(calculatedMinutes / 10) * 10;

      // Formatierung mit führenden Nullen
      const formattedHours = String(calculatedHours).padStart(2, '0');
      const formattedMinutes = String(calculatedMinutes).padStart(2, '0');

      // Erstellung des neuen Zeitstrings
      const newGameTime = `${formattedHours}:${formattedMinutes}`;

      // Aktualisierung des States, nur wenn sich die Zeit ändert
      if (newGameTime !== gameTime) {
        setGameTime(newGameTime);
      }
    };
    updateGameTime();
    const intervalId = setInterval(updateGameTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (gameDay === "Tag") {
      const randomWeather = getRandomElement(WEATHER);
      const randomTemperature = getRandomElement(TEMPERATURE);
      setGameWeather(randomWeather);
      setGameTemperature(randomTemperature);
    }
  }, [gameDay]);

  const getRandomElement = (array: string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  return (
    <GameStateContext.Provider
      value={{
        gameTime,
        gameDay,
        gameWeather,
        gameTemperature,
        selectedRace,
        selectedOrigin,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

// EINBAUEN
// export default function App() {
//     return (
//       <GameStateProvider>
//         <MyGameComponent />
//       </GameStateProvider>
//     );
//   }

// BENUTZEN
// export default function MyGameComponent() {
//  const gameState = useGameState();
//
//   // Wichtig: Falls gameState null ist, hier abfangen
//   if (!gameState) return null;
//
//   const { gameTime, gameDay, gameWeather, gameTemperature } = gameState;
//   return (
//     <div>
//     <div>
//       <p>Time: {gameTime}</p>
//       <p>Day/Night: {gameDay}</p>
//       <p>Weather: {gameWeather}</p>
//       <p>Temperature: {gameTemperature}</p>
//     </div>
//     </div>
//   );
// }