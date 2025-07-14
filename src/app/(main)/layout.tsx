import PublicNav from "@/components/main/navigations/PublicNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav/>
      <div className="min-h-screen ">{children}</div>
    </>
  );
}

// pt-24 md:pt-[132px]