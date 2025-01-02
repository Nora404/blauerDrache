//#region [imports]
import React, { useState } from 'react';
import { GradientText } from '../../../../utility/GradientText';
import { useGameState } from '../../../../data/gameState';
import { emptyWeaponObj, Weapon, weapons } from '../../../../data/weaponData';
import { useGameStore } from '../../../../data/gameStore';
import { SYSTEM } from '../../../../data/colorfullStrings';
//#endregion

//#region [prepare]
type WeaponShopProps = {
};

const WeaponShop: React.FC<WeaponShopProps> = () => {
    const [localWeapon, setLocalWeapon] = useState<Weapon>(emptyWeaponObj);
    const { gameStore, setEconomy: updateEconomy, setEquipment: updateEquipment } = useGameStore();
    const gameState = useGameState();
    if (!gameState) return null;

    const exchangePrice = (gameState.selectedWeapon.price / 1.2).toFixed();
    //#endregion

    //#region [handler]
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
    //#endregion

    //#region [helper]
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
    //#endregion

    //#region [jsx]
    return (
        <div className="max-width">
            <h2>Waffen Laden</h2>
            <p className='mb-1 text-left'>
                Schwerfällig und mit lautem Quietschen öffnet sich die Tür zum Waffenladen. Du bist dir nicht sicher, ob hier Waffen oder Haushaltsgegenstände verkauft werden.
                Neben Messern liegen auch Löffel, Seile, ein Tischholzbein und Glasflaschen.
                Die offenen Regale, welche mitten im Raum stehen, führen dich weiter in den Raum hinein.
                In einer Ecke des Ladens steht ein Raumtrenner, hinter dem ein sanftes grünes Leuchten schimmert. Bevor du dich ihm nähern kannst kommt ein stämmiger Mann
                mittleren Alters und frei von Kopfhaaren, die dafür gleichmäßig auf seinem Arm verteilt sind, auf dich zu.<br />
                <GradientText colors={['#D1813B']}> „Wie kann ich dir helfen? Brauchst du Waffen, um auf's Feld zu ziehen oder finden deine Schlachten in der Küche statt, was meiner Meinung nach VIEL gefährlicher ist!“  </GradientText>
                Er scheint sich sehr über seinen Witz zu amüsieren, breitet beide Arme aus und lädt dich ein, in seinen Waren zu stöbern - und vor allem zu kaufen.
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
                        Nach einem Blick in deinen Goldbeutel ernnst du, dass {showText()}.&nbsp;</>)}
                Der Verkäufer schaut dich erwartungsvoll an.
                {localWeapon.name !== "Nichts" && (
                    <>
                        <GradientText colors={['#D1813B']}>"Für </GradientText>{gameState.selectedWeapon.label}
                        <GradientText colors={['#D1813B']}> wäre ich bereit im Tausch </GradientText>
                        <GradientText colors={['#FFE452']}>{exchangePrice}</GradientText>
                        <GradientText colors={['#D1813B']}> Gold zu bezahlen"</GradientText>
                    </>
                )}
            </div><br />

            {localWeapon.name !== "Nichts" && canBuy()
                ? <div onClick={handleBuy}> {SYSTEM.kaufen} </div>
                : <div> {SYSTEM.disableKaufen} </div>
            }

        </div>
    );
    //#endregion
};

export default WeaponShop;