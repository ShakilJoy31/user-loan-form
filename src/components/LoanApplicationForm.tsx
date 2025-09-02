"use client";
import { useState } from "react";
import hsbcLogo from "@/assets/hsbc/logo-nobg.png";
import Image from "next/image";
import Link from "next/link";

export default function LoanApplicationForm() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="loan-form bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gray-700 text-white">
        <div className="flex justify-between">
          <div className="flex gap-x-[10px] bg-yellow-600 h-16 px-4 rounded-r-full items-center ">
            <Image
              src={hsbcLogo.src}
              width={80}
              height={40}
              alt="HSBC Bank"
              className="logo"
            />
            <div>
              <h1>HSBC Bank Bangladesh</h1>
            </div>
          </div>

          <div className="form-title pr-4 py-4">
            <h2 className="text-3xl text-yellow-500">
              Loan Application <span className="text-white">Form</span>
            </h2>
          </div>
        </div>

        {/* Address */}
        <div className="flex justify-end pl-4 py-4">
          <Link href="/id-link" className="cursor-pointer">
            <div className="h-15 bg-yellow-600 rounded-l-full w-36 items-center flex justify-center hover:bg-yellow-500">
              ID Link
            </div>
          </Link>
        </div>
      </div>
      <div className="flex justify-left mb-2 -mt-20 p-4">
        <div className="w-32 h-32 flex-shrink-0">
          <label htmlFor="upload-image" className="cursor-pointer">
            <div className="w-full h-full bg-white rounded-lg border-4 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:bg-gray-50">
              {image ? (
                <Image
                  src={image}
                  alt="user"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-xs">ছবি যুক্ত করুন</span>
              )}
            </div>
          </label>
          <input
            type="file"
            id="upload-image"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">ব্যক্তিগত তথ্য</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                গ্রাহক নাম
              </label>
              <input
                type="text"
                defaultValue="মোঃ রফিকুল ইসলাম"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                পিতার নাম
              </label>
              <input
                type="text"
                defaultValue="মোঃ ফায়েজ আলী"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                মাতার নাম
              </label>
              <input
                type="text"
                defaultValue="মোছাঃ লতিকা খাতুন"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                জন্ম তারিখ
              </label>
              <input
                type="text"
                defaultValue="০১/০৫/১৯৮২"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                লিঙ্গ
              </label>
              <input
                type="text"
                defaultValue="পুরুষ"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                জাতীয় পরিচয়পত্র নং
              </label>
              <input
                type="text"
                defaultValue="৪৯৩৮৪৫০০০৪৮"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ঠিকানা
              </label>
              <input
                type="text"
                defaultValue="দরব কুড়শপুর"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                মোবাইল নাম্বার
              </label>
              <input
                type="text"
                defaultValue="০১৮১৯৪২৮৩২১"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-gray-200">
            ঋণের বিবরণ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                লোন পরিমাণ
              </label>
              <input
                type="text"
                defaultValue="১০,০০,০০০/- টাকা"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                সুদের হার
              </label>
              <input
                type="text"
                defaultValue="0.00%"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                লোন নম্বর
              </label>
              <input
                type="text"
                defaultValue="HY7GL49EGNKA"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                লোন গ্রহণ তারিখ
              </label>
              <input
                type="text"
                defaultValue="০১/০৫/২০২৫"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                লোন শেষ তারিখ
              </label>
              <input
                type="text"
                defaultValue="০১/০৫/২০৩০"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                প্রতি কিস্তি
              </label>
              <input
                type="text"
                defaultValue="২১,০০০/- টাকা"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h3 className="text-lg font-semibold text-gray-800">
            প্রিয় স্যার / ম্যাডাম :
          </h3>
          <p className="mt-2 text-gray-600">
            অভিনন্দন! আপনার লোন আবেদনটি সফলভাবে অনুমোদিত হয়েছে। অনুমোদিত অর্থ
            শীঘ্রই আপনার প্রদত্ত অ্যাকাউন্টে ক্রেডিট করা হবে। আমাদের সেবা গ্রহণ
            করার জন্য ধন্যবাদ।
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h4 className="text-lg font-semibold text-gray-800">
            বিশেষ নির্দেশনা:
          </h4>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li>অন্যথা প্রতি মাসের কিস্তি প্রতি মাসে পরিশোধ করিতে হইবে</li>
            <li>আপনি বিকাশ, নগদ এর মাধ্যমে কিস্তি পরিশোধ করতে পারবেন</li>
            <li>আপনি ব্যাংক এর মাধ্যমে লোন এর টাকা উত্তোলন করতে পারবেন</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="flex justify-around">
            <div className="text-center">
              <p className="border-t-2 border-gray-400 w-48 pt-2">
                গ্রাহক স্বাক্ষর
              </p>
            </div>
            <div className="text-center">
              <p className="border-t-2 border-gray-400 w-48 pt-2">
                ঋণ ব্যবস্থাপক স্বাক্ষর
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            লোন আবেদন করার জন্য, ধন্যবাদ <br />
            লোন সম্পর্কিত কোনো প্রকার তথ্য জানার জন্য আমাদের সাথে যোগাযোগ করুন।
          </p>
        </div>
      </div>
    </div>
  );
}
