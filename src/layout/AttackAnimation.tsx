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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev < totalFrames - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, frameInterval);

    return () => clearInterval(interval);
  }, [frameInterval, onComplete, totalFrames]);

  return (
    <pre style={{ fontFamily: "monospace", textAlign: "center" }}>
      {attackFrames[currentFrame]}
    </pre>
  );
};

export default AttackAnimation;
