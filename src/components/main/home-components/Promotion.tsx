import Image from "next/image";
import promotion from "../../../../assets/Home/promotion.png";
import whatsApp from "../../../../assets/Home/what'sApp.png";
import ElectroHub from "../../../../assets/Home/ElectroHub.png";
import FashionPoint from "../../../../assets/Home/FashionPoint.png";
import ElectroHub2 from "../../../../assets/Home/ElectroHub (2).png";
import { FiArrowRight } from "react-icons/fi";

const Promotion = () => {
  return (
    <div className="max-w-[413px] w-full bg-[#F4F8FF] text-black rounded-2xl p-[20px]">
      <h2 className="text-2xl font-bold my-[20px]">Special Promotios</h2>
      <div className="flex-col ">
        <Image
          width={370}
          height={283}
          src={promotion}
          alt="promotion"
          className="w-full h-full object-cover"
        />

        <Image
          width={329}
          height={244}
          src={whatsApp}
          alt="whatsApp"
          className="w-full h-full object-cover mt-[30px]"
        />
      </div>
      <h2 className="text-2xl font-bold mb-[18px] mt-[40px]">Featured Shops</h2>

      <div className="space-y-[18px]">
        <div className="max-w-[371px] max-h-[80px] rounded-xl border border-white shadow-lg">
          <div className="flex justify-between my-[17px]">
            <div className="flex gap-10">
              <div className="w-10 h-10 ml-[15px]">
                <Image
                  width={46}
                  height={46}
                  src={ElectroHub}
                  alt="ElectroHub"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h4 className="text-lg">ElectroHub</h4>
                <p className="text-sm text-gray-400"> 10 no sector, Uttara</p>
              </div>
            </div>
            <div className="text-gray-700 -rotate-45 px-4 py-2">
              <FiArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* 2nd */}
        <div className="max-w-[371px] max-h-[80px] rounded-xl border border-white shadow-lg">
          <div className="flex justify-between my-[17px]">
            <div className="flex gap-10">
              <div className="w-10 h-10 ml-[15px]">
                <Image
                  width={46}
                  height={46}
                  src={FashionPoint}
                  alt="FashionPoint"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h4 className="text-lg">FashionPoint</h4>
                <p className="text-sm text-gray-400"> 10 no sector, Uttara</p>
              </div>
            </div>
            <div className="text-gray-700 -rotate-45 px-4 py-2">
              <FiArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* 3rd */}
        <div className="max-w-[371px] max-h-[80px] rounded-xl border border-white shadow-lg">
          <div className="flex justify-between my-[17px]">
            <div className="flex gap-10">
              <div className="w-10 h-10 ml-[15px]">
                <Image
                  width={46}
                  height={46}
                  src={ElectroHub2}
                  alt="ElectroHub2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h4 className="text-lg">ElectroHub</h4>
                <p className="text-sm text-gray-400"> 10 no sector, Uttara</p>
              </div>
            </div>
            <div className="text-gray-700 -rotate-45 px-4 py-2">
              <FiArrowRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button className="max-w-[224px] max-h-[54px] border-[#FD6801] border-2 rounded-xl">
          <div className="flex items-center p-[15px]">
            <p className="text-gray-500 font-medium">See All Featured</p>
            <span className="text-gray-700 px-4 ">
              {" "}
              <FiArrowRight className="h-5 w-5" />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Promotion;
