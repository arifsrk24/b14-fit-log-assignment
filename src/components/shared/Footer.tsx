import Image from "next/image";
import logoImg from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-gray-400 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Logo & Brand Name */}
        <div className="flex items-center gap-2">
          <Image src={logoImg} alt="FitLog Logo" width={24} height={24} />
          <span className="font-extrabold text-white text-lg uppercase tracking-wider">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Right Side: Copyright */}
        <p className="text-sm text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
