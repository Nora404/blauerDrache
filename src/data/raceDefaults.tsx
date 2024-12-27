import { GradientText } from "../utility/GradientText";
import MultiColoredLetters from "../utility/MultiColoredLetters";
import { greenColors } from "./colorfullStrings";
import { DeveloperAscii, DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from "./playerAscii";

export type RaceName = "Mensch" | "Elf" | "Zwerg" | "Echse" | "Troll" | "Felkin" | "Fenril" | "Dryade";


interface Subrace {
    name: string;
    description: string;
}
interface Race {
    name: string;
    label: JSX.Element;
    ascii: JSX.Element;
    description: string;
    subraces: Subrace[];
}



export const races: Race[] = [
    {
        name: "Entwickler",
        label: <GradientText colors={['#cf388f', '#8839cf']}>Entwickler</GradientText>,
        ascii: <DeveloperAscii />,
        description: "Ähm, eigentlich sollte das hier nicht zur Auswahl stehen! Aber meine Schleife zeigt diese 'Rasse' trozdem an. Ein Bug oder ein Feature, wer weiß?",
        subraces: [
            { name: "Kinderzimmer", description: "Beschreibung für Kinderzimmer." },
            { name: "Keller", description: "Beschreibung für Keller." },
            { name: "Büro", description: "Beschreibung für Büro." },
        ],
    },
    {
        name: "Mensch",
        label: <GradientText colors={['#fedcba', '#987654']}>Mensch</GradientText>,
        ascii: <HumanAscii />,
        description: "Auf den Ebenen der Stadt Lahtheim ist die Heimat der Menschen. Stets bist du deinem Vater gefolgt und hast jede seiner Bewegungen in dich aufgenommen, bis er schließlich ausgezogen ist um den Grünen Drachen zu besiegen und seitdem nie wieder gesehen wurde.",
        subraces: [
            { name: "Stadtmensch", description: "Beschreibung für Stadtmensch." },
            { name: "Dörfler", description: "Beschreibung für Dörfler." },
            { name: "Wanderer", description: "Beschreibung für Wanderer." },
        ],
    },
    {
        name: "Elf",
        label: <i><GradientText colors={['#FFE1C2', '#ff6644']}>Elf</GradientText></i>,
        ascii: <ElfAscii />,
        description: "Hoch über den Bäumen des Waldes, in zerbrechlich aussehenden, elfischen Strukturen kommst du her. Sie scheinen unter der kleinsten Belastungen zu zerbrechen und dennoch schon bestehen sie seit Jahrhunderten.",
        subraces: [
            { name: "Nachtelf", description: "Beschreibung für Nachtelf." },
            { name: "Hochelf", description: "Beschreibung für Hochelf." },
            { name: "Waldelf", description: "Beschreibung für Waldelf." },
        ],
    },
    {
        name: "Zwerg",
        label: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
        ascii: <DwarfAscii />,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Privatsphäre und Reichtum in keinem Verhältnis zu ihrer Körpergröße steht.",
        subraces: [
            { name: "Steinklopfer", description: "Beschreibung für Steinklopfer." },
            { name: "Metallschürfer", description: "Beschreibung für Metallschürfer." },
            { name: "Edelsteinfürst", description: "Beschreibung für Edelsteinfürst." },
        ],
    },
    {
        name: "Echse",
        label: <GradientText colors={['#46CF25', '#29CF72']}>Echse</GradientText>,
        ascii: <LizardAscii />,
        description: "In einem Erdloch der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, bist du als Echsenwesen aus deinem Ei geschlüpft. Artverwandt mit den Drachen hast du es nicht leicht in dieser Welt.",
        subraces: [
            { name: "Fels-im-Himmel", description: "Beschreibung für Fels-im-Himmel." },
            { name: "Sand-im-Wind", description: "Beschreibung für Sand-im-Wind." },
            { name: "Knochen-im-Fels", description: "Beschreibung für Knochen-im-Fels." },
        ],
    },
    {
        name: "Troll",
        label: <b><MultiColoredLetters colors={greenColors}>Troll</MultiColoredLetters></b>,
        ascii: <TrollAscii />,
        description: "In den Sümpfen als ein Troll, musstest du dich vom ersten Moment an, seit du aus deinem ledrigen Ei geschlüpft bist, selbst verteidigen, noch ungeborene Trolle erschlagen, um dich von ihnen zu ernähren.",
        subraces: [
            { name: "Geister Schamane", description: "Beschreibung für Geister Schamane." },
            { name: "Runen Wächter", description: "Beschreibung für Runen Wächter." },
            { name: "Nebel Sammler", description: "Beschreibung für Nebel Sammler." },
        ],
    },
    {
        name: "Felkin",
        label: <GradientText colors={['#E8E8E8', '#eeeeee', '#E8E8E8']}>Felkin</GradientText>,
        ascii: <FelkinAscii />,
        description: "Als Katzenwesen bist du in den Bergen aufgewachsen. Als Kind hattest du großen Spaß an den Klippen hinauf zu klettern oder Steine die Abhängen hinunter rollen zu lassen.",
        subraces: [
            { name: "Goldfell", description: "Beschreibung für Goldfell." },
            { name: "Mondauge", description: "Beschreibung für Mondauge." },
            { name: "Schattenkralle", description: "Beschreibung für Schattenkralle." },
        ],
    },
    {
        name: "Fenril",
        label: <b><GradientText colors={['#FFFCE4', '#E8CBA9']}>Fenril</GradientText></b>,
        ascii: <FenrilAscii />,
        description: "Die tiefen dunklen Wälder sind dein Revier. Unter dem Schein der Monde hast du Wild gejagt und mit deinen Wolfsgeschwistern gespielt. Doch nun ist es Zeit neue Gebiete zu erobern.",
        subraces: [
            { name: "Schattenjäger", description: "Beschreibung für Schattenjäger." },
            { name: "Blutkrieger", description: "Beschreibung für Blutkrieger." },
            { name: "Knochenleser", description: "Beschreibung für Knochenleser." },
        ],
    },
    {
        name: "Dryade",
        label: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
        ascii: <DryadAscii />,
        description: "Oft schon haben dich andere Wesen für eine einfache Pflanze gehalten ohne Bewusstsein. An der Quelle des Flusses hast du zum ersten Mal das Licht der Sonne gespürt und klares Wasser getrunken.",
        subraces: [
            { name: "Astläufer", description: "Beschreibung für Astläufer." },
            { name: "Blumenkind", description: "Beschreibung für Blumenkind." },
            { name: "Lebenshüter", description: "Beschreibung für Lebenshüter." },
        ],
    },
];


export const racesMap: Record<string, Race> = races.reduce((map, race) => {
    map[race.name] = race;
    return map;
}, {} as Record<string, Race>);


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
