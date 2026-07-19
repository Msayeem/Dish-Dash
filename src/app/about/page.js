import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-16 sm:px-6 lg:px-8">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 -z-10 h-[300px] w-[500px] rounded-full bg-orange-500/5 blur-[100px]" />

      <div className="mx-auto max-w-3xl space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">
              DishDash
            </span>
          </h1>
          <p className="text-lg text-zinc-400">
            A premium, high-performance cooking companion designed for home chefs and culinary professionals.
          </p>
        </div>

        {/* Narrative */}
        <div className="prose prose-invert max-w-none text-zinc-300 space-y-6 text-sm sm:text-base leading-relaxed">
          <p>
            DishDash was born out of a simple idea: <strong>cooking should be an organized, inspiring, and seamless experience</strong>. Whether you are trying to recreate a classic family meal, explore international cuisines, or share your own signature recipe, DishDash provides a clean, distraction-free environment to manage your culinary assets.
          </p>
          <p>
            Our architecture is built on state-of-the-art technologies including <strong>Next.js 16</strong>, <strong>Tailwind CSS v4</strong>, <strong>MongoDB</strong>, and <strong>BetterAuth</strong>. This ensures lightning-fast page loading times, extremely secure authentication processes, and responsive layouts that look stunning on everything from mobile phones to high-resolution desktop monitors.
          </p>
        </div>

        {/* Highlighted Stack */}
        <div className="border-t border-zinc-900 pt-10">
          <h3 className="text-lg font-bold text-zinc-200 mb-6 text-center">Core Platform Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <span className="text-2xl mb-3 block">⚡</span>
              <h4 className="font-semibold text-zinc-200">Dynamic Querying</h4>
              <p className="mt-1 text-xs text-zinc-400">
                Instantly filter recipes based on keywords and sort them dynamically by preparation time, cooking time, difficulty, or date added.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <span className="text-2xl mb-3 block">🔒</span>
              <h4 className="font-semibold text-zinc-200">BetterAuth Integration</h4>
              <p className="mt-1 text-xs text-zinc-400">
                Experience modern, secure authentication. Only logged-in chefs can publish new recipes, curate a saved list, or manage their own posts.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <span className="text-2xl mb-3 block">🍳</span>
              <h4 className="font-semibold text-zinc-200">Dynamic Ingredients List</h4>
              <p className="mt-1 text-xs text-zinc-400">
                Easily add or remove ingredient lines when publishing new recipes, supporting complex culinary creations.
              </p>
            </div>

            <div className="rounded-xl border border-zinc-900 bg-zinc-900/10 p-5">
              <span className="text-2xl mb-3 block">📱</span>
              <h4 className="font-semibold text-zinc-200">Responsive Cards</h4>
              <p className="mt-1 text-xs text-zinc-400">
                Clean and information-dense recipe cards highlighting cuisine, category, servings, and times for an instant overview.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/browse"
            className="inline-flex rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:shadow-orange-500/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Browsing Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}
