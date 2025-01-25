import React, { createContext, useContext, useState, ReactNode } from "react";
import { PlacesKeys } from "../../../data/helper/colorfullStrings";
import { ItemCartegoryName, ItemName } from "../../../data/ItemData";
import { getAllPlaces } from "./Helper";
import { RaceName } from "../../../data/raceData";
import { OriginName } from "../../../data/originData";
import { CallingName } from "../../../data/callingData";
import { FeelingName } from "../../../data/feelingData";
import { ArmorName } from "../../../data/armorData";
import { WeaponName } from "../../../data/weaponData";

export const DEFAULT_CONDITIONS: ConditionsConfig = {
  operator: "=",
  gameTimeEnabled: false,
  gameStateEnabled: false,
  playerStatsEnabled: false,
  playerBaseEnabled: false,
  playerFluxEnabled: false,
  playerMetaEnabled: false,
  playerEconomyEnabled: false,
  playerItemsEnabled: false,

  // Die Teil-Objekte leer anlegen:
  gameTime: {},
  gameState: {},
  playerStats: {},
  playerBase: {},
  playerFlux: {},
  playerMeta: {},
  playerEconomy: {},
  // Wichtig: playerItems muss initial ein leeres Array sein:
  playerItems: [],
};

// Typen für den Kontext definieren
export type PlaceAndProb = {
  place: PlacesKeys;
  probability: number;
};

export interface ButtonConfig {
  label: string;
  message: string;

  itemsDeltaEnabled: boolean;
  economyDeltaEnabled: boolean;
  fluxDeltaEnabled: boolean;
  stateDeltaEnabled: boolean;
  baseDeltaEnabled: boolean;
  conditionsEnabled?: boolean;

  itemsDelta: {
    category: ItemCartegoryName;
    itemName: string;
    quantity: number;
  }[];
  economyDelta: { gold: number; edelsteine: number };
  fluxDelta: { feeling: string; buff: string; debuff: string; item: string };
  stateDelta: {
    life: number;
    rounds: number;
    attack: number;
    defense: number;
    luck: number;
  };
  baseDelta: { exp: number; reputation: number };
  triggerGroup: string;
  triggerQuest: string;
  endQuest: string;
  nextEvents: { eventId: string; probability: number }[];
  conditions?: ConditionsConfig;
}

export interface ConditionsConfig {
  operator?: "<" | ">" | "=";

  gameTimeEnabled?: boolean;
  gameStateEnabled?: boolean;
  playerStatsEnabled?: boolean;
  playerBaseEnabled?: boolean;
  playerFluxEnabled?: boolean;
  playerMetaEnabled?: boolean;
  playerEconomyEnabled?: boolean;
  playerItemsEnabled?: boolean;

  gameTime?: {
    gameTime?: string;    // z.B. "12:00"
    gameDay?: "Tag" | "Nacht";
  };

  gameState?: {
    weather?: string;
    temperature?: string;
  };

  playerStats?: {
    life?: number;
    rounds?: number;
    attack?: number;
    defense?: number;
    luck?: number;
  };

  playerBase?: {
    level?: number;
    exp?: number;
    standing?: number;
  };

  playerFlux?: {
    feeling?: FeelingName;
    weapon?: WeaponName;
    armor?: ArmorName;
    item?: ItemName;
    itemCategory?: ItemCartegoryName | "";
    haveBuff?: Record<string, number>;
    haveDebuff?: Record<string, number>;
  };

  playerMeta?: {
    race?: RaceName;
    origin?: OriginName;
    calling?: CallingName;
    titel?: string;
  };

  playerEconomy?: {
    gold?: number;
    edelsteine?: number;
  };

  playerItems: {
    category: ItemCartegoryName;
    itemName: ItemName;
    quantity: number;
  }[];

  haveBuffs?: boolean;
  haveDebuffs?: boolean;
}

interface ContextType {
  places: PlaceAndProb[];
  setPlaces: React.Dispatch<React.SetStateAction<PlaceAndProb[]>>;

  buttons: ButtonConfig[];
  setButtons: React.Dispatch<React.SetStateAction<ButtonConfig[]>>;

  eventId: string;
  setEventId: React.Dispatch<React.SetStateAction<string>>;

  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  addPlace: () => void;
  removePlace: (index: number) => void;

  addButton: () => void;
  removeButton: (index: number) => void;

  addItemsDeltaEntry: (buttonIndex: number) => void;
  removeItemsDeltaEntry: (buttonIndex: number, entryIndex: number) => void;

  addNextEvent: (buttonIndex: number) => void;
  removeNextEvent: (buttonIndex: number, neIndex: number) => void;
}

// Standardwerte für den Kontext
const defaultContextValue: ContextType = {
  places: [],
  setPlaces: () => { },

  buttons: [],
  setButtons: () => { },

  eventId: "",
  setEventId: () => { },

  label: "",
  setLabel: () => { },

  description: "",
  setDescription: () => { },

  addPlace: () => { },
  removePlace: () => { },

  addButton: () => { },
  removeButton: () => { },

  addItemsDeltaEntry: () => { },
  removeItemsDeltaEntry: () => { },

  addNextEvent: () => { },
  removeNextEvent: () => { },
};

// Den Kontext erstellen
const EditorContext = createContext<ContextType>(defaultContextValue);

// Provider-Komponente
export const EditorContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [eventId, setEventId] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buttons, setButtons] = useState<ButtonConfig[]>([]);
  const [places, setPlaces] = useState<PlaceAndProb[]>([]);

  const addPlace = () => {
    const all = getAllPlaces();
    const defaultPlace = all[0] ?? "Nordtor";
    setPlaces((prev) => [...prev, { place: defaultPlace, probability: 100 }]);
  };

  const removePlace = (index: number) => {
    setPlaces((prev) => prev.filter((_, i) => i !== index));
  };

  const addButton = () => {
    setButtons((prev) => [
      ...prev,
      {
        label: "",
        itemsDeltaEnabled: false,
        itemsDelta: [],
        economyDeltaEnabled: false,
        economyDelta: { gold: 0, edelsteine: 0 },
        fluxDeltaEnabled: false,
        fluxDelta: { feeling: "", buff: "", debuff: "", item: "" },
        stateDeltaEnabled: false,
        stateDelta: { life: 0, rounds: 0, attack: 0, defense: 0, luck: 0 },
        baseDeltaEnabled: false,
        baseDelta: { exp: 0, reputation: 0 },
        triggerGroup: "",
        triggerQuest: "",
        endQuest: "",
        nextEvents: [],
        message: "",
        conditionsEnabled: false,
        conditions: { ...DEFAULT_CONDITIONS },
      },
    ]);
  };

  const removeButton = (index: number) => {
    setButtons((prev) => prev.filter((_, i) => i !== index));
  };

  const addItemsDeltaEntry = (buttonIndex: number) => {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          itemsDelta: [
            ...btn.itemsDelta,
            { category: "" as ItemCartegoryName, itemName: "", quantity: 1 },
          ],
        };
      })
    );
  };

  const removeItemsDeltaEntry = (buttonIndex: number, entryIndex: number) => {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          itemsDelta: btn.itemsDelta.filter((_, idx) => idx !== entryIndex),
        };
      })
    );
  };

  const addNextEvent = (buttonIndex: number) => {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          nextEvents: [...btn.nextEvents, { eventId: "", probability: 100 }],
        };
      })
    );
  };

  const removeNextEvent = (buttonIndex: number, neIndex: number) => {
    setButtons((prev) =>
      prev.map((btn, i) => {
        if (i !== buttonIndex) return btn;
        return {
          ...btn,
          nextEvents: btn.nextEvents.filter((_, idx) => idx !== neIndex),
        };
      })
    );
  };

  return (
    <EditorContext.Provider
      value={{
        places,
        setPlaces,
        buttons,
        setButtons,
        eventId,
        setEventId,
        label,
        setLabel,
        description,
        setDescription,
        addPlace,
        removePlace,
        addButton,
        removeButton,
        addItemsDeltaEntry,
        removeItemsDeltaEntry,
        addNextEvent,
        removeNextEvent,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

// Custom Hook, um den Kontext einfacher zu nutzen
export const useEditorContext = (): ContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      "useEditorContext must be used within an EditorContextProvider"
    );
  }
  return context;
};
