import { PlacesKeys } from "../data/colorfullStrings";
import { GameEvent, gameEvents } from "../data/eventData";

/**
 * Liefert zufällig ein Event zurück oder null,
 * wenn kein Event getriggert wird.
 */
export function getEventByPlace(currentPlace: PlacesKeys): GameEvent | null {
    // 40%-Chance dass überhaupt was passiert
    if (Math.random() > 0.4) {
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

export function getGameEventById(id: string): GameEvent | undefined {
    return gameEvents.find((event) => event.id === id);
}
