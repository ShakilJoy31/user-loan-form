"use client";
import { ShoppingCart } from 'lucide-react';
import product from '@/assets/Products_Image/products.jpg'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

const products = [
    {
        name: "House Wiring Cable",
        price: 145,
        size: "large",
        color: "Multiple",
        image: product.src,
    },
    {
        name: "6A 6 Gang 1 Way Switch",
        price: 145,
        size: "large",
        color: "Multiple",
        image: product.src,
    },
    {
        name: "Walton 12W Fast Charger",
        price: 145,
        size: "large",
        color: "White",
        image: product.src,
    },
    {
        name: "Gang Switch",
        price: 145,
        size: "1 kg",
        color: "White",
        image: product.src,
    },
];

export const RecommendedProducts = () => {
    const { translate } = useCustomTranslator();

    const translatedProducts = products.map(product => ({
        ...product,
        name: translate(
            product.name === "House Wiring Cable" ? "হাউজ ওয়্যারিং কেবল" :
            product.name === "6A 6 Gang 1 Way Switch" ? "৬এ ৬ গ্যাং ১ ওয়ে সুইচ" :
            product.name === "Walton 12W Fast Charger" ? "ওয়ালটন ১২ডব্লিউ ফাস্ট চার্জার" :
            "গ্যাং সুইচ",
            product.name
        ),
        size: translate(
            product.size === "large" ? "বড়" :
            product.size === "1 kg" ? "১ কেজি" :
            product.size,
            product.size
        ),
        color: translate(
            product.color === "Multiple" ? "বহু" :
            product.color === "White" ? "সাদা" :
            product.color,
            product.color
        )
    }));

    return (
        <div className="dark:bg-black dark:text-white bg-white p-4 rounded-xl border border-gray-300 shadow-sm lg:max-w-[524px] max-w-full">
            <h3 className="text-lg font-semibold mb-4">
                {translate("প্রস্তাবিত পণ্য", "Recommended Products")}
            </h3>
            <ul className="space-y-4">
                {translatedProducts.map((product, index) => (
                    <li key={index} className="dark:bg-black dark:text-white flex justify-between border-b border-gray-300 last:border-0 pb-4">
                        <div className="dark:bg-black dark:text-white flex items-start space-x-4 w-full">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="w-14 h-14 rounded object-cover"
                            />
                            <div className='w-full dark:bg-black dark:text-white'>
                                <p className="font-semibold text-sm">{product.name}</p>
                                <p className="text-xs text-gray-500">
                                    {translate("সাইজ:", "Size:")} {product.size}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {translate("রং:", "Color:")} {product.color}
                                </p>
                                <div className='flex justify-between items-center'>
                                    <p className="text-[#FF5A1F] font-semibold text-base mt-1">
                                        {product.price} {translate("টাকা", "Tk")}
                                    </p>
                                    <Button variant={'outline'} className="p-2 rounded-full hover:bg-gray-100">
                                        <ShoppingCart size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};