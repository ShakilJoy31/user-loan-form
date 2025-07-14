// app/components/DeliveryOptionsCard.tsx
import { FaMapMarkerAlt, FaTags, FaTruck } from "react-icons/fa";

export default function DeliveryOptionsCard() {
  return (
    <div>
        <h2 className="text-gray-700 font-semibold text-[15px]">Delivery options</h2>
        <div className="w-full bg-white border border-gray-300 rounded-xl p-5 space-y-4">
      

      {/* Row 1: Location + Change */}
      <div className="flex items-center justify-between text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-[#f15a29]" />
          <span>Uttara, Dhaka</span>
        </div>
        <button className="text-blue-600 font-semibold text-sm hover:underline">Change</button>
      </div>

      {/* Row 2: Standard Delivery */}
      <div className="flex items-center justify-between text-sm font-medium text-gray-700 border-t border-gray-300 pt-3">
        <div className="flex items-center gap-2">
          <FaTruck className="text-[#f15a29]" />
          <span>Standard delivery</span>
        </div>
        <span className="text-[#f15a29] font-bold">60 Tk</span>
      </div>

      {/* Row 3: Cash on Delivery */}
      <div className="flex items-center gap-2 border-t border-gray-300 pt-3 text-sm font-medium text-gray-700">
        <FaTags className="text-[#f15a29]" />
        <span>Cash on delivery</span>
      </div>
    </div>
    </div>
  );
}
