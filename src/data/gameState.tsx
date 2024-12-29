import React, { createContext, useContext, useEffect, useState } from 'react';
import { TEMPERATURE, WEATHER } from './weatherStrings';
import { PlayerStats, useGameStore } from './gameStore';
import { Race, racesMap, Subrace, emptyRaceObj, emptySubraceObj, callingMap, emptyCallingObj, Calling } from './raceDefaults';
import { feelingMap, Feeling, emptyFeelingObj, getRandomFeeling } from './feelingData';

type GameStateContextType = {
  gameTime: string;
  gameDay: string;
  selectedRace: Race;
  selectedOrigin: Subrace;
  selectedCalling: Calling;
  selectedFeeling: Feeling;
  ephemeralStats: Partial<PlayerStats>;
  combinedStats: PlayerStats;
  updateEphemeralStats: (stats: Partial<PlayerStats>) => void;
  clearStast: () => void;
};

export const GameStateContext = createContext<GameStateContextType | null>(null);

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameTime, setGameTime] = useState("12:00");
  const [gameDay, setGameDay] = useState("Tag");
  // const [gameWeather, setGameWeather] = useState("sonnig");
  // const [gameTemperature, setGameTemperature] = useState("warm");

  const { gameData, updateMeta } = useGameStore();

  //-----------------------------------------------------------------------------------------------

  const selectedRace = racesMap[gameData.meta.rase] || emptyRaceObj;
  const selectedCalling = callingMap[gameData.meta.calling] || emptyCallingObj;
  const selectedOrigin = selectedRace.subraces.find(
    (subrace) => subrace.name === gameData.meta.origin
  ) || emptySubraceObj;
  const selectedFeeling = feelingMap[gameData.meta.feeling] || emptyFeelingObj;

  const [ephemeralStats, setEphemeralStats] = useState<Partial<PlayerStats>>({});

  //-----------------------------------------------------------------------------------------------

  const clearStast = () => {
    setEphemeralStats({});
  }

  const updateEphemeralStats = (stats: Partial<PlayerStats>) => {
    setEphemeralStats((prev) => {
      const updated = { ...prev };
      // Durch alle übertragenen Stats loopen und addieren
      for (const key in stats) {
        // Falls noch kein Wert existiert, 0 annehmen
        const oldVal = updated[key as keyof PlayerStats] ?? 0;
        const newVal = stats[key as keyof PlayerStats] ?? 0;
        updated[key as keyof PlayerStats] = oldVal + newVal;
      }
      return updated;
    });
  };

  const combinedStats: PlayerStats = { ...gameData.stats };
  for (const key in ephemeralStats) {
    const baseVal = combinedStats[key as keyof PlayerStats] ?? 0;
    const tempVal = ephemeralStats[key as keyof PlayerStats] ?? 0;
    combinedStats[key as keyof PlayerStats] = baseVal + tempVal;
  }

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
      clearStast();

      const { feeling, data } = getRandomFeeling();
      const weather = getRandomElement(WEATHER);
      const temperature = getRandomElement(TEMPERATURE);
      updateMeta({
        weather,
        temperature,
        feeling: feeling.name
      });

      updateEphemeralStats(data);
    }
  }, [gameDay]);

  //-----------------------------------------------------------------------------------------------

  const getRandomElement = (array: string[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  //-----------------------------------------------------------------------------------------------

  return (
    <GameStateContext.Provider
      value={{
        gameTime,
        gameDay,
        selectedRace,
        selectedOrigin,
        selectedCalling,
        selectedFeeling,
        ephemeralStats,
        combinedStats,
        updateEphemeralStats,
        clearStast,
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

// STATS
// <button onClick={() => handleTest(20)}>Füge 20 Leben dazu</button><br />
// <button onClick={() => handleTest(-15)}>Entferne 15 Leben</button><br />
// Das aktuelle Leben ist: {gameState.combinedStats.life}
//
// const handleTest = (n: number) => {
//   gameState.updateEphemeralStats({ life: n })
// }