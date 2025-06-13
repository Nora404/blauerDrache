import React, { useState, useEffect } from "react";

const attackFrames = [
  "o     o",
  "-o   o-",
  "--o o--",
  "---X---",
  " --X--",
  "  -o-",
  "  o-o",
  " o---o",
  "o-- --o",
  "o-   -o",
  "o     o",
];

type AttackAnimationProps = {
  duration?: number; // Gesamtdauer der Animation in ms, Standard: 2000
  onComplete?: () => void;
};

const AttackAnimation: React.FC<AttackAnimationProps> = ({
  duration = 2000,
  onComplete,
}) => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const totalFrames = attackFrames.length;
  const frameInterval = duration / totalFrames;

  // # Änderung: SetInterval so anpassen, dass es nur den currentFrame erhöht
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => Math.min(prev + 1, totalFrames - 1));
    }, frameInterval);

    return () => clearInterval(interval);
  }, [frameInterval, totalFrames]);

  // # Änderung: Neuer useEffect, der onComplete asynchron aufruft, wenn die Animation fertig ist
  useEffect(() => {
    if (currentFrame === totalFrames - 1 && onComplete) {
      const timer = setTimeout(() => onComplete(), frameInterval);
      return () => clearTimeout(timer);
    }
  }, [currentFrame, totalFrames, frameInterval, onComplete]);

  return (
    <pre
      style={{ fontFamily: "monospace", textAlign: "center", fontSize: "150%" }}
    >
      {attackFrames[currentFrame]}
    </pre>
  );
};

export default AttackAnimation;
