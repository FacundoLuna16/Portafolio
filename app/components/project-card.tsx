import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  imgSrc: string
  codeUrl: string | null
  demoUrl?: string | null
  category: string
}

export function ProjectCard({ title, description, techStack, imgSrc, codeUrl, demoUrl }: ProjectCardProps) {
  return (
    <Card className="bg-terminal-black border-terminal-green hover:border-terminal-cyan transition-all duration-300 group">
      <CardHeader className="p-4">
        <div className="aspect-video relative overflow-hidden rounded border border-terminal-green">
          <Image
            src={imgSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="w-full object-cover rounded-lg mb-4 aspect-video"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div>
          <CardTitle className="text-terminal-green font-mono text-2xl lg:text-3xl mb-2">{title}</CardTitle>
          <CardDescription className="text-terminal-green/80 font-mono text-lg lg:text-xl">{description}</CardDescription>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <Badge key={tech} variant="outline" className="border-terminal-cyan text-terminal-cyan text-base font-mono px-3 py-1">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2">
          {codeUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-black font-mono flex-1 text-lg px-6 py-3"
              asChild
            >
              <a href={codeUrl ?? undefined} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-6 w-6" />
                Code
              </a>
            </Button>
          )}

          {demoUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan hover:text-terminal-black font-mono flex-1"
              asChild
            >
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                Demo
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
