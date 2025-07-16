"use client";
import Image from "next/image";
import icons1 from "../../../assets/Icons/icons.png";
import { FiSearch } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const WalletPoint = () => {
  return (
    <div className="lg:mt-[45px] space-y-6 md:space-y-10 px-4 sm:px-0">

      {/* Points Cards - Updated responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[30px] justify-center">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`w-full h-full min-h-[160px] sm:min-h-[190px] rounded-[14px] ${
              i === 0 && 'bg-[#E6F9FF]'
            } ${
              i === 1 && 'bg-[#F8E6FB]'
            } ${
              i === 2 && 'bg-[#FEC0A7]'
            } p-4 sm:p-5 transition-all duration-300 hover:shadow-md`}
          >
            <div className="mb-3 sm:mb-[12px]">
              <Image
                src={icons1}
                alt="icon"
                width={40}
                height={40}
                className="rounded-md border w-8 h-8 sm:w-10 sm:h-10 object-cover"
              />
            </div>
            <div className="flex justify-between items-center mb-3 sm:mb-[12px]">
              <h2 className="font-semibold text-base sm:text-[18px]">Available Points</h2>
              <p className="font-bold text-lg sm:text-[20px] text-[#EE5A2C]">200</p>
            </div>
            <hr className="border-gray-300 mt-3 sm:mt-[14px] mb-2 sm:mb-[8px]" />
            <p className="text-gray-400 text-xs sm:text-[12px] font-normal">
              You can redeem 20 TK from your points
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border shadow-sm pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center pb-3 p-4 gap-4 sm:gap-0">
          <h2 className="text-lg sm:text-xl font-semibold">Recent activities</h2>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search for a product"
              className="text-sm bg-[#F9FAFB] text-black rounded-md pl-10 pr-3 py-2 w-full sm:w-[220px] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#FDEFEA] text-[#0F172A] font-semibold">
              <tr>
                <th className="py-3 px-2 sm:px-4">Order Id</th>
                <th className="py-3 px-2 sm:px-4">Name</th>
                <th className="py-3 px-2 sm:px-4">Date</th>
                <th className="py-3 px-2 sm:px-4">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[1, 2, 3, 4].map((_, i) => (
                <tr key={i} className="border-t border-[#808089]">
                  <td className="py-3 px-2 sm:px-4">#CUST001</td>
                  <td className="py-3 px-2 sm:px-4">Magic Carpet</td>
                  <td className="py-3 px-2 sm:px-4">01-01-2025</td>
                  <td className="py-3 px-2 sm:px-4 font-bold text-[#EE5A2C]">-228 Tk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <nav className="flex items-center space-x-2">
            <Button variant={'outline'} className="px-2 sm:px-3 py-1 text-gray-400 bg-gray-100 rounded-md" disabled>
              Previous
            </Button>
            <Button variant={'outline'} className="px-2 sm:px-3 py-1 bg-[#EE5A2C] text-white rounded-md">1</Button>
            <Button variant={'outline'} className="px-2 sm:px-3 py-1 text-gray-700 bg-gray-100 rounded-md">2</Button>
            <Button variant={'outline'} className="px-2 sm:px-3 py-1 text-gray-700 bg-gray-100 rounded-md">3</Button>
            <Button variant={'outline'} className="px-2 sm:px-3 py-1 text-white bg-[#EE5A2C] rounded-md">Next</Button>
          </nav>
        </div>
      </div>

      {/* Points Redemption Info */}
      <div className="bg-white border rounded-lg shadow-sm p-4 sm:p-5 space-y-4">
        <h2 className="text-lg font-semibold">Points Redemption Information</h2>
        <div className="border rounded-lg p-3 sm:p-4 space-y-4 text-sm">
          <div className="flex items-start sm:items-center gap-3">
            <Image src={icons1} alt="icon" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p>
              <span className="font-semibold">Conversion Rate:</span> 10 points ={" "}
              <span className="text-[#EE5A2C] font-bold">1 TK</span>
            </p>
          </div>
          <hr />
          <div className="flex items-start sm:items-center gap-3">
            <Image src={icons1} alt="icon" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p>
              <span className="font-semibold">How to redeem:</span> Points can be redeemed during
              checkout or transferred to your account.
            </p>
          </div>
          <hr />
          <div className="flex items-start sm:items-center gap-3">
            <Image src={icons1} alt="icon" width={20} height={20} className="w-4 h-4 sm:w-5 sm:h-5" />
            <p>
              <span className="font-semibold">Earn more points:</span> Make purchases, refer
              friends, or participate in promotions to earn additional points.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPoint;