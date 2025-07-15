// Define the interface
interface INavigations {
  [key: string]: {
    name: string;
    path: string;
    icon?: React.ReactNode; 
  };
}

// Export the constant
export const publicNavigations: INavigations = {
  home: {
    name: "Home",
    path: "/",
  },
  products: {
    name: "Products",
    path: "/products",
  },
  about: {
    name: "About Us",
    path: "/about",
  },
  details: {
    name: "Details",
    path: "/products/details",
  },
  deal: {
    name: "Best Deal",
    path: "/best-deal-and-comparison",
  },
  gardening: {
    name: "Gardening",
    path: "/gardening",
  },
};
