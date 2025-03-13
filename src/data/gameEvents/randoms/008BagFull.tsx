import { getRandomValue } from "../../../utility/Random/RandomValue";
import { GameEvent } from "../../eventData";
import { ItemName, getRandomItem } from "../../gameItems/ItemData";

const possibleItems: ItemName[] = [
	"Plunder",
	"Kupfererz",
	"LeereFlasche",
	"Wasserflasche",
	"Lederstück",
];

//#region [events]
export const event008BagFull: GameEvent = {
	id: "008BagFull",
	label: "Beutel mit wertvollem Inhalt",
	description: descriptionText(),
	buttons: [
		{
			label: "Inhalt einstecken",
			getAction: () => ({
				itemsDelta: { [getRandomItem(possibleItems)]: 1 },
				economyDelta: { gold: getRandomValue(1, 9) },
				message: message1,
			}),
		},
	],
	places: [],
};
//#endregion

function descriptionText() {
	return "Mit dem Daumen streichst du über die Oberfläche, um herauszufinden, ob tatsächlich etwas darin verborgen liegt. Tatsächlich – du spürst, dass sich etwas im Inneren befindet. Du beschließt, den Beutel zu öffnen und sein Geheimnis zu lüften. Langsam ziehst du an der kleinen Kordel und blickst gespannt in die größer werdende Öffnung …";
}

const message1 =
	"Zufrieden steckst du das Gold und das kleine, unerwartete Geschenk ein. In Gedanken bedankst du dich bei dem unbekannten Fremden und setzt vergnügt deinen Weg fort.";
