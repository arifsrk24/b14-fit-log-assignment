"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { Workout } from "@/types/workout";

// Helper function to safely get calories from API property
const getCalories = (item: Workout): number => {
  if (typeof item.caloriesBurned === "number") {
    return item.caloriesBurned;
  }
  if (typeof item.calories === "number") {
    return item.calories;
  }
  return 0;
};

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, toggleDone, toggleSave } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<string>("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  // Safe Total Calculations
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0,
  );
  const totalCalories = plan.reduce((acc, curr) => acc + getCalories(curr), 0);

  // Sorted List
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration")
      return (Number(a.duration) || 0) - (Number(b.duration) || 0);
    if (sortBy === "calories") return getCalories(b) - getCalories(a);
    if (sortBy === "rating")
      return (Number(b.rating) || 0) - (Number(a.rating) || 0);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black uppercase text-white tracking-wide">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Summary Metrics Box */}
      <div className="bg-[#0f1015] border border-neutral-800/80 rounded-2xl p-6 grid grid-cols-3 divide-x divide-neutral-800/80">
        <div className="px-2 sm:px-4">
          <span className="text-gray-400 text-xs font-semibold uppercase block">
            Exercises
          </span>
          <span className="text-2xl sm:text-4xl font-black text-[#a3e635] mt-1 block">
            {totalExercises}
          </span>
        </div>

        <div className="px-4 sm:px-8">
          <span className="text-gray-400 text-xs font-semibold uppercase block">
            Minutes
          </span>
          <span className="text-2xl sm:text-4xl font-black text-white mt-1 block">
            {totalMinutes}
          </span>
        </div>

        <div className="px-4 sm:px-8">
          <span className="text-gray-400 text-xs font-semibold uppercase block">
            Calories
          </span>
          <span className="text-2xl sm:text-4xl font-black text-white mt-1 block">
            {totalCalories}
          </span>
        </div>
      </div>

      {/* Tabs & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab Toggle */}
        <div className="bg-[#0f1015] border border-neutral-800 p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("plan")}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "plan"
                ? "bg-neutral-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === "saved"
                ? "bg-neutral-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-gray-400 font-medium">Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0f1015] border border-neutral-800 text-white text-xs font-medium px-3 py-2 rounded-lg outline-none cursor-pointer focus:border-neutral-700"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Item List or Empty State */}
      {sortedList.length === 0 ? (
        <div className="bg-[#0f1015] border border-dashed border-neutral-800/80 rounded-2xl p-12 sm:p-20 text-center space-y-4">
          <h3 className="text-white font-black text-xl uppercase tracking-wide">
            NOTHING HERE YET
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-block bg-[#a3e635] hover:bg-[#8bd41f] text-black font-black text-xs uppercase px-6 py-3 rounded-lg transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map((item: Workout) => {
            const equipmentText = Array.isArray(item.equipment)
              ? item.equipment.join(", ")
              : item.equipment || "Bodyweight";

            const calValue = getCalories(item);

            return (
              <div
                key={item.id}
                className="bg-[#0f1015] border border-neutral-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-20 bg-neutral-950 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={item.image || "/assets/banner.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-white font-black text-sm uppercase tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs">{equipmentText}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 pt-1">
                      <span>⏱ {item.duration} min</span>
                      <span>🔥 {calValue} kcal</span>
                      <span>⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-end pt-2 sm:pt-0">
                  <Link
                    href={`/fitlog/${item.id}`}
                    className="border border-neutral-800 hover:border-neutral-700 text-gray-300 hover:text-white text-xs font-bold px-4 py-2 rounded-full transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" ? (
                    <button
                      onClick={() => toggleDone(item.id)}
                      className={`text-xs font-extrabold px-4 py-2 rounded-full transition-colors ${
                        item.isDone
                          ? "bg-neutral-800 text-gray-400 border border-neutral-700"
                          : "bg-[#a3e635] text-black hover:bg-[#8bd41f]"
                      }`}
                    >
                      {item.isDone ? "Completed ✓" : "✓ Mark as Done"}
                    </button>
                  ) : null}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(item.id)
                        : toggleSave(item)
                    }
                    className="text-gray-500 hover:text-white text-base px-2 py-1 transition-colors"
                    title="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
