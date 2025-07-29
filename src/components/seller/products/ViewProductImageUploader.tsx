"use client";

import Image from "next/image";
import { Image as ImageIcon, Plus, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

interface ViewProductImageUploaderProps {
  images: string[];
}

export default function ViewProductImageUploader({
  images
}: ViewProductImageUploaderProps) {
    const [gallery, setGallery] = useState<{id: number, src: string, isMain: boolean}[]>([]);

    useEffect(() => {
        if (images && images.length > 0) {
            setGallery(images.map((img, index) => ({
                id: index,
                src: img,
                isMain: index === 0
            })));
        }
    }, [images]);

    return (
        <div className="border rounded-xl p-6 w-full bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Images
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
                            unoptimized
                        />
                        <button
                            className="absolute bottom-2 right-2 border rounded px-3 py-1 text-sm text-gray-700 bg-gray-50 flex items-center gap-1 cursor-not-allowed"
                            disabled
                        >
                            <RefreshCw className="w-4 h-4" /> Replace
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-1 px-3 py-1 text-gray-400">
                        <ImageIcon className="w-4 h-4" /> No Image
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3">
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
                            unoptimized
                        />
                        {img.isMain && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center py-1">
                                Main
                            </div>
                        )}
                    </div>
                ))}

                <div
                    className="w-[200px] h-[99px] border border-dashed rounded-md flex flex-col items-center justify-center text-gray-400 text-xs font-medium bg-gray-50"
                >
                    <Plus className="w-4 h-4 mb-1" /> Add Image
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="button"
                    disabled
                    className="px-4 py-2 bg-gray-300 text-white rounded-md cursor-not-allowed"
                >
                    Upload Images
                </button>
            </div>
        </div>
    );
}