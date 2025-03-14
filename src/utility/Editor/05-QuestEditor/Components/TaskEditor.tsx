// TaskEditor.tsx

import { Task } from "../../../../data/questData";
import { useQuestCreatorContext } from "../../Context/QuestContext";


export default function TaskEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task } = progress;

  // Hilfsfunktion, um setProgress(task: {...}) zu machen
  const updateTask = (newTask: Partial<Task>) => {
    setProgress({ ...progress, task: { ...task, ...newTask } });
  };

  return (
    <div style={{ margin: "1rem 0", padding: "10px", border: "1px dashed #999" }}>
      <h4>Task-Details</h4>

      <div className="form-group">
        <label>Task-Label (kleiner Text):</label>
        <input
          type="text"
          value={task.label || ""}
          onChange={(e) => updateTask({ label: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>talkWith:</label>
        <input
          type="text"
          value={task.talkWith || ""}
          onChange={(e) => updateTask({ talkWith: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>goTo:</label>
        <input
          type="text"
          value={task.goTo || ""}
          onChange={(e) => updateTask({ goTo: e.target.value })}
        />
      </div>

      {/* haveItem, useItem usw. 
          Du könntest hier separate Sub-Formen machen, 
          so wie bei ItemsDelta. Nur zur Demonstration:
      */}
      <div className="form-group">
        <label>haveItem: (JSON-Eingabe oder Liste?)</label>
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
      </div>

      <div className="form-group">
        <label>useItem: (JSON-Eingabe oder Einzelfelder?)</label>
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
      </div>

      {/* baseDelta, stateDelta => evtl. wiederverwendbare Components */}
      {/* switch -> ein Beispiel: Task hat switch?: Record<string, boolean> */}
      <div className="form-group">
        <label>switch (Key=string, Value=boolean):</label>
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
      </div>
    </div>
  );
}
