import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-20 sm:px-6 lg:px-8">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 -z-10 h-[300px] w-[400px] rounded-full bg-amber-500/5 blur-[100px]" />

      <div className="max-w-4xl text-center space-y-8">
        {/* Main Headline */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-400">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
            Discover the Art of Cooking
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Your Digital Kitchen Companion{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400">
              DishDash
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-xl leading-relaxed">
          Search culinary masterpieces, save your favorite recipes, and publish your own chef creations. DishDash makes cooking organized, social, and delicious.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/browse"
            className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-center cursor-pointer"
          >
            Browse Recipes
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all text-center"
          >
            Learn More
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-zinc-200">Explore Culinary Ideas</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Search by title or ingredient and sort by cook time, difficulty, or servings to find the perfect dish.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold mb-4">
              💾
            </div>
            <h3 className="text-lg font-bold text-zinc-200">Save Your Favorites</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Keep your chosen culinary delights stored safely in your personal cookbook for quick access anytime.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-900 bg-zinc-900/20 p-6 backdrop-blur-sm">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 font-bold mb-4">
              ✍️
            </div>
            <h3 className="text-lg font-bold text-zinc-200">Create & Share</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Publish your recipes for the community, complete with ingredients, instructions, category, and cook times.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
