import SellerNavber from "@/components/main/navigations/SellerNavber";
import SellerSideber from "@/components/main/navigations/SellerSideber";

export default function SellerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-background">
      {/* Sidebar - fixed width */}
      <div className="hidden lg:block">
        <SellerSideber />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 lg:ml-[70px] xl:ml-[260px] transition-all duration-300">
        {/* Navbar */}
        <SellerNavber />
        
        {/* Content - with proper padding */}
        <div className="p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}