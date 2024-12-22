import React from 'react';
import Header from '../layout/Header';
import { GradientText } from '../utility/GradientText';

type YouCanProps = {
    level?: number;
    exp?: number;
    life?: number;
    rounds?: number;
    attack?: number;
    defense?: number;
    luck?: number;
};

const YouCan: React.FC<YouCanProps> = (
    { level = 1, exp = 0, life = 100, rounds = 10, attack = 10, defense = 10, luck = 0 }
) => {

    return (
        <div>
            <Header>Das kannst du</Header>
            <table className='table'>
                <tr>
                    <td width={125}><GradientText colors={['#F7A131', '#57C6DD']}>Level: </GradientText></td><td>{level}</td>
                </tr><tr>
                    <td width={125}><GradientText colors={['#bbbbbb', '#57C6DD']}>Erfahrung: </GradientText></td><td>{exp} / 100</td>
                </tr><tr>
                    <td width={125}><GradientText colors={['#74dd4f', '#57C6DD']}>Leben: </GradientText></td><td>{life}</td>
                </tr><tr>
                    <td><GradientText colors={['#C742DD', '#57C6DD']}>Runden: </GradientText></td><td>{rounds}</td>
                </tr><tr>
                    <td><GradientText colors={['#DD2C2C', '#57C6DD']}>Angriff: </GradientText></td><td>{attack}</td>
                </tr><tr>
                    <td><GradientText colors={['#6D36F2', '#C7F288', '#57C6DD']}>Verteidigung: </GradientText></td><td>{defense}</td>
                </tr><tr>
                    <td><GradientText colors={['#F2D828', '#57C6DD']}>Glück: </GradientText></td><td>{luck}</td>
                </tr>
            </table>
        </div>
    );
};

export default YouCan;