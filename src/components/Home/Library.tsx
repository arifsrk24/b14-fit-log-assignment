"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/Home/WorkoutCard";
import Loading from "@/components/ui/Loading";
import { Workout } from "@/types/workout";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        const res = await fetch("https://api.api-store.workers.dev/api/fitlog");
        if (!res.ok) {
          throw new Error("Failed to fetch workouts");
        }
        const data = await res.json();
        setWorkouts(data);
      } catch (err) {
        console.error("Error fetching workouts:", err);
        setError("Failed to load workouts.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  if (loading) return <Loading />;
  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      {/* Header Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          THE LIBRARY
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
