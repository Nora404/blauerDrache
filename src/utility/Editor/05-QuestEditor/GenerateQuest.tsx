// GenerateQuests.tsx
import "../Editor.css";
import { QuestCreatorProvider } from "../Context/QuestContext";
import QuestCodeGenerator from "./GenerateQuestCode";
import QuestBaseForm from "./Components/QuestBaseForm";
import QuestEndEventForm from "./Components/QuestEndEventForm";
import QuestProgressForm from "./Components/QuestProgressForm";
import QuestTriggerEventForm from "./Components/QuestTriggerEventForm";
import { useState } from "react";


export default function GenerateQuests() {
  const [showTask, setShowTask] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const toggleTask = () => setShowTask(prev => !prev);
  const toggleTrigger = () => setShowTrigger(prev => !prev);
  const toggleEnd = () => setShowEnd(prev => !prev);

  return (
    <QuestCreatorProvider>
      <div className="text-left max-width">
        <h2>Quest-Editor</h2>
        <p>Erstellt eine Quest + zugehörige Trigger-/End-Events. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies</p>

        <QuestBaseForm />


        <button
          className={showTask ? "remove-button" : "add-button"}
          onClick={toggleTask}
        >
          Aufgabe {showTask ? "verstecken" : "erstellen"}
        </button>
        {showTask && <QuestProgressForm />}

        <button
          className={showTrigger ? "remove-button" : "add-button"}
          onClick={toggleTrigger}
        >
          Trigger Event {showTrigger ? "verstecken" : "erstellen"}
        </button>
        {showTrigger && <QuestTriggerEventForm />}

        <button
          className={showEnd ? "remove-button" : "add-button"}
          onClick={toggleEnd}
        >
          End Event {showEnd ? "verstecken" : "erstellen"}
        </button>
        {showEnd && <QuestEndEventForm />}


        <QuestCodeGenerator />
      </div>
    </QuestCreatorProvider>
  );
}
