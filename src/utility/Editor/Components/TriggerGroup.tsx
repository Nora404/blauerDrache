import React from "react";
import { ButtonConfig, useEditorContext } from "../Context/Context";
import { NextEventOption } from "../../../data/eventData";

type TriggerGroupProp = {
  button: ButtonConfig;
  index: number;
};

const TriggerGroup: React.FC<TriggerGroupProp> = ({ button, index }) => {
  const { setButtons, addNextEvent, removeNextEvent } = useEditorContext();

  return (
    <div className="max-widht">
      <h3>Trigger Group</h3>
      <div
        className="form-group"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        {/* <label>Trigger Quest Gruppe:</label> */}
        <div>
          <label>
            <input
              type="radio"
              checked={button.triggerGroup === "triggerQuest"}
              onChange={() => {
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerGroup: "triggerQuest" } : b
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
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerGroup: "endQuest" } : b
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
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerGroup: "nextEvents" } : b
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
                setButtons((prev) =>
                  prev.map((b, i) =>
                    i === index ? { ...b, triggerGroup: "" } : b
                  )
                );
              }}
            />
            Keine Auswahl
          </label>
        </div>
      </div>
      {button.triggerGroup === "triggerQuest" && (
        <div className="nested-section">
          <label>triggerQuest:</label>
          <input
            className="w-full"
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
      )}
      {button.triggerGroup === "endQuest" && (
        <div className="nested-section">
          <label>endQuest:</label>
          <input
            className="w-full"
            type="text"
            value={button.endQuest}
            onChange={(e) => {
              const val = e.target.value;
              setButtons((prev) =>
                prev.map((b, i) => (i === index ? { ...b, endQuest: val } : b))
              );
            }}
          />
        </div>
      )}
      {button.triggerGroup === "nextEvents" && (
        <div className="nested-section">
          {button.nextEvents.map((ne: NextEventOption, neIndex: number) => (
            <div key={neIndex} className="flex-row">
              <input
                className="w-100"
                type="text"
                placeholder="eventId"
                value={ne.eventId}
                onChange={(e) => {
                  const val = e.target.value;
                  setButtons((prev) =>
                    prev.map((b, i) => {
                      if (i !== index) return b;
                      const newNextEvents = b.nextEvents.map(
                        (nx: NextEventOption, xIdx: number) => {
                          if (xIdx !== neIndex) return nx;
                          return { ...nx, eventId: val };
                        }
                      );
                      return { ...b, nextEvents: newNextEvents };
                    })
                  );
                }}
              />
              <input
                className="w-full"
                type="number"
                placeholder="prob"
                value={ne.probability}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 100;
                  setButtons((prev) =>
                    prev.map((b, i) => {
                      if (i !== index) return b;
                      const newNextEvents = b.nextEvents.map(
                        (nx: NextEventOption, xIdx: number) => {
                          if (xIdx !== neIndex) return nx;
                          return { ...nx, probability: val };
                        }
                      );
                      return { ...b, nextEvents: newNextEvents };
                    })
                  );
                }}
              />
              <button
                onClick={() => removeNextEvent(index, neIndex)}
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
