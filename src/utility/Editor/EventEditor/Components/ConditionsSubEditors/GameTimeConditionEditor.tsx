import React from "react";
import { ConditionsConfig } from "../../../Context/EventContext";

const generateTimeOptions = (): string[] => {
    const times: string[] = [];
    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 10) {
            const hh = h.toString().padStart(2, "0");
            const mm = m.toString().padStart(2, "0");
            times.push(`${hh}:${mm}`);
        }
    }
    return times;
};
const timeOptions = generateTimeOptions();

const dayNightOptions = ["Tag", "Nacht"] as const;

interface SubEditorProps {
    conditions: ConditionsConfig;
    updateConditions: (partial: Partial<ConditionsConfig>) => void;
}

const GameTimeConditionEditor: React.FC<SubEditorProps> = ({ conditions, updateConditions }) => {
    // Wir erwarten, dass conditions.gameTime nun folgende Felder enthält:
    // fromTime, toTime, mode und gameDay
    const gameTime = conditions.gameTime || {};

    const handleFromTimeChange = (value: string) => {
        updateConditions({
            gameTime: {
                ...gameTime,
                fromTime: value,
            },
        });
    };

    const handleToTimeChange = (value: string) => {
        updateConditions({
            gameTime: {
                ...gameTime,
                toTime: value,
            },
        });
    };

    const handleModeChange = (value: "inside" | "outside") => {
        updateConditions({
            gameTime: {
                ...gameTime,
                mode: value,
            },
        });
    };

    const handleGameDayChange = (value: "Tag" | "Nacht") => {
        updateConditions({
            gameTime: {
                ...gameTime,
                gameDay: value,
            },
        });
    };

    return (
        <div className="nested-section flex-warp -m-1 gradient">
            <div className="form-group m-15">
                <label>Von (Uhrzeit): </label>
                <select
                    value={gameTime.fromTime || ""}
                    onChange={(e) => handleFromTimeChange(e.target.value)}
                >
                    <option value="">-- auswählen --</option>
                    {timeOptions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group m-15">
                <label>Bis (Uhrzeit): </label>
                <select
                    value={gameTime.toTime || ""}
                    onChange={(e) => handleToTimeChange(e.target.value)}
                >
                    <option value="">-- auswählen --</option>
                    {timeOptions.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group m-15">
                <label>Bedingung: </label>
                <select
                    value={gameTime.mode || "inside"}
                    onChange={(e) =>
                        handleModeChange(e.target.value as "inside" | "outside")
                    }
                >
                    <option value="inside">Innerhalb der Zeitspanne</option>
                    <option value="outside">Außerhalb der Zeitspanne</option>
                </select>
            </div>

            <div className="form-group m-15">
                <label>Tag/Nacht:</label>
                <select
                    value={gameTime.gameDay || ""}
                    onChange={(e) => handleGameDayChange(e.target.value as "Tag" | "Nacht")}
                >
                    <option value="">(keine Auswahl)</option>
                    {dayNightOptions.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default GameTimeConditionEditor;
