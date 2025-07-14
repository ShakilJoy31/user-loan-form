"use client";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

const Tabs = ["Specifications", "Description", "Reviews"];

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("Specifications");

  return (
    <div className="mt-10 space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-4 justify-between bg-[#FDEFEA] rounded-full p-[5px] h-[56px] ">
        {Tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium w-full hover:cursor-pointer h-full transition-all
              ${
                activeTab === tab
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-700 hover:text-black"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Specifications" && (
        <div className="space-y-6 text-sm">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Awei F34 Fan Specifications
            </h2>
            <div className="mt-4 space-y-2 text-gray-700">
              <SpecItem label="Brand" value="Awei" />
              <SpecItem label="Model" value="F34" />
              <SpecItem
                label="Battery"
                value="4000mAh rechargeable lithium battery"
              />
              <SpecItem
                label="Battery Life"
                value="Up to 10 hours on a single charge"
              />
              <SpecItem
                label="Airflow"
                value="Optimized long duct design for strong wind circulation"
              />
              <SpecItem
                label="Portability"
                value="Foldable, compact, and lightweight for easy transport"
              />
              <SpecItem
                label="Adjustability"
                value="Multiple speed settings and flexible angle adjustment"
              />
              <SpecItem
                label="Charging"
                value="USB-powered for convenient recharging"
              />
            </div>
          </div>
          <BenefitsSection />
        </div>
      )}

      {activeTab === "Description" && (
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Product Description
            </h2>
            <p className="mt-3">
                
              When it’s colder than the far side of the moon and spitting rain
              too, you’ve still got to look good. From water-repellent leather
              to a rugged outsole, the Lunar Force 1 adapts AF-1 style, so you
              can keep your flame burning when the weather hits. Metal lace
              hardware and extended tongue bring mountain boot toughness, while
              the star-studded toe design gives your look the edge.
            </p>
          </div>
          <BenefitsSection />
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Product Details
            </h2>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-blue-500 mt-1" size={16} />
                <span>
                  Not intended for use as Personal Protective Equipment
                </span>
              </li>
              <li className="ml-6">
                <span className="text-orange-600 font-semibold cursor-pointer hover:underline">
                  See More
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === "Reviews" && (
        <div className="space-y-6 text-sm text-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Customers Feedback
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-orange-100 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-orange-500">4.8</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-700">Product Rating</div>
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
              title="Great Product"
              content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour"
            />
            <ReviewCard
              name="Nicolas cage"
              daysAgo={3}
              rating={5}
              title="The best product in Market"
              content="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 200 years old."
            />
            <div className="text-right">
              <button className="text-orange-600 font-semibold hover:underline">
                View All Review
              </button>
            </div>
          </div>

          {/* Write a Review */}
          <div className="pt-4">
            <h3 className="text-base font-semibold text-gray-800">
              Write a Review
            </h3>
            <p className="mt-1">What is it like to Product?</p>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400" size={18} fill="currentColor" />
              ))}
            </div>
            <div className="mt-[30px]">
                <h1>Review Title</h1>
              <input
                type="text"
                placeholder="Review Title"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="mt-[30px]">
                <h1>Review Content</h1>
              <textarea
                placeholder="Review Content"
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using ‘Content here, content here’, making it look like readable English.
              </textarea>
            </div>

            <button
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all bg-orange-500 text-white shadow-sm w-[185px] mt-[50px]`}
          >
            Submit
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
  const benefits = [
    "Durable leather is easily cleanable so you can keep your look fresh.",
    "Water-repellent finish and internal membrane help keep your feet dry.",
    "Toe piece with star pattern adds durability.",
    "Synthetic insulation helps keep you warm.",
    "Originally designed for performance hoops, the Air unit delivers lightweight cushioning.",
    "Plush tongue wraps over the ankle to help keep out the moisture and cold.",
    "Rubber outsole with aggressive traction pattern adds durable grip.",
    "Durable leather is easily cleanable so you can keep your look fresh.",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Benefits</h2>
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
  return (
    <div className="bg-gray-50 p-4 rounded-md border border-gray-300 space-y-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
          {name.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-gray-800">{name}</div>
          <div className="text-xs text-gray-500">{daysAgo} days ago</div>
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
        <span>👍 Like</span>
        <span>💬 Reply</span>
      </div>
    </div>
  );
}
