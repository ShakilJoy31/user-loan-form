import { AdminSellerForgetPassword } from "@/components/main/customer/AdminSellerForgetPassword";
import SellerCreateImageSwiper from "@/components/main/seller/SellerCreateImageSwiper";


const ForgetCustomerPassword = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-10 flex flex-col lg:flex-row justify-between">
            <AdminSellerForgetPassword />
            <SellerCreateImageSwiper />
        </div>
    );
};

export default ForgetCustomerPassword;