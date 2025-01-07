import React from 'react';
import YouAre from '../charakter/YouAre';
import YouCan from '../charakter/YouCan';
import YouHave from '../charakter/YouHave';
import Header from './Header/Header';
import { useNewGameStore } from '../store/newGameStore';

type CharakterNaviProps = {
};

const CharakterNavi: React.FC<CharakterNaviProps> = () => {
    const { store } = useNewGameStore();
    if (!store) return;

    return (
        <div>
            {store.gameState.creating && (
                <>
                    <YouAre />
                    <YouCan />
                    <YouHave />
                </>
            )}
            {!store.gameState.creating && (
                <Header>Noch kein Charakter erstellt</Header>
            )
            }
        </div>
    );
};

export default CharakterNavi;