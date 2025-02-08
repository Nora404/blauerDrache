import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

import { getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/Random/RandomArrayElement";
import { WEATHER, TEMPERATURE } from "../data/helper/weatherStrings";
import { defaultGameStore, GameTime, DayNames } from "./types";

// neu: Optional als Hilfsarray für die Wochentage
const WEEKDAY_NAMES: DayNames[] = [
    "Motag",
    "Litag",
    "Metag",
    "Watag",
    "Dutag",
    "Widtag",
    "Fetag",
];

export class TimeStore {
    rootStore: RootStore;

    data: GameTime = defaultGameStore.gameTime;
    private intervalId: number;

    // neu: Speichert, welcher "Minute"-Wert zuletzt gerendert wurde,
    // um nur alle 10 Ingame-Minuten ein Update zu machen
    private previousMinute: number = -1;

    // geändert: Wir merken uns den letzten Spiel-Zustand Tag/Nacht,
    // um bei Wechsel von Nacht -> Tag newDay() aufzurufen
    private previousGameDay: "Tag" | "Nacht" = this.data.gameDay;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });

        // geändert: Interval kürzer (z.B. jede Sekunde),
        // da wir jetzt die Zeit selbst hochzählen
        this.intervalId = window.setInterval(() => {
            this.updateGameTime();
        }, 1000);
    }

    updateGameTime() {
        // neu: Anstatt Systemzeit zu berechnen, zählen wir die Spielsekunden hoch
        this.data.accumulatedSeconds += 24;

        // Wie viele Sekunden sind in diesem Spiel-"Tag" (24h = 86400s) bereits vergangen?
        const daySeconds = this.data.accumulatedSeconds % 86400;
        const hours = daySeconds / 3600;
        const currentHour = Math.floor(hours);
        const currentMinute = Math.floor((hours - currentHour) * 60);

        // Tag/Nacht berechnen
        const gameDay: "Tag" | "Nacht" = hours < 6 || hours >= 20 ? "Nacht" : "Tag";

        // Wenn es gerade von Nacht auf Tag wechselt, einen neuen Tag starten
        if (this.previousGameDay === "Nacht" && gameDay === "Tag") {
            this.newDay();
        }
        this.previousGameDay = gameDay;

        // Nur alle 10 Ingame-Minuten aktualisieren (rendern/speichern):
        if (currentMinute % 10 === 0 && currentMinute !== this.previousMinute) {
            const hh = String(currentHour).padStart(2, "0");
            const mm = String(currentMinute).padStart(2, "0");

            this.data.gameTime = `${hh}:${mm}`;
            this.data.gameDay = gameDay;

            this.rootStore.saveToLocalStorage();
            this.previousMinute = currentMinute;
        }
    }

    setGameTime(val: Partial<GameTime>) {
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    newDay() {
        // neu: Gesamtanzahl der Spieltage hochzählen
        this.data.countDays += 1;

        // neu: Wochentag anhand countDays bestimmen (z.B. countDays % 7)
        this.data.dayName = WEEKDAY_NAMES[this.data.countDays % WEEKDAY_NAMES.length];

        // Rest wie gehabt
        const feeling = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        const { maxLife, maxActionPoints } = this.rootStore.playerBase.data;
        this.rootStore.playerStats.data.life = maxLife;
        this.rootStore.playerStats.data.actionPoints = maxActionPoints;

        this.rootStore.playerFlux.data.buff = {};
        this.rootStore.playerFlux.data.debuff = {};
        this.rootStore.playerFlux.data.feeling = feeling.name;

        this.rootStore.gameState.data.weather = weather;
        this.rootStore.gameState.data.temperature = temperature;

        this.rootStore.saveToLocalStorage();
    }

    clear() {
        clearInterval(this.intervalId);
    }
}
