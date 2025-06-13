import { PlacesKeys } from "../../data/helper/colorfullStrings";
import { GameEvent, WeightedEvent } from "../../data/eventData";
import { gameEvents } from "../../data/eventList";
import { gameQuestEvents } from "../../data/questList";
import { gameBattlesEvents } from "../../data/battleList";

//#region [event by place]
export function getEventByPlace(currentPlace: PlacesKeys): GameEvent | null {
	// 75%-Chance dass überhaupt was passiert
	if (Math.random() > 0.75) {
		return null;
	}

	// alle Events, die dieses place haben
	const relevantEvents = gameEvents.filter((event: GameEvent) =>
		event.places.some((p) => p.place === currentPlace)
	);
	if (relevantEvents.length === 0) {
		return null;
	}

	// randomNum 1..100 => filtern nach probability
	const randomNum = Math.floor(Math.random() * 100) + 1;
	const filteredEvents = relevantEvents.filter((ev) => {
		const placeData = ev.places.find((p) => p.place === currentPlace);
		return placeData && randomNum <= placeData.probability;
	});
	if (filteredEvents.length === 0) {
		return null;
	}

	// wenn mehrere Events infrage kommen, wähle eines
	const pickIndex = Math.floor(Math.random() * filteredEvents.length);
	return filteredEvents[pickIndex];
}
//#endregion

//#region [event by id]
export function getGameEventById(id: string): GameEvent | undefined {
	return gameEvents.find((event) => event.id === id);
}

export function getQuestTriggerById(id: string): GameEvent | undefined {
	return gameQuestEvents.find((event) => event.id === id);
}

export function getBattleTiggerById(id: string): GameEvent | undefined {
	return gameBattlesEvents.find((event) => event.id === id);
}
//#endregion

//#region [random event]

/**
 * @param eventPool - Array von gewichteten Events
 * @param noEventProbability - 0 bis 100 wobei 0 = immer ein Event auslösen
 */
export function pickRandomEvent(eventPool: WeightedEvent[], noEventProbability: number = 0) {
	const totalWeight = eventPool.reduce((sum, e) => sum + e.probability, 0);

	if (Math.random() < noEventProbability) return null;
	if (totalWeight <= 0) return null;

	let randomValue = Math.random() * totalWeight;

	for (const e of eventPool) {
		if (randomValue < e.probability) {
			return e.eventId;
		}
		randomValue -= e.probability;
	}

	return null;
}

//#endregion
