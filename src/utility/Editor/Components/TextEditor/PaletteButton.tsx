// ── Komponente für Paletten-Buttons ──
interface PaletteButtonProps {
	paletteKey: string;
	palette: string[];
	isSelected: boolean;
	onSelect: (key: string) => void;
}
export const PaletteButton: React.FC<PaletteButtonProps> = ({
	paletteKey,
	palette,
	isSelected,
	onSelect,
}) => (
	<button
		onClick={() => onSelect(paletteKey)}
		className="flex-center"
		style={{
			border: isSelected ? "2px solid white" : "2px solid black",
			borderRadius: "50%",
			width: 30,
			height: 30,
			background: buildGradientStyle(palette),
			cursor: "pointer",
		}}
	/>
);

const buildGradientStyle = (colors: string[]): string =>
	`linear-gradient(45deg, ${colors.join(", ")})`;
