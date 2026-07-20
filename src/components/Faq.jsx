"use client"
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I add my own recipes to DishDash?",
      answer: "Once you create an account and log in, you will have access to your personal Dashboard. From there, simply click on the 'Add Recipe' button, fill out your ingredients, steps, and tags, and save it. It will instantly be viewable in your personal collection."
    },
    {
      question: "Can other users edit or delete the recipes I create?",
      answer: "No. DishDash enforces strict creator ownership. Only you have the permissions to edit or delete the recipes associated with your account. Other users can view and save them to their favorites, but your original content remains completely secure."
    },
    {
      question: "How does the search and sorting system work?",
      answer: "Our smart discovery system filters through recipe names, categories, and custom ingredient tags in real time. You can sort results alphabetically, by creation date, or filter down to specific dietary tags to find exactly what you want instantly."
    },
    {
      question: "Is there a limit to how many recipes I can save?",
      answer: "Not at all! Your personal recipe box is unlimited. You can save as many community recipes or custom creations as you like, making it easy to grow your digital cookbook over time."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full  py-20 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 mb-3">
            Have Questions?
          </h2>
          <p className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Frequently Asked Questions
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={`bg-slate-800/20 rounded-xl border transition-all duration-300 ${
                  isOpen ? 'border-amber-500/40 bg-slate-800/40' : 'border-slate-800/80 hover:border-slate-700/60'
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold transition-colors duration-200 text-base md:text-lg ${
                    isOpen ? 'text-amber-400' : 'text-slate-200 group-hover:text-slate-100'
                  }`}>
                    {faq.question}
                  </span>
                  <FaChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${
                    isOpen ? 'transform rotate-180 text-amber-400' : ''
                  }`} />
                </button>

                {/* Accordion Content Panel */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-slate-400 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}