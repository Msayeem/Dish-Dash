"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const navLinks = [
    { href: "/browse", label: "Browse Recipes" },
    { href: "/about", label: "About" },
  ];

  const authLinks = [
    { href: "/saved", label: "Saved Recipes" },
    { href: "/add", label: "Add Recipe" },
    { href: "/manage", label: "Manage" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400 group-hover:opacity-90 transition-opacity">
                DishDash
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded">
                v1.0
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                  pathname === link.href ? "text-orange-400 font-semibold" : "text-zinc-300"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {session && (
              <div className="flex items-center gap-6 border-l border-zinc-800 pl-6">
                {authLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-orange-400 ${
                      pathname === link.href ? "text-orange-400 font-semibold" : "text-zinc-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button Controls */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="h-8 w-20 animate-pulse rounded bg-zinc-800" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-zinc-300">
                    {session.user.name}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    {session.user.email}
                  </span>
                </div>
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name}
                    className="h-8 w-8 rounded-full border border-orange-500/25 object-cover"
                  />
                )}
                <button
                  onClick={handleSignOut}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-2 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block rounded-md px-3 py-2 text-base font-medium ${
                pathname === link.href
                  ? "bg-zinc-900 text-orange-400 font-semibold"
                  : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {session && (
            <>
              <div className="border-t border-zinc-900 my-2 pt-2" />
              {authLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-medium ${
                    pathname === link.href
                      ? "bg-zinc-900 text-orange-400 font-semibold"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </>
          )}

          <div className="border-t border-zinc-900 mt-4 pt-4 px-3 flex flex-col gap-3">
            {isPending ? (
              <div className="h-8 w-20 animate-pulse rounded bg-zinc-800" />
            ) : session ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-8 w-8 rounded-full border border-orange-500/25 object-cover"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-300">
                      {session.user.name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {session.user.email}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-center cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2 text-sm font-semibold text-white shadow-md text-center hover:opacity-90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
