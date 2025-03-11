// ── Komponente für Format-Auswahl ──
interface FormatButtonProps {
	format: "normal" | "bold" | "italic";
	isSelected: boolean;
	onSelect: (format: "normal" | "bold" | "italic") => void;
}
export const FormatButton: React.FC<FormatButtonProps> = ({ format, isSelected, onSelect }) => {
	const content = format === "normal" ? "n" : format === "bold" ? <b>b</b> : <i>i</i>;
	return (
		<button
			onClick={() => onSelect(format)}
			className={isSelected ? "circle circleActiveBorder" : "circle"}>
			{content}
		</button>
	);
};
