// app/not-found.tsx or pages/404.tsx
"use client"; // Only needed in app directory if you're using interactive elements like useRouter

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SmallDevicePublicNav from "@/components/main/navigations/SmallDevicePublicNav";
import PublicFooter from "@/components/main/navigations/PublicFooter";
import PublicNav from "@/components/main/navigations/PublicNav";

export default function NotFound() {
    const router = useRouter();

    return (
        <div>
            <PublicNav />
            <div className="max-w-[1280px] mx-auto px-4 mt-16 pt-[35px] mb-[269px]">
                <button
                    onClick={() => router.back()}
                    className="flex text-sm text-orange-500 hover:text-orange-600"
                >
                    <ArrowLeft size={18} className="mr-1" />
                    Back
                </button>
                <div className="flex flex-col items-center justify-center bg-white text-center mt-[188px]">
                    {/* Back Button */}


                    {/* 404 Message */}
                    <h1 className="text-6xl font-bold text-black mb-4">404 Not Found</h1>
                    <p className="text-gray-600 mb-6">
                        Your visited page not found. You may go home page.
                    </p>

                    {/* Button to Homepage */}
                    <button
                        onClick={() => router.push("/")}
                        className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-all"
                    >
                        Back to Home page
                    </button>
                </div>
            </div>
            <SmallDevicePublicNav />
            <PublicFooter />
        </div>
    );
}
