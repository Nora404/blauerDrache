import React from 'react';
import { GradientText } from '../utility/GradientText';

type StartProps = {
    title?: string;
    onClick?: () => void;
};

const Start: React.FC<StartProps> = () => {

    return (
        <div>
            <p>
                Willkommen bei <b>Legende des blauen Drachen</b>, <br />
                ein browser-basiertes Rollenspiel, inspiriert von der &nbsp;
                <a href="https://lotgd.de/home.php?" target='blank'><GradientText colors={["#0066ff", "#00ff00"]}>Legende des grünen Drachen</GradientText></a><br />
                Das Spiel ist absolut werbe- und kostenfrei!<br /><br />

                Die aktuelle Uhrzeit in Lahtheim ist ... <br />
                Nächster neuer Spieltag in ... <br />
            </p>
        </div>
    );
};

export default Start;
