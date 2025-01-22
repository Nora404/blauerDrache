import { PlayerBase, PlayerEconomy, PlayerStats } from "../store/newGameStore";
import { GradientText } from "../utility/Formatted/GradientText";
import MultiColoredLetters from "../utility/Formatted/MultiColoredLetters";
import { SYSTEM } from "./helper/colorfullStrings";
import { grayColors, lilaColors, rosaColors } from "./helper/colorMappingData";
import { RaceName, racesMap } from "./raceData";

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
    | "Unbekannt"
    | "Lebenshüter";

export type Origin = {
    name: OriginName | string;
    label: JSX.Element;
    description: string;
    bonus: JSX.Element;
    stats: Partial<PlayerStats>;
    base: Partial<PlayerBase>
    economy: Partial<PlayerEconomy>;
};

export const emptyOriginObj: Origin = {
    name: "Unbekannt",
    label: <GradientText colors={['#eeeeee', '#dddddd']}>Unbekant</GradientText>,
    description: "Es gibt keine Beschreibung",
    bonus: <>Du erhältst einen Bonus auf ... Nichts!</>,
    base: {},
    stats: {},
    economy: {},
};

export const origin: Origin[] = [
    {
        name: "Stadtmensch",
        label: <GradientText colors={['#eeeeee', '#dddddd']}>Stadtmensch</GradientText>,
        description: "Du hast dein ganzes bisheriges Leben in der Stadt verbracht. Der gepflasterte Boden, die stinkende Luft und der Lärm von Geschnatter der Menschen war deine Welt. Jetzt bist du dieser überdrüssig geworden.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        base: {},
        stats: {},
        economy: {
            gold: 50,
        },
    },
    {
        name: "Dörfler",
        label: <GradientText colors={['#5BCF57', '#CFAD67', '#5BCF57']}>Dörfler</GradientText>,
        description: "Weite Wiesen, Felder mit Gemüse und Obstbäume, freilaufende Tiere und du kanntest jedes mit Namen. Auch die Namen der Menschen, die dir tagtäglich „Guten Tag“ und „Guten Mittag“ und auch „Guten Abend“ sagten. Höhste Zeit hier von hier zu verschwinden.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 20,
        },
        stats: {
            life: 20,
        },
        economy: {},
    },
    {
        name: "Wanderer",
        label: <GradientText colors={['#ffcccb', '#ff9999']}>Wanderer</GradientText>,
        description: "Der Boden ist dein Bett, der Himmel deine Decke. Du bist frei von allen Verpflichtungen, die sich die Menschen aufhalsen. Leider bist du auch oft frei von einer warmen Mahlzeit oder einen guten Schluck „Glücklichmacher“",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        base: {
            level: 3,
        },
        stats: {
        },
        economy: {},
    },
    {
        name: "Nachtelf",
        label: <GradientText colors={['#746FF5', '#6E5AB0']}>Nachtelf</GradientText>,
        description: "Du hast ein besonders starkes Gespür zur Magie, gerade Nachts ist es besonders ausgeprägt. Die Auren der umgebenen Elfen strahlen so stark, dass du oft mit geschlossenen Augen ihnen Gegenüber tritts. Nun möchtest du dem Licht der Elfen entkommen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 5,
        },
        economy: {},
    },
    {
        name: "Hochelf",
        label: <GradientText colors={['#F1F586']}>Hochelf</GradientText>,
        description: "Dein größtes Bestreben ist es Wissen zu sammeln und die Geschichte der Elfen zu bewahren. Um Neues zu lernen hast du öfter die Bäume und deren Schutz verlassen, dich aber nie allzu weit entfernt. Nun hast du alles Erfahren was es hier zu wissen gibt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        base: {
            level: 3,
        },
        stats: {
        },
        economy: {},
    },
    {
        name: "Waldelf",
        label: <GradientText colors={['#228B22', '#32CD32']}>Waldelf</GradientText>,
        description: "Du bist mit den Tieren des Waldes befreundet und fühlst was auch die Bäume und Pflanzen um dich herum fühlen. Sie flüstern von der Ferne und vor Gefahren, die den Wald bedrohen. Besorgt hast du dir vorgenommen diesen Warnungen nachzugehen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        base: {
            maxRounds: 5,
        },
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    {
        name: "Steinklopfer",
        label: <GradientText colors={['#D48960', '#D4B38D']}>Steinklopfer</GradientText>,
        description: "Die Unterschicht der Zwerge. Du gehörst zu den Steinklopfern, diejenigen welche die härteste und gefährlichste Arbeit verrichten muss. Andere Zwerge schauen verächtlich auf dich. Sie werden deinen Einsatz nie zu würdigen wissen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 5,
        },
        economy: {},
    },
    {
        name: "Metallschürfer",
        label: <GradientText colors={['#B0C4DE', '#4682B4']}>Metallschürfer</GradientText>,
        description: "Im Mittelstand geboren hast du dich einem angesehenen Handwerk gewinnet. Gold ist dein täglich Brot und Silber dein Wasser. Aber was könnte man mit anderen Materialen erschaffen? Du hast von anderen Zwergen von etwas gehört das sich „Holz“ nennt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        base: {},
        stats: {},
        economy: {
            gold: 50,
        },
    },
    {
        name: "Edelsteinfürst",
        label: <GradientText colors={['#FFD700', '#FFA500']}>Edelsteinfürst</GradientText>,
        description: "Als jemand aus dem Adel musstest du nie eine Spitzhacke in die Hände nehmen. Edelsteine und feine exotische Stoffe schmücken deinen staatlichen Zwergenkörper. Viele schulden dir noch Gold. Um der Langeweile zu entgehen, beschließt du ihnen einen Besuch abzustatten.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Edelsteine}</>,
        base: {},
        stats: {},
        economy: {
            edelsteine: 1,
        },
    },
    {
        name: "FelsImHimmel",
        label: <GradientText colors={['#eeeeee', '#bbbbbb', '#ffffff', '#cccccc']}>Fels-im-Himmel</GradientText>,
        description: "Das Ödland besteht aus Sand und Stein, sehr harte und spitze Steine. Dank deiner harten beschuppten Haut können sie dir nichts anhaben. Doch diese Steine sind nicht sehr nahrhaft. Um deiner Familie ein hungriges Maul zu ersparen, machst du dich allein auf den Weg.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 5,
        },
        economy: {},
    },
    {
        name: "SandImWind",
        label: <GradientText colors={['#DEB887', '#F4A460']}>Sand-im-Wind</GradientText>,
        description: "Sand am Boden, Sand in der Luft. Deine Augen sehen kaum etwas anders als Sand. Du wanderst mit deiner Gruppe von Oase zu Oase, rastet dort und wandert weiter. Am Horizont sind die Berge zu erkennen „Warum wandern wir nicht einmal dort hin?“",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 20,
        },
        stats: {
            life: 20,
        },
        economy: {},
    },
    {
        name: "KnochenImFels",
        label: <MultiColoredLetters colors={grayColors}>Knochen-im-Fels</MultiColoredLetters>,
        description: "Links und Rechts vor dir ragen die steinernen Wände der Schlucht in die Höhe. Du erkennst nur einen schmalen Streifen Licht. Hier ist es dunkel und still, perfekt um kleinere Tiere zu jagen. Ihre Knochen sind dein Schmuck. Dich reizt der Rum außerhalb der Knochenschlucht.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
        base: {},
        stats: {
            attack: 5,
        },
        economy: {},
    },
    {
        name: "GeisterSchamane",
        label: <MultiColoredLetters colors={lilaColors}>Geister Schamane</MultiColoredLetters>,
        description: "Du gehörst der Bruderschaft der Geister an. Als Schamane ist es deine Aufgabe die Geister friedlich zu stimmen und ihren Willen zu erkennen. Dieser ist oft verschwommen, wie ein Traum. Der letzte Geist wollte das du etwas außerhalb des Sumpfes erledigst.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 20,
        },
        stats: {
            life: 20,
        },
        economy: {},
    },
    {
        name: "RunenWächter",
        label: <GradientText colors={['#C2C2C2', '#DED968', '#C2C2C2']}>Runen Wächter</GradientText>,
        description: "Du gehörst der Bruderschaft der Runen an. Als Wächter bewachst du die vergessenen Ruinen und deren Geheimnisse. Doch Plünderer haben die Ruinen geschändet. Es ist deine Aufgabe gestohlenes zurückzuholen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        base: {
            maxRounds: 5,
        },
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    {
        name: "NebelSammler",
        label: <GradientText colors={['#EB3F3F', '#A9A9A9']}>Nebel Sammler</GradientText>,
        description: "Du gehörst der Bruderschaft der Nebel an. Als Sammler musst du Wertvolles finden, dass in Ritualen den Göttern geopfert werden kann. Dein letzter Besuch in den vergessenen Ruinen war ein großer Misserfolg. Du musst den Sumpf verlassen um etwas zu finden, das die Götter wieder gnädig stimmt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        base: {
            level: 3,
        },
        stats: {
        },
        economy: {},
    },
    {
        name: "Goldfell",
        label: <GradientText colors={['#FFD700', '#FFA500']}>Goldfell</GradientText>,
        description: "Du gehörst zu den Händlern und Täuschern. Du kennst jede Seilbrücke und jeden noch so verwinkelten Pfad des Berges. Nicht nur Felkin kannst du mit deinen Waren begeistern, auch fremde „Besucher“ Bis du dich eines Tages doch einmal verlaufen hast.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
        base: {},
        stats: {},
        economy: {
            gold: 50,
        },
    },
    {
        name: "Mondauge",
        label: <GradientText colors={['#1E90FF', '#87CEFA', '#BBDDFF', '#1E90FF']}>Mondauge</GradientText>,
        description: "Du bist als Mondauge bekannt, Felkin die am liebsten nachts unterwegs sind und Schabernack treiben. Dabei bräuchtest du mehr als nur sieben Leben. Deine Suche nach Spaß und Nervenkitzel kennt keine Konsequenzen oder Grenzen. Selbst der Berg ist zu klein für dich.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 20,
        },
        stats: {
            life: 20,
        },
        economy: {},
    },
    {
        name: "Schattenkralle",
        label: <GradientText colors={['#AC7CEB', '#EB3F3F', '#8A2BE2']}>Schattenkralle</GradientText>,
        description: "Deine Zähne sind scharf, deine Klauen tödlich. Du bist für die Jagt verantwortlich, sogst für Essen und Felle. Mit den anderen Schattenkrallen stehst du in einen unausgesprochenen Wettkampf. Dieser führt dich auch außerhalb deines Revieres.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        base: {
            maxRounds: 5,
        },
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    {
        name: "Schattenjäger",
        label: <GradientText colors={['#9AA7C2', '#86DEE3', '#708090']}>Schattenjäger</GradientText>,
        description: "Als Schattenjäger bist du berechtigt mit den Elfen und Zwergen in Verhandlungen zu treten. Deine eigentliche Aufgabe ist die Beobachtung der äußeren Grenzen und Meldung vor etwaigen Gefahren oder Eindringlingen. Diese Grenze ist dabei sehr grob gefasst.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
        base: {
            level: 3,
        },
        stats: {
        },
        economy: {},
    },
    {
        name: "Blutkrieger",
        label: <GradientText colors={['#ED4E4E', '#E36D34']}>Blutkrieger</GradientText>,
        description: "Du gehörst zu den Kämpfern der Fenril. Dein Vorgesetzter schickt dich regelmäßig in gefährliche Missionen, auch außerhalb des Waldes. Ein Gerücht über die Ermordung des grünen Drachens führt dich bis nach Lahtheim.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
        base: {},
        stats: {
            attack: 5,
        },
        economy: {},
    },
    {
        name: "Knochenbrecher",
        label: <MultiColoredLetters colors={grayColors}>Knochenbrecher</MultiColoredLetters>,
        description: "Der Begriff „Knochenbrecher“ ist eigentlich völlig veraltet. Du bist für die Technik und Entwicklung zuständig. Ein Unfall macht den Begriff Knochenbrecher jedoch wieder schmerzlich aktuell. Du wurdest bis auf weiteres „Beurlaubt“",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 5,
        },
        economy: {},
    },
    {
        name: "Astläufer",
        label: <GradientText colors={['#D99966', '#228B22', '#D99966', '#32CD32']}>Astläufer</GradientText>,
        description: "Dein Körper besteht aus hölzernen Fasern und kleinen grünen Blättern auf deinem Kopf. Deine Familie sind die Bäume, deren Schutz und Pflege dein Lebensziel ist. Doch die Bäume sind unruhig. Sie flüstern von Gefahren außerhalb der Quelle.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
        base: {},
        stats: {
            defense: 5,
        },
        economy: {},
    },
    {
        name: "Blumenkind",
        label: <MultiColoredLetters colors={rosaColors}>Blumenkind</MultiColoredLetters>,
        description: "Grüne dünne verschlungene Ranken formen deinen Körper. Bunte Blüten wachsen auf deinen Armen und Beinen. Dein Kopf ist ein Meer aus Blumen. Du genießt das Licht der Sonne und das leckere Wasser der Quelle. Du hattest dich bis eben nie gefragt, wohin das Wasser fließt.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden}</>,
        base: {
            maxRounds: 5,
        },
        stats: {
            rounds: 5,
        },
        economy: {},
    },
    {
        name: "Lebenshüter",
        label: <GradientText colors={['#84BD3A', '#31BD4A', '#9ABD39']}>Lebenshüter</GradientText>,
        description: "Ein Gemisch aus Moose, Pilzen und Steinen formt deinen Körper. Du bist fasziniert von allen, was Lebt, genauer gesagt von allem was aus einem Samen wächst. Du pflegst einen großen Garten, doch eines Tages hörten deine Schützlinge auf zu wachsen. Du musst die Quelle verlassen, um Heilung zu finden.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
        base: {
            maxLife: 20,
        },
        stats: {
            life: 20,
        },
        economy: {},
    },
];

export const originMap: Record<string, Origin> = origin.reduce((map, originObj) => {
    map[originObj.name] = originObj;
    return map;
}, {} as Record<string, Origin>);

export const getOriginByRaces = (raceName: RaceName) => {
    const race = racesMap[raceName];
    if (!race) return [emptyOriginObj];
    return race.subraces.map(originName => originMap[originName] || emptyOriginObj);
}