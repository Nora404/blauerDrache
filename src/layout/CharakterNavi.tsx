import React from 'react';
import YouAre from '../charakter/YouAre';
import YouCan from '../charakter/YouCan';
import YouHave from '../charakter/YouHave';
import Header from './Header/Header';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../store';

type CharakterNaviProps = {
};

const CharakterNavi: React.FC<CharakterNaviProps> = observer(() => {
    const { gameState } = useRootStore();
    if (!gameState) return;

    return (
        <div>
            {gameState.data.creating && (
                <>
                    <YouAre />
                    <YouCan />
                    <YouHave />
                </>
            )}
            {!gameState.data.creating && (
                <Header>Noch kein Charakter erstellt</Header>
            )
            }
        </div>
    );
});

export default CharakterNavi;