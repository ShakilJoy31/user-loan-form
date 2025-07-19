export interface CategoryCore {
  id: number;
  name: string;
  serialNo: string;
  image: string;
  banner?: string;
  description?: string;
  isShippedFree: boolean; 
  isFullPay: boolean;    
}

export interface Category extends CategoryCore {
  _count: {
    Product: number;
  };
}

export type CategoryFormData = CategoryCore;