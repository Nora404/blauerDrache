import { GameEvent } from "../../eventData";

export const event001ThreeStoneTrigger: GameEvent = {
    id: "E001ThreeStoneTrigger",
    label: "Drei Steine gesucht",
    description: <span>Die Leute am Brunnen suchen Hilfe beim Steine-Sammeln.</span>,
    buttons: [
        {
            label: "Annehmen",
            getAction: () => {
                return {
                    message: <span>Du hast die Quest angenommen!</span>,
                    triggerQuest: "Q001ThreeStone", // <-- ruft updateQuest("Q001ThreeStone") auf
                };
            },
        },
        {
            label: "Ablehnen",
            getAction: () => {
                return {
                    message: <span>Du lehntest ab...</span>,
                    // kein triggerQuest => Keine Quest
                };
            },
        },
    ],
    places: [],
};
