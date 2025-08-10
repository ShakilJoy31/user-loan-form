"use client";

import React from "react";
import Image from "next/image";
import serviceImage from "../../assets/Home/custom-service.jpg";
import Button from "../reusable-components/Button";
import Heading from "../reusable-components/Heading";
import Paragraph from "../reusable-components/Paragraph";

// Service Data
const services = [
    {
        id: "001",
        title: "UI/UX Design",
        image: serviceImage.src,
    },
    {
        id: "002",
        title: "Web Development",
        image: serviceImage.src,
    },
    {
        id: "003",
        title: "Web Design",
        image: serviceImage.src,
    },
    {
        id: "004",
        title: "Online Ticketing Solution",
        image: serviceImage.src,
    },
    {
        id: "005",
        title: "Business & Enterprise Solutions",
        image: serviceImage.src,
    },
];

const CustomServices = () => {
    return (
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12 md:py-16">
            <Heading className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">
                Custom Software <br className="hidden sm:block" />
                <span className="text-[#1673FF]">Development Services</span>
            </Heading>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
                {/* Left text - hidden on mobile, shown on tablet and up */}
                <div className="hidden sm:flex items-start justify-center lg:justify-start">
                    <Paragraph className="text-gray-300 max-w-[200px] text-xs sm:text-sm leading-relaxed">
                        We are here to build solid and courageous brands that can leave a
                        strong mark on the world.
                    </Paragraph>
                </div>

                {/* Middle title */}
                <div className="lg:col-span-2">
                    {/* Service list */}
                    <div className="space-y-4 sm:space-y-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition"
                            >
                                <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto mb-2 sm:mb-0">
                                    <span className="text-gray-400 font-medium text-sm sm:text-base">
                                        ({service.id})
                                    </span>
                                    <Paragraph className="font-semibold text-base sm:text-lg">
                                        {service.title}
                                    </Paragraph>
                                </div>
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    width={80}
                                    height={60}
                                    className="rounded-lg object-cover w-full sm:w-auto h-12 sm:h-auto"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Explore button */}
                    <div className="mt-6 sm:mt-8 flex justify-center sm:justify-end">
                        <Button 
                            onClick={() => {}} 
                            className="bg-[#1776BB] hover:bg-[#0f5ed1] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center gap-2 transition text-sm sm:text-base"
                        >
                            Explore All
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomServices;