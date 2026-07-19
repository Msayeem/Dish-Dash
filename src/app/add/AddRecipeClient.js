"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";

export default function AddRecipeClient({ user }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRecipe = async (recipeData) => {
    setLoading(true);
    setError("");

    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...recipeData,
          createdBy: user.id,
          createdByName: user.name,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create recipe (Status: ${res.status})`);
      }

      router.push("/browse");
      router.refresh();
    } catch (err) {
      console.error("Error creating recipe:", err);
      setError(err.message || "Failed to publish recipe. Please verify the information and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Publish a New Recipe
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            Share your cooking techniques, ingredients, and flavor profiles with other home chefs.
          </p>
        </div>

        {/* Recipe Form Box */}
        <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 sm:p-8 backdrop-blur-sm">
          <RecipeForm
            onSubmit={handleCreateRecipe}
            submitLabel="Publish Recipe"
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
