"use client"

const commands = [
  "$ git pull origin main",
  "$ npm run build",
  "$ pnpm install",
  "$ yarn dev",
  "$ git commit -m 'update'",
  "$ npm run lint",
  "$ node server.js",
  "$ git push origin main",
]

export function TerminalBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {commands.map((cmd, i) => (
        <p
          key={i}
          className="absolute whitespace-nowrap text-terminal-green/20 font-mono text-sm animate-marquee"
          style={{ top: `${i * 12}%`, animationDelay: `${i * 2}s` }}
        >
          {cmd} {cmd} {cmd}
        </p>
      ))}
    </div>
  )
}
