"use client";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Table from "@/components/ui/table";
import { AlertCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { FiEdit, FiSearch, FiTrash2 } from "react-icons/fi";
import AddEditBannerModal from "./AddEditBannerModal";
import Image from "next/image";
import DataLoader from "@/components/common/DataLoader";
import ButtonLoader from "@/components/common/ButtonLoader";
import toast from "react-hot-toast";
import Pagination from "@/components/common/Pagination";
import {
  useAddBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
  useUpdateBannerMutation,
} from "@/redux/features/product/bannerApi";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

interface Banner {
  id: number;
  brandId: number;
  image: string;
  link: string;
}

interface BannerFormData {
  link: string;
  image: string;
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

const BannerList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { translate } = useCustomTranslator();
  const [currentBanner, setCurrentBanner] = useState<{
    bannerId: number | null;
    brandId: number;
    image: string;
  } | null>(null);

  // Pagination State
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
  const { data, isLoading, isError, refetch } = useGetBannersQuery({
    sort: pagination.sort,
    page: pagination.page,
    size: pagination.size,
    search: searchTerm,
  });

  const [addBanner, { isLoading: addLoading, error: addError }] =
    useAddBannerMutation();
  const [updateBanner, { isLoading: editLoading, error: editError }] =
    useUpdateBannerMutation();
  const [deleteBanner, { isLoading: deleteLoading, error: deleteError }] =
    useDeleteBannerMutation();

  // Banner List
  const banners: Banner[] = data?.data || [];

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

  const handleSaveBanner = async (
    bannerId: number | null,
    data: BannerFormData
  ) => {
    try {
      if (bannerId) {
        const result = await updateBanner({
          id: bannerId,
          data: data,
        }).unwrap();

        if (result.success) {
          toast.success(translate("ব্যানার সফলভাবে আপডেট করা হয়েছে", "Banner updated successfully"));
          setModalOpen(false);
        }
      } else {
        const result = await addBanner(data).unwrap();
        if (result.success) {
          toast.success(translate("ব্যানার সফলভাবে যোগ করা হয়েছে", "Banner added successfully"));
          setModalOpen(false);
        }
      }
      refetch();
    } catch (err) {
      console.error("Error saving banner:", err);
      toast.error(translate("ব্যানার সংরক্ষণ করতে ব্যর্থ হয়েছে", "Failed to save banner"));
    }
  };

  const handleDeleteBanner = async (id: number) => {
    try {
      await deleteBanner(id).unwrap();
      toast.success(translate("ব্যানার সফলভাবে মুছে ফেলা হয়েছে", "Banner deleted successfully"));
      refetch();
    } catch (err) {
      console.error("Error deleting banner:", err);
      toast.error(translate("ব্যানার মুছতে ব্যর্থ হয়েছে", "Failed to delete banner"));
    }
  };

  const handleAddBanner = () => {
    setCurrentBanner(null);
    setModalOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setCurrentBanner({
      bannerId: banner.id,
      brandId: banner.brandId,
      image: banner.image,
    });
    setModalOpen(true);
  };

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="bg-gray-100 min-h-screen dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-5 mt-5">
        <h1 className="text-2xl font-semibold">{translate("মেইন ব্যানার", "Main Banner")}</h1>
        <div className="flex items-center gap-2">
          <button className="px-4 py-1 font-semibold rounded border text-blue-500 mr-2">
            {translate("এক্সপোর্ট", "Export")}
          </button>
          <button
            className="px-4 flex items-center py-1 cursor-pointer bg-[#EE5A2C] text-white font-semibold rounded hover:bg-orange-800"
            onClick={handleAddBanner}
          >
            <Plus className="font-bold w-4 h-4" /> {translate("ব্যানার যোগ করুন", "Add Banner")}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center bg-white px-4 rounded-lg dark:bg-black dark:text-white">
        <div className="relative w-1/3 my-4">
          <input
            type="text"
            placeholder={translate("খুঁজুন...", "Search...")}
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
          {translate("ব্যানারগুলি আনতে ব্যর্থ হয়েছে", "Failed to fetch banners.")}
        </div>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <Table
          headers={[
            translate("SL", "SL"),
            translate("ছবি", "Image"),
            translate("লিংক", "Link"),
            translate("ক্রিয়া", "Action")
          ]}
          data={banners}
          renderRow={(row: Banner, index: number) => {
            const dynamicIndex =
              index + 1 + (pagination.page - 1) * pagination.size;
            return (
              <>
                <td className="px-4 py-2">{dynamicIndex}</td>
                <td className="px-4 py-2">
                  {row.image ? (
                    <div className="flex justify-start">
                      <Image
                        width={100}
                        height={100}
                        src={row.image}
                        alt={`Banner ${row.id}`}
                        className="h-12 object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500">{translate("কোন ছবি নেই", "No Image")}</span>
                  )}
                </td>
                <td className="px-4 py-2 font-medium">{row.link}</td>
                <td className="px-4 py-2 flex gap-2 ">
                  <button
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleEditBanner(row)}
                  >
                    <FiEdit />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="bg-white dark:bg-black text-red-600 px-4 py-2 cursor-pointer">
                        <FiTrash2 />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          {translate("আপনি কি সম্পূর্ণ নিশ্চিত?", "Are you absolutely sure?")}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          {translate("আপনি কি মুছে ফেলতে চান?", "Are you sure you want to delete?")}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="btn-destructive-fill">
                          {translate("বাতিল", "Cancel")}
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBanner(row.id)}
                        >
                          {deleteLoading && <ButtonLoader />} {translate("নিশ্চিত করুন", "Confirm")}
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
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{translate("ত্রুটি", "Error")}</AlertTitle>
          <AlertDescription>
            {(deleteError.data as { message?: string })?.message ||
              translate("কিছু ভুল হয়েছে! দয়া করে আবার চেষ্টা করুন।", "Something went wrong! Please try again.")}
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
      <AddEditBannerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={(data) =>
          handleSaveBanner(currentBanner?.bannerId ?? null, data)
        }
        currentBanner={
          currentBanner
            ? {
                link: "",
                image: currentBanner.image,
              }
            : undefined
        }
        loading={addLoading || editLoading}
        err={(addError || editError) as ApiError}
      />
    </div>
  );
};

export default BannerList;