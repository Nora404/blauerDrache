import { ReactNode, FC } from "react";

type GradientTextProps = {
    colors?: string[];       // Kann auch weggelassen werden, dann ['#000000']
    children: ReactNode;
};

interface RGB {
    r: number;
    g: number;
    b: number;
}

export const GradientText: FC<GradientTextProps> = ({
    colors = ["#ffffff"],
    children,
}) => {
    // 1) children in einen String umwandeln
    // typeof children kann "string | number | ReactNode" usw. sein 
    // Falls du z.B. <GradientText>123</GradientText> machst, 
    // wird das hier zu "123" gecastet
    const text = typeof children === "string" ? children : String(children);

    // 2) Hilfsfunktionen zum Umrechnen und Interpolieren
    const hexToRgb = (hex: string): RGB => {
        const cleanHex = hex.replace("#", "");
        const bigint = parseInt(cleanHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    const rgbToHex = ({ r, g, b }: RGB): string => {
        const toHex = (num: number) => num.toString(16).padStart(2, "0");
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const interpolateColor = (colorA: RGB, colorB: RGB, t: number): RGB => {
        const r = Math.round(colorA.r + (colorB.r - colorA.r) * t);
        const g = Math.round(colorA.g + (colorB.g - colorA.g) * t);
        const b = Math.round(colorA.b + (colorB.b - colorA.b) * t);
        return { r, g, b };
    };

    // 3) Farbwerte in RGB umwandeln
    const rgbColors: RGB[] = colors.map((c) => hexToRgb(c));

    // 4) Array der einzelnen Buchstaben
    const letters: string[] = text.split("");

    // 5) Typ für die Rückgabe der Buchstaben mit Farbe
    //    -> { char: string; color: string }[]
    const coloredLetters = letters.map<{ char: string; color: string }>(
        (char, index) => {
            if (rgbColors.length === 1) {
                // Nur eine Farbe -> alles gleich einfärben
                return { char, color: colors[0] };
            }

            // t ist der prozentuale Fortschritt (0..1)
            const t = letters.length > 1 ? index / (letters.length - 1) : 0;

            if (rgbColors.length === 2) {
                // Interpolation zwischen color[0] und color[1]
                const interpolated = interpolateColor(rgbColors[0], rgbColors[1], t);
                return { char, color: rgbToHex(interpolated) };
            } else {
                // rgbColors.length === 3
                // Bis t=0.5 interpolieren wir zwischen color[0] und color[1]
                // Ab t=0.5 bis t=1 zwischen color[1] und color[2]
                const midPoint = 0.5;
                if (t <= midPoint) {
                    const localT = t / midPoint;
                    const interpolated = interpolateColor(rgbColors[0], rgbColors[1], localT);
                    return { char, color: rgbToHex(interpolated) };
                } else {
                    const localT = (t - midPoint) / (1 - midPoint);
                    const interpolated = interpolateColor(rgbColors[1], rgbColors[2], localT);
                    return { char, color: rgbToHex(interpolated) };
                }
            }
        }
    );

    // 6) Render
    return (
        <>
            {coloredLetters.map(({ char, color }, i) => (
                <span key={i} style={{ color }}>
                    {char}
                </span>
            ))}
        </>
    );
};


/*
return (
  <div>
    <h1>
      <GradientText colors={["#ff0000", "#bb4400"]}>
        Hallo
      </GradientText>
    </h1>
  </div>
);
*/