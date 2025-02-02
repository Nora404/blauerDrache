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
import HeaderSmall from "../../../../layout/Header/HeaderSmall";
import Talk from "../../../Formatted/Talk";


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
        <div style={{ border: "1px dashed gray", padding: "10px", margin: "25px" }}>
            <HeaderSmall>Bedingung damit der Button erscheint</HeaderSmall>

            {/* Operator (z.B. "<", "=", ">") */}
            <OperatorEditor conditions={conditions} updateConditions={updateConditions} />

            {/* Toggle + GameTime */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.gameTimeEnabled || false}
                    onChange={() => toggleFlag("gameTimeEnabled")}
                    className="mb-3"
                />
                Muss eine bestimmte <Talk>Zeit</Talk> im Spiel sein?
            </label>
            {conditions.gameTimeEnabled && (
                <>
                    <GameTimeConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + GameState */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.gameStateEnabled || false}
                    onChange={() => toggleFlag("gameStateEnabled")}
                    className="mb-3"
                />
                Muss im Spiel ein bestimmtes <Talk>Wetter</Talk> herrschen?
            </label>
            {conditions.gameStateEnabled && (
                <>
                    <GameStateConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + PlayerStats */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerStatsEnabled || false}
                    onChange={() => toggleFlag("playerStatsEnabled")}
                    className="mb-3"
                />
                Muss der Spieler bestimmte <Talk>Werte</Talk> haben?
            </label>
            {conditions.playerStatsEnabled && (
                <>
                    <PlayerStatsConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + PlayerBase */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerBaseEnabled || false}
                    onChange={() => toggleFlag("playerBaseEnabled")}
                    className="mb-3"
                />
                Welche <Talk>Erfahrungen</Talk> muss der Spieler haben?
            </label>
            {conditions.playerBaseEnabled && (
                <>
                    <PlayerBaseConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + PlayerFlux */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerFluxEnabled || false}
                    onChange={() => toggleFlag("playerFluxEnabled")}
                    className="mb-3"
                />
                Was muss der Spieler <Talk>ausgerüstet</Talk> haben?
            </label>
            {conditions.playerFluxEnabled && (
                <>
                    <PlayerFluxConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + PlayerMeta */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerMetaEnabled || false}
                    onChange={() => toggleFlag("playerMetaEnabled")}
                    className="mb-3"
                />
                Welchen <Talk>Hintergrund</Talk> muss der Spieler haben?
            </label>
            {conditions.playerMetaEnabled && (
                <>
                    <PlayerMetaConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

            {/* Toggle + PlayerEconomy */}
            <label>
                <input
                    type="checkbox"
                    checked={conditions.playerEconomyEnabled || false}
                    onChange={() => toggleFlag("playerEconomyEnabled")}
                    className="mb-3"
                />
                Was braucht der Spieler als <Talk>Währungen</Talk>?
            </label>
            {conditions.playerEconomyEnabled && (
                <>
                    <PlayerEconomyConditionEditor conditions={conditions} updateConditions={updateConditions} />
                </>
            )}<br />

        </div>
    );
};

export default ConditionsEditor;
