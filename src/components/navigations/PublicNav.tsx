"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import navbarLogo from "@/assets/Logo/navber-logo.png";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "../common/ThemeSwitcher";
import LocaleSwitcher from "../common/LocaleSwitcher";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Affiliate", path: "/affiliate" },
  { name: "Services", path: "/services" },
  { name: "Technology", path: "/technology" },
  { name: "B2B", path: "/b2b" },
  { name: "Pricing", path: "/pricing" },
  { name: "About us", path: "/about-us" },
];

export default function PublicNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 dark:bg-[#050117] text-white transition-all duration-300 ${
        isScrolled
          ? "border-b dark:border-[#262626] bg-gray-300/90 dark:bg-[#050117]/90 backdrop-blur-sm"
          : "border-b dark:border-[#262626] bg-gray-300 dark:bg-[#050117]"
      }`}
    >
      <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between h-16 px-2 md:px-0">
        {/* Logo - Adjusted for tablet */}
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer flex-shrink-0 w-[120px] md:w-[150px] lg:w-[180px]"
        >
          <Image
            src={navbarLogo}
            alt="Logo"
            width={180}
            height={70}
            className=" w-full h-auto"
          />
        </div>

        {/* Desktop Navigation - Adjusted for tablet */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`px-3 py-1 xl:px-4 rounded-full text-sm font-medium transition-all ${
                pathname === link.path
                  ? "bg-[#1D9BF0] text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side - Adjusted for tablet */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <ThemeSwitcher />
          <LocaleSwitcher />
          <Button
            onClick={() => router.push("/contact")}
            className="bg-[#1D9BF0] dark:bg-[#1D9BF0] px-4 py-1 lg:px-6 rounded-md text-white text-sm font-medium whitespace-nowrap"
          >
            Contact Us
          </Button>
        </div>

        {/* Mobile Menu Button - Shows on tablet too */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <LocaleSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700 dark:text-gray-300 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Shows on tablet too */}
      {isOpen && (
        <div className="lg:hidden bg-gray-300 dark:bg-[#050117] border-t dark:border-[#262626]">
          <div className="px-4 py-2 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`px-4 py-3 rounded-md text-sm font-medium ${
                  pathname === link.path
                    ? "bg-[#1D9BF0] text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              onClick={() => router.push("/contact")}
              className="bg-[#1D9BF0] dark:bg-[#1D9BF0] px-6 py-3 rounded-md text-white text-sm font-medium w-full"
            >
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}