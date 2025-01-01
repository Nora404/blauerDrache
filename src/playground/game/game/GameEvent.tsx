//#region [imports]
import React, { useState } from 'react';
import { getGameEventByName } from '../../../utility/TriggerEvent';
import { SYSTEM } from '../../../data/colorfullStrings';
import Header from '../../../layout/Header/Header';
import { useApplyGameAction } from '../../../utility/ApplyGameAction';
//#endregion

//#region [prepare]
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
    const [outcomeMessage, setOutcomeMessage] = useState<string | null>(null);

    const { applyGameAction } = useApplyGameAction();

    if (!currentEventName) {
        return null;
    }

    const event = getGameEventByName(currentEventName);
    if (!event) {
        return <p>Unbekanntes Event: {currentEventName}</p>;
    }
    //#endregion

    //#region [handler]
    const handleButtonClick = (actionIndex: number) => {
        const action = event.buttons[actionIndex].getAction();
        // Wendet sämtliche Deltas an
        applyGameAction(action);

        if (action.message) {
            setOutcomeMessage(action.message);
        } else {
            setOutcomeMessage(null);
        }

        if (action.nextEvent) {
            onSetNextEvent(action.nextEvent);
        }
        // sonst bleibet das Event, bis der Spieler auf "Weiter" klickt
    };

    const handleContinue = () => {
        setOutcomeMessage(null);
        onCloseEvent();
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <Header>Etwas ist passiert: {event.name}</Header>
            <p className="mb-1 text-left">{event.description}</p>

            {outcomeMessage ? (
                <>
                    <p className='mb-1 text-left' style={{ color: '#aaffff' }}>{outcomeMessage}</p><br />
                    <div onClick={handleContinue}>{SYSTEM.weiter}</div>
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
    //#endregion
};

export default GameEvent;
