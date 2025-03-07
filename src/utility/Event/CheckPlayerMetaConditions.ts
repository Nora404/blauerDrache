import { Conditions } from "../../data/eventData";
import { PlayerMeta } from "../../store/types";

export function checkPlayerMeta(
    conditionObj: Partial<Conditions>,
    playerMetaData: Partial<PlayerMeta>
): boolean {
    const conditions = conditionObj.playerMeta;
    // Wenn keine Bedingungen für playerMeta gesetzt sind, ist die Prüfung automatisch erfüllt
    if (!conditions) return true;

    // 1. Überprüfung von `name`
    if (conditions.name !== undefined) {
        if (conditions.name !== playerMetaData.name) {
            return false;
        }
    }

    // 2. Überprüfung von `race`
    if (conditions.race !== undefined) {
        if (conditions.race !== playerMetaData.race) {
            return false;
        }
    }

    // 3. Überprüfung von `origin`
    if (conditions.origin !== undefined) {
        if (conditions.origin !== playerMetaData.origin) {
            return false;
        }
    }

    // 4. Überprüfung von `calling`
    if (conditions.calling !== undefined) {
        if (conditions.calling !== playerMetaData.calling) {
            return false;
        }
    }

    // 5. Überprüfung von `titel`
    if (conditions.titel !== undefined) {
        if (conditions.titel !== playerMetaData.titel) {
            return false;
        }
    }

    // 6. Überprüfung von `colortype`
    if (conditions.colortype !== undefined) {
        if (conditions.colortype !== playerMetaData.colortype) {
            return false;
        }
    }

    // 7. Überprüfung von `colors` (Array)
    if (conditions.colors !== undefined) {
        for (const color of conditions.colors) {
            // Jede Farbe aus den Bedingungen muss in den Player-Daten vorhanden sein
            if (!playerMetaData.colors?.includes(color)) {
                return false;
            }
        }
    }

    // Alle Bedingungen erfüllt
    return true;
}