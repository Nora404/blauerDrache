import React from 'react';
import Header from '../layout/Header/Header';
import { GradientText } from '../utility/GradientText';
import { useGameStore } from '../data/gameStore';

type YouCanProps = {
};

const YouCan: React.FC<YouCanProps> = () => {
    const { gameData } = useGameStore();

    return (
        <div>
            <Header>Das kannst du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tr>
                    <td width={125}><GradientText colors={['#F7A131', '#57C6DD']}>Level: </GradientText>
                    </td><td>{gameData.stats.level}</td>
                </tr><tr>
                    <td><GradientText colors={['#bbbbbb', '#57C6DD']}>Erfahrung: </GradientText>
                    </td><td>{gameData.stats.exp} / {gameData.stats.nextLevel}</td>
                </tr><tr>
                    <td><GradientText colors={['#74dd4f', '#57C6DD']}>Leben: </GradientText>
                    </td><td>{gameData.stats.life} / {gameData.stats.maxLife}</td>
                </tr><tr>
                    <td><GradientText colors={['#C742DD', '#57C6DD']}>Runden: </GradientText>
                    </td><td>{gameData.stats.rounds} / {gameData.stats.maxRounds}</td>
                </tr><tr>
                    <td><GradientText colors={['#DD2C2C', '#57C6DD']}>Angriff: </GradientText>
                    </td><td>{gameData.stats.attack}</td>
                </tr><tr>
                    <td><GradientText colors={['#6D36F2', '#C7F288', '#57C6DD']}>Verteidigung: </GradientText>
                    </td><td>{gameData.stats.defense}</td>
                </tr><tr>
                    <td><GradientText colors={['#F2D828', '#57C6DD']}>Glück: </GradientText>
                    </td><td>{gameData.stats.luck}</td>
                </tr>
            </table>
        </div>
    );
};

export default YouCan;