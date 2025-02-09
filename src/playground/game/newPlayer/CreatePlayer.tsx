//#region [imports]
import React, { startTransition, useEffect, useState } from 'react';
import { emptyRaceObj, Race, RaceName } from '../../../data/raceData';
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, OrksAscii } from '../../../data/helper/playerAscii';
import ChooseRace from './ChooseRace';
import ChooseOrigin from './ChooseOrigin';
import ChooseCalling from './ChooseCalling';
import ChooseName from './ChooseName';
import PlayerPreview from './PlayerPreview';
import { ChooseCallingText, ChooseNameText, ChooseOriginText, ChooseRaceText, FinalText } from './CreatePlayerStrings';
import { useNavigate } from 'react-router-dom';
import { Calling, CallingName, emptyCallingObj } from '../../../data/callingData';
import { emptyOriginObj, Origin, OriginName } from '../../../data/originData';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../store';
import { PlayerBase, PlayerEconomy, PlayerStats } from '../../../store/types';
import { requiredExpForLevel } from '../../../utility/Helper/Progression';
//#endregion

//#region [prepare]
export type WizardData = {
    race: Race;
    origin: Origin;
    calling: Calling;
    name: string;
}

const CreatePlayer: React.FC = observer(() => {
    const { playerBase, playerStats, playerEconomy, playerMeta, gameState, resetGameData } = useRootStore();

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [wizardData, setWizardData] = useState<WizardData>({
        race: emptyRaceObj,
        origin: emptyOriginObj,
        calling: emptyCallingObj,
        name: "Namenloser Held",
    });

    const navigate = useNavigate();
    //#endregion

    //#region [events]
    useEffect(() => {
        resetGameData();
    }, [resetGameData]);
    //#endregion

    //#region [handler]  
    const handleGoNext = () => setCurrentStep((prev) => prev + 1);
    const handleGoBack = () => setCurrentStep((prev) => prev - 1);
    const handleLastBtn = () => {
        startTransition(() => {
            gameState.setGameState({ creating: true });
        });
        navigate("/");

        setTimeout(() => {
            window.location.reload();
        }, 1);
    }

    const mergeAndSum = <T extends object>(...objs: Partial<T>[]): Partial<T> => {
        const result: Partial<T> = {};

        objs.forEach(obj => {
            if (!obj) return;
            for (const key in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

                const typedKey = key as keyof T;
                const newValue = obj[typedKey];

                if (typeof newValue === 'number') {
                    const currentValue = result[typedKey] as number | undefined;
                    result[typedKey] = ((currentValue || 0) + newValue) as T[keyof T];
                } else {
                    result[typedKey] = newValue;
                }
            }
        });

        return result;
    };

    const handleFinalize = () => {
        const combinedBase = mergeAndSum<PlayerBase>(
            wizardData.race.base,
            wizardData.origin.base,
            wizardData.calling.base
        );

        const combinedStats = mergeAndSum<PlayerStats>(
            wizardData.race.stats,
            wizardData.origin.stats,
            wizardData.calling.stats
        );

        const combinedEconomy = mergeAndSum<PlayerEconomy>(
            wizardData.race.economy,
            wizardData.origin.economy,
            wizardData.calling.economy
        );

        const initialLevel = combinedBase.level;
        const initialNextLevel = requiredExpForLevel(initialLevel ?? 1);


        playerBase.setPlayerBase({
            ...combinedBase,
            nextLevel: initialNextLevel,
        });
        playerStats.setPlayerStats(combinedStats);
        playerEconomy.setPlayerEconomy(combinedEconomy);
        playerMeta.setPlayerMeta({
            name: wizardData.name,
            race: wizardData.race.name as RaceName,
            origin: wizardData.origin.name as OriginName,
            calling: wizardData.calling.name as CallingName,
        });

        setCurrentStep((prev) => prev + 1);
    };
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <h2>Als was werden dich die Bewohner dieser Welt erkennen?</h2>

            {currentStep === 0 && (<ChooseRaceText />)}
            {currentStep === 1 && (<ChooseOriginText />)}
            {currentStep === 2 && (<ChooseCallingText />)}
            {currentStep === 3 && (<ChooseNameText />)}
            {currentStep === 4 && (<FinalText />)}

            {currentStep === 0 && (
                <div className='flex-row max-width padding-x'>
                    <HumanAscii />
                    <ElfAscii />
                    <DwarfAscii />
                    <LizardAscii />
                    <OrksAscii />
                    <FelkinAscii />
                    <FenrilAscii />
                    <DryadAscii />
                </div>
            )}

            {currentStep > 0 && (
                <><br />
                    <div>
                        <PlayerPreview wizardData={wizardData} />
                    </div></>)}
            <br />

            {currentStep === 0 && (
                <ChooseRace
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onNext={handleGoNext}
                />
            )}
            {currentStep === 1 && (
                <ChooseOrigin
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={handleGoBack}
                    onNext={handleGoNext}
                />
            )}
            {currentStep === 2 && (
                <ChooseCalling
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={handleGoBack}
                    onNext={handleGoNext}
                />
            )}
            {currentStep === 3 && (
                <ChooseName
                    wizardData={wizardData}
                    setWizardData={setWizardData}
                    onBack={handleGoBack}
                    onFinalize={handleFinalize}
                />
            )}
            {currentStep === 4 && (
                <>
                    <button className="btn-border" onClick={handleLastBtn}>Reise beginnen</button>
                </>
            )}
        </div>
    );
    //#endregion
});

export default CreatePlayer; 