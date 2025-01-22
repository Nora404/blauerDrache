//#region [imports]
import React, { useState } from 'react';
import { Armor, ArmorName, armors, emptyArmorObj } from '../../../../data/armorData';
import { GradientText } from '../../../../utility/Formatted/GradientText';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';
//#endregion

//#region [prepare]
type EquipmentShopProps = {
};

const EquipmentShop: React.FC<EquipmentShopProps> = observer(() => {
    const [localArmor, setLocalArmor] = useState<Armor>(emptyArmorObj);
    const { playerEconomy, playerFlux, getPlayerObj } = useRootStore();
    const selected = getPlayerObj();


    const exchangePrice = (selected.armor.price / 1.2).toFixed();
    //#endregion

    //#region [handler]
    const handleClick = (armor: Armor) => {
        setLocalArmor(armor);
    };

    const handleBuy = () => {
        playerEconomy.updatePlayerEconomy({
            gold: Number(exchangePrice) - localArmor.price
        })
        playerFlux.updateArmor(localArmor.name as ArmorName)
    }
    //endregion

    //#region [helper]
    const canBuy = () => {
        const canBuy = playerEconomy.data.gold - localArmor.price;
        return canBuy >= 0 ? true : false;
    }

    const showText = () => {
        return (
            canBuy()
                ? <GradientText colors={['#53E8AD']}>du es dir leisten kannst</GradientText>
                : <GradientText colors={['#DB6575']}>du es dir nicht leisten kannst</GradientText>
        )
    }
    //endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <h2>Ausrüstungs Laden</h2>
            <p className='mb-1 text-left'>
                Du öffnest die Tür zum Ausrüstungs Laden. Es wirkt auf dich eher wie eine Abstellkammer oder einem Flohmarkt in einem viel zu kleinen Raum.
                Hinter einem Berg von Ramsch und Pröll erkennst du eine Person.<br />
                <GradientText colors={['#C237FF']}> „Willkommen in meiner Fundgrube von wertvollen Helfern und Lebensrettern. Ein Muss für jeden Helden und Nichthelden!“ </GradientText>
                erklingt ihre Stimme. Du suchst nach diesen „Lebensrettern“, schaust dich um und entdeckst einen besonders chaotischen Haufen, der dich irgendwie anlächelt.
            </p><br />

            <table width={'500px'}>
                <thead>
                    <th className='border-bs'>Name</th>
                    <th className='border-bs'>Verteidigung</th>
                    <th className='border-bs'>Preis</th>
                </thead>
                <tbody>
                    {armors.map((armor: Armor) => (
                        <tr>
                            <td className='border-bd text-left padding-left'>
                                <button className={`${armor.name === localArmor.name ? 'glow' : ''}`} onClick={() => handleClick(armor)}>{armor.label}</button>
                            </td>
                            <td className='border-bd text-center'>{armor.defense}</td>
                            <td className='border-bd text-right padding-right'>{armor.price} Gold</td>
                        </tr>
                    ))}
                </tbody>
            </table><br />

            <div className='text-left'>
                Du zeigst interesse an {localArmor.label}&nbsp;
                {localArmor.name !== "Nichts" && (
                    <>und liest auf einem kleinen Schild daneben den Preis von <GradientText colors={['#FFE452']}>{localArmor.price}</GradientText>.
                        Nach einem Blick in deinen Goldbeutel ernnst du, dass {showText()}.&nbsp;</>)}
                Die Verkäuferin schaut dich erwartungsvoll an.
                {localArmor.name !== "Nichts" && (
                    <>
                        <GradientText colors={['#C237FF']}>"Für </GradientText>{selected.armor.label}
                        <GradientText colors={['#C237FF']}> wäre ich bereit im Tausch </GradientText>
                        <GradientText colors={['#FFE452']}>{exchangePrice}</GradientText>
                        <GradientText colors={['#C237FF']}> Gold zu bezahlen"</GradientText>
                    </>
                )}
            </div><br />

            {localArmor.name !== "Nichts" && canBuy()
                ? <ActionButton onClick={handleBuy} label='kaufen' />
                : <ActionButton disable={true} label='kaufen' />
            }

        </div>
    );
    //endregion
});

export default EquipmentShop;