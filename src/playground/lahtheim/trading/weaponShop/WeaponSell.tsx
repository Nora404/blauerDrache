// #region [imports]
import React from "react";
import { observer } from "mobx-react-lite";
import MultiColoredLetters from "../../../../utility/Formatted/MultiColoredLetters";
import { yellowColors } from "../../../../data/helper/colorMappingData";
import ActionButton from "../../../../layout/ActionButtons/ActionButton";
import { useNavigate } from "react-router-dom";
// #endregion

// #region [prepare]
type WeaponSellProps = {};

const WeaponSell: React.FC<WeaponSellProps> = observer(() => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/weapon-shop");
  };
  // #endregion

  // #region [jsx]
  return (
    <div className="max-width">
      <h2>Waffen verkaufen</h2>
      <p className="mb-1 text-left">
        Endtäuschst stellst du fest, dass die{" "}
        <MultiColoredLetters colors={yellowColors}>Autorin</MultiColoredLetters>{" "}
        der Texte hier noch keinen Inhalt hinzugefügt hat. Außer diese paar
        Wörter, aber das hilft dir auch nicht weiter.
      </p>
      <br />

      <ActionButton onClick={handleBack} label="Sich abwenden" />
    </div>
  );
  // #endregion
});

export default WeaponSell;
