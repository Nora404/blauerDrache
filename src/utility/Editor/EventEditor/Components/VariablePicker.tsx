import React, { useRef, useState } from "react";
import { SYSTEM, CREATURE, NPC, PLACES } from "../../../../data/helper/colorfullStrings";

interface VariablePickerProps {
    value: string;
    onChange: (newVal: string) => void;
    placeholder?: string;
}

const VariablePicker: React.FC<VariablePickerProps> = ({ value, onChange, placeholder }) => {
    const variableLists: Record<string, Record<string, JSX.Element>> = { SYSTEM, CREATURE, NPC, PLACES };

    const inputRef = useRef<HTMLInputElement>(null); // Umbenannt zu inputRef
    const [selectedVarList, setSelectedVarList] = useState("");
    const [selectedVarKey, setSelectedVarKey] = useState("");

    const handleInsertVariable = () => {
        if (!selectedVarList || !selectedVarKey) return;
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart || 0;
        const end = input.selectionEnd || 0;
        const varPlaceholder = `{${selectedVarList}.${selectedVarKey}}`; // Umbenannt, um Verwechslungen zu vermeiden
        const newVal = value.slice(0, start) + varPlaceholder + value.slice(end);
        onChange(newVal);

        const newPos = start + varPlaceholder.length;
        setTimeout(() => {
            input.focus();
            input.setSelectionRange(newPos, newPos);
        }, 0);
    };

    return (
        <div>
            {/* Variable Selects */}
            <div className="flex-row-right" style={{ marginBottom: "0.5rem" }}>
                {selectedVarList && (
                    <select
                        style={{ width: "150px" }}
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
                <select
                    style={{ width: "150px" }}
                    value={selectedVarList}
                    onChange={(e) => {
                        setSelectedVarList(e.target.value);
                        // Bei Auswahl einer neuen Liste den Key zurücksetzen
                        setSelectedVarKey("");
                    }}
                >
                    <option value="">-- Variable wählen --</option>
                    <option value="SYSTEM">SYSTEM</option>
                    <option value="CREATURE">CREATURE</option>
                    <option value="NPC">NPC</option>
                    <option value="PLACES">PLACES</option>
                </select>
                <button className="add-button w-100px" onClick={handleInsertVariable}>
                    Insert Var
                </button>
            </div>

            {/* Input statt Textarea */}
            <div>
                <input
                    type="text"
                    className="w-full"
                    ref={inputRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default VariablePicker;
