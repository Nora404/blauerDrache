import React from 'react';
import Header from '../layout/Header/Header';
import { useGameContext } from '../data/gameStore';

type YouHaveProps = {
    gold?: number;
    edelsteine?: number;
    weapon?: string;
    armor?: string;
    items?: number;
};

const YouHave: React.FC<YouHaveProps> = (
    { gold = 100, edelsteine = 0, weapon = 'nothing', armor = 'nothing', items = 0 }
) => {
    const { gameData } = useGameContext();

    return (
        <div>
            <Header>Das hast du</Header>
            <p className='text-left padding-left'>
                Gold: {gameData.economy.gold}<br />
                Edelsteine: {gameData.economy.edelsteine}<br />
                Waffe: {gameData.equipment.weapon}<br />
                Rüstung: {gameData.equipment.armor}<br />
                Inventar: ...<br />
            </p>
        </div>
    );
};

export default YouHave;