import React from "react";
import { useEditorContext, ButtonConfig } from "../Context/EventContext";
import { Conditions } from "../../../data/eventData";
import { ArmorName } from "../../../data/armorData";
import { WeaponName } from "../../../data/weaponData";
import { ItemName } from "../../../data/ItemData";
import { RaceName } from "../../../data/raceData";
import { OriginName } from "../../../data/originData";
import { CallingName } from "../../../data/callingData";
import { FeelingName } from "../../../data/feelingData";

/**
 * Haupt-Props: Wir bekommen den Button + index,
 * damit wir `conditions` bearbeiten können.
 */
interface ConditionsEditorProps {
    button: ButtonConfig;
    index: number;
}

/**
 * Haupt-Komponente: ConditionsEditor
 */
const ConditionsEditor: React.FC<ConditionsEditorProps> = ({ button, index }) => {
    const { setButtons } = useEditorContext();

    // Falls `button.conditions` nicht definiert ist, nehmen wir ein leeres Objekt
    const conditions = button.conditions || {};

    // Hilfsfunktion: conditions updaten
    const updateConditions = (partial: Partial<Conditions>) => {
        setButtons((prev) =>
            prev.map((b, i) => {
                if (i !== index) return b;
                return {
                    ...b,
                    conditions: {
                        ...b.conditions,
                        ...partial,
                    },
                };
            })
        );
    };

    return (
        <div
            className="nested-section"
            style={{
                border: "1px dashed gray",
                padding: "0.75rem",
                marginTop: "0.5rem",
            }}
        >
            <h4>Bedingungen (Conditions)</h4>

            {/** Operator + haveBuffs/haveDebuffs */}
            <OperatorAndBuffFlagsEditor conditions={conditions} updateConditions={updateConditions} />

            {/** GameTime */}
            <GameTimeConditionEditor conditions={conditions} updateConditions={updateConditions} />

            {/** GameState */}
            <GameStateConditionEditor conditions={conditions} updateConditions={updateConditions} />

            {/** PlayerStats */}
            <PlayerStatsConditionEditor conditions={conditions} updateConditions={updateConditions} />

            {/** PlayerBase */}
            <PlayerBaseConditionEditor conditions={conditions} updateConditions={updateConditions} />

            {/** PlayerFlux */}
            <PlayerFluxConditionEditor conditions={conditions} updateConditions={updateConditions} />

            {/** PlayerMeta */}
            <PlayerMetaConditionEditor conditions={conditions} updateConditions={updateConditions} />
        </div>
    );
};

export default ConditionsEditor;

/** ---------------------------------------------
 * Gemeinsamer Prop-Typ für alle Unter-Editoren
 * --------------------------------------------- */
interface ConditionSubEditorProps {
    conditions: Conditions;
    updateConditions: (partial: Partial<Conditions>) => void;
}

/** ========================================================================
 * OperatorAndBuffFlagsEditor
 * - operator: "<" | "=" | ">"
 * - haveBuffs: boolean
 * - haveDebuffs: boolean
 * ======================================================================== */
const OperatorAndBuffFlagsEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const handleOperatorChange = (op: "<" | "=" | ">") => {
        updateConditions({ operator: op });
    };

    return (
        <div className="condition-block">
            <label>Operator: </label>
            <select
                value={conditions.operator || "="}
                onChange={(e) => handleOperatorChange(e.target.value as "<" | "=" | ">")}
                style={{ marginRight: "1rem" }}
            >
                <option value="<">{"<"}</option>
                <option value="=">{"="}</option>
                <option value=">">{">"}</option>
            </select>

            <label style={{ marginRight: "1rem" }}>
                <input
                    type="checkbox"
                    checked={conditions.haveBuffs === true}
                    onChange={(e) => updateConditions({ haveBuffs: e.target.checked })}
                />
                haveBuffs?
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={conditions.haveDebuffs === true}
                    onChange={(e) => updateConditions({ haveDebuffs: e.target.checked })}
                />
                haveDebuffs?
            </label>
        </div>
    );
};

/** ========================================================================
 * GameTimeConditionEditor
 * - conditions.gameTime?.gameTime (string)
 * - conditions.gameTime?.gameDay ("Tag" | "Nacht")
 * ======================================================================== */
const GameTimeConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const gameTime = conditions.gameTime || {};

    const handleGameTimeChange = (val: string) => {
        updateConditions({ gameTime: { ...gameTime, gameTime: val } });
    };

    const handleGameDayChange = (val: "Tag" | "Nacht") => {
        updateConditions({ gameTime: { ...gameTime, gameDay: val } });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>GameTime</h5>
            <div>
                <label>Uhrzeit (HH:MM): </label>
                <input
                    type="text"
                    value={gameTime.gameTime || ""}
                    onChange={(e) => handleGameTimeChange(e.target.value)}
                    placeholder="z.B. 12:00"
                    style={{ marginRight: "1rem" }}
                />

                <label>Day/Night: </label>
                <select
                    value={gameTime.gameDay || ""}
                    onChange={(e) => handleGameDayChange(e.target.value as "Tag" | "Nacht")}
                >
                    <option value="">(keine Auswahl)</option>
                    <option value="Tag">Tag</option>
                    <option value="Nacht">Nacht</option>
                </select>
            </div>
        </div>
    );
};

