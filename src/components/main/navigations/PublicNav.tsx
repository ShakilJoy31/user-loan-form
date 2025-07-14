"use client";

import { publicNavigations } from "@/utils/common/publicNavigationsLink";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import navbarLogo from './../../../../assets/Home/navbarLogo.png';
import avatar from './../../../../assets/Home/Square.png';

const PublicNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="lg:px-10 fixed top-0 left-0 right-0 z-50 border-b bg-[#FD6801] text-white ">
      <div className="w-full  max-w-[1440px] mx-auto">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-white hover:bg-orange-600 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="text-lg font-semibold md:ml-0 mx-auto md:mx-0">
              <Image
                width={100}
                height={100}
                src={navbarLogo}
                alt={""}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(publicNavigations).map(([key, nav]) => (
                <Link
                  key={key}
                  href={nav.path}
                  className="text-sm font-medium hover:underline"
                >
                  {nav.name}
                </Link>
              ))}

              {/* Desktop Icons */}
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full bg-white text-black hover:bg-orange-600">
                  <Heart size={20} />
                </button>
                <button className="p-2 rounded-full bg-white text-black hover:bg-orange-600 relative">
                  <ShoppingCart size={20} />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 leading-none transform translate-x-1/2 -translate-y-1/2">
                    1
                  </span>
                </button>

                {/* Avatar Dropdown */}
                <div className="relative inline-block mt-1">
                  {/* Avatar Button */}
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

                  {/* Dropdown Menu - Conditionally shown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-white text-black shadow-md p-4 rounded-lg z-50">
                      {/* Arrow at the top */}
                      <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45"></div>

                      {/* User Info */}
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
                          <p className="text-sm text-gray-500">
                            nfilamini@yahoo.com
                          </p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between items-center">
                          <a
                            href="/account"
                            className="flex items-center gap-2 py-1  transition-colors"
                          >
                            My Account
                          </a>
                          <div className="border text-xs p-1 rounded-full">
                            <FaUser />
                          </div>
                        </div>
                        <hr className="my-2 border-gray-200" />
                        <div className="flex justify-between items-center">
                          <button className="flex items-center gap-2 transition-colors">
                            Logout
                          </button>
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
              <button className="p-2 rounded-md text-white hover:bg-orange-600">
                <Heart size={20} />
              </button>
              <button className="p-2 rounded-md text-white hover:bg-orange-600 relative">
                <ShoppingCart size={20} />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1 leading-none transform translate-x-1/2 -translate-y-1/2">
                  1
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              {/* Sidebar */}
              <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white text-black shadow-lg z-50">
                <div className="flex h-full flex-col">
                  <div className="p-4 border-b">
                    <div className="text-lg font-semibold">Proyojon</div>
                  </div>
                  <nav className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-2">
                      {Object.entries(publicNavigations).map(([key, nav]) => (
                        <Link
                          key={key}
                          href={nav.path}
                          className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          {nav.name}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PublicNav;
