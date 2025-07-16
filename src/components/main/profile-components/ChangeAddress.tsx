"use client";
import Image from "next/image";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit2, FiShare2, FiHelpCircle } from "react-icons/fi";
import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs";

import avatar from "@/assets/Products_Image/man.avif";

export default function ChangePasswordTab() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showReEnter, setShowReEnter] = useState(false);

    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-[376px_458px] gap-4 lg:gap-6 justify-center">
                {/* Profile Info Card - 376px on lg */}
                <div className="w-full lg:w-[376px] border rounded-lg p-5 shadow-sm relative">
                    {/* Top icons */}
                    <div className="absolute top-6 right-3 flex gap-2 text-gray-400">
                        <FiEdit2 className="cursor-pointer hover:text-gray-600" />
                        <FiShare2 className="cursor-pointer hover:text-gray-600" />
                    </div>

                    <h3 className="text-base font-semibold mb-4 text-gray-800">Profile</h3>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-gray-200">
                            <Image
                                src={avatar}
                                alt="user avatar"
                                width={70}
                                height={70}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 mt-2">Wade Warren</h4>
                        <p className="text-sm text-gray-500">wade.warren@example.com</p>

                        <p className="text-sm text-gray-500 mt-[24px] mb-[12px] ">
                            Linked with Social media
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-2">
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsGoogle size={20} className="text-[#EA4335]" />
                                <span className="text-[11px] text-red-500">@Linked</span>
                            </div>
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsFacebook size={20} className="text-[#1877F2]" />
                                <span className="text-[11px] text-red-500">@Linked</span>
                            </div>
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsTwitter size={20} className="text-black" />
                                <span className="text-[11px] text-red-500">@Linked</span>
                            </div>
                        </div>

                        <button className="mt-4 bg-white border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-sm hover:bg-gray-200 transition">
                            🔗 Social media
                        </button>
                    </div>
                </div>

               
                <div className="w-full lg:w-[458px] border rounded-lg p-5 shadow-sm relative">
                    <div className="flex justify-between items-start mb-5">
                        <h3 className="text-base font-semibold text-gray-800">
                            Change Password
                        </h3>
                        <button className="text-sm text-orange-500 flex items-center gap-1">
                            Need help <FiHelpCircle size={14} />
                        </button>
                    </div>

                    <form className="space-y-4">
                        {/* Current Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <p className="text-xs text-orange-500 mt-1 underline cursor-pointer hover:text-orange-600">
                                Forgot Current Password? Click here
                            </p>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showNew ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Re-enter Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1">
                                Re-enter Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showReEnter ? "text" : "password"}
                                    placeholder="Enter password"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowReEnter(!showReEnter)}
                                    className="absolute right-3 top-2.5 text-gray-500"
                                >
                                    {showReEnter ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full h-[50px] bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-semibold rounded-md transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}