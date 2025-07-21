"use client";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";
import { Button } from "@/components/ui/button";

interface Specification {
  label: string;
  value: string;
}

interface Review {
  name: string;
  daysAgo: number;
  rating: number;
  title: string;
  content: string;
}

interface TabsSectionProps {
  specifications?: Specification[] | null;
  description?: string | null;
  reviews?: Review[] | null;
  rating?: number;
  productName?: string;
}

const Tabs = [
  "Specifications",
  "Description",
  "Reviews"
];

export default function TabsSection({
  specifications,
  description,
  reviews,
  rating = 0,
  productName = ""
}: TabsSectionProps) {
  const { translate } = useCustomTranslator();
  const [activeTab, setActiveTab] = useState(Tabs[0]);

  return (
    <div className="mt-10 space-y-6  dark:text-white">
      {/* Tabs */}
      <div className="dark:bg-black dark:text-white flex items-center gap-4 justify-between bg-[#FDEFEA] rounded-full p-[5px] h-[56px] ">
        {Tabs.map((tab) => (
          <Button 
            variant={'outline'}
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4  py-1.5 rounded-full text-sm font-medium w-full hover:cursor-pointer h-full transition-all
              ${activeTab === tab
                ? "bg-orange-500 text-white shadow-sm dark:bg-orange-500"
                : "text-gray-700 hover:text-black"
              }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Specifications */}
      {activeTab === Tabs[0] && (
        <div className="space-y-6 text-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800  dark:text-white">
              {translate(`${productName} Specifications`, `${productName} Specifications`)}
            </h2>
            {specifications ? (
              <div className="mt-4 space-y-2 text-gray-700">
                {specifications.map((spec, index) => (
                  <SpecItem
                    key={index}
                    label={translate(spec.label, spec.label)}
                    value={spec.value}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-3 text-gray-500  dark:text-white">
                {translate("স্পেসিফিকেশন পাওয়া যায়নি", "No specifications available")}
              </p>
            )}
          </div>
          <BenefitsSection />
        </div>
      )}

      {/* Description */}
      {activeTab === Tabs[1] && (
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800  dark:text-white">
              {translate("পণ্যের বিবরণ", "Product Description")}
            </h2>
            {description ? (
              <p className="mt-3">{description}</p>
            ) : (
              <p className="mt-3 text-gray-500  dark:text-white">
                {translate("বিবরণ পাওয়া যায়নি", "No description available")}
              </p>
            )}
          </div>
          <BenefitsSection />
          <div>
            <h2 className="text-lg font-semibold text-gray-800  dark:text-white">
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
                <span className="text-orange-600 font-semibold cursor-pointer hover:underline dark:bg-black dark:text-white">
                  {translate("আরও দেখুন", "See More")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Review */}
      {activeTab === Tabs[2] && (
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800  dark:text-white">
              {translate("গ্রাহকদের প্রতিক্রিয়া", "Customers Feedback")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 dark:bg-black dark:text-white">
              <div className="bg-orange-100 rounded-xl p-6 text-center dark:bg-black dark:text-white dark:border dark:border-white">
                <div className="text-4xl font-bold text-orange-500">{rating.toFixed(1)}</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      size={18} 
                      fill={i < rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  {translate("পণ্য রেটিং", "Product Rating")}
                </div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 dark:bg-black dark:text-white dark:border dark:border-white">
                <div className="space-y-2 dark:bg-black dark:text-white">
                  <div className="bg-orange-400 h-1 rounded w-5/6  dark:border dark:border-white"></div>
                  <div className="bg-orange-300 h-1 rounded w-4/6  dark:border dark:border-white"></div>
                  <div className="bg-orange-200 h-1 rounded w-3/6  dark:border dark:border-white"></div>
                  <div className="bg-orange-100 h-1 rounded w-2/6  dark:border dark:border-white"></div>
                  <div className="bg-orange-50 h-1 rounded w-1/6  dark:border dark:border-white"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-6  dark:text-white">
            {reviews && reviews.length > 0 ? (
              <>
                {reviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    name={review.name}
                    daysAgo={review.daysAgo}
                    rating={review.rating}
                    title={review.title}
                    content={review.content}
                  />
                ))}
                <div className="text-right">
                  <Button variant={'outline'} className="text-orange-600 font-semibold hover:underline">
                    {translate("সমস্ত রিভিউ দেখুন", "View All Review")}
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-gray-500  dark:text-white">
                {translate("কোন রিভিউ পাওয়া যায়নি", "No reviews available")}
              </p>
            )}
          </div>

          {/* Write a Review */}
          <div className="pt-4  dark:text-white">
            <h3 className="text-base font-semibold text-gray-800  dark:text-white">
              {translate("একটি রিভিউ লিখুন", "Write a Review")}
            </h3>
            <p className="mt-1  dark:text-white">
              {translate("পণ্যটি কেমন?", `What is it like to ${productName}?`)}
            </p>
            <div className="flex gap-1 mt-2  dark:text-white">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
              ))}
            </div>
            <div className="mt-[30px]  dark:text-white">
              <h1>{translate("রিভিউ শিরোনাম", "Review Title")}</h1>
              <input
                type="text"
                placeholder={translate("রিভিউ শিরোনাম", "Review Title")}
                className="w-full  dark:text-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="mt-[30px]  dark:text-white">
              <h1>{translate("রিভিউ বিষয়বস্তু", "Review Content")}</h1>
              <textarea
                placeholder={translate("রিভিউ বিষয়বস্তু", "Review Content")}
                rows={4}
                className="w-full  dark:text-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <Button variant={'outline'}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-orange-500 text-white shadow-sm w-[185px] mt-[50px] dark:bg-black dark:text-white`}
            >
              {translate("জমা দিন", "Submit")}
            </Button>
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
            <h2 className="text-lg font-semibold text-gray-800  dark:text-white">
                {translate("সুবিধা", "Benefits")}
            </h2>
            <ul className="mt-3 space-y-2  dark:text-white">
                {benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700  dark:text-white">
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
        <div className="bg-gray-50 p-4 rounded-md border border-gray-300 space-y-2 dark:bg-black dark:text-white">
            <div className="dark:bg-black dark:text-white flex items-center gap-3">
                <div className="dark:bg-black dark:text-white w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {name.charAt(0)}
                </div>
                <div className="dark:bg-black dark:text-white">
                    <div className="font-semibold text-gray-800 dark:bg-black dark:text-white">{name}</div>
                    <div className="text-xs text-gray-500 dark:bg-black dark:text-white">
                        {translate(`${daysAgo} দিন আগে`, `${daysAgo} days ago`)}
                    </div>
                </div>
            </div>
            <div className="flex gap-1 dark:bg-black dark:text-white">
                {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 dark:bg-black dark:text-white" size={16} fill="currentColor" />
                ))}
            </div>
            <div className="font-medium text-gray-800 dark:bg-black dark:text-white">{title}</div>
            <p className="text-gray-600 dark:bg-black dark:text-white">{content}</p>
            <div className="flex gap-4 mt-2 text-sm text-blue-600 font-medium cursor-pointer dark:bg-black dark:text-white">
                <span>{translate("👍 পছন্দ", "👍 Like")}</span>
                <span>{translate("💬 উত্তর", "💬 Reply")}</span>
            </div>
        </div>
    );
}