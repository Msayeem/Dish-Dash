import { FaSearch, FaBookmark, FaUtensils } from 'react-icons/fa'; // Requires react-icons

export default function Features() {
  const features = [
    {
      icon: <FaSearch className="w-6 h-6 text-orange-400" />,
      title: "Smart Recipe Discovery",
      description: "Quickly browse, search, and sort through a diverse collection of recipes to find exactly what you're craving in seconds."
    },
    {
      icon: <FaBookmark className="w-6 h-6 text-amber-500" />,
      title: "Personal Recipe Box",
      description: "Save the recipes that matter most to you, creating a curated digital cookbook that's always ready when it's time to cook."
    },
    {
      icon: <FaUtensils className="w-6 h-6 text-yellow-500" />,
      title: "Recipe Management",
      description: "Contribute to the community by creating your own unique recipes, with full control to edit or delete them at any time."
    }
  ];

  return (
    <section className="w-full  py-20 border-b ">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 mb-3">
            What You Can Do
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Everything you need to discover and organize delicious culinary experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-slate-800/40 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/[0.02]"
            >
              {/* Icon Container */}
              <div className="mb-6 inline-flex p-3 bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              
              {/* Feature Content */}
              <h3 className="text-xl font-bold text-slate-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}