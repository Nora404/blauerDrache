// DescriptionEditor.tsx

import React, { useRef, useState } from "react";
import { parseDescription } from "../../../Helper/ParseTextToJSX";
import {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
} from "../../../../data/helper/colorfullStrings";
import { talkingColors, textColors } from "../../../Formatted/Talk";

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

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Gruppen
  const variableLists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };
  const talkColorKeys = [
    ...Object.keys(textColors),
    ...Object.keys(talkingColors),
    "custom",
  ];
  const componentOptions = ["GradientText", "MultiColoredLetters", "Talk"];
  const paletteOptions = [
    "grayColors",
    "yellowColors",
    "orangeColors",
    "redColors",
    "rosaColors",
    "lilaColors",
    "blueColors",
    "greenColors",
    "braunColors",
    "rainbowColors",
    "custom",
  ];

  const handleInsert = () => {
    if (!selectedMainOption || !selectedDetailOption) return;

    // Referenz zum Textarea
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Nur für den Fall, dass man optional markierten Text
    // bei Variablen brauchen würde (eigentlich nicht nötig)
    const selectedText = value.substring(start, end);

    let placeholder = "";

    // 1) Variablen
    if (variableLists[selectedMainOption]) {
      placeholder = `{${selectedMainOption}.${selectedDetailOption}}`;
    }
    // 2) Talk
    else if (selectedMainOption === "Talk") {
      const color =
        selectedDetailOption === "custom" ? newColor : selectedDetailOption;
      // Wenn man ggf. den markierten Text als InnerText verwenden will:
      const innerText = selectedText || "DeinText";
      placeholder = `{Talk|${color}}${innerText}{/Talk}`;
    }
    // 3) Gradient / MultiColoredLetters
    else if (
      selectedMainOption === "MultiColoredLetters" ||
      selectedMainOption === "GradientText"
    ) {
      const innerText = selectedText || "DeinText";
      if (selectedDetailOption === "custom") {
        const colorString = customColors.join(",");
        placeholder = `{${selectedMainOption}|custom:${colorString}}${innerText}{/${selectedMainOption}}`;
      } else {
        placeholder = `{${selectedMainOption}|${selectedDetailOption}}${innerText}{/${selectedMainOption}}`;
      }
    }

    // Jetzt den neuen Text zusammenbauen und setzen
    const newVal = value.slice(0, start) + placeholder + value.slice(end);
    onChange(newVal);

    // Cursor an das Ende des neu eingefügten Platzhalters setzen
    const newPos = start + placeholder.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  const handleAddCustomColor = () => {
    if (!newColor) return;
    setCustomColors([...customColors, newColor]);
    setNewColor("#ffffff");
  };

  const handleRemoveCustomColor = (index: number) => {
    setCustomColors((prev) => prev.filter((_, i) => i !== index));
  };

  const preview = parseDescription(value);
  const isVariable = !!variableLists[selectedMainOption];
  const isComponent = componentOptions.includes(selectedMainOption);

  let detailOptions: string[] = [];
  if (isVariable) {
    detailOptions = Object.keys(variableLists[selectedMainOption]);
  } else if (selectedMainOption === "Talk") {
    detailOptions = talkColorKeys;
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
            <option value="Talk">Talk</option>
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
          ref={textAreaRef} // <-- Neu
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
