import AdminSidebarNavigation from "@/components/main/navigations/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pt-24 md:pt-[132px]">
      {" "}
      <div className="flex items-center gap-3 ">
        <div>
          <AdminSidebarNavigation />
        </div>
        <div className="mx-5 w-full">
          {/* <AdminNavbar /> */}
          <div className={`min-h-screen`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
