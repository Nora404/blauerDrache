// QuestContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameQuest, emptyQuest, TaskType, Progress, Task } from "../../../data/questData";

/** So könnte dein Quest-Kontext aussehen */
type QuestContextType = {
  // Basisfelder aus GameQuest
  questId: string;
  setQuestId: React.Dispatch<React.SetStateAction<string>>;

  label: string;
  setLabel: React.Dispatch<React.SetStateAction<string>>;

  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

  reward: string;
  setReward: React.Dispatch<React.SetStateAction<string>>;

  repeat: boolean;
  setRepeat: React.Dispatch<React.SetStateAction<boolean>>;

  // Felder für "Trigger-Event" und "End-Event"
  eventTrigger: string;
  setEventTrigger: React.Dispatch<React.SetStateAction<string>>;

  eventEnd: string;
  setEventEnd: React.Dispatch<React.SetStateAction<string>>;

  // progress-Daten
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

const defaultContextValue: QuestContextType = {
  questId: "",
  setQuestId: () => {},
  label: "",
  setLabel: () => {},
  description: "",
  setDescription: () => {},
  reward: "",
  setReward: () => {},
  repeat: false,
  setRepeat: () => {},
  eventTrigger: "",
  setEventTrigger: () => {},
  eventEnd: "",
  setEventEnd: () => {},
  progress: {
    type: "Geheimnis",
    path: "/",
    eventByEnd: "",
    isDone: false,
    task: {},
  },
  setProgress: () => {},
};

const QuestContext = createContext<QuestContextType>(defaultContextValue);

export const QuestContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [questId, setQuestId] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [repeat, setRepeat] = useState(false);

  // Event, das die Quest startet
  const [eventTrigger, setEventTrigger] = useState("");
  // Event, das die Quest beendet
  const [eventEnd, setEventEnd] = useState("");

  // progress-Objekt
  const [progress, setProgress] = useState<Progress>({
    type: "Geheimnis",
    path: "/",
    eventByEnd: "",
    isDone: false,
    task: {},
  });

  return (
    <QuestContext.Provider
      value={{
        questId,
        setQuestId,
        label,
        setLabel,
        description,
        setDescription,
        reward,
        setReward,
        repeat,
        setRepeat,
        eventTrigger,
        setEventTrigger,
        eventEnd,
        setEventEnd,
        progress,
        setProgress,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};

export const useQuestContext = () => {
  const context = useContext(QuestContext);
  if (!context) {
    throw new Error(
      "useQuestContext must be used within a QuestContextProvider."
    );
  }
  return context;
};
