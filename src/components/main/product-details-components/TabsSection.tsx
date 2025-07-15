"use client";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

 const Tabs = [
        "Specifications",
        "Description",
       "Reviews"
    ];

export default function TabsSection() {
    const { translate } = useCustomTranslator();
   
    const [activeTab, setActiveTab] = useState(Tabs[0]);


    return (
        <div className="mt-10 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-4 justify-between bg-[#FDEFEA] rounded-full p-[5px] h-[56px] ">
                {Tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium w-full hover:cursor-pointer h-full transition-all
              ${activeTab === tab
                                ? "bg-orange-500 text-white shadow-sm"
                                : "text-gray-700 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === Tabs[0] && (
                <div className="space-y-6 text-sm">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {translate("Awei F34 ফ্যান স্পেসিফিকেশন", "Awei F34 Fan Specifications")}
                        </h2>
                        <div className="mt-4 space-y-2 text-gray-700">
                            <SpecItem
                                label={translate("ব্র্যান্ড", "Brand")}
                                value="Awei"
                            />
                            <SpecItem
                                label={translate("মডেল", "Model")}
                                value="F34"
                            />
                            <SpecItem
                                label={translate("ব্যাটারি", "Battery")}
                                value={translate("4000mAh রিচার্জেবল লিথিয়াম ব্যাটারি", "4000mAh rechargeable lithium battery")}
                            />
                            <SpecItem
                                label={translate("ব্যাটারি লাইফ", "Battery Life")}
                                value={translate("একটি চার্জে ১০ ঘণ্টা পর্যন্ত", "Up to 10 hours on a single charge")}
                            />
                            <SpecItem
                                label={translate("এয়ারফ্লো", "Airflow")}
                                value={translate("শক্তিশালী বায়ু প্রবাহের জন্য অপ্টিমাইজড লং ডাক্ট ডিজাইন", "Optimized long duct design for strong wind circulation")}
                            />
                            <SpecItem
                                label={translate("পোর্টেবিলিটি", "Portability")}
                                value={translate("ভাঁজযোগ্য, কমপ্যাক্ট এবং হালকা ওজন সহজ পরিবহনের জন্য", "Foldable, compact and lightweight for easy transport")}
                            />
                            <SpecItem
                                label={translate("অ্যাডজাস্টেবিলিটি", "Adjustability")}
                                value={translate("একাধিক স্পিড সেটিং এবং নমনীয় কোণ সমন্বয়", "Multiple speed settings and flexible angle adjustment")}
                            />
                            <SpecItem
                                label={translate("চার্জিং", "Charging")}
                                value={translate("সুবিধাজনক রিচার্জিংয়ের জন্য USB-পাওয়ার্ড", "USB-powered for convenient recharging")}
                            />
                        </div>
                    </div>
                    <BenefitsSection />
                </div>
            )}

            {activeTab === Tabs[1] && (
                <div className="space-y-6 text-sm text-gray-700">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {translate("পণ্যের বিবরণ", "Product Description")}
                        </h2>
                        <p className="mt-3">
                            {translate(
                                "যখন চাঁদের অন্ধকার দিকের চেয়েও ঠান্ডা এবং বৃষ্টিও পড়ছে, তখনও আপনাকে ভালো দেখাতে হবে। জল-বিকর্ষক চামড়া থেকে একটি রাগড আউটসোল পর্যন্ত, লুনার ফোর্স 1 AF-1 স্টাইলকে অভিযোজিত করে, যাতে আপনি আপনার শিখা জ্বালিয়ে রাখতে পারেন যখন আবহাওয়া আঘাত করে। ধাতব লেস হার্ডওয়্যার এবং বর্ধিত জিহ্বা পর্বত বুটের কঠোরতা আনে, যখন তারকাখচিত পায়ের আঙ্গুলের নকশা আপনার চেহারাকে প্রান্ত দেয়।",
                                "When it's colder than the far side of the moon and spitting rain too, you've still got to look good. From water-repellent leather to a rugged outsole, the Lunar Force 1 adapts AF-1 style, so you can keep your flame burning when the weather hits. Metal lace hardware and extended tongue bring mountain boot toughness, while the star-studded toe design gives your look the edge."
                            )}
                        </p>
                    </div>
                    <BenefitsSection />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {translate("পণ্যের বিবরণ", "Product Details")}
                        </h2>
                        <ul className="mt-3 space-y-2">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="text-blue-500 mt-1" size={16} />
                                <span>
                                    {translate(
                                        "পার্সোনাল প্রোটেক্টিভ ইকুইপমেন্ট হিসাবে ব্যবহারের উদ্দেশ্যে নয়",
                                        "Not intended for use as Personal Protective Equipment"
                                    )}
                                </span>
                            </li>
                            <li className="ml-6">
                                <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
                                    {translate("আরও দেখুন", "See More")}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}

            {activeTab === Tabs[2] && (
                <div className="space-y-6 text-sm text-gray-700">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            {translate("গ্রাহকদের প্রতিক্রিয়া", "Customers Feedback")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="bg-orange-100 rounded-xl p-6 text-center">
                                <div className="text-4xl font-bold text-orange-500">4.8</div>
                                <div className="flex justify-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <div className="mt-2 text-sm text-gray-700">
                                    {translate("পণ্য রেটিং", "Product Rating")}
                                </div>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-6">
                                <div className="space-y-2">
                                    <div className="bg-orange-400 h-1 rounded w-5/6"></div>
                                    <div className="bg-orange-300 h-1 rounded w-4/6"></div>
                                    <div className="bg-orange-200 h-1 rounded w-3/6"></div>
                                    <div className="bg-orange-100 h-1 rounded w-2/6"></div>
                                    <div className="bg-orange-50 h-1 rounded w-1/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        <ReviewCard
                            name="Puja Saha"
                            daysAgo={3}
                            rating={5}
                            title={translate("দারুণ পণ্য", "Great Product")}
                            content={translate(
                                "লরেম ইপসামের প্যাসেজের অনেক বৈচিত্র্য পাওয়া যায়, তবে বেশিরভাগই কিছু রূপে পরিবর্তনের শিকার হয়েছে, ইনজেক্ট করা হিউমার দ্বারা",
                                "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
                            )}
                        />
                        <ReviewCard
                            name="Nicolas cage"
                            daysAgo={3}
                            rating={5}
                            title={translate("বাজারে সেরা পণ্য", "The best product in Market")}
                            content={translate(
                                "জনপ্রিয় বিশ্বাসের বিপরীতে, লরেম ইপসাম কেবল এলোমেলো পাঠ্য নয়। এটি 45 খ্রিস্টপূর্বাব্দের একটি ধ্রুপদী ল্যাটিন সাহিত্যের টুকরো থেকে শিকড় রয়েছে, এটি 2000 বছরেরও বেশি পুরানো।",
                                "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
                            )}
                        />
                        <div className="text-right">
                            <button className="text-orange-600 font-semibold hover:underline">
                                {translate("সমস্ত রিভিউ দেখুন", "View All Review")}
                            </button>
                        </div>
                    </div>

                    {/* Write a Review */}
                    <div className="pt-4">
                        <h3 className="text-base font-semibold text-gray-800">
                            {translate("একটি রিভিউ লিখুন", "Write a Review")}
                        </h3>
                        <p className="mt-1">
                            {translate("পণ্যটি কেমন?", "What is it like to Product?")}
                        </p>
                        <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                            ))}
                        </div>
                        <div className="mt-[30px]">
                            <h1>{translate("রিভিউ শিরোনাম", "Review Title")}</h1>
                            <input
                                type="text"
                                placeholder={translate("রিভিউ শিরোনাম", "Review Title")}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                            />
                        </div>
                        <div className="mt-[30px]">
                            <h1>{translate("রিভিউ বিষয়বস্তু", "Review Content")}</h1>
                            <textarea
                                placeholder={translate("রিভিউ বিষয়বস্তু", "Review Content")}
                                rows={4}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                                defaultValue={
                                    translate(
                                        "এটি একটি দীর্ঘ প্রতিষ্ঠিত সত্য যে একজন পাঠক পৃষ্ঠার বিন্যাস দেখার সময় পঠনযোগ্য বিষয়বস্তু দ্বারা বিভ্রান্ত হবে। লরেম ইপসাম ব্যবহার করার বিষয়টি হল এটিতে অক্ষরের একটি কম-বেশি স্বাভাবিক বন্টন রয়েছে, 'এখানে বিষয়বস্তু, বিষয়বস্তু এখানে' ব্যবহারের বিপরীতে, এটিকে পড়ার মতো ইংরেজি দেখায়।",
                                        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                                    )
                                }
                            />
                        </div>

                        <button
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-orange-500 text-white shadow-sm w-[185px] mt-[50px]`}
                        >
                            {translate("জমা দিন", "Submit")}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Specs Row Item
function SpecItem({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <strong className="text-gray-900">{label}:</strong>{" "}
            <span className="text-gray-700">{value}</span>
        </div>
    );
}

// Reusable Benefits Section
function BenefitsSection() {
    const { translate } = useCustomTranslator();
    const benefits = [
        translate(
            "টেকসই চামড়া সহজেই পরিষ্কারযোগ্য যাতে আপনি আপনার চেহারা সতেজ রাখতে পারেন।",
            "Durable leather is easily cleanable so you can keep your look fresh."
        ),
        translate(
            "জল-বিকর্ষক ফিনিস এবং অভ্যন্তরীণ ঝিল্লি আপনার পা শুষ্ক রাখতে সাহায্য করে।",
            "Water-repellent finish and internal membrane help keep your feet dry."
        ),
        translate(
            "তারকা প্যাটার্ন সহ টো পিস টেকসইতা যোগ করে।",
            "Toe piece with star pattern adds durability."
        ),
        translate(
            "সিন্থেটিক ইনসুলেশন আপনাকে গরম রাখতে সাহায্য করে।",
            "Synthetic insulation helps keep you warm."
        ),
        translate(
            "মূলত পারফরম্যান্স হুপসের জন্য ডিজাইন করা, এয়ার ইউনিট হালকা ওজনের কুশনিং সরবরাহ করে।",
            "Originally designed for performance hoops, the Air unit delivers lightweight cushioning."
        ),
        translate(
            "আলগা জিহ্বা গোড়ালির উপর মোড়ানো আর্দ্রতা এবং ঠান্ডা রাখতে সাহায্য করে।",
            "Plush tongue wraps over the ankle to help keep out the moisture and cold."
        ),
        translate(
            "আক্রমনাত্মক ট্র্যাকশন প্যাটার্ন সহ রাবার আউটসোল টেকসই গ্রিপ যোগ করে।",
            "Rubber outsole with aggressive traction pattern adds durable grip."
        ),
        translate(
            "টেকসই চামড়া সহজেই পরিষ্কারযোগ্য যাতে আপনি আপনার চেহারা সতেজ রাখতে পারেন।",
            "Durable leather is easily cleanable so you can keep your look fresh."
        ),
    ];

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-800">
                {translate("সুবিধা", "Benefits")}
            </h2>
            <ul className="mt-3 space-y-2">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle2 className="text-blue-500 mt-1" size={16} />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// Individual Review Card
function ReviewCard({
    name,
    daysAgo,
    rating,
    title,
    content,
}: {
    name: string;
    daysAgo: number;
    rating: number;
    title: string;
    content: string;
}) {
    const { translate } = useCustomTranslator();
    return (
        <div className="bg-gray-50 p-4 rounded-md border border-gray-300 space-y-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="font-semibold text-gray-800">{name}</div>
                    <div className="text-xs text-gray-500">
                        {translate(`${daysAgo} দিন আগে`, `${daysAgo} days ago`)}
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                ))}
            </div>
            <div className="font-medium text-gray-800">{title}</div>
            <p className="text-gray-600">{content}</p>
            <div className="flex gap-4 mt-2 text-sm text-blue-600 font-medium cursor-pointer">
                <span>{translate("👍 পছন্দ", "👍 Like")}</span>
                <span>{translate("💬 উত্তর", "💬 Reply")}</span>
            </div>
        </div>
    );
}