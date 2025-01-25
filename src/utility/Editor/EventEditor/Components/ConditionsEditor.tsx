// ConditionsEditor.tsx
import React from "react";

// Achtung: Pfad anpassen
import { ButtonConfig, DEFAULT_CONDITIONS, useEditorContext } from "../../Context/EventContext";
import { ConditionsConfig } from "../../Context/EventContext"; // <-- Dein Interface

// Sub-Editoren (siehe unten)
import OperatorEditor from "./ConditionsSubEditors/OperatorEditor";
import GameTimeConditionEditor from "./ConditionsSubEditors/GameTimeConditionEditor";
import GameStateConditionEditor from "./ConditionsSubEditors/GameStateConditionEditor";
import PlayerStatsConditionEditor from "./ConditionsSubEditors/PlayerStatsConditionEditor";
import PlayerBaseConditionEditor from "./ConditionsSubEditors/PlayerBaseConditionEditor";
import PlayerFluxConditionEditor from "./ConditionsSubEditors/PlayerFluxConditionEditor";
import PlayerMetaConditionEditor from "./ConditionsSubEditors/PlayerMetaConditionEditor";
import PlayerEconomyConditionEditor from "./ConditionsSubEditors/PlayerEconomyConditionEditor";
import PlayerItemsConditionEditor from "./ConditionsSubEditors/PlayerItemsConditionEditor";


interface ConditionsEditorProps {
    button: ButtonConfig;
    index: number;
}

const ConditionsEditor: React.FC<ConditionsEditorProps> = ({ button, index }) => {
    const { setButtons } = useEditorContext();

    // Falls noch keine conditions existieren, legen wir ein leeres an.
    const conditions = button.conditions || DEFAULT_CONDITIONS;

    // Helper: Aktualisiert Teilbereiche in conditions
    const updateConditions = (partial: Partial<ConditionsConfig>) => {
        setButtons((prev) =>
            prev.map((b, i) => {
                if (i !== index) return b;

                // Wir erstellen ein neues, gemergetes Conditions-Objekt
                const newConditions: ConditionsConfig = {
                    ...conditions,
                    ...partial,
                };

                return {
                    ...b,
                    conditions: newConditions,
                };
            })
        );
    };

    // Schaltet z.B. conditions.gameTimeEnabled <-> false
    const toggleFlag = (flag: keyof ConditionsConfig) => {
        const currVal = conditions[flag] as boolean | undefined;
        updateConditions({ [flag]: !currVal });
    };

    return (
        <div style={{ border: "1px dashed gray", padding: "1rem", marginTop: "1rem" }}>
            <h3>Conditions</h3>

            {/* Operator (z.B. "<", "=", ">") */}
            <OperatorEditor conditions={conditions} updateConditions={updateConditions} /><br />

            {/* Toggle + GameTime */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.gameTimeEnabled || false}
                    onChange={() => toggleFlag("gameTimeEnabled")}
                />
                GameTime-Bedingungen
            </label>
            {conditions.gameTimeEnabled && (
                <>
                    <GameTimeConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + GameState */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.gameStateEnabled || false}
                    onChange={() => toggleFlag("gameStateEnabled")}
                />
                GameState-Bedingungen
            </label>
            {conditions.gameStateEnabled && (
                <>
                    <GameStateConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerStats */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerStatsEnabled || false}
                    onChange={() => toggleFlag("playerStatsEnabled")}
                />
                PlayerStats-Bedingungen
            </label>
            {conditions.playerStatsEnabled && (
                <>
                    <PlayerStatsConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerBase */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerBaseEnabled || false}
                    onChange={() => toggleFlag("playerBaseEnabled")}
                />
                PlayerBase-Bedingungen
            </label>
            {conditions.playerBaseEnabled && (
                <>
                    <PlayerBaseConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerFlux */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerFluxEnabled || false}
                    onChange={() => toggleFlag("playerFluxEnabled")}
                />
                PlayerFlux-Bedingungen
            </label>
            {conditions.playerFluxEnabled && (
                <>
                    <PlayerFluxConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerMeta */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerMetaEnabled || false}
                    onChange={() => toggleFlag("playerMetaEnabled")}
                />
                PlayerMeta-Bedingungen
            </label>
            {conditions.playerMetaEnabled && (
                <>
                    <PlayerMetaConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerEconomy */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerEconomyEnabled || false}
                    onChange={() => toggleFlag("playerEconomyEnabled")}
                />
                PlayerEconomy-Bedingungen
            </label>
            {conditions.playerEconomyEnabled && (
                <>
                    <PlayerEconomyConditionEditor conditions={conditions} updateConditions={updateConditions} /><br />
                </>
            )}

            {/* Toggle + PlayerItems */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerItemsEnabled || false}
                    onChange={() => toggleFlag("playerItemsEnabled")}
                />
                PlayerItems-Bedingungen
            </label>
            {conditions.playerItemsEnabled && (
                <PlayerItemsConditionEditor conditions={conditions} updateConditions={updateConditions} />
            )}
        </div>
    );
};

export default ConditionsEditor;
