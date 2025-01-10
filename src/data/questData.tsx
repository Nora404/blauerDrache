import { PlayerStats, PlayerBase, PlayerFlux, PlayerMeta, PlayerEconomy } from "../store/newGameStore";
import { GameEvent } from "./eventData";
import { event001ThreeStoneEnd } from "./gameQuests/001TheeStones/001ThreeStoneEnd";
import { quest001ThreeStone } from "./gameQuests/001TheeStones/001ThreeStones";
import { event001ThreeStoneTrigger } from "./gameQuests/001TheeStones/001ThreeStoneTrigger";
import { ItemName } from "./ItemData";

export type QuestTypeNames =
    | "Begegnung" // talk
    | "Besorgen" // item
    | "Benutzten" // use
    | "Besuchen" // go
    | "Besiegen" // kill
    | "Erfahrung" // base
    | "Besser werden" // stats
    | "Geheimnis"; //switch

//region
export type GameQuest = {
    id: string;
    label: string;
    description: JSX.Element;
    path: string, // Hier beendet man die Quest
    eventByEnd: string, // Dieses Event verteilt die Belohnung
    conditions?: {
        requiredSwitches?: { [key: string]: boolean };
        requiredStats?: Partial<PlayerStats>;
        requiredBase?: Partial<PlayerBase>;
        requiredFlux?: Partial<PlayerFlux>;
        requiredMeta?: Partial<PlayerMeta>;
    }
    progress: Progress,
    rewards: Rewards,
    repeat: boolean,
}
//#endregion

//#region
export type HaveItem = { item: ItemName, need: number, count: number };
export type KillEnemy = { enemy: string, need: number, count: number };
export type Task = {
    label?: string;
    haveItem?: HaveItem[],
    useItem?: ItemName,
    goTo?: string; // path
    enemy?: KillEnemy[],
    stats?: Partial<PlayerStats>,
    base?: Partial<PlayerBase>,
    switch?: Partial<Record<string, boolean>>,
}
export type Progress = {
    type: QuestTypeNames,
    path: string, // Hier beendet man die Aufgabe
    eventByEnd: string, // EventID
    isDone: boolean,
    task: Task;
}
export type Rewards = {
    base?: Partial<PlayerBase>;
    economy?: Partial<PlayerEconomy>;
    items?: { itemName: ItemName; quantity: number }[];
};

export const emptyQuest: GameQuest = {
    id: "000",
    label: "Nichts",
    description: <></>,
    path: "/",
    eventByEnd: "000",
    progress: {
        type: "Geheimnis",
        path: "/",
        eventByEnd: "000",
        isDone: false,
        task: {},
    },
    rewards: {},
    repeat: false,
}
//#endregion

export const gameQuests: GameQuest[] = [
    quest001ThreeStone,
]

export const gameQuestTrigger: GameEvent[] = [
    event001ThreeStoneTrigger,
    event001ThreeStoneEnd,
]

export const renderTask = (quest: Progress) => {
    switch (quest.type) {
        case "Begegnung":
            return (<span>Triff dich mit {quest.task.label ?? "der gesuchten Person"}.</span>);
        case "Besorgen":
            return (
                <>
                    {quest.task.haveItem?.map((item: HaveItem) => (
                        <span key={item.item}>
                            Besorge {item.need}x {item.item}, du hast {item.count} besorgt.
                        </span>
                    ))}
                </>
            );

        default:
            break;
    }
}

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