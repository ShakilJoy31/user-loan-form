"use client";

import TopCategory from "@/components/main/blog-details-best-comparison/TopCategory";
import BlogPageCardsGrid from "@/components/main/blog-page-cards/BlogPageCards";
import GardeningFilter from "@/components/main/blog-page-cards/GardeningFilter";
import { useGetAllPostsQuery } from "@/redux/features/blog/blogPostApi";
import { useEffect, useState } from "react";

const BlogPage = () => {

    const [pagination, setPagination] = useState({
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

    const { data: postsData, isLoading } = useGetAllPostsQuery({
        sort: pagination.sort,
        page: pagination.page,
        // size: pagination.size,
        // search: pagination.search,
        // status: pagination.status,
    });

    // When postsData changes, update the meta in pagination
    useEffect(() => {
        if (postsData?.meta) {
            setPagination(prev => ({
                ...prev,
                meta: {
                    page: postsData.meta.page,
                    size: postsData.meta.size,
                    total: postsData.meta.total,
                    totalPage: postsData.meta.totalPage,
                }
            }));
        }
    }, [postsData]);

    const handleSearch = (searchTerm: string) => {
        setPagination(prev => ({ ...prev, search: searchTerm, page: 1 }));
    };

    const handleStatusFilter = (status: string) => {
        setPagination(prev => ({ ...prev, status, page: 1 }));
    };

    const handleSortChange = (sort: string) => {
        setPagination(prev => ({ ...prev, sort }));
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, page }));
    };

    const handlePageSizeChange = (size: number) => {
        setPagination(prev => ({ ...prev, size, page: 1 }));
    };
    

    return (
        <div className="mt-16 lg:pt-[95px] max-w-[1280px] mx-auto mb-10 lg:mb-[93px]">
            <GardeningFilter
                onSortChange={handleSortChange}
                totalResults={postsData?.meta?.total || 0}
            />
            <div className="lg:flex justify-between lg:gap-[33px]">
                <TopCategory
                    onSearch={handleSearch}
                    onStatusFilter={handleStatusFilter}
                />
                <BlogPageCardsGrid
                    posts={postsData?.data || []}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default BlogPage;