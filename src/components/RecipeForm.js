"use client";

import { useState, useEffect } from "react";

export default function RecipeForm({ initialData, onSubmit, submitLabel = "Submit", loading = false, error = "" }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [category, setCategory] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  // Pre-fill if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setImage(initialData.image || "");
      setIngredients(initialData.ingredients && initialData.ingredients.length > 0 ? initialData.ingredients : [""]);
      setInstructions(initialData.instructions || "");
      setCuisine(initialData.cuisine || "");
      setCategory(initialData.category || "");
      setPrepTime(initialData.prepTime || "");
      setCookTime(initialData.cookTime || "");
      setServings(initialData.servings || "");
      setDifficulty(initialData.difficulty || "Medium");
    }
  }, [initialData]);

  // Ingredients handlers
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientField = (index) => {
    // Keep at least one input field
    if (ingredients.length === 1) {
      setIngredients([""]);
      return;
    }
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Filter out empty ingredients
    const cleanedIngredients = ingredients
      .map((ing) => ing.trim())
      .filter((ing) => ing !== "");

    if (cleanedIngredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    const payload = {
      title: title.trim(),
      image: image.trim(),
      ingredients: cleanedIngredients,
      instructions: instructions.trim(),
      cuisine: cuisine.trim(),
      category: category.trim(),
      prepTime: prepTime ? Number(prepTime) : undefined,
      cookTime: cookTime ? Number(cookTime) : undefined,
      servings: servings ? Number(servings) : undefined,
      difficulty,
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 text-center">
          {error}
        </div>
      )}

      {/* Grid of basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Recipe Title *
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Classic Margherita Pizza"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label htmlFor="image" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="e.g. https://images.unsplash.com/photo-..."
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Category
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g. Dessert, Dinner, Breakfast"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Cuisine */}
        <div>
          <label htmlFor="cuisine" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Cuisine
          </label>
          <input
            id="cuisine"
            type="text"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="e.g. Italian, Mexican, Asian"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Prep Time */}
        <div>
          <label htmlFor="prepTime" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Prep Time <span className="text-[10px] text-zinc-500">(minutes)</span>
          </label>
          <input
            id="prepTime"
            type="number"
            min="0"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            placeholder="e.g. 15"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Cook Time */}
        <div>
          <label htmlFor="cookTime" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Cook Time <span className="text-[10px] text-zinc-500">(minutes)</span>
          </label>
          <input
            id="cookTime"
            type="number"
            min="0"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            placeholder="e.g. 30"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Servings */}
        <div>
          <label htmlFor="servings" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Servings
          </label>
          <input
            id="servings"
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            placeholder="e.g. 4"
            className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label htmlFor="difficulty" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Difficulty
          </label>
          <div className="relative">
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="mt-1.5 w-full appearance-none rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all cursor-pointer"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <span className="absolute right-3.5 top-5 pointer-events-none text-[10px] text-zinc-500">▼</span>
          </div>
        </div>
      </div>

      {/* Dynamic Ingredients Section */}
      <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Ingredients *
          </label>
          <button
            type="button"
            onClick={addIngredientField}
            className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
          >
            + Add Line
          </button>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                required={index === 0}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder={`Ingredient #${index + 1}`}
                className="flex-1 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
              />
              <button
                type="button"
                onClick={() => removeIngredientField(index)}
                className="rounded-lg border border-zinc-900 bg-zinc-900 hover:bg-red-500/10 hover:border-red-500/20 text-zinc-400 hover:text-red-400 p-2 text-sm transition-colors cursor-pointer"
                title="Remove ingredient"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div>
        <label htmlFor="instructions" className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
          Preparation Instructions *
        </label>
        <textarea
          id="instructions"
          required
          rows="6"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Step 1: Prep the base...&#10;Step 2: Bake at 400 degrees..."
          className="mt-1.5 block w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-y"
        />
      </div>

      {/* Action Buttons */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-3 text-sm font-bold text-white shadow-md hover:shadow-orange-500/10 hover:opacity-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
