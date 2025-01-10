import React from 'react';
import Header from '../layout/Header/Header';
import { SYSTEM } from '../data/colorfullStrings';
import { getPlayerObj, useNewGameStore } from '../store/newGameStore';

type YouHaveProps = {
};

const YouHave: React.FC<YouHaveProps> = () => {
    const { store, consumeItem } = useNewGameStore();
    const selected = getPlayerObj(store);

    const handleConsume = () => {
        consumeItem(selected.item.name);
    }

    return (
        <div>
            <Header>Das hast du</Header>
            <table style={{ paddingLeft: '20px', marginBottom: '5px' }}>
                <tbody>
                    <tr>
                        <td width={125}>{SYSTEM.Gold}</td><td>{store.playerEconomy.gold || '0'}</td>
                    </tr><tr>
                        <td>{SYSTEM.Edelsteine}</td><td>{store.playerEconomy.edelsteine || '0'}</td>
                    </tr><tr>
                        <td>{SYSTEM.Ruf}</td><td>{store.playerBase.standing}</td>
                    </tr><tr>
                        <td>{SYSTEM.Respekt}</td><td>{store.playerBase.reputation} / {store.playerBase.nextReputation}</td>
                    </tr><tr>
                        <td>{SYSTEM.Waffe}</td><td>{selected.weapon.label || 'Nichts'}</td>
                    </tr><tr>
                        <td>{SYSTEM.Rüstung}</td><td>{selected.armor.label || 'Nichts'}</td>
                    </tr><tr>
                        <td>{SYSTEM.HandDer}</td><td>{selected.item.label || 'Nichts'}</td>
                    </tr>
                </tbody>
            </table>

            {selected.item.effects && (
                <button className='btn-border' style={{ width: '90%' }} onClick={handleConsume}>
                    {selected.item.name} benutzen
                </button>
            )}
        </div>
    );
};

export default YouHave;