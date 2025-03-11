// ── Komponente für Custom-Color Input ──
interface CustomColorInputProps {
	newColor: string;
	customColors: string[];
	onNewColorChange: (color: string) => void;
	onAddCustomColor: () => void;
	onRemoveCustomColor: (index: number) => void;
	onSelectCustom: () => void;
	isSelected: boolean;
}
export const CustomColorInput: React.FC<CustomColorInputProps> = ({
	newColor,
	customColors,
	onNewColorChange,
	onAddCustomColor,
	onRemoveCustomColor,
	onSelectCustom,
	isSelected,
}) => (
	<div className="flex-col-left">
		<div>
			<button
				onClick={onSelectCustom}
				className={isSelected ? "circle circleActiveBorder" : "circle"}>
				c
			</button>
		</div>
		<div className="flex-row">
			<input
				className="color-picker"
				type="color"
				value={newColor}
				onChange={(e) => onNewColorChange(e.target.value)}
			/>
			<button
				onClick={onAddCustomColor}
				style={{ width: "20px", height: "25px", marginTop: "5px" }}
				className="greenBtn1">
				+
			</button>
			<div className="flex-row">
				{customColors.map((col, i) => (
					<button
						key={col}
						onClick={() => onRemoveCustomColor(i)}
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
);
