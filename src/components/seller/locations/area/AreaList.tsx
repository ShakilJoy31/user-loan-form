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
import Table from "@/components/ui/table";
import { useAddAreaMutation, useDeleteAreaMutation, useGetAllAreasQuery, useUpdateAreaMutation } from "@/redux/features/seller-auth/sellerLogin";
import AddEditAreaList from "./AddEditAreaList";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface Area {
  id: number;
  name: string;
  cityId: number;
  cityName?: string; 
  city: {
    id: number;
    name: string;
  }
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

const AreaList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentArea, setCurrentArea] = useState<Area | null>(null);
  const [selectedRows, setSelectedRows] = useState<Area[]>([]);
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

  const { data, isLoading, isError, refetch } = useGetAllAreasQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createArea, { isLoading: addLoading, error: addError }] = 
    useAddAreaMutation();
  const [updateArea, { isLoading: editLoading, error: editError }] = 
    useUpdateAreaMutation();
  const [deleteArea, { isLoading: deleteLoading, error: deleteError }] = 
    useDeleteAreaMutation();

  const areas = data?.data || [];
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

  const handleRowSelect = (row: Area) => {
    setSelectedRows((prev) =>
      prev.some(selected => selected.id === row.id) 
        ? prev.filter(selected => selected.id !== row.id) 
        : [...prev, row]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === areas.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...areas]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const row of selectedRows) {
        await deleteArea(row.id).unwrap();
      }
      toast.success(translate("নির্বাচিত এলাকাগুলি সফলভাবে মুছে ফেলা হয়েছে", "Selected areas deleted successfully"));
      setSelectedRows([]);
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
        toast.error(apiError?.data?.message || "Error uploading image");
    }
  };

  const handleSaveArea = async (id: number | null, data: { cityId: number; name: string }) => {
    try {
      if (id) {
        await updateArea({ id, data }).unwrap();
        toast.success(translate("এলাকা সফলভাবে আপডেট করা হয়েছে", "Area updated successfully"));
      } else {
        await createArea(data).unwrap();
        toast.success(translate("এলাকা সফলভাবে তৈরি করা হয়েছে", "Area created successfully"));
      }
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error saving area:", error);
    }
  };

  const handleDeleteArea = async (id: number) => {
    try {
      await deleteArea(id).unwrap();
      toast.success(translate("এলাকা সফলভাবে মুছে ফেলা হয়েছে", "Area deleted successfully"));
      refetch();
    } catch (error) {
      console.error("Error deleting area:", error);
    }
  };

  const handleAddArea = () => {
    setCurrentArea(null);
    setModalOpen(true);
  };

  const handleEditArea = (area: Area) => {
    setCurrentArea(area);
    setModalOpen(true);
  };

  const renderRow = (row: Area, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
    
    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {dynamicIndex}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {`${row.city?.name}`}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {`${row.name}`}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => handleEditArea(row)}
            title={translate("সম্পাদনা করুন", "Edit")}
          >
            <FiEdit />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button 
                className="text-red-500 hover:text-red-700 cursor-pointer"
                title={translate("মুছুন", "Delete")}
              >
                <FiTrash2 />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate("আপনি কি সম্পূর্ণ নিশ্চিত?", "Are you absolutely sure?")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate("এটি এই এলাকাটি স্থায়ীভাবে মুছে ফেলবে।", "This will permanently delete this area.")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translate("বাতিল", "Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteArea(row.id)}
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
        <h1 className="text-2xl font-semibold">{translate("এলাকাসমূহ", "Areas")}</h1>
        <button
          className="flex items-center bg-[#EE5A2C] cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-800"
          onClick={handleAddArea}
        >
          <Plus className="mr-2" /> {translate("এলাকা যোগ করুন", "Add Area")}
        </button>
      </div>

      <div className="flex dark:bg-black dark:text-white justify-between items-center bg-white px-4 rounded-lg">
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
            className={`px-4 py-1.5 -mt-1 rounded border ${
              selectedRows.length > 0
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
          {translate("এলাকাগুলি আনতে ব্যর্থ হয়েছে", "Failed to fetch areas.")}
        </div>
      )}

      {!isLoading && !isError && (
        <Table<Area>
          headers={[
            translate("SL", "SL"), 
            translate("শহর", "City"), 
            translate("এলাকা", "Area"), 
            translate("ক্রিয়া", "Actions")
          ]}
          data={areas}
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

      <AddEditAreaList
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveArea}
        currentArea={currentArea}
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default AreaList;