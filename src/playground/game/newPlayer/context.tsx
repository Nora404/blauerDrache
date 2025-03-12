import React, { createContext, ReactNode, useMemo, useState } from 'react';
import { Calling, emptyCallingObj } from '../../../data/callingData';
import { emptyOriginObj, Origin } from '../../../data/originData';
import { emptyRaceObj, Race } from '../../../data/raceData';

type CreatePlayerContextType = {
  race: typeof emptyRaceObj;
  setRace: React.Dispatch<React.SetStateAction<Race>>;
  origin: typeof emptyOriginObj;
  setOrigin: React.Dispatch<React.SetStateAction<Origin>>;
  calling: typeof emptyCallingObj;
  setCalling: React.Dispatch<React.SetStateAction<Calling>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}
type ChildrenType = { children: ReactNode};

// eslint-disable-next-line react-refresh/only-export-components
export const CreatePlayerContext = createContext<CreatePlayerContextType | undefined>(undefined);

export const CreatePlayerProvider = ({ children }: ChildrenType) => {
  const [race, setRace] = useState(emptyRaceObj);
  const [origin, setOrigin] = useState(emptyOriginObj);
  const [calling, setCalling] = useState(emptyCallingObj);
  const [name, setName] = useState("Namenloser Held");

  const value = useMemo(() => ({
    race, setRace,
    origin, setOrigin,
    calling, setCalling,
    name, setName,
  }), [race, origin, calling, name]);

  return (
    <CreatePlayerContext.Provider value={value}>
      {children}
    </CreatePlayerContext.Provider>
  );
};