import React, { createContext, useContext, useEffect, useState } from 'react';
import { TEMPERATURE, WEATHER } from './weatherStrings';
import { PlayerStats, useGameStore } from './gameStore';
import { Race, racesMap, Subrace, emptyRaceObj, emptySubraceObj } from './raceData';
import { feelingMap, Feeling, emptyFeelingObj, getRandomFeeling } from './feelingData';
import { Calling, callingMap, emptyCallingObj } from './callingData';
import { Armor, armorMap, emptyArmorObj } from './armorData';
import { emptyWeaponObj, Weapon, weaponMap } from './weaponData';

type GameStateContextType = {
  gameTime: string;
  gameDay: string;
  selectedRace: Race;
  selectedOrigin: Subrace;
  selectedCalling: Calling;
  selectedFeeling: Feeling;
  selectedArmor: Armor;
  selectedWeapon: Weapon;
  tempStats: Partial<PlayerStats>;
  combinedStats: PlayerStats;
  updateTempStats: (stats: Partial<PlayerStats>) => void;
  clearStats: () => void;
};

export const GameStateContext = createContext<GameStateContextType | null>(null);

export const useGameState = () => useContext(GameStateContext);

export const GameStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameTime, setGameTime] = useState("12:00");
  const [gameDay, setGameDay] = useState("Tag");
  const [tempStats, setTempStats] = useState<Partial<PlayerStats>>({});

  const { gameStore, updateMeta } = useGameStore();

  //-----------------------------------------------------------------------------------------------

  const selectedRace = racesMap[gameStore.meta.rase] || emptyRaceObj;
  const selectedCalling = callingMap[gameStore.meta.calling] || emptyCallingObj;
  const selectedFeeling = feelingMap[gameStore.meta.feeling] || emptyFeelingObj;
  const selectedArmor = armorMap[gameStore.equipment.armor] || emptyArmorObj;
  const selectedWeapon = weaponMap[gameStore.equipment.weapon] || emptyWeaponObj;
  const selectedOrigin =
    selectedRace.subraces.find((subrace) => subrace.name === gameStore.meta.origin) || emptySubraceObj;

  //-----------------------------------------------------------------------------------------------

  const clearStast = () => {
    setTempStats({});
  }

  const updateEphemeralStats = (stats: Partial<PlayerStats>) => {
    setTempStats((prev) => {
      const updated = { ...prev };

      for (const key in stats) {
        const oldVal = updated[key as keyof PlayerStats] ?? 0;
        const newVal = stats[key as keyof PlayerStats] ?? 0;
        updated[key as keyof PlayerStats] = oldVal + newVal;
      }

      return updated;
    });
  };

  const combinedStats: PlayerStats = { ...gameStore.stats };
  for (const key in tempStats) {
    const baseVal = combinedStats[key as keyof PlayerStats] ?? 0;
    const tempVal = tempStats[key as keyof PlayerStats] ?? 0;
    combinedStats[key as keyof PlayerStats] = baseVal + tempVal;
  }
  combinedStats.attack += selectedWeapon.attack;
  combinedStats.defense += selectedArmor.defense;

  //-----------------------------------------------------------------------------------------------

  useEffect(() => {
    const updateGameTime = () => {
      const now = new Date();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const totalSeconds = minutes * 60 + seconds;
      const gameHours = (totalSeconds / 3600) * 24;

      if (gameHours < 6 || gameHours > 20) {
        setGameDay("Nacht");
      } else {
        setGameDay("Tag");
      }

      const calculatedHours = Math.floor(gameHours) % 24;
      let calculatedMinutes = Math.floor((gameHours - Math.floor(gameHours)) * 60);

      calculatedMinutes = Math.floor(calculatedMinutes / 10) * 10;

      const formattedHours = String(calculatedHours).padStart(2, '0');
      const formattedMinutes = String(calculatedMinutes).padStart(2, '0');
      const newGameTime = `${formattedHours}:${formattedMinutes}`;

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
        selectedArmor,
        selectedWeapon,
        tempStats: tempStats,
        combinedStats,
        updateTempStats: updateEphemeralStats,
        clearStats: clearStast,
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