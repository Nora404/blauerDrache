import React, { ReactNode } from "react";
import { textColors } from "../../data/helper/colorMappingData";

type TextColorKey = keyof typeof textColors;
type ColorProp = string | TextColorKey;
type TextVariant = "normal" | "bold" | "italic";

type ColoredTextProps = {
	children: ReactNode;
	color?: ColorProp;
	format?: TextVariant;
};

const ColoredText: React.FC<ColoredTextProps> = ({
	children,
	color = "#C7FAFF",
	format = "normal",
}) => {
	const isValidHex = (hex: string): boolean => /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(hex);

	const resolveColor = (inputColor: ColorProp): string => {
		if (typeof inputColor === "string") {
			if (inputColor.startsWith("custom:")) {
				const customHex = inputColor.slice("custom:".length);
				if (isValidHex(customHex)) {
					return customHex;
				}
			}
			if (isValidHex(inputColor)) {
				return inputColor;
			}
			if (inputColor in textColors) {
				return textColors[inputColor];
			}
		}
		return "#C7FAFF";
	};

	const actualColor = resolveColor(color);

	// neu: Abhängig von variant entsprechendes Styling setzen
	const style: React.CSSProperties = { color: actualColor };
	if (format === "italic") {
		style.fontStyle = "italic";
	} else if (format === "bold") {
		style.fontWeight = "bold";
	}

	return <span style={style}>{children}</span>;
};

export default ColoredText;
