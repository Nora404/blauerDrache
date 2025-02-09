import React, { useState } from 'react';
import { Item } from '../../data/gameItems/ItemData';
import { SmallBackButton, SmallScanButton, SmallSellButton } from '../ActionButtons/ActionButton';
import { useRootStore } from '../../store';
import { getItemEffectText } from './ItemCards';
import Talk from '../../utility/Formatted/Talk';

type SellCardProps = {
    item: Item;
    quantity?: number;
    isEquipped?: boolean;
};

const SellCard: React.FC<SellCardProps> = ({ item, quantity, isEquipped }) => {
    const { playerFlux, playerEconomy } = useRootStore();
    const [showDescription, setShowDescription] = useState(false);

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

    const handleShowDescription = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDescription(prev => !prev);
    }

    return (
        <div>
            <div className='grid-row-sell'>
                <div>
                    <b>{item.name}</b> (x{quantity})<br />
                    {isEquipped && <Talk color='grün'>Ausgerüstet</Talk>}
                </div>
                <div>{getItemEffectText(item)}</div>

                {showDescription ?
                    <div className='flex-row'>
                        <div style={{ textAlign: "left" }}>{item.description}</div>
                        <SmallBackButton onClick={handleShowDescription} active={true} />
                    </div>
                    :
                    <div className='flex-row-right'>
                        <SmallScanButton onClick={handleShowDescription} active={true} />
                        <SmallSellButton onClick={handleSell} result={sellPrice} /><br />
                    </div>
                }

            </div>
        </div>
    );
};

export default SellCard;
