import { GameBattle } from "../battleData";
import { GameEvent } from "../eventData";

export const battle001RatOnStreet: GameBattle = {
  id: "B001RatOnStreet",
  label: "Ratte auf der Straße",
  description: "Eine Ratte läuft über die Straße.",
  enemy: "Ratte",
  difficulty: "weak",
  level: 1,
};

export const event001RatOnStreet: GameEvent = {
  id: "B001RatOnStreetTrigger",
  label: "Ratte auf der Straße",
  description: "Eine Ratte läuft über die Straße.",
  buttons: [
    {
      label: "Ratte angreifen",
      getAction: () => {
        return {
          message: "Du startest den Angriff!",
          triggerBattle: "B001RatOnStreet",
        };
      },
    },
    {
      label: "Ratte ignorieren",
      getAction: () => {
        return {
          message: "Du gehtst weiter...",
        };
      },
    },
  ],
  places: [],
};
