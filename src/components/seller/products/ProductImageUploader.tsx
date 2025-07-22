"use client";

import { useState, useRef, ChangeEvent, useEffect, useCallback } from "react";
import { Plus, X, RefreshCw, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import toast from "react-hot-toast";
import ButtonLoader from "@/components/common/ButtonLoader";

interface UploadedImage {
  id: number;
  src: string;
  file?: File;
  altText?: string;
  isMain?: boolean;
}

interface ProductImageUploaderProps {
  onImagesUpdate: (imageUrls: string[]) => void;
  initialImages?: string[];
  isUploading?: boolean;
  onUploadStart?: () => void;
}

export default function ProductImageUploader({
  onImagesUpdate,
  initialImages = [],
}: ProductImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addThumbnail, { isLoading: isUploading }] = useAddThumbnailMutation();
  const [gallery, setGallery] = useState<UploadedImage[]>([]);
  const hasInitialized = useRef(false);

  // Helper function to ensure URL is absolute
  const ensureAbsoluteUrl = (url: string): string => {
    if (!url) return "";
    try {
      new URL(url);
      return url; // Already absolute
    } catch {
      // If relative URL, prepend with base URL (adjust this based on your setup)
      return `${process.env.NEXT_PUBLIC_API_BASE_URL || ""}${
        url.startsWith("/") ? url : `/${url}`
      }`;
    }
  };

  // Helper function to validate URLs
  const isValidUrl = useCallback((url: string) => {
    if (!url) return false;
    try {
      new URL(ensureAbsoluteUrl(url));
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }, []);

  // Initialize with initial images
  useEffect(() => {
    if (!hasInitialized.current && initialImages && initialImages.length > 0) {
      const initialGallery = initialImages
        .filter((url) => url && isValidUrl(url))
        .map((url, index) => ({
          id: Date.now() + index,
          src: ensureAbsoluteUrl(url),
          altText: "",
          isMain: index === 0,
        }));
      setGallery(initialGallery);
      hasInitialized.current = true;
    }
  }, [initialImages, isValidUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: UploadedImage[] = [];

    Array.from(files).forEach((file, index) => {
      const id = Date.now() + index;
      newImages.push({
        id,
        src: URL.createObjectURL(file),
        file,
        altText: "",
        isMain: gallery.length === 0 && index === 0,
      });
    });

    setGallery((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: number) => {
    setGallery((prev) => {
      const newGallery = prev.filter((img) => img.id !== id);
      if (newGallery.length > 0 && prev.find((img) => img.id === id)?.isMain) {
        newGallery[0].isMain = true;
      }
      return newGallery;
    });
  };

  const handleSetMainImage = (id: number) => {
    setGallery((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id,
      }))
    );
  };

  // Update the handleUploadImages function in ProductImageUploader.tsx
  const handleUploadImages = async () => {
    if (gallery.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const uploadPromises = gallery
      .filter((img) => img.file)
      .map(async (img) => {
        if (!img.file) return { id: img.id, url: img.src };

        const formData = new FormData();
        formData.append("image", img.file);
        if (img.altText) {
          formData.append("alt", img.altText);
        }

        try {
          const response = await addThumbnail(formData).unwrap();
          console.log(response);
          // Ensure the URL is absolute and valid
          const uploadedUrl = response?.data;
          if (!uploadedUrl) {
            throw new Error("No URL returned from server");
          }
          return { id: img.id, url: uploadedUrl };
        } catch (error) {
          console.error("Upload failed for image:", img.id, error);
          return { id: img.id, error: true };
        }
      });

    try {
      const results = await Promise.all(uploadPromises);

      // Update gallery with uploaded URLs
      const updatedGallery = gallery.map((img) => {
        const result = results.find((r) => r?.id === img.id);
        if (result && !result.error && result.url) {
          // Revoke the object URL to free memory
          if (img.src.startsWith("blob:")) {
            URL.revokeObjectURL(img.src);
          }
          return { ...img, src: result.url, file: undefined };
        }
        return img;
      });

      setGallery(updatedGallery);
      toast.success("Images uploaded successfully!");

      // Return the updated URLs to the parent
      const uploadedUrls = updatedGallery
        .filter((img) => !img.file)
        .map((img) => img.src);
      onImagesUpdate(uploadedUrls);
    } catch (error) {
      console.log(error);
      toast.error("Some images failed to upload");
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      gallery.forEach((img) => {
        if (img.src.startsWith("blob:")) {
          URL.revokeObjectURL(img.src);
        }
      });
    };
  }, [gallery]);

  // Safe image rendering function
  const renderImage = (
    src: string,
    alt: string,
    props: {
      width?: number;
      height?: number;
      fill?: boolean;
      className: string;
    }
  ) => {
    const absoluteSrc = ensureAbsoluteUrl(src);
    if (!isValidUrl(absoluteSrc)) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100">
          <span className="text-gray-500">Invalid image</span>
        </div>
      );
    }

    return (
      <Image
        src={absoluteSrc}
        alt={alt}
        unoptimized={absoluteSrc.startsWith("blob:")}
        {...props}
      />
    );
  };

  return (
    <div className="border rounded-xl p-6 w-full bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Product Image
      </h3>

      <p className="text-sm font-semibold text-gray-700 mb-2">Product Image</p>

      <div className="border rounded-lg h-[260px] flex items-center justify-center relative mb-5">
        {gallery.some((img) => img.isMain) ? (
          <>
            {renderImage(
              gallery.find((img) => img.isMain)!.src,
              gallery.find((img) => img.isMain)!.altText || "Main Product",
              {
                width: 180,
                height: 180,
                className: "object-contain max-h-[230px]",
              }
            )}
            <button
              className="absolute bottom-2 right-2 border rounded px-3 py-1 text-sm text-gray-700 hover:text-black hover:bg-gray-50 flex items-center gap-1"
              onClick={() => {
                const main = gallery.find((img) => img.isMain);
                if (main) handleRemoveImage(main.id);
              }}
            >
              <RefreshCw className="w-4 h-4" /> Replace
            </button>
          </>
        ) : (
          <button
            className="flex items-center gap-1 px-3 py-1 border border-[#EE5A2C] rounded-md text-sm text-gray-600 hover:text-black hover:bg-gray-50"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" /> Browse
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {gallery.map((img) => (
          <div
            key={img.id}
            className="relative w-[99px] h-[99px] rounded-md overflow-hidden border"
            onClick={() => handleSetMainImage(img.id)}
          >
            {renderImage(img.src, img.altText || `Thumb-${img.id}`, {
              fill: true,
              className: "object-cover",
            })}
            <button
              className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow text-gray-500 hover:text-black"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(img.id);
              }}
            >
              <X className="w-4 h-4" />
            </button>
            {img.isMain && (
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1">
                Main
              </div>
            )}
          </div>
        ))}

        <div
          className="w-[200px] h-[99px] border border-dashed rounded-md flex flex-col items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 text-xs font-medium"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="w-4 h-4 mb-1" /> Add Image
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            multiple
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleUploadImages}
          disabled={isUploading}
          className="px-4 py-2 bg-[#F05323] text-white rounded-md hover:bg-[#e34724] disabled:opacity-50"
        >
          {isUploading ? <ButtonLoader></ButtonLoader> : "Upload Images"}
        </button>
      </div>
    </div>
  );
}
