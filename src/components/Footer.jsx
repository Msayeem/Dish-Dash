import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Requires react-icons

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Logo & Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400">
              DishDash
            </Link>
            <p className="text-sm max-w-xs text-slate-500">
                A premium, high-performance cooking companion designed for home chefs and culinary professionals.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-2">
              Explore
            </h4>
            <Link href="/browse" className="text-sm hover:text-orange-400 transition-colors duration-200">
              Recipes
            </Link>
          
            <Link href="/about" className="text-sm hover:text-orange-400 transition-colors duration-200">
              About Us
            </Link>
          </div>

          {/* Socials & Connect Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Connect With Me
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://github.com/Msayeem" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sayem-dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full text-slate-300 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-12 pt-8 border-t border-slate-800  text-xs text-slate-500">
          <p>© {currentYear} DishDash. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}