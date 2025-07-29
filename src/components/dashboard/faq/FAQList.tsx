"use client"
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import AddEditFAQModal from "./AddEditFAQModal";
import Table from "@/components/ui/table";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { useCreateFaqMutation, useDeleteFaqMutation, useGetAllFaqsQuery, useUpdateFaqMutation } from "@/redux/features/faq/faqApi";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  isActive: boolean;
}

interface PaginationMeta {
  page: number | null;
  size: number | null;
  total: number | null;
  totalPage: number | null;
}

interface PaginationState {
  sort: string;
  page: number;
  size: number;
  meta: PaginationMeta;
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
  error?: string;
}

const FAQList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<FAQ | null>(null);
  const [selectedRows, setSelectedRows] = useState<FAQ[]>([]);
  const { translate } = useCustomTranslator();
  const [pagination, setPagination] = useState<PaginationState>({
    sort: "asc",
    page: 1,
    size: 10,
    meta: {
      page: null,
      size: null,
      total: null,
      totalPage: null,
    },
  });

  const { data, isLoading, isError, refetch } = useGetAllFaqsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createFAQ, { isLoading: addLoading, error: addError }] =
    useCreateFaqMutation();
  const [updateFAQ, { isLoading: editLoading, error: editError }] =
    useUpdateFaqMutation();
  const [deleteFAQ, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteFaqMutation();

  const faqs = Array.isArray(data) ? data : [];
  console.log("faqs", faqs)
  const meta = data?.meta || pagination.meta;

  useEffect(() => {
    if (data?.meta) {
      setPagination((prev) => ({
        ...prev,
        meta: data.meta,
      }));
    }
  }, [data]);

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

  const handleRowSelect = (row: FAQ) => {
    setSelectedRows((prev) =>
      prev.some(selected => selected.id === row.id)
        ? prev.filter(selected => selected.id !== row.id)
        : [...prev, row]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === faqs.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...faqs]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const row of selectedRows) {
        await deleteFAQ(row.id).unwrap();
      }
      toast.success(translate("নির্বাচিত FAQ গুলো সফলভাবে মুছে ফেলা হয়েছে", "Selected FAQs deleted successfully"));
      setSelectedRows([]);
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || '');
    }
  };

  const handleSaveFAQ = async (id: number | null, data: { question: string; answer: string; isActive: boolean }) => {
    try {
      if (id) {
        await updateFAQ({ id, data }).unwrap();
        toast.success(translate("FAQ সফলভাবে আপডেট করা হয়েছে", "FAQ updated successfully"));
      } else {
        await createFAQ(data).unwrap();
        toast.success(translate("FAQ সফলভাবে তৈরি করা হয়েছে", "FAQ created successfully"));
      }
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  console.log("faq",data)

  const handleDeleteFAQ = async (id: number) => {
    try {
      await deleteFAQ(id).unwrap();
      toast.success(translate("FAQ সফলভাবে মুছে ফেলা হয়েছে", "FAQ deleted successfully"));
      refetch();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const handleAddFAQ = () => {
    setCurrentFAQ(null);
    setModalOpen(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setCurrentFAQ(faq);
    setModalOpen(true);
  };

  const toggleFAQStatus = async (faq: FAQ) => {
    try {
      await updateFAQ({ 
        id: faq.id, 
        data: { 
          question: faq.question, 
          answer: faq.answer, 
          isActive: !faq.isActive 
        } 
      }).unwrap();
      toast.success(translate("স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে", "Status updated successfully"));
      refetch();
    } catch (error) {
      console.error("Error toggling FAQ status:", error);
    }
  };

  const renderRow = (row: FAQ, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;

    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
          {dynamicIndex}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 dark:text-white">
          {row.question}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500 dark:text-white max-w-xs truncate">
          {row.answer}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white">
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={row.isActive} 
              onChange={() => toggleFAQStatus(row)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#EE5A2C]"></div>
          </label>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2 dark:text-white">
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleEditFAQ(row)}
          >
            <FiEdit />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-500 hover:text-red-700 cursor-pointer">
                <FiTrash2 />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate("আপনি কি সম্পূর্ণ নিশ্চিত?", "Are you absolutely sure?")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate("এটি এই FAQ টি স্থায়ীভাবে মুছে ফেলবে।", "This will permanently delete this FAQ.")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translate("বাতিল", "Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteFAQ(row.id)}
                >
                  {deleteLoading ? <ButtonLoader /> : translate("নিশ্চিত করুন", "Confirm")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
        <h1 className="text-2xl font-semibold">{translate("FAQ", "FAQs")}</h1>
        <button
          className="flex items-center bg-[#EE5A2C] cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-800"
          onClick={handleAddFAQ}
        >
          <Plus className="mr-2" /> {translate("FAQ যোগ করুন", "Add FAQ")}
        </button>
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
        <div className="space-x-2 py-5">
          <button
            onClick={handleDeleteSelected}
            disabled={selectedRows.length === 0}
            className={`px-4 py-1.5 -mt-1 rounded border ${selectedRows.length > 0
                ? "text-red-500 border-red-500 hover:bg-red-50"
                : "text-gray-400 border-gray-300 cursor-not-allowed"
              }`}
          >
            <FiTrash2 className="inline-block mr-1" /> {translate("নির্বাচিত মুছুন", "Delete Selected")}
          </button>
        </div>
      </div>

      {isError && (
        <div className="text-center py-6 text-red-500">
          {translate("FAQ গুলো ফেট্চ করতে ব্যর্থ হয়েছে", "Failed to fetch FAQs.")}
        </div>
      )}

      {!isLoading && !isError && (
        <Table<FAQ>
          headers={[
            translate("SL", "SL"), 
            translate("প্রশ্ন", "Question"), 
            translate("উত্তর", "Answer"), 
            translate("স্ট্যাটাস", "Status"), 
            translate("কার্যক্রম", "Actions")
          ]}
          data={faqs}
          renderRow={renderRow}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />
      )}

      {(deleteError || addError || editError) && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
          <AlertDescription>
            {(deleteError as ApiError)?.data?.message ||
              (addError as ApiError)?.data?.message ||
              (editError as ApiError)?.data?.message ||
              translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again.")}
          </AlertDescription>
        </Alert>
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

      <AddEditFAQModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveFAQ}
        currentFAQ={currentFAQ}
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default FAQList;