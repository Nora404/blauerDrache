// ConditionsSubEditors/PlayerEconomyConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerEconomyConditionEditor: React.FC<SubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const economy = conditions.playerEconomy || {};

    const setEconomy = (key: keyof typeof economy, val: number) => {
        updateConditions({
            playerEconomy: {
                ...economy,
                [key]: val,
            },
        });
    };

    return (
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>PlayerEconomy</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
                <div>
                    <label>Gold (min.): </label>
                    <input
                        type="number"
                        value={economy.gold ?? ""}
                        onChange={(e) => setEconomy("gold", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Edelsteine (min.): </label>
                    <input
                        type="number"
                        value={economy.edelsteine ?? ""}
                        onChange={(e) => setEconomy("edelsteine", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerEconomyConditionEditor;
