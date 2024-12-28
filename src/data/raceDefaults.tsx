import { GradientText } from "../utility/GradientText";
import MultiColoredLetters from "../utility/MultiColoredLetters";
import { greenColors, SYSTEM } from "./colorfullStrings";
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from "./playerAscii";

export type RaceName = "Mensch" | "Elf" | "Zwerg" | "Echse" | "Troll" | "Felkin" | "Fenril" | "Dryade";
export type OriginName =
    | "Stadtmensch"
    | "Dörfler"
    | "Wanderer"
    | "Nachtelf"
    | "Hochelf"
    | "Waldelf"
    | "Steinklopfer"
    | "Metallschürfer"
    | "Edelsteinfürst"
    | "FelsImHimmel"
    | "SandImWind"
    | "KnochenImFels"
    | "GeisterSchamane"
    | "RunenWächter"
    | "NebelSammler"
    | "Goldfell"
    | "Mondauge"
    | "Schattenkralle"
    | "Schattenjäger"
    | "Blutkrieger"
    | "Knochenleser"
    | "Astläufer"
    | "Blumenkind"
    | "Lebenshüter";
export type CallingName = "Bauer" | "Söldner" | "Entdecker" | "Händler" | "Handwerker" | "Alchemist" | "Barde" | "Jäger" | "Geistlicher" | "Geheimnis";


export type Subrace = {
    name: OriginName | string;
    label: JSX.Element;
    description: string;
    bonus: JSX.Element;
}

export type Calling = {
    name: CallingName | string;
    label: JSX.Element;
    description: string;
    bonus: JSX.Element;
};

export type Race = {
    name: RaceName | string;
    label: JSX.Element;
    ascii: JSX.Element;
    description: string;
    bonus: JSX.Element;
    subraces: Subrace[];
}

export const emptyCallingObj: Calling = {
    name: "Unbekant",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Unbekant</GradientText>,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts!</>
}

export const emptySubraceObj: Subrace = {
    name: "Unbekant",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Unbekant</GradientText>,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts!</>
}

export const emptyRaceObj: Race = {
    name: "Unbekant",
    label: <GradientText colors={['#fedcba', '#987654']}>Unbekant</GradientText>,
    ascii: <HumanAscii />,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts?</>,
    subraces: [emptySubraceObj],
}

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


