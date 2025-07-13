// src/metadata/staticMetadata.ts
const staticMetadata = {
  title: {
    default: "Proyojon - Proyojon E-commerce",
    template: "%s | Proyojon",
  },
  description: "Buy fashion products online from ShopX. Latest trends, top brands.",
  keywords: ["ecommerce", "fashion", "shop", "clothing", "online store"],
  metadataBase: new URL("https://yourdomain.com"),
  openGraph: {
    title: "ShopX - Fashion Online",
    description: "Trendy styles and fashion delivered to your door.",
    siteName: "ShopX",
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ShopX Online Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shopx",
    creator: "@shopx",
  },
};

export default staticMetadata;
