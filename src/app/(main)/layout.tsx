import PublicNav from "@/components/navigations/PublicNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicNav />
      <div className="min-h-screen">{children}</div>
    </>
  );
}