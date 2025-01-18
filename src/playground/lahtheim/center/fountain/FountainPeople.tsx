// FountainPeople.tsx
// #region [imports]
import React, { useEffect, useState } from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';
import { pickRandomEvent } from '../../../../utility/RandomPickedEvent';
import { GameEventChain } from '../../../game/game/GameEventChain';
import { WeightedEvent } from '../../../../data/eventData';
import { filterEventsByConditions } from '../../../../utility/TriggerEvent';

import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
// #endregion

// #region [prepare]
type FountainPeopleProps = {};

const FountainPeople: React.FC<FountainPeopleProps> = observer(() => {

    const { storeData: store, gameStateStore } = useRootStore();
    const [localRandomEvent, setLocalRandomEvent] = useState<string | null>(null);
    const navigate = useNavigate();

    const queue = store.gameState.currentEventQueue;
    const firstEvent = queue.length > 0 ? queue[0] : null;

    const possibleEvents: WeightedEvent[] = [
        { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
        { eventId: "004Flower", probability: 10 },
    ];
    // #endregion

    // #region [handler]
    const handleBack = () => {
        navigate('/fountain');
    };

    const handleFinishLocalEvent = () => {
        setLocalRandomEvent(null);
        navigate('/fountain');
    };

    const handleFinishQuestEvent = () => {
        const newQueue = queue.slice(1);
        gameStateStore.setGameState({ currentEventQueue: newQueue });
        navigate('/fountain');
    };
    // #endregion

    // #region [events]
    useEffect(() => {
        const filtered = filterEventsByConditions(store, possibleEvents);

        const randomEventId = pickRandomEvent(filtered, 0.8);
        if (!randomEventId) return;

        const foundEvent = filtered.find((e) => e.eventId === randomEventId);
        if (foundEvent?.questId) {
            const isQuestActive = !!store.playerQuest.activeQuests[foundEvent.questId];
            if (isQuestActive) {
                setLocalRandomEvent(null);
                return;
            }
        }
        setLocalRandomEvent(randomEventId);
    }, [store]);
    // #endregion

    // #region [jsx]
    const initialEventName = firstEvent || localRandomEvent || '';
    const onFinishChainHandler = firstEvent ? handleFinishQuestEvent : handleFinishLocalEvent;

    return (
        <div className='max-width'>
            <h2>mit einem der Leute sprechen</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest, dass die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat.
                Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p>
            <br />
            {(firstEvent || localRandomEvent) && (
                <GameEventChain
                    initialEventName={initialEventName}
                    onFinishChain={onFinishChainHandler}
                />
            )}
            {!firstEvent && !localRandomEvent && (
                <ActionButton onClick={handleBack} label='Sich abwenden' />
            )}
        </div>
    );
    // #endregion
});

export default FountainPeople;
