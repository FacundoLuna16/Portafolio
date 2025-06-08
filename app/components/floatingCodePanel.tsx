// FloatingCodePanel.tsx
type FloatingCodePanelProps = {
  code: string;
  style?: React.CSSProperties;
  className?: string;
};

export function FloatingCodePanel({ code, style, className }: FloatingCodePanelProps) {
  return (
    <div
      className={`rounded-xl shadow-lg bg-black/60 border border-green-400/30
        text-green-300 font-mono text-xs px-4 py-3 backdrop-blur-md transition-all duration-700
        ${className || ""}`}
      style={style}
    >
      <div className="flex items-center mb-2 space-x-1">
        <span className="w-2 h-2 rounded-full bg-red-400/50" />
        <span className="w-2 h-2 rounded-full bg-yellow-400/50" />
        <span className="w-2 h-2 rounded-full bg-green-400/50" />
      </div>
      <pre className="overflow-x-auto">{code}</pre>
    </div>
  );
}
