import React from 'react';
import { Item } from '../../data/gameItems/ItemData';
import { SmallBuyButton, SmallSwapButton } from '../ActionButtons/ActionButton';
import { useRootStore } from '../../store';
import { getItemEffectText } from './ItemCards';
import { WeaponName } from '../../data/gameItems/weaponData';
import { ArmorName } from '../../data/gameItems/armorData';

type BuyCardProps = {
    item: Item;
};

const BuyCard: React.FC<BuyCardProps> = ({ item }) => {
    const { playerFlux, playerEconomy, getPlayerObj } = useRootStore();

    const getPlayerItem = () => {
        if (item.category === "Waffen") { return getPlayerObj().weapon; }
        if (item.category === "Ausrüstung") { return getPlayerObj().armor; }
        return getPlayerObj().item;
    };
    const playerItem = getPlayerItem();

    const buyPrice = item.ek ?? 0;
    const canBuy = playerEconomy.data.gold - buyPrice >= 0;

    const refund = playerItem.ek ? Number((playerItem.ek / 1.2).toFixed()) : 0;
    const swapCost = buyPrice - refund;
    const canSwap = swapCost > 0 ? playerEconomy.data.gold - swapCost >= 0 : true;

    const handleBuy = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canBuy) return;
        playerEconomy.updatePlayerEconomy({
            gold: - buyPrice,
        });
        playerEconomy.updateItems(item.name, 1);
    };

    const handleSwap = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canSwap) return;
        playerEconomy.updatePlayerEconomy({
            gold: - swapCost,
        });
        playerEconomy.updateItems(item.name, 1);
        playerEconomy.updateItems(playerItem.name, -1);
        if (item.category === "Waffen") { playerFlux.updateWeapon(item.name as WeaponName); }
        else if (item.category === "Ausrüstung") { playerFlux.updateArmor(item.name as ArmorName); }
        else { playerFlux.updateInHand(item.name); }
    };

    return (
        <div>
            <div className='grid-row-00X0'>
                <div><b>{item.name}</b></div>
                <div>{getItemEffectText(item)}</div>
                <div style={{ textAlign: "left" }}>{item.description}</div>
                <div style={{ textAlign: "right" }}>
                    <SmallBuyButton onClick={handleBuy} disable={!canBuy} result={buyPrice} /><br />
                    <SmallSwapButton onClick={handleSwap} disable={!canSwap} result={swapCost} />
                </div>
            </div>
        </div>
    );
};

export default BuyCard;
