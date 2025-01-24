
// Pfad anpassen! Reuse deinen Editor, wenn du möchtest.

import DescriptionEditor from "../../EventEditor/Components/DescriptionEditor";
import { useQuestCreatorContext } from "../../Context/QuestContext";

export default function QuestBaseForm() {
  const {
    baseId,
    setBaseId,
    questId,
    label,
    setLabel,
    description,
    setDescription,
    reward,
    setReward,
    repeat,
    setRepeat,
  } = useQuestCreatorContext();

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "1rem 0" }}>
      <h3>Basis Quest-Daten</h3>
      <div className="form-group">
        <label>Basis-ID (z.B. "003FindStone"):</label>
        <input
          type="text"
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
        />
        <p>Quest-ID lautet: <b>{questId || "[bitte eingeben]"}</b></p>
      </div>

      <div className="form-group">
        <label>Label:</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Beschreibung (DescriptionEditor):</label>
        <DescriptionEditor
          value={description}
          onChange={(newVal) => setDescription(newVal)}
        />
      </div>

      <div className="form-group">
        <label>Reward (kurzer Text):</label>
        <DescriptionEditor
          value={reward}
          onChange={(newVal) => setReward(newVal)}
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
    </div>
  );
}
