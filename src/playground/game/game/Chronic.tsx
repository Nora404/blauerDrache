import React, { useState } from "react";
import ActionButton from "../../../layout/ActionButtons/ActionButton";
import Header from "../../../layout/Header/Header";

type ChronicProps = {
  title?: string;
  onClick?: () => void;
};

const Chronic: React.FC<ChronicProps> = () => {
  const [side, setSide] = useState<number>(1);

const handleClick = (side: number)=>{
  setSide(side);
}

  return (
    <div className="max-widht">
      <h2>Chroniken von Aurendia</h2>

<div className="flex-row">
<ActionButton onClick={()=>{handleClick(1)}} label="Band I: Das Erwachen"/>
<ActionButton onClick={()=>{handleClick(2)}} label="Band II: Hüter der Quelle"/>
<ActionButton onClick={()=>{handleClick(3)}} label="Band III: Der ewige Ruf"/>
</div>



      {side === 1 && <div>
        <br/><Header>Band I: Das Erwachen</Header><br/>
        <div className="text-left">
      <i>Auszug aus „Die Chroniken von Aurendia - Band I: Das Erwachen“</i>
      <p className="mb-1">
          Bevor Zeit gemessen wurde, bevor es Formen oder Begrenzungen gab, war die Welt ein unendliches, 
          stilles Gewebe aus Nichts und Alles zugleich. Es gab keinen Himmel, kein Land, keine Meere, 
          nur eine grenzenlose, unergründliche Stille. Alles Existierende war in einem einzigen Punkt vereint, 
          undefiniert, und doch von unermesslicher Energie erfüllt.
      </p>
      <p className="mb-1">
          Aus diesem unfassbaren Zustand, in dem Alles gleichzeitig Nichts war, begannen die ersten Bewegungen. 
          An bestimmten Stellen verfestigte sich das unteilbare Gewebe, und winzige Funken des Bewusstseins entstanden. 
          Diese Funken sammelten mehr von dem, was sie umgab, formten sich und begannen, ihre Umgebung zu verändern. 
          Die ersten Wesen erwachten. Sie hatten keine Namen, keine feste Form, aber sie waren lebendig, 
          der erste Ausdruck des Seins.
      </p>
      <p className="mb-1">
          Mit jedem dieser Wesen entstand ein neuer Impuls. Einige sammelten sich, wurden größer und mächtiger, 
          andere zerfielen wieder ins Nichts. Doch einige der Ersten entwickelten einen Drang, sich zu vermehren, 
          ihre Existenz auszuweiten und das Gewebe um sie herum zu prägen. Ihre Bewegungen zogen Spuren, 
          und diese Spuren formten die ersten Konturen der Welt. Die Wüste, die Berge, die ersten Meere, 
          all dies entstand durch das Wachstum der Ersten.
      </p>
      <p className="mb-1">
          Doch mit der Ausbreitung der Welt wuchs auch die Spannung. Einige Wesen wollten mehr Raum, mehr Energie. Sie versuchten, die Anderen zu verschlingen, sich ihre Essenz einzuverleiben. Die Harmonie der jungen Welt zerbrach, als die Ersten in einen Konflikt gerieten. Ihre Kämpfe zogen Narben durch die Realität. Manche Wesen wurden ausgelöscht, andere verschmolzen, und mit ihnen verschwanden Teile des Gewebes selbst. Licht, Dunkelheit, Harmonie, Chaos – diese Zustände verloren ihre Reinheit und wurden zu etwas, das sich den Lebenden nur noch als Schatten zeigt.
      </p>
      <p className="mb-1">
          Der Krieg endete nicht durch einen Sieg, sondern durch eine neue Art von Wesen, die aus den Kämpfen hervorging. 
          Diese Wesen waren die Drachen, mächtig, aber nicht mehr rein wie die Ersten. 
          Sie trugen Spuren der alten Konflikte in sich und waren doch die neuen Hüter der Welt. 
          In einer letzten Geste der Verzweiflung teilten sie das Gewebe der Realität in feste Formen und zogen 
          sich in verschiedene Regionen zurück, um über ihre neuen Domänen zu wachen. So begann die Welt, 
          wie wir sie heute kennen.
          </p>
          </div>
      </div>}

      {side === 2 && <div>
        <br/><Header>Band II: Hüter der Quelle</Header><br/>
        <div className="text-left">
      <i>Auszug aus „Die Chroniken von Aurendia - Band II: Hüter der Quelle“</i>
      <p className="mb-1">
          Jahrhunderte nach dem Ende des Krieges war die Welt geformt, aber leer. Die Drachen hatten sich 
          auf ihre Domänen zurückgezogen, die Wälder wuchsen, die Flüsse strömten, und die Berge ragten in den Himmel. 
          Doch die Welt war still. Keine Stimmen füllten die Ebenen, keine Hände bauten auf dem Boden. 
          Die Drachen beobachteten aus der Ferne, wie ihre Schöpfung in Stille verharrte.
      </p>
      <p className="mb-1">
          Einer von ihnen, Azulion, der Blaue Drache, sah das Potenzial in der Leere. Sein Blick fiel auf eine weite Wüste, 
          ein unfruchtbares Land ohne Leben. Mit einem mächtigen Schlag seiner Schwingen rief er die Wolken herbei, 
          und wochenlanger Regen verwandelte den Sand in blühende Felder. Doch das allein genügte ihm nicht. 
          Er nahm eine seiner Schuppen und drückte sie tief in den Boden, wo sie sich mit der Essenz der Welt 
          verband und eine Quelle schuf, die niemals versiegen würde. Ein Fluss begann zu fließen, und am Ende 
          des Flusses formte sich ein großer See, der das Land für alle Zeiten nähren sollte.
      </p>
      <p className="mb-1">
          Azulion zog sich zurück, aber nicht, bevor er einen letzten Funken seiner Essenz in die Quelle legte. 
          Dieser Funken verband ihn für immer mit dem Land, das er geschaffen hatte. Als die ersten Wesen, Menschen, 
          Elfen, Zwerge und Faen, das fruchtbare Land entdeckten, fühlten sie sofort eine seltsame Wärme und Harmonie. 
          Sie nannten das Land Aurendia und siedelten sich um die Quelle an. Ein Dorf entstand: Lahtheim.
      </p>
      <p className="mb-1">
          Die Bewohner verehrten Azulion als ihren Schutzpatron, doch er zeigte sich nie. Er blieb eine Legende, ein Mythos. 
          Generationen vergingen, und die Menschen begannen, den Drachen zu vergessen. Die Quelle wurde zur bloßen Notwendigkeit, 
          der See ein gewöhnliches Gewässer. Doch eines Tages verdunkelte sich der Himmel, und eine unnatürliche 
          Kälte ergriff das Land. Die Tiere flohen, die Felder verwelkten, und die Flüsse trockneten aus. 
          Die Naturverbundenen hörten in ihren Träumen eine Stimme, einen Hilferuf.
      </p>
      <p className="mb-1">
          In dieser dunkelsten Stunde erhob sich Azulion erneut. Sein gewaltiger Körper tauchte aus dem See auf, 
          und mit einem einzigen Schrei vertrieb er die Dunkelheit. Der Fluss kehrte zurück, die Kälte wich, 
          und das Leben blühte erneut. Doch niemand wusste, was er besiegt hatte oder welche Gefahr ihm so viel abverlangt hatte. 
          Azulion verschwand ein weiteres Mal, und die Bewohner glaubten, dass er immer über sie wachen würde. 
          Doch in den Träumen der Faen hallte weiterhin ein flüsternder Ruf, ein Echo aus einer Zeit, die niemand mehr kannte.
      </p>
      </div>
      </div>}

      {side === 3 && <div>
        <br/><Header>Band III: Der ewige Ruf</Header><br/>
        <div className="text-left">
        <i>Auszug aus „Die Chroniken von Aurendia - Band III: Der ewige Ruf“</i>
        <p className="mb-1">
          Geschichten sind wie Flüsse, die über die Jahrhunderte hinweg Spuren in den Felsen der Erinnerung hinterlassen. 
          Manche fließen klar und erkennbar, andere verschwinden in den Tiefen der Zeit, unzugänglich, verborgen. 
          Und doch gibt es Stimmen aus der Vergangenheit, flüsternde Echos, die in den Träumen der empfindsamsten Seelen widerhallen. 
          Diese Fragmente – rätselhafte, bruchstückhafte Überlieferungen – tauchen in den Geschichten der Faen, 
          der Elfen und selbst der Menschen auf. Sie scheinen Überbleibsel einer Wahrheit zu sein, die nie ganz ans Licht gekommen ist.
          </p>
      <p className="mb-1">
          Was wir wissen, ist wenig, aber es reicht, um Sorge zu wecken. Die alte Bedrohung, die vor Jahrhunderten über 
          Aurendia hereinbrach, wurde von Azulion, dem Blauen Drachen, zurückgeschlagen. Doch wohin verschwand diese Dunkelheit? 
          Warum sprach Azulion nie darüber, was er gesehen hatte? Einige glauben, dass er etwas Unvorstellbares 
          bekämpfte – nicht einfach eine Kraft oder ein Wesen, sondern die Essenz von Nichts und Alles, die am Anfang 
          aller Dinge existierte.
          </p>
      <p className="mb-1">
          In Träumen und Prophezeiungen tauchen immer wieder Hinweise auf eine Macht auf, die nicht sterben kann, 
          weil sie nie lebendig war. Die Faen sprechen von Fragmenten, die angeblich Erinnerungen der Drachen selbst 
          enthalten sollen. Diese Fragmente sind wie Rätsel, die niemand lösen kann. Sie erzählen von einer uralten Kraft, 
          die in ihrer Gier alles in sich verschlang – eine Kraft, die von den Drachen selbst hervorgebracht wurde.
          </p>
      <p className="mb-1">
          Manche Gelehrten behaupten, dass Azulion nicht der erste Blaue Drache war und dass auch die Welt von Aurendia 
          nicht so einzigartig ist, wie wir glauben. Sie erzählen von einem Kreislauf, der die Welt immer wieder erneuert. 
          In diesem Kreislauf, so heißt es, muss sich die Balance der Welt bewähren – und scheitert dabei immer wieder. 
          Das Muster ist klar: Ein Drache erhebt sich, um die Welt zu retten, doch mit jedem Zyklus schwächt sich die Balance. 
          Schließlich bleibt nichts mehr übrig, außer einem Schatten der ursprünglichen Schöpfung.
          </p>
      <p className="mb-1">
          Azulion selbst könnte Teil dieses Kreislaufs sein. Seine Macht, die Quelle und den Fluss zu erschaffen, 
          war vielleicht kein Akt der Schöpfung, sondern ein verzweifelter Versuch, die Welt zusammenzuhalten. 
          Die Quelle, so glauben einige, ist nicht einfach ein Fluss des Lebens, sondern ein Gefäß, das die Essenz der 
          Welt stabilisiert – ein Bollwerk gegen das drohende Nichts.
          </p>
      <p className="mb-1">
          Der Kreislauf wird sich eines Tages erneut schließen. Dies ist die düstere Prophezeiung, die die Faen in 
          ihren Liedern flüstern. Doch niemand weiß, wie sich die Geschichte entfalten wird, wenn dieser Tag kommt. 
          Wird der Blaue Drache erneut erscheinen? Oder ist dies der letzte Zyklus, der alles auslöscht?
          </p>
      <p className="mb-1">
          Einige der ältesten Faen sprechen davon, dass die Fragmente vielleicht die Schlüssel sind, um den 
          Kreislauf zu durchbrechen. Aber sie warnen auch: Wer in die Wahrheit der Fragmente blickt, riskiert, 
          von ihnen verschlungen zu werden. Denn in jedem Fragment liegt nicht nur Erinnerung – sondern auch die 
          Bürde der Entscheidungen, die die Drachen einst trafen.
          </p>
      </div>
      </div>}
    </div>
  );
};

export default Chronic;