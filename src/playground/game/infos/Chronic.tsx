import React, { useState } from "react";
import ActionButton from "../../../layout/ActionButtons/ActionButton";
import Header from "../../../layout/Header/Header";

type ChronicProps = {
  title?: string;
  onClick?: () => void;
};

const Chronic: React.FC<ChronicProps> = () => {
  const [side, setSide] = useState<number>(1);

  const handleClick = (side: number) => {
    setSide(side);
  }

  return (
    <div className="max-width">
      <h2>Chroniken von Aurendia</h2>

      <div className="flex-row">
        <ActionButton onClick={() => { handleClick(1) }} label="Band I: Das Erwachen" />
        <ActionButton onClick={() => { handleClick(2) }} label="Band II: Hüter der Quelle" />
        <ActionButton onClick={() => { handleClick(3) }} label="Band III: Der ewige Ruf" />
      </div>



      {side === 1 && <div>
        <br /><Header>Band I: Das Erwachen</Header><br />
        <div className="text-left">
          <i>Auszug aus „Die Chroniken von Aurendia - Band I: Das Erwachen“</i>
          <p className="mb-1">
            Bevor Zeit gemessen wurde, bevor es Formen oder Begrenzungen gab, war die Welt ein unendliches,
            stilles Gewebe aus Nichts und Alles zugleich. Es gab keinen Himmel, kein Land, keine Meere,
            nur eine grenzenlose, unergründliche Stille. Alles Existierende war in einem einzigen Medium vereint,
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
            Doch mit der Ausbreitung der Welt wuchs auch die Spannung. Einige Wesen wollten mehr Raum, mehr Energie.
            Sie versuchten, die Anderen zu verschlingen, sich ihre Essenz einzuverleiben. Die Harmonie der jungen Welt zerbrach,
            als die Ersten in einen Konflikt gerieten. Ihre Kämpfe zogen Narben durch die Realität. Manche Wesen wurden ausgelöscht,
            andere verschmolzen, und mit ihnen verschwanden Teile des Gewebes selbst. Licht, Dunkelheit, Harmonie,
            Chaos - diese Zustände verloren ihre Reinheit und wurden zu etwas, das sich den Lebenden nur noch als Schatten zeigt.
          </p>
          <p className="mb-1">
            Der Krieg endete nicht durch einen Sieg, sondern durch eine neue Art von Wesen, die aus den Kämpfen hervorging.
            Diese Wesen waren die Drachen, mächtig, aber nicht mehr rein wie die Ersten.
            Sie trugen Spuren der alten Konflikte in sich und waren doch die neuen Hüter der Welt.
            In einer letzten Geste der Verzweiflung teilten sie das Gewebe der Realität in feste Formen und zogen
            sich in verschiedene Regionen zurück, um über ihre neuen Domänen zu wachen. So begann die Welt, das Leben,
            wie wir sie heute kennen.
          </p>
        </div>
      </div>}

      {side === 2 && <div>
        <br /><Header>Band II: Hüter der Quelle</Header><br />
        <div className="text-left">
          <i>Auszug aus „Die Chroniken von Aurendia - Band II: Hüter der Quelle“</i>
          <p className="mb-1">
            Die Drachen hatten sich auf ihre Domänen zurückgezogen. Die Wälder wuchsen, die Flüsse strömten,
            und die Berge ragten in den Himmel. Doch einer von ihnen, Azulion, der Blaue Drache,
            erkannte das ungenutzte Potenzial eines verwaisten Landes. Sein Blick fiel auf eine endlose Wüste,
            ein unfruchtbares Gebiet, das vor Leben nur so zu dürsten schien. Mit einem mächtigen Schlag seiner Schwingen
            rief er die Wolken herbei, und wochenlanger Regen verwandelte den trockenen Sand in ein Meer aus Blüten und Gräsern.
            Doch selbst das war nicht genug. Azulion nahm eine seiner Schuppen und legte sie tief in die Erde. Dort verband sie sich mit
            der Essenz der Welt und erschuf eine ewige Quelle. Ein Fluss entsprang, dessen Wasser das Land durchzog und schließlich
            in einem gewaltigen See mündete, der alles Leben für alle Zeiten nähren sollte.
          </p>
          <p className="mb-1">
            Azulion zog sich zurück, doch nicht, ohne einen letzten Funken seiner Essenz in die Quelle zu legen.
            Dieser Funken band ihn für immer an das Land, das er erschaffen hatte. Als die ersten Wesen - Menschen,
            Elfen, Zwerge und die naturverbundenen Faen - das fruchtbare Land entdeckten, erfüllte sie eine spürbare Wärme,
            ein Gefühl tiefer Harmonie. Sie nannten das Land Aurendia und ließen sich um die Quelle nieder. Ein Dorf entstand,
            das sie Lahtheim tauften - die Heimat des Drachen.
          </p>
          <p className="mb-1">
            Die Bewohner verehrten Azulion als ihren Schutzpatron, doch der Drache zeigte sich nie. Er wurde zur Legende,
            ein stiller Mythos. Generationen vergingen, und die Menschen begannen, den Drachen zu vergessen. Die Quelle wurde
            zur bloßen Notwendigkeit, der See ein gewöhnliches Gewässer. Doch eines Tages verdunkelte sich der Himmel. Eine unnatürliche
            Kälte legte sich über das Land. Die Tiere flohen, die Felder verwelkten, und die Flüsse begannen zu versiegen.
            Die naturverbundenen Faen berichteten von Träumen, in denen eine klagende Stimme zu ihnen sprach - ein qualvoller Hilferuf,
            der durch die Dunkelheit drang.
          </p>
          <p className="mb-1">
            Und dann kamen sie. Geschöpfe aus formloser Dunkelheit, umgeben von einem unheimlichen, farbigen Schimmer.
            Diese Wesen brachten Chaos und Tod, wohin sie auch zogen. Mehrere Helden versuchten, sich ihnen zu stellen, doch ihre Bemühungen
            waren vergeblich. Die Wesen waren wie Nebel - sie starben nicht, sie zerflossen und formten sich neu, getrieben von einem
            einzigen Instinkt: jagen und vernichten. Die Bewohner von Lahtheim waren verzweifelt. Nichts schien das Sterben der Welt aufhalten zu können.
          </p>
          <p className="mb-1">
            In dieser dunkelsten Stunde erhob sich Azulion, der Blaue Drache, ein weiteres Mal. Ein gleißendes Licht erfüllte den Himmel,
            als sein gewaltiger Körper über der Stadt erschien. Mit mächtigen Flügelschlägen stürzte er sich auf die Dunkelheit. Sein bloßer
            Anblick entfachte neue Hoffnung und Mut in den Herzen der Bewohner, während die nebelhaften Kreaturen voller Furcht flohen.
            Der Fluss kehrte zurück, der Himmel erstrahlte in einem klaren, goldenen Licht, und das Leben begann erneut zu blühen.
            Doch Azulion verschwand wieder, und die Bewohner glaubten, dass er immer über sie wachen würde.
            In den Träumen der Faen hallte jedoch weiterhin ein flüsternder Ruf - ein Echo aus einer Zeit, die niemand mehr kannte.
          </p>

        </div>
      </div>}

      {side === 3 && <div>
        <br /><Header>Band III: Der ewige Ruf</Header><br />
        <div className="text-left">
          <i>Auszug aus „Die Chroniken von Aurendia - Band III: Der ewige Ruf“</i>
          <p className="mb-1">
            Geschichten sind wie Flüsse, die über die Jahrhunderte hinweg Spuren in den Felsen der Erinnerung hinterlassen.
            Manche fließen klar und erkennbar, andere verschwinden in den Tiefen der Zeit, unzugänglich, verborgen.
            Und doch gibt es Stimmen aus der Vergangenheit, flüsternde Echos, die in den Träumen der empfindsamsten Seelen widerhallen.
            Diese Fragmente - rätselhafte, bruchstückhafte Überlieferungen - tauchen in den Geschichten der Faen,
            der Elfen und selbst der Menschen auf. Sie scheinen Überbleibsel einer Wahrheit zu sein, die nie ganz ans Licht gekommen ist.
          </p>
          <p className="mb-1">
            Was wir wissen, ist wenig, aber es reicht, um Sorge zu wecken. Die alte Bedrohung, die vor Jahrhunderten über
            Aurendia hereinbrach, wurde von Azulion, dem Blauen Drachen, zurückgeschlagen. Doch wohin verschwand diese Dunkelheit?
            Sicher ist nur das sie nie ganz verschwunden ist. Alle paar Jahrhunderte taucht sie erneut auf um kurz danach
            wieder zu verschwinden. Einige glauben, dass diese Dunkelheit etwas Unvorstellbares
            ist. Nicht einfach eine Kraft oder ein Wesen, sondern die Essenz von Nichts und Alles, die am Anfang
            aller Dinge existierte.
          </p>
          <p className="mb-1">
            In Träumen und Prophezeiungen tauchen immer wieder Hinweise auf eine Macht auf, die nicht sterben kann,
            weil sie nie lebendig war. Die Faen sprechen von Fragmenten, die angeblich Erinnerungen der Drachen selbst
            enthalten sollen. Diese Fragmente sind wie Rätsel, die niemand lösen kann. Sie erzählen von einer uralten Kraft,
            die in ihrer Gier alles in sich verschlang - eine Kraft, die von den Drachen selbst hervorgebracht wurde.
            Aber heute erinnert sich niemand an diese Worte, keiner hört ihr Flüstern. Die Fragmente scheinen für immer verloren.
          </p>
          <p className="mb-1">
            Manche Gelehrten erzählen von einem Kreislauf, der die Welt immer wieder erneuert.
            In diesem Kreislauf, so heißt es, muss sich die Balance der Welt bewähren - und scheitert dabei immer wieder.
            Ein Drache erhebt sich, um die Welt zu retten, doch mit jedem Zyklus schwächt sich die Balance.
            Schließlich bleibt nichts mehr übrig, außer einem Schatten der ursprünglichen Schöpfung.
          </p>
          <p className="mb-1">
            Der Kreislauf wird sich eines Tages erneut schließen. Dies ist die düstere Prophezeiung, die die Faen in
            ihren Liedern flüstern. Doch niemand weiß, wie sich die Geschichte entfalten wird, wenn dieser Tag kommt.
            Wird der Blaue Drache erneut erscheinen? Oder ist dies der letzte Zyklus, der alles auslöscht?
          </p>
        </div>
      </div>}
    </div>
  );
};

export default Chronic;