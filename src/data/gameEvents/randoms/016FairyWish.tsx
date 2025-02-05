import { GameEvent } from "../../eventData";

//#region [events]
export const event016FairyWish: GameEvent = {
  id: "016FairyWish",
  label: "Fee gewährt einen Wunsch",
  description: descriptionText(),
  buttons: [
    {
      label: "Für heute großes Glück",
      getAction: () => ({
        tempStatsDelta: { luck: 10 },
        message: message1,
      }),
    },
    {
      label: "Für heute viel mehr Angriff",
      getAction: () => ({
        tempStatsDelta: { attack: 10 },
        message: message2,
      }),
    },
    {
      label: "Für heute viel größere Verteidigung",
      getAction: () => ({
        tempStatsDelta: { defense: 10 },
        message: message3,
      }),
    },
    {
      label: "Dauerhaft wenig mehr Glück",
      getAction: () => ({
        statsDelta: { luck: 1 },
        message: message4,
      }),
    },
    {
      label: "Dauerhaft wenig mehr Angriff",
      getAction: () => ({
        statsDelta: { attack: 1 },
        message: message5,
      }),
    },
    {
      label: "Dauerhaft wenig mehr Verteidigung",
      getAction: () => ({
        statsDelta: { defense: 1 },
        message: message6,
      }),
    },
  ],
  places: [],
};
//#endregion

function descriptionText() {
  return "Beschreibung";
}

const message1 = "Button 1 gedrückt";

const message2 = "Button 2 gedrückt";
const message3 = "Button 1 gedrückt";

const message4 = "Button 2 gedrückt";
const message5 = "Button 1 gedrückt";

const message6 = "Button 2 gedrückt";
