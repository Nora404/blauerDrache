import React from 'react';
import Header from '../layout/Header/Header';
import { useGameStore } from '../data/gameStore';
import { SYSTEM } from '../data/colorfullStrings';

type YouHaveProps = {
};

const YouHave: React.FC<YouHaveProps> = () => {
    const { gameData } = useGameStore();

    return (
        <div>
            <Header>Das hast du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Gold}</td><td>{gameData.economy.gold}</td>
                    </tr><tr>
                        <td>{SYSTEM.Edelsteine}</td><td>{gameData.economy.edelsteine}</td>
                    </tr><tr>
                        <td>{SYSTEM.Waffe}</td><td>{gameData.equipment.weapon}</td>
                    </tr><tr>
                        <td>{SYSTEM.Rüstung}</td><td>{gameData.equipment.armor}</td>
                    </tr><tr>
                        <td>{SYSTEM.Inventar}</td><td>...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouHave;