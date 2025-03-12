import { GradientText } from "../utility/Formatted/GradientText";
import MultiColoredLetters from "../utility/Formatted/MultiColoredLetters";
import { SYSTEM } from "./helper/colorfullStrings";
import {
	braunColors,
	lilaColors,
	pastelColors,
	petrolColors,
	redColors,
} from "./helper/colorMappingData";
import { OriginName } from "./originData";
import {
	DryadAscii,
	DwarfAscii,
	ElfAscii,
	FelkinAscii,
	FenrilAscii,
	HumanAscii,
	LizardAscii,
	OrksAscii,
} from "./helper/playerAscii";
import { PlayerBase, PlayerStats, PlayerEconomy } from "../store/types";

export type RaceName =
	| "Mensch"
	| "Elf"
	| "Zwerg"
	| "Echse"
	| "Ork"
	| "Felkin"
	| "Fenril"
	| "Waldgeist";

export type Race = {
	name: RaceName | "Unbekant";
	label: JSX.Element;
	ascii: JSX.Element;
	description: string;
	bonus: JSX.Element;
	base: Partial<PlayerBase>;
	stats: Partial<PlayerStats>;
	economy: Partial<PlayerEconomy>;
	subraces: OriginName[];
};

export const emptyRaceObj: Race = {
	name: "Unbekant",
	label: <GradientText colors={["#fedcba", "#987654"]}>Unbekant</GradientText>,
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
		label: <GradientText colors={petrolColors}>Mensch</GradientText>,
		ascii: <HumanAscii />,
		description: `In den weiten Ebenen rund um die Stadt Lahtheim liegt die Heimat der Menschen. Viele leben innerhalb der Stadtmauern, andere in den verstreuten Dörfern der Umgebung. Die Siedlungen sind durch Wege aus festgetretener Erde verbunden, auf denen Händler, Reisende und Abenteurer einander begegnen.

        Als Gründer von Lahtheim genießen die Menschen einen guten Ruf - sie sind anpassungsfähig, erfinderisch und vielseitig. Doch ein altes Sprichwort sagt: „Menschen sind das Wasser der Suppe.“ Sie können vieles, doch nichts wirklich außergewöhnlich gut.
        
        Ihr derzeitiger Herrscher ist ein betagter Mann namens Günter Me Drag, der sich nur selten in der Öffentlichkeit blicken lässt. Stattdessen regeln seine Vertreter die Angelegenheiten des Reiches, allerdings mit wenig Begeisterung für Veränderungen. Die Bürokratie blüht, und jeder Bürger kann im Rathaus Anträge einreichen, um sein Anliegen vorzutragen. Menschen scheinen Gefallen an solchen Formalitäten zu finden.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
		base: {
			level: 1,
			maxLife: 120,
			maxActionPoints: 20,
		},
		stats: {
			life: 120,
			actionPoints: 20,
			attack: 5,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["Stadtmensch", "Dörfler", "Wanderer"],
	},
	{
		name: "Elf",
		label: (
			<em>
				<GradientText colors={pastelColors}>Elf</GradientText>
			</em>
		),
		ascii: <ElfAscii />,
		description: `Elfen sind große, zierliche Wesen und gehören gemeinsam mit den Fean zu den ältesten Völkern dieser Welt. Sie führen ein außergewöhnlich langes Leben, das sie der Suche nach Wissen und dem Studium der Magie widmen. Für sie ist Magie eines der ursprünglichsten Elemente, eine Kraft, die seit Anbeginn der Zeit existiert. Den blauen Drachen verehren sie als eines der edelsten Wesen, ein Symbol des Lebens und der Weisheit.

        Einer alten Legende nach kämpften die Elfen einst Seite an Seite mit dem blauen Drachen, bis dieser ihnen auftrug, die Quelle des Lebens zu bewahren. Um diese heilige Stätte entstand die Elfenstadt Pa‘ras, auch bekannt als die blaue Stadt. Dort wacht der Elfenrat über das Wissen und die Geschicke ihres Volkes: Lor, der Forscher, Raphia, die Wächterin, und Sylior, der Weise. Die Elfen glauben fest daran, dass der blaue Drache eines Tages zurückkehren wird und dass es ihre Aufgabe sein wird, ihm im Kampf gegen Alles und Nichts beizustehen. Für sie ist Wissen die schärfste aller Klingen, und so haben sie die größten Bibliotheken und angesehensten Universitäten des Landes errichtet.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
		base: {
			level: 3,
			maxLife: 100,
			maxActionPoints: 20,
		},
		stats: {
			life: 100,
			actionPoints: 20,
			attack: 5,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["Nachtelf", "Hochelf", "Waldelf"],
	},
	{
		name: "Zwerg",
		label: (
			<b style={{ fontSize: "85%" }}>
				<GradientText colors={["#A3D8FF", "#ffffff"]}>Zwerg</GradientText>
			</b>
		),
		ascii: <DwarfAscii />,
		description: `Hoch im Norden ragt eine gewaltige Bergkette empor. Doch was die Welt der Oberflächenbewohner nicht ahnt: Tief unter diesen Gipfeln erstreckt sich ein gewaltiges Netz aus Tunneln und Höhlen – kilometerlange Gänge, durchzogen von steinernen Hallen, in denen die Städte der Zwerge ruhen. Die größte unter ihnen ist Konyur, die Residenz des Zwergenkönigs Durbur Steinlicht. Kein Lebewesen dieser Welt besitzt mehr Reichtum als seine Familie.

        Zwerge sind Meister des Handwerks, Kenner der Schätze des Gesteins, doch ihre Gesellschaft ist streng geordnet. Jeder Zwerg hat seinen Platz und dieser ist von Geburt an in Stein gemeißelt. Nur wenige Zwerge haben je das Licht der Sonne gesehen. Manche verlassen die Tiefen, um Rohstoffe wie Holz oder Stoffe zu beschaffen, doch trotz der Bedeutung dieser Aufgabe werden sie in der Gesellschaft geringgeschätzt.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
		base: {
			level: 1,
			maxLife: 100,
			maxActionPoints: 20,
		},
		stats: {
			life: 100,
			actionPoints: 20,
			attack: 5,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 200,
			edelsteine: 0,
		},
		subraces: ["Steinklopfer", "Metallschürfer", "Edelsteinfürst"],
	},
	{
		name: "Echse",
		label: <GradientText colors={["#46CF25", "#FFEF67", "#29CF72"]}>Echse</GradientText>,
		ascii: <LizardAscii />,
		description: `In der kargen Landschaft hinter den Steppen, weit entfernt von jeder Siedlung, leben die Echsen in nomadischen Gruppen. Die drei größten Gemeinschaften sind FelsImHimmel, SandImWind und KnochenImFels. Sie alle eint der Kampf ums Überleben, die unablässige Suche nach Wasser und die ständige Bedrohung durch Stein und Sand. Obwohl sie nie dauerhaft an einem Ort verweilen, gibt es größere Lager, die stets an derselben Stelle errichtet werden, nur die Bewohner und Zelte wechseln. Das größte unter ihnen wird schlicht Lager genannt. Es liegt geschützt in einem Tal, umgeben von massiven Felswänden, die vor Wind und Feinden gleichermaßen Schutz bieten.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
		base: {
			level: 1,
			maxLife: 100,
			maxActionPoints: 20,
		},
		stats: {
			life: 100,
			actionPoints: 20,
			attack: 7,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["FelsImHimmel", "SandImWind", "KnochenImFels"],
	},
	{
		name: "Ork",
		label: (
			<b>
				<MultiColoredLetters colors={redColors}>Ork</MultiColoredLetters>
			</b>
		),
		ascii: <OrksAscii />,
		description: `Tief im Düsterbruch, dort, wo der Nebel schwer über dunklen Gewässern hängt und uralte Ruinen von Wurzeln umschlungen werden, leben die Orks. Sie organisieren sich in Bruderschaften, jede mit ihren eigenen Aufgaben und ihren eigenen Überzeugungen. Während einige an den blauen Drachen als Hüter der Welt glauben, verehren andere die Ersten als die mächtigsten Wesen, die je existierten. Immer wieder kommt es zu Uneinigkeiten, doch erstaunlicherweise gelingt es ihnen, gemeinsam in einem Dorf zu leben.

        Sie nennen es Naruz. Die dunklen, fast schwarzen Holzhütten sind mit Öl versiegelt, um sie vor der ständigen Nässe des Sumpfes zu schützen. Über allem wacht ein Oberhaupt, das keiner Bruderschaft angehören darf. Seine Aufgabe ist es, das Dorf zusammenzuhalten und Streitigkeiten zu schlichten – oft durch Schaukämpfe und Wettbewerbe. Denn niemand hat das Vergessen, was vor fast zweihundert Jahren geschah: Ein Krieg zwischen den Bruderschaften, der die Orks um Jahrhunderte zurückwarf.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {
			level: 1,
			maxLife: 100,
			maxActionPoints: 20,
		},
		stats: {
			life: 100,
			actionPoints: 20,
			attack: 5,
			defense: 7,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["GeisterSchamane", "RunenWächter", "NebelSammler"],
	},
	{
		name: "Felkin",
		label: <MultiColoredLetters colors={braunColors}>Felkin</MultiColoredLetters>,
		ascii: <FelkinAscii />,
		description: `Diese katzenhaften Wesen leben hoch in den Bergen, wo ihre runden Behausungen direkt in den Fels geschlagen wurden. Innen sind sie mit weichen Fellen und bunten Stoffen ausgekleidet, die im sanften Licht flackernder Öllampen schimmern. Felkin leben meist allein oder in kleinen Familien, doch trotz ihrer Unabhängigkeit sind sie für ihre verspielte und gesellige Art bekannt. Ihr Talent für Handel ist legendär sie feilschen, tauschen und tricksen mit solcher Begeisterung, dass es für sie mehr Spiel als Geschäft ist. Wer etwas Seltenes oder Verbotenes sucht, wird über kurz oder lang an einen Felkin geraten. 

        Ihre Märkte sind berühmt für exotische Waren, doch mindestens ebenso für die Geschicklichkeitsspiele, bei denen Schätze gewonnen werden können. Das bedeutendste Fest der Felkin ist das Fest der Perlen, das nicht nur im gleichnamigen Dorf gefeiert wird, sondern als das größte und prachtvollste aller Feste gilt. Sein Höhepunkt ist die feierliche Übergabe der Kette des Vielbunt, ein Schmuckstück aus leuchtenden Steinen, das der Gewinner ein Jahr lang tragen darf. Ein Titel, der unter den Felkin höchst begehrt ist.
        `,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Glück}</>,
		base: {
			level: 1,
			maxLife: 100,
			maxActionPoints: 20,
		},
		stats: {
			life: 100,
			actionPoints: 20,
			attack: 5,
			defense: 5,
			luck: 7,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["Goldfell", "Mondauge", "Schattenkralle"],
	},
	{
		name: "Fenril",
		label: (
			<b>
				<GradientText colors={lilaColors}>Fenril</GradientText>
			</b>
		),
		ascii: <FenrilAscii />,
		description: `Diese wolfsähnlichen Wesen leben tief verborgen in den Wäldern - weniger, weil sie naturverbunden wären, sondern weil es die beste Tarnung bietet. Dank ihrer Verträge mit den Zwergen und Elfen verfügen sie über das Wissen und die Ressourcen, um eine hochtechnisierte und streng organisierte Gesellschaft aufzubauen. Ihre geheime Stadt trägt den Namen Tekron. Wer im Herzen Tekrons steht, bekommt kaum noch etwas Grünes zu Gesicht. Stattdessen wird der Blick von hohen, grauen Türmen dominiert, deren Fassaden von Glasflächen und violetten Lichtern durchbrochen sind. 

        Technologischer Fortschritt bildet die zentrale Triebfeder der Fenril-Gesellschaft. Geleitet wird die Stadt von mehreren Rudeln. Die drei wichtigsten Rudel konzentrieren sich jeweils auf Militär, Forschung und Aufklärung. An ihrer Spitze steht der Alpha-Fenril Kar Reiszahn, ein gewählter Anführer. Obwohl die Fenril optisch stark an aufrecht gehende Wölfe erinnern, sind sie sehr stolz darauf, ihr animalisches Wesen durch eiserne Disziplin unter Kontrolle zu halten. Allerdings schimmern Aggressivität und Revierverhalten häufiger durch, als der gewöhnliche Fenril jemals zugeben würde.`,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Aktionen}</>,
		base: {
			level: 1,
			maxLife: 100,
			maxActionPoints: 25,
		},
		stats: {
			life: 100,
			actionPoints: 25,
			attack: 5,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["Schattenjäger", "Blutkrieger", "Knochenbrecher"],
	},
	{
		name: "Waldgeist",
		label: (
			<i>
				<GradientText colors={["#91FF5A", "#FF9CFD", "#91FF5A"]}>Waldgeist</GradientText>
			</i>
		),
		ascii: <DryadAscii />,
		description: `Waldgeister sind lebendig gewordene Wesen aus Holz, Pflanzen und Pilzen, die tief im dichten Wald am Fuße der Gebirgskette Leerewall leben. Aufgrund ihrer Präsenz haben die anderen Völker diesem Gebiet den Namen Geisterwald gegeben. Sie betreten den Wald nur äußerst ungern, da die Waldgeister jedes fremde Lebewesen als Eindringling betrachten. Untereinander sind die Waldgeister eng verbunden – ebenso mit den Bäumen, die sie umgeben. Sie teilen ihr Flüstern, ihre Gedanken und Empfindungen miteinander. Nur selten verlassen einzelne Waldgeister ihre Heimat, denn außerhalb empfinden sie die Stille als quälend und bedrückend. 

        Besonders leiden sie unter den wolfsähnlichen Fenril, die ihre Stadt tief im Wald errichtet haben. Diese Wesen erscheinen ihnen wie Ungeheuer, die den Wald absichtlich zerstören wollen. Tag und Nacht töten sie Bäume, ersticken den Boden unter schweren Steinplatten und verbreiten ihr unnatürliches, giftig-violettes Licht. Einige Waldgeister sind bereits so verzweifelt, dass sie zum offenen Angriff gegen diese Eindringlinge übergehen möchten. Andere wiederum wollen die fremden Wesen besser verstehen, um gemeinsam eine Lösung zu finden. Eines jedoch wissen sie alle: Der Wald ist in größter Gefahr und muss dringend beschützt und gerettet werden.`,
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Leben}</>,
		base: {
			level: 1,
			maxLife: 120,
			maxActionPoints: 20,
		},
		stats: {
			life: 120,
			actionPoints: 20,
			attack: 5,
			defense: 5,
			luck: 5,
		},
		economy: {
			gold: 100,
			edelsteine: 0,
		},
		subraces: ["Astläufer", "Blumenkind", "Lebenshüter"],
	},
];

export const racesMap: Record<string, Race> = races.reduce((map, race) => {
	map[race.name] = race;
	return map;
}, {} as Record<string, Race>);
