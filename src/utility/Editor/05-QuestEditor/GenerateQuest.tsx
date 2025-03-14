// GenerateQuests.tsx
import "../Editor.css";
import { QuestCreatorProvider } from "../Context/QuestContext";
import QuestCodeGenerator from "./GenerateQuestCode";
import QuestBaseForm from "./Components/QuestBaseForm";
import QuestEndEventForm from "./Components/QuestEndEventForm";
import QuestProgressForm from "./Components/QuestProgressForm";
import QuestTriggerEventForm from "./Components/QuestTriggerEventForm";



export default function GenerateQuests() {
  return (
    <QuestCreatorProvider>
      <div className="text-left max-width">
        <h2>Quest-Editor</h2>
        <p>Erstellt eine Quest + zugehörige Trigger-/End-Events. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
          ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies</p>

        <QuestBaseForm />
        <QuestProgressForm />

        <details open>
          <summary>
            <b>Trigger-Event</b>
          </summary>
          <QuestTriggerEventForm />
        </details>

        <details open>
          <summary>
            <b>End-Event</b>
          </summary>
          <QuestEndEventForm />
        </details>

        <QuestCodeGenerator />
      </div>
    </QuestCreatorProvider>
  );
}
