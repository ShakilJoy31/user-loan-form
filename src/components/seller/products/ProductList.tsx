"use client";

import { Eye, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/redux/store";
import DataLoader from "@/components/common/DataLoader";
import Pagination from "@/components/common/Pagination";
import { useState, useEffect } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "@/redux/features/seller-api/productApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";
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
import { useRouter } from "next/navigation";
import { highlightMatches } from "@/utils/helper/highlightMatches";
import { ProductResponse } from "@/types/seller/productInterface";
import { useGetSellerUserByIdQuery } from "@/redux/features/seller-auth/sellerLogin";
import { loadUserFromToken } from "@/utils/helper/loadUserFromToken";

const ProductsList = () => {
       const user = useSelector(selectUser);
    const [isUserLoaded, setIsUserLoaded] = useState(false);
    const dispatch = useDispatch();

    // Load user on initial render if not already loaded
    useEffect(() => {
        if (!user.id) {
            loadUserFromToken(dispatch).then(() => {
                setIsUserLoaded(true);
            });
        } else {
            setIsUserLoaded(true);
        }
    }, [dispatch, user.id]);

    const { data: sellerUser, isLoading: sellerUserLoading } = useGetSellerUserByIdQuery(
        user?.id,
        { skip: !user.id || !isUserLoaded } // Skip if no user ID or user not loaded
    );


    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("asc");
    const [typeFilter, setTypeFilter] = useState<string>("Published");
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const router = useRouter();

    const { data: productsResponse, isLoading: productsLoading } = useGetAllProductsQuery({
        page,
        size,
        search: debouncedSearchTerm,
        sort: sortOrder,
        type: typeFilter
    });

    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    // Debounce search term
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setPage(1); // Reset to first page when search term changes
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked && productsResponse?.data) {
            const allProductIds = productsResponse.data.map((product: ProductResponse) => product.id);
            setSelectedProducts(allProductIds);
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId: number) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handlePageSizeChange = (newSize: number) => {
        setSize(newSize);
        setPage(1);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value);
        setPage(1);
    };

    const handleTypeFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(e.target.value);
        setPage(1);
    };

    const handleDeleteProduct = async () => {
        if (!productToDelete) return;

        try {
            const result = await deleteProduct(productToDelete);
            if ('data' in result && result.data?.success) {
                toast.success(result.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error("Failed to delete product");
        } finally {
            setProductToDelete(null);
        }
    }

    if (!isUserLoaded || sellerUserLoading) {
        return <div className="flex justify-center"><DataLoader /></div>;
    }

    if (!user.id) {
        return <div className="flex justify-center">Please login to access this page</div>;
    }

    if (!sellerUser?.data?.active) {
        if (sellerUserLoading) {
            return <div className="flex justify-center">{<DataLoader></DataLoader>}</div>
        } else {
            return <div className="flex justify-center">This seller is not active yet.</div>
        }
    }

    return (
        <div className="relative bg-white p-6 border rounded-md shadow-sm mt-[15px]">
            <div className="flex justify-between items-center my-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Products List
                </h2>

                <div className="flex items-center justify-end gap-3 mt-6">
                    <button onClick={() => router.push('/add-product')}
                        type="submit"
                        className="bg-[#F4552F] hover:cursor-pointer hover:bg-[#e34724] text-white text-sm font-medium px-4 py-2 rounded-md"
                    >
                        + Add Product
                    </button>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="search" className="sr-only">Search</label>
                    <input
                        type="text"
                        id="search"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F4552F] focus:ring-[#F4552F] sm:text-sm p-2 border"
                    />
                </div>
                <div>
                    <label htmlFor="sort" className="sr-only">Sort Order</label>
                    <select
                        id="sort"
                        value={sortOrder}
                        onChange={handleSortChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F4552F] focus:ring-[#F4552F] sm:text-sm p-2 border"
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="type" className="sr-only">Type Filter</label>
                    <select
                        id="type"
                        value={typeFilter}
                        onChange={handleTypeFilterChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#F4552F] focus:ring-[#F4552F] sm:text-sm p-2 border"
                    >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#FDEFEA]">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.length === productsResponse?.data?.length && productsResponse?.data?.length > 0}
                                    onChange={handleSelectAll}
                                    className="h-4 w-4 text-[#F4552F] focus:ring-[#F4552F] border-gray-300 rounded"
                                />
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                SL
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brand
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {productsResponse?.data?.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            productsResponse?.data?.map((product: ProductResponse, index: number) => {
                                const firstItem = product.ProductItem?.[0];
                                const price = firstItem?.price || 'N/A';
                                const stock = firstItem?.stock || 'N/A';

                                return (
                                    <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={selectedProducts.includes(product.id)}
                                                onChange={() => handleSelectProduct(product.id)}
                                                className="h-4 w-4 text-[#F4552F] focus:ring-[#F4552F] border-gray-300 rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {(page - 1) * size + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {product.ProductImage?.[0]?.imageUrl && (
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-md" src={product.ProductImage[0].imageUrl} alt={product.productName} />
                                                    </div>
                                                )}
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{highlightMatches(product.productName, searchTerm)}</div>
                                                    <div className="text-sm text-gray-500">{product.productLink}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.category?.name || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.brand?.brand || 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {stock}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.type === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {product.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex space-x-2">
                                                <button onClick={() => router.push(`/products/${product?.productLink}`)} className="text-blue-600 hover:cursor-pointer hover:text-blue-900">
                                                    <Eye size={18} />
                                                </button>

                                                <button onClick={() => router.push(`/products-list/edit-product/${product.productLink}`)} className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">
                                                    <Edit size={18} />
                                                </button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <button
                                                            onClick={() => setProductToDelete(product.id)}
                                                            className="text-red-600 hover:text-red-900 hover:cursor-pointer"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete the product.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={handleDeleteProduct}
                                                                disabled={deleteLoading}
                                                            >
                                                                {deleteLoading ? <ButtonLoader /> : "Confirm"}
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {productsResponse?.meta && (
                <div className="mt-6">
                    <Pagination
                        totalPages={productsResponse.meta.totalPage}
                        currentPage={page}
                        pageSize={size}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ProductsList;