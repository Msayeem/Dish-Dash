"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function RecipeDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const { data: session, isPending: sessionPending } = authClient.useSession();

  // Recipe state
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Save state
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState(""); // "saved", "already_saved", "error"
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${id}`;
        const res = await fetch(url);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Recipe not found");
          }
          throw new Error(`Failed to load recipe (Status: ${res.status})`);
        }
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError(err.message || "Could not retrieve recipe details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipeDetails();
    }
  }, [id]);

  const handleSaveRecipe = async () => {
    if (!session?.user?.id) return;
    setSaveLoading(true);
    setSaveStatus("");
    setSaveMessage("");

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/saved`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          recipeId: id,
        }),
      });

      if (res.status === 409) {
        setSaveStatus("already_saved");
        setSaveMessage("already saved");
        return;
      }

      if (!res.ok) {
        throw new Error(`Error saving recipe (Status: ${res.status})`);
      }

      setSaveStatus("saved");
      setSaveMessage("Saved successfully!");
    } catch (err) {
      console.error("Error saving recipe:", err);
      setSaveStatus("error");
      setSaveMessage("Failed to save recipe. Please try again.");
    } finally {
      setSaveLoading(false);
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

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-950 py-20">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="h-12 w-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin" />
          <span className="text-sm text-zinc-400 font-medium">Fetching secret ingredients...</span>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-1 items-center justify-center bg-zinc-950 px-4 py-20">
        <div className="max-w-md w-full rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8 text-center backdrop-blur-sm">
          <span className="text-5xl block mb-4">⚠️</span>
          <h2 className="text-xl font-bold text-white mb-2">Recipe Unavailable</h2>
          <p className="text-sm text-zinc-400 mb-6">{error || "The recipe you are looking for does not exist."}</p>
          <Link
            href="/browse"
            className="inline-flex rounded-lg bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition-colors"
          >
            Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-950 pb-20">
      {/* Hero Banner Area */}
      <div className="relative h-64 sm:h-96 w-full bg-zinc-900 overflow-hidden">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback Banner */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-orange-950/20"
          style={{ display: recipe.image ? "none" : "flex" }}
        >
          <span className="text-6xl mb-2">🍳</span>
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            {recipe.cuisine || "Gourmet"} Recipe
          </span>
        </div>

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        {/* Floating details overlay on banner bottom */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8">
          <div className="mx-auto max-w-5xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {recipe.category && (
                  <span className="rounded bg-orange-500/20 border border-orange-500/25 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    {recipe.category}
                  </span>
                )}
                {recipe.cuisine && (
                  <span className="rounded bg-zinc-950/80 border border-zinc-800 px-2 py-0.5 text-[10px] font-semibold text-zinc-300">
                    {recipe.cuisine}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-black text-white sm:text-4xl md:text-5xl drop-shadow-md">
                {recipe.title}
              </h1>
              <p className="text-xs text-zinc-400">
                Created by <span className="text-zinc-200 font-semibold">{recipe.createdByName || "Anonymous"}</span>
              </p>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center gap-3">
              {/* Save Recipe Button */}
              {sessionPending ? (
                <div className="h-10 w-24 rounded-lg bg-zinc-800 animate-pulse" />
              ) : session ? (
                <button
                  onClick={handleSaveRecipe}
                  disabled={saveLoading || saveStatus === "already_saved"}
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all shadow-lg cursor-pointer ${
                    saveStatus === "already_saved"
                      ? "bg-zinc-800 border border-zinc-700 text-zinc-500 cursor-not-allowed"
                      : saveStatus === "saved"
                      ? "bg-green-600 text-white shadow-green-600/10"
                      : "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/15 hover:shadow-orange-500/25 hover:scale-[1.02]"
                  }`}
                >
                  <span>💾</span>
                  {saveLoading ? (
                    "Saving..."
                  ) : saveStatus === "already_saved" ? (
                    "Already Saved"
                  ) : saveStatus === "saved" ? (
                    "Saved!"
                  ) : (
                    "Save Recipe"
                  )}
                </button>
              ) : (
                <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm px-4 py-2.5 text-center text-xs text-zinc-500 font-medium">
                  🔒 <Link href="/login" className="text-orange-400 hover:underline">Sign in</Link> to save recipe
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-5xl px-4 sm:px-8 mt-8">
        {/* Save Result Banner */}
        {saveMessage && (
          <div
            className={`mb-6 rounded-xl border p-4 text-center text-sm font-semibold animate-fade-in ${
              saveStatus === "already_saved"
                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                : saveStatus === "saved"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {saveStatus === "already_saved" ? (
              <span className="flex items-center justify-center gap-1.5">
                ⚠️ Already saved to your collection.
              </span>
            ) : (
              saveMessage
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 text-center">
            <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Prep Time
            </span>
            <span className="text-lg font-bold text-white">
              {recipe.prepTime ? `${recipe.prepTime} mins` : "—"}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 text-center">
            <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Cook Time
            </span>
            <span className="text-lg font-bold text-white">
              {recipe.cookTime ? `${recipe.cookTime} mins` : "—"}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 text-center">
            <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Servings
            </span>
            <span className="text-lg font-bold text-white">
              {recipe.servings || "—"}
            </span>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-4 text-center">
            <span className="block text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-1">
              Difficulty
            </span>
            <span className="inline-block mt-1 rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              <span className={`rounded-full border px-2 py-0.5 text-[10px] ${getDifficultyColor(recipe.difficulty)}`}>
                {recipe.difficulty || "Medium"}
              </span>
            </span>
          </div>
        </div>

        {/* Recipe Body Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ingredients Column */}
          <div className="lg:col-span-1 rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-900 pb-3">
              Ingredients
            </h3>

            {recipe.ingredients && recipe.ingredients.length > 0 ? (
              <ul className="space-y-3.5">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
                    <label className="flex items-start gap-3 cursor-pointer group w-full">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 rounded border-zinc-800 bg-zinc-900 text-orange-500 focus:ring-orange-500/20 focus:ring-offset-zinc-950 accent-orange-500"
                      />
                      <span className="group-has-[:checked]:text-zinc-500 group-has-[:checked]:line-through transition-all leading-tight">
                        {ingredient}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500 italic">No ingredients specified.</p>
            )}
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-2 rounded-2xl border border-zinc-900 bg-zinc-900/10 p-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-zinc-900 pb-3">
              Instructions
            </h3>

            {recipe.instructions ? (
              <div className="whitespace-pre-line text-sm text-zinc-300 leading-relaxed space-y-4">
                {recipe.instructions.split("\n").map((step, index) => {
                  const cleanedStep = step.trim();
                  if (!cleanedStep) return null;
                  return (
                    <div key={index} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-xs font-bold text-orange-400 border border-orange-500/20">
                        {index + 1}
                      </span>
                      <p className="pt-0.5">{cleanedStep}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500 italic">No instructions specified.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
