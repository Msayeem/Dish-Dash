"use client"
import { useState } from 'react';
import Link from 'next/link';
import { FaShieldAlt, FaFileContract, FaChevronRight } from 'react-icons/fa';

export default function PrivacyTerms() {
  const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'

  return (
    <div className="animate-fade-up min-h-screen text-slate-300 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Page Header */}
        <div className="text-center md:text-left border-b border-slate-800 pb-8 mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight mb-4">
            Legal & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400">Policies</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl">
            Learn how DishDash manages user authentication, safeguards data privacy, and enforces recipe ownership across our community network.
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex gap-4 border-b border-slate-800 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'privacy'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FaShieldAlt className="w-4 h-4" />
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200 ${
              activeTab === 'terms'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FaFileContract className="w-4 h-4" />
            Terms of Service
          </button>
        </div>

        {/* Policy Content Area */}
        <main className="bg-slate-800/20 border border-slate-800/60 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-xl">
          
          {activeTab === 'privacy' ? (
            /* PRIVACY POLICY VIEW */
            <article className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">1. Information We Collect</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  To operate DishDash as a secure full-stack platform, we collect standard account data during registration. This includes your username, email address, and encrypted authentication keys. We also retain user-submitted text and database links associated with your custom recipes.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">2. How Your Data Is Used</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  Your data handles the internal execution of basic platform capabilities—such as maintaining user logs, populating search filters, tracking saved cookbooks, and securely executing your personal edit and delete operations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">3. Cookies & Session State</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  DishDash reads secure session validation cookies or secure JSON Web Tokens (JWT) inside your browser storage. These technical hooks are used solely to keep you logged in while searching or modifying recipe parameters across pages.
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Last Updated:</strong> July 20, 2026. For questions regarding account deletion or access histories, please reach out to us directly through your profile management window.
                </p>
              </div>
            </article>
          ) : (
            /* TERMS OF SERVICE VIEW */
            <article className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">1. User Account Ownership</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  You are responsible for protecting the safety of your login authentication tokens. DishDash cannot assume liability for actions triggered under compromised account credentials before a formal security flag is filed.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">2. Intellectual Property & Recipe Rights</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  You retain complete intellectual ownership of all recipes you author, build, and publish onto DishDash. By adding content to public discovery channels, you grant other active platform members a standard global license to view, save, and sort your recipes locally.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-100 mb-3">3. Content Rules & Abuse Policies</h2>
                <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                  DishDash maintains strict community standards. Users are expressly prohibited from uploading malicious script items, formatting broken links, or copying structural content that violates existing copyrights. We reserve the absolute operational right to delete any content that breaks these guidelines.
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                <p className="text-xs text-slate-400 leading-relaxed">
                  By executing CRUD operations or logging into DishDash, you verify that you agree to adapt to these standard operational frameworks.
                </p>
              </div>
            </article>
          )}

        </main>

        {/* Back to Home Link */}
        <div className="mt-8 text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-amber-400 transition-colors group">
            Return to Homepage
            <FaChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}