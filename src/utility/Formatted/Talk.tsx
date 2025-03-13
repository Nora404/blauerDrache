import React, { ReactNode } from "react";
import { textColors } from "../../data/helper/colorMappingData";

export const talkingColors: Record<string, string> = {
	geflügeltesWesen: "#ff33ff",
	blauesWesen: "#A3D8FF",
	rotesWesen: "#ff3333",
	dunkleGestalt: "#8C6570",
	player: "#C7FAFF",
};

type TextColorKey = keyof typeof textColors;
type TalkingColorKey = keyof typeof talkingColors;
type ColorProp = string | TextColorKey | TalkingColorKey;

type TalkProps = {
	children: ReactNode;
	color?: ColorProp;
};

const Talk: React.FC<TalkProps> = ({ children, color = "#C7FAFF" }) => {
	const isValidHex = (hex: string): boolean => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(hex);

	const resolveColor = (inputColor: ColorProp): string => {
		if (typeof inputColor === "string") {
			// Neuer Abschnitt: Prüfe auf "custom:"-Prefix
			if (inputColor.startsWith("custom:")) {
				const customHex = inputColor.slice("custom:".length); // // custom: entfernen
				if (isValidHex(customHex)) {
					// Prüfen, ob der restliche String ein gültiger Hexcode ist
					return customHex;
				}
			}
			if (isValidHex(inputColor)) {
				// Falls inputColor ein gültiger Hexcode ist
				return inputColor;
			}
			if (inputColor in textColors) {
				return textColors[inputColor];
			}
			if (inputColor in talkingColors) {
				return talkingColors[inputColor];
			}
		}
		return "#C7FAFF";
	};

	const actualColor = resolveColor(color);

	return (
		<span style={{ color: actualColor }}>
			<i>{children}</i>
		</span>
	);
};

export default Talk;
