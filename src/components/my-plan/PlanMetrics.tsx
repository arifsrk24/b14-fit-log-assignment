"use client";

import { Workout } from "@/types/workout";

interface PlanMetricsProps {
  plan: Workout[];
}

export default function PlanMetrics({ plan }: PlanMetricsProps) {
  // Calculation for total values
  const totalMinutes = plan.reduce(
    (acc, item) => acc + (item.duration || 0),
    0,
  );
  const totalCalories = plan.reduce(
    (acc, item) => acc + (item.calories || 0),
    0,
  );
  const completedCount = plan.filter((item) => item.isDone).length;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
      <h2 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-4">
        TODAY&apos;S SESSION SUMMARY
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
        {/* Planned Lifts Count */}
        <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
          <span className="text-gray-400 text-xs uppercase block font-semibold">
            Planned Workouts
          </span>
          <span className="text-3xl font-black text-[#ccff00] mt-1 block">
            {plan.length}{" "}
            <span className="text-sm font-normal text-gray-500">/ 5 max</span>
          </span>
          <span className="text-xs text-gray-400 mt-1 block">
            {completedCount} completed
          </span>
        </div>

        {/* Total Duration */}
        <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
          <span className="text-gray-400 text-xs uppercase block font-semibold">
            Total Duration
          </span>
          <span className="text-3xl font-black text-white mt-1 block">
            {totalMinutes}{" "}
            <span className="text-sm font-normal text-gray-500">min</span>
          </span>
        </div>

        {/* Total Calories */}
        <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800">
          <span className="text-gray-400 text-xs uppercase block font-semibold">
            Est. Calories Burn
          </span>
          <span className="text-3xl font-black text-white mt-1 block">
            {totalCalories}{" "}
            <span className="text-sm font-normal text-gray-500">kcal</span>
          </span>
        </div>
      </div>
    </div>
  );
}
