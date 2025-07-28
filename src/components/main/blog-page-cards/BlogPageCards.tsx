"use client";
import Image from "next/image";
import { FaRegClock, FaShareAlt } from "react-icons/fa";
import person from "@/assets/Home/person.png";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import Pagination from "@/components/common/Pagination";
import { BlogPost } from "@/types/blogPost";
import DataLoader from "@/components/common/DataLoader";
import { useRouter } from "next/navigation";

interface BlogPageCardsProps {
  post: BlogPost;
}

const BlogPageCards = ({ post }: BlogPageCardsProps) => {
  const { translate } = useCustomTranslator();
  const router = useRouter();

  // Function to extract plain text from HTML content without external library
  const getPlainText = (html: string) => {
    if (!html) return "";
    // Simple HTML tag removal (not as robust as stripHtml but works for basic cases)
    const text = html.replace(/<[^>]*>/g, '');
    return text.substring(0, 100) + (text.length > 100 ? "..." : "");
  };

  // Format date without external library
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formattedDate = formatDate(post.createdAt);

  return (
    <div onClick={()=> router.push(`/blog-details/${post?.slug}`)} className="w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 font-sans flex flex-col h-full hover:cursor-pointer">
      {/* Image and Tags */}
      <div className="relative w-full h-48 flex-shrink-0">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title || "Blog post image"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {/* <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 text-xs text-gray-800 px-3 py-1 rounded-full font-medium shadow-sm">
            {post.categoryId || translate("বাগান করা", "Gardening")}
          </span>
        </div> */}
      </div>

      {/* Content - This will grow to fill available space */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Author and Date */}
        <div className="flex items-center mb-3 gap-2">
          <div className="flex items-center">
            <Image
              src={person}
              alt={post.author || "Author"}
              width={24}
              height={24}
              className="rounded-full mr-2"
            />
            <span className="text-orange-600 text-sm font-medium">
              {post.author || translate("অজানা", "Unknown")}
            </span>
          </div>
          
          <span className="text-gray-400">•</span>
          
          <div className="flex items-center text-gray-500 text-xs">
            <FaRegClock className="mr-1" />
            {formattedDate}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* Description - This will grow to fill available space */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {getPlainText(post.content || "")}
        </p>

        {/* Footer - This will stay at the bottom */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <span onClick={()=> router.push(`/blog-details/${post?.slug}`)} className="text-orange-600 hover:cursor-pointer text-sm font-medium cursor-pointer hover:underline">
            {translate("আরও পড়ুন", "Read More")}
          </span>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Share"
          >
            <FaShareAlt />
          </button>
        </div>
      </div>
    </div>
  );
};




interface BlogPageCardsGridProps {
  posts: BlogPost[];
  pagination: {
    sort: string;
    page: number;
    size: number;
    search: string;
    status: string;
    meta: {
      page: number | null;
      size: number | null;
      total: number | null;
      totalPage: number | null;
    };
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  isLoading: boolean;
}

const BlogPageCardsGrid = ({
  posts,
  pagination,
  onPageChange,
  onPageSizeChange,
  isLoading
}: BlogPageCardsGridProps) => {
  console.log(posts)
  if (isLoading) {
    return (
      <div className="flex justify-center mt-6 w-full"><DataLoader /></div>
    );
  }

  if (!posts.length) {
    return (
      <div className="px-[10px] flex justify-center items-center h-64 w-full">
        <div>No posts found</div>
      </div>
    );
  }

  return (
    <div className="px-[10px]">
      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-6 mb-8">
        {posts.map((post) => (
          <BlogPageCards key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-[40px]">
        <Pagination
          totalPages={pagination.meta.totalPage || 1}
          currentPage={pagination.page}
          pageSize={pagination.size}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />

      </div>
    </div>
  );
};

export default BlogPageCardsGrid;