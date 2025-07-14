import React from 'react';
import DropdownSearch from './DropdownSearch';

const ShopLocationAndCategory: React.FC = () => {
    return (
        <div className='w-full'>
            <h2>Find shops via Locations & Category</h2>
            <DropdownSearch></DropdownSearch>
        </div>
    );
};

export default ShopLocationAndCategory;