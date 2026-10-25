export default function ProgressBar({
  value,
  total,
  label,
}: {
  value: number;
  total: number;
  label: string;
}) {
  return (
    <div className="progress-group">
      <span>{label}</span>
      <progress value={value} max={total || 1} aria-label={label} />
    </div>
  );
}
