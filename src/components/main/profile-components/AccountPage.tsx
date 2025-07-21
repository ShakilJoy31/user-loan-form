"use client";
import {
  CircleUser,
  GitCompareArrows,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiToggltrack } from "react-icons/si";
import { MdOutlineLock } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { TfiControlPlay } from "react-icons/tfi";
import { shareWithLocal } from "@/utils/helper/shareWithLocalStorage";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { usePathname, useRouter } from "next/navigation";

const AccountPage = ({ children }: { children: React.ReactNode }) => {
  const { translate } = useCustomTranslator();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Extract active tab from URL
  const activeTab = pathname.split('/').pop() || "update-profile";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      shareWithLocal('set', 'activeAccountTab', activeTab);
    }
  }, [activeTab]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleTabChange = (tabId: string) => {
    shareWithLocal('set', 'activeAccountTab', tabId);
    router.push(`/my-profile/${tabId}`);
    setMobileSidebarOpen(false);
  };

  const tabs = [
    {
      id: "update-profile",
      label: translate("গ্রাহক তথ্য", "Customer Info"),
      icon: (active: boolean) => (
        <CircleUser className={`w-5 h-5 ${active ? "text-white" : "text-black dark:text-white"}`} />
      ),
    },
    {
      id: "order",
      label: translate("অর্ডার", "Order"),
      icon: () => <AiOutlineShoppingCart className="w-5 h-5" />,
    },
    {
      id: "wallet-point",
      label: translate("ওয়ালেট পয়েন্ট", "Wallet Point"),
      icon: () => <span className="w-5 h-5">💳</span>,
    },
    {
      id: "return-order",
      label: translate("রিটার্ন অর্ডার", "Return Order"),
      icon: () => <ShoppingBag className="w-5 h-5" />,
    },
    {
      id: "track-order",
      label: translate("অর্ডার ট্র্যাক", "Track Order"),
      icon: () => <SiToggltrack className="w-5 h-5" />,
    },
    {
      id: "wishlist",
      label: translate("ইচ্ছেতালিকা", "Wish-list"),
      icon: () => <Heart className="w-5 h-5" />,
    },
    {
      id: "compare",
      label: translate("তুলনা", "Compare"),
      icon: () => <GitCompareArrows className="w-5 h-5" />,
    },
    {
      id: "shipping-info",
      label: translate("শিপিং ঠিকানা", "Shipping Address"),
      icon: () => <span className="w-5 h-5">📍</span>,
    },
    {
      id: "change-password",
      label: translate("পাসওয়ার্ড পরিবর্তন", "Change Password"),
      icon: () => <MdOutlineLock className="w-5 h-5" />,
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-0 mb-[37px] mt-16 pt-[40px] ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <Button variant={'outline'}
          onClick={toggleMobileSidebar}
          className="lg:hidden fixed top-24 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        >
          <TfiControlPlay
            size={20}
            className={`transition-transform duration-300 ${mobileSidebarOpen ? "rotate-180 text-red-500" : "text-gray-700"
              }`}
          />
        </Button>

        <div
          className={`fixed dark:bg-black dark:text-white lg:static inset-y-0 left-0 w-[280px] lg:w-full z-40 bg-white shadow-md rounded-md py-5 px-3 transition-transform duration-300 lg:translate-x-0 lg:col-span-3 h-[100vh] overflow-y-auto ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          style={{ top: "80px" }}
        >
          <div className="mb-5">
            <h3 className="text-sm text-gray-500 px-2 dark:text-white">
              {translate("প্রধান মেনু", "Main menu")}
            </h3>
          </div>
          <ul className="space-y-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center h-[42px] gap-3 py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 ${isActive
                      ? "bg-[#EE5A2C] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {typeof tab.icon === 'function' ? tab.icon(isActive) : tab.icon}
                  <span>{tab.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        <div className="lg:col-span-9 w-full">
          <div className="bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;