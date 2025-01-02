//#region [imports]
import React, { useState } from "react";
import { getGameEventById, pickRandomNextEvent } from "../../../utility/TriggerEvent";
import { useApplyGameAction } from "../../../utility/ApplyGameAction";
import { GameAction } from "../../../data/eventData";
import Header from "../../../layout/Header/Header";
import { SYSTEM } from "../../../data/colorfullStrings";
//#endregion

//#region [prepare]
type ChainItem = {
    eventId: string;
    outcomeMessage: JSX.Element | null;
}

type GameEventChainProps = {
    initialEventName: string;
    onFinishChain: () => void;
};

export const GameEventChain: React.FC<GameEventChainProps> = ({ initialEventName, onFinishChain, }) => {
    const { applyGameAction } = useApplyGameAction();
    const [eventsChain, setEventsChain] = useState<ChainItem[]>([
        { eventId: initialEventName, outcomeMessage: null },
    ]);
    //#endregion

    //#region [handler]
    const handleButtonClick = (chainIndex: number, getAction: () => GameAction) => {
        const action = getAction();
        applyGameAction(action);

        const newMessage = action.message ?? null;

        let nextEventId: string | null = null;

        if (action.nextEvents && action.nextEvents.length > 0) {
            // Mehrere mögliche Nachfolger => Weighted Random auswählen
            nextEventId = pickRandomNextEvent(action.nextEvents);
        } else if (action.nextEvents) {
            // Nur ein einziger Nachfolger => Direkt übernehmen
            nextEventId = action.nextEvents[0].eventId;
        }


        setEventsChain((prevChain) => {
            const updated = [...prevChain];
            updated[chainIndex] = {
                ...updated[chainIndex],
                outcomeMessage: newMessage,
            };

            if (nextEventId) {
                updated.push({
                    eventId: nextEventId,
                    outcomeMessage: null,
                });
            }
            return updated;
        });
    }
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            {eventsChain.map((chainItem, idx) => {
                const event = getGameEventById(chainItem.eventId);
                if (!event) {
                    return <p key={idx}>Unbekanntes Event: {chainItem.eventId}</p>;
                }

                const { outcomeMessage } = chainItem;

                return (
                    <div key={idx} className="game-event-block">
                        <Header>{event.label}</Header>
                        <p className="mb-1 text-left">{event.description}</p>

                        {outcomeMessage ? (
                            <p className='mb-1 text-left' style={{ color: '#aaffff' }}>{outcomeMessage}</p>
                        ) : (
                            event.buttons.map((btn) => (
                                <button
                                    className="btn-border"
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
    //#endregion
};