"use client";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit2, FiShare2, FiHelpCircle } from "react-icons/fi";
import { BsGoogle, BsFacebook, BsTwitter } from "react-icons/bs";
import avatar from "@/assets/Products_Image/man.avif";
import { Button } from "@/components/ui/button";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { useGetUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import { useCustomerChangePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";

export default function ChangePasswordTab() {
      const user = useSelector(selectUser);
      const [isUserLoaded, setIsUserLoaded] = useState(false);
      const dispatch = useDispatch();
      const [oldPassword, setOldPassword] = useState("");
        const [newPassword, setNewPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        useEffect(() => {
          if (!user.id) {
            loadUserFromToken(dispatch).then(() => {
              setIsUserLoaded(true);
            });
          } else {
            setIsUserLoaded(true);
          }
        }, [dispatch, user.id]);
      
        const { data: customerData, isLoading: customerUserLoading } = useGetUserByIdQuery(
          user?.id,
          { skip: !user.id || !isUserLoaded }
        );

        const [customerChangePassword, { isLoading: updateUserLoading }] = useCustomerChangePasswordMutation();
      


    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showReEnter, setShowReEnter] = useState(false);
    const { translate } = useCustomTranslator();

      const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Prepare the data to send (exclude password if it's the placeholder)

      const response = await customerChangePassword({oldPassword, newPassword, confirmPassword}).unwrap();

      if (response.success) {
        toast.success('Profile updated successfully');
      } else {
        throw new Error(response.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(translate("প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে", "Failed to update profile"));
    }
  };

   if (!isUserLoaded || customerUserLoading) {
      return <div className="flex justify-center"><DataLoader /></div>;
    }
  
    if (!user.id) {
      return <div className="flex justify-center">Please login to access this page</div>;
    }
  

    return (
        <div className="bg-white p-4 sm:p-6 dark:bg-black dark:text-white shadow-sm min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-[376px_458px] gap-4 lg:gap-6 justify-center">
                {/* Profile Info Card */}
                <div className="w-full lg:w-[376px] border rounded-lg p-5 shadow-sm relative  dark:border dark:border-white">
                    <div className="absolute top-6 right-3 flex gap-2 text-gray-400">
                        <FiEdit2 className="cursor-pointer hover:text-gray-600" />
                        <FiShare2 className="cursor-pointer hover:text-gray-600" />
                    </div>

                    <h3 className="text-base font-semibold mb-4 text-gray-800 dark:text-white">{translate("প্রোফাইল", "Profile")}</h3>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-gray-200">
                            <Image
                                src={customerData?.data?.avatar || avatar}
                                alt={translate("ব্যবহারকারীর অ্যাভাটার", "user avatar")}
                                width={70}
                                height={70}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-sm font-medium text-gray-800 mt-2 dark:text-white">{customerData?.data?.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-white">{customerData?.data?.email}</p>

                        <p className="text-sm text-gray-500 mt-[24px] mb-[12px] dark:text-white">
                            {translate("সোশ্যাল মিডিয়ার সাথে লিঙ্ক করা", "Linked with Social media")}
                        </p>

                        <div className="flex items-center justify-center gap-4 mt-2">
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsGoogle size={20} className="text-[#EA4335] dark:text-white" />
                                <span className="text-[11px] text-red-500 dark:text-white">@Linked</span>
                            </div>
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsFacebook size={20} className="text-[#1877F2] dark:text-white" />
                                <span className="text-[11px] text-red-500 dark:text-white">@Linked</span>
                            </div>
                            <div className="flex gap-x-[8px] items-center text-xs text-gray-600">
                                <BsTwitter size={20} className="text-black dark:text-white" />
                                <span className="text-[11px] text-red-500 dark:text-white">@Linked</span>
                            </div>
                        </div>

                        <Button variant={'outline'} className="mt-4 bg-white border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded-sm hover:bg-gray-200 transition">
                            🔗 {translate("সোশ্যাল মিডিয়া", "Social media")}
                        </Button>
                    </div>
                </div>

                {/* Change Password Card */}
                <div className="w-full lg:w-[458px] border rounded-lg p-5 shadow-sm relative  dark:border dark:border-white">
                    <div className="flex justify-between items-start mb-5">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
                            {translate("পাসওয়ার্ড পরিবর্তন করুন", "Change Password")}
                        </h3>
                        <Button variant={'outline'} className="text-sm text-orange-500 flex items-center gap-1">
                            {translate("সাহায্য প্রয়োজন", "Need help")} <FiHelpCircle size={14} />
                        </Button>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Current Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1 dark:text-white">
                                {translate("বর্তমান পাসওয়ার্ড", "Current Password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrent ? "text" : "password"}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    value={oldPassword}
                                    placeholder={translate("পাসওয়ার্ড লিখুন", "Enter password")}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    className="absolute right-3 top-2.5 hover:cursor-pointer text-gray-500"
                                >
                                    {showCurrent ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <p className="text-xs text-orange-500 mt-1 underline cursor-pointer hover:text-orange-600 dark:text-white">
                                {translate("বর্তমান পাসওয়ার্ড ভুলে গেছেন? এখানে ক্লিক করুন", "Forgot Current Password? Click here")}
                            </p>
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1 dark:text-white">
                                {translate("নতুন পাসওয়ার্ড", "New Password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showNew ? "text" : "password"}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    value={newPassword}
                                    placeholder={translate("পাসওয়ার্ড লিখুন", "Enter password")}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNew(!showNew)}
                                    className="absolute right-3 top-2.5 hover:cursor-pointer text-gray-500"
                                >
                                    {showNew ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Re-enter Password */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 block mb-1 dark:text-white">
                                {translate("পাসওয়ার্ড পুনরায় লিখুন", "Re-enter Password")}
                            </label>
                            <div className="relative">
                                <input
                                    type={showReEnter ? "text" : "password"}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    placeholder={translate("পাসওয়ার্ড লিখুন", "Enter password")}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-orange-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowReEnter(!showReEnter)}
                                    className="absolute right-3 top-2.5 hover:cursor-pointer text-gray-500"
                                >
                                    {showReEnter ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-2">
                            <Button variant={'outline'}
                                type="submit"
                                className="w-full h-[50px] bg-[#EE5A2C] hover:bg-orange-600 text-white text-sm font-semibold rounded-md transition"
                            >
                                {
                                    updateUserLoading ? <ButtonLoader></ButtonLoader> : translate("পরিবর্তনগুলি সংরক্ষণ করুন", "Save Changes")
                                }
                                
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}