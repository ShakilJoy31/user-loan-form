import Image from "next/image";
import icons1 from "../../../assets/Icons/icons.png"

const WalletPoint = () => {
  return (
    <div className="lg:mt-[50px]">
        {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
        <div className="max-w-[333px] w-full max-h-[190px] rounded-[14px] bg-[#E6F9FF] p-5">
          <div className="mb-[12px]">
            <Image
              src={icons1}
              alt="icon"
              width={57}
              height={57}
              className="rounded-md border w-10 h-10 object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-center mb-[12px]">
          <h2 className=" font-semibold text-[18px]">Available Points</h2>
          <p className="font-bold text-[20px] text-[#EE5A2C]">200</p>
          </div>
          <hr className="border-gray-300 mt-[14px] mb-[8px]" />

          <p className="text-gray-400 text-[12px] font-normal">You can redeem 20 TK from your points</p>
        </div>
       
       {/* 2nd */}
        <div className="max-w-[333px] w-full max-h-[190px] rounded-[14px] bg-[#E6F9FF] p-5">
          <div className="mb-[12px]">
            <Image
              src={icons1}
              alt="icon"
              width={57}
              height={57}
              className="rounded-md border w-10 h-10 object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-center mb-[12px]">
          <h2 className=" font-semibold text-[18px]">Available Points</h2>
          <p className="font-bold text-[20px] text-[#EE5A2C]">200</p>
          </div>
          <hr className="border-gray-300 mt-[14px] mb-[8px]" />

          <p className="text-gray-400 text-[12px] font-normal">You can redeem 20 TK from your points</p>
        </div>

        {/* 3rd */}
         <div className="max-w-[333px] w-full max-h-[190px] rounded-[14px] bg-[#E6F9FF] p-5">
          <div className="mb-[12px]">
            <Image
              src={icons1}
              alt="icon"
              width={57}
              height={57}
              className="rounded-md border w-10 h-10 object-cover"
            />
          </div>
          <div className="flex justify-between items-center text-center mb-[12px]">
          <h2 className=" font-semibold text-[18px]">Available Points</h2>
          <p className="font-bold text-[20px] text-[#EE5A2C]">200</p>
          </div>
          <hr className="border-gray-300 mt-[14px] mb-[8px]" />

          <p className="text-gray-400 text-[12px] font-normal">You can redeem 20 TK from your points</p>
        </div>
      
      </div>

    </div>
  );
};

export default WalletPoint;
