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
        <div className="nested-section flex-warp -m-1 gradient">
            <div className="form-group m-15">
                <label>Gold (min.): </label>
                <input
                    type="number"
                    value={economy.gold ?? ""}
                    onChange={(e) => setEconomy("gold", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Edelsteine (min.): </label>
                <input
                    type="number"
                    value={economy.edelsteine ?? ""}
                    onChange={(e) => setEconomy("edelsteine", parseInt(e.target.value) || 0)}
                />
            </div>
        </div>
    );
};

export default PlayerEconomyConditionEditor;
