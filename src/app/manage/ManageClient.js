"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeForm from "@/components/RecipeForm";

export default function ManageClient({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editing state
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Action feedback states (for deletion etc.)
  const [actionFeedback, setActionFeedback] = useState("");
  const [actionError, setActionError] = useState("");

  const fetchUserRecipes = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/user/${user.id}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to load recipes (Status: ${res.status})`);
      }
      const data = await res.json();
      setRecipes(data);
    } catch (err) {
      console.error("Error loading user recipes:", err);
      setError("Unable to retrieve your recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchUserRecipes();
    }
  }, [user]);

  const handleEditSubmit = async (recipeData) => {
    if (!editingRecipe?._id) return;
    setFormLoading(true);
    setFormError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${editingRecipe._id}`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...recipeData,
          userId: user.id, // backend expects userId in the body for auth verification
        }),
      });

      if (res.status === 403) {
        throw new Error("you don't own this recipe");
      }

      if (!res.ok) {
        throw new Error(`Failed to update recipe (Status: ${res.status})`);
      }

      // Reset editing states and refresh recipes list
      setEditingRecipe(null);
      setActionFeedback("Recipe updated successfully!");
      setTimeout(() => setActionFeedback(""), 4000);
      fetchUserRecipes();
    } catch (err) {
      console.error("Error editing recipe:", err);
      setFormError(err.message || "Failed to update recipe. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (recipeId) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    setActionFeedback("");
    setActionError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${recipeId}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id, // backend expects userId in the body for auth verification
        }),
      });

      if (res.status === 403) {
        throw new Error("you don't own this recipe");
      }

      if (!res.ok) {
        throw new Error(`Failed to delete recipe (Status: ${res.status})`);
      }

      // Remove deleted recipe from local state
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      setActionFeedback("Recipe deleted successfully.");
      setTimeout(() => setActionFeedback(""), 4000);
    } catch (err) {
      console.error("Error deleting recipe:", err);
      setActionError(err.message || "Failed to delete recipe. Please try again.");
      setTimeout(() => setActionError(""), 5000);
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

  // If in EDIT Mode
  if (editingRecipe) {
    return (
      <div className="animate-fade-up flex-1 bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Header & Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Edit Recipe
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Updating: <span className="text-zinc-300 font-medium">{editingRecipe.title}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRecipe(null);
                setFormError("");
              }}
              className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
            >
              ← Cancel
            </button>
          </div>

          {/* Form wrapper */}
          <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-sm">
            <RecipeForm
              initialData={editingRecipe}
              onSubmit={handleEditSubmit}
              submitLabel="Save Changes"
              loading={formLoading}
              error={formError}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Manage My Recipes
            </h1>
            <p className="mt-1.5 text-sm text-zinc-400">
              Create, edit, or remove your published culinary recipes.
            </p>
          </div>

          <Link
            href="/add"
            className="inline-flex rounded-lg bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/10 self-start sm:self-auto"
          >
            + Create New Recipe
          </Link>
        </div>

        {/* Action Feedbacks */}
        {actionFeedback && (
          <div className="mb-6 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-center text-sm font-semibold text-green-400 animate-fade-in">
            {actionFeedback}
          </div>
        )}
        {actionError && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm font-semibold text-red-400 animate-shake">
            {actionError === "you don't own this recipe" ? (
              <span className="flex items-center justify-center gap-1.5">
                ⚠️ You don't own this recipe.
              </span>
            ) : (
              actionError
            )}
          </div>
        )}

        {error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <p className="text-sm font-medium text-red-400">{error}</p>
            <button
              onClick={fetchUserRecipes}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : loading ? (
          /* Loading Skeletons */
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
        ) : recipes.length === 0 ? (
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-12 text-center max-w-xl mx-auto">
            <span className="text-5xl block mb-4">🍳</span>
            <p className="text-base font-semibold text-zinc-300">You haven't published any recipes yet</p>
            <p className="mt-1.5 text-sm text-zinc-500">
              Share your first recipe with the DishDash community!
            </p>
            <Link
              href="/add"
              className="mt-6 inline-flex rounded-lg bg-orange-600 px-5 py-3 text-xs font-semibold text-white hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/10"
            >
              Publish First Recipe
            </Link>
          </div>
        ) : (
          /* User's recipe list */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="group relative flex flex-col rounded-2xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all overflow-hidden"
              >
                {/* Image */}
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
                      created {new Date(recipe.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-orange-400 transition-colors">
                    {recipe.title}
                  </h3>

                  {/* Meta */}
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

                  {/* Actions split Edit / Delete */}
                  <div className="mt-auto pt-2 flex items-center gap-3">
                    <button
                      onClick={() => setEditingRecipe(recipe)}
                      className="flex-1 text-center rounded-lg bg-zinc-900 border border-zinc-800 py-2.5 text-xs font-bold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                    >
                      🗑️ Delete
                    </button>
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
