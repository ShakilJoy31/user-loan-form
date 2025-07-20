"use client"
import {  ChevronDown } from "lucide-react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/ui/table";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import ViewSellerInfo from "./ViewSellerInfo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useGetAllSellerRequestsQuery, useUpdateSellerStatusMutation } from "@/redux/features/seller-auth/sellerLogin";

interface SellerRequest {
  id: number;
  name: string;
  contactNo: string;
  active: boolean;
  role: string;
  avatar: string;
  point: number;
  withdrawPoint: number;
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



const AllSellerReqList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SellerRequest | null>(null);
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

  const { data, isLoading, isError, refetch } = useGetAllSellerRequestsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [updateStatus, { isLoading: statusLoading }] = useUpdateSellerStatusMutation();

  const requests = data?.data || [];
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

  const handleUpdateStatus = async (status: string) => {
    if (!selectedRequest) return;
    
    try {
      await updateStatus({ id: selectedRequest.id, data: { status } }).unwrap();
      toast.success(
        status === "APPROVED" 
          ? translate("বিক্রেতা অনুমোদন করা হয়েছে", "Seller approved successfully")
          : translate("বিক্রেতা প্রত্যাখ্যান করা হয়েছে", "Seller rejected successfully")
      );
      refetch();
      setApproveModalOpen(false);
      setRejectModalOpen(false);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(translate("স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে", "Failed to update status"));
    }
  };

  const handleActionClick = (request: SellerRequest, action: string) => {
    setSelectedRequest(request);
    switch (action) {
      case "VIEW":
        setViewModalOpen(true);
        break;
      case "APPROVE":
        setApproveModalOpen(true);
        break;
      case "REJECT":
        setRejectModalOpen(true);
        break;
    }
  };

  const renderRow = (row: SellerRequest, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
    
    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {dynamicIndex}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.contactNo}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <span className={`px-2 py-1 rounded-full text-xs ${
            row.active 
              ? "bg-green-100 text-green-800" 
              : "bg-red-100 text-red-800"
          }`}>
            {row.active ? translate("সক্রিয়", "Active") : translate("নিষ্ক্রিয়", "Inactive")}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.point}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100">
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleActionClick(row, "VIEW")}>
                {translate("দেখুন", "View")}
              </DropdownMenuItem>
              {!row.active && (
                <>
                  <DropdownMenuItem onClick={() => handleActionClick(row, "APPROVE")}>
                    {translate("অনুমোদন", "Approve")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleActionClick(row, "REJECT")}>
                    {translate("প্রত্যাখ্যান", "Reject")}
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
        <h1 className="text-2xl font-semibold">{translate("বিক্রেতা অনুরোধের তালিকা", "Seller Request List")}</h1>
      </div>

      <div className="flex justify-between dark:bg-black dark:text-white items-center bg-white px-4 rounded-lg">
        <div className="relative w-1/3 my-4">
          <input
            type="text"
            placeholder={translate("খুঁজুন...", "Search...")}
            className="border rounded pl-10 pr-3 py-2 text-gray-700 w-60"
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
        <Table<SellerRequest>
          headers={[
            translate("SL", "SL"), 
            translate("নাম", "Name"), 
            translate("যোগাযোগ", "Contact"),
            translate("স্ট্যাটাস", "Status"),
            translate("পয়েন্ট", "Point"),
            translate("কার্যক্রম", "Actions")
          ]}
          data={requests}
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

      {/* Approve Confirmation Modal */}
      <AlertDialog open={approveModalOpen} onOpenChange={setApproveModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translate("বিক্রেতা অনুমোদন করুন", "Approve Seller")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {translate("আপনি কি এই বিক্রেতাকে অনুমোদন করতে চান?", "Are you sure you want to approve this seller?")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {translate("বাতিল", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleUpdateStatus("APPROVED")}
              className="bg-green-600 hover:bg-green-700"
            >
              {statusLoading ? <ButtonLoader /> : translate("অনুমোদন", "Approve")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Modal */}
      <AlertDialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {translate("বিক্রেতা প্রত্যাখ্যান করুন", "Reject Seller")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {translate("আপনি কি এই বিক্রেতাকে প্রত্যাখ্যান করতে চান?", "Are you sure you want to reject this seller?")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {translate("বাতিল", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleUpdateStatus("REJECTED")}
              className="bg-red-600 hover:bg-red-700"
            >
              {statusLoading ? <ButtonLoader /> : translate("প্রত্যাখ্যান", "Reject")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* View Seller Info Modal */}
      {selectedRequest && (
        <ViewSellerInfo 
          isOpen={viewModalOpen}
          onClose={() => setViewModalOpen(false)}
          seller={selectedRequest}
        />
      )}
    </div>
  );
};

export default AllSellerReqList;