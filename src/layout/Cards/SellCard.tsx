import React from 'react';
import { Item } from '../../data/gameItems/ItemData';
import { SmallSellButton } from '../ActionButtons/ActionButton';
import { useRootStore } from '../../store';
import { getItemEffectText } from './ItemCards';

type SellCardProps = {
    item: Item;
    quantity?: number;
};

const SellCard: React.FC<SellCardProps> = ({ item, quantity }) => {
    const { playerFlux, playerEconomy } = useRootStore();

    const sellPrice = item.ek ? Number((item.ek / 1.2).toFixed()) : 0;

    const handleSell = (e: React.MouseEvent) => {
        e.stopPropagation();

        playerEconomy.updatePlayerEconomy({
            gold: + sellPrice,
        });
        playerEconomy.updateItems(item.name, -1);

        const hasItem = Object.values(playerEconomy.data.items).some(obj => obj.item.name === item.name);

        if (!hasItem) {
            if (item.category === "Waffen") { playerFlux.updateWeapon("Nichts"); }
            else if (item.category === "Ausrüstung") { playerFlux.updateArmor("Nichts"); }
            else { playerFlux.updateInHand("Nichts"); }
        }
    };

    return (
        <div>
            <div className='grid-row-00X0'>
                <div><b>{item.name}</b> (x{quantity})</div>
                <div>{getItemEffectText(item)}</div>
                <div style={{ textAlign: "left" }}>{item.description}</div>
                <div style={{ textAlign: "right" }}>
                    <SmallSellButton onClick={handleSell} result={sellPrice} /><br />
                </div>
            </div>
        </div>
    );
};

export default SellCard;
