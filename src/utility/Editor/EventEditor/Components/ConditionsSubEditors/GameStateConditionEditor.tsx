// ConditionsSubEditors/GameStateConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext"; // Pfad anpassen
import { TEMPERATURE, WEATHER } from "../../../../../data/helper/weatherStrings";


interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const GameStateConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const gameState = conditions.gameState || {};

    const setGameStateField = (field: keyof typeof gameState, value: string) => {
        updateConditions({
            gameState: {
                ...gameState,
                [field]: value,
            },
        });
    };

    return (
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>GameState</h4>

            <div style={{ marginBottom: "0.5rem" }}>
                <label>Wetter: </label>
                <select
                    value={gameState.weather || ""}
                    onChange={(e) => setGameStateField("weather", e.target.value)}
                >
                    <option value="">(keine Auswahl)</option>
                    {WEATHER.map((w) => (
                        <option key={w} value={w}>
                            {w}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Temperatur: </label>
                <select
                    value={gameState.temperature || ""}
                    onChange={(e) => setGameStateField("temperature", e.target.value)}
                >
                    <option value="">(keine Auswahl)</option>
                    {TEMPERATURE.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GameStateConditionEditor;
