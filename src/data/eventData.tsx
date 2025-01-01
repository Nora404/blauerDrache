import { PlacesKeys } from "./colorfullStrings";
import { PlayerEconomy, PlayerEquipment, PlayerMeta, PlayerStats } from "./gameStore";

export type GameAction = {
    itemsDelta?: Record<string, number>;
    metaDelta?: Partial<PlayerMeta>
    statsDelta?: Partial<PlayerStats>;
    economyDelta?: Partial<PlayerEconomy>;
    equipmentDelta?: Partial<PlayerEquipment>;
    nextEvent?: string;  // Name eines weiteren Events, das direkt nach diesem kommt
    message?: string;    // der Text der angezeigt werden soll
}

export type GameEvent = {
    name: string;
    description: string;
    buttons: {
        label: string;
        getAction: () => GameAction;
    }[];
    places: {
        place: PlacesKeys;
        probability: number; // 1-100 wobei 100 = immer möglich
    }[];
}

export const gameEvents: GameEvent[] = [
    {
        name: "Stein",
        description: "Ein Stein liegt auf dem Boden!",
        buttons: [
            {
                label: "Stein aufheben",
                getAction: () => ({
                    economyDelta: { gold: 2 },
                    itemsDelta: { Stein: 1 },
                    message: "Du hast unter dem Stein etwas Gold gefunden.",
                }),
            },
            {
                label: "Stein liegen lassen",
                getAction: () => ({
                    message: "Du ignorierst den Stein.",
                }),
            },
        ],
        places: [
            {
                place: "Wald",
                probability: 50
            },
            {
                place: "Nordtor",
                probability: 70
            }
        ]
    },

    {
        name: "Pilz",
        description: "Ein Pilz wächst am Wegesrand.",
        buttons: [
            {
                label: "Pilz pflücken",
                getAction: () => ({
                    itemsDelta: { Pilz: 1 },
                    message: "Du hast einen Pilz gepflückt.",
                }),
            },
            {
                label: "Lieber nicht anfassen",
                getAction: () => ({
                    message: "Du lässt den Pilz sicherheitshalber in Ruhe.",
                }),
            },
        ],
        places: [
            {
                place: "Nordtor",
                probability: 70
            },
            {
                place: "Weg",
                probability: 40
            }
        ]
    },

    {
        name: "Fee",
        description: "Eine Fee taucht auf und kichert leise.",
        buttons: [
            {
                label: "Fee verfolgen",
                getAction: () => ({
                    nextEvent: "Eine Schatztruhe!",
                    message: "Du folgst der Fee ... und sie führt dich zu einer Schatztruhe!",
                }),
            },
            {
                label: "Weglaufen",
                getAction: () => ({
                    message: "Du rennst weg, die Fee verschwindet.",
                }),
            },
        ],
        places: [
            {
                place: "Weg",
                probability: 20
            },
            {
                place: "Nordtor",
                probability: 90
            }
        ]
    },

    {
        name: "Eine Schatztruhe!",
        description: "Du findest eine alte hölzerne Schatztruhe.",
        buttons: [
            {
                label: "Öffnen",
                getAction: () => ({
                    economyDelta: { gold: 50 },
                    message: "Du findest 50 Gold!",
                }),
            },
            {
                label: "Truhe in Ruhe lassen",
                getAction: () => ({
                    message: "Du lässt die Truhe unberührt.",
                }),
            },
        ],
        places: [
            {
                place: "Nordtor",
                probability: 10
            },
            {
                place: "Weg",
                probability: 10
            }
        ]
    },
]