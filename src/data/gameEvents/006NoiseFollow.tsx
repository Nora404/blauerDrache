import { GameEvent } from "../eventData";

//#region [events]
export const event006NoiseFollow: GameEvent = {
  id: "006NoiseFollow",
  label: "Dem Geräusch nachgehen",
  description: descriptionText(),
  buttons: [
    {
      label: "Weiter suchen",
      getAction: () => ({
        statsDelta: { actionPoints: -1 },
        message: message1,
      }),
    },
    {
      label: "Aufgeben",
      getAction: () => ({
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
