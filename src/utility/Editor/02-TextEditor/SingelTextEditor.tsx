import React, { useState } from "react";
import { HiddenLine } from "../../../layout/HiddenLine";
import TextEditor from "../Components/TextEditor/TextEditor";

export const SingelTextEditor: React.FC = () => {
	return (
		<div className="max-width">
			<h2>Schreibe bunte Texte</h2>

			<TextEditor value={""} onChange={() => {}} />

			<HiddenLine />
		</div>
	);
};
