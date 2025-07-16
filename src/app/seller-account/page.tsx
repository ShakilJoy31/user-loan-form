import SellerCreate from "@/components/main/seller/SellerCreate";
import SellerCreateImageSwiper from "@/components/main/seller/SellerCreateImageSwiper";



const SellerLogin = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-10 flex flex-col lg:flex-row justify-between">
           <SellerCreate />
            <SellerCreateImageSwiper />
        </div>
    );
};

export default SellerLogin;