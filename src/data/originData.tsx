import { PlayerStats, PlayerBase, PlayerEconomy } from "../store/types";
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
	| "Blütenlicht"
	| "Unbekannt"
	| "Lebenshüter";

export type Origin = {
	name: OriginName | "Unbekannt";
	race: RaceName | "Unbekannt";
	label: JSX.Element;
	description: string;
	bonus: JSX.Element;
	stats: Partial<PlayerStats>;
	base: Partial<PlayerBase>;
	economy: Partial<PlayerEconomy>;
};

export const emptyOriginObj: Origin = {
	name: "Unbekannt",
	race: "Unbekannt",
	label: <GradientText colors={["#eeeeee", "#dddddd"]}>Unbekant</GradientText>,
	description: "Es gibt keine Beschreibung",
	bonus: <>Du erhältst einen Bonus auf ... Nichts!</>,
	base: {},
	stats: {},
	economy: {},
};

export const origins: Origin[] = [
	{
		name: "Stadtmensch",
		race: "Mensch",
		label: <GradientText colors={["#eeeeee", "#dddddd"]}>Stadtmensch</GradientText>,
		description:
			"Dein ganzes bisheriges Leben hast du in den engen Straßen von Lahtheim verbracht. Das klappernde Hufgetrappel auf dem Pflaster, der würzige Duft von gebratenem Fleisch und der unaufhörliche Lärm geschäftiger Händler waren deine Welt. Doch jetzt? Jetzt ist dir das alles zu viel geworden. Die Enge, der Gestank, das ständige Geschnatter – höchste Zeit, etwas Neues zu sehen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
		base: {},
		stats: {},
		economy: {
			gold: 50,
		},
	},
	{
		name: "Dörfler",
		race: "Mensch",
		label: <GradientText colors={["#5BCF57", "#CFAD67", "#5BCF57"]}>Dörfler</GradientText>,
		description:
			"Weite Wiesen, goldene Felder voller Korn und Obstbäume, die sich unter ihrer Last biegen – das war deine Heimat. Du kanntest jedes freilaufende Tier beim Namen und jeden Nachbarn, der dir täglich „Guten Tag“, „Guten Mittag“ und „Guten Abend“ wünschte. Doch mit der Zeit wurde das Idyll zur Routine, und die Welt hinter den Feldern begann zu rufen. Also packst du deine Sachen und machst dich auf den Weg – dorthin, wo dein Name noch unbekannt ist.",
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
		race: "Mensch",
		label: <GradientText colors={["#ffcccb", "#ff9999"]}>Wanderer</GradientText>,
		description:
			"Der Boden war dein Bett, der Himmel deine Decke. Kein Dach über dem Kopf, aber auch keine Fesseln aus Verpflichtungen. Während andere sich in ihren Häusern um Rechnungen und Hofarbeiten kümmern, trägst du nur die Sorgen eines leeren Magens – und die Hoffnung, dass sich irgendwo ein guter Schluck „Glücklichmacher“ auftreiben lässt. Doch das Leben als Vagabund hat dich gelehrt, dass Freiheit ihren Preis hat. Vielleicht ist es an der Zeit, herauszufinden, ob jenseits der Straßen nicht noch etwas anderes auf dich wartet.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
		base: {
			level: 3,
		},
		stats: {},
		economy: {},
	},
	{
		name: "Nachtelf",
		race: "Elf",
		label: <GradientText colors={["#746FF5", "#6E5AB0"]}>Nachtelf</GradientText>,
		description:
			"Deine Verbindung zur Magie ist besonders stark. Du glaubst, die Elemente nicht nur spüren, sondern sogar sehen zu können. Einst lebten die Nachtelfen nördlich des Bergkamms, in einem Land, das nur wenig Licht kannte. Doch Dunkelheit war nie ein Hindernis – eure Sinne haben euch gelehrt, die Welt auf andere Weise wahrzunehmen. Heute hilft dir diese Gabe in deinen Forschungen zur Magie, aber du weißt: Die Mauern von Pa‘ras sind nicht genug. Um wirklich zu verstehen, musst du hinaus in die Welt.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {},
		stats: {
			defense: 5,
		},
		economy: {},
	},
	{
		name: "Hochelf",
		race: "Elf",
		label: <GradientText colors={["#F1F586"]}>Hochelf</GradientText>,
		description:
			"Dein höchstes Ziel ist es, Wissen zu sammeln und die Geschichte deines Volkes zu bewahren. Unzählige Nächte hast du in alten Schriften verbracht, hast Vorlesungen besucht und Theorien hinterfragt. Doch irgendwann gibt es nichts Neues mehr zu lernen – zumindest nicht hier, in den Hallen der blauen Stadt. Nun ist es an der Zeit, hinauszuziehen und zu erfahren, was die Welt jenseits der Bücher zu bieten hat.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
		base: {
			level: 3,
		},
		stats: {},
		economy: {},
	},
	{
		name: "Waldelf",
		race: "Elf",
		label: <GradientText colors={["#228B22", "#32CD32"]}>Waldelf</GradientText>,
		description:
			"Deine Verbindung zur Natur ist beinahe so tief wie die der legendären Fean. Du hörst das Flüstern des Waldes, spürst das Plätschern der Flüsse, als wären sie lebendige Wesen. Den Wald zu schützen, ihn zu bewahren – das war immer deine Aufgabe. Doch in letzter Zeit ist etwas anders. Der Fluss fließt unruhiger, die Bäume rauschen mit einer warnenden Stimme. Eine Unruhe liegt in der Luft. Was auch immer es ist, du kannst nicht länger warten. Es ist Zeit, der Warnung auf den Grund zu gehen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Aktionen}</>,
		base: {
			maxActionPoints: 5,
		},
		stats: {
			actionPoints: 5,
		},
		economy: {},
	},
	{
		name: "Steinklopfer",
		race: "Zwerg",
		label: <GradientText colors={["#D48960", "#D4B38D"]}>Steinklopfer</GradientText>,
		description:
			"Du gehörst zu den Steinklopfern – jenen, die die härteste und gefährlichste Arbeit verrichten. Oder schlimmer noch: Du bist einer der wenigen, die gezwungen sind, die Tiefen zu verlassen, um an Rohstoffe zu gelangen. In den Augen anderer Zwerge bist du kaum mehr als ein notwendiges Übel. Man sagt, der Himmel verachte die Zwerge, und nur ein Steinklopfer sei so wertlos, dass nicht einmal der Himmel ihn verschlingen wolle. Doch du zweifelst daran. Die Welt außerhalb des Steins kann nicht schlimmer sein als das, was du hier täglich erträgst.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {},
		stats: {
			defense: 5,
		},
		economy: {},
	},
	{
		name: "Metallschürfer",
		race: "Zwerg",
		label: <GradientText colors={["#B0C4DE", "#4682B4"]}>Metallschürfer</GradientText>,
		description:
			"Du wurdest in den Mittelstand geboren und hast ein angesehenes Handwerk erlernt. Gold ist dein täglich Brot, Silber dein Wasser. In Konyur finden regelmäßig große Handwerkerwettbewerbe statt, und du hast voller Stolz daran teilgenommen. Viele setzten auf deinen Sieg – doch du wurdest geschlagen. Dein Rivale nutzte seltenes Holz, während du dem traditionellen Stein treu geblieben bist. Eine Niederlage, die dich nicht loslässt. Holz ist teuer, viel zu teuer, doch du hast eine Entscheidung getroffen: Wenn du besondere Materialien brauchst, wirst du sie dir selbst besorgen – und wenn das bedeutet, die Tiefen zu verlassen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
		base: {},
		stats: {},
		economy: {
			gold: 50,
		},
	},
	{
		name: "Edelsteinfürst",
		race: "Zwerg",
		label: <GradientText colors={["#FFD700", "#FFA500"]}>Edelsteinfürst</GradientText>,
		description:
			"Du wurdest in den Adel geboren und hast nie eine Spitzhacke in die Hand nehmen müssen. Edelsteine zieren deine Gewänder, feinste Stoffe schmiegen sich an deinen wohlgenährten Zwergenkörper. Doch während die Steinklopfer Fels zerschlagen und die Handwerker Meisterwerke erschaffen, ist deine Welt von einem anderen Kampf geprägt: Intrigen. In der Oberschicht ist nicht der Stärkste der Gewinner, sondern der Listigste. Und nun hat jemand ein Netz gesponnen, das sich um dich zusammenzieht. Eine Intrige, die dich zwingt, unterzutauchen. Doch du hast noch eine Trumpfkarte: Viele innerhalb und außerhalb von Konyur schulden dir Gold. Vielleicht ist es an der Zeit, einige alte Freunde zu besuchen und Schulden einzutreiben.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Edelsteine}</>,
		base: {},
		stats: {},
		economy: {
			edelsteine: 1,
		},
	},
	{
		name: "FelsImHimmel",
		race: "Echse",
		label: (
			<GradientText colors={["#eeeeee", "#bbbbbb", "#ffffff", "#cccccc"]}>
				Fels-im-Himmel
			</GradientText>
		),
		description:
			"Deine Gemeinschaft lebt überwiegend im Schutz der Felsen. Ihr habt den Leerenwall, die gewaltige Gebirgskette im Norden, stets im Rücken und den Blick in die Weite gerichtet. Doch das Land ist karg – Nahrung ist selten, Wasser noch seltener. Mit jedem Tag wird das Überleben mühsamer. Du weißt, dass du den Schutz des Felsens verlassen musst, auch wenn die Weite Gefahren birgt. Vielleicht findest du dort draußen einen Weg, um deine Familie vor dem Hunger zu bewahren.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {},
		stats: {
			defense: 5,
		},
		economy: {},
	},
	{
		name: "SandImWind",
		race: "Echse",
		label: <GradientText colors={["#DEB887", "#F4A460"]}>Sand-im-Wind</GradientText>,
		description:
			"Sand am Boden, Sand in der Luft. Deine Augen sehen kaum etwas anders als Sand. Du wanderst mit deiner Gemeinschaft von Oase zu Oase, rastet dort und wandert weiter. Die heißen Winde haben deine Schuppen widerstandsfähig gemacht, doch die Sandstürme nehmen zu. Sie werden heftiger, unberechenbarer. Niemand scheint sich daran zu stören – außer dir. Irgendetwas stimmt nicht. Du hast Geschichten gehört, geflüsterte Worte von anderen Echsen im Lager: von einem uralten Golem, der den Sand selbst befehligen soll. Eine Legende? Oder steckt mehr dahinter? Neugierde erwacht in dir.",
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
		race: "Echse",
		label: <MultiColoredLetters colors={grayColors}>Knochen-im-Fels</MultiColoredLetters>,
		description:
			"Einige Felswände stehen so dicht beieinander, dass selbst das Licht des Tages sie nicht erreicht. In dieser ewigen Dämmerung hat deine Gemeinschaft ihren Platz gefunden – in den tiefen Höhlen, verborgen im Sandstein. Nicht weit entfernt liegt der Knochengarten, ein heiliger Ort, an dem die großen Sandwanderer sterben. Ihre mächtigen Überreste sind für euch so wertvoll wie Nahrung und Wasser – doch in letzter Zeit werden sie seltener. Immer weniger dieser Wesen finden ihren Weg hierher. Und es gibt ein weiteres Problem: Echsen aus deiner Gemeinschaft verschwinden spurlos, wenn sie sich zu weit von den Höhlen entfernen. Die Ältesten haben dich ausgesandt, um Antworten zu finden – oder Hilfe.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
		base: {},
		stats: {
			attack: 5,
		},
		economy: {},
	},
	{
		name: "GeisterSchamane",
		race: "Ork",
		label: <MultiColoredLetters colors={lilaColors}>Geister Schamane</MultiColoredLetters>,
		description:
			"Du gehörst zur Bruderschaft der Geister. Als Schamane ist es deine Aufgabe, die Geister friedlich zu stimmen und ihren Willen zu deuten. Doch ihre Worte sind oft verschwommen, wie ein Traum, der mit dem Morgengrauen vergeht. Doch der letzte Geist sprach klar. Er sprach von einer Gefahr jenseits des Düsterbruchs. Und nicht nur das – auch andere Geister wirkten seltsam. Anders als sonst. Du kannst nicht sagen, was genau sich verändert hat, aber eines haben sie alle gemeinsam: eine unbestimmte Angst vor dem Nichts.",
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
		race: "Ork",
		label: <GradientText colors={["#C2C2C2", "#DED968", "#C2C2C2"]}>Runen Wächter</GradientText>,
		description:
			"Du gehörst zur Bruderschaft der Runen. Als Wächter beschützt du die vergessenen Ruinen und die Geheimnisse, die in ihren alten Steinen verborgen liegen. Euer Glaube besagt, dass dies einst die Heimstätte des blauen Drachen war, und es ist eure Aufgabe, sie vor Entweihung zu bewahren. Doch immer wieder versuchen Ungläubige, die Ruinen zu betreten – oder schlimmer noch, etwas aus ihnen zu entwenden. Ausgerechnet während deiner Wache ist es ihnen gelungen. Ein Artefakt wurde gestohlen, sein Zweck und seine Macht noch unbekannt. Doch eines ist sicher: Es muss zurückgebracht werden. Und du bist dazu verdonn… auserwählt worden.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Aktionen}</>,
		base: {
			maxActionPoints: 5,
		},
		stats: {
			actionPoints: 5,
		},
		economy: {},
	},
	{
		name: "NebelSammler",
		race: "Ork",
		label: <GradientText colors={["#EB3F3F", "#A9A9A9"]}>Nebel Sammler</GradientText>,
		description:
			"Du gehörst zur Bruderschaft der Nebel. Während andere an den blauen Drachen glauben, verehrt ihr die Ersten – uralte Wesen, deren Macht über allem steht. Eure Rituale verlangen Opfergaben, wertvolle Gaben, um ihre Gunst zu erlangen. Doch dein letzter Besuch in den vergessenen Ruinen, um diesen Glauben zu beweisen, war ein Fehlschlag. Die Ersten blieben stumm. Keine Zeichen, kein Flüstern. Es war, als hätten sie euch verlassen. Etwas muss gefunden werden. Etwas, das ihren Zorn besänftigt und sie gnädig stimmt. Doch hier im Sumpf gibt es nichts mehr, das ihnen würdig wäre. Also bleibt dir keine Wahl – du musst Düsterbruch verlassen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
		base: {
			level: 3,
		},
		stats: {},
		economy: {},
	},
	{
		name: "Goldfell",
		race: "Felkin",
		label: <GradientText colors={["#FFD700", "#FFA500"]}>Goldfell</GradientText>,
		description:
			"Du gehörst zu den Händlern und Täuschern. Kein Felkin kennt die Seilbrücken und gewundenen Bergpfade so gut wie du. Du handelst mit jedem – egal ob Felkin, Mensch oder Zwerg. Während die Menschen sich köstlich über eure Streiche aufregen, sind die Zwerge schwerer zu beeindrucken. Doch ihre Goldstücke klimpern angenehm in der Tasche, und ihre Ware ist von unschätzbarem Wert. Dein Geschäft läuft gut – bis ein Kunde auftaucht, der nach Wissen über das Nichts sucht. Für gewöhnlich kannst du alles besorgen, doch dieses Thema ist selbst dir zu … exotisch. Bevor du eine Entscheidung triffst, wirst du selbst nach Antworten suchen. Eine neue Reise beginnt.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Gold}</>,
		base: {},
		stats: {},
		economy: {
			gold: 50,
		},
	},
	{
		name: "Mondauge",
		race: "Felkin",
		label: (
			<GradientText colors={["#1E90FF", "#87CEFA", "#BBDDFF", "#1E90FF"]}>Mondauge</GradientText>
		),
		description:
			"Sie nennen dich Mondauge, einen der Felkin, die am liebsten nachts unterwegs sind. Kein Verbot, keine Gefahr hält dich auf – dein Leben ist ein Tanz auf dünnem Eis, eine Jagd nach Nervenkitzel. Was wäre das Leben ohne ein wenig Schabernack? Selbst der Berg ist dir längst zu klein. Also bist du hinaufgestiegen, bis zur höchsten Spitze, wo die Luft eisig und der Wind beißend ist. Fast hättest du dir die Schwanzspitze abgefroren – doch was du dort oben sahst, ließ dich erstarren: Der Himmel selbst zersplitterte, feine Risse zogen sich durch die Dunkelheit, und in der Ferne tanzten violette Energien wie flackernde Blitze. Ein unwohles Gefühl durchfährt dich. Was immer das ist – du willst es nicht wissen. Zumindest noch nicht. Jetzt ist erst einmal Zeit, woanders deinen Spaß zu suchen. Weit weg vom Berg.",
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
		race: "Felkin",
		label: <GradientText colors={["#AC7CEB", "#EB3F3F", "#8A2BE2"]}>Schattenkralle</GradientText>,
		description:
			"Deine Zähne sind scharf, deine Klauen tödlich. Du bist eine Schattenkralle, Jäger der Berge, Versorger der Felkin. Fell, Fleisch, Knochen – du bringst es heim. Und doch jagst du nicht allein. Zwischen dir und den anderen Schattenkrallen herrscht ein stummer Wettkampf. Wer bringt die wertvollste Trophäe? Bald beginnt das Fest der Perlen. Du willst Eindruck machen, nicht mit irgendeinem erlegten Tier, sondern mit etwas wirklich Großem. Doch die Beute in den Bergen wird rar. Die Wildtiere sind unruhig. In den letzten Tagen hast du Spuren gefunden, die dir nicht gefallen: Fährten von etwas, das nicht hierher gehört. Um die Trophäe zu holen, die dir Ruhm und Ehre bringen wird, musst du den Berg verlassen. Vielleicht findest du im Tal, was du suchst – oder die Antwort darauf, warum die Jagd in den Bergen auf einmal so schwer geworden ist.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Aktionen}</>,
		base: {
			maxActionPoints: 5,
		},
		stats: {
			actionPoints: 5,
		},
		economy: {},
	},
	{
		name: "Schattenjäger",
		race: "Fenril",
		label: <GradientText colors={["#9AA7C2", "#86DEE3", "#708090"]}>Schattenjäger</GradientText>,
		description:
			"Als Mitglied des Rudels der Schattenjäger bist du befugt, mit Elfen und Zwergen zu verhandeln, um neues Wissen oder wertvolle Materialien für Tekron zu erwerben. Deine eigentliche Aufgabe jedoch liegt in der Beobachtung und Sicherung der äußeren Grenzen sowie im Melden potenzieller Gefahren oder Eindringlinge. Die Grenzen deiner Missionen sind dabei weit gefasst, und deine Einsätze können Tage oder sogar Wochen dauern. Auf einer deiner letzten Missionen hast du beunruhigende Gerüchte vernommen: Von einer mysteriösen Krankheit bei den Elfen ist die Rede, ebenso von einem Zwergenkönig, der angeblich dem Wahnsinn verfallen sei. Zum Schutz Tekrons liegt es nun an dir, diesen Hinweisen nachzugehen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Level}</>,
		base: {
			level: 3,
		},
		stats: {},
		economy: {},
	},
	{
		name: "Blutkrieger",
		race: "Fenril",
		label: <GradientText colors={["#ED4E4E", "#E36D34"]}>Blutkrieger</GradientText>,
		description:
			"Du bist stolzes Mitglied des Rudels der Blutkrieger, des militärischen Zweigs der Fenril-Gesellschaft. Als erfahrener Soldat hast du Tekrons Grenzen bewacht und die Stadt erfolgreich gegen die terroristischen Waldgeister verteidigt. Du hast dir rasch einen Namen gemacht und durftest schon bald eigene Einsätze anführen – bis du während einer Mission einen Untergebenen an die Waldgeister verloren hast. Seither wirft man dir Feigheit vor, und statt bedeutender Aufgaben warten nur noch eintönige Patrouillen auf dich. Doch dein Instinkt sagt dir, dass mit dem Wald etwas nicht stimmt. Unter spöttischen Bemerkungen und erneut als feiger „Angstwelpe“ verhöhnt, wirst du offiziell losgeschickt, um den seltsamen Vorgängen im Wald nachzugehen. In deinem Inneren weißt du jedoch, dass niemand wirklich mit deiner Rückkehr rechnet.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Angriff}</>,
		base: {},
		stats: {
			attack: 5,
		},
		economy: {},
	},
	{
		name: "Knochenbrecher",
		race: "Fenril",
		label: <MultiColoredLetters colors={grayColors}>Knochenbrecher</MultiColoredLetters>,
		description:
			"Mitglieder des Rudels der Knochenbrecher schmunzeln mittlerweile über diesen veralteten Begriff, der aus einer Zeit stammt, in der Felkin noch lebende Beute jagten und ihr Fleisch bis auf die Knochen herunterrissen, wobei die Knochen oft zerbrachen. Einige findige Felkin nahmen diese Knochen und erschufen daraus ihre ersten Waffen. Dieser Geist der Innovation lebt in dir weiter, während du an neuen Technologien forschst, um die Felkin-Gesellschaft voranzubringen. Doch nach einem schweren Unfall wurde der Begriff „Knochenbrecher“ auf schmerzhafte Weise wieder aktuell - und du wurdest bis auf Weiteres „beurlaubt“.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {},
		stats: {
			defense: 5,
		},
		economy: {},
	},
	{
		name: "Astläufer",
		race: "Waldgeist",
		label: (
			<GradientText colors={["#D99966", "#228B22", "#D99966", "#32CD32"]}>Astläufer</GradientText>
		),
		description:
			"Dein Körper besteht aus hölzernen Fasern, gewundenen Ranken und frischen, grünen Blättern. Besonders gut kannst du die Bäume hören und ihren Geschichten von fernen Orten und längst vergangenen Zeiten lauschen. Früher hast du gerne dabei geholfen, den Hain Fayloria mitzugestalten und für deine Geschwister ein Zuhause zu erschaffen. Heute jedoch bist du gezwungen, aktiv gegen die Ungeheuer zu kämpfen, die den Wald bedrohen. Doch neuerdings flüstern die Bäume von einer noch viel größeren Gefahr – und davon, dass du den blauen Drachen suchen musst. Widerwillig versprichst du, ihn zu finden, auch wenn es bedeutet, deine geliebte Heimat hinter dir zu lassen.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Verteidigung}</>,
		base: {},
		stats: {
			defense: 5,
		},
		economy: {},
	},
	{
		name: "Blütenlicht",
		race: "Waldgeist",
		label: <MultiColoredLetters colors={rosaColors}>Blütenlicht</MultiColoredLetters>,
		description:
			"Dein Körper besteht aus zarten Pflanzenfasern, geschmückt mit farbenfrohen Blüten und filigranen, leuchtenden Mustern. Oft hast du dich an den Rand des Waldes gewagt, um voller Bewunderung die weiten Wiesen mit ihren unzähligen Blumen zu betrachten. Deine Neugierde, diese fremden Blüten kennenzulernen, ließ dich fast vergessen, wie still es außerhalb des Waldes ist. Doch insgeheim genießt du es, dem sanfteren Flüstern der Wiesenblumen zuzuhören. Nach einem schweren Angriff der Ungeheuer wurde deine letzte Verbindung zum Herzen des Waldes durchtrennt – nun ist es die weite Welt, die nach dir ruft.",
		bonus: <>Du erhältst einen Bonus auf {SYSTEM.Aktionen}</>,
		base: {
			maxActionPoints: 5,
		},
		stats: {
			actionPoints: 5,
		},
		economy: {},
	},
	{
		name: "Lebenshüter",
		race: "Waldgeist",
		label: <GradientText colors={["#84BD3A", "#31BD4A", "#9ABD39"]}>Lebenshüter</GradientText>,
		description:
			"Ein Gemisch aus Moosen, Pilzen und verwitterten Steinen formt deinen robusten, kräftigen Körper. Im Gegensatz zu deinen Geschwistern bist du weniger filigran, dafür deutlich widerstandsfähiger gebaut. Aus diesem Grund fiel dir auch die schwere Aufgabe zu, gegen die Ungeheuer tief im Wald zu kämpfen. Obwohl du alles tun würdest, um deine Heimat zu beschützen, widerstrebt es dir zutiefst, einem anderen Lebewesen Schaden zuzufügen. Doch kürzlich gelang es dir, eines der fremden Wesen gefangen zu nehmen. Es sagte kein Wort, doch seine Waffen waren furchteinflößend genug, um dir klarzumachen, dass ihr allein keine Chance habt. So übertrugen deine Geschwister dir erneut eine unangenehme, aber notwendige Aufgabe: Du sollst den Wald verlassen und Hilfe suchen.",
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

export const originMap: Record<string, Origin> = origins.reduce((map, originObj) => {
	map[originObj.name] = originObj;
	return map;
}, {} as Record<string, Origin>);

export const getOriginByRaces = (raceName: RaceName) => {
	const race = racesMap[raceName];
	if (!race) return [emptyOriginObj];
	return race.subraces.map((originName) => originMap[originName] || emptyOriginObj);
};
