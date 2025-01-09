// #region [imports]
import React, { useEffect, useState } from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { GameEventChain } from '../../../game/game/GameEventChain';
import { pickRandomEvent } from '../../../../utility/RandomPickedEvent';
// #endregion

// #region [prepare]
type CourtyardTreasureProps = {
};

const CourtyardTreasure: React.FC<CourtyardTreasureProps> = () => {
    const navigate = useNavigate();
    const [eventChainActive, setEventChainActive] = useState<string | null>(null);

    const possibleEvents = [
        { eventId: "001StoneCoin", probability: 50 },
        { eventId: "004Flower", probability: 60 },
        { eventId: "007Bag", probability: 20 },
    ];
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/courtyard');
    };

    const handleFinishEventChain = () => {
        setEventChainActive(null);
    }
    // #endregion

    //#region [events]
    useEffect(() => {
        const eventId = pickRandomEvent(possibleEvents, 0.8);
        setEventChainActive(eventId);
    }, []);
    //#endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>Nach einem verlorenen Schatz suchen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            {eventChainActive ? (
                <GameEventChain
                    initialEventName={eventChainActive}
                    onFinishChain={handleFinishEventChain}
                />
            ) : (
                <p className="mb-1 text-left">
                    Links von dir ist Umgebung, rechts von dir ist Umgebung – alles sieht völlig
                    normal und unauffällig aus. Es ist schon fast langweilig, wie ereignislos die
                    letzten Schritte waren. Du kannst deinen Weg unbeirrt weiter fortsetzen.
                </p>
            )}
            <ActionButton onClick={handleBack} label='Sich abwenden' />
        </div>
    );
    // #endregion
};

export default CourtyardTreasure;