import React from 'react';
import { CREATURE } from '../data/colorfullStrings';
import PlayerTalk from '../utility/PlayerTalk';
import CreatureTalk from '../utility/CreaturTalk';

type CreatePlayerProps = {

};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {

    return (
        <div className="max-width">
            <h2>Als was werden dich die Bewohner dieser Welt erkennen?</h2>

            <p className='text-left'>
                Ein kleines {CREATURE.blauesWesen} fliegt direkt auf dich zu.
                Es hält nur wenige Zentimeter vor deinem Kopf an und betrachtet dich kritisch.<br className='mb-1' />

                <PlayerTalk>"Wa-wa-wa..."</PlayerTalk> stammelst du.<br />

                <CreatureTalk name="rotesWesen">"Du beherschst anscheinend nicht unsere Sprache. Dann werde ich l a n g s a m reden!"</CreatureTalk><br />
                hörst du eine Stimme hinter dir. Erschrochen drehst du dich um und erkennst ein rotes Wesen.
                Es setzt sich auf deine Schulter wärend das blaue Wesen zu sprechen beginnt.<br className='mb-1' />

                <CreatureTalk name="blauesWesen">"Also, wir sind hier, um dich mit diesem Reich vertraut zu machen, also tust du gut daran, uns ganz genau zuzuhören"</CreatureTalk><br className='mb-1' />

                Du nickst stumm und schenkst diesen seltsamen Wesen deine volle Aufmerksamkeit.<br className='mb-1' />

                <CreatureTalk name="rotesWesen">"Gut, dann fangen wir mal an. Zuerst musst du dich hier anmelden.
                Dafür brauchen wir deinen Namen, deine Herkunft und so weiter."</CreatureTalk> beginnt das rote Wesen seinen Text herunter zu rattern.
                Zeitgleich holt das braue Wesen einen Notizblock und zaubert eine Füllfeder aus dem Nichts heraus.
                Es macht sich bereit zu schreiben ...
            </p>

            Mensch (+ Leben) Beschreibung warum Menschen mehr Leben haben...<br />
            Elf (+ Level)<br />
            Zwerg (+ Gold)<br />
            Echse (+ Angriff)<br />
            Troll (+ Verteidigung)<br />
            Felkin (+ Glück)<br />
            Fenril (+ Runden)<br />
            Dryade (+ Leben)<br />


            <h3>Herkunft</h3>
            Tief in den unterirdischen Höhlen von Qexelcrag, Heimat der edlen und mächtigen Zwerge,
            deren Bedürfnis nach Privatsphäre und Reichtum in keinem Verhältnis zu ihrer Körpergröße steht.<br className='mb-1' />

            Hoch über den Bäumen des Waldes Glorfindal, in zerbrechlich aussehenden, elfischen Strukturen,
            die unter der kleinsten Belastungen zu zerbrechen scheinen und dennoch schon seit Jahrhunderten bestehen.<br className='mb-1' />

            Auf den Ebenen der Stadt Romar, der Heimat der Menschen. Stets bist du deinem Vater gefolgt und
            hast jede seiner Bewegungen in dich aufgenommen, bis er schließlich ausgezogen ist um den Grünen Drachen zu besiegen
            und seitdem nie wieder gesehen wurde.<br className='mb-1' />

            In einem Erdloch der öden Landschaft von Zachazzas, weit außerhalb jeder Siedlung,
            bist du als Echsenwesen aus deinem Ei geschlüpft. Artverwandt mit den Drachen hast du es nicht leicht in dieser Welt.<br className='mb-1' />

            In den Sümpfen von Glukmoore als ein Troll, musstest du dich vom ersten Moment an,
            seit du aus deinem ledrigen Ei geschlüpft bist, selbst verteidigen, noch ungeborene Trolle erschlagen,
            um dich von ihnen zu ernähren.<br className='mb-1' />

            <h3>Klasse oder Beruf</h3>
            Ich glaube das lasse ich erstmal weg!
            lotgd hat Dunkle Künste, Mystische Kräfte und Diebeskunst

            <h3>Es ist ein neuer Tag</h3>

            Du öffnest deine Augen und stellst fest, dass dir ein neuer Tag geschenkt wurde. Für dich ist es dein 1. Tag. Du fühlst dich wieder frisch genug, um die Welt zu erobern!<br />
            Für heute hast du 20 Runden.<br />
            Deine Lebenspunkte wurden auf 10 aufgefüllt.<br />
            Dein Geist und deine Stimmung sind heute Normal!<br />
            Du wappnest dich mit Fäuste und ziehst auf neue Abenteuer aus.<br className='mb-1' />

            Beim Rückblick auf den gestrigen Tag stellst du fest, dass:<br />
            Du rein gar nichts dazugelernt hast und 1 Level aufgestiegen bist.<br />
            Du 150 Goldmünzen mehr auf der Hand hast.<br />
            Du der Bank 100 Goldmünzen mehr anvertraut hast.<br />
            Dein Edelsteinvorrat konstant bei 0 Edelsteinen liegt.<br />
            Dir dein Aussehen völlig egal ist.<br />
            Dir dein Ruf völlig egal ist.<br />
            Die Leute dich genauso ansehen wie gestern.<br className='mb-1' />

            Die heutigen Lottozahlen sind 0-0-5-8<br />
            Weil du ein Mensch bist, erhältst du heute zwei zusätzliche Waldkämpfe!<br />
            Für dein Interesse in Diebesfertigkeiten erhältst du heute 1 zusätzliche Anwendung in Diebesfertigkeiten dazu.<br />

        </div>
    );
};

export default CreatePlayer;
