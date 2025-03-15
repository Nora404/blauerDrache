// TaskEditor.tsx

import { Task } from "../../../../data/questData";
import PathSelector from "../../Components/PathSelector/PathSelector";
import VariableInput from "../../Components/VariableInputText/VariableInput";
import { useQuestCreatorContext } from "../../Context/QuestContext";


export default function TaskEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task, type } = progress;

  // Hilfsfunktion, um setProgress(task: {...}) zu machen
  const updateTask = (newTask: Partial<Task>) => {
    setProgress({ ...progress, task: { ...task, ...newTask } });
  };

  const handlePathChangeTalkWith = (newPath: string) => {
    const newTask = { ...task, talkWith: newPath };
    setProgress({ ...progress, task: newTask });
  }
  const handleLabelChange = (newLabel: string) => {
    const newTask = { ...task, label: newLabel };
    setProgress({ ...progress, task: newTask });
  };

  return (
    <div>
      <h4>Task-Details</h4>


      {type === "Begegnung" && <div className="form-group">
        <div className="form-group">
          <label>Begegnung (Wird als Path gespeichert, es muss also eine Seite geben):</label>
          <PathSelector onChange={handlePathChangeTalkWith} />
        </div>
        <div className="form-group">
          <label>Task-Label (Anweisung im Questlog):</label>
          <VariableInput value={task.label || ""} onChange={handleLabelChange} />
        </div>
      </div>}


      {type === "Erkunden" && <div className="form-group">
        <label>Erkunden:</label>
        <input
          type="text"
          value={task.goTo || ""}
          onChange={(e) => updateTask({ goTo: e.target.value })}
        />
      </div>}

      {type === "Besorgen" && <div className="form-group">
        <label>Besorgen</label>
        <input
          type="text"
          value={
            task.haveItem ? JSON.stringify(task.haveItem) : ""
          }
          onChange={(e) => {
            try {
              const arr = JSON.parse(e.target.value);
              updateTask({ haveItem: arr });
            } catch {
              // do nothing
            }
          }}
        />
      </div>}

      {type === "Benutzten" && <div className="form-group">
        <label>Benutzten</label>
        <input
          type="text"
          value={task.useItem ? JSON.stringify(task.useItem) : ""}
          onChange={(e) => {
            try {
              const obj = JSON.parse(e.target.value);
              updateTask({ useItem: obj });
            } catch { }
          }}
        />
      </div>}

      {type === "Geheimnis" && <div className="form-group">
        <label>Geheimnis</label>
        <input
          type="text"
          value={task.switch ? JSON.stringify(task.switch) : ""}
          onChange={(e) => {
            try {
              const obj = JSON.parse(e.target.value);
              updateTask({ switch: obj });
            } catch { }
          }}
        />
      </div>}

      {type === "Besiegen" && <div className="form-group">
        <label>Besiegen</label>
        <input
          type="text"
          value={task.enemy ? JSON.stringify(task.enemy) : ""}
          onChange={(e) => {
            try {
              const arr = JSON.parse(e.target.value);
              updateTask({ enemy: arr });
            } catch { }
          }}
        />
      </div>}

      {type === "Erfahrung" && <div className="form-group">
        <label>Erfahrung</label>
        <input
          type="text"
          value={task.base ? JSON.stringify(task.base) : ""}
          onChange={(e) => {
            try {
              const obj = JSON.parse(e.target.value);
              updateTask({ base: obj });
            } catch { }
          }}
        />
      </div>}

      {type === "Verbessern" && <div className="form-group">
        <label>Verbessern</label>
        <input
          type="text"
          value={task.stats ? JSON.stringify(task.stats) : ""}
          onChange={(e) => {
            try {
              const obj = JSON.parse(e.target.value);
              updateTask({ stats: obj });
            } catch { }
          }}
        />
      </div>}
    </div>
  );
}
