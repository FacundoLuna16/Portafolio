"use client"

import { useEffect, useState } from "react";
import { FloatingCodePanel } from "./floatingCodePanel";

const codeSnippets = [
  `docker run -d -p 80:80 nginx`,
  `def greet(name):\n    print(f"Hello, {name}")`,
  `kubectl get pods --all-namespaces`,
  `const message = 'Hello, Facu!';`,
  `SELECT * FROM users WHERE active = 1;`,
  `curl -X POST https://api.myapp.com/v1/product`,
  `#include <stdio.h>\nint main() { printf("Hola"); }`,
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTop() {
  const ranges = [
    [5, 40],
    [60, 70]
  ];
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return `${randomInt(range[0], range[1])}%`;
}

function randomLeft() {
  const ranges = [
    [5, 40],
    [60, 70]
  ];
  const range = ranges[Math.floor(Math.random() * ranges.length)];
  return `${randomInt(range[0], range[1])}%`;
}

// Genera paneles iniciales de forma determinística para evitar hidratación mismatch
function generateInitialPanels() {
  return Array.from({ length: 5 }, (_, i) => ({
    code: codeSnippets[i % codeSnippets.length], // Determinístico
    top: `${20 + i * 15}%`, // Determinístico
    left: `${10 + i * 15}%`, // Determinístico
    show: true,
    delay: i * 2, // Determinístico
    blur: i % 2 === 0,
  }));
}

export function FloatingPanelsBackground() {
  const [mounted, setMounted] = useState(false)
  const [panels, setPanels] = useState(generateInitialPanels)

  // Marcar como montado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Solo después de montar, empezar el comportamiento dinámico
  useEffect(() => {
    if (!mounted) return

    // Generar paneles con posiciones random después del montaje
    setPanels(Array.from({ length: 5 }, (_, i) => ({
      code: codeSnippets[randomInt(0, codeSnippets.length - 1)],
      top: randomTop(),
      left: randomLeft(),
      show: true,
      delay: randomInt(0, 8),
      blur: i % 2 === 0,
    })))

    const interval = setInterval(() => {
      setPanels(panels =>
        panels.map(p =>
          Math.random() > 0.6
            ? { ...p, show: false }
            : p
        )
      );
      setTimeout(() => {
        setPanels(panels =>
          panels.map(p =>
            !p.show
              ? {
                  code: codeSnippets[randomInt(0, codeSnippets.length - 1)],
                  top: randomTop(),
                  left: randomLeft(),
                  show: true,
                  delay: randomInt(0, 8),
                  blur: Math.random() > 0.5,
                }
              : p
          )
        );
      }, 900);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      {panels.map((panel, i) => (
        <FloatingCodePanel
          key={i}
          code={panel.code}
          className={`
            absolute
            transition-opacity
            duration-700
            ease-in-out
            ${panel.show ? "opacity-70" : "opacity-0"}
            ${panel.blur ? "blur-sm" : ""}
          `}
          style={{
            top: panel.top,
            left: panel.left,
            minWidth: "200px",
            maxWidth: "320px",
            zIndex: -10,
            filter: panel.blur ? "blur(2px)" : undefined,
          }}
        />
      ))}
    </div>
  );
}
