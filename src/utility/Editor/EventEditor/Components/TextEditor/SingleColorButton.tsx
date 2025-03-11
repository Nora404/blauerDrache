// ── Komponente für einzelne Farbauswahl-Buttons ──
interface SingleColorButtonProps {
	colorKey: string;
	color: string;
	isSelected: boolean;
	onSelect: (key: string) => void;
	text?: string;
}
export const SingleColorButton: React.FC<SingleColorButtonProps> = ({
	colorKey,
	color,
	isSelected,
	onSelect,
	text,
}) => (
	<button
		onClick={() => onSelect(colorKey)}
		className="flex-center"
		style={{
			border: isSelected ? "2px solid white" : "2px solid black",
			borderRadius: "50px",
			width: 30,
			height: 30,
			backgroundColor: color,
			color: "black",
		}}>
		{text}
	</button>
);
