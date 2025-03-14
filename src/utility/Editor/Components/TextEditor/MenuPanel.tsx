import { useState } from "react";
import { ComponentButton } from "./ComponentButton";
import { CustomColorInput } from "./CustomColorInput";
import { FormatColoredButton, FormatGradientButton } from "./FormatButton";
import { PaletteButton } from "./PaletteButton";
import { SingleColorButton } from "./SingleColorButton";
import { SYSTEM, CREATURE, NPC, PLACES } from "../../../../data/helper/colorfullStrings";
import { colorPalettes, textColors } from "../../../../data/helper/colorMappingData";

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
	const [selectedGradient, setSelectedGradient] = useState<"two" | "three" | "multi">("two");
	const [selectedVarGroup, setSelectedVarGroup] = useState<string>("");
	const [selectedVarKey, setSelectedVarKey] = useState<string>("");

	const variableLists = { SYSTEM, CREATURE, NPC, PLACES };
	const paletteKeys = Object.keys(colorPalettes);
	const singleColorKeys = Object.keys(textColors);

	const handleAdd = () => {
		if (selectedComponent === "Variable") {
			if (!selectedVarGroup || !selectedVarKey) return;

			const variablePlaceholder = `${selectedVarGroup}.${selectedVarKey}`;

			onInsert("Variable", variablePlaceholder);
			return;
		}

		if (!selectedComponent || !selectedColor) return;
		let colorProp = "";
		if (selectedColor === "custom") {
			colorProp =
				customColors.length === 0 && newColor
					? `custom:${newColor}`
					: `custom:${customColors.join(",")}`;
		} else if (
			selectedComponent === "GradientText" &&
			(selectedGradient === "two" || selectedGradient === "three")
		) {
			colorProp = `custom:${selectedColor}`;
		} else {
			colorProp = selectedColor;
		}
		onInsert(selectedComponent, colorProp);
	};

	const handleAddCustomColor = () => {
		if (!newColor) return;
		if (selectedComponent === "ColoredText") {
			setCustomColors([newColor]);
		} else {
			setCustomColors([...customColors, newColor]);
		}
	};

	const handleRemoveCustomColor = (index: number) => {
		setCustomColors(customColors.filter((_, i) => i !== index));
	};

	const handleGradientColorClick = (key: string) => {
		setSelectedColor("custom");
		const hex = textColors[key];

		if (selectedGradient === "two") {
			let newSelection = [...customColors].slice(0, 2);
			const index = newSelection.indexOf(hex);

			if (index !== -1 && newSelection.length === 2) {
				newSelection = [newSelection[1], newSelection[0]];
			} else if (index === -1) {
				newSelection = newSelection.length < 2 ? [...newSelection, hex] : [hex, newSelection[1]];
			}

			setCustomColors(newSelection);
			setSelectedColor(newSelection.join(","));
		} else if (selectedGradient === "three") {
			let newSelection = [...customColors].slice(0, 2);
			const index = newSelection.indexOf(hex);

			if (index !== -1 && newSelection.length === 2) {
				newSelection = [newSelection[1], newSelection[0]];
			} else if (index === -1) {
				newSelection = newSelection.length < 2 ? [...newSelection, hex] : [hex, newSelection[1]];
			}

			setCustomColors(newSelection);
			if (newSelection.length === 2) {
				setSelectedColor([newSelection[0], newSelection[1], newSelection[0]].join(","));
			} else {
				setSelectedColor(newSelection.join(","));
			}
		}
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

					<ComponentButton
						componentName="Variable"
						isSelected={selectedComponent === "Variable"}
						onSelect={(comp) => {
							setSelectedComponent(comp);
							setSelectedColor(""); // lösche evtl. Farbauswahl
							setSelectedVarGroup(""); // und Variable-Selektoren zurücksetzen
							setSelectedVarKey("");
						}}
						backgroundStyle={{
							backgroundImage:
								"repeating-linear-gradient(0deg, #ccc, #ccc 10px, #fff 10px, #fff 20px, #999 20px, #999 30px)",
						}}
					/>
				</div>

				{/* Farb-/Format-Auswahl */}
				{selectedComponent === "MultiColoredLetters" && (
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

				{selectedComponent === "GradientText" && (
					<div className="flex-row">
						<div className="grid-2">
							{(["two", "three", "multi"] as const).map((format) => (
								<FormatGradientButton
									key={format}
									format={format}
									isSelected={selectedGradient === format}
									onSelect={(format) => {
										setSelectedGradient(format);
										setCustomColors([]); // Reset der Gradient-Auswahl beim Wechseln
										setSelectedColor(""); // Reset der selektierten Farbe
									}}
								/>
							))}
						</div>
						<div className="grid-7">
							{selectedGradient === "multi"
								? paletteKeys.map((key) => (
										<PaletteButton
											key={key}
											paletteKey={key}
											palette={colorPalettes[key]}
											isSelected={selectedColor === key}
											onSelect={setSelectedColor}
										/>
								  ))
								: singleColorKeys.map((key) => {
										const colorValue = textColors[key];
										let label = "";
										if (selectedGradient === "two") {
											if (customColors[0] === colorValue) label = "1";
											else if (customColors[1] === colorValue) label = "2";
										} else if (selectedGradient === "three") {
											if (customColors[0] === colorValue) label = "A";
											else if (customColors[1] === colorValue) label = "I";
										}
										return (
											<SingleColorButton
												key={key}
												colorKey={key}
												color={colorValue}
												isSelected={customColors.includes(colorValue)}
												onSelect={() => handleGradientColorClick(key)}
												text={label} // Zeigt "1"/"2" bei "two" bzw. "A"/"I" bei "three"
											/>
										);
								  })}
						</div>
					</div>
				)}

				{selectedComponent === "ColoredText" && (
					<div className="flex-row">
						<div className="grid-2">
							{(["normal", "bold", "italic"] as const).map((format) => (
								<FormatColoredButton
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

				{selectedComponent === "Variable" && (
					<div className="flex-col">
						<select
							style={{ width: "200px", marginBottom: 0 }}
							value={selectedVarGroup}
							onChange={(e) => {
								setSelectedVarGroup(e.target.value);
								setSelectedVarKey(""); // Key zurücksetzen, wenn Gruppe wechselt
							}}>
							<option value="">-- Liste wählen --</option>
							<option value="SYSTEM">SYSTEM</option>
							<option value="CREATURE">CREATURE</option>
							<option value="NPC">NPC</option>
							<option value="PLACES">PLACES</option>
						</select>
						<select
							style={{ width: "200px", marginBottom: 0 }}
							value={selectedVarKey}
							onChange={(e) => setSelectedVarKey(e.target.value)}
							disabled={!selectedVarGroup}>
							<option value="">-- Wort wählen --</option>
							{selectedVarGroup &&
								Object.keys(variableLists[selectedVarGroup as keyof typeof variableLists]).map(
									(k) => (
										<option key={k} value={k}>
											{k}
										</option>
									)
								)}
						</select>
					</div>
				)}

				{selectedComponent !== "Variable" && (
					<CustomColorInput
						newColor={newColor}
						customColors={customColors}
						onNewColorChange={setNewColor}
						onAddCustomColor={handleAddCustomColor}
						onRemoveCustomColor={handleRemoveCustomColor}
						onSelectCustom={() => setSelectedColor("custom")}
						isSelected={selectedColor === "custom"}
					/>
				)}
			</div>

			<button
				onClick={handleAdd}
				disabled={
					selectedComponent === "Variable"
						? !selectedVarGroup || !selectedVarKey
						: !selectedComponent || !selectedColor
				}
				className="add-button w-100px">
				Hinzufügen
			</button>
		</div>
	);
};

export default MenuPanel;
