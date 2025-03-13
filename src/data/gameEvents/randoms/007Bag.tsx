import { GameEvent } from "../../eventData";

//#region [events]
export const event007Bag: GameEvent = {
	id: "007Bag",
	label: "Du findest einen Beutel",
	description: descriptionText(),
	buttons: [
		{
			label: "Beutel aufheben und öffnen",
			getAction: () => ({
				message: message1,
				nextEvents: [
					{ eventId: "008BagFull", probability: 10 },
					{ eventId: "009BagEmpty", probability: 50 },
				],
			}),
		},
		{
			label: "Liegen lassen",
			getAction: () => ({
				message: message2,
			}),
		},
	],
	places: [
		{
			place: "Wald",
			probability: 50,
		},
		{
			place: "Weg",
			probability: 20,
		},
	],
};
//#endregion

function descriptionText() {
	return "Der Boden unter deinen Füßen ist uneben, gepflastert mit Steinen, gesprenkelt von Erde und durchzogen von vereinzelten Gräsern. Dennoch sind die zahlreichen Spuren anderer Wanderer deutlich auf dem festgetretenen Weg erkennbar. Hin und wieder liegen kleine, verlorene Gegenstände vergangener Besucher verstreut herum. Die meisten sind von Wind und Wetter bereits so stark zersetzt, dass du ihnen kaum Beachtung schenkst – bis dich plötzlich ein kleiner lederner Beutel neugierig macht.";
}

const message1 =
	"Deine Neugier gewinnt die Oberhand. Du möchtest wissen, was sich im Inneren des Beutels verbirgt. Du gehst in die Hocke, untersuchst das Lederstück kurz und greifst beherzt danach. Das Leder fühlt sich überraschend weich und geschmeidig an – lange kann es noch nicht auf dem Boden gelegen haben. Vorsichtig blickst du dich nochmals um, um sicherzugehen, dass der ursprüngliche Besitzer nicht in der Nähe ist, doch weit und breit ist niemand zu sehen.";

const message2 =
	"Mit der Überzeugung, dass dieser Beutel ebenso belanglos ist wie die zahllosen Steine neben ihm, setzt du deinen Weg unbeirrt fort. Ein verschmutztes Stück Leder rechtfertigt es kaum, dafür anzuhalten oder sich gar zu bücken. Schlimmstenfalls könnte er sogar giftig sein, eine Falle verbergen oder schlichtweg Müll enthalten.";
