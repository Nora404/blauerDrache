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
        <div className="nested-section  flex-warp -m-1 gradient">
            <div className="form-group m-15">
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

            <div className="form-group m-15">
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
