// [NEU] Datei: TestEventManager.tsx
import React, { useState } from "react";
import { gameBattles, gameBattlesEvents } from "../../../data/battleList";
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
    <div className="max-width">
      <h2>Test Event Manager</h2>
      <div className="flex-row m-2-e">
        <div>
          <select value={selectedEventId} onChange={handleEventChange} style={{ width: "250px" }}>
            <option value="">Wähle ein Event</option>
            {gameEvents.map((ev) => (
              <option key={ev.id} value={ev.id}>
                {ev.label || ev.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={selectedBattleId} onChange={handleBattleChange} style={{ width: "250px" }}>
            <option value="">Wähle ein Battle</option>
            {gameBattlesEvents.map((b) => (
              <option key={b.id} value={b.id}>
                {b.label || b.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={selectedQuestId} onChange={handleQuestChange} style={{ width: "250px" }}>
            <option value="">Wähle eine Quest</option>
            {gameQuestEvents
              .filter((q) => q.id.endsWith("Trigger"))
              .map((q) => (
                <option key={q.id} value={q.id}>
                  {q.label || q.id}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex-row m-2-e">
        <button onClick={handleStart} className="btn-border add-button">Start</button>
        <button onClick={handleFinish} className="btn-border remove-button">Reset</button>
      </div>
      <hr /><br />
      {/* Falls forcedId gesetzt und showManager true ist, wird der EventManager gerendert */}
      {showManager && forcedId && (
        <EventManager
          events={[]}
          forcedEventId={forcedId}
          onFinish={handleFinish}
        />
      )}

      <p style={{ color: "#151820" }}>
        .......................................................................................................
        .......................................................................................................
        .......................................................................................................
      </p>
    </div>
  );
};
