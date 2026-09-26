import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12">
      {/* 404 Big Text */}
      <h1 className="text-8xl sm:text-9xl font-black text-neutral-800 tracking-wider">
        4<span className="text-[#ccff00]">0</span>4
      </h1>

      {/* Message */}
      <div className="space-y-2 mt-4 max-w-md">
        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
          Page Not Found
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Looks like this page took a rest day or doesn&apos;t exist in the
          library.
        </p>
      </div>

      {/* Back to Home Button */}
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-md uppercase tracking-wider transition-all text-sm"
        >
          <span>← Back to Workouts</span>
        </Link>
      </div>
    </div>
  );
}
