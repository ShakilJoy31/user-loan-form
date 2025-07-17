import CustomerCreate from '@/components/main/customer/CustomerCreate';
import SellerCreateImageSwiper from '@/components/main/seller/SellerCreateImageSwiper';
import React from 'react';

const CustomerLogin = () => {
    return (
        <div className="max-w-[1280px] mx-auto my-10 flex flex-col lg:flex-row justify-between">
            <CustomerCreate />
            <SellerCreateImageSwiper />
        </div>
    );
};

export default CustomerLogin;