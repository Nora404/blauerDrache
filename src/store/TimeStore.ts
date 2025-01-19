import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

import { getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { WEATHER, TEMPERATURE } from "../data/weatherStrings";
import { defaultGameStore, GameTime } from "./types";

// Beispiel: deine Zeit-Funktionen
export class TimeStore {
    rootStore: RootStore;

    store: GameTime = defaultGameStore.gameTime;

    private previousGameDay: "Tag" | "Nacht" = this.store.gameDay;
    private intervalId: any;

    constructor(root: RootStore) {
        this.rootStore = root;
        makeAutoObservable(this, {}, { autoBind: true });

        // Achtung: Nur sinnvoll, wenn dieser Store wirklich nur einmal erzeugt wird
        this.intervalId = setInterval(() => {
            this.updateGameTime();
        }, 10000);
    }

    updateGameTime() {
        const now = new Date();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSeconds = minutes * 60 + seconds;
        const gameHours = (totalSeconds / 3600) * 24;

        const gameDay: "Tag" | "Nacht" = (gameHours < 6 || gameHours > 20) ? "Nacht" : "Tag";

        // Stunden + Minuten in z.B. "08:00"
        const hh = String(Math.floor(gameHours) % 24).padStart(2, "0");
        let mm = Math.floor((gameHours - Math.floor(gameHours)) * 60);
        mm = Math.floor(mm / 10) * 10;

        const newGameTime = `${hh}:${String(mm).padStart(2, "0")}`;

        if (this.store.gameTime !== newGameTime || this.store.gameDay !== gameDay) {
            this.store = {
                ...this.store,
                gameTime: newGameTime,
                gameDay,
            };

            this.rootStore.saveToLocalStorage();

            if (this.previousGameDay === "Nacht" && gameDay === "Tag") {
                this.newDay();
            }

            this.previousGameDay = gameDay;
        }
    }

    setGameTime(val: Partial<GameTime>) {
        this.store = { ...this.store, ...val };
        this.rootStore.saveToLocalStorage();
    }

    newDay() {
        const feeling = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        const { maxLife, maxRounds } = this.rootStore.playerBase.store;
        this.rootStore.playerStats.store.life = maxLife;
        this.rootStore.playerStats.store.rounds = maxRounds;

        this.rootStore.playerFlux.store.buff = {};
        this.rootStore.playerFlux.store.debuff = {};
        this.rootStore.playerFlux.store.feeling = feeling.name;

        this.rootStore.gameState.store.weather = weather;
        this.rootStore.gameState.store.temperature = temperature;

        this.rootStore.saveToLocalStorage();
    }

    clear() {
        clearInterval(this.intervalId);
    }
}
