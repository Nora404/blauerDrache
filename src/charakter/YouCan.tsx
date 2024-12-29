import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { useGameState } from '../data/gameState';

type YouCanProps = {
};

const YouCan: React.FC<YouCanProps> = () => {
    const gameState = useGameState();
    if (!gameState) return null;

    return (
        <div>
            <Header>Das kannst du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Level}</td><td>{gameState.combinedStats.level}</td>
                    </tr><tr>
                        <td>{SYSTEM.Erfahrung}</td><td>{gameState.combinedStats.exp} / {gameState.combinedStats.nextLevel}</td>
                    </tr><tr>
                        <td>{SYSTEM.Leben}</td><td>{gameState.combinedStats.life} / {gameState.combinedStats.maxLife}</td>
                    </tr><tr>
                        <td>{SYSTEM.Runden}</td><td>{gameState.combinedStats.rounds} / {gameState.combinedStats.maxRounds}</td>
                    </tr><tr>
                        <td>{SYSTEM.Angriff}</td><td>{gameState.combinedStats.attack}</td>
                    </tr><tr>
                        <td>{SYSTEM.Verteidigung}</td><td>{gameState.combinedStats.defense}</td>
                    </tr><tr>
                        <td>{SYSTEM.Glück}</td><td>{gameState.combinedStats.luck}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouCan;