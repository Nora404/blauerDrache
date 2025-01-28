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
  text: string;
  numStars?: number;
};

const SparklingText: React.FC<SparklingTextProps> = ({
  text,
  numStars = 5,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<StarData[]>([]);
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerRect(rect);
    }
  }, []);

  useLayoutEffect(() => {
    if (!containerRect) return;

    const newStars = Array.from({ length: numStars }, () => ({
      x: Math.random() * containerRect.width,
      y: Math.random() * containerRect.height,
      size: Math.random() * 12 + 6,
      delay: Math.random() * 3, // etwas Zufall für den Start
    }));
    setStars(newStars);
  }, [numStars, containerRect]);

  // Wird aufgerufen, sobald eine Animation (ein Stern-Blinken) beendet ist
  const handleAnimationIteration = (index: number) => {
    if (!containerRect) return;
    setStars((prevStars) => {
      const updated = [...prevStars];
      updated[index] = {
        ...updated[index],
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        delay: Math.random() * 3, // auch die Verzögerung neu generieren
      };
      return updated;
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      {stars.map((star, i) => {
        const style: CSSProperties = {
          position: "absolute",
          top: star.y - 8,
          left: star.x,
          fontSize: star.size,
          animationDelay: `${star.delay}s`,
        };
        return (
          <span
            key={i}
            className="sparkle"
            style={style}
            // ACHTUNG: onAnimationIteration in React
            onAnimationIteration={() => handleAnimationIteration(i)}
          >
            +
          </span>
        );
      })}

      <span className="gradient-text text-4xl font-bold" style={{ zIndex: 1 }}>
        {text}
      </span>
    </div>
  );
};

export default SparklingText;
