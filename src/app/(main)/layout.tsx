import PublicFooter from "@/components/main/navigations/PublicFooter";
import PublicNav from "@/components/main/navigations/PublicNav";
import SmallDevicePublicNav from "@/components/main/navigations/SmallDevicePublicNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav/>
      <div className="min-h-screen pt-24 md:pt-[132px]">{children}</div>
      <SmallDevicePublicNav />
      <PublicFooter />
    </>
  );
}

// pt-24 md:pt-[132px]