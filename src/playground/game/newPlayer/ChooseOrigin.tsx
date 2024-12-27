import React from 'react';
import { CREATURE, SYSTEM } from '../../../data/colorfullStrings';
import CreatureTalk from '../../../utility/CreaturTalk';
import { useGameStore } from '../../../data/gameStore';
import { useNavigate } from 'react-router-dom';
import PlayerTalk from '../../../utility/PlayerTalk';
import { racesMap } from '../../../data/raceDefaults';

type ChooseOriginProps = {
};

const ChooseOrigin: React.FC<ChooseOriginProps> = () => {
    const { gameData, updateStats, updateMeta, updateEconomy } = useGameStore();

    const selectedRace = racesMap[gameData.meta.rase];

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
            </div>

            <div>
                Du schaust selbstsicher zu den beiden Wesen und sagst: <PlayerTalk>"Ich bin ein { }"</PlayerTalk><br />
            </div>

            <div onClick={handleNext}>{SYSTEM.weiter}</div>
        </div>
    );
};

export default ChooseOrigin;