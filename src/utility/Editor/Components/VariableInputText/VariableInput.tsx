import React, { useRef, useState } from "react";
import { SYSTEM, VERB, CREATURE, NPC, PLACES } from "../../../../data/helper/colorfullStrings";
import { parseDescription } from "../../../Helper/ParseTextToJSX";

interface VariableInputProps {
    onChange: (variablePlaceholder: string) => void;
    value: string;
}

const VariableInput: React.FC<VariableInputProps> = ({ onChange, value }) => {
    const [selectedVarGroup, setSelectedVarGroup] = useState<string>("");
    const [selectedVarKey, setSelectedVarKey] = useState<string>("");

    const variableLists = { SYSTEM, VERB, CREATURE, NPC, PLACES };
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInsert = () => {
        if (selectedVarKey && selectedVarGroup) {
            const placeholder = `{${selectedVarGroup}.${selectedVarKey}}`;
            const start = inputRef.current?.selectionStart || 0;
            const end = inputRef.current?.selectionEnd || 0;
            const newValue = value.slice(0, start) + placeholder + value.slice(end);
            onChange(newValue);
            // Setze den Fokus und aktualisiere die Cursor-Position
            setTimeout(() => {
                inputRef.current?.focus();
                const newPos = start + placeholder.length;
                inputRef.current?.setSelectionRange(newPos, newPos);
            }, 0);
        }
    };

    return (
        <div>
            <div className="flex-row">
                <div className="flex-row-left">
                    <select
                        style={{ width: "200px", marginBottom: 0 }}
                        value={selectedVarGroup}
                        onChange={(e) => {
                            setSelectedVarGroup(e.target.value);
                            setSelectedVarKey(""); // Key zurücksetzen, wenn Gruppe wechselt
                        }}>
                        <option value="">-- Liste wählen --</option>
                        <option value="SYSTEM">SYSTEM</option>
                        <option value="VERB">VERBEN</option>
                        <option value="CREATURE">CREATURE</option>
                        <option value="NPC">NPC</option>
                        <option value="PLACES">PLACES</option>
                    </select>
                    <select
                        style={{ width: "200px", marginBottom: 0 }}
                        value={selectedVarKey}
                        onChange={(e) => setSelectedVarKey(e.target.value)}
                        disabled={!selectedVarGroup}>
                        <option value="">-- Wort wählen --</option>
                        {selectedVarGroup &&
                            Object.keys(variableLists[selectedVarGroup as keyof typeof variableLists]).map(
                                (k) => (
                                    <option key={k} value={k}>
                                        {k}
                                    </option>
                                )
                            )}
                    </select>
                </div>
                <button onClick={handleInsert} className="add-button w-100px">
                    Hinzufügen
                </button>
            </div>


            <div className="mb-1">
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Text einfügen"
                    className="w-full"
                />
            </div>

            <div className="text-left mx-1">
                <strong>Vorschau:</strong>
                <div>{parseDescription(value)}</div>
            </div>
        </div>
    );
};

export default VariableInput;