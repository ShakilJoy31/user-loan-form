"use client";
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
import { useAddDiscountMutation, useDeleteDiscountMutation, useGetDiscountInfoAllQuery, useUpdateDiscountMutation } from "@/redux/features/order/discountApi";
import toast from "react-hot-toast";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import Pagination from "@/components/common/Pagination";
import AddEditDiscountModal from "./DiscountModal";

interface Discount {
  id: number;
  code: string;
  discountType: "FIXED" | "PERCENTAGE";
  discount: number;
  expireDate: string;
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

const Discount = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState<Discount | null>(null);
  const [selectedRows, setSelectedRows] = useState<Discount[]>([]);
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

  // API Calls
  const { data, isLoading, isError, refetch } = useGetDiscountInfoAllQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [addDiscount, { isLoading: addLoading, error: addError }] = useAddDiscountMutation();
  const [updateDiscount, { isLoading: editLoading, error: editError }] = useUpdateDiscountMutation();
  const [deleteDiscount, { isLoading: deleteLoading, error: deleteError }] = useDeleteDiscountMutation();

  // Discount List
  const discounts: Discount[] = data?.data || [];

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

  const handleSaveDiscount = async (
    id: number | null,
    code: string,
    discountType: "FIXED" | "PERCENTAGE",
    discount: number,
    expireDate: string
  ) => {
    try {
      if (id) {
        const result = await updateDiscount({
          id,
          data: { code, discountType, discount, expireDate }
        }).unwrap();

        if (result.success) {
          toast.success("Discount updated successfully");
          setModalOpen(false);
        }
      } else {
        const result = await addDiscount({ code, discountType, discount, expireDate }).unwrap();
        if (result.success) {
          toast.success("Discount added successfully");
          setModalOpen(false);
        }
      }
      refetch();
    } catch (err) {
      console.error("Error saving discount:", err);
      toast.error("Failed to save discount");
    }
  };

  const handleDeleteDiscount = async (id: number) => {
    try {
      await deleteDiscount(id).unwrap();
      toast.success("Discount deleted successfully");
      refetch();
    } catch (err) {
      console.error("Error deleting discount:", err);
      toast.error("Failed to delete discount");
    }
  };

  const handleAddDiscount = () => {
    setCurrentDiscount(null);
    setModalOpen(true);
  };

  const handleEditDiscount = (discount: Discount) => {
    setCurrentDiscount(discount);
    setModalOpen(true);
  };


    const renderRow = (row: Discount, index: number) => {
    const dynamicIndex = index + 1 + (pagination.page - 1) * pagination.size;
    return (
      <>
        <td className="px-4 py-2 font-medium">{dynamicIndex}</td>
        <td className="px-4 py-2 font-medium">{row.code}</td>
        <td className="px-4 py-2 font-medium">{row.discountType}</td>
        <td className="px-4 py-2 font-medium">{row.discount}</td>
        <td className="px-4 py-2 font-medium">{row.expireDate}</td>
        <td className="px-4 py-2 flex">
          <button
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
            onClick={() => handleEditDiscount(row)}
          >
            <FiEdit />
          </button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="bg-white text-red-600 px-4 py-2 rounded flex ml-2 cursor-pointer">
                <FiTrash2 />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="btn-destructive-fill">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteDiscount(row.id)}
                >
                  {deleteLoading && <ButtonLoader />} Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </td>
      </>
    );
  };

const handleRowSelect = (row: Discount) => {
  setSelectedRows((prev) =>
    prev.some(selected => selected.id === row.id)
      ? prev.filter(selected => selected.id !== row.id)
      : [...prev, row]
  );
};

// Update the handleSelectAll function
const handleSelectAll = () => {
  if (selectedRows.length === discounts.length) {
    setSelectedRows([]);
  } else {
    setSelectedRows([...discounts]);
  }
};

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-2xl font-semibold">Coupon List</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1 font-semibold rounded border text-[#EE5A2C] mr-2">
            Export
          </button>
          <button
            className="px-4 flex items-center py-1 bg-[#EE5A2C] text-white font-semibold rounded hover:bg-orange-800 cursor-pointer"
            onClick={handleAddDiscount}
          >
            <Plus className="font-bold w-4 h-4" /> Add Discount
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white px-4 rounded-lg">
        <div className="relative w-1/3 my-4">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded pl-10 pr-3 py-1 text-gray-700 w-60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Error State */}
      {isError && (
        <div className="text-center py-6 text-red-500">
          Failed to fetch discounts.
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <Table<Discount>
          headers={["SL", "Code", "Type", "Discount", "Expire Date", "Action"]}
          data={discounts}
          renderRow={renderRow}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          onSelectAll={handleSelectAll}
        />
      )}

      {deleteError && "data" in deleteError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {(deleteError.data as { message?: string })?.message ||
              "Something went wrong! Please try again."}
          </AlertDescription>
        </Alert>
      )}
      <div className="my-10">
        <Pagination
          totalPages={pagination.meta.totalPage || 1}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={handlePageChange}
          onPageSizeChange={handleItemsPerPageChange}
        />
      </div>

      {/* Add/Edit Modal */}
      <AddEditDiscountModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveDiscount}
        currentDiscount={currentDiscount || undefined}
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default Discount;