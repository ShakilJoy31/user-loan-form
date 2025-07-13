
// export async function getMetadataForPage(type: "product" | "category" | "order", identifier: string) {
//   if (type === "product") {
//     const product = await getProductBySlug(identifier);
//     if (!product) return { title: "Product Not Found" };

//     return {
//       title: product.name,
//       description: product.shortDescription,
//       openGraph: {
//         title: product.name,
//         description: product.shortDescription,
//         images: [{ url: product.image }],
//       },
//     };
//   }

//   if (type === "category") {
//     const category = await getCategoryBySlug(identifier);
//     if (!category) return { title: "Category Not Found" };

//     return {
//       title: `${category.name} - ShopX`,
//       description: `Browse ${category.name} products on ShopX.`,
//     };
//   }

//   if (type === "order") {
//     const order = await getOrderById(identifier);
//     if (!order) return { title: "Order Not Found" };

//     return {
//       title: `Order #${order.id}`,
//       description: `Track status of your order #${order.id}`,
//     };
//   }

//   return { title: "Page Not Found" };
// }
