import { List, ListIcon } from "lucide-react";
import { ComponentType } from "react";
import { FaProductHunt } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import { LuContact } from "react-icons/lu";
import { MdCategory } from "react-icons/md";

type Language = "en" | "bn";

export interface INavigationLink {
  icon?: IconType | ComponentType<{ className?: string }>;
  label: Record<Language, string>;
  key: string;
  href?: string;
  subLinks?: INavigationLink[];
  subSubLinks?: INavigationLink[];
}

const admindashboardRootLinks: INavigationLink = {
  icon: LuContact,
  label: {
    en: "Dashboard",
    bn: "ড্যাশবোর্ড",
  },
  key: "/proyojon-admin-portal/admin-home",
  href: "/proyojon-admin-portal/admin-home",
};

const adminDashboardProduct: INavigationLink = {
  icon: MdCategory,
  label: {
    en: "Products",
    bn: "পণ্য",
  },
  key: "product-list",
  href: "/proyojon-admin-portal/product-list",
  subLinks: [
     {
      icon: MdCategory,
      label: {
        en: "Variation",
        bn: "সমস্ত পণ্য"
      },
      key: "variation-list",
      href: "/proyojon-admin-portal/variation-list",
      subSubLinks: [
         {
          icon: MdCategory,
          label: {
            en: "Variation List",
            bn: "বিভাগ অনুযায়ী তারতম্য"
          },
          key: "variation-list",
          href: "/proyojon-admin-portal/variation-list",
        },
        {
          icon: MdCategory,
          label: {
            en: "Variation Option",
            bn: "বিভাগ অনুযায়ী তারতম্য"
          },
          key: "variation-option",
          href: "/proyojon-admin-portal/variation-option",
        },
        {
          icon: MdCategory,
          label: {
            en: "Category Wise Variation",
            bn: "পণ্যের বৈচিত্র্য অপশন"
          },
          key: "category-wise-variation",
          href: "/proyojon-admin-portal/category-wise-variation",
        },
      ],
    },
    {
      icon: MdCategory,
      label: {
        en: "All Products",
        bn: "সমস্ত পণ্য",
      },
      key: "product-list",
      href: "/proyojon-admin-portal/product-list",
      subSubLinks: [
        {
          icon: MdCategory,
          label: {
            en: "Product Catalog",
            bn: "পণ্য ক্যাটালগ",
          },
          key: "product-list",
          href: "/proyojon-admin-portal/product-list",
        },
      ],
    },

    // {
    //   icon: MdCategory,
    //   label: {
    //     en: "Attributes",
    //     bn: "অ্যাট্রিবিউট"
    //   },
    //   key: "storage-list",
    //   href: "/proyojon-admin-portal/storage-list",
    //   subSubLinks: [
    //     {
    //       icon: ListIcon,
    //       label: {
    //         en: "New Attribute",
    //         bn: "নতুন অ্যাট্রিবিউট"
    //       },
    //       key: "feature-key-list",
    //       href: "/proyojon-admin-portal/feature-key-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Ram List",
    //         bn: "র্যাম তালিকা"
    //       },
    //       key: "ram-list",
    //       href: "/proyojon-admin-portal/ram-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Rom List",
    //         bn: "রম তালিকা"
    //       },
    //       key: "rom-list",
    //       href: "/proyojon-admin-portal/rom-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Sim List",
    //         bn: "সিম তালিকা"
    //       },
    //       key: "sim-list",
    //       href: "/proyojon-admin-portal/sim-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Region List",
    //         bn: "অঞ্চল তালিকা"
    //       },
    //       key: "region-list",
    //       href: "/proyojon-admin-portal/region-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Chipset List",
    //         bn: "চিপসেট তালিকা"
    //       },
    //       key: "chipset-list",
    //       href: "/proyojon-admin-portal/chipset-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Material List",
    //         bn: "উপাদান তালিকা"
    //       },
    //       key: "strap-marerial-list",
    //       href: "/proyojon-admin-portal/strap-marerial-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Connectivity List",
    //         bn: "সংযোগ তালিকা"
    //       },
    //       key: "connectivity-list",
    //       href: "/proyojon-admin-portal/connectivity-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Connector List",
    //         bn: "কানেক্টর তালিকা"
    //       },
    //       key: "connector-type-list",
    //       href: "/proyojon-admin-portal/connector-type-list",
    //     },
    //     {
    //       icon: List,
    //       label: {
    //         en: "Plug List",
    //         bn: "প্লাগ তালিকা"
    //       },
    //       key: "plug-type-list",
    //       href: "/proyojon-admin-portal/plug-type-list",
    //     },
    //     {
    //       icon: MdCategory,
    //       label: {
    //         en: "Color List",
    //         bn: "রঙের তালিকা"
    //       },
    //       key: "color-list",
    //       href: "/proyojon-admin-portal/color-list",
    //     },
    //     {
    //       icon: MdCategory,
    //       label: {
    //         en: "Size List",
    //         bn: "আকার তালিকা"
    //       },
    //       key: "size-list",
    //       href: "/proyojon-admin-portal/size-list",
    //     },
    //   ],
    // },
    {
      icon: MdCategory,
      label: {
        en: "Partial Entry",
        bn: "আংশিক এন্ট্রি",
      },
      key: "partial-entry",
      href: "/proyojon-admin-portal/partial-entry",
      subSubLinks: [
        {
          icon: MdCategory,
          label: {
            en: "Category List",
            bn: "ক্যাটাগরি তালিকা",
          },
          key: "category_list",
          href: "/proyojon-admin-portal/category_list",
        },
        {
          icon: MdCategory,
          label: {
            en: "SubCategory List",
            bn: "সাবক্যাটাগরি তালিকা",
          },
          key: "sub_category_list",
          href: "/proyojon-admin-portal/sub_category_list",
        },
        {
          icon: MdCategory,
          label: {
            en: "Brand List",
            bn: "ব্র্যান্ড তালিকা",
          },
          key: "brand-list",
          href: "/proyojon-admin-portal/brand-list",
        },
        {
          icon: List,
          label: {
            en: "HighLight Text List",
            bn: "হাইলাইট টেক্সট তালিকা",
          },
          key: "highlight-text-list",
          href: "/proyojon-admin-portal/highlight-text-list",
        },
        {
          icon: ListIcon,
          label: {
            en: "Feature",
            bn: "ফিচার",
          },
          key: "feature-list",
          href: "/proyojon-admin-portal/feature-list",
        },
        {
          icon: List,
          label: {
            en: "Vendor List",
            bn: "ভেন্ডর তালিকা",
          },
          key: "vendor-list",
          href: "/proyojon-admin-portal/vendor-list",
        },
        {
          icon: ListIcon,
          label: {
            en: "Conditions List",
            bn: "শর্তাবলী তালিকা",
          },
          key: "condition-list",
          href: "/proyojon-admin-portal/condition-list",
        },
        {
          icon: ListIcon,
          label: {
            en: "Search Placeholder List",
            bn: "সার্চ প্লেসহোল্ডার তালিকা",
          },
          key: "search-list",
          href: "/proyojon-admin-portal/search-list",
        },
        {
          icon: MdCategory,
          label: {
            en: "Banner List",
            bn: "ব্যানার তালিকা",
          },
          key: "banner-list",
          href: "/proyojon-admin-portal/banner-list",
        },
        {
          icon: MdCategory,
          label: {
            en: "Small Banner List",
            bn: "ছোট ব্যানার তালিকা",
          },
          key: "small-banner-list",
          href: "/proyojon-admin-portal/small-banner-list",
        },
        {
          icon: List,
          label: {
            en: "Extra-Warranty List",
            bn: "অতিরিক্ত ওয়ারেন্টি তালিকা",
          },
          key: "warranty-list",
          href: "/proyojon-admin-portal/warranty-list",
        },
        {
          icon: List,
          label: {
            en: "Regular Warranty",
            bn: "নিয়মিত ওয়ারেন্টি",
          },
          key: "regular-warranty",
          href: "/proyojon-admin-portal/regular-warranty",
        },
        {
          icon: List,
          label: {
            en: "Warranty Info",
            bn: "ওয়ারেন্টি তথ্য",
          },
          key: "warranty-info",
          href: "/proyojon-admin-portal/warranty-info",
        },
      ],
    },
  ],
};
const adminDashboardOrders: INavigationLink = {
  icon: List,
  label: {
    en: "Orders",
    bn: "অর্ডার",
  },
  key: "order-list",
  href: "/kry-admin-portal/order-list",
  subLinks: [
    {
      icon: List,
      label: {
        en: "Create Order",
        bn: "অর্ডার তৈরি করুন",
      },
      key: "create-order",
      href: "/kry-admin-portal/create-order",
    },
    {
      icon: List,
      label: {
        en: "Orders List",
        bn: "অর্ডার তালিকা",
      },
      key: "order-list",
      href: "/kry-admin-portal/order-list",
    },
    {
      icon: List,
      label: {
        en: "Pre-Orders List",
        bn: "প্রি-অর্ডার তালিকা",
      },
      key: "pre-order-list",
      href: "/kry-admin-portal/pre-order-list",
    },
    {
      icon: List,
      label: {
        en: "Pre-Orders Form List",
        bn: "প্রি-অর্ডার ফর্ম তালিকা",
      },
      key: "pre-order-form-list",
      href: "/kry-admin-portal/pre-order-form-list",
    },
    {
      icon: List,
      label: {
        en: "Order Return",
        bn: "অর্ডার রিটার্ন",
      },
      key: "return-order-list",
      href: "/kry-admin-portal/return-order-list",
    },
    {
      icon: List,
      label: {
        en: "Tracking",
        bn: "ট্র্যাকিং",
      },
      key: "tracking",
      href: "/kry-admin-portal/tracking",
    },
    {
      icon: List,
      label: {
        en: "Shipping Method",
        bn: "শিপিং পদ্ধতি",
      },
      key: "shipping-method",
      href: "/kry-admin-portal/shipping-method",
    },
    {
      icon: List,
      label: {
        en: "Notice",
        bn: "নোটিশ",
      },
      key: "notice",
      href: "/kry-admin-portal/notice",
    },
    {
      icon: MdCategory,
      label: {
        en: "Announcement",
        bn: "ঘোষণা",
      },
      key: "announcement",
      href: "/kry-admin-portal/announcement",
      subSubLinks: [
        {
          icon: List,
          label: {
            en: "Title Announcement",
            bn: "শিরোনাম ঘোষণা",
          },
          key: "title-announcement",
          href: "/kry-admin-portal/title-announcement",
        },
        {
          icon: List,
          label: {
            en: "Add Popup",
            bn: "পপআপ যোগ করুন",
          },
          key: "add-popup",
          href: "/kry-admin-portal/add-popup",
        },
        {
          icon: List,
          label: {
            en: "Popups",
            bn: "পপআপসমূহ",
          },
          key: "popup-list",
          href: "/kry-admin-portal/popup-list",
        },
        {
          icon: List,
          label: {
            en: "Popup Setting",
            bn: "পপআপ সেটিং",
          },
          key: "popup-setting",
          href: "/kry-admin-portal/popup-setting",
        },
      ],
    },
    {
      icon: MdCategory,
      label: {
        en: "Coupon",
        bn: "কুপন",
      },
      key: "coupon",
      href: "/kry-admin-portal/coupon",
      subSubLinks: [
        {
          icon: List,
          label: {
            en: "Coupon Report",
            bn: "কুপন রিপোর্ট",
          },
          key: "coupon-report",
          href: "/kry-admin-portal/discount_list",
        },
      ],
    },
  ],
};

