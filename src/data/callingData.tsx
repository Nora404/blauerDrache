import { GradientText } from "../utility/GradientText";
import { SYSTEM } from "./colorfullStrings";


export type CallingName =
    | "Bauer"
    | "Söldner"
    | "Entdecker"
    | "Händler"
    | "Handwerker"
    | "Alchemist"
    | "Barde"
    | "Jäger"
    | "Geistlicher"
    | "Geheimnis";

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
        description: "Tiere pflegen, Gemüse anbauen und Obst sammeln. All das dann zu leckeren Speisen verarbeiten und auf dem Markt verkaufen. Bei dem Gedanken fängst du an verträumt in den Himmel zu starren. Ja, das ist ein Leben wie du es dir erhoffst.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben} und {SYSTEM.Gold}</>
    },
    {
        name: "Söldner",
        label: <GradientText colors={['#ffcccc', '#cc9999']}>Söldner</GradientText>,
        description: "Es gibt bestimmt genügend Arbeitgeber, die ein Problem mit diesem oder jenem haben. Probleme die gelöst werden müssen … mit harten und scharfen Argumenten. Du willst dir dein Gold mit Aufträgen verdienen, bei denen möglichst viel gekämpft werden muss.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff} und {SYSTEM.Verteidigung}</>
    },
    {
        name: "Entdecker",
        label: <GradientText colors={['#ccffdd', '#99bbcc']}>Entdecker</GradientText>,
        description: "Es gibt zwar schon Karten, aber es gibt noch mehr Geheimnisse, die du entdecken willst. Lahtheim soll deine Basis werden, der Ort von dem aus du das Land erkundest und die Umgebung unsicher machst. Vielleicht findest du verlorenes und die dazu passenden dankbaren Seelen, die deine Hilfe mit Gold entlohnen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Runden} und {SYSTEM.Leben}</>
    },
    {
        name: "Händler",
        label: <GradientText colors={['#ffdd99', '#ffaa66']}>Händler</GradientText>,
        description: "Du willst dein gutes Auge und dein Gespür nutzen, um lohnende Geschäfte zu machen. Billigwaren kaufen und teuer wieder verkaufen. Kontakte knüpfen und Gefallen sammeln die dir später noch nützlich werden könnten. Dein Netz wird dich reich und mächtig machen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold} und {SYSTEM.Edelsteine}</>
    },
    {
        name: "Handwerker",
        label: <GradientText colors={['#ddddff', '#aaaaff']}>Handwerker</GradientText>,
        description: "Mit Materialien arbeiten, aus Rohstoffen tolle Waren herstellen, dass ist es was dir Freude macht. In Lahtheim gibt es viele Möglichkeiten zu lernen. Du willst dem bunten Angebot an Handwerkskunst deinen Stempel auftragen und dir einen Namen machen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold} und {SYSTEM.Angriff}</>
    },
    {
        name: "Alchemist",
        label: <GradientText colors={['#ccccff', '#9999ff']}>Alchemist</GradientText>,
        description: "Die Kunst des Heilens und der Transmutation ist nicht nur faszinierend, sondern auch nützlich. Du möchtest anderen Helfen und dir dabei genügend Gold verdienen um deine eigenen Forschungen betreiben. Zusammen mit Kollegen aus allen Regionen könntest du mächtige noch nie dagewesene Tränke erschaffen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben} und {SYSTEM.Glück}</>
    },
    {
        name: "Barde",
        label: <GradientText colors={['#ffeeaa', '#ffcc77']}>Barde</GradientText>,
        description: "Spaß und Freude willst du bringen und In der Taverne tanzen und singen. Du willst von Tisch zu Tisch her Springen und Hören wie die süßen Goldmünzen klingen. Von überall her werden sie reisen, nur um deiner Musik zu preisen.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück} und {SYSTEM.Verteidigung}</>
    },
    {
        name: "Jäger",
        label: <GradientText colors={['#bbffaa', '#88cc88']}>Jäger</GradientText>,
        description: "Du möchtest das Gleichgewicht der Natur wahren, dazu gehört auch dafür zu sorgen, dass die Population von Wildtieren in den Wäldern ausgeglichen ist. Dabei willst du den Zustand der Bäume und Pflanzen überprüfen und Helfen wo immer es dir möglich ist.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff} und {SYSTEM.Glück}</>
    },
    {
        name: "Geistlicher",
        label: <GradientText colors={['#ffbbcc', '#ff99aa']}>Geistlicher</GradientText>,
        description: "Du möchtest dein Wissen mehren, erfahren was andere Wesen denken und woran sie glauben. Dein Interesse gilt nicht der materiellen Welt, das Leben besteht aus mehr als nur Gold, wobei es durchaus hilfreich ist welches zu haben.",
        bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung} und {SYSTEM.Leben}</>
    },
    {
        name: "Geheimnis",
        label: <GradientText colors={['#bbbbff', '#8888cc']}>Geheimnis</GradientText>,
        description: "Entweder weißt du es selbst nicht, oder niemand soll erfahren, warum du nach Lahtheim gekommen bist. Falls dich jemand fragt, solltest du dir einen einfachen Grund ausdenken – einen, der so unauffällig ist, dass niemand weitere Fragen stellt. Sei am besten so unscheinbar und langweilig wie möglich!",
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