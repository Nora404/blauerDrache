// ConditionsSubEditors/PlayerFluxConditionEditor.tsx
import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";

// Importiere deine echten Arrays
import { feelings } from "../../../../../data/feelingData";
import { weapons } from "../../../../../data/weaponData";
import { armors } from "../../../../../data/armorData";
import { items as allItems } from "../../../../../data/ItemData";
// ^^^ Pfade anpassen, je nach Projektstruktur

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const PlayerFluxConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    const flux = conditions.playerFlux || {};

    const setFlux = (key: keyof typeof flux, val: any) => {
        updateConditions({
            playerFlux: {
                ...flux,
                [key]: val,
            },
        });
    };

    const setConditionFlag = (key: keyof ConditionsConfig, val: boolean) => {
        updateConditions({
            [key]: val,
        });
    };

    return (
        <div className="nested-section flex-warp -m-1 gradient">
            {/* Feeling */}
            <div className="form-group m-15">
                <label>Feeling: </label>
                <select
                    value={flux.feeling || ""}
                    onChange={(e) => setFlux("feeling", e.target.value)}
                >
                    <option value="">(Kein Feeling)</option>
                    {feelings.map((f) => (
                        <option key={f.name} value={f.name}>
                            {f.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Weapon */}
            <div className="form-group m-15">
                <label>Weapon: </label>
                <select
                    value={flux.weapon || ""}
                    onChange={(e) => setFlux("weapon", e.target.value)}
                >
                    <option value="">(Keine Waffe)</option>
                    {weapons.map((w) => (
                        <option key={w.name} value={w.name}>
                            {w.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Armor */}
            <div className="form-group m-15">
                <label>Armor: </label>
                <select
                    value={flux.armor || ""}
                    onChange={(e) => setFlux("armor", e.target.value)}
                >
                    <option value="">(Keine Rüstung)</option>
                    {armors.map((a) => (
                        <option key={a.name} value={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Item */}
            <div className="form-group m-15">
                <label>Item (Hand): </label>
                <select
                    value={flux.item || ""}
                    onChange={(e) => setFlux("item", e.target.value)}
                >
                    <option value="">(Kein Item)</option>
                    {allItems.map((it) => (
                        <option key={it.name} value={it.name}>
                            {it.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Checkboxen für haveBuffs und haveDebuffs */}
            <div className="form-group m-15">
                <label>
                    <input
                        type="checkbox"
                        checked={conditions.haveBuffs || false}
                        onChange={(e) => setConditionFlag("haveBuffs", e.target.checked)}
                    />
                    Haben Buffs
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        checked={conditions.haveDebuffs || false}
                        onChange={(e) => setConditionFlag("haveDebuffs", e.target.checked)}
                    />
                    Haben Debuffs
                </label>
            </div>

            {/* Optional: Falls du Buffs/Debuffs detaillierter bearbeiten möchtest */}
            {/* 
            <div style={{ marginTop: "1rem" }}>
                <h5>Buffs</h5>
                { /* Implementiere hier weitere Felder zur detaillierten Bearbeitung von Buffs * /}
            </div>
            */}
        </div>
    );
};

export default PlayerFluxConditionEditor;