export const races: Race[] = [
    {
        name: "Mensch",
        label: <GradientText colors={['#fedcba', '#987654']}>Mensch</GradientText>,
        ascii: <HumanAscii />,
        description: "Auf den Ebenen der Stadt Lahtheim ist die Heimat der Menschen. Stets bist du deinem Vater gefolgt und hast jede seiner Bewegungen in dich aufgenommen, bis er schließlich ausgezogen ist um den Grünen Drachen zu besiegen und seitdem nie wieder gesehen wurde.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        subraces: [
            {
                name: "Stadtmensch",
                label: <GradientText colors={['#eeeeee', '#dddddd']}>Stadtmensch</GradientText>,
                description: "Beschreibung für Stadtmensch.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Dörfler",
                label: <GradientText colors={['#a2d5c6', '#6fa8dc']}>Dörfler</GradientText>,
                description: "Beschreibung für Dörfler.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Wanderer",
                label: <GradientText colors={['#ffcccb', '#ff9999']}>Wanderer</GradientText>,
                description: "Beschreibung für Wanderer.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
        ],
    },
    {
        name: "Elf",
        label: <i><GradientText colors={['#FFE1C2', '#ff6644']}>Elf</GradientText></i>,
        ascii: <ElfAscii />,
        description: "Hoch über den Bäumen des Waldes, in zerbrechlich aussehenden, elfischen Strukturen kommst du her. Sie scheinen unter der kleinsten Belastungen zu zerbrechen und dennoch schon bestehen sie seit Jahrhunderten.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        subraces: [
            {
                name: "Nachtelf",
                label: <GradientText colors={['#2E2E2E', '#5A5A5A']}>Nachtelf</GradientText>,
                description: "Beschreibung für Nachtelf.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Hochelf",
                label: <GradientText colors={['#E0FFFF', '#ADD8E6']}>Hochelf</GradientText>,
                description: "Beschreibung für Hochelf.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
            {
                name: "Waldelf",
                label: <GradientText colors={['#228B22', '#32CD32']}>Waldelf</GradientText>,
                description: "Beschreibung für Waldelf.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
        ],
    },
    {
        name: "Zwerg",
        label: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
        ascii: <DwarfAscii />,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Privatsphäre und Reichtum in keinem Verhältnis zu ihrer Körpergröße steht.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        subraces: [
            {
                name: "Steinklopfer",
                label: <GradientText colors={['#8B4513', '#A0522D']}>Steinklopfer</GradientText>,
                description: "Beschreibung für Steinklopfer.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Metallschürfer",
                label: <GradientText colors={['#B0C4DE', '#4682B4']}>Metallschürfer</GradientText>,
                description: "Beschreibung für Metallschürfer.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Edelsteinfürst",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Edelsteinfürst</GradientText>,
                description: "Beschreibung für Edelsteinfürst.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Edelsteine}</>
            },
        ],
    },
    {
        name: "Echse",
        label: <GradientText colors={['#46CF25', '#29CF72']}>Echse</GradientText>,
        ascii: <LizardAscii />,
        description: "In einem Erdloch der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, bist du als Echsenwesen aus deinem Ei geschlüpft. Artverwandt mit den Drachen hast du es nicht leicht in dieser Welt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
        subraces: [
            {
                name: "Fels-im-Himmel",
                label: <GradientText colors={['#708090', '#2F4F4F']}>Fels-im-Himmel</GradientText>,
                description: "Beschreibung für Fels-im-Himmel.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Sand-im-Wind",
                label: <GradientText colors={['#DEB887', '#F4A460']}>Sand-im-Wind</GradientText>,
                description: "Beschreibung für Sand-im-Wind.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Knochen-im-Fels",
                label: <GradientText colors={['#A9A9A9', '#696969']}>Knochen-im-Fels</GradientText>,
                description: "Beschreibung für Knochen-im-Fels.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>
            },
        ],
    },
    {
        name: "Troll",
        label: <b><MultiColoredLetters colors={greenColors}>Troll</MultiColoredLetters></b>,
        ascii: <TrollAscii />,
        description: "In den Sümpfen als ein Troll, musstest du dich vom ersten Moment an, seit du aus deinem ledrigen Ei geschlüpft bist, selbst verteidigen, noch ungeborene Trolle erschlagen, um dich von ihnen zu ernähren.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        subraces: [
            {
                name: "Geister Schamane",
                label: <GradientText colors={['#4B0082', '#9370DB']}>Geister Schamane</GradientText>,
                description: "Beschreibung für Geister Schamane.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Runen Wächter",
                label: <GradientText colors={['#8A2BE2', '#BA55D3']}>Runen Wächter</GradientText>,
                description: "Beschreibung für Runen Wächter.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
            {
                name: "Nebel Sammler",
                label: <GradientText colors={['#696969', '#A9A9A9']}>Nebel Sammler</GradientText>,
                description: "Beschreibung für Nebel Sammler.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
        ],
    },
    {
        name: "Felkin",
        label: <GradientText colors={['#E8E8E8', '#eeeeee', '#E8E8E8']}>Felkin</GradientText>,
        ascii: <FelkinAscii />,
        description: "Als Katzenwesen bist du in den Bergen aufgewachsen. Als Kind hattest du großen Spaß an den Klippen hinauf zu klettern oder Steine die Abhängen hinunter rollen zu lassen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück}</>,
        subraces: [
            {
                name: "Goldfell",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Goldfell</GradientText>,
                description: "Beschreibung für Goldfell.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Mondauge",
                label: <GradientText colors={['#1E90FF', '#87CEFA']}>Mondauge</GradientText>,
                description: "Beschreibung für Mondauge.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Schattenkralle",
                label: <GradientText colors={['#4B0082', '#8A2BE2']}>Schattenkralle</GradientText>,
                description: "Beschreibung für Schattenkralle.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
        ],
    },
    {
        name: "Fenril",
        label: <b><GradientText colors={['#FFFCE4', '#E8CBA9']}>Fenril</GradientText></b>,
        ascii: <FenrilAscii />,
        description: "Die tiefen dunklen Wälder sind dein Revier. Unter dem Schein der Monde hast du Wild gejagt und mit deinen Wolfsgeschwistern gespielt. Doch nun ist es Zeit neue Gebiete zu erobern.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        subraces: [
            {
                name: "Schattenjäger",
                label: <GradientText colors={['#2F4F4F', '#708090']}>Schattenjäger</GradientText>,
                description: "Beschreibung für Schattenjäger.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
            {
                name: "Blutkrieger",
                label: <GradientText colors={['#8B0000', '#B22222']}>Blutkrieger</GradientText>,
                description: "Beschreibung für Blutkrieger.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>
            },
            {
                name: "Knochenleser",
                label: <GradientText colors={['#A52A2A', '#CD853F']}>Knochenleser</GradientText>,
                description: "Beschreibung für Knochenleser.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
        ],
    },
    {
        name: "Dryade",
        label: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
        ascii: <DryadAscii />,
        description: "Oft schon haben dich andere Wesen für eine einfache Pflanze gehalten ohne Bewusstsein. An der Quelle des Flusses hast du zum ersten Mal das Licht der Sonne gespürt und klares Wasser getrunken.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        subraces: [
            {
                name: "Astläufer",
                label: <GradientText colors={['#228B22', '#32CD32']}>Astläufer</GradientText>,
                description: "Beschreibung für Astläufer.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Blumenkind",
                label: <GradientText colors={['#FF69B4', '#FFB6C1']}>Blumenkind</GradientText>,
                description: "Beschreibung für Blumenkind.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
            {
                name: "Lebenshüter",
                label: <GradientText colors={['#32CD32', '#7CFC00']}>Lebenshüter</GradientText>,
                description: "Beschreibung für Lebenshüter.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
        ],
    },
];


export const racesMap: Record<string, Race> = races.reduce((map, race) => {
    map[race.name] = race;
    return map;
}, {} as Record<string, Race>);

export const callingMap: Record<string, Calling> = callings.reduce((map, calling) => {
    map[calling.name] = calling;
    return map;
}, {} as Record<string, Calling>);


// ANWENDUNG
// const selectedRace = racesMap[gameData.meta.rase];
// <PlayerTalk>"Ich bin geboren als {selectedRace.label}"</PlayerTalk>

export const raceDefaults = {
    Mensch: {
        stats: {
            life: 120,
            maxLife: 120,
        },
        economy: {
            gold: 100,
        },
    },
    Elf: {
        stats: {
            level: 3,
        },
        economy: {
            gold: 100,
        },
    },
    Zwerg: {
        stats: {
        },
        economy: {
            gold: 200,
        },
    },
    Echse: {
        stats: {
            attack: 15,
        },
        economy: {
            gold: 100,
        },
    },
    Troll: {
        stats: {
            defense: 15,
        },
        economy: {
            gold: 100,
        },
    },
    Felkin: {
        stats: {
            luck: 15,
        },
        economy: {
            gold: 100,
        },
    },
    Fenril: {
        stats: {
            rounds: 20,
            maxRounds: 20,
        },
        economy: {
            gold: 100,
        },
    },
    Dryade: {
        stats: {
            life: 150,
            maxLife: 150,
        },
        economy: {
            gold: 100,
        },
    },
}

export const originDefaults = {
    Stadtmensch: {
        stats: {},
        economy: {
            gold: 25,
        },
    },
    Dörfler: {
        stats: {
            life: 10,
            maxLife: 10,
        },
        economy: {},
    },
    Wanderer: {
        stats: {
            level: 3,
        },
        economy: {},
    },
    Nachtelf: {
        stats: {
            defense: 10,
        },
        economy: {},
    },
    Hochelf: {
        stats: {
            level: 3,
        },
        economy: {},
    },
    Waldelf: {
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    Steinklopfer: {
        stats: {
            defense: 10,
        },
        economy: {},
    },
    Metallschürfer: {
        stats: {},
        economy: {
            gold: 25,
        },
    },
    Edelsteinfürst: {
        stats: {},
        economy: {
            edelsteine: 1,
        },
    },
    FelsImHimmel: {
        stats: {
            defense: 10,
        },
        economy: {},
    },
    SandImWind: {
        stats: {
            life: 10,
            maxLife: 10,
        },
        economy: {},
    },
    KnochenImFels: {
        stats: {
            attack: 10,
        },
        economy: {},
    },
    GeisterSchamane: {
        stats: {
            life: 10,
            maxLife: 10,
        },
        economy: {},
    },
    RunenWächter: {
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    NebelSammler: {
        stats: {
            level: 3,
        },
        economy: {},
    },
    Goldfell: {
        stats: {},
        economy: {
            gold: 20,
        },
    },
    Mondauge: {
        stats: {
            life: 10,
            maxLife: 10,
        },
        economy: {},
    },
    Schattenkralle: {
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    Schattenjäger: {
        stats: {
            level: 2,
        },
        economy: {},
    },
    Blutkrieger: {
        stats: {
            attack: 15,
        },
        economy: {},
    },
    Knochenleser: {
        stats: {
            defense: 10,
        },
        economy: {},
    },
    Astläufer: {
        stats: {
            defense: 10,
        },
        economy: {},
    },
    Blumenkind: {
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    Lebenshüter: {
        stats: {
            life: 20,
            maxLife: 20,
        },
        economy: {},
    },
};

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
