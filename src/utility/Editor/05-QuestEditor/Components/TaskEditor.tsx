// TaskEditor.tsx

import { Task } from "../../../../data/questData";
import { useQuestCreatorContext } from "../../Context/QuestContext";


export default function TaskEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task, type } = progress;

  // Hilfsfunktion, um setProgress(task: {...}) zu machen
  const updateTask = (newTask: Partial<Task>) => {
    setProgress({ ...progress, task: { ...task, ...newTask } });
  };

  return (
    <div style={{ margin: "1rem 0", padding: "10px" }}>
      <h4>Task-Details</h4>

      <div className="form-group">
        <label>Task-Label (Anweisung im Questlog):</label>
        <input
          type="text"
          value={task.label || ""}
          onChange={(e) => updateTask({ label: e.target.value })}
        />
      </div>



      {type === "Begegnung" && <div className="form-group">
        <label>Begegnung:</label>
        <input
          type="text"
          value={task.talkWith || ""}
          onChange={(e) => updateTask({ talkWith: e.target.value })}
        />
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
