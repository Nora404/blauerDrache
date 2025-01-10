import { PlayerStats, PlayerBase, PlayerFlux, PlayerMeta, PlayerEconomy } from "../store/newGameStore";
import { GameEvent } from "./eventData";
import { quest001ThreeStone } from "./gameQuests/001TheeStones/001ThreeStones";
import { event001ThreeStoneTrigger } from "./gameQuests/001TheeStones/001ThreeStoneTrigger";
import { ItemName } from "./ItemData";

export type GameQuest = {
    id: string;
    label: string;
    description: JSX.Element;
    triggerEvent: string,
    conditions?: {
        requiredDaytime?: "Tag" | "Nacht";
        requiredSwitches?: { [key: string]: boolean };
        requiredQuestDone?: string[];
        requiredStats?: Partial<PlayerStats>;
        requiredBase?: Partial<PlayerBase>;
        requiredFlux?: Partial<PlayerFlux>;
        requiredMeta?: Partial<PlayerMeta>;
    }
    progress: Progress[],
    rewards: {
        base?: Partial<PlayerBase>
        economy?: Partial<PlayerEconomy>
        items?: { itemName: ItemName; quantity: number }[];
    }
    followQuestId: string,
    repeat: boolean,
}

export type QuestTypeNames = "talk" | "item" | "use" | "kill" | "stats" | "base" | "switch";

export type Progress = {
    type: QuestTypeNames,
    target: string,
    triggerEvent: string,
    isDone: boolean,
    haveItem?: { item: ItemName, need: number },
    useItem?: ItemName,
    enemy?: { enemy: string, need: number, count: number },
    stats?: { attack: number },
    base?: { level: number },
    switch?: { name: string, state: true },
}

export const gameQuests: GameQuest[] = [
    quest001ThreeStone,
]

export const gameQuestTrigger: GameEvent[] = [
    event001ThreeStoneTrigger,
]

// const exampleProgress = [
//     {
//         type: "talk",
//         target: "/church-priest",
//         triggerEvent: "Q022Prist",
//         isDone: true
//     },
//     {
//         type: "item",
//         haveItem: { item: "candle", need: 5, count: 0 },
//         target: "/church",
//         triggerEvent: "Q023Prist",
//         isDone: false
//     },
//     {
//         type: "use",
//         useItem: "candle",
//         target: "/church",
//         triggerEvent: "Q024Candel",
//         isDone: false
//     },
//     {
//         type: "kill",
//         enemy: { enemy: "rat", need: 6, count: 0 },
//         target: "/church-cellar",
//         triggerEvent: "Q025Rats",
//         isDone: false
//     },
//     {
//         type: "stats",
//         stats: { attack: 50 },
//         target: "/weaponshop-warrior",
//         triggerEvent: "Q026Warrior",
//         isDone: false
//     },
//     {
//         type: "base",
//         base: { level: 5 },
//         target: "/weaponshop-warrior",
//         triggerEvent: "Q026Warrior",
//         isDone: false
//     },
//     {
//         type: "switch",
//         switch: { name: "toggel", state: true },
//         target: "/",
//         triggerEvent: "Q027Door",
//         isDone: false
//     },
// ]