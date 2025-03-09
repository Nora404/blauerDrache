import { useMemo } from "react";
import { useRootStore } from "../../store";
import { WeightedEvent } from "../../data/eventData";
import { getQuestByEventId } from "../../data/questData";

// Dieser Hook sammelt alle aktiven Quests, die am aktuellen Ort (currentPath) relevant sind.
export function useQuestEvents(currentPath: string): WeightedEvent[] {
    const { playerQuest } = useRootStore();

    const questEvents = useMemo(() => {
        const activeQuests = Object.entries(playerQuest.data.activeQuests);
        return activeQuests
            .filter(([_, progress]) => {
                return progress.path === currentPath;
            })
            .map(([questId]) => ({
                eventId: questId,
                probability: 100,
                questId,
                conditions: {}
            }));
    }, [playerQuest.data.activeQuests, currentPath]);

    return questEvents;
}

export function useQuestIsDone() {
    const { gameState } = useRootStore();

    const queue = gameState.data.currentEventQueue;
    const path = gameState.data.currentPath;

    const firstEvent =
        Object.entries(queue).find(([_, eventPath]) => {
            return eventPath === path;
        })?.[0] || null;

    const questObj = firstEvent ? getQuestByEventId(firstEvent) : undefined;
    return questObj;
}