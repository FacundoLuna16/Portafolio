import { useEffect, useState } from "react"

const allCommands = [
  "$ git pull origin main",
  "$ npm run build",
  "$ pnpm install",
  "$ yarn dev",
  "$ git commit -m 'update'",
  "$ npm run lint",
  "$ node server.js",
  "$ git push origin main",
  "sudo nmap -sV target.com",
  "docker compose up -d",
  "curl -X POST /api",
  "python3 main.py",
  "kubectl get pods",
  "ssh facu@server",
  "ls -l /var/www",
  "top",
]

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function TerminalBackground() {
  const [lines, setLines] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const dir = i % 2 === 0 ? "left" : "right";
      // Duración debe coincidir con tu CSS (18s y 22s)
      const duration = dir === "left" ? 18 : 22;
      return {
        cmd: allCommands[randomInt(0, allCommands.length - 1)],
        dir,
        size: randomInt(12, 20),
        opacity: randomInt(10, 25) / 100,
        top: `${i * 10 + randomInt(-2, 2)}%`,
        delay: `${randomInt(0, duration)}s`, // <-- delay aleatorio en todo el ciclo
        blur: i % 3 === 0,
      };
    })
  );

  // Cambia comandos random cada 5-10 segundos para efecto “vivo”
  useEffect(() => {
    const interval = setInterval(() => {
      setLines(lines =>
        lines.map(l => ({
          ...l,
          cmd: allCommands[randomInt(0, allCommands.length - 1)],
        }))
      )
    }, randomInt(5000, 10000))
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {lines.map((l, i) => (
        <p
          key={i}
          className={`
            absolute whitespace-nowrap font-mono
            ${l.dir === "left" ? "animate-marquee-left" : "animate-marquee-right"}
            ${l.blur ? "blur-sm" : ""}
          `}
          style={{
            top: l.top,
            fontSize: `${l.size}px`,
            opacity: l.opacity,
            animationDelay: l.delay,
            color: "#8fff88",
            filter: l.blur ? "blur(2px)" : undefined,
            letterSpacing: "0.05em",
          }}
        >
          {l.cmd}
        </p>
      ))}
    </div>
  )
}
