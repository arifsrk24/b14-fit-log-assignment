"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/PlanContext";
import Loading from "@/components/ui/Loading";

export default function WorkoutDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToPlan, toggleSave, saved } = usePlan();

  useEffect(() => {
    async function fetchWorkout() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.api-store.workers.dev/api/fitlog/${id}`,
        );

        if (!res.ok) {
          const allRes = await fetch(
            "https://api.api-store.workers.dev/api/fitlog",
          );
          if (!allRes.ok) throw new Error("Failed to fetch workouts");
          const data: Workout[] = await allRes.json();
          const found = data.find((item) => String(item.id) === String(id));
          setWorkout(found || null);
        } else {
          const data: Workout = await res.json();
          setWorkout(data || null);
        }
      } catch (error) {
        console.error("Error fetching workout detail:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWorkout();
    }
  }, [id]);

  if (loading) return <Loading />;

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-white mb-2">
          Workout Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          The requested workout details do not exist.
        </p>
        <Link
          href="/"
          className="bg-[#a3e635] text-black font-extrabold px-5 py-2.5 rounded-lg text-sm uppercase"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  // Handle Add to Today's Plan & Redirect to My Plan
  const handleAddPlan = () => {
    addToPlan(workout);
    router.push("/my-plan");
  };

  // Handle Save For Later & Redirect to My Plan
  const handleSaveForLater = () => {
    toggleSave(workout);
    router.push("/my-plan");
  };

  const isItemSaved = saved.some(
    (item) => String(item.id) === String(workout.id),
  );

  // Safe Category List (Fixed TypeScript Red Lines)
  const rawCategory = (workout as { category?: string | string[] }).category;
  const categories: string[] = Array.isArray(rawCategory)
    ? rawCategory
    : typeof rawCategory === "string"
      ? [rawCategory]
      : [];

  // Safe Equipment Formatting
  const rawEquipment = (workout as { equipment?: string | string[] }).equipment;
  const formattedEquipment = Array.isArray(rawEquipment)
    ? rawEquipment.join(", ")
    : typeof rawEquipment === "string"
      ? rawEquipment
      : "N/A";

  // Safe Calories Formatting
  const caloriesValue = workout.caloriesBurned ?? workout.calories ?? 0;

  // Instructions fallback
  const instructions =
    workout.instructions && workout.instructions.length > 0
      ? workout.instructions
      : [
          `Lie or stand in position for ${workout.name}.`,
          "Unrack or hold the weight with controlled grip and form.",
          "Perform the movement through full range of motion.",
          "Maintain core tightness and proper breathing throughout each set.",
        ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Workout Big Image */}
        <div className="lg:col-span-5 bg-[#0f1015] border border-neutral-800/80 rounded-2xl p-4 overflow-hidden flex items-center justify-center min-h-95">
          <div className="relative w-full h-90 rounded-xl overflow-hidden">
            <Image
              src={workout.image || "/assets/banner.png"}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Side: Workout Details Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header Title & Subtitle */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              {workout.description ||
                "A compound workout focused on building strength and muscular endurance."}
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black text-xs font-black uppercase px-3 py-1 rounded-full tracking-wider"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Metrics Table Container */}
          <div className="bg-[#0f1015] border border-neutral-800/80 rounded-2xl p-5 text-sm divide-y divide-neutral-800/60">
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Equipment</span>
              <span className="text-white font-medium">
                {formattedEquipment}
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">
                Difficulty
              </span>
              <span className="text-white font-medium">
                {workout.difficulty || "Intermediate"}
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Sets</span>
              <span className="text-white font-medium">{workout.sets}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Reps</span>
              <span className="text-white font-medium">{workout.reps}</span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Duration</span>
              <span className="text-white font-medium">
                {workout.duration} min
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Calories</span>
              <span className="text-white font-medium">
                {caloriesValue} kcal
              </span>
            </div>
            <div className="flex justify-between py-2 text-gray-400">
              <span className="uppercase text-xs font-semibold">Rating</span>
              <span className="text-white font-medium">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions List Section */}
          <div className="space-y-3">
            <h3 className="text-white font-black text-sm uppercase tracking-wider">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs text-gray-400 list-decimal list-inside leading-relaxed">
              {instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddPlan}
              className="bg-[#a3e635] hover:bg-[#8bd41f] text-black font-black px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>📋</span> Add to today&apos;s plan
            </button>

            <button
              onClick={handleSaveForLater}
              className="border border-neutral-800 hover:border-neutral-700 text-gray-300 hover:text-white font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔖</span> {isItemSaved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
