import React, { useState, useEffect } from 'react';
import { Item, itemMap } from '../../data/gameItems/ItemData';
import { SmallDropButton, SmallEquipButton, SmallRemoveButton, SmallScanButton, SmallUseButton } from '../ActionButtons/ActionButton';
import { useRootStore } from '../../store';
import { getItemEffectText } from './ItemCards';
import { WeaponName } from '../../data/gameItems/weaponData';
import { ArmorName } from '../../data/gameItems/armorData';
import Talk from '../../utility/Formatted/Talk';

type ViewCardProps = {
    item: Item;
    quantity?: number;
    isEquipped?: boolean;
};

const ViewCard: React.FC<ViewCardProps> = ({ item, quantity, isEquipped }) => {
    const { playerFlux, playerEconomy, getPlayerObj } = useRootStore();
    const [isActive, setIsActive] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Beim Mounten prüfen, ob es ein mobiles Gerät ist
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 800px)');
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        setIsMobile(mq.matches);
        mq.addEventListener('change', handleChange);
        return () => mq.removeEventListener('change', handleChange);
    }, []);

    // Nur auf Nicht-Mobile Geräten die Mouse-Events anwenden
    const handleMouseEnter = () => { if (!isMobile) setIsActive(true); };
    const handleMouseLeave = () => { if (!isMobile) setIsActive(false); };

    const getPlayerItem = () => {
        if (item.category === "Waffen") { return getPlayerObj().weapon; }
        if (item.category === "Ausrüstung") { return getPlayerObj().armor; }
        return getPlayerObj().item;
    };
    const playerItem = getPlayerItem();

    // Aktionen
    const handleItem = (e: React.MouseEvent) => {
        e.stopPropagation();
        const cat = itemMap[item.name].category;
        switch (cat) {
            case "Waffen":
                playerFlux.updateWeapon(item.name as WeaponName);
                break;
            case "Ausrüstung":
                playerFlux.updateArmor(item.name as ArmorName);
                break;
            default:
                playerFlux.updateInHand(item.name);
                return;
        }
    };

    const handleUse = (e: React.MouseEvent) => {
        e.stopPropagation();
        playerEconomy.consumeItem(item.name);
    };

    const handleDrop = (e: React.MouseEvent) => {
        e.stopPropagation();
        const cat = itemMap[item.name].category;
        switch (cat) {
            case "Waffen":
                playerFlux.updateWeapon("Nichts");
                break;
            case "Ausrüstung":
                playerFlux.updateArmor("Nichts");
                break;
            default:
                playerFlux.updateInHand("Nichts");
                return;
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        playerEconomy.updateItems(item.name, -1);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='grid-row-view'>
                <div>
                    <b>{item.name}</b> (x{quantity})<br />
                    {isEquipped && <Talk color='grün'>Ausgerüstet</Talk>}
                </div>
                <div>{getItemEffectText(item)}</div>
                <div className='flex-row-right'>
                    <SmallScanButton onClick={handleRemove} active={isMobile || isActive} />
                    {item.category === "Nahrung" &&
                        <SmallUseButton onClick={handleUse} active={isMobile || isActive} />}
                    {playerItem.name === item.name &&
                        <SmallDropButton onClick={handleDrop} active={isMobile || isActive} />}
                    {playerItem.name !== item.name &&
                        <SmallEquipButton onClick={handleItem} active={isMobile || isActive} />}
                    <SmallRemoveButton onClick={handleRemove} active={isMobile || isActive} />
                </div>
            </div>
        </div>
    );
};

export default ViewCard;
