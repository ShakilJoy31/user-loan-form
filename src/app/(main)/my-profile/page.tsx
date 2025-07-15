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
import UpdateProfile from "@/components/main/profile-components/UpdateProfile";

const tabs = [
  {
    id: "update-profile",
    label: "Customer Info",
    icon: (active: boolean) => (
      <CircleUser className={`w-5 h-5 ${active ? "text-white" : "text-black"}`} />
    ),
  },
  {
    id: "order",
    label: "Order",
    icon: () => <AiOutlineShoppingCart className="w-5 h-5" />,
  },
  {
    id: "wallet",
    label: "Wallet Point",
    icon: () => <span className="w-5 h-5">💳</span>,
  },
  {
    id: "return-order",
    label: "Return Order",
    icon: () => <ShoppingBag className="w-5 h-5" />,
  },
  {
    id: "track-order",
    label: "Trac Order",
    icon: () => <SiToggltrack className="w-5 h-5" />,
  },
  {
    id: "wishlist",
    label: "Wish-list",
    icon: () => <Heart className="w-5 h-5" />,
  },
  {
    id: "compare",
    label: "Compare",
    icon: () => <GitCompareArrows className="w-5 h-5" />,
  },
  {
    id: "shipping-info",
    label: "Shipping Address",
    icon: () => <span className="w-5 h-5">📍</span>,
  },
  {
    id: "change-password",
    label: "Change Password",
    icon: () => <MdOutlineLock className="w-5 h-5" />,
  },
];

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeAccountTab") || "update-profile";
    }
    return "update-profile";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeAccountTab", activeTab);
    }
  }, [activeTab]);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 px-4 lg:px-6">
        {/* Mobile Toggle Button */}
        <button
          onClick={toggleMobileSidebar}
          className="lg:hidden fixed top-24 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        >
          <TfiControlPlay
            size={20}
            className={`transition-transform duration-300 ${
              mobileSidebarOpen ? "rotate-180 text-red-500" : "text-gray-700"
            }`}
          />
        </button>

        {/* Sidebar */}
        <div
          className={`bg-white w-[90%] sm:w-[250px] max-w-[290px] z-40 shadow-md rounded-md py-5 px-3 transition-transform duration-300 lg:translate-x-0 lg:static fixed top-[80px] left-0 h-[90vh] overflow-y-auto ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="mb-5">
            <h3 className="text-sm text-gray-500 px-2">Main menu</h3>
          </div>
          <ul className="space-y-3">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-3 py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab.icon(isActive)}
                  <span>{tab.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-span-1 lg:col-span-9">
          {(() => {
            switch (activeTab) {
              case "update-profile":
                return <UpdateProfile />;
              default:
                return (
                  <div className="p-4 bg-white rounded-md shadow-sm">
                    <h2 className="text-xl font-semibold">{activeTab}</h2>
                    <p className="mt-2 text-gray-500">
                      This tab is under construction.
                    </p>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
