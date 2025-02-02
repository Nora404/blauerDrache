import { GameEvent } from "./eventData";
import { event001StoneCoin } from "./gameEvents/001StoneCoin";
import { event002Mashroom } from "./gameEvents/002Mushroom";
import { event003Stick } from "./gameEvents/003Stick";
import { event004Flower } from "./gameEvents/004Flower";
import { event005NoiseHear } from "./gameEvents/005NoiseHear";
import { event006NoiseFollow } from "./gameEvents/006NoiseFollow";
import { event007Bag } from "./gameEvents/007Bag";
import { event008BagFull } from "./gameEvents/008BagFull";
import { event009BagEmpty } from "./gameEvents/009BagEmpty";
import { event010WoodenChest } from "./gameEvents/010WoodenChest";
import { event011ChestJunk } from "./gameEvents/011ChestJunk";
import { event012ChestGold } from "./gameEvents/012ChestGold";
import { event013ChestEmpty } from "./gameEvents/013ChestEmpty";
import { event014Fairy } from "./gameEvents/014Fairy";
import { event015FairyLost } from "./gameEvents/015FairyLost";
import { event016FairyWish } from "./gameEvents/016FairyWish";
import { event017ChestTrap } from "./gameEvents/017ChestTrap";
import { event018Donate } from "./gameEvents/018Donate";
import { event019ChurchPeace } from "./gameEvents/019ChurchPeace";
import { event020ChurchTalk } from "./gameEvents/020ChurchTalk";
import { event020ChurchTalk1 } from "./gameEvents/020ChurchTalk1";
import { event020ChurchTalk2 } from "./gameEvents/020ChurchTalk2";
import { event020ChurchTalk3 } from "./gameEvents/020ChurchTalk3";
import { event020ChurchTalk4 } from "./gameEvents/020ChurchTalk4";
import { event999test } from "./gameEvents/999Text";
import { gameQuestEvents } from "./questList";

export const randomEvents: GameEvent[] = [
  event001StoneCoin,
  event002Mashroom,
  event003Stick,
  event004Flower,
  event005NoiseHear,
  event006NoiseFollow,
  event007Bag,
  event008BagFull,
  event009BagEmpty,
  event010WoodenChest,
  event011ChestJunk,
  event012ChestGold,
  event013ChestEmpty,
  event014Fairy,
  event015FairyLost,
  event016FairyWish,
  event017ChestTrap,
  event018Donate,
  event019ChurchPeace,
  event020ChurchTalk,
  event020ChurchTalk1,
  event020ChurchTalk2,
  event020ChurchTalk3,
  event020ChurchTalk4,
  event999test,
];

export const gameEvents: GameEvent[] = [...randomEvents, ...gameQuestEvents];
