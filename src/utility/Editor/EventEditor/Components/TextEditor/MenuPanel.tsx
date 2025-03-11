import { useState } from "react";
import { colorPalettes, textColors } from "../../../../../data/helper/colorMappingData";
import { ComponentButton } from "./ComponentButton";
import { CustomColorInput } from "./CustomColorInput";
import { FormatButton } from "./FormatButton";
import { PaletteButton } from "./PaletteButton";
import { SingleColorButton } from "./SingleColorButton";

interface ComponentAndColorPickerProps {
	onInsert: (componentName: string, colorKeyOrPalette: string) => void;
	customColors: string[];
	setCustomColors: (newArr: string[]) => void;
	newColor: string;
	setNewColor: (col: string) => void;
	selectedFormat: "normal" | "bold" | "italic";
	setSelectedFormat: (format: "normal" | "bold" | "italic") => void;
}

const MenuPanel: React.FC<ComponentAndColorPickerProps> = ({
	onInsert,
	customColors,
	setCustomColors,
	newColor,
	setNewColor,
	selectedFormat,
	setSelectedFormat,
}) => {
	const [selectedComponent, setSelectedComponent] = useState<string>("ColoredText");
	const [selectedColor, setSelectedColor] = useState<string>("");

	const isGradientOrMulti =
		selectedComponent === "GradientText" || selectedComponent === "MultiColoredLetters";
	const isColoredText = selectedComponent === "ColoredText";

	const paletteKeys = Object.keys(colorPalettes);
	const singleColorKeys = Object.keys(textColors);

	const handleAdd = () => {
		if (!selectedComponent || !selectedColor) return;
		let colorProp = selectedColor;
		if (selectedColor === "custom") {
			colorProp =
				customColors.length === 0 && newColor
					? "custom:" + newColor
					: "custom:" + customColors.join(",");
		}
		onInsert(selectedComponent, colorProp);
	};

	const handleAddCustomColor = () => {
		if (!newColor) return;
		if (selectedComponent === "ColoredText") {
			setCustomColors([newColor]); // Ersetzen bei ColoredText
		} else {
			setCustomColors([...customColors, newColor]);
		}
	};

	const handleRemoveCustomColor = (index: number) => {
		setCustomColors(customColors.filter((_, i) => i !== index));
	};

	return (
		<div className="flex-row w-full">
			<div className="flex-row-right">
				{/* Komponententyp-Auswahl */}
				<div className="grid-2">
					<ComponentButton
						componentName="GradientText"
						isSelected={selectedComponent === "GradientText"}
						onSelect={(comp) => {
							setSelectedComponent(comp);
							setSelectedColor("");
						}}
						backgroundStyle={{ background: "linear-gradient(to right, red, yellow, green)" }}
					/>
					<ComponentButton
						componentName="MultiColoredLetters"
						isSelected={selectedComponent === "MultiColoredLetters"}
						onSelect={(comp) => {
							setSelectedComponent(comp);
							setSelectedColor("");
						}}
						backgroundStyle={{
							background:
								"repeating-linear-gradient(45deg, red, red 5px, yellow 5px, yellow 10px, green 10px, green 15px)",
						}}
					/>
					<ComponentButton
						componentName="ColoredText"
						isSelected={selectedComponent === "ColoredText"}
						onSelect={(comp) => {
							setSelectedComponent(comp);
							setSelectedColor("");
						}}
						backgroundStyle={{ backgroundColor: "red" }}
					/>
				</div>

				{/* Farb-/Format-Auswahl */}
				{isGradientOrMulti && (
					<div className="flex-row">
						<div className="grid-7">
							{paletteKeys.map((key) => (
								<PaletteButton
									key={key}
									paletteKey={key}
									palette={colorPalettes[key]}
									isSelected={selectedColor === key}
									onSelect={setSelectedColor}
								/>
							))}
						</div>
					</div>
				)}

				{isColoredText && (
					<div className="flex-row">
						<div className="grid-2">
							{(["normal", "bold", "italic"] as const).map((format) => (
								<FormatButton
									key={format}
									format={format}
									isSelected={selectedFormat === format}
									onSelect={setSelectedFormat}
								/>
							))}
						</div>
						<div className="grid-7">
							{singleColorKeys.map((key) => (
								<SingleColorButton
									key={key}
									colorKey={key}
									color={textColors[key]}
									isSelected={selectedColor === key}
									onSelect={setSelectedColor}
								/>
							))}
						</div>
					</div>
				)}

				<CustomColorInput
					newColor={newColor}
					customColors={customColors}
					onNewColorChange={setNewColor}
					onAddCustomColor={handleAddCustomColor}
					onRemoveCustomColor={handleRemoveCustomColor}
					onSelectCustom={() => setSelectedColor("custom")}
					isSelected={selectedColor === "custom"}
				/>
			</div>

			<button
				onClick={handleAdd}
				disabled={!selectedComponent || !selectedColor}
				className="add-button w-100px">
				Hinzufügen
			</button>
		</div>
	);
};

export default MenuPanel;
