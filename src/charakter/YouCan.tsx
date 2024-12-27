import React from 'react';
import Header from '../layout/Header/Header';
import { useGameStore } from '../data/gameStore';
import { SYSTEM } from '../data/colorfullStrings';

type YouCanProps = {
};

const YouCan: React.FC<YouCanProps> = () => {
    const { gameData } = useGameStore();

    return (
        <div>
            <Header>Das kannst du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Level}</td><td>{gameData.stats.level}</td>
                    </tr><tr>
                        <td>{SYSTEM.Erfahrung}</td><td>{gameData.stats.exp} / {gameData.stats.nextLevel}</td>
                    </tr><tr>
                        <td>{SYSTEM.Leben}</td><td>{gameData.stats.life} / {gameData.stats.maxLife}</td>
                    </tr><tr>
                        <td>{SYSTEM.Runden}</td><td>{gameData.stats.rounds} / {gameData.stats.maxRounds}</td>
                    </tr><tr>
                        <td>{SYSTEM.Angriff}</td><td>{gameData.stats.attack}</td>
                    </tr><tr>
                        <td>{SYSTEM.Verteidigung}</td><td>{gameData.stats.defense}</td>
                    </tr><tr>
                        <td>{SYSTEM.Glück}</td><td>{gameData.stats.luck}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouCan;