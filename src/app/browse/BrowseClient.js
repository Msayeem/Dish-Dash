"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function BrowseClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get query values from URL or set defaults
  const searchVal = searchParams.get("search") || "";
  const sortByVal = searchParams.get("sortBy") || "createdAt";
  const orderVal = searchParams.get("order") || "desc";

  // Local state
  const [searchInput, setSearchInput] = useState(searchVal);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Update local input if URL changes (e.g. back button)
  useEffect(() => {
    setSearchInput(searchVal);
  }, [searchVal]);

  // Fetch recipes when URL params change
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes?search=${encodeURIComponent(
          searchVal
        )}&sortBy=${sortByVal}&order=${orderVal}`;

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch recipes (Status: ${res.status})`);
        }
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
        setError("Could not load recipes. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [searchVal, sortByVal, orderVal]);

  // Update URL parameters
  const updateParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`/browse?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ search: searchInput });
  };

  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split(":");
    updateParams({ sortBy, order });
  };

  // Helper for difficulty colors
  const getDifficultyColor = (diff) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "hard":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-800 text-zinc-400 border-zinc-700/50";
    }
  };

  return (
    <div className="animate-fade-up flex-1 bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Recipe Catalog
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Discover unique dishes or refine your search to find the perfect meal.
            </p>
          </div>

          {/* Add recipe button shortcut if logged in can go here, but Navbar already has it */}
        </div>

        {/* Filters and Search Bar */}
        <div className="mb-8 rounded-xl border border-zinc-900 bg-zinc-900/30 p-4 backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by title, ingredients, cuisine..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <span className="absolute left-3.5 top-3.5 text-zinc-500 text-sm">🔍</span>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4">
              {/* Search Button */}
              <button
                type="submit"
                className="w-full sm:w-auto rounded-lg bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors cursor-pointer"
              >
                Search
              </button>

              {/* Sort Dropdown */}
              <div className="relative w-full sm:w-48">
                <select
                  value={`${sortByVal}:${orderVal}`}
                  onChange={handleSortChange}
                  className="w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
                >
                  <option value="createdAt:desc">Newest Added</option>
                  <option value="createdAt:asc">Oldest Added</option>
                  <option value="title:asc">Title (A-Z)</option>
                  <option value="title:desc">Title (Z-A)</option>
                  <option value="prepTime:asc">Prep Time (Lowest)</option>
                  <option value="prepTime:desc">Prep Time (Highest)</option>
                  <option value="cookTime:asc">Cook Time (Lowest)</option>
                  <option value="cookTime:desc">Cook Time (Highest)</option>
                  <option value="servings:asc">Servings (Lowest)</option>
                  <option value="servings:desc">Servings (Highest)</option>
                  <option value="difficulty:asc">Difficulty (Easy first)</option>
                  <option value="difficulty:desc">Difficulty (Hard first)</option>
                </select>
                <span className="absolute right-3.5 top-4 pointer-events-none text-[10px] text-zinc-500">▼</span>
              </div>
            </div>
          </form>
        </div>

        {/* Recipes Grid */}
        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-medium text-red-400">{error}</p>
            <button
              onClick={() => router.refresh()}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] rounded-2xl border border-zinc-900 bg-zinc-900/10 p-4 space-y-4 animate-pulse"
              >
                <div className="h-48 rounded-xl bg-zinc-900" />
                <div className="h-4 w-2/3 bg-zinc-900 rounded" />
                <div className="h-4 w-1/2 bg-zinc-900 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 bg-zinc-900 rounded-full" />
                  <div className="h-6 w-16 bg-zinc-900 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-12 text-center">
            <span className="text-4xl block mb-3">🍽️</span>
            <p className="text-base font-semibold text-zinc-300">No recipes found</p>
            <p className="mt-1 text-sm text-zinc-500">
              Try adjusting your keywords or clearing the search filter.
            </p>
            {(searchVal || searchInput) && (
              <button
                onClick={() => {
                  setSearchInput("");
                  updateParams({ search: "" });
                }}
                className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          /* Recipe Cards List */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="group relative flex flex-col rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all overflow-hidden"
              >
                {/* Recipe Image with Fallback */}
                <div className="h-48 w-full overflow-hidden bg-zinc-950 relative">
                  {recipe.image ? (
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  {/* Styled Image Fallback */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950"
                    style={{ display: recipe.image ? "none" : "flex" }}
                  >
                    <span className="text-4xl">🍳</span>
                    <span className="mt-2 text-xs text-zinc-600 font-bold uppercase tracking-wider">
                      {recipe.cuisine || "Tasty"} Dish
                    </span>
                  </div>

                  {/* Absolute Labels */}
                  {recipe.difficulty && (
                    <span
                      className={`absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getDifficultyColor(
                        recipe.difficulty
                      )}`}
                    >
                      {recipe.difficulty}
                    </span>
                  )}
                  {recipe.cuisine && (
                    <span className="absolute top-3 right-3 rounded-md bg-zinc-950/85 backdrop-blur-sm border border-zinc-800 px-2 py-0.5 text-[10px] font-bold text-zinc-300">
                      {recipe.cuisine}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400/90">
                      {recipe.category || "General"}
                    </span>
                    <span className="text-[10px] text-zinc-500">
                      by {recipe.createdByName || "Anonymous"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-orange-400 transition-colors">
                    {recipe.title}
                  </h3>

                  {/* Quick Meta */}
                  <div className="grid grid-cols-3 gap-2 my-4 border-y border-zinc-900 py-3 text-center">
                    <div>
                      <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                        Prep Time
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {recipe.prepTime ? `${recipe.prepTime}m` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                        Cook Time
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {recipe.cookTime ? `${recipe.cookTime}m` : "—"}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                        Servings
                      </span>
                      <span className="text-xs font-bold text-zinc-300">
                        {recipe.servings || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-2">
                    <Link
                      href={`/recipes/${recipe._id}`}
                      className="block w-full text-center rounded-lg bg-zinc-900 border border-zinc-800 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