const adminDashboardOffer: INavigationLink = {
  icon: MdCategory,
  label: {
    en: "Offers",
    bn: "অফার",
  },
  key: "offer_list",
  href: "/proyojon-admin-portal/offer_list",
  subLinks: [
    {
      icon: FaProductHunt,
      label: {
        en: "Create Offer",
        bn: "অফার তৈরি করুন",
      },
      key: "create-offer",
      href: "/proyojon-admin-portal/create-offer",
    },
    {
      icon: FaProductHunt,
      label: {
        en: "Offer List",
        bn: "অফার তালিকা",
      },
      key: "offer-list",
      href: "/proyojon-admin-portal/offer-list",
    },
    {
      icon: FaProductHunt,
      label: {
        en: "Offer Product List",
        bn: "অফার পণ্য তালিকা",
      },
      key: "offer-product-list",
      href: "/proyojon-admin-portal/offer-product-list",
    },
    {
      icon: FaProductHunt,
      label: {
        en: "Tag Wise Offer List",
        bn: "ট্যাগ অনুযায়ী অফার তালিকা",
      },
      key: "brand-wise-offer-list",
      href: "/proyojon-admin-portal/brand-wise-offer-list",
    },
    {
      icon: FaProductHunt,
      label: {
        en: "Tag Wise Offer Image",
        bn: "ট্যাগ অনুযায়ী অফার ছবি",
      },
      key: "brand-wise-offer-image",
      href: "/proyojon-admin-portal/brand-wise-offer-image",
    },
    {
      icon: FaProductHunt,
      label: {
        en: "Gift List",
        bn: "উপহার তালিকা",
      },
      key: "gift-list",
      href: "/proyojon-admin-portal/gift-list",
    },
  ],
};

const adminDashboardLocation: INavigationLink = {
  icon: MdCategory,
  label: {
    en: "Locations",
    bn: "অফার",
  },
  key: "location",
  href: "/proyojon-admin-portal/location",
  subLinks: [
   {
      icon: FaProductHunt,
      label: {
        en: "City",
        bn: "অফার তৈরি করুন",
      },
      key: "create-city",
      href: "/proyojon-admin-portal/create-city",
    }, 
   {
      icon: FaProductHunt,
      label: {
        en: "Area",
        bn: "অফার তৈরি করুন",
      },
      key: "create-area",
      href: "/proyojon-admin-portal/create-area",
    }, 
  ],
};

export const adminNavigationLinks: INavigationLink[] = [
  { ...admindashboardRootLinks },
  { ...adminDashboardProduct },
  { ...adminDashboardOrders },
  { ...adminDashboardOffer },
  { ...adminDashboardLocation },
];
