"use client";

import * as Avatar from "@radix-ui/react-avatar";
import {
  Home,
  ShoppingCart,
  Users,
  Ticket,
  CreditCard,
  Headphones,
  PlusCircle,
  Image as ImageIcon,
  Package,
  MessageSquare,
  ShieldCheck,
  Settings,
  Store,
  ChevronDown,
  ExternalLink,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import homeLogo from '@/assets/Logo/admin-sideber-logo.png';
import avatar from "@/assets/Products_Image/man.avif";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md"
      >
        <Menu size={24} />
      </button>

      <aside
        className={`${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} 
        fixed md:static w-[280px] min-h-screen bg-white border-r px-4 py-6 flex flex-col justify-between 
        transition-transform duration-300 ease-in-out z-40`}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div>
          <div className="px-2 mb-6">
            <Image
              src={homeLogo}
              alt="Logo"
              width={130}
              height={40}
            />
          </div>

          <div className="space-y-1 text-sm text-gray-700 font-medium">
            <p className="text-[13px] text-gray-500 mb-1 px-2">Main menu</p>

            <SidebarItem icon={<Home size={18} />} label="Dashboard" />
            <SidebarItem
              icon={<ShoppingCart size={18} />}
              label="Order Management"
              hasDropdown
            />
            <SidebarItem icon={<Users size={18} />} label="Customers" />
            <SidebarItem icon={<Ticket size={18} />} label="Offers" />
            <SidebarItem icon={<CreditCard size={18} />} label="Transaction" />
            <SidebarItem icon={<Headphones size={18} />} label="Seller Support" />

            <p className="text-[13px] text-gray-500 mt-5 mb-1 px-2">Product</p>

            <SidebarItem
              icon={<PlusCircle size={18} />}
              label="Add Products"
              active
            />
            <SidebarItem icon={<ImageIcon size={18} />} label="Product Media" />
            <SidebarItem icon={<Package size={18} />} label="Product List" />
            <SidebarItem icon={<MessageSquare size={18} />} label="Product Reviews" />

            <p className="text-[13px] text-gray-500 mt-5 mb-1 px-2">Admin</p>

            <SidebarItem icon={<ShieldCheck size={18} />} label="Seller Role" />
            <SidebarItem icon={<Settings size={18} />} label="Control Authority" />
          </div>
        </div>

        {/* User Section */}
        <div className="px-2 mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border">
              <Avatar.Image
                src={avatar.src}
                alt="User"
                className="object-cover w-full h-full"
              />
              <Avatar.Fallback delayMs={600}>PS</Avatar.Fallback>
            </Avatar.Root>
            <div className="text-sm">
              <p className="font-medium">Puja Saha</p>
              <p className="text-xs text-gray-500">Storepublic@market.com</p>
            </div>
            <ExternalLink size={14} className="text-gray-400 ml-auto" />
          </div>

          <button className="w-full border rounded-md px-3 py-2 flex items-center justify-between text-sm font-medium text-gray-700 hover:bg-gray-100 transition">
            Your Shop
            <ExternalLink size={14} />
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

const SidebarItem = ({
  icon,
  label,
  active,
  hasDropdown,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasDropdown?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition ${
        active ? "bg-[#F4552F] text-white" : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-[17px]">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
      {hasDropdown && <ChevronDown size={14} />}
    </div>
  );
};

export default Sidebar;