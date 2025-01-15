import React, { useState } from "react";
import { useEditorContext } from "../Context/Context";
import { SYSTEM, CREATURE, NPC, PLACES } from "../../../data/colorfullStrings";
import { parseDescription } from "../../ParseTextToJSX";

const BaseInfo: React.FC = () => {
  const { eventId, label, description, setEventId, setLabel, setDescription } =
    useEditorContext();

  const [selectedListName, setSelectedListName] = useState("");
  const [selectedKey, setSelectedKey] = useState("");

  // Alle verfügbaren Listen
  const lists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };

  // Dynamischer Zugriff, je nach DropDown-Auswahl
  const currentList = selectedListName ? lists[selectedListName] : null;

  // Textplatzhalter ins 'description' einfügen
  const handleInsert = () => {
    if (selectedListName && selectedKey) {
      // z.B. {SYSTEM.Foo}
      const placeholder = `{${selectedListName}.${selectedKey}}`;
      setDescription((prev) => prev + placeholder);
    }
  };

  // Vorschau generieren: Zeilen + Platzhalter
  const preview = parseDescription(description);

  return (
    <div className="max-widht">
      <div className="form-group">
        <label>ID*:</label>
        <input
          type="text"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
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
        <div className="flex-row">
          <label>Beschreibung:</label>
          <div className="flex-end">
            <select
              value={selectedListName}
              onChange={(e) => {
                setSelectedListName(e.target.value);
                setSelectedKey("");
              }}
              className="dropdown"
            >
              <option value="">-- Liste auswählen --</option>
              {Object.keys(lists).map((listName) => (
                <option key={listName} value={listName}>
                  {listName}
                </option>
              ))}
            </select>

            {currentList && (
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="dropdown"
              >
                <option value="">-- Eintrag auswählen --</option>
                {Object.keys(currentList).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={handleInsert}
              className="btn-border w-100px"
              disabled={!selectedListName || !selectedKey}
            >
              Hinzufügen
            </button>
          </div>
        </div>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      {/* Darstellung der Vorschau */}
      <div className="jsx-preview">
        <strong>Vorschau:</strong>
        <div>{preview}</div>
      </div>
    </div>
  );
};

export default BaseInfo;
