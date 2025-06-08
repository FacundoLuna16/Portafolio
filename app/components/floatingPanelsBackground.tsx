import { useEffect, useState } from "react";
import { FloatingCodePanel } from "./floatingCodePanel"; // el archivo de arriba

const codeSnippets = [
  `docker run -d -p 80:80 nginx`,
  `def greet(name):\n    print(f"Hello, {name}")`,
  `kubectl get pods --all-namespaces`,
  `console.log('Hello, Facu!');`,
  `SELECT * FROM users WHERE active = 1;`,
  `curl -X POST https://api.myapp.com/v1/product`,
  `#include <stdio.h>\nint main() { printf("Hola"); }`,
];

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function FloatingPanelsBackground() {
  const [panels, setPanels] = useState(
    Array.from({ length: 6 }, (_, i) => ({ // ← de 4 a 6
      code: codeSnippets[randomInt(0, codeSnippets.length - 1)],
      top: `${randomInt(5, 70)}%`,
      left: `${randomInt(5, 70)}%`,
      show: true,
      delay: randomInt(0, 8),
      blur: i % 2 === 0,
    }))
  );

  useEffect(() => {
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
                  top: `${randomInt(5, 70)}%`,
                  left: `${randomInt(5, 70)}%`,
                  show: true,
                  delay: randomInt(0, 8),
                  blur: Math.random() > 0.5,
                }
              : p
          )
        );
      }, 900); // match with transition, menos tiempo para más velocidad
    }, 3000); // ← de 5000 a 3000 para más velocidad
    return () => clearInterval(interval);
  }, []);

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
