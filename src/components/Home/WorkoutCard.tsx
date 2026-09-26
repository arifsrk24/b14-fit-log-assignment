"use client";

import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  // Safe extraction for caloriesBurned/calories
  const calories = workout.caloriesBurned ?? workout.calories ?? 0;

  // Handle equipment text properly
  const equipmentText = Array.isArray(workout.equipment)
    ? workout.equipment.join(", ")
    : workout.equipment || "Bodyweight";

  // Handle muscle groups for tags
  const tags = Array.isArray(workout.muscleGroups) ? workout.muscleGroups : [];

  return (
    <Link
      href={`/fitlog/${workout.id}`}
      className="bg-[#0f1015] border border-neutral-800/80 rounded-2xl overflow-hidden block hover:border-neutral-700 transition-all duration-300 cursor-pointer"
    >
      {/* Top Image Container */}
      <div className="relative w-full h-48 sm:h-52 bg-neutral-950 overflow-hidden">
        <Image
          src={workout.image || "/assets/banner.png"}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="p-5 space-y-3">
        {/* Muscle Group Tags (Neon Yellow) */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black font-black text-[10px] uppercase px-2.5 py-1 rounded-full tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title & Equipment */}
        <div className="space-y-1">
          <h3 className="text-white font-black text-base sm:text-lg uppercase tracking-wide line-clamp-1">
            {workout.name}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-1">{equipmentText}</p>
        </div>

        {/* Separator Line & Bottom Info Row */}
        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            ⏱ {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">🔥 {calories} kcal</span>
          <span className="flex items-center gap-1.5 text-gray-300">
            ⭐ {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
