"use client";

import { useState } from "react";
import { Plus, X, RefreshCw, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UploadedImage {
  id: number;
  src: string;
}

export default function ProductImageUploader() {
  const [mainImage, setMainImage] = useState<string | null>("/placeholder-main.jpg");
  const [altText, setAltText] = useState("");
  const [gallery, setGallery] = useState<UploadedImage[]>([
    { id: 1, src: "/placeholder-1.jpg" },
    { id: 2, src: "/placeholder-2.jpg" },
  ]);

  const handleRemoveImage = (id: number) => {
    setGallery((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="border rounded-xl p-6 w-full">
      <h3 className="text-[18px] font-semibold text-gray-800 mb-4">
        Upload Product Image
      </h3>

      <div className="border rounded-xl bg-white p-4">
        {/* Main Image Preview */}
        <div className="flex items-center justify-between border rounded-md px-4 py-4 mb-4">
          <div className="flex-1 flex justify-center">
            {mainImage && (
              <Image
                src={mainImage}
                alt="Main Product"
                width={180}
                height={180}
                className="object-contain h-[180px] w-auto"
              />
            )}
          </div>
          <button className="text-sm text-gray-600 hover:text-black flex items-center gap-1">
            <RefreshCw className="w-4 h-4" />
            Replace
          </button>
        </div>

        {/* Alternative Text */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-800 mb-1">
            Alternative Text <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <ImageIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter alt text"
                className="w-full pl-9 pr-2 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <button className="px-3 rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600">
              +
            </button>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        <div className="flex items-center gap-3">
          {gallery.map((img) => (
            <div
              key={img.id}
              className="relative border rounded-md overflow-hidden w-[70px] h-[70px] flex-shrink-0"
            >
              <Image
                src={img.src}
                alt={`Thumbnail ${img.id}`}
                fill
                className="object-cover"
              />
              <button
                className="absolute top-0 right-0 bg-black/60 text-white rounded-bl-md p-0.5"
                onClick={() => handleRemoveImage(img.id)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add Image Placeholder */}
          <div className="border border-dashed rounded-md w-[70px] h-[70px] flex items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 transition">
            <div className="flex flex-col items-center text-[11px] font-medium">
              <Plus className="w-4 h-4 mb-1" />
              Add Image
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
