import { GradientText } from "../utility/GradientText";
import MultiColoredLetters from "../utility/MultiColoredLetters";
import { greenColors, SYSTEM } from "./colorfullStrings";
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from "./playerAscii";

export type RaceName = "Mensch" | "Elf" | "Zwerg" | "Echse" | "Troll" | "Felkin" | "Fenril" | "Dryade";
interface Subrace {
    name: string;
    label: JSX.Element;
    description: string;
    bonus: JSX.Element;
}

interface Race {
    name: string;
    label: JSX.Element;
    ascii: JSX.Element;
    description: string;
    bonus: JSX.Element;
    subraces: Subrace[];
}

export const races: Race[] = [
    {
        name: "Mensch",
        label: <GradientText colors={['#fedcba', '#987654']}>Mensch</GradientText>,
        ascii: <HumanAscii />,
        description: "Auf den Ebenen der Stadt Lahtheim ist die Heimat der Menschen. Stets bist du deinem Vater gefolgt und hast jede seiner Bewegungen in dich aufgenommen, bis er schließlich ausgezogen ist um den Grünen Drachen zu besiegen und seitdem nie wieder gesehen wurde.",
        bonus: <>Durch das frühe Training mit deinem Vater hast du eine bemerkenswerte Ausdauer entwickelt. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>,
        subraces: [
            {
                name: "Stadtmensch",
                label: <GradientText colors={['#eeeeee', '#dddddd']}>Stadtmensch</GradientText>,
                description: "Beschreibung für Stadtmensch.",
                bonus: <>Du erhältst einen zusätzlichen Bonus auf {SYSTEM.Gold} aufgrund deiner urbanen Umgebung.</>
            },
            {
                name: "Dörfler",
                label: <GradientText colors={['#a2d5c6', '#6fa8dc']}>Dörfler</GradientText>,
                description: "Beschreibung für Dörfler.",
                bonus: <>Deine ländliche Herkunft verleiht dir einen Bonus auf {SYSTEM.Leben}.</>
            },
            {
                name: "Wanderer",
                label: <GradientText colors={['#ffcccb', '#ff9999']}>Wanderer</GradientText>,
                description: "Beschreibung für Wanderer.",
                bonus: <>Als Wanderer erhältst du einen Bonus auf dein {SYSTEM.Level}.</>
            },
        ],
    },
    {
        name: "Elf",
        label: <i><GradientText colors={['#FFE1C2', '#ff6644']}>Elf</GradientText></i>,
        ascii: <ElfAscii />,
        description: "Hoch über den Bäumen des Waldes, in zerbrechlich aussehenden, elfischen Strukturen kommst du her. Sie scheinen unter der kleinsten Belastungen zu zerbrechen und dennoch schon bestehen sie seit Jahrhunderten.",
        bonus: <>Elfen sammeln in ihrem langen Leben sehr viel Erfahrung. Sie sehen immer jung aus, sind aber vermutlich viel älter als alle um sie herum. Du erhältst einen Bonus auf {SYSTEM.Level}.</>,
        subraces: [
            {
                name: "Nachtelf",
                label: <GradientText colors={['#2E2E2E', '#5A5A5A']}>Nachtelf</GradientText>,
                description: "Beschreibung für Nachtelf.",
                bonus: <>Nachtelfen haben eine hohe affinität zu Magie. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>
            },
            {
                name: "Hochelf",
                label: <GradientText colors={['#E0FFFF', '#ADD8E6']}>Hochelf</GradientText>,
                description: "Beschreibung für Hochelf.",
                bonus: <>Hochelfen sind so alt wie die Drachen. Du erhältst einen Bonus auf {SYSTEM.Level}.</>
            },
            {
                name: "Waldelf",
                label: <GradientText colors={['#228B22', '#32CD32']}>Waldelf</GradientText>,
                description: "Beschreibung für Waldelf.",
                bonus: <>Waldelfen sind Meister der Tarnung. Du erhältst einen Bonus auf {SYSTEM.Runden}.</>
            },
        ],
    },
    {
        name: "Zwerg",
        label: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
        ascii: <DwarfAscii />,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Privatsphäre und Reichtum in keinem Verhältnis zu ihrer Körpergröße steht.",
        bonus: <>Selbst die ärmsten Zwerge in den Höhlen und Mienen besaßen ein Stück Gold mehr als andere Wesen. Du erhältst einen Bonus auf {SYSTEM.Gold}.</>,
        subraces: [
            {
                name: "Steinklopfer",
                label: <GradientText colors={['#8B4513', '#A0522D']}>Steinklopfer</GradientText>,
                description: "Beschreibung für Steinklopfer.",
                bonus: <>Steinklopfer, die Unterschicht der Zwerge müssen viel Ablehnung und Spott ertragen. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>
            },
            {
                name: "Metallschürfer",
                label: <GradientText colors={['#B0C4DE', '#4682B4']}>Metallschürfer</GradientText>,
                description: "Beschreibung für Metallschürfer.",
                bonus: <>Metallschürfer haben ein geschultes Auge für wertvolle Erze. Sie sind angesehene Handwerker. Du erhältst einen Bonus auf {SYSTEM.Gold}.</>
            },
            {
                name: "Edelsteinfürst",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Edelsteinfürst</GradientText>,
                description: "Beschreibung für Edelsteinfürst.",
                bonus: <>Edelsteinfürsten sind der Zwergenadel. Sie zahlen nicht in Gold, sondern mit seltenen Edelsteinen. Du erhältst einen Bonus auf {SYSTEM.Edelsteine}.</>
            },
        ],
    },
    {
        name: "Echse",
        label: <GradientText colors={['#46CF25', '#29CF72']}>Echse</GradientText>,
        ascii: <LizardAscii />,
        description: "In einem Erdloch der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, bist du als Echsenwesen aus deinem Ei geschlüpft. Artverwandt mit den Drachen hast du es nicht leicht in dieser Welt.",
        bonus: <>Echsen werden selten als intelligente Lebewesen gesehen. Bei ihnen zählt noch immer die Stärke mehr als Wissen. Du erhältst einen Bonus auf {SYSTEM.Angriff}.</>,
        subraces: [
            {
                name: "Fels-im-Himmel",
                label: <GradientText colors={['#708090', '#2F4F4F']}>Fels-im-Himmel</GradientText>,
                description: "Beschreibung für Fels-im-Himmel.",
                bonus: <>Fels-im-Himmel leben auf Steinplatos und in Klippen gehauenen Häusern. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>
            },
            {
                name: "Sand-im-Wind",
                label: <GradientText colors={['#DEB887', '#F4A460']}>Sand-im-Wind</GradientText>,
                description: "Beschreibung für Sand-im-Wind.",
                bonus: <>Sand-im-Wind sind agil und schnell. Sie leben in kleinen Lagern und Wandern stehts umher. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>
            },
            {
                name: "Knochen-im-Fels",
                label: <GradientText colors={['#A9A9A9', '#696969']}>Knochen-im-Fels</GradientText>,
                description: "Beschreibung für Knochen-im-Fels.",
                bonus: <>Knochen-im-Fels leben in Schluchten zwischen hohen Felsmauern. Du erhältst einen Bonus auf {SYSTEM.Angriff}.</>
            },
        ],
    },
    {
        name: "Troll",
        label: <b><MultiColoredLetters colors={greenColors}>Troll</MultiColoredLetters></b>,
        ascii: <TrollAscii />,
        description: "In den Sümpfen als ein Troll, musstest du dich vom ersten Moment an, seit du aus deinem ledrigen Ei geschlüpft bist, selbst verteidigen, noch ungeborene Trolle erschlagen, um dich von ihnen zu ernähren.",
        bonus: <>Trolle sind groß, aber sehr friedlich. Ihre Körper sind sehr robust und enorm widerstandsfähig. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>,
        subraces: [
            {
                name: "Geister Schamane",
                label: <GradientText colors={['#4B0082', '#9370DB']}>Geister Schamane</GradientText>,
                description: "Beschreibung für Geister Schamane.",
                bonus: <>Geister Schamanen können Geister beschwören. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>
            },
            {
                name: "Runen Wächter",
                label: <GradientText colors={['#8A2BE2', '#BA55D3']}>Runen Wächter</GradientText>,
                description: "Beschreibung für Runen Wächter.",
                bonus: <>Runen Wächter sind Meister der Runenmagie. Du erhältst einen Bonus auf {SYSTEM.Runden}.</>
            },
            {
                name: "Nebel Sammler",
                label: <GradientText colors={['#696969', '#A9A9A9']}>Nebel Sammler</GradientText>,
                description: "Beschreibung für Nebel Sammler.",
                bonus: <>Nebel Sammler können Nebel kontrollieren. Du erhältst einen Bonus auf {SYSTEM.Level}.</>
            },
        ],
    },
    {
        name: "Felkin",
        label: <GradientText colors={['#E8E8E8', '#eeeeee', '#E8E8E8']}>Felkin</GradientText>,
        ascii: <FelkinAscii />,
        description: "Als Katzenwesen bist du in den Bergen aufgewachsen. Als Kind hattest du großen Spaß an den Klippen hinauf zu klettern oder Steine die Abhängen hinunter rollen zu lassen.",
        bonus: <>Ich liebe Katzen! Ein Spiel ohne Katzen ist kein gutes Spiel. Zum Glück gibt es hier Katzen. Du erhältst einen Bonus auf {SYSTEM.Glück}.</>,
        subraces: [
            {
                name: "Goldfell",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Goldfell</GradientText>,
                description: "Beschreibung für Goldfell.",
                bonus: <>Goldfell haben glänzendes Fell, das sie vor Feinden tarnt. Du erhältst einen Bonus auf {SYSTEM.Gold}.</>
            },
            {
                name: "Mondauge",
                label: <GradientText colors={['#1E90FF', '#87CEFA']}>Mondauge</GradientText>,
                description: "Beschreibung für Mondauge.",
                bonus: <>Mondauge können im Dunkeln sehen. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>
            },
            {
                name: "Schattenkralle",
                label: <GradientText colors={['#4B0082', '#8A2BE2']}>Schattenkralle</GradientText>,
                description: "Beschreibung für Schattenkralle.",
                bonus: <>Schattenkralle haben scharfe Krallen, die zusätzlichen Schaden verursachen. Du erhältst einen Bonus auf {SYSTEM.Runden}.</>
            },
        ],
    },
    {
        name: "Fenril",
        label: <b><GradientText colors={['#FFFCE4', '#E8CBA9']}>Fenril</GradientText></b>,
        ascii: <FenrilAscii />,
        description: "Die tiefen dunklen Wälder sind dein Revier. Unter dem Schein der Monde hast du Wild gejagt und mit deinen Wolfsgeschwistern gespielt. Doch nun ist es Zeit neue Gebiete zu erobern.",
        bonus: <>Hunde ... ähm, ich meine die majestätischen wolfsähnlichen Geschöpfe sind so schnell und geschickt, zwei Treffer sehen aus wie ein Angriff. Du erhältst einen Bonus auf {SYSTEM.Runden}.</>,
        subraces: [
            {
                name: "Schattenjäger",
                label: <GradientText colors={['#2F4F4F', '#708090']}>Schattenjäger</GradientText>,
                description: "Beschreibung für Schattenjäger.",
                bonus: <>Schattenjäger sind Meister der Tarnung und des Hinterhalts. Du erhältst einen Bonus auf {SYSTEM.Level}.</>
            },
            {
                name: "Blutkrieger",
                label: <GradientText colors={['#8B0000', '#B22222']}>Blutkrieger</GradientText>,
                description: "Beschreibung für Blutkrieger.",
                bonus: <>Blutkrieger sind kampferprobt und stark. Du erhältst einen Bonus auf {SYSTEM.Angriff}.</>
            },
            {
                name: "Knochenleser",
                label: <GradientText colors={['#A52A2A', '#CD853F']}>Knochenleser</GradientText>,
                description: "Beschreibung für Knochenleser.",
                bonus: <>Knochenleser können die Zukunft in Knochen lesen. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>
            },
        ],
    },
    {
        name: "Dryade",
        label: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
        ascii: <DryadAscii />,
        description: "Oft schon haben dich andere Wesen für eine einfache Pflanze gehalten ohne Bewusstsein. An der Quelle des Flusses hast du zum ersten Mal das Licht der Sonne gespürt und klares Wasser getrunken.",
        bonus: <>Dryaden leben mit der Natur. Diese Pflanzen schätzen das Leben, besonders wenn es Wurzeln hat. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>,
        subraces: [
            {
                name: "Astläufer",
                label: <GradientText colors={['#228B22', '#32CD32']}>Astläufer</GradientText>,
                description: "Beschreibung für Astläufer.",
                bonus: <>Astläufer können sich schnell in Bäumen bewegen. Du erhältst einen Bonus auf {SYSTEM.Verteidigung}.</>
            },
            {
                name: "Blumenkind",
                label: <GradientText colors={['#FF69B4', '#FFB6C1']}>Blumenkind</GradientText>,
                description: "Beschreibung für Blumenkind.",
                bonus: <>Blumenkinder können Pflanzen schneller wachsen lassen. Du erhältst einen Bonus auf {SYSTEM.Runden}.</>
            },
            {
                name: "Lebenshüter",
                label: <GradientText colors={['#32CD32', '#7CFC00']}>Lebenshüter</GradientText>,
                description: "Beschreibung für Lebenshüter.",
                bonus: <>Lebenshüter haben eine starke Heilfähigkeit. Du erhältst einen Bonus auf {SYSTEM.Leben}.</>
            },
        ],
    },
];


export const racesMap: Record<string, Race> = races.reduce((map, race) => {
    map[race.name] = race;
    return map;
}, {} as Record<string, Race>);

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
