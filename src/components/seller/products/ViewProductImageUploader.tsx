// src/components/seller/products/ViewProductImageUploader.tsx
"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
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

    if (gallery.length === 0) {
        return null;
    }

    return (
        <div className="border rounded-xl p-6 w-full bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Images
            </h3>

            <p className="text-sm font-semibold text-gray-700 mb-2">Main Product Image</p>

            <div className="border rounded-lg h-[260px] flex items-center justify-center relative mb-5">
                {gallery.find((img) => img.isMain) ? (
                    <>
                        <Image
                            src={gallery.find((img) => img.isMain)!.src}
                            alt="Main Product"
                            width={180}
                            height={180}
                            className="object-contain max-h-[230px]"
                            unoptimized
                        />
                    </>
                ) : (
                    <div className="flex items-center gap-1 px-3 py-1 text-gray-600">
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
            </div>
        </div>
    );
}