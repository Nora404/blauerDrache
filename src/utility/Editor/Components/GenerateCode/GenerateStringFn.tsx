import { useState } from "react";

interface GenerateFunctionCodeProps {
	text: string;
}

const GenerateFunctionCode: React.FC<GenerateFunctionCodeProps> = ({ text = "" }) => {
	const [funcName, setFuncName] = useState<string>("");
	const [generatedCode, setGeneratedCode] = useState<string>("");

	const escapeForTS = (str: string): string => {
		return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
	};

	const generateFunctionCode = () => {
		if (!funcName.trim()) {
			setFuncName("getText");
		}

		const escapedText = escapeForTS(text);
		const code = `function ${funcName}() {
    return \`${escapedText}\`;
}
`;
		setGeneratedCode(code);
	};

	return (
		<div>
			<div className="flex-row">
				<input
					type="text"
					placeholder="Funktionsname"
					value={funcName}
					onChange={(e) => setFuncName(e.target.value)}
				/>
				<button className="generate-button" onClick={generateFunctionCode}>
					Funktion generieren
				</button>
			</div>

			{generatedCode && (
				<div className="output-container">
					<h2>Generierter Code</h2>
					<pre className="output-pre text-left">{generatedCode}</pre>
					<button
						className="generate-button"
						onClick={() =>
							navigator.clipboard.writeText(generatedCode).then(
								() => alert("Code wurde in die Zwischenablage kopiert!"),
								(err) => console.error("Fehler beim Kopieren:", err)
							)
						}>
						In Zwischenablage kopieren
					</button>
				</div>
			)}
		</div>
	);
};

export default GenerateFunctionCode;
