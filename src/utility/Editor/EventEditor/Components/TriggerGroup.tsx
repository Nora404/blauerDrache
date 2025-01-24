import React from "react";
import { ButtonConfig, useEditorContext } from "../../Context/EventContext";
import { GameQuest } from "../../../../data/questData";
import { randomEvents } from "../../../../data/eventList";
import { gameQuests, gameQuestEvents } from "../../../../data/questList";

type TriggerGroupProps = {
  button: ButtonConfig;
  index: number;
};

const TriggerGroup: React.FC<TriggerGroupProps> = ({ button, index }) => {
  const { setButtons, addNextEvent, removeNextEvent } = useEditorContext();

  return (
    <div className="max-widht">
      <h3>Trigger Group</h3>
      <div
        className="form-group"
        style={{ marginTop: "10px", marginBottom: "30px" }}
      >
        <div>
          <label>
            <input
              type="radio"
              checked={button.triggerGroup === "triggerQuest"}
              onChange={() => {
                setButtons((previousButtons) =>
                  previousButtons.map((currentButton, buttonIndex) =>
                    buttonIndex === index
                      ? { ...currentButton, triggerGroup: "triggerQuest" }
                      : currentButton
                  )
                );
              }}
            />
            triggerQuest
          </label>
          <label style={{ marginLeft: 10 }}>
            <input
              type="radio"
              checked={button.triggerGroup === "endQuest"}
              onChange={() => {
                setButtons((previousButtons) =>
                  previousButtons.map((currentButton, buttonIndex) =>
                    buttonIndex === index
                      ? { ...currentButton, triggerGroup: "endQuest" }
                      : currentButton
                  )
                );
              }}
            />
            endQuest
          </label>
          <label style={{ marginLeft: 10 }}>
            <input
              type="radio"
              checked={button.triggerGroup === "nextEvents"}
              onChange={() => {
                setButtons((previousButtons) =>
                  previousButtons.map((currentButton, buttonIndex) =>
                    buttonIndex === index
                      ? { ...currentButton, triggerGroup: "nextEvents" }
                      : currentButton
                  )
                );
              }}
            />
            nextEvents
          </label>
          <label style={{ marginLeft: 10 }}>
            <input
              type="radio"
              checked={button.triggerGroup === ""}
              onChange={() => {
                setButtons((previousButtons) =>
                  previousButtons.map((currentButton, buttonIndex) =>
                    buttonIndex === index
                      ? { ...currentButton, triggerGroup: "" }
                      : currentButton
                  )
                );
              }}
            />
            Keine Auswahl
          </label>
        </div>
      </div>
      {/* triggerQuest Section */}
      {button.triggerGroup === "triggerQuest" && (
        <div className="nested-section">
          <label className="label">triggerQuest:</label>
          <div className="flex-row">
            <select
              className="w-full"
              value={button.triggerQuest}
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerQuest: val } : b
                  )
                );
              }}
            >
              <option value="">--Vorhandene Quests--</option>
              {gameQuests.map((quest: GameQuest) => (
                <option key={quest.id} value={quest.id}>
                  {quest.label}
                </option>
              ))}
            </select>
            <input
              className="w-full"
              placeholder="questId"
              type="text"
              value={button.triggerQuest}
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerQuest: val } : b
                  )
                );
              }}
            />
          </div>
        </div>
      )}
      {button.triggerGroup === "endQuest" && (
        <div className="nested-section">
          <label className="label">endQuest:</label>
          <div className="flex-row">
            <select
              className="w-full"
              value={button.endQuest}
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, endQuest: val } : b
                  )
                );
              }}
            >
              <option value="">--Vorhandene Quests--</option>
              {gameQuests.map((quest: GameQuest) => (
                <option key={quest.id} value={quest.id}>
                  {quest.label}
                </option>
              ))}
            </select>
            <input
              className="w-full"
              placeholder="questId"
              type="text"
              value={button.endQuest}
              onChange={(e) => {
                const val = e.target.value;
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, endQuest: val } : b
                  )
                );
              }}
            />
          </div>
        </div>
      )}
      {/* nextEvents Section */}
      {button.triggerGroup === "nextEvents" && (
        <div className="nested-section">
          {button.nextEvents.map((nextEvent, nextEventIndex) => (
            <div key={nextEventIndex} className="flex-row">
              {/* gameQuestEvents Dropdown */}
              <select
                className="w-100"
                value={nextEvent.eventId}
                onChange={(event) => {
                  const selectedId = event.target.value;
                  setButtons((previousButtons) =>
                    previousButtons.map((currentButton, buttonIndex) => {
                      if (buttonIndex !== index) return currentButton;
                      const updatedNextEvents = currentButton.nextEvents.map(
                        (currentNextEvent, eventIndex) => {
                          if (eventIndex !== nextEventIndex)
                            return currentNextEvent;
                          return { ...currentNextEvent, eventId: selectedId };
                        }
                      );
                      return {
                        ...currentButton,
                        nextEvents: updatedNextEvents,
                      };
                    })
                  );
                }}
              >
                <option value="">--Aus gameQuestEvents wählen--</option>
                {gameQuestEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.label || event.id}
                  </option>
                ))}
              </select>
              {/* randomEvents Dropdown */}
              <select
                className="w-100"
                value={nextEvent.eventId}
                onChange={(event) => {
                  const selectedId = event.target.value;
                  setButtons((previousButtons) =>
                    previousButtons.map((currentButton, buttonIndex) => {
                      if (buttonIndex !== index) return currentButton;
                      const updatedNextEvents = currentButton.nextEvents.map(
                        (currentNextEvent, eventIndex) => {
                          if (eventIndex !== nextEventIndex)
                            return currentNextEvent;
                          return { ...currentNextEvent, eventId: selectedId };
                        }
                      );
                      return {
                        ...currentButton,
                        nextEvents: updatedNextEvents,
                      };
                    })
                  );
                }}
              >
                <option value="">--Aus randomEvents wählen--</option>
                {randomEvents.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.label || event.id}
                  </option>
                ))}
              </select>
              {/* Manuelle Eingabe */}
              <input
                className="w-full"
                type="text"
                placeholder="eventId eingeben"
                value={nextEvent.eventId}
                onChange={(event) => {
                  const manualId = event.target.value;
                  setButtons((previousButtons) =>
                    previousButtons.map((currentButton, buttonIndex) => {
                      if (buttonIndex !== index) return currentButton;
                      const updatedNextEvents = currentButton.nextEvents.map(
                        (currentNextEvent, eventIndex) => {
                          if (eventIndex !== nextEventIndex)
                            return currentNextEvent;
                          return { ...currentNextEvent, eventId: manualId };
                        }
                      );
                      return {
                        ...currentButton,
                        nextEvents: updatedNextEvents,
                      };
                    })
                  );
                }}
              />
              {/* Wahrscheinlichkeit */}
              <input
                className="w-full"
                type="number"
                placeholder="Wahrscheinlichkeit"
                value={nextEvent.probability}
                onChange={(event) => {
                  const probabilityValue =
                    parseInt(event.target.value, 10) || 100;
                  setButtons((previousButtons) =>
                    previousButtons.map((currentButton, buttonIndex) => {
                      if (buttonIndex !== index) return currentButton;
                      const updatedNextEvents = currentButton.nextEvents.map(
                        (currentNextEvent, eventIndex) => {
                          if (eventIndex !== nextEventIndex)
                            return currentNextEvent;
                          return {
                            ...currentNextEvent,
                            probability: probabilityValue,
                          };
                        }
                      );
                      return {
                        ...currentButton,
                        nextEvents: updatedNextEvents,
                      };
                    })
                  );
                }}
              />
              <button
                onClick={() => removeNextEvent(index, nextEventIndex)}
                className="remove-button"
                style={{ marginLeft: "0.5rem" }}
              >
                Entfernen
              </button>
            </div>
          ))}
          <button onClick={() => addNextEvent(index)} className="add-button">
            NextEvent hinzufügen
          </button>
        </div>
      )}
    </div>
  );
};

export default TriggerGroup;
