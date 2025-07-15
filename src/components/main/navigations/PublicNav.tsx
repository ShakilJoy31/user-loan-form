"use client";

import { publicNavigations } from "@/utils/helper/publicNavigationsLink";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import navbarLogo from './../../../../assets/Home/navbarLogo.png';
import avatar from './../../../../assets/Home/Square.png';
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import LocaleSwitcher from "@/components/common/LocaleSwitcher";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const PublicNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else if (systemPrefersDark) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  // Properly typed animation variants for sidebar
  const sidebarVariants: Variants = {
    hidden: { 
      x: '-100%', 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: { 
      x: '-100%', 
      opacity: 0,
      transition: { 
        ease: 'easeInOut',
        duration: 0.2
      }
    }
  };

  // Properly typed animation variants for overlay
  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <header className="lg:px-10 fixed top-0 left-0 right-0 z-50 border-b bg-[#FD6801] text-white">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <Button
              className="md:hidden p-2 rounded-md text-white hover:bg-orange-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* Logo */}
            <div className="text-lg font-semibold md:ml-0 mx-auto md:mx-0">
              <Image
                width={100}
                height={100}
                src={navbarLogo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(publicNavigations).map(([key, nav]) => (
                <Link
                  key={key}
                  href={nav.path}
                  className="text-sm font-medium hover:underline dark:hover:text-orange-300"
                >
                  {nav.name}
                </Link>
              ))}

              {/* Desktop Icons */}
              <div className="flex items-center gap-4">
                 <ThemeSwitcher></ThemeSwitcher>
              <LocaleSwitcher></LocaleSwitcher>

                <Button 
                onClick={() => router.push('/wish-list')}
                className="p-2 rounded-full bg-white text-black hover:bg-orange-600 ">
                  <Heart size={20} />
                </Button>

                <Button
                 onClick={() => router.push('/shopping-cart')}
                className="p-2 rounded-full bg-white text-black hover:bg-orange-600 relative ">
                  <ShoppingCart size={20} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 leading-none transform translate-x-1/2 -translate-y-1/2">
                    1
                  </span>
                </Button>

                {/* Avatar Dropdown */}
                <div className="relative inline-block mt-1">
                  <button
                    className="rounded-full border-2 border-white cursor-pointer overflow-hidden w-10 h-10 focus:outline-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <Image
                      width={100}
                      height={100}
                      src={avatar}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white text-black shadow-md p-4 rounded-lg z-50 dark:bg-gray-800 dark:text-white">
                      <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-gray-800 transform rotate-45"></div>
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={avatar}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="rounded-full border w-10 h-10 object-cover"
                        />
                        <div>
                          <p className="font-semibold">Niko Flamini</p>
                          <p className="text-sm text-gray-500 dark:text-gray-300">
                            nfilamini@yahoo.com
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <a
                            href="/account"
                            className="flex items-center gap-2 py-1 transition-colors hover:text-orange-500 dark:hover:text-orange-300"
                          >
                            My Account
                          </a>
                          <div className="border text-xs p-1 rounded-full dark:border-gray-600">
                            <FaUser />
                          </div>
                        </div>
                        <hr className="my-2 border-gray-200 dark:border-gray-600" />
                        <div className="flex justify-between items-center">
                          <Button className="flex items-center gap-2 transition-colors hover:text-orange-500 dark:hover:text-orange-300">
                            Logout
                          </Button>
                          <MdLogout className="text-lg" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </nav>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-4">
              <Button className="p-2 rounded-md text-white hover:bg-orange-600">
                <Heart size={20} />
              </Button>
              <Button className="p-2 rounded-md text-white hover:bg-orange-600 relative">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 leading-none transform translate-x-1/2 -translate-y-1/2">
                  1
                </span>
              </Button>
            </div>
          </div>

          {/* Mobile Sidebar with Framer Motion */}
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Overlay with animation */}
                <motion.div
                  key="overlay"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={overlayVariants}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setIsOpen(false)}
                  transition={{ duration: 0.2 }}
                />

                {/* Sidebar with animation */}
                <motion.div
                  key="sidebar"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={sidebarVariants}
                  className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white text-black shadow-lg z-50 dark:bg-gray-800 dark:text-white"
                >
                  <div className="flex h-full flex-col">
                    <div className="p-4 border-b dark:border-gray-700">
                      <div className="text-lg font-semibold dark:text-white">Proyojon</div>
                    </div>
                    <nav className="flex-1 overflow-y-auto p-4">
                      <div className="space-y-2">
                        {Object.entries(publicNavigations).map(([key, nav]) => (
                          <Link
                            key={key}
                            href={nav.path}
                            className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                          >
                            {nav.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default PublicNav;