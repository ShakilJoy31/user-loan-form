// components/PaymentMethod.tsx
import Image from "next/image";

export default function PaymentMethod() {
  return (
    <div className="max-w-2xl w-full bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

      {/* Payment Options */}
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Please select the preferred payment method to use on this order.
        </p>
        <div className="space-y-3 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" defaultChecked className="accent-red-500" />
            Cash On Delivery
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" className="accent-red-500" />
            UPI
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" className="accent-red-500" />
            Bank Transfer
          </label>
        </div>
      </div>

      {/* Payment Icons */}
      <div className="border border-gray-200 rounded-md p-4 mb-6">
        <p className="text-sm font-semibold mb-3">Payment Method</p>
        <div className="flex flex-wrap items-center gap-4">
          {["visa", "mastercard", "paypal", "skrill", "maestro", "visaelectron"].map((method, idx) => (
            <Image
              key={idx}
              src={`/payments/${method}.png`} // Place these images inside /public/payments/
              alt={method}
              width={50}
              height={30}
              className="object-contain"
            />
          ))}
        </div>
      </div>

      {/* Discount Coupon */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-1 block">Discount Coupon :</label>
        <div className="flex items-center">
          <div className="flex items-center bg-gray-100 px-3 border border-gray-300 rounded-l">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2-2m0 0l2-2m-2 2l2 2m-2-2l-2 2M5 12l-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4l-2-2m-2-2a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Add promo code"
            className="w-full px-4 py-2 text-sm border-y border-r border-gray-300 focus:outline-none"
          />
          <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-r hover:bg-orange-600">
            Apply Code
          </button>
        </div>
      </div>

      {/* Note Section */}
      <div className="mb-6">
        <label className="text-sm font-medium mb-1 block">
          Note<span className="text-red-500">*</span>
        </label>
        <textarea
          placeholder="Write your note here"
          className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-400"
          rows={3}
        />
      </div>

      {/* Place Order Button */}
      <button className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600">
        Place Order
      </button>
    </div>
  );
}
