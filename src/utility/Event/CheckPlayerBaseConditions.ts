import { Conditions } from "../../data/eventData";
import { PlayerBase } from "../../store/types";

export function checkPlayerBase(
    conditionObj: Partial<Conditions>,
    playerBaseData: Partial<PlayerBase>
): boolean {
    const conditions = conditionObj.playerBase;
    // Wenn keine Bedingungen für playerBase gesetzt sind, ist die Prüfung automatisch erfüllt
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

    // Überprüfung jedes Werts in `playerBase`
    for (const baseKey in conditions) {
        const conditionValue = conditions[baseKey as keyof PlayerBase];
        const operator = conditionObj.operator || "="; // Standard: `=`
        const playerValue = playerBaseData[baseKey as keyof PlayerBase];

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