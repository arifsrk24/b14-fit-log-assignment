import Hero from "@/components/Home/Hero";
import Library from "@/components/Home/Library";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Banner Section */}
      <Hero />

      {/* Workout Library Section (API fetching, Filter, Search & Sorting) */}
      <div id="library">
        <Library />
      </div>
    </div>
  );
}
