import { Conditions } from "../../data/eventData";
import { PlayerEconomy } from "../../store/types";

export function checkPlayerEconomy(
    conditionObj: Partial<Conditions>,
    playerEconomyData: Partial<PlayerEconomy>
): boolean {
    console.log("CheckEconomyFN: ", playerEconomyData);
    const conditions = conditionObj.playerEconomy;
    if (!conditions) return true;

    // 1) Hilfsfunktion zum Vergleich
    function compareWithOperator(
        actualValue: number,
        neededValue: number,
        operator: "<" | ">" | "="
    ): boolean {
        switch (operator) {
            case "<":
                return actualValue < neededValue;
            case ">":
                return actualValue > neededValue;
            case "=":
            default:
                return actualValue === neededValue;
        }
    }

    // 2) Operator ermitteln (Standard "=")
    const operator = conditionObj.operator || "=";

    // 3) Gold check
    if (conditions.gold !== undefined) {
        const neededGold = conditions.gold;
        const actualGold = playerEconomyData.gold ?? 0;
        if (!compareWithOperator(actualGold, neededGold, operator)) {
            return false;
        }
    }

    // 4) Edelsteine check
    if (conditions.edelsteine !== undefined) {
        const neededGems = conditions.edelsteine;
        const actualGems = playerEconomyData.edelsteine ?? 0;
        if (!compareWithOperator(actualGems, neededGems, operator)) {
            return false;
        }
    }

    // Falls alles OK:
    return true;
}