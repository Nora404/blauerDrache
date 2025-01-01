import React, { useState } from "react";
import { getGameEventByName } from "../../../utility/TriggerEvent";
import { useApplyGameAction } from "../../../utility/ApplyGameAction";
import { GameAction } from "../../../data/eventData";
import Header from "../../../layout/Header/Header";
import { SYSTEM } from "../../../data/colorfullStrings";

interface ChainItem {
    eventName: string;
    outcomeMessage: string | null;
}

type GameEventChainProps = {
    initialEventName: string;
    onFinishChain: () => void;
};

export const GameEventChain: React.FC<GameEventChainProps> = ({
    initialEventName,
    onFinishChain,
}) => {
    const { applyGameAction } = useApplyGameAction();

    // Wir starten mit 1 Event in der Kette
    const [eventsChain, setEventsChain] = useState<ChainItem[]>([
        { eventName: initialEventName, outcomeMessage: null },
    ]);

    /**
     * Wenn der User einen Button klickt, erhalten wir die GameAction.
     * Wir aktualisieren den Store über applyGameAction().
     * Wenn ein nextEvent existiert, fügen wir es ans Ende an.
     */
    function handleButtonClick(
        chainIndex: number, // das Event in der Kette
        getAction: () => GameAction
    ) {
        const action = getAction();
        applyGameAction(action);

        // outcomeMessage
        const newMessage = action.message ?? null;

        // nextEvent
        let nextEventName: string | null = action.nextEvent ?? null;

        // Kette klonen
        setEventsChain((prevChain) => {
            const updated = [...prevChain];

            // 1) outcomeMessage im aktuellen Event setzen
            updated[chainIndex] = {
                ...updated[chainIndex],
                outcomeMessage: newMessage,
            };

            // 2) Falls nextEvent => hinten anhängen
            if (nextEventName) {
                updated.push({
                    eventName: nextEventName,
                    outcomeMessage: null,
                });
            }

            return updated;
        });
    }

    return (
        <div className="max-width">
            {eventsChain.map((chainItem, idx) => {
                const event = getGameEventByName(chainItem.eventName);
                if (!event) {
                    return <p key={idx}>Unbekanntes Event: {chainItem.eventName}</p>;
                }

                // Ist schon ein outcomeMessage vorhanden?
                const { outcomeMessage } = chainItem;

                return (
                    <div key={idx} className="game-event-block">
                        <Header>Etwas ist passiert: {event.name}</Header>
                        <p className="mb-1 text-left">{event.description}</p>

                        {outcomeMessage ? (
                            <p className='mb-1 text-left' style={{ color: '#aaffff' }}>{outcomeMessage}</p>
                        ) : (
                            event.buttons.map((btn) => (
                                <button
                                    key={btn.label}
                                    onClick={() => handleButtonClick(idx, btn.getAction)}
                                >
                                    {btn.label}
                                </button>
                            ))
                        )}
                        <br />
                    </div>
                );
            })}
            <br />
            <div onClick={onFinishChain}>{SYSTEM.schließen}</div>
        </div>
    );
};
