"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiEdit, FiCalendar } from "react-icons/fi";
import userImage from '@/assets/Products_Image/man.avif';
import { Button } from '@/components/ui/button';
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";
import { useGetUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import DataLoader from "@/components/common/DataLoader";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";

export default function UpdateProfile() {
  const user = useSelector(selectUser);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    password: '********' // Placeholder, actual password won't be shown
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { translate } = useCustomTranslator();

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

  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();


  // Set form data when customerData is available
  useEffect(() => {
    if (customerData?.data) {
      const userData = customerData.data;
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        contactNo: userData.contactNo || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
        bloodGroup: userData.bloodGroup || 'N/A',
        password: '********'
      });
    }
  }, [customerData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Prepare the data to send (exclude password if it's the placeholder)
      const dataToSend = {
        ...formData,
        // Remove password if it's the placeholder
        password: formData.password === '********' ? undefined : formData.password
      };

      const response = await updateUser({
        id: user.id,
        data: dataToSend  // Changed from formData to dataToSend
      }).unwrap();

      if (response.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false); // Exit edit mode after successful update
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

  // Split name into first and last name
  const nameParts = formData.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const handleNameChange = (type: string, value: string) => {
    if (type === 'first') {
      // Trim the value to remove any leading/trailing spaces
      const trimmedValue = value.trim();
      setFormData(prev => ({
        ...prev,
        name: trimmedValue + (lastName ? ' ' + lastName : '')
      }));
    } else {
      // Trim the value to remove any leading/trailing spaces
      const trimmedValue = value.trim();
      setFormData(prev => ({
        ...prev,
        name: (firstName ? firstName + ' ' : '') + trimmedValue
      }));
    }
  };

  return (
    <div className="bg-white p-6 shadow-sm dark:bg-black dark:text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            {translate("অ্যাকাউন্ট বিবরণ সম্পাদনা করুন", "Edit Account Details")}
          </h2>
        </div>
        <Button
          variant={'outline'}
          className="text-gray-500 hover:text-gray-700 flex gap-x-[8px] items-center border border-gray-300 rounded-md px-4 py-1"
          onClick={() => setIsEditing(!isEditing)}
        >
          <FiEdit size={20} />
          {isEditing ? translate("বাতিল করুন", "Cancel") : translate("সম্পাদনা", "Edit")}
        </Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Image
          src={customerData?.data?.avatar || userImage}
          alt={translate("ব্যবহারকারীর ছবি", "user image")}
          className="w-14 h-14 rounded-full object-cover border border-gray-300"
          width={60}
          height={60}
        />
        {isEditing && (
          <div className="flex gap-2">
            <Button variant={'outline'} className="bg-[#EE5A2C] w-[120px] h-[42px] text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-orange-600">
              {translate("নতুন আপলোড", "Upload New")}
            </Button>
            <Button variant={'outline'} className="bg-white border w-[120px] h-[42px] border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-50">
              {translate("মুছে ফেলুন", "Delete")}
            </Button>
          </div>
        )}
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("প্রথম নাম", "First Name")}
            </label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => handleNameChange('first', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
              disabled={!isEditing}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("শেষ নাম", "Last Name")}
            </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => handleNameChange('last', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
              disabled={!isEditing}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("পাসওয়ার্ড", "Password")}
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm outline-none focus:ring-1 focus:ring-orange-500"
              disabled={!isEditing}
            />
            {isEditing && (
              <button
                type="button"
                className="absolute right-3 top-[36px] text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("যোগাযোগ নম্বর", "Contact Number")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleInputChange}
                className="flex-1 outline-none text-sm"
                disabled={!isEditing}
              />
              <span className="ml-2">
                <Image
                  src={'https://flagcdn.com/w40/bd.png'}
                  alt={translate("বাংলাদেশের পতাকা", "Bangladesh flag")}
                  width={60}
                  height={60}
                  className="w-5 h-5 rounded-sm"
                />
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("ইমেইল", "E-mail")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
              disabled={!isEditing}
            />
          </div>

          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1 dark:text-white">
              {translate("জন্ম তারিখ", "Date of Birth")}
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth || ''}
                onChange={handleInputChange}
                className="flex-1 outline-none text-sm"
                disabled={!isEditing}
              />
              <FiCalendar className="ml-2 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1 dark:text-white">
            {translate("ঠিকানা", "Address")}
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
            disabled={!isEditing}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1 dark:text-white">
            {translate("রক্তের গ্রুপ", "Blood Group")}
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
            disabled={!isEditing}
          >
            <option value="N/A">N/A</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
          </select>
        </div>

        {isEditing && (
          <div className="pt-2">
            <Button
              variant={'outline'}
              type="submit"
              className="w-full block mx-auto lg:w-[385px] h-[60px] bg-[#EE5A2C] text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
            >
              {
                updateUserLoading ? <ButtonLoader></ButtonLoader> : translate("পরিবর্তনগুলি সংরক্ষণ করুন", "Save Changes")
              }
              
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}