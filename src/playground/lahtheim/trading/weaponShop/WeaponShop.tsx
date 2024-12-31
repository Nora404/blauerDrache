import React, { useState } from 'react';
import { GradientText } from '../../../../utility/GradientText';
import { useGameState } from '../../../../data/gameState';
import { emptyWeaponObj, Weapon, weapons } from '../../../../data/weaponData';
import { useGameStore } from '../../../../data/gameStore';
import { SYSTEM } from '../../../../data/colorfullStrings';

type WeaponShopProps = {
};

const WeaponShop: React.FC<WeaponShopProps> = () => {
    const [localWeapon, setLocalWeapon] = useState<Weapon>(emptyWeaponObj);
    const { gameStore, updateEconomy, updateEquipment } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const exchangePrice = (gameState.selectedWeapon.price / 1.2).toFixed();

    const handleClick = (Weapon: Weapon) => {
        setLocalWeapon(Weapon);
    };

    const handleBuy = () => {
        const currentGold = gameStore.economy.gold;
        updateEconomy({
            gold: (currentGold - localWeapon.price) + Number(exchangePrice)
        })
        updateEquipment({
            weapon: localWeapon.name
        })
    }

    const canBuy = () => {
        const canBuy = gameStore.economy.gold - localWeapon.price;
        return canBuy >= 0 ? true : false;
    }

    const showText = () => {
        return (
            canBuy()
                ? <GradientText colors={['#53E8AD']}>du es dir leisten kannst</GradientText>
                : <GradientText colors={['#DB6575']}>du es dir nicht leisten kannst</GradientText>
        )
    }

    return (
        <div className="max-width">
            <h2>Waffen Laden</h2>
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
                    {weapons.map((Weapon: Weapon) => (
                        <tr>
                            <td className='border-bd text-left padding-left'>
                                <button className={`${Weapon.name === localWeapon.name ? 'glow' : ''}`} onClick={() => handleClick(Weapon)}>{Weapon.label}</button>
                            </td>
                            <td className='border-bd text-center'>{Weapon.attack}</td>
                            <td className='border-bd text-right padding-right'>{Weapon.price} Gold</td>
                        </tr>
                    ))}
                </tbody>
            </table><br />

            <div className='text-left'>
                Du zeigst interesse an {localWeapon.label}&nbsp;
                {localWeapon.name !== "Nichts" && (
                    <>und liest auf einem kleinen Schild daneben den Preis von <GradientText colors={['#FFE452']}>{localWeapon.price}</GradientText>.
                        Nach einem Blick in deinen Goldbeutel ernnst du dass {showText()}.&nbsp;</>)}
                Die Verkäuferin schaut dich erwartungsvoll an.
                {localWeapon.name !== "Nichts" && (
                    <>
                        <GradientText colors={['#C237FF']}>"Für </GradientText>{gameState.selectedWeapon.label}
                        <GradientText colors={['#C237FF']}> währe ich bereit im Tausch </GradientText>
                        <GradientText colors={['#FFE452']}>{exchangePrice}</GradientText>
                        <GradientText colors={['#C237FF']}> Gold zu bezahlen"</GradientText>
                    </>
                )}
            </div><br />

            {localWeapon.name !== "Nichts" && canBuy()
                ? <div onClick={handleBuy}> {SYSTEM.kaufen} </div>
                : <div> {SYSTEM.disableKaufen} </div>
            }

        </div>
    );
};

export default WeaponShop;