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
        <div className="nested-section flex-warp -m-1 gradient">
            <div className="form-group m-15">
                <label>Level: </label>
                <input
                    type="number"
                    value={base.level ?? ""}
                    onChange={(e) => setBaseField("level", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Erfahrung: </label>
                <input
                    type="number"
                    value={base.exp ?? ""}
                    onChange={(e) => setBaseField("exp", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Leumund: </label>
                <input
                    type="number"
                    value={base.standing ?? ""}
                    onChange={(e) => setBaseField("standing", parseInt(e.target.value) || 0)}
                />
            </div>
        </div>
    );
};

export default PlayerBaseConditionEditor;
