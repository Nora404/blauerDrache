// QuestMainData.tsx
import { TaskType } from "../../../data/questData";
import { useQuestContext } from "../Context/QuestContext";
// Ggf. Reuse "DescriptionEditor" wenn du magst

export default function QuestMainData() {
  const {
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
    progress,
    setProgress,
  } = useQuestContext();

  return (
    <div style={{ border: "1px dashed #666", padding: "10px", margin: "10px 0" }}>
      <div className="form-group">
        <label>Quest-ID*:</label>
        <input
          type="text"
          value={questId}
          onChange={(e) => setQuestId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Label*:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Beschreibung:</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* oder hier <DescriptionEditor value={description} onChange={setDescription} /> */}
      </div>

      <div className="form-group">
        <label>Reward (Belohnungstext):</label>
        <input
          type="text"
          value={reward}
          onChange={(e) => setReward(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={repeat}
            onChange={(e) => setRepeat(e.target.checked)}
          />
          Quest darf sich wiederholen?
        </label>
      </div>

      {/* Progress: z.B. type, path, eventByEnd, isDone, task */}
      <fieldset>
        <legend>Progress</legend>
        <div className="form-group">
          <label>Task-Typ:</label>
          <select
            value={progress.type}
            onChange={(e) =>
              setProgress({ ...progress, type: e.target.value as TaskType })
            }
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
          <label>Path (wo schließt man ab?):</label>
          <input
            type="text"
            value={progress.path}
            onChange={(e) => setProgress({ ...progress, path: e.target.value })}
          />
        </div>

        {/* progress.eventByEnd – falls du dieses Feld extra brauchst 
            (Manche packen das in quest.eventByEnd, je nach Logik) */}
        <div className="form-group">
          <label>progress.eventByEnd:</label>
          <input
            type="text"
            value={progress.eventByEnd}
            onChange={(e) =>
              setProgress({ ...progress, eventByEnd: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Task-Details (einfacher Freitext oder separate Felder):</label>
          <textarea
            rows={2}
            value={JSON.stringify(progress.task)}
            onChange={(e) => {
              // Vorsicht: JSON.parse kann crashen, wenn user Mist eingibt
              try {
                const obj = JSON.parse(e.target.value);
                setProgress({ ...progress, task: obj });
              } catch {
                // do nothing oder roter Rahmen
              }
            }}
          />
        </div>
      </fieldset>
    </div>
  );
}
