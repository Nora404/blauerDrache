import { PlayerBase, PlayerEconomy, PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/GradientText";
import MultiColoredLetters from "../utility/MultiColoredLetters";
import { SYSTEM } from "./colorfullStrings";
import { braunColors, greenColors } from "./colorMappingData";
import { OriginName } from "./originData";
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from "./playerAscii";

export type RaceName =
    | "Mensch"
    | "Elf"
    | "Zwerg"
    | "Echse"
    | "Troll"
    | "Felkin"
    | "Fenril"
    | "Dryade";

export type Race = {
    name: RaceName | string;
    label: JSX.Element;
    ascii: JSX.Element;
    description: string;
    bonus: JSX.Element;
    base: Partial<PlayerBase>
    stats: Partial<PlayerStats>;
    economy: Partial<PlayerEconomy>;
    subraces: OriginName[];
};

export const emptyRaceObj: Race = {
    name: "Unbekant",
    label: <GradientText colors={['#fedcba', '#987654']}>Unbekant</GradientText>,
    ascii: <HumanAscii />,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts?</>,
    base: {},
    stats: {},
    economy: {},
    subraces: ["Unbekannt"],
};

export const races: Race[] = [
    {
        name: "Mensch",
        label: <GradientText colors={['#fedcba', '#987654']}>Mensch</GradientText>,
        ascii: <HumanAscii />,
        description: "In den Ebenen der Stadt Lahtheim ist die Heimat der Menschen zu finden. Viele leben in der Stadt selbst oder in den kleineren Dörfern. Sie treiben gerne Handel untereinander, sind aber Fremden gegenüber eher misstrauisch. Sie können sehr viel, aber nichts wirklich außergewöhnlich gut. Ein Sprichwort lautet: Menschen sind das Wasser der Suppe",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 120,
        },
        stats: {
            life: 120,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "Stadtmensch",
            "Dörfler",
            "Wanderer",
        ],
    },
    {
        name: "Elf",
        label: <em><GradientText colors={['#BB4CFF', '#FF12BD']}>Elf</GradientText></em>,
        ascii: <ElfAscii />,
        description: "Hoch in den Bäumen des Waldes, in zerbrechlich aussehenden filigranen Strukturen, leben die Elfen. Mit den Drachen sind die das älteste Volg dieser Welt. Ihre dünnen, ewig jungen Körper lassen nicht vermuten, wie alt eine Elfe wirklich ist. Sie haben ein Gespür zu Magie, welches sie meist nur theoretisch erforschen, statt es selbst zu betreiben.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        base: {
            level: 3,
        },
        stats: {
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "Nachtelf",
            "Hochelf",
            "Waldelf",
        ],
    },
    {
        name: "Zwerg",
        label: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
        ascii: <DwarfAscii />,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Reichtum und Schätze in keinem Verhältnis zu ihrer Körpergröße steht. Es gibt keine besseren Handwerker und oder Kenner für Materialien und deren Eigenschaften. Ihre Gesellschaft ist in strengen Sozialen Klassen eingeteilt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        base: {},
        stats: {},
        economy: {
            gold: 200,
        },
        subraces: [
            "Steinklopfer",
            "Metallschürfer",
            "Edelsteinfürst",
        ],
    },
    {
        name: "Echse",
        label: <GradientText colors={['#46CF25', '#FFEF67', '#29CF72']}>Echse</GradientText>,
        ascii: <LizardAscii />,
        description: "In der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, leben die Echsen in kleineren nomadischen Gruppen. Artverwandt mit den Drachen haben sie es nicht leicht in dieser Welt. Hinzu kommt das viele Wesen ihnen keine größere Intelligenz zutrauen. Da Echsen andere Wesen meiden, wird sich ihr Ruf nicht sonderlich bald verbessern.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
        base: {},
        stats: {
            attack: 15,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "FelsImHimmel",
            "SandImWind",
            "KnochenImFels",
        ],
    },
    {
        name: "Troll",
        label: <b><MultiColoredLetters colors={greenColors}>Troll</MultiColoredLetters></b>,
        ascii: <TrollAscii />,
        description: "In den Sümpfen, nahe der vergessenen Ruinen, leben die Trolle. Wenn sie sich nicht gegen andere Bewohner des Sumpfes verteidigen müssen, zum Beispiel gegen Monster Mücken, beten sie zu ihren Göttern. Sie verrichten für diese verschiedene Dienste in sogenannten Bruderschaften. Dabei kommt es gelegentlich zu „Uneinigkeiten“",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 15,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "GeisterSchamane",
            "RunenWächter",
            "NebelSammler",
        ],
    },
    {
        name: "Felkin",
        label: <MultiColoredLetters colors={braunColors}>Felkin</MultiColoredLetters>,
        ascii: <FelkinAscii />,
        description: "Diese katzenhaften Wesen leben in den Bergen. Ihre Behausungen sind aus dem Stein geschlagen und mit Fellen geschmückt. Sie leben meist allein, oder in kleinen Familien. Felkin sind bekannt für ihre verspielte und freundliche Art. Sie treiben gerne Tauschhandel, Feilschen oder Täuschen (Was sie eher aus Spaß machen, nicht aus böser Absicht)",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück}</>,
        base: {},
        stats: {
            luck: 15,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "Goldfell",
            "Mondauge",
            "Schattenkralle",
        ],
    },
    {
        name: "Fenril",
        label: <b><GradientText colors={['#BFD3FF', '#B0B0B0']}>Fenril</GradientText></b>,
        ascii: <FenrilAscii />,
        description: "Diese wolfsähnlichen Wesen leben tief in den Wäldern, weniger weil sie so naturverbunden wären, sondern weil es die beste Tarnung bietet. Dank den Verträgen mit den Zwergen und Elfen haben sie Wissen und Material um eine hoch technisierte und streng organisierte Gesellschaft zu erschaffen, die im Verborgenen floriert.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        base: {
            maxRounds: 20,
        },
        stats: {
            rounds: 20,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "Schattenjäger",
            "Blutkrieger",
            "Knochenbrecher",
        ],
    },
    {
        name: "Dryade",
        label: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
        ascii: <DryadAscii />,
        description: "Dryaden brauchen Licht, sauberes Wasser und gute Erde. Sie fanden dies in der nähe der Quelle. Als Pflanzenwesen werden sie oft nur als solches wahrgenommen, als einfache Pflanze. Einige Wesen glauben nicht einmal das sie ein Bewusstsein haben. Sie brauchen keine Häuser, Technik oder Gold.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 150,
        },
        stats: {
            life: 150,
        },
        economy: {
            gold: 100,
        },
        subraces: [
            "Astläufer",
            "Blumenkind",
            "Lebenshüter",
        ],
    },
];

export const racesMap: Record<string, Race> = races.reduce((map, race) => {
    map[race.name] = race;
    return map;
}, {} as Record<string, Race>);

