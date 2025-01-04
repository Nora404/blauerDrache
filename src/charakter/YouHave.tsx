import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { useNewGameStore } from '../store/newGameStore';

type YouHaveProps = {
};

const YouHave: React.FC<YouHaveProps> = () => {
    const { store } = useNewGameStore();

    return (
        <div>
            <Header>Das hast du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Gold}</td><td>{store.playerEconomy.gold}</td>
                    </tr><tr>
                        <td>{SYSTEM.Edelsteine}</td><td>{store.playerEconomy.edelsteine}</td>
                    </tr><tr>
                        <td>{SYSTEM.Waffe}</td><td>{store.playerFlux.weapon.label}</td>
                    </tr><tr>
                        <td>{SYSTEM.Rüstung}</td><td>{store.playerFlux.armor.label}</td>
                    </tr><tr>
                        <td>{SYSTEM.HandDer}</td><td>{store.playerFlux.item.label}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouHave;