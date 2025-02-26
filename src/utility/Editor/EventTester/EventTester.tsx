// [NEU] Datei: TestEventManager.tsx
import React, { useState } from "react";
import { gameBattles } from "../../../data/battleList";
import { gameEvents } from "../../../data/eventList";
import { gameQuestEvents } from "../../../data/questList";
import { EventManager } from "../../../layout/Events/EventManager";

export const TestEventManager: React.FC = () => {
  // State für die drei Dropdowns
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [selectedBattleId, setSelectedBattleId] = useState<string>("");
  const [selectedQuestId, setSelectedQuestId] = useState<string>("");

  // State, ob der EventManager angezeigt werden soll und welcher forcedEventId übergeben wird
  const [showManager, setShowManager] = useState(false);
  const [forcedId, setForcedId] = useState<string | undefined>(undefined);

  // Dropdown-Handler: Beim Ändern eines Werts werden die anderen zurückgesetzt
  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedEventId(value);
    setSelectedBattleId("");
    setSelectedQuestId("");
  };

  const handleBattleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBattleId(value);
    setSelectedEventId("");
    setSelectedQuestId("");
  };

  const handleQuestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedQuestId(value);
    setSelectedEventId("");
    setSelectedBattleId("");
  };

  // Beim Drücken von "Start" wird der jeweilige forcedEventId gesetzt und der Manager angezeigt
  const handleStart = () => {
    let id = "";
    if (selectedEventId) {
      id = selectedEventId;
    } else if (selectedBattleId) {
      id = selectedBattleId;
    } else if (selectedQuestId) {
      id = selectedQuestId;
    }
    if (id) {
      setForcedId(id);
      setShowManager(true);
    }
  };

  // Wird vom EventManager über onFinish aufgerufen – dann wird der Manager wieder ausgeblendet
  const handleFinish = () => {
    setShowManager(false);
    setForcedId(undefined);
  };

  return (
    <div>
      <h2>Test Event Manager</h2>
      <div>
        <label>Events: </label>
        <select value={selectedEventId} onChange={handleEventChange}>
          <option value="">Nichts ausgewählt</option>
          {gameEvents.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.label || ev.id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Battles: </label>
        <select value={selectedBattleId} onChange={handleBattleChange}>
          <option value="">Nichts ausgewählt</option>
          {gameBattles.map((b) => (
            <option key={b.id} value={b.id}>
              {b.label || b.id}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quests: </label>
        <select value={selectedQuestId} onChange={handleQuestChange}>
          <option value="">Nichts ausgewählt</option>
          {gameQuestEvents.map((q) => (
            <option key={q.id} value={q.id}>
              {q.label || q.id}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleStart}>Start</button>
      <hr />
      {/* Falls forcedId gesetzt und showManager true ist, wird der EventManager gerendert */}
      {showManager && forcedId && (
        <EventManager
          events={[]}
          forcedEventId={forcedId}
          onFinish={handleFinish}
        />
      )}
    </div>
  );
};
