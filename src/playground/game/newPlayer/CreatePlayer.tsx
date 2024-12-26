import React from 'react';
import { useNavigate } from "react-router-dom";
import { defaultPlayerData, useGameStore } from '../../../data/gameStore';
import { raceDefaults, RaceName, races } from '../../../data/raceDefaults';
import { CREATURE, SYSTEM } from '../../../data/colorfullStrings';
import PlayerTalk from '../../../utility/PlayerTalk';
import CreatureTalk from '../../../utility/CreaturTalk';
import Header from '../../../layout/Header/Header';


type CreatePlayerProps = {

};

const CreatePlayer: React.FC<CreatePlayerProps> = () => {
    const { updateStats, updateMeta, updateEconomy } = useGameStore();

    const handleRase = (raceName: RaceName) => {
        const raceBase = raceDefaults[raceName];

        updateStats({
            ...defaultPlayerData.stats,
            ...raceBase.stats
        });

        updateEconomy({
            ...defaultPlayerData.economy,
            ...raceBase.economy
        });

        updateMeta({
            rase: raceName,
        });
    }

    const handleNext = () => {
        updateMeta({
            creating: 1,
        });

        navigate("/choose-origin");
    }

    const navigate = useNavigate();

    return (
        <div className="max-width">
            <h2>Als was werden dich die Bewohner dieser Welt erkennen?</h2>

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
            </div><br />

            <Header>Beantworte die Frage der Wächter Wesen</Header>

            <br />
            <table width={"100%"}>
                <tbody>
                    <tr>
                        <td className='mono-text'>O<br />/|\<br />/ \</td>
                        <td className='mono-text'>&lt;O&gt;<br />/X\<br />/ \</td>
                        <td className='mono-text'>o<br />I&#8863;I<br />&#9553;&#9553;</td>
                        <td className='mono-text'>&Ouml;&nbsp;<br />/|\<br />&nbsp;&nbsp;/\~~</td>

                        <td className='mono-text'>&#168;&#937;&#168;<br />&#40;&#40;&#41;&#41;<br />| |</td>
                        <td className='mono-text'>M&nbsp;&nbsp;&nbsp;<br />O&#8835;&#8767;<br />ww&nbsp;</td>
                        <td className='mono-text'>&#10827; &#10630;<br />&#10918;&#8835;<br />ww</td>
                        <td className='mono-text'>&#8250;O&#8249;<br />/&#0064;\<br />&#8768; &#8768;</td>
                    </tr>
                </tbody>
            </table>
            <br />

            <div className='text-left'>
                {races.map((r) => (
                    <p className='mb-1' key={r.name}>
                        <button key={r.name} onClick={() => handleRase(r.name as RaceName)}>
                            {r.label}
                        </button><br />
                        {r.description}
                    </p>
                ))}
            </div>

            <div onClick={handleNext}>{SYSTEM.weiter}</div>
        </div>
    );
};

export default CreatePlayer;
