"use client";
import Image from "next/image";
import { FiTrash2, FiSearch, FiShoppingCart } from "react-icons/fi";
import product5 from "@/assets/Products_Image/products.jpg";
import { Button } from "@/components/ui/button";

const compareProducts = [
    {
        name: "Honor Magic V3",
        price: "183000 ৳",
        discountPrice: "0 ৳",
        bookingPrice: "0 ৳",
        brand: "Honor",
        ram: "12 GB",
        storage: "512 GB",
        sim: "N/A",
        region: "N/A",
        image: product5.src,
        description:
            "Samsung Galaxy S21 FE 5G Cell Phone, Factory Unlocked Android Smartphone, 128GB, 120Hz Display.",
    },
    {
        name: "Amazfit Bip 5 Smart Watch",
        price: "7299 ৳",
        discountPrice: "7299 ৳",
        bookingPrice: "500 ৳",
        brand: "Amazfit",
        ram: "N/A",
        storage: "N/A",
        sim: "N/A",
        region: "N/A",
        image: product5.src,
        description:
            "Apple iMac 24” 4K Retina Display M1 8 Core CPU, 8 Core GPU, 256GB SSD, Blue (MGPK3ZP/A) 2021",
    },
];

const properties = [
    "Product Name",
    "image",
    "Price",
    "Discount Price",
    "Booking Price",
    "Brand",
    "RAM",
    "Storage",
    "SIM",
    "Region",
    "Description",
];

export default function CompareTab() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4 border-b border-gray-300 pb-[14px] ">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                        Compare products
                    </h2>
                    <p className="text-sm text-gray-500">Trac your order Status</p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-[23px] gap-4 flex-wrap">
                <Button variant={'outline'} className="bg-[#F6F6F6] shadow-md px-3 py-1 rounded-full text-sm text-gray-500 hover:bg-gray-100 transition">
                    Add to compare
                </Button>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a product"
                        className="text-sm bg-[#F9FAFB] text-black rounded-md pl-10 pr-3 py-2 w-[220px] focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                    <FiSearch
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-[700px] w-full text-sm text-left">
                    <thead>
                        <tr className=" text-gray-700">
                            <th className="py-3 px-4 text-sm font-medium w-[160px]"> <p className="text-sm text-[#EB4335] underline hover:text-red-600">
                                Remove all
                            </p></th>
                            {compareProducts.map((product, index) => (
                                <th
                                    key={index}
                                    className="py-3 px-4 text-sm font-semibold text-center "
                                >
                                    <div className="flex flex-col items-center gap-2">

                                        <p className="text-[#EB4335] hover:text-red-500 ">
                                            <FiTrash2 />
                                        </p>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr
                                key={index}
                                className={`${index % 2 !== 1 ? "bg-[#FFF1E9]" : "bg-white"}`}
                            >
                                <td className={`py-3 px-4 font-medium bg-[#FDEFEA] ${properties?.length === index + 1 ? '' : 'border-b border-[#EE5A2C]'} `}>{property}</td>
                                {compareProducts.map((product, idx) => (
                                    <td
                                        key={idx}
                                        className="py-3 px-4 text-center align-middle "
                                    >
                                        {property === "image" ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                width={80}
                                                height={80}
                                                className="inline-block rounded-md mx-auto"
                                            />
                                        ) : property === "Description" ? (
                                            <div className="text-xs text-gray-600 flex flex-col">
                                                <p className="mb-2">{product.description}</p>
                                                <div className="flex items-center gap-x-[7px] justify-center">
                                                    <span className="p-2 bg-white rounded-sm"><FiShoppingCart size={14} color={'#642612'} /></span>
                                                    <Button variant={'outline'} className="flex items-center gap-1 text-white bg-[#EE5A2C] hover:bg-orange-600 text-xs px-4 py-1.5 rounded-sm">
                                                        View details
                                                    </Button>
                                                </div>

                                            </div>
                                        ) : (
                                            <span className="text-gray-800">
                                                {product[
                                                    property
                                                        .toLowerCase()
                                                        .replace(/\s+/g, "")
                                                        .replace("productname", "name") as keyof typeof product
                                                ]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6 gap-2">
                <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Previous
                </Button>
                {[1, 2, 3].map((page) => (
                    <Button variant={'outline'}
                        key={page}
                        className={`text-sm px-3 py-1 border rounded-md ${page === 1
                            ? "bg-orange-500 text-white border-orange-500"
                            : "border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {page}
                    </Button>
                ))}
                <Button variant={'outline'} className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                    Next
                </Button>
            </div>
        </div>
    );
}