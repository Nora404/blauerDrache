import { randomEvents } from "../../../data/eventList";
import { gameQuestEvents } from "../../../data/questList";
import { useQuestContext } from "../Context/QuestContext";

export default function QuestEnd() {
  const { eventEnd, setEventEnd } = useQuestContext();

  return (
    <div style={{ border: "1px dashed #666", padding: "10px", margin: "10px 0" }}>
      <label>Event, das die Quest beendet (für die Belohnung):</label>
      <div className="flex-row">
        <select
          className="w-100"
          value={eventEnd}
          onChange={(e) => setEventEnd(e.target.value)}
        >
          <option value="">-- Event wählen --</option>
          {gameQuestEvents.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.label || ev.id}
            </option>
          ))}
          {randomEvents.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.label || ev.id}
            </option>
          ))}
        </select>

        <input
          className="w-100"
          type="text"
          placeholder="Oder manuell eingeben"
          value={eventEnd}
          onChange={(e) => setEventEnd(e.target.value)}
        />
      </div>
    </div>
  );
}
