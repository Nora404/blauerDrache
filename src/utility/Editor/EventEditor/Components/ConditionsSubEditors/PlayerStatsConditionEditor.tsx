// ConditionsSubEditors/PlayerStatsConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext"; // Pfad anpassen

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerStatsConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const stats = conditions.playerStats || {};

    const setStat = (field: keyof typeof stats, val: number) => {
        updateConditions({
            playerStats: {
                ...stats,
                [field]: val,
            },
        });
    };

    return (
        <div className="nested-section flex-warp -m-1 gradient">
            <div className="form-group m-15">
                <label>Life: </label>
                <input
                    type="number"
                    value={stats.life ?? ""}
                    onChange={(e) => setStat("life", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Rounds: </label>
                <input
                    type="number"
                    value={stats.rounds ?? ""}
                    onChange={(e) => setStat("rounds", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Attack: </label>
                <input
                    type="number"
                    value={stats.attack ?? ""}
                    onChange={(e) => setStat("attack", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Defense: </label>
                <input
                    type="number"
                    value={stats.defense ?? ""}
                    onChange={(e) => setStat("defense", parseInt(e.target.value) || 0)}
                />
            </div>
            <div className="form-group m-15">
                <label>Luck: </label>
                <input
                    type="number"
                    value={stats.luck ?? ""}
                    onChange={(e) => setStat("luck", parseInt(e.target.value) || 0)}
                />
            </div>
        </div>
    );
};

export default PlayerStatsConditionEditor;
