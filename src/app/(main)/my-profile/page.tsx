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
import WalletPoint from "@/components/main/profile-components/WalletPoint";
import { shareWithLocal } from "@/utils/helper/shareWithLocalStorage";
import OrderTab from "@/components/main/profile-components/MyOrder";
import ReturnOrdersTab from "@/components/main/profile-components/ReturnOrder";
import TrackOrderTab from "@/components/main/profile-components/TracOrder";
import WishlistTab from "@/components/main/profile-components/WishList";
import CompareTab from "@/components/main/profile-components/CompareProducts";
import ShippingAddressTab from "@/components/main/profile-components/ShipingAddress";
import ChangePasswordTab from "@/components/main/profile-components/ChangeAddress";
import { Button } from "@/components/ui/button";

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
    id: "wallet-point",
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
    label: "Track Order",
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
      const result = shareWithLocal('get', 'activeAccountTab');
      return result || "update-profile";
    }
    return "update-profile";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-0 mb-[37px] mt-16 pt-[40px]">
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
          className={`fixed lg:static inset-y-0 left-0 w-[280px] lg:w-full z-40 bg-white shadow-md rounded-md py-5 px-3 transition-transform duration-300 lg:translate-x-0 lg:col-span-3 h-[100vh] overflow-y-auto ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}
          style={{ top: "80px" }}
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
                  className={`flex items-center h-[42px] gap-3 py-2 px-4 rounded-md cursor-pointer text-sm font-medium transition-colors duration-200 ${isActive
                      ? "bg-[#EE5A2C] text-white"
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

        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        <div className="lg:col-span-9 w-full">
          <div className="bg-white">
            {(() => {
              switch (activeTab) {
                case "update-profile":
                  return <UpdateProfile />;
                case "order":
                  return <OrderTab />;
                case "wallet-point":
                  return <WalletPoint />;
                case "return-order":
                  return <ReturnOrdersTab />;
                case "track-order":
                  return <TrackOrderTab />;
                case "wishlist":
                  return <WishlistTab />;
                case "compare":
                  return <CompareTab />;
                case "shipping-info":
                  return <ShippingAddressTab />;
                case "change-password":
                  return <ChangePasswordTab />;

                default:
                  return (
                    <>
                      <h2 className="text-xl font-semibold capitalize">
                        {activeTab?.split("-").join(" ")}
                      </h2>
                      <p className="mt-2 text-gray-500">
                        This tab is under construction.
                      </p>
                    </>
                  );
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
