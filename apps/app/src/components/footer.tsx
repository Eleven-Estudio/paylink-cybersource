export function Footer() {
  return (
    <div className="flex items-center justify-center font-mono text-xs fixed right-4 bottom-4 space-x-2">
      <span>Powered by</span>
      <a
        href="https://v1.run"
        className="underline"
        target="_blank"
        rel="noreferrer"
      >
        v1
      </a>
    </div>
  );
}
