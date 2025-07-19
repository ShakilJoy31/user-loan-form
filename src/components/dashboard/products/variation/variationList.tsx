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
import { 
  useCreateVariationMutation,
  useDeleteVariationMutation, 
  useGetAllVariationsQuery, 
  useUpdateVariationMutation, 
} from "@/redux/features/product/variationApi";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import AddEditVariation from "./AddEditVariation";

interface Variation {
  id: number;
  name: string;
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

const VariationList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVariation, setCurrentVariation] = useState<Variation | null>(null);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
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

  const { data, isLoading, isError, refetch } = useGetAllVariationsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createVariation, { isLoading: addLoading, error: addError }] = 
    useCreateVariationMutation();
  const [updateVariation, { isLoading: editLoading, error: editError }] = 
    useUpdateVariationMutation();
  const [deleteVariation, { isLoading: deleteLoading, error: deleteError }] = 
    useDeleteVariationMutation();

  const variations = data?.data || [];
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

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === variations.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(variations.map((row: Variation) => row.id));
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const id of selectedRows) {
        await deleteVariation(id).unwrap();
      }
      toast.success("Selected variations deleted successfully");
      setSelectedRows([]);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete selected variations");
    }
  };

  const handleSaveVariation = async (id: number | null, name: string) => {
    try {
      if (id) {
        await updateVariation({ id, name }).unwrap();
        toast.success("Variation updated successfully");
      } else {
        await createVariation({ name }).unwrap();
        toast.success("Variation created successfully");
      }
      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error saving variation:", error);
    }
  };

  const handleDeleteVariation = async (id: number) => {
    try {
      await deleteVariation(id).unwrap();
      toast.success("Variation deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting variation:", error);
    }
  };

  const handleAddVariation = () => {
    setCurrentVariation(null);
    setModalOpen(true);
  };

  const handleEditVariation = (variation: Variation) => {
    setCurrentVariation(variation);
    setModalOpen(true);
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Variations</h1>
        <button
          className="flex items-center bg-[#EE5A2C] cursor-pointer text-white px-4 py-2 rounded hover:bg-orange-800"
          onClick={handleAddVariation}
        >
          <Plus className="mr-2" /> Add Variation
        </button>
      </div>

      <div className="flex justify-between items-center bg-white px-4 rounded-lg">
        <div className="relative w-1/3 my-4">
          <input
            type="text"
            placeholder="Search..."
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
            <FiTrash2 className="inline-block mr-1" /> Delete Selected
          </button>
        </div>
      </div>

      {isError && (
        <div className="text-center py-6 text-red-500">
          Failed to fetch variations.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === variations.length && variations.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variations.map((row: Variation, index: number) => {
                  const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
                  return (
                    <tr key={row.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dynamicIndex}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          onClick={() => handleEditVariation(row)}
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
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete this variation.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteVariation(row.id)}
                              >
                                {deleteLoading ? <ButtonLoader /> : "Confirm"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {(deleteError || addError || editError) && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {(deleteError as ApiError)?.data?.message ||
             (addError as ApiError)?.data?.message ||
             (editError as ApiError)?.data?.message ||
             "Something went wrong! Please try again."}
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

      <AddEditVariation
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveVariation}
        currentVariation={currentVariation}
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default VariationList;