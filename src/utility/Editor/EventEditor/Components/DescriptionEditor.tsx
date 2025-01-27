// DescriptionEditor.tsx

import React, { useRef, useState } from "react";
import { parseDescription } from "../../../Helper/ParseTextToJSX";
import {
  SYSTEM,
  CREATURE,
  NPC,
  PLACES,
} from "../../../../data/helper/colorfullStrings";
import ComponentAndColorPicker from "./ComponentAndColorPicker";

interface DescriptionEditorProps {
  value: string;
  onChange: (newVal: string) => void;
}

const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
  value,
  onChange,
}) => {
  const variableLists: Record<string, Record<string, JSX.Element>> = {
    SYSTEM,
    CREATURE,
    NPC,
    PLACES,
  };

  const [customColors, setCustomColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("#ff0000");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // ### Variablen-Selects
  const [selectedVarList, setSelectedVarList] = useState("");
  const [selectedVarKey, setSelectedVarKey] = useState("");

  const handleInsertVariable = () => {
    if (!selectedVarList || !selectedVarKey) return;
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const placeholder = `{${selectedVarList}.${selectedVarKey}}`;
    const newVal = value.slice(0, start) + placeholder + value.slice(end);
    onChange(newVal);

    const newPos = start + placeholder.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  // ### Hier fängt die neue onInsert-Funktion an (für unsere 3 Komponenten):
  //    "componentName" z.B. "GradientText"
  //    "colorKeyOrPalette" z.B. "redColors" oder "custom:#ff0000,#ffff00" oder "gelb"
  const handleInsertComponent = (
    componentName: string,
    colorKeyOrPalette: string
  ) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    // Markierten Text als InnerText?
    const selectedText = value.substring(start, end) || "DeinText";

    let placeholder = "";

    if (componentName === "Talk") {
      placeholder = `{Talk|${colorKeyOrPalette}}${selectedText}{/Talk}`;
    } else if (
      componentName === "GradientText" ||
      componentName === "MultiColoredLetters"
    ) {
      placeholder = `{${componentName}|${colorKeyOrPalette}}${selectedText}{/${componentName}}`;
    }

    const newVal = value.slice(0, start) + placeholder + value.slice(end);
    onChange(newVal);

    const newPos = start + placeholder.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPos, newPos);
    }, 0);
  };

  return (
    <div>
      {/* ------------------------------ 
          1) Variable-Selects 
          ------------------------------ */}
      <div>
        <select
          value={selectedVarList}
          onChange={(e) => setSelectedVarList(e.target.value)}
        >
          <option value="">-- Variable wählen --</option>
          <option value="SYSTEM">SYSTEM</option>
          <option value="CREATURE">CREATURE</option>
          <option value="NPC">NPC</option>
          <option value="PLACES">PLACES</option>
        </select>
        {/* Falls eine Variable-Liste gewählt, zeig die Keys */}
        {selectedVarList && (
          <select
            value={selectedVarKey}
            onChange={(e) => setSelectedVarKey(e.target.value)}
          >
            <option value="">-- Key --</option>
            {Object.keys(variableLists[selectedVarList]).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        )}
        <button onClick={handleInsertVariable}>Insert Var</button>
      </div>

      {/* ------------------------------ 
          2) Unsere neue Komponente
          ------------------------------ */}
      <ComponentAndColorPicker
        onInsert={handleInsertComponent}
        customColors={customColors}
        setCustomColors={setCustomColors}
        newColor={newColor}
        setNewColor={setNewColor}
      />

      {/* ------------------------------ 
          3) Textarea + Preview 
          ------------------------------ */}
      <div>
        <textarea
          className="w-full"
          ref={textAreaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
        />

        <div>
          <strong>Vorschau:</strong>
          <div>{parseDescription(value)}</div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionEditor;
