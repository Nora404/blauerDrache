// ConditionsSubEditors/GameTimeConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext"; // Pfad anpassen

// Nutze deine Arr-Liste für Tag/Nacht, falls du sie in einer Konstante hast.
// Falls du nur "Tag" | "Nacht" manuell abfragst, kannst du es auch so lassen.
const dayNightOptions = ["Tag", "Nacht"] as const;

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const GameTimeConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const gameTime = conditions.gameTime || {};

    const handleGameTimeChange = (value: string) => {
        updateConditions({
            gameTime: {
                ...gameTime,
                gameTime: value,
            },
        });
    };

    const handleGameDayChange = (value: "Tag" | "Nacht") => {
        updateConditions({
            gameTime: {
                ...gameTime,
                gameDay: value,
            },
        });
    };

    return (
        <div className="nested-section flex-warp -m-1 gradient">
            <div className="form-group m-15">
                <label>Uhrzeit (HH:MM): </label>
                <input
                    type="text"
                    value={gameTime.gameTime || ""}
                    onChange={(e) => handleGameTimeChange(e.target.value)}
                    placeholder="z.B. 12:00"
                />
            </div>

            <div className="form-group m-15">
                <label>Tag/Nacht:</label>
                <select
                    value={gameTime.gameDay || ""}
                    onChange={(e) => handleGameDayChange(e.target.value as "Tag" | "Nacht")}
                >
                    <option value="">(keine Auswahl)</option>
                    {dayNightOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GameTimeConditionEditor;
