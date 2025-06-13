// DescriptionEditor.tsx

import React, { useRef, useState } from "react";
import { parseDescription } from "../../../../Helper/ParseTextToJSX";
import MenuPanel from "./MenuPanel";

interface TextEditorProps {
	value: string;
	onChange: (newVal: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange }) => {
	const [customColors, setCustomColors] = useState<string[]>([]);
	const [newColor, setNewColor] = useState("#ff0000");
	const [selectedFormat, setSelectedFormat] = useState<"normal" | "bold" | "italic">("italic");

	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const handleInsertComponent = (componentName: string, colorKeyOrPalette: string) => {
		const textarea = textAreaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		// Bei Variablen ignorieren wir den ausgewählten Text – ansonsten wie gehabt
		const selectedText =
			componentName === "Variable" ? "" : value.substring(start, end) || "DeinText";

		let placeholder = "";

		if (componentName === "Variable") {
			placeholder = `{${colorKeyOrPalette}}`;
		} else if (componentName === "ColoredText") {
			placeholder = `{ColoredText|${colorKeyOrPalette}|${selectedFormat}}${selectedText}{/ColoredText}`;
		} else if (componentName === "GradientText" || componentName === "MultiColoredLetters") {
			placeholder = `{${componentName}|${colorKeyOrPalette}}${selectedText}{/${componentName}}`;
		}

		const newVal = value.slice(0, start) + placeholder + value.slice(end);
		onChange(newVal);

		const newPos = start + placeholder.length;
		setTimeout(() => {
			textarea.focus();
			textarea.setSelectionRange(newPos, newPos);
		}, 0);
	};

	return (
		<div>
			<MenuPanel
				onInsert={handleInsertComponent}
				customColors={customColors}
				setCustomColors={setCustomColors}
				newColor={newColor}
				setNewColor={setNewColor}
				selectedFormat={selectedFormat}
				setSelectedFormat={setSelectedFormat}
			/>

			<div>
				<textarea
					className="w-full"
					ref={textAreaRef}
					value={value}
					placeholder="Beschreibung"
					onChange={(e) => onChange(e.target.value)}
					rows={5}
				/>

				<div>
					<strong>Vorschau:</strong>
					<div>{parseDescription(value)}</div>
				</div>
			</div>
		</div>
	);
};

export default TextEditor;
