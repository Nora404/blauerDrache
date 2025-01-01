import React, { useState } from 'react';
import { useGameStore } from '../../../data/gameStore';
import { getGameEventByName } from '../../../utility/TriggerEvent';

type GameEventProps = {
    currentEventName: string | null;
    onCloseEvent: () => void;
    onSetNextEvent: (eventName: string) => void;
};

const GameEvent: React.FC<GameEventProps> = ({
    currentEventName,
    onCloseEvent,
    onSetNextEvent,
}) => {
    const { gameStore, updateEconomy, updateEquipment } = useGameStore();
    const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

    if (!currentEventName) {
        return null;
    }

    const event = getGameEventByName(currentEventName);
    if (!event) {
        return <p>Unbekanntes Event: {currentEventName}</p>;
    }

    // Klick auf einen Button:
    const handleButtonClick = (actionIndex: number) => {
        const action = event.buttons[actionIndex].getAction();

        // economyDelta
        if (action.economyDelta?.gold !== undefined) {
            updateEconomy({
                gold: gameStore.economy.gold + action.economyDelta.gold,
            });
        }

        // itemsDelta
        if (action.itemsDelta) {
            const itemsCopy = { ...gameStore.equipment.items };
            for (const itemName in action.itemsDelta) {
                const delta = action.itemsDelta[itemName];
                itemsCopy[itemName] = (itemsCopy[itemName] || 0) + delta;
                if (itemsCopy[itemName] <= 0) {
                    delete itemsCopy[itemName];
                }
            }
            updateEquipment({
                items: itemsCopy,
            });
        }

        // outcomeMessage anzeigen (falls vorhanden)
        if (action.message) {
            setOutcomeMessage(action.message);
        } else {
            setOutcomeMessage(null);
        }

        // Wenn nextEvent => Starte Event-Kette
        if (action.nextEvent) {
            onSetNextEvent(action.nextEvent);
        }
        // sonst bleiben wir in diesem Event, bis der Spieler auf "Weiter" klickt
    };

    // Klick auf "Weiter"
    const handleContinue = () => {
        // outcomeMessage weg
        setOutcomeMessage(null);

        // Event beenden
        onCloseEvent();
    };

    return (
        <div className="max-width">
            <h2>{event.name}</h2>
            <p className="mb-1 text-left">{event.description}</p>

            {outcomeMessage ? (
                <>
                    <p>{outcomeMessage}</p>
                    <button onClick={handleContinue}>Weiter</button>
                </>
            ) : (
                <>
                    {event.buttons.map((btn, idx) => (
                        <button key={btn.label} onClick={() => handleButtonClick(idx)}>
                            {btn.label}
                        </button>
                    ))}
                </>
            )}
        </div>
    );
};

export default GameEvent;
