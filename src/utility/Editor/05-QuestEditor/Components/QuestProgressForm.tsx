// QuestProgressForm.tsx
import TaskEditor from "./TaskEditor";
import { TaskType } from "../../../../data/questData";
import { useQuestCreatorContext } from "../../Context/QuestContext";
import PathSelector from "../../Components/PathSelector/PathSelector";

export default function QuestProgressForm() {
  const { progress, setProgress } = useQuestCreatorContext();

  const handleTypeChange = (newType: TaskType) => {
    setProgress({ ...progress, type: newType });
  };

  const handlePathChange = (newPath: string) => {
    setProgress({ ...progress, path: newPath });
  }

  return (
    <div className="border-dotted" style={{ padding: "10px", margin: "1rem 0" }}>
      <h3>Progress / Aufgabe</h3>
      <div className="form-group">
        Welchen Type hat die Quest?
        <select
          value={progress.type}
          onChange={(e) => handleTypeChange(e.target.value as TaskType)}
        >
          <option value="Begegnung">Begegnung</option>
          <option value="Besorgen">Besorgen</option>
          <option value="Benutzten">Benutzten</option>
          <option value="Besuchen">Besuchen</option>
          <option value="Besiegen">Besiegen</option>
          <option value="Erfahrung">Erfahrung</option>
          <option value="Verbessern">Verbessern</option>
          <option value="Geheimnis">Geheimnis</option>
        </select>
      </div>

      <div className="form-group">
        Wo wird das Abschließende Event getriggert?
        <PathSelector onChange={handlePathChange} />
      </div>


      {/* TaskEditor für label, talkWith, haveItem usw. */}
      <TaskEditor />

    </div>
  );
}
