import { GameEvent } from "../eventData";

//#region [events]
export const event010WoodenChest: GameEvent = {
  id: "010WoodenChest",
  label: "Vor dir steht eine Holztruhe",
  description: descriptionText(),
  buttons: [
    {
      label: "Holztruhe untersuchen",
      getAction: () => ({
        message: message1,
      }),
    },
    {
      label: "Holztruhe schnell öffnen",
      getAction: () => ({
        message: message2,
        nextEvents: [
          { eventId: "012ChestGold", probability: 10 },
          { eventId: "017ChestTrap", probability: 20 },
          { eventId: "013ChestEmpty", probability: 40 },
          { eventId: "011ChestJunk", probability: 80 },
        ],
      }),
    },
    {
      label: "Holztruhe stehen lassen",
      getAction: () => ({
        message: message1,
      }),
    },
  ],
  places: [
    {
      place: "Wald",
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
