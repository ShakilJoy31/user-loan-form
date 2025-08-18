"use client";
import { useState } from "react";
import zikaLogo from '@/assets/zika-images/jika-logo.jpg'


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
    <div className="loan-form">
      {/* Header */}
      <div className="bg-gray-700 text-white">
        <div className="flex justify-between ">
          <div className="flex gap-x-[10px] bg-yellow-500 h-16 px-4 rounded-r-full ">
            <img src={zikaLogo.src} alt="JICA Bank" className="logo" />
            <div>
              <h1>JICA BANK</h1>
              <p>BANGLADESH DEVELOPMENT</p>
            </div>
          </div>

          <div className="form-title pr-4 py-4">
            <h2 className="text-3xl text-yellow-700">Loan Application <span className="text-white">Form I</span></h2>
            <p>
              JICA, in accordance with the Development Cooperation Charter, will
              work on human security and quality growth
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex justify-between pl-4 py-4">
          <div className="flex flex-col gap-y-[7px]">
            <h1 className="text-yellow-700 text-xl ">Office Address: </h1>
            <p>
              <b>A:</b> 3rd Floor, Bay’s Galleria 57, Gulshan Avenue (CWS-A19),
              Dhaka
            </p>
            <p>
              <b>P:</b> (880-2) 22229-1897 &nbsp;&nbsp; <b>E:</b> info@jicaib.com
            </p>
          </div>

          <div className="h-15 bg-yellow-500 rounded-l-full w-36 "></div>
        </div>
      </div>

      {/* Profile */}
      <div className="profile-section px-6 py-6 mt-6 rounded-2xl shadow-sm bg-white">
        <div className="flex justify-between items-start gap-6 w-full">
          {/* Info Section */}
          <div className="flex-1">
            <div className="flex justify-between ">
              <div className="">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">ব্যক্তিগত তথ্য: </h3>
                <div className="h-1 bg-yellow-500 w-12 mb-4 rounded"></div>
              </div>
              <div className="w-40 flex-shrink-0 mt-[-90px] ">
                <label htmlFor="upload-image" className="cursor-pointer">
                  <img
                    src={
                      image ||
                      "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740"
                    }
                    alt="user"
                    className="w-40 h-40 object-cover rounded-lg border shadow-sm"
                  />
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm mt-[-320px] ">
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">গ্রাহক নাম:</p>
                <input
                  type="text"
                  defaultValue="মোঃ রফিকুল ইসলাম"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">লোন পরিমাণ:</p>
                <input
                  type="text"
                  defaultValue="১০,০০,০০০/- টাকা"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">ঠিকানা:</p>
                <input
                  type="text"
                  defaultValue="দরব কুড়শপুর"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">সুদের হার:</p>
                <input
                  type="text"
                  defaultValue="0.00%"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">জন্ম তারিখ:</p>
                <input
                  type="text"
                  defaultValue="০১/০৫/১৯৮২"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">লোন নম্বর:</p>
                <input
                  type="text"
                  defaultValue="HY7GL49EGNKA"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">জাতীয় পরিচয়পত্র নং:</p>
                <input
                  type="text"
                  defaultValue="৪৯৩৮৪৫০০০৪৮"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">লোন গ্রহণ তারিখ:</p>
                <input
                  type="text"
                  defaultValue="০১/০৫/২০২৫"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">লিঙ্গ:</p>
                <input
                  type="text"
                  defaultValue="পুরুষ"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">লোন শেষ তারিখ:</p>
                <input
                  type="text"
                  defaultValue="০১/০৫/২০৩০"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">পিতার নাম:</p>
                <input
                  type="text"
                  defaultValue="মোঃ ফায়েজ আলী"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">প্রতি কিস্তি:</p>
                <input
                  type="text"
                  defaultValue="২১,০০০/- টাকা"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>

              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">মাতার নাম:</p>
                <input
                  type="text"
                  defaultValue="মোছাঃ লতিকা খাতুন"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2">
                <p className="font-medium text-gray-700">মোবাইল নাম্বার:</p>
                <input
                  type="text"
                  defaultValue="০১৮১৯৪২৮৩২১"
                  className="w-full border-b border-gray-300 focus:border-yellow-500 focus:outline-none bg-transparent"
                />
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Message */}
      <div className="message px-4">
        <h3>প্রিয় স্যার / ম্যাডাম :</h3>
        <p>
          অভিনন্দন! আপনার লোন আবেদনটি সফলভাবে অনুমোদিত হয়েছে। অনুমোদিত অর্থ
          শীঘ্রই আপনার প্রদত্ত অ্যাকাউন্টে ক্রেডিট করা হবে। আমাদের সেবা গ্রহণ
          করার জন্য ধন্যবাদ।
        </p>
      </div>

      {/* Notes */}
      <div className="notes px-4">
        <h4>বিশেষ নির্দেশনা:</h4>
        <ul>
          <li>১.অন্যথা প্রতি মাসের কিস্তি প্রতি মাসে পরিশোধ করিতে হইবে</li>
          <li>২.আপনি বিকাশ, নগদ এর মাধ্যমে কিস্তি পরিশোধ করতে পারবেন</li>
          <li>
            ৩.আপনি ব্যাংক এর মাধ্যমে লোন এর টাকা উত্তোলন করতে পারবেন
          </li>
        </ul>
      </div>

      {/* Footer Signatures */}
      <div className="signatures px-4">
        <div>
          <p>___________________</p>
          <p>গ্রাহক স্বাক্ষর</p>
        </div>
        <div>
          <p>___________________</p>
          <p>ঋণ ব্যবস্থাপক স্বাক্ষর</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer py-2">
        <p>
          লোন আবেদন করার জন্য, ধন্যবাদ <br />
          লোন সম্পর্কিত কোনো প্রকার তথ্য জানার জন্য আমাদের সাথে যোগাযোগ করুন।
        </p>
      </div>

    </div>
  );
}
