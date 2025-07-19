import React from 'react';

const Variation: React.FC = () => {
    return (
        <div className="">
            <div className="mt-6 border rounded-md p-6">
                <h3 className="text-md font-semibold text-gray-800 mb-4">
                    Variant Details
                </h3>

                {/* Variant List */}
                <div className="border rounded-md overflow-hidden">
                    {/* Header */}
                    <div className="grid grid-cols-1 md:grid-cols-2 bg-orange-50 text-sm font-semibold text-gray-700 px-4 py-3 border-b">
                        <div className="flex justify-center md:justify-start">Variants Name</div>
                        <div className="flex justify-center md:justify-start">Options</div>
                    </div>

                    {/* Weight */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 px-4 py-3 border-b">
                        <div className="text-sm font-medium text-gray-700 text-center md:text-left">Weight</div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <p>25 KG</p>
                            <p>50 KG</p>
                            <p>100 KG</p>
                        </div>
                    </div>

                    {/* Type of Rice */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 px-4 py-3 border-b">
                        <div className="text-sm font-medium text-gray-700 text-center md:text-left">Type of Rice</div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <p>
                                Bashmati <span className="text-xs text-gray-400">(Imported)</span>
                            </p>
                            <p>Atop</p>
                            <p>Chinigura</p>
                        </div>
                    </div>

                    {/* Quality Grade */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 px-4 py-3">
                        <div className="text-sm font-medium text-gray-700 text-center md:text-left">Quality Grade</div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <p>
                                Standard <span className="text-xs text-gray-400">(Loose)</span>
                            </p>
                            <p>Polished</p>
                            <p>Broken grain</p>
                        </div>
                    </div>
                </div>
                

                {/* Auto Generated Variants */}
                <div className="mt-6">
                    <p className="text-sm font-medium text-green-700 mb-2 text-center md:text-left">
                        Auto Generated Variants:
                    </p>

                    <div className="border rounded-md overflow-x-auto">
                        {/* Table Header */}
                        <div className="grid grid-cols-1 md:grid-cols-2 bg-[#FDEFEA] text-sm font-semibold text-gray-700 px-4 py-3 border-b min-w-[600px]">
                            <div className="col-span-1 md:col-span-2 text-center md:text-left">Options</div>
                            <div className="text-center md:text-left">Price</div>
                            <div className="text-center md:text-left">Discount Price</div>
                            <div className="text-center md:text-left">Purchas Point</div>
                            <div className="text-center md:text-left">Stock</div>
                        </div>

                        {/* Variant Row 1 */}
                        <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-3 px-4 py-3 border-b min-w-[600px]">
                            <div className="col-span-1 md:col-span-2 flex flex-wrap gap-2 justify-center md:justify-start">
                                <p>25 KG</p>
                                <p>50 KG</p>
                                <p>100 KG</p>
                            </div>
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="400 Tk"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="10%"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="100"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="22"
                            />
                        </div>

                        {/* Variant Row 2 */}
                        <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-3 px-4 py-3 min-w-[600px]">
                            <div className="col-span-1 md:col-span-2 flex flex-wrap gap-2 justify-center md:justify-start">
                                <p>25 KG</p>
                                <p>50 KG</p>
                                <p>100 KG</p>
                            </div>
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="400 Tk"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="10%"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="100"
                            />
                            <input
                                type="text"
                                className="text-sm w-full px-3 py-1.5 border rounded-md text-gray-700"
                                defaultValue="45"
                            />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Variation;