import { GradientText } from "../utility/GradientText";
import { SYSTEM } from "./colorfullStrings";


export type CallingName = "Bauer" | "Söldner" | "Entdecker" | "Händler" | "Handwerker" | "Alchemist" | "Barde" | "Jäger" | "Geistlicher" | "Geheimnis";

export type Calling = {
    name: CallingName | string;
    label: JSX.Element;
    description: string;
    bonus: JSX.Element;
};

export const emptyCallingObj: Calling = {
    name: "Unbekant",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Unbekant</GradientText>,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts!</>
};

export const callings: Calling[] = [
    {
        name: "Bauer",
        label: <GradientText colors={['#eeffbb', '#bbffee']}>Bauer</GradientText>,
        description: "Beschreibung für Bauer.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben} und {SYSTEM.Gold}</>
    },
    {
        name: "Söldner",
        label: <GradientText colors={['#ffcccc', '#cc9999']}>Söldner</GradientText>,
        description: "Beschreibung für Söldner.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff} und {SYSTEM.Verteidigung}</>
    },
    {
        name: "Entdecker",
        label: <GradientText colors={['#ccffdd', '#99bbcc']}>Entdecker</GradientText>,
        description: "Beschreibung für Entdecker.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden} und {SYSTEM.Leben}</>
    },
    {
        name: "Händler",
        label: <GradientText colors={['#ffdd99', '#ffaa66']}>Händler</GradientText>,
        description: "Beschreibung für Händler.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold} und {SYSTEM.Edelsteine}</>
    },
    {
        name: "Handwerker",
        label: <GradientText colors={['#ddddff', '#aaaaff']}>Handwerker</GradientText>,
        description: "Beschreibung für Handwerker.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold} und {SYSTEM.Angriff}</>
    },
    {
        name: "Alchemist",
        label: <GradientText colors={['#ccccff', '#9999ff']}>Alchemist</GradientText>,
        description: "Beschreibung für Alchemist.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben} und {SYSTEM.Glück}</>
    },
    {
        name: "Barde",
        label: <GradientText colors={['#ffeeaa', '#ffcc77']}>Barde</GradientText>,
        description: "Beschreibung für Barde.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück} und {SYSTEM.Verteidigung}</>
    },
    {
        name: "Jäger",
        label: <GradientText colors={['#bbffaa', '#88cc88']}>Jäger</GradientText>,
        description: "Beschreibung für Jäger.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff} und {SYSTEM.Glück}</>
    },
    {
        name: "Geistlicher",
        label: <GradientText colors={['#ffbbcc', '#ff99aa']}>Geistlicher</GradientText>,
        description: "Beschreibung für Geistlicher.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung} und {SYSTEM.Leben}</>
    },
    {
        name: "Geheimnis",
        label: <GradientText colors={['#bbbbff', '#8888cc']}>Geheimnis</GradientText>,
        description: "Beschreibung für Geheimnis.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden} und {SYSTEM.Glück}</>
    },
];

export const callingMap: Record<string, Calling> = callings.reduce((map, calling) => {
    map[calling.name] = calling;
    return map;
}, {} as Record<string, Calling>);


// ANWENDUNG
// const selectedCalling = callingMap[gameData.meta.calling] || emptyCallingObj;
// <PlayerTalk>"Ich bin geboren als {selectedCalling.label}"</PlayerTalk>

export const callingDefaults = {
    Bauer: {
        stats: {
            life: 10,
            maxLife: 10,
        },
        economy: {
            gold: 10,
        },
    },
    Söldner: {
        stats: {
            attack: 10,
            defense: 5,
        },
        economy: {
        },
    },
    Entdecker: {
        stats: {
            rounds: 5,
            maxRounds: 5,
            life: 5,
            maxLife: 5,
        },
        economy: {
        },
    },
    Händler: {
        stats: {
        },
        economy: {
            gold: 20,
            edelsteine: 1,
        },
    },
    Handwerker: {
        stats: {
            attack: 5,
        },
        economy: {
            gold: 25,
        },
    },
    Alchemist: {
        stats: {
            life: 10,
            maxLife: 10,
            luck: 5,
        },
        economy: {
        },
    },
    Barde: {
        stats: {
            luck: 10,
            defense: 5,
        },
        economy: {
        },
    },
    Jäger: {
        stats: {
            attack: 10,
            luck: 5,
        },
        economy: {
        },
    },
    Geistlicher: {
        stats: {
            defense: 10,
            life: 5,
            maxLife: 5,
        },
        economy: {
        },
    },
    Geheimnis: {
        stats: {
            luck: 5,
            rounds: 5,
            maxRounds: 5,
        },
        economy: {
        },
    },
};