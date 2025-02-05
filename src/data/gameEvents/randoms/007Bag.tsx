import { GameEvent } from "../../eventData";

//#region [events]
export const event007Bag: GameEvent = {
  id: "007Bag",
  label: "Du findest einen Beutel",
  description: descriptionText(),
  buttons: [
    {
      label: "Beutel aufheben und öffnen",
      getAction: () => ({
        message: message1,
        nextEvents: [
          { eventId: "008BagFull", probability: 10 },
          { eventId: "009BagEmpty", probability: 50 },
        ],
      }),
    },
    {
      label: "Liegen lassen",
      getAction: () => ({
        message: message2,
      }),
    },
  ],
  places: [
    {
      place: "Wald",
      probability: 50,
    },
    {
      place: "Weg",
      probability: 20,
    },
  ],
};
//#endregion

function descriptionText() {
  return "Beschreibung";
}

const message1 = "Button 1 gedrückt";

const message2 = "Button 2 gedrückt";
