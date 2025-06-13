// ── Komponente für Format-Auswahl ──
interface FormatColoredButtonProps {
	format: "normal" | "bold" | "italic";
	isSelected: boolean;
	onSelect: (format: "normal" | "bold" | "italic") => void;
}
export const FormatColoredButton: React.FC<FormatColoredButtonProps> = ({
	format,
	isSelected,
	onSelect,
}) => {
	const content = format === "normal" ? "n" : format === "bold" ? <b>b</b> : <i>i</i>;
	return (
		<button
			onClick={() => onSelect(format)}
			className={isSelected ? "circle circleActiveBorder" : "circle"}>
			{content}
		</button>
	);
};

interface FormatGradientButtonProps {
	format: "two" | "three" | "multi";
	isSelected: boolean;
	onSelect: (format: "two" | "three" | "multi") => void;
}
export const FormatGradientButton: React.FC<FormatGradientButtonProps> = ({
	format,
	isSelected,
	onSelect,
}) => {
	const content = format === "two" ? "2" : format === "three" ? "3" : "m";
	return (
		<button
			onClick={() => onSelect(format)}
			className={isSelected ? "circle circleActiveBorder" : "circle"}>
			{content}
		</button>
	);
};
