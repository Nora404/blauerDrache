import { Conditions } from "../../data/eventData";
import { PlayerStats } from "../../store/types";

export function checkPlayerStats(
    conditionObj: Partial<Conditions>,
    playerStatsData: Partial<PlayerStats>
): boolean {
    const conditions = conditionObj.playerStats;
    // Wenn keine Bedingungen für playerStats gesetzt sind, ist die Prüfung automatisch erfüllt
    if (!conditions) return true;

    // Helper-Funktion: Vergleiche zwei Zahlen basierend auf dem Operator
    const compareWithOperator = (
        value: number,
        conditionValue: number,
        operator: "<" | ">" | "="
    ): boolean => {
        switch (operator) {
            case "<":
                return value < conditionValue;
            case ">":
                return value > conditionValue;
            case "=":
            default:
                return value === conditionValue;
        }
    };

    // Überprüfung jedes Werts in `playerStats`
    for (const statKey in conditions) {
        const conditionValue = conditions[statKey as keyof PlayerStats];
        const operator = conditionObj.operator || "=";
        const playerValue = playerStatsData[statKey as keyof PlayerStats];

        // Überprüfen, ob ein Vergleich notwendig ist
        if (conditionValue !== undefined && playerValue !== undefined) {
            if (!compareWithOperator(playerValue, conditionValue, operator)) {
                return false;
            }
        }
    }

    // Alle Bedingungen erfüllt
    return true;
}