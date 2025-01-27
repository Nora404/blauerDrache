// ComponentAndColorPicker.tsx

import React, { useState } from "react";
import { colorPalettes } from "../../../../data/helper/colorMappingData";
import { textColors } from "../../../Formatted/Talk";

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
      <button
        onClick={() => {
          setSelectedComponent("GradientText");
          setSelectedColor("");
        }}
        style={{
          border:
            selectedComponent === "GradientText"
              ? "2px solid white"
              : "1px solid black",
          background: "linear-gradient(to right, red, yellow, green)", // z.B. Demo-Farbverlauf
          width: 40,
          height: 40,
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
              : "1px solid black",
          background:
            "repeating-linear-gradient(45deg, red, red 5px, yellow 5px, yellow 10px, green 10px, green 15px)",
          width: 40,
          height: 40,
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
              : "1px solid black",
          backgroundColor: "red",
          width: 40,
          height: 40,
          margin: 5,
        }}
      />

      {/* Jetzt die Farbauswahl – abhängig vom Komponententyp */}
      {isGradientOrMulti && (
        <div className="flex-row">
          {paletteKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedColor(key)}
              style={{
                border:
                  selectedColor === key ? "2px solid white" : "1px solid black",
                borderRadius: "50px",
                marginRight: 5,
                width: 30,
                height: 30,
                // Du kannst hier z.B. den 1. und letzten Farbwert aus colorPalettes[key] als Verlauf darstellen
                background: `linear-gradient(to right, ${
                  colorPalettes[key][0]
                }, ${colorPalettes[key][colorPalettes[key].length - 1]})`,
              }}
            />
          ))}

          {/* Custom-Button */}
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
        <div className="flex-col" style={{ marginLeft: 10 }}>
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
          />
          <button onClick={handleAddCustomColor}>+ Add Custom Color</button>
          <div className="flex-row">
            {customColors.map((col, i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 5,
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
        className="add-btn"
      >
        Hinzufügen
      </button>
    </div>
  );
};

export default ComponentAndColorPicker;
