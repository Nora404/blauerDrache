import { GameEvent } from "../../eventData";

//#region [events]
export const event014Fairy: GameEvent = {
  id: "014Fairy",
  label: "Eine Fee ist aufgetaucht",
  description: descriptionText(),
  buttons: [
    {
      label: "Fee verfolgen",
      getAction: () => ({
        message: message1,
        nextEvents: [
          { eventId: "015FairyLost", probability: 80 },
          { eventId: "016FairyWish", probability: 20 },
        ],
      }),
    },
    {
      label: "Fee anstarren",
      getAction: () => ({
        message: message2,
      }),
    },
  ],
  places: [
    {
      place: "Wald",
      probability: 30,
    },
    {
      place: "Waldrand",
      probability: 10,
    },
  ],
};
//#endregion

function descriptionText() {
  return "Beschreibung";
}

const message1 = "Button 1 gedrückt";

const message2 = "Button 2 gedrückt";
