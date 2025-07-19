"use client";
import { Button } from "@/components/ui/button";
import { FiSearch } from "react-icons/fi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface ReturnOrder {
  id: number;
  orderId: string;
  date: string;
  customer: string;
  reason: string;
  status: string;
  total: string;
}

const ReturnOrdersTab = () => {
  const { translate } = useCustomTranslator();

  const returnOrders: ReturnOrder[] = [
    {
      id: 1,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 2,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 3,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 4,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 5,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 6,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
    {
      id: 7,
      orderId: "#CUST001",
      date: "01-01-2025",
      customer: "Puja Saha",
      reason: "CC",
      status: "Pending",
      total: "240 Tk",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-[36px] font-semibold text-[#023337] mb-[48px]">
        {translate("রিটার্ন অর্ডার তালিকা", "Return Orders list")}
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold text-gray-700">
          {translate("সাম্প্রতিক কার্যক্রম", "Recent activities")}
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder={translate("অর্ডার আইডি দ্বারা অনুসন্ধান করুন", "Search by order id")}
            className="bg-[#F9FAFB] text-black rounded-md px-4 py-2 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead>
            <tr className="bg-[#FFF4EF] text-gray-700 font-medium">
              <th className="py-3 px-4">{translate("এসএল", "SL")}</th>
              <th className="py-3 px-4">{translate("অর্ডার আইডি", "Order ID")}</th>
              <th className="py-3 px-4">{translate("তারিখ", "Date")}</th>
              <th className="py-3 px-4">{translate("গ্রাহকের নাম", "Customer Name")}</th>
              <th className="py-3 px-4">{translate("কারণ", "Reason")}</th>
              <th className="py-3 px-4">{translate("স্ট্যাটাস", "Status")}</th>
              <th className="py-3 px-4">{translate("মোট", "Total")}</th>
            </tr>
          </thead>
          <tbody>
            {returnOrders.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{String(index + 1).padStart(2, "0")}</td>
                <td className="py-3 px-4 font-semibold text-gray-800">{item.orderId}</td>
                <td className="py-3 px-4 text-gray-600">{item.date}</td>
                <td className="py-3 px-4 text-gray-800">{item.customer}</td>
                <td className="py-3 px-4">{item.reason}</td>
                <td className="py-3 px-4 text-[#FBBD23] font-medium">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#FBBD23] rounded-full"></span>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#EE5A2C] font-semibold">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          {translate("পূর্ববর্তী", "Previous")}
        </Button>
        {[1, 2, 3].map((page) => (
          <Button variant={'outline'}
            key={page}
            className={`text-sm px-3 py-1 border rounded-md ${page === 1
                ? "bg-orange-500 text-white border-orange-500"
                : "border-gray-300 hover:bg-gray-100"
              }`}
          >
            {page}
          </Button>
        ))}
        <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
          {translate("পরবর্তী", "Next")}
        </Button>
      </div>
    </div>
  );
};

export default ReturnOrdersTab;