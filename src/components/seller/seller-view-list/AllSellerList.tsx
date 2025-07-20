"use client"
import { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import DataLoader from "@/components/common/DataLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/ui/table";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import AllSellerInfoModal from "./AllSellerInfoModal";
import Image from "next/image";
import { useGetAllSellersQuery } from "@/redux/features/seller-auth/sellerLogin";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";

interface Seller {
  id: number;
  name: string;
  contactNo: string;
  active: boolean;
  role: string;
  avatar: string;
  point?: number; 
  withdrawPoint?: number;
}

interface PaginationMeta {
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

interface PaginationState {
  sort: string;
  page: number;
  size: number;
  meta: PaginationMeta;
}

const AllSellerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const { translate } = useCustomTranslator();
  const [pagination, setPagination] = useState<PaginationState>({
    sort: "desc",
    page: 1,
    size: 10,
    meta: {
      page: 0,
      size: 10,
      total: 0,
      totalPage: 1,
    },
  });

  const { data, isLoading, isError, refetch } = useGetAllSellersQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [updateUser] = useUpdateUserMutation();

  const sellers = data?.data || [];
  const meta = data?.meta || pagination.meta;

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setPagination((prev) => ({
      ...prev,
      size: itemsPerPage,
      page: 1,
    }));
  };

  const handleToggleStatus = async (seller: Seller) => {
    const newStatus = !seller.active;
    
    try {
      const response = await updateUser({ 
        id: seller.id, 
        data: { 
          active: newStatus // Send boolean value directly
        } 
      }).unwrap();
      
      if (response.success) {
        toast.success(
          newStatus 
            ? translate("বিক্রেতা সক্রিয় করা হয়েছে", "Seller activated successfully")
            : translate("বিক্রেতা নিষ্ক্রিয় করা হয়েছে", "Seller deactivated successfully")
        );
        refetch();
      } else {
        throw new Error(response.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(translate("স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে", "Field to update data"));
      refetch(); 
    }
  };

  const handleViewClick = (seller: Seller) => {
    setSelectedSeller(seller);
    setViewModalOpen(true);
  };

  const renderRow = (row: Seller, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
    
    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {dynamicIndex}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          <div className="flex items-center">
            <Image
              width={100}
              height={100}
              src={row?.avatar} 
              alt={row?.name} 
              className="h-10 w-10 rounded-full mr-3"
            />
            {row.name}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          {row.contactNo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={row.active}
                onChange={() => handleToggleStatus(row)}
              />
              <div className={`w-11 h-6 rounded-full peer ${row.active ? 'bg-green-500' : 'bg-gray-300'} peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 transition-colors duration-200`}>
                <div className={`absolute top-0.5 left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${row.active ? 'translate-x-5' : ''}`}></div>
              </div>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                row.active 
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
              }`}>
                {row.active ? translate("সক্রিয়", "Active") : translate("নিষ্ক্রিয়", "Inactive")}
              </span>
            </label>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
          <button 
            onClick={() => handleViewClick(row)}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FiEye className="h-5 w-5" />
          </button>
        </td>
      </>
    );
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">{translate("বিক্রেতা তালিকা", "Seller List")}</h1>
      </div>

      <div className="flex justify-between dark:bg-black dark:text-white items-center bg-white  px-4 rounded-lg">
        <div className="relative w-1/3 my-4">
          <input
            type="text"
            placeholder={translate("খুঁজুন...", "Search...")}
            className="border rounded pl-10 pr-3 py-2 text-gray-700 dark:text-white dark:bg-gray-800 dark:border-gray-700 w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {isError && (
        <div className="text-center py-6 text-red-500">
          {translate("বিক্রেতা তালিকা ফেট্চ করতে ব্যর্থ হয়েছে", "Failed to fetch seller list.")}
        </div>
      )}

      {!isLoading && !isError && (
        <Table<Seller>
          headers={[
            translate("SL", "SL"), 
            translate("নাম", "Name"), 
            translate("যোগাযোগ", "Contact"),
            translate("স্ট্যাটাস", "Status"),
            translate("দেখুন", "View")
          ]}
          data={sellers}
          renderRow={renderRow}
        />
      )}

      <div className="my-10">
        <Pagination
          totalPages={meta.totalPage || 1}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handleItemsPerPageChange}
        />
      </div>

      {selectedSeller && (
        <AllSellerInfoModal 
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          seller={selectedSeller}
        />
      )}
    </div>
  );
};

export default AllSellerList;