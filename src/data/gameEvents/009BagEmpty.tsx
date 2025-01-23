import { GameEvent } from "../eventData";

//#region [events]
export const event009BagEmpty: GameEvent = {
  id: "009BagEmpty",
  label: "Der Beutel ist leer",
  description: descriptionText(),
  buttons: [
    {
      label: "Den leeren Beutel weg werfen",
      getAction: () => ({
        message: message1,
      }),
    },
    {
      label: "Den leeren Beutel einstecken",
      getAction: () => ({
        itemsDelta: { Lederstück: 1 },
        message: message2,
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
