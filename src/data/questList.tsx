import { GameEvent } from "./eventData";
import { event001StartAdventureEnd, quest001StartAdventure } from "./gameQuests/001StartAdventure";
import { event002GoToDiplomaticEnd, quest002GoToDiplomatic } from "./gameQuests/002GoToDiplomatic";
import {
	quest003FindStone,
	event003FindStoneTrigger,
	event003FindStoneEnd,
} from "./gameQuests/003FindStones";
import {
	quest004OneTrash,
	event004OneTrashEnd,
	event004OneTrashTrigger,
} from "./gameQuests/004OneTrash";
import { GameQuest } from "./questData";

export const gameQuests: GameQuest[] = [
	quest001StartAdventure,
	quest002GoToDiplomatic,
	quest003FindStone,
	quest004OneTrash,
];

export const gameQuestEvents: GameEvent[] = [
	event001StartAdventureEnd,
	event002GoToDiplomaticEnd,

	event003FindStoneTrigger,
	event003FindStoneEnd,

	event004OneTrashTrigger,
	event004OneTrashEnd,
];
