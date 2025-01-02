import { PlacesKeys } from "../data/colorfullStrings";
import { GameEvent, gameEvents, NextEventOption } from "../data/eventData";

//#region [gray]
export function getEventByPlace(currentPlace: PlacesKeys): GameEvent | null {
    // 40%-Chance dass überhaupt was passiert
    if (Math.random() > 0.4) { return null }

    // alle Events, die dieses place haben
    const relevantEvents = gameEvents.filter((event: GameEvent) =>
        event.places.some((p) => p.place === currentPlace)
    );
    if (relevantEvents.length === 0) { return null }

    // randomNum 1..100 => filtern nach probability
    const randomNum = Math.floor(Math.random() * 100) + 1;
    const filteredEvents = relevantEvents.filter((ev) => {
        const placeData = ev.places.find((p) => p.place === currentPlace);
        return placeData && randomNum <= placeData.probability;
    });
    if (filteredEvents.length === 0) { return null }

    // wenn mehrere Events infrage kommen, wähle eines
    const pickIndex = Math.floor(Math.random() * filteredEvents.length);
    return filteredEvents[pickIndex];
}
//#endregion

//#region [gray]
export function getGameEventById(id: string): GameEvent | undefined {
    return gameEvents.find((event) => event.id === id);
}
//#endregion

//#region [gray]
export function pickRandomNextEvent(eventOptions: NextEventOption[]): string | null {
    const totalProbability = eventOptions.reduce((sum, option) => sum + option.probability, 0);
    if (totalProbability <= 0) { return null }

    let randomValue = Math.random() * totalProbability;

    // Ist probability < randomValue wenn ja dann hat das Event gewonnen
    // Wenn nein wird probability vom randomValue abgezogen und die Schleife geht weiter
    // Je größer die Warscheinlichkeit des Events umso mehr "Bereich" hat es in randomValue
    for (const option of eventOptions) {
        if (randomValue < option.probability) {
            return option.eventId;
        }
        randomValue -= option.probability;
    }

    return null;
}
//#endregion