/** ========================================================================
 * GameStateConditionEditor
 * - weather (string)
 * - temperature (string)
 * - creating (boolean)
 * - mobilePop (boolean)
 * - currentPath (string)
 *   (currentEventQueue, switch => optional / advanced)
 * ======================================================================== */
const GameStateConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const gameState = conditions.gameState || {};

    const handleChange = (key: keyof typeof gameState, value: any) => {
        updateConditions({ gameState: { ...gameState, [key]: value } });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>GameState</h5>

            <label>Weather: </label>
            <input
                type="text"
                value={gameState.weather || ""}
                onChange={(e) => handleChange("weather", e.target.value)}
                style={{ marginRight: "1rem" }}
            />

            <label>Temperature: </label>
            <input
                type="text"
                value={gameState.temperature || ""}
                onChange={(e) => handleChange("temperature", e.target.value)}
                style={{ marginRight: "1rem" }}
            />

            <div style={{ marginTop: "0.5rem" }}>
                <label style={{ marginRight: "1rem" }}>
                    <input
                        type="checkbox"
                        checked={Boolean(gameState.creating)}
                        onChange={(e) => handleChange("creating", e.target.checked)}
                    />
                    creating?
                </label>

                <label style={{ marginRight: "1rem" }}>
                    <input
                        type="checkbox"
                        checked={Boolean(gameState.mobilePop)}
                        onChange={(e) => handleChange("mobilePop", e.target.checked)}
                    />
                    mobilePop?
                </label>
            </div>

            <div style={{ marginTop: "0.5rem" }}>
                <label>currentPath: </label>
                <input
                    type="text"
                    value={gameState.currentPath || ""}
                    onChange={(e) => handleChange("currentPath", e.target.value)}
                />
            </div>

            {/* Falls du "switch: Record<string, boolean>" abbilden willst, 
          kannst du dir hier was basteln: 
          - Key + Checkbox
          - Dynamisch hinzufügbar
          etc.
      */}
        </div>
    );
};

/** ========================================================================
 * PlayerStatsConditionEditor
 * - life, rounds, attack, defense, luck
 * ======================================================================== */
const PlayerStatsConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const playerStats = conditions.playerStats || {};

    // Generische Hilfsfunktion zum Updaten
    const handleStatChange = (key: keyof typeof playerStats, val: number) => {
        updateConditions({ playerStats: { ...playerStats, [key]: val } });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>PlayerStats</h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <label>Life: </label>
                    <input
                        type="number"
                        value={playerStats.life || ""}
                        onChange={(e) => handleStatChange("life", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>Rounds: </label>
                    <input
                        type="number"
                        value={playerStats.rounds || ""}
                        onChange={(e) => handleStatChange("rounds", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>Attack: </label>
                    <input
                        type="number"
                        value={playerStats.attack || ""}
                        onChange={(e) => handleStatChange("attack", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>Defense: </label>
                    <input
                        type="number"
                        value={playerStats.defense || ""}
                        onChange={(e) => handleStatChange("defense", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>Luck: </label>
                    <input
                        type="number"
                        value={playerStats.luck || ""}
                        onChange={(e) => handleStatChange("luck", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
            </div>
        </div>
    );
};

/** ========================================================================
 * PlayerBaseConditionEditor
 * - level, nextLevel, exp, standing, reputation, nextReputation, maxLife, maxRounds
 * ======================================================================== */
const PlayerBaseConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const playerBase = conditions.playerBase || {};

    const handleBaseChange = (key: keyof typeof playerBase, val: number) => {
        updateConditions({ playerBase: { ...playerBase, [key]: val } });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>PlayerBase</h5>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <label>Level: </label>
                    <input
                        type="number"
                        value={playerBase.level ?? ""}
                        onChange={(e) => handleBaseChange("level", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>nextLevel: </label>
                    <input
                        type="number"
                        value={playerBase.nextLevel ?? ""}
                        onChange={(e) => handleBaseChange("nextLevel", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>exp: </label>
                    <input
                        type="number"
                        value={playerBase.exp ?? ""}
                        onChange={(e) => handleBaseChange("exp", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>standing: </label>
                    <input
                        type="number"
                        value={playerBase.standing ?? ""}
                        onChange={(e) => handleBaseChange("standing", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>reputation: </label>
                    <input
                        type="number"
                        value={playerBase.reputation ?? ""}
                        onChange={(e) => handleBaseChange("reputation", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>nextReputation: </label>
                    <input
                        type="number"
                        value={playerBase.nextReputation ?? ""}
                        onChange={(e) =>
                            handleBaseChange("nextReputation", parseInt(e.target.value, 10) || 0)
                        }
                    />
                </div>
                <div>
                    <label>maxLife: </label>
                    <input
                        type="number"
                        value={playerBase.maxLife ?? ""}
                        onChange={(e) => handleBaseChange("maxLife", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
                <div>
                    <label>maxRounds: </label>
                    <input
                        type="number"
                        value={playerBase.maxRounds ?? ""}
                        onChange={(e) => handleBaseChange("maxRounds", parseInt(e.target.value, 10) || 0)}
                    />
                </div>
            </div>
        </div>
    );
};

/** ========================================================================
 * PlayerFluxConditionEditor
 * - feeling: FeelingName
 * - buff: Partial<Record<BuffName, number>>
 * - debuff: Partial<Record<DebuffName, number>>
 * - weapon: WeaponName
 * - armor: ArmorName
 * - item: ItemName
 * 
 * Da hier in den Types "buff" und "debuff" vom Typ "Record<BuffName, number>" sind,
 * könnte man bei Conditions z.B. nur checken, ob "Strength" >= 1? 
 * Hier zeige ich nur einfache Felder. 
 * ======================================================================== */
const PlayerFluxConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const playerFlux = conditions.playerFlux || {};

    const handleFluxFieldChange = (key: keyof typeof playerFlux, val: any) => {
        updateConditions({
            playerFlux: {
                ...playerFlux,
                [key]: val,
            },
        });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>PlayerFlux</h5>
            <div>
                <label>Feeling: </label>
                <input
                    type="text"
                    value={playerFlux.feeling || ""}
                    onChange={(e) => handleFluxFieldChange("feeling", e.target.value as FeelingName)}
                    style={{ marginRight: "1rem" }}
                />

                <label>Weapon: </label>
                <input
                    type="text"
                    value={playerFlux.weapon || ""}
                    onChange={(e) => handleFluxFieldChange("weapon", e.target.value as WeaponName)}
                    style={{ marginRight: "1rem" }}
                />

                <label>Armor: </label>
                <input
                    type="text"
                    value={playerFlux.armor || ""}
                    onChange={(e) => handleFluxFieldChange("armor", e.target.value as ArmorName)}
                    style={{ marginRight: "1rem" }}
                />

                <label>Item: </label>
                <input
                    type="text"
                    value={playerFlux.item || ""}
                    onChange={(e) => handleFluxFieldChange("item", e.target.value as ItemName)}
                />
            </div>

        </div>
    );
};

/** ========================================================================
 * PlayerMetaConditionEditor
 * - name, race, origin, calling, titel, colortype, colors (string[])
 * ======================================================================== */
const PlayerMetaConditionEditor: React.FC<ConditionSubEditorProps> = ({
    conditions,
    updateConditions,
}) => {
    const playerMeta = conditions.playerMeta || {};

    const handleMetaChange = (key: keyof typeof playerMeta, val: any) => {
        updateConditions({
            playerMeta: {
                ...playerMeta,
                [key]: val,
            },
        });
    };

    // Farben-Array (string[]) kann man z.B. als CSV abbilden
    const colorsValue = (playerMeta.colors || []).join(", ");
    const handleColorsChange = (val: string) => {
        // Erwarte comma-separated
        const arr = val.split(",").map((c) => c.trim()).filter(Boolean);
        updateConditions({
            playerMeta: {
                ...playerMeta,
                colors: arr,
            },
        });
    };

    return (
        <div className="condition-block" style={{ marginTop: "0.5rem" }}>
            <h5>PlayerMeta</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={playerMeta.name || ""}
                        onChange={(e) => handleMetaChange("name", e.target.value)}
                    />
                </div>
                <div>
                    <label>Race: </label>
                    <input
                        type="text"
                        value={playerMeta.race || ""}
                        onChange={(e) => handleMetaChange("race", e.target.value as RaceName)}
                    />
                </div>
                <div>
                    <label>Origin: </label>
                    <input
                        type="text"
                        value={playerMeta.origin || ""}
                        onChange={(e) => handleMetaChange("origin", e.target.value as OriginName)}
                    />
                </div>
                <div>
                    <label>Calling: </label>
                    <input
                        type="text"
                        value={playerMeta.calling || ""}
                        onChange={(e) => handleMetaChange("calling", e.target.value as CallingName)}
                    />
                </div>
                <div>
                    <label>Titel: </label>
                    <input
                        type="text"
                        value={playerMeta.titel || ""}
                        onChange={(e) => handleMetaChange("titel", e.target.value)}
                    />
                </div>
                <div>
                    <label>colortype: </label>
                    <input
                        type="text"
                        value={playerMeta.colortype || ""}
                        onChange={(e) => handleMetaChange("colortype", e.target.value)}
                    />
                </div>
                <div>
                    <label>colors (CSV): </label>
                    <input
                        type="text"
                        value={colorsValue}
                        onChange={(e) => handleColorsChange(e.target.value)}
                        placeholder="z.B. Rot, Blau, Gelb"
                        style={{ width: "200px" }}
                    />
                </div>
            </div>
        </div>
    );
};
