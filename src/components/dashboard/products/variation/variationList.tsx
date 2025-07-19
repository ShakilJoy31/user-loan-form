import Table from "@/components/ui/table";
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

interface VariationOption {
  id: number;
  value: string;
  variationId: number;
  variation: {
    name: string;
  };
}

interface VariationOptionFormData {
  value: string;
  variationId: number;
}

interface ApiError {
  data?: {
    message?: string;
  };
  status?: number;
  error?: string;
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

const VariationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedOption, setSelectedOption] = useState<VariationOption | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const { data, refetch, isLoading } = useGetAllVariationsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createVariationOption, { isLoading: addLoading, error: addError }] = 
    useCreateVariationMutation();
  const [updateVariationOption, { isLoading: editLoading, error: editError }] = 
    useUpdateVariationMutation();
  const [deleteVariationOption, { isLoading: deleteLoading, error: deleteError }] = 
    useDeleteVariationMutation();

  const variationOptions = data?.data || [];
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

  const handleAddOption = () => {
    setModalType("add");
    setSelectedOption(null);
    setIsModalOpen(true);
  };

  const handleEditOption = (option: VariationOption) => {
    setModalType("edit");
    setSelectedOption(option);
    setIsModalOpen(true);
  };

  const handleDeleteOption = async (id: number) => {
    try {
      await deleteVariationOption(id).unwrap();
      toast.success("Variation list deleted successfully");
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "Failed to delete Variation list");
    }
  };

  const handleSubmit = async (data: VariationOptionFormData) => {
    try {
      if (modalType === "add") {
        await createVariationOption(data).unwrap();
        toast.success("Variation list added successfully");
      } else if (modalType === "edit" && selectedOption) {
        await updateVariationOption({
          id: selectedOption.id,
          data,
        }).unwrap();
        toast.success("Variation list updated successfully");
      }
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError?.data?.message || "An error occurred while processing your request");
    }
  };

  const handleRowSelect = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRows.length === variationOptions.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(variationOptions.map((row: { id: number; }) => row.id));
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Variation List</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleAddOption}
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
        {selectedRows.length > 0 && (
          <button
            onClick={() => {
              selectedRows.forEach(handleDeleteOption);
              setSelectedRows([]);
            }}
            className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50"
          >
            <FiTrash2 className="inline-block mr-1" /> Delete Selected
          </button>
        )}
      </div>

      {variationOptions.length > 0 ? (
        <Table
          headers={["SL", "Value", "Variation", "Action"]}
          data={variationOptions}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
          renderRow={(row: VariationOption, index: number) => {
            const dynamicIndex =
              index + 1 + (pagination.page - 1) * pagination.size;
            return (
              <>
                <td className="px-4 py-2 font-medium">{dynamicIndex}</td>
                <td className="px-4 py-2">{row.value}</td>
                <td className="px-4 py-2">{row.variation?.name}</td>
                <td className="px-4 py-2 flex gap-2 justify-center">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditOption(row)}
                  >
                    <FiEdit />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-500 hover:text-red-700">
                        <FiTrash2 />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this Variation list.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteOption(row.id)}
                        >
                          {deleteLoading ? <ButtonLoader /> : "Confirm"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </>
            );
          }}
        />
      ) : (
        <p className="text-center text-gray-500 py-6">
          No Variation lists found.
        </p>
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
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedOption}
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default VariationList;