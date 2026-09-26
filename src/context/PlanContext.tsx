"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";

interface PlanContextType {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: string | number) => void;
  toggleDone: (id: string | number) => void;
  toggleSave: (workout: Workout) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_plan");
      const storedSaved = localStorage.getItem("fitlog_saved");
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load from LocalStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_plan", JSON.stringify(plan));
      localStorage.setItem("fitlog_saved", JSON.stringify(saved));
    }
  }, [plan, saved, isLoaded]);

  // Add to Plan (Limit max 5 workouts)
  const addToPlan = (workout: Workout) => {
    const exists = plan.some((item) => String(item.id) === String(workout.id));
    if (exists) {
      return { success: false, message: "Workout already in Today's Plan!" };
    }
    if (plan.length >= 5) {
      return {
        success: false,
        message: "Limit reached! Max 5 workouts allowed per day.",
      };
    }
    setPlan([...plan, { ...workout, isDone: false }]);
    return { success: true, message: "Added to Today's Plan!" };
  };

  // Remove from Plan
  const removeFromPlan = (id: string | number) => {
    setPlan(plan.filter((item) => String(item.id) !== String(id)));
  };

  // Toggle Done State
  const toggleDone = (id: string | number) => {
    setPlan(
      plan.map((item) =>
        String(item.id) === String(id)
          ? { ...item, isDone: !item.isDone }
          : item,
      ),
    );
  };

  // Toggle Save Workout
  const toggleSave = (workout: Workout) => {
    const exists = saved.some((item) => String(item.id) === String(workout.id));
    if (exists) {
      setSaved(saved.filter((item) => String(item.id) !== String(workout.id)));
    } else {
      setSaved([...saved, workout]);
    }
  };

  return (
    <PlanContext.Provider
      value={{ plan, saved, addToPlan, removeFromPlan, toggleDone, toggleSave }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
