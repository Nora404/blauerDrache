type MultiColoredLettersProps = {
    children: string;
    colors?: string[]; // Vereinfachtes Farben-Array
    defaultColor?: string;
};

const MultiColoredLetters: React.FC<MultiColoredLettersProps> = ({
    children,
    colors = [],
    defaultColor = '#000000',
}) => {
    const text = typeof children === 'string' ? children : '';

    const letters = text.split('').map((char, idx) => {
        const appliedColor = colors.length > 0
            ? colors[idx % colors.length] // Zyklische Zuweisung
            : defaultColor;

        return (
            <span key={idx} style={{ color: appliedColor, transition: 'color 0.3s ease' }}>
                {char}
            </span>
        );
    });

    return <span>{letters}</span>;
};

export default MultiColoredLetters;