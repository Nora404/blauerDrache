// QuestTrigger.tsx

// Falls du eine Liste aller Events hast:
import { randomEvents } from "../../../data/eventList";
import { gameQuestEvents } from "../../../data/questList";
import { useQuestContext } from "../Context/QuestContext";

export default function QuestTrigger() {
  const { eventTrigger, setEventTrigger } = useQuestContext();

  return (
    <div style={{ border: "1px dashed #666", padding: "10px", margin: "10px 0" }}>
      <label>Event, das diese Quest triggert:</label>
      <div className="flex-row">
        <select
          className="w-100"
          value={eventTrigger}
          onChange={(e) => setEventTrigger(e.target.value)}
        >
          <option value="">-- Wähle ein vorhandenes Event aus --</option>
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
          value={eventTrigger}
          onChange={(e) => setEventTrigger(e.target.value)}
        />
      </div>
    </div>
  );
}
