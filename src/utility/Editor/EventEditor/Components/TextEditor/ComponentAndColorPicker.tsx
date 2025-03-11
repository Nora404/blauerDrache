//#region [import]
import React, { useState } from "react";
import { colorPalettes, textColors } from "../../../../../data/helper/colorMappingData";
import { lighten, darken } from "../../../../Helper/ColorLightenDarken";
//#endregion

//#region [prerare]
interface ComponentAndColorPickerProps {
	onInsert: (componentName: string, colorKeyOrPalette: string) => void;
	customColors: string[];
	setCustomColors: (newArr: string[]) => void;
	newColor: string;
	setNewColor: (col: string) => void;
	selectedFormat: string;
	setSelectedFormat: (format: "normal" | "bold" | "italic") => void;
}

const ComponentAndColorPicker: React.FC<ComponentAndColorPickerProps> = ({
	onInsert,
	customColors,
	setCustomColors,
	newColor,
	setNewColor,
	selectedFormat,
	setSelectedFormat,
}) => {
	// Welcher Komponententyp? ("GradientText" | "MultiColoredLetters" | "ColoredText" | "")
	const [selectedComponent, setSelectedComponent] = useState<string>("ColoredText");

	// Welche Palette/Farbe? ("redColors" | "pink" | "" | "custom" etc.)
	const [selectedColor, setSelectedColor] = useState<string>("");

	const isGradientOrMulti =
		selectedComponent === "GradientText" || selectedComponent === "MultiColoredLetters";
	const isColoredText = selectedComponent === "ColoredText";

	const paletteKeys = Object.keys(colorPalettes);
	const singleColorKeys = Object.keys(textColors);
	//#endregion

	//#region [handler]
	const handleAdd = () => {
		if (!selectedComponent) return;
		if (!selectedColor) return;

		let colorProp = selectedColor;
		if (selectedColor === "custom") {
			if (customColors.length === 0 && newColor) {
				colorProp = "custom:" + newColor;
			} else {
				colorProp = "custom:" + customColors.join(",");
			}
		}

		onInsert(selectedComponent, colorProp);
	};

	const handleAddCustomColor = () => {
		if (!newColor) return;
		if (selectedComponent === "ColoredText") {
			setCustomColors([newColor]); // Ersetzen bei ColoredText
		} else {
			setCustomColors([...customColors, newColor]); // Hinzufügen sonst
		}
	};

	const handleRemoveCustomColor = (indexToRemove: number) => {
		setCustomColors(customColors.filter((_, index) => index !== indexToRemove));
	};
	//#endregion

	//#region [jsx]
	return (
		<div className="flex-row w-full">
			<div className="flex-row-right">
				<div className="grid-2">
					<button
						onClick={() => {
							setSelectedComponent("GradientText");
							setSelectedColor("");
						}}
						style={{
							border: selectedComponent === "GradientText" ? "2px solid white" : "2px solid black",
							background: "linear-gradient(to right, red, yellow, green)", // z.B. Demo-Farbverlauf
							width: 30,
							height: 30,
						}}
					/>
					<button
						onClick={() => {
							setSelectedComponent("MultiColoredLetters");
							setSelectedColor("");
						}}
						style={{
							border:
								selectedComponent === "MultiColoredLetters" ? "2px solid white" : "2px solid black",
							background:
								"repeating-linear-gradient(45deg, red, red 5px, yellow 5px, yellow 10px, green 10px, green 15px)",
							width: 30,
							height: 30,
						}}
					/>
					<button
						onClick={() => {
							setSelectedComponent("ColoredText");
							setSelectedColor("");
						}}
						style={{
							border: selectedComponent === "ColoredText" ? "2px solid white" : "2px solid black",
							backgroundColor: "red",
							width: 30,
							height: 30,
						}}
					/>
				</div>

				{isGradientOrMulti && (
					<div className="flex-row">
						<div className="grid-7">
							{paletteKeys.map((key) => {
								// Hilfsfunktion, die aus dem Array von Farben einen linearen Verlauf baut
								const buildGradientStyle = (colors: string[]): string =>
									`linear-gradient(45deg, ${colors.join(", ")})`;

								const palette = colorPalettes[key];
								return (
									<button
										key={key}
										onClick={() => setSelectedColor(key)}
										style={{
											border: selectedColor === key ? "2px solid white" : "2px solid black",
											borderRadius: "50%",
											width: 30,
											height: 30,
											background: buildGradientStyle(palette),
											cursor: "pointer",
										}}
									/>
								);
							})}
						</div>
					</div>
				)}

				{isColoredText && (
					<div className="flex-row">
						<div className="grid-2">
							<button
								onClick={() => setSelectedFormat("normal")}
								className={selectedFormat === "normal" ? "circle circleActiveBorder" : "circle"}>
								n
							</button>
							<button
								onClick={() => setSelectedFormat("bold")}
								className={selectedFormat === "bold" ? "circle circleActiveBorder" : "circle"}>
								<b>b</b>
							</button>
							<button
								onClick={() => setSelectedFormat("italic")}
								className={selectedFormat === "italic" ? "circle circleActiveBorder" : "circle"}>
								<i>i</i>
							</button>{" "}
						</div>

						<div className="grid-7">
							{singleColorKeys.map((key) => {
								const hex = textColors[key];
								return (
									<button
										key={key}
										onClick={() => setSelectedColor(key)}
										style={{
											border: selectedColor === key ? "2px solid white" : "2px solid black",
											borderRadius: "50px",
											width: 30,
											height: 30,
											backgroundColor: hex,
										}}
									/>
								);
							})}
						</div>
					</div>
				)}

				<div className="flex-col-left">
					<div>
						<button
							onClick={() => setSelectedColor("custom")}
							style={{
								border: selectedColor === "custom" ? "2px solid white" : "2px solid black",
								borderRadius: "50%",
								width: 30,
								height: 30,
								background: "linear-gradient(45deg, red, yellow, green)",
							}}></button>
					</div>

					<div className="flex-row">
						<input
							className="color-picker"
							type="color"
							value={newColor}
							onChange={(e) => setNewColor(e.target.value)}
						/>
						<button
							onClick={handleAddCustomColor}
							style={{ width: "20px", height: "25px", marginTop: "5px" }}
							className="greenBtn1">
							+
						</button>
						<div className="flex-row">
							{customColors.map((col, i) => (
								<div
									key={i}
									onClick={() => handleRemoveCustomColor(i)}
									style={{
										width: 10,
										height: 20,
										borderRadius: "5px",
										backgroundColor: col,
										border: "1px solid black",
										cursor: "pointer",
									}}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<button
				onClick={handleAdd}
				disabled={!selectedComponent || !selectedColor}
				className="add-button w-100px">
				Hinzufügen
			</button>
		</div>
	);
	//#endregion
};

export default ComponentAndColorPicker;
