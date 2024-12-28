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
    | "Knochenbrecher"
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
        description: "In den Ebenen der Stadt Lahtheim ist die Heimat der Menschen zu finden. Viele leben in der Stadt selbst oder in den kleineren Dörfern. Sie treiben gerne Handel untereinander, sind aber Fremden gegenüber eher misstrauisch. Sie können sehr viel, aber nichts wirklich außergewöhnlich gut. Ein Sprichwort lautet: Menschen sind das Wasser der Suppe",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        subraces: [
            {
                name: "Stadtmensch",
                label: <GradientText colors={['#eeeeee', '#dddddd']}>Stadtmensch</GradientText>,
                description: "Du hast dein ganzes bisheriges Leben in der Stadt verbracht. Der gepflasterte Boden, die stinkende Luft und der Lärm von Geschnatter der Menschen war deine Welt. Jetzt bist du dieser überdrüssig geworden.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Dörfler",
                label: <GradientText colors={['#a2d5c6', '#6fa8dc']}>Dörfler</GradientText>,
                description: "Weite Wiesen, Felder mit Gemüse und Obstbäume, freilaufende Tiere und du kanntest jedes mit Namen. Auch die Namen der Menschen, die dir tagtäglich „Guten Tag“ und „Guten Mittag“ und auch „Guten Abend“ sagten. Höhste Zeit hier von hier zu verschwinden.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Wanderer",
                label: <GradientText colors={['#ffcccb', '#ff9999']}>Wanderer</GradientText>,
                description: "Der Boden ist dein Bett, der Himmel deine Decke. Du bist frei von allen Verpflichtungen, die sich die Menschen aufhalsen. Leider bist du auch oft frei von einer warmen Mahlzeit oder einen guten Schluck „Glücklichmacher“",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
        ],
    },
    {
        name: "Elf",
        label: <i><GradientText colors={['#FFE1C2', '#ff6644']}>Elf</GradientText></i>,
        ascii: <ElfAscii />,
        description: "Hoch in den Bäumen des Waldes, in zerbrechlich aussehenden filigranen Strukturen, leben die Elfen. Mit den Drachen sind die das älteste Volg dieser Welt. Ihre dünnen, ewig jungen Körper lassen nicht vermuten, wie alt eine Elfe wirklich ist. Sie haben ein Gespür zu Magie, welches sie meist nur theoretisch erforschen, statt es selbst zu betreiben.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        subraces: [
            {
                name: "Nachtelf",
                label: <GradientText colors={['#2E2E2E', '#5A5A5A']}>Nachtelf</GradientText>,
                description: "Du hast ein besonders starkes Gespür zur Magie, gerade Nachts ist es besonders ausgeprägt. Die Auren der umgebenen Elfen strahlen so stark, dass du oft mit geschlossenen Augen ihnen Gegenüber tritts. Nun möchtest du dem Licht der Elfen entkommen.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Hochelf",
                label: <GradientText colors={['#E0FFFF', '#ADD8E6']}>Hochelf</GradientText>,
                description: "Dein größtes Bestreben ist es Wissen zu sammeln und die Geschichte der Elfen zu bewahren. Um Neues zu lernen hast du öfter die Bäume und deren Schutz verlassen, dich aber nie allzu weit entfernt. Nun hast du alles Erfahren was es hier zu wissen gibt.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
            {
                name: "Waldelf",
                label: <GradientText colors={['#228B22', '#32CD32']}>Waldelf</GradientText>,
                description: "Du bist mit den Tieren des Waldes befreundet und fühlst was auch die Bäume und Pflanzen um dich herum fühlen. Sie flüstern von der Ferne und vor Gefahren, die den Wald bedrohen. Besorgt hast du dir vorgenommen diesen Warnungen nachzugehen.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
        ],
    },
    {
        name: "Zwerg",
        label: <b style={{ fontSize: '85%' }}><GradientText colors={['#A3D8FF', '#ffffff']}>Zwerg</GradientText></b>,
        ascii: <DwarfAscii />,
        description: "Tief in den unterirdischen Höhlen ist die Heimat der edlen und mächtigen Zwerge, deren Bedürfnis nach Reichtum und Schätze in keinem Verhältnis zu ihrer Körpergröße steht. Es gibt keine besseren Handwerker und oder Kenner für Materialien und deren Eigenschaften. Ihre Gesellschaft ist in strengen Sozialen Klassen eingeteilt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        subraces: [
            {
                name: "Steinklopfer",
                label: <GradientText colors={['#8B4513', '#A0522D']}>Steinklopfer</GradientText>,
                description: "Die Unterschicht der Zwerge. Du gehörst zu den Steinklopfern, diejenigen welche die härteste und gefährlichste Arbeit verrichten muss. Andere Zwerge schauen verächtlich auf dich. Sie werden deinen Einsatz nie zu würdigen wissen.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Metallschürfer",
                label: <GradientText colors={['#B0C4DE', '#4682B4']}>Metallschürfer</GradientText>,
                description: "Im Mittelstand geboren hast du dich einem angesehenen Handwerk gewinnet. Gold ist dein täglich Brot und Silber dein Wasser. Aber was könnte man mit anderen Materialen erschaffen? Du hast von anderen Zwergen von etwas gehört das sich „Holz“ nennt.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Edelsteinfürst",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Edelsteinfürst</GradientText>,
                description: "Als jemand aus dem Adel musstest du nie eine Spitzhacke in die Hände nehmen. Edelsteine und feine exotische Stoffe schmücken deinen staatlichen Zwergenkörper. Viele schulden dir noch Gold. Um der Langeweile zu entgehen, beschließt du ihnen einen Besuch abzustatten.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Edelsteine}</>
            },
        ],
    },
    {
        name: "Echse",
        label: <GradientText colors={['#46CF25', '#29CF72']}>Echse</GradientText>,
        ascii: <LizardAscii />,
        description: "In der öden Landschaft hinter den Steppen, weit außerhalb jeder Siedlung, leben die Echsen in kleineren nomadischen Gruppen. Artverwandt mit den Drachen haben sie es nicht leicht in dieser Welt. Hinzu kommt das viele Wesen ihnen keine größere Intelligenz zutrauen. Da Echsen andere Wesen meiden, wird sich ihr Ruf nicht sonderlich bald verbessern.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
        subraces: [
            {
                name: "Fels-im-Himmel",
                label: <GradientText colors={['#708090', '#2F4F4F']}>Fels-im-Himmel</GradientText>,
                description: "Das Ödland besteht aus Sand und Stein, sehr harte und spitze Steine. Dank deiner harten beschuppten Haut können sie dir nichts anhaben. Doch diese Steine sind nicht sehr nahrhaft. Um deiner Familie ein hungriges Maul zu ersparen, machst du dich allein auf den Weg.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Sand-im-Wind",
                label: <GradientText colors={['#DEB887', '#F4A460']}>Sand-im-Wind</GradientText>,
                description: "Sand am Boden, Sand in der Luft. Deine Augen sehen kaum etwas anders als Sand. Du wanderst mit deiner Gruppe von Oase zu Oase, rastet dort und wandert weiter. Am Horizont sind die Berge zu erkennen „Warum wandern wir nicht einmal dort hin?“",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Knochen-im-Fels",
                label: <GradientText colors={['#A9A9A9', '#696969']}>Knochen-im-Fels</GradientText>,
                description: "Links und Rechts vor dir ragen die steinernen Wände der Schlucht in die Höhe. Du erkennst nur einen schmalen Streifen Licht. Hier ist es dunkel und still, perfekt um kleinere Tiere zu jagen. Ihre Knochen sind dein Schmuck. Dich reizt der Rum außerhalb der Knochenschlucht.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>
            },
        ],
    },
    {
        name: "Troll",
        label: <b><MultiColoredLetters colors={greenColors}>Troll</MultiColoredLetters></b>,
        ascii: <TrollAscii />,
        description: "In den Sümpfen, nahe der vergessenen Ruinen, leben die Trolle. Wenn sie sich nicht gegen andere Bewohner des Sumpfes verteidigen müssen, zum Beispiel gegen Monster Mücken, beten sie zu ihren Göttern. Sie verrichten für diese verschiedene Dienste in sogenannten Bruderschaften. Dabei kommt es gelegentlich zu „Uneinigkeiten“",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        subraces: [
            {
                name: "Geister Schamane",
                label: <GradientText colors={['#4B0082', '#9370DB']}>Geister Schamane</GradientText>,
                description: "Du gehörst der Bruderschaft der Geister an. Als Schamane ist es deine Aufgabe die Geister friedlich zu stimmen und ihren Willen zu erkennen. Dieser ist oft verschwommen, wie ein Traum. Der letzte Geist wollte das du etwas außerhalb des Sumpfes erledigst.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Runen Wächter",
                label: <GradientText colors={['#8A2BE2', '#BA55D3']}>Runen Wächter</GradientText>,
                description: "Du gehörst der Bruderschaft der Runen an. Als Wächter bewachst du die vergessenen Ruinen und deren Geheimnisse. Doch Plünderer haben die Ruinen geschändet. Es ist deine Aufgabe gestohlenes zurückzuholen.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
            {
                name: "Nebel Sammler",
                label: <GradientText colors={['#696969', '#A9A9A9']}>Nebel Sammler</GradientText>,
                description: "Du gehörst der Bruderschaft der Nebel an. Als Sammler musst du Wertvolles finden, dass in Ritualen den Göttern geopfert werden kann. Dein letzter Besuch in den vergessenen Ruinen war ein großer Misserfolg. Du musst den Sumpf verlassen um etwas zu finden, das die Götter wieder gnädig stimmt.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
        ],
    },
    {
        name: "Felkin",
        label: <GradientText colors={['#E8E8E8', '#eeeeee', '#E8E8E8']}>Felkin</GradientText>,
        ascii: <FelkinAscii />,
        description: "Diese katzenhaften Wesen leben in den Bergen. Ihre Behausungen sind aus dem Stein geschlagen und mit Fellen geschmückt. Sie leben meist allein, oder in kleinen Familien. Felkin sind bekannt für ihre verspielte und freundliche Art. Sie treiben gerne Tauschhandel, Feilschen oder Täuschen (Was sie eher aus Spaß machen, nicht aus böser Absicht)",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück}</>,
        subraces: [
            {
                name: "Goldfell",
                label: <GradientText colors={['#FFD700', '#FFA500']}>Goldfell</GradientText>,
                description: "Du gehörst zu den Händlern und Täuschern. Du kennst jede Seilbrücke und jeden noch so verwinkelten Pfad des Berges. Nicht nur Felkin kannst du mit deinen Waren begeistern, auch fremde „Besucher“ Bis du dich eines Tages doch einmal verlaufen hast.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>
            },
            {
                name: "Mondauge",
                label: <GradientText colors={['#1E90FF', '#87CEFA']}>Mondauge</GradientText>,
                description: "Du bist als Mondauge bekannt, Felkin die am liebsten nachts unterwegs sind und Schabernack treiben. Dabei bräuchtest du mehr als nur sieben Leben. Deine Suche nach Spaß und Nervenkitzel kennt keine Konsequenzen oder Grenzen. Selbst der Berg ist zu klein für dich.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>
            },
            {
                name: "Schattenkralle",
                label: <GradientText colors={['#4B0082', '#8A2BE2']}>Schattenkralle</GradientText>,
                description: "Deine Zähne sind scharf, deine Klauen tödlich. Du bist für die Jagt verantwortlich, sogst für Essen und Felle. Mit den anderen Schattenkrallen stehst du in einen unausgesprochenen Wettkampf. Dieser führt dich auch außerhalb deines Revieres.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
        ],
    },
    {
        name: "Fenril",
        label: <b><GradientText colors={['#FFFCE4', '#E8CBA9']}>Fenril</GradientText></b>,
        ascii: <FenrilAscii />,
        description: "Diese wolfsähnlichen Wesen leben tief in den Wäldern, weniger weil sie so naturverbunden wären, sondern weil es die beste Tarnung bietet. Dank den Verträgen mit den Zwergen und Elfen haben sie Wissen und Material um eine hoch technisierte und streng organisierte Gesellschaft zu erschaffen, die im Verborgenen floriert.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        subraces: [
            {
                name: "Schattenjäger",
                label: <GradientText colors={['#2F4F4F', '#708090']}>Schattenjäger</GradientText>,
                description: "Als Schattenjäger bist du berechtigt mit den Elfen und Zwergen in Verhandlungen zu treten. Deine eigentliche Aufgabe ist die Beobachtung der äußeren Grenzen und Meldung vor etwaigen Gefahren oder Eindringlingen. Diese Grenze ist dabei sehr grob gefasst.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>
            },
            {
                name: "Blutkrieger",
                label: <GradientText colors={['#8B0000', '#B22222']}>Blutkrieger</GradientText>,
                description: "Du gehörst zu den Kämpfern der Fenril. Dein Vorgesetzter schickt dich regelmäßig in gefährliche Missionen, auch außerhalb des Waldes. Ein Gerücht über die Ermordung des grünen Drachens führt dich bis nach Lahtheim.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>
            },
            {
                name: "Knochenbrecher",
                label: <GradientText colors={['#A52A2A', '#CD853F']}>Knochenbrecher</GradientText>,
                description: "Der Begriff „Knochenbrecher“ ist eigentlich völlig veraltet. Du bist für die Technik und Entwicklung zuständig. Ein Unfall macht den Begriff Knochenbrecher jedoch wieder schmerzlich aktuell. Du wurdest bis auf weiteres „Beurlaubt“",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
        ],
    },
    {
        name: "Dryade",
        label: <i><GradientText colors={['#91FF5A', '#FF9CFD', '#91FF5A']}>Dryade</GradientText></i>,
        ascii: <DryadAscii />,
        description: "Dryaden brauchen Licht, sauberes Wasser und gute Erde. Sie fanden dies in der nähe der Quelle. Als Pflanzenwesen werden sie oft nur als solches wahrgenommen, als einfache Pflanze. Einige Wesen glauben nicht einmal das sie ein Bewusstsein haben. Sie brauchen keine Häuser, Technik oder Gold.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        subraces: [
            {
                name: "Astläufer",
                label: <GradientText colors={['#228B22', '#32CD32']}>Astläufer</GradientText>,
                description: "Dein Körper besteht aus hölzernen Fasern und kleinen grünen Blättern auf deinem Kopf. Deine Familie sind die Bäume, deren Schutz und Pflege dein Lebensziel ist. Doch die Bäume sind unruhig. Sie flüstern von Gefahren außerhalb der Quelle.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>
            },
            {
                name: "Blumenkind",
                label: <GradientText colors={['#FF69B4', '#FFB6C1']}>Blumenkind</GradientText>,
                description: "Grüne dünne verschlungene Ranken formen deinen Körper. Bunte Blüten wachsen auf deinen Armen und Beinen. Dein Kopf ist ein Meer aus Blumen. Du genießt das Licht der Sonne und das leckere Wasser der Quelle. Du hattest dich bis eben nie gefragt, wohin das Wasser fließt.",
                bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>
            },
            {
                name: "Lebenshüter",
                label: <GradientText colors={['#32CD32', '#7CFC00']}>Lebenshüter</GradientText>,
                description: "Ein Gemisch aus Moose, Pilzen und Steinen formt deinen Körper. Du bist fasziniert von allen, was Lebt, genauer gesagt von allem was aus einem Samen wächst. Du pflegst einen großen Garten, doch eines Tages hörten deine Schützlinge auf zu wachsen. Du musst die Quelle verlassen, um Heilung zu finden.",
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
    Knochenbrecher: {
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
