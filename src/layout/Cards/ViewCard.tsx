import React from 'react';
import { Item, itemMap } from '../../data/gameItems/ItemData';
import { DropButton, EquipButton, RemoveButton, UseButton } from '../ActionButtons/ActionButton';
import { useRootStore } from '../../store';
import { getItemEffectText } from './ItemCards';
import { WeaponName } from '../../data/gameItems/weaponData';
import { ArmorName } from '../../data/gameItems/armorData';

type ViewCardProps = {
    item: Item;
    showDetails: boolean;
    quantity?: number;
};

const ViewCard: React.FC<ViewCardProps> = ({ item, showDetails, quantity }) => {
    const { playerFlux, playerEconomy, getPlayerObj } = useRootStore();

    const getPlayerItem = () => {
        if (item.category === "Waffen") { return getPlayerObj().weapon; }
        if (item.category === "Ausrüstung") { return getPlayerObj().armor; }
        return getPlayerObj().item;
    };
    const playerItem = getPlayerItem();

    // Ausrüsten
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

    // Benutzen
    const handleUse = (e: React.MouseEvent) => {
        e.stopPropagation();
        playerEconomy.consumeItem(item.name);
    }

    // Ablegen
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

    // Wegwerfen
    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        playerEconomy.updateItems(item.name, -1);
    }

    return (
        <div>
            <div><b>{item.name}</b> (x{quantity})</div>
            <div style={{ fontSize: "75%", lineHeight: "150%" }}>
                {getItemEffectText(item)}
            </div>
            {showDetails && (
                <div>
                    {item.category === "Nahrung" && <UseButton onClick={handleUse} disable={false} />}
                    <EquipButton onClick={handleItem} disable={false} />
                    {item.name === playerItem.name && <DropButton onClick={handleDrop} disable={false} />}
                    <RemoveButton onClick={handleRemove} disable={false} />
                </div>
            )}
        </div>
    );
};

export default ViewCard;
