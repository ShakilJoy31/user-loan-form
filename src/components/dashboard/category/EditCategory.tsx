"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import TipTapEditor from "../tiptap/TipTapEditor";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import { useUpdateCategoryMutation } from "@/redux/features/product/categoryApi";
import { removeFalsyProperties } from "@/utils/helper/removeFalsyProperties";
import InputWrapper from "@/components/common/Wrapper/InputWrapper";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/types/apiError";

interface CategoryFormValues {
  id: number;
  name: string;
  serialNo: string;
  description?: string;
  isShippedFree: boolean;
  isFullPay: boolean;
  image: string;
}

interface CategoryFormData extends CategoryFormValues {
  banner?: string;
}

interface AddCategoryProps {
  setModalOpen: (open: boolean) => void;
  actionItem?: CategoryFormData;
}

export default function EditCategory({
  setModalOpen,
  actionItem,
}: AddCategoryProps) {
  const [altText, setAltText] = useState("");
  const [altTextBanner, setAltTextBanner] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | undefined>(
    undefined
  );
  const [uploadedImageBanner, setUploadedImageBanner] = useState<
    File | undefined
  >(undefined);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewBanner, setPreviewBanner] = useState<string | null>(null);

  const { handleSubmit, setValue, watch, control } =
    useForm<CategoryFormValues>({
      defaultValues: {
        name: "",
        isShippedFree: false,
        serialNo: "",
        description: "",
        image: "",
        isFullPay: false,
      },
    });

  const name = watch("name");
  const serialNumber = watch("serialNo");
  const description = watch("description");

  const [addThumbnail, { isLoading: isThumbnailUploading }] =
    useAddThumbnailMutation();
  const [
    updateCategory,
    { isLoading: isCategorySaving, error: categoryError },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (actionItem) {
      setValue("name", actionItem?.name || "");
      setValue("serialNo", actionItem?.serialNo || "");
      setValue("description", actionItem?.description || "");
      setValue("image", actionItem?.image || "");
      setValue("isShippedFree", actionItem?.isShippedFree || false);
      setPreview(actionItem?.image || null);
      setPreviewBanner(actionItem?.banner || null);
      setValue("isFullPay", actionItem?.isFullPay || false);
    }
  }, [actionItem, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUploadedImage(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const handleImageUploadBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUploadedImageBanner(selectedFile);
      setPreviewBanner(URL.createObjectURL(selectedFile));
    }
  };

  const handleSaveCategory = async (data: CategoryFormData) => {
    if (!name.trim() || !serialNumber.toString().trim()) {
      toast.error("Both Serial Number and Category Name are required.");
      return;
    }

    if (isNaN(Number(serialNumber))) {
      toast.error("Serial Number must be a valid number.");
      return;
    }

    let imageUrl = preview;
    let bannerUrl = previewBanner;

    if (uploadedImage) {
      const formData = new FormData();
      formData.append("image", uploadedImage);
      if (altText) formData.append("alt", altText);

      try {
        const response = await addThumbnail(formData).unwrap();
        imageUrl = response?.data[0];
      } catch (error) {
        const apiError = error as ApiError;
        toast.error(apiError?.data?.message || "Error uploading image");
        return;
      }
    }
    if (uploadedImageBanner) {
      const formData = new FormData();
      formData.append("image", uploadedImageBanner);
      if (altTextBanner) formData.append("alt", altTextBanner);

      try {
        const response = await addThumbnail(formData).unwrap();
        bannerUrl = response?.data[0];
      } catch (error) {
        const apiError = error as ApiError;
        toast.error(apiError?.data?.message || "Error uploading image");
        return;
      }
    }

    try {
      const updateData = {
        ...data,
        name: name.trim(),

        serialNo: parseInt(serialNumber),
        description,
        image: imageUrl || actionItem?.image,
        banner: bannerUrl || actionItem?.banner,
      };

      const cleanData = removeFalsyProperties(updateData, [
        "banner",
        "description",
      ]);

      await updateCategory({
        id: actionItem?.id,
        data: cleanData,
      }).unwrap();

      toast.success("Category updated successfully!");
      setModalOpen(false);
    } catch (error) {
      const apiError = error as ApiError;
      toast(apiError?.data?.message || "Category add error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveCategory)}
      className="p-6 bg-gray-100 dark:bg-background"
    >
      <h1 className="text-2xl pb-4 font-semibold">Edit Category</h1>

      <div className="bg-white dark:bg-background shadow rounded-lg grid grid-cols-3 items-center gap-4 py-3 px-5">
        <div>
          <label>
            Serial Number <span className="text-red-600">✽</span>
          </label>
          <Input
            type="number"
            placeholder="Enter Serial Number"
            value={watch("serialNo")}
            onChange={(e) => setValue("serialNo", e.target.value)}
          />
        </div>

        <div>
          <label>
            Category Name <span className="text-red-600">✽</span>
          </label>
          <Input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setValue("name", e.target.value)}
          />
        </div>
        <div className="flex items-center gap-1">
          <input
            checked={watch("isShippedFree")}
            className="w-5 h-5"
            type="checkbox"
            onChange={(e) => setValue("isShippedFree", e.target.checked)}
          />
          <span className="text-base font-semibold">Is shipped free?</span>
        </div>
        <div className="flex items-center gap-1">
          <input
            checked={watch("isFullPay")}
            className="w-5 h-5"
            type="checkbox"
            onChange={(e) => setValue("isFullPay", e.target.checked)}
          />
          <span className="text-base font-semibold">Is Full Pay?</span>
        </div>
        <div className="flex items-center gap-2">
          <InputWrapper label={""}>
            <label htmlFor="" className="block mb-1">
              Upload category logo<span className="text-red-600">✽</span>
            </label>
            <div className="border-2 border-dashed rounded-md py-3 px-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </InputWrapper>

          <div>
            {preview && (
              <div className="relative w-20 h-20 border rounded-md overflow-hidden mt-4">
                <Image
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => {
                    setPreview(null);
                    setUploadedImage(undefined);
                  }}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-2">
          <label htmlFor="altText">Alt Text</label>
          <Input
            placeholder="Enter alt text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center gap-5 bg-white dark:bg-background shadow rounded-lg p-4">
        <div className="flex items-center gap-2">
          <InputWrapper label={""}>
            <label htmlFor="" className="block mb-1">
              Upload category banner
            </label>
            <div className="border-2 border-dashed rounded-md py-3 px-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUploadBanner}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </InputWrapper>

          <div>
            {previewBanner && (
              <div className="relative w-20 h-20 border rounded-md overflow-hidden mt-4">
                <Image
                  src={previewBanner}
                  alt="Banner Preview"
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  onClick={() => {
                    setPreviewBanner(null);
                    setUploadedImageBanner(undefined);
                  }}
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-2 col-span-1">
          <label htmlFor="">Alt text</label>
          <Input
            placeholder="Enter alt text"
            value={altTextBanner}
            onChange={(e) => setAltTextBanner(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <label htmlFor="" className="mb-3 text-3xl block">
          Category Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TipTapEditor content={field.value} onUpdate={field.onChange} />
          )}
        />
      </div>

      <div className="flex justify-between items-center gap-2 mb-6">
        <div></div>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 "
            variant={"default"}
          >
            Cancel
          </Button>
          <Button
            variant={"primary"}
            type="submit"
            className="px-4 py-2"
            disabled={isThumbnailUploading || isCategorySaving}
          >
            {isThumbnailUploading
              ? "Uploading Image..."
              : isCategorySaving
              ? "Saving..."
              : "Update"}
          </Button>
        </div>
      </div>

      {categoryError && "data" in categoryError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Category Error</AlertTitle>
          <AlertDescription>
            {(categoryError.data as { message?: string })?.message ||
              "Something went wrong! Please try again."}
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
