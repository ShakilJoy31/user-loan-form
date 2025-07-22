"use client"
import { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import AddEditShippingMethodModal from "./AddEditShippingMethodModal";
import { 
  useCreateShippingMethodMutation, 
  useDeleteShippingMethodMutation, 
  useGetShippingMethodsQuery, 
  useUpdateShippingMethodMutation 
} from "@/redux/features/order/shippingMethodApi";
import toast from "react-hot-toast";
import DataLoader from "@/components/common/DataLoader";
import Table from "@/components/ui/table";
import ButtonLoader from "@/components/common/ButtonLoader";
import Pagination from "@/components/common/Pagination";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface ShippingMethod {
  id: number;
  name: string;
  price: number;
  isActive: boolean;
  shipped: "In_Dhaka" | "Out_Dhaka" | "Both";
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
}

interface PaginationMeta {
  page: number | null;
  size: number | null;
  total: number | null;
  totalPage: number | null;
}

const ShippingMethod = () => {
  const { translate } = useCustomTranslator();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(null);
  const [selectedRows, setSelectedRows] = useState<ShippingMethod[]>([]);
  const [pagination, setPagination] = useState({
    sort: "asc" as const,
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    } as PaginationMeta,
  });

  const { data, isLoading, isError, refetch } = useGetShippingMethodsQuery({
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createShippingMethod, { isLoading: isCreating }] = useCreateShippingMethodMutation();
  const [updateShippingMethod, { isLoading: isUpdating }] = useUpdateShippingMethodMutation();
  const [deleteShippingMethod, { isLoading: isDeleting }] = useDeleteShippingMethodMutation();

  const shippingMethods = data?.data || [];

  useEffect(() => {
    if (data) {
      setPagination(prev => ({
        ...prev,
        meta: {
          page: data.meta.page,
          size: data.meta.size,
          total: data.meta.total,
          totalPage: data.meta.totalPage,
        },
      }));
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setPagination(prev => ({ ...prev, size: itemsPerPage, page: 1 }));
  };

  const handleRowSelect = (method: ShippingMethod) => {
    setSelectedRows(prev =>
      prev.some(m => m.id === method.id)
        ? prev.filter(m => m.id !== method.id)
        : [...prev, method]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === shippingMethods.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...shippingMethods]);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(
        selectedRows.map(method => 
          deleteShippingMethod(method.id).unwrap()
        )
      );
      toast.success(translate(
        `${selectedRows.length}টি শিপিং মেথড সফলভাবে মুছে ফেলা হয়েছে`, 
        `${selectedRows.length} shipping methods deleted successfully`
      ));
      setSelectedRows([]);
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || translate(
        "একটি ত্রুটি ঘটেছে", 
        "An error occurred"
      ));
    }
  };

  const handleAddMethod = () => {
    setSelectedMethod(null);
    setIsModalOpen(true);
  };

  const handleEditMethod = (method: ShippingMethod) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

  const handleDeleteMethod = async (id: number) => {
    try {
      await deleteShippingMethod(id).unwrap();
      toast.success(translate(
        "শিপিং মেথড সফলভাবে মুছে ফেলা হয়েছে", 
        "Shipping method deleted successfully"
      ));
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || translate(
        "একটি ত্রুটি ঘটেছে", 
        "An error occurred"
      ));
    }
  };

  const handleSaveMethod = async (
    data: Omit<ShippingMethod, 'id'> & { id: number | null }
  ) => {
    try {
      if (data.id) {
        await updateShippingMethod({
          id: data.id,
          data: {
            name: data.name,
            price: data.price,
            isActive: data.isActive,
            shipped: data.shipped
          }
        }).unwrap();
        toast.success(translate(
          "শিপিং মেথড সফলভাবে আপডেট করা হয়েছে", 
          "Shipping method updated successfully"
        ));
      } else {
        await createShippingMethod({
          name: data.name,
          price: data.price,
          isActive: data.isActive,
          shipped: data.shipped
        }).unwrap();
        toast.success(translate(
          "শিপিং মেথড সফলভাবে যোগ করা হয়েছে", 
          "Shipping method added successfully"
        ));
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || translate(
        "একটি ত্রুটি ঘটেছে", 
        "An error occurred"
      ));
    }
  };

  const getShippedText = (shipped: string) => {
    switch (shipped) {
      case "In_Dhaka":
        return translate("ঢাকার ভিতরে", "Inside Dhaka");
      case "Out_Dhaka":
        return translate("ঢাকার বাইরে", "Outside Dhaka");
      case "Both":
        return translate("উভয়", "Both");
      default:
        return shipped;
    }
  };

  const headers = [
    translate("SL", "SL"),
    translate("শিপিং মেথড", "Shipping Method"),
    translate("এলাকা", "Coverage"),
    translate("স্ট্যাটাস", "Status"),
    translate("মূল্য", "Price"),
    translate("অ্যাকশন", "Actions")
  ];

  const renderRow = (row: ShippingMethod, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
    
    return (
      <>
        <td className="px-4 py-2 font-medium">{dynamicIndex}</td>
        <td className="px-4 py-2 font-medium ">{row.name}</td>
        <td className="px-4 py-2 font-medium ">{getShippedText(row.shipped)}</td>
        <td className="px-4 py-2 font-medium ">
          {row.isActive ? (
            <span className="text-green-600">{translate("সক্রিয়", "Active")}</span>
          ) : (
            <span className="text-red-600">{translate("নিষ্ক্রিয়", "Inactive")}</span>
          )}
        </td>
        <td className="px-4 py-2 font-medium">{row.price}</td>
        <td className="px-4 py-2 flex gap-2 ml-2 mt-2">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => handleEditMethod(row)}
            title={translate("সম্পাদনা", "Edit")}
          >
            <FiEdit />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button 
                className="text-red-600 hover:text-red-800 cursor-pointer"
                title={translate("মুছুন", "Delete")}
              >
                <FiTrash2 />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate("আপনি কি নিশ্চিত?", "Are you sure?")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate(
                    "এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।",
                    "This action cannot be undone."
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {translate("বাতিল", "Cancel")}
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleDeleteMethod(row.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {isDeleting && <ButtonLoader />}
                  {translate("নিশ্চিত করুন", "Confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </td>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">
          {translate("শিপিং মেথড", "Shipping Methods")}
        </h1>
        <button
          className="flex items-center cursor-pointer bg-[#EE5A2C] text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors"
          onClick={handleAddMethod}
        >
          <Plus className="mr-2" size={16} />
          {translate("শিপিং মেথড যোগ করুন", "Add Shipping Method")}
        </button>
      </div>

      <div className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-sm mb-4 dark:bg-gray-900">
        <div className="relative">
          <input
            type="text"
            placeholder={translate("খুঁজুন...", "Search...")}
            className="border rounded pl-10 pr-3 py-2 text-gray-700 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {selectedRows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors dark:hover:bg-red-900/20">
                <FiTrash2 className="mr-1" />
                {translate("নির্বাচিত মুছুন", "Delete Selected")} ({selectedRows.length})
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate(
                    `আপনি কি ${selectedRows.length}টি আইটেম মুছতে চান?`,
                    `Are you sure you want to delete ${selectedRows.length} items?`
                  )}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate(
                    "এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না।",
                    "This action cannot be undone."
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  {translate("বাতিল", "Cancel")}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBulkDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {isDeleting && <ButtonLoader />}
                  {translate("মুছুন নিশ্চিত করুন", "Confirm Delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {isLoading && <DataLoader />}
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
          <AlertDescription>
            {translate(
              "শিপিং মেথড লোড করতে ব্যর্থ হয়েছে",
              "Failed to load shipping methods"
            )}
          </AlertDescription>
        </Alert>
      )}

      {!isLoading && !isError && (
        <Table<ShippingMethod>
          headers={headers}
          data={shippingMethods}
          renderRow={renderRow}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />
      )}

      <div className="mt-6">
        <Pagination
          totalPages={pagination.meta.totalPage || 1}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handleItemsPerPageChange}
        />
      </div>

      <AddEditShippingMethodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMethod}
        currentMethod={selectedMethod}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default ShippingMethod;