"use client"
import Image from "next/image";
import ElectroHub from "@/assets/Home/ElectroHub.png";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ShopCard from "../home-components/ShopCard";
import shopLogo from '@/assets/Logo/shop-logo.png'
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const ShopDetailsInfo = () => {
    const { translate } = useCustomTranslator();
    const shops = Array(3).fill({
  name: "FashionFiesta",
  location: "Banani",
  categories: ["Clothing", "Accessories"],
  logoUrl: shopLogo.src,
});

  return (
    <div>
      <h2 className="text-3xl font-medium mb-3 sm:mb-[14px]">
        {
            translate("দোকানের তথ্য", "Shop Information")
        }
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6 text-[14px]">
        <div className="flex-1 space-y-3 sm:space-y-4 pr-6 lg:pr-0">
          <div className="bg-white max-w-[298px] w-full max-h-[50px]  rounded-lg py-3 sm:py-[14px] px-3 ">
            <span className="font-semibold text-[#EE5A2C]">Shop Type:</span>{" "}
            <span className="text-gray-400">Electronics & Gadgets Store</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Email:</span>{" "}
            <span className="text-gray-400">support@techzonebd.com</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">
              Delivery Available:
            </span>{" "}
            <span className="text-gray-400">All over Bangladesh</span>
          </div>
        </div>

        <div className="flex-1 space-y-3 sm:space-y-4 pr-6 lg:pr-0">
          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Phone Number:</span>{" "}
            <span className="text-gray-400">+880 1712 345678</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Store Hours:</span>{" "}
            <span className="text-gray-400">Sat-Thu, 10 AM – 9 PM</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">
              Pickup Available:
            </span>{" "}
            <span className="text-gray-400">In-store pickup</span>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      <div className="py-4 flex justify-between items-center gap-4 sm:gap-0  pr-6 pl-1">
        <div className="flex items-center gap-3">
          <h4 className="text-sm sm:text-[14px] font-normal">Brand:</h4>
          <div className="bg-white border border-gray-200">
            <Image
              width={56}
              height={56}
              src={ElectroHub}
              alt="ElectroHub"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h4 className="text-sm sm:text-[14px] font-normal">Share item:</h4>
          <div className="flex space-x-3 sm:space-x-4 items-center">
            <a
              href="#"
              className="bg-white text-[#EE5A2C] rounded-full hover:bg-gray-100 transition"
            >
              <FaFacebook size={20} />
            </a>
            <a href="#">
              <FaTwitter size={20} />
            </a>
            <a href="#">
              <FaInstagram size={20} />
            </a>
            <a href="#">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-4" />

      <h3 className="text-lg sm:text-xl font-medium mb-4  sm:px-2 md:px-0">
        {
            translate("আমরা কি বিক্রি করছি", "What are we selling")
        }
      </h3>

      <div className="overflow-x-auto  sm:px-2 md:px-0">
        <table className="min-w-full border-collapse">
          <tbody>
            <tr>
              <td className="font-semibold py-1">
                {translate("অ্যাকসেসরিজ:", "Accessories:")}
              </td>
              <td className="text-[#833218] py-1 pl-2 sm:pl-4">
                {translate("ক্যাবল, চার্জার, পাওয়ার ব্যাংক", "Cables, Chargers, Power Banks")}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1">
                {translate("হোম অ্যাপ্লায়েন্স:", "Home Appliances:")}
              </td>
              <td className="text-[#833218] py-1 pl-2 sm:pl-4">
                {translate("মাইক্রোওয়েভ, ব্লেন্ডার, ফ্যান","Microwave, Blender, Fan")}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1">
                {translate("প্রোডাক্টস:", "Products:")}
              </td>
              <td className="text-gray-400 py-1 pl-2 sm:pl-4">
                {translate(" স্মার্টফোন, ল্যাপটপ ও ট্যাবলেট, স্মার্টওয়াচ", "Smartphones, Laptops & Tablets, Smartwatches")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

        <hr className="border-gray-300 mt-16 mb-4" />
        <h2 className="text-3xl font-medium mb-3 sm:mb-[14px]">
        {translate("সম্পর্কিত দোকান", "Related Shop")}
      </h2>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pr-6">
         {shops.map((shop, index) => (
          <ShopCard
            key={index}
            name={shop.name}
            location={shop.location}
            categories={shop.categories}
            logoUrl={shop.logoUrl}
          />
        ))}
     </div>

    </div>
  );
};

export default ShopDetailsInfo;