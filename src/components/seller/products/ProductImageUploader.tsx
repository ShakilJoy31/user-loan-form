"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Plus, X, RefreshCw, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useAddThumbnailMutation } from "@/redux/features/file/fileApi";
import toast from "react-hot-toast";

interface UploadedImage {
  id: number;
  src: string;
  file?: File;
  altText?: string;
  isMain?: boolean;
}

export default function ProductImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [addThumbnail, { isLoading: isUploading }] = useAddThumbnailMutation();
  const [altText, setAltText] = useState("");
  const [gallery, setGallery] = useState<UploadedImage[]>([]);
  const [uploadProgress, ] = useState<Record<number, number>>({});

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
          return { id: img.id, url: response?.data[0] };
        } catch (error) {
          console.error("Upload failed for image:", img.id, error);
          return { id: img.id, error: true };
        }
      });

    try {
      const results = await Promise.all(uploadPromises);
      setGallery((prev) =>
        prev.map((img) => {
          const result = results.find((r) => r?.id === img.id);
          if (result && !result.error) {
            return { ...img, src: result.url, file: undefined };
          }
          return img;
        })
      );
      toast.success("Images uploaded successfully!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Some images failed to upload");
    }
  };

  const handleAltTextChange = (id: number, text: string) => {
    setGallery((prev) =>
      prev.map((img) => (img.id === id ? { ...img, altText: text } : img))
    );
  };

  const getHostedImageUrls = () => {
    return gallery
      .filter(img => !img.file) // Only return images that have been uploaded
      .map(img => ({
        url: img.src,
        altText: img.altText || "",
        isMain: img.isMain || false
      }));
  };

  console.log(getHostedImageUrls)

  return (
    <div className="border rounded-xl p-6 w-full bg-white">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Product Image
      </h3>

      <p className="text-sm font-semibold text-gray-700 mb-2">Product Image</p>

      <div className="border rounded-lg h-[260px] flex items-center justify-center relative mb-5">
        {gallery.some((img) => img.isMain) ? (
          <>
            <Image
              src={gallery.find((img) => img.isMain)!.src}
              alt="Main Product"
              width={180}
              height={180}
              className="object-contain max-h-[230px]"
            />
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

     <div className="flex justify-between">
       <div className="w-auto lg:w-[449px] pt-[40px]">
        <label className="block text-sm font-semibold text-gray-800 mb-1">
          Alternative Text <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            placeholder="Enter alt text"
            className="w-full px-3 py-2 pr-10 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button
              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:bg-gray-100"
              onClick={() => {
                setGallery((prev) => prev.map((img) => ({ ...img, altText })));
              }}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        {gallery.map((img) => (
          <div
            key={img.id}
            className="relative w-[99px] h-[99px] rounded-md overflow-hidden border"
          >
            <Image
              src={img.src}
              alt={`Thumb-${img.id}`}
              fill
              className="object-cover"
            />
            <button
              className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow text-gray-500 hover:text-black"
              onClick={() => handleRemoveImage(img.id)}
            >
              <X className="w-4 h-4" />
            </button>
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
     </div>


    </div>
  );
}