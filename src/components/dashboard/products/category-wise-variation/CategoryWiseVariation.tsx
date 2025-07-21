"use client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
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
import AddEditCategoryWiseVariation from "./AddEditCategoryWiseVariation";
import {
  useAddCategoryWiseVariationMutation,
  useDeleteCategoryWiseVariationMutation,
  useGetAllCategoryWiseVariationsQuery,
  useUpdateCategoryWiseVariationMutation
} from "@/redux/features/product/variationApi";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/ui/table";
import { useGetAllCategoryQuery } from "@/redux/features/product/categoryApi";
import { useGetAllVariationsQuery } from "@/redux/features/product/variationApi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { ApiError } from "@/types/apiError";

interface Variation {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface CategoryWiseVariation {
  id: number;
  categoryId: number;
  isRequired: boolean;
  variationIds: number[];
  category: Category;
  variations: Variation[];
  variation: {
    id: number;
    name: string;
  }
}

interface CategoryWiseVariationFormData {
  categoryId: number;
  isRequired: boolean;
  variationIds: number[];
}

const CategoryWiseVariation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedItem, setSelectedItem] = useState<CategoryWiseVariation | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<CategoryWiseVariation[]>([]);
  const { translate } = useCustomTranslator();
  const [pagination, setPagination] = useState({
    sort: "asc",
    page: 1,
    size: 10,
    meta: {
      page: null as number | null,
      size: null as number | null,
      total: null as number | null,
      totalPage: null as number | null,
    },
  });

  const { data, refetch, isLoading } = useGetAllCategoryWiseVariationsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const { data: categoriesData } = useGetAllCategoryQuery({ page: 1, size: 1000 });
  const { data: variationsData } = useGetAllVariationsQuery({ page: 1, size: 1000 });

  const [createCategoryWiseVariation, { isLoading: addLoading }] =
    useAddCategoryWiseVariationMutation();
  const [updateCategoryWiseVariation, { isLoading: editLoading }] =
    useUpdateCategoryWiseVariationMutation();
  const [deleteCategoryWiseVariation, { isLoading: deleteLoading }] =
    useDeleteCategoryWiseVariationMutation();

  const categoryWiseVariations = data?.data || [];
  const categories = categoriesData?.data || [];
  const variations = variationsData?.data || [];

  useEffect(() => {
    if (data?.meta) {
      setPagination((prev) => ({
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

  const handleAddItem = () => {
    setModalType("add");
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: CategoryWiseVariation) => {
    setModalType("edit");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteCategoryWiseVariation(id).unwrap();
      toast.success(translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য সফলভাবে মুছে ফেলা হয়েছে", "Category-wise variation deleted successfully"));
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || '');
    }
  };

  const handleSubmit = async (data: CategoryWiseVariationFormData) => {
    try {
      if (modalType === "add") {
        await createCategoryWiseVariation(data).unwrap();
        toast.success(translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য সফলভাবে যোগ করা হয়েছে", "Category-wise variation added successfully"));
      } else if (modalType === "edit" && selectedItem) {
        await updateCategoryWiseVariation({
          id: selectedItem.id,
          data,
        }).unwrap();
        toast.success(translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য সফলভাবে আপডেট করা হয়েছে", "Category-wise variation updated successfully"));
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
       const apiError = error as ApiError;
      toast.error(apiError?.data?.message || '');
    }
  };

  const handleRowSelect = (row: CategoryWiseVariation) => {
    setSelectedRows((prev) =>
      prev.some(selected => selected.id === row.id)
        ? prev.filter(selected => selected.id !== row.id)
        : [...prev, row]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === categoryWiseVariations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...categoryWiseVariations]);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedRows.map(row =>
        deleteCategoryWiseVariation(row.id).unwrap()
      ));
      toast.success(translate(`${selectedRows.length} টি ক্যাটাগরি অনুযায়ী বৈচিত্র্য সফলভাবে মুছে ফেলা হয়েছে`, `${selectedRows.length} category-wise variations deleted successfully`));
      setSelectedRows([]);
      refetch();
    } catch (error) {
       const apiError = error as ApiError;
      toast.error(apiError?.data?.message || '');
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }

  const headers = [
    translate("SL", "SL"),
    translate("ক্যাটাগরি", "Category"),
    translate("বৈচিত্র্য", "Variations"),
    translate("প্রয়োজনীয়", "Required"),
    translate("ক্রিয়া", "Actions")
  ];

  const renderRow = (row: CategoryWiseVariation, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;

    return (
      <>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white hover:dark:text-white">
          {dynamicIndex}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white hover:dark:text-white">
          {row.category?.name || translate("N/A", "N/A")}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white hover:dark:text-white">
          {(row.variation?.name)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-white hover:dark:text-white">
          {row.isRequired ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              {translate("প্রয়োজনীয়", "Required")}
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
              {translate("ঐচ্ছিক", "Optional")}
            </span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleEditItem(row)}
              className="text-blue-500 cursor-pointer hover:text-blue-700 p-1 rounded hover:bg-blue-50"
              title={translate("সম্পাদনা", "Edit")}
            >
              <FiEdit size={18} />
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  className="text-red-500 cursor-pointer hover:text-red-700 p-1 rounded hover:bg-red-50"
                  title={translate("মুছুন", "Delete")}
                >
                  <FiTrash2 size={18} />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {translate("আপনি কি সম্পূর্ণ নিশ্চিত?", "Are you absolutely sure?")}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {translate("এটি এই ক্যাটাগরি অনুযায়ী বৈচিত্র্যটি স্থায়ীভাবে মুছে ফেলবে।", "This will permanently delete this category-wise variation.")}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{translate("বাতিল", "Cancel")}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDeleteItem(row.id)}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {deleteLoading && <ButtonLoader />} {translate("নিশ্চিত করুন", "Confirm")}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </td>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">{translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য", "Category-wise Variations")}</h1>
        <button
          className="flex items-center cursor-pointer bg-[#EE5A2C] text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors"
          onClick={handleAddItem}
        >
          <Plus className="mr-2" /> {translate("ক্যাটাগরি অনুযায়ী বৈচিত্র্য যোগ করুন", "Add Category-wise Variation")}
        </button>
      </div>

      <div className="flex justify-between dark:bg-black dark:text-white items-center bg-white px-4 py-3 rounded-lg shadow-sm mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder={translate("খুঁজুন...", "Search...")}
            className="border rounded pl-10 pr-3 py-2 text-gray-700 w-60 focus:outline-none focus:ring-2 focus:ring-[#EE5A2C]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {selectedRows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors">
                <FiTrash2 className="mr-1" /> {translate("নির্বাচিত মুছুন", "Delete Selected")} ({selectedRows.length})
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {translate(`আপনি কি ${selectedRows.length} টি আইটেম মুছতে চান?`, `Are you sure you want to delete ${selectedRows.length} items?`)}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {translate("এই ক্রিয়াটি পূর্বাবস্থায় ফেরানো যাবে না। এটি নির্বাচিত ক্যাটাগরি অনুযায়ী বৈচিত্র্যগুলো স্থায়ীভাবে মুছে ফেলবে।", "This action cannot be undone. This will permanently delete the selected category-wise variations.")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{translate("বাতিল", "Cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBulkDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {deleteLoading && <ButtonLoader />} {translate("মুছুন নিশ্চিত করুন", "Confirm Delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <Table<CategoryWiseVariation>
        headers={headers}
        data={categoryWiseVariations}
        renderRow={renderRow}
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
      />

      <div className="mt-6">
        <Pagination
          totalPages={pagination.meta.totalPage || 1}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handleItemsPerPageChange}
        />
      </div>

      <AddEditCategoryWiseVariation
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedItem}
        loading={addLoading || editLoading}
        categories={categories}
        variations={variations}
      />
    </div>
  );
};

export default CategoryWiseVariation;