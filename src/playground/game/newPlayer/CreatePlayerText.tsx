import { CREATURE } from "../../../data/colorfullStrings";
import CreatureTalk from "../../../utility/CreaturTalk";
import PlayerTalk from "../../../utility/PlayerTalk";

export const ChooseRaceText: React.FC = () => {
    return (
        <div className='text-left'>
            <p className='mb-1'>
                Ein kleines {CREATURE.blauesWesen} fliegt direkt auf dich zu.
                Es hält nur wenige Zentimeter vor deinem Kopf an und betrachtet dich kritisch.
            </p>

            <p className='mb-1'>
                <PlayerTalk>"Wa-wa-wa..."</PlayerTalk> stammelst du.<br />
            </p>

            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Du beherschst anscheinend nicht unsere Sprache. Dann werde ich l a n g s a m reden!"</CreatureTalk><br />
                hörst du eine Stimme hinter dir. Erschrochen drehst du dich um und erkennst ein {CREATURE.rotesWesen}.
                Es setzt sich auf deine Schulter wärend {CREATURE.blauesWesen} zu sprechen beginnt.
            </p>

            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Also, wir sind hier, um dich mit diesem Reich vertraut zu machen, also tust du gut daran, uns ganz genau zuzuhören"</CreatureTalk>
            </p>

            <p className='mb-1'>
                Du nickst stumm und schenkst diesen seltsamen Wesen deine volle Aufmerksamkeit.
            </p>

            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Gut, dann fangen wir mal an. Zuerst musst du dich hier anmelden.
                    Dafür brauchen wir deinen Namen, deine Herkunft und so weiter."</CreatureTalk> beginnt das {CREATURE.rotesWesen} seinen Text herunter zu rattern.
                Zeitgleich holt das {CREATURE.blauesWesen} einen Notizblock und zaubert eine Füllfeder aus dem Nichts heraus.
                Es macht sich bereit zu schreiben ...
            </p>
        </div>
    );
}

export const ChooseOriginText: React.FC = () => {
    return (
        <div className='text-left'>

            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Glaubst du wir sind blind, das wir das nicht selbst schon erkannt haben?" </CreatureTalk>
                Höhnt das {CREATURE.roteWesen} während es langsam um dich herum schwebt. Das {CREATURE.blaueWesen} flattert zu dir und schupst das {CREATURE.roteWesen} weg.
            </p>
            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Er will nur wissen woher du kommst, zu welcher Gruppe du gehörst."</CreatureTalk>
            </p>
        </div>
    );
}

export const ChooseCallingText: React.FC = () => {
    return (
        <div className='text-left'>

            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Blabla" </CreatureTalk>
                Das {CREATURE.roteWesen} ist gemein und böse.
                Das {CREATURE.blaueWesen} ist nett und bürokratisch.
            </p>
            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Blabla"</CreatureTalk>
            </p>
        </div>
    );
}

export const ChooseNameText: React.FC = () => {
    return (
        <div className='text-left'>

            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Blabla" </CreatureTalk>
                Das {CREATURE.roteWesen} ist gemein und böse.
                Das {CREATURE.blaueWesen} ist nett und bürokratisch.
            </p>
            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Blabla"</CreatureTalk>
            </p>
        </div>
    );
}