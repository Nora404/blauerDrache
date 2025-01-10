// #region [imports]
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewGameStore } from '../../../store/newGameStore';
import { getGameQuestById } from '../../../utility/TriggerQuest';
// #endregion

// #region [prepare]
type QuestlogProps = {
};

const Questlog: React.FC<QuestlogProps> = () => {
    const { store } = useNewGameStore();
    const navigate = useNavigate();

    const activeQuests = store.playerQuest.activeQuests || {};
    const activeQuestEntries = Object.entries(activeQuests);
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

            <h3>Aktive Aufgaben</h3>
            {store.playerQuest.activeQuests ? (
                <>
                    <h2>Aktive Quests</h2>
                    {activeQuestEntries.map(([questId, progressSteps]) => {
                        const questDef = getGameQuestById(questId);
                        { questDef?.description }

                        return (
                            <div key={questId} className="border p-2 m-2">
                                <h3>{questDef?.label ?? questId}</h3>
                                {progressSteps.map((step, idx) => (
                                    <div key={idx}>
                                        {step.isDone ? (
                                            <span className="text-green-500 line-through">
                                                Schritt {idx + 1}: {step.type}
                                            </span>
                                        ) : (
                                            <span className="text-blue-500">
                                                Schritt {idx + 1}: {step.type}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </>
            ) : (
                <p>Keine aktiven Buffs</p>
            )}
            <button onClick={handleAbandon}>Alles löschen</button>
        </div>
    );
    // #endregion
};

export default Questlog;