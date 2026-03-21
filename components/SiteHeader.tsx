"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const memberNavItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tools", label: "Tools" },
  { href: "/access-key", label: "Access Key" },
  { href: "/announcements", label: "Announcements" },
  { href: "/groups", label: "Builders Atrium" },
];

export default function SiteHeader() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated" && !!session?.user;
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const email = session?.user?.email ?? "";
  const initials = email ? email[0].toUpperCase() : "?";

  return (
    <header className="border-b border-gray-800 bg-gray-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Commons Atrium
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Nav links */}
              <nav className="hidden items-center gap-1 text-sm md:flex">
                {memberNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Member avatar + dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold text-white hover:bg-gray-600"
                  aria-label="Account menu"
                >
                  {initials}
                </button>

                {open && (
                  <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-xl">
                    <div className="border-b border-gray-700 px-4 py-3">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="mt-0.5 truncate text-sm font-medium text-white">{email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/access-key"
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        Access Key
                      </Link>
                    </div>

                    <div className="border-t border-gray-700 py-1">
                      <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-800 hover:text-red-300"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/login"
                className="rounded-lg border border-gray-700 px-3 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="rounded-lg bg-white px-3 py-2 font-medium text-black hover:bg-gray-100"
              >
                Join the Atrium
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
