import Image from "next/image";
import product from '../../../../assets/Products_Image/products.jpg'

const products = [
  {
    id: 1,
    name: "6A 6 Gang 1 Way Switch",
    size: "large",
    color: "Multiple",
    price: 145,
    originalPrice: 145,
    imageUrl: product.src,
  },
  {
    id: 2,
    name: "Delicious Cake",
    size: "large",
    color: "Multiple",
    price: 145,
    originalPrice: 145,
    imageUrl: product.src,
  },
];

export default function OrderSummary() {
  return (
    <div className="w-full p-4 bg-white rounded-lg border border-gray-300 shadow-sm overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Order summary</h2>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Sub-Total</span>
          <span>127 Tk</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span>120 Tk</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span className="text-red-500 font-semibold">20%</span>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-red-600">220 Tk</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Payable on Delivery</span>
          <span>Tk. 4,019</span>
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between text-sm font-semibold">
        <span>Total Amount</span>
        <span>220 Tk</span>
      </div>

      <div className="flex items-center space-x-2 mt-2">
        <input type="checkbox" id="usePoints" className="accent-red-500" />
        <label htmlFor="usePoints" className="text-sm text-gray-600">
          Use my points (120 points)
        </label>
      </div>

      <div className="mt-4 space-y-4">
        {products.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 border-b border-gray-300 pb-3">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={60}
              height={60}
              className="rounded object-cover"
            />
            <div className="text-sm">
              <h4 className="font-semibold">{item.name}</h4>
              <p>
                <span className="text-gray-600">Size:</span> {item.size}
              </p>
              <p>
                <span className="text-gray-600">Color:</span> {item.color}
              </p>
              <p className="text-red-600 font-bold">
                {item.price} Tk{" "}
                <span className="line-through text-gray-400 font-normal">
                  {item.originalPrice} Tk
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-[#EE5A2C] text-white font-semibold py-2 rounded">
        Proceed To Pay
      </button>
    </div>
  );
}