import { Conditions } from "../../data/eventData";
import { GameTime } from "../../store/types";

export function checkGameTime(
    conditions: Partial<Conditions>,
    gameTimeData: Partial<GameTime>
): boolean {
    // Hilfsfunktion: Wandelt "HH:MM" in Minuten um
    const convertTimeToMinutes = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    };

    if (conditions.gameTime) {
        if (conditions.gameTime.fromTime && conditions.gameTime.toTime) {
            const currentTime = convertTimeToMinutes(gameTimeData.gameTime ?? "");
            const fromTime = convertTimeToMinutes(conditions.gameTime.fromTime);
            const toTime = convertTimeToMinutes(conditions.gameTime.toTime);
            const mode = conditions.gameTime.mode || "inside";

            if (mode === "inside") {
                // Bedingung erfüllt, wenn currentTime zwischen fromTime und toTime liegt (inklusive)
                if (!(currentTime >= fromTime && currentTime <= toTime)) {
                    return false;
                }
            } else if (mode === "outside") {
                // Bedingung erfüllt, wenn currentTime außerhalb des Intervalls liegt
                if (!(currentTime < fromTime || currentTime > toTime)) {
                    return false;
                }
            }
        }
    }

    // Überprüfung von gameDay (unverändert)
    if (conditions.gameTime?.gameDay !== undefined) {
        if (conditions.gameTime.gameDay !== gameTimeData.gameDay) {
            return false;
        }
    }

    return true;
}