// /* Neuer File: GameContext.tsx */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TEMPERATURE, WEATHER } from './weatherStrings';

type GameContextType = {
  gameTime: string;
  gameDay: string;
  gameWeather: string;
  gameTemperature: string;
  // wenn du Setter brauchst:
  setGameTime: React.Dispatch<React.SetStateAction<string>>;
  setGameDay: React.Dispatch<React.SetStateAction<string>>;
  setGameWeather: React.Dispatch<React.SetStateAction<string>>;
  setGameTemperature: React.Dispatch<React.SetStateAction<string>>;
};

/* Neue Zeile */
export const GameContext = createContext<GameContextType | null>(null);

/* Neue Zeile */
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameTime, setGameTime] = useState("12:00");
  const [gameDay, setGameDay] = useState("Tag");
  const [gameWeather, setGameWeather] = useState("sonnig");
  const [gameTemperature, setGameTemperature] = useState("warm");

  useEffect(() => {
      const updateGameTime = () => {
          const now = new Date();
          const minutes = now.getMinutes();
          const seconds = now.getSeconds();

          // Gesamtsekunden seit Beginn der Stunde
          const totalSeconds = minutes * 60 + seconds;

          // Berechnung der neuen Stundenanzahl in gameTime
          const gameHours = (totalSeconds / 3600) * 24; // 24 Stunden entsprechen 60 realen Minuten

          if(gameHours < 6 || gameHours > 20){
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

  useEffect(()=>{
      if(gameDay === "Tag"){
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
    <GameContext.Provider 
      value={{ gameTime, setGameTime, gameDay, setGameDay, gameWeather, setGameWeather, gameTemperature, setGameTemperature }}
    >
      {children}
    </GameContext.Provider>
  );
};

/* Neue Zeile */
export const useGameContext = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within a GameProvider');
  return ctx;
};
