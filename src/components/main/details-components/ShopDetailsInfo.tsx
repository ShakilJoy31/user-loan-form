"use client"
import Image from "next/image";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ShopCard from "../home-components/ShopCard";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface ShopDetailsInfoProps {
    shopProfile: {
        id: number;
        name: string;
        email: string;
        contactNo: string;
        UserCompanyInfo: {
            id: number;
            userId: number;
            shopName: string;
            profileImage: string;
            bannerImage: string;
            slug: string;
            ownerName: string;
            designation: string;
            city: string;
            area: string;
            tradeLicense: string;
            map: string;
            about: string | null;
            createdAt: string;
            updatedAt: string;
            storeHours: string;
            deliveryAvailable: string
            pickupAvailable: string;
            products: string;
            homeAppliances: string;
            accessories: string
        };
    };
    relatedShop: {
        id: number;
        shopName: string;
        city: string;
        area: string;
        slug: string;
        profileImage: string | null;
        bannerImage: string | null;
        avatar: string;
        user: {
            UserShopCategory: {
                category: {
                    name: string;
                };
            }[];
        };
    }[];
}

const ShopDetailsInfo = ({shopProfile, relatedShop}: ShopDetailsInfoProps) => {
    const { translate } = useCustomTranslator();
console.log("shopProfile", shopProfile)

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
            <span className="text-gray-400">{shopProfile?.UserCompanyInfo?.slug}</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Email:</span>{" "}
            <span className="text-gray-400">{shopProfile?.email}</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">
              Delivery Available:
            </span>{" "}
            <span className="text-gray-400">{shopProfile?.UserCompanyInfo?.deliveryAvailable}</span>
          </div>
        </div>

        <div className="flex-1 space-y-3 sm:space-y-4 pr-6 lg:pr-0">
          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Phone Number:</span>{" "}
            <span className="text-gray-400">{shopProfile?.contactNo}</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">Store Hours:</span>{" "}
            <span className="text-gray-400">{shopProfile?.UserCompanyInfo?.storeHours}</span>
          </div>

          <div className="bg-white max-w-[298px] w-full max-h-[50px] rounded-lg py-3 sm:py-[14px] px-3 sm:px-[8px]">
            <span className="font-semibold text-[#EE5A2C]">
              Pickup Available:
            </span>{" "}
            <span className="text-gray-400">{shopProfile?.UserCompanyInfo?.pickupAvailable}</span>
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
              src={shopProfile?.UserCompanyInfo?.profileImage}
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
            translate("আমরা কি বিক্রি করছি", "About Us")
        }
      </h3>

      <p>{shopProfile?.UserCompanyInfo?.about}</p>

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
                {shopProfile?.UserCompanyInfo?.accessories}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1">
                {translate("হোম অ্যাপ্লায়েন্স:", "Home Appliances:")}
              </td>
              <td className="text-[#833218] py-1 pl-2 sm:pl-4">
                {shopProfile?.UserCompanyInfo?.homeAppliances}
              </td>
            </tr>
            <tr>
              <td className="font-semibold py-1">
                {translate("প্রোডাক্টস:", "Products:")}
              </td>
              <td className="text-gray-400 py-1 pl-2 sm:pl-4">
                {shopProfile?.UserCompanyInfo?.products}
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
         {relatedShop?.map((shop, index) => (
          <ShopCard
              key={index}
              shopName={shop.shopName}
              area={shop.area}
              city={shop.city}
              user={shop.user}
              profileImage={shop.profileImage}
              avatar={shop.avatar}
              slug={shop.slug}
              id={shop.id} bannerImage={null}    
          />
        ))}
     </div>

    </div>
  );
};

export default ShopDetailsInfo;