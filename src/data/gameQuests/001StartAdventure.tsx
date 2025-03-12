import { GameEvent } from "../eventData";
import { GameQuest } from "../questData";

export const quest001StartAdventure: GameQuest = {
	id: "Q001StartAdventure",
	label: "Suche den blauen Drachen",
	description:
		"Das {CREATURE.roteWesen} hatte dir geraten den {CREATURE.blauenDrachen} zu besuchen. Einen Grund nannte es nicht und auch nicht wo der Drache zu finden ist.",
	reward:
		"Du wirst viel {SYSTEM.Erfahrung} {Talk|grün}sammeln{/Talk} und dein {SYSTEM.Ruf} wird sich enorm {Talk|grün}verbessern{/Talk}.",
	eventByEnd: "E001StartAdventureEnd",
	progress: {
		type: "Begegnung",
		path: "/house-cat",
		eventByEnd: "E001StartAdventureEnd",
		isDone: false,
		task: { talkWith: "/house-cat" },
	},

	repeat: true,
};

export const event001StartAdventureEnd: GameEvent = {
	id: "E001StartAdventure",
	label: "Kommt noch",
	description: descriptionEnd(),
	buttons: [
		{
			label: "gern geschehen",
			getAction: () => {
				return {
					message: "Kommt noch",
					endQuest: "Q001StartAdventure",
				};
			},
		},
	],
	places: [],
};

function descriptionEnd() {
	return `Kommt noch`;
}
