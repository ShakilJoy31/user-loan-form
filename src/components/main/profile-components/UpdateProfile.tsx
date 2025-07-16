'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiEdit, FiCalendar } from 'react-icons/fi';
import user from '@/assets/Products_Image/man.avif'

export default function UpdateProfile() {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">Edit Account Details</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700 flex gap-x-[8px] items-center border border-gray-300 rounded-md px-4 py-1">
                    <FiEdit size={20} />
                    Edit
                </button>
            </div>

            {/* Top Section - Image and Upload */}
            <div className="flex items-center gap-4 mb-6">
                <Image
                    src={user}
                    alt="House Wiring Cable"
                    className="w-14 h-14 rounded-full object-cover border border-gray-300"
                    width={60}
                    height={60}
                />
                <div className="flex gap-2">
                    <button className="bg-[#EE5A2C] w-[120px] h-[42px] text-white px-4 py-1 rounded-md text-sm font-semibold hover:bg-orange-600">
                        Upload New
                    </button>
                    <button className="bg-white border w-[120px] h-[42px] border-gray-300 text-gray-700 px-4 py-1 rounded-md text-sm hover:bg-gray-50">
                        Delete
                    </button>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            defaultValue="Wade"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            defaultValue="Warren"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            defaultValue="password123"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[36px] text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                        </button>
                    </div>

                    {/* Contact Number */}
                    <div className="relative">
                        <label className="block text-sm text-gray-700 mb-1">Contact Number</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type="text"
                                defaultValue="(406) 555–0120"
                                className="flex-1 outline-none text-sm"
                            />
                            <span className="ml-2">
                                <Image
                                    src={'https://flagcdn.com/w40/bd.png'}
                                    alt={''}
                                    width={60}
                                    height={60}
                                    className="w-5 h-5 rounded-sm"
                                />
                              
                            </span>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">E-mail</label>
                        <input
                            type="email"
                            defaultValue="wade.warren@example.com"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                        />
                    </div>

                    {/* DOB */}
                    <div className="relative">
                        <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
                        <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                            <input
                                type="text"
                                defaultValue="12- January- 1999"
                                className="flex-1 outline-none text-sm"
                            />
                            <FiCalendar className="ml-2 text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        defaultValue="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>

                {/* Blood Group */}
                <div>
                    <label className="block text-sm text-gray-700 mb-1">Blood Group</label>
                    <select
                        defaultValue="N/A"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-500"
                    >
                        <option>N/A</option>
                        <option>A+</option>
                        <option>B+</option>
                        <option>O+</option>
                        <option>AB+</option>
                    </select>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full block mx-auto lg:w-[385px] h-[60px] bg-[#EE5A2C] text-white font-semibold py-2 rounded-md hover:bg-orange-600 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
