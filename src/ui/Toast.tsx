export default function Toast({ message }: { message: string }) {
  return (
    <p className="toast" role="status" aria-live="polite">
      {message}
    </p>
  );
}
