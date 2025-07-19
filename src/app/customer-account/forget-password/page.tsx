import { ForgetPassword } from "@/components/main/customer/ForgetPassword";
import SellerCreateImageSwiper from "@/components/main/seller/SellerCreateImageSwiper";


const ForgetCustomerPassword = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-10 flex flex-col lg:flex-row justify-between">
            <ForgetPassword />
            <SellerCreateImageSwiper />
        </div>
    );
};

export default ForgetCustomerPassword;