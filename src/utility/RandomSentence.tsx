import React from 'react';
import { GradientText } from './GradientText';

type RandomSentenceProps = {
    partOne?: string[];
    partTwo?: string[];
    partThree?: string[];
    partFour?: string[];
};

const RandomSentence: React.FC<RandomSentenceProps> = ({
    partOne = [],
    partTwo = [],
    partThree = [],
    partFour = []
}) => {
    // Kommentar: Funktion zum Ziehen eines zufälligen Elements
    const randomItem = (arr: string[]): string =>
        arr[Math.floor(Math.random() * arr.length)];

    // Kommentar: Zufalls-Funktion für Farben (Hex)
    const randomColor = (): string =>
        '#' + Math.floor(Math.random() * 16777215).toString(16);

    // Kommentar: Zwei Zufalls-Farben erzeugen
    const color1 = randomColor();
    const color2 = randomColor();

    // Kommentar: Wörter aus den Arrays ziehen
    const firstWord = randomItem(partOne);
    const secondWord = randomItem(partTwo);
    const thirdWord = randomItem(partThree);
    const fourthWord = partFour.length ? randomItem(partFour) : '';

    return (
        <div className="random-sentence">
            <p>
                {/* Kommentar: Erstes Wort wird in GradientText gekapselt */}
                <GradientText colors={[color1, color2]}>
                    {firstWord}
                </GradientText>{' '}
                {secondWord} {thirdWord} {fourthWord}
            </p>
        </div>
    );
};

export default RandomSentence;
