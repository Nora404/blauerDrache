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
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>GameTime</h4>

            <div style={{ marginBottom: "0.5rem" }}>
                <label>Uhrzeit (HH:MM): </label>
                <input
                    type="text"
                    value={gameTime.gameTime || ""}
                    onChange={(e) => handleGameTimeChange(e.target.value)}
                    placeholder="z.B. 12:00"
                    style={{ width: "80px", marginLeft: "0.5rem" }}
                />
            </div>

            <div>
                <label>Tag/Nacht:</label>
                <select
                    value={gameTime.gameDay || ""}
                    onChange={(e) => handleGameDayChange(e.target.value as "Tag" | "Nacht")}
                    style={{ marginLeft: "0.5rem" }}
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
