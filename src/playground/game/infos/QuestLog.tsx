// #region [imports]
import { useNewGameStore } from '../../../store/newGameStore';
import { getGameQuestById } from '../../../utility/TriggerQuest';
import { emptyQuest, HaveItem, Progress } from '../../../data/questData';
import ActionButton from '../../../layout/ActionButtons/ActionButton';
import { useCallback } from 'react';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = () => {
    const { store, updateQuest } = useNewGameStore();
    if (!store) return;
    // #endregion

    // #region [handler]
    const handleAbandon = useCallback((questId: string) => {
        updateQuest(questId, true);
    }, [store]);

    const handleClick = () => {
        console.log("Aktive: ", store.playerQuest.activeQuests);
        console.log("Fertig: ", store.playerQuest.completedQuest);
        console.log("Abgeben: ", store.gameState.currentEventQueue);
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
                        const questObject = getGameQuestById(questId) || emptyQuest;
                        return (
                            <div key={questId} className='text-left questbox'>
                                ({questObject.progress.type}) <strong>{questObject.label}</strong>
                                <p className='mb-1'>
                                    {questObject.description}<br />
                                    {questObject.reward}<br />
                                </p>
                                <p className={currentProgress.isDone ? "text-green" : "text-blue"}>
                                    {renderTask(currentProgress)}<br />
                                </p>
                                <ActionButton onClick={() => { handleAbandon(questObject.id) }} label='aufgeben' />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Keine aktiven Aufgaben</p>
            )}

            <br /> <hr />
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