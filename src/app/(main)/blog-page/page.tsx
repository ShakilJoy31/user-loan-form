import TopCategory from "@/components/main/blog-details-best-comparison/TopCategory";
import BlogPageCardsGrid from "@/components/main/blog-page-cards/BlogPageCards";
import GardeningFilter from "@/components/main/blog-page-cards/GardeningFilter";


const BlogPage = () => {
    return (
        <div className="mt-16 lg:pt-[95px] max-w-[1280px] mx-auto mb-10 lg:mb-[93px]">
            <GardeningFilter />
            <div className="lg:flex justify-between lg:gap-[33px]">
            <TopCategory />
            <BlogPageCardsGrid />
            </div>
        </div>
    );
};

export default BlogPage;