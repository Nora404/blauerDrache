import { RACES } from "./colorfullStrings";
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from "./playerAscii";

export type RaceName = "Mensch" | "Elf" | "Zwerg" | "Echse" | "Troll" | "Felkin" | "Fenril" | "Dryade";

interface Race {
    name: string;
    label: JSX.Element;
    ascii: React.FC;
    description: string;
}

export const races: Race[] = [
    {
        name: "Mensch",
        label: <>Ich bin ein {RACES['Mensch']} (+ Leben)</>,
        ascii: HumanAscii,
        description: "Auf den Ebenen der Stadt Lahtheim ist die Heimat der Menschen. Stets bist du deinem Vater gefolgt und hast jede seiner Bewegungen in dich aufgenommen, bis er schließlich ausgezogen ist um den Grünen Drachen zu besiegen und seitdem nie wieder gesehen wurde."
    },
    {
        name: "Elf",
        label: <>Ich bin ein {RACES['Elf']} (+ Level)</>,
        ascii: ElfAscii,
        description: "Hoch über den Bäumen des Waldes, in zerbrechlich aussehenden, elfischen Strukturen kommst du her. Sie scheinen unter der kleinsten Belastungen zu zerbrechen und dennoch schon bestehen sie seit Jahrhunderten."
    },
    {
        name: "Zwerg",
        label: <>Ich bin ein {RACES['Zwerg']} (+ Gold)</>,
        ascii: DwarfAscii,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Privatsphäre und Reichtum in keinem Verhältnis zu ihrer Körpergröße steht."
    },
    {
        name: "Echse",
        label: <>Ich bin eine {RACES['Echse']} (+ Angriff)</>,
        ascii: LizardAscii,
        description: "In einem Erdloch der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, bist du als Echsenwesen aus deinem Ei geschlüpft. Artverwandt mit den Drachen hast du es nicht leicht in dieser Welt."
    },
    {
        name: "Troll",
        label: <>Ich bin ein {RACES['Troll']} (+ Verteidigung)</>,
        ascii: TrollAscii,
        description: "In den Sümpfen als ein Troll, musstest du dich vom ersten Moment an, seit du aus deinem ledrigen Ei geschlüpft bist, selbst verteidigen, noch ungeborene Trolle erschlagen, um dich von ihnen zu ernähren."
    },
    {
        name: "Felkin",
        label: <>Ich bin ein {RACES['Felkin']} (+ Glück)</>,
        ascii: FelkinAscii,
        description: "Als Katzenwesen bist du in den Bergen aufgewachsen. Als Kind hattest du großen Spaß an den Klippen hinauf zu klettern oder Steiche die Abhängen hinunter rollen zu lassen."
    },
    {
        name: "Fenril",
        label: <>Ich bin ein {RACES['Fenril']} (+ Runden)</>,
        ascii: FenrilAscii,
        description: "Die tiefen dunklen Wälder sind dein Revier. Unter dem Schein der Monde hast du Wild gejagt und mit deinen Wolfsgeschwistern gespielt. Doch nun ist es Zeit neue Gebiete zu erobern."
    },
    {
        name: "Dryade",
        label: <>Ich bin eine {RACES['Dryade']} (+ Leben)</>,
        ascii: DryadAscii,
        description: "Oft schon haben dich andere Wesen für eine einfache Pflanze gehalten ohne Bewusstsein. An der Quelle des Flusses hast du zum ersten Mal das Licht der Sonne gespürt und klares Wasser getrunken."
    },
];

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
