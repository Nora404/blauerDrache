// DescriptionEditor.tsx

import React, { useState } from "react";
import { parseDescription } from "../../ParseTextToJSX";
import {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
} from "../../../data/helper/colorfullStrings";

interface DescriptionEditorProps {
  value: string;
  onChange: (newVal: string) => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  value,
  onChange,
}) => {
  // Für das "Haupt"-Select
  const [selectedMainOption, setSelectedMainOption] = useState("");

  // Für das "zweite" Select (Key oder Palette)
  const [selectedDetailOption, setSelectedDetailOption] = useState("");

  // Custom-Farben-Logik
  const [customColors, setCustomColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState<string>("#ff0000");

  // Gruppen
  const variableLists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };
  const componentOptions = ["GradientText", "MultiColoredLetters"];
  const paletteOptions = [
    "rosaColors",
    "rainbowColors",
    "greenColors",
    "blueColors",
    "braunColors",
    "grayColors",
    "yellowColors",
    "custom",
  ];

  ///////////////////////////////////////
  // 1) handleInsert
  ///////////////////////////////////////
  const handleInsert = () => {
    // Hier unterscheiden wir, ob selectedMainOption eine Variable-Liste ist
    // oder eine Komponente
    if (!selectedMainOption || !selectedDetailOption) return;

    // check, ob es eine Variable-Liste ist
    if (variableLists[selectedMainOption]) {
      // Dann ist selectedDetailOption ein Key
      const placeholder = `{${selectedMainOption}.${selectedDetailOption}}`;
      onChange(value + placeholder);
    } else {
      // Sonst muss es eine Komponente sein
      const defaultInnerText = "DeinText";

      if (selectedDetailOption === "custom") {
        const colorString = customColors.join(",");
        const placeholder = `{${selectedMainOption}|custom:${colorString}}${defaultInnerText}{/${selectedMainOption}}`;
        onChange(value + placeholder);
      } else {
        // Normaler Palette-Name
        const placeholder = `{${selectedMainOption}|${selectedDetailOption}}${defaultInnerText}{/${selectedMainOption}}`;
        onChange(value + placeholder);
      }
    }
  };

  ///////////////////////////////////////
  // 2) handleAddCustomColor
  ///////////////////////////////////////
  const handleAddCustomColor = () => {
    if (!newColor) return;
    setCustomColors([...customColors, newColor]);
    setNewColor("#ffffff");
  };

  ///////////////////////////////////////
  // 3) handleRemoveCustomColor
  ///////////////////////////////////////
  const handleRemoveCustomColor = (index: number) => {
    setCustomColors((prev) => prev.filter((_, i) => i !== index));
  };

  ///////////////////////////////////////
  // 4) Generiere Vorschau
  ///////////////////////////////////////
  const preview = parseDescription(value);

  ///////////////////////////////////////
  // 5) Render
  ///////////////////////////////////////
  // Shortcut zum Prüfen, ob selectedMainOption eine Variable-Liste ist
  const isVariable = !!variableLists[selectedMainOption];
  // Shortcut zum Prüfen, ob selectedMainOption eine Komponente ist
  const isComponent = componentOptions.includes(selectedMainOption);

  // Wenn Variable => detailOptions = Keys
  let detailOptions: string[] = [];
  if (isVariable) {
    detailOptions = Object.keys(variableLists[selectedMainOption]);
  } else if (isComponent) {
    detailOptions = paletteOptions;
  }

  return (
    <div>
      {/* Select 1: Variablen ODER Komponenten */}
      <div className="flex-end h-30px">
        <select
          value={selectedMainOption}
          onChange={(e) => {
            setSelectedMainOption(e.target.value);
            setSelectedDetailOption("");
          }}
          className="dropdown w-200px"
        >
          <option value="">-- Bitte auswählen --</option>
          <optgroup label="Variablen">
            <option value="SYSTEM">SYSTEM</option>
            <option value="CREATURE">CREATURE</option>
            <option value="NPC">NPC</option>
            <option value="PLACES">PLACES</option>
          </optgroup>
          <optgroup label="Komponenten">
            <option value="GradientText">GradientText</option>
            <option value="MultiColoredLetters">MultiColoredLetters</option>
          </optgroup>
        </select>

        {/* Select 2: wenn etwas gewählt ist */}
        {detailOptions.length > 0 && (
          <select
            value={selectedDetailOption}
            onChange={(e) => setSelectedDetailOption(e.target.value)}
            className="dropdown w-200px"
          >
            <option value="">-- Unterauswahl --</option>
            {detailOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}

        {/* EINE Schaltfläche, die die passende Logik ausführt */}
        <button
          onClick={handleInsert}
          className="btn-border w-100px"
          disabled={!selectedMainOption || !selectedDetailOption}
        >
          Hinzufügen
        </button>
      </div>

      {/* Custom Colors nur anzeigen, wenn Komponente + selectedDetailOption = "custom" */}
      {isComponent && selectedDetailOption === "custom" && (
        <div className="flex-row-left">
          <div style={{ width: "150px" }} className="flex-row">
            <label>Farbe wählen: </label>
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              style={{ width: "40px", padding: "3px", height: "30px" }}
            />
          </div>

          <button className="btn-border w-100px" onClick={handleAddCustomColor}>
            + Add Color
          </button>

          {/* Anzeige der Custom-Farben */}
          <div className="flex-row m-15">
            {customColors.map((col, i) => (
              <span
                onClick={() => handleRemoveCustomColor(i)}
                title={`Klicke, um ${col} zu entfernen`}
                key={i}
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  background: col,
                  marginRight: "5px",
                  border: "1px solid #333",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Textfeld */}
      <div className="form-group">
        <textarea
          placeholder="Beschreibung für den Spieler"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      </div>

      {/* Vorschau */}
      <div className="jsx-preview">
        <strong>Vorschau:</strong>
        <div>{preview}</div>
      </div>
    </div>
  );
};

export default DescriptionEditor;
