import { makeAutoObservable } from "mobx";
import { RootStore } from "./rootStore";

import { getRandomFeeling } from "../data/feelingData";
import { getRandomArrayElement } from "../utility/RandomArrayElement";
import { WEATHER, TEMPERATURE } from "../data/helper/weatherStrings";
import { defaultGameStore, GameTime } from "./types";

// Beispiel: deine Zeit-Funktionen
export class TimeStore {
    rootStore: RootStore;

    data: GameTime = defaultGameStore.gameTime;

    private previousGameDay: "Tag" | "Nacht" = this.data.gameDay;
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

        if (this.data.gameTime !== newGameTime || this.data.gameDay !== gameDay) {
            this.data = {
                ...this.data,
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
        this.data = { ...this.data, ...val };
        this.rootStore.saveToLocalStorage();
    }

    newDay() {
        const feeling = getRandomFeeling();
        const weather = getRandomArrayElement(WEATHER);
        const temperature = getRandomArrayElement(TEMPERATURE);

        const { maxLife, maxRounds } = this.rootStore.playerBase.data;
        this.rootStore.playerStats.data.life = maxLife;
        this.rootStore.playerStats.data.rounds = maxRounds;

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
