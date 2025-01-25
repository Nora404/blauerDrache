// ConditionsSubEditors/PlayerBaseConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext"; // Pfad anpassen

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerBaseConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const base = conditions.playerBase || {};

    const setBaseField = (field: keyof typeof base, val: number) => {
        updateConditions({
            playerBase: {
                ...base,
                [field]: val,
            },
        });
    };

    return (
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>PlayerBase</h4>
            <div style={{ display: "flex", gap: "1rem" }}>
                <div>
                    <label>Level: </label>
                    <input
                        type="number"
                        value={base.level ?? ""}
                        onChange={(e) => setBaseField("level", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>EXP: </label>
                    <input
                        type="number"
                        value={base.exp ?? ""}
                        onChange={(e) => setBaseField("exp", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Standing: </label>
                    <input
                        type="number"
                        value={base.standing ?? ""}
                        onChange={(e) => setBaseField("standing", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerBaseConditionEditor;
