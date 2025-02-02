// ConditionsSubEditors/PlayerMetaConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";

// Importiere deine Arrays
import { races } from "../../../../../data/raceData";
import { origin } from "../../../../../data/originData"; // <-- Falls du "origins" Array hast
import { callings } from "../../../../../data/callingData";

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerMetaConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const meta = conditions.playerMeta || {};

    const setMeta = (field: keyof typeof meta, val: any) => {
        updateConditions({
            playerMeta: {
                ...meta,
                [field]: val,
            },
        });
    };

    return (
        <div className="nested-section flex-warp -m-1 gradient">
            {/* Race */}
            <div className="form-group m-15">
                <label>Volk: </label>
                <select
                    value={meta.race || ""}
                    onChange={(e) => setMeta("race", e.target.value)}
                >
                    <option value="">(keine Auswahl)</option>
                    {races.map((r) => (
                        <option key={r.name} value={r.name}>
                            {r.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Origin */}
            <div className="form-group m-15">
                <label>Herkunft: </label>
                <select
                    value={meta.origin || ""}
                    onChange={(e) => setMeta("origin", e.target.value)}
                >
                    <option value="">(keine Auswahl)</option>
                    {origin.map((o) => (
                        <option key={o.name} value={o.name}>
                            {o.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Calling */}
            <div className="form-group m-15">
                <label>Berufung: </label>
                <select
                    value={meta.calling || ""}
                    onChange={(e) => setMeta("calling", e.target.value)}
                >
                    <option value="">(keine Auswahl)</option>
                    {callings.map((c) => (
                        <option key={c.name} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Titel */}
            <div className="form-group m-15">
                <label>Titel: </label>
                <input
                    type="text"
                    value={meta.titel || ""}
                    onChange={(e) => setMeta("titel", e.target.value)}
                />
            </div>
        </div>
    );
};

export default PlayerMetaConditionEditor;
