"use client"
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
import AddEditVariationOptionList from "./AddEditVariationOptionList";
import { 
  useCreateVariationOptionMutation, 
  useDeleteVariationOptionMutation, 
  useGetAllVariationOptionsQuery, 
  useUpdateVariationOptionMutation 
} from "@/redux/features/product/variationApi";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";

interface VariationOption {
  id: number;
  name: string;  // Add this line
  value: string;
  variationId: number;
  variation: {
    name: string;
  };
}

interface VariationOptionFormData {
  name: string;
  variationId: number;
}

const VariationOptionList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit">("add");
  const [selectedOption, setSelectedOption] = useState<VariationOption | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [pagination, setPagination] = useState({
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

  const { data, refetch, isLoading } = useGetAllVariationOptionsQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [createVariationOption, { isLoading: addLoading }] = 
    useCreateVariationOptionMutation();
  const [updateVariationOption, { isLoading: editLoading }] = 
    useUpdateVariationOptionMutation();
  const [deleteVariationOption, { isLoading: deleteLoading }] = 
    useDeleteVariationOptionMutation();

  const variationOptions = data?.data || [];

  useEffect(() => {
    if (data) {
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
      toast.success("Variation Option deleted successfully");
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete variation option");
    }
  };

  const handleSubmit = async (data: VariationOptionFormData) => {
    try {
      if (modalType === "add") {
        await createVariationOption(data).unwrap();
        toast.success("Variation Option added successfully");
      } else if (modalType === "edit" && selectedOption) {
        await updateVariationOption({
          id: selectedOption.id,
          data,
        }).unwrap();
        toast.success("Variation Option updated successfully");
      }
      setIsModalOpen(false);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred while processing your request");
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
      setSelectedRows(variationOptions.map((row: { id: number }) => row.id));
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedRows.map(id => deleteVariationOption(id).unwrap()));
      toast.success(`${selectedRows.length} variation options deleted successfully`);
      setSelectedRows([]);
      refetch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete selected options");
    }
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-semibold">Variation Options</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={handleAddOption}
        >
          <Plus className="mr-2" /> Add Variation Option
        </button>
      </div>

      <div className="flex justify-between items-center bg-white px-4 py-3 rounded-lg shadow-sm mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded pl-10 pr-3 py-2 text-gray-700 w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        {selectedRows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="flex items-center px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition-colors">
                <FiTrash2 className="mr-1" /> Delete Selected ({selectedRows.length})
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete {selectedRows.length} items?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the selected variation options.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBulkDelete}
                  className="bg-red-500 hover:bg-red-600"
                >
                  {deleteLoading && <ButtonLoader />} Confirm Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {variationOptions.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === variationOptions.length && variationOptions.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variation
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {variationOptions.map((row: VariationOption, index: number) => {
                  const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
                  return (
                    <tr key={row.id} className={selectedRows.includes(row.id) ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dynamicIndex}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.value}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.variation?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditOption(row)}
                            className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50"
                            title="Edit"
                          >
                            <FiEdit size={18} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button 
                                className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"
                                title="Delete"
                              >
                                <FiTrash2 size={18} />
                              </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete this variation option.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteOption(row.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  {deleteLoading && <ButtonLoader />} Confirm
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-500 text-lg">No variation options found.</p>
          <button
            className="mt-4 flex items-center mx-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleAddOption}
          >
            <Plus className="mr-2" /> Add Your First Variation Option
          </button>
        </div>
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

      <AddEditVariationOptionList
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedOption}
        loading={addLoading || editLoading}
      />
    </div>
  );
};

export default VariationOptionList;