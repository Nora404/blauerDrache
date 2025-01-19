
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WeightedEvent } from '../../data/eventData';
import { useRootStore } from '../../store';
import { filterEventsByConditions } from '../TriggerEvent';
import { pickRandomEvent } from '../RandomPickedEvent';

export function useLocationEvents(possibleEvents: WeightedEvent[], backPath: string) {
    const {
        gameTime,
        gameState,
        playerStats,
        playerBase,
        playerFlux,
        playerMeta,
        playerQuest,
    } = useRootStore();
    const [localRandomEvent, setLocalRandomEvent] = useState<string | null>(null);
    const navigate = useNavigate();

    // Gemeinsame Variablen
    const queue = gameState.data.currentEventQueue;
    const firstEvent = queue.length > 0 ? queue[0] : null;

    // Ausgelagerte useEffect-Logik
    useEffect(() => {
        const filtered = filterEventsByConditions(
            possibleEvents,
            gameTime.data,
            gameState.data,
            playerStats.data,
            playerBase.data,
            playerFlux.data,
            playerMeta.data,
            playerQuest.data,
        );

        const randomEventId = pickRandomEvent(filtered, 0.8);
        if (!randomEventId) return;

        const foundEvent = filtered.find((e) => e.eventId === randomEventId);
        if (foundEvent?.questId) {
            const isQuestActive = !!playerQuest.data.activeQuests[foundEvent.questId];
            if (isQuestActive) {
                setLocalRandomEvent(null);
                return;
            }
        }
        setLocalRandomEvent(randomEventId);
    }, [
        possibleEvents,
        gameTime,
        gameTime.data,
        gameState,
        gameState.data,
        playerStats,
        playerStats.data,
        playerBase,
        playerBase.data,
        playerFlux,
        playerFlux.data,
        playerMeta,
        playerMeta.data,
        playerQuest,
        playerQuest.data,
    ]);

    // Ausgelagerte Handler
    const handleBack = () => {
        navigate(backPath);
    };

    const handleFinishLocalEvent = () => {
        setLocalRandomEvent(null);
        navigate(backPath);
    };

    const handleFinishQuestEvent = () => {
        const newQueue = queue.slice(1);
        gameState.setGameState({ currentEventQueue: newQueue });
        navigate(backPath);
    };

    return {
        // Zustände:
        localRandomEvent,
        firstEvent,

        // Handler:
        handleBack,
        handleFinishLocalEvent,
        handleFinishQuestEvent,
    };
}


// EINBINDEN

// const possibleEvents: WeightedEvent[] = [
//     { eventId: "E001ThreeStoneTrigger", probability: 90, questId: "Q001ThreeStone" },
//     { eventId: "004Flower", probability: 10 },
//   ];

//   const {
//     localRandomEvent,
//     firstEvent,
//     handleBack,
//     handleFinishLocalEvent,
//     handleFinishQuestEvent,
//   } = useLocationEvents(possibleEvents, "/fountain");

//   const initialEventName = firstEvent || localRandomEvent || '';
//   const onFinishChainHandler = firstEvent ? handleFinishQuestEvent : handleFinishLocalEvent;
