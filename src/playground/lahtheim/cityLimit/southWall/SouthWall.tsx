import React from 'react';
import { PLACES } from '../../../../data/helper/colorfullStrings';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { useNavigate } from 'react-router-dom';

type SouthWallProps = {
};

const SouthWall: React.FC<SouthWallProps> = () => {
  const navigate = useNavigate();

  const handleSymbol = () => {
    navigate("/south-wall-symbol");
  }
  const handleTreasure = () => {
    navigate("/south-wall-treasure");
  }

  return (
    <div className='max-width'>
      <h2>{PLACES.Südmauer}</h2>
      <p className='mb-1 text-left'>
        Hinter dir erhebt sich die {PLACES.Kirche}, und vor dir erstreckt sich die steinerne
        Wand der {PLACES.Südmauer}. Die Mauer wirkt hier fast wie von der Natur zurückerobert.
        Efeuranken klettern die Steine empor, während Büsche und Wildgräser den Übergang
        von Mauer zu Boden verschleiern. Doch nicht alles, was hier wächst, ist natürlich:
        Einige Bewohner scheinen diesen Ort als <b>Müllhalde</b> zu nutzen. Zerbrochene Krüge,
        verrottete Stoffreste und sogar Knochenstücke liegen verstreut. Der beißende
        Gestank lässt dich die Nase rümpfen. Es widerstrebt dir hier länger zu verweilen.
      </p>

      <p className='mb-1 text-left'>
        Trotz des Chaos bleibt dein Blick an einem seltsamen <b>Symbol</b> hängen, das in die
        Mauer geritzt wurde. Es ist etwa einen Meter groß: ein Kreis, durchzogen von sich
        überlagernden Runen und Linien, die aus dem Kreis hinauslaufen. Efeu wurde hier
        grob entfernt, doch die Gräser und Büsche um das <b>Symbol</b> sind zerknickt, als ob
        jemand vor kurzem hier gewesen wäre. Spuren von aufgewühltem Boden und ein
        abgebrochener Zweig deuten darauf hin, dass dieser Ort etwas verbirgt – vielleicht
        einen geheimen Weg oder Eingang, der gefunden werden will
      </p><br />

      <ActionButton onClick={handleSymbol} label='Symbol untersuchen' />
      <ActionButton onClick={handleTreasure} label='Nach verlorenen „Schätzen“ suchen' />
    </div>
  );
};

export default SouthWall;
