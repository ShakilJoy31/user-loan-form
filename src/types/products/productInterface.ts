// types/products/productInterface.ts
export interface Product {
    reviews: string;
    id: number;
    productName: string;
    productLink: string;
    type: string;
    categoryId: number;
    subCategoryId: number;
    brandId: number;
    sellerId: number;
    rating: number;
    isTop: boolean;
    isNew: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    sortDescription: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    seller: {
        UserCompanyInfo: {
  id: number;
  userId: number;
  shopName: string;
  profileImage: string;
  bannerImage: string;
  slug: string;
  ownerName: string;
  designation: string;
  city: string;
  area: string;
  tradeLicense: string;
  map: string; // or you could use more specific type for iframe HTML
  about: string;
  storeHours: string;
  deliveryAvailable: string;
  pickupAvailable: string;
  accessories: string;
  homeAppliances: string;
  products: string;
  createdAt: string; // or Date if you'll parse it
  updatedAt: string; // or Date if you'll parse it
}
    }
    brand: {
        id: number;
        brand: string;
        link: string;
        image: string;
        offerImage: string | null;
        description: string | null;
        isShippedFree: boolean;
        createdAt: string;
        updatedAt: string;
    };
    category: {
        id: number;
        name: string;
        serialNo: number;
        link: string;
        image: string;
        banner: string | null;
        description: string | null;
        isShippedFree: boolean;
        isFullPay: boolean;
        createdAt: string;
        updatedAt: string;
    };
    subCategory: {
        id: number;
        name: string;
        link: string;
        categoryId: number;
        parentSubCategoryId: number | null;
        isShippedFree: boolean;
        createdAt: string;
        updatedAt: string;
    };
    ProductImage: {
        id: number;
        productId: number;
        imageUrl: string;
        alt: string | null;
        createdAt: string;
        updatedAt: string;
    }[];
    VariationType: {
        id: number;
        name: string;
        productId: number;
        options: {
            id: number;
            value: string;
            variationTypeId: number;
        }[];
    }[];
    ProductItem: {
        id: number;
        productId: number;
        sku: string;
        price: number;
        purchasePoint: number;
        discountPrice: number | null;
        stock: number;
        barcode: string | null;
        options: {
            option: string;
        }[];
    }[];
}

export interface ProductFilterParams {
    page: number;
    perPage: number;
    sortOrder?: 'asc' | 'desc';
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    categories?: number[];
    brands?: number[];
}

export interface ProductResponse {
    data: Product[];
    meta: {
        total: number;
        page: number;
        perPage: number;
        totalPages: number;
    };
}

export interface Category {
    id: number;
    name: string;
}

export interface Brand {
    id: number;
    brand: string;
}