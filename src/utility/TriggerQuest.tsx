import { GameQuest, gameQuests, Progress } from "../data/questData";

//#region [gray]
export function getGameQuestById(id: string): GameQuest | undefined {
    return gameQuests.find((quest) => quest.id === id);
}
//#endregion

export function resetQuestProgress(progress: Progress): Progress {
    return {
        ...progress,
        isDone: false,
        task: {
            ...progress.task,
            haveItem: progress.task.haveItem ? progress.task.haveItem.map(item => ({ ...item, count: 0 })) : undefined,
            enemy: progress.task.enemy ? progress.task.enemy.map(enemy => ({ ...enemy, count: 0 })) : undefined,
        },
    };
}