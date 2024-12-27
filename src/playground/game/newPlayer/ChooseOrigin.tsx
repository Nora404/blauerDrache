import React from 'react';
import { CREATURE, SYSTEM } from '../../../data/colorfullStrings';
import CreatureTalk from '../../../utility/CreaturTalk';
import { useGameStore } from '../../../data/gameStore';
import { useNavigate } from 'react-router-dom';
import PlayerTalk from '../../../utility/PlayerTalk';
import { races, racesMap } from '../../../data/raceDefaults';
import Header from '../../../layout/Header/Header';

type ChooseOriginProps = {
};

const ChooseOrigin: React.FC<ChooseOriginProps> = () => {
    const { gameData, updateStats, updateMeta, updateEconomy } = useGameStore();

    const selectedRace = racesMap[gameData.meta.rase];
    const selectedSubrace = gameData.meta.origin;

    const handleOrigin = (originName: string) => {
        // const raceBase = raceDefaults[raceName];

        // updateStats({
        //     ...defaultPlayerData.stats,
        //     ...raceBase.stats
        // });

        // updateEconomy({
        //     ...defaultPlayerData.economy,
        //     ...raceBase.economy
        // });

        updateMeta({
            origin: originName,
        });
    }


    const handleBack = () => {
        updateMeta({
            creating: 1,
        });

        navigate("/new-player");
    }
    const handleNext = () => {
        updateMeta({
            creating: 2,
        });

        navigate("/choose-origin");
    }
    const navigate = useNavigate();

    return (
        <div className="max-width">
            <h2>In deiner Vergangenheit gehörtests du zu?</h2>
            <div className='text-left'>

                <p className='mb-1'>
                    <CreatureTalk name="rotesWesen">"Glaubst du wir sind blind, das wir das nicht selbst schon erkannt haben?" </CreatureTalk>
                    Höhnt das {CREATURE.roteWesen} während es langsam um dich herum schwebt. Das {CREATURE.blaueWesen} flattert zu dir und schupst das {CREATURE.roteWesen} weg.
                </p>
                <p className='mb-1'>
                    <CreatureTalk name="blauesWesen">"Er will nur wissen woher du kommst, zu welcher Gruppe zu gehörst."</CreatureTalk>
                </p>
            </div><br />

            <Header>Beantworte die Frage der Wächter Wesen</Header>

            <br />

            {selectedRace.subraces.map((subrace) => (
                <div className='mb-1 text-left' key={subrace.name}>
                    <button onClick={() => handleOrigin(subrace.name)}>
                        {subrace.name}
                    </button><br />
                    {subrace.description}
                </div>
            ))}

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin ein {selectedSubrace}"</PlayerTalk><br />
            </div><br />

            <div className='flex-row max-width'>
                <div onClick={handleBack} style={{ width: "50%" }}>
                    {SYSTEM.zurück}
                </div>
                <div onClick={handleNext} style={{ width: "50%" }}>
                    {SYSTEM.weiter}
                </div>
            </div>

        </div>
    );
};

export default ChooseOrigin;