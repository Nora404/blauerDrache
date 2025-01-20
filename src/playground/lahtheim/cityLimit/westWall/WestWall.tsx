import React from 'react';
import { NPC, PLACES } from '../../../../data/helper/colorfullStrings';
import ActionButton from '../../../../layout/ActionButtons/ActionButton';
import { GradientText } from '../../../../utility/GradientText';
import { yellowColors } from '../../../../data/helper/colorMappingData';
import MultiColoredLetters from '../../../../utility/MultiColoredLetters';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../../store';

type WestWallProps = {
};

const WestWall: React.FC<WestWallProps> = observer(() => {
  const { gameTime } = useRootStore();
  const navigate = useNavigate();

  const handleHunter = () => {
    navigate("/west-wall-hunter");
  }
  const handleDor = () => {
    navigate("/west-wall-dor");
  }
  const handleFlower = () => {
    navigate("/west-wall-flower");
  }
  const handleKick = () => {
    navigate("/west-wall-kick");
  }

  return (
    <div className='max-width'>
      <h2>{PLACES.Westmauer}</h2>
      <p className='mb-1 text-left'>
        Die Häuser schmiegen sich an die westliche Stadtmauer von Lahtheim.
        Als du dich dieser Mauer näherst, siehst du wie zwei Wachen den Pfad
        entlang der Mauer folgen. Du bist zu weit entfernt, um ihre Unterhaltung
        zu belauschen. Während die Häuser links dicht aneinandergereiht sind,
        werden es rechts immer weniger.

      </p>

      {gameTime.data.gameDay === "Tag" && (
        <>
          <p className='mb-1 text-left'>
            Hier öffnet sich ein kleiner <b><GradientText colors={['#a8ef52']}>grüner Park</GradientText></b>, eine akkurate Landschaft
            mit wilden, großen Bäumen und farbenfrohen Blumenfeldern, deren Blüten Muster
            formen, die nur von oben voll zur Geltung kommen. Zwischen den <em>Blumen</em> führen
            Kieswege hindurch, die dich zu einem künstlichen <b>Teich</b> führen. Das Wasser
            glitzert im <MultiColoredLetters colors={yellowColors}>Sonnenlicht</MultiColoredLetters>, Enten schwimmen gemächlich zwischen Libellen, die
            über der Oberfläche tanzen. Eine Statue eines Bogenschützen steht am Ufer
            und blickt über das Wasser hinweg, als würde sie den Teich bewachen.
          </p>
          <p className='mb-1 text-left'>
            Dort wo du stehst, ist überall nur perfekt geschnittener Rasen.
            Weiter am Rand zwischen Park und Mauer steht eine kleine <b>Holzhütte</b>.
            Vor dem Eingang steht eine {NPC.Jägerin} mit einem Umhang aus Fell und Kleidung aus Leder.
            Sie hält einen gespannten Bogen in der Hand, ihr Ziel ist ein Heu Block, der vor einem Baum steht.
          </p><br />

          <ActionButton onClick={handleHunter} label='Mit der Jägerin sprechen' />
          <ActionButton onClick={handleFlower} label='Eine der Blumen pflücken' />
          <ActionButton onClick={handleKick} label='Gegen einen der Bäume treten' />
        </>
      )}

      {gameTime.data.gameDay === "Nacht" && (
        <>
          <p className='mb-1 text-left'>
            Im Licht der Laternen wirft die westliche Stadtmauer lange Schatten auf
            die wenigen Häuser, die hier noch stehen. Der am Tage <b><GradientText colors={['#a8ef52']}>grüne Park</GradientText></b> liegt still und verlassen.
            Die <em>Blumen</em>, die am Tag so lebendig wirken, scheinen nun wie in dunklen Schleier gehüllt.
            Das Wasser des Teiches ist ruhig und glatt, ein schwarzer Spiegel, in dem sich das
            schimmernde <MultiColoredLetters colors={yellowColors}>Mondlicht</MultiColoredLetters> bricht. Eine Statue eines Bogenschützen am Rand des Teichs steht
            wachsam da, ihr Schatten fällt lang über den Kiesweg.
          </p>
          <p className='mb-1 text-left'>
            Dort wo du stehst, ist überall nur perfekt geschnittener Rasen.
            Weiter am Rand zwischen Park und Mauer steht eine kleine <b>Holzhütte</b>.
            In den Fenstern erkennst du brennendes Licht, sein Flackern lässt dich an die warme
            Flamme eines Kamines denken. Ein Umriss schiebt sich am Fenster vorbei, es scheint jemand zu
            Hause und wach zu sein.
          </p><br />

          <ActionButton onClick={handleDor} label='An die Tür klopfen' />
          <ActionButton onClick={handleFlower} label='Eine der Blumen pflücken' />
          <ActionButton onClick={handleKick} label='Gegen einen der Bäume treten' />
        </>
      )}

    </div>
  );
});

export default WestWall;
