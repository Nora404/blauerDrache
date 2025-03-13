import { GameEvent } from "../../eventData";

//#region [events]
export const event009BagEmpty: GameEvent = {
	id: "009BagEmpty",
	label: "Der Beutel ist leer",
	description: descriptionText(),
	buttons: [
		{
			label: "Den leeren Beutel weg werfen",
			getAction: () => ({
				message: message1,
			}),
		},
		{
			label: "Den leeren Beutel einstecken",
			getAction: () => ({
				itemsDelta: { Lederstück: 1 },
				message: message2,
			}),
		},
	],
	places: [],
};
//#endregion

function descriptionText() {
	return "Nachdem du den Beutel nun in den Händen hältst, bemerkst du schnell, dass er flach und leer ist. Du betrachtest ihn von allen Seiten und stellst enttäuscht fest, dass er kaum mehr ist als ein altes Stück Leder, das keinerlei Gegenstände mehr halten könnte.";
}

const message1 =
	"Du erkennst, dass der Beutel vermutlich absichtlich weggeworfen wurde, und siehst keinen Grund, es nicht genauso zu handhaben. Enttäuscht lässt du das alte Stück Leder zurück auf den Boden fallen und setzt deinen Weg fort, ohne dich noch einmal umzudrehen.";

const message2 =
	"Obwohl das Stück Leder als Beutel nicht mehr brauchbar ist, erkennst du seinen Wert als Rohstoff. Du beschließt, es einzustecken, um es später weiterzuverarbeiten oder zu verkaufen. Mit diesem Gedanken setzt du deinen Weg zufrieden fort.";
