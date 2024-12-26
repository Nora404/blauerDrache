import React from 'react';
import { CREATURE } from '../../../../data/colorfullStrings';
import CreatureTalk from '../../../../utility/CreaturTalk';
import Header from '../../../../layout/Header/Header';

type GuardianProps = {
};

const Guardian: React.FC<GuardianProps> = () => {
    return (
        <div className='max-width'>
            <h2>Wächter</h2>
            <p className='mb-1 text-left'>
                Vor dir ragen die gewaltigen steinernden Mauen von Lahtheim auf, nur unterbrochen von einem schweren Tor.
                Neben diesem Tor schweben zwei kleine pummelige Wesen, ein {CREATURE.blauesWesen} und ein {CREATURE.rotesWesen}.
            </p>

            <p className='mb-1 text-left'>
                <CreatureTalk name="rotesWesen"> "Was willst du?" </CreatureTalk>
                fragt {CREATURE.rotesWesen} und schaut dich grimmig an.
            </p>

            <p className='mb-1 text-left'>
                <CreatureTalk name="blauesWesen"> "Können wir dir helfen?" </CreatureTalk>
                fragt {CREATURE.blauesWesen} und zaubert aus dem Nichts ein Notizblock. Es schaut dich aufmerksam an.
            </p><br />

            <Header>Wichtige Orte in Lahtheim</Header>

            <p className='mb-1 text-left'>
                <ul>
                    <li><b>Nordtor</b>: Von hier aus kannst du die Stadt verlassen und in die große weite Welt</li>
                    <li><b>Rathaus</b>: Beantrage Farben oder kaufe ein Haus</li>
                    <li><b>Handelsbezirk</b>: Kaufe und verkaufe Sachen und Dinge und Zeugs und Kram und ...</li>
                    <li><b>Friedhof</b>: Tote liegen hier begraben oder erwachen zu neuem Leben</li>
                </ul>
            </p>
        </div>
    );
};

export default Guardian;    