"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import { Plus } from "lucide-react";
import Table from "@/components/ui/table";
import { AlertCircle } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
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
import { useAddBlogCategoryMutation, useDeleteBlogCategoryMutation, useGetBlogCategoriesQuery, useUpdateBlogCategoryMutation } from "@/redux/features/blog/blogCategoryApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";
import Pagination from "@/components/common/Pagination";
import AddEditBlogCategoryModal from "./AddEditBlogCategoryModal";
import { Button } from "@/components/ui/button";

interface BlogCategory {
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

const CategoryList = () => {
    const [searchCategory, setSearchCategory] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<BlogCategory | undefined>(undefined);
    const [selectedRows, setSelectedRows] = useState<BlogCategory[]>([]);
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

    const { data, isLoading, isError, refetch } = useGetBlogCategoriesQuery({
        sort: pagination.sort,
        page: pagination.page,
        size: pagination.size,
        search: searchCategory,
    });

    const [addCategory, { isLoading: addLoading }] =
        useAddBlogCategoryMutation();
    const [updateCategory, { isLoading: editLoading }] =
        useUpdateBlogCategoryMutation();
    const [deleteCategory, { isLoading: deleteLoading, error: deleteError }] =
        useDeleteBlogCategoryMutation();

    const categories = data?.data || [];

    useEffect(() => {
        if (data) {
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

    const handleRowSelect = (category: BlogCategory) => {
        setSelectedRows((prev) =>
            prev.some((selectedCategory) => selectedCategory.id === category.id)
                ? prev.filter((selectedCategory) => selectedCategory.id !== category.id)
                : [...prev, category]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === categories.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows([...categories]);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            for (const category of selectedRows) {
                await deleteCategory(category.id).unwrap();
            }
            toast.success("Selected categories have been deleted successfully");
            setSelectedRows([]);
            refetch();
        } catch (err) {
            console.error(err)
            toast("Failed to delete selected categories");
        }
    };

    const handleSaveCategory = async (id: number | null, name: string) => {
        try {
            const result = id
                ? await updateCategory({ id, name }).unwrap()
                : await addCategory({ name }).unwrap();

            if (result.success) {
                console.log(result)
                setModalOpen(false);
                refetch();
            }
        } catch (err) {
            console.error("Error saving category:", err);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        try {
            await deleteCategory(id).unwrap();
            toast("Category deleted successfully");
            refetch();
        } catch (err) {
            console.error("Error deleting category:", err);
        }
    };

    const handleAddCategory = () => {
        setCurrentCategory(undefined);
        setModalOpen(true);
    };

    const handleEditCategory = (category: BlogCategory) => {
        setCurrentCategory(category);
        setModalOpen(true);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-6">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-semibold">Blog Categories</h1>
                <div className="flex items-center gap-2">
                    <Button variant={'outline'}
                        className="px-4 flex items-center py-1 bg-[#F53E32] text-white hover:text-white font-semibold rounded hover:bg-[#F53E32]/90 hover:cursor-pointer"
                        onClick={handleAddCategory}
                    >
                        <Plus className="font-bold w-4 h-4" /> Add Category
                    </Button>
                </div>
            </div>

            {/* Search and Delete Selected */}
            <div className="flex justify-between items-center bg-white px-4 rounded-lg">
                <div className="relative w-1/3 my-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border rounded pl-10 pr-3 py-1 text-gray-700 w-60"
                        value={searchCategory}
                        onChange={(e) => setSearchCategory(e.target.value)}
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
                        <FiTrash2 className="inline-block mr-1" /> Delete Selected
                    </button>
                </div>
            </div>

            {isLoading && <ButtonLoader></ButtonLoader>}
            {isError && (
                <div className="text-center py-6 text-red-500">
                    Failed to fetch categories.
                </div>
            )}

            {!isLoading && !isError && (
                <Table
                    headers={["SL", "Category", "Actions"]}
                    data={categories}
                    selectedRows={selectedRows}
                    onRowSelect={handleRowSelect}
                    onSelectAll={handleSelectAll}
                    renderRow={(row: BlogCategory, index: number) => {
                        const dynamicIndex =
                            index + 1 + (pagination.page - 1) * pagination.size;
                        return (
                            <>
                                <td className="px-4 py-2 font-medium">{dynamicIndex}</td>
                                <td className="px-4 py-2 font-medium">{row.name}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <button
                                        className="text-blue-600 hover:text-blue-800"
                                        onClick={() => handleEditCategory(row)}
                                    >
                                        <FiEdit />
                                    </button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <button className="bg-white text-red-600 px-4 py-2 rounded flex items-center gap-2 ml-2">
                                                <FiTrash2 />
                                            </button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Are you absolutely sure?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-[#F53E32] hover:bg-[#F53E32]"
                                                    onClick={() => handleDeleteCategory(row.id)}
                                                >
                                                    {deleteLoading && <ButtonLoader />} Confirm
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </td>
                            </>
                        );
                    }}
                />
            )}

            {deleteError && "data" in deleteError && (
                <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Delete Error</AlertTitle>
                    <AlertDescription>
                        {(deleteError.data as { message?: string })?.message ||
                            "Something went wrong!"}
                    </AlertDescription>
                </Alert>
            )}

            <div className="my-10">
                <div className="my-10">
                    <Pagination
                        totalPages={pagination.meta.totalPage || 1}
                        currentPage={pagination.page}
                        pageSize={pagination.size}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handleItemsPerPageChange}
                    />
                </div>
            </div>

            <AddEditBlogCategoryModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleSaveCategory}
                currentCategory={currentCategory}
                loading={addLoading || editLoading}
                // err={addError || editError}
            />
        </div>
    );
};

export default CategoryList;