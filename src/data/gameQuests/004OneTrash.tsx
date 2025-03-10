import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest004OneTrash: GameQuest = {
	id: "Q004OneTrash",
	label: "Jemand sucht Plunder",
	description:
		"Jemand glaubt im Müll am {PLACES.Südmauer} lägen vergessene Schätze. Bringe etwas zur {ColoredText|weiß|bold}Truhe{/ColoredText} am schwarzen Brett beim {PLACES.Brunnen}.",
	reward:
		"Du wirst gutes {SYSTEM.Gold} {Talk|grün}bekommen{/Talk} aber dein {SYSTEM.Ruf} {Talk|rot}sinkt{/Talk}.",
	eventByEnd: "E004OneTrashEnd",
	progress: {
		type: "Besorgen",
		path: "/fountain-board-service",
		eventByEnd: "E004OneTrashEnd",
		isDone: false,
		task: { haveItem: [{ item: "Plunder", need: 3, count: 0 }] },
	},

	repeat: true,
};

export const event004OneTrashTrigger: GameEvent = {
	id: "E004OneTrashTrigger",
	label: "was dem einen Müll...",
	description: descriptionTrigger(),
	buttons: [
		{
			label: "Annehmen",
			getAction: () => {
				return {
					message: "Du hast die Quest angenommen!",
					triggerQuest: "Q004OneTrash",
				};
			},
		},
		{
			label: "Ablehnen",
			getAction: () => {
				return {
					message: "Du lehntest ab...",
				};
			},
		},
	],
	places: [],
};

export const event004OneTrashEnd: GameEvent = {
	id: "E004OneTrashEnd",
	label: "Den Plunder losgeworden",
	description: descriptionEnd(),
	buttons: [
		{
			label: "gern geschehen",
			getAction: () => {
				return {
					message:
						"Du hast für den Plunder 15 {SYSTEM.Gold} {Talk|grün}bekommen{/Talk} aber dein {SYSTEM.Ruf} {Talk|rot}sinkt{/Talk} um 3.",
					endQuest: "Q004OneTrash",
					itemsDelta: { Plunder: -3 },
					economyDelta: { gold: 15 },
					baseDelta: { leumund: -3 },
				};
			},
		},
	],
	places: [],
};

function descriptionTrigger() {
	return `Einer der Zettel lässt dich stutzen, als du aus den Augenwinkeln das Wort {MultiColoredLetters|braunColors}„Müll“{/MultiColoredLetters} erkennst. Auch beim zweiten Blick steht dort tatsächlich {MultiColoredLetters|braunColors}„Müll“{/MultiColoredLetters}. Jemand möchte, dass du zum Müllberg an der {PLACES.Südmauer} gehst und dort nach wertvollen Schätzen suchst. Der Verfasser ist überzeugt, dass viele Menschen ihren Plunder wegwerfen, obwohl er noch von großem Wert sein könnte. Du ahnst jedoch, dass es deinem Ruf nicht gerade guttun wird, wenn du im Müll herumwühlst.`;
}

function descriptionEnd() {
	return `Kurz zögerst du und fragst dich, ob das {CREATURE.geflügelteWesen} überhaupt zulassen wird, dass du deinen Fund aus dem Müllberg in die kleine Truhe legst. Tatsächlich könnte das stinkende Etwas mit viel Mühe vielleicht noch brauchbar sein … aber war es das wirklich wert?

Ungläubig starrt das {CREATURE.geflügelteWesen} auf den Gegenstand, den du gerade aus deinem Beutel gezogen hast.
{Talk|pink}„Was dem einen Müll …“{/Talk} beginnt es zu quieken, {Talk|pink}„… ist für mich ebenfalls Müll! Aber wer bin ich, das zu beurteilen?“{/Talk} Widerwillig nimmt das Wesen den Plunder entgegen – und reicht dir als Belohnung ein paar {MultiColoredLetters|yellowColors}Münzen{/MultiColoredLetters}.`;
}
