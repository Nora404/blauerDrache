import { GameQuest, gameQuests } from "../data/questData";

//#region [gray]
export function getGameQuestById(id: string): GameQuest | undefined {
    return gameQuests.find((quest) => quest.id === id);
}
//#endregion

