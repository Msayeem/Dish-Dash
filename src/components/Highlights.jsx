import { FaBolt, FaUtensils, FaClock } from 'react-icons/fa';

export default function Highlights() {
  const analytics = [
    {
      icon: <FaBolt className="w-5 h-5 text-orange-400" />,
      value: "Under 45ms",
      label: "Search Response",
      description: "Blazing fast algorithmic filtering across hundreds of ingredient tags simultaneously."
    },
    {
      icon: <FaUtensils className="w-5 h-5 text-amber-500" />,
      value: "12,450+",
      label: "User Recipes Created",
      description: "A growing community library of custom dishes managed entirely by home chefs."
    },
    {
      icon: <FaClock className="w-5 h-5 text-yellow-400" />,
      value: "99.99%",
      label: "Platform Uptime",
      description: "Reliable database synchronization ensuring your digital recipe book is always ready."
    }
  ];

  return (
    <section className="w-full  py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 mb-3">
            Performance Highlights
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Built for speed. Designed for food lovers.
          </p>
        </div>

        {/* Analytics Numeric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {analytics.map((metric, index) => (
            <div 
              key={index}
              className="p-6 bg-slate-800/20 rounded-2xl border border-slate-800/60 flex items-start gap-4"
            >
              <div className="p-3 bg-slate-800 rounded-xl shrink-0">
                {metric.icon}
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-100 mb-1">
                  {metric.value}
                </span>
                <span className="block text-sm font-bold text-slate-300 mb-2">
                  {metric.label}
                </span>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Live Interactive Visualization Prompt */}
        <p className="text-slate-400 text-sm text-center mb-6 max-w-xl mx-auto">
          Explore the real-time activity distribution across DishDash recipe categories below. Adjust global application parameters to see how user bookmarking behavior adapts dynamically.
        </p>

      </div>
    </section>
  );
}