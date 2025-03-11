// ── Komponenten für die Auswahl des Komponententyps ──
interface ComponentButtonProps {
	componentName: string;
	isSelected: boolean;
	onSelect: (componentName: string) => void;
	backgroundStyle: React.CSSProperties;
}

export const ComponentButton: React.FC<ComponentButtonProps> = ({
	componentName,
	isSelected,
	onSelect,
	backgroundStyle,
}) => (
	<button
		onClick={() => {
			onSelect(componentName);
		}}
		style={{
			...backgroundStyle,
			border: isSelected ? "2px solid white" : "2px solid black",
			width: 30,
			height: 30,
		}}
	/>
);
