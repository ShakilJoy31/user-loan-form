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
  ChevronDown,
  ExternalLink,
  Menu,
  ChevronsRight,
} from "lucide-react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import homeLogo from '@/assets/Logo/admin-sideber-logo.png';
import avatar from "@/assets/Products_Image/man.avif";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { appConfiguration } from "@/utils/constant/appConfiguration";

const SellerSideber = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      key: "dashboard",
      icon: <Home size={20} />,
      label: "Dashboard",
      href: "/seller/dashboard",
    },
    {
      key: "orders",
      icon: <ShoppingCart size={20} />,
      label: "Order Management",
      href: "/seller/orders",
    },
    {
      key: "customers",
      icon: <Users size={20} />,
      label: "Customers",
      href: "/seller/customers",
    },
    {
      key: "offers",
      icon: <Ticket size={20} />,
      label: "Offers",
      href: "/seller/offers",
    },
    {
      key: "transactions",
      icon: <CreditCard size={20} />,
      label: "Transaction",
      href: "/seller/transactions",
    },
    {
      key: "support",
      icon: <Headphones size={20} />,
      label: "Seller Support",
      href: "/seller/support",
    },
    {
      key: "products",
      icon: <Package size={20} />,
      label: "Products",
      subItems: [
        {
          key: "add-products",
          icon: <PlusCircle size={16} />,
          label: "Add Products",
          href: "/add-product",
        },
        {
          key: "product-list",
          icon: <Package size={16} />,
          label: "Product List",
          href: "/products-list",
        },
        {
          key: "product-media",
          icon: <ImageIcon size={16} />,
          label: "Product Media",
          href: "/seller/products/media",
        },

        {
          key: "product-reviews",
          icon: <MessageSquare size={16} />,
          label: "Product Reviews",
          href: "/seller/products/reviews",
        },
      ],
    },
    {
      key: "admin",
      icon: <ShieldCheck size={20} />,
      label: "Admin",
      subItems: [
        {
          key: "seller-role",
          icon: <ShieldCheck size={16} />,
          label: "Seller Role",
          href: "/seller/admin/roles",
        },
        {
          key: "control-authority",
          icon: <Settings size={16} />,
          label: "Control Authority",
          href: "/seller/admin/controls",
        },
      ],
    },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    shareWithCookies("remove", `${appConfiguration.appCode}token`);
    router.push("/seller-auth");
    router.refresh();
  };

  return (
    <>
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md"
      >
        <Menu size={24} />
      </button>

      <motion.aside
        initial={{ width: 70 }}
        animate={{ width: isOpen ? 260 : 70 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 z-40 h-screen bg-white border-r flex flex-col ${isOpen ? "w-[260px]" : "w-[70px]"
          }`}
      >
        {/* Logo and Toggle */}
        <div className="p-4 flex items-center justify-between">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ duration: 0.2 }}
              className={`${!isOpen && "hidden"}`}
            >
              <Image
                src={homeLogo}
                alt="Logo"
                width={130}
                height={40}
              />
            </motion.div>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer"
            aria-label="Toggle menu"
          >
            <ChevronsRight
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                }`}
              size={25}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.key} className="px-2">
                {!item.subItems ? (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 gap-3 text-gray-700 rounded-md transition-all",
                      isActive(item.href)
                        ? "bg-[#F4552F] text-white"
                        : "hover:bg-gray-100"
                    )}
                  >
                    <span className="text-[20px]">{item.icon}</span>
                    {isOpen && <span className="text-sm">{item.label}</span>}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === item.key ? null : item.key
                        )
                      }
                      className={cn(
                        "flex items-center px-3 py-2 gap-3 w-full rounded-md transition-all",
                        activeSubmenu === item.key
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-100 text-gray-700"
                      )}
                    >
                      <span className="text-[20px]">{item.icon}</span>
                      {isOpen && (
                        <>
                          <span className="text-sm flex-1 text-left">
                            {item.label}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`transition-transform ${activeSubmenu === item.key ? "rotate-180" : ""
                              }`}
                          />
                        </>
                      )}
                    </button>

                    <AnimatePresence>
                      {activeSubmenu === item.key && item.subItems && isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-1 space-y-1 overflow-hidden"
                        >
                          {item.subItems.map((subItem) => (
                            <motion.li
                              key={subItem.key}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.1 }}
                            >
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "flex items-center px-3 py-2 gap-2 text-sm rounded-md transition-all",
                                  isActive(subItem.href)
                                    ? "bg-[#F4552F] text-white"
                                    : "hover:bg-gray-100 text-gray-700"
                                )}
                              >
                                <span className="text-[16px]">{subItem.icon}</span>
                                <span>{subItem.label}</span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section and Logout */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-3 mb-4">
            <Avatar.Root className="w-10 h-10 rounded-full overflow-hidden border">
              <Avatar.Image
                src={avatar.src}
                alt="User"
                className="object-cover w-full h-full"
              />
              <Avatar.Fallback delayMs={600}>PS</Avatar.Fallback>
            </Avatar.Root>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.2 }}
                className="text-sm"
              >
                <p className="font-medium">Puja Saha</p>
                <p className="text-xs text-gray-500">Storepublic@market.com</p>
              </motion.div>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span className="hover:cursor-pointer"><MdLogout size={20}></MdLogout></span>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Logging out will end your current session.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction onClick={handleLogout}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>


          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <Link
                href="/seller/shop"
                className="flex items-center justify-between px-3 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <span>Your Shop</span>
                <ExternalLink size={20} />
              </Link>

              <Link
                href="/seller-change-password"
                className="flex items-center justify-between px-3 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <span>Change Password</span>
                <RiLockPasswordFill size={20} />
              </Link>


            </motion.div>
          )}
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

export default SellerSideber;