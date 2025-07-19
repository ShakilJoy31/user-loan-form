
import { AdminLogin } from '@/components/main/Login/AdminLogin';
import SellerCreateImageSwiper from '@/components/main/seller/SellerCreateImageSwiper';
import React from 'react';

const AdminAuth = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-10 flex flex-col lg:flex-row justify-between">
            <AdminLogin />
            <SellerCreateImageSwiper />
        </div>
    );
};

export default AdminAuth;