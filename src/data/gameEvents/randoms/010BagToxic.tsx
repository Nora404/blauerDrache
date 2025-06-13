import { GameEvent } from "../../eventData";

//#region [events]
export const event010BagToxic: GameEvent = {
	id: "010BagToxic",
	label: "Giftige Wolke",
	description: descriptionText(),
	buttons: [
		{
			label: "Beutel öffnen",
			getAction: () => ({
				fluxDelta: { debuff: { Vergiftung: 1 } },
				stateDelta: { actionPoints: -1 },
				message: message1,
			}),
		},
	],
	places: [],
};
//#endregion

function descriptionText() {
	return "Zögernd nimmst du den Beutel in die Hand. Kaum öffnest du ihn, entweicht eine düstere, giftige Wolke, die einen widerlichen Gestank verströmt. Ein stechendes Brennen und Jucken breitet sich auf deiner Haut aus.";
}

const message1 =
	"Der faulige Geruch ist kaum auszuhalten – während sich die Wolke über dich legt, spürst du, wie der Vergiftungseffekt einsetzt und dir ein Aktionspunkt entzogen wird.";
