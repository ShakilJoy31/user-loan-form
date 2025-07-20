import { FaRegCreditCard, FaTags, FaTruck } from "react-icons/fa";
import { useCustomTranslator } from "@/hooks/useCustomTranslator";

export default function AdditionalInfoCard() {
    const { translate } = useCustomTranslator();

    return (
        <div>
            <h2 className="text-gray-700 font-semibold text-[15px] dark:bg-black dark:text-white">
                {translate("অতিরিক্ত তথ্য", "Additional information")}
            </h2>
            <div className="dark:bg-black dark:text-white w-full bg-white border border-gray-300 rounded-xl p-5 space-y-4 lg:max-w-[524px] max-w-full">
                <div className="dark:bg-black dark:text-white flex items-center justify-between text-sm font-medium text-gray-700">
                    <div className="flex items-center gap-2">
                        <FaRegCreditCard className="text-[#f15a29]" />
                        <span>{translate("ন্যূনতম বুকিং", "Minimum Booking")}</span>
                    </div>
                    <span className="text-[#f15a29] font-bold">500 {translate("টাকা", "Tk")}</span>
                </div>

                <div className="dark:bg-black dark:text-white flex items-center justify-between text-sm font-medium text-gray-700 border-t border-gray-300 pt-3">
                    <div className="dark:bg-black dark:text-white flex items-center gap-2">
                        <FaTags className="text-[#f15a29]" />
                        <span>{translate("ক্রয় পয়েন্ট", "Purchase Points")}</span>
                    </div>
                    <span className="text-[#f15a29] font-bold">0 {translate("টাকা", "Tk")}</span>
                </div>

                <div className="dark:bg-black dark:text-white flex items-start gap-2 border-t border-gray-300 pt-3">
                    <FaTruck className="text-[#f15a29] mt-1" />
                    <div>
                        <p className="font-semibold text-[#1d3557] dark:bg-black dark:text-white">
                            {translate("রিটার্ন ডেলিভারি", "Return Delivery")}
                        </p>
                        <p className="text-sm text-gray-500 dark:bg-black dark:text-white">
                            {translate("ফ্রি ৩০ দিন ডেলিভারি রিটার্ন।", "Free 30 days Delivery Return.")}{" "}
                            <a href="#" className="text-gray-600 underline dark:bg-black dark:text-white">
                                {translate("বিস্তারিত", "Details")}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}