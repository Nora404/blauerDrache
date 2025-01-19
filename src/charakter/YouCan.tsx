import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../store';

type YouCanProps = {
};

const YouCan: React.FC<YouCanProps> = observer(() => {

    const { playerBase, getCombinedStats } = useRootStore();
    const combined = getCombinedStats();

    return (
        <div>
            <Header>Das kannst du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Level}</td><td>{playerBase.store.level}</td>
                    </tr><tr>
                        <td>{SYSTEM.Erfahrung}</td><td>{playerBase.store.exp} / {playerBase.store.nextLevel}</td>
                    </tr><tr>
                        <td>{SYSTEM.Leben}</td><td>{combined.life} / {combined.maxLife}</td>
                    </tr><tr>
                        <td>{SYSTEM.Runden}</td><td>{combined.rounds} / {combined.maxRounds}</td>
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
});

export default YouCan;