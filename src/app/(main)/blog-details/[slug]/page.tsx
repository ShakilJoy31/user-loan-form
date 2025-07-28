"use client";

import DataLoader from "@/components/common/DataLoader";
import CameraComperison from "@/components/main/blog-details-best-comparison/CameraComperison";
import TopCategory from "@/components/main/blog-details-best-comparison/TopCategory";
import { useGetPostByIdQuery } from "@/redux/features/blog/blogPostApi";
import { usePathname } from "next/navigation";
import { useState } from "react";

const BlogDetails = () => {
    const pathname = usePathname();
    const id = pathname.split('/').pop();
    
    const {
        data: postData,
        isLoading: isPostLoading,
        isError,
        error: postError,
    } = useGetPostByIdQuery(id);

    const [, setPagination] = useState({
        sort: "asc",
        page: 1,
        size: 9,
        search: "",
        status: "published",
        meta: {
            page: null,
            size: null,
            total: null,
            totalPage: null,
        },
    });

    const handleSearch = (searchTerm: string) => {
        setPagination(prev => ({ ...prev, search: searchTerm, page: 1 }));
    };

    const handleStatusFilter = (status: string) => {
        setPagination(prev => ({ ...prev, status, page: 1 }));
    };

    if (isPostLoading) {
        return <div className="flex justify-center pt-28"><DataLoader /></div>;
    }

    if (isError) {
        return <div>Error loading post: {postError?.toString()}</div>;
    }

    if (!postData?.data) {
        return <div>No post data found</div>;
    }

    return (
        <div className="mt-16 lg:pt-[40px] max-w-[1280px] mx-auto mb-10 lg:mb-[80px] lg:flex justify-between">
            <CameraComperison post={postData.data} />
            <TopCategory 
                onSearch={handleSearch}
                onStatusFilter={handleStatusFilter} 
            />
        </div>
    );
};

export default BlogDetails;