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
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>PlayerStats</h4>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                    <label>Life: </label>
                    <input
                        type="number"
                        value={stats.life ?? ""}
                        onChange={(e) => setStat("life", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Rounds: </label>
                    <input
                        type="number"
                        value={stats.rounds ?? ""}
                        onChange={(e) => setStat("rounds", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                        type="number"
                        value={stats.attack ?? ""}
                        onChange={(e) => setStat("attack", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                        type="number"
                        value={stats.defense ?? ""}
                        onChange={(e) => setStat("defense", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
                <div>
                    <label>Luck: </label>
                    <input
                        type="number"
                        value={stats.luck ?? ""}
                        onChange={(e) => setStat("luck", parseInt(e.target.value) || 0)}
                        style={{ width: "60px" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsConditionEditor;
