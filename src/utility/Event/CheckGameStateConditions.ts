import { Conditions } from "../../data/eventData";
import { GameState } from "../../store/types";

export function checkGameState(
    conditionObj: Partial<Conditions>,
    gameStateData: Partial<GameState>
): boolean {
    const conditions = conditionObj.gameState;

    // Keine Bedingungen vorhanden
    if (!conditions) return true;

    const {
        weather,
        temperature,
        currentPath,
        currentEventQueue,
        switch: conditionSwitch,
    } = conditions;

    // 1. Überprüfe `weather`
    if (weather !== undefined && weather !== gameStateData.weather) {
        return false;
    }

    // 2. Überprüfe `temperature`
    if (temperature !== undefined && temperature !== gameStateData.temperature) {
        return false;
    }

    // 3. Überprüfe `currentPath`
    if (currentPath !== undefined && currentPath !== gameStateData.currentPath) {
        return false;
    }

    // 4. Überprüfe `currentEventQueue`
    if (currentEventQueue) {
        for (const eventId in currentEventQueue) {
            const expectedPath = currentEventQueue[eventId];
            if (
                !gameStateData.currentEventQueue?.[eventId] ||
                gameStateData.currentEventQueue[eventId] !== expectedPath
            ) {
                return false;
            }
        }
    }

    // 5. Überprüfe `switch`
    if (conditionSwitch) {
        for (const key in conditionSwitch) {
            const expectedValue = conditionSwitch[key];
            if (gameStateData.switch?.[key] !== expectedValue) {
                return false;
            }
        }
    }

    // Alle Bedingungen erfüllt
    return true;
}