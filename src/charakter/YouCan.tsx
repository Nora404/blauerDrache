import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { getCombinedStats, useNewGameStore } from '../store/newGameStore';

type YouCanProps = {
};

const YouCan: React.FC<YouCanProps> = () => {

    const { store } = useNewGameStore();
    const combined = getCombinedStats(store);

    return (
        <div>
            <Header>Das kannst du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Level}</td><td>{store.playerBase.level}</td>
                    </tr><tr>
                        <td>{SYSTEM.Erfahrung}</td><td>{store.playerBase.exp} / {store.playerBase.nextLevel}</td>
                    </tr><tr>
                        <td>{SYSTEM.Leben}</td><td>{combined.life} / {store.playerBase.maxLife}</td>
                    </tr><tr>
                        <td>{SYSTEM.Runden}</td><td>{combined.rounds} / {store.playerBase.maxRounds}</td>
                    </tr><tr>
                        <td>{SYSTEM.Angriff}</td><td>{combined.attack}</td>
                    </tr><tr>
                        <td>{SYSTEM.Verteidigung}</td><td>{combined.defense}</td>
                    </tr><tr>
                        <td>{SYSTEM.Glück}</td><td>{combined.luck}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouCan;