// #region [imports]
import { useNavigate } from 'react-router-dom';
import { useNewGameStore } from '../../../store/newGameStore';
import { getGameQuestById } from '../../../utility/TriggerQuest';
import { emptyQuest, renderTask } from '../../../data/questData';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = () => {
    const { store, setPlayerQuest } = useNewGameStore();
    if (!store) return;
    const navigate = useNavigate();

    const activeQuests = store.playerQuest.activeQuests || {};

    // #endregion

    // #region [handler]
    const handleAbandon = () => {
        setPlayerQuest({ activeQuests: {} });
    };
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
                    {Object.entries(activeQuests).map(([key, value]) => {
                        const quest = getGameQuestById(key) || emptyQuest;
                        return (
                            <div key={key}>
                                <strong>{quest.label}</strong>
                                <br />
                                <p className={quest.progress.isDone ? "text-green" : ''}>{quest.description}<br />{renderTask(quest.progress)}</p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Keine aktiven Aufgaben</p>
            )}

            <br /> <hr />
            <button onClick={handleAbandon}>Alles löschen</button>
        </div>
    );
    // #endregion
};

export default Questlog;