import { GameQuest, gameQuests, QuestTypeNames, Rewards, Task } from "../data/questData";

//#region [gray]
export function getGameQuestById(id: string): GameQuest | undefined {
    return gameQuests.find((quest) => quest.id === id);
}
//#endregion


type Props = {
    questType: QuestTypeNames;
    task: Task;
};

export const renderQuestType = ({ questType, task }: Props): JSX.Element => {
    if (!questType || !task) return <></>;
    switch (questType) {
        case "Begegnung": // talk
            return <div>Sprich mit einem NPC, um die Aufgabe zu erfüllen.</div>;
        case "Besorgen": // item
            return (
                <div>
                    Besorge die folgenden Gegenstände:
                    <ul>
                        {task.haveItem?.map((item, index) => (
                            <li key={index}>
                                {item.item}: {item.count}/{item.need}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case "Benutzten": // use
            return <div>Benutze den Gegenstand: {task.useItem}</div>;
        case "Besuchen": // go
            return <div>Besuche den Ort: {task.goTo}</div>;
        case "Besiegen": // kill
            return (
                <div>
                    Besiege die folgenden Gegner:
                    <ul>
                        {task.enemy?.map((enemy, index) => (
                            <li key={index}>
                                {enemy.enemy}: {enemy.count}/{enemy.need}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        case "Erfahrung": // base
            return (
                <div>
                    Erreiche das Basislevel:
                    <ul>
                        {task.base?.map((base, index) => (
                            <li key={index}>Level {base.level}</li>
                        ))}
                    </ul>
                </div>
            );
        case "Besser werden": // stats
            return (
                <div>
                    Verbessere deine Attribute:
                    <ul>
                        {task.stats?.map((stat, index) => (
                            <li key={index}>Attack: {stat.attack}</li>
                        ))}
                    </ul>
                </div>
            );
        case "Geheimnis": // switch
            return (
                <div>
                    Schalte die folgenden Schalter um:
                    <ul>
                        {task.switch?.map((sw, index) => (
                            <li key={index}>
                                {sw.name}: {sw.state ? "An" : "Aus"}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        default:
            return <div>Unbekannter Quest-Typ</div>;
    }
};

export const renderQuestRewards = (rewards: Rewards): JSX.Element => {
    if (!rewards) {
        return <div>Keine Belohnung verfügbar</div>;
    }

    return (
        <div>
            <ul>
                {rewards.base && (
                    <li>
                        <strong>Basis-Verbesserungen:</strong>
                        <ul>
                            {Object.entries(rewards.base).map(([key, value]) => (
                                <li key={key}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
                {rewards.economy?.gold || rewards.economy?.edelsteine && (
                    <li>
                        <strong>Wirtschafts-Verbesserungen:</strong>
                        <ul>
                            {Object.entries(rewards.economy).map(([key, value]) => (
                                <li key={key}>
                                    {key}Hallo: {value as number}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
                {rewards.items && rewards.items.length > 0 && (
                    <li>
                        <strong>Gegenstände:</strong>
                        <ul>
                            {rewards.items.map((item, index) => (
                                <li key={index}>
                                    {item.itemName}: {item.quantity}
                                </li>
                            ))}
                        </ul>
                    </li>
                )}
            </ul>
        </div>
    );
};
