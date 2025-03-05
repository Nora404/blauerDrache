import { useMemo } from "react";
import { useRootStore } from "../../store";
import { WeightedEvent } from "../../data/eventData";

// Dieser Hook sammelt alle aktiven Quests, die am aktuellen Ort (currentPath) relevant sind.
export function useQuestEvents(currentPath: string): WeightedEvent[] {
    const { playerQuest } = useRootStore();

    const questEvents = useMemo(() => {
        // Durchsuche alle aktiven Quests und filtere diejenigen, deren progress.path mit currentPath übereinstimmt.
        const activeQuests = Object.entries(playerQuest.data.activeQuests);
        return activeQuests
            .filter(([questId, progress]) => {
                // Hier gehen wir davon aus, dass progress.path den Ort angibt, an dem die Quest abgegeben oder fortgeführt werden kann.
                return progress.path === currentPath;
            })
            .map(([questId]) => ({
                eventId: questId, // Wir verwenden die Quest-ID als Platzhalter für das Quest-Event.
                probability: 100, // Quest-Events sind immer verfügbar.
                questId,         // Speichern der Quest-ID zur weiteren Verarbeitung.
                conditions: {}   // Hier können später weitere Bedingungen ergänzt werden.
            }));
    }, [playerQuest.data.activeQuests, currentPath]);

    return questEvents;
}
