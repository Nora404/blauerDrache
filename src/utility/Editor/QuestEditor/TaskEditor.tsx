// TaskEditor.tsx

import { Task } from "../../../data/questData";
import { useQuestCreatorContext } from "../Context/QuestContext";
import TaskHaveItemEditor from "./TaskHaveItemEditor";
import TaskSwitchEditor from "./TaskSwitchEditor";
import TaskUseItemEditor from "./TaskUseItemEditor";


export default function TaskEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task } = progress;

  function updateTask(partial: Partial<Task>) {
    setProgress({
      ...progress,
      task: { ...task, ...partial },
    });
  }

  return (
    <div style={{ margin: "1rem 0", padding: "10px", border: "1px dashed #999" }}>
      <h4>Task-Details</h4>

      <div className="form-group">
        <label>Task-Label:</label>
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

      {/* haveItem */}
      <TaskHaveItemEditor />

      {/* useItem */}
      <TaskUseItemEditor />

      {/* switch */}
      <TaskSwitchEditor />
    </div>
  );
}
