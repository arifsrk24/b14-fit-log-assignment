import Image from "next/image";
import bannerImg from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      <div className="bg-[#0f1015] border border-neutral-800/80 rounded-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="max-w-xl space-y-5 z-10">
          <span className="text-[#a3e635] text-xs font-black uppercase tracking-widest">
            WORKOUT LIBRARY
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-[1.1]">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <button className="bg-[#a3e635] hover:bg-[#8bd41f] text-black font-black px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer">
              BROWSE WORKOUTS
            </button>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="w-full md:w-auto flex justify-center md:justify-end z-10">
          <Image
            src={bannerImg}
            alt="FitLog Hero Workout"
          />
        </div>
      </div>
    </section>
  );
}
