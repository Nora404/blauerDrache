import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest002GoToDiplomatic: GameQuest = {
	id: "Q002GoToDiplomatic",
	label: "Melde dich im Rathaus",
	description:
		"Um dein neues Leben zu beginnen solltest du dich im {PLACES.Rathaus} melden und ein offizieller Bürger Lahtheims werden.",
	reward:
		"Du wirst {SYSTEM.Erfahrung} {Talk|grün}sammeln{/Talk} und dein {SYSTEM.Ruf} wird sich etwas {Talk|grün}verbessern{/Talk}.",
	eventByEnd: "E002GoToDiplomaticEnd",
	progress: {
		type: "Begegnung",
		path: "/townhall-calling-quest",
		eventByEnd: "E002GoToDiplomaticEnd",
		isDone: false,
		task: { talkWith: "/townhall-calling-quest" },
	},

	repeat: true,
};

export const event002GoToDiplomaticEnd: GameEvent = {
	id: "E002GoToDiplomatic",
	label: "Kommt noch",
	description: descriptionEnd(),
	buttons: [
		{
			label: "gern geschehen",
			getAction: () => {
				return {
					message: "Kommt noch",
					endQuest: "Q002GoToDiplomatic",
				};
			},
		},
	],
	places: [],
};

function descriptionEnd() {
	return `Kommt noch`;
}
