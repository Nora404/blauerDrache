import React from "react";
import { useEditorContext } from "../Context/Context";

const TriggerGroup: React.FC = () => {
  const { buttons, setButtons} = useEditorContext();

  return (
    <div className="max-widht">
      <h3>Trigger Group</h3>
      <div className="form-group" style={{ marginTop: "0.5rem" }}>
              <div>
                <label>
                  <input
                    type="radio"
                    checked={buttons.triggerGroup === "triggerQuest"}
                    onChange={() => {
                      setButtons((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? { ...b, triggerGroup: "triggerQuest" }
                            : b
                        )
                      );
                    }}
                  />
                  triggerQuest
                </label>
                <label style={{ marginLeft: 10 }}>
                  <input
                    type="radio"
                    checked={buttons.triggerGroup === "endQuest"}
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
                    checked={buttons.triggerGroup === "nextEvents"}
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
                    checked={buttons.triggerGroup === ""}
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
            {buttons.triggerGroup === "triggerQuest" && (
              <div className="nested-section">
                <label>triggerQuest:</label>
                <input
                  className="w-full"
                  type="text"
                  value={buttons.triggerQuest}
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
            {buttons.triggerGroup === "endQuest" && (
              <div className="nested-section">
                <label>endQuest:</label>
                <input
                  className="w-full"
                  type="text"
                  value={buttons.endQuest}
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
            )}
            {buttons.triggerGroup === "nextEvents" && (
              <div className="nested-section">
                {buttons.nextEvents.map((ne: NextEventOption, neIndex: number) => (
                  <div key={neIndex} className="next-event-row">
                    <input
                      style={{ width: "47%" }}
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
                      style={{ width: "50%" }}
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
                <button
                  onClick={() => addNextEvent(index)}
                  className="add-button"
                >
                  NextEvent hinzufügen
                </button>
              </div>
            )}
            //#endregion
            {/* Ganzen Button entfernen */}
            <button
              onClick={() => removeButton(index)}
              className="remove-button"
            >
              Diesen Button entfernen
            </button>
          </div>
        ))}

        <button onClick={addButton} className="add-button">
          Neuen Button hinzufügen
        </button>
      </div>
    </div>
  );
};

export default TriggerGroup;