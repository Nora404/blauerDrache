// QuestCreatorContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Progress } from "../../../data/questData";
import { ButtonConfig } from "./EventContext";

// ^ Ggfs. pfad anpassen. 
//   Oder du kopierst dir den ButtonConfig-Typ, den du schon in deinem Event-Editor hast.

type QuestCreatorContextType = {
  // --------- Gemeinsame ID-Basis, z.B. "003FindStone" ---------
  baseId: string;
  setBaseId: React.Dispatch<React.SetStateAction<string>>;

  // --------- Quest Felder ---------
  questId: string;   // Qxxx
  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  reward: string;
  setReward: React.Dispatch<React.SetStateAction<string>>;
  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;

  // progress
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;

  // --------- Trigger-Event Felder ---------
  triggerEventId: string;  // ExxxTrigger
  triggerDescription: string;
  setTriggerDescription: React.Dispatch<React.SetStateAction<string>>;
  triggerButtons: ButtonConfig[];
  setTriggerButtons: React.Dispatch<React.SetStateAction<ButtonConfig[]>>;

  // --------- End-Event Felder ---------
  endEventId: string;      // ExxxEnd
  endDescription: string;
  setEndDescription: React.Dispatch<React.SetStateAction<string>>;
  endButtons: ButtonConfig[];
  setEndButtons: React.Dispatch<React.SetStateAction<ButtonConfig[]>>;

   // Button 1: Trigger-Accept
   triggerAcceptBtn: ButtonConfig;
   setTriggerAcceptBtn: React.Dispatch<React.SetStateAction<ButtonConfig>>;
 
   // Button 2: Trigger-Decline
   triggerDeclineBtn: ButtonConfig;
   setTriggerDeclineBtn: React.Dispatch<React.SetStateAction<ButtonConfig>>;
 
   // Button 3: End-Button
   endButton: ButtonConfig;
   setEndButton: React.Dispatch<React.SetStateAction<ButtonConfig>>;
};

const defaultProgress: Progress = {
  type: "Geheimnis",
  path: "/",
  eventByEnd: "",
  isDone: false,
  task: {},
};

const defaultButton: ButtonConfig = {
  label: "",
  message: "",
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
};

const defaultContextValue: QuestCreatorContextType = {
  baseId: "",
  setBaseId: () => {},

  questId: "",
  label: "",
  setLabel: () => {},
  description: "",
  setDescription: () => {},
  reward: "",
  setReward: () => {},
  repeat: false,
  setRepeat: () => {},
  progress: defaultProgress,
  setProgress: () => {},

  triggerEventId: "",
  triggerDescription: "",
  setTriggerDescription: () => {},
  triggerButtons: [],
  setTriggerButtons: () => {},

  endEventId: "",
  endDescription: "",
  setEndDescription: () => {},
  endButtons: [],
  setEndButtons: () => {},

  triggerAcceptBtn: defaultButton,
  setTriggerAcceptBtn: () => {},
  triggerDeclineBtn: defaultButton,
  setTriggerDeclineBtn: () => {},
  endButton: defaultButton,
  setEndButton: () => {},
};

const QuestCreatorContext = createContext<QuestCreatorContextType>(defaultContextValue);

export const QuestCreatorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Basis ID, vom User eingegeben, z.B. "003FindStone"
  const [baseId, setBaseId] = useState("");

  // Ableitungen
  const questId = baseId ? "Q" + baseId : "";
  const triggerEventId = baseId ? "E" + baseId + "Trigger" : "";
  const endEventId = baseId ? "E" + baseId + "End" : "";

  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [repeat, setRepeat] = useState(false);

  const [progress, setProgress] = useState<Progress>(defaultProgress);

  // Trigger-Event:
  const [triggerDescription, setTriggerDescription] = useState("");
  const [triggerButtons, setTriggerButtons] = useState<ButtonConfig[]>([]);

  // End-Event:
  const [endDescription, setEndDescription] = useState("");
  const [endButtons, setEndButtons] = useState<ButtonConfig[]>([]);

  const [triggerAcceptBtn, setTriggerAcceptBtn] = useState<ButtonConfig>({
    ...defaultButton,
    label: "Annehmen",
    message: "Du hast zugesagt...",
  });

  const [triggerDeclineBtn, setTriggerDeclineBtn] = useState<ButtonConfig>({
    ...defaultButton,
    label: "Ablehnen",
    message: "Du hast abgelehnt...",
  });

  const [endButton, setEndButton] = useState<ButtonConfig>({
    ...defaultButton,
    label: "Fertig",
    message: "Du übergibst die Steine...",
  });


  return (
    <QuestCreatorContext.Provider
      value={{
        baseId,
        setBaseId,
        questId,
        label,
        setLabel,
        description,
        setDescription,
        reward,
        setReward,
        repeat,
        setRepeat,
        progress,
        setProgress,
        triggerEventId,
        triggerDescription,
        setTriggerDescription,
        triggerButtons,
        setTriggerButtons,
        endEventId,
        endDescription,
        setEndDescription,
        endButtons,
        setEndButtons,
        triggerAcceptBtn,
        setTriggerAcceptBtn,
        triggerDeclineBtn,
        setTriggerDeclineBtn,
        endButton,
        setEndButton,
      }}
    >
      {children}
    </QuestCreatorContext.Provider>
  );
};

export const useQuestCreatorContext = () => {
  const context = useContext(QuestCreatorContext);
  if (!context) {
    throw new Error("useQuestCreatorContext must be used within QuestCreatorProvider");
  }
  return context;
};
