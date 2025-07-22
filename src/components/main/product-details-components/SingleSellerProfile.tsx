"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FiEdit2, FiShare2 } from "react-icons/fi";
import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs";

interface UserCompanyInfo {
  id: number;
  userId: number;
  shopName: string;
  ownerName: string;
  designation: string;
  city: string;
  area: string;
  tradeLicense: string;
  createdAt: string;
  updatedAt: string;
}

interface ShopProfileProps {
  id: number;
  name: string;
  contactNo: string;
  avatar: string;
  UserCompanyInfo: UserCompanyInfo;
}

interface SingleSellerProfileProps {
  shopProfile: ShopProfileProps;
}

const SingleSellerProfile: React.FC<SingleSellerProfileProps> = ({
  shopProfile,
}) => {
  const { name, contactNo, avatar, UserCompanyInfo } = shopProfile;

  const { shopName, ownerName, designation, city, area, tradeLicense } =
    UserCompanyInfo;

  return (
    <div className="w-full border rounded-lg p-5 shadow-sm relative dark:border dark:border-white">
      <div className="absolute top-6 right-3 flex gap-2 text-gray-400">
        <FiEdit2 className="cursor-pointer hover:text-gray-600" />
        <FiShare2 className="cursor-pointer hover:text-gray-600" />
      </div>

      <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">
        Profile
      </h3>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        {/* Left Section - Profile, Name, Contact, Social Links */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={avatar || "/default-avatar.jpg"}
              alt="user avatar"
              width={70}
              height={70}
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="text-sm font-medium text-gray-800 mt-2 dark:text-white">
            {name || "Shop Owner"}
          </h4>
          <p className="text-sm text-gray-500 dark:text-white">{contactNo}</p>

          <p className="text-sm text-gray-500 mt-6 mb-3 dark:text-white">
            Linked with Social media
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-x-2 items-center text-xs text-gray-600">
              <BsGoogle size={20} className="text-[#EA4335] dark:text-white" />
              <span className="text-[11px] text-red-500 dark:text-white">
                @Linked
              </span>
            </div>
            <div className="flex gap-x-2 items-center text-xs text-gray-600">
              <BsFacebook
                size={20}
                className="text-[#1877F2] dark:text-white"
              />
              <span className="text-[11px] text-red-500 dark:text-white">
                @Linked
              </span>
            </div>
            <div className="flex gap-x-2 items-center text-xs text-gray-600">
              <BsTwitter size={20} className="text-black dark:text-white" />
              <span className="text-[11px] text-red-500 dark:text-white">
                @Linked
              </span>
            </div>
          </div>

          <Button
            variant={"outline"}
            className="mt-4 bg-white border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-sm hover:bg-gray-200 transition"
          >
            🔗 Social media
          </Button>
        </div>

        {/* Right Section - Shop Information in a single div */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h5 className="font-medium text-gray-800 dark:text-white mb-2">
                Shop Information
              </h5>
              <p className="text-sm text-gray-600 dark:text-white">
                <span className="font-medium">Shop Name:</span> {shopName}
              </p>
              <p className="text-sm text-gray-600 dark:text-white mt-1">
                <span className="font-medium">Owner:</span> {ownerName}
              </p>
              <p className="text-sm text-gray-600 dark:text-white mt-1">
                <span className="font-medium">Designation:</span> {designation}
              </p>
              <p className="text-sm text-gray-600 dark:text-white mt-1">
                <span className="font-medium">Location:</span> {area}, {city}
              </p>
              <p className="text-sm text-gray-600 dark:text-white mt-1">
                <span className="font-medium">Trade License:</span>{" "}
                {tradeLicense}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSellerProfile;
