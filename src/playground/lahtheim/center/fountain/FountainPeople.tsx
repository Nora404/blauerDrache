// #region [imports]
import React, { useEffect, useState } from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { pickRandomEvent } from '../../../../utility/RandomPickedEvent';
import { GameEventChain } from '../../../game/game/GameEventChain';
import { useNewGameStore } from '../../../../store/newGameStore';
// #endregion

// #region [prepare]
type FountainPeopleProps = {
};

const FountainPeople: React.FC<FountainPeopleProps> = () => {
    const { store } = useNewGameStore();
    const navigate = useNavigate();
    const [eventChainActive, setEventChainActive] = useState<string | null>(null);

    const possibleEvents = [
        { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
        { eventId: "004Flower", probability: 10 },
    ];
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/fountain');
    };
    const handleFinishEventChain = () => {
        setEventChainActive(null);
        navigate('/fountain');
    }
    // #endregion

    //#region [events]
    useEffect(() => {
        const randomEventId = pickRandomEvent(possibleEvents, 0.8);
        if (!randomEventId) return;

        const foundEvent = possibleEvents.find(e => e.eventId === randomEventId);

        if (foundEvent?.questId) {
            const isQuestActive = !!store.playerQuest.activeQuests?.[foundEvent.questId];
            if (isQuestActive) {
                setEventChainActive(null);
                return;
            }
        }
        setEventChainActive(randomEventId);
    }, []);
    //#endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>mit einem der Leute sprechen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />
            {eventChainActive && (
                <GameEventChain
                    initialEventName={eventChainActive}
                    onFinishChain={handleFinishEventChain}
                />
            )}
            {!eventChainActive &&
                <ActionButton onClick={handleBack} label='Sich abwenden' />
            }
        </div>
    );
    // #endregion
};

export default FountainPeople;