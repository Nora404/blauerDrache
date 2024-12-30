import React from 'react';
import YouAre from '../charakter/YouAre';
import YouCan from '../charakter/YouCan';
import YouHave from '../charakter/YouHave';
import { useGameStore } from '../data/gameStore';
import Header from './Header/Header';

type CharakterNaviProps = {
};

const CharakterNavi: React.FC<CharakterNaviProps> = () => {
    const { gameStore: gameData } = useGameStore();


    return (
        <div>
            {gameData.meta.creating && (
                <>
                    <YouAre />
                    <YouCan />
                    <YouHave />
                </>
            )}
            {!gameData.meta.creating && (
                <Header>Noch kein Charakter erstellt</Header>
            )
            }
        </div>
    );
};

export default CharakterNavi;