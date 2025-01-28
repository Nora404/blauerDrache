// SparklingText.tsx
import React, { useLayoutEffect, useRef, useState, CSSProperties } from "react";
import "./SparklingText.css";

type StarData = {
  x: number;
  y: number;
  size: number;
  delay: number;
};

type SparklingTextProps = {
  children: string;
  numStars?: number;
  color?: string; // <--- Neue Prop für die Farbe
};

// Hilfsfunktion hier oder in separater Datei
function hexToRGB(hex: string) {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return { r, g, b };
}

const SparklingText: React.FC<SparklingTextProps> = ({
  children,
  numStars = 5,
  color = "#ffffff", // Standardfarbe: weiß
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<StarData[]>([]);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  // Container vermessen
  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerRect(rect);
    }
  }, []);

  // Sterne einmalig erzeugen
  useLayoutEffect(() => {
    if (!containerRect) return;
    const newStars = Array.from({ length: numStars }, () => ({
      x: Math.random() * containerRect.width,
      y: Math.random() * containerRect.height,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 3,
    }));
    setStars(newStars);
  }, [numStars, containerRect]);

  // Neue Position, wenn eine Stern-Animation durch ist
  const handleAnimationIteration = (index: number) => {
    if (!containerRect) return;
    setStars((prevStars) => {
      const updated = [...prevStars];
      updated[index] = {
        ...updated[index],
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        delay: Math.random() * 3,
      };
      return updated;
    });
  };

  // Farbe in RGB zerlegen
  const { r, g, b } = hexToRGB(color);

  // Inline-Style für den (diagonalen) Farbverlauf im Text
  // 45°-Verlauf: 40% -> 80% -> 40% Deckkraft
  const gradientTextStyle: CSSProperties = {
    // linear-gradient mit RGBA statt 8-stelligem Hex
    background: `linear-gradient(
      45deg, 
      rgba(${r}, ${g}, ${b}, 0.4),
      rgba(${r}, ${g}, ${b}, 0.8),
      rgba(${r}, ${g}, ${b}, 0.4)
    )`,
    // Das eigentliche "Clippen" nur auf den Text:
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    // Text transparent füllen
    WebkitTextFillColor: "transparent",
    color: "transparent",
    // Kleines Leuchten mit passendem Farbton
    textShadow: `0 0 5px rgba(${r}, ${g}, ${b}, 0.6)`,
    zIndex: 1,
    // Wichtig, damit der Hintergrund-Verlauf nicht das ganze Element füllt
    display: "inline-block",
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Sterne */}
      {stars.map((star, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: stars[i].y - 8,
          left: stars[i].x,
          fontSize: stars[i].size,
          animationDelay: `${stars[i].delay}s`,
          // Sternfarbe inkl. Glow
          color: `rgba(${r}, ${g}, ${b}, 1)`,
          textShadow: `0 0 8px rgba(${r}, ${g}, ${b}, 1)`,
        };

        return (
          <span
            key={i}
            className="sparkle"
            style={style}
            onAnimationIteration={() => handleAnimationIteration(i)}
          >
            +
          </span>
        );
      })}

      {/* Der Text mit Farbverlauf */}
      <span style={gradientTextStyle} className="text-4xl font-bold">
        {children}
      </span>
    </div>
  );
};

export default SparklingText;
