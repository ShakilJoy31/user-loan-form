import { ComponentType } from "react";
import { FaProductHunt, FaUsers } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { LuContact } from "react-icons/lu";
import { IconType } from "react-icons";

export interface INavigationLinks {
  icon?: IconType | ComponentType<unknown>;
  label: {
    en: string;
    bn: string;
  };
  key: string;
  href?: string;
  subLinks?: INavigationLinks[];
  subSubLinks?: INavigationLinks[];
}

const admindashboardRootLinks: INavigationLinks = {
  icon: LuContact,
  label: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  key: "/kry-admin-portal/admin_home",
  href: "/kry-admin-portal/admin_home",
};

const admindashboarCustomers: INavigationLinks = {
  icon: FaUsers,
  label: { en: "Users", bn: "ইউজারস" },
  key: "/kry-admin-portal/customers",
  href: "/kry-admin-portal/customers",
};

const adminDashboardProduct: INavigationLinks = {
  icon: MdCategory,
  label: { en: "Products", bn: "পণ্যসমূহ" },
  key: "product-list",
  href: "/kry-admin-portal/product-list",
  subLinks: [
    {
      icon: MdCategory,
      label: { en: "Add New Product", bn: "নতুন পণ্য যোগ করুন" },
      key: "add-product",
      href: "/kry-admin-portal/add-product",
    },
    {
      icon: MdCategory,
      label: { en: "All Products", bn: "সব পণ্য" },
      key: "product-list",
      href: "/kry-admin-portal/product-list",
      subSubLinks: [
        {
          icon: MdCategory,
          label: { en: "Product Catalog", bn: "পণ্য ক্যাটালগ" },
          key: "product-list",
          href: "/kry-admin-portal/product-list",
        },
      ],
    },
    {
      icon: FaProductHunt,
      label: { en: "Category Wise Products", bn: "ক্যাটাগরি অনুযায়ী পণ্য" },
      key: "category-wise-product-list",
      href: "/kry-admin-portal/category-wise-product-list",
    },
    {
      icon: FaProductHunt,
      label: { en: "Brand Wise Products", bn: "ব্র্যান্ড অনুযায়ী পণ্য" },
      key: "brand-wise-product-list",
      href: "/kry-admin-portal/brand-wise-product-list",
    },
  ],
};

export const sellerNavigationLinks: INavigationLinks[] = [
  {...admindashboardRootLinks},
  {...admindashboarCustomers},
  {...adminDashboardProduct},
];
