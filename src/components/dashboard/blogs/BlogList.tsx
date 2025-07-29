
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import Table from "@/components/ui/table";
import { FiSearch, FiTrash2 } from "react-icons/fi";



import { useDeletePostMutation, useGetAllPostsQuery } from "@/redux/features/blog/blogPostApi";
import toast from "react-hot-toast";
import { ApiError } from "@/types/apiError";
import DataLoader from "@/components/common/DataLoader";
import Link from "next/link";
import Pagination from "@/components/common/Pagination";
import DeleteModal from "./DeleteModal";
import ButtonLoader from "@/components/common/ButtonLoader";
// import BulkActions from "./BulkActions";
import BlogFormModal from "./BlogFormModal";
import { Button } from "@/components/ui/button";
import { Post } from "@/types/blogPost";

const headers = ["SL", "Title", "Author", "Status", "Created At", "Actions"];

const BlogPost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        sort: "asc",
        page: 1,
        size: 10,
        search: "",
        status: "",
        meta: {
            page: null,
            size: null,
            total: null,
            totalPage: null,
        },
    });
    const [selectedRows, setSelectedRows] = useState<Post[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemsToDelete, setItemsToDelete] = useState<number[]>([]);
    const [selectOption, setSelectOption] = useState<string | undefined>("");
    const [, setIsBulkModalOpen] = useState(false);

    console.log(selectedRows)

    const {
        data: postsData,
        isLoading,
        refetch,
    } = useGetAllPostsQuery({
        sort: pagination.sort,
        page: pagination.page,
        size: pagination.size,
        search: pagination.search,
        status: pagination.status,
    });

    const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

    useEffect(() => {
        if (postsData) {
            setPagination((prev) => ({
                ...prev,
                meta: {
                    page: postsData.meta.page,
                    size: postsData.meta.size,
                    total: postsData.meta.total,
                    totalPage: postsData.meta.totalPage,
                },
            }));
        }
    }, [postsData]);

    const handleRowSelect = (post: Post) => {
        setSelectedRows((prev) =>
            prev.some((selectedPost) => selectedPost.id === post.id)
                ? prev.filter((selectedPost) => selectedPost.id !== post.id)
                : [...prev, post]
        );
    };

    const handleSelectAll = () => {
        if (selectedRows.length === postsData?.data?.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(postsData?.data || []);
        }
    };

    const handleDeleteSelected = async () => {
        try {
            if (selectedRows.length === 0) {
                toast.error("Please select at least one item to delete.");
                return;
            }

            const deletePromises = selectedRows.map((post) =>
                deletePost(post.id).unwrap()
            );
            await Promise.all(deletePromises);

            toast.success("Selected blog posts have been deleted.");

            refetch();
            setSelectedRows([]);
        } catch (error) {
            const apiError = error as ApiError;
            toast.error(apiError?.data?.message || '');
        }
    };

    const openBulkModal = () => setIsBulkModalOpen(true);
    // const closeBulkModal = () => setIsBulkModalOpen(false);

    const openDeleteModal = (ids: number[]) => {
        setItemsToDelete(ids);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            const deletePromises = itemsToDelete.map((id) => deletePost(id).unwrap());
            await Promise.all(deletePromises);

            toast.success("Selected blog posts have been deleted.");

            refetch();
            setSelectedRows(
                selectedRows.filter((post) => !itemsToDelete.includes(post.id))
            );
            setIsDeleteModalOpen(false);
        } catch (error) {
            const apiError = error as ApiError;
            toast.error(apiError?.data?.message || '');
        }
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setItemsToDelete([]);
    };

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({ ...prev, page }));
    };

    const handleItemsPerPageChange = (size: number) => {
        setPagination((prev) => ({ ...prev, size, page: 1 }));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPagination((prev) => ({ ...prev, search: e.target.value, page: 1 }));
    };

    const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPagination((prev) => ({ ...prev, status: e.target.value, page: 1 }));
    };

    if (isLoading) {
        return <div className="flex justify-center mt-6"><DataLoader /></div>;
    }

    return (

        <div className="bg-gray-100 min-h-screen py-6">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-2xl font-semibold">Blog Posts</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/proyojon-admin-portal/blog/add-blog-post"}>
                        {" "}
                        <Button variant={'outline'} className="px-4 flex items-center py-1 bg-[#F53E32] text-white hover:text-white font-semibold rounded hover:bg-[#F53E32]/90 hover:cursor-pointer">
                            <Plus className="w-4 h-4 mr-1" />
                            Add Blog Post
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Filters and Search Section */}
            <div className="flex justify-between items-center bg-white px-4 rounded-t-lg">
                <div className="flex gap-4 items-center my-4">
                    <select
                        className="border rounded px-4 py-1.5 text-black w-36"
                        onChange={handleStatusFilter}
                        value={pagination.status}
                    >
                        <option value="">Filter</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="trash">Trash</option>
                    </select>

                    <select
                        className="border rounded px-4 py-1.5 text-black w-full"
                        onChange={(e) => setSelectOption(e.target.value)}
                        value={selectOption}
                    >
                        <option value="">Bulk Action</option>
                        <option value="StatusChange">Change Status</option>
                        <option value="AuthorChange">Change Author</option>
                    </select>

                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded pl-10 pr-3 py-1 text-gray-700 w-60"
                            value={pagination.search}
                            onChange={handleSearch}
                        />
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
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

                    {selectOption === "StatusChange" && (
                        <button
                            disabled={selectedRows.length === 0}
                            className={`px-4 py-1 rounded border ${selectedRows.length > 0
                                ? "text-black border-blue-500 hover:bg-blue-50"
                                : "text-gray-400 border-gray-300 cursor-not-allowed"
                                }`}
                            onClick={openBulkModal}
                        >
                            Change Status
                        </button>
                    )}

                    {selectOption === "AuthorChange" && (
                        <button
                            disabled={selectedRows.length === 0}
                            className={`px-4 py-1 rounded border ${selectedRows.length > 0
                                ? "text-black border-blue-500 hover:bg-blue-50"
                                : "text-gray-400 border-gray-300 cursor-not-allowed"
                                }`}
                            onClick={openBulkModal}
                        >
                            Change Author
                        </button>
                    )}
                </div>
            </div>

            <Table
                headers={headers}
                data={postsData?.data || []}
                selectedRows={selectedRows}
                onRowSelect={handleRowSelect}
                onSelectAll={handleSelectAll}
                renderRow={(post, index) => {
                    const dynamicIndex =
                        index + 1 + (pagination.page - 1) * pagination.size;
                    return (
                        <>
                            <td className="px-4 py-2">{dynamicIndex}</td>
                            <td className="px-4 py-2">
                                <span className="text-black font-medium">
                                    {post.title}
                                </span>
                            </td>
                            <td className="px-4 py-2">{post?.author || "N/A"}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${post.status === "Published"
                                        ? "bg-green-100 text-green-800"
                                        : post.status === "draft"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {post.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2 flex gap-2 items-center">
                                <Link href={`/proyojon-admin-portal/blog/edit-blog-post/${post.slug}`}>
                                    <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors rounded hover:bg-blue-50 hover:cursor-pointer">
                                        <Pencil className="w-5 h-5" />
                                    </button>
                                </Link>

                                <a
                                    href={`/blogs/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-emerald-600 hover:text-emerald-800 transition-colors rounded hover:bg-emerald-50 hover:cursor-pointer"
                                >
                                    <Eye className="w-5 h-5" />
                                </a>

                                <button
                                    className="p-2 text-red-600 hover:text-red-800 transition-colors rounded hover:bg-red-50 hover:cursor-pointer"
                                    onClick={() => openDeleteModal([post.id])}
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </td>
                        </>
                    );
                }}
            />

            <div className="my-10">
                <Pagination
                    totalPages={pagination.meta.totalPage || 1}
                    currentPage={pagination.page}
                    pageSize={pagination.size} 
                    onPageChange={handlePageChange}
                    onPageSizeChange={handleItemsPerPageChange}
                />
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                
            >
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                    <p>Are you sure you want to delete the selected items?</p>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={closeDeleteModal}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className={`px-4 py-2 ${deleteLoading
                                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                : "bg-red-500 text-white"
                                } rounded`}
                        >
                            {deleteLoading ? <ButtonLoader /> : "Delete"}
                        </button>
                    </div>
                </div>
            </DeleteModal>

            {/* Bulk Actions Modal */}
            {/* <Dialog open={isBulkModalOpen} onOpenChange={closeBulkModal}>
                <DialogContent>
                    <BulkActions
                        selectOption={selectOption}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                        refetch={refetch}
                        closeBulkModal={closeBulkModal}
                    />
                </DialogContent>
            </Dialog> */}

            {/* Add Blog Post Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="p-6 rounded-lg shadow-lg sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
                    <BlogFormModal
                        onSuccess={() => {
                            setIsModalOpen(false);
                            refetch();
                        }}
                    />
                </DialogContent>
            </Dialog>
        </div>

    );
};

export default BlogPost;