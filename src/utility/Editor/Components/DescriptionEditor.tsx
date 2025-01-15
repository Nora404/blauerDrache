// DescriptionEditor.tsx
import React, { useState } from "react";
import { parseDescription } from "../../ParseTextToJSX";
import { SYSTEM, CREATURE, NPC, PLACES } from "../../../data/colorfullStrings";

interface DescriptionEditorProps {
    value: string;                   // Der aktuelle Text
    onChange: (newVal: string) => void; // Callback, wenn sich der Text ändert
}

/**
 * DescriptionEditor: Stellt 4 Dropdowns + Buttons bereit,
 * um Variablen {SYSTEM.Foo} und Komponenten {GradientText|rainbowColors}...{/GradientText}
 * in den Text einzufügen. Zeigt darunter eine Live-Vorschau an.
 */
const DescriptionEditor: React.FC<DescriptionEditorProps> = ({
    value,
    onChange,
}) => {
    const [selectedListName, setSelectedListName] = useState("");
    const [selectedKey, setSelectedKey] = useState("");

    const [selectedComponent, setSelectedComponent] = useState("");
    const [selectedPalette, setSelectedPalette] = useState("");

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
    ];

    const currentVarList = selectedListName
        ? variableLists[selectedListName]
        : null;

    // Fügt eine Variable in Form {SYSTEM.Leben} ins Textfeld ein
    const handleInsertVariable = () => {
        if (selectedListName && selectedKey) {
            const placeholder = `{${selectedListName}.${selectedKey}}`;
            onChange(value + placeholder);
        }
    };

    // Fügt eine Komponente (z.B. {GradientText|rainbowColors}Text{/GradientText}) ein
    const handleInsertComponent = () => {
        if (selectedComponent && selectedPalette) {
            const defaultInnerText = "DeinText";
            const placeholder = `{${selectedComponent}|${selectedPalette}}${defaultInnerText}{/${selectedComponent}}`;
            onChange(value + placeholder);
        }
    };

    // Live-Vorschau generieren
    const preview = parseDescription(value);

    return (
        <div>
            {/* Variablen-Platzhalter */}
            <div className="flex-end h-30px">
                <select
                    value={selectedListName}
                    onChange={(e) => {
                        setSelectedListName(e.target.value);
                        setSelectedKey("");
                    }}
                    className="dropdown w-200px"
                >
                    <option value="">-- Liste auswählen --</option>
                    {Object.keys(variableLists).map((listName) => (
                        <option key={listName} value={listName}>
                            {listName}
                        </option>
                    ))}
                </select>

                {/* Zweites Dropdown für Keys */}
                {currentVarList && (
                    <select
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(e.target.value)}
                        className="dropdown w-200px"
                    >
                        <option value="">-- Wort auswählen --</option>
                        {Object.keys(currentVarList).map((key) => (
                            <option key={key} value={key}>
                                {key}
                            </option>
                        ))}
                    </select>
                )}

                <button
                    onClick={handleInsertVariable}
                    className="btn-border w-100px"
                    disabled={!selectedListName || !selectedKey}
                >
                    Hinzufügen
                </button>
            </div>


            {/* Komponenten-Platzhalter */}

            <div className="flex-end h-30px">
                <select
                    value={selectedComponent}
                    onChange={(e) => setSelectedComponent(e.target.value)}
                    className="dropdown w-200px"
                >
                    <option value="">-- Komponente auswählen --</option>
                    {componentOptions.map((comp) => (
                        <option key={comp} value={comp}>
                            {comp}
                        </option>
                    ))}
                </select>

                {selectedComponent && (
                    <select
                        value={selectedPalette}
                        onChange={(e) => setSelectedPalette(e.target.value)}
                        className="dropdown w-200px"
                    >
                        <option value="">-- Farben auswählen --</option>
                        {paletteOptions.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                )}

                <button
                    onClick={handleInsertComponent}
                    className="btn-border w-100px"
                    disabled={!selectedComponent || !selectedPalette}
                >
                    Hinzufügen
                </button>
            </div>


            {/* Das eigentliche Textfeld */}
            <div className="form-group">
                {/* <label>Beschreibung:</label> */}
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
