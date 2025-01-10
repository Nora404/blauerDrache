// #region [imports]
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewGameStore } from '../../../store/newGameStore';
import { getGameQuestById, renderQuestRewards, renderQuestType } from '../../../utility/TriggerQuest';
import { RewardsDisplay } from '../../../layout/RewardDisplay';
import { emptyQuest } from '../../../data/questData';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = () => {
    const { store } = useNewGameStore();
    if (!store) return;
    const navigate = useNavigate();

    const activeQuests = store.playerQuest.activeQuests || {};
    const activeQuestEntries = Object.entries(activeQuests);

    useEffect(() => {
        console.log(store.playerQuest.activeQuests);
    }, []);
    // #endregion

    // #region [handler]
    const handleAbandon = () => {
        store.playerQuest.activeQuests = {};
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
                <> <p>Du hast aktive Aufgaben</p>
                    {/* {activeQuestEntries.map(([questId, progressSteps]) => {
                        const quest = getGameQuestById(questId) ?? emptyQuest;

                        return (
                            <div key={questId}>
                                <h3>{quest?.label ?? questId}</h3>
                                {quest?.description}<br />

                                {progressSteps.map((step, idx) => (
                                    <div key={idx}>
                                        {step.isDone ? (
                                            <span className="text-green">
                                                {step.type}: {renderQuestType({ questType: step.type, task: step.task })}
                                            </span>
                                        ) : (
                                            <span>
                                                {step.type}: {renderQuestType({ questType: step.type, task: step.task })}
                                            </span>
                                        )}
                                    </div>
                                ))}
                                Belohnung: {renderQuestRewards(quest?.rewards)}
                            </div>
                        );
                    })} */}
                </>
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