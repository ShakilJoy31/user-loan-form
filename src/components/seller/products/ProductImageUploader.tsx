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
        isMain: gallery.length === 0 && index === 0 // Set first image as main if gallery is empty
      });
    });

    setGallery(prev => [...prev, ...newImages]);
  };

  const handleRemoveImage = (id: number) => {
    setGallery(prev => {
      const newGallery = prev.filter(img => img.id !== id);
      // If we removed the main image, set the first image as main (if any)
      if (newGallery.length > 0 && prev.find(img => img.id === id)?.isMain) {
        newGallery[0].isMain = true;
      }
      return newGallery;
    });
  };

  const handleSetMainImage = (id: number) => {
    setGallery(prev =>
      prev.map(img => ({
        ...img,
        isMain: img.id === id
      }))
    );
  };

  const handleUploadImages = async () => {
    if (gallery.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    const uploadPromises = gallery
      .filter(img => img.file) // Only upload images with files (not already uploaded)
      .map(async (img) => {
        if (!img.file) return { id: img.id, url: img.src }; // Skip if already uploaded

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
      
      // Update gallery with uploaded URLs
      setGallery(prev =>
        prev.map(img => {
          const result = results.find(r => r?.id === img.id);
          if (result && !result.error) {
            return { ...img, src: result.url, file: undefined }; // Remove file after upload
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
    setGallery(prev =>
      prev.map(img => 
        img.id === id ? { ...img, altText: text } : img
      )
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
    <div className="border rounded-xl p-6 w-full">
      <h3 className="text-[18px] font-semibold text-gray-800 mb-4">
        Upload Product Image
      </h3>

      <div className="border rounded-xl bg-white p-4">
        {/* Main Image Preview */}
        {gallery.some(img => img.isMain) && (
          <div className="flex items-center justify-between border rounded-md px-4 py-4 mb-4">
            <div className="flex-1 flex justify-center">
              {gallery.find(img => img.isMain) && (
                <Image
                  src={gallery.find(img => img.isMain)!.src}
                  alt="Main Product"
                  width={180}
                  height={180}
                  className="object-contain h-[180px] w-auto"
                />
              )}
            </div>
            <button 
              className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
              onClick={() => {
                const currentMain = gallery.find(img => img.isMain);
                if (currentMain) {
                  handleRemoveImage(currentMain.id);
                }
              }}
            >
              <RefreshCw className="w-4 h-4" />
              Replace
            </button>
          </div>
        )}

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
                placeholder="Enter default alt text for all images"
                className="w-full pl-9 pr-2 py-2 border rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <button 
              className="px-3 rounded-md bg-orange-500 text-white text-sm hover:bg-orange-600"
              onClick={() => {
                setGallery(prev => 
                  prev.map(img => ({ ...img, altText: altText }))
                );
                toast.success("Alt text applied to all images");
              }}
            >
              Apply to All
            </button>
          </div>
        </div>

        {/* Gallery Thumbnails */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-3">
            {gallery.map((img) => (
              <div
                key={img.id}
                className={`relative border rounded-md overflow-hidden w-[70px] h-[70px] flex-shrink-0 ${img.isMain ? 'ring-2 ring-orange-500' : ''}`}
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
                {!img.isMain && (
                  <button
                    className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-0.5 text-center"
                    onClick={() => handleSetMainImage(img.id)}
                  >
                    Set Main
                  </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-1">
                  <input
                    type="text"
                    value={img.altText || ''}
                    onChange={(e) => handleAltTextChange(img.id, e.target.value)}
                    placeholder="Alt text"
                    className="w-full text-xs p-0.5 border-none bg-transparent focus:outline-none"
                  />
                </div>
                {uploadProgress[img.id] > 0 && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-orange-500" 
                      style={{ width: `${uploadProgress[img.id]}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}

            {/* Add Image Placeholder */}
            <div 
              className="border border-dashed rounded-md w-[70px] h-[70px] flex items-center justify-center text-orange-500 cursor-pointer hover:bg-orange-50 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center text-[11px] font-medium">
                <Plus className="w-4 h-4 mb-1" />
                Add Image
              </div>
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

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUploadImages}
          disabled={isUploading || gallery.length === 0}
          className={`mt-4 w-full py-2 rounded-md text-white ${isUploading || gallery.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {isUploading ? 'Uploading...' : 'Upload Images'}
        </button>
      </div>
    </div>
  );
}