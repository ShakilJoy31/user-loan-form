import { ShoppingCart } from 'lucide-react';
import product from '../../../../assets/Products_Image/products.jpg'
import Image from 'next/image';

const products = [
    {
        name: 'House Wiring Cable',
        price: 145,
        size: 'large',
        color: 'Multiple',
        image: product.src,
    },
    {
        name: '6A 6 Gang 1 Way Switch',
        price: 145,
        size: 'large',
        color: 'Multiple',
        image: product.src,
    },
    {
        name: 'Walton 12W Fast Char...',
        price: 145,
        size: 'large',
        color: 'White',
        image: product.src,
    },
    {
        name: 'Gang Switch',
        price: 145,
        size: '1 kg',
        color: 'White',
        image: product.src,
    },
];

export const RecommendedProducts = () => {
    return (
        <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
            <ul className="space-y-4">
                {products.map((product, index) => (
                    <li
                        key={index}
                        className="flex justify-between border-b border-gray-300 last:border-0 pb-4"
                    >
                        <div className="flex items-start space-x-4 w-full ">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={100}
                                height={100}
                                className="w-14 h-14 rounded object-cover"
                            />
                            <div className='w-full'>
                                <p className="font-semibold text-sm">{product.name}</p>
                                <p className="text-xs text-gray-500">Size: {product.size}</p>
                                <p className="text-xs text-gray-500">Color: {product.color}</p>
                                <div className='flex justify-between items-center'>
                                    <p className="text-[#FF5A1F] font-semibold text-base mt-1">
                                        {product.price} TK
                                    </p>

                                    <button className="p-2 rounded-full hover:bg-gray-100">
                                        <ShoppingCart size={18} />
                                    </button>
                                </div>

                            </div>
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
};
