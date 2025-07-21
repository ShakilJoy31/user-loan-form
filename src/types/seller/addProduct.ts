
// Types for variations
export interface VariationValue {
    id: number;
    variationId: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Variation {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    VariationValue: VariationValue[];
}

export interface CategoryWishVariation {
    id: number;
    variationId: number;
    categoryId: number;
    isRequired: boolean;
    createdAt: string;
    updatedAt: string;
    variation: Variation;
}

export interface Category {
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
    CategoryWishVariations: CategoryWishVariation[];
    ProductSubCategory: SubCategory[];
}

export interface SubCategory {
    id: number;
    name: string;
    link: string;
    categoryId: number;
    parentSubCategoryId: number | null;
    isShippedFree: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserShopCategory {
    id: number;
    userId: number;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
}

export interface Brand {
    id: number;
    brand: string;
    link: string;
    image: string;
    offerImage: string | null;
    description: string | null;
    isShippedFree: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ProductFormData {
    name: string;
    categoryId: number | null;
    subCategoryId: number | null;
    brandId: number | null;
    images: string[];
    tags: string[];
    variations: {
        name: string;
        options: string[];
    }[];
    items: {
        sku: string;
        price: number;
        stock: number;
        optionValues: string[];
    }[];
    description: string;
    longDescription: string;
    seoDescription: string;
    type: string;
    giftProductId?: number;
    seoTitle?: string;
}






export interface MetaData {
    page: number;
    size: number;
    total: number;
    all: number;
    published: number;
    draft: number;
    trust: number;
    upcoming: number;
    totalPage: number;
    minPrice: number;
    maxPrice: number;
}

export interface ProductsResponse {
    success: boolean;
    statusCode: number;
    message: string;
    meta: MetaData;
    data: ProductResponse[];
}















































































// Interface for view product........................
export interface ProductImage {
    id: number;
    productId: number;
    imageUrl: string;
    alt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface VariationOption {
    id: number;
    value: string;
    variationTypeId: number;
}

export interface ProductVariationType {
    id: number;
    name: string;
    productId: number;
    options: VariationOption[];
}

export interface ProductItemOption {
    option: {
        id: number;
        value: string;
        variationType: {
            id: number;
            name: string;
            productId: number;
        };
        variationTypeId: number;
    };
}

export interface ProductItem {
    id: number;
    productId: number;
    sku: string;
    price: number;
    purchasePoint: number;
    discountPrice: number;
    stock: number;
    barcode: string | null;
    options: ProductItemOption[];
}

export interface UserCompanyInfo {
    id: number;
    userId: number;
    shopName: string;
    ownerName: string;
    designation: string;
    city: string;
    area: string;
    tradeLicense: string;
    createdAt: string;
    updatedAt: string;
}

export interface Seller {
    name: string;
    UserCompanyInfo: UserCompanyInfo;
}

export interface ProductResponse {
    id: number;
    productName: string;
    productLink: string;
    type: string;
    categoryId: number;
    subCategoryId: number;
    brandId: number;
    sellerId: number;
    rating: number;
    seoTitle: string | null;
    seoDescription: string | null;
    sortDescription: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    seller: Seller;
    brand: Brand;
    category: Category;
    subCategory: SubCategory;
    ProductImage: ProductImage[];
    VariationType: ProductVariationType[];
    ProductItem: ProductItem[];
}