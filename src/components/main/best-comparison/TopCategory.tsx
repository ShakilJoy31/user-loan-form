"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import Gallery from "../../../../assets/Home/gallery.png";
import { CiCalendar } from "react-icons/ci";

const TopCategory = () => {
  const categories = [
    { name: "All", count: 134 },
    { name: "Best Electronics", count: 134 },
    { name: "Home Appliances", count: 134 },
    { name: "Fashion", count: 134 },
    { name: "Sports", count: 134 },
    { name: "Toys", count: 134 },
    { name: "Grocery", count: 134 },
  ];

  const tags = ["Healthy", "Lifestyle", "Food", "Fitness", "Travel", "Sports", "Technology", "Fashion", "Home"];

  const recentPosts = [
    { title: "Curabitur porttitor orci eget nequ accumsan.", date: "Apr 25, 2021" },
    // Add more posts as needed
  ];

  return (
    <div className="w-full lg:max-w-[326px] mx-auto lg:mx-0 mt-10 lg:mt-0 px-[16px] lg:px-0">
      {/* Search Input */}
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" size={16} />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EE5A2C] text-sm"
        />
      </div>

      <hr className="border-gray-300 my-6" />

      {/* Top Categories */}
      <div className="w-full">
        <h2 className="text-xl font-bold mb-5">Top Categories</h2>
        <div className="flex justify-between">
          <div>
            {categories.map((category, index) => (
              <p key={index} className="text-sm font-normal py-1">
                {category.name}
              </p>
            ))}
          </div>
          <div>
            {categories.map((category, index) => (
              <p key={index} className="text-sm py-1">
                ({category.count})
              </p>
            ))}
          </div>
        </div>
      </div>

      <hr className="border-gray-300 my-6" />

      {/* Popular Tags */}
      <div>
        <h2 className="text-xl font-bold mb-5">Popular Tag</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {tags.map((tag, index) => (
            <Button
              key={index}
              variant={"outline"}
              size={"sm"}
              className={`rounded-full ${index === 1 ? "bg-[#EE5A2C] text-white" : "bg-gray-100"}`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-5">Our Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[...Array(6)].map((_, index) => (
            <Image
              key={index}
              width={100}
              height={100}
              src={Gallery}
              alt="gallery"
              className="w-full h-auto aspect-square object-cover"
            />
          ))}
        </div>
      </div>

      <hr className="border-gray-300 my-6" />

      {/* Recent Added */}
      <div>
        <h2 className="text-xl font-bold mb-5">Recent Added</h2>
        {recentPosts.map((post, index) => (
          <div key={index} className="flex gap-3 mb-4">
            <div className="min-w-[80px]">
              <Image
                width={100}
                height={77}
                src={Gallery}
                alt="gallery"
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-sm font-medium">{post.title}</h4>
              <p className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                <CiCalendar className="text-[#FD6801]" />
                {post.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategory;