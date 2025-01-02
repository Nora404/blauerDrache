import { PlacesKeys } from "./colorfullStrings";
import { PlayerEconomy, PlayerEquipment, PlayerMeta, PlayerStats } from "./gameStore";

export type NextEventOption = {
    eventId: string;      // Next event ID
    probability: number; // z. B. 70 => 70%
};

export type GameAction = {
    itemsDelta?: Record<string, number>;
    metaDelta?: Partial<PlayerMeta>
    statsDelta?: Partial<PlayerStats>;
    economyDelta?: Partial<PlayerEconomy>;
    equipmentDelta?: Partial<PlayerEquipment>;
    nextEvents?: NextEventOption[];
    message?: JSX.Element;
}

export type GameEvent = {
    id: string;             // z.B. 001Stone
    label: string;          // z.B "Stein gefunden"
    description: JSX.Element;
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
        id: "001Stone",
        label: "Stein",
        description: <>Ein Stein liegt auf dem Boden!</>,
        buttons: [
            {
                label: "Stein aufheben",
                getAction: () => ({
                    economyDelta: { gold: 2 },
                    itemsDelta: { Stein: 1 },
                    message: <>Du hast unter dem Stein etwas Gold gefunden.</>,
                }),
            },
            {
                label: "Stein liegen lassen",
                getAction: () => ({
                    message: <>Du ignorierst den Stein.</>,
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
        id: "002Stone",
        label: "Pilz",
        description: <>Ein Pilz wächst am Wegesrand.</>,
        buttons: [
            {
                label: "Pilz pflücken",
                getAction: () => ({
                    itemsDelta: { Pilz: 1 },
                    message: <>Du hast einen Pilz gepflückt.</>,
                }),
            },
            {
                label: "Lieber nicht anfassen",
                getAction: () => ({
                    message: <>Du lässt den Pilz sicherheitshalber in Ruhe.</>,
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
        id: "003Stone",
        label: "Fee",
        description: <>Eine Fee taucht auf und kichert leise.</>,
        buttons: [
            {
                label: "Fee verfolgen",
                getAction: () => ({
                    message: <>Du folgst der Fee ... und sie führt dich zu einer Schatztruhe!</>,
                    nextEvents: [
                        { eventId: "004Stone", probability: 10 },   // 10% Chance, Schatztruhe
                        { eventId: "005Stone", probability: 60 },     // 60% Chance, Reingelegt
                        { eventId: "006Stone", probability: 30 },   // 30% Chance, Fee verloren
                    ],
                }),
            },
            {
                label: "Weglaufen",
                getAction: () => ({
                    message: <>Du rennst weg, die Fee verschwindet.</>,
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
        id: "004Stone",
        label: "Schatztruhe",
        description: <>Du findest eine alte hölzerne Schatztruhe.</>,
        buttons: [
            {
                label: "Öffnen",
                getAction: () => ({
                    economyDelta: { gold: 50 },
                    message: <>Du findest 50 Gold!</>,
                }),
            },
            {
                label: "Truhe in Ruhe lassen",
                getAction: () => ({
                    message: <>Du lässt die Truhe unberührt.</>,
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
    {
        id: "005Stone",
        label: "Fee Verloren",
        description: <>Du hast nur einen Augenblick geblinzelt, da war die Fee verschwunden</>,
        buttons: [
            {
                label: "Mist!",
                getAction: () => ({
                    message: <>Du drehst um und setzt deinen Weg fort</>,
                }),
            },
        ],
        places: []
    },
    {
        id: "006Stone",
        label: "Reingelegt",
        description: <>Die Fee bleibt schweben, schaut dich an und verschwindet mit einem Gelächter</>,
        buttons: [
            {
                label: "Mist",
                getAction: () => ({
                    message: <>Man sollte keiner Feen vertrauen!</>,
                }),
            },
        ],
        places: []
    },
]