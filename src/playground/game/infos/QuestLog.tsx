// #region [imports]
import { emptyQuest, getGameQuestById, HaveItem, Progress } from '../../../data/questData';
import ActionButton from '../../../layout/ActionButtons/ActionButton';
import { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../store';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = observer(() => {
    const { playerQuest } = useRootStore();
    // #endregion

    // #region [handler]
    const handleAbandon = useCallback((questId: string) => {
        playerQuest.updateQuest(questId, true);
    }, [playerQuest]);

    const handleClick = () => {
        console.log("Aktive: ", playerQuest.data.activeQuests);
        console.log("Fertig: ", playerQuest.data.completedQuest);
    }
    // #endregion

    // #region [jsx]
    return (
        <div className='max-width'>
            <h2>Deine Aufgaben</h2>
            <p className='mb-1 text-left'>
                Endtäuschst stellst du fest das die Autorin der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter, aber das hilft dir auch nicht weiter.
            </p><br />

            {playerQuest.data.activeQuests ? (
                <div>
                    {Object.entries(playerQuest.data.activeQuests).map(([questId, currentProgress]) => {
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
});

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