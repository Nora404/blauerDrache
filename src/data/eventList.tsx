import { GameEvent } from "./eventData";
import { gameQuestEvents } from "./questList";
import { randomEvents } from "./gameEvents/randoms/randomEventList";
import { lahtheimCenterEvents } from "./gameEvents/lahtheim/center/lahtheimCenterList";

export const gameEvents: GameEvent[] = [
  ...randomEvents,
  ...gameQuestEvents,
  ...lahtheimCenterEvents,
];
