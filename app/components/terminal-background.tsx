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
  "sudo systemctl restart nginx",
  "htop",
  "chmod +x deploy.sh",
  "scp dist/app.zip user@server:/opt/",
  "ps aux | grep node",
  "tail -f /var/log/syslog",
  "export NODE_ENV=production",
  "sudo ufw allow 80/tcp",
  "openssl req -new -x509 -days 365",
  "alias gs='git status'",
  "kill -9 $(lsof -t -i:3000)",
  "pip install --upgrade pip",
  "npm outdated",
  "yarn add tailwindcss",
  "docker logs -f web",
  "docker exec -it db bash",
  "nc -vz 192.168.1.1 80",
  "ifconfig",
  "whoami",
  "tree -L 2",
  "awk '{print $1}' file.txt",
  "sed 's/foo/bar/g' input.txt > output.txt",
  "find . -type f -name '*.js'",
  "rsync -avz ./dist/ user@server:/var/www/",
  "npm run test",
  "pytest tests/",
  "systemctl status postgresql",
  "history | tail -10",
  "date '+%Y-%m-%d %H:%M:%S'",
  "wget https://github.com/facundoluna",
  "ssh-keygen -t ed25519",
  "g++ main.cpp -o app",
  "java -jar myapp.jar",
  "ping -c 4 google.com",
  "echo 'Hello, Facu!'",
  "cat /etc/os-release",
  "df -h",
  "free -m",
  "uname -a",
  "journalctl -xe",
  "zip -r backup.zip ./project",
  "tar -xzvf archive.tar.gz",
  "crontab -e",
  "dig github.com",
  "alias please='sudo'",
  "fortune | cowsay",
];


function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function TerminalBackground() {
  const [lines, setLines] = useState(
    Array.from({ length: 10 }, (_, i) => {
      const dir = i % 2 === 0 ? "left" : "right";
      // Duración debe coincidir con tu CSS (18s y 22s)
      const duration = dir === "left" ? 28 : 34;
      return {
        cmd: allCommands[randomInt(0, allCommands.length - 1)],
        dir,
        size: randomInt(12, 20),
        opacity: randomInt(10, 25) / 100,
        top: `${i * 10 + randomInt(-2, 2)}%`,
        delay: `-${(0.3 + Math.random() * 0.4) * duration}s`,
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
