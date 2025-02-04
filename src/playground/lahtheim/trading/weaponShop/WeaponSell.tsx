// #region [imports]
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import MultiColoredLetters from "../../../../utility/Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { useNavigate } from "react-router-dom";
import { useRootStore } from "../../../../store";
import { emptyArmorObj } from "../../../../data/gameItems/armorData";
import { Item } from "../../../../data/gameItems/ItemData";
import ItemCard from "../../../../layout/Cards/ItemCards";
// #endregion


const WeaponSell: React.FC = observer(() => {
  const [localArmor, setLocalArmor] = useState<Item>(emptyArmorObj);
  const { playerEconomy } = useRootStore();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/weapon-shop");
  };

  const handleClick = (armor: Item) => {
    setLocalArmor(armor);
  };

  const getItemsByCategory = () => Object.values(playerEconomy.data.items)
    .filter(entry => entry.item.category === "Waffen")
    .map(entry => ({
      item: entry.item,
      quantity: entry.quantity
    }));

  const haveItem = getItemsByCategory();

  return (
    <div className="max-width">
      <h2>Waffen verkaufen</h2>
      <p className="mb-1 text-left">
        Enttäuscht stellst du fest, dass die{" "}
        <MultiColoredLetters colors={yellowColors}>Autorin</MultiColoredLetters>{" "}
        der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar Wörter,
        aber das hilft dir auch nicht weiter.
      </p>
      <br />

      {haveItem.length > 0
        ? haveItem.map(({ item, quantity }) => (
          <ItemCard
            key={item.name}
            item={item}
            quantity={quantity}
            onClick={() => handleClick(item)}
            mode="sell"
          />
        ))
        : <>Du hast keine Waffen zum Verkaufen.</>
      }

      <ActionButton onClick={handleBack} label="Sich abwenden" />
    </div>
  );
});


export default WeaponSell;
