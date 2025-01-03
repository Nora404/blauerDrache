import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { getSelectedObj, useNewGameStore } from '../store/newGameStore';

type YouHaveProps = {
};

const YouHave: React.FC<YouHaveProps> = () => {
    const { store } = useNewGameStore();
    const selected = getSelectedObj(store);

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
                        <td>{SYSTEM.Waffe}</td><td>{selected.weapon.label}</td>
                    </tr><tr>
                        <td>{SYSTEM.Rüstung}</td><td>{selected.armor.label}</td>
                    </tr><tr>
                        <td>{SYSTEM.Hand}</td><td>{selected.item.label}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default YouHave;