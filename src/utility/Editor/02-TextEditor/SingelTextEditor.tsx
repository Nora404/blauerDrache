import React, { useState } from "react";
import { HiddenLine } from "../../../layout/HiddenLine";
import TextEditor from "../Components/TextEditor/TextEditor";
import GenerateFunctionCode from "../Components/GenerateCode/GenerateStringFn";

export const SingelTextEditor: React.FC = () => {
	const [value, setValue] = useState<string>("");

	const handleChange = (newValue: string) => {
		setValue(newValue);
	};

	return (
		<div className="max-width">
			<h2>Schreibe bunte Texte</h2>

			<TextEditor value={value} onChange={handleChange} />

			<GenerateFunctionCode text={value} />

			<HiddenLine />
		</div>
	);
};
