export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen pt-24 md:pt-[132px]">{children}</div>;
}
