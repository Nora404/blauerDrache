//#region [imports]
import React, { useEffect, useState } from 'react';
import { emptyRaceObj, Race, RaceName } from '../../../data/raceData';
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from '../../../data/playerAscii';
import ChooseRace from './ChooseRace';
import ChooseOrigin from './ChooseOrigin';
import ChooseCalling from './ChooseCalling';
import ChooseName from './ChooseName';
import PlayerPreview from './PlayerPreview';
import { ChooseCallingText, ChooseNameText, ChooseOriginText, ChooseRaceText, FinalText } from './CreatePlayerStrings';
import { useNavigate } from 'react-router-dom';
import { Calling, CallingName, emptyCallingObj } from '../../../data/callingData';
import { emptyOriginObj, Origin, OriginName } from '../../../data/originData';
import { PlayerBase, PlayerEconomy, PlayerStats, requiredExpForLevel, useNewGameStore } from '../../../store/newGameStore';
//#endregion

//#region [prepare]
export type WizardData = {
    race: Race;
    origin: Origin;
    calling: Calling;
    name: string;
}

type CreatePlayerProps = {};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {
    const { setPlayerBase, setPlayerStats, setPlayerEconomy, setPlayerMeta, setGameState, resetGameData } = useNewGameStore();

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
    }, []);
    //#endregion

    //#region [handler]  
    const handleGoNext = () => setCurrentStep((prev) => prev + 1);
    const handleGoBack = () => setCurrentStep((prev) => prev - 1);
    const handleLastBtn = () => {
        navigate("/north-gate");
    }

    const mergeAndSum = <T extends object>(...objs: Partial<T>[]): Partial<T> => {
        const result: Partial<T> = {};

        objs.forEach(obj => {
            if (!obj) return;
            for (const key in obj) {
                if (!obj.hasOwnProperty(key)) continue;

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

        setPlayerBase({
            ...combinedBase,
            nextLevel: initialNextLevel,
        });
        setPlayerStats(combinedStats);
        setPlayerEconomy(combinedEconomy);
        setPlayerMeta({
            name: wizardData.name,
            race: wizardData.race.name as RaceName,
            origin: wizardData.origin.name as OriginName,
            calling: wizardData.calling.name as CallingName,
        });
        setCurrentStep((prev) => prev + 1);
        setGameState({ creating: true });
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
            {currentStep > 3 && (<FinalText />)}

            {currentStep === 0 && (
                <div className='flex-row max-width padding-x'>
                    <HumanAscii />
                    <ElfAscii />
                    <DwarfAscii />
                    <LizardAscii />
                    <TrollAscii />
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
            {currentStep > 3 && (
                <>
                    <button className="btn-border" onClick={handleLastBtn}>Reise beginnen</button>
                </>
            )}
        </div>
    );
    //#endregion
};

export default CreatePlayer; 