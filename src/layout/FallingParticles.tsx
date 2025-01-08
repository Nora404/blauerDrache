import React, { useRef, useEffect } from "react";

// Partikel-Schnittstelle
interface Particle {
  x: number;
  y: number;
  speed: number;
  angle: number;
  drift: number;
  size: number;
}

const FallingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Anzahl, Größe und FPS
  const PARTICLE_COUNT = 100;
  const PARTICLE_SIZE = 10;
  const FPS = 30;

  // Offscreen-Skalierungsfaktor (0.5 = halbe Breite/Höhe)
  const SCALE_FACTOR = 1;

  // Array für Partikel anlegen
  const particles: Particle[] = [];

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    // Haupt-Canvas voll auf Fenstergröße setzen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Offscreen-Canvas erstellen (halbe Abmessungen)
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width * SCALE_FACTOR;
    offscreenCanvas.height = canvas.height * SCALE_FACTOR;
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!offscreenCtx) return;

    // Kurzvariablen für Offscreen-Größe
    let W = offscreenCanvas.width;
    let H = offscreenCanvas.height;

    // Partikel initialisieren (alle Koordinaten in Offscreen-Größe!)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        speed: 0.5 + Math.random() * 0.5,
        angle: Math.random() * 360,
        drift: (Math.random() - 0.5) * 0.1,
        size: PARTICLE_SIZE / 2 + Math.random() * PARTICLE_SIZE,
      });
    }

    let animationFrameId = 0;
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      // FPS-Begrenzung
      const deltaTime = timestamp - lastFrameTime;
      if (deltaTime < 1000 / FPS) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp;

      // Offscreen bereinigen
      offscreenCtx.clearRect(0, 0, W, H);

      // Partikel bewegen und zeichnen (offscreen)
      particles.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += 2;

        // Unten raus -> oben rein
        if (p.y > H) {
          p.y = -p.size;
          p.x = Math.random() * W;
        }

        offscreenCtx.save();
        offscreenCtx.translate(p.x, p.y);
        offscreenCtx.rotate((p.angle * Math.PI) / 180);
        offscreenCtx.fillStyle = "rgba(255, 255, 255, 0.2)";
        offscreenCtx.fillRect(-p.size / 8, -p.size / 2, p.size / 4, p.size);
        offscreenCtx.restore();
      });

      // Haupt-Canvas löschen und das Offscreen-Bild skaliert draufzeichnen
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(offscreenCanvas, 0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    // Resize-Handler
    const handleResize = () => {
      // Haupt-Canvas neu setzen
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Offscreen-Canvas neu setzen
      offscreenCanvas.width = canvas.width * SCALE_FACTOR;
      offscreenCanvas.height = canvas.height * SCALE_FACTOR;
      // Offscreen-Größen aktualisieren
      W = offscreenCanvas.width;
      H = offscreenCanvas.height;
      // Partikel neu verteilen (Optional: Kannst du auch weglassen, wenn du nur "stauchen" willst)
      particles.forEach((p) => {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
      });
    };

    // Sichtbarkeits-Handling (Tab-Wechsel)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    // Events registrieren
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Animation starten
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="falling-canvas" />;
};

export default FallingParticles;
