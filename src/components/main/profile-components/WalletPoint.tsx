"use client";
import Image from "next/image";
import icons1 from "../../../assets/Icons/icons.png";
import { FiSearch } from "react-icons/fi";

const WalletPoint = () => {
  return (
    <div className="lg:mt-[45px] space-y-10">

      {/* Points Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className={`max-w-[333px] w-full max-h-[190px] rounded-[14px] ${i === 0 && 'bg-[#E6F9FF]'} ${i === 1 && 'bg-[#F8E6FB]'} ${i === 2 && 'bg-[#FEC0A7]'} p-5`}
          >
            <div className="mb-[12px]">
              <Image
                src={icons1}
                alt="icon"
                width={57}
                height={57}
                className="rounded-md border w-10 h-10 object-cover"
              />
            </div>
            <div className="flex justify-between items-center text-center mb-[12px]">
              <h2 className="font-semibold text-[18px]">Available Points</h2>
              <p className="font-bold text-[20px] text-[#EE5A2C]">200</p>
            </div>
            <hr className="border-gray-300 mt-[14px] mb-[8px]" />
            <p className="text-gray-400 text-[12px] font-normal">
              You can redeem 20 TK from your points
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-lg border shadow-sm pb-4">
        <div className="flex justify-between items-center pb-3 p-4">
          <h2 className="text-xl font-semibold">Recent activities</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a product"
              className="text-sm bg-[#F9FAFB] text-black rounded-md pl-10 pr-3 py-2 w-[220px] focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <FiSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left ">
            <thead className="bg-[#FDEFEA] text-[#0F172A] font-semibold">
              <tr>
                <th className="py-3 px-4">Order Id</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {[1, 2, 3, 4].map((_, i) => (
                <tr key={i} className="border-t border-[#808089] ">
                  <td className="py-3 px-4">#CUST001</td>
                  <td className="py-3 px-4">Magic Carpet</td>
                  <td className="py-3 px-4">01-01-2025</td>
                  <td className="py-3 px-4 font-bold text-[#EE5A2C]">-228 Tk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 text-gray-400 bg-gray-100 rounded-md" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-[#EE5A2C] text-white rounded-md">1</button>
            <button className="px-3 py-1 text-gray-700 bg-gray-100 rounded-md">2</button>
            <button className="px-3 py-1 text-gray-700 bg-gray-100 rounded-md">3</button>
            <button className="px-3 py-1 text-white bg-[#EE5A2C] rounded-md">Next</button>
          </nav>
        </div>
      </div>

      {/* Points Redemption Info */}
      <div className="bg-white border rounded-lg shadow-sm p-5 space-y-4">
        <h2 className="text-lg font-semibold">Points Redemption Information</h2>
        <div className="border rounded-lg p-4 space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <Image src={icons1} alt="icon" className="w-5 h-5" />
            <p>
              <span className="font-semibold">Conversion Rate:</span> 10 points ={" "}
              <span className="text-[#EE5A2C] font-bold">1 TK</span>
            </p>
          </div>
          <hr />
          <div className="flex items-center gap-3">
            <Image src={icons1} alt="icon" className="w-5 h-5" />
            <p>
              <span className="font-semibold">How to redeem:</span> Points can be redeemed during
              checkout or transferred to your account.
            </p>
          </div>
          <hr />
          <div className="flex items-center gap-3">
            <Image src={icons1} alt="icon" className="w-5 h-5" />
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
