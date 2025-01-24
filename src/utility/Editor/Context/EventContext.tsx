import React, { createContext, useContext, useState, ReactNode } from "react";
import { PlacesKeys } from "../../../data/helper/colorfullStrings";
import { ItemCartegoryName } from "../../../data/ItemData";
import { getAllPlaces } from "./Helper";
import { Conditions } from "../../../data/eventData";

// Typen für den Kontext definieren
export type PlaceAndProb = {
  place: PlacesKeys;
  probability: number;
};

export interface ButtonConfig {
  label: string;
  itemsDeltaEnabled: boolean;
  itemsDelta: {
    category: ItemCartegoryName;
    itemName: string;
    quantity: number;
  }[];
  economyDeltaEnabled: boolean;
  economyDelta: { gold: number; edelsteine: number };
  fluxDeltaEnabled: boolean;
  fluxDelta: { feeling: string; buff: string; debuff: string; item: string };
  stateDeltaEnabled: boolean;
  stateDelta: {
    life: number;
    rounds: number;
    attack: number;
    defense: number;
    luck: number;
  };
  baseDeltaEnabled: boolean;
  baseDelta: { exp: number; reputation: number };
  triggerGroup: string;
  triggerQuest: string;
  endQuest: string;
  nextEvents: { eventId: string; probability: number }[];
  message: string;
  conditions?: Conditions;
  conditionsEnabled?: boolean;
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
