"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiChevronDown } from "react-icons/fi";
import navbarLogo from "@/assets/Logo/sidebarlogo.png";
import { FiChevronsRight } from "react-icons/fi";
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
import { LucideLogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { appConfiguration } from "@/utils/constant/appConfiguration";
import { motion, AnimatePresence } from "framer-motion";
import { shareWithCookies } from "@/utils/helper/shareWithCookies";
import { useSelector } from "react-redux";
import { adminNavigationLinks } from "@/utils/helper/adminNavigationsLink";
import { selectUser } from "@/redux/store";
import { useGetUserNotificationQuery } from "@/redux/features/user/userApi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import useSidebar from "@/hooks/useSidebar";
import Image from "next/image";

const AdminSidebarNavigation = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeSubSubmenu, setActiveSubSubmenu] = useState<string | null>(null);
  const user = useSelector(selectUser);
  const router = useRouter();
  const pathname = usePathname();
  const { translate } = useCustomTranslator();
  const { open, isOpen, onClose } = useSidebar();

  const { data: notificationData } = useGetUserNotificationQuery(
    {},
    { pollingInterval: 30000 }
  );

  const handleLogout = async () => {
    shareWithCookies("remove", `${appConfiguration.appCode}token`);
    router.push("/login");
    router.refresh();
  };

 const filteredNavigationLinks = adminNavigationLinks?.filter((link) => {
  // Add null checks
  if (!user || !user.role) return false;
  
  if (user.role === "SUPER_ADMIN") return true;
  if (user.role === "OPERATION_ADMIN") {
    return !["Finance", "Delete"].includes(link.key);
  }
  if (user.role === "OPERATION_MANAGER") {
    return (
      !["Finance", "Settings"].includes(link.key) &&
      ["Products", "Discounts", "Categories", "Orders"].includes(link.key)
    );
  }
  if (user.role === "SUPPORT_EXECUTIVE") {
    return ["Orders", "Customers"].includes(link.key);
  }
  return false;
}) || []; 

  const getCountForLabel = (key: string) => {
    if (!notificationData?.data) return null;

    switch (key) {
      case "order-list":
        return notificationData.data.orderCount > 0
          ? notificationData.data.orderCount
          : null;
      case "customer-list":
        return notificationData.data.customerCount > 0
          ? notificationData.data.customerCount
          : null;
      case "pre-order-list":
        return notificationData.data.preOrderCount > 0
          ? notificationData.data.preOrderCount
          : null;
      case "pre-order-form-list":
        return notificationData.data.preOrderFormCount > 0
          ? notificationData.data.preOrderFormCount
          : null;
      case "return-order-list":
        return notificationData?.data?.returnOrderCount > 0
          ? notificationData?.data?.returnOrderCount
          : null;
      default:
        return null;
    }
  };

  const isActive = (href: string) => pathname === href;

  const renderLabelWithCount = (link: {
    label: { en: string; bn: string };
    key: string;
  }) => {
    const count = getCountForLabel(link.key);
    if (!count) return translate(link.label.bn, link.label.en);

    return translate(
      `${link.label.bn} (${count})`,
      `${link.label.en} (${count})`
    );
  };

  console.log(filteredNavigationLinks)

  return (
    <section
      className={`transition-all duration-700 hidden lg:block ${
        open ? "w-[260px]" : "w-[70px]"
      }`}
    >
      <motion.aside
        initial={{ width: 70 }}
        animate={{ width: open ? 260 : 70 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-0 left-0 z-20 hidden lg:block  bg-white dark:bg-background dark:shadow-2xl px-5 h-full overflow-hidden"
      >
        {/* BRAND HEADER */}
        <div className="p-4 flex items-center justify-between">
          <Link href="/">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -20 }}
              transition={{ duration: 0.2 }}
              className={`text-2xl font-semibold ${!open && "hidden"}`}
            >
              <Image
                width={100}
                height={100}
                src={navbarLogo}
                alt="Logo"
                className="w-full h-full object-cover "
              />
            </motion.h1>
          </Link>
          <button
            onClick={() => {
              if (open) {
                onClose();
              } else {
                isOpen();
              }
            }}
            className="cursor-pointer"
            aria-label={translate("মেনু টগল", "Toggle menu")}
          >
            <FiChevronsRight
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              size={25}
            />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)] pb-4">
          <ul className="mt-2 ">
            {adminNavigationLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                className="relative"
              >
                {!link.subLinks ? (
                  <Link
                    href={link.href || "#"}
                    className={cn(
                      "flex items-center px-2 py-3 gap-3 text-gray-800 dark:text-gray-200 transition-all w-full justify-between hover:bg-primary-50",
                      isActive(link.href || "")
                        ? "bg-primary-100 text-primary font-semibold"
                        : ""
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {link.icon && <link.icon size={20} />}
                      {open && <span>{renderLabelWithCount(link)}</span>}
                    </div>
                    {!open && getCountForLabel(link.key) && (
                      <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {getCountForLabel(link.key)}
                      </span>
                    )}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        setActiveSubmenu(
                          activeSubmenu === link.key ? null : link.key
                        )
                      }
                      className="flex items-center px-2 py-3 gap-3 text-gray-800 dark:text-gray-300 cursor-pointer transition-all rounded-md w-full justify-between hover:bg-primary-50"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && <link.icon size={20} />}
                        {open && <span>{renderLabelWithCount(link)}</span>}
                      </div>
                      {!open && getCountForLabel(link.key) && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {getCountForLabel(link.key)}
                        </span>
                      )}
                      {link.subLinks && open && (
                        <FiChevronDown
                          className={`transition-transform ${
                            activeSubmenu === link.key ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </button>

                    <AnimatePresence>
                      {activeSubmenu === link.key && link.subLinks && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-6 border-l border-gray-200 overflow-hidden"
                        >
                          {link.subLinks.map((subLink, subIndex) => (
                            <motion.li
                              key={subIndex}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: subIndex * 0.05 }}
                            >
                              {!subLink.subSubLinks ? (
                                <Link
                                  href={subLink.href || "#"}
                                  className={cn(
                                    "block px-6 py-2 text-sm transition-all",
                                    isActive(subLink.href || "")
                                      ? "bg-primary-100 text-primary font-semibold"
                                      : "hover:bg-primary-50"
                                  )}
                                >
                                  {renderLabelWithCount(subLink)}
                                </Link>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      setActiveSubSubmenu(
                                        activeSubSubmenu === subLink.key
                                          ? null
                                          : subLink.key
                                      )
                                    }
                                    className="flex items-center w-full cursor-pointer px-6 py-2 text-sm justify-between hover:bg-primary-50"
                                  >
                                    <span>{renderLabelWithCount(subLink)}</span>
                                    <FiChevronDown
                                      className={`transition-transform ${
                                        activeSubSubmenu === subLink.key
                                          ? "rotate-180"
                                          : ""
                                      }`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {activeSubSubmenu === subLink.key && (
                                      <motion.ul
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="ml-4 border-l border-gray-100"
                                      >
                                        {subLink.subSubLinks.map(
                                          (subSubLink, subSubIndex) => (
                                            <motion.li
                                              key={subSubIndex}
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{
                                                delay: subSubIndex * 0.05,
                                              }}
                                            >
                                              <Link
                                                href={subSubLink.href || "#"}
                                                className={cn(
                                                  "block px-6 py-1 text-sm text-black dark:text-white transition-all",
                                                  isActive(
                                                    subSubLink.href || ""
                                                  )
                                                    ? "bg-primary-100 text-primary font-semibold"
                                                    : "hover:bg-primary-50"
                                                )}
                                              >
                                                {translate(
                                                  subSubLink.label.bn,
                                                  subSubLink.label.en
                                                )}
                                              </Link>
                                            </motion.li>
                                          )
                                        )}
                                      </motion.ul>
                                    )}
                                  </AnimatePresence>
                                </>
                              )}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* LOGOUT BUTTON */}
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className={cn(
                  "cursor-pointer flex h-8 my-4 items-center justify-center text-white",
                  open
                    ? "w-full mx-auto"
                    : "rounded-rull"
                )}
              >
                <LucideLogOut className="dropdown-icon size-4 mr-1" />
                
                 {open && <span> {translate("লগআউট", "Logout")}</span>}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate("আপনি কি নিশ্চিত?", "Are you absolutely sure?")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate(
                    "আপনি কি লগআউট করতে চান? লগআউট করলে আপনার বর্তমান সেশন শেষ হয়ে যাবে।",
                    "Are you sure you want to log out? Logging out will end your current session."
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="btn-destructive-fill">
                  {translate("বাতিল", "Cancel")}
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  {translate("নিশ্চিত করুন", "Confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <p
            className={cn(
              "text-center text-gray-500 text-xs opacity-75",
              !open && "hidden"
            )}
          >
            {translate("সংস্করণ:", "Version:")}{" "}
            <span className="lowercase">{appConfiguration.version}</span>
          </p>
        </div>
      </motion.aside>
    </section>
  );
};

export default AdminSidebarNavigation;
