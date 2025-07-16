"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react"; // Import useEffect
import { Button } from "@/components/ui/button";
import { P } from "@/components/ui/paragraph";

export default function NotFound() {
  const router = useRouter();
  
  useEffect(() => {
    // This will only run on the client side
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);
    
    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, [router]); // Add router as dependency

  return (
    <div>
      <div className="max-w-[1280px] mx-auto px-4 mt-16 pt-[35px] mb-[269px]">
        <Button variant={'outline'}
          onClick={() => router.back()}
          className="flex text-sm text-orange-500 hover:text-orange-600"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </Button>
        <div className="flex flex-col items-center justify-center bg-white text-center mt-[188px]">
          <h1 className="text-6xl font-bold text-black mb-4">404 Not Found</h1>
          <P className="text-gray-600 mb-6">
            Your visited page not found. You may go home page.
          </P>
          <Button
            onClick={() => router.push("/")}
            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-all"
          >
            Back to Home page
          </Button>
        </div>
      </div>
    </div>
  );
}