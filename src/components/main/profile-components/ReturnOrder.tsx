"use client";
import { FiSearch } from "react-icons/fi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useState } from "react";
import Pagination from "@/components/common/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default to showing 5 items per page

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
      orderId: "#CUST002",
      date: "02-01-2025",
      customer: "Rahul Sharma",
      reason: "CC",
      status: "Pending",
      total: "320 Tk",
    },
    {
      id: 3,
      orderId: "#CUST003",
      date: "03-01-2025",
      customer: "Mita Roy",
      reason: "CC",
      status: "Pending",
      total: "180 Tk",
    },
    {
      id: 4,
      orderId: "#CUST004",
      date: "04-01-2025",
      customer: "Arjun Patel",
      reason: "CC",
      status: "Pending",
      total: "420 Tk",
    },
    {
      id: 5,
      orderId: "#CUST005",
      date: "05-01-2025",
      customer: "Neha Gupta",
      reason: "CC",
      status: "Pending",
      total: "210 Tk",
    },
    {
      id: 6,
      orderId: "#CUST006",
      date: "06-01-2025",
      customer: "Suresh Kumar",
      reason: "CC",
      status: "Pending",
      total: "350 Tk",
    },
    {
      id: 7,
      orderId: "#CUST007",
      date: "07-01-2025",
      customer: "Priya Singh",
      reason: "CC",
      status: "Pending",
      total: "290 Tk",
    },
  ];

  // Calculate paginated orders
  const totalPages = Math.ceil(returnOrders.length / pageSize);
  const indexOfLastOrder = currentPage * pageSize;
  const indexOfFirstOrder = indexOfLastOrder - pageSize;
  const currentOrders = returnOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="bg-white p-6 shadow-sm dark:bg-black dark:border border-gray-300 rounded-md dark:text-white">
      <h2 className="text-[36px] font-semibold text-[#023337] mb-[48px] dark:text-white">
        {translate("রিটার্ন অর্ডার তালিকা", "Return Orders list")}
      </h2>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold text-gray-700 dark:text-white">
          {translate("সাম্প্রতিক কার্যক্রম", "Recent activities")}
        </h3>
        <div className="relative">
          <FiSearch className="absolute left-3 top-2.5 text-gray-500" />
          <input
            type="text"
            placeholder={translate("অর্ডার আইডি দ্বারা অনুসন্ধান করুন", "Search by order id")}
            className="bg-[#F9FAFB] dark:bg-black dark:text-white dark:border dark:border-white text-black rounded-md px-4 py-2 text-sm pl-10 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-left">
          <thead>
            <tr className="bg-[#FFF4EF] text-gray-700 font-medium dark:bg-black dark:text-white">
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
            {currentOrders.map((item, index) => (
              <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50 dark:bg-black">
                <td className="py-3 px-4">
                  {String(index + 1 + (currentPage - 1) * pageSize).padStart(2, "0")}
                </td>
                <td className="py-3 px-4 font-semibold text-gray-800 dark:text-white">{item.orderId}</td>
                <td className="py-3 px-4 text-gray-600 dark:text-white">{item.date}</td>
                <td className="py-3 px-4 text-gray-800 dark:text-white">{item.customer}</td>
                <td className="py-3 px-4 dark:text-white">{item.reason}</td>
                <td className="py-3 px-4 text-[#FBBD23] font-medium ">
                  <span className="inline-flex items-center gap-1 ">
                    <span className="w-2 h-2 bg-[#FBBD23] rounded-full dark:text-white"></span>
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[#EE5A2C] font-semibold">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </div>
  );
};

export default ReturnOrdersTab;