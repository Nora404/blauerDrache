// TaskSwitchEditor.tsx

import { useQuestCreatorContext } from "../Context/QuestContext";


// interne Hilfstypen
type SwitchEntry = { key: string; val: boolean };

export default function TaskSwitchEditor() {
  const { progress, setProgress } = useQuestCreatorContext();
  const { task } = progress;
  const switchObj = task.switch || {};

  // Convert to array
  const entries: SwitchEntry[] = Object.entries(switchObj).map(([k, v]) => ({
    key: k,
    val: v,
  }));

  function updateSwitch(newEntries: SwitchEntry[]) {
    const newObj: Record<string, boolean> = {};
    newEntries.forEach((e) => {
      newObj[e.key] = e.val;
    });

    setProgress({
      ...progress,
      task: {
        ...task,
        switch: newObj,
      },
    });
  }

  function addEntry() {
    updateSwitch([...entries, { key: "", val: false }]);
  }

  function removeEntry(index: number) {
    const newArr = entries.filter((_, i) => i !== index);
    updateSwitch(newArr);
  }

  function updateEntry(index: number, partial: Partial<SwitchEntry>) {
    const newArr = entries.map((entry, i) =>
      i === index ? { ...entry, ...partial } : entry
    );
    updateSwitch(newArr);
  }

  return (
    <div className="nested-section">
      <h4>Switch (Record&lt;string, boolean&gt;)</h4>
      {entries.map((entry, i) => (
        <div key={i} className="flex-row">
          <input
            type="text"
            placeholder="Switch-Key"
            value={entry.key}
            onChange={(e) => updateEntry(i, { key: e.target.value })}
          />
          <select
            value={entry.val ? "true" : "false"}
            onChange={(e) => updateEntry(i, { val: e.target.value === "true" })}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
          <button onClick={() => removeEntry(i)}>Entfernen</button>
        </div>
      ))}
      <button onClick={addEntry}>Neuen Switch-Key hinzufügen</button>
    </div>
  );
}
