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
                <CreatureTalk name="blauesWesen">"Oh wie schön! Das hatten wir schon lange nicht mehr hier." </CreatureTalk>
                Das {CREATURE.roteWesen} schaut ungläubig das {CREATURE.blaueWesen} an.
            </p>
            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Das meinst du nicht ernst oder? Von denen hier laufen doch hunderte herum und tun so als wären sie einzigartig und die 'Auserwählten' um unser reich vor den Drachen zu retten!"</CreatureTalk>
            </p>
            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Drachen sind so freundliche Wesen, niemand braucht uns vor ihnen zu retten. Sei doch einmal etwas freundlicher!"</CreatureTalk> sagt das {CREATURE.blaueWesen} empört.
                Die Beiden tauschen noch weitere nicht ganz so freundliche Worte aus. In der Zeit überlegst du warum es dich nach Lahtheim verschleppt hat. Was ist deine Berufung?
            </p>
        </div>
    );
}

export const ChooseNameText: React.FC = () => {
    return (
        <div className='text-left'>

            <p className='mb-1'>
                Nachdem du deine Berufung offenbart hast lassen die beiden streitenden Wesen von einander ab und wenden sich wieder dir zu. Das {CREATURE.blaueWesen} nickt zufrieden.
                <CreatureTalk name="blauesWesen">"Sehr gut, ich notiere das ..." </CreatureTalk> Nachdem es mit dramatischer Bewegung den letzten Strich gezogen hat, das {CREATURE.roteWesen} rollt mit den Augen, fragt es dich mit verheißungsvoller Stimme:
            </p>
            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Und wie ist dein Name?"</CreatureTalk>
            </p>
        </div>
    );
}

export const FinalText: React.FC = () => {
    return (
        <div className='text-left'>

            <p className='mb-1'>
                <CreatureTalk name="blauesWesen">"Ich habe alles notiert und werde es weiter leiten" </CreatureTalk> Das {CREATURE.blaueWesen} winkt zu jemanden am Tor zu. Kurz darauf kommt ein {CREATURE.geflügeltesWesen} herbei geschwebt und nimmt den Notizblock entgegen.
                <CreatureTalk name="blauesWesen">"Bring das ins Rathaus zur Bearbeitung"</CreatureTalk> <CreatureTalk name="geflügeltesWesen">"Jawohl!"</CreatureTalk> sagt das {CREATURE.geflügelteWesen} und schwirrt davon.
            </p>
            <p className='mb-1'>
                <CreatureTalk name="rotesWesen">"Endlich vorbei und jetzt hau schon ab."</CreatureTalk> Beide Wesen wenden sich von dir ab und fliegen davon.
                Plötzlich dreht das {CREATURE.roteWesen} noch einmal um, schwebt zu dir und sagt mit einem führ ihn seltsam wirkenden Lächeln:
                <CreatureTalk name="rotesWesen">"Du solltest dem </CreatureTalk> {CREATURE.blauenDrachen} <CreatureTalk name="rotesWesen"> einen Besuch abstatten!"</CreatureTalk>
            </p>
        </div>
    );
}