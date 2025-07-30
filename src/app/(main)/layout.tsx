import PublicFooter from "@/components/main/navigations/PublicFooter";
import PublicNav from "@/components/main/navigations/PublicNav";
import SmallDevicePublicNav from "@/components/main/navigations/SmallDevicePublicNav";
import { CartProvider } from "../lib/CartContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <CartProvider>
      <PublicNav/>
      <div className="min-h-screen">{children}</div>
      <SmallDevicePublicNav />
      <PublicFooter />
      </CartProvider>
    </>
  );
}

// pt-24 md:pt-[132px]