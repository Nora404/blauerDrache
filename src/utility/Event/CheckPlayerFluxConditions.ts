import { Conditions } from "../../data/eventData";
import { PlayerFlux } from "../../store/types";

export function checkPlayerFlux(
    conditionObj: Partial<Conditions>,
    playerFluxData: Partial<PlayerFlux>
): boolean {
    const conditions = conditionObj.playerFlux;
    // Wenn keine Bedingungen für playerFlux gesetzt sind, ist die Prüfung automatisch erfüllt
    if (
        !conditions &&
        conditionObj.haveBuffs === undefined &&
        conditionObj.haveDebuffs === undefined
    ) {
        return true;
    }

    // 1. Überprüfung von `haveBuffs`
    if (conditionObj.haveBuffs !== undefined) {
        const hasBuffs =
            playerFluxData.buff && Object.keys(playerFluxData.buff).length > 0;
        if (conditionObj.haveBuffs !== hasBuffs) {
            return false;
        }
    }

    // 2. Überprüfung von `haveDebuffs`
    if (conditionObj.haveDebuffs !== undefined) {
        const hasDebuffs =
            playerFluxData.debuff && Object.keys(playerFluxData.debuff).length > 0;
        if (conditionObj.haveDebuffs !== hasDebuffs) {
            return false;
        }
    }

    // 3. Überprüfung von `feeling`
    if (conditions?.feeling !== undefined) {
        if (conditions.feeling !== playerFluxData.feeling) {
            return false;
        }
    }

    // 4. Überprüfung von `buff`
    if (conditions?.buff) {
        for (const buffName in conditions.buff) {
            const requiredBuffValue =
                conditions.buff[buffName as keyof typeof conditions.buff];
            const playerBuffValue =
                playerFluxData.buff?.[buffName as keyof typeof conditions.buff];

            if (requiredBuffValue !== undefined) {
                // Prüfen, ob der Buff existiert
                if (playerBuffValue === undefined) {
                    return false;
                }
            }
        }
    }

    // 5. Überprüfung von `debuff`
    if (conditions?.debuff) {
        for (const debuffName in conditions.debuff) {
            const requiredDebuffValue =
                conditions.debuff[debuffName as keyof typeof conditions.debuff];
            const playerDebuffValue =
                playerFluxData.debuff?.[debuffName as keyof typeof conditions.debuff];

            if (requiredDebuffValue !== undefined) {
                // Prüfen, ob der Debuff existiert
                if (playerDebuffValue === undefined) {
                    return false;
                }
            }
        }
    }

    // 6. Überprüfung von `weapon`
    if (conditions?.weapon !== undefined) {
        if (conditions.weapon !== playerFluxData.weapon) {
            return false;
        }
    }

    // 7. Überprüfung von `armor`
    if (conditions?.armor !== undefined) {
        if (conditions.armor !== playerFluxData.armor) {
            return false;
        }
    }

    // 8. Überprüfung von `item`
    if (conditions?.item !== undefined) {
        if (conditions.item !== playerFluxData.item) {
            return false;
        }
    }

    // Alle Bedingungen erfüllt
    return true;
}