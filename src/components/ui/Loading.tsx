export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      {/* Animated Spinner */}
      <div className="w-12 h-12 border-4 border-neutral-800 border-t-[#ccff00] rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest animate-pulse">
        Loading Workouts...
      </p>
    </div>
  );
}
