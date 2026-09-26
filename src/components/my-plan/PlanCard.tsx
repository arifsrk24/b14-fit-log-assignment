"use client";

import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";

interface PlanCardProps {
  workout: Workout;
  type: "plan" | "saved";
  onRemove: (id: string) => void;
  onToggleDone?: (id: string) => void;
}

export default function PlanCard({
  workout,
  type,
  onRemove,
  onToggleDone,
}: PlanCardProps) {
  return (
    <div
      className={`bg-neutral-900 border rounded-xl p-4 transition-all flex flex-col justify-between gap-4 ${
        type === "plan" && workout.isDone
          ? "border-neutral-800 opacity-60 bg-neutral-900/40"
          : "border-neutral-800 hover:border-neutral-700"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Exercise Thumbnail */}
        <div className="relative w-16 h-16 bg-neutral-950 rounded-lg border border-neutral-800 shrink-0 flex items-center justify-center p-1 overflow-hidden">
          <Image
            src={workout.image || "/assets/banner.png"}
            alt={workout.name}
            width={64}
            height={64}
            className="object-contain max-h-14"
          />
        </div>

        {/* Title & Info */}
        <div className="flex-1 min-w-0">
          <h3
            className={`font-black text-sm uppercase tracking-wide truncate ${
              type === "plan" && workout.isDone
                ? "line-through text-gray-500"
                : "text-white"
            }`}
          >
            {workout.name}
          </h3>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
            <span>
              {workout.sets} sets × {workout.reps}
            </span>
            <span>•</span>
            <span>{workout.duration} min</span>
            <span>•</span>
            <span className="text-[#ccff00] font-semibold">
              {workout.calories} kcal
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-800/80">
        <Link
          href={`/fitlog/${workout.id}`}
          className="text-xs text-gray-400 hover:text-[#ccff00] font-bold uppercase transition-colors"
        >
          View Details →
        </Link>

        <div className="flex items-center gap-2">
          {type === "plan" && onToggleDone && (
            <button
              onClick={() => onToggleDone(workout.id)}
              className={`px-3 py-1 rounded text-xs font-bold uppercase transition-colors ${
                workout.isDone
                  ? "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
              }`}
            >
              {workout.isDone ? "Done ✓" : "Mark Done"}
            </button>
          )}

          <button
            onClick={() => onRemove(workout.id)}
            className="px-2.5 py-1 rounded text-xs font-bold uppercase bg-red-950/40 border border-red-900/60 text-red-400 hover:bg-red-900/60 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
