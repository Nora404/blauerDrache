import React, { } from 'react';

type ColorIndex = {
    index: number;
    color: string;
};

type MultiColoredLettersProps = {
    children: string;
    colors?: ColorIndex[];
    defaultColor?: string;
    defaultIndex?: number;
};

const MultiColoredLetters: React.FC<MultiColoredLettersProps> = ({
    children,
    colors = [],
    defaultColor = '#000000',
    defaultIndex = 0,
}) => {
    const text = typeof children === 'string' ? children : '';

    const colorMap: { [key: number]: string } = {};
    colors.forEach(({ index, color }) => {
        if (index >= 0 && index < text.length) {
            colorMap[index] = color;
        }
    });

    const validIndices = colors.filter(ci => ci.index >= 0 && ci.index < text.length).map(ci => ci.index);
    const letters = text.split('').map((char, idx) => {
        let appliedColor = '';
        if (colorMap.hasOwnProperty(idx)) {
            appliedColor = colorMap[idx];
        } else if (!validIndices.includes(idx) && colors.length > 0) {
            if (idx === defaultIndex) {
                appliedColor = defaultColor;
            }
        }

        if (appliedColor) {
            return (
                <span key={idx} style={{ color: appliedColor }}>
                    {char}
                </span>
            );
        } else {
            return <span key={idx}>{char}</span>;
        }
    });

    return <span>{letters}</span>;
};

export default MultiColoredLetters;



//     return (
//         <div>
//             {/* Färbt den ersten Buchstaben in Rot */}
//             <MultiColoredLetters color="red">Hallo Welt!</MultiColoredLetters>

//             {/* Färbt den ersten Buchstaben in Blau und den dritten in Grün */}
//             <MultiColoredLetters
//                 colors={[
//                     { index: 0, color: 'blue' },
//                     { index: 2, color: 'green' },
//                 ]}
//             >
//                 React
//             </MultiColoredLetters>

//             {/* Färbt den ersten Buchstaben in Rot und den zweiten in Orange */}
//             <MultiColoredLetters
//                 colors={[
//                     { index: 0, color: 'red' },
//                     { index: 1, color: 'orange' },
//                 ]}
//                 defaultColor="purple"
//                 defaultIndex={0}
//             >
//                 Testen
//             </MultiColoredLetters>

//             {/* Verwendet die Standardfarbe Schwarz und färbt den ersten Buchstaben */}
//             <MultiColoredLetters>Standardfarbe</MultiColoredLetters>
//         </div>
//     );
// };
