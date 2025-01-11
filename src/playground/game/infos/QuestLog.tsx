// #region [imports]
import { useNewGameStore } from '../../../store/newGameStore';
import { getGameQuestById } from '../../../utility/TriggerQuest';
import { emptyQuest, HaveItem, Progress } from '../../../data/questData';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = () => {
    const { store, setPlayerQuest } = useNewGameStore();
    if (!store) return;
    // #endregion

    // #region [handler]
    const handleAbandon = () => {
        setPlayerQuest({ activeQuests: {} });
    };

    const handleClick = () => {
        console.log(store.playerQuest.activeQuests);
    }
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>Deine Aufgaben</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />

            {store.playerQuest.activeQuests ? (
                <div>
                    {Object.entries(store.playerQuest.activeQuests).map(([questId, currentProgress]) => {
                        const questDefinition = getGameQuestById(questId) || emptyQuest;
                        return (
                            <div key={questId}>
                                <strong>{questDefinition.label}</strong>
                                <p className={currentProgress.isDone ? "text-green" : ""}>
                                    {questDefinition.description}
                                    <br />
                                    {renderTask(currentProgress)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Keine aktiven Aufgaben</p>
            )}

            <br /> <hr />
            <button onClick={handleAbandon}>Alles löschen</button>
            <button onClick={handleClick}>Zeige Store</button>
        </div>
    );
    // #endregion
};

export default Questlog;


const renderTask = (quest: Progress) => {
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