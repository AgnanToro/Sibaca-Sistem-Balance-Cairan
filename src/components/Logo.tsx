export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`${className} bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold`}>
        <svg viewBox="0 0 24 24" width="60%" height="60%" stroke="currentColor" strokeWidth="2" fill="none"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
    </div>
  );
}
