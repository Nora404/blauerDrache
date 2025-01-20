import React from 'react';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import { useNavigate } from 'react-router-dom';

type EastWallProps = {
};

const EastWall: React.FC<EastWallProps> = () => {
  const navigate = useNavigate();

  const handleTower = () => {
    navigate("/east-wall-tower");
  }
  const handleBox = () => {
    navigate("/east-wall-box");
  }
  const handleGear = () => {
    navigate("/east-wall-gear");
  }
  const handleFence = () => {
    navigate("/east-wall-fence");
  }


  return (
    <div className='max-width'>
      <h2>{PLACES.Ostmauer}</h2>
      <p className='mb-1 text-left'>
        Du lässt den {PLACES.Handelsbezirk} hinter dir. Durch die Gebäude hindurch erkennst du mit jedem
        weiteren Schritt immer deutlicher die hohe <b>Stadtmauer</b>. Deutlich erkennst du die Spuren
        des Steinmetzes, der die alten rissigen Steine zu reparieren versuchte. Oben auf der Mauer
        verlaufen <b>Wehrgänge</b>, geschützt von Zinnen und gelegentlichen kleineren <b>Türmen</b>. Der Eingang
        eines dieser Türme befindet sich nur wenige Meter von dir entfernt. Vor der Tür
        sind <i>Holzkisten</i> und <i>Werkzeuge</i> gestapelt. Die Werkzeuge wirken benutzt,
        einige tragen noch Spuren von Mörtel und Staub, als wären sie gerade erst abgestellt worden.
      </p>

      <p className='mb-1 text-left'>
        Noch während du diese Szenerie betrachtest, erkennst du schmale {PLACES.Gassen}, die zu den Werkstätten
        von Lahtheim führt. Steinmetz, Holzverarbeitung, Schmied – mehr kannst du von hier aus nicht erkennen.
        Ein hölzerner Zaun blockiert den Weg, als wolle er klarstellen, dass dies kein offizieller Eingang ist
      </p><br />

      <p className='mb-1 text-left'>
        <ActionButton onClick={handleTower} label='Versuchen die Tür zum Turm zu öffnen' />
        <ActionButton onClick={handleBox} label='Schauen was in den Holzkisten steckt' />
        <ActionButton onClick={handleGear} label='Das Werkzeug untersuchen' />
        <ActionButton onClick={handleFence} label='Versuchen über den Zaun zu klettern' />
      </p>

    </div>
  );
};

export default EastWall;
