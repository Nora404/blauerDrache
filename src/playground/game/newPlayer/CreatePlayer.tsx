//#region [imports]
import React, { useEffect, useState } from 'react';
import { defaultPlayerData, useGameStore } from '../../../data/gameStore';
import { originDefaults, OriginName, raceDefaults, RaceName } from '../../../data/raceData';
import { DryadAscii, DwarfAscii, ElfAscii, FelkinAscii, FenrilAscii, HumanAscii, LizardAscii, TrollAscii } from '../../../data/playerAscii';
import ChooseRace from './ChooseRace';
import ChooseOrigin from './ChooseOrigin';
import ChooseEquipment from './ChooseEquipment';
import ChooseName from './ChooseName';
import PlayerPreview from './PlayerPreview';
import { ChooseCallingText, ChooseNameText, ChooseOriginText, ChooseRaceText, FinalText } from './CreatePlayerStrings';
import { useNavigate } from 'react-router-dom';
import { callingDefaults, CallingName } from '../../../data/callingData';
//#endregion

//#region [prepare]
export type WizardData = {
    race: RaceName;
    origin: OriginName;
    calling: CallingName;
    name: string;
}

type MergeableObject = {
    [key: string]: number;
};

type CreatePlayerProps = {

};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {
    const { setStats: updateStats, setMeta: updateMeta, setEconomy: updateEconomy, resetGameData } = useGameStore();

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [wizardData, setWizardData] = useState<WizardData>({
        race: "Mensch",
        origin: "Stadtmensch",
        calling: "Bauer",
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
        navigate("/new-day");
    }

    const handleFinalize = () => {
        const raceBase = raceDefaults[wizardData.race] ?? {};
        const originBase = originDefaults[wizardData.origin] ?? {};
        const callingBase = callingDefaults[wizardData.calling] ?? {};

        setCurrentStep((prev) => prev + 1);

        const sumProperties = (base: MergeableObject, ...others: MergeableObject[]) => {
            return others.reduce((acc, obj) => {
                for (let key in obj) {
                    if (typeof obj[key] === 'number') {
                        acc[key] = (acc[key] || 0) + obj[key];
                    }
                }
                return acc;
            }, { ...base });
        };

        const combinedStats = sumProperties(
            defaultPlayerData.stats,
            raceBase.stats || {},
            originBase.stats || {},
            callingBase.stats || {}
        );

        const combinedEconomy = sumProperties(
            defaultPlayerData.economy,
            raceBase.economy || {},
            originBase.economy || {},
            callingBase.economy || {}
        );

        updateStats(combinedStats);
        updateEconomy(combinedEconomy);

        updateMeta({
            name: wizardData.name,
            rase: wizardData.race,
            origin: wizardData.origin,
            calling: wizardData.calling,
            creating: true,
        });
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
                <ChooseEquipment
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
