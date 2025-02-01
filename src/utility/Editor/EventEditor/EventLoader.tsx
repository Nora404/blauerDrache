// EventLoader.tsx
import React, { useState } from "react";
import { useEditorContext, DEFAULT_CONDITIONS, ButtonConfig } from "../Context/EventContext";
import { GameEvent } from "../../../data/eventData";
import { gameEvents } from "../../../data/eventList";
import { ItemCartegoryName } from "../../../data/gameItems/ItemData";
// Angenommen, du hast ein Array aller Events exportiert:/ <-- Pfad anpassen

const EventLoader: React.FC = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { setEventId, setLabel, setDescription, setButtons, setPlaces } = useEditorContext();

    // Filtere alle Events nach Suchbegriff (suche in Label oder ID)
    const filteredEvents = gameEvents.filter((ev: GameEvent) =>
        (ev.label || ev.id).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mapping des geladenen GameEvents in deinen EditorContext
    const loadEvent = (ev: GameEvent) => {
        // Falls deine Event-ID intern ohne das "event"‑Prefix gespeichert werden soll:
        setEventId(ev.id.replace(/^event/, ""));
        setLabel(ev.label || "");
        setDescription(ev.description);
        setPlaces(ev.places || []);
        // # Änderung: Button-Mapping im Loader mit expliziten Default-Werton-Mapping im Loader:
        const buttonConfigs: ButtonConfig[] = ev.buttons.map((btn) => {
            const action = typeof btn.getAction === "function" ? btn.getAction() : {};
            return {
                label: btn.label,
                result: btn.result || "",
                // originalGetAction entfernt – falls du es brauchst, erweitere das Interface
                message: action.message || "",
                itemsDeltaEnabled: !!action.itemsDelta,
                itemsDelta: Array.isArray(action.itemsDelta)
                    ? action.itemsDelta
                    : (Object.entries(action.itemsDelta || {}).map(([itemName, quantity]) => ({
                        category: "" as ItemCartegoryName, // Hier ggf. anpassen, wenn du eine Kategorie ermitteln kannst
                        itemName,
                        quantity: Number(quantity) || 0,
                    })) as ButtonConfig["itemsDelta"]),
                economyDeltaEnabled: !!action.economyDelta,
                economyDelta: {
                    gold: action.economyDelta?.gold ?? 0,
                    edelsteine: action.economyDelta?.edelsteine ?? 0,
                },
                fluxDeltaEnabled: !!action.fluxDelta,
                fluxDelta: {
                    feeling:
                        typeof action.fluxDelta?.feeling === "string"
                            ? action.fluxDelta.feeling
                            : "",
                    buff:
                        typeof action.fluxDelta?.buff === "string"
                            ? action.fluxDelta.buff
                            : "",
                    debuff:
                        typeof action.fluxDelta?.debuff === "string"
                            ? action.fluxDelta.debuff
                            : "",
                    item:
                        typeof action.fluxDelta?.item === "string"
                            ? action.fluxDelta.item
                            : "",
                },
                stateDeltaEnabled: !!action.stateDelta,
                stateDelta: {
                    life: action.stateDelta?.life ?? 0,
                    actionPoints: action.stateDelta?.actionPoints ?? 0,
                    attack: action.stateDelta?.attack ?? 0,
                    defense: action.stateDelta?.defense ?? 0,
                    luck: action.stateDelta?.luck ?? 0,
                },
                baseDeltaEnabled: !!action.baseDelta,
                baseDelta: {
                    exp: action.baseDelta?.exp ?? 0,
                    reputation: action.baseDelta?.leumund ?? 0,
                },
                triggerGroup: action.triggerQuest
                    ? "triggerQuest"
                    : action.endQuest
                        ? "endQuest"
                        : action.nextEvents && action.nextEvents.length > 0
                            ? "nextEvents"
                            : "",
                triggerQuest: action.triggerQuest || "",
                endQuest: action.endQuest || "",
                nextEvents: action.nextEvents || [],
                conditionsEnabled: false,
                conditions: { ...DEFAULT_CONDITIONS },
            };
        });

        setButtons(buttonConfigs);
        setShowDropdown(false);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <button className="btn-border" onClick={() => setShowDropdown((prev) => !prev)}>
                Event laden
            </button>
            {showDropdown && (
                <div style={{ marginTop: "0.5rem" }}>
                    <input
                        type="text"
                        placeholder="Suche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        style={{ width: "100%" }}
                        size={5}
                        onChange={(e) => {
                            const selectedId = e.target.value;
                            const selectedEvent = gameEvents.find((ev: GameEvent) => ev.id === selectedId);
                            if (selectedEvent) loadEvent(selectedEvent);
                        }}
                    >
                        {filteredEvents.map((ev: GameEvent) => (
                            <option key={ev.id} value={ev.id}>
                                {ev.label || ev.id}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default EventLoader;
