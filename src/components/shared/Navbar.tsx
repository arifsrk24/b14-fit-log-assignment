"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import logoImg from "@/assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo (Left Side) */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoImg} alt="FitLog Logo" width={32} height={32} />
            <span className="font-extrabold text-xl tracking-wider uppercase">
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>

          {/* Navigation Links (Middle) */}
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-bold uppercase py-1 ${
                pathname === "/"
                  ? "text-[#ccff00] border-b-2 border-[#ccff00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              className={`text-sm font-bold uppercase py-1 ${
                pathname === "/my-plan"
                  ? "text-[#ccff00] border-b-2 border-[#ccff00]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Status Badges (Right Side) */}
          <div className="flex items-center gap-3">
            {/* Plan Badge (Filled) */}
            <Link
              href="/my-plan"
              className="bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-2"
            >
              <span>PLAN</span>
              <span className="bg-black text-white text-[11px] px-2 py-0.5 rounded-full font-bold">
                {plan.length}
              </span>
            </Link>

            {/* Saved Badge (Outline) */}
            <Link
              href="/my-plan"
              className="border border-neutral-700 hover:border-[#ccff00] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-2"
            >
              <span>SAVED</span>
              <span className="bg-neutral-800 text-gray-300 text-[11px] px-2 py-0.5 rounded-full font-bold">
                {saved.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
