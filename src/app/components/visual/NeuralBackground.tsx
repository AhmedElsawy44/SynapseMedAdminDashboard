import React, { useEffect, useRef } from "react";

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const nodeCount = Math.floor((width * height) / 22000) + 25;
    const nodes = Array.from({ length: Math.min(nodeCount, 60) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
    }));

    interface Spark {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
    }
    const sparks: Spark[] = [];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const currentRadius = n.radius + Math.sin(n.pulse) * 0.75;
        const alpha = 0.4 + Math.sin(n.pulse) * 0.25;

        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, currentRadius * 3);
        grad.addColorStop(0, `rgba(53, 224, 223, ${alpha})`);
        grad.addColorStop(1, "rgba(53, 224, 223, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#35E0DF";
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22;
            ctx.strokeStyle = `rgba(53, 224, 223, ${alpha})`;
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();

            if (Math.random() < 0.0015 && sparks.length < 8) {
              sparks.push({ fromIndex: i, toIndex: j, progress: 0, speed: 0.025 + Math.random() * 0.02 });
            }
          }
        }
      }

      for (let k = sparks.length - 1; k >= 0; k--) {
        const s = sparks[k];
        s.progress += s.speed;
        if (s.progress >= 1) {
          sparks.splice(k, 1);
          continue;
        }
        const n1 = nodes[s.fromIndex];
        const n2 = nodes[s.toIndex];
        const sx = n1.x + (n2.x - n1.x) * s.progress;
        const sy = n1.y + (n2.y - n1.y) * s.progress;

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(53, 224, 223, 0.6)";
        ctx.beginPath();
        ctx.arc(sx, sy, 4.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.85,
      }}
    />
  );
}
