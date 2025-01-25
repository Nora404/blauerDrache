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

    return (
        <div style={{ border: "1px solid #aaa", padding: "0.5rem", margin: "0.5rem 0" }}>
            <h4>PlayerFlux</h4>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {/* Feeling */}
                <div>
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
                <div>
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
                <div>
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
                <div>
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
            </div>

            {/* Falls du Buffs/Debuffs abfragen willst:
          flux.haveBuff?: Record<string, number>
          flux.haveDebuff?: Record<string, number>
          Kann man hier z.B. per Textfelder oder List-Select lösen. */}
        </div>
    );
};

export default PlayerFluxConditionEditor;
