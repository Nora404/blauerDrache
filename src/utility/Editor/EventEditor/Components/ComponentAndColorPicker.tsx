// ComponentAndColorPicker.tsx

import React, { useState } from "react";
import { colorPalettes } from "../../../../data/helper/colorMappingData";
import { textColors } from "../../../Formatted/Talk";
import { lighten, darken } from "../../../Helper/ColorLightenDarken";

// Pfade anpassen!

interface ComponentAndColorPickerProps {
  onInsert: (componentName: string, colorKeyOrPalette: string) => void;
  // Der Editor bekommt "componentName" z.B. "GradientText" oder "Talk"
  // und "colorKeyOrPalette" z.B. "redColors" oder "pink" oder "custom:#ff0000,#ffff00"

  customColors: string[]; // state aus dem Editor hochgereicht
  setCustomColors: (newArr: string[]) => void;
  newColor: string;
  setNewColor: (col: string) => void;
}

const ComponentAndColorPicker: React.FC<ComponentAndColorPickerProps> = ({
  onInsert,
  customColors,
  setCustomColors,
  newColor,
  setNewColor,
}) => {
  // Welcher Komponententyp? ("GradientText" | "MultiColoredLetters" | "Talk" | "")
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  // Welche Palette/Farbe? ("redColors" | "pink" | "" | "custom" etc.)
  const [selectedColor, setSelectedColor] = useState<string>("");

  // Einfache Hilfsfunktionen, um zu wissen was gerade ausgewählt ist
  const isGradientOrMulti =
    selectedComponent === "GradientText" ||
    selectedComponent === "MultiColoredLetters";
  const isTalk = selectedComponent === "Talk";

  // Paletten-Keys (z.B. ["grayColors", "yellowColors", ...])
  const paletteKeys = Object.keys(colorPalettes);
  // Einzel-Farb-Keys (z.B. ["weiß","gelb","orange","rot",...])
  const singleColorKeys = Object.keys(textColors);

  // Handler: wenn der User auf den „Hinzufügen“-Button klickt
  const handleAdd = () => {
    if (!selectedComponent) return; // oder Feeback an User
    if (!selectedColor) return;

    // FALL: "custom" muss noch in z.B. "custom:#ff0000,#ffff00" übersetzt werden
    let colorProp = selectedColor;
    if (selectedColor === "custom") {
      // Mach hier aus dem Array `customColors` einen String
      colorProp = "custom:" + customColors.join(",");
    }

    // Dann an den parent:
    onInsert(selectedComponent, colorProp);

    // Reset
    setSelectedComponent("");
    setSelectedColor("");
  };

  // Falls du plus-Buttons für custom-Farben hast:
  const handleAddCustomColor = () => {
    if (!newColor) return;
    setCustomColors([...customColors, newColor]);
  };

  // Render
  return (
    <div className="flex-row w-full">
      {/* 3 Buttons: Gradient / Multi / Talk */}
      <div>
        <button
          onClick={() => {
            setSelectedComponent("GradientText");
            setSelectedColor("");
          }}
          style={{
            border:
              selectedComponent === "GradientText"
                ? "2px solid white"
                : "2px solid black",
            background: "linear-gradient(to right, red, yellow, green)", // z.B. Demo-Farbverlauf
            width: 30,
            height: 30,
            margin: 5,
          }}
        />
        <button
          onClick={() => {
            setSelectedComponent("MultiColoredLetters");
            setSelectedColor("");
          }}
          style={{
            border:
              selectedComponent === "MultiColoredLetters"
                ? "2px solid white"
                : "2px solid black",
            background:
              "repeating-linear-gradient(45deg, red, red 5px, yellow 5px, yellow 10px, green 10px, green 15px)",
            width: 30,
            height: 30,
            margin: 5,
          }}
        />
        <button
          onClick={() => {
            setSelectedComponent("Talk");
            setSelectedColor("");
          }}
          style={{
            border:
              selectedComponent === "Talk"
                ? "2px solid white"
                : "2px solid black",
            backgroundColor: "red",
            width: 30,
            height: 30,
            margin: 5,
          }}
        />
      </div>

      {/* Jetzt die Farbauswahl – abhängig vom Komponententyp */}
      {isGradientOrMulti && (
        <div className="flex-row">
          {paletteKeys.map((key) => {
            const originalFirstColor = colorPalettes[key][0];
            const originalLastColor =
              colorPalettes[key][colorPalettes[key].length - 1];

            // Heller machen der ersten Farbe um 10%
            const lighterColor = lighten(originalFirstColor, 30);

            // Dunkler machen der zweiten Farbe um 10%
            const darkerColor = darken(originalLastColor, 30);

            return (
              <button
                key={key}
                onClick={() => setSelectedColor(key)}
                style={{
                  border:
                    selectedColor === key
                      ? "2px solid white"
                      : "1px solid black",
                  borderRadius: "50%",
                  marginRight: 5,
                  width: 30,
                  height: 30,
                  background: `linear-gradient(to right, ${lighterColor}, ${darkerColor})`,
                  cursor: "pointer",
                }}
              />
            );
          })}

          {/* Custom-Button */}
          <button
            onClick={() => setSelectedColor("custom")}
            style={{
              border:
                selectedColor === "custom"
                  ? "2px solid white"
                  : "1px solid black",
              borderRadius: "50%",
              marginRight: 5,
              width: 30,
              height: 30,
              backgroundColor: "white",
              cursor: "pointer",
            }}
          >
            C
          </button>
        </div>
      )}

      {isTalk && (
        <div className="flex-row">
          {singleColorKeys.map((key) => {
            const hex = textColors[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedColor(key)}
                style={{
                  border:
                    selectedColor === key
                      ? "2px solid white"
                      : "1px solid black",
                  borderRadius: "50px",
                  marginRight: 5,
                  width: 30,
                  height: 30,
                  backgroundColor: hex,
                }}
              />
            );
          })}

          {/* Custom (einzelne Farbe) */}
          <button
            onClick={() => setSelectedColor("custom")}
            style={{
              border:
                selectedColor === "custom"
                  ? "2px solid white"
                  : "1px solid black",
              borderRadius: "50px",
              marginRight: 5,
              width: 30,
              height: 30,
              backgroundColor: "white",
            }}
          >
            C
          </button>
        </div>
      )}

      {/* Wenn "custom" ausgewählt, zeigen wir evtl. ein Farbwähler-UI */}
      {selectedColor === "custom" && (
        <div className="flex-row" style={{ marginLeft: 10 }}>
          <input
            className="color-picker"
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button onClick={handleAddCustomColor} className="greenBtn1">
            +
          </button>
          <div className="flex-row">
            {customColors.map((col, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 20,
                  margin: 5,
                  borderRadius: "5px",
                  backgroundColor: col,
                  border: "1px solid black",
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Hinzufügen-Button */}
      <button
        onClick={handleAdd}
        disabled={!selectedComponent || !selectedColor}
        className="add-button w-100px"
      >
        Hinzufügen
      </button>
    </div>
  );
};

export default ComponentAndColorPicker;
