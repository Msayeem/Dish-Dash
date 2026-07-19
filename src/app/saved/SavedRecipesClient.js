"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SavedRecipesClient({ userId }) {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removeLoadingId, setRemoveLoadingId] = useState(null);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/saved/${userId}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to load saved recipes (Status: ${res.status})`);
        }
        const data = await res.json();
        console.log(data)
        setItems(data);
      } catch (err) {
        console.error("Error loading saved recipes:", err);
        setError("Unable to retrieve your saved recipes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchSavedRecipes();
    }
  }, [userId]);

  // Robust utility to extract recipe details from list items
const getRecipeDetails = (item) => {
  if (!item) return null;
  if (item.title) return item;
  if (item.recipeDetails && typeof item.recipeDetails === "object") return item.recipeDetails;
  if (item.recipe && typeof item.recipe === "object") return item.recipe;
  if (item.recipeId && typeof item.recipeId === "object") return item.recipeId;
  return null;
};

const getRecipeId = (item) => {
  if (!item) return "";
  if (item.recipeDetails && item.recipeDetails._id) return item.recipeDetails._id;
  if (item.recipe && item.recipe._id) return item.recipe._id;
  if (item.recipeId) {
    if (typeof item.recipeId === "string") return item.recipeId;
    if (typeof item.recipeId === "object" && item.recipeId._id) return item.recipeId._id;
  }
  return item._id || "";
};

  const handleRemove = async (recipeId, itemId) => {
    if (!recipeId) return;
    setRemoveLoadingId(recipeId);

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/saved/${userId}/${recipeId}`;
      const res = await fetch(url, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to remove saved recipe (Status: ${res.status})`);
      }

      // Successfully removed - update local state
      setItems((prev) => prev.filter((item) => getRecipeId(item) !== recipeId && item._id !== itemId));
    } catch (err) {
      console.error("Error removing saved recipe:", err);
      alert("Failed to remove recipe. Please try again.");
    } finally {
      setRemoveLoadingId(null);
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            My Saved Recipes
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Your personal cookbook of handpicked culinary delights.
          </p>
        </div>

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
          /* Loading skeletons */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
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
        ) : items.length === 0 ? (
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-12 text-center max-w-xl mx-auto">
            <span className="text-5xl block mb-4">📖</span>
            <p className="text-base font-semibold text-zinc-300">Your cookbook is empty</p>
            <p className="mt-1.5 text-sm text-zinc-500">
              Browse recipes in our catalog and click "Save Recipe" to add them here.
            </p>
            <Link
              href="/browse"
              className="mt-6 inline-flex rounded-lg bg-orange-600 px-5 py-3 text-xs font-semibold text-white hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/10"
            >
              Discover Recipes
            </Link>
          </div>
        ) : (
          /* Saved recipes list */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const recipe = getRecipeDetails(item);
              const recipeId = getRecipeId(item);

              if (!recipe) return null;

              return (
                <div
                  key={item._id}
                  className="group relative flex flex-col rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all overflow-hidden"
                >
                  {/* Recipe Image fallback */}
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
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950"
                      style={{ display: recipe.image ? "none" : "flex" }}
                    >
                      <span className="text-4xl">🍳</span>
                      <span className="mt-2 text-xs text-zinc-600 font-bold uppercase tracking-wider">
                        {recipe.cuisine || "Tasty"} Dish
                      </span>
                    </div>

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

                    {/* Actions split details and remove */}
                    <div className="mt-auto pt-2 flex items-center gap-3">
                      <Link
                        href={`/recipes/${recipeId}`}
                        className="flex-1 text-center rounded-lg bg-zinc-900 border border-zinc-800 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() => handleRemove(recipeId, item._id)}
                        disabled={removeLoadingId === recipeId}
                        className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {removeLoadingId === recipeId ? "Removing..." : "Remove"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
