type Props = { text: string; className?: string };

export function Ticker({ text, className }: Props) {
  return (
    <div className={className ? `cs-ticker ${className}` : "cs-ticker"} aria-hidden>
      <div className="cs-ticker-track">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
