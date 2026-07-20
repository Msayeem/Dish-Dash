import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Home Cook & Foodie",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      quote: "DishDash completely changed how I organize my weekly dinners. The search is incredibly fast, and being able to save my favorite recipes in one clean interface is a game changer."
    },
    {
      name: "Marcus Chen",
      role: "Culinary Enthusiast",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      quote: "I love sharing my custom recipes with the community. The management system is flawless—editing steps or tweaking ingredients takes just a couple of clicks."
    },
    {
      name: "Elena Rostova",
      role: "Pastry Hobbyist",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      rating: 5,
      quote: "The interface is beautiful and minimal. Sorting by tags and keywords helps me find exactly what I have ingredients for in seconds. Highly recommended!"
    }
  ];

  return (
    <section className="w-full  py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 mb-3">
            Community Voices
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Loved by home cooks and kitchen creators alike.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div 
              key={index}
              className="relative p-8 bg-slate-800/30 rounded-2xl border border-slate-800/60 flex flex-col justify-between"
            >
              {/* Quote Icon Accent */}
              <FaQuoteLeft className="absolute top-6 right-8 w-8 h-8 text-slate-700/30 pointer-events-none" />
              
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{review.quote}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center gap-4 mt-4 pt-6 border-t border-slate-800/60">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-orange-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {review.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}